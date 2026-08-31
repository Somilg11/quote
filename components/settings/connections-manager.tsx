"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Copy, KeyRound, Loader2, Plus, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { McpSetup } from "@/components/landing/mcp-setup";
import { mcpClientConfigs, MCP_TOKEN_PLACEHOLDER } from "@/lib/mcp/clients";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface TokenSummary {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
}

interface ConnectionsManagerProps {
  endpoint: string;
  tokens: TokenSummary[];
}

const formatDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    : "Never";

export function ConnectionsManager({ endpoint, tokens }: ConnectionsManagerProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [freshToken, setFreshToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pendingRevoke, setPendingRevoke] = useState<TokenSummary | null>(null);

  const createToken = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    try {
      const response = await fetch("/api/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || "MCP client" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "Could not create the token");

      setFreshToken(data.token);
      setName("");
      router.refresh();
      toast.success("Token created — copy it now, it is shown once");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create the token");
    } finally {
      setCreating(false);
    }
  };

  const revokeToken = async () => {
    if (!pendingRevoke) return;
    const target = pendingRevoke;
    setPendingRevoke(null);
    try {
      const response = await fetch(`/api/tokens/${target.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      toast.success(`Revoked "${target.name}"`);
      router.refresh();
    } catch {
      toast.error("Could not revoke that token");
    }
  };

  const copyToken = async () => {
    if (!freshToken) return;
    await navigator.clipboard.writeText(freshToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clients = mcpClientConfigs(endpoint, freshToken ?? MCP_TOKEN_PLACEHOLDER);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-lg font-medium text-[#f1f1ef]">API tokens</h2>
        <p className="mt-1 text-sm text-[#8f8f8f]">
          A token lets an MCP client act on your workspaces. It is shown once, hashed at rest,
          and can be revoked at any time.
        </p>

        <form onSubmit={createToken} className="mt-5 flex flex-wrap gap-2">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Token name — e.g. Claude Code on my laptop"
            maxLength={60}
            className="h-9 min-w-56 flex-1 border-[#3f3f3f] bg-[#1c1c1c] text-sm text-[#f1f1ef] placeholder:text-[#6f6f6f]"
          />
          <Button
            type="submit"
            disabled={creating}
            className="h-9 gap-2 bg-[#f1f1ef] text-[#202020] hover:bg-white"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Create token
          </Button>
        </form>

        {freshToken && (
          <div className="mt-4 rounded-lg border border-[#4a4326] bg-[#2a2718] p-4 animate-fade-in">
            <p className="flex items-center gap-2 text-sm font-medium text-[#e8dfae]">
              <ShieldAlert className="h-4 w-4" />
              Copy this token now — it will not be shown again.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <code className="min-w-0 flex-1 overflow-x-auto rounded-md bg-[#191919] px-3 py-2 font-mono text-xs text-[#f1f1ef]">
                {freshToken}
              </code>
              <Button
                size="sm"
                onClick={copyToken}
                className="h-9 gap-1.5 bg-[#e8dfae] text-[#2a2718] hover:bg-[#f2ecc8]"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <p className="mt-3 text-xs text-[#b3a97a]">
              The setup snippets below already include it.
            </p>
          </div>
        )}

        <div className="mt-6 overflow-x-auto rounded-lg border border-[#2f2f2f]">
          {tokens.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <KeyRound className="mx-auto mb-3 h-6 w-6 text-[#5f5f5f]" />
              <p className="text-sm text-[#8f8f8f]">
                No tokens yet. Create one to connect an AI client.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#1c1c1c] text-left text-xs uppercase tracking-wide text-[#7a7a7a]">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Name</th>
                  <th className="px-4 py-2.5 font-medium">Token</th>
                  <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Created</th>
                  <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Last used</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {tokens.map((token) => (
                  <tr key={token.id} className="transition-colors hover:bg-[#1c1c1c]">
                    <td className="px-4 py-3 font-medium text-[#e8e8e6]">{token.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#8f8f8f]">{token.prefix}…</td>
                    <td className="hidden px-4 py-3 text-[#8f8f8f] sm:table-cell">
                      {formatDate(token.createdAt)}
                    </td>
                    <td className="hidden px-4 py-3 text-[#8f8f8f] sm:table-cell">
                      {formatDate(token.lastUsedAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPendingRevoke(token)}
                        className="h-8 gap-1.5 text-[#ff7369] hover:bg-[#3a2928] hover:text-[#ff8a82]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Revoke
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium text-[#f1f1ef]">Connect a client</h2>
        <p className="mt-1 text-sm text-[#8f8f8f]">
          Quote speaks MCP over streamable HTTP at{" "}
          <code className="rounded bg-[#1c1c1c] px-1.5 py-0.5 font-mono text-xs text-[#c9c9c9]">
            {endpoint}
          </code>
          . Pick your client and paste the config.
        </p>
        <div className="mt-5">
          <McpSetup clients={clients} />
        </div>
      </section>

      <AlertDialog open={!!pendingRevoke} onOpenChange={(open) => !open && setPendingRevoke(null)}>
        <AlertDialogContent className="border-[#3f3f3f] bg-[#252525] text-[#f1f1ef]">
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke this token?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#b8b8b8]">
              Any client using “{pendingRevoke?.name}” loses access immediately. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#3f3f3f] bg-transparent text-[#f1f1ef] hover:bg-[#333333] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={revokeToken}
              className="bg-[#ff7369] text-[#191919] hover:bg-[#ff8a82]"
            >
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
