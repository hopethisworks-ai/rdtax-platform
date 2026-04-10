/**
 * API route tests – POST /api/engagements/[id]/calculate
 *
 * Verifies auth enforcement, 404 handling, method selection, and that the
 * Prisma calculation record is created with the right shape.
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockSession = { user: { id: "analyst-1", email: "a@test.com", role: "ANALYST" } };

jest.mock("@/lib/rbac", () => ({
  requireAuth: jest.fn(),
}));

jest.mock("@/lib/audit", () => ({
  logAudit: jest.fn().mockResolvedValue(undefined),
}));

const mockEngagement = {
  id: "eng-1",
  taxYear: 2024,
  ruleVersionId: "rv-1",
  status: "ANALYSIS",
  legalEntity: { id: "le-1" }, // no SC fields yet
  ruleVersion: {
    creditRates: {
      ascRate: 0.14,
      ascFallbackRate: 0.06,
      regularRate: 0.20,
      contractorQrePct: 0.65,
      scRate: 0.05,
    },
  },
  projects: [
    {
      id: "proj-1",
      employees: [
        { compensation: 100000, qualifiedActivityPct: 0.8, qreAmount: null, excluded: false },
      ],
      supplies: [{ amount: 10000 }],
      contractors: [{ amount: 50000, qualifiedAmount: null }],
    },
  ],
};

jest.mock("@/lib/prisma", () => ({
  prisma: {
    engagement: {
      findUnique: jest.fn(),
      update: jest.fn().mockResolvedValue({}),
    },
    priorYearQre: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    grossReceiptsHistory: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    calculation: {
      create: jest.fn(),
    },
    auditLog: {
      create: jest.fn().mockResolvedValue({}),
    },
  },
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function makePostRequest(url: string, body: unknown): NextRequest {
  return new NextRequest(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/engagements/[id]/calculate", () => {
  const { requireAuth } = require("@/lib/rbac");
  const { prisma } = require("@/lib/prisma");

  beforeEach(() => jest.clearAllMocks());

  it("returns 401 when not authenticated", async () => {
    requireAuth.mockResolvedValue({ error: new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }) });

    const { POST } = await import("@/app/api/engagements/[id]/calculate/route");
    const res = await POST(
      makePostRequest("http://localhost/api/engagements/eng-1/calculate", {}),
      { params: Promise.resolve({ id: "eng-1" }) }
    );

    expect(res.status).toBe(401);
  });

  it("returns 404 when engagement does not exist", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.engagement.findUnique.mockResolvedValue(null);

    const { POST } = await import("@/app/api/engagements/[id]/calculate/route");
    const res = await POST(
      makePostRequest("http://localhost/api/engagements/missing/calculate", {}),
      { params: Promise.resolve({ id: "missing" }) }
    );

    expect(res.status).toBe(404);
  });

  it("returns 400 when engagement has no rule version", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.engagement.findUnique.mockResolvedValue({ ...mockEngagement, ruleVersion: null, ruleVersionId: null });

    const { POST } = await import("@/app/api/engagements/[id]/calculate/route");
    const res = await POST(
      makePostRequest("http://localhost/api/engagements/eng-1/calculate", {}),
      { params: Promise.resolve({ id: "eng-1" }) }
    );

    expect(res.status).toBe(400);
  });

  it("creates a calculation record and defaults to ASC when no prior years", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.engagement.findUnique.mockResolvedValue(mockEngagement);
    prisma.priorYearQre.findMany.mockResolvedValue([]);   // no prior data → ASC fallback
    prisma.grossReceiptsHistory.findMany.mockResolvedValue([]);
    prisma.calculation.create.mockResolvedValue({ id: "calc-1" });

    const { POST } = await import("@/app/api/engagements/[id]/calculate/route");
    const res = await POST(
      makePostRequest("http://localhost/api/engagements/eng-1/calculate", { c280cElection: false }),
      { params: Promise.resolve({ id: "eng-1" }) }
    );

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.calculationId).toBe("calc-1");

    // With no prior years, the ASC fallback (6 %) should be used.
    const createCall = prisma.calculation.create.mock.calls[0][0].data;
    expect(createCall.ascFallbackUsed).toBe(true);
    expect(createCall.method).toBe("ASC");
  });

  it("picks REGULAR method when explicitly requested and data is available", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.engagement.findUnique.mockResolvedValue(mockEngagement);
    prisma.priorYearQre.findMany.mockResolvedValue([
      { taxYear: 2023, qreAmount: 200000 },
      { taxYear: 2022, qreAmount: 150000 },
      { taxYear: 2021, qreAmount: 100000 },
    ]);
    prisma.grossReceiptsHistory.findMany.mockResolvedValue([
      { taxYear: 2023, amount: 2000000 },
      { taxYear: 2022, amount: 1800000 },
      { taxYear: 2021, amount: 1600000 },
      { taxYear: 2020, amount: 1400000 },
    ]);
    prisma.calculation.create.mockResolvedValue({ id: "calc-2" });

    const { POST } = await import("@/app/api/engagements/[id]/calculate/route");
    const res = await POST(
      makePostRequest("http://localhost/api/engagements/eng-1/calculate", {
        method: "REGULAR",
        c280cElection: false,
      }),
      { params: Promise.resolve({ id: "eng-1" }) }
    );

    expect(res.status).toBe(200);
    const createCall = prisma.calculation.create.mock.calls[0][0].data;
    expect(createCall.method).toBe("REGULAR");
    expect(createCall.ascFallbackUsed).toBe(false);
  });

  it("applies 280C reduction when elected", async () => {
    requireAuth.mockResolvedValue({ session: mockSession, error: null });
    prisma.engagement.findUnique.mockResolvedValue(mockEngagement);
    prisma.priorYearQre.findMany.mockResolvedValue([]);
    prisma.grossReceiptsHistory.findMany.mockResolvedValue([]);
    prisma.calculation.create.mockResolvedValue({ id: "calc-3" });

    const { POST } = await import("@/app/api/engagements/[id]/calculate/route");
    await POST(
      makePostRequest("http://localhost/api/engagements/eng-1/calculate", { c280cElection: true }),
      { params: Promise.resolve({ id: "eng-1" }) }
    );

    const createCall = prisma.calculation.create.mock.calls[0][0].data;
    // reducedCredit should be ~79 % of grossCredit (1 - 0.21 = 0.79)
    expect(createCall.reducedCredit).toBeCloseTo(createCall.grossCredit * 0.79, 2);
  });
});
