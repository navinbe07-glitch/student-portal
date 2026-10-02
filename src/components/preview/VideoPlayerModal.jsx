import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Play, Pause, Volume2, Maximize2, ExternalLink, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export function VideoPlayerModal({ isOpen, onClose, video }) {
  if (!video) return null;

  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-3xl"
      title={video.title}
      subtitle={`${video.subject} • ${video.channel} • ${video.duration}`}
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-slate-400">
            Powered by EduSphere Digital Learning Library
          </div>
          <div className="flex items-center gap-2">
            <a
              href={video.youtubeUrl || 'https://www.youtube.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Video Player Display Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover opacity-85"
          />

          {/* Liquid glass playback control overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <Badge variant="info" size="sm" className="bg-white/20 backdrop-blur-md text-white border-white/20 font-bold">
                {video.subject}
              </Badge>
              <div className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-mono border border-white/10">
                1080p HD
              </div>
            </div>

            {/* Center Play Button */}
            <div className="self-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-brand-600/90 hover:bg-brand-500 text-white flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/30 transform hover:scale-110 active:scale-95 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div className="bg-brand-500 h-full w-2/5 rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-white/90">
                <div className="flex items-center gap-3">
                  <span>07:42 / {video.duration}</span>
                  <Volume2 className="w-4 h-4 cursor-pointer text-white/70 hover:text-white" />
                </div>
                <Maximize2 className="w-4 h-4 cursor-pointer text-white/70 hover:text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Notes & Concepts */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Key Topic Takeaways & Board Exam Tips
            </h4>
          </div>

          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 pl-1">
            {(video.keyPoints || [
              'Review core algebraic identities and discriminant formulas (b² - 4ac).',
              'Practice step-by-step substitution to avoid minus sign arithmetic mistakes.',
              'Solve question bank exercise 4.3 questions 5, 7, and 9 for upcoming exams.'
            ]).map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
