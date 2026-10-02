import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Layers,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  X,
  IdCard
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';

const standardClasses = [
  '1st Standard', '2nd Standard', '3rd Standard', '4th Standard',
  '5th Standard', '6th Standard', '7th Standard', '8th Standard',
  '9th Standard', '10th Standard', '11th Standard', '12th Standard'
];

export function TeacherStudents() {
  const { students } = useSchool();

  // Filters
  const [selectedClass, setSelectedClass] = useState('10th Standard');
  const [selectedSection, setSelectedSection] = useState('A');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected student for full modal preview
  const [activeStudent, setActiveStudent] = useState(null);

  // Available sections for chosen class
  const availableSections = ['A', 'B', 'C'];

  // Filtered Students list
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchClass = s.class === selectedClass;
      const matchSection = selectedSection === 'ALL' || s.section === selectedSection;
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(s.rollNo).includes(searchQuery) ||
        (s.admissionNo && s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchClass && matchSection && matchSearch;
    });
  }, [students, selectedClass, selectedSection, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Student Directory & Cohort</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
            {filteredStudents.length} Students Found
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Search students across classes and sections. Cards display essential identification — tap any card to view complete academic profile.
        </p>
      </div>

      {/* Filter Controls: Class & Section Filters + Student Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Class / Standard Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Standard / Class Category</span>
            </label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              {standardClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Student Search Bar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Search by Name, Roll No, or Admission ID</span>
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="e.g. Arun Kumar, 101, GV-2024-101..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Section Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 mr-1 whitespace-nowrap">
            {selectedClass} Sections:
          </span>
          <button
            onClick={() => setSelectedSection('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedSection === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Sections
          </button>
          {availableSections.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedSection === sec
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Section {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results: Showing ONLY profile image + basic personal identification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            No students match your selected filters or search query.
          </div>
        ) : (
          filteredStudents.map(student => (
            <button
              key={student.id}
              type="button"
              onClick={() => setActiveStudent(student)}
              className="p-4 bg-white hover:bg-slate-50/80 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between gap-3 group cursor-pointer"
            >
              {/* Profile Image + Basic Personal Identification ONLY */}
              <div className="flex items-center gap-3.5 min-w-0">
                <Avatar
                  src={student.avatar}
                  name={student.name}
                  size="md"
                  className="ring-2 ring-slate-100 group-hover:ring-blue-400 transition-all shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                    {student.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="font-bold text-slate-700">Roll #{student.rollNo}</span>
                    <span>•</span>
                    <span>{student.class} - {student.section}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                    Adm: {student.admissionNo}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))
        )}
      </div>

      {/* Student Full Profile Modal on Click */}
      {activeStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scale-in max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Avatar src={activeStudent.avatar} name={activeStudent.name} size="lg" className="ring-2 ring-blue-500" />
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{activeStudent.name}</h3>
                  <p className="text-xs text-slate-500">
                    {activeStudent.class} - Section {activeStudent.section} • Roll #{activeStudent.rollNo}
                  </p>
                  <p className="text-[11px] text-blue-700 font-semibold font-mono">
                    Adm No: {activeStudent.admissionNo}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStudent(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Attendance</span>
                <span className="text-base font-extrabold text-emerald-800">{activeStudent.attendance}%</span>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                <span className="text-[10px] uppercase font-bold text-indigo-700 block">Class Rank</span>
                <span className="text-base font-extrabold text-indigo-800">#{activeStudent.classroomRank || 3}</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Fee Status</span>
                <span className="text-xs font-extrabold text-amber-800 mt-1 block">{activeStudent.feeStatus}</span>
              </div>
            </div>

            {/* Contact & Parent Information */}
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-2">
                Parent & Emergency Details
              </h4>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Guardian / Parent:</span>
                <strong className="text-slate-900">{activeStudent.parent} ({activeStudent.parentRelation || 'Parent'})</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Phone Contact:</span>
                <a href={`tel:${activeStudent.phone}`} className="text-blue-600 font-bold hover:underline">
                  {activeStudent.phone}
                </a>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Blood Group:</span>
                <strong className="text-slate-900">{activeStudent.bloodGroup || 'B+'}</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Aadhaar Reference:</span>
                <span className="font-mono text-slate-700">{activeStudent.aadhaar || '7492 8193 4012'}</span>
              </p>
              <p className="flex items-start justify-between gap-4 pt-1 border-t border-slate-200">
                <span className="text-slate-400 shrink-0">Residential Address:</span>
                <span className="text-slate-700 text-right">{activeStudent.address || 'Chennai, Tamil Nadu'}</span>
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveStudent(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close Student Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
