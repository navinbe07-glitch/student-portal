import React, { useState } from 'react';
import { BookOpen, Plus, Calendar, CheckCircle2 } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { formatDate } from '../../utils/formatters';

export function TeacherHomework() {
  const { homework, addHomework } = useSchool();
  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [due, setDue] = useState('2026-09-28');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title) return;
    addHomework({
      class: '10th Standard',
      section: 'A',
      subject: 'Mathematics',
      title,
      description: desc,
      teacher: 'Mrs. Revathi Ramanathan',
      dueDate: due,
      attachmentName: 'Math_Exercise_Handout.pdf'
    });
    setCreateOpen(false);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mathematics Assignments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Coursework and homework assigned to 10th Standard Section A
          </p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="px-4 py-2 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Homework</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {homework.filter(h => h.subject === 'Mathematics' || h.class.includes('10th')).map(hw => (
          <div key={hw.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold">
                  {hw.subject}
                </span>
                <Badge variant="info" size="sm">{hw.class} - {hw.section}</Badge>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{hw.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{hw.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Due: {formatDate(hw.dueDate)}</span>
              <span className="font-bold text-emerald-600">{hw.submittedCount} / {hw.totalStudents} Submitted</span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        maxWidth="max-w-md"
        title="Assign Mathematics Homework"
        subtitle="10th Standard - Section A"
        footer={
          <>
            <button onClick={() => setCreateOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-500">Cancel</button>
            <button onClick={handleCreate} className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Publish</button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Trigonometry Exercise 4.2"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Instructions *</label>
            <textarea
              rows={3}
              required
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Questions 1 to 15 from textbook..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Due Date *</label>
            <input
              type="date"
              value={due}
              onChange={e => setDue(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
