# Security Notes for MLF 2026 Admin Dashboard

## Console Logging

All console logs in the admin dashboard are now **conditionally enabled** - they only appear in development mode, not in production builds.

### What's Protected

- ✅ **User emails** - Only logged in development
- ✅ **Database IDs** - Only logged in development  
- ✅ **Form data** - Only logged in development
- ✅ **API responses** - Only logged in development

### Production Behavior

When you build for production (`npm run build`), all debug console logs are automatically removed. Only error messages (without sensitive data) will appear in production.

## Row Level Security (RLS)

Your data is protected by **Supabase Row Level Security policies**, not by hiding console logs. The RLS policies ensure:

1. ✅ Only authenticated users can access the admin dashboard
2. ✅ Only authenticated users can read/write to the `speakers` and `partners` tables
3. ✅ Public users (if enabled) can only read data, not modify it

## Security Best Practices

### ✅ What's Already Secure

1. **Authentication Required** - All admin routes are protected
2. **RLS Policies** - Database-level security enforced
3. **Environment Variables** - API keys stored securely
4. **HTTPS** - All Supabase connections use HTTPS
5. **No Sensitive Data in Code** - All secrets in environment variables

### 🔒 Additional Security Recommendations

1. **Rate Limiting** - Consider adding rate limiting to prevent brute force attacks
2. **2FA** - Consider adding two-factor authentication for admin users
3. **Audit Logging** - Consider logging all admin actions for audit trails
4. **Session Management** - Supabase handles this, but you can customize session duration
5. **IP Whitelisting** - Consider restricting admin access to specific IPs (if needed)

## Console Logs in Development

The console logs you see are **intentional for debugging** during development. They help you:
- Debug issues with data submission
- Verify authentication status
- Track API responses
- Diagnose RLS policy issues

These logs are **automatically removed** in production builds, so they won't appear to end users.

## What Console Logs Show

In development, you might see:
- Form data before submission (to verify data structure)
- API request/response details (to debug issues)
- User authentication status (to verify login)
- Error details (to diagnose problems)

**None of this data is exposed in production builds.**

## Verifying Security

To verify console logs are removed in production:

1. Build for production: `npm run build`
2. Preview the build: `npm run preview`
3. Open browser console - you should see minimal/no debug logs
4. Only error messages (without sensitive data) should appear

## Questions?

If you have security concerns:
1. Check that RLS policies are properly configured
2. Verify environment variables are not committed to git
3. Ensure HTTPS is enforced in production
4. Review Supabase security settings
