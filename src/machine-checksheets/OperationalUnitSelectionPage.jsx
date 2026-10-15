import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Cpu,
  Boxes,
  Building2,
  MapPin,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Factory
} from 'lucide-react';

const SUB_SIDEBAR_ITEMS = [
  {
    id: 'CNC',
    label: 'CNC',
    fullName: 'CNC Machining Section',
    description: '31 high-precision cutting, stripping & crimping machines',
    icon: Cpu,
    color: '#0284c7',
    bg: '#e0f2fe'
  },
  {
    id: 'Assembly',
    label: 'Assembly',
    fullName: 'Assembly Line Section',
    description: 'Conveyor lines, sub-assembly cells & terminal insertion fixtures',
    icon: Boxes,
    color: '#10b981',
    bg: '#d1fae5'
  },
  {
    id: 'SRC',
    label: 'SRC',
    fullName: 'SRC Inspection & Quality',
    description: 'Secondary retention clip inspection, visual QA & electrical continuity',
    icon: Building2,
    color: '#8b5cf6',
    bg: '#ede9fe'
  }
];

export default function OperationalUnitSelectionPage() {
  const { unit } = useParams();
  const navigate = useNavigate();
  const selectedUnitLocation = unit || 'Bawal';

  const handleUnitChange = (newUnit) => {
    if (newUnit) {
      navigate(`/machine-checksheet/${newUnit}`);
    } else {
      navigate('/machine-checksheet');
    }
  };

  const handleSelectSection = (sectionId) => {
    navigate(`/machine-checksheet/${selectedUnitLocation}/${sectionId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
      {/* Sub Sidebar */}
      <aside className="w-full lg:w-[280px] lg:min-w-[280px] bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm lg:sticky lg:top-20">
        {/* Unit Location Dropdown Filter */}
        <div className="flex flex-col gap-1.5 pb-3.5 border-b border-slate-100">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <MapPin size={13} className="text-blue-600" />
            <span>SELECT UNIT</span>
          </label>
          <div className="relative flex items-center w-full">
            <select
              className="w-full appearance-none bg-slate-50 border-[1.5px] border-slate-200 rounded-xl py-2 pl-3 pr-8 text-sm font-bold text-slate-900 cursor-pointer outline-none hover:bg-white hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              value={selectedUnitLocation}
              onChange={(e) => handleUnitChange(e.target.value)}
            >
              <option value="Bawal">Bawal Unit</option>
              <option value="Gujrat">Gujrat Unit</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 pointer-events-none text-slate-500" />
          </div>
        </div>

        {/* Operational Units List */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">OPERATIONAL UNITS</span>
          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 py-0.5 px-2 rounded-full">{selectedUnitLocation}</span>
        </div>

        <div className="flex flex-col gap-2">
          {SUB_SIDEBAR_ITEMS.map((item) => {
            const ItemIcon = item.icon;
            return (
              <button
                key={item.id}
                className="w-full border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 rounded-xl p-3 flex items-center justify-between cursor-pointer text-left transition-all"
                onClick={() => handleSelectSection(item.id)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color
                    }}
                  >
                    <ItemIcon size={16} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13.5px] font-bold text-slate-800 whitespace-nowrap">{item.label}</span>
                    <span className="text-[11px] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">{item.fullName}</span>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <ChevronRight size={14} className="text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 w-full">
       

        {/* Center Prompt */}
<div className="flex items-center justify-center  h-[420px]">
  <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-[680px] w-full h-full text-center shadow-sm flex flex-col items-center justify-center gap-2.5">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
              <Factory size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 m-0">
              Please Select a Section for {selectedUnitLocation} Unit
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed m-0">
              Select an operational section (CNC, Assembly, or SRC) below to view its machine checksheets and real-time telemetry.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}
