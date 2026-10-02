import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  Users,
  CheckSquare,
  BookOpen,
  PlusCircle,
  FileSpreadsheet,
  Clock,
  MapPin,
  ArrowRight,
  Bell,
  CheckCircle2,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';

export function TeacherDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { notifications, homework, exams, students } = useSchool();

  // Teacher timetable periods for today (Mrs. Revathi's classes)
  const teacherTodayClasses = [
    { period: 1, class: '10th Standard - A', subject: 'Mathematics (Algebra & Quadratic Identities)', time: '08:45 – 09:30 AM', room: 'Room 204', status: 'Live Now' },
    { period: 2, class: '10th Standard - B', subject: 'Mathematics (Coordinate Geometry)', time: '09:30 – 10:15 AM', room: 'Room 205', status: 'Upcoming' },
    { period: 4, class: '10th Standard - A', subject: 'Math Tutorial & Doubt Clearing', time: '11:15 – 12:00 PM', room: 'Room 204', status: 'Scheduled' },
    { period: 6, class: '12th Standard - A', subject: 'Calculus & Integration', time: '01:30 – 02:15 PM', room: 'Room 302', status: 'Scheduled' }
  ];

  // Upcoming Exams List
  const upcomingExamsList = exams && exams.length > 0 ? exams.slice(0, 3) : [
    { id: 'EXM-01', name: 'Quarterly Examination 2026', startDate: '2026-10-12', targetClasses: ['10th Standard', '11th Standard', '12th Standard'], status: 'Upcoming' },
    { id: 'EXM-02', name: 'Mathematics Unit Test 3', startDate: '2026-10-20', targetClasses: ['10th Standard - A'], status: 'Scheduled' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-emerald-200 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Class Teacher: 10th Standard - Section A</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, Mrs. Revathi 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Green Valley Matriculation School • 4 Scheduled Periods Today
          </p>
        </div>
      </div>

      {/* Mobile-Optimized Quick Action Cards: Exactly 2 cards per row on mobile to reduce scrolling */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quick Faculty Actions (2 Per Row)
          </h3>
          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Synced Real-Time
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/teacher/attendance')}
            className="p-4 bg-white hover:bg-emerald-50/60 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between gap-3 text-left transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Mark Attendance</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">10-A Morning Roll Call</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/teacher/marks')}
            className="p-4 bg-white hover:bg-indigo-50/60 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between gap-3 text-left transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Enter Exam Marks</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Quarterly Marks Entry</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/teacher/content')}
            className="p-4 bg-white hover:bg-purple-50/60 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between gap-3 text-left transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Class Content</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">1-Click Publish to Class</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/teacher/students')}
            className="p-4 bg-white hover:bg-blue-50/60 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between gap-3 text-left transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Find Students</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Compact ID & Profile</p>
            </div>
          </button>
        </div>
      </div>

      {/* KPI Stats: 2 Per Row on Mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Today's Classes"
          value="4"
          icon={CalendarDays}
          subtitle="Periods 1, 2, 4, 6"
          color="indigo"
          onClick={() => navigate('/teacher')}
        />
        <StatCard
          title="Students Enrolled"
          value={String(students.filter(s => s.class === '10th Standard').length || 42)}
          icon={Users}
          subtitle="10th Standard Cohort"
          color="blue"
          onClick={() => navigate('/teacher/students')}
        />
        <StatCard
          title="Attendance Done"
          value="95.2%"
          icon={CheckSquare}
          subtitle="Class 10-A Present Rate"
          color="emerald"
          onClick={() => navigate('/teacher/attendance')}
        />
        <StatCard
          title="Active Materials"
          value={String(homework.length || 3)}
          icon={BookOpen}
          subtitle="Assigned to Students"
          color="purple"
          onClick={() => navigate('/teacher/content')}
        />
      </div>

      {/* 2-Column: Today's Timetable & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Timetable / Classes */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Today&apos;s Class Timetable</span>
              </h3>
              <p className="text-xs text-slate-500">Live Period Schedule (Monday - Saturday)</p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Period 1 In Progress
            </span>
          </div>

          <div className="space-y-2.5">
            {teacherTodayClasses.map(cls => (
              <div
                key={cls.period}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-white flex items-center justify-between gap-3 text-xs transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl font-extrabold flex items-center justify-center text-sm shrink-0 ${
                    cls.status === 'Live Now'
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    P{cls.period}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{cls.class}</h4>
                    <p className="text-[11px] text-slate-500">{cls.subject}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-800 block text-xs">{cls.time}</span>
                  <span className="text-[11px] text-slate-500">{cls.room}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Upcoming Exams & Evaluation</span>
              </h3>
              <p className="text-xs text-slate-500">Scheduled Exams & Countdown</p>
            </div>
            <button
              onClick={() => navigate('/teacher/marks')}
              className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Enter Marks &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {upcomingExamsList.map(ex => (
              <div
                key={ex.id}
                className="p-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{ex.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                    Starts {ex.startDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Classes: {Array.isArray(ex.targetClasses) ? ex.targetClasses.join(', ') : ex.targetClasses}</span>
                  <span className="font-bold text-emerald-700">All Sections Included</span>
                </div>
              </div>
            ))}

            {/* Quick reminder box */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-[11px] leading-relaxed">
                Marks and attendance submitted here immediately sync across Student, Parent, and Principal ERP records in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
