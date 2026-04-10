-- AlterTable: add SC state credit input fields to LegalEntity
-- stateSourceQrePct: fraction of total QRE attributable to SC activities
-- stateTaxLiabilityAfterOtherCredits: SC tax liability used for 50% cap calculation
ALTER TABLE "LegalEntity"
  ADD COLUMN "stateSourceQrePct"                  DECIMAL(5,4),
  ADD COLUMN "stateTaxLiabilityAfterOtherCredits" DECIMAL(15,2);
