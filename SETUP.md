# Notion Alternative - Real-Time Collaborative Editing Platform

A minimal Notion alternative focused exclusively on real-time collaborative editing with a modern, minimalist UI built with Geist typography and zinc-based colors.

## Project Initialization

The project has been successfully initialized with the following tech stack:
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom Geist typography
- **Authentication**: NextAuth.js v4 with email/password and Prisma adapter
- **Real-Time Collaboration**: Liveblocks + TipTap rich-text editor
- **Database**: PostgreSQL (Neon) with Prisma 7 ORM
- **UI Components**: shadcn/ui (new-york style)

## Database Schema

The Prisma schema includes the following models:

```
- User (with email/password auth)
- Account, Session, VerificationToken (NextAuth.js models)
- Workspace (isolated collaboration spaces)
- WorkspaceMember (manages workspace access with roles)
- WorkspaceInvite (email-based invitations with tokens)
- Page (unlimited pages per workspace with real-time editing)
```

### Key Files Created:
- `prisma/schema.prisma` - Complete database schema
- `prisma/migrations/` - Database migration history
- `prisma.config.ts` - Prisma v7 configuration with PG adapter

## Authentication Setup

### Configuration Files:
- `lib/auth.ts` - NextAuth.js configuration with credentials provider
- `app/api/auth/[...nextauth]/route.ts` - Auth route handler
- `app/api/auth/signup/route.ts` - Custom signup API endpoint
- `components/providers/session-provider.tsx` - Client-side session wrapper

### Auth Flow:
1. Users sign up with email and password (hashed with bcryptjs)
2. Users sign in with credentials provider
3. Sessions managed by NextAuth.js with Prisma adapter
4. Protected routes redirect to `/auth/signin`

### Pages:
- `/auth/signin` - Sign-in form
- `/auth/signup` - Registration form

## Liveblocks Integration

### Setup:
- `app/api/liveblocks-auth/route.ts` - Token endpoint for Liveblocks
- `components/providers/liveblocks-provider.tsx` - Liveblocks provider wrapper
- `components/editor/collaborative-editor.tsx` - TipTap editor with Liveblocks
- Room format: `workspace-{workspaceId}-page-{pageId}`

### Environment Variables Required:
- `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` - Liveblocks public key
- `LIVEBLOCKS_SECRET_KEY` - Liveblocks secret key

**To get these keys:**
1. Sign up at https://liveblocks.io
2. Create a new project
3. Copy the public and secret keys to `.env.local`

## Workspace Management

### Features:
- Users can create isolated workspaces
- Workspace owners can invite collaborators via email
- Email-based invitations with 7-day expiry
- Members have roles (owner, member)
- Unlimited pages per workspace

### API Routes:
- `POST /api/workspaces` - Create workspace
- `POST /api/workspaces/{id}/pages` - Create page
- `GET /api/pages/{id}` - Fetch page
- `PATCH /api/pages/{id}` - Update page content/title
- `POST /api/invites` - Send workspace invite
- `GET /api/invites?token={token}` - Verify invite

### Pages:
- `/workspaces` - List user's workspaces
- `/workspaces/new` - Create new workspace
- `/workspaces/{id}` - Workspace overview
- `/workspaces/{id}/pages/new` - Create new page
- `/workspaces/{id}/pages/{pageId}` - Page editor with real-time collab

## Real-Time Collaboration

### Features:
- Live cursors with presence awareness
- Instant content syncing via Liveblocks
- Rich-text editing with TipTap
- Automatic conflict resolution via CRDT (Yjs)
- Member activity indicators
- Workspace member list with avatars

### Supported Formatting:
- Bold, italic, underline
- Headings (H1-H6)
- Lists (ordered, unordered)
- Code blocks
- Links
- Quotes

## UI/Design System

### Typography:
- Font Family: Geist (sans) and Geist Mono
- Responsive scaling
- Optimized line heights for readability

### Color Palette:
All colors derived from zinc with careful contrast:
- `bg-background` - White (light mode), dark zinc (dark mode)
- `text-foreground` - Dark zinc (light mode), white (dark mode)
- `border` - Zinc-200/zinc-900
- Accent: Pure black/white for primary actions

### Components:
- shadcn/ui buttons, inputs, dropdowns
- Custom card layouts
- Minimalist borders and spacing

## Project Structure

```
/app
  /api
    /auth
      /[...nextauth]       # Auth routes
      /signup              # Signup endpoint
    /invites              # Invitation API
    /liveblocks-auth      # Liveblocks token endpoint
    /pages
      /[id]               # Page update API
    /workspaces
      /[id]
        /pages            # Page creation API
  /auth
    /signin               # Sign-in page
    /signup               # Sign-up page
  /workspaces
    /[id]
      /pages
        /[pageId]         # Editor with Liveblocks
        /new              # New page form
  layout.tsx              # Root layout with providers
  page.tsx                # Landing page

/components
  /editor
    /collaborative-editor.tsx   # TipTap + Liveblocks
  /workspace
    /page-editor.tsx           # Editor UI wrapper
    /sidebar.tsx               # Page sidebar
    /workspace-switcher.tsx    # Workspace dropdown
  /providers
    /liveblocks-provider.tsx    # Liveblocks wrapper
    /session-provider.tsx       # NextAuth session wrapper

/lib
  /generated/prisma       # Prisma client
  /auth.ts               # NextAuth config
  /prisma.ts             # Prisma client singleton

/prisma
  /schema.prisma         # Database schema
  /migrations            # Migration history
```

## Environment Variables

Required `.env.local` file:

```
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require&channel_binding=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="(securely generated)"

# Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY="pk_xxxx"
LIVEBLOCKS_SECRET_KEY="sk_xxxx"

# Email (optional, for invitations)
RESEND_API_KEY="re_xxxx"
```

The `NEXTAUTH_SECRET` has been generated and set to: `IjuiUD13Z9T3cumBBhqIuD+SeEkgar3XuKf2q1cdM2I=`

## Starting the Application

### Development:
```bash
pnpm dev
```
The app will be available at http://localhost:3000

### Production Build:
```bash
pnpm build
pnpm start
```

## Database Setup

The Prisma schema has been created and migrations have been run. The database tables are ready for use.

To re-generate the Prisma client after schema changes:
```bash
npx prisma generate
```

To create new migrations:
```bash
npx prisma migrate dev --name migration_name
```

## Key Features Summary

✅ **User Authentication**: Email/password auth with secure hashing
✅ **Workspaces**: Isolated collaboration spaces with ownership
✅ **Real-Time Editing**: TipTap editor with Liveblocks synchronization
✅ **Collaboration**: Live cursors, presence awareness, instant syncing
✅ **Invitations**: Email-based workspace invitations (7-day expiry)
✅ **Unlimited Pages**: Create as many pages as needed per workspace
✅ **Modern UI**: Minimalist design with Geist typography and zinc colors
✅ **Type Safety**: Full TypeScript implementation
✅ **Responsive**: Mobile-first responsive design

## Constraints Enforced

❌ No databases/tables within pages (spreadsheet-like data not supported)
❌ No kanban boards
❌ No calendars
❌ Focus exclusively on rich-text collaborative editing

## Next Steps

1. **Configure Liveblocks**:
   - Sign up at liveblocks.io
   - Create a project
   - Add public/secret keys to `.env.local`

2. **Test Authentication**:
   - Visit http://localhost:3000/auth/signup
   - Create an account
   - Sign in and create a workspace

3. **Test Collaboration**:
   - Create a page in a workspace
   - Invite a team member via their email
   - Open the same page in two windows to see real-time updates

4. **Deploy**:
   - Push to GitHub
   - Deploy via Vercel (recommended)
   - Set environment variables in Vercel project settings

## Support

For issues with:
- **Liveblocks**: https://docs.liveblocks.io
- **NextAuth.js**: https://next-auth.js.org
- **Prisma**: https://www.prisma.io/docs
- **Next.js**: https://nextjs.org/docs
