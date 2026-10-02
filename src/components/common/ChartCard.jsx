import React from 'react';

export function ChartCard({
  title,
  subtitle,
  children,
  action,
  className = ''
}) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card transition-all duration-300 flex flex-col ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {action}
          </div>
        )}
      </div>
      <div className="w-full flex-1 min-h-[260px]">
        {children}
      </div>
    </div>
  );
}
