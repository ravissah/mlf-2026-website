import { ChevronUp, ChevronDown } from 'lucide-react';

interface SortableTableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

export function SortableTableHeader({
  label,
  sortKey,
  currentSort,
  onSort,
  className = '',
}: SortableTableHeaderProps) {
  const isActive = currentSort?.key === sortKey;
  const direction = isActive ? currentSort.direction : null;

  const handleClick = () => {
    if (isActive && direction === 'asc') {
      onSort(sortKey, 'desc');
    } else {
      onSort(sortKey, 'asc');
    }
  };

  return (
    <th
      onClick={handleClick}
      className={`${className} cursor-pointer select-none transition-colors hover:opacity-80`}
      style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold" style={{ color: 'var(--mlf-indigo)' }}>{label}</span>
        <div className="flex flex-col">
          <ChevronUp 
            size={14} 
            style={{ 
              color: direction === 'asc' ? 'var(--mlf-saffron)' : 'var(--mlf-text-muted)',
              opacity: direction === 'asc' ? 1 : 0.3
            }} 
          />
          <ChevronDown 
            size={14} 
            className="-mt-1"
            style={{ 
              color: direction === 'desc' ? 'var(--mlf-saffron)' : 'var(--mlf-text-muted)',
              opacity: direction === 'desc' ? 1 : 0.3
            }} 
          />
        </div>
      </div>
    </th>
  );
}

export default SortableTableHeader;
