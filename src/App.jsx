import React, { useState, useMemo } from 'react';
import './App.css';
import OperatorsPage from './OperatorsPage';
import {
  Folder,
  Star,
  Users2,
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
  const shiftMultiplier = shift === 'All' ? 3 : 1;
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

    return (
      <div key={machine.id} className="machine-fme-card">
        {/* Header */}
        <div className="card-header-bar">
          <div className="machine-title-box">
            <div className="badge-row">
              <span className={`type-badge ${isAuto ? 'auto' : 'manual'}`}>
                {isAuto ? <Icons.Zap /> : <Icons.Wrench />}
                {isAuto ? '4-BAR GRAPH (AUTOMATIC)' : '3-BAR GRAPH (MANUAL)'}
              </span>
              <span className="machine-code-tag">{machine.id}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>• {machine.department}</span>
            </div>
            <h3 className="machine-card-name">{machine.name}</h3>
            <span className="machine-card-model">{machine.model}</span>
          </div>

          <div className={`card-status-pill ${machine.status.toLowerCase()}`}>
            <span className="status-dot-circle"></span>
            <span>{machine.status}</span>
          </div>
        </div>

        {/* Chart Stage */}
        <div className="chart-body">
          <div className="chart-stage">
            {/* Background Guidelines */}
            <div className="stage-guidelines">
              <div className="guide-row"><span>100%</span></div>
              <div className="guide-row"><span>75%</span></div>
              <div className="guide-row"><span>50%</span></div>
              <div className="guide-row"><span>25%</span></div>
              <div className="guide-row"><span>0</span></div>
            </div>

            {/* Bar Cylinders Stage */}
            <div className="bars-container">
              {/* Bar 1: Runtime */}
              <div className="bar-col">
                <span className="bar-val-bubble">{data.runtimeToday}h</span>
                <div className="bar-cylinder">
                  <div 
                    className="bar-filled-part blue" 
                    style={{ height: `${runtimePercent}%` }}
                  />
                </div>
                <span className="bar-name-label">Runtime</span>
              </div>

              {/* Bar 2: Production */}
              <div className="bar-col">
                <span className="bar-val-bubble">
                  {data.totalProduction > 999 
                    ? `${(data.totalProduction / 1000).toFixed(1)}k` 
                    : data.totalProduction}
                </span>
                <div className="bar-cylinder">
                  <div 
                    className="bar-filled-part emerald" 
                    style={{ height: `${prodPercent}%` }}
                  />
                </div>
                <span className="bar-name-label">Production</span>
              </div>

              {/* Bar 3: Output / Hr */}
              <div className="bar-col">
                <span className="bar-val-bubble">{data.hourOfProduction}/h</span>
                <div className="bar-cylinder">
                  <div 
                    className="bar-filled-part amber" 
                    style={{ height: `${hourProdPercent}%` }}
                  />
                </div>
                <span className="bar-name-label">Hr Output</span>
              </div>

              {/* Bar 4: Breakdown (Only for Automatic) */}
              {isAuto && (
                <div className="bar-col">
                  <span className="bar-val-bubble alert">{data.breakdownHours}h</span>
                  <div className="bar-cylinder">
                    <div 
                      className="bar-filled-part rose" 
                      style={{ height: `${breakdownPercent}%` }}
                    />
                  </div>
                  <span className="bar-name-label" style={{ color: 'var(--fme-rose)' }}>Breakdown</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Metadata Summary Table */}
        <div className="card-footer-metrics">
          <div className="footer-metric-cell">
            <span className="f-metric-label">Runtime Today</span>
            <span className="f-metric-val">{data.runtimeToday} hrs</span>
          </div>
          <div className="footer-metric-cell">
            <span className="f-metric-label">Production</span>
            <span className="f-metric-val">{data.totalProduction.toLocaleString()}</span>
          </div>
          <div className="footer-metric-cell">
            <span className="f-metric-label">Hourly Rate</span>
            <span className="f-metric-val">{data.hourOfProduction} u/h</span>
          </div>
          <div className="footer-metric-cell">
            <span className="f-metric-label">Breakdown</span>
            {isAuto ? (
              <span className={`f-metric-val ${data.breakdownHours > 1 ? 'danger' : ''}`}>
                {data.breakdownHours} hrs
              </span>
            ) : (
              <span className="f-metric-val muted">N/A (Manual)</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-shell">
      {/* Left Sidebar */}
      <aside className="app-sidebar">
        <div className="sidebar-top">
          {/* FME Brand Wordmark Logo */}
          <div className="sidebar-logo-container">
            <button className="sidebar-toggle-btn" title="Toggle sidebar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M9 3v18" />
                <path d="m14 9-3 3 3 3" />
              </svg>
            </button>
            <div className="fme-logo-badge">
              <span className="fme-logo-text">
                <span className="fme-f">F</span>
                <span className="fme-m">m</span>
                <span className="fme-e">e</span>
              </span>
            </div>
          </div>

          {/* Navigation Links - Matching exact reference design */}
          <nav className="sidebar-nav">
            <button className="nav-item back-menu" onClick={() => setActiveTab('dashboard')}>
              <Icons.ArrowLeft />
              <span>Back to Main Menu</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Icons.LayoutDashboard />
              <span>Dashboard</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'dojo-hiring' ? 'active' : ''}`}
              onClick={() => setActiveTab('dojo-hiring')}
            >
              <HardHat size={17} />
              <span>DOJO Hiring</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'departments' ? 'active' : ''}`}
              onClick={() => setActiveTab('departments')}
            >
              <Folder size={17} />
              <span>Departments</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'skill-evaluation' ? 'active' : ''}`}
              onClick={() => setActiveTab('skill-evaluation')}
            >
              <Star size={17} />
              <span>Skill Evaluation</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'multi-skilling' ? 'active' : ''}`}
              onClick={() => setActiveTab('multi-skilling')}
            >
              <BadgePercent size={17} />
              <span>Multi Skilling</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'machine-checksheet' ? 'active' : ''}`}
              onClick={() => setActiveTab('machine-checksheet')}
            >
              <Icons.ClipboardList />
              <span>Machine Checksheet</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'contractors' ? 'active' : ''}`}
              onClick={() => setActiveTab('contractors')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
              </svg>
              <span>Contractors</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'designations' ? 'active' : ''}`}
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
              className={`nav-item ${activeTab === 'test-paper' ? 'active' : ''}`}
              onClick={() => setActiveTab('test-paper')}
            >
              <FileSpreadsheet size={17} />
              <span style={{ flex: 1, textAlign: 'left' }}>Test Paper</span>
              <ChevronDown size={14} style={{ opacity: 0.6 }} />
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item logout">
            <Icons.LogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Work Area */}
      <div className="app-main">
        {/* Top Header / Breadcrumbs Bar */}
        <header className="top-header">
          <div className="breadcrumb-area">
            <span className="breadcrumb-home" onClick={() => setActiveTab('dashboard')}>
              <Icons.Home />
            </span>
            <span className="breadcrumb-sep">&gt;</span>
            <span className="breadcrumb-current">
              {activeTab === 'machine-checksheet'
                ? 'Machine Checksheet'
                : activeTab === 'operators'
                ? 'Operators'
                : activeTab === 'dashboard'
                ? 'Dashboard'
                : activeTab.replace('-', ' ')}
            </span>
          </div>

          <div className="top-header-right">
            <button className="action-icon-btn" title="Change Language">
              <Globe size={16} />
              <span style={{ marginLeft: 5, fontSize: 12 }}>EN</span>
            </button>
            <button className="action-icon-btn" title="Download">
              <Download size={16} />
            </button>
            <button className="action-icon-btn" title="Settings">
              <Settings size={16} />
            </button>
            <button className="action-icon-btn" title="Notifications">
              <Bell size={16} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-avatar-pill" title="User Profile - YY">
              YY
              <span className="user-avatar-dot"></span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {activeTab === 'machine-checksheet' || activeTab === 'operators' ? (
            <OperatorsPage />
          ) : (
            <>
          {/* Title and Top Actions */}
          <div className="page-title-row">
            <div className="page-title-group">
              <h1>Daily MMI Machine Operations</h1>
              <p>Operational date: <strong>{formattedDate}</strong> — Live telemetry data per selected day and shift</p>
            </div>
            <div className="header-action-buttons">
              <span className="date-indicator-badge">
                <Icons.Calendar /> Date: {formattedDate}
              </span>
              <button className="btn-primary-blue">
                <Icons.Calendar /> Export Daily Log
              </button>
            </div>
          </div>

          {/* FME Standard Filter Toolbar with Date Selector */}
          <div className="fme-filter-card">
            <div className="filter-header-bar">
              <div className="filter-header-title">
                <Icons.Sliders />
                <span>Single Day Filters & Controls</span>
              </div>
              <button 
                className="btn-outline-action" 
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

            <div className="filter-controls-row">
              {/* Date Filter Picker */}
              <div className="filter-item">
                <label className="filter-label">SELECT DATE</label>
                <div className="clean-input-with-icon">
                  <span className="input-icon">
                    <Icons.Calendar />
                  </span>
                  <input 
                    type="date"
                    className="clean-input date-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Shift Filter */}
              <div className="filter-item">
                <label className="filter-label">SHIFT SELECTION</label>
                <select 
                  className="clean-select"
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
              <div className="filter-item">
                <label className="filter-label">TARGET DEPARTMENT</label>
                <select 
                  className="clean-select"
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
              <div className="filter-item" style={{ flex: 1, minWidth: 220 }}>
                <label className="filter-label">SEARCH MACHINE</label>
                <div className="clean-input-with-icon">
                  <span className="input-icon">
                    <Icons.Search />
                  </span>
                  <input 
                    type="text"
                    className="clean-input"
                    style={{ width: '100%' }}
                    placeholder="Search Machine Name, ID, or Model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* High-Level Single Day KPI Summary Overview */}
          <div className="kpi-row">
            <div className="kpi-card blue">
              <div className="kpi-icon-box">
                <Icons.Clock />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">TOTAL RUNTIME ({formattedDate})</span>
                <div className="kpi-val-group">
                  <span className="kpi-value">{summaryStats.totalRuntime}</span>
                  <span className="kpi-unit">hrs</span>
                </div>
                <span className="kpi-sub">Total active runtime on selected date</span>
              </div>
            </div>

            <div className="kpi-card emerald">
              <div className="kpi-icon-box">
                <Icons.Layers />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">TOTAL PRODUCTION</span>
                <div className="kpi-val-group">
                  <span className="kpi-value">{summaryStats.totalProd}</span>
                  <span className="kpi-unit">units</span>
                </div>
                <span className="kpi-sub">Produced volume on {formattedDate}</span>
              </div>
            </div>

            <div className="kpi-card amber">
              <div className="kpi-icon-box">
                <Icons.TrendingUp />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">AVG OUTPUT / HR</span>
                <div className="kpi-val-group">
                  <span className="kpi-value">{summaryStats.avgProductionRate}</span>
                  <span className="kpi-unit">u/hr</span>
                </div>
                <span className="kpi-sub">Normalized throughput for selected date</span>
              </div>
            </div>

            <div className="kpi-card rose">
              <div className="kpi-icon-box">
                <Icons.AlertTriangle />
              </div>
              <div className="kpi-details">
                <span className="kpi-label">BREAKDOWN DOWNTIME</span>
                <div className="kpi-val-group">
                  <span className="kpi-value">{summaryStats.totalBreakdown}</span>
                  <span className="kpi-unit">hrs</span>
                </div>
                <span className="kpi-sub">Automatic machines breakdown on date</span>
              </div>
            </div>
          </div>

          {/* Reference Color Legend Strip matching FME style */}
          <div className="fme-legend-card">
            <div className="legend-guide-title">
              <span>Graph Bar Parameter References ({formattedDate}):</span>
            </div>
            <div className="legend-chips-list">
              <div className="legend-chip-item">
                <span className="legend-color-dot" style={{ backgroundColor: '#2563eb' }}></span>
                <span>Runtime (hrs)</span>
              </div>
              <div className="legend-chip-item">
                <span className="legend-color-dot" style={{ backgroundColor: '#10b981' }}></span>
                <span>Production (units)</span>
              </div>
              <div className="legend-chip-item">
                <span className="legend-color-dot" style={{ backgroundColor: '#f59e0b' }}></span>
                <span>Hour Output Rate (u/h)</span>
              </div>
              <div className="legend-chip-item">
                <span className="legend-color-dot" style={{ backgroundColor: '#ef4444' }}></span>
                <span>Breakdown (hrs) - <strong>Automatic Only</strong></span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 1: AUTOMATIC MACHINES (4-BAR GRAPHS) */}
          {/* ======================================================== */}
          <div className="section-block">
            <div className="section-header-banner auto-banner">
              <div className="section-header-left">
                <span className="category-icon-badge auto">
                  <Icons.Zap />
                </span>
                <div>
                  <h2 className="section-title">Automatic Machines (4-Bar Graphs)</h2>
                  <p className="section-subtitle">
                    Includes: 1. Runtime &bull; 2. Production &bull; 3. Hourly Output &bull; 4. Breakdown Downtime
                  </p>
                </div>
              </div>
              <span className="count-tag auto-tag">{automaticMachines.length} Machines</span>
            </div>

            <div className="machines-grid">
              {automaticMachines.length === 0 ? (
                <div className="empty-data-state">
                  <Icons.AlertTriangle />
                  <h3>No automatic machines match the criteria</h3>
                  <p>Check your search query or department filter.</p>
                </div>
              ) : (
                automaticMachines.map((machine) => renderMachineCard(machine))
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: MANUAL MACHINES (3-BAR GRAPHS) */}
          {/* ======================================================== */}
          <div className="section-block">
            <div className="section-header-banner manual-banner">
              <div className="section-header-left">
                <span className="category-icon-badge manual">
                  <Icons.Wrench />
                </span>
                <div>
                  <h2 className="section-title">Manual Machines (3-Bar Graphs)</h2>
                  <p className="section-subtitle">
                    Includes: 1. Runtime &bull; 2. Production &bull; 3. Hourly Output (Breakdown not tracked)
                  </p>
                </div>
              </div>
              <span className="count-tag manual-tag">{manualMachines.length} Machines</span>
            </div>

            <div className="machines-grid">
              {manualMachines.length === 0 ? (
                <div className="empty-data-state">
                  <Icons.AlertTriangle />
                  <h3>No manual machines match the criteria</h3>
                  <p>Check your search query or department filter.</p>
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
