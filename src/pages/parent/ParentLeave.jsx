import React, { useState } from 'react';
import { FileText, Send, Calendar, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function ParentLeave() {
  const { showToast } = useToast();
  const [fromDate, setFromDate] = useState('2026-09-25');
  const [toDate, setToDate] = useState('2026-09-26');
  const [reason, setReason] = useState('Family medical appointment and routine health checkup.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Leave request submitted to Class Teacher Mrs. Revathi Ramanathan.', 'success');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Submit Student Leave Application
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Directly notifies 10th Standard A Class Teacher (Mrs. Revathi Ramanathan)
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card">
        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Leave Request Submitted</h3>
            <p className="text-xs text-slate-500">
              Your leave notice from {fromDate} to {toDate} has been recorded in the attendance portal.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">From Date *</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">To Date *</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason for Absence *</label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={e => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Leave Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
