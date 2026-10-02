import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Lock, Mail, ArrowRight, Shield, User, BookOpen, Users, DollarSign, Library, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function LoginPage() {
  const { loginAs } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Enforce light mode on login page (Dark mode is preserved ONLY for Admin)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const [email, setEmail] = useState('admin@greenvalleyschool.edu.in');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleStandardLogin = (e) => {
    e.preventDefault();
    const user = loginAs('Super Admin');
    showToast(`Welcome back, ${user.name}!`, 'success');
    navigate('/admin');
  };

  const handleQuickDemoLogin = (roleType, redirectPath) => {
    const user = loginAs(roleType);
    showToast(`Logged in as ${user.name} (${user.role})`, 'success');
    navigate(redirectPath);
  };

  const demoRoles = [
    { role: 'Super Admin', label: 'Admin Demo', path: '/admin', subtitle: 'Universal ERP Access', icon: Shield, color: 'indigo' },
    { role: 'Teacher', label: 'Teacher Demo', path: '/teacher', subtitle: 'Mrs. Revathi (10-A)', icon: User, color: 'emerald' },
    { role: 'Parent', label: 'Parent Demo', path: '/parent', subtitle: 'Mr. Ramesh (2 Kids)', icon: Users, color: 'amber' },
    { role: 'Student', label: 'Student Demo', path: '/student', subtitle: 'Arun Kumar (10-A)', icon: BookOpen, color: 'blue' },
    { role: 'Accountant', label: 'Accountant Demo', path: '/accountant', subtitle: 'Mr. Sundaresan (Bursar)', icon: DollarSign, color: 'purple' },
    { role: 'Librarian', label: 'Librarian Demo', path: '/librarian', subtitle: 'Mrs. Shakuntala Devi', icon: Library, color: 'cyan' },
    { role: 'Office Staff', label: 'Office Staff Demo', path: '/office', subtitle: 'Mr. Parthasarathy (Admissions)', icon: FileText, color: 'rose' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-xl space-y-6 animate-fade-in">
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-brand-700 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/25">
            <School className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <span>EduSphere ERP</span>
            <span className="text-xs px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold border border-brand-200">2026–27</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Green Valley Matriculation Higher Secondary School
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-5">
          <form onSubmit={handleStandardLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                School Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@greenvalleyschool.edu.in"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={e => {
                  e.preventDefault();
                  alert('Demo password reset link has been dispatched to school administrator.');
                }}
                className="text-brand-600 font-semibold hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-500/25 hover:shadow-brand-500/40 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              One-Click Demo Portals
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Quick Demo Role Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {demoRoles.map(dr => {
              const Icon = dr.icon;
              return (
                <button
                  key={dr.role}
                  type="button"
                  onClick={() => handleQuickDemoLogin(dr.role, dr.path)}
                  className={`p-2.5 rounded-xl border bg-slate-50/80 hover:bg-white text-left transition-all group hover:shadow-md cursor-pointer border-slate-200 hover:border-brand-300`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900 group-hover:text-brand-600 transition-colors">
                    <Icon className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">{dr.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 truncate font-medium">
                    {dr.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Credentials Footer */}
        <div className="p-4 bg-slate-100/90 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1 text-center shadow-xs">
          <p className="font-bold text-slate-800">
            Green Valley Matriculation School • ERP Sandbox Credentials
          </p>
          <p>Super Admin: <code className="text-slate-800 font-mono font-semibold">admin@greenvalleyschool.edu.in</code></p>
          <p>Accountant: <code className="text-slate-800 font-mono font-semibold">accounts@greenvalleyschool.edu.in</code> • Librarian: <code className="text-slate-800 font-mono font-semibold">library@greenvalleyschool.edu.in</code></p>
        </div>
      </div>
    </div>
  );
}
