import React, { useState } from 'react';
import {
  BarChart3,
  FileSpreadsheet,
  Download,
  Printer,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  Award,
  BookOpen,
  Bus,
  Users
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { reportService } from '../../services/reportService';
import { ChartCard } from '../../components/common/ChartCard';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { formatCurrency } from '../../utils/formatters';

export function ReportsPage() {
  const { students, feeStats, academicYear } = useSchool();
  const [selectedReportType, setSelectedReportType] = useState('summary'); // 'summary' | 'student' | 'fee' | 'attendance' | 'academic'

  const reportsData = reportService.getSummaryReports();

  const handleExportCSV = () => {
    const summaryData = [
      { Metric: 'Total Enrolled Students', Value: reportsData.totalStudents },
      { Metric: 'Fee Collection Efficiency', Value: `${reportsData.feeCollectionRate}%` },
      { Metric: 'Average Daily Attendance', Value: `${reportsData.attendanceRate}%` },
      { Metric: 'Quarterly Examination Pass Rate', Value: `${reportsData.passRateQuarterly}%` }
    ];
    reportService.exportToCSV(`GreenValley_Executive_Report_AY_${academicYear}`, summaryData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Reports & Executive Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive business intelligence, compliance reporting, and audit export
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel / CSV</span>
          </button>
        </div>
      </div>

      {/* Report Categories Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'summary', label: 'Executive Summary' },
          { id: 'student', label: 'Student Admissions Report' },
          { id: 'fee', label: 'Fee Revenue Audit' },
          { id: 'academic', label: 'Academic Performance' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedReportType(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedReportType === cat.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Enrollment Strength" value="1,248" icon={Users} color="indigo" />
        <StatCard title="Fee Collection Rate" value={`${reportsData.feeCollectionRate}%`} icon={TrendingUp} color="emerald" />
        <StatCard title="Quarterly Pass Rate" value={`${reportsData.passRateQuarterly}%`} icon={Award} color="purple" />
        <StatCard title="Attendance Average" value={`${reportsData.attendanceRate}%`} icon={CheckCircle2} color="blue" />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* House Distribution */}
        <ChartCard
          title="Student House Distribution"
          subtitle="Roster breakdown across Emerald, Ruby, Sapphire, and Topaz"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={reportsData.houseDistribution} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`${v} Students`, 'Count']} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {reportsData.houseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Gender Demographics Ratio */}
        <ChartCard
          title="Gender Demographics Ratio"
          subtitle="Boys to Girls enrollment ratio in the current academic session"
        >
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={reportsData.genderRatio}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {reportsData.genderRatio.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v} Students`, 'Count']} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Admissions Trajectory */}
        <ChartCard
          title="Cumulative Monthly Admissions"
          subtitle="New admissions processed since session opening in April 2026"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={reportsData.monthlyAdmissionTrend} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`${v} Enrollments`, 'Count']} />
              <Area type="monotone" dataKey="admissions" stroke="#0ea5e9" fill="#e0f2fe" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue Performance */}
        <ChartCard
          title="Term-wise Fee Inflow"
          subtitle="Fee collection vs outstanding receivables"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={feeStats.classWiseCollection} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="class" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v) => [formatCurrency(v), 'Amount']} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="paid" name="Collected" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
