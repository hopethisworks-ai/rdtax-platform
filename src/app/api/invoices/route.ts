/**
 * GET  /api/invoices           – list invoices (analyst+)
 * POST /api/invoices           – create a new invoice (analyst+)
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";
import { z } from "zod";

const CreateInvoiceSchema = z.object({
  clientId: z.string(),
  engagementId: z.string().optional(),
  engagementFee: z.number().positive(),
  contingencyFee: z.number().optional(),
  auditSupportFee: z.number().optional(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  lineItems: z.array(z.object({ description: z.string(), amount: z.number() })).optional(),
});

export async function GET(req: NextRequest) {
  const { error } = await requireAuth("ANALYST", req);
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");
  const status = searchParams.get("status");

  const invoices = await prisma.invoice.findMany({
    where: {
      ...(clientId ? { clientId } : {}),
      ...(status ? { status: status as "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "VOID" } : {}),
    },
    include: { client: { select: { companyName: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ invoices });
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;

  const body = await req.json();
  const parsed = CreateInvoiceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { clientId, engagementId, engagementFee, contingencyFee, auditSupportFee, dueDate, notes, lineItems } = parsed.data;

  const totalAmount = engagementFee + (contingencyFee ?? 0) + (auditSupportFee ?? 0);

  const defaultLineItems = [
    { description: "Engagement Fee", amount: engagementFee },
    ...(contingencyFee ? [{ description: "Contingency Fee", amount: contingencyFee }] : []),
    ...(auditSupportFee ? [{ description: "Audit Support Fee", amount: auditSupportFee }] : []),
    ...(lineItems ?? []),
  ];

  const invoice = await prisma.invoice.create({
    data: {
      clientId,
      engagementId: engagementId || null,
      engagementFee,
      contingencyFee: contingencyFee ?? null,
      auditSupportFee: auditSupportFee ?? null,
      totalAmount,
      dueDate: dueDate ? new Date(dueDate) : null,
      notes: notes ?? null,
      lineItems: defaultLineItems,
      status: "DRAFT",
    },
    include: { client: { select: { companyName: true } } },
  });

  await logAudit({
    userId: (session!.user as { id: string }).id,
    action: "CREATE_INVOICE",
    entityType: "Invoice",
    entityId: invoice.id,
    metadata: { clientId, totalAmount },
  });

  return NextResponse.json({ invoice }, { status: 201 });
}
