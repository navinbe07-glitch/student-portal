import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-800 dark:text-slate-200">
      <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 shadow-md">
        <School className="w-8 h-8" />
      </div>
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
        404
      </h1>
      <h2 className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300 mb-3">
        Page Not Found
      </h2>
      <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
        The page you are looking for might have been moved or does not exist in EduSphere ERP.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
        <button
          onClick={() => navigate('/admin')}
          className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl flex items-center gap-2 transition-all shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
