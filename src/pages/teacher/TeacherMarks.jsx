import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Save,
  Search,
  Filter,
  CheckCircle2,
  Award,
  Sparkles,
  ChevronDown,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';

const standardClasses = [
  '1st Standard', '2nd Standard', '3rd Standard', '4th Standard',
  '5th Standard', '6th Standard', '7th Standard', '8th Standard',
  '9th Standard', '10th Standard', '11th Standard', '12th Standard'
];

const subjectsList = ['Mathematics', 'Science', 'Tamil', 'English', 'Social Science'];

export function TeacherMarks() {
  const { students, updateMarks, marks, exams } = useSchool();

  // Filters
  const [selectedClass, setSelectedClass] = useState('10th Standard');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedExam, setSelectedExam] = useState('EXM-2026-01');
  const [searchQuery, setSearchQuery] = useState('');

  // Local state for fast in-place editing: { [studentId]: number }
  const [editedScores, setEditedScores] = useState({});
  const [savedStudentIds, setSavedStudentIds] = useState(new Set());

  // Available sections dynamically determined for selected class
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

  // Helper to obtain score for a student for the current subject
  const getStudentScore = (student) => {
    if (editedScores[student.id] !== undefined) {
      return editedScores[student.id];
    }
    const markEntry = student.marks?.find(
      m => m.subject.toLowerCase() === selectedSubject.toLowerCase()
    );
    if (markEntry && markEntry.obtainedMarks !== undefined) {
      return markEntry.obtainedMarks;
    }
    // Fallback default marks for demo realism
    return 88;
  };

  const handleScoreChange = (studentId, val) => {
    const num = Math.min(100, Math.max(0, Number(val) || 0));
    setEditedScores(prev => ({ ...prev, [studentId]: num }));
  };

  const handleSaveSingle = (studentId) => {
    const student = students.find(s => s.id === studentId);
    const score = getStudentScore(student);
    updateMarks(studentId, selectedExam, selectedSubject, Number(score), 100);
    setSavedStudentIds(prev => new Set([...prev, studentId]));
    setTimeout(() => {
      setSavedStudentIds(prev => {
        const next = new Set(prev);
        next.delete(studentId);
        return next;
      });
    }, 2000);
  };

  const handleSaveAll = () => {
    filteredStudents.forEach(st => {
      const score = getStudentScore(st);
      updateMarks(st.id, selectedExam, selectedSubject, Number(score), 100);
    });
    setSavedStudentIds(new Set(filteredStudents.map(s => s.id)));
    setTimeout(() => setSavedStudentIds(new Set()), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Faculty Marks Evaluation</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              Live Sync
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Marks entered automatically sync to Student scorecard, Parent portal, and Principal ledger.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-2xl shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save All Scores ({filteredStudents.length})</span>
        </button>
      </div>

      {/* Control Panel: Class, Section Tabs, Subject, and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1. Class / Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Select Standard / Class</span>
            </label>
            <select
              value={selectedClass}
              onChange={e => {
                setSelectedClass(e.target.value);
                // Keep section as 'A' or 'ALL'
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            >
              {standardClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* 2. Subject Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Evaluation Subject</span>
            </label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
            >
              {subjectsList.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* 3. Exam Schedule */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-purple-600" />
              <span>Exam Term</span>
            </label>
            <select
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer"
            >
              <option value="EXM-2026-01">Quarterly Examination 2026</option>
              <option value="EXM-2026-02">Half-Yearly Examination 2026</option>
              <option value="EXM-2026-03">Monthly Unit Test 3</option>
            </select>
          </div>
        </div>

        {/* Dynamic Section Selector Tabs: automatically shows all sections for the selected class */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-extrabold text-slate-600 mr-1.5 whitespace-nowrap">
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
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Section {sec}
              </button>
            ))}
          </div>

          {/* Student Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search student or roll no..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Marks Entry Cards / Table (Mobile-Responsive Cards + Desktop Clean Table) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-extrabold text-slate-400 uppercase bg-slate-50/80">
                <th className="py-3.5 px-5">Roll</th>
                <th className="py-3.5 px-5">Student</th>
                <th className="py-3.5 px-5">Class & Sec</th>
                <th className="py-3.5 px-5 text-center">Marks (Max: 100)</th>
                <th className="py-3.5 px-5 text-center">Calculated Grade</th>
                <th className="py-3.5 px-5 text-right">Quick Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                    No students match the selected filter or search query.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const score = getStudentScore(student);
                  const isSaved = savedStudentIds.has(student.id);
                  const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : score >= 35 ? 'C' : 'Fail';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-5 font-mono font-bold text-slate-600">
                        #{student.rollNo}
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <Avatar src={student.avatar} name={student.name} size="sm" />
                          <div>
                            <span className="font-extrabold text-slate-900 text-xs block">{student.name}</span>
                            <span className="text-[10px] text-slate-400">Adm: {student.admissionNo}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-slate-600 font-semibold">
                        {student.class} - {student.section}
                      </td>
                      <td className="py-3 px-5 text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleScoreChange(student.id, Math.max(0, score - 1))}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={score}
                            onChange={e => handleScoreChange(student.id, e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleSaveSingle(student.id);
                            }}
                            className="w-16 py-1.5 text-center font-extrabold text-sm rounded-xl border border-indigo-200 bg-indigo-50/40 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleScoreChange(student.id, Math.min(100, score + 1))}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <Badge variant={score >= 70 ? 'success' : score >= 35 ? 'warning' : 'danger'} size="sm">
                          {grade}
                        </Badge>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => handleSaveSingle(student.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700'
                          }`}
                        >
                          {isSaved ? 'Saved ✓' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile-Friendly Fast Marks Entry Cards */}
        <div className="md:hidden divide-y divide-slate-100 p-2 space-y-2">
          {filteredStudents.length === 0 ? (
            <p className="py-8 text-center text-slate-400 text-xs">
              No students found for this class and section.
            </p>
          ) : (
            filteredStudents.map(student => {
              const score = getStudentScore(student);
              const isSaved = savedStudentIds.has(student.id);
              const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : score >= 35 ? 'C' : 'Fail';

              return (
                <div
                  key={student.id}
                  className="p-3 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={student.avatar} name={student.name} size="sm" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs">{student.name}</h4>
                        <span className="text-[10px] text-slate-500">
                          Roll #{student.rollNo} • {student.class} - {student.section}
                        </span>
                      </div>
                    </div>
                    <Badge variant={score >= 70 ? 'success' : score >= 35 ? 'warning' : 'danger'} size="sm">
                      {grade}
                    </Badge>
                  </div>

                  {/* Fast Marks Entry Bar */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-600">
                      {selectedSubject} Score:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleScoreChange(student.id, Math.max(0, score - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-800 font-extrabold text-sm flex items-center justify-center active:scale-95"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={score}
                        onChange={e => handleScoreChange(student.id, e.target.value)}
                        className="w-16 py-1.5 text-center font-extrabold text-sm rounded-xl border border-indigo-200 bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleScoreChange(student.id, Math.min(100, score + 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-800 font-extrabold text-sm flex items-center justify-center active:scale-95"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSaveSingle(student.id)}
                        className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                          isSaved
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600 text-white active:scale-95'
                        }`}
                      >
                        {isSaved ? 'Saved ✓' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
