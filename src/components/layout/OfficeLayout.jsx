import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  FileText,
  UserPlus,
  CalendarCheck,
  Award,
  LogOut,
  School,
  Menu,
  X,
  FileCheck2,
  IdCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import { Avatar } from '../common/Avatar';
import { Footer } from './Footer';

export function OfficeLayout() {
  const { currentUser, logout, switchRole } = useAuth();
  const { schoolName, academicYear } = useSchool();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Enforce Light Mode (Dark mode preserved ONLY for Admin)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const navLinks = [
    { label: 'Admissions & Registry', icon: UserPlus, hash: '' },
    { label: 'Exam Master Setup', icon: CalendarCheck, hash: '#exams' },
    { label: 'Parent Leave Notes', icon: FileCheck2, hash: '#leave' },
    { label: 'Certificate Studio', icon: Award, hash: '#certificates' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      {/* Desktop Sidebar (Prioritized for Office Staff) */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-200 shadow-xs fixed inset-y-0 z-30">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-700 text-white flex items-center justify-center shadow-md shadow-rose-500/25 shrink-0">
            <School className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-slate-900 leading-tight">
              EduSphere ERP
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 font-bold border border-rose-200">
              Office Administration
            </span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <div className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 py-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Administrative Modules
          </p>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={`/office${link.hash}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-700 hover:bg-rose-50/70 transition-all cursor-pointer"
              >
                <Icon className="w-4 h-4 text-rose-600" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Profile Card & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar src={currentUser?.avatar} name={currentUser?.name} size="md" className="ring-2 ring-rose-500/40" />
            <div className="min-w-0">
              <span className="font-extrabold text-xs text-slate-900 block truncate">
                {currentUser?.name}
              </span>
              <span className="text-[10px] text-rose-700 font-bold block truncate">
                Senior Office Staff
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                switchRole('Super Admin');
                navigate('/admin');
              }}
              className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-center cursor-pointer"
            >
              Admin View
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
              {schoolName} • Office & Admissions Directorate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 font-bold text-slate-700">
              AY {academicYear}
            </span>
          </div>
        </header>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex">
            <div className="w-64 bg-white p-5 space-y-4 shadow-2xl flex flex-col h-full animate-slide-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-extrabold text-sm text-slate-900">Office Desk</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 flex-1">
                {navLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={`/office${link.hash}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                    >
                      <Icon className="w-4 h-4 text-rose-600" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full py-2 bg-rose-50 text-rose-600 font-bold rounded-xl text-xs hover:bg-rose-100 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in space-y-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
