import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CreateClientButton from "./CreateClientButton";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      engagements: { select: { id: true } },
      legalEntities: { select: { id: true } },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{clients.length} total</span>
          <CreateClientButton />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Company","Contact","Email","Industry","State","Engagements","Status","Created"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/clients/${c.id}`} className="font-medium text-gray-900 hover:text-blue-600">{c.companyName}</Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{c.contactName}</td>
                <td className="px-4 py-3 text-gray-600">{c.email}</td>
                <td className="px-4 py-3 text-gray-600">{c.industry ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{c.state ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{c.engagements.length}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {c.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  <Link href={`/admin/clients/${c.id}`} className="hover:text-blue-600">{new Date(c.createdAt).toLocaleDateString()}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clients.length === 0 && <div className="p-8 text-center text-gray-500">No clients found.</div>}
      </div>
    </div>
  );
}
