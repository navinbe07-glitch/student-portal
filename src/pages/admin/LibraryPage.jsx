import React, { useState } from 'react';
import {
  Library,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  ArrowRightLeft,
  Search,
  Filter
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function LibraryPage() {
  const { books, issuedBooks, issueBook, returnBook, students } = useSchool();

  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'issued'
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [selectedBookForIssue, setSelectedBookForIssue] = useState(null);

  // Form state
  const [selectedStudentId, setSelectedStudentId] = useState('STU-1001');
  const [issueDueDate, setIssueDueDate] = useState('2026-10-06');

  const handleConfirmIssue = (e) => {
    e.preventDefault();
    if (!selectedBookForIssue) return;
    const student = students.find(s => s.id === selectedStudentId);

    issueBook({
      bookId: selectedBookForIssue.id,
      studentName: student?.name || 'Arun Kumar',
      studentId: student?.id || 'STU-1001',
      className: `${student?.class || '10th Standard'} - ${student?.section || 'A'}`,
      dueDate: issueDueDate
    });

    setIssueModalOpen(false);
    setSelectedBookForIssue(null);
  };

  const catalogColumns = [
    {
      header: 'Book Title & Author',
      key: 'title',
      sortable: true,
      render: (book) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block hover:text-brand-600">
            {book.title}
          </span>
          <span className="text-xs text-slate-400">
            By {book.author}
          </span>
        </div>
      )
    },
    {
      header: 'ISBN',
      key: 'isbn',
      render: (book) => (
        <span className="font-mono text-xs text-slate-500">{book.isbn}</span>
      )
    },
    {
      header: 'Category',
      key: 'category',
      sortable: true,
      render: (book) => (
        <Badge variant="neutral" size="sm">{book.category}</Badge>
      )
    },
    {
      header: 'Availability',
      key: 'availableCopies',
      sortable: true,
      render: (book) => (
        <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
          <strong className="text-emerald-600">{book.availableCopies}</strong> of {book.totalCopies} Copies
        </span>
      )
    },
    {
      header: 'Shelf Rack',
      key: 'shelfLocation',
      render: (book) => (
        <span className="text-xs text-slate-500 font-medium">{book.shelfLocation}</span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (book) => (
        <Badge variant={book.status === 'Available' ? 'success' : 'danger'} size="sm">
          {book.status}
        </Badge>
      )
    },
    {
      header: 'Action',
      key: 'action',
      render: (book) => (
        <button
          disabled={book.availableCopies === 0}
          onClick={() => {
            setSelectedBookForIssue(book);
            setIssueModalOpen(true);
          }}
          className="px-3 py-1 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded-lg text-xs font-bold disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          Issue Book
        </button>
      )
    }
  ];

  const issuedColumns = [
    {
      header: 'Issued Book',
      key: 'bookTitle',
      render: (rec) => (
        <span className="font-bold text-slate-900 dark:text-white text-xs">{rec.bookTitle}</span>
      )
    },
    {
      header: 'Student Borrower',
      key: 'studentName',
      render: (rec) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">{rec.studentName}</span>
          <span className="text-[11px] text-slate-400">{rec.class}</span>
        </div>
      )
    },
    {
      header: 'Issue Date',
      key: 'issueDate',
      render: (rec) => <span className="text-xs text-slate-500">{formatDate(rec.issueDate)}</span>
    },
    {
      header: 'Due Date',
      key: 'dueDate',
      render: (rec) => <span className="text-xs text-slate-500 font-semibold">{formatDate(rec.dueDate)}</span>
    },
    {
      header: 'Status',
      key: 'status',
      render: (rec) => (
        <Badge variant={rec.status === 'Overdue' ? 'danger' : rec.status === 'Returned' ? 'neutral' : 'info'} size="sm">
          {rec.status}
        </Badge>
      )
    },
    {
      header: 'Action',
      key: 'action',
      render: (rec) => (
        rec.status !== 'Returned' ? (
          <button
            onClick={() => returnBook(rec.id)}
            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Mark Returned
          </button>
        ) : (
          <span className="text-xs text-slate-400">Returned</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Library Resource Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Book cataloging, barcode tracking, borrowing records, and overdue fine recovery
          </p>
        </div>

        <button
          onClick={() => alert('Add Book to Catalogue ready for production.')}
          className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Book to Catalog</span>
        </button>
      </div>

      {/* 5 KPIs required by Section 17 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Books" value="14,500" icon={Library} color="indigo" />
        <StatCard title="Issued Books" value="890" icon={BookOpen} color="blue" />
        <StatCard title="Available Books" value="13,610" icon={CheckCircle2} color="emerald" />
        <StatCard title="Overdue Books" value="42" icon={AlertCircle} color="rose" />
        <StatCard title="Collected Fines" value="₹4,850" icon={Clock} color="amber" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            activeTab === 'catalog'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Book Catalogue ({books.length})
        </button>
        <button
          onClick={() => setActiveTab('issued')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            activeTab === 'issued'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Issued / Borrowed Log ({issuedBooks.length})
        </button>
      </div>

      {/* DataTables */}
      {activeTab === 'catalog' ? (
        <DataTable
          columns={catalogColumns}
          data={books}
          searchable={true}
          searchPlaceholder="Search catalog by title, author, category, ISBN..."
          pageSize={10}
        />
      ) : (
        <DataTable
          columns={issuedColumns}
          data={issuedBooks}
          searchable={true}
          searchPlaceholder="Search issued log by student, book title..."
          pageSize={10}
        />
      )}

      {/* Issue Book Modal */}
      <Modal
        isOpen={issueModalOpen}
        onClose={() => setIssueModalOpen(false)}
        maxWidth="max-w-md"
        title="Issue Book to Student"
        subtitle={selectedBookForIssue ? selectedBookForIssue.title : ''}
        footer={
          <>
            <button
              type="button"
              onClick={() => setIssueModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmIssue}
              className="px-5 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm"
            >
              Confirm Issue
            </button>
          </>
        }
      >
        <form onSubmit={handleConfirmIssue} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Select Student *</label>
            <select
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            >
              {students.slice(0, 25).map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.class}-{s.section}) • Roll #{s.rollNo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Return Due Date *</label>
            <input
              type="date"
              value={issueDueDate}
              onChange={e => setIssueDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
