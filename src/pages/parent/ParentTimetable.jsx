import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { initialTimetable } from '../../data/mockTimetable';

export function ParentTimetable() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const periods = initialTimetable['10th Standard-A'][selectedDay] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class Timetable
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Arun Kumar • Class 10th Standard - Section A
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedDay === d
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {d.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {selectedDay} Routine (08:45 AM – 03:45 PM)
        </h3>

        <div className="space-y-2.5">
          {periods.map(slot => (
            <div key={slot.period} className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-xs">
                  P{slot.period}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{slot.subject}</h4>
                  <span className="text-slate-400 text-[11px]">{slot.teacher}</span>
                </div>
              </div>
              <span className="text-slate-500 text-right">{slot.room}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
