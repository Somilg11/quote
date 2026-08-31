"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";

export type CollabStatus = "connecting" | "synced" | "syncing" | "offline";

export interface CollabPeer {
  userId: string;
  name: string;
  color: string;
}

interface UseCollabOptions {
  pageId: string;
  /** Server-side `Page.version`, used to detect writes made outside the editor. */
  initialVersion?: number;
}

/** Poll cadence, in milliseconds. */
const INTERVAL_ACTIVE = 1200;
const INTERVAL_IDLE = 5000;
const INTERVAL_HIDDEN = 30000;
/** How long after remote activity we keep polling at the fast rate. */
const ACTIVE_WINDOW_MS = 15000;
/** Debounce before local edits are pushed. */
const PUSH_DEBOUNCE_MS = 350;

const encode = (bytes: Uint8Array) => {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const decode = (value: string) => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

/**
 * Keeps a Yjs document in sync over plain HTTP.
 *
 * There is no websocket: local updates are pushed on a short debounce and remote
 * updates are pulled in the same request. The cadence adapts to activity, and a
 * hidden tab drops to a heartbeat, so idle sessions cost close to nothing.
 */
export function useCollab({ pageId, initialVersion = 0 }: UseCollabOptions) {
  const doc = useMemo(() => new Y.Doc(), [pageId]);
  const clientId = useMemo(
    () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
    [pageId]
  );

  const [status, setStatus] = useState<CollabStatus>("connecting");
  const [peers, setPeers] = useState<CollabPeer[]>([]);
  const [remoteVersion, setRemoteVersion] = useState(initialVersion);
  const [ready, setReady] = useState(false);

  const seqRef = useRef("0");
  const pendingRef = useRef<Uint8Array[]>([]);
  const lastRemoteAtRef = useRef(0);
  const inFlightRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    stoppedRef.current = false;

    // Local-first: the cached document paints before the network answers.
    const idb = new IndexeddbPersistence(`quote-page-${pageId}`, doc);

    const applyRemote = (updates: { seq: string; update: string }[]) => {
      if (updates.length === 0) return;
      Y.transact(
        doc,
        () => {
          for (const row of updates) Y.applyUpdate(doc, decode(row.update), "remote");
        },
        "remote"
      );
      lastRemoteAtRef.current = Date.now();
    };

    const onUpdate = (update: Uint8Array, origin: unknown) => {
      // Never echo back what we just received, or IndexedDB's own replay.
      if (origin === "remote" || origin === idb) return;
      pendingRef.current.push(update);
      schedule(PUSH_DEBOUNCE_MS);
    };

    const peersRef = { current: [] as CollabPeer[] };

    const nextInterval = () => {
      if (typeof document !== "undefined" && document.hidden) return INTERVAL_HIDDEN;
      const busy =
        peersRef.current.length > 0 || Date.now() - lastRemoteAtRef.current < ACTIVE_WINDOW_MS;
      return busy ? INTERVAL_ACTIVE : INTERVAL_IDLE;
    };

    const schedule = (delay = nextInterval()) => {
      if (stoppedRef.current) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(cycle, delay);
    };

    const cycle = async () => {
      if (stoppedRef.current || inFlightRef.current) return;
      inFlightRef.current = true;

      const outgoing = pendingRef.current;
      pendingRef.current = [];

      try {
        if (outgoing.length > 0) setStatus("syncing");

        const response = await fetch(`/api/collab/${pageId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            since: seqRef.current,
            updates: outgoing.length ? [encode(Y.mergeUpdates(outgoing))] : [],
            presence: true,
          }),
        });

        if (!response.ok) throw new Error(`sync failed: ${response.status}`);

        const data = await response.json();
        seqRef.current = data.seq ?? seqRef.current;
        applyRemote(data.updates ?? []);
        peersRef.current = data.peers ?? [];
        setPeers(data.peers ?? []);
        if (typeof data.version === "number") setRemoteVersion(data.version);
        setStatus("synced");
      } catch {
        // Re-queue so nothing is lost while the network is down.
        pendingRef.current = [...outgoing, ...pendingRef.current];
        setStatus("offline");
      } finally {
        inFlightRef.current = false;
        schedule();
      }
    };

    const bootstrap = async () => {
      try {
        const response = await fetch(`/api/collab/${pageId}`);
        if (!response.ok) throw new Error(`load failed: ${response.status}`);
        const data = await response.json();
        seqRef.current = data.seq ?? "0";
        if (typeof data.version === "number") setRemoteVersion(data.version);
        if (data.update) Y.applyUpdate(doc, decode(data.update), "remote");
        setStatus("synced");
      } catch {
        setStatus("offline");
      } finally {
        setReady(true);
        doc.on("update", onUpdate);
        schedule(PUSH_DEBOUNCE_MS);
      }
    };

    // Wait for the cached copy before touching the network, so we never flash empty.
    idb.whenSynced.then(bootstrap).catch(bootstrap);

    const onVisibility = () => {
      if (!document.hidden) schedule(0);
    };
    const onOnline = () => schedule(0);
    const onBeforeUnload = () => {
      if (pendingRef.current.length === 0) return;
      // keepalive lets the final push outlive the page.
      fetch(`/api/collab/${pageId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          clientId,
          since: seqRef.current,
          updates: [encode(Y.mergeUpdates(pendingRef.current))],
        }),
      }).catch(() => undefined);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("online", onOnline);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      stoppedRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      onBeforeUnload();
      doc.off("update", onUpdate);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("beforeunload", onBeforeUnload);
      idb.destroy();
      doc.destroy();
    };
  }, [doc, pageId, clientId]);

  return { doc, status, peers, ready, remoteVersion };
}
