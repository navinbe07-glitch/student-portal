import React from 'react';
import { Modal } from '../common/Modal';
import { Printer, Download, School, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDate, numberToWords } from '../../utils/formatters';

export function ConsolidatedReceiptsModal({ isOpen, onClose, student, transactions = [] }) {
  if (!student) return null;

  const totalPaid = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-3xl"
      title="Consolidated Annual Fee Payment Statement"
      subtitle={`Student: ${student.name} • Class ${student.class} - ${student.section}`}
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
            <span>Print All Receipts</span>
          </button>
          <button
            onClick={() => alert('Consolidated statement PDF downloaded.')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Statement</span>
          </button>
        </>
      }
    >
      <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs text-slate-900 dark:text-slate-100 space-y-6">
        {/* Header */}
        <div className="border-b-2 border-slate-900 dark:border-slate-300 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <School className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wide">
              Green Valley Matriculation Higher Sec. School
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Recognized by Govt. of Tamil Nadu • Affiliation Code: TN-MS-4029
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Anna Nagar Western Extension, Chennai, Tamil Nadu 600040
          </p>
          <h3 className="mt-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 inline-block px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Consolidated Student Fee Payment Record (AY 2026–2027)
          </h3>
        </div>

        {/* Student Bio Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-xs border border-slate-200/60 dark:border-slate-800">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Student Name</span>
            <span className="font-extrabold text-slate-900 dark:text-white">{student.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Admission / Roll No</span>
            <span className="font-bold">{student.admissionNo} • #{student.rollNo}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Class & Section</span>
            <span className="font-bold">{student.class} - {student.section}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Parent / Guardian</span>
            <span className="font-bold">{student.parent}</span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Receipt #</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Payment Method</th>
                <th className="py-2.5 px-3 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {transactions.map((txn, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand-600 dark:text-brand-400">
                    {txn.receiptNo}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {formatDate(txn.date)}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {txn.type}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {txn.method}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                    {formatCurrency(txn.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900 dark:border-slate-300 font-extrabold text-sm">
                <td colSpan="4" className="py-3 px-3 text-right">
                  Total Cleared to Date:
                </td>
                <td className="py-3 px-3 text-right text-emerald-600">
                  {formatCurrency(totalPaid)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Amount in words */}
        <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 text-xs">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Amount in Words</span>
          <span className="font-bold text-emerald-800 dark:text-emerald-300 italic">
            {numberToWords(totalPaid)}
          </span>
        </div>

        {/* Signatures */}
        <div className="pt-8 grid grid-cols-2 text-center text-xs">
          <div>
            <div className="w-32 border-b border-dashed border-slate-400 mx-auto mb-1" />
            <span className="font-bold block">Accounts Officer</span>
            <span className="text-[10px] text-slate-400">Green Valley Matriculation</span>
          </div>
          <div>
            <div className="w-32 border-b border-dashed border-slate-400 mx-auto mb-1" />
            <span className="font-bold block">Principal & Correspondent</span>
            <span className="text-[10px] text-slate-400">Official Seal & Signature</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
