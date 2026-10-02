import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  School,
  Home,
  Award,
  CheckSquare,
  User,
  Calendar,
  Clock,
  LogOut,
  Bell,
  Sparkles,
  Play,
  ExternalLink,
  Phone,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  MapPin,
  IdCard,
  HelpCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { FloatingGlassNavbar, LinearFadeBlur } from '../../components/layout/FloatingGlassNavbar';
import { VideoPlayerModal } from '../../components/preview/VideoPlayerModal';
import { Footer } from '../../components/layout/Footer';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { initialTimetable } from '../../data/mockTimetable';

const tutorialVideos = [
  {
    id: 'VID-01',
    title: 'Class 10 CBSE Math: Quadratic Equations & Formula Derivation',
    subject: 'Mathematics',
    channel: 'Green Valley Digital Classroom',
    duration: '24:18',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=640&q=80',
    youtubeUrl: 'https://www.youtube.com/results?search_query=class+10+maths+quadratic+equations',
    keyPoints: [
      'Standard quadratic equation form: ax² + bx + c = 0.',
      'Discriminant D = b² - 4ac: Real & distinct roots if D > 0, equal roots if D = 0, no real roots if D < 0.',
      'Quadratic formula: x = (-b ± √D) / 2a.'
    ]
  },
  {
    id: 'VID-02',
    title: 'Class 10 Science: Carbon and its Compounds Complete Concept',
    subject: 'Science (Chemistry)',
    channel: 'Tamil Nadu E-Shiksha Hub',
    duration: '19:45',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=640&q=80',
    youtubeUrl: 'https://www.youtube.com/results?search_query=class+10+science+carbon+and+its+compounds',
    keyPoints: [
      'Tetravalency and catenation properties of carbon.',
      'Saturated hydrocarbons (alkanes) vs unsaturated hydrocarbons (alkenes & alkynes).',
      'Functional groups: Alcohols (-OH), Aldehydes (-CHO), Carboxylic acids (-COOH).'
    ]
  },
  {
    id: 'VID-03',
    title: 'English Core: Formal Letter Writing & Analytical Paragraph Formats',
    subject: 'English',
    channel: 'EduSphere Academic Portal',
    duration: '16:30',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=640&q=80',
    youtubeUrl: 'https://www.youtube.com/results?search_query=class+10+english+formal+letter+writing',
    keyPoints: [
      'Format: Sender address, Date, Receiver address, Subject, Salutation, Body in 3 paragraphs, Sign-off.',
      'Maintain formal tone without contractions (write "do not" instead of "don\'t").',
      'Include clear call-to-action in concluding paragraph.'
    ]
  },
  {
    id: 'VID-04',
    title: 'Social Science: Indian Nationalism & Timeline Map Pointing Mastery',
    subject: 'Social Science',
    channel: 'Green Valley History Society',
    duration: '21:10',
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=640&q=80',
    youtubeUrl: 'https://www.youtube.com/results?search_query=class+10+social+science+nationalism+in+india',
    keyPoints: [
      'Non-Cooperation Movement (1920-1922) and Chauri Chaura incident.',
      'Civil Disobedience Movement and Dandi March (1930).',
      'Crucial map locations: Champaran (Bihar), Kheda (Gujarat), Amritsar (Punjab).'
    ]
  }
];

export function StudentDashboard() {
  const navigate = useNavigate();
  const { students, announcements } = useSchool();
  const { currentUser, switchRole, logout } = useAuth();

  // Enforce light mode for Student Portal (Dark mode is preserved ONLY for Admin)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Primary student: Arun Kumar (STU-1001)
  const student = students.find(s => s.id === 'STU-1001') || students[0];

  // Active Bottom Nav Tab: 'home' | 'result' | 'attendance' | 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // Timetable day switcher Monday–Saturday
  const [selectedTimetableDay, setSelectedTimetableDay] = useState('Monday');
  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timetableKey = `${student.class}-${student.section}`;
  const classMatrix = initialTimetable[timetableKey] || initialTimetable['10th Standard-A'] || {};
  const currentDayClasses = classMatrix[selectedTimetableDay] || [];

  // Modals & Dialogs
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // Bottom Navigation Items: Home | Result | Attendance | Profile
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, onClick: () => setActiveTab('home') },
    { id: 'result', label: 'Result', icon: Award, onClick: () => setActiveTab('result') },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare, onClick: () => setActiveTab('attendance') },
    { id: 'profile', label: 'Profile', icon: User, onClick: () => setActiveTab('profile') }
  ];

  // Marks data
  const marksList = student.marks || [];
  const totalMaxMarks = marksList.reduce((acc, m) => acc + (m.maxMarks || 100), 0) || 500;
  const totalObtainedMarks = marksList.reduce((acc, m) => acc + (m.obtainedMarks || 0), 0) || 457;
  const percentage = Math.round((totalObtainedMarks / totalMaxMarks) * 1000) / 10;
  const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : percentage >= 35 ? 'C' : 'Fail';
  const rank = student.classroomRank || 3;

  // Monthly attendance trend
  const attendanceMonthlyTrend = [
    { month: 'Jun', percentage: 96 },
    { month: 'Jul', percentage: 92 },
    { month: 'Aug', percentage: 95 },
    { month: 'Sep', percentage: student.attendance || 94 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Dynamic Blur Topbar */}
      <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
            <School className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
                EduSphere
              </span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold border border-blue-500/20">
                Student
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 truncate hidden sm:block">
              Green Valley Matriculation • AY 2026–2027
            </p>
          </div>
        </div>

        {/* Top-Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Student Profile Quick Capsule */}
          <div
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 pl-2 sm:pl-3 cursor-pointer"
          >
            <Avatar src={student.avatar} name={student.name} size="sm" className="ring-2 ring-blue-500/40" />
            <div className="hidden sm:block text-left text-xs leading-tight">
              <span className="font-extrabold block text-slate-900">{student.name}</span>
              <span className="text-[10px] text-blue-600 font-bold">
                {student.class} - {student.section} • #{student.rollNo}
              </span>
            </div>
          </div>

          {/* Admin Switcher */}
          <button
            onClick={() => {
              switchRole('Super Admin');
              navigate('/admin');
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hidden md:block cursor-pointer hover:bg-indigo-100"
          >
            Admin View
          </button>

          {/* Logout Button with Confirmation */}
          <button
            onClick={() => setLogoutConfirmOpen(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Logout from Student Portal"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Main Student Portal Content Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto pb-36 sm:pb-40 animate-fade-in">
        {/* ================= TAB 1: HOME ================= */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Student Hero Header Banner */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <Avatar src={student.avatar} name={student.name} size="xl" className="ring-4 ring-white/20 shrink-0" />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-blue-200 mb-1 border border-white/10">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{student.house} House • Roll #{student.rollNo}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold">{student.name}</h1>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium">
                    {student.class} - Section {student.section} • Admission: {student.admissionNo}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10 self-start sm:self-auto">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center px-4">
                  <span className="text-[10px] uppercase tracking-wider text-blue-200 block font-bold">Attendance</span>
                  <span className="text-xl font-extrabold">{student.attendance}%</span>
                </div>
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center px-4">
                  <span className="text-[10px] uppercase tracking-wider text-blue-200 block font-bold">Class Rank</span>
                  <span className="text-xl font-extrabold text-amber-300">#{rank}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Exam + Countdown / Date Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-purple-500/10 dark:from-indigo-950/40 dark:via-blue-950/30 dark:to-purple-950/20 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Half-Yearly Examination 2026
                    </h3>
                    <Badge variant="warning" size="sm">
                      Starts in 18 Days
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Exam Period: 20 Oct 2026 – 31 Oct 2026 • Timings: 09:30 AM – 12:45 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 font-extrabold text-indigo-600 dark:text-indigo-400">
                  Day 1: Tamil Language
                </span>
                <button
                  onClick={() => setActiveTab('result')}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
                >
                  View Syllabus
                </button>
              </div>
            </div>

            {/* Today's & Weekly Timetable (Monday–Saturday) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Class Routine & Timetable (Monday–Saturday)
                  </h3>
                  <p className="text-xs text-slate-400">
                    {student.class} - Section {student.section}
                  </p>
                </div>
                <Badge variant="info" size="sm">
                  {currentDayClasses.length} Periods ({selectedTimetableDay})
                </Badge>
              </div>

              {/* Day Selector Monday to Saturday */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {daysList.map((day) => {
                  const isDayActive = selectedTimetableDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedTimetableDay(day)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        isDayActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Day Period Schedule */}
              <div className="space-y-2 pt-1">
                {currentDayClasses.map((slot) => (
                  <div
                    key={slot.period}
                    className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-xs hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-extrabold flex items-center justify-center text-xs shrink-0 border border-blue-200 dark:border-blue-800">
                        P{slot.period}
                      </span>
                      <div>
                        <span className="font-extrabold text-slate-900 dark:text-white block text-xs sm:text-sm">
                          {slot.subject}
                        </span>
                        <span className="text-[11px] text-slate-400">{slot.teacher}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-700 dark:text-slate-300 font-bold block">{slot.time}</span>
                      <span className="text-[10px] text-slate-400">{slot.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Tutorial / Learning Video Cards */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Recommended YouTube Learning Tutorials
                  </h3>
                  <p className="text-xs text-slate-400">
                    Curated video lessons & exam revisions for Class 10 CBSE & Matriculation
                  </p>
                </div>
                <Badge variant="info" size="sm">
                  4 Video Lessons
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tutorialVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/40 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-3">
                        <Badge variant="info" size="sm" className="bg-black/60 backdrop-blur-md text-white border-none font-bold">
                          {vid.subject}
                        </Badge>
                        <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                          {vid.duration}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-brand-600/90 group-hover:bg-brand-500 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300 backdrop-blur-xs">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-brand-600 transition-colors">
                        {vid.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span>{vid.channel}</span>
                        <span className="text-brand-600 font-bold flex items-center gap-1 group-hover:underline">
                          Watch Tutorial <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Announcements */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" />
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Important School Announcements
                  </h3>
                </div>
                <Badge variant="warning" size="sm">Notice Board</Badge>
              </div>

              <div className="space-y-3 text-xs">
                {(announcements || []).slice(0, 3).map((anc) => (
                  <div
                    key={anc.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1"
                  >
                    <div className="flex items-center justify-between font-extrabold text-slate-900 dark:text-white">
                      <span>{anc.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{formatDate(anc.date)}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">{anc.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: RESULT ================= */}
        {activeTab === 'result' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Examinations & Result Scorecard
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {student.name} • {student.class} - {student.section} • Roll #{student.rollNo}
                </p>
              </div>
              <Badge variant="success" size="md">
                Passed with Distinction
              </Badge>
            </div>

            {/* Scorecard Metrics Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                  Percentage
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {percentage}%
                </div>
                <span className="text-[11px] text-emerald-600 font-bold mt-1 block">A+ Distinction</span>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                  Grade
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {grade}
                </div>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">Quarterly Exam</span>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                  Classroom Rank
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 mt-1 flex items-center gap-1.5">
                  <Award className="w-6 h-6 shrink-0" />
                  <span>#{rank}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">Out of 42 Students</span>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                  Total Marks
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {totalObtainedMarks} / {totalMaxMarks}
                </div>
                <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Average: {percentage}</span>
              </div>
            </div>

            {/* Subject-wise Marks Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Subject-wise Marks Breakdown
                  </h3>
                  <p className="text-xs text-slate-400">Quarterly Examination 2026 Evaluation</p>
                </div>
                <Badge variant="info">6 Subjects</Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 font-extrabold text-slate-400 uppercase text-[10px]">
                      <th className="py-3 px-3">Subject</th>
                      <th className="py-3 px-3 text-center">Max Marks</th>
                      <th className="py-3 px-3 text-center">Obtained Marks</th>
                      <th className="py-3 px-3 text-center">Grade</th>
                      <th className="py-3 px-3 text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {marksList.map((m) => (
                      <tr key={m.subject} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-extrabold text-slate-900 dark:text-white">
                          {m.subject}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-400 font-medium">
                          {m.maxMarks || 100}
                        </td>
                        <td className="py-3 px-3 text-center font-extrabold text-sm text-slate-900 dark:text-white">
                          {m.obtainedMarks}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <Badge variant={m.grade === 'A+' ? 'success' : 'info'} size="sm">
                            {m.grade}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-right font-extrabold text-emerald-600">
                          Pass
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Details & Teacher Remarks */}
            <div className="p-5 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 text-xs space-y-2">
              <div className="flex items-center gap-2 font-extrabold text-blue-900 dark:text-blue-200 text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Class Teacher Evaluation Remarks</span>
              </div>
              <p className="text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
                &ldquo;Arun Kumar has demonstrated exemplary dedication and analytical prowess across all core disciplines. Mathematics marks (95/100) are among the highest in Section A. Continued focus on practical diagrams in Physics and Chemistry will ensure a perfect score in upcoming board examinations.&rdquo;
              </p>
              <div className="pt-2 text-[11px] text-blue-700 dark:text-blue-400 font-bold">
                — Mrs. Revathi Ramanathan (Class Teacher & HOD Mathematics)
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ATTENDANCE ================= */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Student Attendance Portal
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {student.name} • {student.class} - {student.section}
                </p>
              </div>
              <Badge variant="success" size="md">
                {student.attendance}% Overall Attendance
              </Badge>
            </div>

            {/* 2-Column Summary Cards: Overall %, Present, Absent, Leave */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                    Overall %
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {student.attendance}%
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Eligible for Exams
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block uppercase tracking-wider">
                    Present Days
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    {student.presentDays || 78}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium mt-1 block">Days Recorded</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-rose-600 dark:text-rose-400 font-bold block uppercase tracking-wider">
                    Absent Days
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
                    {student.absentDays || 4}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium mt-1 block">Medical/Unexcused</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-bold block uppercase tracking-wider">
                    Sanctioned Leave
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                    {student.leaveDays || 2}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium mt-1 block">Approved by Teacher</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Monthly Attendance Calendar / Table (Present Dates Green) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    September 2026 Daily Roll-Call Record
                  </h3>
                  <p className="text-xs text-slate-400">Green indicates present days.</p>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span>Present</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span>Leave</span>
                  </div>
                </div>
              </div>

              {/* 7 Column Calendar Grid */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <div key={d} className="py-1 font-extrabold text-slate-400 uppercase text-[10px]">
                    {d}
                  </div>
                ))}

                {Array.from({ length: 30 }, (_, i) => {
                  const dayNum = i + 1;
                  const isWeekend = (dayNum % 7 === 6) || (dayNum % 7 === 0);
                  const isAbsent = dayNum === 14;
                  const isLeave = dayNum === 23;

                  let styleClass = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-xs';
                  let status = 'Present';

                  if (isWeekend) {
                    styleClass = 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 border border-slate-200/50 dark:border-slate-800';
                    status = 'Off';
                  } else if (isAbsent) {
                    styleClass = 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800';
                    status = 'Absent';
                  } else if (isLeave) {
                    styleClass = 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800';
                    status = 'Leave';
                  }

                  return (
                    <div
                      key={i}
                      className={`py-2 rounded-2xl font-bold transition-all hover:scale-105 ${styleClass}`}
                    >
                      <span className="text-xs sm:text-sm block">{dayNum}</span>
                      <span className="block text-[8px] font-semibold mt-0.5 truncate">{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Percentage + Attendance Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Monthly Attendance Percentage Chart
                </h3>
                <Badge variant="success">Academic Year 2026–2027</Badge>
              </div>

              <div className="h-60 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceMonthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="studentAttendanceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis domain={[60, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} unit="%" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-2xl text-xs shadow-xl border border-slate-700">
                              <span className="font-bold">{payload[0].payload.month} 2026</span>
                              <div className="text-blue-400 font-extrabold text-sm mt-1">
                                {payload[0].value}% Attendance
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="percentage"
                      stroke="#2563eb"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#studentAttendanceGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: PROFILE ================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Student Profile & Official Record
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Enrolled under Green Valley Matriculation Higher Secondary School
                </p>
              </div>

              {/* Logout Button at Top-Right with Confirmation */}
              <button
                onClick={() => setLogoutConfirmOpen(true)}
                className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 rounded-2xl font-extrabold text-xs flex items-center gap-1.5 transition-all border border-rose-200 dark:border-rose-900 cursor-pointer shadow-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Profile Identification Hero Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                <Avatar
                  src={student.avatar}
                  name={student.name}
                  size="xl"
                  className="ring-4 ring-blue-500/20 shadow-md shrink-0"
                />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-extrabold text-xs border border-blue-200 dark:border-blue-800 mb-1.5">
                    <IdCard className="w-3.5 h-3.5" />
                    <span>Admission No: {student.admissionNo}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {student.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {student.class} • Section {student.section} • Roll #{student.rollNo}
                  </p>
                </div>
              </div>

              <Badge variant="success" size="lg" className="self-start sm:self-auto">
                Active Student
              </Badge>
            </div>

            {/* Detailed Biodata Grid (Photo, Name, DOB, Aadhaar, Phone, Class, Sec, Roll, AY) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Official Student Credentials & Demographic Data
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Full Name</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">{student.name}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Date of Birth (DOB)</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">{formatDate(student.dob || '2011-05-14')}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Aadhaar Number</span>
                  <span className="text-sm font-mono font-extrabold text-slate-900 dark:text-white block mt-0.5">{student.aadhaar || '7492 8193 4012'}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Contact Phone Number</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">{student.phone || '+91 98401 23456'}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Class & Section</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">{student.class} - {student.section}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Roll Number</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">#{student.rollNo}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Academic Year</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">2026–2027</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Assigned House</span>
                  <span className="text-sm font-extrabold text-emerald-600 block mt-0.5">{student.house} House</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Blood Group</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">{student.bloodGroup || 'B+'}</span>
                </div>
              </div>
            </div>

            {/* School Helpline Number Card with Call Action */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                  <PhoneCall className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-blue-200 font-bold block">
                    Green Valley School Helpline & Emergency Support
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold mt-0.5">
                    +91 44 2621 4500
                  </h3>
                  <p className="text-xs text-blue-100 font-medium">
                    helpdesk@greenvalleyschool.edu.in • Available Monday–Saturday, 8:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

              <a
                href="tel:+914426214500"
                className="px-6 py-2.5 bg-white hover:bg-blue-50 text-blue-700 rounded-2xl font-extrabold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto cursor-pointer"
              >
                Call Helpline
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Dynamic Linear Fade Blur */}
      <LinearFadeBlur />

      {/* iOS-Style Floating Glass/Liquid Pill Bottom Navbar */}
      <FloatingGlassNavbar
        items={navItems}
        activeId={activeTab}
        colorTheme="brand"
      />

      {/* YouTube Tutorial Video Player Modal */}
      <VideoPlayerModal
        isOpen={!!selectedVideo}
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={logoutConfirmOpen}
        title="Log Out of Student Portal?"
        message="Are you sure you want to log out of EduSphere Student Portal? You will return to the role selector login screen."
        confirmText="Yes, Log Out"
        cancelText="Cancel"
        variant="danger"
        onConfirm={() => {
          setLogoutConfirmOpen(false);
          logout();
          navigate('/login');
        }}
        onClose={() => setLogoutConfirmOpen(false)}
      />

      <Footer />
    </div>
  );
}
