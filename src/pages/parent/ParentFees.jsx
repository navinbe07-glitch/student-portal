import React, { useState } from 'react';
import { CreditCard, CheckCircle2, AlertCircle, Receipt, Download, Clock, Printer, ShieldCheck } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useParentLanguage } from '../../context/ParentLanguageContext';
import { CollectFeeModal } from '../../components/forms/CollectFeeModal';
import { FeeReceiptModal } from '../../components/preview/FeeReceiptModal';
import { ConsolidatedReceiptsModal } from '../../components/preview/ConsolidatedReceiptsModal';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';

export function ParentFees() {
  const { selectedChild } = useSchool();
  const { t } = useParentLanguage();

  const child = selectedChild;

  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [consolidatedModalOpen, setConsolidatedModalOpen] = useState(false);

  // Dynamic transactions for child (ensures sample amounts like ₹5,000 — 11 Sep, ₹200 — 18 Oct)
  const defaultHistory = child?.id === 'STU-1004'
    ? [
        { receiptNo: 'REC-2026-3108', date: '2026-06-14', amount: 20000, type: 'Term 1 Tuition Fee', method: 'Online UPI', status: 'Success' },
        { receiptNo: 'REC-2026-4991', date: '2026-08-10', amount: 15500, type: 'Term 2 Part Payment', method: 'Net Banking', status: 'Success' },
        { receiptNo: 'REC-2026-5210', date: '2026-09-11', amount: 5000, type: 'Smart Classroom & Lab Fee', method: 'Online UPI', status: 'Success' },
        { receiptNo: 'REC-2026-6014', date: '2026-10-18', amount: 200, type: 'Library Annual Subscription', method: 'Online UPI', status: 'Success' }
      ]
    : [
        { receiptNo: 'REC-2026-4401', date: '2026-06-12', amount: 25000, type: 'Term 1 Tuition Fee', method: 'Online UPI', status: 'Success' },
        { receiptNo: 'REC-2026-5820', date: '2026-08-04', amount: 15000, type: 'Term 2 Part Payment', method: 'Net Banking', status: 'Success' },
        { receiptNo: 'REC-2026-6112', date: '2026-09-11', amount: 5000, type: 'Science Lab & Workshop Fee', method: 'Online UPI', status: 'Success' },
        { receiptNo: 'REC-2026-6430', date: '2026-10-18', amount: 200, type: 'Examination Verification Fee', method: 'Online UPI', status: 'Success' }
      ];

  const paymentTransactions = child?.paymentHistory?.length > 0 ? child.paymentHistory : defaultHistory;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('feesTitle', 'Fee Dues & Online Payments')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {child?.name} • {child?.class} ({child?.section}) • #{child?.rollNo}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Download All Receipts Button */}
          <button
            onClick={() => setConsolidatedModalOpen(true)}
            className="px-4 py-2.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-extrabold rounded-2xl shadow-xs transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t('downloadAllReceipts', 'Download All Receipts')}</span>
          </button>

          {/* Quick Action: Pay Pending Fees */}
          {child?.pendingFee > 0 && (
            <button
              onClick={() => setFeeModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold rounded-2xl shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>{t('payPendingFees', 'Pay Pending Fees')} ({formatCurrency(child.pendingFee)})</span>
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Summary Cards: Total, Paid, Pending, Due Date */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Card 1: Total Prescribed Fee */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
            {t('totalAnnualFee', 'Total Prescribed Fee')}
          </span>
          <div className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {formatCurrency(child?.totalFee || 45000)}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            {t('feeTuitionSubtitle', 'Tuition, Lab & Smart Classroom')}
          </span>
        </div>

        {/* Card 2: Total Paid Fee */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block uppercase tracking-wider">
            {t('totalPaidFee', 'Total Paid to Date')}
          </span>
          <div className="text-xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(child?.paidFee || 40000)}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            {t('feeVerifiedSubtitle', 'Verified by Accounts Department')}
          </span>
        </div>

        {/* Card 3: Pending Outstanding Dues */}
        <div className={`p-4 sm:p-5 rounded-3xl border shadow-xs ${
          child?.pendingFee > 0
            ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/80'
            : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/80'
        }`}>
          <span className="text-xs text-amber-700 dark:text-amber-400 font-bold block uppercase tracking-wider">
            {t('pendingOutstanding', 'Pending Outstanding Dues')}
          </span>
          <div className={`text-xl sm:text-3xl font-extrabold mt-1 ${
            child?.pendingFee > 0 ? 'text-amber-700 dark:text-amber-300' : 'text-emerald-700 dark:text-emerald-300'
          }`}>
            {formatCurrency(child?.pendingFee || 0)}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            {child?.pendingFee > 0 ? `${t('dueBy', 'Due by')} ${formatDate(child?.feeDueDate || '2026-10-15')}` : t('noDuesTitle', 'Nil Dues • Fully Settled')}
          </span>
        </div>

        {/* Card 4: Due Date */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
            {t('feeDueDateLabel', 'Due Date')}
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {formatDate(child?.feeDueDate || '2026-10-15')}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            {child?.pendingFee > 0 ? 'Upcoming Term Installment' : 'Next Cycle: AY 2027'}
          </span>
        </div>
      </div>

      {/* Payment History Table with individual receipt downloads */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t('paymentHistoryTitle', 'Payment History & Official Receipts')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('sampleTransactionNote', 'Recent verified transactions recorded in school ERP')}
            </p>
          </div>
          <Badge variant="success" size="sm">
            {paymentTransactions.length} Transactions Recorded
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 font-extrabold text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">{t('receiptNo', 'Receipt No')}</th>
                <th className="py-3 px-3">{t('date', 'Date')}</th>
                <th className="py-3 px-3">{t('feeParticulars', 'Fee Particulars')}</th>
                <th className="py-3 px-3">{t('paymentMode', 'Payment Method')}</th>
                <th className="py-3 px-3 text-right">{t('amount', 'Amount')}</th>
                <th className="py-3 px-3 text-center">{t('downloadReceipt', 'Receipt')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paymentTransactions.map((pay, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-extrabold text-brand-600 dark:text-brand-400">
                    {pay.receiptNo}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-medium">
                    {formatDate(pay.date)}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                    {pay.type}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    {pay.method}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatCurrency(pay.amount)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => {
                        setReceiptData({
                          receiptNo: pay.receiptNo,
                          studentName: child?.name,
                          studentId: child?.id,
                          class: `${child?.class} - ${child?.section}`,
                          amount: pay.amount,
                          feeType: pay.type,
                          date: pay.date,
                          paymentMethod: pay.method
                        });
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 dark:hover:bg-brand-900/50 rounded-xl transition-colors cursor-pointer"
                    >
                      {t('downloadReceipt', 'Download Receipt')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee Modal */}
      <CollectFeeModal
        isOpen={feeModalOpen}
        defaultStudent={child}
        onClose={() => setFeeModalOpen(false)}
        onPaymentComplete={(txn) => setReceiptData(txn)}
      />

      {/* Single Receipt Modal */}
      <FeeReceiptModal
        isOpen={!!receiptData}
        receipt={receiptData}
        onClose={() => setReceiptData(null)}
      />

      {/* Consolidated Receipts Modal ("Download All Receipts") */}
      <ConsolidatedReceiptsModal
        isOpen={consolidatedModalOpen}
        student={child}
        transactions={paymentTransactions}
        onClose={() => setConsolidatedModalOpen(false)}
      />
    </div>
  );
}
