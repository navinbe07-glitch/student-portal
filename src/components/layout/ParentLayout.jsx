import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  CreditCard,
  GraduationCap,
  School,
  LogOut,
  ChevronDown,
  Globe,
  MessageCircle,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import { useParentLanguage } from '../../context/ParentLanguageContext';
import { Avatar } from '../common/Avatar';
import { FloatingGlassNavbar, LinearFadeBlur } from './FloatingGlassNavbar';
import { Footer } from './Footer';

export function ParentLayout() {
  const { currentUser, logout, switchRole } = useAuth();
  const { schoolName, selectedChild, setSelectedChildId, parentChildren } = useSchool();
  const { lang, toggleLang, t } = useParentLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Enforce Light Mode for Parent Portal (Dark Mode is preserved ONLY for Admin)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const [childDropdownOpen, setChildDropdownOpen] = useState(false);

  // Bottom navigation items: Home | Attendance | Fees | Academic
  const navItems = [
    { id: '/parent', label: t('navHome', 'Home'), icon: Home, onClick: () => navigate('/parent') },
    { id: '/parent/attendance', label: t('navAttendance', 'Attendance'), icon: CheckSquare, onClick: () => navigate('/parent/attendance') },
    { id: '/parent/fees', label: t('navFees', 'Fees'), icon: CreditCard, onClick: () => navigate('/parent/fees'), badge: selectedChild?.pendingFee > 0 },
    { id: '/parent/academic', label: t('navAcademic', 'Academic'), icon: GraduationCap, onClick: () => navigate('/parent/academic') }
  ];

  // Active tab determination
  const currentPath = location.pathname;
  let activeTab = '/parent';
  if (currentPath.includes('/attendance')) activeTab = '/parent/attendance';
  else if (currentPath.includes('/fees')) activeTab = '/parent/fees';
  else if (currentPath.includes('/academic') || currentPath.includes('/marks')) activeTab = '/parent/academic';

  // Configured WhatsApp group URL for active child
  const whatsappUrl = selectedChild?.whatsappGroupUrl || 'https://chat.whatsapp.com/GreenValleyParents';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Dynamic Blur Sticky Header */}
      <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 px-3 sm:px-8 flex items-center justify-between gap-3 shadow-xs">
        {/* Brand & Portal Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
            <School className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                EduSphere
              </span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 font-bold border border-amber-500/20">
                {t('portalTitle', 'Parent Portal')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate hidden sm:block">
              {schoolName}
            </p>
          </div>
        </div>

        {/* Profile Area & Multiple Children Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Child Switcher Component */}
          <div className="relative">
            <button
              onClick={() => setChildDropdownOpen(!childDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/70 transition-all text-left shadow-xs cursor-pointer"
              title={t('switchChild', 'Switch Child')}
            >
              <Avatar
                src={selectedChild?.avatar}
                name={selectedChild?.name || 'Child'}
                size="sm"
                className="ring-2 ring-amber-500/40"
              />
              <div className="hidden md:block text-xs leading-tight pr-1">
                <span className="font-extrabold text-slate-900 block truncate max-w-[130px]">
                  {selectedChild?.name}
                </span>
                <span className="text-[10px] text-amber-700 font-semibold block">
                  {selectedChild?.class} • {t('section', 'Sec')} {selectedChild?.section} • #{selectedChild?.rollNo}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${childDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu for Child Switcher */}
            {childDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setChildDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200 shadow-2xl p-2.5 z-50 animate-scale-in">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('switchChild', 'Switch Child')} ({parentChildren.length})
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                      Parent: {currentUser?.name || 'Ramesh Kumar'}
                    </span>
                  </div>

                  <div className="mt-1 space-y-1">
                    {parentChildren.map((ch) => {
                      const isSelected = ch.id === selectedChild?.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => {
                            setSelectedChildId(ch.id);
                            setChildDropdownOpen(false);
                          }}
                          className={`w-full p-2.5 rounded-2xl flex items-center justify-between gap-3 transition-all text-left cursor-pointer ${
                            isSelected
                              ? 'bg-amber-50 border border-amber-200'
                              : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={ch.avatar}
                              name={ch.name}
                              size="md"
                              className={isSelected ? 'ring-2 ring-amber-500' : ''}
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                                  {ch.name}
                                </span>
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                {ch.class} • {t('section', 'Sec')} {ch.section} • {t('rollNo', 'Roll')} #{ch.rollNo}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                                <span className="text-emerald-600 font-bold">{ch.attendance}% {t('navAttendance', 'Attendance')}</span>
                                {ch.pendingFee > 0 ? (
                                  <span className="text-amber-700 font-bold">₹{ch.pendingFee.toLocaleString('en-IN')} {t('pendingOutstanding', 'Due')}</span>
                                ) : (
                                  <span className="text-emerald-600 font-bold">Paid</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Language Switcher: English <-> Tamil */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/60 text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Switch Language / மொழியை மாற்றவும்"
          >
            <Globe className="w-4 h-4 text-amber-600" />
            <span className="font-extrabold text-[11px] sm:text-xs text-slate-700">
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </span>
          </button>

          {/* Admin Switcher */}
          <button
            onClick={() => {
              switchRole('Super Admin');
              navigate('/admin');
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hidden lg:block cursor-pointer hover:bg-indigo-100"
          >
            {t('adminView', 'Admin View')}
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title={t('logout', 'Logout')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Viewport Content with bottom padding to ensure zero cutoff */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto pb-36 sm:pb-40 animate-fade-in">
        <Outlet />
      </main>

      {/* Floating Class WhatsApp Button Fixed ABOVE Navbar */}
      <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-30 group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs ring-2 ring-white/60 cursor-pointer"
          title={t('whatsappTooltip', 'Join official class parents WhatsApp group')}
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-200 rounded-full animate-ping" />
          </div>
          <span className="hidden sm:inline font-extrabold tracking-tight">
            {t('classGroupWhatsApp', 'Class WhatsApp Group')}
          </span>
        </a>
      </div>

      {/* iOS Linear Fade Progressive Blur */}
      <LinearFadeBlur />

      {/* iOS-Style Floating Glass/Liquid Pill Bottom Navbar */}
      <FloatingGlassNavbar
        items={navItems}
        activeId={activeTab}
        colorTheme="amber"
      />

      <Footer />
    </div>
  );
}
