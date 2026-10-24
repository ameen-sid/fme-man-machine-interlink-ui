import React from 'react';
import {
  Cpu,
  UserCheck,
  LogOut,
  ChevronRight,
  Users,
  ClipboardCheck,
  CalendarCheck2,
  Gauge,
  ShieldAlert,
  BarChart3,
  FileSpreadsheet,
  AlertOctagon,
  Wrench,
  Activity,
  ArrowLeft
} from 'lucide-react';

export const OPERATIONAL_CHECKSHEETS = [
  {
    id: 'op_machine_summary',
    name: 'Operator & Machine Summary',
    shortDesc: 'Total runtime, breakdowns, outputs & operator login sessions',
    icon: Users,
    color: '#059669',
    bg: '#d1fae5'
  },
  {
    id: '5s',
    name: 'Machine 5S checksheet',
    shortDesc: '5S Check Point - Sort, Set, Shine, Standardize & Sustain (CHK-5S-03 Rev 01)',
    icon: ClipboardCheck,
    color: '#0284c7',
    bg: '#e0f2fe'
  },
  {
    id: 'daily',
    name: 'Machine Daily checksheet',
    shortDesc: 'Daily Machine Check Sheet & Abnormality Action (CHK-WH-MT-003 Rev 07)',
    icon: CalendarCheck2,
    color: '#10b981',
    bg: '#d1fae5'
  },
  {
    id: 'instrument',
    name: 'Machine Instrument checksheet',
    shortDesc: 'Instrument Check Sheet - Plunger, Blade Micrometer & Scale (FRM-WH-QA-046 Shifts A,B,C)',
    icon: Gauge,
    color: '#f59e0b',
    bg: '#fef3c7'
  },
  {
    id: 'pokayoke',
    name: 'Machine Pokayoke checksheet',
    shortDesc: 'Poka-Yoke Daily Verification & Inspection Sheet (FFM-WH-QA-096 Shift A & B)',
    icon: ShieldAlert,
    color: '#ef4444',
    bg: '#fee2e2'
  },
  {
    id: 'cc_summary',
    name: 'C&C process production status summary',
    shortDesc: 'Hourly output tracking, cycle rates, rejects & lot status summary',
    icon: BarChart3,
    color: '#0d9488',
    bg: '#ccfbf1'
  },
  {
    id: 'inspection_report',
    name: 'Inspection report',
    shortDesc: 'Daily Record of Cutting and Crimping Operation (FRM-QC-PS-244 Rev 01.07.2024)',
    icon: FileSpreadsheet,
    color: '#6366f1',
    bg: '#e0e7ff'
  },
  {
    id: 'breakdown_summary',
    name: 'Machine Breakdown Summary',
    shortDesc: 'Daily Maintenance Log book & 5M Change record (FRM-WH-QA-241 Rev 02)',
    icon: AlertOctagon,
    color: '#e11d48',
    bg: '#ffe4e6'
  },
  {
    id: 'pm',
    name: 'Machine PM checksheet',
    shortDesc: 'Monthly & Periodic PM Check Sheet (Furukawa Minda Electric CHK-WH-MT-043 Rev 19)',
    icon: Wrench,
    color: '#8b5cf6',
    bg: '#ede9fe'
  }
];

export const RESISTANCE_WELDING_CHECKSHEETS = [
  {
    id: '5s',
    name: 'Machine 5S checksheet',
    shortDesc: '5S Check Point - Sort, Set, Shine, Standardize & Sustain (CHK-5S-03 Rev 01)',
    icon: ClipboardCheck,
    color: '#0284c7',
    bg: '#e0f2fe'
  },
  {
    id: 'daily',
    name: 'Machine Daily checksheet',
    shortDesc: 'Daily Machine Check Sheet & Abnormality Action (CHK-WH-MT-003 Rev 07)',
    icon: CalendarCheck2,
    color: '#10b981',
    bg: '#d1fae5'
  },
  {
    id: 'instrument',
    name: 'Machine Instrument checksheet',
    shortDesc: 'Instrument Check Sheet - Plunger, Blade Micrometer & Scale (FRM-WH-QA-046 Shifts A,B,C)',
    icon: Gauge,
    color: '#f59e0b',
    bg: '#fef3c7'
  },
  {
    id: 'inspection_report',
    name: 'Inspection report',
    shortDesc: 'Daily Record of Cutting and Crimping Operation (FRM-QC-PS-244 Rev 01.07.2024)',
    icon: FileSpreadsheet,
    color: '#6366f1',
    bg: '#e0e7ff'
  },
  {
    id: 'pm',
    name: 'Machine PM checksheet',
    shortDesc: 'Monthly & Periodic PM Check Sheet (Furukawa Minda Electric CHK-WH-MT-043 Rev 19)',
    icon: Wrench,
    color: '#8b5cf6',
    bg: '#ede9fe'
  },
  {
    id: 'predictive',
    name: 'Predictive Maintenance checksheet',
    shortDesc: 'Predictive Maintenance Check Sheet (Furukawa Minda Electric CHK-WH-MT-101 Rev 00)',
    icon: Activity,
    color: '#0d9488',
    bg: '#ccfbf1'
  }
];

export const MANUAL_CRIMPING_CHECKSHEETS = [
  {
    id: '5s',
    name: 'Machine 5S checksheet',
    shortDesc: '5S Check Point - Sort, Set, Shine, Standardize & Sustain (CHK-5S-03 Rev 01)',
    icon: ClipboardCheck,
    color: '#0284c7',
    bg: '#e0f2fe'
  },
  {
    id: 'inspection_report',
    name: 'Inspection format checksheet',
    shortDesc: 'Daily Record of Terminal Fitting Operation (FRM-WH-PE-262 Rev.13)',
    icon: FileSpreadsheet,
    color: '#6366f1',
    bg: '#e0e7ff'
  },
  {
    id: 'instrument',
    name: 'Machine Instrument checksheet',
    shortDesc: 'Instrument Check Sheet - Point & Blade Micrometer, Measuring Scale (FRM-WH-QA-046)',
    icon: Gauge,
    color: '#f59e0b',
    bg: '#fef3c7'
  },
  {
    id: 'daily',
    name: 'Machine Daily checksheet',
    shortDesc: 'Daily Machine Check Sheet & Abnormality Observation (CHK-VM-MT-105 Rev 01)',
    icon: CalendarCheck2,
    color: '#10b981',
    bg: '#d1fae5'
  },
  {
    id: 'pm',
    name: 'Machine PM checksheet',
    shortDesc: 'Monthly & Periodic PM Check Sheet with Observation Switcher (CHK-WH-MT-043 Rev 19)',
    icon: Wrench,
    color: '#8b5cf6',
    bg: '#ede9fe'
  },
  {
    id: 'preventive_pm',
    name: 'Monthly and Periodic Preventive Checksheet',
    shortDesc: 'Monthly & Periodic Preventive Maintenance Check Sheet (CHK-WH-MT-043 Rev 19)',
    icon: Activity,
    color: '#0d9488',
    bg: '#ccfbf1'
  },
  {
    id: 'mecal_daily',
    name: 'Mecal-05 Daily Checksheet',
    shortDesc: 'Mecal-05 Manual Crimping Press Daily Checksheet & Abnormality Log',
    icon: CalendarCheck2,
    color: '#059669',
    bg: '#d1fae5'
  }
];

export default function OperationalChecksheets({
  selectedMachine,
  machineModel,
  activeTab = 'Auto Crimping',
  selectedUnitLocation = 'Bawal',
  activeSession,
  selectedChecksheet,
  onSelectChecksheet,
  onLogout,
  onBack
}) {
  const isResistanceWelding =
    activeTab === 'Resistance Welding' ||
    selectedMachine?.process === 'Resistance Welding' ||
    (selectedMachine?.name && (
      selectedMachine.name.includes('R/SW') ||
      selectedMachine.name.includes('R-SW') ||
      selectedMachine.name.includes('RSW')
    )) ||
    (selectedMachine?.model && selectedMachine.model.startsWith('Machine'));

  const isManualCrimping =
    activeTab === 'Manual Crimping' ||
    selectedMachine?.process === 'Manual Crimping' ||
    (selectedMachine?.name && (
      selectedMachine.name === 'MCR' ||
      selectedMachine.name.startsWith('MCR') ||
      selectedMachine.name.includes('MCR')
    )) ||
    (selectedMachine?.model && selectedMachine.model.toLowerCase().includes('mecal'));

  const checksheetsList = isManualCrimping
    ? MANUAL_CRIMPING_CHECKSHEETS
    : isResistanceWelding
    ? RESISTANCE_WELDING_CHECKSHEETS
    : OPERATIONAL_CHECKSHEETS;
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-all shadow-sm shrink-0"
              onClick={onBack}
              title="Back to Machines Overview"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          )}
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-black text-slate-900 m-0 mt-1">Operational Checksheets</h2>
            <p className="text-xs text-slate-500 m-0">
              Select a checksheet below to open and record inspection values for <strong>{selectedMachine?.name}</strong> in full screen.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {activeSession && (
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 py-1.5 px-3 rounded-full text-xs font-semibold">
              <UserCheck size={14} className="text-emerald-600" />
              <span>Op: <strong>{activeSession.operatorCardNo}</strong></span>
              <span className="text-emerald-300">•</span>
              <span>QI: <strong>{activeSession.inspectorCardNo}</strong></span>
            </div>
          )}
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-full">● Online & Ready</span>
          {onLogout && (
            <button
              className="inline-flex items-center gap-1.5 text-xs font-bold py-1.5 px-3.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer transition-all shadow-sm"
              onClick={onLogout}
              title="Logout and return to Machines"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Checksheets Cards Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${isResistanceWelding ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : isManualCrimping ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-4'} gap-4`}>
        {checksheetsList.map((cs, idx) => {
          const CsIcon = cs.icon;
          const isSelected = selectedChecksheet === cs.name;
          return (
            <div
              key={cs.id}
              className={`bg-white border rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md ${isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 shadow-sm'
                }`}
              onClick={() => onSelectChecksheet && onSelectChecksheet(cs.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] font-extrabold text-slate-400 bg-slate-50 py-0.5 px-2 rounded-md">0{idx + 1}</div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: cs.bg, color: cs.color }}
                >
                  <CsIcon size={22} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mb-4">
                <div className="flex items-start justify-between gap-1.5 flex-wrap">
                  <h4 className="text-sm font-bold text-slate-900 m-0 leading-snug">{cs.name}</h4>
                  {cs.id === 'pm' && (
                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 py-0.5 px-1.5 rounded border border-purple-200">
                      CHK-WH-MT-043
                    </span>
                  )}
                  {cs.id === 'inspection_report' && (
                    <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 py-0.5 px-1.5 rounded border border-indigo-200">
                      FRM-QC-PS-244
                    </span>
                  )}
                  {cs.id === 'pokayoke' && (
                    <span className="text-[10px] font-extrabold text-red-700 bg-red-50 py-0.5 px-1.5 rounded border border-red-200">
                      FFM-WH-QA-096
                    </span>
                  )}
                  {cs.id === 'instrument' && (
                    <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 py-0.5 px-1.5 rounded border border-amber-200">
                      FRM-WH-QA-046
                    </span>
                  )}
                  {cs.id === 'daily' && (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 py-0.5 px-1.5 rounded border border-emerald-200">
                      CHK-WH-MT-003
                    </span>
                  )}
                  {cs.id === '5s' && (
                    <span className="text-[10px] font-extrabold text-sky-700 bg-sky-50 py-0.5 px-1.5 rounded border border-sky-200">
                      CHK-5S-03
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed m-0">
                  {cs.shortDesc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-blue-600">
                <span>Open Checksheet</span>
                <ChevronRight size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
