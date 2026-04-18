import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    totalLeads, newLeads, activeEngagements, pendingUploads,
    unresolvedOverrides, pendingLegalUpdates, recentLeads, recentEngagements,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.engagement.count({ where: { status: { notIn: ["DELIVERED","ARCHIVED"] } } }),
    prisma.uploadedFile.count({ where: { status: "NEEDS_REVIEW" } }),
    prisma.calculationOverride.count({ where: { approvalStatus: "PENDING" } }),
    prisma.legalUpdateRecord.count({ where: { implemented: false, isMandatory: true } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.engagement.findMany({
      where: { status: { notIn: ["DELIVERED","ARCHIVED"] } },
      include: { client: { select: { companyName: true } } },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "New Leads", value: newLeads, sub: `${totalLeads} total`, href: "/admin/leads", accent: "blue" },
    { label: "Active Engagements", value: activeEngagements, sub: "in progress", href: "/admin/engagements", accent: "indigo" },
    { label: "Files to Review", value: pendingUploads, sub: "awaiting review", href: "/admin/uploads", accent: "amber" },
    { label: "Pending Overrides", value: unresolvedOverrides, sub: "need approval", href: "/admin/calculations", accent: "rose" },
    { label: "Legal Alerts", value: pendingLegalUpdates, sub: "mandatory", href: "/admin/legal-updates", accent: "purple" },
  ];

  const accentMap: Record<string, { card: string; num: string; badge: string }> = {
    blue:   { card: "border-blue-200 hover:border-blue-300",   num: "text-blue-700",   badge: "bg-blue-50" },
    indigo: { card: "border-indigo-200 hover:border-indigo-300", num: "text-indigo-700", badge: "bg-indigo-50" },
    amber:  { card: "border-primary/20 hover:border-primary/30",  num: "text-primary",  badge: "bg-surface" },
    rose:   { card: "border-rose-200 hover:border-rose-300",    num: "text-rose-700",   badge: "bg-rose-50" },
    purple: { card: "border-purple-200 hover:border-purple-300", num: "text-purple-700", badge: "bg-purple-50" },
  };

  const engStatusColors: Record<string, string> = {
    INTAKE: "bg-gray-100 text-body-text",
    DATA_COLLECTION: "bg-surface text-primary",
    ANALYSIS: "bg-blue-50 text-blue-700",
    CALCULATION: "bg-violet-50 text-violet-700",
    REVIEW: "bg-orange-50 text-orange-700",
    DOCUMENTATION: "bg-indigo-50 text-indigo-700",
    FINAL_REPORT: "bg-surface text-primary",
    DELIVERED: "bg-green-50 text-green-700",
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy tracking-tight">Dashboard</h1>
        <p className="text-sm text-secondary mt-1">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => {
          const a = accentMap[s.accent];
          return (
            <Link key={s.label} href={s.href} className={`bg-white border rounded-xl p-5 transition-all hover:shadow-md ${a.card}`}>
              <div className={`text-3xl font-bold mb-1 ${a.num}`}>{s.value}</div>
              <div className="text-sm font-medium text-navy leading-tight">{s.label}</div>
              <div className="text-xs text-secondary mt-1">{s.sub}</div>
            </Link>
          );
        })}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-navy text-sm">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-blue-600 hover:text-blue-700 font-medium">View all →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex justify-between items-center px-6 py-3 hover:bg-gray-50 transition-colors">
                <div>
                  <Link href={`/admin/leads/${lead.id}`} className="text-sm font-medium text-navy hover:text-blue-600">{lead.companyName}</Link>
                  <div className="text-xs text-secondary mt-0.5">{lead.contactName}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${lead.status === "NEW" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-body-text"}`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Engagements */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-navy text-sm">Active Engagements</h2>
            <Link href="/admin/engagements" className="text-xs text-blue-600 hover:text-blue-700 font-medium">View all →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentEngagements.map((eng) => (
              <div key={eng.id} className="flex justify-between items-center px-6 py-3 hover:bg-gray-50 transition-colors">
                <div>
                  <Link href={`/admin/engagements/${eng.id}`} className="text-sm font-medium text-navy hover:text-blue-600">{eng.client.companyName}</Link>
                  <div className="text-xs text-secondary mt-0.5">Tax Year {eng.taxYear}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${engStatusColors[eng.status] ?? "bg-gray-100 text-body-text"}`}>
                  {eng.status.replace(/_/g," ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
