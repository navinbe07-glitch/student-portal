import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  School,
  ArrowRight,
  CheckCircle2,
  Users,
  CheckSquare,
  CreditCard,
  FileSpreadsheet,
  Smartphone,
  BarChart3,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Student Management',
      desc: 'Complete 360° student lifecycle from multi-step digital admission to comprehensive academic profiles and documents.'
    },
    {
      icon: CheckSquare,
      title: 'Smart Attendance',
      desc: 'One-click daily roll calls, real-time SMS/app notification alerts for absent students, and automated monthly analytics.'
    },
    {
      icon: CreditCard,
      title: 'Fee Management',
      desc: 'End-to-end fee desk with UPI, card, and cash tracking, auto receipts in words, installment dues, and instant SMS reminders.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Examination & Marks',
      desc: 'Effortless exam scheduling, automated grade calculation (A+ to F), cumulative marksheets, and official printable report cards.'
    },
    {
      icon: Smartphone,
      title: 'Parent & Student Portal',
      desc: 'Mobile-first progressive experience allowing parents to track real-time attendance, homework deadlines, timetable, and pay fees.'
    },
    {
      icon: BarChart3,
      title: 'Reports & Analytics',
      desc: 'Executive KPIs, attendance trends, fee collection forecasts, and one-click PDF/Excel data export for administrative audits.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Landing Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/25">
              <School className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight flex items-center gap-1.5 text-slate-900 dark:text-white">
                EduSphere <span className="text-xs px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-800">ERP</span>
              </span>
              <p className="text-[10px] text-slate-500 truncate hidden sm:block">
                Smart School Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <span>View Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Built for Modern Indian Matriculation & CBSE Schools</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Smart School Management, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Simplified.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            One powerful platform for administrators, teachers, students and parents. Real-time fee receipts, smart attendance, exam grading, and mobile portals.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-2xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all"
            >
              Explore Demo Portals
            </button>
          </div>

          {/* Quick Demo School Badge */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <School className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Interactive Demo: <strong className="text-slate-800 dark:text-slate-200">Green Valley Matriculation Higher Secondary School (2026–2027)</strong></span>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Comprehensive School Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Engineered to replace fragmented paperwork and outdated software with a cohesive SaaS ERP experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Built for Modern Schools Section */}
      <section className="py-14 px-4 sm:px-8 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Reliability</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Built for Modern Indian Educational Institutions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Designed from the ground up to support Indian matriculation, CBSE, and ICSE school workflows. From Tamil and English dual language support to Indian currency formatting (₹), Bonafide certificates, and Section 80C fee receipts.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero latency role switching for Administrators, Teachers, and Parents</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Responsive table cards optimized for mobile screens without horizontal spill</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant PDF print layouts for fees, report cards, ID badges, and transfer certificates</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:opacity-90 transition-all flex items-center gap-2"
              >
                <span>Launch Interactive Demo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-xs text-slate-500 uppercase">Live System Overview</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                System Active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-slate-400 block">Total Students</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">1,248</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-slate-400 block">Teaching Staff</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">86</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-slate-400 block">Present Today</span>
                <span className="text-xl font-bold text-emerald-600">1,136</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-slate-400 block">Fees Collected</span>
                <span className="text-xl font-bold text-indigo-600">₹18.4 L</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
