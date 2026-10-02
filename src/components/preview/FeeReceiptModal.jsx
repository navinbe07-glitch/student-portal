import React from 'react';
import { Modal } from '../common/Modal';
import { Printer, Download, CheckCircle2, School } from 'lucide-react';
import { formatCurrency, formatDate, numberToWords } from '../../utils/formatters';

export function FeeReceiptModal({ isOpen, onClose, receipt }) {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-2xl"
      title="Official Fee Payment Receipt"
      subtitle={`Receipt No: ${receipt.receiptNo || 'REC-2026-XXXX'}`}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={() => {
              alert('Receipt PDF downloaded successfully.');
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </>
      }
    >
      {/* Printable Receipt Paper */}
      <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-slate-800 dark:text-slate-200">
        {/* School Header */}
        <div className="border-b-2 border-slate-800 dark:border-slate-300 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <School className="w-6 h-6 text-brand-700 dark:text-brand-400" />
            <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-slate-900 dark:text-white">
              Green Valley Matriculation Higher Sec. School
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Recognized by Govt. of Tamil Nadu • Code: TN-MS-4029
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No. 42, Anna Nagar Main Avenue, Chennai - 600040 | Phone: +91 44 2621 8899
          </p>
          <div className="mt-2 inline-block px-3 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md font-bold text-xs uppercase tracking-wider">
            Fee Receipt (Student Copy)
          </div>
        </div>

        {/* Receipt Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
          <div>
            <span className="text-slate-500 block">Receipt No:</span>
            <span className="font-bold text-slate-900 dark:text-white">{receipt.receiptNo}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Payment Date:</span>
            <span className="font-bold text-slate-900 dark:text-white">{formatDate(receipt.date)}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Academic Year:</span>
            <span className="font-bold text-slate-900 dark:text-white">2026–2027</span>
          </div>
          <div>
            <span className="text-slate-500 block">Payment Method:</span>
            <span className="font-bold text-slate-900 dark:text-white">{receipt.paymentMethod || receipt.method || 'Online'}</span>
          </div>
        </div>

        {/* Student Meta */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 text-xs mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <span className="text-slate-500">Student Name: </span>
            <span className="font-bold text-slate-900 dark:text-white">{receipt.studentName}</span>
          </div>
          <div>
            <span className="text-slate-500">Class & Section: </span>
            <span className="font-bold text-slate-900 dark:text-white">{receipt.class || '10th Standard - A'}</span>
          </div>
          <div>
            <span className="text-slate-500">Student ID: </span>
            <span className="font-bold text-slate-900 dark:text-white">{receipt.studentId || 'STU-1001'}</span>
          </div>
        </div>

        {/* Fee Particulars Table */}
        <table className="w-full text-xs text-left mb-4 border-collapse">
          <thead>
            <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40">
              <th className="py-2 px-2 font-bold">#</th>
              <th className="py-2 px-2 font-bold">Particulars / Description</th>
              <th className="py-2 px-2 font-bold text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <td className="py-2 px-2">1</td>
              <td className="py-2 px-2">
                <span className="font-semibold">{receipt.feeType || receipt.type || 'Tuition & Academic Term Composite Fee'}</span>
                <p className="text-[11px] text-slate-500">Including smart classroom, laboratory, and library access fees</p>
              </td>
              <td className="py-2 px-2 text-right font-bold">
                {formatCurrency(receipt.amount)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-800 dark:border-slate-300 font-bold">
              <td colSpan={2} className="py-2.5 px-2 text-right uppercase">Total Amount Paid:</td>
              <td className="py-2.5 px-2 text-right text-sm text-emerald-700 dark:text-emerald-400 font-extrabold">
                {formatCurrency(receipt.amount)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Amount in words */}
        <div className="text-xs bg-emerald-50/60 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-200/60 dark:border-emerald-900 mb-6">
          <span className="font-semibold text-emerald-900 dark:text-emerald-300">Amount in Words: </span>
          <span className="italic text-emerald-800 dark:text-emerald-200">{numberToWords(receipt.amount)}</span>
        </div>

        {/* Signatures & Seal */}
        <div className="flex items-end justify-between pt-6 text-xs text-center">
          <div>
            <div className="w-24 h-10 border-b border-dashed border-slate-400 mx-auto flex items-end justify-center text-[10px] text-slate-400 pb-1">
              Computer Generated
            </div>
            <p className="mt-1 font-semibold text-slate-600 dark:text-slate-400">Cashier / Fee Desk</p>
          </div>

          {/* Seal Graphic */}
          <div className="w-20 h-20 rounded-full border-2 border-brand-600/40 text-brand-700 dark:text-brand-400 flex flex-col items-center justify-center p-1 transform rotate-[-6deg] select-none text-[8px] font-bold uppercase text-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-0.5" />
            <span>PAID & VERIFIED</span>
            <span className="text-[7px]">GREEN VALLEY</span>
          </div>

          <div>
            <div className="w-24 h-10 border-b border-dashed border-slate-400 mx-auto flex items-end justify-center pb-1 text-slate-800 dark:text-slate-200 font-serif italic text-xs">
              K. Sivasankaran
            </div>
            <p className="mt-1 font-semibold text-slate-600 dark:text-slate-400">Principal Signature</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
