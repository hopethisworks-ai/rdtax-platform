/**
 * Directly sets admin password hash in the database.
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/reset-admin-password.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({ log: ["error"] });

async function main() {
  const email = "admin@rdtaxdemo.com";
  const newPassword = "Admin123!demo";

  console.log(`\nResetting password for ${email}...`);
  const hash = await bcrypt.hash(newPassword, 10);
  console.log(`Generated hash: ${hash.slice(0, 20)}...`);

  await prisma.user.update({
    where: { email },
    data: { passwordHash: hash, active: true },
  });

  console.log("✓ Password updated in database");

  // Verify immediately
  const user = await prisma.user.findUnique({ where: { email } });
  const valid = await bcrypt.compare(newPassword, user!.passwordHash!);
  console.log(valid ? "✅ Verified – login will work now" : "❌ Verification failed");
}

main().finally(() => prisma.$disconnect());
