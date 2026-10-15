import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Globe,
  Bell,
  Settings,
  Download,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeSession } = useAuth();

  // Parse path segments for breadcrumbs
  const pathParts = location.pathname.split('/').filter(Boolean);
  const isDashboard = pathParts[0] === 'dashboard' || pathParts.length === 0;

  // Breadcrumbs items
  const unit = pathParts[1] ? decodeURIComponent(pathParts[1]) : null;
  const opUnit = pathParts[2] ? decodeURIComponent(pathParts[2]) : null;
  const machineId = pathParts[3] ? decodeURIComponent(pathParts[3]) : null;
  const checksheetId = pathParts[4] ? decodeURIComponent(pathParts[4]) : null;

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-6 shadow-sm">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
        <button
          type="button"
          className="cursor-pointer hover:text-blue-600 flex items-center bg-transparent border-none p-0 text-slate-500"
          onClick={() => navigate('/dashboard')}
          title="Go to Dashboard"
        >
          <HomeIcon />
        </button>
        <span className="text-slate-300 font-bold">&gt;</span>

        {isDashboard ? (
          <span className="font-semibold text-slate-800">Dashboard</span>
        ) : (
          <>
            <button
              type="button"
              className="cursor-pointer hover:text-blue-600 bg-transparent border-none p-0 text-slate-500"
              onClick={() => navigate('/machine-checksheet')}
            >
              Machine Checksheet
            </button>

            {unit && (
              <>
                <span className="text-slate-300 font-bold">&gt;</span>
                <button
                  type="button"
                  className="cursor-pointer hover:text-blue-600 bg-transparent border-none p-0 text-slate-500"
                  onClick={() => navigate(`/machine-checksheet/${unit}`)}
                >
                  {unit} Unit
                </button>
              </>
            )}

            {opUnit && (
              <>
                <span className="text-slate-300 font-bold">&gt;</span>
                <button
                  type="button"
                  className="cursor-pointer hover:text-blue-600 bg-transparent border-none p-0 text-slate-500"
                  onClick={() => navigate(`/machine-checksheet/${unit}/${opUnit}`)}
                >
                  {opUnit} Section
                </button>
              </>
            )}

            {machineId && (
              <>
                <span className="text-slate-300 font-bold">&gt;</span>
                <button
                  type="button"
                  className="cursor-pointer hover:text-blue-600 bg-transparent border-none p-0 text-slate-500 font-semibold"
                  onClick={() => navigate(`/machine-checksheet/${unit}/${opUnit}/${machineId}`)}
                >
                  {machineId}
                </button>
              </>
            )}

            {checksheetId && (
              <>
                <span className="text-slate-300 font-bold">&gt;</span>
                <span className="font-bold text-indigo-600">
                  {checksheetId}
                </span>
              </>
            )}
          </>
        )}
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-2">
        {activeSession && (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700 mr-1">
            <UserCheck size={13} className="text-emerald-600" />
            <span>Op: {activeSession.operatorCardNo}</span>
          </div>
        )}

        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer" title="Change Language">
          <Globe size={16} />
          <span className="text-xs font-bold">EN</span>
        </button>
        <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer" title="Download">
          <Download size={16} />
        </button>
        <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer" title="Settings">
          <Settings size={16} />
        </button>
        <button className="relative p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer" title="Notifications">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold text-xs shadow-sm cursor-pointer ml-1" title="User Profile - YY">
          YY
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </div>
      </div>
    </header>
  );
}
