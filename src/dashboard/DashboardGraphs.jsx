import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Activity,
  Calendar,
  Clock,
  AlertOctagon,
  CheckCircle2,
  Zap,
  Info
} from 'lucide-react';

export default function DashboardGraphs({ formattedDate = '16-09-2026', selectedShift = 'All' }) {
  const [activeTabGraph1, setActiveTabGraph1] = useState('All');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Data for Graph 1: Hourly Production vs Target Plan
  const hourlyData = [
    { time: '06:00', target: 1800, actual: 1750, shift: 'A' },
    { time: '08:00', target: 2000, actual: 2080, shift: 'A' },
    { time: '10:00', target: 2100, actual: 2150, shift: 'A' },
    { time: '12:00', target: 1900, actual: 1840, shift: 'A' },
    { time: '14:00', target: 2200, actual: 2260, shift: 'B' },
    { time: '16:00', target: 2100, actual: 2040, shift: 'B' },
    { time: '18:00', target: 2000, actual: 1980, shift: 'B' },
    { time: '20:00', target: 1950, actual: 1910, shift: 'B' },
    { time: '22:00', target: 1850, actual: 1780, shift: 'C' }
  ];

  const maxValGraph1 = 2500;

  // Data for Graph 2: Machine Operating Runtime vs Breakdown Downtime
  const machineRuntimeData = [
    { name: 'CNC Milling Center A1', id: 'M-AUTO-01', runtime: 7.2, breakdown: 0.3, idle: 0.5, total: 8.0, oee: 96.2 },
    { name: 'Robotic Welding Cell 04', id: 'M-AUTO-02', runtime: 6.5, breakdown: 1.0, idle: 0.5, total: 8.0, oee: 87.5 },
    { name: 'Auto Stamping & Press 02', id: 'M-AUTO-03', runtime: 4.1, breakdown: 3.4, idle: 0.5, total: 8.0, oee: 54.3 },
    { name: 'High-Speed Packaging Line', id: 'M-AUTO-04', runtime: 7.8, breakdown: 0.1, idle: 0.1, total: 8.0, oee: 98.7 },
    { name: 'Precision Manual Lathe #3', id: 'M-MAN-01', runtime: 5.8, breakdown: 0.0, idle: 2.2, total: 8.0, oee: 82.0 },
    { name: 'Manual Drill & Tapping', id: 'M-MAN-02', runtime: 6.4, breakdown: 0.0, idle: 1.6, total: 8.0, oee: 89.0 }
  ];

  // Data for Graph 3: Shift-wise OEE & Efficiency Curve
  const oeeTrend = [
    { label: '06:00', val: 86.5, avail: 95.0, perf: 92.0, qual: 99.0 },
    { label: '08:00', val: 89.2, avail: 97.2, perf: 93.0, qual: 98.8 },
    { label: '10:00', val: 91.4, avail: 98.0, perf: 94.2, qual: 99.2 },
    { label: '12:00', val: 85.8, avail: 94.5, perf: 91.8, qual: 99.0 },
    { label: '14:00', val: 92.5, avail: 98.5, perf: 94.8, qual: 99.3 },
    { label: '16:00', val: 88.0, avail: 95.8, perf: 92.5, qual: 99.1 },
    { label: '18:00', val: 89.7, avail: 96.5, perf: 93.8, qual: 99.2 },
    { label: '20:00', val: 90.2, avail: 97.0, perf: 94.0, qual: 99.0 },
    { label: '22:00', val: 87.4, avail: 95.2, perf: 92.8, qual: 99.1 }
  ];

  // SVG dimensions for Graph 3
  const svgWidth = 480;
  const svgHeight = 170;
  const paddingX = 35;
  const paddingY = 25;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  // Calculate coordinates for OEE area chart
  const minOee = 80;
  const maxOee = 95;
  const points = oeeTrend.map((d, i) => {
    const x = paddingX + (i / (oeeTrend.length - 1)) * chartW;
    const y = paddingY + chartH - ((d.val - minOee) / (maxOee - minOee)) * chartH;
    return { x, y, ...d };
  });

  // Construct smooth SVG path
  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cpX1 = prev.x + (p.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (p.x - prev.x) / 2;
    const cpY2 = p.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${paddingY + chartH} L ${points[0].x} ${paddingY + chartH} Z`;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Graphs Section Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-5 px-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <BarChart3 size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white m-0">Operations Telemetry & Analytics</h2>
            <p className="text-xs text-slate-300 m-0 mt-0.5">
              Live manufacturing performance &bull; Production throughput &bull; Machine runtime &bull; OEE efficiency
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200">
            Date: <strong>{formattedDate}</strong>
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Telemetry Online
          </span>
        </div>
      </div>

      {/* Top 2 Graphs: Side by Side on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
        {/* ======================================================== */}
        {/* GRAPH 1: Hourly Production Output vs Planned Target */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 m-0">
                  Graph 1: Hourly Production vs Planned Target
                </h3>
                <span className="text-[11px] text-slate-500">Hourly units produced against target volume</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded bg-gradient-to-t from-emerald-600 to-teal-500 inline-block shadow-xs"></span>
                  Actual
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500 inline-block"></span>
                  Target
                </span>
              </div>
              <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 py-0.5 px-2 rounded-full">
                99.2% Goal
              </span>
            </div>
          </div>

          {/* Bar Chart Stage */}
          <div className="h-[210px] relative flex items-end pt-8 px-2 border-b border-slate-200 mt-2">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7 pt-4">
              <div className="w-full border-b border-dashed border-slate-200 flex items-center justify-between">
                <span className="text-[9px] text-slate-400 font-mono">2,500</span>
              </div>
              <div className="w-full border-b border-dashed border-slate-200 flex items-center justify-between">
                <span className="text-[9px] text-slate-400 font-mono">1,875</span>
              </div>
              <div className="w-full border-b border-dashed border-slate-200 flex items-center justify-between">
                <span className="text-[9px] text-slate-400 font-mono">1,250</span>
              </div>
              <div className="w-full border-b border-dashed border-slate-200 flex items-center justify-between">
                <span className="text-[9px] text-slate-400 font-mono">625</span>
              </div>
              <div className="w-full border-b border-slate-300 flex items-center justify-between">
                <span className="text-[9px] text-slate-400 font-mono">0</span>
              </div>
            </div>

            {/* Bars Container */}
            <div className="relative w-full h-full flex items-end justify-between z-10 pb-1">
              {hourlyData.map((d, idx) => {
                const actualH = (d.actual / maxValGraph1) * 100;
                const targetH = (d.target / maxValGraph1) * 100;
                const isOverTarget = d.actual >= d.target;

                return (
                  <div key={idx} className="flex flex-col items-center justify-end h-full flex-1 group cursor-pointer">
                    {/* Tooltip on hover */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-1 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded shadow-md pointer-events-none z-20 whitespace-nowrap">
                      {d.time} &bull; Actual: {d.actual} / Target: {d.target}
                    </span>

                    {/* Bar and Target Marker */}
                    <div className="relative w-6 sm:w-8 h-full flex items-end justify-center">
                      {/* Target Indicator Line */}
                      <div
                        className="absolute w-8 sm:w-10 border-t-2 border-dashed border-amber-500 z-10"
                        style={{ bottom: `${targetH}%` }}
                        title={`Target: ${d.target}`}
                      />

                      {/* Actual Bar */}
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-emerald-600 via-teal-600 to-emerald-400 shadow-xs transition-all duration-300 group-hover:brightness-110 flex items-start justify-center pt-1"
                        style={{ height: `${actualH}%` }}
                      >
                        <span className="text-[9px] font-extrabold text-white">
                          {(d.actual / 1000).toFixed(1)}k
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-slate-600 mt-1.5">{d.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Info Strip */}
          <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500">
            <span>Cumulative Day Output: <strong className="text-slate-800 font-bold">17,790 units</strong></span>
            <span>Planned Target: <strong className="text-slate-800 font-bold">18,000 units</strong></span>
            <span className="text-emerald-700 font-bold bg-emerald-50 py-0.5 px-2 rounded">Variance: -1.1%</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* GRAPH 3: Shift-wise OEE Performance & Quality Trend */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                <Activity size={18} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 m-0">
                  Graph 3: Plant OEE & Efficiency Trend
                </h3>
                <span className="text-[11px] text-slate-500">Hourly Overall Equipment Effectiveness %</span>
              </div>
            </div>
            <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 py-0.5 px-2.5 rounded-full">
              88.7% Avg
            </span>
          </div>

          {/* SVG Smooth Curve Area Chart */}
          <div className="relative w-full h-[210px] flex items-center justify-center pt-2">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="oeeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Background Guideline 85% Target */}
              <line
                x1={paddingX}
                y1={paddingY + chartH - ((85 - minOee) / (maxOee - minOee)) * chartH}
                x2={svgWidth - paddingX}
                y2={paddingY + chartH - ((85 - minOee) / (maxOee - minOee)) * chartH}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={svgWidth - paddingX}
                y={paddingY + chartH - ((85 - minOee) / (maxOee - minOee)) * chartH - 4}
                textAnchor="end"
                className="text-[9px] fill-amber-600 font-bold"
              >
                85% Target
              </text>

              {/* Area fill */}
              <path d={areaD} fill="url(#oeeGradient)" />

              {/* Curve Stroke */}
              <path d={pathD} fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />

              {/* Points */}
              {points.map((p, idx) => (
                <g key={idx} className="cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredPoint === idx ? 6 : 4}
                    className="fill-white stroke-indigo-600"
                    strokeWidth="2.5"
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <text
                    x={p.x}
                    y={svgHeight - 4}
                    textAnchor="middle"
                    className="text-[9px] fill-slate-500 font-medium"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* OEE Sub-Factors Strip */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Availability</span>
              <span className="text-xs font-black text-slate-800">96.4%</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Performance</span>
              <span className="text-xs font-black text-slate-800">92.8%</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Quality Yield</span>
              <span className="text-xs font-black text-slate-800">99.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* GRAPH 2: Machine Operating Runtime vs Breakdown Downtime */}
      {/* ======================================================== */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <Clock size={18} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 m-0">
                Graph 2: Machine Operating Runtime vs Breakdown Downtime Comparison
              </h3>
              <span className="text-[11px] text-slate-500">
                Shift runtime distribution and breakdown logs across primary machine cells (8h shift basis)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-600 inline-block"></span>
              <span>Running Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500 inline-block"></span>
              <span>Breakdown Downtime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-300 inline-block"></span>
              <span>Idle / Setup</span>
            </div>
          </div>
        </div>

        {/* Stacked Horizontal Bars List */}
        <div className="flex flex-col gap-3">
          {machineRuntimeData.map((m, idx) => {
            const runPercent = (m.runtime / m.total) * 100;
            const bdPercent = (m.breakdown / m.total) * 100;
            const idlePercent = (m.idle / m.total) * 100;

            const isHighBreakdown = m.breakdown > 1.5;

            return (
              <div key={idx} className="flex flex-col gap-1 p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{m.name}</span>
                    <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 py-0.5 px-1.5 rounded">
                      {m.id}
                    </span>
                    {isHighBreakdown && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 py-0.2 px-1.5 rounded flex items-center gap-1">
                        <AlertOctagon size={10} /> Breakdown Alert
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-blue-700 font-semibold">{m.runtime}h Run</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className={m.breakdown > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                      {m.breakdown}h BD
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-slate-500 font-medium">{m.idle}h Idle</span>
                    <span className={`py-0.5 px-2 rounded text-[11px] font-extrabold ${
                      m.oee >= 90
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : m.oee >= 70
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {m.oee}% Uptime
                    </span>
                  </div>
                </div>

                {/* Progress bar stack */}
                <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden shadow-inner">
                  {/* Runtime block */}
                  <div
                    className="h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-300"
                    style={{ width: `${runPercent}%` }}
                    title={`Runtime: ${m.runtime} hrs (${runPercent.toFixed(1)}%)`}
                  />
                  {/* Breakdown block */}
                  {m.breakdown > 0 && (
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300"
                      style={{ width: `${bdPercent}%` }}
                      title={`Breakdown: ${m.breakdown} hrs (${bdPercent.toFixed(1)}%)`}
                    />
                  )}
                  {/* Idle block */}
                  {m.idle > 0 && (
                    <div
                      className="h-full bg-slate-300 transition-all duration-300"
                      style={{ width: `${idlePercent}%` }}
                      title={`Idle: ${m.idle} hrs (${idlePercent.toFixed(1)}%)`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
