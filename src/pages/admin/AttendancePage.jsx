import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Save,
  BarChart3,
  UserCheck,
  TrendingUp,
  Download
} from 'lucide-react';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { attendanceService } from '../../services/attendanceService';
import { Badge } from '../../components/common/Badge';
import { ChartCard } from '../../components/common/ChartCard';

export function AttendancePage() {
  const { students, saveAttendance } = useSchool();

  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'teacher' | 'reports'
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedClass, setSelectedClass] = useState('10th Standard');
  const [selectedSection, setSelectedSection] = useState('A');

  const [rollCall, setRollCall] = useState([]);

  // Load attendance for selected class & date
  useEffect(() => {
    const list = attendanceService.getAttendanceForClass(selectedDate, selectedClass, selectedSection);
    setRollCall(list);
  }, [selectedDate, selectedClass, selectedSection, students]);

  const handleStatusChange = (studentId, newStatus) => {
    setRollCall(prev => prev.map(item => {
      if (item.studentId === studentId) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const handleMarkAllPresent = () => {
    setRollCall(prev => prev.map(item => ({ ...item, status: 'Present' })));
  };

  const handleSave = () => {
    saveAttendance(selectedDate, selectedClass, selectedSection, rollCall);
  };

  // Metrics
  const presentCount = rollCall.filter(r => r.status === 'Present').length;
  const absentCount = rollCall.filter(r => r.status === 'Absent').length;
  const lateCount = rollCall.filter(r => r.status === 'Late').length;
  const leaveCount = rollCall.filter(r => r.status === 'Leave').length;
  const totalCount = rollCall.length || 1;
  const attendancePct = ((presentCount + lateCount) / totalCount * 100).toFixed(1);

  const stats = attendanceService.getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Attendance Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time daily roll call sheets, absenteeism flags, and longitudinal trends
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800">
        {[
          { id: 'student', label: 'Student Roll Call' },
          { id: 'teacher', label: 'Teacher / Staff Attendance' },
          { id: 'reports', label: 'Attendance Analytics & Trends' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'student' && (
        <div className="space-y-5 animate-fade-in">
          {/* Controls Bar */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Class:</label>
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200"
                >
                  {['9th Standard', '10th Standard', '11th Standard', '12th Standard'].map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Section:</label>
                <select
                  value={selectedSection}
                  onChange={e => setSelectedSection(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>

            {/* Live Count Badges */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl font-bold border border-emerald-200 dark:border-emerald-800">
                Present: {presentCount}
              </span>
              <span className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-xl font-bold border border-rose-200 dark:border-rose-800">
                Absent: {absentCount}
              </span>
              <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-xl font-bold border border-indigo-200 dark:border-indigo-800">
                Rate: {attendancePct}%
              </span>
            </div>
          </div>

          {/* Student Roll Call Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Roll Call: {selectedClass} - {selectedSection} ({rollCall.length} Students)
              </h3>
              <span className="text-slate-400">Tap status button to toggle presence</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase bg-slate-50/50 dark:bg-slate-800/30">
                    <th className="py-3 px-4">Roll No</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4 text-center">Attendance Status</th>
                    <th className="py-3 px-4 text-right">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rollCall.map(item => (
                    <tr key={item.studentId} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-500">
                        #{item.rollNo}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white text-sm">
                        {item.name}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {[
                            { status: 'Present', label: 'Present', color: 'bg-emerald-600 text-white shadow-xs', idle: 'hover:bg-emerald-50 text-slate-600' },
                            { status: 'Absent', label: 'Absent', color: 'bg-rose-600 text-white shadow-xs', idle: 'hover:bg-rose-50 text-slate-600' },
                            { status: 'Late', label: 'Late', color: 'bg-amber-600 text-white shadow-xs', idle: 'hover:bg-amber-50 text-slate-600' },
                            { status: 'Leave', label: 'Leave', color: 'bg-blue-600 text-white shadow-xs', idle: 'hover:bg-blue-50 text-slate-600' }
                          ].map(btn => (
                            <button
                              key={btn.status}
                              onClick={() => handleStatusChange(item.studentId, btn.status)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                item.status === btn.status
                                  ? btn.color
                                  : `bg-slate-100 dark:bg-slate-800 ${btn.idle}`
                              }`}
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400">
                        {item.status === 'Absent' ? (
                          <span className="text-rose-500 font-semibold">SMS Alert Triggered</span>
                        ) : (
                          <span>Regular entry</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Attendance Tab */}
      {activeTab === 'teacher' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Faculty Bio-metric Attendance Today
              </h3>
              <p className="text-xs text-slate-500">84 Present • 2 on Approved Casual Leave</p>
            </div>
            <Badge variant="success">97.6% Faculty Attendance</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              { name: 'Dr. K. Sivasankaran (Principal)', time: '08:15 AM', status: 'Present' },
              { name: 'Mrs. Revathi Ramanathan (PGT Math)', time: '08:24 AM', status: 'Present' },
              { name: 'Mr. R. Parthiban (TGT Science)', time: '08:30 AM', status: 'Present' },
              { name: 'Mrs. Malini Jayaram (PGT English)', time: '08:20 AM', status: 'Present' },
              { name: 'Mr. S. Annamalai (Physical Dir)', time: '07:45 AM', status: 'Present' },
              { name: 'Mrs. Sunita Venkat (TGT Social)', time: 'Leave Approved', status: 'Leave' }
            ].map(t => (
              <div key={t.name} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{t.name}</h4>
                  <span className="text-[11px] text-slate-400">Punch: {t.time}</span>
                </div>
                <Badge variant={t.status === 'Present' ? 'success' : 'warning'} size="sm">
                  {t.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          <ChartCard title="Daily Attendance Trajectory" subtitle="School-wide attendance percentage by day">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={stats.dailyTrend} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v) => [`${v}% Attendance`, 'Rate']} />
                <Area type="monotone" dataKey="attendanceRate" stroke="#10b981" fill="#d1fae5" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Class-Wise Comparison" subtitle="Average attendance comparison across wings">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats.classComparison} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="class" tick={{ fontSize: 11 }} />
                <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v) => [`${v}%`, 'Attendance']} />
                <Bar dataKey="rate" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  );
}
