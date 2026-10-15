import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // On checksheet pages (e.g. /machine-checksheet/:unit/:operationalUnit/:machineId/:checksheetId),
  // hide sidebar and navbar for full-screen checksheet display as in frontend
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isChecksheetPage =
    pathSegments[0] === 'machine-checksheet' && pathSegments.length >= 5;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 w-full font-sans antialiased">
      {/* Left Sidebar - hidden on checksheet pages */}
      {!isChecksheetPage && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={setIsSidebarCollapsed}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${isChecksheetPage ? 'w-full' : ''}`}>
        {/* Top Navbar - hidden on checksheet pages */}
        {!isChecksheetPage && <Navbar />}

        {/* Routed Pages Outlet */}
        <main
          className={
            isChecksheetPage
              ? 'w-full min-h-screen bg-slate-50 p-4 sm:p-6'
              : 'flex-1 p-5 md:p-7 flex flex-col gap-6 w-full'
          }
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
