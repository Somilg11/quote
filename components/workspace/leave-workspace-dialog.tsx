"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LeaveWorkspaceDialogProps {
  workspace: { id: string; name: string };
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Leaving is reversible only by a fresh invite, so it still asks first. */
export function LeaveWorkspaceDialog({
  workspace,
  children,
  open,
  onOpenChange,
}: LeaveWorkspaceDialogProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const [leaving, setLeaving] = useState(false);

  const onLeave = async () => {
    if (leaving) return;
    setLeaving(true);
    try {
      const response = await fetch(`/api/workspaces/${workspace.id}/leave`, { method: "POST" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Could not leave the workspace");

      setOpen(false);
      toast.success(`You left “${workspace.name}”`);
      router.push("/workspaces");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not leave the workspace");
    } finally {
      setLeaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="border-[#3f3f3f] bg-[#252525] text-[#f1f1ef] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Leave workspace
          </DialogTitle>
          <DialogDescription className="text-[#9b9b9b]">
            You will lose access to <span className="text-[#e8e8e6]">{workspace.name}</span> and
            its pages. Pages you wrote stay with the workspace. You will need a new invite to
            come back.
          </DialogDescription>
        </DialogHeader>

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
            onClick={() => void onLeave()}
            disabled={leaving}
            className="bg-[#ff7369] text-[#191919] transition-colors hover:bg-[#ff8a82]"
          >
            {leaving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            Leave workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
