#!/bin/bash
DATABASE_URL="postgresql://postgres:RdTax2024prod@db.wsmkgduxbrtnsmylnybm.supabase.co:5432/postgres" \
  npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/reset-admin-password.ts
