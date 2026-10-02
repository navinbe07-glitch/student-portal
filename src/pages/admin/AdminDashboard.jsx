import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  UserCheck,
  UserX,
  CreditCard,
  AlertCircle,
  PlusCircle,
  CheckSquare,
  FileSpreadsheet,
  Megaphone,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  School,
  Sparkles
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { StatCard } from '../../components/common/StatCard';
import { ChartCard } from '../../components/common/ChartCard';
import { Badge } from '../../components/common/Badge';
import { AddStudentModal } from '../../components/forms/AddStudentModal';
import { CollectFeeModal } from '../../components/forms/CollectFeeModal';
import { FeeReceiptModal } from '../../components/preview/FeeReceiptModal';
import { formatCurrency, formatCurrencyCompact, formatDate } from '../../utils/formatters';

export function AdminDashboard() {
  const navigate = useNavigate();
  const {
    students,
    totalStudentsCount,
    staff,
    feeStats,
    feeTransactions,
    announcements,
    academicYear,
    schoolName
  } = useSchool();

  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [collectFeeOpen, setCollectFeeOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // 1. Student Attendance Trend data
  const attendanceTrendData = [
    { day: 'Mon', attendance: 94.2, present: 1175, absent: 73 },
    { day: 'Tue', attendance: 92.8, present: 1158, absent: 90 },
    { day: 'Wed', attendance: 95.1, present: 1187, absent: 61 },
    { day: 'Thu', attendance: 93.6, present: 1168, absent: 80 },
    { day: 'Fri (Today)', attendance: 91.0, present: 1136, absent: 112 },
  ];

  // 2. Monthly Fee Collection data
  const monthlyFeeData = feeStats.monthlyTrend || [
    { month: 'Jun', collected: 940000, expected: 1000000 },
    { month: 'Jul', collected: 450000, expected: 500000 },
    { month: 'Aug', collected: 380000, expected: 420000 },
    { month: 'Sep', collected: 290000, expected: 350000 },
    { month: 'Oct', collected: 120000, expected: 270000 }
  ];

  // 3. Student Admission Trend data
  const admissionTrendData = [
    { month: 'Apr', admissions: 145 },
    { month: 'May', admissions: 310 },
    { month: 'Jun', admissions: 520 },
    { month: 'Jul', admissions: 180 },
    { month: 'Aug', admissions: 65 },
    { month: 'Sep', admissions: 28 }
  ];

  // 4. Class-wise Student Distribution data
  const classDistributionData = [
    { name: 'Primary (1-5)', students: 423, fill: '#6366f1' },
    { name: 'Middle (6-8)', students: 355, fill: '#0ea5e9' },
    { name: 'Secondary (9-10)', students: 254, fill: '#10b981' },
    { name: 'Higher Sec (11-12)', students: 236, fill: '#f59e0b' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Term 1 Parent-Teacher Meeting (PTM)', date: '26 Sep 2026', time: '09:00 AM – 01:00 PM', type: 'Parent Meeting', color: 'indigo' },
    { id: 2, title: 'Quarterly Examination Marks Review', date: '29 Sep 2026', time: '02:30 PM', type: 'Academic', color: 'blue' },
    { id: 3, title: 'Inter-House Sports Day Athletic Trials', date: '01 Oct 2026', time: '08:00 AM', type: 'Sports', color: 'emerald' },
    { id: 4, title: 'Gandhi Jayanti Holiday', date: '02 Oct 2026', time: 'All Day', type: 'Holiday', color: 'amber' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-brand-200 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Academic Year {academicYear}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, Admin 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            {schoolName} • Today is 22 Sep 2026
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => setAddStudentOpen(true)}
            className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-brand-500/30 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Student</span>
          </button>
          <button
            onClick={() => setCollectFeeOpen(true)}
            className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Collect Fee</span>
          </button>
        </div>
      </div>

      {/* Section 1: Academic & Campus Metrics (Compact Horizontal Scroll on mobile/tablet, 4-col grid on desktop) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Campus & Academic Metrics
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-bold border border-indigo-200/60 dark:border-indigo-800">
              Live Enrollment & Daily Roll Call
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Swipe horizontally on mobile →</span>
        </div>

        <div className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-2 pt-0.5 scrollbar-none snap-x snap-mandatory xl:grid xl:grid-cols-4">
          <div className="min-w-[230px] sm:min-w-[250px] xl:min-w-0 flex-1 snap-start">
            <StatCard
              title="Total Enrolled"
              value={totalStudentsCount.toLocaleString()}
              icon={Users}
              trend="+4.2%"
              trendDirection="up"
              color="indigo"
              onClick={() => navigate('/admin/students')}
            />
          </div>
          <div className="min-w-[230px] sm:min-w-[250px] xl:min-w-0 flex-1 snap-start">
            <StatCard
              title="Faculty & Staff"
              value="86 Active"
              icon={GraduationCap}
              trend="+2 New"
              trendDirection="up"
              color="purple"
              onClick={() => navigate('/admin/staff')}
            />
          </div>
          <div className="min-w-[230px] sm:min-w-[250px] xl:min-w-0 flex-1 snap-start">
            <StatCard
              title="Present Today"
              value="1,136"
              icon={UserCheck}
              subtitle="91.0% Daily Turnout"
              color="emerald"
              onClick={() => navigate('/admin/attendance')}
            />
          </div>
          <div className="min-w-[230px] sm:min-w-[250px] xl:min-w-0 flex-1 snap-start">
            <StatCard
              title="Absent Today"
              value="112"
              icon={UserX}
              subtitle="9.0% Absentees"
              color="rose"
              onClick={() => navigate('/admin/attendance')}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Finance & Revenue Metrics (Compact Horizontal Scroll on mobile/tablet, 4-col grid on desktop) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Finance & Revenue Overview
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200/60 dark:border-emerald-800">
              Fee Collections & Dues
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Swipe horizontally on mobile →</span>
        </div>

        <div className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-2 pt-0.5 scrollbar-none snap-x snap-mandatory xl:grid xl:grid-cols-4">
          <div className="min-w-[230px] sm:min-w-[250px] xl:min-w-0 flex-1 snap-start">
            <StatCard
              title="Fees Collected"
              value={formatCurrencyCompact(feeStats?.collected || 2180000)}
              icon={CreditCard}
              trend="+8.5% YoY"
              trendDirection="up"
              color="emerald"
              onClick={() => navigate('/admin/fees')}
            />
          </div>
          <div className="min-w-[230px] sm:min-w-[250px] xl:min-w-0 flex-1 snap-start">
            <StatCard
              title="Pending Fees"
              value={formatCurrencyCompact(feeStats?.pending || 360000)}
              icon={AlertCircle}
              subtitle="Due by Oct 15"
              color="amber"
              onClick={() => navigate('/admin/fees')}
            />
          </div>
          <div className="min-w-[230px] sm:min-w-[250px] xl:min-w-0 flex-1 snap-start">
            <StatCard
              title="Collection Target"
              value={formatCurrencyCompact(feeStats?.totalExpected || 2540000)}
              icon={TrendingUp}
              trend="86% Met"
              trendDirection="up"
              color="blue"
              onClick={() => navigate('/admin/fees')}
            />
          </div>
          <div className="min-w-[230px] sm:min-w-[250px] xl:min-w-0 flex-1 snap-start">
            <StatCard
              title="Today's Collections"
              value={formatCurrencyCompact(feeStats?.todayCollection || 120000)}
              icon={Clock}
              subtitle="14 Transactions"
              color="indigo"
              onClick={() => navigate('/admin/fees')}
            />
          </div>
        </div>
      </div>

      {/* 4 Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Student Attendance Trend */}
        <ChartCard
          title="Student Attendance Trend"
          subtitle="Daily school attendance rate across all standards this week"
          action={
            <Badge variant="success">91% Today</Badge>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip
                formatter={(value) => [`${value}% Attendance`, 'Rate']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1' }}
              />
              <Area type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#attendanceGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: Monthly Fee Collection */}
        <ChartCard
          title="Monthly Fee Collection"
          subtitle="Expected vs actual revenue collection in Lakhs (₹)"
          action={
            <button
              onClick={() => navigate('/admin/fees')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View Details
            </button>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyFeeData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip
                formatter={(value) => [formatCurrency(value), 'Amount']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="collected" name="Collected" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expected" name="Target" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 3: Student Admission Trend */}
        <ChartCard
          title="Student Admission Trend"
          subtitle="Monthly admissions intake for the current academic session"
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={admissionTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(val) => [`${val} Admissions`, 'New Students']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1' }}
              />
              <Line type="monotone" dataKey="admissions" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 4: Class-wise Student Distribution */}
        <ChartCard
          title="Class-wise Student Distribution"
          subtitle="Enrolled students across Primary, Middle, Secondary, and Higher Sec"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={classDistributionData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(val) => [`${val} Students`, 'Count']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1' }}
              />
              <Bar dataKey="students" radius={[0, 6, 6, 0]}>
                {classDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quick Action Buttons Grid */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs text-slate-400">
          Executive Quick Actions
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none snap-x sm:grid sm:grid-cols-3 lg:grid-cols-6">
          <button
            onClick={() => setAddStudentOpen(true)}
            className="min-w-[125px] sm:min-w-0 flex-1 snap-start p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center text-center gap-2 transition-all group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Add Student</span>
          </button>

          <button
            onClick={() => navigate('/admin/attendance')}
            className="min-w-[125px] sm:min-w-0 flex-1 snap-start p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center text-center gap-2 transition-all group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">Attendance</span>
          </button>

          <button
            onClick={() => setCollectFeeOpen(true)}
            className="min-w-[125px] sm:min-w-0 flex-1 snap-start p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center text-center gap-2 transition-all group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">Collect Fee</span>
          </button>

          <button
            onClick={() => navigate('/admin/communication')}
            className="min-w-[125px] sm:min-w-0 flex-1 snap-start p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center text-center gap-2 transition-all group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">Circular</span>
          </button>

          <button
            onClick={() => navigate('/admin/exams')}
            className="min-w-[125px] sm:min-w-0 flex-1 snap-start p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center text-center gap-2 transition-all group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">Create Exam</span>
          </button>

          <button
            onClick={() => navigate('/admin/reports')}
            className="min-w-[125px] sm:min-w-0 flex-1 snap-start p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center text-center gap-2 transition-all group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">Reports</span>
          </button>
        </div>
      </div>

      {/* Bottom 2-Column: Recent Activities & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities (2 cols on large screen) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Activity Feed
            </h3>
            <span className="text-xs text-slate-400">Real-time school events</span>
          </div>

          <div className="space-y-3.5">
            {[
              { title: 'Fee Payment Received', desc: `₹20,000 paid by Karthik S. (Class 8-A) via UPI`, time: '25 mins ago', icon: CreditCard, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950' },
              { title: 'Attendance Marked', desc: 'Mrs. Revathi marked 10th Standard Section A roll call', time: '1 hour ago', icon: CheckSquare, color: 'text-brand-600 bg-brand-50 dark:bg-brand-950' },
              { title: 'New Homework Assigned', desc: 'Trigonometry & Quadratic Identities published for 10-A', time: '2 hours ago', icon: FileSpreadsheet, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950' },
              { title: 'Quarterly Marks Updated', desc: 'Mathematics and Science marks entered for 42 students', time: 'Yesterday', icon: TrendingUp, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950' },
              { title: 'Official Circular Published', desc: 'Parent-Teacher Meeting notice sent to 1,248 registered parents', time: 'Yesterday', icon: Megaphone, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950' },
            ].map((act, i) => {
              const Icon = act.icon;
              return (
                <div key={i} className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className={`p-2.5 rounded-xl shrink-0 ${act.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {act.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {act.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events Calendar Widget */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upcoming Events
              </h3>
              <Calendar className="w-4 h-4 text-brand-600" />
            </div>

            <div className="space-y-3">
              {upcomingEvents.map(evt => (
                <div key={evt.id} className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span className="truncate pr-2">{evt.title}</span>
                    <Badge variant={evt.type === 'Holiday' ? 'danger' : evt.type === 'Sports' ? 'teal' : 'info'} size="sm">
                      {evt.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {evt.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <button
              onClick={() => navigate('/admin/academics')}
              className="w-full py-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Full Academic Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddStudentModal
        isOpen={addStudentOpen}
        onClose={() => setAddStudentOpen(false)}
      />

      <CollectFeeModal
        isOpen={collectFeeOpen}
        onClose={() => setCollectFeeOpen(false)}
        onPaymentComplete={(txn) => setReceiptData(txn)}
      />

      <FeeReceiptModal
        isOpen={!!receiptData}
        onClose={() => setReceiptData(null)}
        receipt={receiptData}
      />
    </div>
  );
}
