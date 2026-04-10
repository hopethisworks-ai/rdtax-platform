/**
 * Role-Based Access Control
 * Middleware helpers for protecting API routes and pages.
 *
 * Uses getToken() instead of getServerSession() for Route Handler auth
 * because Next.js 15 made cookies() async, which breaks getServerSession
 * inside Route Handlers. getToken() reads the JWT directly from the
 * incoming Request object and works reliably in all Next.js 15 contexts.
 */
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export type Role = "PUBLIC" | "CLIENT" | "ANALYST" | "ADMIN" | "SUPER_ADMIN";

const ROLE_HIERARCHY: Record<Role, number> = {
  PUBLIC: 0,
  CLIENT: 1,
  ANALYST: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
};

const VALID_ROLES = new Set<Role>(["PUBLIC", "CLIENT", "ANALYST", "ADMIN", "SUPER_ADMIN"]);

export function hasRole(userRole: Role, requiredRole: Role): boolean {
  // Guard against invalid/unknown role strings that would produce undefined lookups
  if (!VALID_ROLES.has(userRole) || !VALID_ROLES.has(requiredRole)) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Require auth in Route Handlers (API routes).
 * Pass the NextRequest object so we can read the JWT from the cookie directly.
 */
export async function requireAuth(minRole: Role = "CLIENT", req?: NextRequest) {
  let role: Role | null = null;
  let userId: string | null = null;
  let email: string | null = null;

  if (req) {
    // Route Handler path: read JWT directly from request (Next.js 15 compatible)
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
    }
    role = (token.role as Role) ?? "CLIENT";
    userId = (token.userId as string) ?? (token.sub ?? null);
    email = (token.email as string) ?? null;
  } else {
    // Server Component path: use getServerSession (works fine outside Route Handlers)
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
    }
    role = (session.user as { role?: Role }).role ?? "CLIENT";
    userId = (session.user as { id?: string }).id ?? null;
    email = session.user.email ?? null;
  }

  if (!hasRole(role, minRole)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }), session: null };
  }

  // Return a normalised session-like object so callers don't need to change much
  const session = {
    user: { role, id: userId, email },
  };
  return { error: null, session };
}

/**
 * For Server Components and layouts that need the full NextAuth session.
 */
export async function getSession() {
  return getServerSession(authOptions);
}
