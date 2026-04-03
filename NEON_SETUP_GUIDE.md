# Production Database Setup

## Neon.tech Setup Instructions

### 1. Create Neon Account
- Go to: https://neon.tech
- Click "Sign up"
- Create account with your email
- Verify email address

### 2. Create Database Project
- Click "Create Project"
- Project name: `reimbursement-prod`
- Region: US East (or your region)
- Postgres version: 16
- Click "Create"
- Wait 1-2 minutes for initialization

### 3. Get Connection String
After project created, you'll see:
- PostgreSQL Connection string (copy this)
- Format: `postgresql://neon_user:password@host.neon.tech/dbname`

### 4. Update .env File
Replace DATABASE_URL in `.env` with your Neon connection string:
```
DATABASE_URL="postgresql://your_neon_connection_string_here"
JWT_SECRET="replace-with-a-strong-secret"
```

### 5. Save and Continue
Once you've updated .env with Neon credentials, the dev server will auto-reload and we can test.

---

## Once You Have Neon Credentials

Paste your full connection string in the next message, and I'll:
1. Update .env
2. Push schema to Neon
3. Seed test data
4. Resume auth testing

Example (DO NOT USE - this is fake):
```
postgresql://neon_user:d1a2b3c4@ep-random-1234.us-east-2.neon.tech/reimbursement?sslmode=require
```

