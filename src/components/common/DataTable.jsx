import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, Search, Filter } from 'lucide-react';
import { EmptyState } from './EmptyState';

export function DataTable({
  columns,
  data = [],
  searchable = true,
  searchPlaceholder = 'Search records...',
  filterComponent,
  pageSize = 10,
  keyExtractor = item => item.id || Math.random(),
  onRowClick,
  mobileCardRender,
  title,
  actions
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Filter by search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(item => {
      return Object.values(item).some(val => {
        if (val === null || val === undefined) return false;
        if (typeof val === 'object') return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (columnKey) => {
    setSortConfig(prev => {
      if (prev.key === columnKey) {
        return { key: columnKey, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden transition-all duration-300">
      {/* Header controls */}
      {(title || searchable || filterComponent || actions) && (
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {title && (
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Showing {sortedData.length} records
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 ml-auto w-full md:w-auto">
            {searchable && (
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
            )}

            {filterComponent}

            {actions}
          </div>
        </div>
      )}

      {/* Content area: Table for medium+ screens, Card mode for mobile if provided */}
      {sortedData.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="No records found"
            description={searchQuery ? `No matches for "${searchQuery}". Try a different filter or search term.` : 'There are no items to display right now.'}
          />
        </div>
      ) : (
        <>
          {/* Mobile view (cards) if mobileCardRender is supplied */}
          {mobileCardRender && (
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedData.map((item, index) => (
                <div
                  key={keyExtractor(item, index)}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`p-4 transition-colors ${onRowClick ? 'active:bg-slate-50 dark:active:bg-slate-800/50 cursor-pointer' : ''}`}
                >
                  {mobileCardRender(item)}
                </div>
              ))}
            </div>
          )}

          {/* Desktop / Responsive Table view */}
          <div className={`overflow-x-auto ${mobileCardRender ? 'hidden md:block' : 'block'}`}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {columns.map(col => (
                    <th
                      key={col.key || col.header}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={`px-4 py-3.5 ${col.sortable ? 'cursor-pointer select-none hover:text-slate-800 dark:hover:text-slate-200' : ''} ${col.className || ''}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{col.header}</span>
                        {col.sortable && (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {paginatedData.map((item, index) => (
                  <tr
                    key={keyExtractor(item, index)}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={`transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${
                      onRowClick ? 'cursor-pointer' : ''
                    }`}
                  >
                    {columns.map(col => (
                      <td
                        key={col.key || col.header}
                        className={`px-4 py-3.5 align-middle text-slate-700 dark:text-slate-300 ${col.className || ''}`}
                      >
                        {col.render ? col.render(item, index) : item[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div>
              Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{Math.min(sortedData.length, (currentPage - 1) * pageSize + 1)}</span> to{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-200">{Math.min(sortedData.length, currentPage * pageSize)}</span> of{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-200">{sortedData.length}</span> entries
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="First Page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold rounded-lg text-xs">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Last Page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
