import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
  Filter,
  Receipt,
  Send,
  Plus
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { StatCard } from '../../components/common/StatCard';
import { ChartCard } from '../../components/common/ChartCard';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { CollectFeeModal } from '../../components/forms/CollectFeeModal';
import { FeeReceiptModal } from '../../components/preview/FeeReceiptModal';
import { formatCurrency, formatCurrencyCompact, formatDate } from '../../utils/formatters';

export function FeesPage() {
  const { feeStats, feeRecords, feeTransactions, students } = useSchool();

  const [collectFeeOpen, setCollectFeeOpen] = useState(false);
  const [selectedStudentForFee, setSelectedStudentForFee] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Chart data
  const paidVsPendingData = [
    { name: 'Collected', value: feeStats.collected, fill: '#10b981' },
    { name: 'Pending Balance', value: feeStats.pending, fill: '#f59e0b' }
  ];

  const classWiseData = feeStats.classWiseCollection || [
    { class: 'Primary', paid: 720000, pending: 80000 },
    { class: 'Middle', paid: 640000, pending: 110000 },
    { class: 'Secondary', paid: 480000, pending: 95000 },
    { class: 'Higher Sec', paid: 340000, pending: 75000 }
  ];

  const filteredRecords = selectedStatusFilter === 'All'
    ? feeRecords
    : feeRecords.filter(r => r.status === selectedStatusFilter);

  const handleSendReminder = (record) => {
    alert(`SMS and WhatsApp fee reminder notification dispatched to parent of ${record.studentName} for ${formatCurrency(record.pendingAmount)}.`);
  };

  const columns = [
    {
      header: 'Student',
      key: 'studentName',
      sortable: true,
      render: (record) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block hover:text-brand-600">
            {record.studentName}
          </span>
          <span className="text-xs text-slate-400">
            {record.class} • Roll #{record.rollNo}
          </span>
        </div>
      )
    },
    {
      header: 'Fee Type',
      key: 'feeType',
      render: (record) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
          {record.feeType}
        </span>
      )
    },
    {
      header: 'Total Fee',
      key: 'totalAmount',
      sortable: true,
      render: (record) => (
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {formatCurrency(record.totalAmount)}
        </span>
      )
    },
    {
      header: 'Paid',
      key: 'paidAmount',
      sortable: true,
      render: (record) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          {formatCurrency(record.paidAmount)}
        </span>
      )
    },
    {
      header: 'Balance',
      key: 'pendingAmount',
      sortable: true,
      render: (record) => (
        <span className={`font-bold ${record.pendingAmount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
          {formatCurrency(record.pendingAmount)}
        </span>
      )
    },
    {
      header: 'Due Date',
      key: 'dueDate',
      render: (record) => (
        <span className="text-xs text-slate-500">
          {formatDate(record.dueDate)}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (record) => (
        <Badge
          variant={record.status === 'Paid' ? 'success' : record.status === 'Overdue' ? 'danger' : 'warning'}
          size="sm"
        >
          {record.status}
        </Badge>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
          {record.pendingAmount > 0 && (
            <button
              onClick={() => {
                const foundStudent = students.find(s => s.id === record.studentId);
                setSelectedStudentForFee(foundStudent || { id: record.studentId, pendingFee: record.pendingAmount });
              }}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              Collect
            </button>
          )}

          <button
            onClick={() => {
              setReceiptData({
                receiptNo: `REC-2026-${record.rollNo || '9012'}`,
                studentName: record.studentName,
                studentId: record.studentId,
                class: record.class,
                amount: record.paidAmount > 0 ? record.paidAmount : record.totalAmount,
                feeType: record.feeType,
                date: record.lastPaymentDate || '2026-08-15',
                paymentMethod: 'UPI / Online Portal'
              });
            }}
            className="p-1.5 text-slate-500 hover:text-brand-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="View Receipt"
          >
            <Receipt className="w-4 h-4" />
          </button>

          {record.pendingAmount > 0 && (
            <button
              onClick={() => handleSendReminder(record)}
              className="p-1.5 text-amber-500 hover:text-amber-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/40"
              title="Send Payment Reminder"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fee & Accounts Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tuition collection, bank reconciliation, outstanding invoices, and printable receipts
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedStudentForFee(null);
            setCollectFeeOpen(true);
          }}
          className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Collect Payment</span>
        </button>
      </div>

      {/* 4 KPIs required by Section 14 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Expected"
          value={formatCurrency(feeStats.totalExpected || 2540000)}
          icon={CreditCard}
          subtitle="Full academic year target"
          color="indigo"
        />
        <StatCard
          title="Collected"
          value={formatCurrency(feeStats.collected || 2180000)}
          icon={CheckCircle2}
          trend="+12.4%"
          trendDirection="up"
          color="emerald"
        />
        <StatCard
          title="Pending"
          value={formatCurrency(feeStats.pending || 360000)}
          icon={AlertCircle}
          subtitle="Outstanding receivables"
          color="amber"
        />
        <StatCard
          title="Today's Collection"
          value={formatCurrency(feeStats.todayCollection || 120000)}
          icon={Clock}
          subtitle="Counters & UPI Gateway"
          color="blue"
        />
      </div>

      {/* Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Monthly Fee Collection Trend"
            subtitle="Target vs actual fees recorded per month"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={feeStats.monthlyTrend} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(v) => [formatCurrency(v), 'Amount']} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="collected" name="Collected" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expected" name="Expected" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div>
          <ChartCard
            title="Paid vs Pending Ratio"
            subtitle="Overall academic collection ratio"
          >
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={paidVsPendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paidVsPendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [formatCurrency(v), 'Amount']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Filter and Invoices Table */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Paid', 'Partially Paid', 'Pending', 'Overdue'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedStatusFilter === st
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <DataTable
          columns={columns}
          data={filteredRecords}
          searchable={true}
          searchPlaceholder="Search invoices by student name, roll number, fee type..."
          pageSize={10}
        />
      </div>

      {/* Modals */}
      <CollectFeeModal
        isOpen={collectFeeOpen || !!selectedStudentForFee}
        defaultStudent={selectedStudentForFee}
        onClose={() => {
          setCollectFeeOpen(false);
          setSelectedStudentForFee(null);
        }}
        onPaymentComplete={(txn) => setReceiptData(txn)}
      />

      <FeeReceiptModal
        isOpen={!!receiptData}
        receipt={receiptData}
        onClose={() => setReceiptData(null)}
      />
    </div>
  );
}
