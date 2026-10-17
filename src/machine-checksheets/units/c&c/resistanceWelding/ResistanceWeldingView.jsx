import React from 'react';
import { Cpu } from 'lucide-react';

export default function ResistanceWeldingView({
  selectedUnitLocation = 'Bawal',
  onSelectMachine
}) {
  const machines = Array.from({ length: 7 }, (_, i) => {
    const num = i + 1;
    const outputs = [157, 194, 231, 268, 125, 162, 199];
    return {
      num,
      name: `R/SW ${String(num).padStart(2, '0')}`,
      model: `Machine ${num}`,
      output: outputs[i] || 150,
      isMaintenance: num === 7,
      isIdleOrStopped: num === 6
    };
  });

  const runningCount = machines.filter((m) => !m.isMaintenance && !m.isIdleOrStopped).length;
  const idleCount = machines.filter((m) => m.isIdleOrStopped).length;
  const maintCount = machines.filter((m) => m.isMaintenance).length;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Banner: Resistance Welding Machines Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 px-5 shadow-sm gap-3">
        <div>
          <h3 className="text-base font-black text-slate-900 m-0">
            Resistance Welding Machines Overview
          </h3>
          <p className="text-xs text-slate-500 m-0">
            Real-time status, health, and output monitoring for R/SW 01 to R/SW 07 ({selectedUnitLocation} Plant)
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 py-1 px-3 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {runningCount} Running
          </span>
          <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 py-1 px-3 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            {idleCount} Idle / Stopped
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 py-1 px-3 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {maintCount} Maint.
          </span>
        </div>
      </div>

      {/* Grid of 7 Resistance Welding Machine Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full">
        {machines.map((machine) => {
          const { num: machineNum, name: machineName, model: modelName, output, isMaintenance, isIdleOrStopped } = machine;
          const statusText = isMaintenance
            ? 'Maintenance'
            : isIdleOrStopped
              ? 'Idle / Stopped'
              : 'Running';

          const theme = isMaintenance
            ? {
                cardBg: 'bg-amber-50 hover:bg-amber-100/70 border-amber-300',
                badge: 'bg-amber-200/80 text-amber-900 border border-amber-400',
                iconBg: 'bg-amber-200/80 text-amber-900',
                pill: 'bg-amber-200 text-amber-950 border border-amber-400',
                dot: 'bg-amber-600',
                divider: 'border-amber-200/80'
              }
            : isIdleOrStopped
              ? {
                  cardBg: 'bg-rose-50 hover:bg-rose-100/70 border-rose-300',
                  badge: 'bg-rose-200/80 text-rose-900 border border-rose-400',
                  iconBg: 'bg-rose-200/80 text-rose-900',
                  pill: 'bg-rose-200 text-rose-950 border border-rose-400',
                  dot: 'bg-rose-600',
                  divider: 'border-rose-200/80'
                }
              : {
                  cardBg: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-300',
                  badge: 'bg-emerald-200/80 text-emerald-900 border border-emerald-400',
                  iconBg: 'bg-emerald-200/80 text-emerald-900',
                  pill: 'bg-emerald-200 text-emerald-950 border border-emerald-400',
                  dot: 'bg-emerald-600',
                  divider: 'border-emerald-200/80'
                };

          return (
            <div
              key={machineNum}
              className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg min-h-[175px] shadow-sm ${theme.cardBg}`}
              onClick={() =>
                onSelectMachine &&
                onSelectMachine({
                  id: machineNum,
                  name: machineName,
                  model: modelName,
                  process: 'Registance Welding'
                })
              }
              title={`Click to open checksheets for ${machineName}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-base font-extrabold text-slate-900 tracking-tight">
                    {machineName}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    ({modelName})
                  </span>
                </div>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${theme.iconBg}`}
                >
                  <Cpu size={18} />
                </div>
              </div>

              <div className="my-3">
                <span className="text-3xl font-black text-slate-900">{output}</span>
                <span className="text-sm font-bold text-slate-600"> pcs/hr</span>
              </div>

              <div
                className={`flex items-center justify-end text-xs pt-3 border-t ${theme.divider}`}
              >
                <span
                  className={`text-[11px] font-bold py-1 px-3 rounded-full flex items-center gap-1.5 ${theme.pill}`}
                >
                  <span className={`w-2 h-2 rounded-full ${theme.dot}`}></span>
                  {statusText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
