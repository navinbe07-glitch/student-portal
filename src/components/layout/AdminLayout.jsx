import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Footer } from './Footer';
import { GlobalSearchModal } from './GlobalSearchModal';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setSearchModalOpen(true);
    window.addEventListener('open-global-search', handleOpenSearch);
    return () => window.removeEventListener('open-global-search', handleOpenSearch);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main viewport area with left padding for desktop sidebar */}
      <div className="lg:pl-72 flex flex-col min-h-screen flex-1">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          onSearchClick={() => setSearchModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>

        <Footer />
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
}
