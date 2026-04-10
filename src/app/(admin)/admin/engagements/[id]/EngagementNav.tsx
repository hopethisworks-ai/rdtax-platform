"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EngagementNav({ id }: { id: string }) {
  const pathname = usePathname();
  const tabs = [
    { href: `/admin/engagements/${id}`, label: "Overview", exact: true },
    { href: `/admin/engagements/${id}/import`, label: "Payroll" },
    { href: `/admin/engagements/${id}/import-contractors`, label: "Contractors" },
    { href: `/admin/engagements/${id}/import-supplies`, label: "Supplies" },
    { href: `/admin/engagements/${id}/projects`, label: "Components" },
    { href: `/admin/engagements/${id}/calculate`, label: "Calculate" },
    { href: `/admin/engagements/${id}/report`, label: "Report" },
  ];

  return (
    <div className="flex gap-1 border-b border-slate-200 mb-6 overflow-x-auto">
      {tabs.map(tab => {
        const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
        return (
          <Link key={tab.href} href={tab.href} className={"px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors " + (active ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300")}>
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
