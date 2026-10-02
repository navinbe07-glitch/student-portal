import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  CheckCircle2,
  Calendar,
  School,
  ChevronDown,
  UserCheck,
  LogOut,
  ExternalLink,
  Check,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export function Topbar({ onMenuClick, onSearchClick }) {
  const { currentUser, switchRole, logout } = useAuth();
  const { schoolName, academicYear } = useSchool();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (roleName) => {
    const user = switchRole(roleName);
    setProfileOpen(false);
    if (user.roleKey === 'admin') navigate('/admin');
    else if (user.roleKey === 'teacher') navigate('/teacher');
    else if (user.roleKey === 'parent') navigate('/parent');
    else if (user.roleKey === 'student') navigate('/student');
    else if (user.roleKey === 'accountant') navigate('/accountant');
    else if (user.roleKey === 'librarian') navigate('/librarian');
    else if (user.roleKey === 'office') navigate('/office');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left section: mobile hamburger & School indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium">
            <School className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span className="truncate max-w-[200px] lg:max-w-xs">{schoolName}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-800/50">
            <Calendar className="w-3.5 h-3.5" />
            <span>AY {academicYear}</span>
          </div>
        </div>
      </div>

      {/* Middle: Global Search Pill */}
      <button
        onClick={onSearchClick}
        className="flex-1 max-w-md mx-2 hidden md:flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-xl transition-all cursor-pointer shadow-inner"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <span>Search students, teachers, classes, fees, books...</span>
        </div>
        <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs text-slate-500">
          Ctrl + K
        </kbd>
      </button>

      {/* Right section: ONLY Search and Profile */}
      <div className="flex items-center gap-2">
        {/* Mobile search icon */}
        <button
          onClick={onSearchClick}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden cursor-pointer"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* User Role Switcher Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Avatar src={currentUser?.avatar} name={currentUser?.name} size="sm" />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[120px]">
                {currentUser?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-slate-400 font-medium leading-tight">
                {currentUser?.role || 'Super Admin'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 ml-0.5" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-fade-in p-2">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Signed in as
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
                  {currentUser?.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Badge variant="info" size="sm">
                    {currentUser?.role}
                  </Badge>
                  <span className="text-[11px] text-slate-400 truncate">
                    {currentUser?.email}
                  </span>
                </div>
              </div>

              {/* Instant Role Switcher Section */}
              <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Switch Demo Role</span>
                <SlidersHorizontal className="w-3 h-3" />
              </div>

              <div className="space-y-0.5 my-1">
                {[
                  { role: 'Super Admin', label: 'Super Admin (Principal)', key: 'admin' },
                  { role: 'Teacher', label: 'Teacher (Revathi - 10A)', key: 'teacher' },
                  { role: 'Parent', label: 'Parent (Ramesh - 2 Kids)', key: 'parent' },
                  { role: 'Student', label: 'Student (Arun Kumar 10A)', key: 'student' },
                  { role: 'Accountant', label: 'Accountant (Sundaresan)', key: 'accountant' },
                  { role: 'Librarian', label: 'Librarian (Shakuntala)', key: 'librarian' },
                  { role: 'Office Staff', label: 'Office Staff (Parthasarathy)', key: 'office' },
                ].map(r => (
                  <button
                    key={r.role}
                    onClick={() => handleRoleSelect(r.role)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      currentUser?.role === r.role
                        ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{r.label}</span>
                    {currentUser?.role === r.role && <Check className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
