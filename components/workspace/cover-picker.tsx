"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

/**
 * Built-in cover gradients, stored as `gradient:<id>` so no asset hosting is needed.
 * Anything else in `coverImage` is treated as an image URL.
 */
export const COVER_GRADIENTS: Record<string, string> = {
  slate: "linear-gradient(120deg, #3a3a3c 0%, #1f1f21 100%)",
  dusk: "linear-gradient(120deg, #46414f 0%, #22212a 100%)",
  moss: "linear-gradient(120deg, #3c4a41 0%, #1e2621 100%)",
  clay: "linear-gradient(120deg, #4d3f38 0%, #26201d 100%)",
  steel: "linear-gradient(120deg, #38434d 0%, #1d2328 100%)",
  sand: "linear-gradient(120deg, #4f4a3d 0%, #272420 100%)",
  ink: "linear-gradient(120deg, #2b2b2e 0%, #101012 100%)",
  rose: "linear-gradient(120deg, #4d3a3f 0%, #261e21 100%)",
};

export const GRADIENT_PREFIX = "gradient:";

/** Resolves a stored cover value into a CSS background. */
export function coverBackground(cover: string): string {
  if (cover.startsWith(GRADIENT_PREFIX)) {
    const id = cover.slice(GRADIENT_PREFIX.length);
    return COVER_GRADIENTS[id] ?? COVER_GRADIENTS.slate;
  }
  return `center / cover no-repeat url("${cover.replace(/"/g, "%22")}")`;
}

interface CoverPickerProps {
  value?: string | null;
  onChange: (cover: string | null) => void;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}

export function CoverPicker({ value, onChange, children, align = "end" }: CoverPickerProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const apply = (cover: string | null) => {
    onChange(cover);
    setOpen(false);
    setUrl("");
  };

  const submitUrl = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) apply(trimmed);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 border-[#3f3f3f] bg-[#252525] p-3 text-[#f1f1ef] shadow-2xl"
      >
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#8f8f8f]">
          Gradients
        </p>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(COVER_GRADIENTS).map(([id, background]) => {
            const token = `${GRADIENT_PREFIX}${id}`;
            return (
              <button
                key={id}
                type="button"
                title={id}
                onClick={() => apply(token)}
                style={{ background }}
                className={`h-12 rounded-md ring-offset-2 ring-offset-[#252525] transition-all ${
                  value === token ? "ring-2 ring-white/70" : "ring-1 ring-white/10"
                }`}
              />
            );
          })}
        </div>

        <form onSubmit={submitUrl} className="mt-4">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#8f8f8f]">
            Image URL
          </p>
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://…"
              className="h-8 border-[#3f3f3f] bg-[#1f1f1f] text-sm text-[#f1f1ef] placeholder:text-[#6f6f6f]"
            />
            <Button
              type="submit"
              size="sm"
              className="h-8 bg-[#f1f1ef] text-[#202020] hover:bg-white"
            >
              Use
            </Button>
          </div>
        </form>

        {value && (
          <button
            type="button"
            onClick={() => apply(null)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md py-1.5 text-xs text-[#ff7369] transition-colors hover:bg-[#3a2928]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove cover
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
