# Supabase Setup Guide

This guide will help you set up Supabase for the MLF 2026 admin dashboard.

## 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `mlf-2026-website`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"

## 2. Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 3. Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 4. Create Database Tables

Run these SQL commands in your Supabase SQL Editor (SQL Editor → New Query):

### Speakers Table

```sql
-- Create speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_np TEXT,
  domain TEXT NOT NULL,
  country TEXT NOT NULL,
  category TEXT NOT NULL,
  bio TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated read" ON speakers
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON speakers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON speakers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON speakers
  FOR DELETE
  TO authenticated
  USING (true);
```

### Partners Table

```sql
-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_np TEXT,
  category TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated read" ON partners
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON partners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON partners
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON partners
  FOR DELETE
  TO authenticated
  USING (true);
```

## 5. Create Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - Email: `admin@mlf2026.com` (or your preferred email)
   - Password: (choose a strong password)
4. Click **Create user**

## 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/login`
3. Log in with the admin credentials you created
4. You should see the dashboard!

## 7. Public Access (Optional)

If you want the public website to read speakers/partners from Supabase (instead of hardcoded data), you'll need to create public read policies:

```sql
-- Allow public read access to speakers
CREATE POLICY "Allow public read" ON speakers
  FOR SELECT
  TO anon
  USING (true);

-- Allow public read access to partners
CREATE POLICY "Allow public read" ON partners
  FOR SELECT
  TO anon
  USING (true);
```

## Troubleshooting

- **"Invalid API key"**: Make sure your `.env` file has the correct values
- **"Table does not exist"**: Run the SQL commands in the Supabase SQL Editor
- **"Permission denied"**: Check that Row Level Security policies are set up correctly
- **Can't log in**: Verify the user exists in Authentication → Users

## Next Steps

- Customize the admin dashboard UI
- Add image upload functionality for partner logos
- Set up email notifications
- Add more content management features
