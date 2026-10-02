import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { studentService } from '../services/studentService';
import { feeService } from '../services/feeService';
import { attendanceService } from '../services/attendanceService';
import { examService } from '../services/examService';
import { homeworkService } from '../services/homeworkService';
import { libraryService } from '../services/libraryService';
import { transportService } from '../services/transportService';
import { inventoryService } from '../services/inventoryService';
import { communicationService } from '../services/communicationService';
import { staffService } from '../services/staffService';
import { useToast } from './ToastContext';

const SchoolContext = createContext();

const LEAVE_KEY = 'edusphere_leave_requests';
const CONTENT_KEY = 'edusphere_class_contents';
const CERT_KEY = 'edusphere_certificates';

const initialLeaveRequests = [
  {
    id: 'LV-201',
    studentId: 'STU-1001',
    studentName: 'Arun Kumar',
    class: '10th Standard',
    section: 'A',
    parentName: 'Mr. Ramesh Kumar',
    parentPhone: '+91 98401 23456',
    leaveType: 'Medical Leave',
    fromDate: '2026-10-06',
    toDate: '2026-10-07',
    days: 2,
    reason: 'Mild viral fever and prescribed doctor rest',
    status: 'Pending',
    appliedDate: '2026-10-04'
  },
  {
    id: 'LV-202',
    studentId: 'STU-1004',
    studentName: 'Ananya Sharma',
    class: '9th Standard',
    section: 'B',
    parentName: 'Mr. Ramesh Kumar',
    parentPhone: '+91 98404 55667',
    leaveType: 'Family Function',
    fromDate: '2026-09-18',
    toDate: '2026-09-19',
    days: 2,
    reason: 'Attending family wedding ceremony in Madurai',
    status: 'Approved',
    appliedDate: '2026-09-15'
  }
];

const initialClassContents = [
  {
    id: 'CNT-101',
    class: '10th Standard',
    section: 'All Sections (A, B, C)',
    type: 'Important Questions',
    title: 'Class 10 Mathematics - Top 25 Board Exam Questions & Solutions',
    subject: 'Mathematics',
    publishedBy: 'Mrs. Revathi Ramanathan',
    publishedAt: '2026-09-20',
    description: 'Crucial solved questions covering Quadratic Equations, Arithmetic Progressions, and Circle Theorems.',
    fileUrl: '#',
    fileType: 'PDF Document (2.4 MB)'
  },
  {
    id: 'CNT-102',
    class: '10th Standard',
    section: 'A',
    type: 'Question Bank',
    title: 'Science Term-1 Question Bank with Answer Keys',
    subject: 'Science',
    publishedBy: 'Mrs. K. Meenakshi',
    publishedAt: '2026-09-18',
    description: 'Unit-wise questions for Physics and Chemistry with detailed diagrams and step-by-step calculations.',
    fileUrl: '#',
    fileType: 'PDF Document (3.8 MB)'
  },
  {
    id: 'CNT-103',
    class: '10th Standard',
    section: 'All Sections (A, B, C)',
    type: 'Study Material',
    title: 'English Analytical Paragraph & Letter Writing Mastery Notes',
    subject: 'English',
    publishedBy: 'Mr. N. Raman',
    publishedAt: '2026-09-15',
    description: 'Model letters, format templates, scoring rubrics, and high-scoring sample paragraphs.',
    fileUrl: '#',
    fileType: 'PDF Document (1.6 MB)'
  }
];

const initialCertificates = [
  {
    id: 'CERT-2026-001',
    studentId: 'STU-1001',
    studentName: 'Arun Kumar',
    class: '10th Standard - A',
    admissionNo: 'GV-2024-101',
    type: 'Bonafide Certificate',
    purpose: 'Passport Application & Regional Science Olympiad',
    issuedDate: '2026-09-15',
    issuedBy: 'Mr. R. Parthasarathy (Admissions Desk)',
    status: 'Issued'
  },
  {
    id: 'CERT-2026-002',
    studentId: 'STU-1002',
    studentName: 'Priya Sundaram',
    class: '10th Standard - A',
    admissionNo: 'GV-2024-102',
    type: 'Conduct & Character Certificate',
    purpose: 'National Talent Search Exam (NTSE)',
    issuedDate: '2026-09-10',
    issuedBy: 'Office Desk',
    status: 'Issued'
  }
];

export function SchoolProvider({ children }) {
  const { showToast } = useToast();

  // Primary state
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [feeStats, setFeeStats] = useState(null);
  const [feeRecords, setFeeRecords] = useState([]);
  const [feeTransactions, setFeeTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [exams, setExams] = useState([]);
  const [marks, setMarks] = useState([]);
  const [homework, setHomework] = useState([]);
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [buses, setBuses] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [classContents, setClassContents] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [selectedSchool] = useState('Green Valley Matriculation Higher Secondary School');
  const [academicYear] = useState('2026–2027');
  const [selectedChildId, setSelectedChildIdState] = useState(() => {
    return localStorage.getItem('edusphere_selected_child') || 'STU-1001';
  });

  const setSelectedChildId = (id) => {
    setSelectedChildIdState(id);
    localStorage.setItem('edusphere_selected_child', id);
  };

  // Load initial data
  const loadAllData = useCallback(() => {
    setStudents(studentService.getStudents());
    setStaff(staffService.getStaff());
    setFeeStats(feeService.getStats());
    setFeeRecords(feeService.getRecords());
    setFeeTransactions(feeService.getTransactions());
    setExpenses(feeService.getExpenses());
    setSalaries(feeService.getSalaries());
    setExams(examService.getExams());
    setMarks(examService.getMarks());
    setHomework(homeworkService.getHomework());
    setBooks(libraryService.getBooks());
    setIssuedBooks(libraryService.getIssuedBooks());
    setBuses(transportService.getBuses());
    setInventoryItems(inventoryService.getItems());
    setAnnouncements(communicationService.getAnnouncements());
    setNotifications(communicationService.getNotifications());

    // LocalStorage for Leave Requests
    const storedLeaves = localStorage.getItem(LEAVE_KEY);
    if (storedLeaves) {
      try { setLeaveRequests(JSON.parse(storedLeaves)); } catch { setLeaveRequests(initialLeaveRequests); }
    } else {
      localStorage.setItem(LEAVE_KEY, JSON.stringify(initialLeaveRequests));
      setLeaveRequests(initialLeaveRequests);
    }

    // LocalStorage for Class Study Materials
    const storedContents = localStorage.getItem(CONTENT_KEY);
    if (storedContents) {
      try { setClassContents(JSON.parse(storedContents)); } catch { setClassContents(initialClassContents); }
    } else {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(initialClassContents));
      setClassContents(initialClassContents);
    }

    // LocalStorage for Certificates
    const storedCerts = localStorage.getItem(CERT_KEY);
    if (storedCerts) {
      try { setCertificates(JSON.parse(storedCerts)); } catch { setCertificates(initialCertificates); }
    } else {
      localStorage.setItem(CERT_KEY, JSON.stringify(initialCertificates));
      setCertificates(initialCertificates);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Synchronized Actions
  const addStudent = (newStudentData) => {
    const student = studentService.addStudent(newStudentData);
    setStudents(studentService.getStudents());
    showToast(`Student ${student.name} successfully registered.`, 'success');
    return student;
  };

  const updateStudent = (id, partialData) => {
    const updated = studentService.updateStudent(id, partialData);
    setStudents(studentService.getStudents());
    return updated;
  };

  const recordFeePayment = (params) => {
    const result = feeService.recordPayment(params);
    setStudents(studentService.getStudents());
    setFeeRecords(feeService.getRecords());
    setFeeStats(feeService.getStats());
    setFeeTransactions(feeService.getTransactions());

    communicationService.addNotification({
      title: 'Fee Payment Received',
      message: `₹${params.amount.toLocaleString('en-IN')} payment recorded for ${result.transaction.studentName}. Receipt #${result.receiptNo}`,
      category: 'Fees',
      link: '/admin/fees',
      forRoles: ['Admin', 'Parent', 'Accountant']
    });
    setNotifications(communicationService.getNotifications());

    showToast(`Payment of ₹${params.amount.toLocaleString('en-IN')} recorded successfully. Receipt #${result.receiptNo}`, 'success');
    return result;
  };

  const updateFeeRecord = (recordId, updates) => {
    const res = feeService.updateFeeRecord(recordId, updates);
    setFeeRecords(feeService.getRecords());
    setStudents(studentService.getStudents());
    setFeeStats(feeService.getStats());
    showToast('Student fee details and schedule updated.', 'success');
    return res;
  };

  const sendFeeReminder = (studentName, parentPhone, pendingAmount) => {
    communicationService.addNotification({
      title: 'Fee Due Reminder Dispatched',
      message: `SMS/WhatsApp reminder sent to ${parentPhone} for ${studentName} (Pending: ₹${pendingAmount.toLocaleString('en-IN')})`,
      category: 'Fees',
      link: '/accountant',
      forRoles: ['Accountant', 'Admin']
    });
    setNotifications(communicationService.getNotifications());
    showToast(`Fee reminder dispatched via SMS & WhatsApp to ${parentPhone}.`, 'success');
  };

  const addExpense = (expenseData) => {
    const newExp = feeService.addExpense(expenseData);
    setExpenses(feeService.getExpenses());
    setFeeStats(feeService.getStats());
    showToast(`Expense of ₹${Number(expenseData.amount).toLocaleString('en-IN')} logged.`, 'success');
    return newExp;
  };

  const deleteExpense = (id) => {
    feeService.deleteExpense(id);
    setExpenses(feeService.getExpenses());
    setFeeStats(feeService.getStats());
    showToast('Expense record removed.', 'info');
  };

  const paySalary = (salaryId, method) => {
    const paid = feeService.paySalary(salaryId, method);
    setSalaries(feeService.getSalaries());
    showToast(`Salary disbursed to ${paid.name} via ${method}.`, 'success');
    return paid;
  };

  const saveAttendance = (dateStr, className, section, rollCall) => {
    attendanceService.saveAttendance(dateStr, className, section, rollCall);
    setStudents(studentService.getStudents());
    showToast(`Attendance saved successfully for ${className} - ${section}. Syncing to Student, Parent & Admin portals.`, 'success');
  };

  const updateMarks = (studentId, examId, subject, obtainedMarks, maxMarks) => {
    const entry = examService.updateStudentMarks(studentId, examId, subject, obtainedMarks, maxMarks);
    setMarks(examService.getMarks());
    setStudents(studentService.getStudents());
    showToast(`Marks updated: ${subject} (${obtainedMarks}/${maxMarks}). Instantly synced across all portals.`, 'success');
    return entry;
  };

  const addExamConfig = (examData) => {
    const newExm = examService.addExam(examData);
    setExams(examService.getExams());
    showToast(`Exam schedule "${newExm.name}" configured and active.`, 'success');
    return newExm;
  };

  const updateExamConfig = (id, updates) => {
    const updated = examService.updateExam(id, updates);
    setExams(examService.getExams());
    showToast(`Exam configuration updated.`, 'success');
    return updated;
  };

  // Class Study Material Publisher (Teacher to Whole Class)
  const publishClassContent = (contentData) => {
    const newContent = {
      id: `CNT-${Date.now().toString().slice(-4)}`,
      publishedAt: new Date().toISOString().split('T')[0],
      ...contentData
    };
    const updated = [newContent, ...classContents];
    setClassContents(updated);
    localStorage.setItem(CONTENT_KEY, JSON.stringify(updated));

    communicationService.addNotification({
      title: `New ${contentData.type}: ${contentData.title}`,
      message: `${contentData.subject} material published by ${contentData.publishedBy} for ${contentData.class} - ${contentData.section}`,
      category: 'Academics',
      link: '/student',
      forRoles: ['Student', 'Parent', 'Teacher']
    });
    setNotifications(communicationService.getNotifications());

    showToast(`Published "${contentData.title}" to entire ${contentData.class} (${contentData.section}) with 1-click!`, 'success');
    return newContent;
  };

  const deleteClassContent = (id) => {
    const updated = classContents.filter(c => c.id !== id);
    setClassContents(updated);
    localStorage.setItem(CONTENT_KEY, JSON.stringify(updated));
    showToast('Class material removed.', 'info');
  };

  // Parent Leave Requests
  const submitLeaveRequest = (leaveData) => {
    const newReq = {
      id: `LV-${Date.now().toString().slice(-4)}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ...leaveData
    };
    const updated = [newReq, ...leaveRequests];
    setLeaveRequests(updated);
    localStorage.setItem(LEAVE_KEY, JSON.stringify(updated));

    communicationService.addNotification({
      title: 'Leave Note Submitted',
      message: `${leaveData.studentName} (${leaveData.class}) leave request submitted by parent: ${leaveData.reason}`,
      category: 'Attendance',
      link: '/office',
      forRoles: ['Office Staff', 'Teacher', 'Admin']
    });
    setNotifications(communicationService.getNotifications());
    showToast('Leave request submitted to school office and class teacher.', 'success');
    return newReq;
  };

  const approveLeave = (leaveId) => {
    const updated = leaveRequests.map(l => l.id === leaveId ? { ...l, status: 'Approved' } : l);
    setLeaveRequests(updated);
    localStorage.setItem(LEAVE_KEY, JSON.stringify(updated));
    showToast('Leave request approved by Office Staff.', 'success');
  };

  const rejectLeave = (leaveId) => {
    const updated = leaveRequests.map(l => l.id === leaveId ? { ...l, status: 'Rejected' } : l);
    setLeaveRequests(updated);
    localStorage.setItem(LEAVE_KEY, JSON.stringify(updated));
    showToast('Leave request declined.', 'info');
  };

  // Certificates
  const generateCertificate = (certData) => {
    const newCert = {
      id: `CERT-2026-${Math.floor(100 + Math.random() * 900)}`,
      issuedDate: new Date().toISOString().split('T')[0],
      status: 'Issued',
      ...certData
    };
    const updated = [newCert, ...certificates];
    setCertificates(updated);
    localStorage.setItem(CERT_KEY, JSON.stringify(updated));
    showToast(`${certData.type} generated successfully for ${certData.studentName}.`, 'success');
    return newCert;
  };

  // Library actions
  const addBook = (bookData) => {
    const b = libraryService.addBook(bookData);
    setBooks(libraryService.getBooks());
    showToast(`Book "${b.title}" added to school catalog.`, 'success');
    return b;
  };

  const updateBook = (bookId, updates) => {
    const b = libraryService.updateBook(bookId, updates);
    setBooks(libraryService.getBooks());
    showToast(`Book details updated.`, 'success');
    return b;
  };

  const removeBook = (bookId) => {
    libraryService.removeBook(bookId);
    setBooks(libraryService.getBooks());
    showToast('Book removed from catalog.', 'info');
  };

  const restockBook = (bookId, copies) => {
    const b = libraryService.restockBook(bookId, copies);
    setBooks(libraryService.getBooks());
    showToast(`Restocked ${copies} copies of "${b.title}".`, 'success');
    return b;
  };

  const issueBook = (params) => {
    const res = libraryService.issueBook(params);
    if (res.success) {
      setBooks(libraryService.getBooks());
      setIssuedBooks(libraryService.getIssuedBooks());
      showToast(`Book "${res.issue.bookTitle}" issued to ${params.studentName}.`, 'success');
    } else {
      showToast(res.message, 'error');
    }
    return res;
  };

  const returnBook = (issueId) => {
    const ok = libraryService.returnBook(issueId);
    if (ok) {
      setBooks(libraryService.getBooks());
      setIssuedBooks(libraryService.getIssuedBooks());
      showToast('Book marked as returned successfully.', 'success');
    }
    return ok;
  };

  const addHomework = (hwData) => {
    const newHw = homeworkService.addHomework(hwData);
    setHomework(homeworkService.getHomework());
    showToast(`Homework "${newHw.title}" published for ${newHw.class}-${newHw.section}.`, 'success');
    return newHw;
  };

  const addAnnouncement = (ancData) => {
    const newAnc = communicationService.addAnnouncement(ancData);
    setAnnouncements(communicationService.getAnnouncements());
    setNotifications(communicationService.getNotifications());
    showToast(`Announcement "${newAnc.title}" published.`, 'success');
    return newAnc;
  };

  const adjustStock = (itemId, change) => {
    const updated = inventoryService.adjustStock(itemId, change);
    setInventoryItems(inventoryService.getItems());
    showToast('Inventory stock adjusted.', 'info');
    return updated;
  };

  const markNotificationAsRead = (id) => {
    communicationService.markAsRead(id);
    setNotifications(communicationService.getNotifications());
  };

  const markAllNotificationsAsRead = () => {
    communicationService.markAllAsRead();
    setNotifications(communicationService.getNotifications());
    showToast('All notifications marked as read.', 'info');
  };

  const resetAllDemoData = () => {
    localStorage.clear();
    loadAllData();
    showToast('Demo data reset to initial realistic state.', 'info');
  };

  const parentChildren = students.filter(s => s.parent === 'Ramesh Kumar' || s.id === 'STU-1001' || s.id === 'STU-1004');
  const selectedChild = students.find(s => s.id === selectedChildId) || parentChildren[0] || students[0];

  return (
    <SchoolContext.Provider value={{
      schoolName: selectedSchool,
      academicYear,
      students,
      totalStudentsCount: 1248,
      activeStudentsList: students,
      parentChildren,
      selectedChild,
      selectedChildId,
      setSelectedChildId,
      staff,
      feeStats: feeStats || { totalExpected: 2540000, collected: 2180000, pending: 360000, todayCollection: 120000 },
      feeRecords,
      feeTransactions,
      expenses,
      salaries,
      exams,
      marks,
      homework,
      books,
      issuedBooks,
      buses,
      inventoryItems,
      announcements,
      notifications,
      unreadNotificationsCount: notifications.filter(n => n.unread).length,
      leaveRequests,
      classContents,
      certificates,
      // actions
      addStudent,
      updateStudent,
      recordFeePayment,
      updateFeeRecord,
      sendFeeReminder,
      addExpense,
      deleteExpense,
      paySalary,
      saveAttendance,
      updateMarks,
      addExamConfig,
      updateExamConfig,
      publishClassContent,
      deleteClassContent,
      submitLeaveRequest,
      approveLeave,
      rejectLeave,
      generateCertificate,
      addBook,
      updateBook,
      removeBook,
      restockBook,
      addHomework,
      addAnnouncement,
      issueBook,
      returnBook,
      adjustStock,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      resetAllDemoData,
      refreshData: loadAllData
    }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) throw new Error('useSchool must be used within a SchoolProvider');
  return context;
}
