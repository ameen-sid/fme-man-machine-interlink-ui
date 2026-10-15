import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  Factory,
  ArrowLeft,
  MapPin,
  AlertCircle,
  Building2,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function GujratEmptyCncPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between bg-white p-3 px-4 rounded-2xl border border-slate-200 shadow-sm gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all shadow-sm"
          onClick={() => navigate('/machine-checksheet/Gujrat')}
          title="Back to Operational Sections"
        >
          <ArrowLeft size={16} />
          <span>Back to Sections</span>
        </button>



        <button
          type="button"
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl text-slate-600 text-xs font-bold cursor-pointer transition-all shadow-sm shadow-blue-500/20"
        // onClick={() => navigate('/machine-checksheet/Bawal/CNC')}
        >
          {/* <Factory size={15} /> */}
          <span>Gujrat Unit / C&C Section</span>
        </button>
      </div>

      {/* Main Empty State Content Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-amber-50/20 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-2xl">
          {/* Primary Heading */}
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0 mb-3">
            No Machines Added to Gujrat Unit
          </h2>
        </div>
      </div>
    </div>
  );
}