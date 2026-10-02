import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  UserCheck,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Plus
} from 'lucide-react';
import { initialAcademics } from '../../data/mockAcademics';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export function AcademicsPage() {
  const [activeTab, setActiveTab] = useState('classes'); // classes, subjects, teachers
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academics Module
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Standard 1st to 12th curriculum, sections, subjects, and faculty allocation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="info" size="md">
            AY {initialAcademics.academicYear}
          </Badge>
          <button
            onClick={() => alert('Add Class / Section feature ready for production.')}
            className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Class / Subject</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800">
        {[
          { id: 'classes', label: 'Classes & Sections (1st to 12th)' },
          { id: 'subjects', label: 'Subject Master' },
          { id: 'allocation', label: 'Class Teachers & Faculty Allocation' }
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

      {/* 1. Classes Grid */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
          {initialAcademics.classes.map(cls => (
            <div
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover hover:border-brand-300 dark:hover:border-brand-800 transition-all cursor-pointer group space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    {cls.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                    {cls.name}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs">
                  {cls.sections.length} Sec
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Enrolled Capacity:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{cls.studentCount} Students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sections:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{cls.sections.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Class Teacher:</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate max-w-[130px]">{cls.classTeacher}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-brand-600 transition-colors">
                <span>{cls.subjects.length} Subjects</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Subjects Master */}
      {activeTab === 'subjects' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card animate-fade-in overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase">
                <th className="py-3 px-3">Subject Name</th>
                <th className="py-3 px-3">Code</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Theory Hours / Wk</th>
                <th className="py-3 px-3">Practical Hours</th>
                <th className="py-3 px-3">Head of Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {initialAcademics.subjectsMaster.map(sub => (
                <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white text-sm">{sub.name}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-slate-500">{sub.code}</td>
                  <td className="py-3 px-3">
                    <Badge variant={sub.category === 'Core' ? 'info' : 'purple'} size="sm">
                      {sub.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">{sub.theoryHours} hrs</td>
                  <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">{sub.practicalHours} hrs</td>
                  <td className="py-3 px-3 font-semibold text-indigo-600 dark:text-indigo-400">{sub.headTeacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. Class Teachers Allocation */}
      {activeTab === 'allocation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {initialAcademics.classes.map(cls => (
            <div key={cls.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{cls.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Designated Class Incharge: <strong className="text-slate-800 dark:text-slate-200 block text-sm mt-0.5">{cls.classTeacher}</strong>
              </p>
              <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
                <span>{cls.sections.length} Sections Assigned</span>
                <span className="font-semibold text-brand-600">{cls.studentCount} Students</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Class Details Modal */}
      <Modal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        maxWidth="max-w-xl"
        title={selectedClass ? `${selectedClass.name} - Academic Overview` : ''}
        subtitle="Subject curriculum & faculty assignment"
      >
        {selectedClass && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-xs">Students</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{selectedClass.studentCount}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-xs">Sections</span>
                <span className="text-lg font-bold text-brand-600">{selectedClass.sections.join(', ')}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-xs">Avg Attendance</span>
                <span className="text-lg font-bold text-emerald-600">93.4%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white">Curriculum Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {selectedClass.subjects.map(sub => (
                  <span key={sub} className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-200 dark:border-indigo-900">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1">
              <span className="text-slate-400 block">Class Teacher:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedClass.classTeacher}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
