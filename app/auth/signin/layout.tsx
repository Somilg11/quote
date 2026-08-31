import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Quote workspace.",
  alternates: { canonical: "/auth/signin" },
  robots: { index: false, follow: true },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
