import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspaces",
  // Private surfaces should never end up in a search index.
  robots: { index: false, follow: false },
};

export default function WorkspacesSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
