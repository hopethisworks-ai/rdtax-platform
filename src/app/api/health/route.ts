import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  // Health check requires ADMIN role — no sensitive info leaked to public
  const { error } = await requireAuth("ADMIN", req);
  if (error) {
    // Return a minimal public health check (no sensitive details)
    return NextResponse.json({ status: "ok" });
  }

  const checks: Record<string, string> = {};

  // Only show presence (SET/MISSING), never values or lengths
  checks.NEXTAUTH_URL = process.env.NEXTAUTH_URL ? "SET" : "MISSING";
  checks.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? "SET" : "MISSING";
  checks.DATABASE_URL = process.env.DATABASE_URL ? "SET" : "MISSING";
  checks.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ? "SET" : "MISSING";
  checks.STORAGE_PROVIDER = process.env.STORAGE_PROVIDER ? "SET" : "MISSING";
  checks.SUPABASE_URL = process.env.SUPABASE_URL ? "SET" : "MISSING";
  checks.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "MISSING";
  checks.RESEND_API_KEY = process.env.RESEND_API_KEY ? "SET" : "MISSING";

  // Check database connection (no counts or user details)
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "CONNECTED";
  } catch (err) {
    checks.database = "FAILED";
  }

  const allGood = !Object.values(checks).some(v => v === "MISSING" || v === "FAILED");

  return NextResponse.json({ status: allGood ? "healthy" : "issues_detected", checks });
}
