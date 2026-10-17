import type { Metadata } from "next";
import { AppearanceSettings } from "@/components/settings/appearance-settings";

export const metadata: Metadata = {
  title: "Appearance",
  robots: { index: false, follow: false },
};

export default function AppearancePage() {
  return <AppearanceSettings />;
}
