import React from 'react';
import { AlertCircle, ArrowLeft, Cpu, FileClock, ShieldAlert, Wrench } from 'lucide-react';

export default function ChecksheetNotAdded({
  machine = { name: 'Machine', model: 'Unknown Model' },
  checksheetName = 'Checksheet',
  onClose
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col items-center text-center max-w-2xl mx-auto my-6">
      <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-5 shadow-sm">
        <FileClock size={42} />
      </div>

      <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
        <AlertCircle size={14} />
        <span>Checksheet Pending Configuration</span>
      </div>

      <h2 className="text-2xl font-black text-slate-900 tracking-tight m-0 mb-2">
        {checksheetName} Not Added
      </h2>

      <p className="text-sm text-slate-600 max-w-lg leading-relaxed mb-6">
        The digital checksheet template for <strong className="text-slate-900 font-bold">{machine.name}</strong> (Model: <span className="font-bold text-blue-600">{machine.model}</span>) is not yet configured in the system. Checksheet templates are currently active for <strong className="text-slate-800">Alpha_355</strong>, <strong className="text-slate-800">TRD_301</strong>, and <strong className="text-slate-800">TRD_411F</strong> machine series.
      </p>

      {/* Machine Details Card */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-7 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Cpu size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Target Equipment</div>
            <div className="text-sm font-black text-slate-900">{machine.name}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Wrench size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Equipment Series</div>
            <div className="text-sm font-black text-slate-900">{machine.model}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Audit Status</div>
            <div className="text-sm font-black text-amber-600">Pending Upload</div>
          </div>
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl border border-blue-600 bg-blue-600 text-white text-xs font-bold cursor-pointer hover:bg-blue-700 transition-all shadow-sm hover:shadow"
        >
          <ArrowLeft size={16} />
          <span>Back to Checksheets Menu</span>
        </button>
      )}
    </div>
  );
}
