import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  FileSpreadsheet,
  Download,
  Filter,
  Eye,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Search,
  School
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { DataTable } from '../../components/common/DataTable';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { AddStudentModal } from '../../components/forms/AddStudentModal';
import { CollectFeeModal } from '../../components/forms/CollectFeeModal';
import { FeeReceiptModal } from '../../components/preview/FeeReceiptModal';
import { reportService } from '../../services/reportService';
import { formatCurrency } from '../../utils/formatters';

export function StudentsPage() {
  const navigate = useNavigate();
  const { students, totalStudentsCount } = useSchool();

  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [selectedStudentForFee, setSelectedStudentForFee] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  // Filters
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('All');
  const [selectedHouse, setSelectedHouse] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      if (selectedClass !== 'All' && student.class !== selectedClass) return false;
      if (selectedSection !== 'All' && student.section !== selectedSection) return false;
      if (selectedFeeStatus !== 'All' && student.feeStatus !== selectedFeeStatus) return false;
      if (selectedHouse !== 'All' && student.house !== selectedHouse) return false;
      if (selectedGender !== 'All' && student.gender !== selectedGender) return false;
      return true;
    });
  }, [students, selectedClass, selectedSection, selectedFeeStatus, selectedHouse, selectedGender]);

  const handleExportCSV = () => {
    const exportData = filteredStudents.map(s => ({
      'Admission No': s.admissionNo,
      'Roll No': s.rollNo,
      'Name': s.name,
      'Class': s.class,
      'Section': s.section,
      'Gender': s.gender,
      'Parent Name': s.parent,
      'Phone': s.phone,
      'Attendance %': `${s.attendance}%`,
      'Fee Status': s.feeStatus,
      'Pending Fee (INR)': s.pendingFee
    }));
    reportService.exportToCSV('GreenValley_Students_Roster_2026', exportData);
  };

  const handleImportSimulate = () => {
    alert('Excel / CSV student bulk import template ready. In production, this parses XLSX spreadsheets.');
  };

  const columns = [
    {
      header: 'Student',
      key: 'name',
      sortable: true,
      render: (student) => (
        <div className="flex items-center gap-3">
          <Avatar src={student.avatar} name={student.name} size="md" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white block hover:text-brand-600 transition-colors">
              {student.name}
            </span>
            <span className="text-xs text-slate-400">
              Adm: {student.admissionNo} • Roll #{student.rollNo}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Class / Sec',
      key: 'class',
      sortable: true,
      render: (student) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {student.class}
          </span>
          <span className="text-xs text-slate-400 block">
            Section {student.section}
          </span>
        </div>
      )
    },
    {
      header: 'Parent & Contact',
      key: 'parent',
      render: (student) => (
        <div>
          <span className="font-medium text-slate-800 dark:text-slate-200 block">
            {student.parent}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400" />
            {student.phone}
          </span>
        </div>
      )
    },
    {
      header: 'House',
      key: 'house',
      sortable: true,
      render: (student) => {
        const houseColors = {
          Emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200',
          Ruby: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200',
          Sapphire: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200',
          Topaz: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200',
        };
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${houseColors[student.house] || ''}`}>
            {student.house}
          </span>
        );
      }
    },
    {
      header: 'Attendance',
      key: 'attendance',
      sortable: true,
      render: (student) => (
        <div className="flex items-center gap-2">
          <div className="w-12 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${student.attendance >= 90 ? 'bg-emerald-500' : student.attendance >= 75 ? 'bg-indigo-500' : 'bg-amber-500'}`}
              style={{ width: `${student.attendance}%` }}
            />
          </div>
          <span className="font-bold text-xs">{student.attendance}%</span>
        </div>
      )
    },
    {
      header: 'Fee Status',
      key: 'feeStatus',
      sortable: true,
      render: (student) => {
        const isPaid = student.feeStatus === 'Paid';
        const isOverdue = student.feeStatus === 'Overdue';
        const isPartial = student.feeStatus === 'Partially Paid';
        return (
          <div>
            <Badge
              variant={isPaid ? 'success' : isOverdue ? 'danger' : isPartial ? 'warning' : 'info'}
              size="sm"
            >
              {student.feeStatus}
            </Badge>
            {student.pendingFee > 0 && (
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {formatCurrency(student.pendingFee)} due
              </span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (student) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/admin/students/${student.id}`)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-brand-600 transition-colors"
            title="View Student Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          {student.pendingFee > 0 && (
            <button
              onClick={() => setSelectedStudentForFee(student)}
              className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600 transition-colors"
              title="Collect Fee"
            >
              <CreditCard className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Students
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {totalStudentsCount.toLocaleString()} enrolled students across all standards
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleImportSimulate}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Import Excel</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-brand-600" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setAddStudentOpen(true)}
            className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-semibold mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        {/* Class Filter */}
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
        >
          <option value="All">All Classes</option>
          {['1st Standard', '2nd Standard', '3rd Standard', '4th Standard', '5th Standard', '6th Standard', '7th Standard', '8th Standard', '9th Standard', '10th Standard', '11th Standard', '12th Standard'].map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        {/* Section Filter */}
        <select
          value={selectedSection}
          onChange={e => setSelectedSection(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
        >
          <option value="All">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>

        {/* Fee Status Filter */}
        <select
          value={selectedFeeStatus}
          onChange={e => setSelectedFeeStatus(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
        >
          <option value="All">All Fee Status</option>
          <option value="Paid">Paid</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>

        {/* House Filter */}
        <select
          value={selectedHouse}
          onChange={e => setSelectedHouse(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
        >
          <option value="All">All Houses</option>
          <option value="Emerald">Emerald</option>
          <option value="Ruby">Ruby</option>
          <option value="Sapphire">Sapphire</option>
          <option value="Topaz">Topaz</option>
        </select>

        {/* Gender Filter */}
        <select
          value={selectedGender}
          onChange={e => setSelectedGender(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
        >
          <option value="All">All Genders</option>
          <option value="Male">Boys (Male)</option>
          <option value="Female">Girls (Female)</option>
        </select>

        {(selectedClass !== 'All' || selectedSection !== 'All' || selectedFeeStatus !== 'All' || selectedHouse !== 'All' || selectedGender !== 'All') && (
          <button
            onClick={() => {
              setSelectedClass('All');
              setSelectedSection('All');
              setSelectedFeeStatus('All');
              setSelectedHouse('All');
              setSelectedGender('All');
            }}
            className="text-brand-600 dark:text-brand-400 hover:underline font-semibold ml-auto"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Student DataTable */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        searchable={true}
        searchPlaceholder="Search by student name, roll number, admission number..."
        pageSize={12}
        onRowClick={(student) => navigate(`/admin/students/${student.id}`)}
        mobileCardRender={(student) => (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Avatar src={student.avatar} name={student.name} size="md" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{student.name}</h4>
                  <p className="text-slate-400 text-[11px]">{student.class} - {student.section} • Roll #{student.rollNo}</p>
                </div>
              </div>
              <Badge variant={student.feeStatus === 'Paid' ? 'success' : 'warning'} size="sm">
                {student.feeStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Parent: {student.parent}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{student.attendance}% Att.</span>
            </div>
          </div>
        )}
      />

      {/* Modals */}
      <AddStudentModal
        isOpen={addStudentOpen}
        onClose={() => setAddStudentOpen(false)}
      />

      <CollectFeeModal
        isOpen={!!selectedStudentForFee}
        defaultStudent={selectedStudentForFee}
        onClose={() => setSelectedStudentForFee(null)}
        onPaymentComplete={(txn) => setReceiptData(txn)}
      />

      <FeeReceiptModal
        isOpen={!!receiptData}
        receipt={receiptData}
        onClose={() => setReceiptData(null)}
      />
    </div>
  );
}
