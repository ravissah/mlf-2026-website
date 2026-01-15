import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  minLength?: number;
}

export function SearchBar({ onSearch, placeholder = 'Search...', minLength = 2 }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const lastSearchedQuery = useRef<string>('');

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    
    // Don't search if this is the same query we just searched
    if (lastSearchedQuery.current === trimmedQuery) {
      return;
    }
    
    // Only perform search if query meets minimum length requirement or is empty
    if (trimmedQuery.length >= minLength || trimmedQuery.length === 0) {
      setLoading(true);
      onSearch(trimmedQuery);
      lastSearchedQuery.current = trimmedQuery;
      setTimeout(() => setLoading(false), 100);
    }
  }, [debouncedQuery, onSearch, minLength]);

  return (
    <div className="relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: 'var(--mlf-saffron)' }}></div>
          ) : (
            <Search size={20} style={{ color: 'var(--mlf-text-muted)' }} />
          )}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-lg border-2 outline-none transition-all"
          style={{ 
            borderColor: 'var(--mlf-divider)', 
            backgroundColor: 'var(--mlf-warm-beige)',
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X size={18} style={{ color: 'var(--mlf-text-muted)' }} />
          </button>
        )}
      </div>
      {searchQuery.length > 0 && searchQuery.length < minLength && (
        <p className="mt-1 text-xs" style={{ color: 'var(--mlf-text-muted)' }}>
          Type at least {minLength} characters to search
        </p>
      )}
    </div>
  );
}

export default SearchBar;
