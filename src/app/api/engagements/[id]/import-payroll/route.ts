import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth("ANALYST", req);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await req.json();
    const { employees } = body;

    const engagement = await prisma.engagement.findUnique({
      where: { id },
      select: { legalEntityId: true },
    });
    if (!engagement?.legalEntityId) {
      return NextResponse.json({ error: "Engagement has no legal entity" }, { status: 400 });
    }

    const created = await Promise.all(
      employees.map((emp: {
        name: string;
        title?: string;
        employeeId?: string;
        compensation: number;
        bonus?: number;
        bonusIncluded?: boolean;
        qualifiedActivityPct?: number;
      }) =>
        prisma.employee.create({
          data: {
            legalEntityId: engagement.legalEntityId as string,
            name: emp.name,
            title: emp.title || null,
            employeeId: emp.employeeId || null,
            compensation: emp.compensation,
            bonus: emp.bonus || null,
            bonusIncluded: emp.bonusIncluded || false,
            qualifiedActivityPct: emp.qualifiedActivityPct || 0.5,
            methodologyBasis: "project-estimate",
          },
        })
      )
    );

    return NextResponse.json({ imported: created.length, employees: created });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
