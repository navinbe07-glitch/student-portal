import React, { useState } from 'react';
import {
  BookOpen,
  Send,
  FileText,
  HelpCircle,
  FolderDown,
  Layers,
  Sparkles,
  Paperclip,
  CheckCircle2,
  Trash2,
  Download,
  AlertCircle
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Badge } from '../../components/common/Badge';

const materialTypes = [
  'Notes',
  'Important Questions',
  'Question Bank',
  'Study Material',
  'Announcement / Message'
];

const classesList = [
  '1st Standard', '2nd Standard', '3rd Standard', '4th Standard',
  '5th Standard', '6th Standard', '7th Standard', '8th Standard',
  '9th Standard', '10th Standard', '11th Standard', '12th Standard'
];

const subjectsList = ['Mathematics', 'Science', 'Tamil', 'English', 'Social Science', 'All Subjects'];

export function TeacherClassContent() {
  const { classContents, publishClassContent, deleteClassContent } = useSchool();

  // Form State
  const [selectedClass, setSelectedClass] = useState('10th Standard');
  const [selectedSection, setSelectedSection] = useState('All Sections (A, B, C)');
  const [contentType, setContentType] = useState('Important Questions');
  const [subject, setSubject] = useState('Mathematics');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSimulateUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Class10_StudyNotes_Term1.pdf');
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    publishClassContent({
      class: selectedClass,
      section: selectedSection,
      type: contentType,
      title,
      subject,
      publishedBy: 'Mrs. Revathi Ramanathan (Faculty)',
      description: description || 'Study material uploaded for class preparation and board exams.',
      fileUrl: '#',
      fileType: fileName ? `${fileName} (Ready)` : 'PDF Document (2.4 MB)'
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setFileName('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Class Study Content & Material Publisher</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            1-Click Class Broadcast
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Publish lecture notes, important questions, question banks, study guides, and urgent announcements directly to entire classes.
        </p>
      </div>

      {/* 1-Action Class Publisher Form */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Create & Broadcast Study Content</span>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            Reaches 100% of enrolled students & parents
          </span>
        </div>

        <form onSubmit={handlePublish} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Target Class */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Target Class</span>
              </label>
              <select
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                {classesList.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Target Section */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Section
              </label>
              <select
                value={selectedSection}
                onChange={e => setSelectedSection(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value="All Sections (A, B, C)">All Sections (A, B, C)</option>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
              </select>
            </div>

            {/* Material / Content Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Content Category
              </label>
              <select
                value={contentType}
                onChange={e => setContentType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                {materialTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subject
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                {subjectsList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Material Title / Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Class 10 Trigonometry Formula Sheet & 20 Solved Board Problems"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold text-slate-900"
              required
            />
          </div>

          {/* Detailed Instructions / Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Summary, Study Instructions or Announcement Details
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Instructions for students regarding submission or preparation..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
            />
          </div>

          {/* Attachment / Upload Simulation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer transition-colors">
                <Paperclip className="w-4 h-4 text-emerald-600" />
                <span>{fileName ? `File: ${fileName}` : 'Attach Document / Notes (PDF, DOC)'}</span>
                <input
                  type="file"
                  onChange={handleSimulateUpload}
                  className="hidden"
                />
              </label>
              {fileName && (
                <button
                  type="button"
                  onClick={() => setFileName('')}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast to {selectedClass} Now</span>
            </button>
          </div>
        </form>
      </div>

      {/* Published Materials Repository */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">
            Active Class Materials & Question Banks ({classContents.length})
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            Visible in Student & Parent Portal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {classContents.map(cnt => (
            <div
              key={cnt.id}
              className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {cnt.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {cnt.publishedAt}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                  {cnt.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {cnt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div>
                  <span className="font-bold text-slate-700 block">{cnt.class}</span>
                  <span>{cnt.section} • {cnt.subject}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => alert(`Simulated downloading: ${cnt.title}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteClassContent(cnt.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove Material"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
