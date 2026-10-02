import React, { useState, useEffect } from 'react';
import { CheckSquare, Save, CheckCircle2, UserCheck, Calendar } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { attendanceService } from '../../services/attendanceService';
import { Badge } from '../../components/common/Badge';

export function TeacherAttendance() {
  const { students, saveAttendance } = useSchool();
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [rollCall, setRollCall] = useState([]);

  useEffect(() => {
    const list = attendanceService.getAttendanceForClass(selectedDate, '10th Standard', 'A');
    setRollCall(list);
  }, [selectedDate, students]);

  const handleStatusChange = (studentId, newStatus) => {
    setRollCall(prev => prev.map(item => {
      if (item.studentId === studentId) return { ...item, status: newStatus };
      return item;
    }));
  };

  const handleMarkAllPresent = () => {
    setRollCall(prev => prev.map(item => ({ ...item, status: 'Present' })));
  };

  const handleSave = () => {
    saveAttendance(selectedDate, '10th Standard', 'A', rollCall);
  };

  const presentCount = rollCall.filter(r => r.status === 'Present').length;
  const absentCount = rollCall.filter(r => r.status === 'Absent').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            10th Standard - A Attendance Roll Call
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Class Teacher: Mrs. Revathi Ramanathan • 42 Enrolled Students
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
            className="px-4 py-2 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
          />
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success">Present: {presentCount}</Badge>
          <Badge variant="danger">Absent: {absentCount}</Badge>
        </div>
      </div>

      {/* Roll Call Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase bg-slate-50/50 dark:bg-slate-800/30">
              <th className="py-3 px-4">Roll</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4 text-center">Status Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rollCall.map(row => (
              <tr key={row.studentId} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-slate-500">#{row.rollNo}</td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white text-sm">{row.name}</td>
                <td className="py-3 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5">
                    {['Present', 'Absent', 'Late'].map(st => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(row.studentId, st)}
                        className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                          row.status === st
                            ? st === 'Present' ? 'bg-emerald-600 text-white shadow-xs' : st === 'Absent' ? 'bg-rose-600 text-white shadow-xs' : 'bg-amber-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
