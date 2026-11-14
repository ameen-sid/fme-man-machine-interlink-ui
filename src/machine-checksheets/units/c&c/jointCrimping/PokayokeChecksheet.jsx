import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import { ShieldAlert, Printer, Check, RotateCcw, Plus, Camera, Replace, Sparkles } from 'lucide-react';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

const DEFAULT_MACHINES = [
  { id: 1, name: 'JCR 01' },
  { id: 2, name: 'JCR 02' },
  { id: 3, name: 'JCR 03' },
  { id: 4, name: 'JCR 04' },
  { id: 5, name: 'JCR 05' },
  { id: 6, name: 'JCR 06' }
];

const INITIAL_OBSERVATIONS = [
  { id: 1, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' },
  { id: 2, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' },
  { id: 3, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' },
  { id: 4, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' },
  { id: 5, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' }
];

export default function PokayokeChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'JCR 01';
  const modelName = machine?.model || 'JCR-01';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `jcr_pokayoke_${machineName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      title: 'Poka Yoke Checked By QA',
      timing: 'Shift Start / 1st PC',
      month: 'OCTOBER',
      year: new Date().getFullYear().toString(),
      docNo: 'FRM-WH-QA-096',
      rev: 'REV 01',
      revDate: '01.01.2021',
      issueDate: '01.10.15'
    };
  });

  const [machinesList] = useState(DEFAULT_MACHINES);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const [gridValues, setGridValues] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {};
  });

  const [observations, setObservations] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_obs`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_OBSERVATIONS;
  });

  const [customPhoto, setCustomPhoto] = useState(() => {
    try {
      return localStorage.getItem(`${storageKey}_photo`) || null;
    } catch (e) {
      return null;
    }
  });

  const [savedToast, setSavedToast] = useState('');
  const [selectedToolSymbol, setSelectedToolSymbol] = useState('✓');

  const handleHeaderChange = (key, val) => {
    setHeaderInfo((prev) => ({ ...prev, [key]: val }));
  };

  const handleCellChange = (mcId, day, shift, val) => {
    const k = `${mcId}_d${day}_s${shift}`;
    setGridValues((prev) => ({ ...prev, [k]: val }));
  };

  const cycleCellValue = (mcId, day, shift) => {
    const k = `${mcId}_d${day}_s${shift}`;
    const current = gridValues[k] || '';
    const symbols = ['', '✓', 'X', 'N/A'];
    const idx = symbols.indexOf(current);
    const next = idx === -1 ? '✓' : symbols[(idx + 1) % symbols.length];
    handleCellChange(mcId, day, shift, next);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      setCustomPhoto(result);
      try {
        localStorage.setItem(`${storageKey}_photo`, result);
      } catch (err) { }
    };
    reader.readAsDataURL(file);
  };

  const handleAddObservation = () => {
    setObservations((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: '',
        observation: '',
        rootCause: '',
        actionPlan: '',
        responsibility: '',
        targetDate: '',
        reviewStatus: ''
      }
    ]);
  };

  const handleObservationChange = (id, field, val) => {
    setObservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleQuickFillCurrentDay = (dayNum) => {
    const updated = { ...gridValues };
    machinesList.forEach((mc) => {
      SHIFTS.forEach((sh) => {
        const k = `${mc.id}_d${dayNum}_s${sh}`;
        if (!updated[k]) {
          updated[k] = selectedToolSymbol;
        }
      });
    });
    setGridValues(updated);
    setSavedToast(`Filled Day ${dayNum} for all JCR machines with ${selectedToolSymbol}!`);
    setTimeout(() => setSavedToast(''), 3000);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_header`, JSON.stringify(headerInfo));
      localStorage.setItem(`${storageKey}_grid`, JSON.stringify(gridValues));
      localStorage.setItem(`${storageKey}_obs`, JSON.stringify(observations));
      setSavedToast('Poka-Yoke Checksheet saved successfully!');
      setTimeout(() => setSavedToast(''), 3000);
    } catch (e) {
      setSavedToast('Error saving data to local storage.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all verification records and observations on this Poka-Yoke sheet?')) {
      setGridValues({});
      setObservations(INITIAL_OBSERVATIONS);
      try {
        localStorage.removeItem(`${storageKey}_grid`);
        localStorage.removeItem(`${storageKey}_obs`);
      } catch (e) { }
      setSavedToast('Checksheet records reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Header Nav without switcher */}
      <ChecksheetHeaderNav
        title="POKA YOKE VERIFICATION CHECK SHEET"
        subtitle={`${displayMachine} — Poka Yoke Checked By QA (FRM-WH-QA-096 Rev 01)`}
        icon={ShieldAlert}
        iconBgClass="bg-rose-100 text-rose-800"
        onClose={onClose}
        onReset={handleReset}
        onSave={handleSave}
        savedToast={savedToast}
        showSwitcher={false}

      />

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm">
          <span className="flex items-center gap-2">
            <Check size={16} className="text-emerald-600" />
            {savedToast}
          </span>
          <button
            type="button"
            className="text-emerald-700 font-bold hover:underline cursor-pointer"
            onClick={() => setSavedToast('')}
          >
            Dismiss
          </button>
        </div>
      )}


      {/* Main Sheet Container */}
      <div className="bg-white border-2 border-black shadow-md rounded-sm overflow-hidden">
        {/* Top Title Bar - Spans full card width, non-scrolling */}
        <div className="border-b border-black p-2 bg-white flex items-center justify-between text-xs">
          <div className="flex items-center gap-8">
            <span className="font-black text-sm tracking-wide text-black">
              {headerInfo.title}
            </span>
            <div className="flex items-center gap-1.5 font-bold">
              <span>Timing:</span>
              <input
                type="text"
                value={headerInfo.timing}
                onChange={(e) => handleHeaderChange('timing', e.target.value)}
                className="font-bold border-b border-black outline-none w-48 bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-bold text-xs">
              <span className="text-blue-600 font-black">MONTH:-</span>
              <input
                type="text"
                value={`${headerInfo.month} ${headerInfo.year}`}
                onChange={(e) => {
                  const parts = e.target.value.split(' ');
                  handleHeaderChange('month', parts[0] || '');
                  handleHeaderChange('year', parts[1] || '');
                }}
                className="font-bold border-b border-black outline-none w-36 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Master Table Area: Left fixed panel + Right scrollable date panel */}
        <div className="flex w-full bg-white select-text">
          {/* 1. Left Fixed Panel (Stationary: Sr. No to Action for Abnormality + Signatures) */}
          <div className="w-[740px] shrink-0 border-r-2 border-black bg-white">
            <table className="w-full border-collapse text-xs table-fixed">
              <thead>
                <tr className="border-b border-black text-center text-[10.5px] font-bold bg-white h-[78px]">
                  <th className="border-r border-black p-1 align-middle w-[42px]">
                    Sr. No.
                  </th>
                  <th className="border-r border-black p-1 align-middle w-[68px]">
                    Machine No
                  </th>
                  <th className="border-r border-black p-1.5 align-middle w-[115px]">
                    Poka Yoke Name
                  </th>
                  <th className="border-r border-black p-1.5 align-middle w-[130px]">
                    PHOTO
                  </th>
                  <th className="border-r border-black p-2 align-middle w-[190px] text-left">
                    CHECKING METHOD
                  </th>
                  <th className="p-2 align-middle w-[195px] text-left">
                    ACTION FOR ABNORMALITY
                  </th>
                </tr>
              </thead>

              <tbody>
                {machinesList.map((mc, mIdx) => {
                  const isFirstRow = mIdx === 0;
                  const isHovered = hoveredRowId === mc.id;
                  return (
                    <tr
                      key={mc.id}
                      className={`border-b border-black h-[32px] transition-colors ${isHovered ? 'bg-amber-50/50' : 'bg-white'
                        }`}
                      onMouseEnter={() => setHoveredRowId(mc.id)}
                      onMouseLeave={() => setHoveredRowId(null)}
                    >
                      {/* Sr No */}
                      <td className="border-r border-black p-1 text-center font-bold text-xs align-middle">
                        {mIdx + 1}
                      </td>

                      {/* Machine No */}
                      <td className="border-r border-black p-1 text-center font-bold text-xs align-middle">
                        {mc.name}
                      </td>

                      {/* Poka Yoke Name (spanned across 6 rows) */}
                      {isFirstRow && (
                        <td
                          rowSpan={machinesList.length}
                          className="border-r border-black p-2 align-middle text-center font-bold text-xs leading-snug bg-white"
                        >
                          <div>Crimping Force Monitor</div>
                          <div>(CFM) on Manual Crimping</div>
                        </td>
                      )}

                      {/* PHOTO (spanned across 6 rows) */}
                      {isFirstRow && (
                        <td
                          rowSpan={machinesList.length}
                          className="border-r border-black p-1.5 align-middle text-center bg-white"
                        >
                          <div className="flex flex-col items-center gap-1">
                            {customPhoto ? (
                              <div className="relative group w-28 h-32 border border-slate-300 rounded overflow-hidden shadow-sm">
                                <img src={customPhoto} alt="CFM Screen" className="w-full h-full object-cover" />
                                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[11px] font-bold cursor-pointer transition-opacity">
                                  <Replace size={14} className="mr-1" /> Change
                                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                </label>
                              </div>
                            ) : (
                              <div className="w-28 h-32 bg-[#1a3845] border-2 border-emerald-400 rounded p-1 flex flex-col justify-between text-left text-white shadow-sm relative group">
                                <div className="text-[8.5px] font-mono text-emerald-300 font-bold border-b border-slate-700 pb-0.5 flex justify-between">
                                  <span>CFM PRESS</span>
                                  <span className="text-emerald-400">OK</span>
                                </div>
                                {/* Waveform graphic matching CFM press screen */}
                                <svg viewBox="0 0 100 50" className="w-full h-14 my-auto">
                                  <path
                                    d="M 5,45 L 22,45 Q 36,45 42,12 Q 48,-3 54,22 Q 60,45 80,45 L 95,45"
                                    fill="none"
                                    stroke="#34d399"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                  />
                                  <line x1="0" y1="45" x2="100" y2="45" stroke="#475569" strokeWidth="0.5" strokeDasharray="2" />
                                  <line x1="0" y1="18" x2="100" y2="18" stroke="#f87171" strokeWidth="0.5" strokeDasharray="2" />
                                </svg>
                                <div className="text-[8px] font-mono text-slate-300 flex justify-between border-t border-slate-700 pt-0.5">
                                  <span>Pk: 2.45 kN</span>
                                  <span className="text-emerald-300 font-bold">100% OK</span>
                                </div>
                                <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[9.5px] font-bold cursor-pointer transition-opacity">
                                  <Camera size={16} className="mb-0.5" />
                                  <span>Upload</span>
                                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                </label>
                              </div>
                            )}
                            <span className="text-[9px] font-black text-slate-800 leading-tight">
                              CFM Display Screen
                            </span>
                          </div>
                        </td>
                      )}

                      {/* CHECKING METHOD (spanned across 6 rows) */}
                      {isFirstRow && (
                        <td
                          rowSpan={machinesList.length}
                          className="border-r border-black p-2 align-middle text-[10px] leading-relaxed text-black bg-white"
                        >
                          <div className="font-black mb-0.5">ON SCREEN (VISUAL).</div>
                          <ul className="list-disc pl-3.5 space-y-0.5 text-black font-medium">
                            <li>Checked by increasing or decreasing cpm/feature, in running setup, CFM will give Error.</li>
                            <li>For less & more crimping batch, CFM will give Error.</li>
                            <li>Check password (Poka-yoke lock) given the Error.</li>
                          </ul>
                        </td>
                      )}

                      {/* ACTION FOR ABNORMALITY (spanned across 6 rows) */}
                      {isFirstRow && (
                        <td
                          rowSpan={machinesList.length}
                          className="p-2 align-middle text-[9.5px] leading-tight text-black bg-white"
                        >
                          <ul className="list-disc pl-3.5 space-y-0.5 text-black font-medium">
                            <li>Stop the machine.</li>
                            <li>Inform to Production/Maint service engineer.</li>
                            <li>Correction of Parameters.</li>
                            <li>Check all suspected lot (Visual).</li>
                            <li>CAN fill against observation.</li>
                            <li>4M fill (Retrospective action [C/M - single ckt check of all bunch - Visual 100%] & Suspected lot check).</li>
                          </ul>
                        </td>
                      )}
                    </tr>
                  );
                })}

                {/* Checked by Leader Label */}
                <tr className="border-b border-black bg-white h-[28px]">
                  <td
                    colSpan={6}
                    className="px-3 py-1 text-center font-bold text-xs text-black"
                  >
                    Checked by Leader
                  </td>
                </tr>

                {/* Verified By Label */}
                <tr className="bg-white h-[28px]">
                  <td
                    colSpan={6}
                    className="px-3 py-1 text-center font-bold text-xs text-black"
                  >
                    Verified By
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. Right Horizontally Scrollable Date Panel (Within table boundaries) */}
          <div className="flex-1 min-w-0 overflow-x-auto bg-white">
            <table className="border-collapse text-xs min-w-[1950px] table-fixed">
              <thead>
                {/* Row 1: DATE Header */}
                <tr className="border-b border-black text-center text-[10.5px] font-bold bg-white h-[20px]">
                  <th
                    colSpan={93}
                    className="p-0.5 font-black text-xs tracking-wider text-center bg-white"
                  >
                    DATE
                  </th>
                </tr>

                {/* Row 2: Date numbers 1 to 31 */}
                <tr className="border-b border-black text-center text-[10px] font-bold bg-white h-[20px]">
                  {DAYS.map((d) => (
                    <th
                      key={d}
                      colSpan={3}
                      className="border-r border-black p-0 font-bold text-center"
                      style={{ width: '63px', minWidth: '63px' }}
                    >
                      {d}
                    </th>
                  ))}
                </tr>

                {/* Row 3: Shift labels A, B, C under each date */}
                <tr className="border-b border-black text-center text-[9.5px] font-bold bg-white h-[20px]">
                  {DAYS.map((d) => (
                    <React.Fragment key={d}>
                      {SHIFTS.map((sh) => (
                        <th
                          key={`${d}_${sh}`}
                          className="border-r border-black p-0 text-center font-bold"
                          style={{ width: '21px', minWidth: '21px', maxWidth: '21px' }}
                        >
                          {sh}
                        </th>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>

                {/* Row 4: Sub-heading 1st PC */}
                <tr className="border-b border-black text-center text-[8px] font-normal bg-white text-slate-800 h-[18px]">
                  {DAYS.map((d) => (
                    <React.Fragment key={d}>
                      {SHIFTS.map((sh) => (
                        <th
                          key={`${d}_${sh}_sub`}
                          className="border-r border-black p-0 text-center font-normal"
                          style={{ width: '21px', minWidth: '21px', maxWidth: '21px' }}
                        >
                          1st PC
                        </th>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* 6 Machine Rows of Verification Cells */}
                {machinesList.map((mc) => {
                  const isHovered = hoveredRowId === mc.id;
                  return (
                    <tr
                      key={mc.id}
                      className={`border-b border-black h-[32px] transition-colors ${isHovered ? 'bg-amber-50/50' : 'bg-white'
                        }`}
                      onMouseEnter={() => setHoveredRowId(mc.id)}
                      onMouseLeave={() => setHoveredRowId(null)}
                    >
                      {DAYS.map((d) => (
                        <React.Fragment key={d}>
                          {SHIFTS.map((sh) => {
                            const k = `${mc.id}_d${d}_s${sh}`;
                            const val = gridValues[k] || '';
                            const isNotOk = val === 'X';
                            return (
                              <td
                                key={`${mc.id}_${d}_${sh}`}
                                onClick={() => cycleCellValue(mc.id, d, sh)}
                                className={`border-r border-black p-0 text-center align-middle h-[32px] cursor-pointer select-none transition-colors ${isNotOk
                                    ? 'bg-rose-100 text-rose-800 font-black'
                                    : val === '✓'
                                      ? 'bg-emerald-50/70 text-emerald-800 font-black'
                                      : 'hover:bg-amber-100/60'
                                  }`}
                                style={{ width: '21px', minWidth: '21px', maxWidth: '21px' }}
                                title={`${mc.name} — Day ${d}, Shift ${sh}: click to toggle or type`}
                              >
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => handleCellChange(mc.id, d, sh, e.target.value)}
                                  className="w-full h-full text-center font-bold text-[11px] border-0 outline-none bg-transparent"
                                  maxLength={3}
                                />
                              </td>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </tr>
                  );
                })}

                {/* Checked by Leader Row */}
                <tr className="border-b border-black bg-white h-[28px]">
                  {DAYS.map((d) => (
                    <React.Fragment key={d}>
                      {SHIFTS.map((sh) => {
                        const k = `leader_d${d}_s${sh}`;
                        return (
                          <td
                            key={k}
                            className="border-r border-black p-0 h-[28px] text-center"
                            style={{ width: '21px', minWidth: '21px', maxWidth: '21px' }}
                          >
                            <input
                              type="text"
                              value={gridValues[k] || ''}
                              onChange={(e) =>
                                setGridValues((prev) => ({
                                  ...prev,
                                  [k]: e.target.value
                                }))
                              }
                              className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>

                {/* Verified By Row */}
                <tr className="bg-white h-[28px]">
                  {DAYS.map((d) => (
                    <td
                      key={d}
                      colSpan={3}
                      className="border-r border-black p-0 h-[28px] text-center"
                      style={{ width: '63px', minWidth: '63px' }}
                    >
                      <input
                        type="text"
                        placeholder=""
                        value={gridValues[`verified_d${d}`] || ''}
                        onChange={(e) =>
                          setGridValues((prev) => ({
                            ...prev,
                            [`verified_d${d}`]: e.target.value
                          }))
                        }
                        className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Poka Yoke Observation Table (Fits 100% of visible card width, non-scrolling) */}
        <div className="p-3 px-3.5 pb-4 bg-white border-t-2 border-black">
          <div className="flex items-center justify-between mb-1">
            <div className="inline-block border border-black border-b-0 px-3 py-1 bg-white text-[11px] font-black text-black uppercase tracking-wide">
              Poka Yoke Observation
            </div>
            <button
              type="button"
              onClick={handleAddObservation}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer print:hidden shadow-sm"
              title="Add Row"
            >
              <Plus size={13} />
              <span>Add Row</span>
            </button>
          </div>

          <table className="w-full border-collapse border border-black text-[11px] bg-white">
            <thead>
              <tr className="bg-white">
                <th className="border border-black py-2 px-1.5 font-black text-black text-center" style={{ width: '13%' }}>
                  Date
                </th>
                <th className="border border-black py-2 px-1.5 font-black text-black text-center" style={{ width: '16%' }}>
                  Observation
                </th>
                <th className="border border-black py-2 px-1.5 font-black text-black text-center" style={{ width: '14%' }}>
                  Root Cause
                </th>
                <th className="border border-black py-2 px-1.5 font-black text-black text-center" style={{ width: '22%' }}>
                  Action Plan
                </th>
                <th className="border border-black py-2 px-1.5 font-black text-black text-center" style={{ width: '14%' }}>
                  Responsibility
                </th>
                <th className="border border-black py-2 px-1.5 font-black text-black text-center" style={{ width: '9%' }}>
                  Target Date
                </th>
                <th className="border border-black py-2 px-1.5 font-black text-black text-center" style={{ width: '12%' }}>
                  Review Status
                </th>
              </tr>
            </thead>
            <tbody>
              {observations.map((row) => (
                <tr key={row.id} className="h-10 hover:bg-yellow-50/20">
                  <td className="border border-black p-1 align-middle text-center">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => handleObservationChange(row.id, 'date', e.target.value)}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-center text-black outline-none cursor-pointer"
                    />
                  </td>
                  <td className="border border-black p-1 align-middle">
                    <input
                      type="text"
                      placeholder=""
                      value={row.observation}
                      onChange={(e) => handleObservationChange(row.id, 'observation', e.target.value)}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-black outline-none px-1"
                    />
                  </td>
                  <td className="border border-black p-1 align-middle">
                    <input
                      type="text"
                      placeholder=""
                      value={row.rootCause}
                      onChange={(e) => handleObservationChange(row.id, 'rootCause', e.target.value)}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-black outline-none px-1"
                    />
                  </td>
                  <td className="border border-black p-1 align-middle">
                    <input
                      type="text"
                      placeholder=""
                      value={row.actionPlan}
                      onChange={(e) => handleObservationChange(row.id, 'actionPlan', e.target.value)}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-black outline-none px-1"
                    />
                  </td>
                  <td className="border border-black p-1 align-middle text-center">
                    <input
                      type="text"
                      placeholder=""
                      value={row.responsibility}
                      onChange={(e) => handleObservationChange(row.id, 'responsibility', e.target.value)}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-center text-black outline-none"
                    />
                  </td>
                  <td className="border border-black p-1 align-middle text-center">
                    <input
                      type="date"
                      value={row.targetDate}
                      onChange={(e) => handleObservationChange(row.id, 'targetDate', e.target.value)}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-center text-black outline-none cursor-pointer"
                    />
                  </td>
                  <td className="border border-black p-1 align-middle text-center">
                    <select
                      value={row.reviewStatus}
                      onChange={(e) => handleObservationChange(row.id, 'reviewStatus', e.target.value)}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-center text-black outline-none cursor-pointer"
                    >
                      <option value="">- Select -</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed / Verified">Closed / Verified</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Document Control Bar - Non-scrolling, spans full card width */}
        <div className="border-t-2 border-black grid grid-cols-4 text-[11px] font-bold text-black text-center py-2 bg-white">
          <div className="border-r border-black px-2">{headerInfo.docNo}</div>
          <div className="border-r border-black px-2">{headerInfo.rev}</div>
          <div className="border-r border-black px-2">REV DATE : {headerInfo.revDate}</div>
          <div className="px-2">Issue date:- {headerInfo.issueDate}</div>
        </div>
      </div>
    </div>
  );
}
