import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import { ShieldAlert, Printer, Save, RotateCcw, Check, Plus, Trash2, Camera, Replace, Sparkles } from 'lucide-react';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

const DEFAULT_MACHINES = [
  { id: 1, name: 'MCR 01' },
  { id: 2, name: 'MCR 02' },
  { id: 3, name: 'MCR 03' },
  { id: 4, name: 'MCR 04' },
  { id: 5, name: 'MCR 05' },
  { id: 6, name: 'MCR 06' },
  { id: 7, name: 'MCR 07' },
  { id: 8, name: 'MCR 08' }
];

const INITIAL_OBSERVATIONS = [
  { id: 1, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' },
  { id: 2, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' },
  { id: 3, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' }
];

export default function PokayokeChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'MCR';
  const modelName = machine?.model || 'Mecal-05';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `mcr_pokayoke_${machineName}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      title: 'Poka Yoke Described By QA in manual process',
      timing: 'Shift Start / 1st Piece Inspection',
      month: 'OCTOBER',
      year: new Date().getFullYear().toString(),
      docNo: 'FRM-WH-QA-096',
      rev: '01',
      effDate: '01.01.2021'
    };
  });

  const [machinesList, setMachinesList] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_machines`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return DEFAULT_MACHINES;
  });

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

  const handleRemoveObservation = (id) => {
    setObservations((prev) => prev.filter((r) => r.id !== id));
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
    setSavedToast(`Filled Day ${dayNum} for all machines with ${selectedToolSymbol}!`);
    setTimeout(() => setSavedToast(''), 3000);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_header`, JSON.stringify(headerInfo));
      localStorage.setItem(`${storageKey}_machines`, JSON.stringify(machinesList));
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
        subtitle={`${displayMachine} — QA Poka-Yoke Manual Process Verification`}
        icon={ShieldAlert}
        iconBgClass="bg-rose-100 text-rose-800"
        onClose={onClose}
        onReset={handleReset}
        onSave={handleSave}
        savedToast={savedToast}
        showSwitcher={false}
        extraActions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shadow-sm"
              onClick={() => window.print()}
              title="Print Checksheet"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

          </div>
        }
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
      <div className="bg-white border-2 border-black p-2 md:p-3 shadow-md rounded-sm overflow-x-auto">
        <div className="min-w-[1900px] w-full text-black select-text">
          {/* Top Title Bar */}
          <div className="border border-black border-b-0 p-2 bg-slate-50 flex items-center justify-between">
            <div>
              <h1 className="text-base font-black text-black m-0 tracking-wide uppercase">
                {headerInfo.title}
              </h1>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mt-1">
                <span>Timing :</span>
                <input
                  type="text"
                  value={headerInfo.timing}
                  onChange={(e) => handleHeaderChange('timing', e.target.value)}
                  className="bg-transparent border-b border-slate-400 font-semibold text-xs outline-none w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <div>
                <span>MONTH / YEAR : </span>
                <input
                  type="text"
                  value={`${headerInfo.month} ${headerInfo.year}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(' ');
                    setHeaderChange('month', parts[0] || '');
                    setHeaderChange('year', parts[1] || '');
                  }}
                  className="font-bold border-b border-black outline-none w-32 bg-transparent"
                />
              </div>
              <div className="text-right text-[11px] font-bold text-slate-700">
                <div>DOC NO: {headerInfo.docNo}</div>
                <div>REV: {headerInfo.rev} | EFF DATE: {headerInfo.effDate}</div>
              </div>
            </div>
          </div>

          {/* Master Poka-Yoke Table Grid */}
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              {/* Row 1: Left descriptions + Date row across columns */}
              <tr className="border-b border-black text-center text-[10.5px] font-bold bg-slate-100">
                <th
                  rowSpan={3}
                  className="border-r border-black p-1 align-middle w-12 min-w-[45px]"
                >
                  Sr. No
                </th>
                <th
                  rowSpan={3}
                  className="border-r border-black p-1.5 align-middle w-28 min-w-[100px]"
                >
                  Machine No
                </th>
                <th
                  rowSpan={3}
                  className="border-r border-black p-1.5 align-middle w-36 min-w-[140px]"
                >
                  PHOTO
                </th>
                <th
                  rowSpan={3}
                  className="border-r border-black p-2 align-middle w-80 min-w-[300px] text-left"
                >
                  CHECKING METHOD
                </th>
                <th
                  rowSpan={3}
                  className="border-r border-black p-2 align-middle w-80 min-w-[300px] text-left"
                >
                  ACTION FOR ABNORMALITY
                </th>

                {/* Date numbers 1 to 31 */}
                {DAYS.map((d) => (
                  <th
                    key={d}
                    colSpan={3}
                    className="border-r border-black p-0.5 font-black text-xs text-center bg-slate-200"
                    style={{ minWidth: '66px' }}
                  >
                    {d}
                  </th>
                ))}
              </tr>

              {/* Row 2: Shift labels A, B, C under each day */}
              <tr className="border-b border-black text-center text-[10px] font-bold bg-slate-100">
                {DAYS.map((d) => (
                  <React.Fragment key={d}>
                    {SHIFTS.map((sh) => (
                      <th
                        key={`${d}_${sh}`}
                        className="border-r border-black p-0.5 text-center font-black"
                        style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
                      >
                        {sh}
                      </th>
                    ))}
                  </React.Fragment>
                ))}
              </tr>

              {/* Row 3: Sub-heading 1st PC */}
              <tr className="border-b border-black text-center text-[9px] font-bold bg-slate-50 text-slate-700">
                {DAYS.map((d) => (
                  <React.Fragment key={d}>
                    {SHIFTS.map((sh) => (
                      <th
                        key={`${d}_${sh}_sub`}
                        className="border-r border-black p-0 text-center font-semibold"
                        style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
                      >
                        1st
                      </th>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Machine Rows */}
              {machinesList.map((mc, mIdx) => {
                const isFirstRow = mIdx === 0;
                return (
                  <tr key={mc.id} className="border-b border-black hover:bg-slate-50/50 transition-colors">
                    {/* Sr No */}
                    <td className="border-r border-black p-1 text-center font-bold text-xs align-middle">
                      {mIdx + 1}
                    </td>

                    {/* Machine No */}
                    <td className="border-r border-black p-1.5 text-center font-bold text-xs align-middle bg-slate-50">
                      {mc.name}
                    </td>

                    {/* Photo Slot (rendered once spanning all machines or per-group) */}
                    {isFirstRow && (
                      <td
                        rowSpan={machinesList.length}
                        className="border-r border-black p-1.5 align-middle text-center bg-white"
                      >
                        <div className="flex flex-col items-center gap-1.5">
                          {customPhoto ? (
                            <div className="relative group w-32 h-36 border border-slate-300 rounded overflow-hidden shadow-sm">
                              <img src={customPhoto} alt="CFM Screen" className="w-full h-full object-cover" />
                              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[11px] font-bold cursor-pointer transition-opacity">
                                <Replace size={14} className="mr-1" /> Change
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                              </label>
                            </div>
                          ) : (
                            <div className="w-32 h-36 bg-slate-900 border-2 border-emerald-500 rounded p-1 flex flex-col justify-between text-left text-white shadow-sm relative group">
                              <div className="text-[9px] font-mono text-emerald-400 font-bold border-b border-slate-800 pb-0.5 flex justify-between">
                                <span>CFM PRESS</span>
                                <span>100% OK</span>
                              </div>
                              {/* Crimp Force Waveform Graphic */}
                              <svg viewBox="0 0 100 50" className="w-full h-16 my-auto">
                                <path
                                  d="M 5,45 L 20,45 Q 35,45 42,10 Q 48,-5 55,20 Q 62,45 80,45 L 95,45"
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                                <line x1="0" y1="45" x2="100" y2="45" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
                                <line x1="0" y1="20" x2="100" y2="20" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2" />
                              </svg>
                              <div className="text-[8.5px] font-mono text-slate-300 flex justify-between border-t border-slate-800 pt-0.5">
                                <span>Pk: 2.45 kN</span>
                                <span className="text-emerald-400 font-bold">PASS</span>
                              </div>
                              <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold cursor-pointer transition-opacity">
                                <Camera size={18} className="mb-0.5" />
                                <span>Upload Photo</span>
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                              </label>
                            </div>
                          )}
                          <span className="text-[10px] font-black text-slate-800 leading-tight">
                            CFM (Crimp Force Monitor)
                          </span>
                        </div>
                      </td>
                    )}

                    {/* Checking Method (spanned) */}
                    {isFirstRow && (
                      <td
                        rowSpan={machinesList.length}
                        className="border-r border-black p-2 align-middle text-[10.5px] leading-relaxed text-black bg-white"
                      >
                        <div className="font-black text-slate-900 mb-1">ON SCREEN (VISUAL).</div>
                        <ul className="list-disc pl-3.5 space-y-1 text-slate-800 font-semibold">
                          <li>Checked by loose crimp or terminal crimp on empty, CFM will give Error.</li>
                          <li>For less /More crimping batch, CFM will give Error.</li>
                          <li>Check personnel will give Error.</li>
                        </ul>
                      </td>
                    )}

                    {/* Action for Abnormality (spanned) */}
                    {isFirstRow && (
                      <td
                        rowSpan={machinesList.length}
                        className="border-r border-black p-2 align-middle text-[10.5px] leading-relaxed text-black bg-white"
                      >
                        <ul className="list-disc pl-3.5 space-y-1 text-slate-800 font-semibold">
                          <li>Stop the machine</li>
                          <li>Inform to Production/Maint service engineer</li>
                          <li>Correction of Parameters</li>
                          <li>Check all suspected lot (Visual)</li>
                          <li>4M fill against observation</li>
                          <li>
                            4M fill (Retroactive action [CH - single ckt check of all batch & Visual 100%] & Suspected lot check)
                          </li>
                        </ul>
                      </td>
                    )}

                    {/* Day / Shift Cells */}
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
                              className={`border-r border-black p-0 text-center align-middle h-[28px] cursor-pointer select-none transition-colors ${isNotOk
                                  ? 'bg-rose-100 text-rose-800 font-black'
                                  : val === '✓'
                                    ? 'bg-emerald-50/70 text-emerald-800 font-black'
                                    : 'hover:bg-amber-50/60'
                                }`}
                              style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
                              title={`${mc.name} — Day ${d}, Shift ${sh}: click to toggle or edit`}
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

              {/* Signatures: Production Leader */}
              <tr className="border-b border-black bg-slate-50/70">
                <td colSpan={5} className="border-r border-black px-3 py-1 text-left font-bold text-xs text-black">
                  Production Leader (Sign)
                </td>
                {DAYS.map((d) => (
                  <td
                    key={d}
                    colSpan={3}
                    className="border-r border-black p-0 h-[26px] text-center"
                    style={{ minWidth: '66px' }}
                  >
                    <input
                      type="text"
                      placeholder="Sign"
                      value={gridValues[`prod_leader_d${d}`] || ''}
                      onChange={(e) =>
                        setGridValues((prev) => ({
                          ...prev,
                          [`prod_leader_d${d}`]: e.target.value
                        }))
                      }
                      className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                    />
                  </td>
                ))}
              </tr>

              {/* Signatures: Section Incharge */}
              <tr className="border-b border-black bg-slate-50/70">
                <td colSpan={5} className="border-r border-black px-3 py-1 text-left font-bold text-xs text-black">
                  Section Incharge (Sign)
                </td>
                {DAYS.map((d) => (
                  <td
                    key={d}
                    colSpan={3}
                    className="border-r border-black p-0 h-[26px] text-center"
                    style={{ minWidth: '66px' }}
                  >
                    <input
                      type="text"
                      placeholder="Sign"
                      value={gridValues[`sec_incharge_d${d}`] || ''}
                      onChange={(e) =>
                        setGridValues((prev) => ({
                          ...prev,
                          [`sec_incharge_d${d}`]: e.target.value
                        }))
                      }
                      className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Table 2: Poka Yoke Observation Table */}
          <div className="mt-4 border-2 border-black">
            <div className="p-2 border-b-2 border-black bg-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-black text-black m-0 tracking-wide uppercase">
                Poka Yoke Observation
              </h2>
              <button
                type="button"
                onClick={handleAddObservation}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer print:hidden shadow-sm"
              >
                <Plus size={14} />
                <span>Add Observation Row</span>
              </button>
            </div>

            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-black text-center font-bold text-[11px] bg-slate-50">
                  <th className="border-r border-black p-1.5 w-28">Date</th>
                  <th className="border-r border-black p-1.5 w-64">Observation</th>
                  <th className="border-r border-black p-1.5 w-64">Root Cause</th>
                  <th className="border-r border-black p-1.5">Action Plan</th>
                  <th className="border-r border-black p-1.5 w-36">Responsibility</th>
                  <th className="border-r border-black p-1.5 w-28">Target Date</th>
                  <th className="border-r border-black p-1.5 w-32">Review Status</th>
                  <th className="p-1.5 w-12 print:hidden">Action</th>
                </tr>
              </thead>
              <tbody>
                {observations.map((row) => (
                  <tr key={row.id} className="border-b border-black hover:bg-yellow-50/30">
                    <td className="border-r border-black p-0">
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) => handleObservationChange(row.id, 'date', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        placeholder="Observation..."
                        value={row.observation}
                        onChange={(e) => handleObservationChange(row.id, 'observation', e.target.value)}
                        className="w-full h-8 px-2 text-xs border-0 outline-none bg-transparent font-medium"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        placeholder="Root cause..."
                        value={row.rootCause}
                        onChange={(e) => handleObservationChange(row.id, 'rootCause', e.target.value)}
                        className="w-full h-8 px-2 text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        placeholder="Action plan..."
                        value={row.actionPlan}
                        onChange={(e) => handleObservationChange(row.id, 'actionPlan', e.target.value)}
                        className="w-full h-8 px-2 text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        placeholder="Person resp."
                        value={row.responsibility}
                        onChange={(e) => handleObservationChange(row.id, 'responsibility', e.target.value)}
                        className="w-full h-8 px-2 text-center text-xs border-0 outline-none bg-transparent font-semibold"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="date"
                        value={row.targetDate}
                        onChange={(e) => handleObservationChange(row.id, 'targetDate', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <select
                        value={row.reviewStatus}
                        onChange={(e) => handleObservationChange(row.id, 'reviewStatus', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent font-semibold cursor-pointer"
                      >
                        <option value="">- Select -</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed / Verified">Closed / Verified</option>
                      </select>
                    </td>
                    <td className="p-0 text-center print:hidden">
                      <button
                        type="button"
                        onClick={() => handleRemoveObservation(row.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 cursor-pointer"
                        title="Remove row"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Document Control Bar */}
          <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-slate-700 px-2">
            <span>FURUKAWA MINDA ELECTRIC PVT. LTD.</span>
            <span>REV: {headerInfo.rev} | EFF DATE: {headerInfo.effDate}</span>
            <span>Doc No: {headerInfo.docNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
