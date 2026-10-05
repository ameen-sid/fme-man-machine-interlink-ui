import React, { useState } from 'react';
import {
  Gauge,
  Save,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';

// Instrument 1: Plunger Micrometer (7 points)
const INITIAL_PLUNGER_POINTS = [
  { id: 1, checkPoint: 'ANVIL TIP CONDITION', frequency: 'DAILY' },
  { id: 2, checkPoint: 'ANIVIL TIGHTNESS', frequency: 'DAILY' },
  { id: 3, checkPoint: 'SPINDLE CONDITION', frequency: 'DAILY' },
  { id: 4, checkPoint: 'DISPLAY CONDITION', frequency: 'DAILY' },
  { id: 5, checkPoint: 'SWITCH CONDITION', frequency: 'DAILY' },
  { id: 6, checkPoint: 'PUSH BUTTON\nCONDITION', frequency: 'DAILY' },
  { id: 7, checkPoint: 'CALIBRATION\nVALIDITY', frequency: 'DAILY' }
];

// Instrument 2: Blade Micrometer (6 points)
const INITIAL_BLADE_POINTS = [
  { id: 1, checkPoint: 'ANVIL BLADE CONDITION', frequency: 'DAILY' },
  { id: 2, checkPoint: 'SPINDLE CONDITION', frequency: 'DAILY' },
  { id: 3, checkPoint: 'DISPLAY CONDITION', frequency: 'DAILY' },
  { id: 4, checkPoint: 'SWITCH CONDITION', frequency: 'DAILY' },
  { id: 5, checkPoint: 'RACHET CONDITION', frequency: 'DAILY' },
  { id: 6, checkPoint: 'CALIBRATION\nVALIDITY', frequency: 'DAILY' }
];

// Instrument 3: Measuring Scale (2 points)
const INITIAL_SCALE_POINTS = [
  { id: 1, checkPoint: 'VISUAL CONDITION', frequency: 'DAILY' },
  { id: 2, checkPoint: 'CALIBRATION\nVALIDITY', frequency: 'DAILY' }
];

// 31 days with Shifts A, B, C per day
const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

function createInitialGrid(pointCount) {
  const grid = {};
  for (let p = 1; p <= pointCount; p++) {
    grid[p] = {};
    for (let d = 1; d <= 31; d++) {
      grid[p][d] = {
        A: '',
        B: '',
        C: ''
      };
    }
  }
  return grid;
}

function createSignGrid() {
  const grid = {};
  for (let d = 1; d <= 31; d++) {
    grid[d] = {
      A: '',
      B: '',
      C: ''
    };
  }
  return grid;
}

export default function InstrumentChecksheet({ machine, onClose }) {
  // Common metadata
  const [docInfo, setDocInfo] = useState({
    docNo: 'FRM-WH-QA-046',
    revNo: '04',
    revDate: '',
    issueDate: '',
    page: 'Page 1 of 1',
    month: '',
    location: machine?.name || ''
  });

  // Section 1: Plunger Micrometer state
  const [plungerMeta, setPlungerMeta] = useState({
    instrumentNo: '',
    instrumentName: 'Plunger Micrometer'
  });
  const [plungerGrid, setPlungerGrid] = useState(() => createInitialGrid(7));
  const [plungerCheckedGrid, setPlungerCheckedGrid] = useState(createSignGrid);
  const [plungerConfirmedGrid, setPlungerConfirmedGrid] = useState(createSignGrid);
  const [plungerWeekly, setPlungerWeekly] = useState([
    { point: 'ANVIL CONDITION', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ZERO SETTING', w1: '', w2: '', w3: '', w4: '' },
    { point: 'CALIBRATION (Gauge)', w1: '', w2: '', w3: '', w4: '' },
    { point: 'CALIBRATION (Actual)', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ANY OTHER', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ENGG. SIGN.', w1: '', w2: '', w3: '', w4: '' }
  ]);

  // Section 2: Blade Micrometer state
  const [bladeMeta, setBladeMeta] = useState({
    instrumentNo: '',
    instrumentName: 'Blade Micrometer'
  });
  const [bladeGrid, setBladeGrid] = useState(() => createInitialGrid(6));
  const [bladeCheckedGrid, setBladeCheckedGrid] = useState(createSignGrid);
  const [bladeConfirmedGrid, setBladeConfirmedGrid] = useState(createSignGrid);
  const [bladeWeekly, setBladeWeekly] = useState([
    { point: 'ANVIL CONDITION', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ZERO SETTING', w1: '', w2: '', w3: '', w4: '' },
    { point: 'CALIBRATION (Gauge)', w1: '', w2: '', w3: '', w4: '' },
    { point: 'CALIBRATION (Actual)', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ANY OTHER', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ENGG. SIGN.', w1: '', w2: '', w3: '', w4: '' }
  ]);

  // Section 3: Measuring Scale state
  const [scaleMeta, setScaleMeta] = useState({
    instrumentNo: '',
    instrumentName: 'Measuring Scale'
  });
  const [scaleGrid, setScaleGrid] = useState(() => createInitialGrid(2));
  const [scaleCheckedGrid, setScaleCheckedGrid] = useState(createSignGrid);
  const [scaleConfirmedGrid, setScaleConfirmedGrid] = useState(createSignGrid);

  const [savedToast, setSavedToast] = useState('');

  const handleCellChange = (setGridFn, pointId, day, shift, value) => {
    setGridFn(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[pointId]) copy[pointId] = {};
      if (!copy[pointId][day]) copy[pointId][day] = {};
      copy[pointId][day][shift] = value;
      return copy;
    });
  };

  const handleSignCellChange = (setGridFn, day, shift, value) => {
    setGridFn(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[day]) copy[day] = {};
      copy[day][shift] = value;
      return copy;
    });
  };

  const handleWeeklyChange = (setWeeklyFn, idx, field, val) => {
    setWeeklyFn(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleSave = () => {
    setSavedToast('Instrument Check Sheet successfully saved to QA Records!');
    setTimeout(() => setSavedToast(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this Instrument Check Sheet to initial defaults?')) {
      setPlungerGrid(createInitialGrid(7));
      setBladeGrid(createInitialGrid(6));
      setScaleGrid(createInitialGrid(2));
      setPlungerCheckedGrid(createSignGrid());
      setPlungerConfirmedGrid(createSignGrid());
      setBladeCheckedGrid(createSignGrid());
      setBladeConfirmedGrid(createSignGrid());
      setScaleCheckedGrid(createSignGrid());
      setScaleConfirmedGrid(createSignGrid());
      setPlungerWeekly([
        { point: 'ANVIL CONDITION', w1: '', w2: '', w3: '', w4: '' },
        { point: 'ZERO SETTING', w1: '', w2: '', w3: '', w4: '' },
        { point: 'CALIBRATION (Gauge)', w1: '', w2: '', w3: '', w4: '' },
        { point: 'CALIBRATION (Actual)', w1: '', w2: '', w3: '', w4: '' },
        { point: 'ANY OTHER', w1: '', w2: '', w3: '', w4: '' },
        { point: 'ENGG. SIGN.', w1: '', w2: '', w3: '', w4: '' }
      ]);
      setBladeWeekly([
        { point: 'ANVIL CONDITION', w1: '', w2: '', w3: '', w4: '' },
        { point: 'ZERO SETTING', w1: '', w2: '', w3: '', w4: '' },
        { point: 'CALIBRATION (Gauge)', w1: '', w2: '', w3: '', w4: '' },
        { point: 'CALIBRATION (Actual)', w1: '', w2: '', w3: '', w4: '' },
        { point: 'ANY OTHER', w1: '', w2: '', w3: '', w4: '' },
        { point: 'ENGG. SIGN.', w1: '', w2: '', w3: '', w4: '' }
      ]);
    }
  };

  const getCellBgClass = (val) => {
    const v = (val || '').trim().toLowerCase();
    if (v === 'ok' || v === '√') return 'bg-emerald-100 text-emerald-700 font-bold';
    if (v === 'ng' || v === 'x') return 'bg-rose-100 text-rose-700 font-bold';
    return 'text-slate-800 font-bold';
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-50 transition-all duration-200">
      {/* Floating Action Control Bar */}
      <div className="flex flex-wrap items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm gap-3">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-all shadow-sm"
              onClick={onClose}
              title="Back to Checksheets Menu"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          )}
          <Gauge size={18} className="text-orange-600 bg-orange-50 p-2 rounded-lg w-9 h-9 box-content shrink-0" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">
              FURUKAWA MINDA ELECTRIC PVT. LTD. — INSTRUMENT CHECK SHEET
            </h3>
            <span className="text-[11.5px] text-slate-500 font-medium">
              Format: <strong>{docInfo.docNo}</strong> • Rev: <strong>{docInfo.revNo}</strong> • Assigned: <strong>{machine?.name || 'Machine'}</strong> ({docInfo.location})
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            onClick={handleSave}
          >
            <Save size={15} />
            <span>Save Record</span>
          </button>
          <button
            className="inline-flex items-center gap-1.5 p-2 rounded-lg text-xs font-bold cursor-pointer transition-all bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600"
            onClick={handleReset}
            title="Reset values"
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

      {/* Main Sheet Card */}
      <div className="bg-white border-[1.5px] border-slate-900 shadow-md rounded overflow-hidden flex flex-col gap-5 pb-2">
        {/* ========================================================= */}
        {/* SECTION 1: Plunger Micrometer */}
        {/* ========================================================= */}
        <div className="flex flex-col mx-2 mb-3.5 border-[1.5px] border-slate-900 bg-white">
          {/* Company Header - Top Right (Above Sheet Box as in Excel Standard) */}
          <div className="flex justify-end px-3 pt-2 pb-0.5 bg-white">
            <span className="text-[11px] font-black tracking-wider text-slate-900 uppercase">
              FURUKAWA MINDA ELECTRIC PVT. LTD.
            </span>
          </div>

          {/* Top Header Box (Exact Replica of Provided Screenshot) */}
          <div className="border-t-[2px] border-b-[2px] border-slate-900">
            {/* Row 1: INSTRUMENT CHECK SHEET Title */}
            <div className="flex items-center justify-center py-2 px-6 sm:pr-24 border-b border-slate-900 bg-white">
              <h1 className="text-xl sm:text-1xl font-black tracking-wide text-slate-900 uppercase m-0">
                INSTRUMENT CHECK SHEET
              </h1>
            </div>

            {/* Row 2: Metadata Bar */}
            <div className="flex bg-white text-xs">
              {/* INSTRUMENT NO. */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-900 flex-[1.2]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">INSTRUMENT NO.:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={plungerMeta.instrumentNo}
                  onChange={(e) => setPlungerMeta({ ...plungerMeta, instrumentNo: e.target.value })}
                />
              </div>

              {/* INSTRUMENT NAME label */}
              <div className="flex items-center px-3 py-1.5 border-r border-slate-900 whitespace-nowrap">
                <span className="font-black text-slate-900 text-[11px]">INSTRUMENT NAME:</span>
              </div>

              {/* INSTRUMENT NAME value */}
              <div className="flex items-center px-3 py-1.5 border-r border-slate-900 flex-[1.5]">
                <span className="text-xs font-normal text-slate-900 whitespace-nowrap">Plunger Micrometer</span>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-900 flex-[1.2]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">LOCATION:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={docInfo.location}
                  onChange={(e) => setDocInfo({ ...docInfo, location: e.target.value })}
                />
              </div>

              {/* MONTH */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 flex-[1]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">MONTH:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={docInfo.month}
                  onChange={(e) => setDocInfo({ ...docInfo, month: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Grid Table */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
            <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[11px] text-center" rowSpan={3} style={{ width: '220px', minWidth: '220px' }}>CHECK POINT</th>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '95px', minWidth: '95px' }}>FREQUENCY</th>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-xs text-center tracking-widest" colSpan={93}>DATE</th>
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <th key={d} colSpan={3} className="border border-slate-900 bg-white text-[10px] font-black text-slate-900 text-center p-0.5">{d}</th>
                  ))}
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">A</th>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">B</th>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">C</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_PLUNGER_POINTS.map((pt) => (
                  <tr key={pt.id} className="h-6">
                    <td className="border border-slate-900 p-1 pl-2 text-left font-bold text-slate-900 text-[10.5px] whitespace-pre-line leading-tight">{pt.checkPoint}</td>
                    <td className="border border-slate-900 p-1 font-bold text-[10px] text-slate-900 bg-white text-center">{pt.frequency}</td>
                    {DAYS_31.map(d => (
                      <React.Fragment key={d}>
                        {SHIFTS.map(s => {
                          const val = plungerGrid[pt.id]?.[d]?.[s] || '';
                          return (
                            <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                              <input
                                className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none cursor-pointer focus:bg-blue-100 ${getCellBgClass(val)}`}
                                value={val}
                                onChange={(e) => handleCellChange(setPlungerGrid, pt.id, d, s, e.target.value.toUpperCase())}
                              />
                            </td>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
                {/* Checked By Row */}
                <tr className="h-6 bg-white">
                  <td className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]">Checked By:-</td>
                  <td className="border border-slate-900 p-1 font-bold text-center text-slate-900 text-[10.5px]">INSP.</td>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      {SHIFTS.map(s => {
                        const val = plungerCheckedGrid[d]?.[s] || '';
                        return (
                          <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                            <input
                              className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                              value={val}
                              onChange={(e) => handleSignCellChange(setPlungerCheckedGrid, d, s, e.target.value)}
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
                {/* Confirmed By Row */}
                <tr className="h-6 bg-white">
                  <td className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]">Confirmed By;-</td>
                  <td className="border border-slate-900 p-1 font-bold text-center text-slate-900 text-[10.5px]">LEADER</td>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      {SHIFTS.map(s => {
                        const val = plungerConfirmedGrid[d]?.[s] || '';
                        return (
                          <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                            <input
                              className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                              value={val}
                              onChange={(e) => handleSignCellChange(setPlungerConfirmedGrid, d, s, e.target.value)}
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

          {/* Plunger Callout & Diagram Row */}
          <div className="flex items-start justify-between p-3 px-4 bg-white gap-5 flex-wrap">
            {/* Remarks block */}
            <div className="flex-1 min-w-[250px] bg-slate-50 border border-dashed border-slate-300 rounded p-2.5 px-3.5">
              <span className="font-extrabold text-xs text-slate-900 block mb-1">Remarks:-</span>
              <ul className="text-[11px] text-slate-700 m-0 pl-3.5 leading-relaxed list-disc">
                <li>*Check Zero Setting Properly Before Using The Instrument.</li>
                <li>*In Case of any doubt, ask to QA.</li>
                <li>*If any problem then inform to QA.</li>
              </ul>
            </div>

            {/* Mitutoyo Plunger Micrometer Diagram Mock with Numbers 1 to 7 */}
            <div className="flex flex-col items-center relative border-[1.5px] border-slate-900 rounded bg-white p-2 px-3 shadow-sm">
              <div className="relative w-80 h-36 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 shadow-inner">
                {/* Numbered Callout Badges */}
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 top-5 left-4" title="1: Anvil Tip">1</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 top-11 left-20" title="2: Anvil Tightness">2</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 bottom-3 right-10" title="3: Spindle">3</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 top-12 right-4" title="4: Display">4</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 bottom-3 left-7" title="5: Switch">5</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 top-2.5 right-20" title="6: Push Button">6</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 bottom-9 right-2.5" title="7: Calibration Tag">7</span>

                <div className="relative w-60 h-[90px] bg-sky-600 border-[3px] border-sky-400 rounded-2xl flex flex-col items-center justify-center shadow-lg">
                  <div className="bg-lime-100 border-2 border-lime-600 text-emerald-950 font-mono text-xl font-black px-3.5 py-1 rounded tracking-widest shadow-inner">0.000</div>
                  <span className="text-[10px] font-extrabold text-white mt-1 tracking-wider">Mitutoyo ABSOLUTE</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-bold mt-1.5">
                Plunger Micrometer Component Identification Guide (1 ~ 7)
              </span>
            </div>

            {/* Weekly Verification Table */}
            <div className="min-w-[340px] border-2 border-slate-900 bg-white">
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
                    <th colSpan={2} className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '130px' }}>
                      POINTS
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '50px' }}>
                      WEEK-1
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '50px' }}>
                      WEEK-2
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '50px' }}>
                      WEEK-3
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '50px' }}>
                      WEEK-4
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: ANVIL CONDITION */}
                  <tr>
                    <td colSpan={2} className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle">
                      ANVIL CONDITION
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={plungerWeekly[0]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, 0, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: ZERO SETTING */}
                  <tr>
                    <td colSpan={2} className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle">
                      ZERO SETTING
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={plungerWeekly[1]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, 1, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 3 & 4: CALIBRATION -> Gauge & Actual */}
                  <tr>
                    <td
                      rowSpan={2}
                      className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-900 align-middle leading-tight w-[65px]"
                    >
                      CALI<br />BRATION
                    </td>
                    <td className="border border-slate-900 p-1 text-center text-[10px] font-bold text-slate-900 align-middle w-[65px]">
                      Gauge
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={plungerWeekly[2]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, 2, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-900 p-1 text-center text-[10px] font-bold text-slate-900 align-middle w-[65px]">
                      Actual
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={plungerWeekly[3]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, 3, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: ANY OTHER */}
                  <tr>
                    <td colSpan={2} className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle">
                      ANY OTHER
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={plungerWeekly[4]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, 4, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 6: ENGG. SIGN. */}
                  <tr>
                    <td colSpan={2} className="border border-slate-900 p-1.5 text-center text-[10px] font-black text-slate-900 align-middle">
                      ENGG. SIGN.
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={plungerWeekly[5]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, 5, wKey, e.target.value)}
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
        {/* SECTION 2: Blade Micrometer */}
        {/* ========================================================= */}
        <div className="flex flex-col mx-2 mb-3.5 border-[1.5px] border-slate-900 bg-white">
          {/* Top Header Box for Blade Micrometer */}
          <div className="border-b-[2px] border-slate-900">
            {/* Title Row */}
            <div className="flex items-center justify-center py-2 px-6 sm:pr-24 border-b border-slate-900 bg-white">
              <h1 className="text-xl sm:text-1xl font-black tracking-wide text-slate-900 uppercase m-0">
                INSTRUMENT CHECK SHEET
              </h1>
            </div>

            {/* Metadata Bar */}
            <div className="flex bg-white text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-900 flex-[1.2]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">INSTRUMENT NO.:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={bladeMeta.instrumentNo}
                  onChange={(e) => setBladeMeta({ ...bladeMeta, instrumentNo: e.target.value })}
                />
              </div>

              <div className="flex items-center px-3 py-1.5 border-r border-slate-900 whitespace-nowrap">
                <span className="font-black text-slate-900 text-[11px]">INSTRUMENT NAME:</span>
              </div>

              <div className="flex items-center px-3 py-1.5 border-r border-slate-900 flex-[1.5]">
                <span className="text-xs font-normal text-slate-900 whitespace-nowrap">Blade Micrometer</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-900 flex-[1.2]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">LOCATION:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={docInfo.location}
                  onChange={(e) => setDocInfo({ ...docInfo, location: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 flex-[1]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">MONTH:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={docInfo.month}
                  onChange={(e) => setDocInfo({ ...docInfo, month: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Grid Table */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
            <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[11px] text-center" rowSpan={3} style={{ width: '220px', minWidth: '220px' }}>CHECK POINT</th>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '95px', minWidth: '95px' }}>FREQUENCY</th>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-xs text-center tracking-widest" colSpan={93}>DATE</th>
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <th key={d} colSpan={3} className="border border-slate-900 bg-white text-[10px] font-black text-slate-900 text-center p-0.5">{d}</th>
                  ))}
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">A</th>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">B</th>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">C</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_BLADE_POINTS.map((pt) => (
                  <tr key={pt.id} className="h-6">
                    <td className="border border-slate-900 p-1 pl-2 text-left font-bold text-slate-900 text-[10.5px] whitespace-pre-line leading-tight">{pt.checkPoint}</td>
                    <td className="border border-slate-900 p-1 font-bold text-[10px] text-slate-900 bg-white text-center">{pt.frequency}</td>
                    {DAYS_31.map(d => (
                      <React.Fragment key={d}>
                        {SHIFTS.map(s => {
                          const val = bladeGrid[pt.id]?.[d]?.[s] || '';
                          return (
                            <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                              <input
                                className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none cursor-pointer focus:bg-blue-100 ${getCellBgClass(val)}`}
                                value={val}
                                onChange={(e) => handleCellChange(setBladeGrid, pt.id, d, s, e.target.value.toUpperCase())}
                              />
                            </td>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
                {/* Checked By Row */}
                <tr className="h-6 bg-white">
                  <td className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]">Checked By:-</td>
                  <td className="border border-slate-900 p-1 font-bold text-center text-slate-900 text-[10.5px]">INSP.</td>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      {SHIFTS.map(s => {
                        const val = bladeCheckedGrid[d]?.[s] || '';
                        return (
                          <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                            <input
                              className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                              value={val}
                              onChange={(e) => handleSignCellChange(setBladeCheckedGrid, d, s, e.target.value)}
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
                {/* Confirmed By Row */}
                <tr className="h-6 bg-white">
                  <td className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]">Confirmed By;-</td>
                  <td className="border border-slate-900 p-1 font-bold text-center text-slate-900 text-[10.5px]">LEADER</td>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      {SHIFTS.map(s => {
                        const val = bladeConfirmedGrid[d]?.[s] || '';
                        return (
                          <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                            <input
                              className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                              value={val}
                              onChange={(e) => handleSignCellChange(setBladeConfirmedGrid, d, s, e.target.value)}
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

          {/* Blade Micrometer Callout & Weekly Verification */}
          <div className="flex items-start justify-between p-3 px-4 bg-white gap-5 flex-wrap">
            {/* Remarks block */}
            <div className="flex-1 min-w-[250px] bg-slate-50 border border-dashed border-slate-300 rounded p-2.5 px-3.5">
              <span className="font-extrabold text-xs text-slate-900 block mb-1">Remarks:-</span>
              <ul className="text-[11px] text-slate-700 m-0 pl-3.5 leading-relaxed list-disc">
                <li>*Check zero setting Properly before using the Instrument.</li>
                <li>*In Case of any doubt, ask to QA.</li>
                <li>*If any problem then inform to QA.</li>
              </ul>
            </div>

            {/* Mitutoyo Blade Micrometer Diagram Mock with Numbers 1 to 6 */}
            <div className="flex flex-col items-center relative border-[1.5px] border-slate-900 rounded bg-white p-2 px-3 shadow-sm">
              <div className="relative w-80 h-36 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 shadow-inner">
                {/* Numbered Callout Badges */}
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 top-5 left-4" title="1: Anvil Blade">1</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 top-11 left-20" title="2: Spindle">2</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 top-12 right-4" title="3: Display">3</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 bottom-3 left-7" title="4: Switch">4</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 bottom-3 right-10" title="5: Rachet">5</span>
                <span className="absolute w-[22px] h-[22px] rounded-full bg-white border-[1.5px] border-slate-900 text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow z-10 top-2.5 right-20" title="6: Calibration Validity">6</span>

                <div className="relative w-60 h-[90px] bg-slate-700 border-[3px] border-slate-500 rounded-2xl flex flex-col items-center justify-center shadow-lg">
                  <div className="bg-lime-100 border-2 border-lime-600 text-emerald-950 font-mono text-xl font-black px-3.5 py-1 rounded tracking-widest shadow-inner">0.000</div>
                  <span className="text-[10px] font-extrabold text-white mt-1 tracking-wider">0-25mm 0.001mm Mitutoyo</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-bold mt-1.5">
                Blade Micrometer Component Identification Guide (1 ~ 6)
              </span>
            </div>

            {/* Weekly Verification Table */}
            <div className="min-w-[340px] border-2 border-slate-900 bg-white">
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
                    <th colSpan={2} className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '130px' }}>
                      POINTS
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '50px' }}>
                      WEEK-1
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '50px' }}>
                      WEEK-2
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '50px' }}>
                      WEEK-3
                    </th>
                    <th className="border border-slate-900 p-1 text-[10px] font-bold text-center bg-white text-slate-900" style={{ width: '50px' }}>
                      WEEK-4
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: ANVIL CONDITION */}
                  <tr>
                    <td colSpan={2} className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle">
                      ANVIL CONDITION
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={bladeWeekly[0]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, 0, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: ZERO SETTING */}
                  <tr>
                    <td colSpan={2} className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle">
                      ZERO SETTING
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={bladeWeekly[1]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, 1, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 3 & 4: CALIBRATION -> Gauge & Actual */}
                  <tr>
                    <td
                      rowSpan={2}
                      className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-900 align-middle leading-tight w-[65px]"
                    >
                      CALI<br />BRATION
                    </td>
                    <td className="border border-slate-900 p-1 text-center text-[10px] font-bold text-slate-900 align-middle w-[65px]">
                      Gauge
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={bladeWeekly[2]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, 2, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-900 p-1 text-center text-[10px] font-bold text-slate-900 align-middle w-[65px]">
                      Actual
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={bladeWeekly[3]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, 3, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: ANY OTHER */}
                  <tr>
                    <td colSpan={2} className="border border-slate-900 p-1.5 text-center text-[10px] font-bold text-slate-900 align-middle">
                      ANY OTHER
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={bladeWeekly[4]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, 4, wKey, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Row 6: ENGG. SIGN. */}
                  <tr>
                    <td colSpan={2} className="border border-slate-900 p-1.5 text-center text-[10px] font-black text-slate-900 align-middle">
                      ENGG. SIGN.
                    </td>
                    {['w1', 'w2', 'w3', 'w4'].map((wKey) => (
                      <td key={wKey} className="border border-slate-900 p-0 text-center align-middle">
                        <input
                          className="w-full h-6 border-none bg-transparent text-[10px] font-bold text-center outline-none focus:bg-blue-50"
                          value={bladeWeekly[5]?.[wKey] || ''}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, 5, wKey, e.target.value)}
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
        {/* SECTION 3: Measuring Scale */}
        {/* ========================================================= */}
        <div className="flex flex-col mx-2 mb-3.5 border-[1.5px] border-slate-900 bg-white">
          {/* Top Header Box for Measuring Scale */}
          <div className="border-b-[2px] border-slate-900">
            {/* Title Row */}
            <div className="flex items-center justify-center py-2 px-6 sm:pr-24 border-b border-slate-900 bg-white">
              <h1 className="text-xl sm:text-1xl font-black tracking-wide text-slate-900 uppercase m-0">
                INSTRUMENT CHECK SHEET
              </h1>
            </div>

            {/* Metadata Bar */}
            <div className="flex bg-white text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-900 flex-[1.2]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">INSTRUMENT NO.:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={scaleMeta.instrumentNo}
                  onChange={(e) => setScaleMeta({ ...scaleMeta, instrumentNo: e.target.value })}
                />
              </div>

              <div className="flex items-center px-3 py-1.5 border-r border-slate-900 whitespace-nowrap">
                <span className="font-black text-slate-900 text-[11px]">INSTRUMENT NAME:</span>
              </div>

              <div className="flex items-center px-3 py-1.5 border-r border-slate-900 flex-[1.5]">
                <span className="text-xs font-normal text-slate-900 whitespace-nowrap">Measuring Scale</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-900 flex-[1.2]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">LOCATION:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={docInfo.location}
                  onChange={(e) => setDocInfo({ ...docInfo, location: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 flex-[1]">
                <span className="font-black text-slate-900 whitespace-nowrap text-[11px]">MONTH:</span>
                <input
                  className="border-none bg-transparent text-xs font-bold text-slate-900 outline-none w-full"
                  value={docInfo.month}
                  onChange={(e) => setDocInfo({ ...docInfo, month: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Grid Table */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
            <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[11px] text-center" rowSpan={3} style={{ width: '220px', minWidth: '220px' }}>CHECK POINT</th>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '95px', minWidth: '95px' }}>FREQUENCY</th>
                  <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-xs text-center tracking-widest" colSpan={93}>DATE</th>
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <th key={d} colSpan={3} className="border border-slate-900 bg-white text-[10px] font-black text-slate-900 text-center p-0.5">{d}</th>
                  ))}
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">A</th>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">B</th>
                      <th className="border border-slate-900 text-[9.5px] font-black w-5 min-w-[20px] bg-white text-center text-slate-900 p-0.5">C</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_SCALE_POINTS.map((pt) => (
                  <tr key={pt.id} className="h-6">
                    <td className="border border-slate-900 p-1 pl-2 text-left font-bold text-slate-900 text-[10.5px] whitespace-pre-line leading-tight">{pt.checkPoint}</td>
                    <td className="border border-slate-900 p-1 font-bold text-[10px] text-slate-900 bg-white text-center">{pt.frequency}</td>
                    {DAYS_31.map(d => (
                      <React.Fragment key={d}>
                        {SHIFTS.map(s => {
                          const val = scaleGrid[pt.id]?.[d]?.[s] || '';
                          return (
                            <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                              <input
                                className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none cursor-pointer focus:bg-blue-100 ${getCellBgClass(val)}`}
                                value={val}
                                onChange={(e) => handleCellChange(setScaleGrid, pt.id, d, s, e.target.value.toUpperCase())}
                              />
                            </td>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
                {/* Checked By Row */}
                <tr className="h-6 bg-white">
                  <td className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]">Checked By:-</td>
                  <td className="border border-slate-900 p-1 font-bold text-center text-slate-900 text-[10.5px]">INSP.</td>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      {SHIFTS.map(s => {
                        const val = scaleCheckedGrid[d]?.[s] || '';
                        return (
                          <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                            <input
                              className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                              value={val}
                              onChange={(e) => handleSignCellChange(setScaleCheckedGrid, d, s, e.target.value)}
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
                {/* Confirmed By Row */}
                <tr className="h-6 bg-white">
                  <td className="border border-slate-900 p-1 text-center font-bold text-slate-900 text-[11px]">Confirmed By;-</td>
                  <td className="border border-slate-900 p-1 font-bold text-center text-slate-900 text-[10.5px]">LEADER</td>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      {SHIFTS.map(s => {
                        const val = scaleConfirmedGrid[d]?.[s] || '';
                        return (
                          <td key={s} className="border border-slate-900 p-0 text-center align-middle w-5 min-w-[20px] h-6 bg-white">
                            <input
                              className="w-full h-full border-none bg-transparent text-center text-[9px] font-bold text-slate-900 outline-none focus:bg-blue-50"
                              value={val}
                              onChange={(e) => handleSignCellChange(setScaleConfirmedGrid, d, s, e.target.value)}
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
        </div>

        {/* Bottom Documentation Metadata Tag */}
        <div className="flex items-center justify-between p-2 px-4 bg-slate-100 border-t border-slate-900 text-[10.5px] font-bold text-slate-600">
          <span>DOC NO: <strong>{docInfo.docNo}</strong></span>
          <span>REV: <strong>{docInfo.revNo}</strong></span>
          <span>REV DATE: <strong>{docInfo.revDate}</strong></span>
          <span>ISSUE DATE: <strong>{docInfo.issueDate}</strong></span>
          <span>{docInfo.page}</span>
          <span>FURUKAWA MINDA ELECTRIC PVT. LTD.</span>
        </div>
      </div>
    </div>
  );
}
