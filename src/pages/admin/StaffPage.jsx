import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  DollarSign,
  Clock,
  Filter,
  Eye,
  MapPin
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { DataTable } from '../../components/common/DataTable';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Drawer } from '../../components/common/Drawer';
import { formatDate } from '../../utils/formatters';

export function StaffPage() {
  const { staff } = useSchool();
  const [selectedDept, setSelectedDept] = useState('All');
  const [activeStaff, setActiveStaff] = useState(null);

  const departments = ['All', 'Teachers', 'Administrative Staff', 'Accountants', 'Librarians', 'Support Staff'];

  const filteredStaff = selectedDept === 'All'
    ? staff
    : staff.filter(s => s.department === selectedDept);

  const columns = [
    {
      header: 'Staff Member',
      key: 'name',
      sortable: true,
      render: (member) => (
        <div className="flex items-center gap-3">
          <Avatar src={member.avatar} name={member.name} size="md" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white block hover:text-brand-600 transition-colors">
              {member.name}
            </span>
            <span className="text-xs text-slate-400">
              ID: {member.id}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Department',
      key: 'department',
      sortable: true,
      render: (member) => (
        <Badge variant={member.department === 'Teachers' ? 'info' : member.department === 'Accountants' ? 'success' : 'neutral'} size="sm">
          {member.department}
        </Badge>
      )
    },
    {
      header: 'Designation',
      key: 'designation',
      sortable: true,
      render: (member) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">
            {member.designation}
          </span>
          <span className="text-[11px] text-slate-400">
            {member.qualification}
          </span>
        </div>
      )
    },
    {
      header: 'Phone',
      key: 'phone',
      render: (member) => (
        <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          {member.phone}
        </span>
      )
    },
    {
      header: 'Attendance',
      key: 'attendance',
      sortable: true,
      render: (member) => (
        <div className="flex items-center gap-2">
          <div className="w-12 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${member.attendance}%` }} />
          </div>
          <span className="font-bold text-xs">{member.attendance}%</span>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (member) => (
        <Badge variant="success" size="sm">{member.status}</Badge>
      )
    },
    {
      header: 'Action',
      key: 'action',
      render: (member) => (
        <button
          onClick={() => setActiveStaff(member)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-brand-600"
          title="View Staff Profile"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Staff Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Faculty, administrative personnel, and support team members
          </p>
        </div>

        <button
          onClick={() => alert('Add Staff modal ready for production.')}
          className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Staff Member</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedDept === dept
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Staff DataTable */}
      <DataTable
        columns={columns}
        data={filteredStaff}
        searchable={true}
        searchPlaceholder="Search staff by name, designation, department..."
        pageSize={10}
        onRowClick={(member) => setActiveStaff(member)}
      />

      {/* Staff Profile Drawer */}
      <Drawer
        isOpen={!!activeStaff}
        onClose={() => setActiveStaff(null)}
        title="Staff Employee Profile"
        subtitle={activeStaff ? `${activeStaff.name} • ${activeStaff.id}` : ''}
      >
        {activeStaff && (
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Top avatar info */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <Avatar src={activeStaff.avatar} name={activeStaff.name} size="xl" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeStaff.name}
                </h3>
                <p className="text-brand-600 dark:text-brand-400 font-semibold">{activeStaff.designation}</p>
                <p className="text-xs text-slate-400 mt-0.5">{activeStaff.department}</p>
              </div>
            </div>

            {/* General Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                Employment Details
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/50 dark:bg-slate-800/30 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block">Qualification:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{activeStaff.qualification}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date of Joining:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(activeStaff.joiningDate)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Attendance:</span>
                  <span className="font-bold text-emerald-600">{activeStaff.attendance}% Cumulative</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Casual Leave Balance:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activeStaff.leaveBalance} days remaining</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Salary / Scale:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{activeStaff.salary}</span>
                </div>
              </div>
            </div>

            {/* Classes Assigned */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                Classes & Responsibilities
              </h4>
              <div className="space-y-1.5">
                {(activeStaff.classesAssigned || []).map((cls, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-900 text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                    {cls}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                Contact Information
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>{activeStaff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>{activeStaff.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>{activeStaff.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
