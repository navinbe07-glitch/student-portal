import React, { useState } from 'react';
import {
  Award,
  FileText,
  Printer,
  Download,
  Users,
  Search,
  Eye,
  CheckCircle2,
  School
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { certificateTemplates, issuedCertificatesLog } from '../../data/mockCertificates';
import { CertificateModal } from '../../components/preview/CertificateModal';
import { Badge } from '../../components/common/Badge';

export function CertificatesPage() {
  const { students } = useSchool();
  const [selectedStudentId, setSelectedStudentId] = useState('STU-1001');
  const [selectedTemplate, setSelectedTemplate] = useState(certificateTemplates[0].title);
  const [previewOpen, setPreviewOpen] = useState(false);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certificates & Documentation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate and issue verified institutional certificates, student ID badges, and transfer certificates
          </p>
        </div>
      </div>

      {/* Generator Studio Card */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-600" />
          <span>Certificate Issuance Studio</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              1. Select Student *
            </label>
            <select
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            >
              {students.slice(0, 30).map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.class}-{s.section}) • Roll #{s.rollNo} • Adm: {s.admissionNo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              2. Select Certificate Template *
            </label>
            <select
              value={selectedTemplate}
              onChange={e => setSelectedTemplate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            >
              {certificateTemplates.map(tmpl => (
                <option key={tmpl.id} value={tmpl.title}>
                  {tmpl.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-indigo-900 dark:text-indigo-200 text-sm block">
              Ready to generate for: {currentStudent?.name} ({currentStudent?.class} - {currentStudent?.section})
            </span>
            <p className="text-indigo-700 dark:text-indigo-300 mt-0.5">
              Template: {selectedTemplate} • Official institutional seal and authorization barcode included
            </p>
          </div>

          <button
            onClick={() => setPreviewOpen(true)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-md shadow-brand-500/25 transition-all flex items-center gap-2 shrink-0 text-xs sm:text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Generate & Preview Document</span>
          </button>
        </div>
      </div>

      {/* Available Certificate Templates Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-3">
          Available Institutional Certificate Formats
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificateTemplates.map(tmpl => (
            <div
              key={tmpl.id}
              onClick={() => {
                setSelectedTemplate(tmpl.title);
                setPreviewOpen(true);
              }}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover hover:border-brand-300 dark:hover:border-brand-800 cursor-pointer transition-all space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{tmpl.title}</h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[180px]">For: {tmpl.purpose}</span>
                <span className="text-brand-600 font-bold">Generate →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issued Certificates History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Issued Certificates Registry Log
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase">
                <th className="py-2.5 px-3">Certificate ID</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Class</th>
                <th className="py-2.5 px-3">Issue Date</th>
                <th className="py-2.5 px-3">Purpose</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {issuedCertificatesLog.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-500">{log.id}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{log.type}</td>
                  <td className="py-2.5 px-3 font-semibold text-brand-600">{log.studentName}</td>
                  <td className="py-2.5 px-3">{log.class}</td>
                  <td className="py-2.5 px-3 text-slate-400">{log.issueDate}</td>
                  <td className="py-2.5 px-3 text-slate-500">{log.purpose}</td>
                  <td className="py-2.5 px-3 text-right">
                    <Badge variant="success" size="sm">{log.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        student={currentStudent}
        templateType={selectedTemplate}
      />
    </div>
  );
}
