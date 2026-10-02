import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = 'up', // 'up' | 'down' | 'neutral'
  color = 'indigo', // 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue' | 'purple'
  onClick,
  className = ''
}) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
      border: 'hover:border-indigo-300 dark:hover:border-indigo-700',
      gradient: 'from-indigo-500/10 to-transparent'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
      border: 'hover:border-emerald-300 dark:hover:border-emerald-700',
      gradient: 'from-emerald-500/10 to-transparent'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
      border: 'hover:border-amber-300 dark:hover:border-amber-700',
      gradient: 'from-amber-500/10 to-transparent'
    },
    rose: {
      bg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
      border: 'hover:border-rose-300 dark:hover:border-rose-700',
      gradient: 'from-rose-500/10 to-transparent'
    },
    blue: {
      bg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
      border: 'hover:border-blue-300 dark:hover:border-blue-700',
      gradient: 'from-blue-500/10 to-transparent'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
      border: 'hover:border-purple-300 dark:hover:border-purple-700',
      gradient: 'from-purple-500/10 to-transparent'
    }
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${scheme.border} ${className}`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${scheme.gradient} rounded-bl-full pointer-events-none`} />

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl ${scheme.bg} shadow-sm shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(trend || subtitle) && (
        <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          {trend ? (
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                  trendDirection === 'up'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                    : trendDirection === 'down'
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {trendDirection === 'up' && <TrendingUp className="w-3 h-3 mr-0.5" />}
                {trendDirection === 'down' && <TrendingDown className="w-3 h-3 mr-0.5" />}
                {trendDirection === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
                {trend}
              </span>
              <span className="text-slate-500 dark:text-slate-400">vs last month</span>
            </div>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">{subtitle}</span>
          )}

          {subtitle && trend && (
            <span className="text-slate-400 dark:text-slate-500 text-right truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
