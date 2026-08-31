"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteWorkspaceDialogProps {
  workspace: { id: string; name: string; pageCount?: number; memberCount?: number };
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called after a successful delete, before the redirect. */
  onDeleted?: () => void;
}

/**
 * Deleting a workspace takes its pages with it and cannot be undone, so the name
 * has to be typed out before the button unlocks.
 */
export function DeleteWorkspaceDialog({
  workspace,
  children,
  open,
  onOpenChange,
  onDeleted,
}: DeleteWorkspaceDialogProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const [confirmation, setConfirmation] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isOpen) setConfirmation("");
  }, [isOpen]);

  const matches = confirmation.trim() === workspace.name;

  const onDelete = async () => {
    if (!matches || deleting) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/workspaces/${workspace.id}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Could not delete the workspace");

      setOpen(false);
      toast.success(`Deleted “${workspace.name}”`);
      onDeleted?.();
      router.push("/workspaces");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete the workspace");
    } finally {
      setDeleting(false);
    }
  };

  const counts = [
    workspace.pageCount !== undefined &&
      `${workspace.pageCount} page${workspace.pageCount === 1 ? "" : "s"}`,
    workspace.memberCount !== undefined &&
      `${workspace.memberCount} member${workspace.memberCount === 1 ? "" : "s"}`,
  ].filter(Boolean) as string[];

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="border-[#3f3f3f] bg-[#252525] text-[#f1f1ef] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TriangleAlert className="h-4 w-4 text-[#ff7369]" />
            Delete workspace
          </DialogTitle>
          <DialogDescription className="text-[#9b9b9b]">
            This permanently deletes <span className="text-[#e8e8e6]">{workspace.name}</span>
            {counts.length > 0 && <> along with its {counts.join(" and ")}</>}. It cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div>
          <label htmlFor="confirm-workspace" className="mb-1.5 block text-sm text-[#d4d4d4]">
            Type <span className="font-medium text-[#f1f1ef]">{workspace.name}</span> to confirm
          </label>
          <Input
            id="confirm-workspace"
            autoFocus
            autoComplete="off"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && matches) void onDelete();
            }}
            placeholder={workspace.name}
            className="border-[#3f3f3f] bg-[#1c1c1c] text-[#f1f1ef] placeholder:text-[#5f5f5f]"
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-[#b8b8b8] hover:bg-[#333333] hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => void onDelete()}
            disabled={!matches || deleting}
            className="bg-[#ff7369] text-[#191919] transition-colors hover:bg-[#ff8a82] disabled:opacity-40"
          >
            {deleting && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            Delete forever
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
