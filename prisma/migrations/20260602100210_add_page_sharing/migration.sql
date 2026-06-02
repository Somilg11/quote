/*
  Warnings:

  - A unique constraint covering the columns `[shareToken]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "shareToken" TEXT,
ADD COLUMN     "shareType" TEXT NOT NULL DEFAULT 'private';

-- CreateIndex
CREATE UNIQUE INDEX "Page_shareToken_key" ON "Page"("shareToken");

-- CreateIndex
CREATE INDEX "Page_shareToken_idx" ON "Page"("shareToken");
