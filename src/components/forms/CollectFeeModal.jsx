import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CreditCard, Check, QrCode } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { formatCurrency } from '../../utils/formatters';

export function CollectFeeModal({ isOpen, onClose, defaultStudent, onPaymentComplete }) {
  const { students, recordFeePayment } = useSchool();

  const [studentId, setStudentId] = useState(defaultStudent ? defaultStudent.id : 'STU-1001');
  const [amount, setAmount] = useState(defaultStudent ? (defaultStudent.pendingFee || 5000) : 5000);
  const [feeType, setFeeType] = useState('Term 2 Tuition & Lab Fee');
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay / PhonePe)');
  const [notes, setNotes] = useState('Collected at finance counter');

  // Update when student changes
  const selectedStudent = students.find(s => s.id === studentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentId || !amount || amount <= 0) return;

    const result = recordFeePayment({
      studentId,
      amount: Number(amount),
      feeType,
      paymentMethod,
      notes
    });

    onClose();
    if (onPaymentComplete && result.transaction) {
      onPaymentComplete(result.transaction);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      title="Collect Student Fee"
      subtitle="Record tuition or term fee receipt"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Process Payment</span>
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Student Selector */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Select Student *
          </label>
          <select
            value={studentId}
            onChange={(e) => {
              const sId = e.target.value;
              setStudentId(sId);
              const found = students.find(s => s.id === sId);
              if (found && found.pendingFee > 0) {
                setAmount(found.pendingFee);
              }
            }}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            {students.slice(0, 30).map(student => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.class}-{student.section}) • Roll #{student.rollNo} • Due: {formatCurrency(student.pendingFee)}
              </option>
            ))}
          </select>
        </div>

        {/* Selected student status chip */}
        {selectedStudent && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block">Current Dues:</span>
              <span className="font-extrabold text-rose-600 text-sm">
                {formatCurrency(selectedStudent.pendingFee)} Pending
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Total Annual:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatCurrency(selectedStudent.totalFee)}
              </span>
            </div>
          </div>
        )}

        {/* Fee Type */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Fee Head / Description *
          </label>
          <select
            value={feeType}
            onChange={e => setFeeType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="Term 2 Tuition & Lab Fee">Term 2 Tuition & Lab Fee</option>
            <option value="Term 1 Tuition Fee">Term 1 Tuition Fee</option>
            <option value="Annual Composite Fee">Annual Composite Fee</option>
            <option value="School Bus Transport Fee">School Bus Transport Fee</option>
            <option value="Board Exam & Special Coaching Fee">Board Exam & Special Coaching Fee</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Amount Received (₹) *
          </label>
          <input
            type="number"
            min="100"
            max="100000"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full px-3 py-2 text-base font-bold text-slate-900 dark:text-white rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Payment Method *
          </label>
          <select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="UPI (Google Pay / PhonePe)">UPI (Google Pay / PhonePe)</option>
            <option value="Cash">Cash (Counter Deposit)</option>
            <option value="Credit / Debit Card">Credit / Debit Card (POS Swipe)</option>
            <option value="Net Banking (NEFT/RTGS)">Net Banking (NEFT/RTGS)</option>
            <option value="Demand Draft / Cheque">Demand Draft / Cheque</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Remarks / Transaction Reference
          </label>
          <input
            type="text"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g. Counter payment ref"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </form>
    </Modal>
  );
}
