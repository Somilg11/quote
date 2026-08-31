"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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

/** Mirrors the slug rules the API enforces. */
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);

interface NewWorkspaceDialogProps {
  /** Trigger element. Omit when driving the dialog with `open`/`onOpenChange`. */
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Creating a workspace is three short fields, so it happens in place rather than
 * on a page of its own.
 */
export function NewWorkspaceDialog({ children, open, onOpenChange }: NewWorkspaceDialogProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Start clean every time the dialog opens.
  useEffect(() => {
    if (isOpen) return;
    setName("");
    setSlug("");
    setSlugEdited(false);
    setDescription("");
    setError("");
  }, [isOpen]);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugEdited) setSlug(slugify(value));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Give the workspace a name.");
      return;
    }

    const finalSlug = slugify(slug || trimmedName);
    if (!finalSlug) {
      setError("That name needs at least one letter or number.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          slug: finalSlug,
          description: description.trim() || null,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message || "Could not create the workspace.");
        return;
      }

      setOpen(false);
      toast.success(`Created “${trimmedName}”`);
      router.push(`/workspaces/${data.workspace.id}`);
      router.refresh();
    } catch {
      setError("Could not create the workspace.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="border-[#3f3f3f] bg-[#252525] text-[#f1f1ef] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New workspace</DialogTitle>
          <DialogDescription className="text-[#9b9b9b]">
            A workspace holds pages, members, and invites. You can rename it later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <p className="rounded-md border border-[#6f302d] bg-[#3a2928] px-3 py-2 text-sm text-[#ffb4ae]">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="workspace-name" className="mb-1.5 block text-sm text-[#d4d4d4]">
              Name
            </label>
            <Input
              id="workspace-name"
              autoFocus
              value={name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="Acme, Personal, Q3 planning…"
              maxLength={60}
              className="border-[#3f3f3f] bg-[#1c1c1c] text-[#f1f1ef] placeholder:text-[#6f6f6f]"
            />
          </div>

          <div>
            <label htmlFor="workspace-slug" className="mb-1.5 block text-sm text-[#d4d4d4]">
              URL
            </label>
            <div className="flex items-center gap-1.5 rounded-md border border-[#3f3f3f] bg-[#1c1c1c] pl-2.5 focus-within:border-[#666666]">
              <span className="shrink-0 text-sm text-[#7a7a7a]">/w/</span>
              <Input
                id="workspace-slug"
                value={slug}
                onChange={(event) => {
                  setSlugEdited(true);
                  setSlug(event.target.value);
                }}
                onBlur={() => setSlug((value) => slugify(value))}
                placeholder="acme"
                maxLength={50}
                className="border-0 bg-transparent px-0 text-[#f1f1ef] shadow-none placeholder:text-[#6f6f6f] focus-visible:ring-0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="workspace-description" className="mb-1.5 block text-sm text-[#d4d4d4]">
              Description <span className="text-[#7a7a7a]">(optional)</span>
            </label>
            <textarea
              id="workspace-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What lives in here?"
              rows={2}
              maxLength={200}
              className="w-full resize-none rounded-md border border-[#3f3f3f] bg-[#1c1c1c] px-3 py-2 text-sm text-[#f1f1ef] outline-none transition-colors placeholder:text-[#6f6f6f] focus:border-[#666666]"
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
              type="submit"
              disabled={submitting}
              className="bg-[#f1f1ef] text-[#202020] transition-colors hover:bg-white"
            >
              {submitting && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
              Create workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
