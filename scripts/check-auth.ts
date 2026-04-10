/**
 * Diagnostic script – checks whether admin login credentials are valid.
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/check-auth.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({ log: ["error"] });

async function main() {
  const email = "admin@rdtaxdemo.com";
  const password = "Admin123!demo";

  console.log(`\nChecking user: ${email}`);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.log("❌ User NOT found in database");
    return;
  }

  console.log("✓ User found");
  console.log(`  id:           ${user.id}`);
  console.log(`  role:         ${user.role}`);
  console.log(`  active:       ${user.active}`);
  console.log(`  passwordHash: ${user.passwordHash ? "SET (" + user.passwordHash.slice(0, 20) + "...)" : "NULL ← THIS IS THE PROBLEM"}`);

  if (!user.passwordHash) {
    console.log("\n❌ passwordHash is null – re-run db:seed to fix");
    return;
  }

  if (!user.active) {
    console.log("\n❌ User is inactive (active = false)");
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (valid) {
    console.log("\n✅ Password matches – login should work");
  } else {
    console.log("\n❌ Password does NOT match stored hash");
    console.log("   Re-run db:seed to reset the hash");
  }
}

main().finally(() => prisma.$disconnect());
