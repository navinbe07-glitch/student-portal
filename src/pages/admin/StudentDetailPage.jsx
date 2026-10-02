import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  FileSpreadsheet,
  BookOpen,
  FileText,
  Award,
  Clock,
  Printer,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { CollectFeeModal } from '../../components/forms/CollectFeeModal';
import { FeeReceiptModal } from '../../components/preview/FeeReceiptModal';
import { ReportCardModal } from '../../components/preview/ReportCardModal';
import { CertificateModal } from '../../components/preview/CertificateModal';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useSchool();

  const student = students.find(s => s.id === id || s.admissionNo === id) || students[0];

  const [activeTab, setActiveTab] = useState('overview'); // overview, attendance, fees, marks, homework, documents
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [reportCardOpen, setReportCardOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [selectedCertTemplate, setSelectedCertTemplate] = useState('Bonafide Certificate');

  if (!student) {
    return (
      <div className="p-8 text-center text-slate-500">
        Student not found. <button onClick={() => navigate('/admin/students')} className="text-brand-600 font-bold ml-2">Back to Students</button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'fees', label: 'Fees & Dues' },
    { id: 'marks', label: 'Marks & Exams' },
    { id: 'homework', label: 'Homework' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/students')}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Students</span>
      </button>

      {/* Header Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar src={student.avatar} name={student.name} size="2xl" className="ring-4 ring-slate-100 dark:ring-slate-800" />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {student.name}
                </h1>
                <Badge variant={student.feeStatus === 'Paid' ? 'success' : student.feeStatus === 'Overdue' ? 'danger' : 'warning'} size="sm">
                  Fee: {student.feeStatus}
                </Badge>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {student.house} House
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>Class: <strong className="text-slate-800 dark:text-slate-200">{student.class} - {student.section}</strong></span>
                <span>Roll No: <strong className="text-slate-800 dark:text-slate-200">#{student.rollNo}</strong></span>
                <span>Adm No: <strong className="text-slate-800 dark:text-slate-200">{student.admissionNo}</strong></span>
                <span>DOB: <strong className="text-slate-800 dark:text-slate-200">{formatDate(student.dob)}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {student.pendingFee > 0 && (
              <button
                onClick={() => setFeeModalOpen(true)}
                className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Collect Fee ({formatCurrency(student.pendingFee)})</span>
              </button>
            )}
            <button
              onClick={() => setReportCardOpen(true)}
              className="flex-1 md:flex-none px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Report Card</span>
            </button>
            <button
              onClick={() => {
                setSelectedCertTemplate('Bonafide Certificate');
                setCertificateOpen(true);
              }}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold rounded-xl transition-all"
              title="Issue Certificate"
            >
              Issue Certificate
            </button>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <UserCheck className="w-4 h-4 text-brand-500" />
            <span>Parent: <strong className="text-slate-800 dark:text-slate-200">{student.parent}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>{student.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="truncate">{student.address}</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
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

      {/* Tab Content Panels */}
      <div>
        {/* 1. Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Attendance Rate</span>
              <div className="text-3xl font-extrabold text-emerald-600">{student.attendance}%</div>
              <p className="text-xs text-slate-500">
                Present today: <span className="font-semibold text-emerald-600">Yes</span>
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fee Balance</span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(student.pendingFee)}
              </div>
              <p className="text-xs text-slate-500">
                Total Annual: {formatCurrency(student.totalFee)} • Paid: {formatCurrency(student.paidFee)}
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Academic Standing</span>
              <div className="text-3xl font-extrabold text-brand-600">A+ Grade</div>
              <p className="text-xs text-slate-500">
                Quarterly Assessment Total: 457/500 (91.4%)
              </p>
            </div>

            {/* Transport & Details Card */}
            <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Logistics & Emergency Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-slate-400 block mb-1">Blood Group</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{student.bloodGroup || 'B+'}</span>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-slate-400 block mb-1">School Transport Route</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{student.busRoute || 'Route 3 (Anna Nagar)'}</span>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-slate-400 block mb-1">Emergency Contact</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{student.emergencyContact || student.phone}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Monthly Attendance Calendar (September 2026)
                </h3>
                <p className="text-xs text-slate-500">Overall cumulative attendance: {student.attendance}%</p>
              </div>
              <Badge variant="success">Present: 18 Days</Badge>
            </div>

            {/* Attendance Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="py-1 font-bold text-slate-400">{day}</div>
              ))}
              {Array.from({ length: 30 }, (_, i) => {
                const dayNum = i + 1;
                const isWeekend = (dayNum % 7 === 6) || (dayNum % 7 === 0);
                const isAbsent = dayNum === 14;
                return (
                  <div
                    key={i}
                    className={`py-2.5 rounded-xl font-bold transition-all ${
                      isWeekend
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        : isAbsent
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800'
                    }`}
                  >
                    <span>{dayNum}</span>
                    <span className="block text-[9px] font-normal mt-0.5">
                      {isWeekend ? 'Holiday' : isAbsent ? 'Absent' : 'Present'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Fees Tab */}
        {activeTab === 'fees' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs text-slate-500 block">Total Annual Fee</span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {formatCurrency(student.totalFee)}
                </span>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/80 dark:border-emerald-900">
                <span className="text-xs text-emerald-700 dark:text-emerald-400 block">Paid to Date</span>
                <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(student.paidFee)}
                </span>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-900 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-700 dark:text-amber-400 block">Pending Balance</span>
                  <span className="text-xl font-extrabold text-amber-700 dark:text-amber-300">
                    {formatCurrency(student.pendingFee)}
                  </span>
                </div>
                {student.pendingFee > 0 && (
                  <button
                    onClick={() => setFeeModalOpen(true)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>

            {/* Payment History Table */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Payment & Receipt History
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase">
                      <th className="py-2.5 px-3">Receipt No</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3">Method</th>
                      <th className="py-2.5 px-3 text-right">Amount</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {(student.paymentHistory || []).map((pay, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-brand-600 dark:text-brand-400">{pay.receiptNo}</td>
                        <td className="py-2.5 px-3">{formatDate(pay.date)}</td>
                        <td className="py-2.5 px-3">{pay.type}</td>
                        <td className="py-2.5 px-3">{pay.method}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-600">{formatCurrency(pay.amount)}</td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => {
                              setReceiptData({
                                receiptNo: pay.receiptNo,
                                studentName: student.name,
                                studentId: student.id,
                                class: `${student.class} - ${student.section}`,
                                amount: pay.amount,
                                feeType: pay.type,
                                date: pay.date,
                                paymentMethod: pay.method
                              });
                            }}
                            className="text-xs text-brand-600 hover:underline font-semibold"
                          >
                            View Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. Marks Tab */}
        {activeTab === 'marks' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Quarterly Examination 2026 Marksheet
                </h3>
                <p className="text-xs text-slate-500">Evaluated on standard matriculation 100-mark scale</p>
              </div>
              <button
                onClick={() => setReportCardOpen(true)}
                className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Generate Official Report Card</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 uppercase">
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3 text-center">Max Marks</th>
                    <th className="py-2.5 px-3 text-center">Obtained Marks</th>
                    <th className="py-2.5 px-3 text-center">Grade</th>
                    <th className="py-2.5 px-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(student.marks || []).map(m => (
                    <tr key={m.subject} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{m.subject}</td>
                      <td className="py-2.5 px-3 text-center text-slate-400">{m.maxMarks}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-sm text-slate-900 dark:text-white">{m.obtainedMarks}</td>
                      <td className="py-2.5 px-3 text-center">
                        <Badge variant={m.grade === 'A+' ? 'success' : 'info'} size="sm">{m.grade}</Badge>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-600">Pass</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. Homework Tab */}
        {activeTab === 'homework' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Class Assignments & Homework Tracker
            </h3>
            <div className="space-y-3">
              {(student.homework || []).map(hw => (
                <div key={hw.id} className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{hw.title}</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-semibold">
                        {hw.subject}
                      </span>
                    </div>
                    <p className="text-slate-500">Due Date: <strong className="text-slate-700 dark:text-slate-300">{formatDate(hw.dueDate)}</strong></p>
                  </div>
                  <Badge variant={hw.status === 'Completed' ? 'success' : 'warning'} size="sm">
                    {hw.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Documents Tab */}
        {activeTab === 'documents' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Verified Student Documents & Certificates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {(student.documents || []).map((doc, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-brand-600" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                      <p className="text-slate-400 text-[11px]">Verified on {doc.date}</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">{doc.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CollectFeeModal
        isOpen={feeModalOpen}
        defaultStudent={student}
        onClose={() => setFeeModalOpen(false)}
        onPaymentComplete={(txn) => setReceiptData(txn)}
      />

      <FeeReceiptModal
        isOpen={!!receiptData}
        receipt={receiptData}
        onClose={() => setReceiptData(null)}
      />

      <ReportCardModal
        isOpen={reportCardOpen}
        onClose={() => setReportCardOpen(false)}
        reportData={{
          name: student.name,
          rollNo: student.rollNo,
          class: student.class,
          section: student.section,
          marks: {
            Tamil: { max: 100, obtained: 91, grade: 'A+' },
            English: { max: 100, obtained: 94, grade: 'A+' },
            Mathematics: { max: 100, obtained: 95, grade: 'A+' },
            Science: { max: 100, obtained: 88, grade: 'A' },
            SocialScience: { max: 100, obtained: 89, grade: 'A' },
          },
          totalMax: 500,
          totalObtained: 457,
          percentage: 91.4,
          grade: 'A+',
          result: 'Pass',
          rank: 3
        }}
      />

      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        student={student}
        templateType={selectedCertTemplate}
      />
    </div>
  );
}
