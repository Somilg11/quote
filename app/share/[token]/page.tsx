import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ReadOnlyEditor } from "@/components/editor/read-only-editor";

export default async function SharedPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const page = await prisma.page.findUnique({
    where: { shareToken: token },
    include: {
      workspace: true,
      createdBy: true,
    },
  });

  if (!page || page.shareType !== "global") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#191919] text-[#f1f1ef]">
      <div className="border-b border-[#2f2f2f] bg-[#191919]/90 px-4 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{page.icon}</span>
            <h1 className="text-xl font-semibold">{page.title}</h1>
          </div>
          <p className="mt-1 text-xs text-[#858585]">
            Public view · {page.workspace.name}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none opacity-70">
          <ReadOnlyEditor
            initialContent={page.content || ''}
          />
        </div>
      </div>
    </div>
  );
}
