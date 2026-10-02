import React, { useState } from 'react';
import {
  UserPlus,
  CalendarCheck,
  Award,
  FileCheck2,
  FileText,
  Search,
  PlusCircle,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Paperclip,
  Upload,
  Printer,
  Download,
  IdCard,
  QrCode,
  School,
  X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';

const standardClasses = [
  '1st Standard', '2nd Standard', '3rd Standard', '4th Standard',
  '5th Standard', '6th Standard', '7th Standard', '8th Standard',
  '9th Standard', '10th Standard', '11th Standard', '12th Standard'
];

export function OfficeStaffDashboard() {
  const {
    students,
    addStudent,
    updateStudent,
    exams,
    addExamConfig,
    leaveRequests,
    approveLeave,
    rejectLeave,
    certificates,
    generateCertificate
  } = useSchool();

  // Navigation tab anchor
  const [activeSection, setActiveSection] = useState('admissions');

  // Search
  const [studentSearch, setStudentSearch] = useState('');

  // Modals
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState(null);
  const [idCardStudent, setIdCardStudent] = useState(null);

  // New Student Form with simulated Document Uploads
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    gender: 'Male',
    class: '10th Standard',
    section: 'A',
    parent: '',
    phone: '',
    address: 'Chennai, Tamil Nadu',
    bloodGroup: 'B+',
    totalFee: 45000,
    documentsUploaded: {
      birthCert: false,
      tc: false,
      marksheet: false,
      aadhaar: false
    }
  });

  // New Exam Config Form
  const [examForm, setExamForm] = useState({
    name: '',
    startDate: '2026-11-10',
    endDate: '2026-11-22',
    gradingSystem: 'Tamil Nadu State Board 10-Point Scale',
    targetClasses: ['10th Standard', '11th Standard', '12th Standard'],
    term: 'Term 2 Evaluation'
  });

  // Certificate Generator Form
  const [certForm, setCertForm] = useState({
    studentId: 'STU-1001',
    type: 'Bonafide Certificate',
    purpose: 'Passport Application & Regional Science Olympiad'
  });

  // Filtered students
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    String(s.rollNo).includes(studentSearch) ||
    (s.admissionNo && s.admissionNo.toLowerCase().includes(studentSearch.toLowerCase()))
  );

  const handleCreateStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.parent) return;

    addStudent({
      name: newStudentForm.name,
      gender: newStudentForm.gender,
      class: newStudentForm.class,
      section: newStudentForm.section,
      parent: newStudentForm.parent,
      phone: newStudentForm.phone || '+91 98401 00000',
      address: newStudentForm.address,
      bloodGroup: newStudentForm.bloodGroup,
      totalFee: Number(newStudentForm.totalFee) || 45000,
      documents: [
        { name: 'Birth Certificate', status: newStudentForm.documentsUploaded.birthCert ? 'Verified' : 'Pending', date: '02 Oct 2026' },
        { name: 'Transfer Certificate (TC)', status: newStudentForm.documentsUploaded.tc ? 'Verified' : 'Pending', date: '02 Oct 2026' },
        { name: 'Previous Year Marksheet', status: newStudentForm.documentsUploaded.marksheet ? 'Verified' : 'Pending', date: '02 Oct 2026' },
        { name: 'Aadhaar Card Copy', status: newStudentForm.documentsUploaded.aadhaar ? 'Verified' : 'Pending', date: '02 Oct 2026' }
      ]
    });

    setIsAddStudentOpen(false);
  };

  const handleUpdateStudentSubmit = (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    updateStudent(editingStudent.id, {
      name: editingStudent.name,
      class: editingStudent.class,
      section: editingStudent.section,
      parent: editingStudent.parent,
      phone: editingStudent.phone,
      address: editingStudent.address
    });
    setEditingStudent(null);
  };

  const handleCreateExamSubmit = (e) => {
    e.preventDefault();
    if (!examForm.name) return;
    addExamConfig(examForm);
    setIsAddExamOpen(false);
  };

  const handleGenerateCertSubmit = (e) => {
    e.preventDefault();
    const st = students.find(s => s.id === certForm.studentId) || students[0];
    const generated = generateCertificate({
      studentId: st.id,
      studentName: st.name,
      class: `${st.class} - ${st.section}`,
      admissionNo: st.admissionNo,
      type: certForm.type,
      purpose: certForm.purpose,
      issuedBy: 'Mr. R. Parthasarathy (Senior Office Staff)'
    });
    setIsCertModalOpen(false);
    setViewingCertificate(generated);
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>School Office & Administrative Secretariat</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 font-bold border border-rose-200">
              Office Staff Portal
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Student admissions, document upload tracking, examination master setup, parent leave notes, and formal certificate issuance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCertModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-sm text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Generate Certificate</span>
          </button>
          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold rounded-2xl shadow-md shadow-rose-500/25 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Admission</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Total Registrations"
          value={String(students.length)}
          icon={UserPlus}
          subtitle="Enrolled Students"
          color="rose"
        />
        <StatCard
          title="Configured Exams"
          value={String(exams.length)}
          icon={CalendarCheck}
          subtitle="Master Schedules"
          color="indigo"
        />
        <StatCard
          title="Pending Leave Notes"
          value={String(leaveRequests.filter(l => l.status === 'Pending').length)}
          icon={FileCheck2}
          subtitle="From Parents"
          color="amber"
        />
        <StatCard
          title="Certificates Issued"
          value={String(certificates.length)}
          icon={Award}
          subtitle="Bonafide & TC"
          color="emerald"
        />
      </div>

      {/* ================= SECTION 1: ADMISSIONS & STUDENT REGISTRY ================= */}
      <div id="admissions" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-rose-600" />
              <span>Admissions Registry & Profile Maintenance</span>
            </h3>
            <p className="text-xs text-slate-500">Create new student records, upload essential documents, and update profiles</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={studentSearch}
              onChange={e => setStudentSearch(e.target.value)}
              placeholder="Search registry..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-extrabold text-slate-400 uppercase bg-slate-50/80">
                <th className="py-3 px-4">Admission No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class & Sec</th>
                <th className="py-3 px-4">Parent / Guardian</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4 text-center">Docs Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.slice(0, 10).map(st => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-700">{st.admissionNo}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={st.avatar} name={st.name} size="sm" />
                      <div>
                        <span className="font-extrabold text-slate-900 block">{st.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Roll #{st.rollNo}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-semibold">{st.class} - {st.section}</td>
                  <td className="py-3 px-4 text-slate-800">{st.parent}</td>
                  <td className="py-3 px-4 text-slate-600">{st.phone}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant="success" size="sm">4/4 Verified</Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setIdCardStudent(st)}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        title="Preview ID Card"
                      >
                        <IdCard className="w-3.5 h-3.5" />
                        <span>ID</span>
                      </button>
                      <button
                        onClick={() => setEditingStudent(st)}
                        className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                        title="Edit Student Info"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SECTION 2: EXAM MASTER & GRADING CONFIGURATION ================= */}
      <div id="exams" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-indigo-600" />
              <span>Examination Master Configuration</span>
            </h3>
            <p className="text-xs text-slate-500">Configure exam terms, grading scales, target classes and schedules</p>
          </div>
          <button
            onClick={() => setIsAddExamOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Exam Schedule</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {exams.map(ex => (
            <div key={ex.id} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 font-bold">{ex.id}</span>
                <Badge variant={ex.status === 'Completed' ? 'success' : 'indigo'} size="sm">
                  {ex.status}
                </Badge>
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">{ex.name}</h4>
              <div className="text-xs text-slate-600 space-y-1">
                <p>Scale: <strong className="text-slate-800">{ex.gradingSystem || '10-Point Scale'}</strong></p>
                <p>Window: <span className="font-semibold text-slate-700">{ex.startDate} – {ex.endDate}</span></p>
                <p>Classes: <span className="text-indigo-700 font-semibold">{Array.isArray(ex.targetClasses) ? ex.targetClasses.join(', ') : ex.targetClasses}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 3: PARENT LEAVE NOTICES & NOTES ================= */}
      <div id="leave" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-amber-600" />
              <span>Parent Leave Notices & Medical Submissions</span>
            </h3>
            <p className="text-xs text-slate-500">Leave letters submitted by parents through the parent mobile portal</p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {leaveRequests.length} Leave Records
          </span>
        </div>

        <div className="space-y-3">
          {leaveRequests.map(lv => (
            <div
              key={lv.id}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{lv.studentName}</span>
                  <Badge variant="indigo" size="sm">{lv.class} - {lv.section}</Badge>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {lv.leaveType}
                  </span>
                </div>
                <p className="text-slate-600">
                  Reason: <strong className="text-slate-800">&ldquo;{lv.reason}&rdquo;</strong>
                </p>
                <p className="text-[11px] text-slate-400">
                  Dates: {lv.fromDate} to {lv.toDate} ({lv.days} Days) • Applied by {lv.parentName} ({lv.parentPhone})
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {lv.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => approveLeave(lv.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition-colors cursor-pointer"
                    >
                      Approve Leave
                    </button>
                    <button
                      onClick={() => rejectLeave(lv.id)}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Decline
                    </button>
                  </>
                ) : (
                  <Badge variant={lv.status === 'Approved' ? 'success' : 'danger'}>
                    {lv.status}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 4: CERTIFICATE STUDIO & ID CARD ================= */}
      <div id="certificates" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Official Certificate Studio & Student ID Previews</span>
            </h3>
            <p className="text-xs text-slate-500">Issue Bonafide, Transfer Certificate (TC), Conduct Certificates, and Photo ID badges</p>
          </div>
          <button
            onClick={() => setIsCertModalOpen(true)}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Generate New Certificate</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {certificates.map(cert => (
            <div
              key={cert.id}
              className="p-5 bg-gradient-to-br from-slate-50 to-emerald-50/20 rounded-3xl border border-slate-200/90 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400 font-bold">{cert.id}</span>
                  <Badge variant="success" size="sm">Issued</Badge>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">{cert.type}</h4>
                <p className="text-xs font-bold text-emerald-800">{cert.studentName} ({cert.class})</p>
                <p className="text-[11px] text-slate-500">Purpose: {cert.purpose}</p>
                <p className="text-[10px] text-slate-400">Date: {cert.issuedDate}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setViewingCertificate(cert)}
                  className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  View Certificate &rarr;
                </button>
                <button
                  onClick={() => alert(`Printing official document: ${cert.type} (${cert.id})`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                  title="Print Certificate"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: New Student Registration with Document Uploads */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">New Student Admission & KYC</h3>
              <button onClick={() => setIsAddStudentOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name</label>
                <input
                  type="text"
                  value={newStudentForm.name}
                  onChange={e => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  placeholder="e.g. Vignesh Natarajan"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Standard / Class</label>
                  <select
                    value={newStudentForm.class}
                    onChange={e => setNewStudentForm({ ...newStudentForm, class: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    {standardClasses.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <select
                    value={newStudentForm.section}
                    onChange={e => setNewStudentForm({ ...newStudentForm, section: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    value={newStudentForm.parent}
                    onChange={e => setNewStudentForm({ ...newStudentForm, parent: e.target.value })}
                    placeholder="e.g. Natarajan S."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent Phone Number</label>
                  <input
                    type="tel"
                    value={newStudentForm.phone}
                    onChange={e => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    placeholder="+91 98401 00000"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Document Upload Simulator */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-slate-700 block">
                  Mandatory Document Verification (Simulated Attachments)
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'birthCert', label: 'Birth Certificate' },
                    { key: 'tc', label: 'Transfer Cert (TC)' },
                    { key: 'marksheet', label: 'Previous Marksheet' },
                    { key: 'aadhaar', label: 'Aadhaar Card' }
                  ].map(doc => (
                    <label key={doc.key} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newStudentForm.documentsUploaded[doc.key]}
                        onChange={e => setNewStudentForm({
                          ...newStudentForm,
                          documentsUploaded: {
                            ...newStudentForm.documentsUploaded,
                            [doc.key]: e.target.checked
                          }
                        })}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span className="text-[11px] font-bold text-slate-700 truncate">{doc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Student Details */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Edit Student Information</h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStudentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Name</label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={editingStudent.class}
                    onChange={e => setEditingStudent({ ...editingStudent, class: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    {standardClasses.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={editingStudent.section}
                    onChange={e => setEditingStudent({ ...editingStudent, section: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent Contact Phone</label>
                <input
                  type="tel"
                  value={editingStudent.phone}
                  onChange={e => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Update Records
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Exam Master Schedule */}
      {isAddExamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Configure Examination Term</h3>
              <button onClick={() => setIsAddExamOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExamSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Exam Name / Title</label>
                <input
                  type="text"
                  value={examForm.name}
                  onChange={e => setExamForm({ ...examForm, name: e.target.value })}
                  placeholder="e.g. Second Mid-Term Assessment 2026"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Grading System</label>
                <select
                  value={examForm.gradingSystem}
                  onChange={e => setExamForm({ ...examForm, gradingSystem: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="Tamil Nadu State Board 10-Point Scale">Tamil Nadu State Board 10-Point Scale</option>
                  <option value="CBSE 9-Point Grade Scheme (A1 to E)">CBSE 9-Point Grade Scheme (A1 to E)</option>
                  <option value="Standard Percentage & Grade (35% Pass)">Standard Percentage & Grade (35% Pass)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={examForm.startDate}
                    onChange={e => setExamForm({ ...examForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={examForm.endDate}
                    onChange={e => setExamForm({ ...examForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddExamOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Activate Exam Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Generate Certificate */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Certificate Generation Desk</h3>
              <button onClick={() => setIsCertModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateCertSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  value={certForm.studentId}
                  onChange={e => setCertForm({ ...certForm, studentId: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  {students.slice(0, 15).map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.class} - {s.section} • Adm: {s.admissionNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Certificate Type</label>
                <select
                  value={certForm.type}
                  onChange={e => setCertForm({ ...certForm, type: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="Bonafide Certificate">Bonafide Certificate</option>
                  <option value="Transfer Certificate (TC)">Transfer Certificate (TC)</option>
                  <option value="Conduct & Character Certificate">Conduct & Character Certificate</option>
                  <option value="Study & Fee Paid Certificate">Study & Fee Paid Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Purpose / Remarks</label>
                <input
                  type="text"
                  value={certForm.purpose}
                  onChange={e => setCertForm({ ...certForm, purpose: e.target.value })}
                  placeholder="e.g. Passport Application or Competitive Exam"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
                >
                  Generate & Preview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Official Certificate with Print */}
      {viewingCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-8 shadow-2xl space-y-6 animate-scale-in">
            {/* Header / Seal */}
            <div className="text-center border-b-2 border-emerald-600 pb-4 space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800">
                Official Institutional Record
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Green Valley Matriculation Higher Secondary School
              </h2>
              <p className="text-xs text-slate-500">
                Anna Nagar, Chennai, Tamil Nadu • Affiliated to Department of School Education
              </p>
            </div>

            {/* Certificate Body */}
            <div className="py-4 space-y-4 text-center">
              <h3 className="text-lg font-black text-slate-900 underline uppercase tracking-wide">
                {viewingCertificate.type}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed max-w-xl mx-auto">
                This is to certify that Master/Kumari <strong className="text-slate-900 text-base">{viewingCertificate.studentName}</strong>,
                bearing Admission Number <strong className="font-mono text-slate-900">{viewingCertificate.admissionNo}</strong>,
                is a bonafide student of this institution studying in <strong className="text-slate-900">{viewingCertificate.class}</strong> during the academic year 2026–2027.
              </p>
              <p className="text-xs text-slate-600">
                This certificate is granted for the purpose of: <em>&ldquo;{viewingCertificate.purpose}&rdquo;</em>.
              </p>
            </div>

            {/* Footer Signatures */}
            <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-xs text-slate-600">
              <div>
                <span className="block font-mono text-[10px] text-slate-400">Cert No: {viewingCertificate.id}</span>
                <span className="block font-bold">Date: {viewingCertificate.issuedDate}</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-600/40 text-emerald-700 flex items-center justify-center font-bold text-[9px] mx-auto uppercase">
                  Official Seal
                </div>
              </div>
              <div className="text-right">
                <div className="font-serif italic text-base text-slate-800">Dr. K. Sivasankaran</div>
                <span className="font-bold block">Principal & Super Admin</span>
              </div>
            </div>

            {/* Print & Close */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewingCertificate(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => alert('Printing high-resolution certificate on letterhead...')}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Student Photo ID Card Preview */}
      {idCardStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-sm w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-800">Digital Student ID Badge</span>
              <button onClick={() => setIdCardStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Realistic ID Badge Card */}
            <div className="bg-gradient-to-b from-indigo-700 via-indigo-800 to-slate-900 text-white rounded-3xl p-5 shadow-xl text-center space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-center gap-2">
                <School className="w-5 h-5 text-indigo-300" />
                <span className="font-extrabold text-xs tracking-tight">Green Valley School</span>
              </div>

              <Avatar
                src={idCardStudent.avatar}
                name={idCardStudent.name}
                size="xl"
                className="mx-auto ring-4 ring-white/30"
              />

              <div>
                <h4 className="font-black text-base tracking-tight">{idCardStudent.name}</h4>
                <p className="text-xs text-indigo-200 font-bold">
                  {idCardStudent.class} • Sec {idCardStudent.section}
                </p>
                <p className="text-[10px] text-slate-300 font-mono mt-0.5">
                  Roll: #{idCardStudent.rollNo} • Adm: {idCardStudent.admissionNo}
                </p>
              </div>

              <div className="p-2.5 bg-white/10 rounded-2xl text-[11px] space-y-1 text-indigo-100">
                <p className="flex justify-between">
                  <span className="text-indigo-300">Blood Group:</span>
                  <strong>{idCardStudent.bloodGroup || 'B+'}</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-indigo-300">Emergency:</span>
                  <strong>{idCardStudent.phone || '+91 98401 23456'}</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-indigo-300">Valid Till:</span>
                  <strong>31 May 2027</strong>
                </p>
              </div>

              <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-indigo-300 font-mono">
                <QrCode className="w-4 h-4" />
                <span>GV-2026-NFC-ENABLED</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Printing official laminated ID card for ${idCardStudent.name}`)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Laminated Badge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
