-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "aiOperatingHours" TEXT NOT NULL DEFAULT 'Always Active (24/7)',
ADD COLUMN     "aiTone" TEXT NOT NULL DEFAULT 'Friendly';
