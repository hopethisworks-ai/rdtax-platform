import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/StructuredData";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
