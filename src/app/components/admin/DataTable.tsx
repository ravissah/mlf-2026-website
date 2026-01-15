import { useState, useMemo } from 'react';
import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { SortableTableHeader } from './SortableTableHeader';

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id?: string } = any> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  emptyMessage?: React.ReactNode;
  itemsPerPageOptions?: number[];
}

export function DataTable<T extends { id?: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  emptyMessage,
  itemsPerPageOptions = [10, 25, 50, 100],
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSort({ key, direction });
    setCurrentPage(1);
  };

  // Sort and paginate data
  const sortedAndPaginatedData = useMemo(() => {
    let sorted = [...data];

    // Apply sorting
    if (sort) {
      sorted.sort((a, b) => {
        const aVal = (a as any)[sort.key];
        const bVal = (b as any)[sort.key];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        const comparison = String(aVal).localeCompare(String(bVal), undefined, {
          numeric: true,
          sensitivity: 'base',
        });
        return sort.direction === 'asc' ? comparison : -comparison;
      });
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sorted.slice(startIndex, endIndex);
  }, [data, sort, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, data.length);

  if (data.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl" style={{ backgroundColor: 'white' }}>
        {emptyMessage || (
          <>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--mlf-indigo)' }}>
              No items found
            </h3>
            <p style={{ color: 'var(--mlf-text-secondary)' }}>
              Get started by adding your first item
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Results info and items per page */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="text-sm" style={{ color: 'var(--mlf-text-secondary)' }}>
          Showing <span className="font-semibold" style={{ color: 'var(--mlf-indigo)' }}>{startItem}</span> to{' '}
          <span className="font-semibold" style={{ color: 'var(--mlf-indigo)' }}>{endItem}</span> of{' '}
          <span className="font-semibold" style={{ color: 'var(--mlf-indigo)' }}>{data.length}</span> results
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm" style={{ color: 'var(--mlf-text-secondary)' }}>Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-lg border-2 outline-none text-sm"
            style={{ 
              borderColor: 'var(--mlf-divider)', 
              backgroundColor: 'var(--mlf-warm-beige)',
              color: 'var(--mlf-text-primary)'
            }}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'white', border: '1px solid var(--mlf-divider)' }}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y" style={{ borderColor: 'var(--mlf-divider)' }}>
            <thead>
              <tr>
                {columns.map((col) =>
                  col.sortable !== false ? (
                    <SortableTableHeader
                      key={col.key}
                      label={col.label}
                      sortKey={col.key}
                      currentSort={sort}
                      onSort={handleSort}
                      className={`px-6 py-4 text-left text-xs uppercase tracking-wider ${col.className || ''}`}
                    />
                  ) : (
                    <th
                      key={col.key}
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${col.className || ''}`}
                      style={{ backgroundColor: 'var(--mlf-warm-beige)', color: 'var(--mlf-indigo)' }}
                    >
                      {col.label}
                    </th>
                  )
                )}
                {(onEdit || onDelete) && (
                  <th
                    className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--mlf-warm-beige)', color: 'var(--mlf-indigo)' }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--mlf-divider)' }}>
              {sortedAndPaginatedData.map((item) => (
                <tr key={item.id || Math.random()} className="hover:opacity-80 transition-opacity" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                      {col.render ? col.render(item) : (
                        <div className="text-sm" style={{ color: 'var(--mlf-text-primary)' }}>
                          {(item as any)[col.key] || '—'}
                        </div>
                      )}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                            style={{ 
                              backgroundColor: 'rgba(63, 81, 181, 0.1)', 
                              color: 'var(--mlf-indigo)' 
                            }}
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                            style={{ 
                              backgroundColor: 'rgba(244, 67, 54, 0.1)', 
                              color: '#f44336' 
                            }}
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: 'var(--mlf-divider)',
              backgroundColor: currentPage === 1 ? 'transparent' : 'white',
              color: 'var(--mlf-text-primary)'
            }}
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                );
              })
              .map((page, idx, arr) => {
                const showEllipsisBefore = idx > 0 && arr[idx - 1] !== page - 1;
                return (
                  <div key={page} className="flex items-center gap-2">
                    {showEllipsisBefore && (
                      <span style={{ color: 'var(--mlf-text-muted)' }}>...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        currentPage === page
                          ? 'text-white'
                          : 'border-2'
                      }`}
                      style={
                        currentPage === page
                          ? { backgroundColor: 'var(--mlf-saffron)' }
                          : {
                              borderColor: 'var(--mlf-divider)',
                              backgroundColor: 'white',
                              color: 'var(--mlf-text-primary)'
                            }
                      }
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
          </div>
          
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: 'var(--mlf-divider)',
              backgroundColor: currentPage === totalPages ? 'transparent' : 'white',
              color: 'var(--mlf-text-primary)'
            }}
          >
            <span>Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}

export default DataTable;
