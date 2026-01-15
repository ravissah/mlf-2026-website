import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These should be set as environment variables
const supabaseUrl = (import.meta.env?.VITE_SUPABASE_URL as string) || '';
const supabaseAnonKey = (import.meta.env?.VITE_SUPABASE_ANON_KEY as string) || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and Anon Key must be set in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Speaker {
  id?: string;
  name: string;
  name_np?: string;
  domain: string;
  country: string;
  category: string;
  bio: string;
  photo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Partner {
  id?: string;
  name: string;
  name_np?: string;
  category: string;
  logo_url?: string;
  website_url?: string;
  created_at?: string;
  updated_at?: string;
}
