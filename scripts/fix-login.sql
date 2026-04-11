-- ============================================================================
-- FIX LOGIN: Create or reset the admin user account
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor
-- ============================================================================

-- Step 1: Check if the admin user exists
SELECT id, email, role, active,
       CASE WHEN "passwordHash" IS NULL THEN '❌ NULL - no password set'
            ELSE '✅ SET' END AS password_status
FROM "User"
WHERE email = 'admin@rdtaxdemo.com';

-- Step 2: Insert the admin user if they don't exist, or update if they do
INSERT INTO "User" (id, email, name, role, "passwordHash", active, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@rdtaxdemo.com',
  'Platform Admin',
  'SUPER_ADMIN',
  '$2a$12$KXUbBODrGdkAUTKEkO/HY.Isiql7GResiW1/ZxM33lwm4ZU5fsgR6',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  "passwordHash" = '$2a$12$KXUbBODrGdkAUTKEkO/HY.Isiql7GResiW1/ZxM33lwm4ZU5fsgR6',
  active = true,
  "updatedAt" = NOW();

-- Step 3: Verify it worked
SELECT id, email, role, active,
       CASE WHEN "passwordHash" IS NULL THEN '❌ NULL'
            ELSE '✅ SET' END AS password_status
FROM "User"
WHERE email = 'admin@rdtaxdemo.com';
