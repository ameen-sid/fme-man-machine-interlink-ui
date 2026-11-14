import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import { CalendarCheck2, Printer, Plus, Check, Sparkles } from 'lucide-react';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

// Section 1: Related with m/c operations (7 items from physical screenshot CHK-WH-MT-003 Rev 01)
export const JCR_DAILY01_OPERATION_ITEMS = [
  {
    id: 'op1',
    pointEn: 'Check the cleaning of Applicator clamping area (Base Plate)',
    pointHi: 'Applicator clamping एरिया की सफाई को चेक करें (बेस प्लेट)',
    resp: 'Machine Operator',
    criteria: 'No chips /No dust',
    method: 'Visually',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op2',
    pointEn: 'Check working of nose plier interlocking',
    pointHi: 'नोज़ प्लायर की इंटरलॉकिंग को चेक करें',
    resp: 'Machine Operator',
    criteria: 'Machine will not operate when nose plier is not on its location',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op3',
    pointEn: 'Check Shut height adjust Bolt and Nut',
    pointHi: 'शट हाइट एडजस्टमेंट बोल्ट और नट को चेक करें',
    resp: 'Machine Operator',
    criteria: 'Should be tight',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op4',
    pointEn: 'Check the CFM (crimping force monitor )',
    pointHi: 'सीएफएम को चेक करें',
    resp: 'Machine Operator',
    criteria: 'Functioning OK',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op5',
    pointEn: 'Check the Auto /Manual Mode Functioning',
    pointHi: 'ऑटो मैन्युअल मोड को चेक करें काम कर रहा है या नहीं',
    resp: 'Machine Operator',
    criteria: 'Functioning OK',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op6',
    pointEn: 'Check safety cover operation and Interlocking',
    pointHi: 'सेफ्टी कवर के ऑपरेशन और इंटरलॉकिंग को चेक करें',
    resp: 'Machine Operator',
    criteria: 'Machine will not operate when safety cover is open and smooth operation of safety cover',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op7',
    pointEn: 'Check Emergency Switch Functioning',
    pointHi: 'आपातकालीन स्विच कामकाज की जाँच',
    resp: 'Machine Operator',
    criteria: 'Functioning ok',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  }
];

// Section 2: Related with m/c Poka-yoke (1 item)
export const JCR_DAILY01_POKAYOKE_ITEMS = [
  {
    id: 'py1',
    pointEn: 'Check The Safety Door condition or interlocking',
    pointHi: 'सेफ्टी कवर की कंडीशन और इंटरलॉकिंग को चेक करें',
    resp: 'Maint. Technician',
    criteria: 'Machine will not operate when safety cover is open and smooth operation of safety cover',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  }
];

// Section 3: Related with m/c Maintenance (2 items - Weekly)
export const JCR_DAILY01_MAINT_ITEMS = [
  {
    id: 'mt1',
    pointEn: 'Check The Ram Adjustment Bolt',
    pointHi: 'रैम एडजस्टमेंट बोल्ट को चेक करें',
    resp: 'Maint. Technician',
    criteria: 'Tightning / No Damage',
    method: 'Test & trial',
    freqD: '',
    freqW: '✓',
    shifts: ['A']
  },
  {
    id: 'mt2',
    pointEn: 'Electrical Panel Cleaning & Ensure The Panel Conditions and Proper Lock',
    pointHi: 'इलेक्ट्रिकल पैनल की सफाई और सुनिश्चित करें कि पैनल की स्थिति और उचित लॉक हो',
    resp: 'Maint. Technician',
    criteria: 'Cleaning /Fitment',
    method: 'Visually',
    freqD: '',
    freqW: '✓',
    shifts: ['A']
  }
];

const INITIAL_ABNORMALITIES = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  date: '',
  shift: '',
  area: '',
  specificArea: '',
  abnormality: '',
  immediateAction: '',
  resp: '',
  targetDateTime: '',
  status: '',
  operatorFeedback: '',
  maintSupervisor: '',
  prodSupervisor: ''
}));

export default function DailyChecksheet01({ machine, onClose }) {
  const machineName = machine?.name || 'JCR 01';
  const modelName = machine?.model || 'JCR-01';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `jcr_daily_01_${machineName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      docNo: 'CHK-WH-MT-003',
      rev: 'REV-01',
      date: '04.01.2021',
      machineName: 'Regento (2 ton / 4 ton)',
      machineNo: machineName,
      month: 'OCTOBER',
      year: new Date().getFullYear().toString(),
      remarks: '',
      prodSupervisorSign: '',
      maintSupervisorSign: ''
    };
  });

  const [gridValues, setGridValues] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {};
  });

  const [abnormalities, setAbnormalities] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_abnormalities`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_ABNORMALITIES;
  });

  const [savedToast, setSavedToast] = useState('');
  const [selectedToolSymbol, setSelectedToolSymbol] = useState('✓');

  const handleHeaderChange = (key, val) => {
    setHeaderInfo((prev) => ({ ...prev, [key]: val }));
  };

  const handleCellChange = (key, val) => {
    setGridValues((prev) => ({ ...prev, [key]: val }));
  };

  const cycleCellValue = (key) => {
    const current = gridValues[key] || '';
    const symbols = ['', '✓', 'X', '⨂', 'N/A'];
    const idx = symbols.indexOf(current);
    const next = idx === -1 ? '✓' : symbols[(idx + 1) % symbols.length];
    handleCellChange(key, next);
  };

  const handleAbnormalityChange = (id, field, val) => {
    setAbnormalities((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleAddAbnormality = () => {
    setAbnormalities((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: '',
        shift: '',
        area: '',
        specificArea: '',
        abnormality: '',
        immediateAction: '',
        resp: '',
        targetDateTime: '',
        status: '',
        operatorFeedback: '',
        maintSupervisor: '',
        prodSupervisor: ''
      }
    ]);
  };

  const handleQuickFillCurrentDay = (dayNum) => {
    const updated = { ...gridValues };
    const allItems = [
      ...JCR_DAILY01_OPERATION_ITEMS,
      ...JCR_DAILY01_POKAYOKE_ITEMS,
      ...JCR_DAILY01_MAINT_ITEMS
    ];

    allItems.forEach((item) => {
      item.shifts.forEach((sh) => {
        const k = `${item.id}_d${dayNum}_s${sh}`;
        if (!updated[k]) {
          updated[k] = selectedToolSymbol;
        }
      });
    });

    setGridValues(updated);
    setSavedToast(`Filled Day ${dayNum} with ${selectedToolSymbol}!`);
    setTimeout(() => setSavedToast(''), 3000);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_header`, JSON.stringify(headerInfo));
      localStorage.setItem(`${storageKey}_grid`, JSON.stringify(gridValues));
      localStorage.setItem(`${storageKey}_abnormalities`, JSON.stringify(abnormalities));
      setSavedToast('Daily Checksheet 01 saved successfully!');
      setTimeout(() => setSavedToast(''), 3000);
    } catch (e) {
      setSavedToast('Error saving data to local storage.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all verification records and abnormality entries on this sheet?')) {
      setGridValues({});
      setAbnormalities(INITIAL_ABNORMALITIES);
      try {
        localStorage.removeItem(`${storageKey}_grid`);
        localStorage.removeItem(`${storageKey}_abnormalities`);
      } catch (e) { }
      setSavedToast('Checksheet records reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  // Helper renderer for item row
  const renderItemRow = (item, idx) => {
    const isMultiShift = item.shifts.length > 1;

    return (
      <React.Fragment key={item.id}>
        <tr className="border-b border-black hover:bg-slate-50/50 transition-colors">
          {/* Activity / Check point */}
          <td className="border-r border-black p-1 text-left align-middle w-80 min-w-[280px]">
            <div className="font-bold text-[11px] text-black leading-tight">
              {item.pointEn}
            </div>
            {item.pointHi && (
              <div className="text-[10px] text-slate-700 font-medium leading-tight mt-0.5">
                {item.pointHi}
              </div>
            )}
          </td>

          {/* Resp / Who */}
          <td className="border-r border-black p-1 text-center font-bold text-[10.5px] align-middle w-24">
            {item.resp}
          </td>

          {/* STD VALUE */}
          <td className="border-r border-black p-1 text-left font-medium text-[10px] align-middle w-52 leading-tight">
            {item.criteria}
          </td>

          {/* Measuring Method */}
          <td className="border-r border-black p-1 text-center font-bold text-[10.5px] align-middle w-20">
            {item.method}
          </td>

          {/* FREQ: D / W */}
          <td className="border-r border-black p-0.5 text-center font-black text-xs w-6">
            {item.freqD}
          </td>
          <td className="border-r border-black p-0.5 text-center font-black text-xs w-6">
            {item.freqW}
          </td>
          <td className="border-r border-black p-0.5 text-center font-black text-xs w-6">
            {item.freqS || ''}
          </td>

          {/* Shift Label A */}
          <td className="border-r border-black p-0.5 text-center font-bold text-[10px] bg-slate-50 w-7">
            A
          </td>

          {/* 31 Day Cells for Shift A */}
          {DAYS.map((d) => {
            const k = `${item.id}_d${d}_sA`;
            const val = gridValues[k] || '';
            const isNotOk = val === 'X' || val === '⨂';
            return (
              <td
                key={d}
                onClick={() => cycleCellValue(k)}
                className={`border-r border-black p-0 text-center align-middle h-[24px] cursor-pointer select-none transition-colors ${
                  isNotOk
                    ? 'bg-rose-100 text-rose-800 font-black'
                    : val === '✓'
                    ? 'bg-emerald-50/70 text-emerald-800 font-black'
                    : 'hover:bg-amber-50/60'
                }`}
                style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
                title={`${item.pointEn} — Day ${d}, Shift A: click to toggle`}
              >
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleCellChange(k, e.target.value)}
                  className="w-full h-full text-center font-bold text-[11px] border-0 outline-none bg-transparent"
                  maxLength={3}
                />
              </td>
            );
          })}
        </tr>

        {/* Shift B row */}
        {isMultiShift && (
          <tr className="border-b border-black hover:bg-slate-50/50 transition-colors">
            <td colSpan={7} className="hidden"></td>
            <td className="border-r border-black p-0.5 text-center font-bold text-[10px] bg-slate-50 w-7">
              B
            </td>
            {DAYS.map((d) => {
              const k = `${item.id}_d${d}_sB`;
              const val = gridValues[k] || '';
              const isNotOk = val === 'X' || val === '⨂';
              return (
                <td
                  key={d}
                  onClick={() => cycleCellValue(k)}
                  className={`border-r border-black p-0 text-center align-middle h-[24px] cursor-pointer select-none transition-colors ${
                    isNotOk
                      ? 'bg-rose-100 text-rose-800 font-black'
                      : val === '✓'
                      ? 'bg-emerald-50/70 text-emerald-800 font-black'
                      : 'hover:bg-amber-50/60'
                  }`}
                  style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
                  title={`${item.pointEn} — Day ${d}, Shift B: click to toggle`}
                >
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleCellChange(k, e.target.value)}
                    className="w-full h-full text-center font-bold text-[11px] border-0 outline-none bg-transparent"
                    maxLength={3}
                  />
                </td>
              );
            })}
          </tr>
        )}

        {/* Shift C row */}
        {isMultiShift && (
          <tr className="border-b border-black hover:bg-slate-50/50 transition-colors">
            <td colSpan={7} className="hidden"></td>
            <td className="border-r border-black p-0.5 text-center font-bold text-[10px] bg-slate-50 w-7">
              C
            </td>
            {DAYS.map((d) => {
              const k = `${item.id}_d${d}_sC`;
              const val = gridValues[k] || '';
              const isNotOk = val === 'X' || val === '⨂';
              return (
                <td
                  key={d}
                  onClick={() => cycleCellValue(k)}
                  className={`border-r border-black p-0 text-center align-middle h-[24px] cursor-pointer select-none transition-colors ${
                    isNotOk
                      ? 'bg-rose-100 text-rose-800 font-black'
                      : val === '✓'
                      ? 'bg-emerald-50/70 text-emerald-800 font-black'
                      : 'hover:bg-amber-50/60'
                  }`}
                  style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
                  title={`${item.pointEn} — Day ${d}, Shift C: click to toggle`}
                >
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleCellChange(k, e.target.value)}
                    className="w-full h-full text-center font-bold text-[11px] border-0 outline-none bg-transparent"
                    maxLength={3}
                  />
                </td>
              );
            })}
          </tr>
        )}
      </React.Fragment>
    );
  };

  // Helper renderer for signature row
  const renderSignatureRow = (label, signPrefix) => (
    <tr className="border-b border-black bg-white h-[26px]">
      <td
        colSpan={8}
        className="border-r border-black px-3 py-0.5 text-left font-bold text-xs text-black"
      >
        {label}
      </td>
      {DAYS.map((d) => {
        const signKey = `${signPrefix}_d${d}`;
        return (
          <td
            key={d}
            className="border-r border-black p-0 h-[26px] text-center"
            style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
          >
            <input
              type="text"
              value={gridValues[signKey] || ''}
              onChange={(e) => handleCellChange(signKey, e.target.value)}
              title={`${label} Day ${d}`}
              className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
            />
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Top Navigation */}
      <ChecksheetHeaderNav
        title="MACHINE DAILY CHECKSHEET 01"
        subtitle={`${displayMachine} — Regento (2 ton / 4 ton) Daily Check Sheet (CHK-WH-MT-003 Rev 01)`}
        icon={CalendarCheck2}
        iconBgClass="bg-blue-100 text-blue-800"
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

      {/* Quick Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span>Active Symbol:</span>
          {['✓', 'X', '⨂', 'N/A'].map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => setSelectedToolSymbol(sym)}
              className={`px-2.5 py-1 rounded border text-xs font-black cursor-pointer transition-colors ${
                selectedToolSymbol === sym
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {sym}
            </button>
          ))}
          <span className="text-[11px] text-slate-500 font-normal ml-2">
            (Click cell to cycle or enter text directly)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Quick Fill Today:</span>
          <select
            defaultValue={new Date().getDate()}
            onChange={(e) => handleQuickFillCurrentDay(Number(e.target.value))}
            className="text-xs font-bold border border-slate-300 rounded px-2 py-1 bg-white cursor-pointer"
          >
            {DAYS.map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleQuickFillCurrentDay(new Date().getDate())}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded cursor-pointer transition-colors shadow-sm"
          >
            <Sparkles size={13} />
            <span>Fill Today</span>
          </button>
        </div>
      </div>

      {/* Main Sheet Container */}
      <div className="bg-white border-2 border-black p-2 md:p-3 shadow-md rounded-sm overflow-x-auto">
        <div className="min-w-[1550px] w-full text-black select-text font-sans">
          {/* Top Company Header & Document Control Info */}
          <div className="border border-black border-b-0 p-2 bg-white flex items-start justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-black m-0 uppercase tracking-wider">
                DAILY CHECK SHEET
              </h1>
              <div className="flex items-center gap-2 text-xs font-bold mt-2">
                <span>Machine Name :</span>
                <input
                  type="text"
                  value={headerInfo.machineName}
                  onChange={(e) => handleHeaderChange('machineName', e.target.value)}
                  className="border-b border-black outline-none font-bold text-xs bg-transparent w-64"
                />
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-black text-xs text-black uppercase tracking-wider mb-1">
                FURUKAWA MINDA ELECTRIC PVT. LTD.
              </span>
              <div className="border border-black text-[11px] font-bold bg-white text-right divide-y divide-black w-48">
                <div className="px-2 py-0.5 flex items-center justify-between">
                  <span>Doc No. :</span>
                  <span>{headerInfo.docNo}</span>
                </div>
                <div className="px-2 py-0.5 flex items-center justify-between">
                  <span>REV:</span>
                  <span>{headerInfo.rev}</span>
                </div>
                <div className="px-2 py-0.5 flex items-center justify-between">
                  <span>DATE:</span>
                  <span>{headerInfo.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold mt-1.5">
                <span>Machine No.</span>
                <input
                  type="text"
                  value={headerInfo.machineNo}
                  onChange={(e) => handleHeaderChange('machineNo', e.target.value)}
                  className="border-b border-black outline-none font-bold text-xs bg-transparent w-32 text-center"
                />
              </div>
            </div>
          </div>

          {/* Master Table Grid */}
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              {/* Row 1: Left headers + Daily Status across days */}
              <tr className="border-b border-black text-center text-[10.5px] font-bold bg-slate-100">
                <th
                  rowSpan={2}
                  className="border-r border-black p-1 align-middle w-80 min-w-[280px]"
                >
                  STARTUP CHECK POINTS<br />( SHIFT CONFIRMATION )
                </th>
                <th
                  rowSpan={2}
                  className="border-r border-black p-1 align-middle w-24"
                >
                  Resp.
                </th>
                <th
                  rowSpan={2}
                  className="border-r border-black p-1 align-middle w-52"
                >
                  Check Value
                </th>
                <th
                  rowSpan={2}
                  className="border-r border-black p-1 align-middle w-20"
                >
                  Method
                </th>
                <th
                  colSpan={3}
                  className="border-r border-black p-0.5 text-center font-bold"
                >
                  FREQ
                </th>
                <th
                  rowSpan={2}
                  className="border-r border-black p-0.5 text-center font-bold text-[10px] w-7"
                >
                  Shift
                </th>
                <th
                  colSpan={31}
                  className="p-1 font-bold text-xs text-center bg-slate-200"
                >
                  Daily Status
                </th>
              </tr>

              {/* Row 2: Sub-headers for FREQ & Days 1 to 31 */}
              <tr className="border-b border-black text-center text-[10px] font-bold bg-slate-100">
                <th className="border-r border-black p-0.5 w-6">D</th>
                <th className="border-r border-black p-0.5 w-6">W</th>
                <th className="border-r border-black p-0.5 w-6">S</th>
                {DAYS.map((d) => (
                  <th
                    key={d}
                    className="border-r border-black p-0.5 font-bold text-center"
                    style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
                  >
                    {d}
                  </th>
                ))}
              </tr>

              {/* Sub-header row for Activity, Who, STD VALUE, Measuring Method */}
              <tr className="border-b border-black text-center text-[9.5px] font-bold bg-slate-50 text-slate-800">
                <th className="border-r border-black p-0.5 text-center">ACTIVITY</th>
                <th className="border-r border-black p-0.5 text-center">Who</th>
                <th className="border-r border-black p-0.5 text-center">STD VALUE</th>
                <th className="border-r border-black p-0.5 text-center">Measuring Method</th>
                <th colSpan={3} className="border-r border-black p-0.5"></th>
                <th className="border-r border-black p-0.5"></th>
                {DAYS.map((d) => (
                  <th
                    key={d}
                    className="border-r border-black p-0"
                    style={{ width: '22px', minWidth: '22px', maxWidth: '22px' }}
                  ></th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Category 1: Related with m/c operations */}
              <tr className="border-b border-black bg-slate-200 text-left font-black text-xs">
                <td colSpan={39} className="px-3 py-1 italic tracking-wide">
                  Related with m/c operations
                </td>
              </tr>
              {JCR_DAILY01_OPERATION_ITEMS.map((item, idx) => renderItemRow(item, idx))}

              {/* Operator Signatures for Shifts A, B, C */}
              {renderSignatureRow('Filled By (M/C Operator Sign) (A Shift-         )', 'filled_by_A')}
              {renderSignatureRow('Filled By (M/C Operator Sign) (B Shift-         )', 'filled_by_B')}
              {renderSignatureRow('Filled By (M/C Operator Sign) (C Shift-         )', 'filled_by_C')}
              {renderSignatureRow('Supervisor - Production (Sign)', 'supervisor_prod')}

              {/* Category 2: Related with m/c Poka-yoke */}
              <tr className="border-b border-black bg-slate-200 text-left font-black text-xs">
                <td colSpan={39} className="px-3 py-1 italic tracking-wide">
                  Related with m/c Poka-yoke
                </td>
              </tr>
              {JCR_DAILY01_POKAYOKE_ITEMS.map((item, idx) => renderItemRow(item, idx))}

              {/* Maintenance Associate Signatures */}
              {renderSignatureRow('Checked & Corrected By (Maint. Associate Sign) (A Shift-        )', 'maint_assoc_A')}
              {renderSignatureRow('Checked & Corrected By (Maint. Associate Sign) (B Shift-        )', 'maint_assoc_B')}
              {renderSignatureRow('Checked & Corrected By (Maint. Associate Sign) (C Shift-        )', 'maint_assoc_C')}

              {/* Category 3: Related with m/c Maintenance */}
              <tr className="border-b border-black bg-slate-200 text-left font-black text-xs">
                <td colSpan={39} className="px-3 py-1 italic tracking-wide">
                  Related with m/c Maintenance
                </td>
              </tr>
              {JCR_DAILY01_MAINT_ITEMS.map((item, idx) => renderItemRow(item, idx))}

              {/* Maintenance Signatures */}
              {renderSignatureRow('Technician - Maintenance (Sign)', 'technician_maint')}
              {renderSignatureRow('Supervisor - Maintenance (Sign)', 'supervisor_maint')}
            </tbody>
          </table>

          {/* Legend and Footer Notice */}
          <div className="mt-2 border border-black p-2 bg-slate-50 text-[10px] text-slate-800 leading-snug">
            <div className="font-semibold">*Checking Frequency of Daily/ Shift: Shift Start</div>
            <div className="font-semibold">*Checking Frequency of Weekly: First day of week</div>
            <div className="font-bold text-black mt-1">[LEGANDS]</div>
            <div>1) PUT (✓) FOR OK CONDITION</div>
            <div>2) PUT (X) FOR NOT OK CONDITION</div>
            <div>3) TAKE NECESSERY ACTION AND ENCIRCLE ON THE CROSS MARK ( ⨂ ) AND FILL THE COUNTERACTION SHEET.</div>
            <div className="text-right text-[10px] font-bold text-slate-700 mt-1">
              FRM/MT/04
            </div>
          </div>

          {/* Section 4: Abnormality Observation & Action Sheet (Screenshots 2, 3, 4) */}
          <div className="mt-4 border-2 border-blue-600 bg-white shadow-sm">
            <div className="p-2 border-b-2 border-blue-600 bg-white flex items-center justify-between">
              <h2 className="text-sm font-black text-black m-0 tracking-wide uppercase text-center w-full">
                Abnormality Observation & Action Sheet
              </h2>
              <button
                type="button"
                onClick={handleAddAbnormality}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer print:hidden shrink-0 shadow-sm"
              >
                <Plus size={14} />
                <span>Add Row</span>
              </button>
            </div>

            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-black text-center font-bold text-[10.5px] bg-slate-50">
                  <th className="border-r border-black p-1.5 w-24">Date</th>
                  <th className="border-r border-black p-1.5 w-14">Shift</th>
                  <th className="border-r border-black p-1.5 w-24">Area</th>
                  <th className="border-r border-black p-1.5 w-28">Specific Area</th>
                  <th className="border-r border-black p-1.5 w-72">Abnormailaity</th>
                  <th className="border-r border-black p-1.5 w-64">Immediate Action Req.</th>
                  <th className="border-r border-black p-1.5 w-20">Resp.</th>
                  <th className="border-r border-black p-1.5 w-28">Target Date /Time</th>
                  <th className="border-r border-black p-1.5 w-20">Status</th>
                  <th className="border-r border-black p-1.5 w-40">Operator Feedback</th>
                  <th className="border-r border-black p-1.5 w-28">Maint. Supervisor</th>
                  <th className="p-1.5 w-28">Production Supervisor</th>
                </tr>
              </thead>
              <tbody>
                {abnormalities.map((row) => (
                  <tr key={row.id} className="border-b border-black hover:bg-yellow-50/30">
                    <td className="border-r border-black p-0">
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) => handleAbnormalityChange(row.id, 'date', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent cursor-pointer"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <select
                        value={row.shift}
                        onChange={(e) => handleAbnormalityChange(row.id, 'shift', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent font-semibold cursor-pointer"
                      >
                        <option value="">-</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        value={row.area}
                        onChange={(e) => handleAbnormalityChange(row.id, 'area', e.target.value)}
                        className="w-full h-8 px-1.5 text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        value={row.specificArea}
                        onChange={(e) => handleAbnormalityChange(row.id, 'specificArea', e.target.value)}
                        className="w-full h-8 px-1.5 text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        value={row.abnormality}
                        onChange={(e) => handleAbnormalityChange(row.id, 'abnormality', e.target.value)}
                        className="w-full h-8 px-2 text-xs border-0 outline-none bg-transparent font-medium"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        value={row.immediateAction}
                        onChange={(e) => handleAbnormalityChange(row.id, 'immediateAction', e.target.value)}
                        className="w-full h-8 px-2 text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        value={row.resp}
                        onChange={(e) => handleAbnormalityChange(row.id, 'resp', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent font-semibold"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={row.targetDateTime}
                        onChange={(e) => handleAbnormalityChange(row.id, 'targetDateTime', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <select
                        value={row.status}
                        onChange={(e) => handleAbnormalityChange(row.id, 'status', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent font-semibold cursor-pointer"
                      >
                        <option value="">-</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        value={row.operatorFeedback}
                        onChange={(e) => handleAbnormalityChange(row.id, 'operatorFeedback', e.target.value)}
                        className="w-full h-8 px-1.5 text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0">
                      <input
                        type="text"
                        placeholder="Sign"
                        value={row.maintSupervisor}
                        onChange={(e) => handleAbnormalityChange(row.id, 'maintSupervisor', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="p-0">
                      <input
                        type="text"
                        placeholder="Sign"
                        value={row.prodSupervisor}
                        onChange={(e) => handleAbnormalityChange(row.id, 'prodSupervisor', e.target.value)}
                        className="w-full h-8 px-1 text-center text-xs border-0 outline-none bg-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Bottom Remarks & Supervisor Signature Boxes (Screenshot 4) */}
            <div className="border-t-2 border-black flex items-stretch justify-between p-2 bg-white">
              {/* Left Remarks */}
              <div className="flex-1 pr-4">
                <span className="font-bold text-xs text-black">[Remarks]</span>
                <textarea
                  rows={2}
                  value={headerInfo.remarks}
                  onChange={(e) => handleHeaderChange('remarks', e.target.value)}
                  placeholder="Enter remarks..."
                  className="w-full mt-1 p-1 text-xs border border-slate-300 rounded outline-none resize-none font-medium"
                />
              </div>

              {/* Right Supervisors Signature Boxes */}
              <div className="flex items-center gap-3">
                <div className="border border-black w-40 text-center bg-white">
                  <div className="h-10 border-b border-black flex items-center justify-center p-1">
                    <input
                      type="text"
                      placeholder="Sign"
                      value={headerInfo.prodSupervisorSign}
                      onChange={(e) => handleHeaderChange('prodSupervisorSign', e.target.value)}
                      className="w-full text-center text-xs font-semibold outline-none border-0 bg-transparent"
                    />
                  </div>
                  <div className="p-1 text-[11px] font-bold text-black bg-slate-50">
                    Production Supervisor
                  </div>
                </div>

                <div className="border border-black w-40 text-center bg-white">
                  <div className="h-10 border-b border-black flex items-center justify-center p-1">
                    <input
                      type="text"
                      placeholder="Sign"
                      value={headerInfo.maintSupervisorSign}
                      onChange={(e) => handleHeaderChange('maintSupervisorSign', e.target.value)}
                      className="w-full text-center text-xs font-semibold outline-none border-0 bg-transparent"
                    />
                  </div>
                  <div className="p-1 text-[11px] font-bold text-black bg-slate-50">
                    Maintenance Supervisor
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

