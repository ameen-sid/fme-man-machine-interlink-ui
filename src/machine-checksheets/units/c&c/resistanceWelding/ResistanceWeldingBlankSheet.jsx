import React from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import {
  ClipboardCheck,
  CalendarCheck2,
  Gauge,
  ShieldAlert,
  Wrench,
  FileQuestion
} from 'lucide-react';

export default function ResistanceWeldingBlankSheet({
  machine = { name: 'R/SW 01', model: 'Machine 1' },
  checksheetName = 'Machine Daily checksheet',
  onClose
}) {
  // Determine icon & theme from checksheet name
  let Icon = ClipboardCheck;
  let iconBgClass = 'bg-sky-100 text-sky-600';
  const lowerName = (checksheetName || '').toLowerCase();
  if (lowerName.includes('daily')) {
    Icon = CalendarCheck2;
    iconBgClass = 'bg-emerald-100 text-emerald-600';
  } else if (lowerName.includes('instrument')) {
    Icon = Gauge;
    iconBgClass = 'bg-amber-100 text-amber-600';
  } else if (lowerName.includes('pokayoke') || lowerName.includes('poka')) {
    Icon = ShieldAlert;
    iconBgClass = 'bg-rose-100 text-rose-600';
  } else if (lowerName.includes('pm')) {
    Icon = Wrench;
    iconBgClass = 'bg-purple-100 text-purple-600';
  }

  return (
    <div className="flex flex-col gap-5 w-full min-h-[80vh]">
      {/* Standardized Header Navbar (Print button removed, unified style) */}
      <ChecksheetHeaderNav
        title={`${checksheetName} — ${machine.name}`}
        subtitle={`Process: Resistance Welding • Model: ${machine.model} • Bawal Plant`}
        icon={Icon}
        iconBgClass={iconBgClass}
        onClose={onClose}
        showSave={false}
        showReset={false}
      />

      {/* Clean Blank Checksheet Area with Simple Text */}
      <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 sm:p-16 shadow-sm flex flex-col items-center justify-center text-center my-auto min-h-[420px]">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mb-4">
          <FileQuestion size={32} />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight m-0 mb-2">
          Checksheets are not added
        </h3>

        <p className="text-sm text-slate-500 m-0 max-w-md leading-relaxed">
          The <span className="font-semibold text-slate-700">{checksheetName}</span> for{' '}
          <strong className="text-slate-900 font-bold">{machine.name}</strong> ({machine.model}) is not added yet.
        </p>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-6 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 py-2 px-4 rounded-xl cursor-pointer transition-all shadow-sm"
          >
            ← Back to Checksheets
          </button>
        )}
      </div>
    </div>
  );
}
