import React from 'react';
import { CheckSquare, Calendar, UserCheck, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { useParentLanguage } from '../../context/ParentLanguageContext';
import { Badge } from '../../components/common/Badge';

export function ParentAttendance() {
  const { selectedChild } = useSchool();
  const { t, lang } = useParentLanguage();

  const child = selectedChild;

  // Monthly historical trend data for child
  const monthlyData = [
    { month: 'Jun', percentage: 96, label: lang === 'ta' ? 'ஜூன்' : 'Jun' },
    { month: 'Jul', percentage: 92, label: lang === 'ta' ? 'ஜூலை' : 'Jul' },
    { month: 'Aug', percentage: 95, label: lang === 'ta' ? 'ஆக' : 'Aug' },
    { month: 'Sep', percentage: child?.attendance || 94, label: lang === 'ta' ? 'செப்' : 'Sep' }
  ];

  // Days in month presence pattern
  const totalDays = 30;
  const daysOfWeek = [
    t('mon', 'Mon'),
    t('tue', 'Tue'),
    t('wed', 'Wed'),
    t('thu', 'Thu'),
    t('fri', 'Fri'),
    t('sat', 'Sat'),
    t('sun', 'Sun')
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('attendanceTitle', 'Child Attendance Tracker')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {child?.name} • {child?.class} ({child?.section}) • #{child?.rollNo}
          </p>
        </div>

        <Badge variant={child?.attendance >= 90 ? 'success' : 'warning'} size="md">
          {child?.attendance}% {t('overallAttendance', 'Overall Attendance')}
        </Badge>
      </div>

      {/* 2-Column Summary Cards: Overall %, Present, Absent, Leave */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Card 1: Overall % */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
              {t('statOverallPct', 'Overall %')}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {child?.attendance}%
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t('goodStanding', 'Good Standing')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Present Days */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block uppercase tracking-wider">
              {t('statPresentDays', 'Present')}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {child?.presentDays || 78}
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              {t('daysUnit', 'Days')} (Academic Year)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Absent Days */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-rose-600 dark:text-rose-400 font-bold block uppercase tracking-wider">
              {t('statAbsentDays', 'Absent')}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
              {child?.absentDays || 4}
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              {t('daysUnit', 'Days')} (Medical/Personal)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Leave Days */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold block uppercase tracking-wider">
              {t('statLeaveDays', 'Leave')}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              {child?.leaveDays || 2}
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              {t('daysUnit', 'Days')} (Sanctioned Leave)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Monthly Attendance Calendar / Table (Present Days Green) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              {t('monthlyLogTitle', 'Monthly Attendance Log')} — September 2026
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ta' ? 'பச்சை நிறத்தில் குறிக்கப்பட்ட நாட்கள் வருகை புரிந்த நாட்களாகும்' : 'Present dates are highlighted in green.'}
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-[11px] font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-slate-600 dark:text-slate-300">{t('presentLegend', 'Present')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="text-slate-600 dark:text-slate-300">{t('absentLegend', 'Absent')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="text-slate-600 dark:text-slate-300">{t('leaveLegend', 'Leave')}</span>
            </div>
          </div>
        </div>

        {/* 7-Column Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 text-center text-xs">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-1.5 font-extrabold text-slate-400 uppercase text-[10px] sm:text-xs">
              {day}
            </div>
          ))}

          {Array.from({ length: totalDays }, (_, i) => {
            const dayNum = i + 1;
            const isWeekend = (dayNum % 7 === 6) || (dayNum % 7 === 0);
            const isAbsent = dayNum === 14;
            const isLeave = dayNum === 23;

            let styleClass = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-xs';
            let label = t('presentLegend', 'Present');

            if (isWeekend) {
              styleClass = 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 border border-slate-200/50 dark:border-slate-800';
              label = t('offLegend', 'Off');
            } else if (isAbsent) {
              styleClass = 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800';
              label = t('absentLegend', 'Absent');
            } else if (isLeave) {
              styleClass = 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800';
              label = t('leaveLegend', 'Leave');
            }

            return (
              <div
                key={i}
                className={`py-2 sm:py-3 rounded-2xl font-bold transition-transform hover:scale-105 ${styleClass}`}
              >
                <span className="text-xs sm:text-sm block">{dayNum}</span>
                <span className="block text-[8px] sm:text-[9px] font-semibold mt-0.5 opacity-90 truncate">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Percentage + Attendance Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              {t('attendanceTrendTitle', 'Monthly Attendance Percentage Trend')}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ta' ? 'கல்வி ஆண்டு 2026-2027 மாதவாரியான வருகை' : 'Academic Year 2026–2027 performance chart'}
            </p>
          </div>
          <Badge variant="success" size="sm">
            {child?.attendance}% {t('overallAttendance', 'Average')}
          </Badge>
        </div>

        <div className="h-60 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="parentAttendanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[60, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} unit="%" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-2xl text-xs shadow-xl border border-slate-700">
                        <span className="font-bold">{payload[0].payload.label} 2026</span>
                        <div className="text-emerald-400 font-extrabold text-sm mt-1">
                          {payload[0].value}% {t('overallAttendance', 'Attendance')}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#parentAttendanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
