import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  CalendarDays,
  CheckSquare,
  CreditCard,
  FileSpreadsheet,
  BookOpen,
  Library,
  Bus,
  Package,
  MessageSquare,
  BarChart3,
  Award,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  School
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Avatar } from '../common/Avatar';

const adminNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Students', icon: Users, path: '/admin/students', badge: '1,248' },
  { label: 'Staff', icon: UserCheck, path: '/admin/staff' },
  { label: 'Academics', icon: GraduationCap, path: '/admin/academics' },
  { label: 'Timetable', icon: CalendarDays, path: '/admin/timetable' },
  { label: 'Attendance', icon: CheckSquare, path: '/admin/attendance' },
  { label: 'Fees', icon: CreditCard, path: '/admin/fees', badge: 'Due' },
  { label: 'Exams', icon: FileSpreadsheet, path: '/admin/exams' },
  { label: 'Homework', icon: BookOpen, path: '/admin/homework' },
  { label: 'Library', icon: Library, path: '/admin/library' },
  { label: 'Transport', icon: Bus, path: '/admin/transport' },
  { label: 'Inventory', icon: Package, path: '/admin/inventory' },
  { label: 'Communication', icon: MessageSquare, path: '/admin/communication' },
  { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
  { label: 'Certificates', icon: Award, path: '/admin/certificates' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export function Sidebar({ isOpen, onClose }) {
  const { currentUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/25 shrink-0">
            <School className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>EduSphere</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold border border-brand-200 dark:border-brand-800">ERP</span>
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Smart School Management
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            School Management Suite
          </div>

          {adminNavItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 bg-slate-50/50 dark:bg-slate-900/60">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">
              {isDark ? 'Dark' : 'Light'}
            </span>
          </button>

          {/* User profile & Switcher */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2 px-1">
            <div
              onClick={() => navigate('/admin/settings')}
              className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer hover:opacity-85"
            >
              <Avatar src={currentUser?.avatar} name={currentUser?.name} size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {currentUser?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                  {currentUser?.role || 'Super Admin'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
