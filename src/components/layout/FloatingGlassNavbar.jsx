import React from 'react';

/**
 * LinearFadeBlur:
 * Creates a smooth linear progressive blur and soft gradient from the bottom edge upward,
 * reproducing the modern iOS glass edge effect without blocking interactions.
 */
export function LinearFadeBlur({ className = '' }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-28 sm:h-32 pointer-events-none z-30 ${className}`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)',
        background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)'
      }}
    />
  );
}

/**
 * FloatingGlassNavbar:
 * iOS-style floating glass pill navbar.
 * - Fixed and never moves on scroll.
 * - Active tab = ICON + NAME inside a highlighted pill with smooth animated transition.
 * - Inactive tabs = ICON ONLY to prevent messy clutter.
 * - Centered, wider, slightly higher from bottom with safe-area support.
 */
export function FloatingGlassNavbar({
  items = [],
  activeId,
  onSelect,
  colorTheme = 'brand' // 'brand' (blue/indigo) | 'amber' (amber/orange) | 'emerald' (emerald/teal)
}) {
  const themeClasses = {
    brand: {
      active: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md shadow-indigo-500/30 ring-1 ring-white/20',
      inactiveHover: 'hover:text-indigo-600 hover:bg-indigo-50/70',
      glow: '0 20px 45px -10px rgba(79, 70, 229, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.6)'
    },
    amber: {
      active: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-amber-500/30 ring-1 ring-white/20',
      inactiveHover: 'hover:text-amber-600 hover:bg-amber-50/70',
      glow: '0 20px 45px -10px rgba(245, 158, 11, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.6)'
    },
    emerald: {
      active: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-500/30 ring-1 ring-white/20',
      inactiveHover: 'hover:text-emerald-600 hover:bg-emerald-50/70',
      glow: '0 20px 45px -10px rgba(16, 185, 129, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.6)'
    }
  };

  const currentTheme = themeClasses[colorTheme] || themeClasses.brand;

  return (
    <div className="fixed bottom-6 sm:bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none px-3 sm:px-4 transition-all duration-300 select-none">
      <nav
        className="pointer-events-auto backdrop-blur-2xl bg-white/95 border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06)] rounded-full p-1.5 sm:p-2 flex items-center justify-center gap-1 sm:gap-2 ring-1 ring-black/5"
        style={{ boxShadow: currentTheme.glow }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.onClick) item.onClick();
                if (onSelect) onSelect(item.id);
              }}
              title={item.label}
              className={`relative shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? `h-11 sm:h-12 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-extrabold gap-2 ${currentTheme.active}`
                  : `w-11 h-11 sm:w-12 sm:h-12 rounded-full text-slate-500 ${currentTheme.inactiveHover} active:scale-95`
              }`}
              type="button"
            >
              <Icon className="w-5 h-5 shrink-0" />

              {/* Active Tab ONLY shows Name */}
              {isActive && (
                <span className="tracking-tight whitespace-nowrap font-extrabold">
                  {item.label}
                </span>
              )}

              {/* Notification Badge Dot for Inactive / Active */}
              {item.badge && (
                <span
                  className={`absolute ${
                    isActive ? 'top-1.5 right-2' : 'top-2 right-2'
                  } w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white shrink-0 animate-pulse pointer-events-none`}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
