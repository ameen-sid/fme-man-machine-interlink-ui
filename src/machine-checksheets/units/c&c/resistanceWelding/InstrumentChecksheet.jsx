import React, { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';

// Instrument 1: Blade Micrometer (6 points)
const INITIAL_BLADE_POINTS = [
  { id: 1, checkPoint: 'ANVIL BLADE CONDITION', frequency: 'DAILY' },
  { id: 2, checkPoint: 'SPINDLE CONDITION', frequency: 'DAILY' },
  { id: 3, checkPoint: 'DISPLAY CONDITION', frequency: 'DAILY' },
  { id: 4, checkPoint: 'SWITCH CONDITION', frequency: 'DAILY' },
  { id: 5, checkPoint: 'RACHET CONDITION', frequency: 'DAILY' },
  { id: 6, checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

// Instrument 2: Measuring Scale (2 points)
const INITIAL_SCALE_POINTS = [
  { id: 1, checkPoint: 'VISUAL CONDITION', frequency: 'DAILY' },
  { id: 2, checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

// 31 days with Shifts A, B, C per day
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
  const machineKey = machine?.id || machine?.name || 'rw_default';
  const storageKey = `rw_instrument_checksheet_${machineKey}`;

  const defaultLocation = machine?.name ? `${machine.name} (Resistance Welding)` : 'Resistance Welding';

  // State
  const [docMeta, setDocMeta] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_meta`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      bladeNo: '',
      bladeName: 'Blade Micrometer',
      month: '',
      location: defaultLocation,
      scaleNo: '',
      scaleName: 'Measuring Scale',
      scaleLocation: defaultLocation,
      scaleMonth: ''
    };
  });

  const [bladeGrid, setBladeGrid] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blade_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return createInitialGrid(6);
  });

  const [bladeChecked, setBladeChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blade_checked`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return createSignGrid();
  });

  const [bladeConfirmed, setBladeConfirmed] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blade_confirmed`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return createSignGrid();
  });

  const [weeklyData, setWeeklyData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_weekly`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return DEFAULT_WEEKLY;
  });

  const [scaleGrid, setScaleGrid] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return createInitialGrid(2);
  });

  const [scaleChecked, setScaleChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_checked`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return createSignGrid();
  });

  const [scaleConfirmed, setScaleConfirmed] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_scale_confirmed`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return createSignGrid();
  });

  // Auto-persist changes
  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_meta`, JSON.stringify(docMeta));
    } catch (e) {}
  }, [docMeta, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_blade_grid`, JSON.stringify(bladeGrid));
    } catch (e) {}
  }, [bladeGrid, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_blade_checked`, JSON.stringify(bladeChecked));
    } catch (e) {}
  }, [bladeChecked, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_blade_confirmed`, JSON.stringify(bladeConfirmed));
    } catch (e) {}
  }, [bladeConfirmed, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_weekly`, JSON.stringify(weeklyData));
    } catch (e) {}
  }, [weeklyData, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_scale_grid`, JSON.stringify(scaleGrid));
    } catch (e) {}
  }, [scaleGrid, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_scale_checked`, JSON.stringify(scaleChecked));
    } catch (e) {}
  }, [scaleChecked, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_scale_confirmed`, JSON.stringify(scaleConfirmed));
    } catch (e) {}
  }, [scaleConfirmed, storageKey]);

  const handleCellChange = (setGridFn, pointId, day, shift, value) => {
    setGridFn(prev => {
      const copy = { ...prev };
      if (!copy[pointId]) copy[pointId] = {};
      if (!copy[pointId][day]) copy[pointId][day] = {};
      copy[pointId] = {
        ...copy[pointId],
        [day]: {
          ...copy[pointId][day],
          [shift]: value
        }
      };
      return copy;
    });
  };

  const handleSignCellChange = (setGridFn, day, shift, value) => {
    setGridFn(prev => {
      const copy = { ...prev };
      if (!copy[day]) copy[day] = {};
      copy[day] = {
        ...copy[day],
        [shift]: value
      };
      return copy;
    });
  };

  const handleWeeklyChange = (idx, field, val) => {
    setWeeklyData(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this Instrument Check Sheet to initial defaults?')) {
      setBladeGrid(createInitialGrid(6));
      setBladeChecked(createSignGrid());
      setBladeConfirmed(createSignGrid());
      setScaleGrid(createInitialGrid(2));
      setScaleChecked(createSignGrid());
      setScaleConfirmed(createSignGrid());
      setWeeklyData(DEFAULT_WEEKLY);
      setDocMeta({
        bladeNo: '',
        bladeName: 'Blade Micrometer',
        month: '',
        location: defaultLocation,
        scaleNo: '',
        scaleName: 'Measuring Scale',
        scaleLocation: defaultLocation,
        scaleMonth: ''
      });
      localStorage.removeItem(`${storageKey}_meta`);
      localStorage.removeItem(`${storageKey}_blade_grid`);
      localStorage.removeItem(`${storageKey}_blade_checked`);
      localStorage.removeItem(`${storageKey}_blade_confirmed`);
      localStorage.removeItem(`${storageKey}_weekly`);
      localStorage.removeItem(`${storageKey}_scale_grid`);
      localStorage.removeItem(`${storageKey}_scale_checked`);
      localStorage.removeItem(`${storageKey}_scale_confirmed`);
    }
  };

  const getCellBgClass = (val) => {
    const v = (val || '').trim().toLowerCase();
    if (v === 'ok' || v === '√' || v === '✓') return 'bg-emerald-100 text-emerald-800 font-bold';
    if (v === 'ng' || v === 'x' || v === '✗') return 'bg-rose-100 text-rose-800 font-bold';
    return 'text-slate-900 font-bold';
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-50 transition-all duration-200">
      {/* Top Header Navigation */}
      <ChecksheetHeaderNav
        title="INSTRUMENT CHECK SHEET"
        subtitle={`Format: FRM-WH-QA-048 • Rev: 04 • Machine: ${machine?.name || 'Resistance Welding'}`}
        icon={Gauge}
        iconBgClass="bg-orange-100 text-orange-600"
        onClose={onClose}
        onReset={handleReset}
      />

      {/* Main Check Sheet Container */}
      <div className="bg-white border-[1.5px] border-slate-900 shadow-md rounded overflow-hidden flex flex-col">
        {/* ========================================================= */}
        {/* COMPANY NAME (Top Right) */}
        {/* ========================================================= */}
        <div className="flex justify-end px-4 pt-2.5 pb-1 bg-white">
          <span className="text-[11.5px] font-black tracking-wider text-slate-900 uppercase">
            FURUKAWA MINDA ELECTRIC PVT. LTD.
          </span>
        </div>

        {/* ========================================================= */}
        {/* TITLE: INSTRUMENT CHECK SHEET */}
        {/* ========================================================= */}
        <div className="border-t-[2px] border-b-[2px] border-slate-900 bg-white py-2 text-center">
          <h1 className="text-xl sm:text-2xl font-black tracking-widest text-slate-900 uppercase m-0">
            INSTRUMENT CHECK SHEET
          </h1>
        </div>

        {/* ========================================================= */}
        {/* TABLE 1: BLADE MICROMETER SUBHEADER */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b-[2px] border-slate-900 bg-white text-xs">
          {/* Left Column: INSTRUMENT NAME & INSTRUMENT NO. */}
          <div className="flex flex-col border-r border-slate-900">
            <div className="flex items-center border-b border-slate-900 px-3 py-1.5">
              <span className="font-black text-slate-900 text-[11px] w-44 shrink-0">
                INSTRUMENT NAME:
              </span>
              <span className="font-semibold text-slate-900 text-[11px]">
                {docMeta.bladeName}
              </span>
            </div>
            <div className="flex items-center px-3 py-1.5">
              <span className="font-black text-slate-900 text-[11px] w-44 shrink-0">
                INSTRUMENT NO.:
              </span>
              <input
                className="border-none bg-transparent text-[11px] font-bold text-slate-900 outline-none w-full"
                value={docMeta.bladeNo}
                placeholder="Enter instrument no."
                onChange={(e) => setDocMeta({ ...docMeta, bladeNo: e.target.value })}
              />
            </div>
          </div>

          {/* Right Column: MONTH & LOCATION */}
          <div className="flex flex-col">
            <div className="flex items-center border-b border-slate-900 px-3 py-1.5">
              <span className="font-black text-slate-900 text-[11px] w-28 shrink-0">
                MONTH:
              </span>
              <input
                className="border-none bg-transparent text-[11px] font-bold text-slate-900 outline-none w-full"
                value={docMeta.month}
                placeholder="e.g. October 2026"
                onChange={(e) => setDocMeta({ ...docMeta, month: e.target.value })}
              />
            </div>
            <div className="flex items-center px-3 py-1.5">
              <span className="font-black text-slate-900 text-[11px] w-28 shrink-0">
                LOCATION:
              </span>
              <input
                className="border-none bg-transparent text-[11px] font-bold text-slate-900 outline-none w-full"
                value={docMeta.location}
                placeholder="Enter location"
                onChange={(e) => setDocMeta({ ...docMeta, location: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TABLE 1: BLADE MICROMETER GRID */}
        {/* ========================================================= */}
        <div className="w-full overflow-x-auto border-b-[2px] border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
            <thead>
              <tr>
                <th
                  className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[11px] text-center"
                  rowSpan={3}
                  style={{ width: '55px', minWidth: '55px' }}
                >
                  Sr.NO.
                </th>
                <th
                  className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[11px] text-center"
                  rowSpan={3}
                  style={{ width: '220px', minWidth: '220px' }}
                >
                  CHECK POINT
                </th>
                <th
                  className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[10.5px] text-center"
                  rowSpan={3}
                  style={{ width: '95px', minWidth: '95px' }}
                >
                  FREQUENCY
                </th>
                <th
                  className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-xs text-center tracking-widest"
                  colSpan={93}
                >
                  DATE
                </th>
              </tr>
              <tr>
                {DAYS_31.map((d) => (
                  <th
                    key={d}
                    colSpan={3}
                    className="border border-slate-900 bg-white text-[10px] font-black text-slate-900 text-center p-0.5"
                  >
                    {d}
                  </th>
                ))}
              </tr>
              <tr>
                {DAYS_31.map((d) => (
                  <React.Fragment key={d}>
                    <th className="border border-slate-900 text-[9px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">
                      A
                    </th>
                    <th className="border border-slate-900 text-[9px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">
                      B
                    </th>
                    <th className="border border-slate-900 text-[9px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">
                      C
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {INITIAL_BLADE_POINTS.map((pt) => (
                <tr key={pt.id} className="h-6">
                  <td className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[10.5px]">
                    {pt.id}
                  </td>
                  <td className="border border-slate-900 p-1 pl-2 text-left font-bold text-slate-900 text-[10.5px] whitespace-pre-line leading-tight">
                    {pt.checkPoint}
                  </td>
                  <td className="border border-slate-900 p-1 font-bold text-[10px] text-slate-900 bg-white text-center">
                    {pt.frequency}
                  </td>
                  {DAYS_31.map((d) => (
                    <React.Fragment key={d}>
                      {SHIFTS.map((s) => {
                        const val = bladeGrid[pt.id]?.[d]?.[s] || '';
                        return (
                          <td
                            key={s}
                            className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white"
                          >
                            <input
                              className={`w-full h-full border-none bg-transparent text-center text-[10px] outline-none cursor-pointer focus:bg-blue-100 ${getCellBgClass(val)}`}
                              value={val}
                              onChange={(e) =>
                                handleCellChange(setBladeGrid, pt.id, d, s, e.target.value.toUpperCase())
                              }
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
              ))}

              {/* Checked By:- Row */}
              <tr className="h-6 bg-white">
                <td
                  colSpan={3}
                  className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]"
                >
                  Checked By:-
                </td>
                {DAYS_31.map((d) => (
                  <React.Fragment key={d}>
                    {SHIFTS.map((s) => {
                      const val = bladeChecked[d]?.[s] || '';
                      return (
                        <td
                          key={s}
                          className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white"
                        >
                          <input
                            className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                            value={val}
                            onChange={(e) =>
                              handleSignCellChange(setBladeChecked, d, s, e.target.value)
                            }
                          />
                        </td>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tr>

              {/* Confirmed By:- Row */}
              <tr className="h-6 bg-white">
                <td
                  colSpan={3}
                  className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]"
                >
                  Confirmed By:-
                </td>
                {DAYS_31.map((d) => (
                  <React.Fragment key={d}>
                    {SHIFTS.map((s) => {
                      const val = bladeConfirmed[d]?.[s] || '';
                      return (
                        <td
                          key={s}
                          className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white"
                        >
                          <input
                            className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                            value={val}
                            onChange={(e) =>
                              handleSignCellChange(setBladeConfirmed, d, s, e.target.value)
                            }
                          />
                        </td>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* MIDDLE SECTION: BLADE MICROMETER DIAGRAM & WEEKLY VERIFICATION */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 bg-white border-b-[2px] border-slate-900 items-start">
          {/* Left Column: Blade Micrometer Diagram + Remarks */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* The Blade Micrometer Photo with Callouts 1 to 6 */}
            <div className="border-[2px] border-slate-900 bg-white p-1 inline-block max-w-[620px] shadow-sm">
              <img
                src="/blade-micrometer-guide.png"
                alt="Blade Micrometer Guide (1-Anvil Blade, 2-Spindle, 3-Display, 4-Switch, 5-Rachet, 6-Calibration Validity)"
                className="w-full h-auto object-contain block select-none"
              />
            </div>

            {/* Remarks block */}
            <div className="flex flex-col pt-1">
              <span className="font-black text-[12px] text-slate-900 block mb-1">
                Remarks:-
              </span>
              <ul className="text-[11px] font-bold text-slate-900 m-0 pl-0 leading-relaxed list-none space-y-0.5">
                <li>*Check zero setting Properly before using the instrument.</li>
                <li>*In Case of any doubt,ask to QA.</li>
                <li>*If any problem then inform to QA.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: WEEKLY VERIFICATION Table */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="border-[1.5px] border-slate-900 bg-white w-full max-w-[420px] shadow-sm">
              <table className="w-full border-collapse text-[10.5px]">
                <thead>
                  <tr>
                    <th
                      colSpan={6}
                      className="border border-slate-900 text-center font-extrabold text-[12px] py-1.5 bg-white text-slate-900 tracking-wider"
                    >
                      WEEKLY VERIFICATION
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan={2}
                      className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900"
                    >
                      POINTS
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900 w-14">
                      WEEK - 1
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900 w-14">
                      WEEK - 2
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900 w-14">
                      WEEK - 3
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900 w-14">
                      WEEK - 4
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: ANVIL CONDITION */}
                  <tr>
                    <td
                      colSpan={2}
                      className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle"
                    >
                      ANVIL CONDITION
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={weeklyData[0]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(0, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: ZERO SETTING */}
                  <tr>
                    <td
                      colSpan={2}
                      className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle"
                    >
                      ZERO SETTING
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={weeklyData[1]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(1, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 3 & 4: CALIBRATION -> Gauge & Actual */}
                  <tr>
                    <td
                      rowSpan={2}
                      className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-900 align-middle leading-tight w-20"
                    >
                      CALIBRATION
                    </td>
                    <td className="border border-slate-900 p-1 text-center text-[10px] font-bold text-slate-900 align-middle w-16">
                      Gauge
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={weeklyData[2]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(2, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-900 p-1 text-center text-[10px] font-bold text-slate-900 align-middle w-16">
                      Actual
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={weeklyData[3]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(3, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: ANY OTHER */}
                  <tr>
                    <td
                      colSpan={2}
                      className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle"
                    >
                      ANY OTHER
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={weeklyData[4]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(4, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 6: ENGG. SIGN. */}
                  <tr>
                    <td
                      colSpan={2}
                      className="border border-slate-900 p-1.5 text-center text-[10px] font-black text-slate-900 align-middle"
                    >
                      ENGG. SIGN.
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={weeklyData[5]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(5, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TABLE 2: MEASURING SCALE SUBHEADER */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-4 border-b-[2px] border-slate-900 bg-white text-xs">
          {/* INSTRUMENT NO. */}
          <div className="flex items-center border-r border-slate-900 px-3 py-1.5">
            <span className="font-black text-slate-900 text-[11px] whitespace-nowrap mr-2">
              INSTRUMENT NO.:
            </span>
            <input
              className="border-none bg-transparent text-[11px] font-bold text-slate-900 outline-none w-full"
              value={docMeta.scaleNo}
              placeholder="Enter instrument no."
              onChange={(e) => setDocMeta({ ...docMeta, scaleNo: e.target.value })}
            />
          </div>

          {/* INSTRUMENT NAME */}
          <div className="flex items-center border-r border-slate-900 px-3 py-1.5">
            <span className="font-black text-slate-900 text-[11px] whitespace-nowrap mr-2">
              INSTRUMENT NAME:
            </span>
            <span className="font-semibold text-slate-900 text-[11px]">
              {docMeta.scaleName}
            </span>
          </div>

          {/* LOCATION */}
          <div className="flex items-center border-r border-slate-900 px-3 py-1.5">
            <span className="font-black text-slate-900 text-[11px] whitespace-nowrap mr-2">
              LOCATION:
            </span>
            <input
              className="border-none bg-transparent text-[11px] font-bold text-slate-900 outline-none w-full"
              value={docMeta.scaleLocation}
              placeholder="Enter location"
              onChange={(e) => setDocMeta({ ...docMeta, scaleLocation: e.target.value })}
            />
          </div>

          {/* MONTH */}
          <div className="flex items-center px-3 py-1.5">
            <span className="font-black text-slate-900 text-[11px] whitespace-nowrap mr-2">
              MONTH:
            </span>
            <input
              className="border-none bg-transparent text-[11px] font-bold text-slate-900 outline-none w-full"
              value={docMeta.scaleMonth || docMeta.month}
              placeholder="e.g. October 2026"
              onChange={(e) => setDocMeta({ ...docMeta, scaleMonth: e.target.value })}
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* TABLE 2: MEASURING SCALE GRID */}
        {/* ========================================================= */}
        <div className="w-full overflow-x-auto border-b-[2px] border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
            <thead>
              <tr>
                <th
                  className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[11px] text-center"
                  rowSpan={3}
                  style={{ width: '55px', minWidth: '55px' }}
                >
                  Sr NO
                </th>
                <th
                  className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[11px] text-center"
                  rowSpan={3}
                  style={{ width: '220px', minWidth: '220px' }}
                >
                  CHECK POINT
                </th>
                <th
                  className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[10.5px] text-center"
                  rowSpan={3}
                  style={{ width: '95px', minWidth: '95px' }}
                >
                  FREQUENCY
                </th>
                <th
                  className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-xs text-center tracking-widest"
                  colSpan={93}
                >
                  DATE
                </th>
              </tr>
              <tr>
                {DAYS_31.map((d) => (
                  <th
                    key={d}
                    colSpan={3}
                    className="border border-slate-900 bg-white text-[10px] font-black text-slate-900 text-center p-0.5"
                  >
                    {d}
                  </th>
                ))}
              </tr>
              <tr>
                {DAYS_31.map((d) => (
                  <React.Fragment key={d}>
                    <th className="border border-slate-900 text-[9px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">
                      A
                    </th>
                    <th className="border border-slate-900 text-[9px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">
                      B
                    </th>
                    <th className="border border-slate-900 text-[9px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">
                      C
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {INITIAL_SCALE_POINTS.map((pt) => (
                <tr key={pt.id} className="h-6">
                  <td className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[10.5px]">
                    {pt.id}
                  </td>
                  <td className="border border-slate-900 p-1 pl-2 text-left font-bold text-slate-900 text-[10.5px] whitespace-pre-line leading-tight">
                    {pt.checkPoint}
                  </td>
                  <td className="border border-slate-900 p-1 font-bold text-[10px] text-slate-900 bg-white text-center">
                    {pt.frequency}
                  </td>
                  {DAYS_31.map((d) => (
                    <React.Fragment key={d}>
                      {SHIFTS.map((s) => {
                        const val = scaleGrid[pt.id]?.[d]?.[s] || '';
                        return (
                          <td
                            key={s}
                            className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white"
                          >
                            <input
                              className={`w-full h-full border-none bg-transparent text-center text-[10px] outline-none cursor-pointer focus:bg-blue-100 ${getCellBgClass(val)}`}
                              value={val}
                              onChange={(e) =>
                                handleCellChange(setScaleGrid, pt.id, d, s, e.target.value.toUpperCase())
                              }
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
              ))}

              {/* Checked By:- Row */}
              <tr className="h-6 bg-white">
                <td
                  colSpan={3}
                  className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]"
                >
                  Checked By:-
                </td>
                {DAYS_31.map((d) => (
                  <React.Fragment key={d}>
                    {SHIFTS.map((s) => {
                      const val = scaleChecked[d]?.[s] || '';
                      return (
                        <td
                          key={s}
                          className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white"
                        >
                          <input
                            className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                            value={val}
                            onChange={(e) =>
                              handleSignCellChange(setScaleChecked, d, s, e.target.value)
                            }
                          />
                        </td>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tr>

              {/* Confirmed By:- Row */}
              <tr className="h-6 bg-white">
                <td
                  colSpan={3}
                  className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]"
                >
                  Confirmed By:-
                </td>
                {DAYS_31.map((d) => (
                  <React.Fragment key={d}>
                    {SHIFTS.map((s) => {
                      const val = scaleConfirmed[d]?.[s] || '';
                      return (
                        <td
                          key={s}
                          className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white"
                        >
                          <input
                            className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                            value={val}
                            onChange={(e) =>
                              handleSignCellChange(setScaleConfirmed, d, s, e.target.value)
                            }
                          />
                        </td>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* FOOTER BAR (EXACT AS SCREENSHOT) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-5 border-t border-slate-900 bg-white text-[11px] font-bold text-slate-900 py-2 px-3 text-center">
          <div className="border-r border-slate-900 text-left pl-2">
            FRM-WH-QA-048
          </div>
          <div className="border-r border-slate-900">
            REV:-04
          </div>
          <div className="border-r border-slate-900">
            REV DATE:-10.01.22
          </div>
          <div className="border-r border-slate-900">
            Issue Date:-15.03.09
          </div>
          <div className="text-right pr-2">
            Page 3 of 13
          </div>
        </div>
      </div>
    </div>
  );
}