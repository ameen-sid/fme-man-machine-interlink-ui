import React from 'react';
import { Users, Clock, AlertOctagon, Boxes, ArrowLeft } from 'lucide-react';

export default function OperatorMachineSummary({
  machine = { name: 'C&C 01', model: 'Alpha_355' },
  activeTab = 'Auto Crimping',
  activeSession,
  onClose
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <Users size={22} className="text-emerald-600 bg-emerald-50 p-2 rounded-xl w-10 h-10" />
          <div>
            <h3 className="text-base font-black text-slate-900 m-0">Operator & Machine Summary</h3>
            <p className="text-xs text-slate-500 m-0">
              Consolidated telemetry and operator shift login audit for {machine?.name || 'Machine'} ({activeTab})
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 py-1.5 px-3 rounded-full">
            Today: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          {onClose && (
            <button
              className="text-xs font-bold py-1.5 px-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer border-none transition-all flex items-center gap-1"
              onClick={onClose}
            >
              <ArrowLeft size={13} />
              <span>Close Summary</span>
            </button>
          )}
        </div>
      </div>

      {/* Overall Machine Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-4 flex flex-col justify-between border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-blue-700">
            <span>TOTAL MACHINE RUNTIME</span>
            <Clock size={18} />
          </div>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-black text-slate-900">18.4</span>
            <span className="text-xs font-bold text-slate-500">hrs</span>
          </div>
          <span className="text-[11px] text-slate-500">Active runtime across all shift logins</span>
        </div>

        <div className="rounded-2xl p-4 flex flex-col justify-between border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-rose-700">
            <span>TOTAL BREAKDOWN TIME</span>
            <AlertOctagon size={18} />
          </div>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-black text-slate-900">0.8</span>
            <span className="text-xs font-bold text-slate-500">hrs (48 min)</span>
          </div>
          <span className="text-[11px] text-slate-500">Tooling change & pneumatic downtime</span>
        </div>

        <div className="rounded-2xl p-4 flex flex-col justify-between border border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>TOTAL PRODUCTION OUTPUT</span>
            <Boxes size={18} />
          </div>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-black text-slate-900">3,840</span>
            <span className="text-xs font-bold text-slate-500">units</span>
          </div>
          <span className="text-[11px] text-slate-500">Good parts produced on {machine?.name || 'Machine'}</span>
        </div>

        <div className="rounded-2xl p-4 flex flex-col justify-between border border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-purple-700">
            <span>OPERATOR SESSIONS</span>
            <Users size={18} />
          </div>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-black text-slate-900">3</span>
            <span className="text-xs font-bold text-slate-500">operators</span>
          </div>
          <span className="text-[11px] text-slate-500">Active / logged operator shifts</span>
        </div>
      </div>

      {/* Detailed Operator Login Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h4 className="text-sm font-bold text-slate-900 m-0">Operator Login & Performance Log</h4>
          <span className="text-xs text-slate-500">Individual operator sessions, runtimes, breakdowns and output volume</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Operator Card No.</th>
                <th className="p-3">Inspector Card No.</th>
                <th className="p-3">Shift / Timing</th>
                <th className="p-3">Login Status</th>
                <th className="p-3">Runtime (hrs)</th>
                <th className="p-3">Breakdown (min)</th>
                <th className="p-3">Production (units)</th>
                <th className="p-3">Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Current active authenticated session */}
              {activeSession && (
                <tr className="bg-blue-50/50 font-medium">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">OP</span>
                      <div>
                        <div className="font-bold text-slate-900">{activeSession.operatorCardNo}</div>
                        <div className="text-[10px] text-emerald-600 font-bold">● Current Active Login</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{activeSession.inspectorCardNo}</div>
                    <span className="text-[10px] text-slate-400">Certified QI</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full font-bold text-[11px]">Shift A (06:00 - 14:00)</span>
                  </td>
                  <td className="p-3"><span className="bg-emerald-100 text-emerald-700 py-0.5 px-2 rounded-full text-[10px] font-bold">Active Now</span></td>
                  <td className="p-3 font-bold text-blue-600">6.8 hrs</td>
                  <td className="p-3 font-bold text-rose-600">15 min</td>
                  <td className="p-3 font-bold text-emerald-600">1,420</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-md font-bold text-[11px]">96.2%</span>
                  </td>
                </tr>
              )}

              {/* Historical Shift B Login */}
              <tr className="hover:bg-slate-50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">OP</span>
                    <div>
                      <div className="font-semibold text-slate-800">OP-78219 (Sunil Verma)</div>
                      <div className="text-[10px] text-slate-400">Logged out normally</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="font-semibold text-slate-800">QI-10928</div>
                  <span className="text-[10px] text-slate-400">Quality Inspector</span>
                </td>
                <td className="p-3">
                  <span className="bg-slate-100 text-slate-700 py-0.5 px-2 rounded-full text-[11px]">Shift B (14:00 - 22:00)</span>
                </td>
                <td className="p-3"><span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px]">Completed</span></td>
                <td className="p-3 font-bold text-blue-600">7.4 hrs</td>
                <td className="p-3 font-bold text-rose-600">20 min</td>
                <td className="p-3 font-bold text-emerald-600">1,580</td>
                <td className="p-3">
                  <span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-md font-bold text-[11px]">94.8%</span>
                </td>
              </tr>

              {/* Historical Shift C Login */}
              <tr className="hover:bg-slate-50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">OP</span>
                    <div>
                      <div className="font-semibold text-slate-800">OP-92415 (Manoj Kumar)</div>
                      <div className="text-[10px] text-slate-400">Logged out normally</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="font-semibold text-slate-800">QI-88312</div>
                  <span className="text-[10px] text-slate-400">Quality Inspector</span>
                </td>
                <td className="p-3">
                  <span className="bg-slate-100 text-slate-700 py-0.5 px-2 rounded-full text-[11px]">Shift C (22:00 - 06:00)</span>
                </td>
                <td className="p-3"><span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px]">Completed</span></td>
                <td className="p-3 font-bold text-blue-600">4.2 hrs</td>
                <td className="p-3 font-bold text-rose-600">13 min</td>
                <td className="p-3 font-bold text-emerald-600">840</td>
                <td className="p-3">
                  <span className="bg-amber-100 text-amber-800 py-0.5 px-2 rounded-md font-bold text-[11px]">91.4%</span>
                </td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-100 font-bold text-slate-800 border-t border-slate-200">
              <tr>
                <td colSpan={4} className="p-3 font-bold">Total Summary for {machine?.name || 'Machine'}</td>
                <td className="p-3 font-bold text-blue-600">18.4 hrs</td>
                <td className="p-3 font-bold text-rose-600">48 min</td>
                <td className="p-3 font-bold text-emerald-600">3,840 units</td>
                <td className="p-3"><span className="bg-emerald-200 text-emerald-900 py-0.5 px-2 rounded-md text-[11px] font-bold">94.1% Avg</span></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
