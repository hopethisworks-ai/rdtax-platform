import Link from "next/link";
import EngagementNav from "../EngagementNav";
import SupplyImport from "./SupplyImport";

export default async function ImportSuppliesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="max-w-4xl mx-auto">
      <EngagementNav id={id} />
      <div className="mb-6">
        <Link href={`/admin/engagements/${id}`} className="text-sm text-blue-600 hover:underline">Back to Engagement</Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Import Supply Data</h1>
        <p className="text-slate-500 text-sm mt-1">Upload a CSV to import supply and prototype expenses for this engagement.</p>
      </div>
      <SupplyImport engagementId={id} />
    </div>
  );
}
