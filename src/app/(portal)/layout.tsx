import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const navItems = [
    { href: "/portal", label: "Dashboard" },
    { href: "/portal/engagements", label: "My Engagements" },
    { href: "/portal/files", label: "My Files" },
    { href: "/portal/invoices", label: "Invoices" },
    { href: "/portal/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link href="/portal" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AB</span>
                </div>
                <span className="font-bold text-sm text-gray-900">Client Portal</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm font-medium text-gray-600 hover:text-gray-900">{item.label}</Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>{(session.user as { email?: string }).email}</span>
              <Link href="/api/auth/signout" className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs hover:bg-gray-50">Sign out</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</main>
    </div>
  );
}
