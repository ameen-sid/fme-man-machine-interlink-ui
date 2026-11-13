import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import { Gauge, Printer, Check, RotateCcw } from 'lucide-react';

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

// Instrument 1: Point Micrometer Check Points (from screenshot)
export const JCR_POINT_MICROMETER_POINTS = [
  { id: 1, sNo: '1', checkPoint: 'ANVIL BLADE CONDITION', frequency: 'DAILY' },
  { id: 2, sNo: '2', checkPoint: 'SPINDLE CONDITION', frequency: 'DAILY' },
  { id: 3, sNo: '3', checkPoint: 'DISPLAY CONDITION', frequency: 'DAILY' },
  { id: 4, sNo: '4', checkPoint: 'SWITCH CONDITION', frequency: 'DAILY' },
  { id: 5, sNo: '5', checkPoint: 'RACHET CONDITION', frequency: 'DAILY' },
  { id: 6, sNo: '6', checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

// Instrument 2: Measuring Scale Check Points (from screenshot)
export const JCR_SCALE_POINTS = [
  { id: 1, sNo: '1', checkPoint: 'VISUAL CONDITION', frequency: 'DAILY' },
  { id: 2, sNo: '2', checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

function createInitialGrid(pointCount) {
  const grid = {};
  for (let p = 1; p <= pointCount; p++) {
    grid[p] = {};
    for (let d = 1; d <= 31; d++) {
      grid[p][d] = { A: '', B: '', C: '' };
    }
  }
  return grid;
}

function createSignGrid() {
  const grid = {};
  for (let d = 1; d <= 31; d++) {
    grid[d] = { A: '', B: '', C: '' };
  }
  return grid;
}

const DEFAULT_WEEKLY = [
  { point: 'ANVIL CONDITION', isCalibration: false, sublabel: '', w1: '', w2: '', w3: '', w4: '' },
  { point: 'ZERO SETTING', isCalibration: false, sublabel: '', w1: '', w2: '', w3: '', w4: '' },
  { point: 'CALIBRATION', isCalibration: true, sublabel: 'Gauge', w1: '', w2: '', w3: '', w4: '' },
  { point: 'CALIBRATION', isCalibration: true, sublabel: 'Actual', w1: '', w2: '', w3: '', w4: '' },
  { point: 'ANY OTHER', isCalibration: false, sublabel: '', w1: '', w2: '', w3: '', w4: '' },
  { point: 'ENGG. SIGN.', isCalibration: false, sublabel: '', w1: '', w2: '', w3: '', w4: '' }
];

export default function JcrInstrumentChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'JCR 01';
  const modelName = machine?.model || 'JCR-01';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `jcr_instrument_${machineName}`;

  // Point Micrometer Meta
  const [pointMeta, setPointMeta] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_meta`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      name: 'POINT MICROMETER',
      no: machineName || 'JCR-01',
      location: 'Joint Crimping',
      month: ''
    };
  });

  // Measuring Scale Meta
  const [scaleMeta, setScaleMeta] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_meta`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      name: 'Measuring Scale',
      no: '',
      location: 'Joint Crimping',
      month: ''
    };
  });

  // Grids
  const [pointGrid, setPointGrid] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return createInitialGrid(6);
  });

  const [pointChecked, setPointChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_checked`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return createSignGrid();
  });

  const [pointConfirmed, setPointConfirmed] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_confirmed`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return createSignGrid();
  });

  const [weeklyData, setWeeklyData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_weekly`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return DEFAULT_WEEKLY;
  });

  const [scaleGrid, setScaleGrid] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return createInitialGrid(2);
  });

  const [scaleChecked, setScaleChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_checked`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return createSignGrid();
  });

  const [scaleConfirmed, setScaleConfirmed] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_confirmed`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return createSignGrid();
  });

  const [savedToast, setSavedToast] = useState('');
  const [selectedToolSymbol, setSelectedToolSymbol] = useState('✓');

  const handleCellChange = (setGridFn, pointId, day, shift, value) => {
    setGridFn((prev) => {
      const copy = { ...prev };
      if (!copy[pointId]) copy[pointId] = {};
      if (!copy[pointId][day]) copy[pointId][day] = {};
      copy[pointId][day] = { ...copy[pointId][day], [shift]: value };
      return copy;
    });
  };

  const cycleCell = (setGridFn, pointId, day, shift, currentVal) => {
    const symbols = ['', '✓', 'X', 'O', 'N/A'];
    const next = symbols[(symbols.indexOf(currentVal) + 1) % symbols.length];
    handleCellChange(setGridFn, pointId, day, shift, next);
  };

  const handleSignCellChange = (setGridFn, day, shift, value) => {
    setGridFn((prev) => {
      const copy = { ...prev };
      if (!copy[day]) copy[day] = {};
      copy[day] = { ...copy[day], [shift]: value };
      return copy;
    });
  };

  const handleWeeklyChange = (idx, field, val) => {
    setWeeklyData((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_point_meta`, JSON.stringify(pointMeta));
      localStorage.setItem(`${storageKey}_scale_meta`, JSON.stringify(scaleMeta));
      localStorage.setItem(`${storageKey}_point_grid`, JSON.stringify(pointGrid));
      localStorage.setItem(`${storageKey}_point_checked`, JSON.stringify(pointChecked));
      localStorage.setItem(`${storageKey}_point_confirmed`, JSON.stringify(pointConfirmed));
      localStorage.setItem(`${storageKey}_weekly`, JSON.stringify(weeklyData));
      localStorage.setItem(`${storageKey}_scale_grid`, JSON.stringify(scaleGrid));
      localStorage.setItem(`${storageKey}_scale_checked`, JSON.stringify(scaleChecked));
      localStorage.setItem(`${storageKey}_scale_confirmed`, JSON.stringify(scaleConfirmed));
      setSavedToast('Instrument Checksheet saved successfully!');
      setTimeout(() => setSavedToast(''), 3000);
    } catch (e) {
      setSavedToast('Error saving data.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all values on this Instrument Checksheet?')) {
      setPointGrid(createInitialGrid(6));
      setPointChecked(createSignGrid());
      setPointConfirmed(createSignGrid());
      setWeeklyData(DEFAULT_WEEKLY);
      setScaleGrid(createInitialGrid(2));
      setScaleChecked(createSignGrid());
      setScaleConfirmed(createSignGrid());
      try {
        localStorage.removeItem(`${storageKey}_point_grid`);
        localStorage.removeItem(`${storageKey}_point_checked`);
        localStorage.removeItem(`${storageKey}_point_confirmed`);
        localStorage.removeItem(`${storageKey}_weekly`);
        localStorage.removeItem(`${storageKey}_scale_grid`);
        localStorage.removeItem(`${storageKey}_scale_checked`);
        localStorage.removeItem(`${storageKey}_scale_confirmed`);
      } catch (e) { }
      setSavedToast('Checksheet reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const renderDailyTable = (points, grid, setGridFn, checkedGrid, setCheckedFn, confirmedGrid, setConfirmedFn) => (
    <table className="w-full border-collapse border border-black text-xs">
      <thead>
        {/* Date Row with 31 days */}
        <tr className="border-b border-black text-center font-bold text-[10.5px] bg-slate-50">
          <th rowSpan={2} className="border-r border-black p-1 w-10 min-w-[38px] align-middle font-black">
            Sr. No.
          </th>
          <th rowSpan={2} className="border-r border-black p-1 text-center align-middle font-black min-w-[170px] w-48">
            CHECK POINT
          </th>
          <th rowSpan={2} className="border-r border-black p-1 text-center align-middle font-black w-20 min-w-[65px] leading-tight">
            FREQUEN<br />CY
          </th>
          <th colSpan={31 * 3} className="border-b border-black py-1 font-black text-center tracking-wider bg-white">
            DATE
          </th>
        </tr>

        {/* Days 1 to 31 Numbers */}
        <tr className="border-b border-black text-center font-bold text-[10px] bg-white">
          {DAYS_31.map((d) => (
            <th
              key={d}
              colSpan={3}
              className="border-r border-black py-0.5 text-center font-black"
              style={{ minWidth: '45px' }}
            >
              {d}
            </th>
          ))}
        </tr>

        {/* Shift A B C Row */}
        <tr className="border-b border-black text-center font-bold text-[9px] bg-slate-50">
          <th className="border-r border-black"></th>
          <th className="border-r border-black"></th>
          <th className="border-r border-black"></th>
          {DAYS_31.map((d) => (
            <React.Fragment key={d}>
              {SHIFTS.map((sh, sIdx) => (
                <th
                  key={`${d}_${sh}`}
                  className={`p-0 text-center font-bold ${sIdx === SHIFTS.length - 1 ? 'border-r border-black' : 'border-r border-slate-300'
                    }`}
                  style={{ width: '15px', minWidth: '15px', maxWidth: '15px' }}
                >
                  {sh}
                </th>
              ))}
            </React.Fragment>
          ))}
        </tr>
      </thead>

      <tbody>
        {/* Checkpoint Rows */}
        {points.map((pt) => (
          <tr key={pt.id} className="border-b border-black hover:bg-yellow-50/20 transition-colors h-7">
            <td className="border-r border-black p-1 text-center font-bold align-middle text-[11px]">
              {pt.sNo}
            </td>
            <td className="border-r border-black px-2 py-1 text-left font-bold text-[10.5px] align-middle text-black">
              {pt.checkPoint}
            </td>
            <td className="border-r border-black p-1 text-center font-bold text-[10px] align-middle text-black uppercase">
              {pt.frequency}
            </td>
            {DAYS_31.map((d) => (
              <React.Fragment key={d}>
                {SHIFTS.map((sh, sIdx) => {
                  const val = grid[pt.id]?.[d]?.[sh] || '';
                  const isNotOk = val === 'X';
                  return (
                    <td
                      key={`${d}_${sh}`}
                      onClick={() => cycleCell(setGridFn, pt.id, d, sh, val)}
                      className={`p-0 text-center align-middle h-7 cursor-pointer select-none ${sIdx === SHIFTS.length - 1 ? 'border-r border-black' : 'border-r border-slate-300'
                        } ${isNotOk
                          ? 'bg-rose-100 text-rose-800 font-black'
                          : val === '✓'
                            ? 'bg-emerald-50 text-emerald-800 font-black'
                            : 'hover:bg-amber-50'
                        }`}
                      style={{ width: '15px', minWidth: '15px', maxWidth: '15px' }}
                    >
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleCellChange(setGridFn, pt.id, d, sh, e.target.value)}
                        className="w-full h-full text-center text-[10px] font-black border-0 outline-none bg-transparent"
                        maxLength={2}
                      />
                    </td>
                  );
                })}
              </React.Fragment>
            ))}
          </tr>
        ))}

        {/* Checked By:- Row */}
        <tr className="border-b border-black bg-slate-50/50 h-7">
          <td colSpan={3} className="border-r border-black px-2 text-right font-bold text-[11px] align-middle">
            Checked By:-
          </td>
          {DAYS_31.map((d) => (
            <React.Fragment key={d}>
              {SHIFTS.map((sh, sIdx) => (
                <td
                  key={`checked_${d}_${sh}`}
                  className={`p-0 text-center align-middle h-7 ${sIdx === SHIFTS.length - 1 ? 'border-r border-black' : 'border-r border-slate-300'
                    }`}
                  style={{ width: '15px', minWidth: '15px', maxWidth: '15px' }}
                >
                  <input
                    type="text"
                    value={checkedGrid[d]?.[sh] || ''}
                    onChange={(e) => handleSignCellChange(setCheckedFn, d, sh, e.target.value)}
                    className="w-full h-full text-center text-[9px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50"
                  />
                </td>
              ))}
            </React.Fragment>
          ))}
        </tr>

        {/* Confirmed By:- Row */}
        <tr className="border-b border-black bg-slate-50/50 h-7">
          <td colSpan={3} className="border-r border-black px-2 text-right font-bold text-[11px] align-middle">
            Confirmed By:-
          </td>
          {DAYS_31.map((d) => (
            <React.Fragment key={d}>
              {SHIFTS.map((sh, sIdx) => (
                <td
                  key={`conf_${d}_${sh}`}
                  className={`p-0 text-center align-middle h-7 ${sIdx === SHIFTS.length - 1 ? 'border-r border-black' : 'border-r border-slate-300'
                    }`}
                  style={{ width: '15px', minWidth: '15px', maxWidth: '15px' }}
                >
                  <input
                    type="text"
                    value={confirmedGrid[d]?.[sh] || ''}
                    onChange={(e) => handleSignCellChange(setConfirmedFn, d, sh, e.target.value)}
                    className="w-full h-full text-center text-[9px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50"
                  />
                </td>
              ))}
            </React.Fragment>
          ))}
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Top Header Navigation */}
      <ChecksheetHeaderNav
        title="INSTRUMENT CHECK SHEET"
        subtitle={`${displayMachine} — Point Micrometer & Measuring Scale (FRM-WH-QA-046)`}
        icon={Gauge}
        iconBgClass="bg-amber-100 text-amber-800"
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
      <div className="bg-white border-2 border-black p-2 md:p-3 shadow-md rounded-sm overflow-x-auto">
        <div className="min-w-[1450px] w-full text-black select-text">
          {/* Main Title */}
          <div className="border border-black py-1.5 text-center bg-white">
            <h1 className="text-xl font-black text-black m-0 uppercase tracking-widest font-sans">
              INSTRUMENT CHECK SHEET
            </h1>
          </div>

          {/* Section 1: Point Micrometer Header Box */}
          <div className="border border-black border-t-0 p-2 text-xs font-bold bg-white grid grid-cols-2 gap-y-1 gap-x-4">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-black">INSTRUMENT NAME:</span>
              <input
                type="text"
                value={pointMeta.name}
                onChange={(e) => setPointMeta((p) => ({ ...p, name: e.target.value }))}
                className="font-bold outline-none border-b border-black bg-transparent w-64"
              />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="whitespace-nowrap font-black">MONTH:</span>
              <input
                type="text"
                value={pointMeta.month}
                onChange={(e) => setPointMeta((p) => ({ ...p, month: e.target.value }))}
                placeholder="MONTH"
                className="font-bold outline-none border-b border-black bg-transparent w-40 text-center"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-black">INSTRUMENT NO.:</span>
              <input
                type="text"
                value={pointMeta.no}
                onChange={(e) => setPointMeta((p) => ({ ...p, no: e.target.value }))}
                className="font-bold outline-none border-b border-black bg-transparent w-48"
              />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="whitespace-nowrap font-black">LOCATION:</span>
              <input
                type="text"
                value={pointMeta.location}
                onChange={(e) => setPointMeta((p) => ({ ...p, location: e.target.value }))}
                className="font-bold outline-none border-b border-black bg-transparent w-48 text-center"
              />
            </div>
          </div>

          {/* Section 1: Point Micrometer Table */}
          <div className="border border-black border-t-0">
            {renderDailyTable(
              JCR_POINT_MICROMETER_POINTS,
              pointGrid,
              setPointGrid,
              pointChecked,
              setPointChecked,
              pointConfirmed,
              setPointConfirmed
            )}
          </div>

          {/* Center Visual & Weekly Verification Table Section */}
          <div className="border border-black border-t-0 p-4 bg-white flex flex-col lg:flex-row items-center justify-around gap-6">
            {/* Left: Point Micrometer Photo / Diagram with Callout Bubbles */}
            <div className="relative border-2 border-black p-2 bg-slate-50 rounded-sm w-[420px] max-w-full">
              <div className="relative w-full h-[200px] flex items-center justify-center bg-white overflow-hidden border border-slate-300">
                <img
                  src="/point-micrometer-guide.png"
                  alt="Point Micrometer"
                  className="w-full h-full object-contain select-none pointer-events-none"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/plunger-micrometer-guide.png';
                  }}
                />

                {/* Callout Bubble 1: Anvil Tip / Blade */}
                <div
                  className="absolute w-5 h-5 rounded-full border border-black bg-white flex items-center justify-center text-[10px] font-black text-black shadow-sm"
                  style={{ top: '10%', left: '22%' }}
                >
                  1
                </div>

                {/* Callout Bubble 2: Spindle */}
                <div
                  className="absolute w-5 h-5 rounded-full border border-black bg-white flex items-center justify-center text-[10px] font-black text-black shadow-sm"
                  style={{ top: '8%', left: '30%' }}
                >
                  2
                </div>

                {/* Callout Bubble 3: Display */}
                <div
                  className="absolute w-5 h-5 rounded-full border border-black bg-white flex items-center justify-center text-[10px] font-black text-black shadow-sm"
                  style={{ bottom: '26%', right: '40%' }}
                >
                  3
                </div>

                {/* Callout Bubble 4: Switch */}
                <div
                  className="absolute w-5 h-5 rounded-full border border-black bg-white flex items-center justify-center text-[10px] font-black text-black shadow-sm"
                  style={{ bottom: '8%', right: '38%' }}
                >
                  4
                </div>

                {/* Callout Bubble 5: Ratchet */}
                <div
                  className="absolute w-5 h-5 rounded-full border border-black bg-white flex items-center justify-center text-[10px] font-black text-black shadow-sm"
                  style={{ top: '35%', right: '6%' }}
                >
                  5
                </div>

                {/* Callout Bubble 6: Calibration Sticker */}
                <div
                  className="absolute w-5 h-5 rounded-full border border-black bg-white flex items-center justify-center text-[10px] font-black text-black shadow-sm"
                  style={{ bottom: '20%', right: '23%' }}
                >
                  6
                </div>
              </div>
            </div>

            {/* Right: Weekly Verification Table */}
            <div className="w-[450px] max-w-full">
              <table className="w-full border-collapse border-2 border-black text-xs bg-white">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th colSpan={5} className="p-1 text-center font-black text-[11px] bg-slate-50 uppercase">
                      WEEKLY VERIFICATION
                    </th>
                  </tr>
                  <tr className="border-b border-black text-center font-bold text-[10px] bg-slate-100">
                    <th className="border-r border-black p-1 w-44">POINTS</th>
                    <th className="border-r border-black p-1 w-16">WEEK-1</th>
                    <th className="border-r border-black p-1 w-16">WEEK-2</th>
                    <th className="border-r border-black p-1 w-16">WEEK-3</th>
                    <th className="p-1 w-16">WEEK-4</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: ANVIL CONDITION */}
                  <tr className="border-b border-black h-6">
                    <td className="border-r border-black px-2 py-0.5 font-bold text-[10px]">
                      ANVIL CONDITION
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wk) => (
                      <td key={wk} className="border-r border-black last:border-r-0 p-0 text-center">
                        <input
                          type="text"
                          value={weeklyData[0][wk]}
                          onChange={(e) => handleWeeklyChange(0, wk, e.target.value)}
                          className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent"
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: ZERO SETTING */}
                  <tr className="border-b border-black h-6">
                    <td className="border-r border-black px-2 py-0.5 font-bold text-[10px]">
                      ZERO SETTING
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wk) => (
                      <td key={wk} className="border-r border-black last:border-r-0 p-0 text-center">
                        <input
                          type="text"
                          value={weeklyData[1][wk]}
                          onChange={(e) => handleWeeklyChange(1, wk, e.target.value)}
                          className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent"
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 3 & 4: CALIBRATION (Gauge & Actual) */}
                  <tr className="border-b border-black h-6">
                    <td rowSpan={2} className="border-r border-black px-2 py-0.5 font-bold text-[10px] align-middle">
                      <div className="flex items-center justify-between">
                        <span>CALIBRATION</span>
                        <span className="text-[9px] font-semibold text-slate-600">Gauge</span>
                      </div>
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wk) => (
                      <td key={wk} className="border-r border-black last:border-r-0 p-0 text-center">
                        <input
                          type="text"
                          value={weeklyData[2][wk]}
                          onChange={(e) => handleWeeklyChange(2, wk, e.target.value)}
                          className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-black h-6">
                    {/* Row span occupied column */}
                    {['w1', 'w2', 'w3', 'w4'].map((wk) => (
                      <td key={wk} className="border-r border-black last:border-r-0 p-0 text-center">
                        <input
                          type="text"
                          value={weeklyData[3][wk]}
                          onChange={(e) => handleWeeklyChange(3, wk, e.target.value)}
                          className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent"
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: ANY OTHER */}
                  <tr className="border-b border-black h-6">
                    <td className="border-r border-black px-2 py-0.5 font-bold text-[10px]">
                      ANY OTHER
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wk) => (
                      <td key={wk} className="border-r border-black last:border-r-0 p-0 text-center">
                        <input
                          type="text"
                          value={weeklyData[4][wk]}
                          onChange={(e) => handleWeeklyChange(4, wk, e.target.value)}
                          className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent"
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 6: ENGG. SIGN. */}
                  <tr className="h-6">
                    <td className="border-r border-black px-2 py-0.5 font-bold text-[10px]">
                      ENGG. SIGN.
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wk) => (
                      <td key={wk} className="border-r border-black last:border-r-0 p-0 text-center">
                        <input
                          type="text"
                          value={weeklyData[5][wk]}
                          onChange={(e) => handleWeeklyChange(5, wk, e.target.value)}
                          className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent"
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Remarks Section */}
          <div className="border border-black border-t-0 p-2.5 bg-white text-xs font-bold text-black leading-relaxed">
            <div className="font-black text-[11px] mb-0.5">Remarks:-</div>
            <div className="text-[10.5px] font-semibold space-y-0.5">
              <div>^Check zero setting Properly before using the instrument.</div>
              <div>*In Case of any doubt,ask to QA.</div>
              <div>*If any problem then inform to QA.</div>
            </div>
          </div>

          {/* Section 2: Measuring Scale Header Box */}
          <div className="border border-black border-t-0 p-2 text-xs font-bold bg-white grid grid-cols-4 gap-2">
            <div className="flex items-center gap-1.5">
              <span className="whitespace-nowrap font-black">INSTRUMENT NO.:</span>
              <input
                type="text"
                value={scaleMeta.no}
                onChange={(e) => setScaleMeta((s) => ({ ...s, no: e.target.value }))}
                className="font-bold outline-none border-b border-black bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="whitespace-nowrap font-black">INSTRUMENT NAME:</span>
              <input
                type="text"
                value={scaleMeta.name}
                onChange={(e) => setScaleMeta((s) => ({ ...s, name: e.target.value }))}
                className="font-bold outline-none border-b border-black bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center gap-1.5 justify-center">
              <span className="whitespace-nowrap font-black">LOCATION:</span>
              <input
                type="text"
                value={scaleMeta.location}
                onChange={(e) => setScaleMeta((s) => ({ ...s, location: e.target.value }))}
                className="font-bold outline-none border-b border-black bg-transparent w-36 text-center"
              />
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="whitespace-nowrap font-black">MONTH:</span>
              <input
                type="text"
                value={scaleMeta.month}
                onChange={(e) => setScaleMeta((s) => ({ ...s, month: e.target.value }))}
                placeholder="MONTH"
                className="font-bold outline-none border-b border-black bg-transparent w-32 text-center"
              />
            </div>
          </div>

          {/* Section 2: Measuring Scale Table */}
          <div className="border border-black border-t-0">
            {renderDailyTable(
              JCR_SCALE_POINTS,
              scaleGrid,
              setScaleGrid,
              scaleChecked,
              setScaleChecked,
              scaleConfirmed,
              setScaleConfirmed
            )}
          </div>

          {/* Document Footer */}
          <div className="border border-black border-t-0 p-1.5 bg-white text-[10.5px] font-bold text-black flex items-center justify-between">
            <span>FRM-WH-QA-046</span>
            <span>REV-04</span>
            <span>REV DATE:-10.01.22</span>
            <span>Issue Date:-15.03.09</span>
            <span>Page: 8 of 12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
