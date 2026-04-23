import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-serif" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rdtax-platform.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Alexander & Blake | R&D Tax Credit Advisory",
    template: "%s | Alexander & Blake",
  },
  description:
    "Alexander & Blake is a specialist advisory firm helping innovative South Carolina businesses identify qualifying R&D activities, prepare structured credit studies, and coordinate CPA-ready filing support.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alexander & Blake",
    title: "Alexander & Blake | R&D Tax Credit Advisory",
    description:
      "Specialist R&D tax credit advisory for South Carolina businesses. Carefully prepared credit studies, structured documentation, and ongoing support.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander & Blake | R&D Tax Credit Advisory",
    description:
      "Specialist R&D tax credit advisory for South Carolina businesses. Carefully prepared credit studies, structured documentation, and ongoing support.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${dmSerif.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
