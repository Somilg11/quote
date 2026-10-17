"use client";

import { useEffect, useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { PROVIDERS, type ProviderId } from "@/lib/ai/providers";
import { cn } from "@/lib/utils";

export interface Connection {
  id: string;
  provider: ProviderId;
  model: string;
  keyHint: string;
  isDefault: boolean;
}

export function SetupView({ first, onDone, onCancel }: { first: boolean; onDone: () => void; onCancel?: () => void }) {
  const [provider, setProvider] = useState<ProviderId>("anthropic");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const meta = PROVIDERS[provider];

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/ai/connections", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ provider, apiKey: apiKey.trim(), model: model.trim() || undefined }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data?.error ?? "Could not save the key.");
        return;
      }
      setApiKey("");
      onDone();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
      <div>
        <p className="text-lg font-normal tracking-[-0.02em] text-zinc-100">{first ? "Bring your own AI" : "Add a provider"}</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
          Paste an API key and the assistant works across your whole workspace using your own account. Keys are encrypted and never leave the server.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-[#161616] p-1">
        {(Object.keys(PROVIDERS) as ProviderId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => { setProvider(id); setModel(""); }}
            className={cn("rounded-lg px-2 py-2 text-xs transition-colors", provider === id ? "bg-[#2c2c2c] text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
          >
            {PROVIDERS[id].label.replace("Google ", "")}
          </button>
        ))}
      </div>

      <label className="block">
        <span className="mb-1.5 flex items-center justify-between text-xs text-zinc-400">
          API key
          <a href={meta.keysUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300">
            Get a key
          </a>
        </span>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            type="password"
            autoComplete="off"
            spellCheck={false}
            required
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={`${meta.keyPrefix}…`}
            className="h-10 w-full rounded-lg border border-white/10 bg-[#202020] pl-9 pr-3 font-mono text-[13px] text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-white/30"
          />
        </div>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs text-zinc-400">Model</span>
        <input
          list={`models-${provider}`}
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder={meta.defaultModel}
          className="h-10 w-full rounded-lg border border-white/10 bg-[#202020] px-3 text-[13px] text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-white/30"
        />
        <datalist id={`models-${provider}`}>{meta.models.map((m) => <option key={m} value={m} />)}</datalist>
      </label>

      {error && <p className="rounded-lg border border-[#6f302d] bg-[#3a2928] px-3 py-2 text-xs text-[#ffb4ae]">{error}</p>}

      <div className="flex gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="h-10 rounded-lg border border-white/10 px-4 text-sm text-zinc-300 hover:bg-white/[0.04]">
            Cancel
          </button>
        )}
        <button type="submit" disabled={busy || apiKey.trim().length < 16} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-100 text-sm text-zinc-900 transition-opacity disabled:opacity-40">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Verify and save
        </button>
      </div>
    </form>
  );
}

export function ManageView({ connections, onChange, onAdd, onBack }: { connections: Connection[]; onChange: () => Promise<unknown>; onAdd: () => void; onBack?: () => void }) {
  const [busyId, setBusyId] = useState<string | null>(null);

  const call = async (id: string, init: RequestInit) => {
    setBusyId(id);
    try {
      await fetch(`/api/ai/connections/${id}`, { ...init, headers: { "content-type": "application/json" } });
      await onChange();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
      <p className="text-lg font-normal tracking-[-0.02em] text-zinc-100">AI providers</p>
      <p className="text-[13px] text-zinc-500">The default provider answers in chat. Remove a key any time.</p>
      <div className="space-y-2">
        {connections.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/[0.08] p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-100">{PROVIDERS[c.provider].label}</span>
              <span className="font-mono text-xs text-zinc-500">••••{c.keyHint}</span>
              {c.isDefault && <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-zinc-300">Default</span>}
            </div>
            <div className="mt-1 text-xs text-zinc-500">{c.model}</div>
            <div className="mt-2.5 flex gap-3 text-xs">
              {!c.isDefault && (
                <button disabled={busyId === c.id} onClick={() => call(c.id, { method: "PATCH", body: JSON.stringify({ isDefault: true }) })} className="text-zinc-400 hover:text-zinc-100">
                  Make default
                </button>
              )}
              <button disabled={busyId === c.id} onClick={() => call(c.id, { method: "DELETE" })} className="text-red-400/80 hover:text-red-300">
                Remove key
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onAdd} className="h-10 flex-1 rounded-lg border border-white/10 text-sm text-zinc-200 hover:bg-white/[0.04]">
          Add provider
        </button>
        {onBack && (
          <button onClick={onBack} className="h-10 flex-1 rounded-lg bg-zinc-100 text-sm text-zinc-900">
            Back to chat
          </button>
        )}
      </div>
    </div>
  );
}

/** Standalone key manager for the settings page. */
export function AiKeysPanel() {
  const [connections, setConnections] = useState<Connection[] | null>(null);
  const [view, setView] = useState<"manage" | "setup">("manage");

  const load = async () => {
    try {
      const response = await fetch("/api/ai/connections", { cache: "no-store" });
      const data = await response.json();
      setConnections(data.connections ?? []);
      return (data.connections ?? []) as Connection[];
    } catch {
      setConnections([]);
      return [];
    }
  };

  useEffect(() => {
    void load().then((list) => list.length === 0 && setView("setup"));
  }, []);

  if (connections === null) {
    return <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />;
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#1c1c1c]">
      {view === "setup" ? (
        <SetupView
          first={connections.length === 0}
          onDone={async () => {
            await load();
            setView("manage");
          }}
          onCancel={connections.length ? () => setView("manage") : undefined}
        />
      ) : (
        <ManageView connections={connections} onChange={load} onAdd={() => setView("setup")} />
      )}
    </div>
  );
}
