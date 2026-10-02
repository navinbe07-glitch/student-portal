import React, { useState } from 'react';
import {
  Settings,
  School,
  Calendar,
  Layers,
  DollarSign,
  Award,
  Users,
  Shield,
  Palette,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useToast } from '../../context/ToastContext';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

export function SettingsPage() {
  const { schoolName, academicYear, resetAllDemoData } = useSchool();
  const { showToast } = useToast();

  const [activeSection, setActiveSection] = useState('branding'); // 'branding' | 'academic' | 'fees' | 'reset'
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Branding Form State
  const [name, setName] = useState(schoolName);
  const [affiliationCode, setAffiliationCode] = useState('TN-MS-4029 (Govt. of Tamil Nadu)');
  const [phone, setPhone] = useState('+91 44 2621 8899');
  const [email, setEmail] = useState('admin@greenvalleyschool.edu.in');
  const [website, setWebsite] = useState('https://greenvalleyschool.edu.in');
  const [address, setAddress] = useState('Plot No. 42, Anna Nagar 2nd Avenue, Chennai, Tamil Nadu - 600040');
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');

  const handleSaveBranding = (e) => {
    e.preventDefault();
    showToast('School profile and branding settings saved successfully.', 'success');
  };

  const handleConfirmReset = () => {
    resetAllDemoData();
  };

  const sections = [
    { id: 'branding', label: 'School Profile & Branding', icon: School },
    { id: 'academic', label: 'Academic Year & Sessions', icon: Calendar },
    { id: 'fees', label: 'Fee Structure Rules', icon: DollarSign },
    { id: 'reset', label: 'Demo Data & System Reset', icon: RotateCcw }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Settings & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Institution branding, academic calendar control, fee rules, and demo data state
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-2 shadow-card space-y-1">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-card">
          {/* 1. School Branding */}
          {activeSection === 'branding' && (
            <form onSubmit={handleSaveBranding} className="space-y-5 animate-fade-in text-xs sm:text-sm">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  School Profile & Branding
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Appears on official fee receipts, report cards, ID cards, and circular headers
                </p>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  School Legal Entity Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Affiliation / Recognition Code
                  </label>
                  <input
                    type="text"
                    value={affiliationCode}
                    onChange={e => setAffiliationCode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Official Contact Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Official Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Registered Campus Address
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Primary Brand Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                  />
                  <span className="font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
                    {primaryColor}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. Academic Year */}
          {activeSection === 'academic' && (
            <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Academic Session Configurations
              </h3>
              <p className="text-xs text-slate-500">
                Configure start and end periods for academic terms and examinations
              </p>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Active Session: 2026–2027</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">Current</span>
                </div>
                <p className="text-xs text-slate-500">Session Span: 01 June 2026 to 30 April 2027</p>
              </div>
            </div>
          )}

          {/* 3. Fee Rules */}
          {activeSection === 'fees' && (
            <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Fee Structure Schedules
              </h3>
              <p className="text-xs text-slate-500">Default tuition and auxiliary fee rules for 2026–2027</p>

              <div className="space-y-2">
                {[
                  { grade: 'Primary (1st to 5th)', tuition: '₹35,000 / year', bus: '₹12,000 / year' },
                  { grade: 'Middle (6th to 8th)', tuition: '₹40,000 / year', bus: '₹12,000 / year' },
                  { grade: 'Secondary (9th & 10th)', tuition: '₹45,000 / year', bus: '₹14,000 / year' },
                  { grade: 'Higher Sec (11th & 12th)', tuition: '₹52,000 / year', bus: '₹14,000 / year' }
                ].map(r => (
                  <div key={r.grade} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{r.grade}</span>
                    <span className="text-xs text-slate-500">Tuition: {r.tuition} • Transport: {r.bus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Reset Demo Data (Required by Section 32) */}
          {activeSection === 'reset' && (
            <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-rose-600" />
                  <span>Demo Data State Management</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clear local mutations and restore initial prototype realistic data
                </p>
              </div>

              <div className="p-5 bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Reset Demo Data & LocalStorage</span>
                </div>
                <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
                  Clicking this will reset all demo changes (added students, fee payments recorded, attendance marks, homework, and announcements) back to the clean baseline state with Arun Kumar having ₹5,000 pending fee and 94% attendance.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setResetDialogOpen(true)}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Demo Data to Default</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset Demo Data?"
        message="Are you sure you want to reset all mock records back to the initial demo state? Any students added or fees collected during this browser session will be restored."
        confirmText="Yes, Reset Everything"
        danger={true}
      />
    </div>
  );
}
