"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MailPlus } from "lucide-react";

export function WorkspaceInviteDialog({ workspaceId }: { workspaceId: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendInvite = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, workspaceId }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send invite");
      }

      setEmail("");
      setMessage("Invite created. Email delivery can be connected later.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to send invite");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2 rounded-md text-[#d4d4d4] transition-colors duration-150 hover:bg-[#2f2f2f] hover:text-white">
          <MailPlus className="h-4 w-4" />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="border-[#3f3f3f] bg-[#252525] text-[#f1f1ef]">
        <DialogHeader>
          <DialogTitle>Invite collaborators</DialogTitle>
          <DialogDescription className="text-[#9b9b9b]">
            Add someone to this workspace by email.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={sendInvite} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="teammate@example.com"
            className="border-[#3f3f3f] bg-[#1f1f1f] text-[#f1f1ef]"
            required
          />
          {message && <p className="text-sm text-[#b8b8b8]">{message}</p>}
          <Button disabled={isSending} className="w-full bg-[#f1f1ef] text-[#202020] transition-colors duration-150 hover:bg-white">
            {isSending ? "Sending..." : "Send invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
