import React from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No data available',
  description = 'There are no items to show at the moment.',
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto">
      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4 text-slate-400 dark:text-slate-500">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all hover:shadow-md"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
