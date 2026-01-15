import { useState, useEffect } from 'react';
import { supabase, Speaker } from '../lib/supabase';

// Map Supabase Speaker to frontend Speaker format
export interface FrontendSpeaker {
  name: string;
  nameNp?: string;
  domain: string;
  country: string;
  category: string;
  bio: string;
  photo_url?: string;
}

const mapToFrontendSpeaker = (dbSpeaker: Speaker): FrontendSpeaker => ({
  name: dbSpeaker.name,
  nameNp: dbSpeaker.name_np,
  domain: dbSpeaker.domain,
  country: dbSpeaker.country,
  category: dbSpeaker.category,
  bio: dbSpeaker.bio,
  photo_url: dbSpeaker.photo_url,
});

export function useSpeakers() {
  const [speakers, setSpeakers] = useState<FrontendSpeaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('speakers')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const mappedSpeakers = (data || []).map(mapToFrontendSpeaker);
      setSpeakers(mappedSpeakers);
    } catch (err: any) {
      console.error('Error loading speakers:', err);
      setError(err.message || 'Failed to load speakers');
      // Fallback to empty array on error
      setSpeakers([]);
    } finally {
      setLoading(false);
    }
  };

  return { speakers, loading, error, refetch: loadSpeakers };
}

export default useSpeakers;
