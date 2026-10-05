import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Clock,
  TrendingUp,
  Cpu,
  Layers,
  Activity,
  Calendar,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Sliders
} from 'lucide-react';
import { MACHINE_MODEL_MAP } from '../pages/Cnc/AutoCrimping/machineModels';

export default function OperationsDashboard() {
  // Top 4 Cascading Filters
  const [selectedUnit, setSelectedUnit] = useState('Bawal');
  const [selectedOpUnit, setSelectedOpUnit] = useState('C&C');
  const [selectedProcess, setSelectedProcess] = useState('Auto Crimping');
  const [selectedMachine, setSelectedMachine] = useState('C&C 01');

  // Days selector: 7, 15, 30 days or custom
  const [selectedDays, setSelectedDays] = useState(15);
  const [hoveredDayIdx, setHoveredDayIdx] = useState(null);

  // Available Processes based on Operational Unit
  const processesForOpUnit = useMemo(() => {
    if (selectedOpUnit === 'C&C') {
      return [
        'Auto Crimping',
        'Manual Crimping',
        'Joint Crimping',
        'Registance Welding',
        'Twisting',
        'Blue Taping',
        'Head Sinking'
      ];
    } else if (selectedOpUnit === 'Assembly') {
      return ['Assembly Line 01', 'Assembly Line 02', 'Sub-Assembly'];
    } else {
      return ['SRC Inspection & Test', 'Quality QA Hub'];
    }
  }, [selectedOpUnit]);

  // Available Machines based on Operational Unit & Process
  const machinesList = useMemo(() => {
    if (selectedOpUnit === 'C&C') {
      return Array.from({ length: 32 }, (_, i) => i + 1)
        .filter((num) => num !== 13)
        .map((num) => `C&C ${String(num).padStart(2, '0')}`);
    } else if (selectedOpUnit === 'Assembly') {
      return ['ASM Cell 01', 'ASM Cell 02', 'ASM Cell 03', 'ASM Cell 04'];
    } else {
      return ['SRC Tester 01', 'SRC Tester 02', 'SRC Tester 03'];
    }
  }, [selectedOpUnit]);

  // Machine number extracted for seed
  const machineNum = useMemo(() => {
    const match = selectedMachine.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  }, [selectedMachine]);

  const machineModel = useMemo(() => {
    return MACHINE_MODEL_MAP[machineNum] || 'Standard Series';
  }, [machineNum]);

  // Generate deterministic n-day telemetry data for (HOP & Runtime) matching reference style
  const daysData = useMemo(() => {
    const list = [];
    const baseHOP = 140 + ((machineNum * 19) % 50); // e.g. 159 u/h

    // Sequence matching reference screenshot: [0, 12, 5, 0, 11, 5, 13, 15, 14, 13, 9, 10, 0, 0, 12, 0, 8, 0, 5]
    const screenshotPattern = [0, 12, 5, 0, 11, 5, 13, 15, 14, 13, 9, 10, 0, 0, 12, 0, 8, 0, 5];

    let maxRuntime = 0;
    let maxHop = 0;

    for (let i = 0; i < selectedDays; i++) {
      const dayOffset = selectedDays - 1 - i;
      const currDate = new Date(2026, 9, 5); // 05 Oct 2026
      currDate.setDate(currDate.getDate() - dayOffset);

      const dayNum = String(currDate.getDate()).padStart(2, '0');
      const monthShort = currDate.toLocaleString('en-GB', { month: 'short' });
      const dateLabel = `${dayNum} ${monthShort}`; // e.g. "18 Sep", "24 Sep", "01 Oct", "05 Oct"
      const fullDate = `${dayNum}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${currDate.getFullYear()}`;

      // Pick pattern index
      const patIdx = (i + (machineNum - 1) * 3) % screenshotPattern.length;
      let runtimeVal = screenshotPattern[patIdx];

      // Occasional slight adjustment for different machines while preserving screenshot feel
      if (runtimeVal > 0 && machineNum > 1) {
        const offset = ((machineNum * 7 + i * 3) % 5) - 2; // -2 to +2
        runtimeVal = Math.max(3, Math.min(16, runtimeVal + offset));
      }

      let hop = 0;
      if (runtimeVal > 0) {
        const seed = Math.sin(machineNum * 77 + (i + 1) * 43) * 10000;
        const rand = seed - Math.floor(seed);
        const hopVar = Math.round((rand - 0.45) * 30);
        hop = Math.max(100, baseHOP + hopVar);
      }

      if (runtimeVal > maxRuntime) maxRuntime = runtimeVal;
      if (hop > maxHop) maxHop = hop;

      list.push({
        day: i + 1,
        dateLabel,
        fullDate,
        hop,
        runtime: runtimeVal,
        totalUnits: Math.round(hop * runtimeVal)
      });
    }

    return list.map((item) => ({
      ...item,
      isPeakRuntime: item.runtime > 0 && item.runtime === maxRuntime,
      isPeakHop: item.hop > 0 && item.hop === maxHop
    }));
  }, [selectedDays, machineNum]);

  // Aggregate stats across the selected n days
  const periodStats = useMemo(() => {
    let sumHop = 0;
    let sumRuntime = 0;
    let sumUnits = 0;
    let maxHop = 0;
    let maxRuntime = 0;
    let activeDaysCount = 0;

    daysData.forEach((d) => {
      sumHop += d.hop;
      sumRuntime += d.runtime;
      sumUnits += d.totalUnits;
      if (d.runtime > 0) activeDaysCount++;
      if (d.hop > maxHop) maxHop = d.hop;
      if (d.runtime > maxRuntime) maxRuntime = d.runtime;
    });

    const count = activeDaysCount || 1;
    const avgHop = Math.round(sumHop / count);
    const avgRuntime = Number((sumRuntime / (daysData.length || 1)).toFixed(1));
    const uptimeRatio = Number(((sumRuntime / ((daysData.length || 1) * 24)) * 100).toFixed(1));

    return {
      avgHop,
      avgRuntime,
      totalUnits: sumUnits.toLocaleString(),
      totalRuntime: sumRuntime.toFixed(1),
      maxHop,
      maxRuntime,
      uptimeRatio
    };
  }, [daysData]);

  // Scales for charts
  const maxHopScale = 250; // max Y for HOP (0 to 250 u/h)
  const maxRuntimeScale = 24; // max Y for Runtime (0 to 24 hrs)

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ======================================================== */}
      {/* 1. TOP FILTERS TOOLBAR */}
      {/* ======================================================== */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 m-0">Operations Telemetry Dashboard</h2>
              <span className="text-xs text-slate-500">
                Filter by Unit, Section, Process, Machine, and analysis duration ({selectedDays} Days)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              onClick={() => {
                setSelectedUnit('Bawal');
                setSelectedOpUnit('C&C');
                setSelectedProcess('Auto Crimping');
                setSelectedMachine('C&C 01');
                setSelectedDays(15);
              }}
            >
              <RotateCcw size={13} /> Reset Filters
            </button>
          </div>
        </div>

        {/* The 4 Cascading Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filter 1: Unit */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <span>1. SELECT UNIT</span>
            </label>
            <select
              className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer shadow-2xs"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              <option value="Bawal">Bawal Unit</option>
              <option value="Gujrat">Gujrat Unit</option>
            </select>
          </div>

          {/* Filter 2: Operational Unit */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <span>2. OPERATIONAL UNIT</span>
            </label>
            <select
              className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer shadow-2xs"
              value={selectedOpUnit}
              onChange={(e) => {
                const nextOp = e.target.value;
                setSelectedOpUnit(nextOp);
                if (nextOp === 'C&C') {
                  setSelectedProcess('Auto Crimping');
                  setSelectedMachine('C&C 01');
                } else if (nextOp === 'Assembly') {
                  setSelectedProcess('Assembly Line 01');
                  setSelectedMachine('ASM Cell 01');
                } else {
                  setSelectedProcess('SRC Inspection & Test');
                  setSelectedMachine('SRC Tester 01');
                }
              }}
            >
              <option value="C&C">C&C (CNC Machining)</option>
              <option value="Assembly">Assembly Section</option>
              <option value="SRC">SRC (Inspection & QA)</option>
            </select>
          </div>

          {/* Filter 3: Process */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <span>3. PROCESS</span>
            </label>
            <select
              className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer shadow-2xs"
              value={selectedProcess}
              onChange={(e) => setSelectedProcess(e.target.value)}
            >
              {processesForOpUnit.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Filter 4: Machine */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <span>4. MACHINE</span>
            </label>
            <select
              className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer shadow-2xs"
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
            >
              {machinesList.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Days Selector Pill Strip */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Days Duration:</span>
            <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[7, 15, 30].map((d) => (
                <button
                  key={d}
                  className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                    selectedDays === d
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 bg-transparent'
                  }`}
                  onClick={() => setSelectedDays(d)}
                >
                  {d} Days ({d} Bars)
                </button>
              ))}
            </div>
          </div>

          {/* Quick Period Summary Badge */}
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-bold">
              Avg HOP: {periodStats.avgHop} u/h
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-bold">
              Avg Runtime: {periodStats.avgRuntime} hrs/day
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg font-bold">
              Total Output: {periodStats.totalUnits} units
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. GRAPH 1: COMBINED DUAL-BAR GRAPH (HOP & RUNTIME OF N DAYS) */}
      {/* ======================================================== */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col gap-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <BarChart3 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 m-0">
                  Graph 1: Hourly Output Production (HOP) & Runtime — {selectedDays} Days
                </h3>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 py-0.5 px-2 rounded-full border border-blue-200">
                  {selectedMachine} ({machineModel})
                </span>
              </div>
              <span className="text-xs text-slate-500">
                2 bars per day: Hourly Output (HOP in units/hr) &bull; Machine Runtime (in hours) over {selectedDays} consecutive days
              </span>
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-emerald-600 inline-block shadow-2xs"></span>
              <span className="text-slate-700">Bar 1: HOP (u/h)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-blue-600 inline-block shadow-2xs"></span>
              <span className="text-slate-700">Bar 2: Runtime (hrs)</span>
            </div>
          </div>
        </div>

        {/* Dual Bar Chart Stage */}
        <div className="overflow-x-auto pb-2">
          <div className="h-[250px] relative flex items-end pt-12 px-4 border-b border-slate-100 min-w-[720px]">
            {/* Background Subtle Guidelines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-6">
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
            </div>

            {/* 2-Bar Groups Container */}
            <div className="relative w-full h-full flex items-end justify-between z-10 pb-1 gap-1.5">
              {daysData.map((d, idx) => {
                const hopHeightPercent = d.hop > 0 ? Math.min(80, Math.max(14, (d.hop / 240) * 80)) : 0;
                const runtimeHeightPercent = d.runtime > 0 ? Math.min(80, Math.max(14, (d.runtime / 18) * 80)) : 0;
                const isHovered = hoveredDayIdx === idx;

                return (
                  <div
                    key={d.day}
                    className="flex flex-col items-center justify-end h-full flex-1 group cursor-pointer relative"
                    onMouseEnter={() => setHoveredDayIdx(idx)}
                    onMouseLeave={() => setHoveredDayIdx(null)}
                  >
                    {/* Tooltip on Hover */}
                    {isHovered && (
                      <div className="absolute -top-16 bg-slate-900 text-white text-[11px] font-medium p-2 px-3 rounded-xl shadow-xl pointer-events-none z-30 whitespace-nowrap flex flex-col gap-0.5">
                        <div className="font-extrabold text-blue-200 border-b border-slate-700 pb-0.5">
                          {d.fullDate} &bull; {selectedMachine}
                        </div>
                        <div className="flex items-center justify-between gap-3 text-emerald-300 font-bold">
                          <span>HOP:</span>
                          <span>{d.hop > 0 ? `${d.hop} u/h` : '0'}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 text-blue-300 font-bold">
                          <span>Runtime:</span>
                          <span>{d.runtime} hrs</span>
                        </div>
                      </div>
                    )}

                    {/* Group of 2 Bars: Bar 1 (HOP) and Bar 2 (Runtime) */}
                    <div className="flex items-end justify-center gap-1.5 w-full max-w-[48px] h-full">
                      {/* Bar 1: HOP */}
                      <div className="flex flex-col items-center justify-end h-full flex-1">
                        {d.hop > 0 && (
                          <span className="text-[10px] font-bold text-slate-800 mb-1 leading-none">
                            {d.hop}
                          </span>
                        )}
                        {d.hop > 0 ? (
                          <div
                            className="w-full bg-emerald-500 rounded-t-md transition-colors duration-150 hover:bg-emerald-600"
                            style={{ height: `${hopHeightPercent}%` }}
                          />
                        ) : (
                          <div className="w-full h-0" />
                        )}
                      </div>

                      {/* Bar 2: Runtime */}
                      <div className="flex flex-col items-center justify-end h-full flex-1">
                        {d.isPeakRuntime && (
                          <div className="w-[1.5px] h-2.5 bg-slate-900 mb-0.5 rounded-full" />
                        )}
                        {d.runtime > 0 && (
                          <span className="text-[10px] font-bold text-slate-800 mb-1 leading-none">
                            {d.runtime}
                          </span>
                        )}
                        {d.runtime > 0 ? (
                          <div
                            className="w-full bg-blue-500 rounded-t-md transition-colors duration-150 hover:bg-blue-600"
                            style={{ height: `${runtimeHeightPercent}%` }}
                          />
                        ) : (
                          <div className="w-full h-0" />
                        )}
                      </div>
                    </div>

                    {/* Date X-Axis Label */}
                    <span className="text-[11px] font-medium text-slate-500 mt-2 whitespace-nowrap">
                      {d.dateLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Metrics Reference */}
        <div className="flex flex-wrap items-center justify-between pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Total Units Produced: <strong className="text-slate-800 font-bold">{periodStats.totalUnits}</strong></span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Total Operational Runtime: <strong className="text-slate-800 font-bold">{periodStats.totalRuntime} hrs</strong></span>
          </span>
          <span className="font-bold text-slate-700">
            Selected Duration: <span className="text-blue-600">{selectedDays} Days</span> ({selectedDays * 2} Bars Total)
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. TWO DEDICATED GRAPHS: GRAPH 2 (HOP) & GRAPH 3 (RUNTIME) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* ======================================================== */}
        {/* GRAPH 2: Dedicated HOP (Hourly Output Production) Graph */}
        {/* ======================================================== */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 m-0">
                  Graph 2: Hourly Output Production (HOP) Analysis
                </h3>
                <span className="text-[11px] text-slate-500">Daily throughput rate in units per hour ({selectedDays} Days)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 py-0.5 px-2.5 rounded-full">
                Avg: {periodStats.avgHop} u/h
              </span>
            </div>
          </div>

          {/* HOP Chart Stage */}
          <div className="h-[230px] relative flex items-end pt-12 px-2 border-b border-slate-100 mt-2">
            {/* Background Subtle Guidelines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-6">
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
            </div>

            {/* Bars for HOP */}
            <div className="relative w-full h-full flex items-end justify-between z-10 pb-1 gap-1">
              {daysData.map((d) => {
                const hopHeightPercent = d.hop > 0 ? Math.min(80, Math.max(14, (d.hop / 240) * 80)) : 0;

                return (
                  <div key={d.day} className="flex flex-col items-center justify-end h-full flex-1 group cursor-pointer">
                    {d.isPeakHop && (
                      <div className="w-[1.5px] h-2.5 bg-slate-900 mb-0.5 rounded-full" />
                    )}
                    {d.hop > 0 && (
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 mb-1 leading-none">
                        {d.hop}
                      </span>
                    )}
                    {d.hop > 0 ? (
                      <div
                        className="w-full max-w-[28px] rounded-t-md bg-emerald-500 shadow-2xs transition-colors duration-150 hover:bg-emerald-600"
                        style={{ height: `${hopHeightPercent}%` }}
                        title={`Date: ${d.fullDate} — ${d.hop} units/hour`}
                      />
                    ) : (
                      <div className="w-full h-0" />
                    )}
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-2 whitespace-nowrap">
                      {d.dateLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Min HOP</span>
              <span className="text-xs font-black text-slate-800">142 u/h</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Average HOP</span>
              <span className="text-xs font-black text-emerald-600">{periodStats.avgHop} u/h</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Peak HOP</span>
              <span className="text-xs font-black text-blue-600">{periodStats.maxHop} u/h</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* GRAPH 3: Dedicated Runtime of Machine Graph (Matching Reference Style) */}
        {/* ======================================================== */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                <Clock size={18} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 m-0">
                  Graph 3: Machine Runtime Hours Trend
                </h3>
                <span className="text-[11px] text-slate-500">Daily active runtime hours out of 24h ({selectedDays} Days)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 py-0.5 px-2.5 rounded-full">
                Avg: {periodStats.avgRuntime} hrs
              </span>
            </div>
          </div>

          {/* Runtime Chart Stage */}
          <div className="h-[230px] relative flex items-end pt-12 px-2 border-b border-slate-100 mt-2">
            {/* Background Subtle Guidelines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-6">
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
              <div className="w-full border-b border-dashed border-slate-200/50" />
            </div>

            {/* Bars for Runtime */}
            <div className="relative w-full h-full flex items-end justify-between z-10 pb-1 gap-1">
              {daysData.map((d) => {
                const runtimeHeightPercent = d.runtime > 0 ? Math.min(80, Math.max(14, (d.runtime / 18) * 80)) : 0;

                return (
                  <div key={d.day} className="flex flex-col items-center justify-end h-full flex-1 group cursor-pointer">
                    {/* Peak vertical indicator line on top of peak number */}
                    {d.isPeakRuntime && (
                      <div className="w-[1.5px] h-3 bg-slate-900 mb-0.5 rounded-full" />
                    )}
                    {d.runtime > 0 && (
                      <span className="text-[11px] font-bold text-slate-900 mb-1 leading-none">
                        {d.runtime}
                      </span>
                    )}
                    {d.runtime > 0 ? (
                      <div
                        className="w-full max-w-[28px] rounded-t-md bg-blue-500 shadow-2xs transition-colors duration-150 hover:bg-blue-600"
                        style={{ height: `${runtimeHeightPercent}%` }}
                        title={`Date: ${d.fullDate} — ${d.runtime} runtime hours`}
                      />
                    ) : (
                      <div className="w-full h-0" />
                    )}
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-2 whitespace-nowrap">
                      {d.dateLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Min Runtime</span>
              <span className="text-xs font-black text-slate-800">14.2 hrs</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Avg Runtime</span>
              <span className="text-xs font-black text-blue-600">{periodStats.avgRuntime} hrs/day</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Uptime Efficiency</span>
              <span className="text-xs font-black text-emerald-600">{periodStats.uptimeRatio}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
