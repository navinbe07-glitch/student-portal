export const initialLibraryStats = {
  totalBooks: 14500,
  issuedBooks: 890,
  availableBooks: 13610,
  overdueBooks: 42,
  collectedFines: 4850
};

export const initialBooks = [
  {
    id: 'BK-1001',
    title: 'Wings of Fire: An Autobiography',
    author: 'Dr. A.P.J. Abdul Kalam',
    isbn: '978-8173711466',
    category: 'Biography',
    totalCopies: 15,
    availableCopies: 9,
    shelfLocation: 'Rack B-14',
    status: 'Available'
  },
  {
    id: 'BK-1002',
    title: 'Concepts of Physics (Vol 1 & 2)',
    author: 'Dr. H.C. Verma',
    isbn: '978-8177091878',
    category: 'Science & Reference',
    totalCopies: 25,
    availableCopies: 12,
    shelfLocation: 'Rack S-03',
    status: 'Available'
  },
  {
    id: 'BK-1003',
    title: 'Mathematics for Class 10 (R.D. Sharma)',
    author: 'Dr. R.D. Sharma',
    isbn: '978-9390278152',
    category: 'Mathematics',
    totalCopies: 30,
    availableCopies: 4,
    shelfLocation: 'Rack M-02',
    status: 'Available'
  },
  {
    id: 'BK-1004',
    title: 'Ponniyin Selvan (English Translation)',
    author: 'Kalki Krishnamurthy',
    isbn: '978-9351066576',
    category: 'Historical Fiction',
    totalCopies: 10,
    availableCopies: 2,
    shelfLocation: 'Rack L-08',
    status: 'Available'
  },
  {
    id: 'BK-1005',
    title: 'Thirukkural with English Couplets',
    author: 'Thiruvalluvar (G.U. Pope Translation)',
    isbn: '978-8120601383',
    category: 'Literature & Philosophy',
    totalCopies: 18,
    availableCopies: 14,
    shelfLocation: 'Rack T-01',
    status: 'Available'
  },
  {
    id: 'BK-1006',
    title: 'Oxford School Atlas for India',
    author: 'Oxford University Press',
    isbn: '978-0190124236',
    category: 'Geography & Reference',
    totalCopies: 40,
    availableCopies: 31,
    shelfLocation: 'Rack G-05',
    status: 'Available'
  },
  {
    id: 'BK-1007',
    title: 'Computer Science with Python for Class 12',
    author: 'Sumita Arora',
    isbn: '978-9389547831',
    category: 'Computer Science',
    totalCopies: 20,
    availableCopies: 0,
    shelfLocation: 'Rack CS-01',
    status: 'Out of Stock'
  },
  {
    id: 'BK-1008',
    title: 'Malgudi Days',
    author: 'R.K. Narayan',
    isbn: '978-8185986173',
    category: 'Indian Literature',
    totalCopies: 16,
    availableCopies: 11,
    shelfLocation: 'Rack L-02',
    status: 'Available'
  }
];

export const initialIssuedBooks = [
  {
    id: 'ISS-401',
    bookTitle: 'Concepts of Physics (Vol 1)',
    bookId: 'BK-1002',
    studentName: 'Arun Kumar',
    studentId: 'STU-1001',
    class: '10th Standard - A',
    issueDate: '2026-09-10',
    dueDate: '2026-09-24',
    returnDate: null,
    status: 'Active',
    fine: 0
  },
  {
    id: 'ISS-402',
    bookTitle: 'Mathematics for Class 10 (R.D. Sharma)',
    bookId: 'BK-1003',
    studentName: 'Priya Sundaram',
    studentId: 'STU-1002',
    class: '10th Standard - A',
    issueDate: '2026-09-08',
    dueDate: '2026-09-22',
    returnDate: null,
    status: 'Active',
    fine: 0
  },
  {
    id: 'ISS-403',
    bookTitle: 'Wings of Fire',
    bookId: 'BK-1001',
    studentName: 'Rohit Verma',
    studentId: 'STU-1005',
    class: '11th Standard - A',
    issueDate: '2026-08-25',
    dueDate: '2026-09-08',
    returnDate: null,
    status: 'Overdue',
    fine: 70
  }
];
