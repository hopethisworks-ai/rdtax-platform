-- AlterTable
ALTER TABLE "Engagement" ADD COLUMN     "referralFeeAmount" DECIMAL(10,2),
ADD COLUMN     "referralFeePaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "referralFeePaidAt" TIMESTAMP(3),
ADD COLUMN     "referralFeeStructure" TEXT,
ADD COLUMN     "referralSource" TEXT,
ADD COLUMN     "referringCpaEmail" TEXT,
ADD COLUMN     "referringCpaFirm" TEXT,
ADD COLUMN     "referringCpaName" TEXT;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "referringCpaEmail" TEXT,
ADD COLUMN     "referringCpaFirm" TEXT,
ADD COLUMN     "referringCpaName" TEXT;
