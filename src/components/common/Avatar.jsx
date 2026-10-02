import React, { useState } from 'react';

export function Avatar({ src, name = 'User', size = 'md', className = '' }) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Deterministic color from name
  const colors = [
    'bg-indigo-500 text-white',
    'bg-emerald-500 text-white',
    'bg-blue-500 text-white',
    'bg-purple-500 text-white',
    'bg-rose-500 text-white',
    'bg-amber-500 text-white',
    'bg-teal-500 text-white',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const color = colors[Math.abs(hash) % colors.length];

  if (!src || imgError) {
    return (
      <div
        className={`rounded-full flex items-center justify-center font-semibold shadow-sm shrink-0 ${sizeClasses[size] || sizeClasses.md} ${color} ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setImgError(true)}
      className={`rounded-full object-cover shrink-0 shadow-sm border border-slate-200 dark:border-slate-800 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    />
  );
}
