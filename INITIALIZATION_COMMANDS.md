# Project Initialization Commands

All commands have already been executed. Below are the exact commands used to set up this project:

## Step 1: Create Next.js 16 Project (Already Done)
```bash
npx create-next-app@latest
```
Configuration:
- TypeScript: Yes
- Tailwind CSS: Yes
- App Router: Yes
- Turbopack: Yes (default)

## Step 2: Install Core Dependencies
```bash
pnpm add prisma @prisma/client next-auth @auth/prisma-adapter bcryptjs @liveblocks/client @liveblocks/react @liveblocks/react-ui @liveblocks/react-tiptap @tiptap/react @tiptap/pm @tiptap/starter-kit nodemailer resend
```

## Step 3: Install TipTap Extensions for Real-Time Editing
```bash
pnpm add @tiptap/extension-placeholder @tiptap/extension-link @tiptap/extension-underline @tiptap/extension-collaboration @tiptap/extension-collaboration-cursor yjs y-protocols y-websocket y-indexeddb
```

## Step 4: Install Liveblocks Node SDK
```bash
pnpm add @liveblocks/node
```

## Step 5: Install Prisma Adapter for PostgreSQL
```bash
pnpm add @prisma/adapter-pg pg
```

## Step 6: Initialize Prisma (Already Done)
```bash
npx prisma init --datasource-provider postgresql
```

## Step 7: Generate Prisma Client
```bash
npx prisma generate
```

## Step 8: Run Database Migration
```bash
npx prisma migrate dev --name init
```

This created all the database tables in your Neon PostgreSQL instance.

## Complete Prisma Schema

Located at `prisma/schema.prisma`:

```prisma
// This is your Prisma schema file

generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// Auth.js models
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Core models
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?   // For email/password auth
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts           Account[]
  sessions           Session[]
  workspaces         Workspace[]
  workspaceMemberships WorkspaceMember[]
  pages              Page[]

  @@index([email])
}

model Workspace {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  ownerId     String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  owner    User                @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  members  WorkspaceMember[]
  pages    Page[]
  invites  WorkspaceInvite[]

  @@index([ownerId])
}

model WorkspaceMember {
  id          String   @id @default(cuid())
  userId      String
  workspaceId String
  role        String   @default("member") // "owner", "member"
  joinedAt    DateTime @default(now())

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([userId, workspaceId])
  @@index([userId])
  @@index([workspaceId])
}

model WorkspaceInvite {
  id          String   @id @default(cuid())
  email       String
  workspaceId String
  token       String   @unique
  expiresAt   DateTime
  createdAt   DateTime @default(now())

  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([email, workspaceId])
  @@index([workspaceId])
}

model Page {
  id          String   @id @default(cuid())
  title       String   @default("Untitled")
  slug        String
  content     String?  @default("") // Stores HTML or JSON from TipTap
  icon        String?  @default("📄")
  workspaceId String
  createdById String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  createdBy User      @relation(fields: [createdById], references: [id], onDelete: SetNull)

  @@unique([workspaceId, slug])
  @@index([workspaceId])
  @@index([createdById])
}
```

## Environment Variables Set

In `.env.local`:

```
DATABASE_URL="postgresql://neondb_owner:npg_0FhSrw4sTMWY@ep-damp-shadow-aoiqiwve-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="IjuiUD13Z9T3cumBBhqIuD+SeEkgar3XuKf2q1cdM2I="
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY="pk_placeholder" (← Need to update)
LIVEBLOCKS_SECRET_KEY="sk_placeholder" (← Need to update)
RESEND_API_KEY="re_placeholder" (← Optional)
```

## Build Command
```bash
pnpm build
```

## Development Server
```bash
pnpm dev
```

Server runs on `http://localhost:3000`

## Key Files Created

### Authentication & Core Logic
- `lib/auth.ts` - NextAuth configuration
- `lib/prisma.ts` - Prisma client singleton
- `components/providers/session-provider.tsx` - NextAuth session provider
- `components/providers/liveblocks-provider.tsx` - Liveblocks configuration

### API Routes
- `app/api/auth/[...nextauth]/route.ts` - Auth routes
- `app/api/auth/signup/route.ts` - User registration
- `app/api/workspaces/route.ts` - Create workspace
- `app/api/workspaces/[id]/pages/route.ts` - Create page
- `app/api/pages/[id]/route.ts` - Update page
- `app/api/invites/route.ts` - Workspace invitations
- `app/api/liveblocks-auth/route.ts` - Liveblocks auth token

### Pages & Components
- `app/page.tsx` - Landing page
- `app/auth/signin/page.tsx` - Sign-in page
- `app/auth/signup/page.tsx` - Sign-up page
- `app/workspaces/page.tsx` - Workspaces list
- `app/workspaces/new/page.tsx` - Create workspace form
- `app/workspaces/[id]/page.tsx` - Workspace overview
- `app/workspaces/[id]/pages/new/page.tsx` - Create page form
- `app/workspaces/[id]/pages/[pageId]/page.tsx` - Page editor
- `components/editor/collaborative-editor.tsx` - TipTap editor
- `components/workspace/page-editor.tsx` - Editor UI wrapper
- `components/workspace/sidebar.tsx` - Workspace sidebar
- `components/workspace/workspace-switcher.tsx` - Workspace switcher

## Build Output

```
✓ Compiled successfully
✓ Generating static pages (11/11)

Route (app)
├ ○ /
├ ○ /_not-found
├ ƒ /api/auth/[...nextauth]
├ ƒ /api/auth/signup
├ ƒ /api/invites
├ ƒ /api/liveblocks-auth
├ ƒ /api/pages/[id]
├ ƒ /api/workspaces
├ ƒ /api/workspaces/[id]/pages
├ ○ /auth/signin
├ ○ /auth/signup
├ ƒ /workspaces
├ ƒ /workspaces/[id]
├ ƒ /workspaces/[id]/pages/[pageId]
├ ƒ /workspaces/[id]/pages/new
└ ○ /workspaces/new

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Next: Configure Liveblocks

1. Go to https://liveblocks.io and create a free account
2. Create a new project
3. Copy your public and secret API keys
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY="pk_xxxxxxxxxxxx"
   LIVEBLOCKS_SECRET_KEY="sk_xxxxxxxxxxxx"
   ```
5. Restart the dev server

That's it! Your Notion alternative is ready to go!
