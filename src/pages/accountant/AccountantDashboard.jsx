import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  Users,
  Calendar,
  Search,
  PlusCircle,
  BellRing,
  Download,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowUpRight,
  Filter,
  X
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function AccountantDashboard() {
  const {
    feeStats,
    feeRecords,
    feeTransactions,
    expenses,
    salaries,
    addExpense,
    deleteExpense,
    paySalary,
    updateFeeRecord,
    recordFeePayment,
    sendFeeReminder,
    students
  } = useSchool();

  // Search & Filter for Fee Records
  const [feeSearch, setFeeSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [collectModalRecord, setCollectModalRecord] = useState(null);
  const [editModalRecord, setEditModalRecord] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Form states
  const [paymentAmount, setPaymentAmount] = useState(5000);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [feeType, setFeeType] = useState('Tuition & Composite Fee');

  const [editFeeForm, setEditFeeForm] = useState({
    totalAmount: 45000,
    dueDate: '2026-10-15',
    feeType: 'Term 2 Fee'
  });

  const [newExpenseForm, setNewExpenseForm] = useState({
    category: 'Infrastructure & Lab',
    description: '',
    amount: 15000,
    paidTo: '',
    receiptRef: ''
  });

  // Filtered Fee Records
  const filteredRecords = useMemo(() => {
    return feeRecords.filter(r => {
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchSearch =
        r.studentName.toLowerCase().includes(feeSearch.toLowerCase()) ||
        String(r.rollNo).includes(feeSearch) ||
        r.class.toLowerCase().includes(feeSearch.toLowerCase()) ||
        (r.section && r.section.toLowerCase().includes(feeSearch.toLowerCase()));
      return matchStatus && matchSearch;
    });
  }, [feeRecords, statusFilter, feeSearch]);

  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    if (!collectModalRecord) return;
    recordFeePayment({
      studentId: collectModalRecord.studentId,
      amount: Number(paymentAmount),
      paymentMethod,
      feeType
    });
    setCollectModalRecord(null);
  };

  const handleEditFeeSubmit = (e) => {
    e.preventDefault();
    if (!editModalRecord) return;
    updateFeeRecord(editModalRecord.id, {
      totalAmount: Number(editFeeForm.totalAmount),
      dueDate: editFeeForm.dueDate,
      feeType: editFeeForm.feeType
    });
    setEditModalRecord(null);
  };

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!newExpenseForm.description || !newExpenseForm.paidTo) return;
    addExpense(newExpenseForm);
    setNewExpenseForm({
      category: 'Infrastructure & Lab',
      description: '',
      amount: 15000,
      paidTo: '',
      receiptRef: ''
    });
    setIsExpenseModalOpen(false);
  };

  const totalCollected = feeStats?.collected || 2180000;
  const totalPending = feeStats?.pending || 360000;
  const totalExpenseSum = expenses.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
  const netCashSurplus = totalCollected - totalExpenseSum;

  return (
    <div className="space-y-6">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Bursar & Finance Control Dashboard</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200">
              Accountant Portal
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete institutional accounting: Student fee ledger, class collections, expense approvals, staff payroll, and receipts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsExpenseModalOpen(true)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl shadow-sm flex items-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
          >
            <TrendingDown className="w-4 h-4" />
            <span>Log School Expense</span>
          </button>
        </div>
      </div>

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Total Fee Collection"
          value={formatCurrency(totalCollected)}
          icon={DollarSign}
          subtitle="Collected to Date"
          color="emerald"
        />
        <StatCard
          title="Pending Fees"
          value={formatCurrency(totalPending)}
          icon={AlertCircle}
          subtitle="Outstanding Dues"
          color="amber"
        />
        <StatCard
          title="School Expenses"
          value={formatCurrency(totalExpenseSum)}
          icon={TrendingDown}
          subtitle={`${expenses.length} Approved Vouchers`}
          color="rose"
        />
        <StatCard
          title="Net Cash Balance"
          value={formatCurrency(netCashSurplus)}
          icon={TrendingUp}
          subtitle="Operating Surplus"
          color="purple"
        />
      </div>

      {/* Charts & Analytics: Monthly Trend & Class Collections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Collection vs Expenses */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Monthly Inflow vs Outflow
              </h3>
              <p className="text-xs text-slate-500">Collected Revenue vs Expenses (2026-27)</p>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              Surplus Positive
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feeStats?.monthlyTrend || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="accCollectedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="accExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="collected" name="Fee Collected" stroke="#10b981" fillOpacity={1} fill="url(#accCollectedGrad)" />
                <Area type="monotone" dataKey="expenses" name="Expenditures" stroke="#f43f5e" fillOpacity={1} fill="url(#accExpenseGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class-Wise Collection Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Class-Wise Fee Collection
              </h3>
              <p className="text-xs text-slate-500">Collected vs Outstanding by Grade Cohort</p>
            </div>
            <Badge variant="indigo">All Sections</Badge>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeStats?.classWiseCollection || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="class" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="paid" name="Paid Collection" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending Dues" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section-Wise Collection Insights Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-3">
        <h3 className="text-base font-extrabold text-slate-900">
          Section-Wise Fee Insights & Collection Rate
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {(feeStats?.sectionWiseCollection || []).map((sec) => (
            <div key={sec.sectionKey} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1 text-center">
              <span className="font-extrabold text-xs text-slate-800 block">{sec.sectionKey}</span>
              <span className="text-[11px] text-emerald-700 font-bold block">₹{(sec.paid/1000).toFixed(0)}k Paid</span>
              <span className="text-[10px] text-amber-700 font-medium block">₹{(sec.pending/1000).toFixed(0)}k Due</span>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${sec.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 1: STUDENT FEE MANAGEMENT DESK ================= */}
      <div id="feedesk" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              <span>Student Fee Management & Collection Desk</span>
            </h3>
            <p className="text-xs text-slate-500">
              Manage student fee records, edit due dates, record counter payments, and send reminders.
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['All', 'Paid', 'Pending', 'Overdue', 'Partially Paid'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={feeSearch}
            onChange={e => setFeeSearch(e.target.value)}
            placeholder="Search student name, roll number, class or section..."
            className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
          />
        </div>

        {/* Table of Fee Records */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-extrabold text-slate-400 uppercase bg-slate-50/80">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Fee Structure</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-right">Paid</th>
                <th className="py-3 px-4 text-right">Pending</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRecords.map(rec => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-slate-900 block">{rec.studentName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Roll #{rec.rollNo}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-semibold">
                    {rec.class} - {rec.section}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {rec.feeType}
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                    ₹{rec.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-700">
                    ₹{rec.paidAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-amber-700">
                    ₹{rec.pendingAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono">
                    {rec.dueDate}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant={rec.status === 'Paid' ? 'success' : rec.status === 'Overdue' ? 'danger' : 'warning'}
                      size="sm"
                    >
                      {rec.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {rec.pendingAmount > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setCollectModalRecord(rec);
                            setPaymentAmount(rec.pendingAmount);
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-xs cursor-pointer shadow-xs"
                          title="Record Payment"
                        >
                          Collect
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setEditModalRecord(rec);
                          setEditFeeForm({
                            totalAmount: rec.totalAmount,
                            dueDate: rec.dueDate,
                            feeType: rec.feeType
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors"
                        title="Edit Fee & Due Date"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {rec.pendingAmount > 0 && (
                        <button
                          type="button"
                          onClick={() => sendFeeReminder(rec.studentName, rec.parentContact || '+91 98401 23456', rec.pendingAmount)}
                          className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                          title="Send Fee Reminder via SMS/WhatsApp"
                        >
                          <BellRing className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SECTION 2: SCHOOL EXPENSES DESK ================= */}
      <div id="expenses" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-600" />
              <span>School Operational Expenses & Vouchers</span>
            </h3>
            <p className="text-xs text-slate-500">Track campus bills, lab materials, diesel, and athletic procurement</p>
          </div>
          <button
            onClick={() => setIsExpenseModalOpen(true)}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Voucher</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-extrabold text-slate-400 uppercase bg-slate-50/80">
                <th className="py-3 px-4">Voucher ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Paid To Vendor</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {expenses.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-500">{exp.id}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{exp.description}</td>
                  <td className="py-3 px-4 text-slate-600">{exp.paidTo}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{exp.date}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-rose-700">
                    ₹{Number(exp.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove Expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SECTION 3: STAFF PAYROLL MANAGEMENT ================= */}
      <div id="salaries" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Staff Salary & Monthly Payroll Ledger</span>
            </h3>
            <p className="text-xs text-slate-500">Faculty & administrative salary disbursements for academic staff</p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Cycle: September 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-extrabold text-slate-400 uppercase bg-slate-50/80">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4 text-right">Basic</th>
                <th className="py-3 px-4 text-right">Allowances</th>
                <th className="py-3 px-4 text-right">Deductions</th>
                <th className="py-3 px-4 text-right">Net Payable</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Disbursement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {salaries.map(sal => (
                <tr key={sal.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-extrabold text-slate-900">{sal.name}</td>
                  <td className="py-3 px-4 text-slate-600">{sal.designation}</td>
                  <td className="py-3 px-4 text-right text-slate-700">₹{sal.monthlySalary.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right text-emerald-700">+₹{sal.allowances.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right text-rose-700">-₹{sal.deductions.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                    ₹{sal.netPayable.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={sal.status === 'Paid' ? 'success' : 'warning'} size="sm">
                      {sal.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {sal.status === 'Pending' ? (
                      <button
                        onClick={() => paySalary(sal.id, 'Direct Bank Transfer')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-xs cursor-pointer shadow-xs"
                      >
                        Disburse
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-semibold">{sal.paymentMethod}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SECTION 4: PAYMENT RECEIPTS & TRANSACTIONS ================= */}
      <div id="transactions" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-600" />
              <span>Fee Payment History & Electronic Receipts</span>
            </h3>
            <p className="text-xs text-slate-500">Live payment audit trail with receipt references and timestamps</p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {feeTransactions.length} Verified Payments
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-extrabold text-slate-400 uppercase bg-slate-50/80">
                <th className="py-3 px-4">Receipt #</th>
                <th className="py-3 px-4">Student & Class</th>
                <th className="py-3 px-4">Fee Head</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4 text-right">Print Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {feeTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-700">{tx.receiptNo}</td>
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-slate-900 block">{tx.studentName}</span>
                    <span className="text-[10px] text-slate-400">{tx.class}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{tx.feeType}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-emerald-700">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-semibold">{tx.paymentMethod}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">{tx.transactionRef}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Printing verified receipt ${tx.receiptNo} for ${tx.studentName} (₹${tx.amount.toLocaleString('en-IN')})`)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Collect Fee */}
      {collectModalRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Record Fee Collection</h3>
              <button onClick={() => setCollectModalRecord(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 text-xs text-purple-900 space-y-1">
              <span className="font-extrabold block text-sm">{collectModalRecord.studentName}</span>
              <span>{collectModalRecord.class} - {collectModalRecord.section} • Roll #{collectModalRecord.rollNo}</span>
              <div className="flex items-center justify-between font-bold pt-1">
                <span>Total Fee: ₹{collectModalRecord.totalAmount.toLocaleString('en-IN')}</span>
                <span className="text-amber-800">Pending: ₹{collectModalRecord.pendingAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Collection Amount (₹)</label>
                <input
                  type="number"
                  min="100"
                  max={collectModalRecord.pendingAmount}
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-base font-extrabold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                >
                  <option value="Cash">Cash (Counter Deposit)</option>
                  <option value="UPI (Google Pay / PhonePe)">UPI (Google Pay / PhonePe)</option>
                  <option value="Net Banking (NEFT/RTGS)">Net Banking (NEFT/RTGS)</option>
                  <option value="Cheque / Demand Draft">Cheque / Demand Draft</option>
                  <option value="Debit / Credit Card">Debit / Credit Card POS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fee Head</label>
                <input
                  type="text"
                  value={feeType}
                  onChange={e => setFeeType(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCollectModalRecord(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Confirm & Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Student Fee Details */}
      {editModalRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Edit Student Fee Structure</h3>
              <button onClick={() => setEditModalRecord(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-500">
              Editing fee record for <strong className="text-slate-900">{editModalRecord.studentName}</strong> ({editModalRecord.class} - {editModalRecord.section}).
            </div>

            <form onSubmit={handleEditFeeSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Fee Amount (₹)</label>
                <input
                  type="number"
                  value={editFeeForm.totalAmount}
                  onChange={e => setEditFeeForm({ ...editFeeForm, totalAmount: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-extrabold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fee Description / Head</label>
                <input
                  type="text"
                  value={editFeeForm.feeType}
                  onChange={e => setEditFeeForm({ ...editFeeForm, feeType: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={editFeeForm.dueDate}
                  onChange={e => setEditFeeForm({ ...editFeeForm, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalRecord(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Expense */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Record Institutional Expense</h3>
              <button onClick={() => setIsExpenseModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expense Category</label>
                <select
                  value={newExpenseForm.category}
                  onChange={e => setNewExpenseForm({ ...newExpenseForm, category: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="Infrastructure & Lab">Infrastructure & Lab</option>
                  <option value="Campus Utilities">Campus Utilities (TNEB, Water)</option>
                  <option value="Library & Academics">Library & Academics</option>
                  <option value="School Transport">School Transport (Diesel & Service)</option>
                  <option value="Sports & Co-curricular">Sports & Co-curricular</option>
                  <option value="Administrative Supplies">Administrative Supplies & Printing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newExpenseForm.description}
                  onChange={e => setNewExpenseForm({ ...newExpenseForm, description: e.target.value })}
                  placeholder="e.g. Physics Optical Benches & Prisms"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    min="100"
                    value={newExpenseForm.amount}
                    onChange={e => setNewExpenseForm({ ...newExpenseForm, amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-extrabold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vendor / Payee</label>
                  <input
                    type="text"
                    value={newExpenseForm.paidTo}
                    onChange={e => setNewExpenseForm({ ...newExpenseForm, paidTo: e.target.value })}
                    placeholder="e.g. Scientific Co."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Log & Approve Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
