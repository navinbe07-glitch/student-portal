import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
  footer
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full ${maxWidth} transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 text-left shadow-2xl transition-all animate-fade-in`}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="py-4 max-h-[72vh] overflow-y-auto pr-1">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
