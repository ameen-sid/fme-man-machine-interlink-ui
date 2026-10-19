import React from 'react';
import { ArrowLeft, Save, RotateCcw, ClipboardCheck } from 'lucide-react';
import PmObservationSwitcher from './PmObservationSwitcher';

export default function ChecksheetHeaderNav({
  title,
  subtitle,
  icon: Icon = ClipboardCheck,
  iconBgClass = 'bg-sky-100 text-sky-600',
  onClose,
  onSave,
  saveLabel = 'Save Record',
  onReset,
  resetTitle = 'Reset values',
  savedToast,
  extraActions = null,
  showSave = true,
  showReset = true,
  showClose = true,
  showSwitcher = false,
  activeTab = 'pm',
  onSelectTab,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm gap-3 print:hidden">
      <div className="flex items-center gap-3">
        {onClose && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-all shadow-sm"
            onClick={onClose}
            title="Back to Checksheets Menu"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}
        <div className={`p-2 ${iconBgClass} rounded-lg shrink-0`}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0 uppercase">
            FURUKAWA MINDA ELECTRIC PVT. LTD. — {title}
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {subtitle}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {showSwitcher && (
          <PmObservationSwitcher activeTab={activeTab} onSelectTab={onSelectTab} />
        )}
        {extraActions}
        {/* {showSave && onSave && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-sm"
            onClick={onSave}
          >
            <Save size={15} />
            <span>{saveLabel}</span>
          </button>
        )} */}
        {showReset && onReset && (
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-2 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-200 border border-slate-300 text-slate-600 transition-colors cursor-pointer"
            onClick={onReset}
            title={resetTitle}
          >
            <RotateCcw size={15} />
          </button>
        )}
        {showClose && onClose && (
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-rose-100 border border-slate-200 hover:border-rose-300 text-rose-600 transition-colors cursor-pointer"
            onClick={onClose}
          >
            Close Checksheet
          </button>
        )}
      </div>
    </div>
  );
}
