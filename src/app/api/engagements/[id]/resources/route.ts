import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const engagement = await prisma.engagement.findUnique({
      where: { id },
      select: { legalEntityId: true },
    });
    if (!engagement?.legalEntityId) return NextResponse.json({ employees: [], contractors: [], supplies: [] });
    const [employees, contractors, supplies] = await Promise.all([
      prisma.employee.findMany({ where: { legalEntityId: engagement.legalEntityId }, orderBy: { name: "asc" } }),
      prisma.contractorItem.findMany({ where: { legalEntityId: engagement.legalEntityId }, orderBy: { vendorName: "asc" } }),
      prisma.supplyItem.findMany({ where: { legalEntityId: engagement.legalEntityId }, orderBy: { description: "asc" } }),
    ]);
    return NextResponse.json({ employees, contractors, supplies });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
