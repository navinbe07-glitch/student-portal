import React, { useState, useMemo } from 'react';
import {
  Library,
  BookOpen,
  PlusCircle,
  Search,
  BookMarked,
  RotateCcw,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowUpDown,
  X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';

export function LibrarianDashboard() {
  const {
    books,
    issuedBooks,
    addBook,
    updateBook,
    removeBook,
    restockBook,
    issueBook,
    returnBook,
    students
  } = useSchool();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // Form states
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: 'Mathematics',
    totalCopies: 5,
    shelfLocation: 'Rack B-2'
  });

  const [issueData, setIssueData] = useState({
    bookId: '',
    studentId: 'STU-1001',
    dueDate: '2026-10-25'
  });

  // Categories list
  const categories = ['All', 'Mathematics', 'Science', 'Literature & Language', 'Social Studies & History', 'Computer Science'];

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
      const matchSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.isbn && b.isbn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.shelfLocation && b.shelfLocation.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [books, selectedCategory, searchQuery]);

  // Total metrics
  const totalTitles = books.length;
  const totalCopies = books.reduce((acc, b) => acc + (b.totalCopies || 0), 0);
  const availableCopies = books.reduce((acc, b) => acc + (b.availableCopies || 0), 0);
  const activeIssuedCount = issuedBooks.filter(i => i.status === 'Active').length;

  const handleCreateBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;
    addBook(newBook);
    setNewBook({
      title: '',
      author: '',
      category: 'Mathematics',
      totalCopies: 5,
      shelfLocation: 'Rack B-2'
    });
    setIsAddModalOpen(false);
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();
    if (!editingBook) return;
    updateBook(editingBook.id, editingBook);
    setEditingBook(null);
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    if (!issueData.bookId) return;
    const student = students.find(s => s.id === issueData.studentId) || students[0];
    issueBook({
      bookId: issueData.bookId,
      studentName: student.name,
      studentId: student.id,
      className: `${student.class} - ${student.section}`,
      dueDate: issueData.dueDate
    });
    setIsIssueModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Library Information & Circulation Desk</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 font-bold border border-cyan-200">
              Librarian Portal
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete inventory authority: Add, update, restock books, issue copies to students, and manage return fines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsIssueModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-sm flex items-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
          >
            <BookMarked className="w-4 h-4" />
            <span>Issue Book</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-extrabold rounded-2xl shadow-md shadow-cyan-500/25 flex items-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Book</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Total Book Titles"
          value={String(totalTitles)}
          icon={BookOpen}
          subtitle="In Catalog"
          color="indigo"
        />
        <StatCard
          title="Total Physical Copies"
          value={String(totalCopies)}
          icon={Layers}
          subtitle="Across All Racks"
          color="cyan"
        />
        <StatCard
          title="Available in Stacks"
          value={String(availableCopies)}
          icon={CheckCircle2}
          subtitle="Ready to Issue"
          color="emerald"
        />
        <StatCard
          title="Currently Issued"
          value={String(activeIssuedCount)}
          icon={BookMarked}
          subtitle="Active Student Borrows"
          color="amber"
        />
      </div>

      {/* Book Search & Category Filter */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, ISBN, or shelf location (Rack A-1)..."
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-900 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Catalog Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">
            Catalog Inventory ({filteredBooks.length} Titles)
          </h3>
          <span className="text-xs text-slate-500">
            Instant stock update & edit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredBooks.map(book => {
            const isLowStock = (book.availableCopies || 0) <= 1;

            return (
              <div
                key={book.id}
                className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-50 text-cyan-800 border border-cyan-200">
                      {book.category}
                    </span>
                    <Badge variant={book.availableCopies > 0 ? 'success' : 'danger'} size="sm">
                      {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Out of Stock'}
                    </Badge>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                    {book.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    by <strong className="text-slate-700">{book.author}</strong>
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span>Shelf: <strong className="text-slate-800">{book.shelfLocation}</strong></span>
                    <span>•</span>
                    <span className="font-mono">{book.isbn}</span>
                  </div>
                </div>

                {/* Stock Controls & Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500">Restock:</span>
                    <button
                      type="button"
                      onClick={() => restockBook(book.id, 1)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-extrabold text-xs cursor-pointer"
                      title="Add 1 copy"
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => restockBook(book.id, 5)}
                      className="px-2 py-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 rounded-lg font-extrabold text-xs cursor-pointer"
                      title="Add 5 copies"
                    >
                      +5
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingBook(book)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Book Details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove "${book.title}" from library inventory?`)) {
                          removeBook(book.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove Book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Circulation Desk (Issued Books Table) */}
      <div id="circulation" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-indigo-600" />
              <span>Active Book Circulation & Returns</span>
            </h3>
            <p className="text-xs text-slate-500">Track books borrowed by students across all classes</p>
          </div>
          <Badge variant="indigo">{activeIssuedCount} Active Borrows</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-extrabold text-slate-400 uppercase bg-slate-50/80">
                <th className="py-3 px-4">Issue ID</th>
                <th className="py-3 px-4">Book Title</th>
                <th className="py-3 px-4">Borrower Student</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {issuedBooks.map(rec => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-500">{rec.id}</td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">{rec.bookTitle}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{rec.studentName}</td>
                  <td className="py-3 px-4 text-slate-500">{rec.class}</td>
                  <td className="py-3 px-4 text-slate-700 font-semibold">{rec.dueDate}</td>
                  <td className="py-3 px-4">
                    <Badge variant={rec.status === 'Active' ? 'warning' : 'success'} size="sm">
                      {rec.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {rec.status === 'Active' ? (
                      <button
                        onClick={() => returnBook(rec.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        Return Book
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-semibold">Returned ({rec.returnDate})</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Book */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Add Book to Library</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBook} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Book Title</label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="e.g. Higher Engineering Mathematics"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Author</label>
                <input
                  type="text"
                  value={newBook.author}
                  onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                  placeholder="e.g. Dr. B.S. Grewal"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newBook.category}
                    onChange={e => setNewBook({ ...newBook, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Copies</label>
                  <input
                    type="number"
                    min="1"
                    value={newBook.totalCopies}
                    onChange={e => setNewBook({ ...newBook, totalCopies: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Shelf Location Rack</label>
                <input
                  type="text"
                  value={newBook.shelfLocation}
                  onChange={e => setNewBook({ ...newBook, shelfLocation: e.target.value })}
                  placeholder="e.g. Rack C-4"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Save & Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Book */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Edit Book Record</h3>
              <button onClick={() => setEditingBook(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateBook} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Book Title</label>
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={e => setEditingBook({ ...editingBook, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Author</label>
                <input
                  type="text"
                  value={editingBook.author}
                  onChange={e => setEditingBook({ ...editingBook, author: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Shelf Location</label>
                  <input
                    type="text"
                    value={editingBook.shelfLocation}
                    onChange={e => setEditingBook({ ...editingBook, shelfLocation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Available Copies</label>
                  <input
                    type="number"
                    value={editingBook.availableCopies}
                    onChange={e => setEditingBook({ ...editingBook, availableCopies: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Issue Book to Student */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Issue Book to Student</h3>
              <button onClick={() => setIsIssueModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Book</label>
                <select
                  value={issueData.bookId}
                  onChange={e => setIssueData({ ...issueData, bookId: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                >
                  <option value="">-- Choose Book from Stacks --</option>
                  {books.filter(b => b.availableCopies > 0).map(b => (
                    <option key={b.id} value={b.id}>
                      {b.title} ({b.availableCopies} available)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  value={issueData.studentId}
                  onChange={e => setIssueData({ ...issueData, studentId: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  {students.slice(0, 15).map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.class} - {s.section} • Roll #{s.rollNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Return Due Date</label>
                <input
                  type="date"
                  value={issueData.dueDate}
                  onChange={e => setIssueData({ ...issueData, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsIssueModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
