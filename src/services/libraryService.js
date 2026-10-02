import { initialBooks, initialIssuedBooks, initialLibraryStats } from '../data/mockLibrary';

const BOOKS_KEY = 'edusphere_books';
const ISSUED_KEY = 'edusphere_issued_books';

export const libraryService = {
  getBooks() {
    const data = localStorage.getItem(BOOKS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(BOOKS_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  },

  getIssuedBooks() {
    const data = localStorage.getItem(ISSUED_KEY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    localStorage.setItem(ISSUED_KEY, JSON.stringify(initialIssuedBooks));
    return initialIssuedBooks;
  },

  getStats() {
    const books = this.getBooks();
    const issued = this.getIssuedBooks().filter(i => i.status === 'Active');
    const totalTitles = books.length;
    const totalCopies = books.reduce((acc, b) => acc + (b.totalCopies || 0), 0);
    const availableCopies = books.reduce((acc, b) => acc + (b.availableCopies || 0), 0);

    return {
      ...initialLibraryStats,
      totalTitles,
      totalCopies,
      availableCopies,
      currentlyIssued: issued.length
    };
  },

  addBook(newBook) {
    const books = this.getBooks();
    const book = {
      id: `BK-${1000 + books.length + 1}`,
      isbn: `978-81-${Math.floor(1000000 + Math.random() * 9000000)}`,
      totalCopies: Number(newBook.totalCopies) || 5,
      availableCopies: Number(newBook.totalCopies) || 5,
      status: 'Available',
      shelfLocation: newBook.shelfLocation || 'Rack A-3',
      category: newBook.category || 'General',
      cover: newBook.cover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      ...newBook
    };

    const updated = [book, ...books];
    localStorage.setItem(BOOKS_KEY, JSON.stringify(updated));
    return book;
  },

  updateBook(bookId, updates) {
    const books = this.getBooks();
    const index = books.findIndex(b => b.id === bookId);
    if (index !== -1) {
      books[index] = { ...books[index], ...updates };
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      return books[index];
    }
    return null;
  },

  removeBook(bookId) {
    const books = this.getBooks();
    const filtered = books.filter(b => b.id !== bookId);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(filtered));
    return true;
  },

  restockBook(bookId, additionalCopies) {
    const books = this.getBooks();
    const target = books.find(b => b.id === bookId);
    if (target) {
      const added = Number(additionalCopies) || 1;
      target.totalCopies = (target.totalCopies || 0) + added;
      target.availableCopies = (target.availableCopies || 0) + added;
      if (target.availableCopies > 0) target.status = 'Available';
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      return target;
    }
    return null;
  },

  issueBook({ bookId, studentName, studentId, className, dueDate }) {
    const books = this.getBooks();
    const issued = this.getIssuedBooks();
    const book = books.find(b => b.id === bookId);

    if (book && book.availableCopies > 0) {
      book.availableCopies -= 1;
      if (book.availableCopies === 0) book.status = 'Out of Stock';
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));

      const newIssue = {
        id: `ISS-${Date.now().toString().slice(-4)}`,
        bookTitle: book.title,
        bookId: book.id,
        studentName,
        studentId,
        class: className,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: dueDate || '2026-10-15',
        returnDate: null,
        status: 'Active',
        fine: 0
      };

      const updatedIssued = [newIssue, ...issued];
      localStorage.setItem(ISSUED_KEY, JSON.stringify(updatedIssued));
      return { success: true, issue: newIssue };
    }
    return { success: false, message: 'Book copy not available' };
  },

  returnBook(issueId) {
    const books = this.getBooks();
    const issued = this.getIssuedBooks();
    const record = issued.find(i => i.id === issueId);

    if (record) {
      record.status = 'Returned';
      record.returnDate = new Date().toISOString().split('T')[0];
      localStorage.setItem(ISSUED_KEY, JSON.stringify(issued));

      const book = books.find(b => b.id === record.bookId);
      if (book) {
        book.availableCopies += 1;
        book.status = 'Available';
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      }
      return true;
    }
    return false;
  }
};
