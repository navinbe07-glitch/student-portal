import { initialFeeRecords, initialFeeStats, initialFeeTransactions, initialExpenses, initialStaffSalaries } from '../data/mockFees';
import { studentService } from './studentService';

const RECORDS_KEY = 'edusphere_fee_records';
const STATS_KEY = 'edusphere_fee_stats';
const TXNS_KEY = 'edusphere_fee_transactions';
const EXPENSES_KEY = 'edusphere_expenses';
const SALARIES_KEY = 'edusphere_salaries';

export const feeService = {
  getStats() {
    const data = localStorage.getItem(STATS_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(STATS_KEY, JSON.stringify(initialFeeStats));
    return initialFeeStats;
  },

  getRecords() {
    const data = localStorage.getItem(RECORDS_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(RECORDS_KEY, JSON.stringify(initialFeeRecords));
    return initialFeeRecords;
  },

  getTransactions() {
    const data = localStorage.getItem(TXNS_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(TXNS_KEY, JSON.stringify(initialFeeTransactions));
    return initialFeeTransactions;
  },

  getExpenses() {
    const data = localStorage.getItem(EXPENSES_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(initialExpenses));
    return initialExpenses;
  },

  addExpense(expenseData) {
    const expenses = this.getExpenses();
    const newExpense = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      status: 'Approved',
      receiptRef: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      ...expenseData
    };
    const updated = [newExpense, ...expenses];
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(updated));

    // Update stats totalExpenses
    const stats = this.getStats();
    const newTotalExpenses = (stats.totalExpenses || 0) + Number(expenseData.amount || 0);
    const updatedStats = {
      ...stats,
      totalExpenses: newTotalExpenses,
      netSurplus: (stats.collected || 0) - newTotalExpenses
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(updatedStats));

    return newExpense;
  },

  deleteExpense(id) {
    const expenses = this.getExpenses();
    const filtered = expenses.filter(e => e.id !== id);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(filtered));
    return true;
  },

  getSalaries() {
    const data = localStorage.getItem(SALARIES_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(SALARIES_KEY, JSON.stringify(initialStaffSalaries));
    return initialStaffSalaries;
  },

  paySalary(salaryId, paymentMethod = 'Direct Bank Transfer') {
    const salaries = this.getSalaries();
    const target = salaries.find(s => s.id === salaryId);
    if (target) {
      target.status = 'Paid';
      target.paymentDate = new Date().toISOString().split('T')[0];
      target.paymentMethod = paymentMethod;
      localStorage.setItem(SALARIES_KEY, JSON.stringify(salaries));
      return target;
    }
    return null;
  },

  updateFeeRecord(recordId, updates) {
    const records = this.getRecords();
    const index = records.findIndex(r => r.id === recordId || r.studentId === recordId);
    if (index !== -1) {
      const current = records[index];
      const updated = { ...current, ...updates };

      // Recalculate pending if totalAmount or paidAmount updated
      if (updates.totalAmount !== undefined || updates.paidAmount !== undefined) {
        const total = updates.totalAmount !== undefined ? Number(updates.totalAmount) : current.totalAmount;
        const paid = updates.paidAmount !== undefined ? Number(updates.paidAmount) : current.paidAmount;
        updated.pendingAmount = Math.max(0, total - paid);
        updated.status = updated.pendingAmount === 0 ? 'Paid' : (paid > 0 ? 'Partially Paid' : 'Pending');
      }

      records[index] = updated;
      localStorage.setItem(RECORDS_KEY, JSON.stringify(records));

      // Synchronize with studentService
      const student = studentService.getStudentById(updated.studentId);
      if (student) {
        studentService.updateStudent(student.id, {
          totalFee: updated.totalAmount,
          paidFee: updated.paidAmount,
          pendingFee: updated.pendingAmount,
          feeDueDate: updated.dueDate,
          feeStatus: updated.status
        });
      }

      return updated;
    }
    return null;
  },

  recordPayment({ studentId, amount, paymentMethod, feeType, notes, collectedBy = 'Mr. V. Sundaresan (Accountant)' }) {
    const numericAmount = Number(amount) || 0;
    const records = this.getRecords();
    const stats = this.getStats();
    const txns = this.getTransactions();
    const receiptNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();
    const todayFormatted = new Date().toISOString().split('T')[0];

    // Find student
    const student = studentService.getStudentById(studentId);
    let studentName = student ? student.name : 'Student';
    let studentClass = student ? `${student.class} - ${student.section}` : '';

    // Update fee record
    const recordIndex = records.findIndex(r => r.studentId === studentId);
    if (recordIndex !== -1) {
      const record = records[recordIndex];
      const newPaid = record.paidAmount + numericAmount;
      const newPending = Math.max(0, record.totalAmount - newPaid);
      const newStatus = newPending === 0 ? 'Paid' : (newPaid > 0 ? 'Partially Paid' : 'Pending');

      records[recordIndex] = {
        ...record,
        paidAmount: newPaid,
        pendingAmount: newPending,
        status: newStatus,
        lastPaymentDate: todayFormatted
      };
      localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
    }

    // Update student directly in student storage for synchronized state
    if (student) {
      const updatedPaid = (student.paidFee || 0) + numericAmount;
      const updatedPending = Math.max(0, (student.totalFee || 45000) - updatedPaid);
      const updatedStatus = updatedPending === 0 ? 'Paid' : (updatedPaid > 0 ? 'Partially Paid' : 'Pending');

      const newHistoryEntry = {
        receiptNo,
        date: todayFormatted,
        amount: numericAmount,
        type: feeType || 'Term Fee Payment',
        method: paymentMethod,
        status: 'Success'
      };

      studentService.updateStudent(student.id, {
        paidFee: updatedPaid,
        pendingFee: updatedPending,
        feeStatus: updatedStatus,
        paymentHistory: [newHistoryEntry, ...(student.paymentHistory || [])]
      });
    }

    // Update KPI stats
    const updatedStats = {
      ...stats,
      collected: stats.collected + numericAmount,
      pending: Math.max(0, stats.pending - numericAmount),
      todayCollection: stats.todayCollection + numericAmount,
      netSurplus: (stats.collected + numericAmount) - (stats.totalExpenses || 252000)
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(updatedStats));

    // Create Transaction
    const newTxn = {
      id: `TXN-${Date.now()}`,
      receiptNo,
      studentId,
      studentName,
      class: studentClass,
      amount: numericAmount,
      paymentMethod,
      transactionRef: `REF-${Date.now().toString().slice(-6)}`,
      date: nowIso,
      collectedBy,
      feeType: feeType || 'Tuition & Academic Fee',
      notes
    };

    const updatedTxns = [newTxn, ...txns];
    localStorage.setItem(TXNS_KEY, JSON.stringify(updatedTxns));

    return {
      success: true,
      receiptNo,
      transaction: newTxn,
      stats: updatedStats
    };
  },

  resetToDefault() {
    localStorage.removeItem(RECORDS_KEY);
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(TXNS_KEY);
    localStorage.removeItem(EXPENSES_KEY);
    localStorage.removeItem(SALARIES_KEY);
  }
};
