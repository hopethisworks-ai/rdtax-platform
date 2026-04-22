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
                <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Alexander &amp; Blake logo">
                  <rect width="120" height="120" rx="24" fill="#2C7A7B"/>
                  <path d="M28 82L44 30h8l16 52h-8l-4-14H40l-4 14h-8zm14-22h12l-6-22-6 22z" fill="white"/>
                  <path d="M68 30h16c4 0 7 1 9 3s3 5 3 8c0 4-2 7-5 9 4 2 6 5 6 10 0 4-1 7-4 9s-6 3-10 3H68V30zm8 18h8c2 0 3-0.5 4-2s2-3 2-5-1-3-2-4-2-2-4-2h-8v13zm0 20h10c2 0 4-1 5-2s2-3 2-5-1-4-2-5-3-2-5-2H76v14z" fill="rgba(255,255,255,0.7)"/>
                </svg>
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
