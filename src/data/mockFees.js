export const initialFeeStats = {
  totalExpected: 2540000,
  collected: 2180000,
  pending: 360000,
  todayCollection: 120000,
  totalExpenses: 252000,
  netSurplus: 1928000,
  monthlyTrend: [
    { month: 'Jun', collected: 940000, expected: 1000000, expenses: 110000 },
    { month: 'Jul', collected: 450000, expected: 500000, expenses: 54000 },
    { month: 'Aug', collected: 380000, expected: 420000, expenses: 48000 },
    { month: 'Sep', collected: 290000, expected: 350000, expenses: 40000 },
    { month: 'Oct (Proj)', collected: 120000, expected: 270000, expenses: 35000 }
  ],
  classWiseCollection: [
    { class: '1st - 5th', paid: 720000, pending: 80000, total: 800000 },
    { class: '6th - 8th', paid: 640000, pending: 110000, total: 750000 },
    { class: '9th - 10th', paid: 480000, pending: 95000, total: 575000 },
    { class: '11th - 12th', paid: 340000, pending: 75000, total: 415000 }
  ],
  sectionWiseCollection: [
    { sectionKey: '10th - A', paid: 185000, pending: 25000, rate: 88 },
    { sectionKey: '10th - B', paid: 165000, pending: 35000, rate: 82 },
    { sectionKey: '10th - C', paid: 130000, pending: 35000, rate: 78 },
    { sectionKey: '9th - A', paid: 170000, pending: 20000, rate: 89 },
    { sectionKey: '9th - B', paid: 145000, pending: 30000, rate: 82 },
    { sectionKey: '8th - A', paid: 160000, pending: 25000, rate: 86 },
    { sectionKey: '6th - B', paid: 140000, pending: 20000, rate: 87 }
  ]
};

export const initialExpenses = [
  { id: 'EXP-101', category: 'Infrastructure & Lab', description: 'Science Lab Chemicals & Glassware', amount: 45000, date: '2026-09-18', paidTo: 'Tamil Nadu Scientific Supplies', status: 'Approved', receiptRef: 'INV-TNSS-889' },
  { id: 'EXP-102', category: 'Campus Utilities', description: 'TNEB Electricity Bill - Main Campus & Labs', amount: 82500, date: '2026-09-15', paidTo: 'TANGEDCO Chennai', status: 'Approved', receiptRef: 'TNEB-2026-0915' },
  { id: 'EXP-103', category: 'Library & Academics', description: 'NCERT & Samacheer Reference Volumes', amount: 32000, date: '2026-09-10', paidTo: 'Higginbothams Books', status: 'Approved', receiptRef: 'HIGG-89102' },
  { id: 'EXP-104', category: 'School Transport', description: 'School Bus Fleet Fuel & Maintenance', amount: 64000, date: '2026-09-08', paidTo: 'IOC Fleet Fuel Depot', status: 'Approved', receiptRef: 'IOC-88219' },
  { id: 'EXP-105', category: 'Sports & Co-curricular', description: 'Athletic Meet Gear & Trophy Supplies', amount: 28500, date: '2026-09-02', paidTo: 'Champion Sports Hub', status: 'Approved', receiptRef: 'CHAMP-441' }
];

export const initialStaffSalaries = [
  { id: 'SAL-101', staffId: 'STF-001', name: 'Mrs. Revathi Ramanathan', designation: 'PGT Mathematics', monthlySalary: 52000, allowances: 4000, deductions: 2500, netPayable: 53500, status: 'Paid', paymentDate: '2026-09-05', paymentMethod: 'Direct Bank Transfer' },
  { id: 'SAL-102', staffId: 'STF-002', name: 'Mr. S. Balasubramanian', designation: 'PGT Physics', monthlySalary: 52000, allowances: 4000, deductions: 2500, netPayable: 53500, status: 'Paid', paymentDate: '2026-09-05', paymentMethod: 'Direct Bank Transfer' },
  { id: 'SAL-103', staffId: 'STF-003', name: 'Mrs. K. Meenakshi', designation: 'TGT Science', monthlySalary: 42000, allowances: 3000, deductions: 2000, netPayable: 43000, status: 'Paid', paymentDate: '2026-09-05', paymentMethod: 'Direct Bank Transfer' },
  { id: 'SAL-104', staffId: 'STF-004', name: 'Mr. V. Sundaresan', designation: 'Senior Accountant', monthlySalary: 45000, allowances: 3500, deductions: 2200, netPayable: 46300, status: 'Paid', paymentDate: '2026-09-05', paymentMethod: 'Direct Bank Transfer' },
  { id: 'SAL-105', staffId: 'STF-005', name: 'Mrs. Shakuntala Devi', designation: 'Librarian', monthlySalary: 38000, allowances: 2500, deductions: 1800, netPayable: 38700, status: 'Paid', paymentDate: '2026-09-05', paymentMethod: 'Direct Bank Transfer' },
  { id: 'SAL-106', staffId: 'STF-006', name: 'Mr. R. Parthasarathy', designation: 'Senior Office Staff', monthlySalary: 36000, allowances: 2000, deductions: 1500, netPayable: 36500, status: 'Pending', paymentDate: null, paymentMethod: 'Pending Approval' }
];

export const initialFeeRecords = [
  {
    id: 'FEE-1001',
    studentId: 'STU-1001',
    studentName: 'Arun Kumar',
    rollNo: '101',
    class: '10th Standard',
    section: 'A',
    feeType: 'Term 2 Tuition & Lab Fee',
    totalAmount: 45000,
    paidAmount: 40000,
    pendingAmount: 5000,
    dueDate: '2026-10-15',
    status: 'Pending',
    lastPaymentDate: '2026-08-04',
    parentContact: '+91 98401 23456'
  },
  {
    id: 'FEE-1002',
    studentId: 'STU-1002',
    studentName: 'Priya Sundaram',
    rollNo: '102',
    class: '10th Standard',
    section: 'A',
    feeType: 'Full Annual Fee',
    totalAmount: 45000,
    paidAmount: 45000,
    pendingAmount: 0,
    dueDate: '2026-10-15',
    status: 'Paid',
    lastPaymentDate: '2026-06-08',
    parentContact: '+91 98402 33445'
  },
  {
    id: 'FEE-1003',
    studentId: 'STU-1003',
    studentName: 'Kavin Raj',
    rollNo: '103',
    class: '10th Standard',
    section: 'A',
    feeType: 'Term 1 & 2 Composite',
    totalAmount: 45000,
    paidAmount: 20000,
    pendingAmount: 25000,
    dueDate: '2026-08-31',
    status: 'Overdue',
    lastPaymentDate: '2026-06-05',
    parentContact: '+91 98403 44556'
  },
  {
    id: 'FEE-1004',
    studentId: 'STU-1004',
    studentName: 'Ananya Sharma',
    rollNo: '104',
    class: '9th Standard',
    section: 'B',
    feeType: 'Term 2 Tuition Fee',
    totalAmount: 42000,
    paidAmount: 25000,
    pendingAmount: 17000,
    dueDate: '2026-10-15',
    status: 'Partially Paid',
    lastPaymentDate: '2026-07-14',
    parentContact: '+91 98404 55667'
  },
  {
    id: 'FEE-1005',
    studentId: 'STU-1005',
    studentName: 'Rohit Verma',
    rollNo: '105',
    class: '11th Standard',
    section: 'A',
    feeType: 'Higher Secondary Science & Lab Fee',
    totalAmount: 52000,
    paidAmount: 52000,
    pendingAmount: 0,
    dueDate: '2026-09-30',
    status: 'Paid',
    lastPaymentDate: '2026-09-12',
    parentContact: '+91 98405 66778'
  },
  {
    id: 'FEE-1006',
    studentId: 'STU-1006',
    studentName: 'Deepa Krishnan',
    rollNo: '106',
    class: '12th Standard',
    section: 'B',
    feeType: 'Annual Higher Secondary Composite',
    totalAmount: 54000,
    paidAmount: 30000,
    pendingAmount: 24000,
    dueDate: '2026-09-15',
    status: 'Overdue',
    lastPaymentDate: '2026-06-18',
    parentContact: '+91 98406 77889'
  },
  {
    id: 'FEE-1007',
    studentId: 'STU-1007',
    studentName: 'Karthik S.',
    rollNo: '107',
    class: '8th Standard',
    section: 'A',
    feeType: 'Term 2 Fee + Bus Fee',
    totalAmount: 40000,
    paidAmount: 40000,
    pendingAmount: 0,
    dueDate: '2026-10-15',
    status: 'Paid',
    lastPaymentDate: '2026-09-21',
    parentContact: '+91 98407 88990'
  },
  {
    id: 'FEE-1008',
    studentId: 'STU-1008',
    studentName: 'Meenakshi Sundaram',
    rollNo: '108',
    class: '7th Standard',
    section: 'C',
    feeType: 'Term 2 Tuition Fee',
    totalAmount: 38000,
    paidAmount: 20000,
    pendingAmount: 18000,
    dueDate: '2026-10-30',
    status: 'Partially Paid',
    lastPaymentDate: '2026-07-28',
    parentContact: '+91 98408 99001'
  }
];

export const initialFeeTransactions = [
  {
    id: 'TXN-9021',
    receiptNo: 'REC-2026-9021',
    studentId: 'STU-1007',
    studentName: 'Karthik S.',
    class: '8th Standard - A',
    amount: 20000,
    paymentMethod: 'UPI (Google Pay)',
    transactionRef: 'UPI/260921/884920',
    date: '2026-09-21T11:30:00',
    collectedBy: 'Mr. V. Sundaresan (Accountant)',
    feeType: 'Term 2 Fee + Bus Fee'
  },
  {
    id: 'TXN-9020',
    receiptNo: 'REC-2026-9020',
    studentId: 'STU-1005',
    studentName: 'Rohit Verma',
    class: '11th Standard - A',
    amount: 52000,
    paymentMethod: 'Net Banking (HDFC Bank)',
    transactionRef: 'NEFT-HDFC-9921448',
    date: '2026-09-12T14:15:00',
    collectedBy: 'Mr. V. Sundaresan (Accountant)',
    feeType: 'Higher Secondary Science & Lab Fee'
  },
  {
    id: 'TXN-9019',
    receiptNo: 'REC-2026-5820',
    studentId: 'STU-1001',
    studentName: 'Arun Kumar',
    class: '10th Standard - A',
    amount: 15000,
    paymentMethod: 'Net Banking',
    transactionRef: 'SBI-INB-7729014',
    date: '2026-08-04T10:20:00',
    collectedBy: 'Fee Desk',
    feeType: 'Term 2 Part Payment'
  },
  {
    id: 'TXN-9018',
    receiptNo: 'REC-2026-4401',
    studentId: 'STU-1001',
    studentName: 'Arun Kumar',
    class: '10th Standard - A',
    amount: 25000,
    paymentMethod: 'Online UPI',
    transactionRef: 'UPI-AXIS-339182',
    date: '2026-06-12T09:45:00',
    collectedBy: 'Online Portal',
    feeType: 'Term 1 Tuition Fee'
  }
];
