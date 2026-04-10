import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2025-02-24.acacia" });

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig ?? "", process.env.STRIPE_WEBHOOK_SECRET ?? "");
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    await prisma.invoice.updateMany({
      where: { stripeInvoiceId: invoice.id },
      data: { status: "PAID", paidAt: new Date() },
    });
    await logAudit({ action: "PAY_INVOICE", entityType: "Invoice", entityId: invoice.id, metadata: { stripeInvoiceId: invoice.id } });
  }

  return NextResponse.json({ received: true });
}
