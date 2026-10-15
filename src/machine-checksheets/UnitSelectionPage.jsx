import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Factory,
  MapPin,
  ChevronDown,
  ChevronRight,
  Building2,
} from "lucide-react";

export default function UnitSelectionPage() {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState("");

  const handleUnitChange = (val) => {
    setSelectedUnit(val);
    if (val) {
      navigate(`/machine-checksheet/${val}`);
    }
  };

  const units = [
    {
      id: "Bawal",
      name: "Bawal Unit",
      location: "Haryana, India",
      sections: [
        "CNC Machining (31 Machines)",
        "Assembly Lines",
        "SRC Quality Hub",
      ],
      badge: "Primary Plant",
    },
    {
      id: "Gujrat",
      name: "Gujrat Unit",
      location: "Gujarat, India",
      sections: [
        "CNC Wire Harnessing",
        "Sub-Assembly Cells",
        "Inspection Labs",
      ],
      badge: "Expansion Facility",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
      {/* Sub Sidebar: Select Unit */}
      <aside className="w-full lg:w-[280px] lg:min-w-[280px] bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col gap-1.5 pb-4 border-b border-slate-100">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <MapPin size={13} className="text-blue-600" />
            <span>SELECT UNIT</span>
          </label>
          <div className="relative flex items-center w-full">
            <select
              className="w-full appearance-none bg-slate-50 border-[1.5px] border-slate-200 rounded-xl py-2 pl-3 pr-8 text-sm font-bold text-slate-900 cursor-pointer outline-none hover:bg-white hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              value={selectedUnit}
              onChange={(e) => handleUnitChange(e.target.value)}
            >
              <option value="">-- Choose Unit --</option>
              <option value="Bawal">Bawal Unit</option>
              <option value="Gujrat">Gujrat Unit</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 pointer-events-none text-slate-500"
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 gap-2">
          <Factory size={22} className="text-slate-400" />
          <p className="text-[13px] font-bold text-slate-700 m-0">
            No Unit Selected
          </p>
          <p className="text-[11.5px] text-slate-500 leading-snug m-0">
            Please select a unit from the dropdown above to view operational
            units.
          </p>
        </div>
      </aside>

      {/* Main Area: Big Unit Selector Prompt & Cards */}
      <div className="flex-1 flex flex-col gap-6 w-full">
        <div className="flex items-center justify-center h-[420px]">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-[680px] w-full h-full text-center shadow-sm flex flex-col items-center justify-center gap-2.5">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
              <Factory size={36} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 m-0">
              Please Select a Plant / Unit
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed m-0">
              Choose either Bawal or Gujrat unit from the sidebar dropdown or
              click one of the facilities below to view available operational
              sections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
