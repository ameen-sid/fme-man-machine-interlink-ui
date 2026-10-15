import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Boxes } from 'lucide-react';

export default function AssemblyLayout({ selectedUnitLocation = 'Bawal' }) {
  const { unit } = useParams();
  const navigate = useNavigate();
  const currentUnit = unit || selectedUnitLocation;

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between bg-white p-3 px-4 rounded-2xl border border-slate-200 shadow-sm gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
          onClick={() => navigate(`/machine-checksheet/${currentUnit}`)}
          title="Back to Operational Units"
        >
          <ArrowLeft size={16} />
          <span>Back to Sections</span>
        </button>

        <div className="flex items-center gap-2 bg-slate-100 py-1.5 px-3.5 rounded-full text-xs font-medium">
          <span className="text-slate-500 font-semibold">{currentUnit} Unit</span>
          <span className="text-slate-400">/</span>
          <span className="text-emerald-700 font-bold">Assembly Section</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50/80 py-1.5 px-3.5 rounded-full w-max">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{currentUnit} Unit</span>
            <span className="text-emerald-300">•</span>
            <span>Assembly Section</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0">
            Assembly Line Section
          </h2>
          <p className="text-sm text-slate-500 m-0 max-w-3xl leading-relaxed">
            Machine Checksheet parameters, conveyor line inspection criteria and operational logs for{' '}
            <strong className="text-slate-700 font-semibold">Assembly Line</strong> in{' '}
            Assembly Section ({currentUnit} Plant).
          </p>
        </div>
      </div>
    </div>
  );
}
