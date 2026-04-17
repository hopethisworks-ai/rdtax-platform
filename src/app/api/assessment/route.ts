import { NextRequest, NextResponse } from "next/server";
import { sendNewLeadAlert } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, industry } = body;
    if (!name || !company || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const lead = await prisma.lead.create({
      data: {
        companyName: company,
        contactName: name,
        email,
        phone: phone || null,
        industry: industry || null,
        state: "SC",
        leadSource: body.leadSource ?? "homepage",
        referringCpaName: body.referringCpaName ?? null,
        referringCpaFirm: body.referringCpaFirm ?? null,
        referringCpaEmail: body.referringCpaEmail ?? null,
        status: "NEW",
      },
    });
    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@alexanderblake.com";
      try { await sendNewLeadAlert(adminEmail, lead.id, lead.companyName); } catch(e) { console.error("[Email] lead alert failed:", e); }
      return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
