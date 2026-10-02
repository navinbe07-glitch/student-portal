import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Printer, Download, Award, School, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export function CertificateModal({ isOpen, onClose, student, templateType = 'Bonafide Certificate' }) {
  const [purpose, setPurpose] = useState('Passport & Visa Application');
  const [issueDate, setIssueDate] = useState('2026-09-22');

  if (!student) return null;

  const handlePrint = () => {
    window.print();
  };

  const isBonafide = templateType === 'Bonafide Certificate';
  const isStudy = templateType === 'Study Certificate';
  const isConduct = templateType === 'Conduct Certificate';
  const isTransfer = templateType === 'Transfer Certificate' || templateType === 'Transfer Certificate (TC)';
  const isIdCard = templateType === 'Student ID Card';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth={isIdCard ? 'max-w-md' : 'max-w-2xl'}
      title={`Certificate Generator: ${templateType}`}
      subtitle={`Student: ${student.name} • ${student.class} - ${student.section}`}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button
            onClick={() => alert(`${templateType} successfully generated and downloaded.`)}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </>
      }
    >
      {/* Options Bar before printable area */}
      {!isIdCard && (
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Certificate Purpose:</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Issue Date:</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* ID Card View */}
      {isIdCard ? (
        <div className="p-6 bg-gradient-to-br from-indigo-700 via-brand-800 to-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/20">
            <School className="w-6 h-6 text-brand-300 shrink-0" />
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide">
                Green Valley Matriculation School
              </h3>
              <p className="text-[10px] text-white/70">Student Identity Card • 2026–2027</p>
            </div>
          </div>

          <div className="flex items-center gap-4 my-5">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-white/40 shadow-md shrink-0"
            />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-base text-white">{student.name}</h4>
              <p className="text-white/80">Class: <span className="font-semibold text-white">{student.class} - {student.section}</span></p>
              <p className="text-white/80">Roll No: <span className="font-semibold text-white">{student.rollNo}</span></p>
              <p className="text-white/80">Adm No: <span className="font-semibold text-white">{student.admissionNo}</span></p>
              <p className="text-white/80">House: <span className="font-semibold text-emerald-300">{student.house}</span></p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/20 text-[11px] grid grid-cols-2 gap-2 text-white/80">
            <div>Blood Group: <span className="font-bold text-white">{student.bloodGroup || 'B+'}</span></div>
            <div>Emergency: <span className="font-bold text-white">{student.phone}</span></div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] text-white/60">
            <span>Valid till: 31 May 2027</span>
            <span className="italic font-serif">K. Sivasankaran, Principal</span>
          </div>
        </div>
      ) : (
        /* Certificate Document Sheet */
        <div className="p-8 bg-amber-50/30 dark:bg-slate-950 border-4 border-double border-amber-900/30 dark:border-amber-600/30 rounded-xl shadow-xs text-slate-800 dark:text-slate-200">
          <div className="text-center pb-6 border-b border-amber-900/20 dark:border-amber-600/20">
            <div className="flex items-center justify-center gap-2 mb-1">
              <School className="w-8 h-8 text-brand-700 dark:text-brand-400" />
              <h2 className="text-lg sm:text-2xl font-serif font-bold uppercase text-slate-900 dark:text-white tracking-wider">
                Green Valley Matriculation Higher Secondary School
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-serif">
              Anna Nagar, Chennai - 600040 • Recognized by Govt. of Tamil Nadu
            </p>
            <h3 className="mt-4 text-base font-serif font-bold uppercase underline tracking-widest text-brand-800 dark:text-brand-300">
              {templateType}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">Ref No: GV/CERT/2026/{student.rollNo}</p>
          </div>

          {/* Certificate Body Text */}
          <div className="py-8 px-2 text-sm leading-relaxed text-justify space-y-4 font-serif">
            {isBonafide && (
              <p>
                This is to certify that Master / Selvi <span className="font-bold underline text-slate-950 dark:text-white">{student.name}</span>, 
                Son / Daughter of Thiru <span className="font-bold underline text-slate-950 dark:text-white">{student.parent}</span>, 
                bearing Admission Number <span className="font-bold underline">{student.admissionNo}</span>, is a bonafide student of this institution 
                studying in <span className="font-bold underline">{student.class} (Section {student.section})</span> during the Academic Year 2026–2027.
              </p>
            )}

            {isStudy && (
              <p>
                This is to certify that Master / Selvi <span className="font-bold underline text-slate-950 dark:text-white">{student.name}</span> has studied in 
                this institution continuously. The medium of instruction throughout the course of study has been <span className="font-bold underline">English</span>, 
                with <span className="font-bold underline">Tamil</span> as the compulsory second language.
              </p>
            )}

            {isConduct && (
              <p>
                This is to certify that Master / Selvi <span className="font-bold underline text-slate-950 dark:text-white">{student.name}</span> has been a student 
                of this institution. During his/her tenure in the school, his/her conduct, character, and moral behavior have been found to be 
                <span className="font-bold underline text-emerald-800 dark:text-emerald-300"> EXEMPLARY & GOOD</span>.
              </p>
            )}

            {isTransfer && (
              <p>
                This is to certify that Master / Selvi <span className="font-bold underline text-slate-950 dark:text-white">{student.name}</span> was enrolled 
                under Admission No <span className="font-bold underline">{student.admissionNo}</span> and has completed the prescribed studies in 
                <span className="font-bold underline">{student.class}</span>. All school dues have been cleared up to date. He/She is hereby granted 
                this Transfer Certificate for pursuing further studies.
              </p>
            )}

            <p className="text-xs text-slate-600 dark:text-slate-400">
              This certificate is issued on the request of the parent for the specific purpose of <span className="font-semibold underline italic">{purpose}</span>.
            </p>
          </div>

          {/* Footer & Seal */}
          <div className="pt-8 flex items-end justify-between text-xs text-center border-t border-amber-900/10 dark:border-amber-600/10">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">Date: {formatDate(issueDate)}</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">Place: Chennai</p>
            </div>

            <div className="w-20 h-20 rounded-full border-2 border-brand-700/50 text-brand-800 dark:text-brand-300 flex flex-col items-center justify-center p-1 text-[8px] font-bold uppercase text-center rotate-[-8deg] select-none">
              <Award className="w-5 h-5 mb-0.5" />
              <span>OFFICIAL SEAL</span>
              <span className="text-[7px]">GREEN VALLEY</span>
            </div>

            <div>
              <div className="w-28 h-8 border-b border-dashed border-slate-400 mx-auto flex items-end justify-center italic font-serif">
                K. Sivasankaran
              </div>
              <p className="mt-1 font-semibold text-slate-700 dark:text-slate-300">Principal</p>
              <p className="text-[10px] text-slate-500">M.Sc., M.Ed., Ph.D.</p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
