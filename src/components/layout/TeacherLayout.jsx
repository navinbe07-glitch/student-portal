import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  FileSpreadsheet,
  BookOpen,
  Users,
  LogOut,
  School,
  MessageCircle,
  Sparkles,
  X,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Award,
  MapPin,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import { Avatar } from '../common/Avatar';
import { FloatingGlassNavbar, LinearFadeBlur } from './FloatingGlassNavbar';
import { Footer } from './Footer';

export function TeacherLayout() {
  const { currentUser, logout, switchRole } = useAuth();
  const { schoolName, academicYear, staff } = useSchool();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Full teacher profile details from unified central staff store
  const teacherDetails = (staff && staff.find(s => s.id === 'EMP-1002' || s.email === currentUser?.email)) || {
    id: 'EMP-1002',
    name: 'Mrs. Revathi Ramanathan',
    gender: 'Female',
    department: 'Secondary & Higher Secondary Academics',
    designation: 'PGT Mathematics & Class Teacher',
    qualification: 'M.Sc. (Mathematics), B.Ed.',
    joiningDate: '2018-04-15',
    phone: '+91 98412 23344',
    email: 'revathi.math@greenvalleyschool.edu.in',
    attendance: 96,
    status: 'Active (Full-Time)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    classesAssigned: ['10th Standard A', '10th Standard B', '12th Standard A'],
    classTeacherOf: '10th Standard - A',
    leaveBalance: 8,
    salary: '₹55,000 / month',
    address: 'Plot 7, VGP Layout, Thiruvanmiyur, Chennai - 600041',
    subjectsHandled: ['Mathematics', 'Higher Secondary Mathematics', 'Applied Algebra']
  };

  // Enforce Light Mode for Teacher Portal (Dark mode is preserved ONLY for Admin)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const navLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/teacher', id: '/teacher' },
    { label: 'Attendance', icon: CheckSquare, path: '/teacher/attendance', id: '/teacher/attendance' },
    { label: 'Marks', icon: FileSpreadsheet, path: '/teacher/marks', id: '/teacher/marks' },
    { label: 'Class Content', icon: BookOpen, path: '/teacher/content', id: '/teacher/content' },
    { label: 'Students', icon: Users, path: '/teacher/students', id: '/teacher/students' },
  ];

  // Active tab determination for mobile floating navbar
  const currentPath = location.pathname;
  let activeTab = '/teacher';
  if (currentPath.includes('/attendance')) activeTab = '/teacher/attendance';
  else if (currentPath.includes('/marks')) activeTab = '/teacher/marks';
  else if (currentPath.includes('/content') || currentPath.includes('/homework')) activeTab = '/teacher/content';
  else if (currentPath.includes('/students')) activeTab = '/teacher/students';

  // Mobile floating nav items with onClick
  const mobileNavItems = navLinks.map(link => ({
    ...link,
    onClick: () => navigate(link.path)
  }));

  // Teacher class WhatsApp group link
  const classWhatsAppUrl = 'https://chat.whatsapp.com/GreenValleyClass10A';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Topbar */}
      <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
            <School className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight flex items-center gap-1.5 text-slate-900">
              EduSphere <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">Faculty</span>
            </span>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate hidden sm:block">
              {schoolName} • AY {academicYear}
            </p>
          </div>
        </div>

        {/* Profile & Switcher */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-2xl hover:bg-slate-100/90 transition-all cursor-pointer group text-left border border-transparent hover:border-slate-200"
            title="Click to view full Teacher Profile"
          >
            <Avatar
              src={teacherDetails.avatar || currentUser?.avatar}
              name={teacherDetails.name || currentUser?.name}
              size="sm"
              className="ring-2 ring-emerald-500/50 group-hover:ring-emerald-600 transition-all shadow-xs"
            />
            <div className="hidden lg:block text-left text-xs leading-tight">
              <span className="font-extrabold block text-slate-800 group-hover:text-emerald-700 transition-colors">
                {teacherDetails.name || currentUser?.name}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold">
                {teacherDetails.classTeacherOf || '10-A Class Teacher'}
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              switchRole('Super Admin');
              navigate('/admin');
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hidden sm:block hover:bg-indigo-100 cursor-pointer"
            title="Switch to Admin Dashboard"
          >
            Admin View
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content with bottom padding */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-36 sm:pb-40 animate-fade-in">
        <Outlet />
      </main>

      {/* Fixed WhatsApp Group Communication Floating Button Strictly ABOVE Navbar */}
      <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-30 group">
        <a
          href={classWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs ring-2 ring-white/60 cursor-pointer"
          title="Open Class 10-A Parent/Student WhatsApp Group"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-200 rounded-full animate-ping" />
          </div>
          <span className="hidden sm:inline font-extrabold tracking-tight">
            Class WhatsApp Group
          </span>
        </a>
      </div>

      {/* iOS Progressive Linear Fade Blur */}
      <LinearFadeBlur />

      {/* Mobile-First Floating Glass Navbar (Fixed, Active Pill: Icon + Name, Inactive: Icon Only) */}
      <FloatingGlassNavbar
        items={mobileNavItems}
        activeId={activeTab}
        colorTheme="emerald"
      />

      {/* Comprehensive Teacher Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-scale-in">
            {/* Modal Header Banner */}
            <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-5 sm:p-6 text-white">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <Avatar
                    src={teacherDetails.avatar || currentUser?.avatar}
                    name={teacherDetails.name}
                    size="xl"
                    className="ring-4 ring-white/40 shadow-lg"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-white" title="Active Faculty" />
                </div>
                <div className="min-w-0 pr-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-[11px] font-bold tracking-wide uppercase mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{teacherDetails.id || 'EMP-1002'} • {teacherDetails.status || 'Active'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight truncate">
                    {teacherDetails.name}
                  </h3>
                  <p className="text-xs text-emerald-100 font-semibold mt-0.5 truncate">
                    {teacherDetails.designation || 'PGT Mathematics & Class Teacher'}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[72vh] overflow-y-auto">
              {/* Duty & Qualifications Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Education / Qualification</span>
                    <span className="font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                      {teacherDetails.qualification || 'M.Sc. (Mathematics), B.Ed.'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Class Teacher Duty</span>
                    <span className="font-extrabold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                      <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                      {teacherDetails.classTeacherOf || '10th Standard - A'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2.5 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Department</span>
                    <span className="font-bold text-slate-700 flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                      {teacherDetails.department || 'Secondary Academics'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Joining Date</span>
                    <span className="font-bold text-slate-700 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      {teacherDetails.joiningDate ? new Date(teacherDetails.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '15 Apr 2018'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subjects & Classes Handled */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1.5">
                    Subjects Handled
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(teacherDetails.subjectsHandled || ['Mathematics', 'Higher Secondary Mathematics', 'Applied Algebra']).map((sub, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs shadow-2xs">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1.5">
                    Classes Handled
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(teacherDetails.classesAssigned || ['10th Standard A', '10th Standard B', '12th Standard A']).map((cls, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Salary & Attendance Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-3 text-center">
                  <span className="text-[10px] font-bold text-emerald-800 block uppercase tracking-wider">Monthly Salary</span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-700 block mt-0.5">
                    {teacherDetails.salary || '₹55,000 / mo'}
                  </span>
                </div>
                <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-3 text-center">
                  <span className="text-[10px] font-bold text-blue-800 block uppercase tracking-wider">Attendance</span>
                  <span className="text-xs sm:text-sm font-extrabold text-blue-700 block mt-0.5">
                    {teacherDetails.attendance || 96}%
                  </span>
                </div>
                <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-3 text-center">
                  <span className="text-[10px] font-bold text-purple-800 block uppercase tracking-wider">Leave Balance</span>
                  <span className="text-xs sm:text-sm font-extrabold text-purple-700 block mt-0.5">
                    {teacherDetails.leaveBalance ?? 8} Days
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-2 text-xs">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Contact & Address Details</span>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold">{teacherDetails.phone || '+91 98412 23344'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold truncate">{teacherDetails.email || 'revathi.math@greenvalleyschool.edu.in'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700 pt-1.5 border-t border-slate-200/60">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-600">{teacherDetails.address || 'Plot 7, VGP Layout, Thiruvanmiyur, Chennai - 600041'}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="px-5 py-2 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
