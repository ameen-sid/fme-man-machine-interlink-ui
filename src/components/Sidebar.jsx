import React from 'react';
import { NavLink } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Icons = {
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

export default function Sidebar({ isCollapsed, onToggleCollapse }) {
  const { logout } = useAuth();

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20 min-w-[80px]' : 'w-64 min-w-[256px]'
      } h-screen sticky top-0 flex flex-col justify-between bg-white border-r border-slate-200 z-50 shadow-sm transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col">
        {/* FME Brand Wordmark Logo & Toggle Button */}
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-3 p-3 py-4 border-b border-slate-100">
            <button
              onClick={() => onToggleCollapse(false)}
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
              onClick={() => onToggleCollapse(true)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5 p-3">
          {/* 1. Dashboard Link */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isCollapsed
                ? `flex items-center justify-center w-11 h-11 mx-auto rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                : `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
            }
            title="Dashboard"
          >
            <Icons.LayoutDashboard />
            {!isCollapsed && <span className="font-bold">Dashboard</span>}
          </NavLink>

          {/* 2. Machine Checksheet Link */}
          <NavLink
            to="/machine-checksheet"
            className={({ isActive }) =>
              isCollapsed
                ? `flex items-center justify-center w-11 h-11 mx-auto rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                : `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
            }
            title="Machine Checksheet"
          >
            <Icons.ClipboardList />
            {!isCollapsed && <span className="font-bold">Machine Checksheet</span>}
          </NavLink>
        </nav>
      </div>

      {/* Footer Logout */}
      <div className="p-3 border-t border-slate-100">
        {isCollapsed ? (
          <button
            onClick={logout}
            className="flex items-center justify-center w-11 h-11 mx-auto rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
            title="Logout"
          >
            <Icons.LogOut />
          </button>
        ) : (
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all text-left cursor-pointer"
          >
            <Icons.LogOut />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
