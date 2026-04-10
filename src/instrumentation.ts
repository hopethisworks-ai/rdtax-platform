/**
 * Next.js instrumentation hook – runs once when the server process starts.
 * Use this file for eager startup checks that should fail fast before any
 * request is served. See: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Only run validation in the Node.js runtime (not in the Edge runtime).
  if (process.env.NEXT_RUNTIME === "nodejs") {
    validateEnv();
  }
}

function validateEnv() {
  const errors: string[] = [];

  // ── ENCRYPTION_KEY ───────────────────────────────────────────────────────
  const key = process.env.ENCRYPTION_KEY ?? "";
  if (!key) {
    errors.push("ENCRYPTION_KEY is not set. Field-level PII encryption will not work.");
  } else if (key.length !== 64) {
    errors.push(
      `ENCRYPTION_KEY must be exactly 64 hex characters (32 bytes). ` +
      `Current length: ${key.length}. Generate one with: openssl rand -hex 32`
    );
  } else if (!/^[0-9a-fA-F]{64}$/.test(key)) {
    errors.push("ENCRYPTION_KEY contains non-hex characters. It must be a 64-char hex string.");
  }

  // ── NEXTAUTH_SECRET ──────────────────────────────────────────────────────
  if (!process.env.NEXTAUTH_SECRET) {
    errors.push("NEXTAUTH_SECRET is not set. Session signing will not work.");
  } else if (process.env.NEXTAUTH_SECRET.length < 32) {
    errors.push("NEXTAUTH_SECRET is too short (< 32 chars). Generate with: openssl rand -base64 32");
  }

  // ── DATABASE_URL ─────────────────────────────────────────────────────────
  if (!process.env.DATABASE_URL) {
    errors.push("DATABASE_URL is not set.");
  }

  // ── PORT SANITY CHECK ────────────────────────────────────────────────────
  // Warn if NEXTAUTH_URL or APP_URL use a different port than the server is
  // actually running on (default 3001 per package.json).
  const appUrl = process.env.APP_URL ?? "";
  const nextAuthUrl = process.env.NEXTAUTH_URL ?? "";
  if (appUrl && nextAuthUrl && appUrl !== nextAuthUrl) {
    console.warn(
      `[startup] APP_URL (${appUrl}) and NEXTAUTH_URL (${nextAuthUrl}) differ. ` +
      `OAuth redirects and email links may be broken.`
    );
  }

  if (errors.length > 0) {
    const message = [
      "",
      "╔══════════════════════════════════════════════════════════╗",
      "║  SERVER STARTUP FAILED — missing / invalid configuration  ║",
      "╚══════════════════════════════════════════════════════════╝",
      ...errors.map((e) => `  ✗ ${e}`),
      "",
    ].join("\n");

    // In production, crash immediately so a misconfigured deployment is
    // caught before any traffic is served.  In development, log loudly but
    // continue so engineers can still reach the app to debug other issues.
    if (process.env.NODE_ENV === "production") {
      throw new Error(message);
    } else {
      console.error(message);
    }
  }
}
