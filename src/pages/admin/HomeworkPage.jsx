import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Calendar,
  FileText,
  Paperclip,
  CheckCircle2,
  Clock,
  User,
  Users
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { formatDate } from '../../utils/formatters';

export function HomeworkPage() {
  const { homework, addHomework } = useSchool();
  const [createOpen, setCreateOpen] = useState(false);

  // New Homework Form State
  const [hwClass, setHwClass] = useState('10th Standard');
  const [hwSection, setHwSection] = useState('A');
  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDue, setHwDue] = useState('2026-09-28');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hwTitle.trim()) return;

    addHomework({
      class: hwClass,
      section: hwSection,
      subject: hwSubject,
      title: hwTitle,
      description: hwDesc,
      teacher: 'Mrs. Revathi Ramanathan',
      dueDate: hwDue,
      attachmentName: 'Assignment_Resource.pdf'
    });

    setCreateOpen(false);
    setHwTitle('');
    setHwDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Homework & Assignments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Publish coursework, monitor class submissions, and share study attachments
          </p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Assign Homework</span>
        </button>
      </div>

      {/* Homework Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {homework.map(hw => {
          const submissionPct = Math.round((hw.submittedCount / hw.totalStudents) * 100) || 0;
          return (
            <div key={hw.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between space-y-4 hover:shadow-card-hover transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-xs">
                    {hw.subject}
                  </span>
                  <Badge variant={hw.status === 'Evaluated' ? 'success' : 'info'} size="sm">
                    {hw.class} - {hw.section}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {hw.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                  {hw.description}
                </p>

                {hw.attachmentName && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <Paperclip className="w-3.5 h-3.5 text-brand-500" />
                    <span className="truncate max-w-[200px]">{hw.attachmentName}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Due: {formatDate(hw.dueDate)}
                  </span>
                  <span>Faculty: {hw.teacher?.split(' ')[1] || 'Revathi'}</span>
                </div>

                {/* Submissions Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Submissions</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {hw.submittedCount} / {hw.totalStudents} ({submissionPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-600 h-full rounded-full transition-all"
                      style={{ width: `${submissionPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Homework Modal */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        maxWidth="max-w-lg"
        title="Publish New Homework Assignment"
        subtitle="Coursework details and deadline"
        footer={
          <>
            <button
              onClick={() => setCreateOpen(false)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm"
            >
              Publish Assignment
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Class *</label>
              <select
                value={hwClass}
                onChange={e => setHwClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {['9th Standard', '10th Standard', '11th Standard', '12th Standard'].map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Section *</label>
              <select
                value={hwSection}
                onChange={e => setHwSection(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Subject *</label>
            <select
              value={hwSubject}
              onChange={e => setHwSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Social Science">Social Science</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Assignment Title *</label>
            <input
              type="text"
              required
              value={hwTitle}
              onChange={e => setHwTitle(e.target.value)}
              placeholder="e.g. Chapter 5 Practice Problems"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Instructions & Problem Description *</label>
            <textarea
              rows={3}
              value={hwDesc}
              onChange={e => setHwDesc(e.target.value)}
              placeholder="Provide question numbers, instructions, guidelines..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Submission Due Date *</label>
            <input
              type="date"
              value={hwDue}
              onChange={e => setHwDue(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
