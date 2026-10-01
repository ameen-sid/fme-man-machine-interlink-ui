import React, { useState, useMemo } from 'react';
import MachineChecksheet from './pages/MachineChecksheet';
import {
  Folder,
  Star,
  HardHat,
  BadgePercent,
  FileSpreadsheet,
  Globe,
  Bell,
  Settings,
  Download,
  ChevronDown
} from 'lucide-react';

// SVG Icon Helpers matching FME portal style
const Icons = {
  Home: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  LayoutDashboard: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  ClipboardList: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" /><path d="M12 16h4" /><circle cx="9" cy="11" r="1" /><circle cx="9" cy="16" r="1" />
    </svg>
  ),
  AlertOctagon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Sliders: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  Settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  LogOut: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Globe: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Moon: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Bell: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  RotateCcw: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Layers: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  TrendingUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Zap: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Wrench: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
};

// Base Machine Definitions
const BASE_MACHINES = [
  // Automatic Machines
  {
    id: 'M-AUTO-01',
    name: 'CNC Milling Center A1',
    type: 'automatic',
    model: 'RoboCut-5000',
    department: 'Quality',
    status: 'Running',
    base: { runtime: 7.2, production: 1450, outputRate: 201, breakdown: 0.3 }
  },
  {
    id: 'M-AUTO-02',
    name: 'Robotic Welding Cell 04',
    type: 'automatic',
    model: 'ArcWeld-ProX',
    department: 'Assembly',
    status: 'Running',
    base: { runtime: 6.5, production: 980, outputRate: 151, breakdown: 1.0 }
  },
  {
    id: 'M-AUTO-03',
    name: 'Auto Stamping & Press 02',
    type: 'automatic',
    model: 'HydraPress 200T',
    department: 'Press Shop',
    status: 'Maintenance',
    base: { runtime: 4.1, production: 620, outputRate: 151, breakdown: 3.4 }
  },
  {
    id: 'M-AUTO-04',
    name: 'High-Speed Packaging Line',
    type: 'automatic',
    model: 'PackMaster-90',
    department: 'Final Pack',
    status: 'Running',
    base: { runtime: 7.8, production: 3900, outputRate: 500, breakdown: 0.1 }
  },

  // Manual Machines
  {
    id: 'M-MAN-01',
    name: 'Precision Manual Lathe #3',
    type: 'manual',
    model: 'StandardTurn 400',
    department: 'Tool Room',
    status: 'Running',
    base: { runtime: 5.8, production: 180, outputRate: 31, breakdown: 0 }
  },
  {
    id: 'M-MAN-02',
    name: 'Manual Drill & Tapping Station',
    type: 'manual',
    model: 'BenchPro-24',
    department: 'Assembly',
    status: 'Running',
    base: { runtime: 6.4, production: 310, outputRate: 48, breakdown: 0 }
  },
  {
    id: 'M-MAN-03',
    name: 'Manual Hydraulic Assembly Press',
    type: 'manual',
    model: 'PressCraft Manual 50',
    department: 'Sub-Assembly',
    status: 'Idle',
    base: { runtime: 4.2, production: 160, outputRate: 38, breakdown: 0 }
  }
];

// Helper to generate dynamic single-day telemetry based on selected date & shift
function getMachineDataForDate(machine, dateStr, shift) {
  // Simple deterministic hash based on date string and machine id
  let hash = 0;
  const combined = `${dateStr}-${machine.id}`;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  const variance = ((Math.abs(hash) % 30) - 15) / 100; // -15% to +15% variance

  // Shift factors
  const shiftFactor = shift === 'A' ? 1.05 : shift === 'B' ? 0.95 : shift === 'C' ? 0.90 : 2.9;

  let runtimeToday = Number((machine.base.runtime * (shift === 'All' ? 2.8 : 1) * (1 + variance * 0.4)).toFixed(1));
  let totalProduction = Math.round(machine.base.production * shiftFactor * (1 + variance));
  let hourOfProduction = runtimeToday > 0 ? Math.round(totalProduction / runtimeToday) : machine.base.outputRate;
  
  let breakdownHours = 0;
  if (machine.type === 'automatic') {
    breakdownHours = Number((machine.base.breakdown * (shift === 'All' ? 2.2 : 1) * (1 + variance * 0.8)).toFixed(1));
    if (breakdownHours < 0) breakdownHours = 0;
  }

  // Cap runtime appropriately (max 8h per single shift, max 24h for all shifts)
  const maxRuntime = shift === 'All' ? 24 : 8;
  if (runtimeToday > maxRuntime) runtimeToday = maxRuntime;

  return {
    runtimeToday,
    totalProduction,
    hourOfProduction,
    breakdownHours
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState('machine-checksheet');
  const [selectedDate, setSelectedDate] = useState('2026-09-16');
  const [selectedShift, setSelectedShift] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecksheetActive, setIsChecksheetActive] = useState(false);

  // Format date for readable display like reference: "16-09-2026"
  const formattedDate = useMemo(() => {
    if (!selectedDate) return '16-09-2026';
    const parts = selectedDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return selectedDate;
  }, [selectedDate]);

  // Compute dynamic data per machine for the selected single day
  const machinesWithDayData = useMemo(() => {
    return BASE_MACHINES.map((machine) => {
      const dayMetrics = getMachineDataForDate(machine, selectedDate, selectedShift);
      return {
        ...machine,
        metrics: dayMetrics
      };
    });
  }, [selectedDate, selectedShift]);

  // Filter based on department and search
  const filteredMachines = useMemo(() => {
    return machinesWithDayData.filter((m) => {
      const deptMatch = selectedDepartment === 'All' || m.department === selectedDepartment;
      const searchMatch = !searchQuery.trim() || 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.model.toLowerCase().includes(searchQuery.toLowerCase());
      return deptMatch && searchMatch;
    });
  }, [machinesWithDayData, selectedDepartment, searchQuery]);

  // Separate automatic machines (4-bar graphs) and manual machines (3-bar graphs)
  const automaticMachines = useMemo(() => {
    return filteredMachines.filter(m => m.type === 'automatic');
  }, [filteredMachines]);

  const manualMachines = useMemo(() => {
    return filteredMachines.filter(m => m.type === 'manual');
  }, [filteredMachines]);

  // High-level aggregate KPIs for the selected date
  const summaryStats = useMemo(() => {
    let totalRuntime = 0;
    let totalProd = 0;
    let totalBreakdown = 0;

    filteredMachines.forEach((m) => {
      totalRuntime += m.metrics.runtimeToday;
      totalProd += m.metrics.totalProduction;
      if (m.type === 'automatic') {
        totalBreakdown += m.metrics.breakdownHours;
      }
    });

    const avgProductionRate = totalRuntime > 0 ? (totalProd / totalRuntime).toFixed(1) : '0';

    return {
      count: filteredMachines.length,
      totalRuntime: totalRuntime.toFixed(1),
      totalProd: totalProd.toLocaleString(),
      totalBreakdown: totalBreakdown.toFixed(1),
      avgProductionRate
    };
  }, [filteredMachines]);

  // Helper to render a machine bar card
  const renderMachineCard = (machine) => {
    const isAuto = machine.type === 'automatic';
    const data = machine.metrics;

    const runtimeBenchmark = selectedShift === 'All' ? 24 : 8;
    const runtimePercent = Math.min(100, Math.max(14, (data.runtimeToday / runtimeBenchmark) * 100));

    const prodBenchmark = isAuto 
      ? (selectedShift === 'All' ? 12000 : 4000) 
      : (selectedShift === 'All' ? 900 : 350);
    const prodPercent = Math.min(100, Math.max(14, (data.totalProduction / prodBenchmark) * 100));

    const hourProdBenchmark = isAuto ? 520 : 60;
    const hourProdPercent = Math.min(100, Math.max(14, (data.hourOfProduction / hourProdBenchmark) * 100));

    const breakdownBenchmark = selectedShift === 'All' ? 5 : 3;
    const breakdownPercent = Math.min(100, Math.max(data.breakdownHours > 0 ? 14 : 0, (data.breakdownHours / breakdownBenchmark) * 100));

    const statusBadge = machine.status === 'Running' 
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
      : machine.status === 'Maintenance'
        ? 'bg-rose-50 text-rose-700 border-rose-200'
        : 'bg-slate-100 text-slate-600 border-slate-200';

    const statusDot = machine.status === 'Running'
      ? 'bg-emerald-500'
      : machine.status === 'Maintenance'
        ? 'bg-rose-500'
        : 'bg-slate-400';

    return (
      <div key={machine.id} className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="p-4 px-5 border-b border-slate-100 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold py-0.5 px-2 rounded tracking-wide inline-flex items-center gap-1 ${
                isAuto ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {isAuto ? <Icons.Zap /> : <Icons.Wrench />}
                {isAuto ? '4-BAR GRAPH (AUTOMATIC)' : '3-BAR GRAPH (MANUAL)'}
              </span>
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 py-0.5 px-1.5 rounded">{machine.id}</span>
              <span className="text-[11px] text-slate-400 font-semibold">• {machine.department}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 m-0 mt-0.5">{machine.name}</h3>
            <span className="text-xs text-slate-500">{machine.model}</span>
          </div>

          <div className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11.5px] font-semibold border ${statusBadge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`}></span>
            <span>{machine.status}</span>
          </div>
        </div>

        {/* Chart Stage */}
        <div className="p-4 px-5 pb-2.5 flex flex-col">
          <div className="h-[200px] relative flex items-end pt-5 px-2.5 border-b border-slate-200">
            {/* Background Guidelines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-b border-dashed border-slate-200 h-0 flex items-center"><span className="text-[10px] text-slate-400 font-mono">100%</span></div>
              <div className="w-full border-b border-dashed border-slate-200 h-0 flex items-center"><span className="text-[10px] text-slate-400 font-mono">75%</span></div>
              <div className="w-full border-b border-dashed border-slate-200 h-0 flex items-center"><span className="text-[10px] text-slate-400 font-mono">50%</span></div>
              <div className="w-full border-b border-dashed border-slate-200 h-0 flex items-center"><span className="text-[10px] text-slate-400 font-mono">25%</span></div>
              <div className="w-full border-b border-dashed border-slate-200 h-0 flex items-center"><span className="text-[10px] text-slate-400 font-mono">0</span></div>
            </div>

            {/* Bar Cylinders Stage */}
            <div className="relative w-full h-full flex items-end justify-around z-10">
              {/* Bar 1: Runtime */}
              <div className="flex flex-col items-center gap-1 h-full justify-end w-12">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 py-0.5 px-1 rounded shadow-xs">{data.runtimeToday}h</span>
                <div className="w-6 h-[140px] bg-slate-100 rounded-t-md relative flex items-end overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-md transition-all duration-300" 
                    style={{ height: `${runtimePercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600">Runtime</span>
              </div>

              {/* Bar 2: Production */}
              <div className="flex flex-col items-center gap-1 h-full justify-end w-12">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 py-0.5 px-1 rounded shadow-xs">
                  {data.totalProduction > 999 
                    ? `${(data.totalProduction / 1000).toFixed(1)}k` 
                    : data.totalProduction}
                </span>
                <div className="w-6 h-[140px] bg-slate-100 rounded-t-md relative flex items-end overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-md transition-all duration-300" 
                    style={{ height: `${prodPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600">Production</span>
              </div>

              {/* Bar 3: Output / Hr */}
              <div className="flex flex-col items-center gap-1 h-full justify-end w-12">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 py-0.5 px-1 rounded shadow-xs">{data.hourOfProduction}/h</span>
                <div className="w-6 h-[140px] bg-slate-100 rounded-t-md relative flex items-end overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md transition-all duration-300" 
                    style={{ height: `${hourProdPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600">Hr Output</span>
              </div>

              {/* Bar 4: Breakdown (Only for Automatic) */}
              {isAuto && (
                <div className="flex flex-col items-center gap-1 h-full justify-end w-12">
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 py-0.5 px-1 rounded shadow-xs">{data.breakdownHours}h</span>
                  <div className="w-6 h-[140px] bg-slate-100 rounded-t-md relative flex items-end overflow-hidden">
                    <div 
                      className="w-full bg-gradient-to-t from-rose-700 to-rose-500 rounded-t-md transition-all duration-300" 
                      style={{ height: `${breakdownPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-rose-600">Breakdown</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Metadata Summary Table */}
        <div className="grid grid-cols-4 bg-slate-50 border-t border-slate-100 text-center py-2.5">
          <div className="flex flex-col border-r border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Runtime Today</span>
            <span className="text-xs font-bold text-slate-900">{data.runtimeToday} hrs</span>
          </div>
          <div className="flex flex-col border-r border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Production</span>
            <span className="text-xs font-bold text-slate-900">{data.totalProduction.toLocaleString()}</span>
          </div>
          <div className="flex flex-col border-r border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Hourly Rate</span>
            <span className="text-xs font-bold text-slate-900">{data.hourOfProduction} u/h</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Breakdown</span>
            {isAuto ? (
              <span className={`text-xs font-bold ${data.breakdownHours > 1 ? 'text-rose-600' : 'text-slate-900'}`}>
                {data.breakdownHours} hrs
              </span>
            ) : (
              <span className="text-xs font-medium text-slate-400">N/A</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 w-full">
      {/* Left Sidebar - hidden when checksheet is opened */}
      {!isChecksheetActive && (
        <aside className="w-64 min-w-[256px] h-screen sticky top-0 flex flex-col justify-between bg-white border-r border-slate-200 z-50 shadow-sm">
          <div className="flex flex-col">
            {/* FME Brand Wordmark Logo */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-100">
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors" title="Toggle sidebar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M9 3v18" />
                  <path d="m14 9-3 3 3 3" />
                </svg>
              </button>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-lg shadow-sm">
                <span className="text-white font-extrabold tracking-wider text-sm flex items-center">
                  <span className="text-white">F</span>
                  <span className="text-blue-200">m</span>
                  <span className="text-amber-300">e</span>
                </span>
                <span className="text-[10px] font-bold text-blue-100 tracking-wider uppercase ml-1">MMI</span>
              </div>
            </div>

            {/* Navigation Links - Matching exact reference design */}
            <nav className="flex flex-col gap-1 p-3">
              <button 
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all text-left" 
                onClick={() => setActiveTab('dashboard')}
              >
                <Icons.ArrowLeft />
                <span>Back to Main Menu</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'dashboard' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <Icons.LayoutDashboard />
                <span>Dashboard</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'dojo-hiring' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('dojo-hiring')}
              >
                <HardHat size={17} />
                <span>DOJO Hiring</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'departments' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('departments')}
              >
                <Folder size={17} />
                <span>Departments</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'skill-evaluation' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('skill-evaluation')}
              >
                <Star size={17} />
                <span>Skill Evaluation</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'multi-skilling' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('multi-skilling')}
              >
                <BadgePercent size={17} />
                <span>Multi Skilling</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'machine-checksheet' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('machine-checksheet')}
              >
                <Icons.ClipboardList />
                <span>Machine Checksheet</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'contractors' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('contractors')}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
                </svg>
                <span>Contractors</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'designations' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('designations')}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <circle cx="8" cy="12" r="2" />
                  <path d="M14 9h4M14 15h4" />
                </svg>
                <span>Designations</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  activeTab === 'test-paper' 
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('test-paper')}
              >
                <FileSpreadsheet size={17} />
                <span className="flex-1 text-left">Test Paper</span>
                <ChevronDown size={14} className="opacity-60" />
              </button>
            </nav>
          </div>

          <div className="p-3 border-t border-slate-100">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all text-left">
              <Icons.LogOut />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header / Breadcrumbs Bar - hidden when checksheet is opened */}
        {!isChecksheetActive && (
          <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="cursor-pointer hover:text-blue-600 flex items-center" onClick={() => setActiveTab('dashboard')}>
                <Icons.Home />
              </span>
              <span className="text-slate-300 font-bold">&gt;</span>
              <span className="font-semibold text-slate-800 capitalize">
                {activeTab === 'machine-checksheet'
                  ? 'Machine Checksheet'
                  : activeTab === 'operators'
                  ? 'Operators'
                  : activeTab === 'dashboard'
                  ? 'Dashboard'
                  : activeTab.replace('-', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50" title="Change Language">
                <Globe size={16} />
                <span className="text-xs font-bold">EN</span>
              </button>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors" title="Download">
                <Download size={16} />
              </button>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors" title="Settings">
                <Settings size={16} />
              </button>
              <button className="relative p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors" title="Notifications">
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
              </button>
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold text-xs shadow-sm cursor-pointer ml-1" title="User Profile - YY">
                YY
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className={isChecksheetActive ? 'w-full min-h-screen bg-slate-50' : 'flex-1 p-5 md:p-7 flex flex-col gap-6 w-full'}>
          {activeTab === 'machine-checksheet' || activeTab === 'operators' ? (
            <MachineChecksheet onChecksheetStateChange={setIsChecksheetActive} />
          ) : (
            <>
          {/* Title and Top Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Daily MMI Machine Operations</h1>
              <p className="text-xs font-medium text-slate-500">
                Operational date: <strong className="text-slate-700 font-bold">{formattedDate}</strong> — Live telemetry data per selected day and shift
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                <Icons.Calendar /> Date: {formattedDate}
              </span>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all">
                <Icons.Calendar /> Export Daily Log
              </button>
            </div>
          </div>

          {/* FME Standard Filter Toolbar with Date Selector */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Icons.Sliders />
                <span>Single Day Filters & Controls</span>
              </div>
              <button 
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors" 
                onClick={() => {
                  setSelectedDate('2026-09-16');
                  setSelectedShift('All');
                  setSelectedDepartment('All');
                  setSearchQuery('');
                }}
              >
                <Icons.RotateCcw /> Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Filter Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SELECT DATE</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400 pointer-events-none">
                    <Icons.Calendar />
                  </span>
                  <input 
                    type="date"
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Shift Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SHIFT SELECTION</label>
                <select 
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                >
                  <option value="All">All Shifts (A+B+C)</option>
                  <option value="A">Shift A (Morning)</option>
                  <option value="B">Shift B (Evening)</option>
                  <option value="C">Shift C (Night)</option>
                </select>
              </div>

              {/* Target Department Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TARGET DEPARTMENT</label>
                <select 
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="Quality">Quality</option>
                  <option value="Assembly">Assembly</option>
                  <option value="Press Shop">Press Shop</option>
                  <option value="Final Pack">Final Pack</option>
                  <option value="Tool Room">Tool Room</option>
                  <option value="Sub-Assembly">Sub-Assembly</option>
                </select>
              </div>

              {/* Search Bar */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SEARCH MACHINE</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400 pointer-events-none">
                    <Icons.Search />
                  </span>
                  <input 
                    type="text"
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    placeholder="Search Machine Name, ID, or Model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* High-Level Single Day KPI Summary Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border-l-4 border-l-blue-600 border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Icons.Clock />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL RUNTIME ({formattedDate})</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-extrabold text-slate-900">{summaryStats.totalRuntime}</span>
                  <span className="text-xs font-semibold text-slate-500">hrs</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-0.5">Total active runtime on selected date</span>
              </div>
            </div>

            <div className="bg-white border-l-4 border-l-emerald-500 border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Icons.Layers />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL PRODUCTION</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-extrabold text-slate-900">{summaryStats.totalProd}</span>
                  <span className="text-xs font-semibold text-slate-500">units</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-0.5">Produced volume on {formattedDate}</span>
              </div>
            </div>

            <div className="bg-white border-l-4 border-l-amber-500 border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Icons.TrendingUp />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AVG OUTPUT / HR</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-extrabold text-slate-900">{summaryStats.avgProductionRate}</span>
                  <span className="text-xs font-semibold text-slate-500">u/hr</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-0.5">Normalized throughput for selected date</span>
              </div>
            </div>

            <div className="bg-white border-l-4 border-l-rose-500 border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                <Icons.AlertTriangle />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">BREAKDOWN DOWNTIME</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-extrabold text-slate-900">{summaryStats.totalBreakdown}</span>
                  <span className="text-xs font-semibold text-slate-500">hrs</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-0.5">Automatic machines breakdown on date</span>
              </div>
            </div>
          </div>

          {/* Reference Color Legend Strip matching FME style */}
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="font-bold text-slate-700">
              <span>Graph Bar Parameter References ({formattedDate}):</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600 inline-block shadow-sm"></span>
                <span>Runtime (hrs)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500 inline-block shadow-sm"></span>
                <span>Production (units)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500 inline-block shadow-sm"></span>
                <span>Hour Output Rate (u/h)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500 inline-block shadow-sm"></span>
                <span>Breakdown (hrs) - <strong className="text-slate-800 font-bold">Automatic Only</strong></span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 1: AUTOMATIC MACHINES (4-BAR GRAPHS) */}
          {/* ======================================================== */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-5 py-3.5 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Icons.Zap />
                </span>
                <div>
                  <h2 className="text-base font-bold tracking-tight text-white">Automatic Machines (4-Bar Graphs)</h2>
                  <p className="text-xs text-blue-100 font-medium">
                    Includes: 1. Runtime &bull; 2. Production &bull; 3. Hourly Output &bull; 4. Breakdown Downtime
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                {automaticMachines.length} Machines
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {automaticMachines.length === 0 ? (
                <div className="col-span-full bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Icons.AlertTriangle />
                  <h3 className="text-base font-bold text-slate-700">No automatic machines match the criteria</h3>
                  <p className="text-xs text-slate-500">Check your search query or department filter.</p>
                </div>
              ) : (
                automaticMachines.map((machine) => renderMachineCard(machine))
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: MANUAL MACHINES (3-BAR GRAPHS) */}
          {/* ======================================================== */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white px-5 py-3.5 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Icons.Wrench />
                </span>
                <div>
                  <h2 className="text-base font-bold tracking-tight text-white">Manual Machines (3-Bar Graphs)</h2>
                  <p className="text-xs text-emerald-100 font-medium">
                    Includes: 1. Runtime &bull; 2. Production &bull; 3. Hourly Output (Breakdown not tracked)
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                {manualMachines.length} Machines
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {manualMachines.length === 0 ? (
                <div className="col-span-full bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Icons.AlertTriangle />
                  <h3 className="text-base font-bold text-slate-700">No manual machines match the criteria</h3>
                  <p className="text-xs text-slate-500">Check your search query or department filter.</p>
                </div>
              ) : (
                manualMachines.map((machine) => renderMachineCard(machine))
              )}
            </div>
          </div>
          </>
          )}
        </main>
      </div>
    </div>
  );
}
