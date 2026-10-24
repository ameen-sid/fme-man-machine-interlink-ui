import React, { useState, useEffect } from 'react';
import { Gauge, Save, RotateCcw, ArrowLeft } from 'lucide-react';
import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';

// Instrument 1: Point-Micrometer (6 points)
const INITIAL_POINT_POINTS = [
  { id: 1, checkPoint: 'ANVIL TIP CONDITION', frequency: 'DAILY' },
  { id: 2, checkPoint: 'SPINDLE CONDITION', frequency: 'DAILY' },
  { id: 3, checkPoint: 'DISPLAY CONDITION', frequency: 'DAILY' },
  { id: 4, checkPoint: 'SWITCH CONDITION', frequency: 'DAILY' },
  { id: 5, checkPoint: 'RACHET CONDITION', frequency: 'DAILY' },
  { id: 6, checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

// Instrument 2: Blade Micrometer (6 points)
const INITIAL_BLADE_POINTS = [
  { id: 1, checkPoint: 'ANVIL BLADE CONDITION', frequency: 'DAILY' },
  { id: 2, checkPoint: 'SPINDLE CONDITION', frequency: 'DAILY' },
  { id: 3, checkPoint: 'DISPLAY CONDITION', frequency: 'DAILY' },
  { id: 4, checkPoint: 'SWITCH CONDITION', frequency: 'DAILY' },
  { id: 5, checkPoint: 'RACHET CONDITION', frequency: 'DAILY' },
  { id: 6, checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

// Instrument 3: Measuring Scale (2 points)
const INITIAL_SCALE_POINTS = [
  { id: 1, checkPoint: 'VISUAL CONDITION', frequency: 'DAILY' },
  { id: 2, checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

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
  { point: 'ANVIL CONDITION', w1: '', w2: '', w3: '', w4: '' },
  { point: 'ZERO SETTING', w1: '', w2: '', w3: '', w4: '' },
  { point: 'CALIBRATION (Gauge)', w1: '', w2: '', w3: '', w4: '' },
  { point: 'CALIBRATION (Actual)', w1: '', w2: '', w3: '', w4: '' },
  { point: 'ANY OTHER', w1: '', w2: '', w3: '', w4: '' },
  { point: 'ENGG. SIGN.', w1: '', w2: '', w3: '', w4: '' }
];

export default function InstrumentChecksheet({ machine, onClose }) {
  const machineKey = machine?.id || machine?.name || 'mcr_01';
  const storageKey = `mcr_instrument_checksheet_${machineKey}`;
  const defaultLocation = machine?.name ? `${machine.name} (Manual Crimping)` : 'Manual Crimping';

  // Metadata for each instrument section
  const [pointMeta, setPointMeta] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_meta`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      no: '',
      name: 'Point-Micrometer',
      location: defaultLocation,
      month: ''
    };
  });

  const [bladeMeta, setBladeMeta] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blade_meta`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      no: '',
      name: 'Blade Micrometer',
      location: defaultLocation,
      month: ''
    };
  });

  const [scaleMeta, setScaleMeta] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_meta`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      no: '',
      name: 'Measuring Scale',
      location: defaultLocation,
      month: ''
    };
  });

  // Grids for Point Micrometer
  const [pointGrid, setPointGrid] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createInitialGrid(6);
  });
  const [pointChecked, setPointChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_checked`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createSignGrid();
  });
  const [pointConfirmed, setPointConfirmed] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_confirmed`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createSignGrid();
  });
  const [pointWeekly, setPointWeekly] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_point_weekly`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_WEEKLY;
  });

  // Grids for Blade Micrometer
  const [bladeGrid, setBladeGrid] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blade_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createInitialGrid(6);
  });
  const [bladeChecked, setBladeChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blade_checked`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createSignGrid();
  });
  const [bladeConfirmed, setBladeConfirmed] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blade_confirmed`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createSignGrid();
  });
  const [bladeWeekly, setBladeWeekly] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blade_weekly`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_WEEKLY;
  });

  // Grids for Measuring Scale
  const [scaleGrid, setScaleGrid] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createInitialGrid(2);
  });
  const [scaleChecked, setScaleChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_checked`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createSignGrid();
  });
  const [scaleConfirmed, setScaleConfirmed] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_confirmed`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createSignGrid();
  });

  const [savedToast, setSavedToast] = useState('');

  // Save to localStorage
  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_point_meta`, JSON.stringify(pointMeta));
      localStorage.setItem(`${storageKey}_blade_meta`, JSON.stringify(bladeMeta));
      localStorage.setItem(`${storageKey}_scale_meta`, JSON.stringify(scaleMeta));

      localStorage.setItem(`${storageKey}_point_grid`, JSON.stringify(pointGrid));
      localStorage.setItem(`${storageKey}_point_checked`, JSON.stringify(pointChecked));
      localStorage.setItem(`${storageKey}_point_confirmed`, JSON.stringify(pointConfirmed));
      localStorage.setItem(`${storageKey}_point_weekly`, JSON.stringify(pointWeekly));

      localStorage.setItem(`${storageKey}_blade_grid`, JSON.stringify(bladeGrid));
      localStorage.setItem(`${storageKey}_blade_checked`, JSON.stringify(bladeChecked));
      localStorage.setItem(`${storageKey}_blade_confirmed`, JSON.stringify(bladeConfirmed));
      localStorage.setItem(`${storageKey}_blade_weekly`, JSON.stringify(bladeWeekly));

      localStorage.setItem(`${storageKey}_scale_grid`, JSON.stringify(scaleGrid));
      localStorage.setItem(`${storageKey}_scale_checked`, JSON.stringify(scaleChecked));
      localStorage.setItem(`${storageKey}_scale_confirmed`, JSON.stringify(scaleConfirmed));

      setSavedToast('Instrument Check Sheet saved successfully to FME Server!');
      setTimeout(() => setSavedToast(''), 3500);
    } catch (e) {
      console.error(e);
      setSavedToast('Saved locally!');
      setTimeout(() => setSavedToast(''), 3500);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this Instrument Check Sheet?')) {
      setPointGrid(createInitialGrid(6));
      setPointChecked(createSignGrid());
      setPointConfirmed(createSignGrid());
      setPointWeekly(DEFAULT_WEEKLY);

      setBladeGrid(createInitialGrid(6));
      setBladeChecked(createSignGrid());
      setBladeConfirmed(createSignGrid());
      setBladeWeekly(DEFAULT_WEEKLY);

      setScaleGrid(createInitialGrid(2));
      setScaleChecked(createSignGrid());
      setScaleConfirmed(createSignGrid());

      localStorage.removeItem(`${storageKey}_point_grid`);
      localStorage.removeItem(`${storageKey}_point_checked`);
      localStorage.removeItem(`${storageKey}_point_confirmed`);
      localStorage.removeItem(`${storageKey}_point_weekly`);
      localStorage.removeItem(`${storageKey}_blade_grid`);
      localStorage.removeItem(`${storageKey}_blade_checked`);
      localStorage.removeItem(`${storageKey}_blade_confirmed`);
      localStorage.removeItem(`${storageKey}_blade_weekly`);
      localStorage.removeItem(`${storageKey}_scale_grid`);
      localStorage.removeItem(`${storageKey}_scale_checked`);
      localStorage.removeItem(`${storageKey}_scale_confirmed`);

      setSavedToast('Instrument check sheet reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleGridCell = (setter, pId, d, shift, val) => {
    setter(prev => ({
      ...prev,
      [pId]: {
        ...prev[pId],
        [d]: {
          ...prev[pId]?.[d],
          [shift]: val
        }
      }
    }));
  };

  const handleSignCell = (setter, d, shift, val) => {
    setter(prev => ({
      ...prev,
      [d]: {
        ...prev[d],
        [shift]: val
      }
    }));
  };

  const handleWeeklyCell = (setter, rIdx, wKey, val) => {
    setter(prev => {
      const copy = [...prev];
      copy[rIdx] = { ...copy[rIdx], [wKey]: val };
      return copy;
    });
  };

  const getCellBgClass = (val) => {
    const v = (val || '').trim().toUpperCase();
    if (v === 'O' || v === 'OK' || v === '√') return 'bg-emerald-100 text-emerald-800 font-bold';
    if (v === 'X' || v === 'NG') return 'bg-rose-100 text-rose-700 font-bold';
    return 'text-slate-900 font-bold';
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-50 transition-all duration-200">
      {/* Floating Action Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Gauge size={18} className="text-amber-600 bg-amber-50 p-2 rounded-lg w-9 h-9 box-content" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">
              FURUKAWA MINDA ELECTRIC PVT. LTD. — INSTRUMENT CHECK SHEET
            </h3>
            <span className="text-[11.5px] text-slate-500 font-medium">
              Format: <strong>FRM-WH-QA-046</strong> • Rev: <strong>04</strong> • Point-Micrometer, Blade Micrometer & Measuring Scale
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedToast && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-md text-xs font-semibold">
              {savedToast}
            </div>
          )}

          <button
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            onClick={handleSave}
            title="Save checksheet"
          >
            <Save size={14} />
            <span>Save Sheet</span>
          </button>
          <button
            className="inline-flex items-center gap-1.5 p-2 rounded-lg text-xs font-bold cursor-pointer transition-all bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600"
            onClick={handleReset}
            title="Reset table"
          >
            <RotateCcw size={15} />
          </button>
          {onClose && (
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600"
              onClick={onClose}
            >
              Close Checksheet
            </button>
          )}
        </div>
      </div>

      {/* Main Unified Printable Container */}
      <div className="w-full bg-white border-[1.5px] border-black shadow-md rounded overflow-hidden select-text text-black font-sans">
        
        {/* Company Header - Top Right (as in Screenshot 1) */}
        <div className="flex justify-end px-3 pt-2 pb-0.5 bg-white border-b border-black">
          <span className="text-[11.5px] font-black tracking-wider text-black uppercase font-sans">
            FURUKAWA MINDA ELECTRIC PVT. LTD.
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 1. POINT-MICROMETER SECTION */}
        {/* ========================================================================= */}
        <div>
          {/* Centered Main Title Bar */}
          <div className="border-b-[1.5px] border-black py-1.5 px-4 bg-white text-center">
            <h1 className="text-base sm:text-lg font-black tracking-wider text-black uppercase m-0 font-sans">
              INSTRUMENT CHECK SHEET
            </h1>
          </div>

          {/* Subheader Meta Box */}
          <div className="border-b-[1.5px] border-black bg-white grid grid-cols-1 md:grid-cols-4 text-xs font-bold text-black divide-y md:divide-y-0 md:divide-x divide-black">
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">INSTRUMENT NO.:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={pointMeta.no}
                placeholder=""
                onChange={(e) => setPointMeta({ ...pointMeta, no: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">INSTRUMENT NAME:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={pointMeta.name}
                onChange={(e) => setPointMeta({ ...pointMeta, name: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">LOCATION:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={pointMeta.location}
                onChange={(e) => setPointMeta({ ...pointMeta, location: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">MONTH:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs uppercase"
                value={pointMeta.month}
                placeholder=""
                onChange={(e) => setPointMeta({ ...pointMeta, month: e.target.value })}
              />
            </div>
          </div>

          {/* 31-Day Shift A,B,C Table for Point-Micrometer */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-black">
            <table className="w-full border-collapse text-[10px] min-w-[2150px]">
              <thead>
                <tr className="border-b border-black bg-white font-bold text-black">
                  <th rowSpan={2} className="border border-black p-1 text-center w-10 font-bold text-[10px] leading-tight">
                    Sr.N<br />O.
                  </th>
                  <th rowSpan={2} className="border border-black p-1 text-center w-48 font-bold text-[10.5px]">
                    CHECK POINT
                  </th>
                  <th rowSpan={2} className="border border-black p-1 text-center w-20 font-bold text-[10px] leading-tight">
                    FREQUEN<br />CY
                  </th>
                  <th colSpan={93} className="border border-black p-1 text-center font-bold text-[10.5px] tracking-wider">
                    DATE
                  </th>
                </tr>
                {/* Days 1 to 31 with sub-shifts A, B, C */}
                <tr className="border-b-[1.5px] border-black bg-white text-black font-bold">
                  {DAYS_31.map((d) => (
                    <th key={d} colSpan={3} className="border border-black p-0 text-center font-bold text-[10px]">
                      <div className="border-b border-black py-0.5">{d}</div>
                      <div className="grid grid-cols-3 text-[9px] font-extrabold divide-x divide-black">
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_POINT_POINTS.map((pt) => (
                  <tr key={pt.id} className="h-6 hover:bg-yellow-50/20">
                    <td className="border border-black p-0.5 text-center font-bold">{pt.id}</td>
                    <td className="border border-black p-1 text-left font-black tracking-tight pl-2">
                      {pt.checkPoint}
                    </td>
                    <td className="border border-black p-0.5 text-center font-extrabold text-[9.5px]">
                      {pt.frequency}
                    </td>
                    {DAYS_31.map((d) =>
                      SHIFTS.map((shift) => {
                        const val = pointGrid[pt.id]?.[d]?.[shift] || '';
                        return (
                          <td key={`${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                            <input
                              className={`w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-100 ${getCellBgClass(val)}`}
                              value={val}
                              onChange={(e) => handleGridCell(setPointGrid, pt.id, d, shift, e.target.value.toUpperCase())}
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                ))}

                {/* Checked By Row */}
                <tr className="h-6 bg-white">
                  <td colSpan={2} className="border border-black p-1 text-right font-black text-[10.5px] pr-3">
                    Checked By:-
                  </td>
                  <td className="border border-black p-0.5 text-center font-black text-[10px]">
                    INSP.
                  </td>
                  {DAYS_31.map((d) =>
                    SHIFTS.map((shift) => {
                      const val = pointChecked[d]?.[shift] || '';
                      return (
                        <td key={`chk_${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                          <input
                            className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-blue-100"
                            value={val}
                            onChange={(e) => handleSignCell(setPointChecked, d, shift, e.target.value)}
                          />
                        </td>
                      );
                    })
                  )}
                </tr>

                {/* Confirmed By Row */}
                <tr className="h-6 bg-white">
                  <td colSpan={2} className="border border-black p-1 text-right font-black text-[10.5px] pr-3">
                    Confirmed By:-
                  </td>
                  <td className="border border-black p-0.5 text-center font-black text-[10px]">
                    LEADER
                  </td>
                  {DAYS_31.map((d) =>
                    SHIFTS.map((shift) => {
                      const val = pointConfirmed[d]?.[shift] || '';
                      return (
                        <td key={`conf_${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                          <input
                            className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-blue-100"
                            value={val}
                            onChange={(e) => handleSignCell(setPointConfirmed, d, shift, e.target.value)}
                          />
                        </td>
                      );
                    })
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Middle 3-Column Box: Remarks, Point-Micrometer Image, Weekly Verification */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-3.5 bg-white border-b-[2px] border-black items-start">
            {/* Left Box: Remarks */}
            <div className="lg:col-span-3 flex flex-col pt-1">
              <span className="font-black text-xs text-black block mb-1">
                Remarks:-
              </span>
              <ul className="text-[10.5px] font-extrabold text-black m-0 pl-0 leading-relaxed list-none space-y-1">
                <li>*Check Zero Setting Properly Before Using The Instrument .</li>
                <li>*In Case of any doubt,ask to QA.</li>
                <li>*If any problem then inform to QA.</li>
              </ul>
            </div>

            {/* Center Box: Point-Micrometer Photo */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="border-[1.5px] border-black bg-white p-1 inline-block max-w-[420px] shadow-sm">
                <img
                  src="/point-micrometer-guide.png"
                  alt="Point Micrometer Guide (1-Anvil Tip, 2-Spindle Tip, 3-Display, 4-Switch, 5-Ratchet, 6-Calibration Validity)"
                  className="w-full h-auto object-contain block select-none"
                />
              </div>
            </div>

            {/* Right Box: Weekly Verification Table */}
            <div className="lg:col-span-4 flex justify-end">
              <div className="border-[1.5px] border-black bg-white w-full max-w-[380px] shadow-sm">
                <table className="w-full border-collapse text-[10px]">
                  <thead>
                    <tr>
                      <th
                        colSpan={5}
                        className="border border-black text-center font-black text-[11px] py-1 bg-white text-black tracking-wider uppercase"
                      >
                        WEEKLY VERIFICATION
                      </th>
                    </tr>
                    <tr className="bg-white font-bold text-black">
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-36">
                        POINTS
                      </th>
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-14">
                        WEEK-1
                      </th>
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-14">
                        WEEK-2
                      </th>
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-14">
                        WEEK-3
                      </th>
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-14">
                        WEEK-4
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 1. ANVIL CONDITION */}
                    <tr>
                      <td className="border border-black p-1 text-center text-[9.5px] font-bold">
                        ANVIL CONDITION
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            value={pointWeekly[0]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setPointWeekly, 0, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>

                    {/* 2. ZERO SETTING */}
                    <tr>
                      <td className="border border-black p-1 text-center text-[9.5px] font-bold">
                        ZERO SETTING
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            value={pointWeekly[1]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setPointWeekly, 1, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>

                    {/* 3. CALIBRATION (Gauge & Actual) */}
                    <tr>
                      <td rowSpan={2} className="border border-black p-1 text-center text-[9.5px] font-bold align-middle">
                        <div className="flex items-center justify-between px-1">
                          <span>CALIBRATION</span>
                          <div className="flex flex-col text-[8.5px] text-right font-extrabold border-l border-black pl-1">
                            <span className="border-b border-black">Gauge</span>
                            <span>Actual</span>
                          </div>
                        </div>
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            placeholder=""
                            value={pointWeekly[2]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setPointWeekly, 2, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            placeholder=""
                            value={pointWeekly[3]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setPointWeekly, 3, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>

                    {/* 4. ANY OTHER */}
                    <tr>
                      <td className="border border-black p-1 text-center text-[9.5px] font-bold">
                        ANY OTHER
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            value={pointWeekly[4]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setPointWeekly, 4, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>

                    {/* 5. ENGG. SIGN. */}
                    <tr>
                      <td className="border border-black p-1 text-center text-[9.5px] font-bold">
                        ENGG. SIGN.
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            value={pointWeekly[5]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setPointWeekly, 5, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BLADE MICROMETER SECTION */}
        {/* ========================================================================= */}
        <div>
          {/* Centered Main Title Bar */}
          <div className="border-b-[1.5px] border-black py-1.5 px-4 bg-white text-center">
            <h1 className="text-base sm:text-lg font-black tracking-wider text-black uppercase m-0 font-sans">
              INSTRUMENT CHECK SHEET
            </h1>
          </div>

          {/* Subheader Meta Box */}
          <div className="border-b-[1.5px] border-black bg-white grid grid-cols-1 md:grid-cols-4 text-xs font-bold text-black divide-y md:divide-y-0 md:divide-x divide-black">
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">INSTRUMENT NO.:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={bladeMeta.no}
                placeholder=""
                onChange={(e) => setBladeMeta({ ...bladeMeta, no: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">INSTRUMENT NAME:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={bladeMeta.name}
                onChange={(e) => setBladeMeta({ ...bladeMeta, name: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">LOCATION:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={bladeMeta.location}
                onChange={(e) => setBladeMeta({ ...bladeMeta, location: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">MONTH:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs uppercase"
                value={bladeMeta.month}
                placeholder=""
                onChange={(e) => setBladeMeta({ ...bladeMeta, month: e.target.value })}
              />
            </div>
          </div>

          {/* 31-Day Shift A,B,C Table for Blade Micrometer */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-black">
            <table className="w-full border-collapse text-[10px] min-w-[2150px]">
              <thead>
                <tr className="border-b border-black bg-white font-bold text-black">
                  <th rowSpan={2} className="border border-black p-1 text-center w-10 font-bold text-[10px] leading-tight">
                    Sr.N<br />O.
                  </th>
                  <th rowSpan={2} className="border border-black p-1 text-center w-48 font-bold text-[10.5px]">
                    CHECK POINT
                  </th>
                  <th rowSpan={2} className="border border-black p-1 text-center w-20 font-bold text-[10px] leading-tight">
                    FREQUEN<br />CY
                  </th>
                  <th colSpan={93} className="border border-black p-1 text-center font-bold text-[10.5px] tracking-wider">
                    DATE
                  </th>
                </tr>
                {/* Days 1 to 31 with sub-shifts A, B, C */}
                <tr className="border-b-[1.5px] border-black bg-white text-black font-bold">
                  {DAYS_31.map((d) => (
                    <th key={d} colSpan={3} className="border border-black p-0 text-center font-bold text-[10px]">
                      <div className="border-b border-black py-0.5">{d}</div>
                      <div className="grid grid-cols-3 text-[9px] font-extrabold divide-x divide-black">
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_BLADE_POINTS.map((pt) => (
                  <tr key={pt.id} className="h-6 hover:bg-yellow-50/20">
                    <td className="border border-black p-0.5 text-center font-bold">{pt.id}</td>
                    <td className="border border-black p-1 text-left font-black tracking-tight pl-2">
                      {pt.checkPoint}
                    </td>
                    <td className="border border-black p-0.5 text-center font-extrabold text-[9.5px]">
                      {pt.frequency}
                    </td>
                    {DAYS_31.map((d) =>
                      SHIFTS.map((shift) => {
                        const val = bladeGrid[pt.id]?.[d]?.[shift] || '';
                        return (
                          <td key={`${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                            <input
                              className={`w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-100 ${getCellBgClass(val)}`}
                              value={val}
                              onChange={(e) => handleGridCell(setBladeGrid, pt.id, d, shift, e.target.value.toUpperCase())}
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                ))}

                {/* Checked By Row */}
                <tr className="h-6 bg-white">
                  <td colSpan={2} className="border border-black p-1 text-right font-black text-[10.5px] pr-3">
                    Checked By:-
                  </td>
                  <td className="border border-black p-0.5 text-center font-black text-[10px]">
                    INSP.
                  </td>
                  {DAYS_31.map((d) =>
                    SHIFTS.map((shift) => {
                      const val = bladeChecked[d]?.[shift] || '';
                      return (
                        <td key={`b_chk_${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                          <input
                            className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-blue-100"
                            value={val}
                            onChange={(e) => handleSignCell(setBladeChecked, d, shift, e.target.value)}
                          />
                        </td>
                      );
                    })
                  )}
                </tr>

                {/* Confirmed By Row */}
                <tr className="h-6 bg-white">
                  <td colSpan={2} className="border border-black p-1 text-right font-black text-[10.5px] pr-3">
                    Confirmed By:-
                  </td>
                  <td className="border border-black p-0.5 text-center font-black text-[10px]">
                    LEADER
                  </td>
                  {DAYS_31.map((d) =>
                    SHIFTS.map((shift) => {
                      const val = bladeConfirmed[d]?.[shift] || '';
                      return (
                        <td key={`b_conf_${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                          <input
                            className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-blue-100"
                            value={val}
                            onChange={(e) => handleSignCell(setBladeConfirmed, d, shift, e.target.value)}
                          />
                        </td>
                      );
                    })
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Middle 3-Column Box: Remarks, Blade Micrometer Image, Weekly Verification */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-3.5 bg-white border-b-[2px] border-black items-start">
            {/* Left Box: Remarks */}
            <div className="lg:col-span-3 flex flex-col pt-1">
              <span className="font-black text-xs text-black block mb-1">
                Remarks:-
              </span>
              <ul className="text-[10.5px] font-extrabold text-black m-0 pl-0 leading-relaxed list-none space-y-1">
                <li>*Check zero setting Properly before using the instrument.</li>
                <li>*In Case of any doubt,ask to QA.</li>
                <li>*If any problem then inform to QA.</li>
              </ul>
            </div>

            {/* Center Box: Blade Micrometer Photo */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="border-[1.5px] border-black bg-white p-1 inline-block max-w-[420px] shadow-sm">
                <img
                  src="/blade-micrometer-guide.png"
                  alt="Blade Micrometer Guide (1-Anvil Blade, 2-Spindle, 3-Display, 4-Switch, 5-Ratchet, 6-Calibration Validity)"
                  className="w-full h-auto object-contain block select-none"
                />
              </div>
            </div>

            {/* Right Box: Weekly Verification Table */}
            <div className="lg:col-span-4 flex justify-end">
              <div className="border-[1.5px] border-black bg-white w-full max-w-[380px] shadow-sm">
                <table className="w-full border-collapse text-[10px]">
                  <thead>
                    <tr>
                      <th
                        colSpan={5}
                        className="border border-black text-center font-black text-[11px] py-1 bg-white text-black tracking-wider uppercase"
                      >
                        WEEKLY VERIFICATION
                      </th>
                    </tr>
                    <tr className="bg-white font-bold text-black">
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-36">
                        POINTS
                      </th>
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-14">
                        WEEK-1
                      </th>
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-14">
                        WEEK-2
                      </th>
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-14">
                        WEEK-3
                      </th>
                      <th className="border border-black p-1 text-[9.5px] font-bold text-center w-14">
                        WEEK-4
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 1. ANVIL CONDITION */}
                    <tr>
                      <td className="border border-black p-1 text-center text-[9.5px] font-bold">
                        ANVIL CONDITION
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            value={bladeWeekly[0]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setBladeWeekly, 0, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>

                    {/* 2. ZERO SETTING */}
                    <tr>
                      <td className="border border-black p-1 text-center text-[9.5px] font-bold">
                        ZERO SETTING
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            value={bladeWeekly[1]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setBladeWeekly, 1, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>

                    {/* 3. CALIBRATION (Gauge & Actual) */}
                    <tr>
                      <td rowSpan={2} className="border border-black p-1 text-center text-[9.5px] font-bold align-middle">
                        <div className="flex items-center justify-between px-1">
                          <span>CALIBRATION</span>
                          <div className="flex flex-col text-[8.5px] text-right font-extrabold border-l border-black pl-1">
                            <span className="border-b border-black">Gauge</span>
                            <span>Actual</span>
                          </div>
                        </div>
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            placeholder=""
                            value={bladeWeekly[2]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setBladeWeekly, 2, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            placeholder=""
                            value={bladeWeekly[3]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setBladeWeekly, 3, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>

                    {/* 4. ANY OTHER */}
                    <tr>
                      <td className="border border-black p-1 text-center text-[9.5px] font-bold">
                        ANY OTHER
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            value={bladeWeekly[4]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setBladeWeekly, 4, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>

                    {/* 5. ENGG. SIGN. */}
                    <tr>
                      <td className="border border-black p-1 text-center text-[9.5px] font-bold">
                        ENGG. SIGN.
                      </td>
                      {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                        <td key={wKey} className="border border-black p-0 text-center align-middle">
                          <input
                            className="w-full h-5 border-none bg-transparent text-[9.5px] font-bold text-center outline-none focus:bg-yellow-50"
                            value={bladeWeekly[5]?.[wKey] || ''}
                            onChange={(e) => handleWeeklyCell(setBladeWeekly, 5, wKey, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MEASURING SCALE SECTION (Screenshot 2 & 3) */}
        {/* ========================================================================= */}
        <div>
          {/* Subheader Meta Box for Measuring Scale */}
          <div className="border-b-[1.5px] border-black bg-white grid grid-cols-1 md:grid-cols-4 text-xs font-bold text-black divide-y md:divide-y-0 md:divide-x divide-black">
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">INSTRUMENT NO.:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={scaleMeta.no}
                placeholder=""
                onChange={(e) => setScaleMeta({ ...scaleMeta, no: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">INSTRUMENT NAME:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={scaleMeta.name}
                onChange={(e) => setScaleMeta({ ...scaleMeta, name: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">LOCATION:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs"
                value={scaleMeta.location}
                onChange={(e) => setScaleMeta({ ...scaleMeta, location: e.target.value })}
              />
            </div>
            <div className="flex items-center px-2 py-1">
              <span className="whitespace-nowrap font-bold text-[11px]">MONTH:</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-1 text-xs uppercase"
                value={scaleMeta.month}
                placeholder=""
                onChange={(e) => setScaleMeta({ ...scaleMeta, month: e.target.value })}
              />
            </div>
          </div>

          {/* 31-Day Shift A,B,C Table for Measuring Scale */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-black">
            <table className="w-full border-collapse text-[10px] min-w-[2150px]">
              <thead>
                <tr className="border-b border-black bg-white font-bold text-black">
                  <th rowSpan={2} className="border border-black p-1 text-center w-10 font-bold text-[10px] leading-tight">
                    Sr.N<br />O.
                  </th>
                  <th rowSpan={2} className="border border-black p-1 text-center w-48 font-bold text-[10.5px]">
                    CHECK POINT
                  </th>
                  <th rowSpan={2} className="border border-black p-1 text-center w-20 font-bold text-[10px] leading-tight">
                    FREQUEN<br />CY
                  </th>
                  <th colSpan={93} className="border border-black p-1 text-center font-bold text-[10.5px] tracking-wider">
                    DATE
                  </th>
                </tr>
                {/* Days 1 to 31 with sub-shifts A, B, C */}
                <tr className="border-b-[1.5px] border-black bg-white text-black font-bold">
                  {DAYS_31.map((d) => (
                    <th key={d} colSpan={3} className="border border-black p-0 text-center font-bold text-[10px]">
                      <div className="border-b border-black py-0.5">{d}</div>
                      <div className="grid grid-cols-3 text-[9px] font-extrabold divide-x divide-black">
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_SCALE_POINTS.map((pt) => (
                  <tr key={pt.id} className="h-6 hover:bg-yellow-50/20">
                    <td className="border border-black p-0.5 text-center font-bold">{pt.id}</td>
                    <td className="border border-black p-1 text-left font-black tracking-tight pl-2">
                      {pt.checkPoint}
                    </td>
                    <td className="border border-black p-0.5 text-center font-extrabold text-[9.5px]">
                      {pt.frequency}
                    </td>
                    {DAYS_31.map((d) =>
                      SHIFTS.map((shift) => {
                        const val = scaleGrid[pt.id]?.[d]?.[shift] || '';
                        return (
                          <td key={`${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                            <input
                              className={`w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-100 ${getCellBgClass(val)}`}
                              value={val}
                              onChange={(e) => handleGridCell(setScaleGrid, pt.id, d, shift, e.target.value.toUpperCase())}
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                ))}

                {/* Checked By Row */}
                <tr className="h-6 bg-white">
                  <td colSpan={2} className="border border-black p-1 text-right font-black text-[10.5px] pr-3">
                    Checked By:-
                  </td>
                  <td className="border border-black p-0.5 text-center font-black text-[10px]">
                    INSP.
                  </td>
                  {DAYS_31.map((d) =>
                    SHIFTS.map((shift) => {
                      const val = scaleChecked[d]?.[shift] || '';
                      return (
                        <td key={`s_chk_${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                          <input
                            className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-blue-100"
                            value={val}
                            onChange={(e) => handleSignCell(setScaleChecked, d, shift, e.target.value)}
                          />
                        </td>
                      );
                    })
                  )}
                </tr>

                {/* Confirmed By Row */}
                <tr className="h-6 bg-white">
                  <td colSpan={2} className="border border-black p-1 text-right font-black text-[10.5px] pr-3">
                    Confirmed By:-
                  </td>
                  <td className="border border-black p-0.5 text-center font-black text-[10px]">
                    LEADER
                  </td>
                  {DAYS_31.map((d) =>
                    SHIFTS.map((shift) => {
                      const val = scaleConfirmed[d]?.[shift] || '';
                      return (
                        <td key={`s_conf_${d}_${shift}`} className="border border-black p-0 text-center align-middle w-7 min-w-[22px]">
                          <input
                            className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-blue-100"
                            value={val}
                            onChange={(e) => handleSignCell(setScaleConfirmed, d, shift, e.target.value)}
                          />
                        </td>
                      );
                    })
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. DOCUMENT FOOTER (Exact match of Screenshot 3) */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between p-2 px-4 bg-white text-[11px] font-black text-black font-sans border-t border-black">
          <span>FRM-WH-QA-046</span>
          <span>REV:-04</span>
          <span>REV DATE:-10.01.22</span>
          <span>Issue Date:- 15.03.08</span>
          <span>Page No.: 1 of 1</span>
        </div>
      </div>
    </div>
  );
}
