import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import AdminNav from "./AdminNav";
import NotificationBell from "./NotificationBell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  const role = (session.user as { role?: string }).role;
  if (!["ANALYST","ADMIN","SUPER_ADMIN"].includes(role ?? "")) redirect("/portal");

  const navGroups = [
    {
      label: "Overview",
      items: [
        { href: "/admin", label: "Dashboard", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
      ]
    },
    {
      label: "CRM",
      items: [
        { href: "/admin/leads", label: "Leads", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" },
        { href: "/admin/clients", label: "Clients", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
      ]
    },
    {
      label: "Work",
      items: [
        { href: "/admin/engagements", label: "Engagements", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        { href: "/admin/calculations", label: "Calculations", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
        { href: "/admin/invoices", label: "Invoices", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 17h.01" },
      ]
    },
    {
      label: "Compliance",
      items: [
        { href: "/admin/rules", label: "Rules Registry", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
        { href: "/admin/legal-updates", label: "Legal Updates", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
        { href: "/admin/audit", label: "Audit Log", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
      ]
    },
  ];

  const userEmail = (session.user as { email?: string }).email;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shadow-sm flex-shrink-0 print:hidden">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs tracking-tight">CP</span>
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm leading-tight">CreditPath</div>
              <div className="text-xs text-slate-400 leading-tight">R&D Tax Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <AdminNav />

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-700 font-semibold text-xs">{userEmail?.[0]?.toUpperCase() ?? "U"}</span>
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-slate-700 truncate">{userEmail}</div>
              <div className="text-xs text-slate-400">{role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-8 flex-shrink-0">
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-xs text-slate-500">System online</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
