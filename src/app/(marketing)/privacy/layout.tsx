import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Alexander & Blake",
  description:
    "Alexander & Blake privacy policy. Learn how we collect, use, and protect your information.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
