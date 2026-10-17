"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { WorkspaceInviteDialog } from "@/components/workspace/workspace-invite-dialog";

interface Member {
  userId: string;
  role: string;
  name: string | null;
  email: string | null;
  joinedAt: string;
}

interface Invite {
  id: string;
  email: string;
  expiresAt: string;
}

export function MembersManager({
  workspace,
  currentUserId,
  isOwner,
  members,
  invites,
}: {
  workspace: { id: string; name: string };
  currentUserId: string;
  isOwner: boolean;
  members: Member[];
  invites: Invite[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const act = async (key: string, url: string, success: string) => {
    setBusy(key);
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong");
      }
      toast.success(success);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="relative mx-auto max-w-5xl font-[family-name:var(--font-poppins)] text-zinc-100">
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-3 hidden border-l border-dotted border-white/[0.12] sm:block" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-3 hidden border-r border-dotted border-white/[0.12] sm:block" />

      <header className="flex flex-col gap-6 px-5 pb-10 pt-10 sm:px-14 sm:pt-16 md:flex-row md:items-end md:justify-between">
        <h1 className="text-balance text-4xl font-normal leading-[1.02] tracking-[-0.05em] sm:text-6xl">
          Members.
          <span className="block text-zinc-500">Who is in {workspace.name}.</span>
        </h1>
        {isOwner && <WorkspaceInviteDialog workspaceId={workspace.id} />}
      </header>

      <section className="border-t border-white/[0.07]">
        <div className="grid gap-5 px-5 py-8 sm:grid-cols-[200px_1fr] sm:px-14 sm:py-10">
          <div>
            <p className="text-sm text-zinc-100">People</p>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
              {members.length} {members.length === 1 ? "person" : "people"} can open this workspace.
            </p>
          </div>
          <div className="divide-y divide-dotted divide-white/[0.12] border-y border-dotted border-white/[0.12]">
            {members.map((member) => {
              const isYou = member.userId === currentUserId;
              return (
                <div key={member.userId} className="flex items-center gap-3 px-1 py-3.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#2f2f2f] text-xs font-medium">
                    {(member.name || member.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-zinc-200">
                      {member.name || "Unnamed user"}
                      {isYou && <span className="ml-2 text-xs text-zinc-500">you</span>}
                    </p>
                    <p className="truncate text-xs text-zinc-500">{member.email}</p>
                  </div>
                  <span className="ml-auto rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] capitalize text-zinc-400">
                    {member.role}
                  </span>
                  {isOwner && member.role !== "owner" && (
                    <button
                      type="button"
                      disabled={busy === member.userId}
                      onClick={() => {
                        if (window.confirm(`Remove ${member.name || member.email} from ${workspace.name}?`)) {
                          void act(member.userId, `/api/workspaces/${workspace.id}/members/${member.userId}`, "Member removed");
                        }
                      }}
                      className="text-xs text-red-400/80 transition-colors hover:text-red-300 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {isOwner && (
        <section className="border-t border-white/[0.07]">
          <div className="grid gap-5 px-5 py-8 sm:grid-cols-[200px_1fr] sm:px-14 sm:py-10">
            <div>
              <p className="text-sm text-zinc-100">Pending invites</p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">Invites that have not been accepted yet.</p>
            </div>
            {invites.length === 0 ? (
              <p className="py-3 text-sm text-zinc-500">No pending invites.</p>
            ) : (
              <div className="divide-y divide-dotted divide-white/[0.12] border-y border-dotted border-white/[0.12]">
                {invites.map((invite) => (
                  <div key={invite.id} className="flex items-center gap-3 px-1 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-zinc-200">{invite.email}</p>
                      <p className="text-xs text-zinc-500">Expires {new Date(invite.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</p>
                    </div>
                    <button
                      type="button"
                      disabled={busy === invite.id}
                      onClick={() => void act(invite.id, `/api/workspaces/${workspace.id}/invites/${invite.id}`, "Invite revoked")}
                      className="ml-auto text-xs text-zinc-400 transition-colors hover:text-zinc-100 disabled:opacity-50"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
