/**
 * PATCH /api/invoices/[id]       – update status (send, void, mark paid)
 * DELETE /api/invoices/[id]      – delete draft invoice
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";
import { sendInvoiceDue } from "@/lib/email";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { client: { include: { user: true } } },
  });
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  const updated = await prisma.invoice.update({
    where: { id },
    data: {
      status,
      ...(status === "PAID" ? { paidAt: new Date() } : {}),
    },
  });

  // Send email when invoice is marked SENT
  if (status === "SENT" && invoice.client.user?.email) {
    try {
      await sendInvoiceDue(
        invoice.client.user.email,
        invoice.client.companyName,
        id,
        Number(invoice.totalAmount)
      );
    } catch (e) {
      console.error("[Email] invoice send failed:", e);
    }
  }

  await logAudit({
    userId: (session!.user as { id: string }).id,
    action: "UPDATE_INVOICE_STATUS",
    entityType: "Invoice",
    entityId: id,
    metadata: { status, previousStatus: invoice.status },
  });

  return NextResponse.json({ invoice: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;

  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (invoice.status !== "DRAFT") return NextResponse.json({ error: "Only draft invoices can be deleted" }, { status: 400 });

  await prisma.invoice.delete({ where: { id } });
  await logAudit({
    userId: (session!.user as { id: string }).id,
    action: "DELETE_INVOICE",
    entityType: "Invoice",
    entityId: id,
  });

  return NextResponse.json({ ok: true });
}
