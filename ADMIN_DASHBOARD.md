# Admin Dashboard Guide

## Overview

The MLF 2026 website now includes a complete admin dashboard for managing speakers and partners. The dashboard is built with Supabase for authentication and database management.

## Features

✅ **Authentication System**
- Secure login page
- Session management
- Protected routes

✅ **Speakers Management**
- Create, Read, Update, Delete (CRUD) operations
- Support for English and Nepali names
- Category management (Writers & Thinkers, Performers, Poets, International)
- Bio and domain information

✅ **Partners Management**
- CRUD operations for partners
- Category-based organization
- Logo and website URL support
- Support for English and Nepali names

## File Structure

```
src/
├── lib/
│   └── supabase.ts                    # Supabase client configuration
├── contexts/
│   └── AuthContext.tsx                 # Authentication context provider
├── app/
│   ├── components/
│   │   └── admin/
│   │       └── ProtectedRoute.tsx     # Route protection component
│   └── pages/
│       └── admin/
│           ├── Login.tsx              # Login page
│           ├── Dashboard.tsx          # Main dashboard
│           ├── SpeakersManagement.tsx # Speakers CRUD
│           └── PartnersManagement.tsx # Partners CRUD
```

## Routes

- `/admin/login` - Login page
- `/admin/dashboard` - Main admin dashboard (protected)
- `/admin/speakers` - Speakers management (protected)
- `/admin/partners` - Partners management (protected)

## Setup Instructions

1. **Set up Supabase** (see `SUPABASE_SETUP.md` for detailed instructions)
   - Create a Supabase project
   - Set up database tables
   - Create an admin user

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Supabase URL and API key

3. **Run the Application**
   ```bash
   npm run dev
   ```

4. **Access the Admin Dashboard**
   - Navigate to `http://localhost:5173/admin/login`
   - Log in with your admin credentials

## Database Schema

### Speakers Table
- `id` (UUID, Primary Key)
- `name` (TEXT, Required)
- `name_np` (TEXT, Optional)
- `domain` (TEXT, Required)
- `country` (TEXT, Required)
- `category` (TEXT, Required)
- `bio` (TEXT, Required)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Partners Table
- `id` (UUID, Primary Key)
- `name` (TEXT, Required)
- `name_np` (TEXT, Optional)
- `category` (TEXT, Required)
- `logo_url` (TEXT, Optional)
- `website_url` (TEXT, Optional)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Security

- All admin routes are protected and require authentication
- Row Level Security (RLS) is enabled on Supabase tables
- Only authenticated users can perform CRUD operations
- Session management handled by Supabase Auth

## Next Steps

1. Complete Supabase setup (see `SUPABASE_SETUP.md`)
2. Create your admin user in Supabase
3. Add your first speakers and partners
4. Customize the dashboard UI if needed
5. Consider adding image upload functionality for partner logos

## Troubleshooting

- **Can't log in**: Verify user exists in Supabase Authentication
- **Database errors**: Check that tables are created and RLS policies are set
- **Environment variables**: Ensure `.env` file is properly configured
- **Type errors**: Make sure `src/vite-env.d.ts` is included in your TypeScript config
