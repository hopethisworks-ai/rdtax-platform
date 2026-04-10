# Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+ (for background jobs)
- AWS S3 bucket (or Supabase Storage bucket)
- Resend account (email)
- Stripe account (invoicing)
- Vercel account (frontend hosting)

---

## Local Development Setup

### 1. Clone and install
```bash
git clone <repo-url>
cd rdtax-platform
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with your local values
```

Minimum required for local dev:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rdtax_dev"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate with: openssl rand -base64 32>"
ENCRYPTION_KEY="<generate with: openssl rand -hex 32>"
RESEND_API_KEY="re_test_..."
EMAIL_FROM="noreply@localhost"
STORAGE_PROVIDER="s3"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="rdtax-dev-uploads"
REDIS_URL="redis://localhost:6379"
APP_URL="http://localhost:3000"
ADMIN_EMAIL="admin@yourdomain.com"
```

### 3. Start local services (Docker)
```bash
# PostgreSQL
docker run -d --name rdtax-pg -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15

# Redis (for background jobs)
docker run -d --name rdtax-redis -p 6379:6379 redis:7
```

### 4. Run database migrations
```bash
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations (dev)
npm run db:seed        # Load demo data
```

### 5. Start the app
```bash
npm run dev
# Open http://localhost:3000
```

### Demo accounts (after seed)
| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@rdtaxdemo.com | Admin123!demo |
| Analyst | analyst@rdtaxdemo.com | Analyst123!demo |
| Client | client@acmesoftware.demo | Client123!demo |

---

## Production Deployment

### Option A: Vercel + Supabase

#### Database (Supabase)
1. Create a new Supabase project
2. Copy the connection string from Settings > Database
3. Set `DATABASE_URL` in Vercel environment variables

#### Storage (Supabase Storage)
1. Create a bucket named `rdtax-uploads` (private)
2. Set `STORAGE_PROVIDER=supabase`
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

#### Deploy to Vercel
```bash
vercel login
vercel deploy --prod

# Set all environment variables in Vercel dashboard or:
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
# ... (all variables from .env.example)
```

#### Run migrations on production DB
```bash
DATABASE_URL="<prod-url>" npx prisma migrate deploy
DATABASE_URL="<prod-url>" npm run db:seed  # initial setup only
```

### Option B: AWS (EC2/ECS + RDS + S3)

#### RDS PostgreSQL
1. Create RDS PostgreSQL 15 instance
2. Enable SSL and restrict security group to app servers
3. Set connection string as `DATABASE_URL`

#### S3 Bucket
1. Create private S3 bucket with SSE-S3 encryption
2. Create IAM role with s3:PutObject, s3:GetObject, s3:DeleteObject
3. Attach role to EC2/ECS task

#### App Server
```bash
# Install Node.js 20
# Clone repo and install dependencies
npm ci --only=production

# Run migrations
npm run db:migrate

# Start with PM2
pm2 start npm --name "rdtax" -- start
pm2 save
```

#### Background Job Workers
```bash
# Start report generation worker
pm2 start "npx ts-node src/jobs/workers/generate-report.worker.ts" --name "rdtax-worker"
```

---

## CI/CD Pipeline

### GitHub Actions (example)
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: DATABASE_URL=${{ secrets.DATABASE_URL }} npx prisma migrate deploy
```

---

## Production Checklist

- [ ] `NEXTAUTH_SECRET` is a securely random 32+ byte value (not the placeholder)
- [ ] `ENCRYPTION_KEY` is a securely random 32-byte hex value
- [ ] Database is SSL-only
- [ ] S3 bucket has no public access; only signed URLs used
- [ ] `STRIPE_WEBHOOK_SECRET` verified against Stripe dashboard
- [ ] Email domain is verified in Resend
- [ ] `NODE_ENV=production` set
- [ ] Error logging (Sentry or similar) configured
- [ ] Health check endpoint monitored
- [ ] Database backups automated (daily minimum)
- [ ] Redis persistence configured (RDB + AOF)
- [ ] Seed data **not** loaded in production (seed only for staging/dev)
- [ ] Admin accounts have strong passwords and MFA enabled
- [ ] `ADMIN_EMAIL` points to a monitored inbox

---

## Tax Engine Change Management

When a legal update requires a calculation engine change:

1. **Create Legal Update Record** — add to Legal Update Registry with mandatory flag
2. **Update `TaxRuleVersion`** — create new version with changed rates/logic
3. **Update engine if needed** — modify `src/engine/` modules (unit tests must pass)
4. **Write regression tests** — add test proving old ruleset → old result
5. **SUPER_ADMIN approval** — approve new ruleset version via admin UI
6. **Staging test** — run test calculations on staging with new version
7. **Production deploy** — deploy code changes
8. **Mark Legal Update as implemented** — set `implemented: true` in registry
9. **Notify team** — admin email triggers automatically

**Critical rule**: Never modify existing `TaxRuleVersion` records. Always create a new version.
