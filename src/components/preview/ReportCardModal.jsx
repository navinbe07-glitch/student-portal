import React from 'react';
import { Modal } from '../common/Modal';
import { Printer, Download, Award, School } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ReportCardModal({ isOpen, onClose, reportData }) {
  if (!reportData) return null;

  const handlePrint = () => {
    window.print();
  };

  const marksList = reportData.marks ? Object.entries(reportData.marks).map(([subject, data]) => ({
    subject: subject.replace(/([A-Z])/g, ' $1').trim(),
    max: data.max,
    obtained: data.obtained,
    grade: data.grade
  })) : [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-3xl"
      title="Official Student Progress Report Card"
      subtitle="Quarterly Examination 2026–2027"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report Card</span>
          </button>
          <button
            onClick={() => alert('Report Card PDF generated and downloaded.')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </>
      }
    >
      <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-slate-800 dark:text-slate-200">
        {/* School Header */}
        <div className="border-b-2 border-slate-800 dark:border-slate-300 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <School className="w-7 h-7 text-brand-700 dark:text-brand-400" />
            <h2 className="text-base sm:text-xl font-extrabold uppercase tracking-wide text-slate-900 dark:text-white">
              Green Valley Matriculation Higher Sec. School
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Anna Nagar, Chennai - 600040 • Affiliated with Tamil Nadu State Board (TN-MS-4029)
          </p>
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 mt-2">
            Continuous & Comprehensive Evaluation Report Card
          </h3>
          <p className="text-xs text-slate-500">Academic Year 2026–2027 • Term 1 Assessment</p>
        </div>

        {/* Student Profile Block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block">Student Name:</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{reportData.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Admission / Roll No:</span>
            <span className="font-bold text-slate-900 dark:text-white">Roll #{reportData.rollNo}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Class & Section:</span>
            <span className="font-bold text-slate-900 dark:text-white">{reportData.class} - {reportData.section}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Class Teacher:</span>
            <span className="font-bold text-slate-900 dark:text-white">Mrs. Revathi Ramanathan</span>
          </div>
        </div>

        {/* Subject-wise Marks Table */}
        <table className="w-full text-xs text-left mb-4 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/60 font-bold">
              <th className="py-2.5 px-3">Subject</th>
              <th className="py-2.5 px-3 text-center">Maximum Marks</th>
              <th className="py-2.5 px-3 text-center">Obtained Marks</th>
              <th className="py-2.5 px-3 text-center">Grade</th>
              <th className="py-2.5 px-3 text-right">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {marksList.map(item => (
              <tr key={item.subject} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">{item.subject}</td>
                <td className="py-2.5 px-3 text-center text-slate-500">{item.max}</td>
                <td className="py-2.5 px-3 text-center font-bold text-slate-900 dark:text-white">{item.obtained}</td>
                <td className="py-2.5 px-3 text-center">
                  <Badge variant={item.grade === 'A+' ? 'success' : item.grade.startsWith('A') ? 'info' : 'warning'} size="sm">
                    {item.grade}
                  </Badge>
                </td>
                <td className="py-2.5 px-3 text-right text-slate-500">
                  {item.obtained >= 90 ? 'Outstanding' : item.obtained >= 75 ? 'Good' : 'Satisfactory'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-800 dark:border-slate-300 font-bold bg-slate-50/80 dark:bg-slate-900/40">
              <td className="py-3 px-3 uppercase">Total Grand Score:</td>
              <td className="py-3 px-3 text-center text-slate-500">{reportData.totalMax}</td>
              <td className="py-3 px-3 text-center font-extrabold text-sm text-brand-700 dark:text-brand-400">
                {reportData.totalObtained}
              </td>
              <td className="py-3 px-3 text-center">
                <span className="px-2.5 py-1 rounded bg-emerald-600 text-white font-extrabold text-xs">
                  {reportData.grade}
                </span>
              </td>
              <td className="py-3 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                Result: {reportData.result}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Performance Summary Cards */}
        <div className="grid grid-cols-3 gap-3 text-xs mb-4 text-center">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-500 block text-[11px]">Percentage</span>
            <span className="font-extrabold text-slate-900 dark:text-white text-base">{reportData.percentage}%</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-500 block text-[11px]">Class Rank</span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-base">#{reportData.rank || 3} of 42</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-500 block text-[11px]">Attendance Rate</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">94.0%</span>
          </div>
        </div>

        {/* Teacher's Remarks */}
        <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200/60 dark:border-indigo-900 text-xs mb-6">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-0.5">
            Class Teacher&apos;s Appraisal & Remarks:
          </span>
          <p className="italic text-indigo-800 dark:text-indigo-200">
            &quot;{reportData.teacherRemarks || 'Arun displays commendable discipline, active classroom participation, and strong mathematical aptitude.'}&quot;
          </p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-4 pt-8 text-center text-xs">
          <div>
            <div className="w-28 h-8 border-b border-dashed border-slate-400 mx-auto flex items-end justify-center italic font-serif">
              Revathi R.
            </div>
            <p className="mt-1 font-semibold text-slate-600 dark:text-slate-400">Class Teacher</p>
          </div>
          <div>
            <div className="w-28 h-8 border-b border-dashed border-slate-400 mx-auto"></div>
            <p className="mt-1 font-semibold text-slate-600 dark:text-slate-400">Parent / Guardian</p>
          </div>
          <div>
            <div className="w-28 h-8 border-b border-dashed border-slate-400 mx-auto flex items-end justify-center italic font-serif">
              K. Sivasankaran
            </div>
            <p className="mt-1 font-semibold text-slate-600 dark:text-slate-400">Principal</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
