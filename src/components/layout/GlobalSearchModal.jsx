import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, UserCheck, BookOpen, CreditCard, Library, Bell, ChevronRight, X } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { formatCurrency } from '../../utils/formatters';

export function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { students, staff, feeRecords, books, announcements } = useSchool();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keydown handler for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('open-global-search'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search Results Categorization
  const matchedStudents = trimmed
    ? students.filter(s => s.name.toLowerCase().includes(trimmed) || s.admissionNo.toLowerCase().includes(trimmed) || s.class.toLowerCase().includes(trimmed)).slice(0, 5)
    : [];

  const matchedStaff = trimmed
    ? staff.filter(s => s.name.toLowerCase().includes(trimmed) || s.designation.toLowerCase().includes(trimmed) || s.department.toLowerCase().includes(trimmed)).slice(0, 4)
    : [];

  const matchedFees = trimmed
    ? feeRecords.filter(f => f.studentName.toLowerCase().includes(trimmed) || f.feeType.toLowerCase().includes(trimmed) || f.status.toLowerCase().includes(trimmed)).slice(0, 3)
    : [];

  const matchedBooks = trimmed
    ? books.filter(b => b.title.toLowerCase().includes(trimmed) || b.author.toLowerCase().includes(trimmed) || b.category.toLowerCase().includes(trimmed)).slice(0, 4)
    : [];

  const matchedAnnouncements = trimmed
    ? announcements.filter(a => a.title.toLowerCase().includes(trimmed) || a.content.toLowerCase().includes(trimmed)).slice(0, 3)
    : [];

  const hasResults = matchedStudents.length > 0 || matchedStaff.length > 0 || matchedFees.length > 0 || matchedBooks.length > 0 || matchedAnnouncements.length > 0;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all animate-fade-in"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Arun Kumar, fees, mathematics, books, announcements..."
              className="w-full text-base bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-500">
              ESC
            </kbd>
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
            {!trimmed ? (
              <div className="p-6 text-center text-xs text-slate-400">
                <p className="font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Global ERP Search
                </p>
                <p>Type student name (e.g. &quot;Arun&quot;), employee, fee status, book title, or announcement keyword.</p>
              </div>
            ) : !hasResults ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No results found for &quot;{query}&quot;. Try a different search term.
              </div>
            ) : (
              <>
                {/* Students */}
                {matchedStudents.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-500" />
                      <span>Students ({matchedStudents.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {matchedStudents.map(student => (
                        <div
                          key={student.id}
                          onClick={() => handleSelect(`/admin/students/${student.id}`)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/70 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center text-xs">
                              {student.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                {student.name}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {student.class} - {student.section} • Roll #{student.rollNo} • Adm: {student.admissionNo}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              student.feeStatus === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            }`}>
                              Fee: {student.feeStatus}
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Staff */}
                {matchedStaff.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Staff ({matchedStaff.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {matchedStaff.map(member => (
                        <div
                          key={member.id}
                          onClick={() => handleSelect('/admin/staff')}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {member.name}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {member.designation} • {member.department}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fees */}
                {matchedFees.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Fee Invoices ({matchedFees.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {matchedFees.map(fee => (
                        <div
                          key={fee.id}
                          onClick={() => handleSelect('/admin/fees')}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {fee.studentName} — {fee.feeType}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Pending: {formatCurrency(fee.pendingAmount)} of {formatCurrency(fee.totalAmount)}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-emerald-600">
                            {formatCurrency(fee.pendingAmount)} Due
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Books */}
                {matchedBooks.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Library className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Library ({matchedBooks.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {matchedBooks.map(book => (
                        <div
                          key={book.id}
                          onClick={() => handleSelect('/admin/library')}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {book.title}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              By {book.author} • {book.availableCopies} available
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
