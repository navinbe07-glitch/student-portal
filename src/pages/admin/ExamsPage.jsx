import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  Printer,
  Plus,
  Edit,
  Eye,
  Search
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ReportCardModal } from '../../components/preview/ReportCardModal';
import { calculateGrade } from '../../data/mockExams';

export function ExamsPage() {
  const { exams, marks, updateMarks, students } = useSchool();

  const [activeTab, setActiveTab] = useState('exams'); // 'exams' | 'schedule' | 'marks' | 'grading'
  const [reportCardData, setReportCardData] = useState(null);
  const [createExamOpen, setCreateExamOpen] = useState(false);
  const [editMarksStudent, setEditMarksStudent] = useState(null);

  // New Exam form state
  const [examName, setExamName] = useState('');
  const [examTerm, setExamTerm] = useState('Term 2');
  const [examStart, setExamStart] = useState('2026-11-15');
  const [examEnd, setExamEnd] = useState('2026-11-25');

  // Edit marks modal state
  const [marksMath, setMarksMath] = useState(95);
  const [marksSci, setMarksSci] = useState(88);
  const [marksEng, setMarksEng] = useState(94);

  const handleSaveMarks = () => {
    if (editMarksStudent) {
      updateMarks(editMarksStudent.studentId, 'EXM-2026-01', 'Mathematics', Number(marksMath), 100);
      updateMarks(editMarksStudent.studentId, 'EXM-2026-01', 'Science', Number(marksSci), 100);
      updateMarks(editMarksStudent.studentId, 'EXM-2026-01', 'English', Number(marksEng), 100);
      setEditMarksStudent(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Examinations & Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exam scheduling, marks entry, automatic grading scale, and report cards
          </p>
        </div>

        <button
          onClick={() => setCreateExamOpen(true)}
          className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Exam</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800">
        {[
          { id: 'exams', label: 'Examinations' },
          { id: 'schedule', label: 'Exam Schedule (Timetable)' },
          { id: 'marks', label: 'Marks Entry & Evaluation' },
          { id: 'grading', label: 'Grading System' }
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

      {/* 1. Exams List */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in">
          {exams.map(exam => (
            <div key={exam.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant={exam.status === 'Completed' ? 'success' : 'info'} size="sm">
                    {exam.status}
                  </Badge>
                  <span className="text-[11px] font-semibold text-slate-400">{exam.term}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {exam.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration:</span>
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {exam.startDate} to {exam.endDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Target Standards:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">6th to 12th</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Exam Schedule */}
      {activeTab === 'schedule' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Quarterly Examination Schedule (10th Standard)
              </h3>
              <p className="text-slate-400">Venue: Main Academic Exam Hall A • Morning Session</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { date: '10 Sep 2026', day: 'Thursday', subject: 'Tamil Paper I & II', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' },
              { date: '12 Sep 2026', day: 'Saturday', subject: 'English Language & Lit', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' },
              { date: '14 Sep 2026', day: 'Monday', subject: 'Mathematics Core', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' },
              { date: '16 Sep 2026', day: 'Wednesday', subject: 'Science (Theory & Lab)', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' },
              { date: '18 Sep 2026', day: 'Friday', subject: 'Social Science', time: '09:30 AM – 12:30 PM', room: 'Exam Hall A' }
            ].map(item => (
              <div key={item.subject} className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg text-center w-20">
                    <span className="block text-[10px] uppercase text-indigo-400">{item.day}</span>
                    <span className="text-xs">{item.date.slice(0, 6)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.subject}</h4>
                    <span className="text-slate-400 text-[11px]">{item.time}</span>
                  </div>
                </div>
                <Badge variant="neutral" size="sm">{item.room}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Marks Entry & Evaluation Table */}
      {activeTab === 'marks' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Marks Entry Roster — 10th Standard A (Quarterly Exam)
              </h3>
              <p className="text-slate-400">Calculates percentages, letter grades (A+ to F), and pass/fail standing</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold rounded-lg">
              Evaluated & Published
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase bg-slate-50/60 dark:bg-slate-800/30">
                  <th className="py-3 px-3">Roll</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3 text-center">Tamil</th>
                  <th className="py-3 px-3 text-center">English</th>
                  <th className="py-3 px-3 text-center">Mathematics</th>
                  <th className="py-3 px-3 text-center">Science</th>
                  <th className="py-3 px-3 text-center">Social</th>
                  <th className="py-3 px-3 text-center">Total (500)</th>
                  <th className="py-3 px-3 text-center">% / Grade</th>
                  <th className="py-3 px-3 text-center">Result</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {marks.map(row => (
                  <tr key={row.studentId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-slate-500">#{row.rollNo}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white text-sm">{row.name}</td>
                    <td className="py-3 px-3 text-center font-semibold">{row.marks.Tamil?.obtained || 85}</td>
                    <td className="py-3 px-3 text-center font-semibold">{row.marks.English?.obtained || 88}</td>
                    <td className="py-3 px-3 text-center font-bold text-indigo-600 dark:text-indigo-400">{row.marks.Mathematics?.obtained || 90}</td>
                    <td className="py-3 px-3 text-center font-semibold">{row.marks.Science?.obtained || 85}</td>
                    <td className="py-3 px-3 text-center font-semibold">{row.marks.SocialScience?.obtained || 85}</td>
                    <td className="py-3 px-3 text-center font-extrabold text-sm">{row.totalObtained}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-bold mr-1">{row.percentage}%</span>
                      <Badge variant={row.grade === 'A+' ? 'success' : 'info'} size="sm">{row.grade}</Badge>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-600">{row.result}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditMarksStudent(row);
                            setMarksMath(row.marks.Mathematics?.obtained || 95);
                            setMarksSci(row.marks.Science?.obtained || 88);
                            setMarksEng(row.marks.English?.obtained || 94);
                          }}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-brand-600"
                          title="Edit Marks"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setReportCardData(row)}
                          className="px-2 py-1 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded font-semibold text-[11px]"
                        >
                          Report Card
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Grading Scheme */}
      {activeTab === 'grading' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-4 animate-fade-in max-w-2xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            State Board Standard Grading Metric (7-Point Scale)
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase">
                <th className="py-2.5 px-3">Mark Range (%)</th>
                <th className="py-2.5 px-3">Grade</th>
                <th className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { range: '90% – 100%', grade: 'A+', desc: 'Outstanding Academic Distinction', variant: 'success' },
                { range: '80% – 89%', grade: 'A', desc: 'Excellent Mastery', variant: 'info' },
                { range: '70% – 79%', grade: 'B+', desc: 'Very Good Competence', variant: 'teal' },
                { range: '60% – 69%', grade: 'B', desc: 'Good Working Knowledge', variant: 'neutral' },
                { range: '50% – 59%', grade: 'C', desc: 'Satisfactory / Average', variant: 'warning' },
                { range: '35% – 49%', grade: 'D', desc: 'Passing Threshold', variant: 'warning' },
                { range: 'Below 35%', grade: 'F', desc: 'Remedial Coaching Required', variant: 'danger' },
              ].map(g => (
                <tr key={g.grade}>
                  <td className="py-2.5 px-3 font-semibold">{g.range}</td>
                  <td className="py-2.5 px-3">
                    <Badge variant={g.variant} size="sm">{g.grade}</Badge>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{g.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Marks Modal */}
      <Modal
        isOpen={!!editMarksStudent}
        onClose={() => setEditMarksStudent(null)}
        maxWidth="max-w-md"
        title={editMarksStudent ? `Update Marks: ${editMarksStudent.name}` : ''}
        subtitle="Quarterly Exam Evaluation"
        footer={
          <>
            <button
              onClick={() => setEditMarksStudent(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveMarks}
              className="px-5 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl"
            >
              Save Marks
            </button>
          </>
        }
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Mathematics Marks (out of 100):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={marksMath}
              onChange={e => setMarksMath(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Science Marks (out of 100):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={marksSci}
              onChange={e => setMarksSci(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">English Marks (out of 100):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={marksEng}
              onChange={e => setMarksEng(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
            />
          </div>
        </div>
      </Modal>

      {/* Report Card Modal */}
      <ReportCardModal
        isOpen={!!reportCardData}
        onClose={() => setReportCardData(null)}
        reportData={reportCardData}
      />
    </div>
  );
}
