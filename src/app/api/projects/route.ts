import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { engagementId, name, description, businessComponent, objective } = body;
    if (!engagementId || !name) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const project = await prisma.project.create({
      data: { engagementId, name, description, businessComponent, objective }
    });
    return NextResponse.json(project);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
