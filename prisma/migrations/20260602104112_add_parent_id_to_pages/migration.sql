-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE INDEX "Page_parentId_idx" ON "Page"("parentId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
