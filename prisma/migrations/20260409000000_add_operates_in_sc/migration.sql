-- AlterTable: add SC operations flag to LegalEntity
-- Controls whether the SC §12-6-3375 credit is applicable to this entity.
ALTER TABLE "LegalEntity"
  ADD COLUMN "operatesInSC" BOOLEAN NOT NULL DEFAULT false;
