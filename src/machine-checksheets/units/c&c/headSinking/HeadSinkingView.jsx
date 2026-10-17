import React from 'react';
import { Anchor, FileQuestion } from 'lucide-react';

export default function HeadSinkingView({
  selectedUnitLocation = 'Bawal'
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Banner: Head Sinking Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 px-5 shadow-sm gap-3">
        <div>
          <h3 className="text-base font-black text-slate-900 m-0">Head Sinking Overview</h3>
          <p className="text-xs text-slate-500 m-0">
            Real-time status, health, and operational logs for Head Sinking ({selectedUnitLocation} Plant)
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 py-1 px-3 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            0 Active Machines
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 py-1 px-3 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Setup Pending
          </span>
        </div>
      </div>

      {/* Blank / Not Added Content Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-14 shadow-sm flex flex-col items-center justify-center text-center min-h-[350px]">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mb-4">
          <FileQuestion size={32} />
        </div>
        <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 py-1 px-3 rounded-full mb-3">
          <Anchor size={14} />
          <span>Head Sinking Process</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight m-0 mb-2">
          Checksheets are not added
        </h3>
        <p className="text-sm text-slate-500 m-0 max-w-md leading-relaxed">
          The operational checksheets and machines for <strong className="text-slate-800 font-bold">Head Sinking</strong> have not been configured for the {selectedUnitLocation} Plant yet.
        </p>
      </div>
    </div>
  );
}
