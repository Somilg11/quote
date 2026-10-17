"use client";

import dynamic from "next/dynamic";

/** The assistant is only needed once someone opens it, so keep it out of the initial bundle. */
const AiAssistant = dynamic(() => import("@/components/workspace/ai-assistant").then((m) => m.AiAssistant), {
  ssr: false,
});

export function AiAssistantLazy({ workspaceId }: { workspaceId: string }) {
  return <AiAssistant workspaceId={workspaceId} />;
}
