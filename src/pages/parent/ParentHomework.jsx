import React from 'react';
import { BookOpen, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Badge } from '../../components/common/Badge';
import { formatDate } from '../../utils/formatters';

export function ParentHomework() {
  const { students } = useSchool();
  const child = students.find(s => s.id === 'STU-1001') || students[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Assigned Coursework & Homework
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Child: {child.name} • Class {child.class} - {child.section}
        </p>
      </div>

      <div className="space-y-3">
        {(child.homework || []).map(hw => (
          <div key={hw.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex items-center justify-between gap-4 text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{hw.title}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                  {hw.subject}
                </span>
              </div>
              <p className="text-slate-500">Deadline: <strong className="text-slate-800 dark:text-slate-200">{formatDate(hw.dueDate)}</strong></p>
            </div>
            <Badge variant={hw.status === 'Completed' ? 'success' : 'warning'} size="sm">
              {hw.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
