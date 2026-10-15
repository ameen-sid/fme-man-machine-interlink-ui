import React, { useState } from 'react';
import { AlertOctagon, ArrowLeft, Clock, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function BreakdownSummary({
  machine = { name: 'C&C 01', model: 'Alpha_355' },
  activeSession,
  onClose
}) {
  const [breakdownLogs] = useState([
    {
      id: 1,
      startTime: '07:15',
      endTime: '07:42',
      duration: '27 min',
      category: 'Mechanical / Tooling',
      issue: 'Crimping blade micro-chipping on terminal feed track',
      actionTaken: 'Replaced blade #4 with calibrated spare; test crimp height verified OK',
      technician: 'Tech-512 (Rajesh)',
      status: 'Resolved'
    },
    {
      id: 2,
      startTime: '11:20',
      endTime: '11:41',
      duration: '21 min',
      category: 'Pneumatic Pressure',
      issue: 'Air pressure regulator fluctuating below 0.5 MPa threshold',
      actionTaken: 'Cleared condensation drain filter valve; restored to 0.62 MPa steady',
      technician: 'Tech-208 (Amit)',
      status: 'Resolved'
    }
  ]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <AlertOctagon size={22} className="text-rose-600 bg-rose-50 p-2 rounded-xl w-10 h-10" />
          <div>
            <h3 className="text-base font-black text-slate-900 m-0">Machine Breakdown & Downtime Summary</h3>
            <p className="text-xs text-slate-500 m-0">
              Downtime incident logs, MTTR / MTBF telemetry & corrective actions for {machine?.name || 'Machine'}
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-4 flex flex-col justify-between border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-rose-700">
            <span>TOTAL BREAKDOWN TIME</span>
            <Clock size={18} />
          </div>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-black text-slate-900">48</span>
            <span className="text-xs font-bold text-slate-500">minutes</span>
          </div>
          <span className="text-[11px] text-slate-500">2 recorded incidents today</span>
        </div>

        <div className="rounded-2xl p-4 flex flex-col justify-between border border-amber-100 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-amber-700">
            <span>MTTR (MEAN TIME TO REPAIR)</span>
            <Wrench size={18} />
          </div>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-black text-slate-900">24</span>
            <span className="text-xs font-bold text-slate-500">min / incident</span>
          </div>
          <span className="text-[11px] text-slate-500">Target MTTR: &lt; 30 min</span>
        </div>

        <div className="rounded-2xl p-4 flex flex-col justify-between border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-blue-700">
            <span>MTBF (MEAN TIME BETWEEN FAILURES)</span>
            <Clock size={18} />
          </div>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-black text-slate-900">8.8</span>
            <span className="text-xs font-bold text-slate-500">hours</span>
          </div>
          <span className="text-[11px] text-slate-500">Above plant benchmark (7.5h)</span>
        </div>

        <div className="rounded-2xl p-4 flex flex-col justify-between border border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>MACHINE AVAILABILITY</span>
            <CheckCircle2 size={18} />
          </div>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-black text-slate-900">95.8</span>
            <span className="text-xs font-bold text-slate-500">%</span>
          </div>
          <span className="text-[11px] text-slate-500">Operational availability factor</span>
        </div>
      </div>

      {/* Breakdown Incident Log Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h4 className="text-sm font-bold text-slate-900 m-0">Shift Breakdown Event Log</h4>
          <span className="text-xs text-slate-500">Logged maintenance intervention history</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Time Range</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Failure Category</th>
                <th className="p-3">Issue Description</th>
                <th className="p-3">Corrective Action Taken</th>
                <th className="p-3">Maintenance Tech</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {breakdownLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-500">{log.id}</td>
                  <td className="p-3 font-semibold text-slate-800">{log.startTime} - {log.endTime}</td>
                  <td className="p-3 font-bold text-rose-600">{log.duration}</td>
                  <td className="p-3">
                    <span className="bg-rose-50 text-rose-700 py-0.5 px-2 rounded-full font-bold text-[11px]">
                      {log.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700 max-w-xs">{log.issue}</td>
                  <td className="p-3 text-slate-700 max-w-xs">{log.actionTaken}</td>
                  <td className="p-3 font-medium text-slate-900">{log.technician}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full font-bold text-[10px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
