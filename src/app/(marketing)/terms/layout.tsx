import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Alexander & Blake",
  description:
    "Alexander & Blake terms of service. Read our terms and conditions for using our services and platform.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
