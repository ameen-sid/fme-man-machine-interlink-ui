import React from 'react';

export const CNC_PROCESSES = [
  'Auto Crimping',
  'Manual Crimping',
  'Joint Crimping',
  'Registance Welding',
  'Twisting',
  'Blue Taping',
  'Head Sinking'
];

export default function ProcessFilters({
  activeProcess = 'Auto Crimping',
  onSelectProcess
}) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full max-w-full overflow-x-auto whitespace-nowrap">
      {CNC_PROCESSES.map((tabName) => {
        const isActive = activeProcess === tabName;
        return (
          <button
            key={tabName}
            type="button"
            className={`border-none py-2 px-4 rounded-full text-xs font-semibold cursor-pointer inline-flex items-center gap-2 whitespace-nowrap transition-all ${
              isActive
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'bg-transparent text-slate-500 hover:text-slate-900'
            }`}
            onClick={() => onSelectProcess && onSelectProcess(tabName)}
          >
            {tabName}
          </button>
        );
      })}
    </div>
  );
}
