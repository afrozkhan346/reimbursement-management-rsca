# Reimbursement Management App

A role-based reimbursement platform built with Next.js, TypeScript, and Prisma.

The app supports complete expense lifecycle management:

- Employee expense submission
- Multi-step conditional approvals (percentage, specific role, hybrid)
- Manager/admin approval actions
- Admin settings for workflow and user management
- Currency conversion and OCR-assisted receipt parsing

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Prisma ORM + PostgreSQL
- Tailwind CSS 4
- JWT auth via `jose` (HTTP-only cookie session)
- Zod validation
- Tesseract.js for OCR

## Core Features

### Role-Based Workspaces

- `EMPLOYEE`: submit expenses, review personal expense statuses, profile
- `MANAGER`: process approvals, monitor team/company expenses
- `ADMIN`: full manager permissions + company/workflow/user administration

### Approval Engine

- Sequential step-based approvals
- Rule types:
	- `PERCENTAGE` (example: 60% of approvers)
	- `SPECIFIC_ROLE` (example: specific person/department)
	- `HYBRID` (percentage OR specific role)
- Automatic progression across steps
- Immediate rejection handling

### Expense Processing

- Expense categories and validation
- Currency conversion (base-currency views)
- Receipt OCR endpoint for extracting amount/date/description/category

## Project Structure

```text
src/
	app/
		api/                 # Next.js route handlers
	components/            # UI components by role
	lib/                   # auth, prisma, schemas, approval engine, currency
prisma/
	schema.prisma          # data model
	seed.ts                # optional Prisma seed script
```

Note: there is also a `backend/` directory in this repository, but the current active app flow is implemented in `src/` + `prisma/` (Next.js API routes with Prisma).

## Data Model Overview

Main entities:

- `Company`
- `User` (self-referencing manager relationship)
- `Expense`
- `ApprovalRule`
- `ExpenseApprovalQueue`

Enums include `Role`, `ExpenseStatus`, `ExpenseCategory`, `ApprovalRuleType`, and `ApprovalAction`.

## Environment Variables

Create `.env` in the project root with:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
JWT_SECRET="replace-with-a-strong-secret"
```

Example for free local development:

```env
DATABASE_URL="postgresql://postgres:YOUR_LOCAL_PASSWORD@localhost:5432/reimbursement_db?schema=public"
JWT_SECRET="replace-with-a-strong-secret"
```

Notes:

- `JWT_SECRET` has a development fallback in code, but set it explicitly for real environments.
- `DATABASE_URL` is required by Prisma.

## Local Development Setup

### 0. Install PostgreSQL (free, local)

Windows (winget):

```bash
winget install -e --id PostgreSQL.PostgreSQL.16 --accept-package-agreements --accept-source-agreements --silent
```

Create a local DB named `reimbursement_db` and set `DATABASE_URL` in `.env`.

### 1. Install dependencies

```bash
npm install
```

### 2. Initialize database

```bash
npx prisma generate
npx prisma db push
```

### 3. Run the app

```bash
npm run dev
```

Open http://localhost:3000

### 4. Seed sample data (optional but recommended)

Run:

```bash
npm run db:seed
```

Sample seeded accounts (password: `DemoPass123!`):

- admin@acme.com (`ADMIN`)
- manager@acme.com (`MANAGER`)
- employee@acme.com (`EMPLOYEE`)

## API Overview

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Domain APIs

- `GET, POST /api/expenses`
- `POST /api/approvals`
- `GET, POST, DELETE /api/approval-rules`
- `GET, POST /api/users`
- `GET, PATCH /api/company`
- `GET /api/currencies`
- `POST /api/ocr`
- `GET /api/seed`

Most non-auth routes are protected by middleware and require the auth cookie.

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - start built app
- `npm run lint` - run ESLint
- `npm run db:seed` - seed local database with demo company/users/rules/expenses

## Branching Workflow

For this repository, feature work is commonly pushed to `rushikesh` and then merged into `main`.

Example:

```bash
git checkout rushikesh
git add .
git commit -m "docs: update project README"
git push origin rushikesh
```

## Production Notes

- Use a strong `JWT_SECRET`.
- Run with a managed PostgreSQL instance.
- Restrict `GET /api/seed` access or remove it in production.
- Configure HTTPS so secure auth cookies work correctly.
