-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "fundedResearch" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "internalUseSoftware" BOOLEAN NOT NULL DEFAULT false;
