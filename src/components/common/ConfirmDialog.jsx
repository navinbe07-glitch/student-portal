import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      title={
        <div className="flex items-center gap-2 text-base">
          {danger && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
          <span>{title}</span>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold text-white rounded-xl shadow-sm transition-all ${
              danger
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-brand-600 hover:bg-brand-700'
            }`}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {message}
      </p>
    </Modal>
  );
}
