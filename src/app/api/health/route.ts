import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const checks: Record<string, string> = {};

  // 1. Check critical env vars
  checks.NEXTAUTH_URL = process.env.NEXTAUTH_URL ? `SET (${process.env.NEXTAUTH_URL})` : "MISSING";
  checks.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? `SET (${process.env.NEXTAUTH_SECRET.length} chars)` : "MISSING";
  checks.DATABASE_URL = process.env.DATABASE_URL ? "SET" : "MISSING";
  checks.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ? `SET (${process.env.ENCRYPTION_KEY.length} chars)` : "MISSING";
  checks.STORAGE_PROVIDER = process.env.STORAGE_PROVIDER ?? "NOT SET";
  checks.SUPABASE_URL = process.env.SUPABASE_URL ? "SET" : "MISSING";
  checks.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "MISSING";
  checks.RESEND_API_KEY = process.env.RESEND_API_KEY ? "SET" : "MISSING";
  checks.APP_URL = process.env.APP_URL ?? "NOT SET";

  // 2. Check database connection
  try {
    const userCount = await prisma.user.count();
    checks.database = `CONNECTED (${userCount} users)`;
  } catch (err) {
    checks.database = `FAILED: ${err instanceof Error ? err.message : "Unknown error"}`;
  }

  // 3. Check admin user specifically
  try {
    const admin = await prisma.user.findUnique({
      where: { email: "admin@rdtaxdemo.com" },
      select: { id: true, role: true, active: true, passwordHash: true },
    });
    if (admin) {
      checks.adminUser = `FOUND (role: ${admin.role}, active: ${admin.active}, hasPassword: ${!!admin.passwordHash})`;
    } else {
      checks.adminUser = "NOT FOUND";
    }
  } catch (err) {
    checks.adminUser = `ERROR: ${err instanceof Error ? err.message : "Unknown"}`;
  }

  const allGood = !Object.values(checks).some(v => v.includes("MISSING") || v.includes("FAILED") || v === "NOT FOUND");

  return NextResponse.json({
    status: allGood ? "healthy" : "issues_detected",
    checks,
  });
}
