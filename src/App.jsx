import React, { useState } from 'react';
import MachineChecksheet from './pages/MachineChecksheet';
import OperationsDashboard from './components/OperationsDashboard';
import {
  Globe,
  Bell,
  Settings,
  Download,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

// SVG Icon Helpers matching FME portal style
const Icons = {
  Home: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  LayoutDashboard: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  ClipboardList: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" /><path d="M12 16h4" /><circle cx="9" cy="11" r="1" /><circle cx="9" cy="16" r="1" />
    </svg>
  ),
  LogOut: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChecksheetActive, setIsChecksheetActive] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [checksheetResetKey, setChecksheetResetKey] = useState(0);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 w-full font-sans antialiased">
      {/* Left Sidebar - persistent & collapsible (hidden when checksheet is active for full page mode) */}
      {!isChecksheetActive && (
        <aside
          className={`${
            isSidebarCollapsed ? 'w-20 min-w-[80px]' : 'w-64 min-w-[256px]'
          } h-screen sticky top-0 flex flex-col justify-between bg-white border-r border-slate-200 z-50 shadow-sm transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col">
            {/* FME Brand Wordmark Logo & Toggle Button */}
            {isSidebarCollapsed ? (
              <div className="flex flex-col items-center gap-3 p-3 py-4 border-b border-slate-100">
                <button
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Expand sidebar"
                >
                  <PanelLeftOpen size={18} />
                </button>
                <div
                  className="flex items-center justify-center w-11 h-8 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-lg shadow-sm"
                  title="Furukawa Minda Electric"
                >
                  <span className="text-white font-extrabold tracking-wider text-xs">FME</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-lg shadow-sm">
                  <span className="text-white font-extrabold tracking-wider text-sm flex items-center">
                    <span className="text-white">F</span>
                    <span className="text-blue-200">m</span>
                    <span className="text-amber-300">e</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-100 tracking-wider uppercase ml-1">MMI</span>
                </div>
                <button
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>
            )}

            {/* Navigation Links - Dashboard (First) and Machine Checksheet (Second) */}
            <nav className="flex flex-col gap-1.5 p-3">
              {/* 1. Dashboard Link (Before Machine Checksheet) */}
              {isSidebarCollapsed ? (
                <button
                  className={`flex items-center justify-center w-11 h-11 mx-auto rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => {
                    setActiveTab('dashboard');
                    setIsChecksheetActive(false);
                  }}
                  title="Dashboard"
                >
                  <Icons.LayoutDashboard />
                </button>
              ) : (
                <button
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => {
                    setActiveTab('dashboard');
                    setIsChecksheetActive(false);
                  }}
                  title="Dashboard"
                >
                  <Icons.LayoutDashboard />
                  <span className="font-bold">Dashboard</span>
                </button>
              )}

              {/* 2. Machine Checksheet Link */}
              {isSidebarCollapsed ? (
                <button
                  className={`flex items-center justify-center w-11 h-11 mx-auto rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'machine-checksheet'
                      ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => {
                    setActiveTab('machine-checksheet');
                    setIsChecksheetActive(false);
                    setChecksheetResetKey((prev) => prev + 1);
                  }}
                  title="Machine Checksheet"
                >
                  <Icons.ClipboardList />
                </button>
              ) : (
                <button
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    activeTab === 'machine-checksheet'
                      ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => {
                    setActiveTab('machine-checksheet');
                    setIsChecksheetActive(false);
                    setChecksheetResetKey((prev) => prev + 1);
                  }}
                  title="Machine Checksheet"
                >
                  <Icons.ClipboardList />
                  <span className="font-bold">Machine Checksheet</span>
                </button>
              )}
            </nav>
          </div>

          {/* Footer Logout */}
          <div className="p-3 border-t border-slate-100">
            {isSidebarCollapsed ? (
              <button
                className="flex items-center justify-center w-11 h-11 mx-auto rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                title="Logout"
              >
                <Icons.LogOut />
              </button>
            ) : (
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all text-left cursor-pointer">
                <Icons.LogOut />
                <span>Logout</span>
              </button>
            )}
          </div>
        </aside>
      )}

      {/* Main Work Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${isChecksheetActive ? 'w-full' : ''}`}>
        {/* Top Header / Breadcrumbs Bar - hidden when checksheet is opened */}
        {!isChecksheetActive && (
          <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <button
                type="button"
                className="cursor-pointer hover:text-blue-600 flex items-center bg-transparent border-none p-0 text-slate-500"
                onClick={() => {
                  setActiveTab('dashboard');
                  setIsChecksheetActive(false);
                }}
                title="Go to Dashboard"
              >
                <Icons.Home />
              </button>
              <span className="text-slate-300 font-bold">&gt;</span>
              <span className="font-semibold text-slate-800">
                {activeTab === 'dashboard' ? 'Dashboard' : 'Machine Checksheet'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50" title="Change Language">
                <Globe size={16} />
                <span className="text-xs font-bold">EN</span>
              </button>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors" title="Download">
                <Download size={16} />
              </button>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors" title="Settings">
                <Settings size={16} />
              </button>
              <button className="relative p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors" title="Notifications">
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
              </button>
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold text-xs shadow-sm cursor-pointer ml-1" title="User Profile - YY">
                YY
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className={isChecksheetActive ? 'w-full min-h-screen bg-slate-50' : 'flex-1 p-5 md:p-7 flex flex-col gap-6 w-full'}>
          {activeTab === 'dashboard' ? (
            <OperationsDashboard />
          ) : (
            <MachineChecksheet
              key={checksheetResetKey}
              onChecksheetStateChange={setIsChecksheetActive}
            />
          )}
        </main>
      </div>
    </div>
  );
}
