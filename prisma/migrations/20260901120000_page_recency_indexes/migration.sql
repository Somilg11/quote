-- Page lists are always "newest first", per workspace or across all of them.
CREATE INDEX "Page_workspaceId_updatedAt_idx" ON "Page"("workspaceId", "updatedAt");
CREATE INDEX "Page_updatedAt_idx" ON "Page"("updatedAt");
