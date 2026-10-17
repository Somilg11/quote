import type { Metadata } from "next";
import { SettingsSection } from "@/components/settings/settings-section";
import { AiKeysPanel } from "@/components/workspace/ai-keys";

export const metadata: Metadata = {
  title: "AI assistant",
  robots: { index: false, follow: false },
};

export default async function AiSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div>
      <SettingsSection
        title="Provider keys"
        hint="Anthropic, OpenAI or Gemini. Keys are encrypted, never shown again, and Quote has no key of its own."
      >
        {from === "assistant" && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-4 py-3 text-sm leading-relaxed text-amber-100">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
            <p>
              First add a key here. Once it is saved, open any workspace and press{" "}
              <kbd className="rounded border border-amber-200/30 px-1 text-xs">⌘J</kbd> to use the assistant.
            </p>
          </div>
        )}
        <AiKeysPanel />
      </SettingsSection>
    </div>
  );
}
