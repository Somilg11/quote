-- Page: collaboration snapshot + external-write version counter
ALTER TABLE "Page" ADD COLUMN "ydoc" BYTEA;
ALTER TABLE "Page" ADD COLUMN "ydocSeq" BIGINT NOT NULL DEFAULT 0;
ALTER TABLE "Page" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 0;

-- Append-only Yjs update log
CREATE TABLE "PageUpdate" (
    "seq" BIGSERIAL NOT NULL,
    "pageId" TEXT NOT NULL,
    "update" BYTEA NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageUpdate_pkey" PRIMARY KEY ("seq")
);

CREATE INDEX "PageUpdate_pageId_seq_idx" ON "PageUpdate"("pageId", "seq");
CREATE INDEX "PageUpdate_createdAt_idx" ON "PageUpdate"("createdAt");

ALTER TABLE "PageUpdate" ADD CONSTRAINT "PageUpdate_pageId_fkey"
    FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Ephemeral presence
CREATE TABLE "PagePresence" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PagePresence_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PagePresence_pageId_userId_key" ON "PagePresence"("pageId", "userId");
CREATE INDEX "PagePresence_pageId_updatedAt_idx" ON "PagePresence"("pageId", "updatedAt");

ALTER TABLE "PagePresence" ADD CONSTRAINT "PagePresence_pageId_fkey"
    FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- MCP / API personal access tokens
CREATE TABLE "ApiToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ApiToken_tokenHash_key" ON "ApiToken"("tokenHash");
CREATE INDEX "ApiToken_userId_idx" ON "ApiToken"("userId");

ALTER TABLE "ApiToken" ADD CONSTRAINT "ApiToken_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
