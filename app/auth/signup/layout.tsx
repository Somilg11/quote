import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a free Quote account: nested pages, real-time collaboration, and an MCP server your AI tools can connect to.",
  alternates: { canonical: "/auth/signup" },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
