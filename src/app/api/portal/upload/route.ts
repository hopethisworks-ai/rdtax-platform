import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadFile, generateStorageKey } from "@/lib/storage";
import { sendUploadReceived } from "@/lib/email";
import { notifyAdmins } from "@/lib/notify";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string }).id;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const client = await prisma.client.findFirst({ where: { userId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const engagementId = formData.get("engagementId") as string;
    const category = formData.get("category") as string || "OTHER";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // Verify the engagement belongs to this client
    if (engagementId) {
      const engagement = await prisma.engagement.findFirst({
        where: { id: engagementId, clientId: client.id },
      });
      if (!engagement) {
        return NextResponse.json({ error: "Engagement not found" }, { status: 403 });
      }
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) return NextResponse.json({ error: "File too large. Maximum size is 50MB." }, { status: 400 });

    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed. Please upload PDF, Excel, CSV, Word, or image files." }, { status: 400 });
    }

    // Upload to cloud storage (S3 or Supabase)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const storageKey = generateStorageKey(client.id, engagementId || "general", file.name);
    const storagePath = await uploadFile(storageKey, buffer, file.type);

    const uploaded = await prisma.uploadedFile.create({
      data: {
        clientId: client.id,
        engagementId: engagementId || null,
        originalName: file.name,
        storagePath,
        mimeType: file.type,
        sizeBytes: file.size,
        category: category as "PAYROLL_EXPORT" | "GENERAL_LEDGER" | "TRIAL_BALANCE" | "CONTRACTOR_INVOICE" | "CONTRACTOR_AGREEMENT" | "ORG_CHART" | "TAX_RETURN" | "PRIOR_STUDY" | "PROJECT_LIST" | "TECHNICAL_DOCUMENT" | "FINANCIAL_STATEMENT" | "OTHER",
        status: "NEEDS_REVIEW",
        uploadedBy: userId,
        tags: [],
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@creditpath.com";
    try { await sendUploadReceived(adminEmail, client.companyName, file.name); } catch(e) { console.error("[Email] upload alert failed:", e); }
    await notifyAdmins(
      "upload_received",
      "New Document Uploaded",
      `${client.companyName} uploaded "${file.name}"`,
      { clientId: client.id, engagementId: engagementId || null, fileId: uploaded.id }
    );
    return NextResponse.json({ success: true, fileId: uploaded.id, fileName: file.name });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed" }, { status: 500 });
  }
}
