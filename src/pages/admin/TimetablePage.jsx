import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Printer, Plus, ChevronRight, School } from 'lucide-react';
import { initialTimetable } from '../../data/mockTimetable';
import { Badge } from '../../components/common/Badge';

export function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState('10th Standard');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week'

  const scheduleKey = `${selectedClass}-${selectedSection}`;
  const classSchedule = initialTimetable[scheduleKey] || initialTimetable['10th Standard-A'];
  const dayPeriods = classSchedule[selectedDay] || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class Timetable Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Period by period master timetable matrix with room and teacher allocations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Timetable</span>
          </button>
          <button
            onClick={() => alert('Add/Edit Period slot ready for production.')}
            className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Edit Schedule</span>
          </button>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Select Class:</label>
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

          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Day of the Week:</label>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                    selectedDay === day
                      ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Badge variant="info" size="md">
          {selectedClass} - {selectedSection} • {selectedDay}
        </Badge>
      </div>

      {/* Schedule Period Cards Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Daily Routine: {selectedDay} (08:45 AM – 03:45 PM)
          </h3>
          <span className="text-slate-400">Total 8 Periods + 2 Refreshment Breaks</span>
        </div>

        <div className="space-y-3">
          {dayPeriods.map((slot, index) => {
            const timing = initialTimetable.periods.find(p => p.period === slot.period)?.time || '09:00 - 09:45';
            const isBreak = index === 3; // Break after period 3

            return (
              <React.Fragment key={slot.period}>
                {/* Morning Refreshment break slot */}
                {isBreak && (
                  <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-dashed border-amber-300 dark:border-amber-800/60 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300 font-semibold px-4">
                    <span className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      11:00 AM – 11:15 AM
                    </span>
                    <span>Morning Nutrition & Refreshment Break (15 mins)</span>
                  </div>
                )}

                {/* Lunch Break slot after period 5 */}
                {index === 5 && (
                  <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800/60 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold px-4">
                    <span className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      12:45 PM – 01:30 PM
                    </span>
                    <span>Lunch Break & Dining Hall Access (45 mins)</span>
                  </div>
                )}

                {/* Class Period Card */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-extrabold flex flex-col items-center justify-center shrink-0 border border-brand-200 dark:border-brand-900">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none">P</span>
                      <span className="text-sm leading-none mt-0.5">{slot.period}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {slot.subject}
                      </h4>
                      <div className="flex items-center gap-3 text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-indigo-500" />
                          <strong className="text-slate-700 dark:text-slate-300">{slot.teacher}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:text-right">
                    <div className="text-slate-500">
                      <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {timing}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {slot.room}
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
