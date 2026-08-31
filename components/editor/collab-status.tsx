"use client";

import { CloudOff, RefreshCw } from "lucide-react";
import type { CollabPeer, CollabStatus } from "./use-collab";

/** Only states worth interrupting for get a label; a synced page says nothing. */
const LABEL: Partial<Record<CollabStatus, string>> = {
  connecting: "Connecting…",
  syncing: "Syncing…",
  offline: "Offline — changes queued",
};

interface CollabStatusBarProps {
  status: CollabStatus;
  peers: CollabPeer[];
}

/**
 * Who else has the page open, plus sync trouble.
 * A steady "Saved" badge is noise: the page header already reports saving, and
 * silence is the healthy state.
 */
export function CollabStatusBar({ status, peers }: CollabStatusBarProps) {
  const label = LABEL[status];
  const Icon = status === "offline" ? CloudOff : RefreshCw;

  if (peers.length === 0 && !label) return null;

  return (
    <div className="flex items-center gap-3">
      {peers.length > 0 && (
        <div className="flex -space-x-1.5">
          {peers.slice(0, 3).map((peer) => (
            <span
              key={peer.userId}
              title={`${peer.name} is here`}
              style={{ background: peer.color }}
              className="grid h-6 w-6 place-items-center rounded-md border-2 border-[#202020] text-[10px] font-semibold text-white"
            >
              {peer.name.charAt(0).toUpperCase()}
            </span>
          ))}
          {peers.length > 3 && (
            <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-[#202020] bg-[#3a3a3a] text-[10px] font-semibold text-white">
              +{peers.length - 3}
            </span>
          )}
        </div>
      )}

      {label && (
        <span
          title={label}
          aria-live="polite"
          className={`flex items-center gap-1.5 text-[11px] ${
            status === "offline" ? "text-[#e0a97d]" : "text-[#858585]"
          }`}
        >
          <Icon className={`h-3.5 w-3.5 ${status === "syncing" ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">{label}</span>
        </span>
      )}
    </div>
  );
}
