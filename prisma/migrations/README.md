# Database Migrations

This directory contains Prisma migration files.

## Running Migrations

```bash
# Development: auto-generate and apply migration
npx prisma migrate dev --name <migration-name>

# Production: apply pending migrations only (no new migrations)
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset

# Generate Prisma client after schema changes
npx prisma generate
```

## Initial Setup

```bash
# 1. Set your DATABASE_URL in .env.local
# 2. Run migrations
npx prisma migrate dev --name init

# 3. Generate client
npx prisma generate

# 4. Seed demo data
npm run db:seed
```

## Migration Strategy

- Never edit existing migration files after they've been applied to production.
- Every schema change should result in a new migration with a descriptive name.
- Before deploying, run `prisma migrate deploy` in the CI/CD pipeline.
- Migrations include a generated SQL file and are tracked in version control.
