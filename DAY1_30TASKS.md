# Day 1 Development Sprint - 30 Micro-Tasks

**Date:** April 4, 2026  
**Goal:** Get product live, database ready, and all core flows tested  
**Sprint Time:** ~12-16 hours (can be split across day)  
**Target Completion:** By EOD April 4

---

## MORNING SESSION (Tasks 1-15) - Auth & Core Features Testing

### Task 1: Environment Verification
**Time:** 5 min  
**Goal:** Confirm local dev environment is ready

```bash
# Run in terminal:
node --version          # Should be v18+
npm --version           # Should be v9+
npx prisma --version    # Should be v7.6+
```

- [ ] All versions acceptable
- [ ] No missing dependencies
- [ ] Continue to Task 2

---

### Task 2: Start Local Dev Server
**Time:** 5 min  
**Goal:** Spin up Next.js development server

```bash
cd d:\Projects\Reimbursement\reimbursement-management-rsca
npm run dev
```

Expected output:
```
> reimbursement-app@0.1.0 dev
> next dev

  ▲ Next.js 16.2.1
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

- [ ] Server started successfully
- [ ] No build errors in console
- [ ] Navigate to http://localhost:3000 in browser
- [ ] Continue to Task 3

---

### Task 3: Test Homepage Load
**Time:** 3 min  
**Goal:** Verify app loads without errors

**Steps:**
1. Open http://localhost:3000 in browser (Chrome/Edge preferred)
2. Check browser console (F12 > Console tab)
3. Look for any red errors

**Expected:**
- Page loads
- No console errors
- See login/signup navigation
- Layout is responsive

**If issues:**
- [ ] Check terminal for build errors
- [ ] Restart `npm run dev`
- [ ] Clear browser cache (Ctrl+Shift+Del)

**Continue:**
- [ ] All good → Task 4

---

### Task 4: Navigate to Signup Page
**Time:** 3 min  
**Goal:** Test signup page accessibility

**Steps:**
1. Homepage should have "Sign Up" link/button
2. Click it → should navigate to `/signup`
3. Verify URL shows `http://localhost:3000/signup`
4. Page should load with form

**Expected form fields:**
- Email input
- Password input (password type, asterisks)
- Confirm Password input
- Submit button
- "Already have account? Login" link

**If issues:**
- [ ] Check [src/app/signup/page.tsx](src/app/signup/page.tsx) exists
- [ ] Verify form renders

**Continue:**
- [ ] Form visible → Task 5

---

### Task 5: Test Signup Form Validation
**Time:** 10 min  
**Goal:** Verify form validation works before submission

**Test Case 1: Empty submission**
- [ ] Leave all fields blank
- [ ] Click Submit
- [ ] Expected: Error message "Email is required" or similar
- [ ] No API call made

**Test Case 2: Invalid email**
- [ ] Email: `notanemail`
- [ ] Password: `Pass123!`
- [ ] Confirm: `Pass123!`
- [ ] Submit
- [ ] Expected: Error "Invalid email format"

**Test Case 3: Weak password**
- [ ] Email: `test@example.com`
- [ ] Password: `123` (too short)
- [ ] Confirm: `123`
- [ ] Submit
- [ ] Expected: Error "Password must be at least 8 characters"

**Test Case 4: Password mismatch**
- [ ] Email: `test@example.com`
- [ ] Password: `Pass123!`
- [ ] Confirm: `Pass456!`
- [ ] Submit
- [ ] Expected: Error "Passwords do not match"

**Continue:**
- [ ] All validations working → Task 6

---

### Task 6: Create Test User #1 (Employee)
**Time:** 5 min  
**Goal:** Create first test account

**Form input:**
- Email: `test.employee@company.com`
- Password: `TestPass123!`
- Confirm: `TestPass123!`
- Click Submit

**Expected:**
- Loading spinner appears
- Toast notification: "Account created successfully" or similar
- Auto-redirect to login page OR dashboard
- No console errors

**If API error:**
- [ ] Check [src/app/api/auth/signup/route.ts](src/app/api/auth/signup/route.ts)
- [ ] Check `.env` variables exist
- [ ] Check Prisma client initialized in [src/lib/prisma.ts](src/lib/prisma.ts)

**Continue:**
- [ ] Account created → Task 7

---

### Task 7: Test Login with Test Account
**Time:** 5 min  
**Goal:** Verify login flow works

**Steps:**
1. You should be on login page (or navigate to `/login`)
2. Enter:
   - Email: `test.employee@company.com`
   - Password: `TestPass123!`
3. Click Login
4. Wait for redirect

**Expected:**
- Loading spinner
- Redirect to employee dashboard
- URL changes to `/dashboard` or similar
- No console errors

**If login fails:**
- [ ] Check credentials are exact (case-sensitive)
- [ ] Check [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts)
- [ ] Verify JWT_SECRET in `.env`

**Continue:**
- [ ] Login successful → Task 8

---

### Task 8: Verify JWT Cookie Set
**Time:** 3 min  
**Goal:** Confirm authentication is stateful

**Steps:**
1. Open DevTools (F12)
2. Go to Application tab → Cookies
3. Look for cookie named something like `auth` or `token`
4. Should be HTTP-only (not visible in JavaScript)
5. Should have Secure + SameSite flags

**Expected:**
- Cookie exists
- Contains JWT (long encoded string)
- Expires at reasonable time (1 day, 7 days, etc.)

**If missing:**
- [ ] Check [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts) for `res.cookies.set()`
- [ ] Verify cookie is set before redirect

**Continue:**
- [ ] Cookie confirmed → Task 9

---

### Task 9: Test Dashboard Load as Employee
**Time:** 5 min  
**Goal:** Verify authenticated page loads

**You should see:**
- Employee dashboard
- Heading: "Employee Dashboard" or "My Expenses"
- Button to create new expense
- Table/list of expenses (may be empty first time)
- User's name/email in header

**Expected components:**
- [src/components/employee/EmployeeDashboard.tsx](src/components/employee/EmployeeDashboard.tsx)
- [src/components/employee/ExpenseTable.tsx](src/components/employee/ExpenseTable.tsx)
- Header with logout button

**If dashboard doesn't load:**
- [ ] Check browser console for errors
- [ ] Verify cookie is present (Task 8)
- [ ] Check API endpoint `/api/auth/me` is working

**Continue:**
- [ ] Dashboard visible → Task 10

---

### Task 10: Test Logout Function
**Time:** 3 min  
**Goal:** Verify logout clears session

**Steps:**
1. Find logout button (usually in header)
2. Click it
3. Should redirect to login page
4. Check cookies tab → auth cookie should be gone

**Expected:**
- Redirect to `/login`
- Cookie cleared
- Session destroyed

**Continue:**
- [ ] Logout works → Task 11

---

### Task 11: Login Again (for Expense Testing)
**Time:** 2 min  
**Goal:** Re-authenticate for next tests

**Steps:**
1. On login page
2. Email: `test.employee@company.com`
3. Password: `TestPass123!`
4. Submit

**Continue:**
- [ ] Back on dashboard → Task 12

---

### Task 12: Locate Expense Form
**Time:** 3 min  
**Goal:** Find and verify expense submission form

**On dashboard, look for:**
- Button labeled "New Expense", "Create Expense", or "Add Expense"
- Click to open form (modal or new page)

**Expected form fields:**
- Amount (number input)
- Category (dropdown or select)
- Description (text input or textarea)
- Receipt (file upload)
- Currency (if multi-currency)
- Date (date picker)
- Submit button

**If form not found:**
- [ ] Check [src/components/employee/ExpenseForm.tsx](src/components/employee/ExpenseForm.tsx)
- [ ] Verify form component rendered on dashboard

**Continue:**
- [ ] Form visible → Task 13

---

### Task 13: Test Expense Form Validation
**Time:** 10 min  
**Goal:** Verify form validation before submission

**Test Case 1: Empty submission**
- [ ] Leave all fields blank
- [ ] Click Submit
- [ ] Expected: Error(s) appear

**Test Case 2: Invalid amount**
- [ ] Amount: `-100` (negative)
- [ ] Expected: Error "Amount must be positive"

**Test Case 3: Missing category**
- [ ] Amount: `150`
- [ ] Category: (empty/not selected)
- [ ] Expected: Error "Category is required"

**Test Case 4: No receipt**
- [ ] Amount: `150`
- [ ] Category: (select any, e.g., "MEALS")
- [ ] Receipt: (empty)
- [ ] Expected: Either error OR allow optional

**Document which fields are required:**
- [ ] Amount: required
- [ ] Category: required
- [ ] Receipt: required or optional?
- [ ] Description: required or optional?

**Continue:**
- [ ] Validations confirmed → Task 14

---

### Task 14: Create Test Expense
**Time:** 5 min  
**Goal:** Submit a valid expense

**Form input:**
- Amount: `75.50`
- Category: `MEALS` (select from dropdown)
- Description: `Team lunch meeting`
- Date: Today's date (auto-filled likely)
- Receipt: (skip for now, can test OCR later)

**Steps:**
1. Fill form
2. Click Submit
3. Wait for API response

**Expected:**
- Toast: "Expense submitted successfully"
- Modal closes OR redirect
- Return to dashboard
- New expense appears in table
- Status: "DRAFT" or "PENDING"

**If submission fails:**
- [ ] Check browser console for error
- [ ] Check [src/app/api/expenses/route.ts](src/app/api/expenses/route.ts)
- [ ] Verify database connection

**Continue:**
- [ ] Expense created → Task 15

---

### Task 15: Verify Expense in Dashboard
**Time:** 3 min  
**Goal:** Confirm expense persists in database

**On dashboard table, look for:**
- Amount: `75.50`
- Category: `MEALS`
- Status: `DRAFT` or `PENDING`
- Date: Today
- Action buttons (Edit, View, Delete)

**Verify:**
- [ ] Expense appears in table
- [ ] Details match what was submitted
- [ ] No console errors
- [ ] Table renders correctly on desktop

**Continue:**
- [ ] ✅ Morning session complete → Start afternoon (Task 16)

---

## AFTERNOON SESSION (Tasks 16-30) - Database & Deployment Setup

### Task 16: Choose PostgreSQL Provider
**Time:** 5 min  
**Goal:** Decide on production database host

**Options (rank by ease + free tier):**

1. **Neon.tech** ⭐ RECOMMENDED
   - Free tier: 0.25 CPU, 3 GB storage, 1 project
   - Supports autoscaling
   - Serverless
   - Go to: https://neon.tech → Sign up

2. **Supabase**
   - Free tier: 500 MB storage, auto-paused after 1 week inactivity
   - PostgreSQL + extras (auth, realtime)
   - Go to: https://supabase.com → Sign up

3. **Railway.app**
   - Pay as you go ($5/month minimum)
   - Simple UI
   - Good for quick deploys

**Decision:**
- [ ] Choose **Neon** (fastest path)
- [ ] Go to https://neon.tech in new tab
- [ ] Keep open for Task 17

---

### Task 17: Create Neon Account & Database
**Time:** 10 min  
**Goal:** Get production database credentials

**In https://neon.tech:**
1. Click "Sign Up" (or "Get Started Free")
2. Create account:
   - Email: your real email
   - Password: strong password
   - Verify email (check inbox)
3. Create first project:
   - Project name: `reimbursement-prod` or similar
   - Region: closest to you (or US East if unsure)
   - Postgres version: 16 (latest)
   - Click Create
4. Wait for database to initialize (1-2 min)

**After creation, you'll see:**
- Database name (usually `neondb`)
- Username (e.g., `neondb_owner`)
- Password (generated, save it!)
- Host (e.g., `ec2-xxx.compute.amazonaws.com`)
- Port: `5432`
- Connection string in format: `postgresql://user:password@host/dbname`

**Action:**
- [ ] Copy full connection string
- [ ] Save to secure location (password manager or .env.local for now)
- [ ] Continue to Task 18

---

### Task 18: Update .env File (Production Credentials)
**Time:** 5 min  
**Goal:** Add production database connection

**Steps:**
1. Open `.env.local` in project root (or create if missing)
2. Find or add:
   ```
   DATABASE_URL="postgresql://neondb_owner:PASSWORD@host.neon.tech/neondb"
   JWT_SECRET="your_jwt_secret_here"
   ```

3. Replace:
   - `neondb_owner` → actual username from Neon
   - `PASSWORD` → actual password from Neon
   - `host.neon.tech` → actual host
   - `neondb` → actual database name
   - `your_jwt_secret_here` → random 32-char string

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy output, use as JWT_SECRET

**Verify:**
- [ ] DATABASE_URL complete and correct
- [ ] JWT_SECRET set (32+ chars, random)
- [ ] .env.local NOT committed to git (.gitignore includes it)

**Save file**

**Continue:**
- [ ] Environment ready → Task 19

---

### Task 19: Stop Local Dev Server
**Time:** 1 min  
**Goal:** Prepare for database migration

**Steps:**
1. In terminal running `npm run dev`
2. Press `Ctrl + C` to stop
3. Wait for confirmation

**Verify:**
- [ ] Server stopped
- [ ] No processes on port 3000
- [ ] Ready to run database commands

**Continue:**
- [ ] Server stopped → Task 20

---

### Task 20: Generate Prisma Client
**Time:** 5 min  
**Goal:** Regenerate Prisma client for production DB

**Steps:**
```bash
npx prisma generate
```

**Expected output:**
```
✔ Prisma Client was successfully generated.
```

**Notes:**
- [ ] Should complete quickly (10-30 sec)
- [ ] Generates TypeScript types from schema.prisma

**If error:**
- [ ] Check schema.prisma for syntax errors
- [ ] Verify Prisma installed: `npm ls prisma`

**Continue:**
- [ ] Client generated → Task 21

---

### Task 21: Push Database Schema to Production
**Time:** 10 min  
**Goal:** Create tables in production database

**Steps:**
```bash
npx prisma db push
```

**Expected output:**
```
✔ Pushed the schema to the database
✔ Created following tables
  - Company
  - User
  - Expense
  - ExpenseApprovalQueue
  - ApprovalRule
  - ExpenseCategory (if it's a table)
```

**What's happening:**
- Reading schema.prisma
- Connecting to Neon database
- Creating tables with proper indexes and relationships
- No data loss (first time, so no existing data)

**If connection error:**
- [ ] Verify DATABASE_URL in .env.local is correct
- [ ] Test connection: `psql DATABASE_URL` (if psql installed)
- [ ] Check Neon dashboard → Project → Connection String

**If schema error:**
- [ ] Check [prisma/schema.prisma](prisma/schema.prisma) for issues
- [ ] Review recent changes on feat/signup-page branch

**Verify success:**
- [ ] All required tables created
- [ ] No errors in console

**Continue:**
- [ ] Schema pushed → Task 22

---

### Task 22: Create Seed Data Script (Part 1 - Setup)
**Time:** 5 min  
**Goal:** Create test data for three companies

**File: [prisma/seed.ts](prisma/seed.ts)**

**Verify file exists:**
- [ ] Check if `prisma/seed.ts` already exists
- [ ] If not, create it

**Add to package.json:**
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "seed": "ts-node prisma/seed.ts"
}
```

Verify:
- [ ] "seed" script added to package.json
- [ ] Save file

**Continue:**
- [ ] Script setup ready → Task 23

---

### Task 23: Create Seed Data Script (Part 2 - Data)
**Time:** 15 min  
**Goal:** Write seed script with test data

**File: [prisma/seed.ts](prisma/seed.ts)**

**Code to add:**

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, comment out to preserve)
  // await prisma.expenseApprovalQueue.deleteMany({});
  // await prisma.approvalRule.deleteMany({});
  // await prisma.expense.deleteMany({});
  // await prisma.user.deleteMany({});
  // await prisma.company.deleteMany({});

  console.log("🌱 Seeding database...");

  // Create companies
  const company1 = await prisma.company.create({
    data: {
      name: "TechCorp Inc",
      baseCurrency: "USD",
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: "GlobalBank Solutions",
      baseCurrency: "EUR",
    },
  });

  const company3 = await prisma.company.create({
    data: {
      name: "HealthPlus Ltd",
      baseCurrency: "GBP",
    },
  });

  console.log("✓ Created 3 companies");

  // Helper function
  const hashPassword = (password: string) =>
    bcrypt.hashSync(password, 10);

  // Create users for TechCorp
  const admin1 = await prisma.user.create({
    data: {
      email: "admin@techcorp.com",
      name: "Alice Admin",
      password: hashPassword("AdminPass123!"),
      role: "ADMIN",
      companyId: company1.id,
    },
  });

  const manager1 = await prisma.user.create({
    data: {
      email: "manager@techcorp.com",
      name: "Bob Manager",
      password: hashPassword("ManagerPass123!"),
      role: "MANAGER",
      companyId: company1.id,
    },
  });

  const emp1 = await prisma.user.create({
    data: {
      email: "emp1@techcorp.com",
      name: "Charlie Employee",
      password: hashPassword("EmpPass123!"),
      role: "EMPLOYEE",
      companyId: company1.id,
      reportsTo: manager1.id,
    },
  });

  const emp2 = await prisma.user.create({
    data: {
      email: "emp2@techcorp.com",
      name: "Diana Employee",
      password: hashPassword("EmpPass123!"),
      role: "EMPLOYEE",
      companyId: company1.id,
      reportsTo: manager1.id,
    },
  });

  // Repeat for company2 and company3 (similar pattern)
  // ... (repeat create for GlobalBank and HealthPlus)

  console.log("✓ Created 15 users across 3 companies");

  // Create sample expenses
  const expense1 = await prisma.expense.create({
    data: {
      amount: 125.5,
      category: "MEALS",
      description: "Team lunch meeting",
      currency: "USD",
      date: new Date("2026-04-01"),
      status: "APPROVED",
      submittedBy: emp1.id,
      companyId: company1.id,
    },
  });

  // ... (create 9 more expenses with various statuses)

  console.log("✓ Created 10 sample expenses");

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Action:**
- [ ] Copy above code into [prisma/seed.ts](prisma/seed.ts)
- [ ] Or update existing seed.ts with this structure
- [ ] Save file

**Continue:**
- [ ] Seed script written → Task 24

---

### Task 24: Run Seed Script
**Time:** 10 min  
**Goal:** Populate production database with test data

**Steps:**
```bash
npm run seed
```

**Expected output:**
```
🌱 Seeding database...
✓ Created 3 companies
✓ Created 15 users across 3 companies
✓ Created 10 sample expenses
✅ Seeding complete!
```

**What just happened:**
- Connected to production Neon database
- Created 3 companies
- Created 15 test users (roles: ADMIN, MANAGER, EMPLOYEE)
- Created 10 sample expenses with various statuses

**If error:**
- [ ] Check DATABASE_URL is production (not local)
- [ ] Check Prisma schema matches seed data types
- [ ] Check bcryptjs is installed: `npm ls bcryptjs`

**Verify in Neon:**
1. Go to Neon dashboard
2. Click "SQL Editor"
3. Run: `SELECT COUNT(*) FROM "User";` → should show 15
4. Run: `SELECT COUNT(*) FROM "Expense";` → should show 10

**Continue:**
- [ ] Data seeded successfully → Task 25

---

### Task 25: Restart Local Dev Server with Production DB
**Time:** 5 min  
**Goal:** Test local app against production database

**Steps:**
```bash
npm run dev
```

**Verify:**
- [ ] Server starts with no errors
- [ ] Console shows "Ready in X.Xs"
- [ ] Navigate to http://localhost:3000

**Continue:**
- [ ] Server ready → Task 26

---

### Task 26: Test Login with Seeded Credentials
**Time:** 5 min  
**Goal:** Verify seed data works

**Steps:**
1. On login page (http://localhost:3000/login)
2. Email: `admin@techcorp.com`
3. Password: `AdminPass123!`
4. Click Login

**Expected:**
- Login successful
- Redirect to dashboard
- See employee/manager/admin dashboard based on role
- See sample expenses in table

**Continue:**
- [ ] Login successful → Task 27

---

### Task 27: Test Different User Roles
**Time:** 10 min  
**Goal:** Verify all three roles work

**Logout first:**
- [ ] Click logout button

**Test Employee:**
- [ ] Email: `emp1@techcorp.com`
- [ ] Password: `EmpPass123!`
- [ ] Expected dashboard: Employee view with their expenses
- [ ] Verify can submit new expense

**Test Manager:**
- [ ] Logout
- [ ] Email: `manager@techcorp.com`
- [ ] Password: `ManagerPass123!`
- [ ] Expected dashboard: Manager view with team expenses
- [ ] Verify can see approval queue

**Test Admin:**
- [ ] Logout
- [ ] Email: `admin@techcorp.com`
- [ ] Password: `AdminPass123!`
- [ ] Expected dashboard: Admin view with company settings
- [ ] Verify can access admin panel

**Verify:**
- [ ] All 3 roles have distinct dashboards
- [ ] All dashboards load without errors
- [ ] Navigation reflects user role

**Continue:**
- [ ] ✅ All roles tested → Task 28

---

### Task 28: Test OCR Receipt Upload (Optional Today)
**Time:** 10 min  
**Goal:** Test receipt image parsing

**Steps:**
1. Login as employee
2. Create new expense
3. In receipt upload field, upload sample receipt image
4. Wait for OCR processing

**Expected:**
- Image appears as preview
- Text extracted from receipt
- Amount/date/merchant auto-filled (if implemented)
- No console errors

**If OCR fails:**
- [ ] Check [src/app/api/ocr/route.ts](src/app/api/ocr/route.ts) exists
- [ ] Check Tesseract.js is installed
- [ ] May need to handle Tesseract worker initialization

**Note:** OCR can be slow first time (downloads model ~100MB), so it's OK if this is slow.

**Continue:**
- [ ] OCR tested (or skipped) → Task 29

---

### Task 29: Take Screenshots of Current State
**Time:** 5 min  
**Goal:** Document working product

**Take screenshots of:**
- [ ] Login page
- [ ] Employee dashboard
- [ ] Manager dashboard
- [ ] Admin dashboard
- [ ] Expense form (open)
- [ ] Sample expense in table

**Save to:**
```
/assets/screenshots/
  - login.png
  - dashboard-employee.png
  - dashboard-manager.png
  - form.png
  - expense-table.png
```

**Create `/assets` folder if missing:**
```bash
mkdir -p assets/screenshots
```

**Continue:**
- [ ] Screenshots saved → Task 30

---

### Task 30: End-of-Day Summary & Checklist
**Time:** 5 min  
**Goal:** Document Day 1 completion

**Verify all completed:**

- [ ] ✅ Local dev environment working
- [ ] ✅ Auth flows tested (signup, login, logout)
- [ ] ✅ Expense form working
- [ ] ✅ OCR tested (or noted as TODO)
- [ ] ✅ Production database created (Neon)
- [ ] ✅ Schema pushed to production
- [ ] ✅ Test data seeded (3 companies, 15 users, 10 expenses)
- [ ] ✅ All roles tested (Employee, Manager, Admin)
- [ ] ✅ Screenshots taken

**End-of-Day Status:**
- Product: **WORKING** ✓
- Database: **PRODUCTION READY** ✓
- Test data: **SEEDED** ✓
- Next: **DEPLOYMENT (Day 2)** →

**Final Step:**
- [ ] Commit progress to git:
  ```bash
  git add .
  git commit -m "Day 1: Core features tested, production DB ready"
  git push
  ```

---

## 🎯 Next Load: Start with Task 1

When you load the next chat, I'll execute these 30 tasks sequentially, confirming each step.

Simply say: **"Start Day 1"** or **"Execute Task 1"** and I'll begin.

