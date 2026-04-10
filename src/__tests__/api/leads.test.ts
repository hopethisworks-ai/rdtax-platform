/**
 * API route tests – /api/leads and /api/leads/[id]/convert
 *
 * Strategy: mock Prisma, requireAuth, and logAudit so the route logic runs
 * in isolation without a real database or auth session.
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockSession = { user: { id: "user-1", email: "analyst@test.com", role: "ANALYST" } };

jest.mock("@/lib/rbac", () => ({
  requireAuth: jest.fn(),
}));

jest.mock("@/lib/audit", () => ({
  logAudit: jest.fn().mockResolvedValue(undefined),
}));

// Resend initialises eagerly at module load and throws without a real API key.
// Mock both the lib wrapper and the SDK itself (convert/route.ts uses it directly).
jest.mock("@/lib/email", () => ({
  sendLeadConfirmation: jest.fn().mockResolvedValue(undefined),
  sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
  sendUploadReceived: jest.fn().mockResolvedValue(undefined),
  sendPasswordReset: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: "email-1" }) },
  })),
}));

const txMock = {
  client: { create: jest.fn() },
  legalEntity: { create: jest.fn() },
  taxRuleVersion: { findFirst: jest.fn().mockResolvedValue(null) },
  engagement: { create: jest.fn() },
  lead: { update: jest.fn().mockResolvedValue({}) },
  auditLog: { create: jest.fn().mockResolvedValue({}) },
};

jest.mock("@/lib/prisma", () => ({
  prisma: {
    lead: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    client: {
      create: jest.fn(),
      update: jest.fn().mockResolvedValue({}),
    },
    legalEntity: { create: jest.fn() },
    taxRuleVersion: { findFirst: jest.fn().mockResolvedValue(null) },
    engagement: { create: jest.fn() },
    user: {
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      update: jest.fn().mockResolvedValue({}),
    },
    auditLog: {
      create: jest.fn().mockResolvedValue({}),
    },
    $transaction: jest.fn(),
  },
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeRequest(method: string, url: string, body?: unknown): NextRequest {
  return new NextRequest(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
}

// ── Tests: GET /api/leads ─────────────────────────────────────────────────────

describe("GET /api/leads", () => {
  const { requireAuth } = require("@/lib/rbac");
  const { prisma } = require("@/lib/prisma");

  beforeEach(() => jest.clearAllMocks());

  it("returns 401 when not authenticated", async () => {
    requireAuth.mockResolvedValue({ error: new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }) });

    const { GET } = await import("@/app/api/leads/route");
    const res = await GET(makeRequest("GET", "http://localhost/api/leads"));

    expect(res.status).toBe(401);
  });

  it("returns leads list for authenticated analyst", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.lead.findMany.mockResolvedValue([
      { id: "lead-1", companyName: "Acme", status: "NEW", createdAt: new Date() },
    ]);

    const { GET } = await import("@/app/api/leads/route");
    const res = await GET(makeRequest("GET", "http://localhost/api/leads"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.leads).toHaveLength(1);
    expect(data.leads[0].companyName).toBe("Acme");
  });
});

// ── Tests: POST /api/leads ────────────────────────────────────────────────────

describe("POST /api/leads", () => {
  const { requireAuth } = require("@/lib/rbac");
  const { prisma } = require("@/lib/prisma");

  beforeEach(() => jest.clearAllMocks());

  it("returns 400 when required fields are missing", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });

    const { POST } = await import("@/app/api/leads/route");
    const res = await POST(makeRequest("POST", "http://localhost/api/leads", {
      companyName: "Acme",
      // missing contactName, email
    }));

    expect(res.status).toBe(400);
  });

  it("creates a lead and returns 201", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });

    const newLead = {
      id: "lead-2",
      companyName: "NewCo",
      contactName: "Jane Doe",
      email: "jane@newco.com",
      status: "NEW",
      createdAt: new Date(),
    };
    prisma.lead.create.mockResolvedValue(newLead);

    const { POST } = await import("@/app/api/leads/route");
    const res = await POST(makeRequest("POST", "http://localhost/api/leads", {
      companyName: "NewCo",
      contactName: "Jane Doe",
      email: "jane@newco.com",
    }));
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.lead.companyName).toBe("NewCo");
    expect(prisma.lead.create).toHaveBeenCalledTimes(1);
  });
});

// ── Tests: POST /api/leads/[id]/convert ──────────────────────────────────────

describe("POST /api/leads/[id]/convert", () => {
  const { requireAuth } = require("@/lib/rbac");
  const { prisma } = require("@/lib/prisma");

  beforeEach(() => jest.clearAllMocks());

  it("returns 404 when lead does not exist", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.lead.findUnique.mockResolvedValue(null);

    const { POST } = await import("@/app/api/leads/[id]/convert/route");
    const res = await POST(
      makeRequest("POST", "http://localhost/api/leads/missing/convert"),
      { params: Promise.resolve({ id: "missing" }) }
    );

    expect(res.status).toBe(404);
  });

  it("returns 400 if lead is already converted", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.lead.findUnique.mockResolvedValue({
      id: "lead-3",
      companyName: "Done Corp",
      contactName: "Bob",
      email: "bob@done.com",
      status: "SIGNED",
      convertedToClientId: "existing-client-id",
    });

    const { POST } = await import("@/app/api/leads/[id]/convert/route");
    const res = await POST(
      makeRequest("POST", "http://localhost/api/leads/lead-3/convert"),
      { params: Promise.resolve({ id: "lead-3" }) }
    );

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/already converted/i);
  });

  it("converts a lead to a client and returns 201", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.lead.findUnique.mockResolvedValue({
      id: "lead-4",
      companyName: "Prospect Inc",
      contactName: "Alice",
      email: "alice@prospect.com",
      phone: null,
      state: "SC",
      industry: "Technology",
      status: "QUALIFIED",
      convertedToClientId: null,
      leadSource: null,
      referringCpaName: null,
      referringCpaFirm: null,
      referringCpaEmail: null,
    });

    // Wire up $transaction to execute the callback using the txMock
    const newClient = { id: "client-new", companyName: "Prospect Inc" };
    const newEngagement = { id: "eng-new", taxYear: 2024 };
    txMock.client.create.mockResolvedValue(newClient);
    txMock.legalEntity.create.mockResolvedValue({ id: "le-new" });
    txMock.engagement.create.mockResolvedValue(newEngagement);
    prisma.$transaction.mockImplementation((cb: (tx: typeof txMock) => Promise<unknown>) => cb(txMock));

    // No existing user — route will create one
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: "user-new" });

    const { POST } = await import("@/app/api/leads/[id]/convert/route");
    const res = await POST(
      makeRequest("POST", "http://localhost/api/leads/lead-4/convert", {}),
      { params: Promise.resolve({ id: "lead-4" }) }
    );

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.clientId).toBe("client-new");
    expect(data.engagementId).toBe("eng-new");
    expect(txMock.client.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
  });
});
