import React from 'react';
import { Wrench, FileSpreadsheet } from 'lucide-react';

export default function PmObservationSwitcher({
  activeTab = 'pm',
  onSelectTab,
  className = '',
  size = 'md'
}) {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner ${className}`}
      role="tablist"
      aria-label="Preventive Maintenance Checksheet Tabs"
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'pm'}
        onClick={() => onSelectTab && onSelectTab('pm')}
        className={`inline-flex items-center gap-1.5 font-bold transition-all cursor-pointer rounded-lg ${isSm ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'
          } ${activeTab === 'pm'
            ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-700/20'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
        title="Open PM Checksheet"
      >
        <Wrench size={isSm ? 12 : 14} className={activeTab === 'pm' ? 'text-white' : 'text-purple-600'} />
        <span>PM Checksheet</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'observation'}
        onClick={() => onSelectTab && onSelectTab('observation')}
        className={`inline-flex items-center gap-1.5 font-bold transition-all cursor-pointer rounded-lg ${isSm ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'
          } ${activeTab === 'observation'
            ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-700/20'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
        title="Open Observation Checksheet"
      >
        <FileSpreadsheet size={isSm ? 12 : 14} className={activeTab === 'observation' ? 'text-white' : 'text-blue-600'} />
        <span>Observation Checksheet</span>
      </button>
    </div>
  );
}
