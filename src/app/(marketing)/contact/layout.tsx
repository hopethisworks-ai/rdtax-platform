import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Schedule a complimentary consultation with Alexander & Blake. We help South Carolina businesses identify qualifying R&D activities and prepare well-supported credit studies.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
