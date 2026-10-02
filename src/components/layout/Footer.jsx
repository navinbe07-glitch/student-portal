import React from 'react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs py-6 px-4 sm:px-6 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span>EduSphere ERP</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 rounded font-semibold border border-brand-200 dark:border-brand-800">
              v2.6 Enterprise
            </span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span>Smart School Management System</span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span>© 2026 EduSphere ERP. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <a href="#privacy" onClick={e => e.preventDefault()} className="hover:text-brand-600 transition-colors">Privacy</a>
          <a href="#terms" onClick={e => e.preventDefault()} className="hover:text-brand-600 transition-colors">Terms</a>
          <a href="#support" onClick={e => e.preventDefault()} className="hover:text-brand-600 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
