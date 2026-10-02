import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  CreditCard,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  PhoneCall,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useParentLanguage } from '../../context/ParentLanguageContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { CollectFeeModal } from '../../components/forms/CollectFeeModal';
import { FeeReceiptModal } from '../../components/preview/FeeReceiptModal';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { initialTimetable } from '../../data/mockTimetable';

export function ParentDashboard() {
  const navigate = useNavigate();
  const { selectedChild, notifications } = useSchool();
  const { t, lang } = useParentLanguage();

  const child = selectedChild;

  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Days list Monday to Saturday
  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Look up timetable for active child's class and section
  const timetableKey = `${child?.class}-${child?.section}`;
  const classMatrix = initialTimetable[timetableKey] || initialTimetable['10th Standard-A'] || {};
  const currentDayClasses = classMatrix[selectedDay] || [];

  const pendingHwCount = (child?.homework || []).filter(h => h.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-amber-100 border border-white/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{t('portalTitle', 'Parent Portal')} • Green Valley Matriculation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('goodMorning', 'Good Morning')} 👋
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              {t('welcomeParent', 'Welcome, Mr. Ramesh Kumar')} • {t('todayIs', 'Today is')} {formatDate('2026-09-22')}
            </p>
          </div>

          {/* Active Child Snapshot Badge */}
          <div className="p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 flex items-center gap-3">
            <Avatar src={child?.avatar} name={child?.name} size="md" className="ring-2 ring-white/60" />
            <div className="text-left text-xs">
              <span className="font-extrabold text-sm block text-white">{child?.name}</span>
              <span className="text-amber-100 font-medium">
                {child?.class} - {child?.section} • {t('rollNo', 'Roll')} #{child?.rollNo}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title={t('statAttendance', 'Attendance')}
          value={`${child?.attendance || 94}%`}
          icon={CheckSquare}
          subtitle={t('statAttendanceSub', 'Present Today: Yes')}
          color="emerald"
          onClick={() => navigate('/parent/attendance')}
        />
        <StatCard
          title={t('statFeeDue', 'Fee Due')}
          value={formatCurrency(child?.pendingFee || 0)}
          icon={CreditCard}
          subtitle={child?.pendingFee === 0 ? t('noDuesTitle', 'All Fees Paid') : `${t('dueBy', 'Due by')} ${formatDate(child?.feeDueDate || '2026-10-15')}`}
          color={child?.pendingFee === 0 ? 'emerald' : 'amber'}
          onClick={() => navigate('/parent/fees')}
        />
        <StatCard
          title={t('statHomework', 'Homework')}
          value={`${pendingHwCount} ${t('statHomework', 'Pending')}`}
          icon={BookOpen}
          subtitle={t('statHomeworkSub', 'Due this week')}
          color="purple"
          onClick={() => navigate('/parent/academic')}
        />
        <StatCard
          title={t('statNextExam', 'Next Exam')}
          value="Mathematics"
          icon={Calendar}
          subtitle={t('statNextExamSub', 'Half-Yearly Examination')}
          color="blue"
          onClick={() => navigate('/parent/academic')}
        />
      </div>

      {/* Pending Fees + Due Date Card with "Pay Fees" Button */}
      {child?.pendingFee > 0 ? (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/20 border-2 border-amber-300 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/25">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-base">
                  {t('pendingFeesDue', 'Pending Tuition & Lab Fee')}: {formatCurrency(child.pendingFee)}
                </span>
                <Badge variant="warning" size="sm">
                  {t('dueBy', 'Due by')} {formatDate(child.feeDueDate || '2026-10-15')}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {t('tuitionNotice', 'Term installments are due. Instant online UPI / card payment available.')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setFeeModalOpen(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all self-start sm:self-auto cursor-pointer"
          >
            {t('payFees', 'Pay Fees')} ({formatCurrency(child.pendingFee)})
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <span className="font-extrabold text-emerald-900 dark:text-emerald-200 text-sm block">
                {t('noDuesTitle', 'Nil Dues • Fully Settled')}
              </span>
              <span className="text-emerald-700 dark:text-emerald-400">
                {t('noDuesSubtitle', 'All term fees paid and verified by accounts office.')}
              </span>
            </div>
          </div>
          <Badge variant="success" size="sm">
            {t('allFeesPaid', 'All Fees Cleared')}
          </Badge>
        </div>
      )}

      {/* Class Teacher Card with Call/Contact Button */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              {t('classTeacher', 'Class Teacher')} ({child?.class} - {child?.section})
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {child?.classTeacher || 'Mrs. Revathi Ramanathan'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {child?.classTeacherSubject || 'Mathematics'} • {child?.classTeacherPhone || '+91 94441 55667'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href={`tel:${child?.classTeacherPhone || '+919444155667'}`}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold text-xs shadow-xs transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t('contactTeacher', 'Call Teacher')}</span>
          </a>
        </div>
      </div>

      {/* Monday–Saturday Timetable Component */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t('weeklyTimetable', 'Monday – Saturday Timetable')}
            </h3>
            <p className="text-xs text-slate-400">
              {child?.name} • {child?.class} ({child?.section})
            </p>
          </div>
          <Badge variant="info" size="sm">
            {currentDayClasses.length} {t('period', 'Periods')} ({selectedDay})
          </Badge>
        </div>

        {/* Day Switcher: Monday to Saturday */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {daysList.map((day) => {
            const isDaySelected = selectedDay === day;
            const dayKey = `day${day}`;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isDaySelected
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t(dayKey, day)}
              </button>
            );
          })}
        </div>

        {/* Periods List */}
        <div className="space-y-2.5 pt-2">
          {currentDayClasses.length > 0 ? (
            currentDayClasses.map((slot) => (
              <div
                key={slot.period}
                className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-xs hover:border-amber-300 dark:hover:border-amber-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-extrabold flex items-center justify-center text-xs shrink-0 border border-amber-200/60 dark:border-amber-800/60">
                    P{slot.period}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {slot.subject}
                    </h4>
                    <span className="text-slate-400 text-[11px]">{slot.teacher}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{slot.time}</span>
                  <span className="text-[10px] text-slate-400">{slot.room}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No classes scheduled for {selectedDay}.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CollectFeeModal
        isOpen={feeModalOpen}
        defaultStudent={child}
        onClose={() => setFeeModalOpen(false)}
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
