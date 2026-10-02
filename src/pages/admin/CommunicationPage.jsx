import React, { useState } from 'react';
import {
  Megaphone,
  Bell,
  Mail,
  FileText,
  Plus,
  Send,
  Calendar,
  Users,
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { formatDate } from '../../utils/formatters';

export function CommunicationPage() {
  const { announcements, notifications, addAnnouncement, markNotificationAsRead } = useSchool();

  const [activeTab, setActiveTab] = useState('announcements'); // 'announcements' | 'notifications' | 'circulars'
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New Announcement Form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('All School');
  const [targetClass, setTargetClass] = useState('All Classes');
  const [priority, setPriority] = useState('Normal');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title,
      content,
      targetAudience,
      targetClass,
      priority,
      author: 'Principal Office',
      attachmentName: 'Circular_Notification_Doc.pdf'
    });

    setCreateModalOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Communication & Circulars
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Broadcast official circulars, parent notices, SMS alerts, and notifications
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Announcement</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800">
        {[
          { id: 'announcements', label: 'School Announcements' },
          { id: 'notifications', label: 'Broadcast Notifications' },
          { id: 'circulars', label: 'Official Circular Documents' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Announcements */}
      {activeTab === 'announcements' && (
        <div className="space-y-4 animate-fade-in">
          {announcements.map(anc => (
            <div
              key={anc.id}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Badge variant={anc.priority === 'High' ? 'danger' : 'info'} size="sm">
                    {anc.targetAudience}
                  </Badge>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {anc.title}
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  Published: {formatDate(anc.publishedDate)}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {anc.content}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Target: <strong className="text-slate-700 dark:text-slate-300">{anc.targetClass}</strong>
                </span>

                {anc.attachmentName && (
                  <button
                    onClick={() => alert(`Downloading attachment: ${anc.attachmentName}`)}
                    className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{anc.attachmentName}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Notifications Center */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Live Alert Activity
            </h3>
            <span className="text-xs text-slate-400">Synced across Web, SMS and WhatsApp</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`py-3.5 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                  notif.unread ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${notif.unread ? 'bg-brand-600 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
                  <div>
                    <span className="text-xs sm:text-sm font-bold block">{notif.title}</span>
                    <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 text-xs">
                  <span className="text-slate-400 block">{notif.time}</span>
                  <Badge variant="neutral" size="sm" className="mt-1">{notif.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Circulars */}
      {activeTab === 'circulars' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {[
            { ref: 'CIR-2026-08', title: 'PTM Slot Schedule Matrix', date: '21 Sep 2026', size: '240 KB' },
            { ref: 'CIR-2026-07', title: 'Sports Day Event Rules & House Guidelines', date: '18 Sep 2026', size: '512 KB' },
            { ref: 'CIR-2026-06', title: 'Half-Yearly Examination Syllabus Portions', date: '15 Sep 2026', size: '890 KB' },
            { ref: 'CIR-2026-05', title: 'Uniform & Discipline Protocol Guidelines', date: '01 Jun 2026', size: '1.2 MB' }
          ].map(c => (
            <div key={c.ref} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between space-y-3">
              <div>
                <span className="font-mono text-[10px] font-bold text-slate-400 block mb-1">{c.ref}</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{c.title}</h4>
                <p className="text-xs text-slate-500 mt-1">Official Circular • {c.date}</p>
              </div>
              <button
                onClick={() => alert(`Downloading circular ${c.ref}: ${c.title}`)}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Download PDF ({c.size})</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Announcement Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        maxWidth="max-w-lg"
        title="Compose School Announcement"
        subtitle="Broadcast to parents, faculty, or entire institution"
        footer={
          <>
            <button
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="px-5 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Publish Notice</span>
            </button>
          </>
        }
      >
        <form onSubmit={handlePublish} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Announcement Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Term 2 Examination Timetable Notice"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Audience *</label>
              <select
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="All School">All School (Everyone)</option>
                <option value="Parents">Parents Only</option>
                <option value="Teachers">Teachers / Faculty Only</option>
                <option value="Students">Students Only</option>
                <option value="Specific Class">Specific Class</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Class</label>
              <select
                value={targetClass}
                onChange={e => setTargetClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="All Classes">All Classes (1st-12th)</option>
                <option value="10th Standard">10th Standard</option>
                <option value="12th Standard">12th Standard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Announcement Message *</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Enter comprehensive notice text..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
