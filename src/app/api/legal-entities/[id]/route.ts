import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";

const UpdateLegalEntitySchema = z.object({
  operatesInSC: z.boolean().optional(),
  // SC state credit inputs – fraction (0–1) and dollar amount.
  stateSourceQrePct: z.number().min(0).max(1).nullable().optional(),
  stateTaxLiabilityAfterOtherCredits: z.number().min(0).nullable().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;

  const { id } = await params;

  const entity = await prisma.legalEntity.findUnique({ where: { id } });
  if (!entity) return NextResponse.json({ error: "Legal entity not found" }, { status: 404 });

  const body = await req.json();
  const parsed = UpdateLegalEntitySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { operatesInSC, stateSourceQrePct, stateTaxLiabilityAfterOtherCredits } = parsed.data;

  await prisma.$executeRaw`
    UPDATE "LegalEntity"
    SET
      "operatesInSC"                       = COALESCE(${operatesInSC ?? null}::boolean, "operatesInSC"),
      "stateSourceQrePct"                  = ${stateSourceQrePct ?? null},
      "stateTaxLiabilityAfterOtherCredits" = ${stateTaxLiabilityAfterOtherCredits ?? null},
      "updatedAt"                          = NOW()
    WHERE id = ${id}
  `;

  await logAudit({
    userId: (session!.user as { id?: string }).id,
    action: "UPDATE_ENGAGEMENT",
    entityType: "LegalEntity",
    entityId: id,
    metadata: { stateSourceQrePct, stateTaxLiabilityAfterOtherCredits },
  });

  return NextResponse.json({ success: true });
}
