import React, { useState, useEffect } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import { CalendarCheck2, RotateCcw, Plus, Printer, Trash2 } from 'lucide-react';

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

// Part 1: Operator Check Points - Matching Resistance Welding Screenshot 1
const RW_OPERATOR_POINTS = [
  {
    id: 'rw_op1',
    point: 'Check the Weld Butt & wire end Movement',
    hindi: 'Weld Butt & wire end की मूवमेंट को चेक करे',
    resp: 'Machine Operator',
    stdValue: 'Smooth Movement',
    method: 'Test & Trial',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'rw_op2',
    point: 'Check Safety cover condition and interlocking',
    hindi: 'सेफ्टी डोर के फंक्शन को चेक करे',
    resp: 'Machine Operator',
    stdValue: 'Machine will not operate when safety cover is open and smooth operation of safety cover',
    method: 'Test & Trial',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'rw_op3',
    point: 'Check Emergency switch working',
    hindi: 'emergency के फंक्शन को चेक करे',
    resp: 'Machine Operator',
    stdValue: 'Machine will not operate when emergency switch pressed',
    method: 'Test & Trial',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'rw_op4',
    point: 'Check The Main Air Pressure in Gauge',
    hindi: 'गेज में मेन एयर प्रेशर को चेक करे',
    resp: 'Machine Operator',
    stdValue: '0.4~0.6Mpa',
    method: 'Dial Indicator',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'rw_op5',
    point: 'Change the water approximately twice in a month. Use only Tap water for refilling',
    hindi: '',
    resp: 'Machine Operator',
    stdValue: 'Water level should be between low and high mark in the tank',
    method: 'Visually',
    customFreq: 'Every Second week Saturday and Fourth week Saturday',
    shifts: ['Shift A']
  }
];

// Part 2: Maintenance Check Points - Matching Resistance Welding Screenshot 2
const RW_MAINT_POINTS = [
  {
    id: 'rw_mt1',
    point: 'Check the Air Leakage in Machine',
    hindi: 'हवा के रिसाव की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: 'No Leakage',
    method: 'By hearing',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'rw_mt2',
    point: 'Check the Gliding Jaw Condition',
    hindi: 'ग्लाइडिंग जॉ की स्थिति चेक करें',
    resp: 'Maint. Technician',
    stdValue: 'Smooth functioning',
    method: 'Visullay',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'rw_mt3',
    point: 'Check the Touch screen,manual switch & foot switch function',
    hindi: 'फूट स्विच के फंक्शन को चेक करे',
    resp: 'Maint. Technician',
    stdValue: 'Functionally',
    method: 'Test & Trial',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'rw_mt4',
    point: 'Check the Machine key switch and on/offf switch function',
    hindi: 'मशीन का key स्विच और ऑन ऑफ स्विच के फंक्शन को चेक करे',
    resp: 'Maint. Technician',
    stdValue: 'Functionally',
    method: 'Test & Trial',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'rw_mt5',
    point: 'Check the Refrigerator Temperature set value',
    hindi: 'रेफ्रिजरेटर तापमान निर्धारित मान की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: '30 °C',
    method: 'Visually',
    freqD: '✓',
    freqW: '',
    freqS: '',
    shifts: ['A', 'B', 'C']
  }
];

function createEmptyGrid(points) {
  const grid = {};
  points.forEach((p) => {
    grid[p.id] = {};
    for (let d = 1; d <= 31; d++) {
      grid[p.id][d] = {};
      p.shifts.forEach((s) => {
        grid[p.id][d][s] = '';
      });
    }
  });
  return grid;
}

function createEmptySigns(labelKeys) {
  const signs = {};
  labelKeys.forEach((k) => {
    signs[k] = {};
    for (let d = 1; d <= 31; d++) {
      signs[k][d] = '';
    }
  });
  return signs;
}

const OP_SIGN_KEYS = ['opA', 'opB', 'opC', 'supProd'];
const MT_SIGN_KEYS = ['mtA', 'mtB', 'mtC', 'supMaint'];

const INITIAL_ABNORMALITY_ROWS = Array.from({ length: 6 }, (_, i) => ({
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
  feedback: '',
  maintSign: '',
  prodSign: ''
}));

export default function DailyChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'R/SW 01';
  const storageKey = `rw_daily_${machineName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const [docMeta, setDocMeta] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_meta`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      company: 'FURUKAWA MINDA ELECTRIC PVT. LTD.',
      docNo: 'CHK-WH-MT-003',
      revNo: '00',
      date: '24.03.2018',
      machineName: 'Resistance welding',
      machineNo: machineName
    };
  });

  const [operatorGrid, setOperatorGrid] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_op_grid`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return createEmptyGrid(RW_OPERATOR_POINTS);
  });

  const [opSigns, setOpSigns] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_op_signs`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return createEmptySigns(OP_SIGN_KEYS);
  });

  const [maintGrid, setMaintGrid] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_mt_grid`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return createEmptyGrid(RW_MAINT_POINTS);
  });

  const [mtSigns, setMtSigns] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_mt_signs`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return createEmptySigns(MT_SIGN_KEYS);
  });

  const [abnormalities, setAbnormalities] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_abnormalities`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_ABNORMALITY_ROWS;
  });

  // Auto-persist changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${storageKey}_meta`, JSON.stringify(docMeta));
  }, [docMeta, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_op_grid`, JSON.stringify(operatorGrid));
  }, [operatorGrid, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_op_signs`, JSON.stringify(opSigns));
  }, [opSigns, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_mt_grid`, JSON.stringify(maintGrid));
  }, [maintGrid, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_mt_signs`, JSON.stringify(mtSigns));
  }, [mtSigns, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_abnormalities`, JSON.stringify(abnormalities));
  }, [abnormalities, storageKey]);

  // Handlers for grid cells
  const handleCellChange = (setGridFn, pointId, day, shift, value) => {
    setGridFn((prev) => {
      const copy = { ...prev };
      if (!copy[pointId]) copy[pointId] = {};
      if (!copy[pointId][day]) copy[pointId][day] = {};
      copy[pointId][day] = { ...copy[pointId][day], [shift]: value };
      return copy;
    });
  };

  const toggleCellSymbol = (setGridFn, pointId, day, shift) => {
    setGridFn((prev) => {
      const copy = { ...prev };
      if (!copy[pointId]) copy[pointId] = {};
      if (!copy[pointId][day]) copy[pointId][day] = {};
      const current = copy[pointId][day][shift] || '';
      const next = current === '✓' ? 'X' : current === 'X' ? '' : '✓';
      copy[pointId][day] = { ...copy[pointId][day], [shift]: next };
      return copy;
    });
  };

  const handleSignChange = (setSignFn, signKey, day, value) => {
    setSignFn((prev) => ({
      ...prev,
      [signKey]: {
        ...prev[signKey],
        [day]: value
      }
    }));
  };

  const handleAbnormalChange = (idx, field, value) => {
    setAbnormalities((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleAddAbnormalityRow = () => {
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
        feedback: '',
        maintSign: '',
        prodSign: ''
      }
    ]);
  };

  const handleDeleteAbnormalityRow = (id) => {
    if (abnormalities.length <= 1) return;
    setAbnormalities((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReset = () => {
    if (window.confirm(`Reset Daily Machine Check Sheet values for ${machineName}?`)) {
      setOperatorGrid(createEmptyGrid(RW_OPERATOR_POINTS));
      setOpSigns(createEmptySigns(OP_SIGN_KEYS));
      setMaintGrid(createEmptyGrid(RW_MAINT_POINTS));
      setMtSigns(createEmptySigns(MT_SIGN_KEYS));
      setAbnormalities(INITIAL_ABNORMALITY_ROWS);
      localStorage.removeItem(`${storageKey}_op_grid`);
      localStorage.removeItem(`${storageKey}_op_signs`);
      localStorage.removeItem(`${storageKey}_mt_grid`);
      localStorage.removeItem(`${storageKey}_mt_signs`);
      localStorage.removeItem(`${storageKey}_abnormalities`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-4 w-full min-h-[90vh] pb-10">
      {/* Top Controls Header Bar */}
      <ChecksheetHeaderNav
        title={`Daily Check Sheet — ${machineName}`}
        subtitle={`Process: Resistance Welding • Model: ${machine.model || 'Machine'} • CHK-WH-MT-003`}
        icon={CalendarCheck2}
        iconBgClass="bg-emerald-100 text-emerald-700"
        onClose={onClose}
        onReset={handleReset}
        resetTitle="Reset Checksheet Values"
        extraActions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 transition-colors cursor-pointer shadow-xs"
              title="Print Checksheet"
            >
              <Printer size={15} />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600 cursor-pointer transition-colors shadow-2xs"
              title="Reset Table Values"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        }
      />

      {/* Main Checksheet White Paper Card */}
      <div className="bg-white border-2 border-slate-900 shadow-md rounded overflow-hidden p-2 print:border-none print:shadow-none">
        {/* Company Header - Top Right (Above Sheet Box as in Excel Standard) */}
        <div className="flex justify-end px-3 pt-1 pb-1 bg-white">
          <span className="text-[11px] font-black tracking-wider text-slate-900 uppercase">
            {docMeta.company}
          </span>
        </div>

        {/* Top Header Box (Exact replica of Screenshot 1) */}
        <div className="border-t-2 border-b-2 border-slate-900 bg-white">
          {/* Row 1: Big Title & Doc No / Rev */}
          <div className="flex border-b border-slate-900">
            <div className="flex-1 flex items-center px-4 py-2 bg-white">
              <h1 className="text-xl sm:text-2xl font-black tracking-wide text-black uppercase m-0">
                DAILY CHECK SHEET
              </h1>
            </div>
            {/* Doc No & Rev No Box */}
            <div className="w-56 min-w-[220px] border-l-2 border-slate-900 flex flex-col justify-center bg-white text-[11px] font-bold text-slate-900">
              <div className="border-b border-slate-900 px-3 py-1 flex items-center justify-between">
                <span className="whitespace-nowrap font-bold text-slate-900">Doc No:-</span>
                <input
                  type="text"
                  className="border-none bg-transparent font-bold text-slate-900 outline-none w-28 text-right"
                  value={docMeta.docNo}
                  onChange={(e) => setDocMeta({ ...docMeta, docNo: e.target.value })}
                />
              </div>
              <div className="px-3 py-1 flex items-center justify-between">
                <span className="whitespace-nowrap font-bold text-slate-900">REV:-</span>
                <input
                  type="text"
                  className="border-none bg-transparent font-bold text-slate-900 outline-none w-20 text-right"
                  value={docMeta.revNo}
                  onChange={(e) => setDocMeta({ ...docMeta, revNo: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Machine Name, Machine No, Date */}
          <div className="flex bg-white text-xs">
            <div className="flex-1 flex items-center justify-between px-4 py-1.5 font-bold text-slate-900">
              <div className="flex items-center gap-1.5">
                <span className="whitespace-nowrap font-bold text-slate-900">Machine Name :</span>
                <input
                  type="text"
                  className="border-none bg-transparent font-bold text-slate-900 outline-none w-44 px-1"
                  value={docMeta.machineName}
                  onChange={(e) => setDocMeta({ ...docMeta, machineName: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-1.5 pr-8">
                <span className="whitespace-nowrap font-bold text-slate-900">Machine No.</span>
                <input
                  type="text"
                  className="border-none bg-transparent font-bold text-slate-900 outline-none w-24 px-1 uppercase"
                  value={docMeta.machineNo}
                  onChange={(e) => setDocMeta({ ...docMeta, machineNo: e.target.value })}
                />
              </div>
            </div>
            {/* Date Box */}
            <div className="w-56 min-w-[220px] border-l-2 border-slate-900 px-3 py-1.5 flex items-center justify-between font-bold text-[11px] text-slate-900 bg-white">
              <span className="whitespace-nowrap font-bold text-slate-900">DATE:-</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-slate-900 outline-none w-28 text-right"
                value={docMeta.date}
                onChange={(e) => setDocMeta({ ...docMeta, date: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: RELATED WITH M/C OPERATORS */}
        {/* ========================================================= */}
        <div className="w-full bg-[#d0d0d0] border-b-2 border-slate-900 px-3 py-1 text-xs font-black text-slate-900 italic">
          Related with m/c operators
        </div>

        <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[1550px]" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '230px' }} />
              <col style={{ width: '90px' }} />
              <col style={{ width: '170px' }} />
              <col style={{ width: '95px' }} />
              <col style={{ width: '26px' }} />
              <col style={{ width: '26px' }} />
              <col style={{ width: '26px' }} />
              <col style={{ width: '32px' }} />
              {DAYS_31.map((d) => (
                <col key={d} style={{ width: '30px' }} />
              ))}
            </colgroup>

            <thead>
              <tr className="bg-white">
                <th rowSpan={2} className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[10px] align-middle">
                  STARTUP CHECK POINTS<br />(SHIFT CONFIRMATION)<br />
                  <span className="text-[9px] font-normal text-slate-700">ACTIVITY</span>
                </th>
                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle">
                  Resp.
                </th>
                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle">
                  Check Value
                </th>
                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle">
                  Method
                </th>
                <th colSpan={3} className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle">
                  FREQ
                </th>
                <th colSpan={32} className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle">
                  Daily Status
                </th>
              </tr>
              <tr className="bg-[#dcdcdc]">
                <th className="border border-slate-900 p-1 font-bold text-slate-900 text-center text-[9.5px]">Who</th>
                <th className="border border-slate-900 p-1 font-bold text-slate-900 text-center text-[9.5px] uppercase">STD VALUE</th>
                <th className="border border-slate-900 p-1 font-bold text-slate-900 text-center text-[9.5px]">Measuring Method</th>
                <th className="border border-slate-900 p-0.5 bg-white font-bold text-slate-900 text-center text-[9.5px]">D</th>
                <th className="border border-slate-900 p-0.5 bg-white font-bold text-slate-900 text-center text-[9.5px]">W</th>
                <th className="border border-slate-900 p-0.5 bg-white font-bold text-slate-900 text-center text-[9.5px]">S</th>
                <th className="border border-slate-900 p-0.5 font-bold text-slate-900 text-center text-[9px] bg-slate-100">Shift</th>
                {DAYS_31.map((d) => (
                  <th key={d} className="border border-slate-900 p-0.5 bg-white font-black text-slate-900 text-center text-[9.5px]">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Operator Points 1 to 4 (Shifts A, B, C) */}
              {RW_OPERATOR_POINTS.slice(0, 4).map((pt) => (
                <React.Fragment key={pt.id}>
                  {pt.shifts.map((shift, sIdx) => (
                    <tr key={shift} className="h-6 hover:bg-slate-50/60">
                      {sIdx === 0 && (
                        <>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-1.5 text-left font-bold align-middle leading-tight">
                            <div className="text-[10px] text-slate-950 font-bold">{pt.point}</div>
                            {pt.hindi && <div className="text-[9px] text-slate-700 font-normal mt-0.5">{pt.hindi}</div>}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle">
                            {pt.resp}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle whitespace-pre-line leading-tight">
                            {pt.stdValue}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle">
                            {pt.method}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-0.5 text-center font-black text-[10px] align-middle">
                            {pt.freqD}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-0.5 text-center font-black text-[10px] align-middle">
                            {pt.freqW}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-0.5 text-center font-black text-[10px] align-middle">
                            {pt.freqS}
                          </td>
                        </>
                      )}
                      {/* Shift Column */}
                      <td className="border border-slate-900 p-0.5 text-center font-black text-[9.5px] bg-slate-50 text-slate-900">
                        {shift}
                      </td>
                      {/* 31 Days Status Cells */}
                      {DAYS_31.map((d) => {
                        const val = operatorGrid[pt.id]?.[d]?.[shift] || '';
                        return (
                          <td
                            key={d}
                            className="border border-slate-900 p-0 text-center relative cursor-pointer select-none bg-white hover:bg-blue-50/50"
                            onDoubleClick={() => toggleCellSymbol(setOperatorGrid, pt.id, d, shift)}
                            title={`Double click to toggle ✓ / X, or type`}
                          >
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, shift, e.target.value)}
                              className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px] font-black"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Operator Point 5: Water Change (Custom Frequency spanning FREQ columns) */}
              {(() => {
                const pt = RW_OPERATOR_POINTS[4];
                return (
                  <tr className="h-8 hover:bg-slate-50/60">
                    <td className="border border-slate-900 p-1.5 text-left font-bold align-middle leading-tight">
                      <div className="text-[10px] text-slate-950 font-bold">{pt.point}</div>
                    </td>
                    <td className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle">
                      {pt.resp}
                    </td>
                    <td className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle leading-tight">
                      {pt.stdValue}
                    </td>
                    <td className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle">
                      {pt.method}
                    </td>
                    {/* Frequency text spanning D, W, S */}
                    <td colSpan={3} className="border border-slate-900 p-1 text-center font-bold text-[8.5px] align-middle leading-tight bg-slate-50">
                      {pt.customFreq}
                    </td>
                    {/* Shift A */}
                    <td className="border border-slate-900 p-0.5 text-center font-black text-[9px] bg-slate-50 text-slate-900">
                      Shift A
                    </td>
                    {/* 31 Days Status Cells */}
                    {DAYS_31.map((d) => {
                      const val = operatorGrid[pt.id]?.[d]?.['Shift A'] || '';
                      return (
                        <td
                          key={d}
                          className="border border-slate-900 p-0 text-center relative cursor-pointer select-none bg-white hover:bg-blue-50/50"
                          onDoubleClick={() => toggleCellSymbol(setOperatorGrid, pt.id, d, 'Shift A')}
                        >
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, 'Shift A', e.target.value)}
                            className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px] font-black"
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })()}

              {/* Operator Signatures Rows (Screenshot 1) */}
              <tr className="h-6 bg-white">
                <td colSpan={8} className="border border-slate-900 px-3 text-right font-bold text-[9.5px] text-slate-900">
                  Filled By (M/C Operator Sign) (A Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                </td>
                {DAYS_31.map((d) => (
                  <td key={d} className="border border-slate-900 p-0 text-center">
                    <input
                      type="text"
                      value={opSigns.opA[d] || ''}
                      onChange={(e) => handleSignChange(setOpSigns, 'opA', d, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[8px] font-bold text-slate-800"
                    />
                  </td>
                ))}
              </tr>
              <tr className="h-6 bg-white">
                <td colSpan={8} className="border border-slate-900 px-3 text-right font-bold text-[9.5px] text-slate-900">
                  Filled By (M/C Operator Sign) (B Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                </td>
                {DAYS_31.map((d) => (
                  <td key={d} className="border border-slate-900 p-0 text-center">
                    <input
                      type="text"
                      value={opSigns.opB[d] || ''}
                      onChange={(e) => handleSignChange(setOpSigns, 'opB', d, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[8px] font-bold text-slate-800"
                    />
                  </td>
                ))}
              </tr>
              <tr className="h-6 bg-white">
                <td colSpan={8} className="border border-slate-900 px-3 text-right font-bold text-[9.5px] text-slate-900">
                  Filled By (M/C Operator Sign) (C Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                </td>
                {DAYS_31.map((d) => (
                  <td key={d} className="border border-slate-900 p-0 text-center">
                    <input
                      type="text"
                      value={opSigns.opC[d] || ''}
                      onChange={(e) => handleSignChange(setOpSigns, 'opC', d, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[8px] font-bold text-slate-800"
                    />
                  </td>
                ))}
              </tr>
              <tr className="h-6 bg-slate-50">
                <td colSpan={8} className="border border-slate-900 px-3 text-right font-black text-[9.5px] text-slate-900">
                  Supervisor Production (Sign)
                </td>
                {DAYS_31.map((d) => (
                  <td key={d} className="border border-slate-900 p-0 text-center">
                    <input
                      type="text"
                      value={opSigns.supProd[d] || ''}
                      onChange={(e) => handleSignChange(setOpSigns, 'supProd', d, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[8px] font-black text-slate-900"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: RELATED WITH M/C MAINTENANCE */}
        {/* ========================================================= */}
        <div className="w-full bg-[#d0d0d0] border-b-2 border-slate-900 px-3 py-1 text-xs font-black text-slate-900 italic">
          Related with m/c Maintenance
        </div>

        <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[1550px]" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '230px' }} />
              <col style={{ width: '90px' }} />
              <col style={{ width: '170px' }} />
              <col style={{ width: '95px' }} />
              <col style={{ width: '26px' }} />
              <col style={{ width: '26px' }} />
              <col style={{ width: '26px' }} />
              <col style={{ width: '32px' }} />
              {DAYS_31.map((d) => (
                <col key={d} style={{ width: '30px' }} />
              ))}
            </colgroup>

            <tbody>
              {/* Maintenance Points 1 to 5 (Shifts A, B, C) */}
              {RW_MAINT_POINTS.map((pt) => (
                <React.Fragment key={pt.id}>
                  {pt.shifts.map((shift, sIdx) => (
                    <tr key={shift} className="h-6 hover:bg-slate-50/60">
                      {sIdx === 0 && (
                        <>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-1.5 text-left font-bold align-middle leading-tight">
                            <div className="text-[10px] text-slate-950 font-bold">{pt.point}</div>
                            {pt.hindi && <div className="text-[9px] text-slate-700 font-normal mt-0.5">{pt.hindi}</div>}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle">
                            {pt.resp}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle whitespace-pre-line leading-tight">
                            {pt.stdValue}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-1 text-center font-bold text-[9.5px] align-middle">
                            {pt.method}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-0.5 text-center font-black text-[10px] align-middle">
                            {pt.freqD}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-0.5 text-center font-black text-[10px] align-middle">
                            {pt.freqW}
                          </td>
                          <td rowSpan={pt.shifts.length} className="border border-slate-900 p-0.5 text-center font-black text-[10px] align-middle">
                            {pt.freqS}
                          </td>
                        </>
                      )}
                      {/* Shift Column */}
                      <td className="border border-slate-900 p-0.5 text-center font-black text-[9.5px] bg-slate-50 text-slate-900">
                        {shift}
                      </td>
                      {/* 31 Days Status Cells */}
                      {DAYS_31.map((d) => {
                        const val = maintGrid[pt.id]?.[d]?.[shift] || '';
                        return (
                          <td
                            key={d}
                            className="border border-slate-900 p-0 text-center relative cursor-pointer select-none bg-white hover:bg-emerald-50/50"
                            onDoubleClick={() => toggleCellSymbol(setMaintGrid, pt.id, d, shift)}
                            title={`Double click to toggle ✓ / X, or type`}
                          >
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => handleCellChange(setMaintGrid, pt.id, d, shift, e.target.value)}
                              className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px] font-black"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Maintenance Signatures Rows (Screenshot 2) */}
              <tr className="h-6 bg-white">
                <td colSpan={8} className="border border-slate-900 px-3 text-right font-bold text-[9.5px] text-slate-900">
                  Checked &amp; Corrected By (Maint. Technician Sign) (A Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                </td>
                {DAYS_31.map((d) => (
                  <td key={d} className="border border-slate-900 p-0 text-center">
                    <input
                      type="text"
                      value={mtSigns.mtA[d] || ''}
                      onChange={(e) => handleSignChange(setMtSigns, 'mtA', d, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[8px] font-bold text-slate-800"
                    />
                  </td>
                ))}
              </tr>
              <tr className="h-6 bg-white">
                <td colSpan={8} className="border border-slate-900 px-3 text-right font-bold text-[9.5px] text-slate-900">
                  Checked &amp; Corrected By (Maint. Technician Sign) (B Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                </td>
                {DAYS_31.map((d) => (
                  <td key={d} className="border border-slate-900 p-0 text-center">
                    <input
                      type="text"
                      value={mtSigns.mtB[d] || ''}
                      onChange={(e) => handleSignChange(setMtSigns, 'mtB', d, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[8px] font-bold text-slate-800"
                    />
                  </td>
                ))}
              </tr>
              <tr className="h-6 bg-white">
                <td colSpan={8} className="border border-slate-900 px-3 text-right font-bold text-[9.5px] text-slate-900">
                  Checked &amp; Corrected By (Maint. Technician Sign) (C Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                </td>
                {DAYS_31.map((d) => (
                  <td key={d} className="border border-slate-900 p-0 text-center">
                    <input
                      type="text"
                      value={mtSigns.mtC[d] || ''}
                      onChange={(e) => handleSignChange(setMtSigns, 'mtC', d, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[8px] font-bold text-slate-800"
                    />
                  </td>
                ))}
              </tr>
              <tr className="h-6 bg-slate-50">
                <td colSpan={8} className="border border-slate-900 px-3 text-right font-black text-[9.5px] text-slate-900">
                  Supervisor - Maintenance (Sign)
                </td>
                {DAYS_31.map((d) => (
                  <td key={d} className="border border-slate-900 p-0 text-center">
                    <input
                      type="text"
                      value={mtSigns.supMaint[d] || ''}
                      onChange={(e) => handleSignChange(setMtSigns, 'supMaint', d, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[8px] font-black text-slate-900"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: NOTES & LEGENDS (Exact match to Screenshot 3) */}
        {/* ========================================================= */}
        <div className="p-2.5 bg-white border-b-2 border-slate-900 text-[10px] text-slate-900 leading-relaxed font-sans">
          <div className="font-bold">* Checking Frequency of Daily/ Shift : Shift Start</div>
          <div className="font-bold">* Checking Frequency of Weekly : First day of week</div>
          <div className="mt-1 font-black uppercase text-[10px] tracking-wide">[LEGENDS]</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0.5 mt-0.5 font-bold text-[9.5px]">
            <div>1. PUT (✓) FOR OK CONDITION.</div>
            <div>2. PUT (X) FOR NOT OK CONDITION.</div>
            <div>3. PUT VALUE WHERE VALUE IS MENTION.</div>
            <div>4. TAKE NECESSARY ACTION AND ENCIRCLE ON THE CROSS MARK ( ⮾ ) AND FILL THE COUNTERACTION SHEET.</div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: ABNORMALITY OBSERVATION & ACTION SHEET (Screenshot 3) */}
        {/* ========================================================= */}
        <div className="w-full bg-white pt-2">
          {/* Blue Border Section Title matching screenshot */}
          <div className="w-full border-2 border-blue-600 bg-white py-1 px-4 text-center mb-1">
            <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 m-0">
              Abnormality Observation &amp; Action Sheet
            </h2>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-[10px]" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '70px' }} />
                <col style={{ width: '45px' }} />
                <col style={{ width: '60px' }} />
                <col style={{ width: '100px' }} />
                <col style={{ width: '160px' }} />
                <col style={{ width: '140px' }} />
                <col style={{ width: '60px' }} />
                <col style={{ width: '85px' }} />
                <col style={{ width: '65px' }} />
                <col style={{ width: '120px' }} />
                <col style={{ width: '90px' }} />
                <col style={{ width: '90px' }} />
                <col style={{ width: '30px' }} className="print:hidden" />
              </colgroup>

              <thead>
                <tr className="bg-slate-100 text-slate-900 font-black h-8 text-center text-[10px]">
                  <th className="border border-slate-900 p-1">Date</th>
                  <th className="border border-slate-900 p-1">Shift</th>
                  <th className="border border-slate-900 p-1">Area</th>
                  <th className="border border-slate-900 p-1">Specific Area</th>
                  <th className="border border-slate-900 p-1">Abnormailaity</th>
                  <th className="border border-slate-900 p-1">Immediate Action Req.</th>
                  <th className="border border-slate-900 p-1">Resp.</th>
                  <th className="border border-slate-900 p-1">Target Date /Time</th>
                  <th className="border border-slate-900 p-1">Status</th>
                  <th className="border border-slate-900 p-1">Operator Feedback</th>
                  <th className="border border-slate-900 p-1">Maint. Supervisor</th>
                  <th className="border border-slate-900 p-1">Production Supervisor</th>
                  <th className="border border-slate-900 p-1 print:hidden text-[8px]">Act</th>
                </tr>
              </thead>

              <tbody>
                {abnormalities.map((row, rIdx) => (
                  <tr key={row.id} className="h-7 hover:bg-slate-50">
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px] font-semibold"
                        value={row.date}
                        placeholder="DD/MM"
                        onChange={(e) => handleAbnormalChange(rIdx, 'date', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px] font-bold"
                        value={row.shift}
                        placeholder="A/B/C"
                        onChange={(e) => handleAbnormalChange(rIdx, 'shift', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.area}
                        onChange={(e) => handleAbnormalChange(rIdx, 'area', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.specificArea}
                        onChange={(e) => handleAbnormalChange(rIdx, 'specificArea', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 px-1">
                      <input
                        type="text"
                        className="w-full h-full bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.abnormality}
                        onChange={(e) => handleAbnormalChange(rIdx, 'abnormality', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 px-1">
                      <input
                        type="text"
                        className="w-full h-full bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.immediateAction}
                        onChange={(e) => handleAbnormalChange(rIdx, 'immediateAction', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.resp}
                        onChange={(e) => handleAbnormalChange(rIdx, 'resp', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.targetDateTime}
                        onChange={(e) => handleAbnormalChange(rIdx, 'targetDateTime', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px] font-bold"
                        value={row.status}
                        onChange={(e) => handleAbnormalChange(rIdx, 'status', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 px-1">
                      <input
                        type="text"
                        className="w-full h-full bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.feedback}
                        onChange={(e) => handleAbnormalChange(rIdx, 'feedback', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.maintSign}
                        onChange={(e) => handleAbnormalChange(rIdx, 'maintSign', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center">
                      <input
                        type="text"
                        className="w-full h-full text-center bg-transparent border-0 outline-none text-[9.5px]"
                        value={row.prodSign}
                        onChange={(e) => handleAbnormalChange(rIdx, 'prodSign', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center print:hidden bg-slate-50">
                      <button
                        type="button"
                        onClick={() => handleDeleteAbnormalityRow(row.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        title="Delete row"
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end p-2 print:hidden">
            <button
              type="button"
              onClick={handleAddAbnormalityRow}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 py-1.5 px-3 rounded-lg cursor-pointer transition-colors shadow-2xs"
            >
              <Plus size={13} />
              <span>Add Abnormality Row</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}