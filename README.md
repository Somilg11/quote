# ✨ Quote

> A collaborative, real-time workspace inspired by Notion.

Quote is a modern document collaboration platform that enables users to create, edit, organize, and collaborate on documents in real time. Built with Next.js, Liveblocks, TipTap, Prisma, and PostgreSQL, it provides a seamless editing experience with multi-user collaboration, authentication, document management, and workspace organization.

---

## 🚀 Features

### 📝 Rich Text Editor

* Powered by TipTap
* Headings, Lists, Links, Underline
* Placeholder support
* Slash commands
* Document formatting

### 🤝 Real-Time Collaboration

* Live multi-user editing
* Cursor presence indicators
* Shared document synchronization
* Conflict-free updates using Yjs

### 🔐 Authentication & Authorization

* Secure user authentication
* Session management
* Protected routes
* Role-based document access

### 📂 Document Management

* Create documents
* Edit documents
* Delete documents
* Organize workspace
* Persistent document storage

### 🌙 Modern User Experience

* Responsive Design
* Accessible UI Components
* Keyboard-friendly interactions

### ⚡ Performance

* Server Components
* Optimized Rendering
* Real-time Syncing
* Fast Database Queries

---

# 🏗️ Tech Stack

## Frontend

| Technology         | Purpose               |
| ------------------ | --------------------- |
| ⚛️ React 19        | UI Development        |
| ▲ Next.js 16       | Fullstack Framework   |
| 🎨 Tailwind CSS v4 | Styling               |
| 🧩 Radix UI        | Accessible Components |
| 🖼️ Lucide Icons   | Icon System           |
| 🌗 Next Themes     | Theme Management      |
| 📊 Recharts        | Analytics & Charts    |
| 🎭 Sonner          | Toast Notifications   |

---

## Backend

| Technology                | Purpose              |
| ------------------------- | -------------------- |
| 🟢 Next.js Server Actions | Backend Logic        |
| 🔐 NextAuth               | Authentication       |
| 🗄️ Prisma ORM            | Database Access      |
| 🐘 PostgreSQL             | Database             |
| 📧 Nodemailer             | Email Services (Gmail SMTP) |

---

## Collaboration Layer

| Technology     | Purpose                 |
| -------------- | ----------------------- |
| 🤝 Liveblocks  | Real-Time Collaboration |
| 🧠 Yjs         | CRDT Sync Engine        |
| 🌐 y-websocket | Document Sync           |
| 💾 y-indexeddb | Offline Persistence     |

---

## Forms & Validation

| Technology            | Purpose            |
| --------------------- | ------------------ |
| 📋 React Hook Form    | Form Handling      |
| ✅ Zod                 | Validation         |
| 🔍 Hookform Resolvers | Schema Integration |

---

## Developer Tooling

| Technology    | Purpose             |
| ------------- | ------------------- |
| 📘 TypeScript | Type Safety         |
| 🧹 ESLint     | Code Quality        |
| 📦 PostCSS    | CSS Processing      |
| ⚙️ Prisma CLI | Database Migrations |

---

# 📁 Project Structure

```bash
quote/
│
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── documents/
│   └── api/
│
├── components/
│   ├── editor/
│   ├── ui/
│   ├── sidebar/
│   └── shared/
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── liveblocks.ts
│   └── utils.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│
├── styles/
│
├── hooks/
│
├── types/
│
└── middleware.ts
```

---

# ⚙️ Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/your-username/quote.git

cd quote
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

Using yarn:

```bash
yarn
```

---

## 3. Configure Environment Variables

Create:

```bash
.env
```

Example:

```env
DATABASE_URL=

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

LIVEBLOCKS_SECRET_KEY=

# Generate App-Specific Password at: https://myaccount.google.com/apppasswords
GMAIL_EMAIL=
GMAIL_APP_PASSWORD=
```

---

## 4. Setup Database

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

## 5. Start Development Server

```bash
npm run dev
```

Application will be available at:

```bash
http://localhost:3000
```

---

# 🗄️ Database

Prisma ORM is used for database management.

Generate client:

```bash
npx prisma generate
```

Create migration:

```bash
npx prisma migrate dev --name init
```

Reset database:

```bash
npx prisma migrate reset
```

Open Studio:

```bash
npx prisma studio
```

---

# 🔒 Authentication

Authentication is powered by:

* NextAuth
* Prisma Adapter
* PostgreSQL Session Storage

Supported features:

* Sign Up
* Sign In
* Session Persistence
* Route Protection
* User Management

---

# 🤝 Real-Time Collaboration

Quote leverages:

* Liveblocks
* Yjs
* TipTap Collaboration Extensions

Capabilities include:

* Live cursor tracking
* Presence awareness
* Shared editing
* Document synchronization
* Offline-first persistence

---

# 📜 Available Scripts

Run development server:

```bash
npm run dev
```

Build production app:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Run linter:

```bash
npm run lint
```

---

# 🚀 Deployment

Recommended platforms:

### Vercel

```bash
vercel
```

### Docker

```bash
docker build -t quote .
docker run -p 3000:3000 quote
```

### Self Hosted

```bash
npm run build
npm run start
```

---

# 🧪 Future Enhancements

* AI-powered document generation
* Workspace sharing
* Team collaboration
* Comments & Mentions
* Version History
* Document Templates
* Export to PDF
* AI Assistant
* Knowledge Base Search
* Mobile Application

---

# 🤝 Contributing

We welcome contributions from the community!

## Fork Repository

Click the Fork button on GitHub.

## Create Feature Branch

```bash
git checkout -b feature/amazing-feature
```

## Make Changes

Follow project coding standards and lint rules.

## Commit Changes

```bash
git commit -m "feat: add amazing feature"
```

## Push Branch

```bash
git push origin feature/amazing-feature
```

## Open Pull Request

Create a Pull Request describing:

* What was changed
* Why it was changed
* Screenshots (if applicable)

---

# 📏 Contribution Guidelines

### Code Style

* Use TypeScript
* Follow ESLint rules
* Use meaningful variable names
* Write reusable components
* Keep components modular

### Commit Convention

```bash
feat: add new feature
fix: resolve issue
docs: update documentation
refactor: improve code structure
style: formatting changes
chore: maintenance tasks
```

---

# 🐛 Reporting Issues

Found a bug?

Please open an issue including:

* Expected behavior
* Actual behavior
* Steps to reproduce
* Screenshots
* Environment details

---

# 📄 License

This project is licensed under the MIT License.

```text
MIT License © 2026 Quote
```

---

# ⭐ Support

If you find this project useful:

* Star the repository ⭐
* Share it with others 🚀
* Contribute improvements 💙

---

Built with ❤️ using Next.js, Prisma, Liveblocks, TipTap, and PostgreSQL.
