import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  const { error } = await requireAuth("ANALYST", req);
  if (error) return error;
  const versions = await prisma.taxRuleVersion.findMany({ orderBy: { taxYear: "desc" } });
  return NextResponse.json({ versions });
}

const CreateRuleSchema = z.object({
  version: z.string(),
  taxYear: z.number().int(),
  federalRuleVersion: z.string(),
  stateRuleVersion: z.string().optional(),
  formVersion: z.string(),
  creditRates: z.object({
    ascRate: z.number().default(0.14),
    ascFallbackRate: z.number().default(0.06),
    regularRate: z.number().default(0.20),
    contractorQrePct: z.number().default(0.65),
    scRate: z.number().default(0.05),
  }),
  carryforwardRules: z.object({ federalYears: z.number().default(20), scYears: z.number().default(10) }),
  payrollOffsetCap: z.number(),
  c280cPresentationLogic: z.object({ regularTaxRate: z.number().default(0.21) }),
  groupReportingLogic: z.record(z.unknown()).default({}),
  disclosureRequirements: z.record(z.unknown()).default({}),
  ascFallbackRules: z.record(z.unknown()).default({}),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("SUPER_ADMIN", req);
  if (error) return error;
  const body = await req.json();
  const parsed = CreateRuleSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  // Destructure the ISO-string date fields so the spread doesn't include the
  // string versions when we override them with Date objects below.
  // The rest object's Json fields need "as unknown as ..." because Zod infers
  // specific shapes while Prisma expects InputJsonValue.
  const { effectiveFrom, effectiveTo, ...rest } = parsed.data;
  const version = await prisma.taxRuleVersion.create({
    data: {
      ...(rest as unknown as Parameters<typeof prisma.taxRuleVersion.create>[0]["data"]),
      effectiveFrom: new Date(effectiveFrom),
      effectiveTo: effectiveTo ? new Date(effectiveTo) : undefined,
    },
  });
  await logAudit({ userId: (session!.user as { id?: string }).id, action: "CREATE_TAX_RULE", entityType: "TaxRuleVersion", entityId: version.id });
  return NextResponse.json({ version }, { status: 201 });
}
