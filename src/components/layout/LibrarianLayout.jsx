import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Library,
  BookOpen,
  BookMarked,
  Layers,
  LogOut,
  School,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import { Avatar } from '../common/Avatar';
import { FloatingGlassNavbar, LinearFadeBlur } from './FloatingGlassNavbar';
import { Footer } from './Footer';

export function LibrarianLayout() {
  const { currentUser, logout, switchRole } = useAuth();
  const { schoolName, academicYear } = useSchool();
  const navigate = useNavigate();
  const location = useLocation();

  // Enforce Light Mode (Dark mode preserved ONLY for Admin)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const navLinks = [
    { label: 'Catalog & Books', icon: BookOpen, path: '/librarian', id: '/librarian' },
    { label: 'Issue & Return', icon: BookMarked, path: '/librarian#circulation', id: '/librarian#circulation' },
    { label: 'Stock & Inventory', icon: Layers, path: '/librarian#inventory', id: '/librarian#inventory' },
  ];

  // Active tab determination
  const currentPath = location.pathname + location.hash;
  let activeTab = '/librarian';
  if (currentPath.includes('#circulation')) activeTab = '/librarian#circulation';
  else if (currentPath.includes('#inventory')) activeTab = '/librarian#inventory';

  const mobileNavItems = navLinks.map(link => ({
    ...link,
    onClick: () => {
      if (link.path.includes('#')) {
        window.location.hash = link.path.split('#')[1];
      } else {
        navigate(link.path);
      }
    }
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Topbar */}
      <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/25">
            <Library className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight flex items-center gap-1.5 text-slate-900">
              EduSphere <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 font-bold border border-cyan-200">Librarian</span>
            </span>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate hidden sm:block">
              {schoolName} • Resource Center
            </p>
          </div>
        </div>

        {/* Profile & Switcher */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 pl-2">
            <Avatar src={currentUser?.avatar} name={currentUser?.name} size="sm" className="ring-2 ring-cyan-500/40" />
            <div className="hidden lg:block text-left text-xs leading-tight">
              <span className="font-extrabold block text-slate-800">{currentUser?.name}</span>
              <span className="text-[10px] text-cyan-700 font-bold">Chief Librarian</span>
            </div>
          </div>

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

      {/* Main Content Viewport with pb-36 padding */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-36 sm:pb-40 animate-fade-in">
        <Outlet />
      </main>

      {/* iOS Progressive Linear Fade Blur */}
      <LinearFadeBlur />

      {/* Mobile-First Floating Glass Navbar */}
      <FloatingGlassNavbar
        items={mobileNavItems}
        activeId={activeTab}
        colorTheme="brand"
      />

      <Footer />
    </div>
  );
}
