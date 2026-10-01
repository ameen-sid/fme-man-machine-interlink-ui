import React, { useState } from 'react';
import { 
  Gauge, 
  Save, 
  RotateCcw
} from 'lucide-react';

// Instrument 1: Plunger Micrometer (7 points)
const INITIAL_PLUNGER_POINTS = [
  { id: 1, srNo: 1, checkPoint: 'ANVIL TIP CONDITION', frequency: 'DAILY' },
  { id: 2, srNo: 2, checkPoint: 'ANVIL TIGHTNESS', frequency: 'DAILY' },
  { id: 3, srNo: 3, checkPoint: 'SPINDLE CONDITION', frequency: 'DAILY' },
  { id: 4, srNo: 4, checkPoint: 'DISPLAY CONDITION', frequency: 'DAILY' },
  { id: 5, srNo: 5, checkPoint: 'SWITCH CONDITION', frequency: 'DAILY' },
  { id: 6, srNo: 6, checkPoint: 'PUSH BUTTON CONDITION', frequency: 'DAILY' },
  { id: 7, srNo: 7, checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

// Instrument 2: Blade Micrometer (6 points)
const INITIAL_BLADE_POINTS = [
  { id: 1, srNo: 1, checkPoint: 'ANVIL BLADE CONDITION', frequency: 'DAILY' },
  { id: 2, srNo: 2, checkPoint: 'SPINDLE CONDITION', frequency: 'DAILY' },
  { id: 3, srNo: 3, checkPoint: 'DISPLAY CONDITION', frequency: 'DAILY' },
  { id: 4, srNo: 4, checkPoint: 'SWITCH CONDITION', frequency: 'DAILY' },
  { id: 5, srNo: 5, checkPoint: 'RACHET CONDITION', frequency: 'DAILY' },
  { id: 6, srNo: 6, checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
];

// Instrument 3: Measuring Scale (2 points)
const INITIAL_SCALE_POINTS = [
  { id: 1, srNo: 1, checkPoint: 'VISUAL CONDITION', frequency: 'DAILY' },
  { id: 2, srNo: 2, checkPoint: 'CALIBRATION VALIDITY', frequency: 'DAILY' }
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

export default function InstrumentChecksheet({ machine, onClose }) {
  // Common metadata
  const [docInfo, setDocInfo] = useState({
    docNo: 'FRM-WH-QA-046',
    revNo: '04',
    revDate: '12.01.22',
    issueDate: '15.03.09',
    page: 'Page 7 of 13',
    month: '',
    location: machine?.department || ''
  });

  // Section 1: Plunger Micrometer state
  const [plungerMeta, setPlungerMeta] = useState({
    instrumentNo: '',
    instrumentName: 'Plunger Micrometer',
    checkedBy: '',
    confirmedBy: ''
  });
  const [plungerGrid, setPlungerGrid] = useState(() => createInitialGrid(7));
  const [plungerWeekly, setPlungerWeekly] = useState([
    { point: 'ANVIL CONDITION', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ZERO SETTING', w1: '', w2: '', w3: '', w4: '' },
    { point: 'CALIBRATION (Gauge)', w1: '', w2: '', w3: '', w4: '' },
    { point: 'CALIBRATION (Actual)', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ANY OTHER', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ENGG. SIGN', w1: '', w2: '', w3: '', w4: '' }
  ]);

  // Section 2: Blade Micrometer state
  const [bladeMeta, setBladeMeta] = useState({
    instrumentNo: '',
    instrumentName: 'Blade Micrometer',
    checkedBy: '',
    confirmedBy: ''
  });
  const [bladeGrid, setBladeGrid] = useState(() => createInitialGrid(6));
  const [bladeWeekly, setBladeWeekly] = useState([
    { point: 'ANVIL CONDITION', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ZERO SETTING', w1: '', w2: '', w3: '', w4: '' },
    { point: 'CALIBRATION (Gauge)', w1: '', w2: '', w3: '', w4: '' },
    { point: 'CALIBRATION (Actual)', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ANY OTHER', w1: '', w2: '', w3: '', w4: '' },
    { point: 'ENGG. SIGN', w1: '', w2: '', w3: '', w4: '' }
  ]);

  // Section 3: Measuring Scale state
  const [scaleMeta, setScaleMeta] = useState({
    instrumentNo: '',
    instrumentName: 'Measuring Scale',
    checkedBy: '',
    confirmedBy: ''
  });
  const [scaleGrid, setScaleGrid] = useState(() => createInitialGrid(2));

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
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Gauge size={18} className="text-orange-600 bg-orange-50 p-2 rounded-lg w-9 h-9 box-content" />
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
        {/* Top Header Banner */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b-[1.5px] border-slate-900">
          <span className="text-sm font-extrabold tracking-wider text-slate-900">FURUKAWA MINDA ELECTRIC PVT. LTD.</span>
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-700 leading-tight">
            <span>DOC NO: <strong>{docInfo.docNo}</strong></span>
            <span>REV NO: <strong>{docInfo.revNo}</strong></span>
            <span>REV DATE: <strong>{docInfo.revDate}</strong></span>
          </div>
        </div>
        <div className="text-center text-sm font-black tracking-widest py-2 bg-slate-200 border-b-2 border-slate-900 uppercase text-slate-900">
          INSTRUMENT CHECK SHEET (PLUNGER, BLADE & MEASURING INSTRUMENTS)
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: Plunger Micrometer */}
        {/* ========================================================= */}
        <div className="flex flex-col mx-2 mb-3.5 border-[1.5px] border-slate-900 bg-white">
          {/* Metadata bar */}
          <div className="grid grid-cols-[1.2fr_2fr_1.5fr_1fr] border-b-[1.5px] border-slate-900 bg-slate-50">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">INSTRUMENT NO.:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={plungerMeta.instrumentNo}
                onChange={(e) => setPlungerMeta({ ...plungerMeta, instrumentNo: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">INSTRUMENT NAME:</span>
              <input
                className="border-none bg-transparent text-xs font-extrabold text-blue-800 outline-none w-full"
                value={plungerMeta.instrumentName}
                onChange={(e) => setPlungerMeta({ ...plungerMeta, instrumentName: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">LOCATION:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={docInfo.location}
                onChange={(e) => setDocInfo({ ...docInfo, location: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">MONTH:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={docInfo.month}
                onChange={(e) => setDocInfo({ ...docInfo, month: e.target.value })}
              />
            </div>
          </div>

          {/* Grid Table */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
            <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '40px' }}>Sr. No</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '180px' }}>CHECK POINT</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '75px' }}>FREQUENCY</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" colSpan={93}>DATE</th>
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <th key={d} colSpan={3} className="border border-slate-900 bg-slate-100 text-[10px] font-extrabold text-center">{d}</th>
                  ))}
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-blue-700">A</th>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-amber-700">B</th>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-purple-700">C</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_PLUNGER_POINTS.map((pt) => (
                  <tr key={pt.id}>
                    <td className="border border-slate-900 p-1 text-center align-middle">{pt.srNo}</td>
                    <td className="border border-slate-900 p-1 text-left pl-1.5 font-bold whitespace-nowrap bg-white align-middle">{pt.checkPoint}</td>
                    <td className="border border-slate-900 p-1 font-bold text-[10px] text-slate-600 bg-slate-50 text-center align-middle">{pt.frequency}</td>
                    {DAYS_31.map(d => (
                      <React.Fragment key={d}>
                        {SHIFTS.map(s => {
                          const val = plungerGrid[pt.id]?.[d]?.[s] || '';
                          return (
                            <td key={s} className="border border-slate-900 p-0 text-center align-middle">
                              <input
                                className={`w-full h-5 border-none bg-transparent text-center text-[10px] outline-none cursor-pointer focus:bg-blue-50 ${getCellBgClass(val)}`}
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
                <tr className="bg-slate-50 font-bold text-[10.5px]">
                  <td colSpan={2} className="border border-slate-900 p-1 text-right font-extrabold">Checked By:-</td>
                  <td className="border border-slate-900 p-1 font-extrabold text-center">INSP.</td>
                  <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                    <input 
                      type="text" 
                      className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60" 
                      placeholder="Inspector Sign / Stamp" 
                      value={plungerMeta.checkedBy} 
                      onChange={(e) => setPlungerMeta({ ...plungerMeta, checkedBy: e.target.value })} 
                    />
                  </td>
                </tr>
                {/* Confirmed By Row */}
                <tr className="bg-slate-50 font-bold text-[10.5px]">
                  <td colSpan={2} className="border border-slate-900 p-1 text-right font-extrabold">Confirmed By:-</td>
                  <td className="border border-slate-900 p-1 font-extrabold text-center">LEADER</td>
                  <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                    <input 
                      type="text" 
                      className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60" 
                      placeholder="Shift Leader Sign / Stamp" 
                      value={plungerMeta.confirmedBy} 
                      onChange={(e) => setPlungerMeta({ ...plungerMeta, confirmedBy: e.target.value })} 
                    />
                  </td>
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
            <div className="min-w-[320px] border-[1.5px] border-slate-900 bg-white">
              <div className="bg-slate-100 text-center font-extrabold text-[11px] p-1 border-b-[1.5px] border-slate-900 tracking-wider">
                WEEKLY VERIFICATION
              </div>
              <table className="w-full border-collapse text-[10.5px]">
                <thead>
                  <tr>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '130px' }}>POINTS</th>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '45px' }}>WEEK-1</th>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '45px' }}>WEEK-2</th>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '45px' }}>WEEK-3</th>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '45px' }}>WEEK-4</th>
                  </tr>
                </thead>
                <tbody>
                  {plungerWeekly.map((row, rIdx) => (
                    <tr key={row.point}>
                      <td className="border border-slate-900 p-1 text-left font-bold text-[9.5px]">{row.point}</td>
                      <td className="border border-slate-900 p-1 text-center">
                        <input
                          className="w-full border-none bg-transparent text-[10px] font-bold text-center outline-none"
                          value={row.w1}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, rIdx, 'w1', e.target.value)}
                        />
                      </td>
                      <td className="border border-slate-900 p-1 text-center">
                        <input
                          className="w-full border-none bg-transparent text-[10px] font-bold text-center outline-none"
                          value={row.w2}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, rIdx, 'w2', e.target.value)}
                        />
                      </td>
                      <td className="border border-slate-900 p-1 text-center">
                        <input
                          className="w-full border-none bg-transparent text-[10px] font-bold text-center outline-none"
                          value={row.w3}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, rIdx, 'w3', e.target.value)}
                        />
                      </td>
                      <td className="border border-slate-900 p-1 text-center">
                        <input
                          className="w-full border-none bg-transparent text-[10px] font-bold text-center outline-none"
                          value={row.w4}
                          onChange={(e) => handleWeeklyChange(setPlungerWeekly, rIdx, 'w4', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: Blade Micrometer */}
        {/* ========================================================= */}
        <div className="flex flex-col mx-2 mb-3.5 border-[1.5px] border-slate-900 bg-white">
          {/* Metadata bar */}
          <div className="grid grid-cols-[1.2fr_2fr_1.5fr_1fr] border-b-[1.5px] border-slate-900 bg-slate-50">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">INSTRUMENT NO.:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={bladeMeta.instrumentNo}
                onChange={(e) => setBladeMeta({ ...bladeMeta, instrumentNo: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">INSTRUMENT NAME:</span>
              <input
                className="border-none bg-transparent text-xs font-extrabold text-blue-800 outline-none w-full"
                value={bladeMeta.instrumentName}
                onChange={(e) => setBladeMeta({ ...bladeMeta, instrumentName: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">LOCATION:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={docInfo.location}
                onChange={(e) => setDocInfo({ ...docInfo, location: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">MONTH:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={docInfo.month}
                onChange={(e) => setDocInfo({ ...docInfo, month: e.target.value })}
              />
            </div>
          </div>

          {/* Grid Table */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
            <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '40px' }}>Sr. No</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '180px' }}>CHECK POINT</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '75px' }}>FREQUENCY</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" colSpan={93}>DATE</th>
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <th key={d} colSpan={3} className="border border-slate-900 bg-slate-100 text-[10px] font-extrabold text-center">{d}</th>
                  ))}
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-blue-700">A</th>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-amber-700">B</th>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-purple-700">C</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_BLADE_POINTS.map((pt) => (
                  <tr key={pt.id}>
                    <td className="border border-slate-900 p-1 text-center align-middle">{pt.srNo}</td>
                    <td className="border border-slate-900 p-1 text-left pl-1.5 font-bold whitespace-nowrap bg-white align-middle">{pt.checkPoint}</td>
                    <td className="border border-slate-900 p-1 font-bold text-[10px] text-slate-600 bg-slate-50 text-center align-middle">{pt.frequency}</td>
                    {DAYS_31.map(d => (
                      <React.Fragment key={d}>
                        {SHIFTS.map(s => {
                          const val = bladeGrid[pt.id]?.[d]?.[s] || '';
                          return (
                            <td key={s} className="border border-slate-900 p-0 text-center align-middle">
                              <input
                                className={`w-full h-5 border-none bg-transparent text-center text-[10px] outline-none cursor-pointer focus:bg-blue-50 ${getCellBgClass(val)}`}
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
                <tr className="bg-slate-50 font-bold text-[10.5px]">
                  <td colSpan={2} className="border border-slate-900 p-1 text-right font-extrabold">Checked By:-</td>
                  <td className="border border-slate-900 p-1 font-extrabold text-center">INSP.</td>
                  <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                    <input 
                      type="text" 
                      className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60" 
                      placeholder="Inspector Sign / Stamp" 
                      value={bladeMeta.checkedBy} 
                      onChange={(e) => setBladeMeta({ ...bladeMeta, checkedBy: e.target.value })} 
                    />
                  </td>
                </tr>
                {/* Confirmed By Row */}
                <tr className="bg-slate-50 font-bold text-[10.5px]">
                  <td colSpan={2} className="border border-slate-900 p-1 text-right font-extrabold">Confirmed By:-</td>
                  <td className="border border-slate-900 p-1 font-extrabold text-center">LEADER</td>
                  <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                    <input 
                      type="text" 
                      className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60" 
                      placeholder="Shift Leader Sign / Stamp" 
                      value={bladeMeta.confirmedBy} 
                      onChange={(e) => setBladeMeta({ ...bladeMeta, confirmedBy: e.target.value })} 
                    />
                  </td>
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
            <div className="min-w-[320px] border-[1.5px] border-slate-900 bg-white">
              <div className="bg-slate-100 text-center font-extrabold text-[11px] p-1 border-b-[1.5px] border-slate-900 tracking-wider">
                WEEKLY VERIFICATION
              </div>
              <table className="w-full border-collapse text-[10.5px]">
                <thead>
                  <tr>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '130px' }}>POINTS</th>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '45px' }}>WEEK-1</th>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '45px' }}>WEEK-2</th>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '45px' }}>WEEK-3</th>
                    <th className="border border-slate-900 p-1 bg-slate-50 text-[10px] text-center" style={{ width: '45px' }}>WEEK-4</th>
                  </tr>
                </thead>
                <tbody>
                  {bladeWeekly.map((row, rIdx) => (
                    <tr key={row.point}>
                      <td className="border border-slate-900 p-1 text-left font-bold text-[9.5px]">{row.point}</td>
                      <td className="border border-slate-900 p-1 text-center">
                        <input
                          className="w-full border-none bg-transparent text-[10px] font-bold text-center outline-none"
                          value={row.w1}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, rIdx, 'w1', e.target.value)}
                        />
                      </td>
                      <td className="border border-slate-900 p-1 text-center">
                        <input
                          className="w-full border-none bg-transparent text-[10px] font-bold text-center outline-none"
                          value={row.w2}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, rIdx, 'w2', e.target.value)}
                        />
                      </td>
                      <td className="border border-slate-900 p-1 text-center">
                        <input
                          className="w-full border-none bg-transparent text-[10px] font-bold text-center outline-none"
                          value={row.w3}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, rIdx, 'w3', e.target.value)}
                        />
                      </td>
                      <td className="border border-slate-900 p-1 text-center">
                        <input
                          className="w-full border-none bg-transparent text-[10px] font-bold text-center outline-none"
                          value={row.w4}
                          onChange={(e) => handleWeeklyChange(setBladeWeekly, rIdx, 'w4', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: Measuring Scale */}
        {/* ========================================================= */}
        <div className="flex flex-col mx-2 mb-3.5 border-[1.5px] border-slate-900 bg-white">
          {/* Metadata bar */}
          <div className="grid grid-cols-[1.2fr_2fr_1.5fr_1fr] border-b-[1.5px] border-slate-900 bg-slate-50">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">INSTRUMENT NO.:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={scaleMeta.instrumentNo}
                onChange={(e) => setScaleMeta({ ...scaleMeta, instrumentNo: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">INSTRUMENT NAME:</span>
              <input
                className="border-none bg-transparent text-xs font-extrabold text-blue-800 outline-none w-full"
                value={scaleMeta.instrumentName}
                onChange={(e) => setScaleMeta({ ...scaleMeta, instrumentName: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-slate-900 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">LOCATION:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={docInfo.location}
                onChange={(e) => setDocInfo({ ...docInfo, location: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">MONTH:</span>
              <input
                className="border-none bg-transparent text-xs font-bold text-blue-800 outline-none w-full"
                value={docInfo.month}
                onChange={(e) => setDocInfo({ ...docInfo, month: e.target.value })}
              />
            </div>
          </div>

          {/* Grid Table */}
          <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
            <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '40px' }}>Sr. No</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '180px' }}>CHECK POINT</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" rowSpan={3} style={{ width: '75px' }}>FREQUENCY</th>
                  <th className="border border-slate-900 p-1 bg-slate-50 font-extrabold text-slate-900 text-[10.5px] text-center" colSpan={93}>DATE</th>
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <th key={d} colSpan={3} className="border border-slate-900 bg-slate-100 text-[10px] font-extrabold text-center">{d}</th>
                  ))}
                </tr>
                <tr>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-blue-700">A</th>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-amber-700">B</th>
                      <th className="border border-slate-900 text-[9px] font-extrabold w-[18px] min-w-[18px] bg-white text-center text-purple-700">C</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INITIAL_SCALE_POINTS.map((pt) => (
                  <tr key={pt.id}>
                    <td className="border border-slate-900 p-1 text-center align-middle">{pt.srNo}</td>
                    <td className="border border-slate-900 p-1 text-left pl-1.5 font-bold whitespace-nowrap bg-white align-middle">{pt.checkPoint}</td>
                    <td className="border border-slate-900 p-1 font-bold text-[10px] text-slate-600 bg-slate-50 text-center align-middle">{pt.frequency}</td>
                    {DAYS_31.map(d => (
                      <React.Fragment key={d}>
                        {SHIFTS.map(s => {
                          const val = scaleGrid[pt.id]?.[d]?.[s] || '';
                          return (
                            <td key={s} className="border border-slate-900 p-0 text-center align-middle">
                              <input
                                className={`w-full h-5 border-none bg-transparent text-center text-[10px] outline-none cursor-pointer focus:bg-blue-50 ${getCellBgClass(val)}`}
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
                <tr className="bg-slate-50 font-bold text-[10.5px]">
                  <td colSpan={2} className="border border-slate-900 p-1 text-right font-extrabold">Checked By:-</td>
                  <td className="border border-slate-900 p-1 font-extrabold text-center">INSP.</td>
                  <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                    <input 
                      type="text" 
                      className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60" 
                      placeholder="Inspector Sign / Stamp" 
                      value={scaleMeta.checkedBy} 
                      onChange={(e) => setScaleMeta({ ...scaleMeta, checkedBy: e.target.value })} 
                    />
                  </td>
                </tr>
                {/* Confirmed By Row */}
                <tr className="bg-slate-50 font-bold text-[10.5px]">
                  <td colSpan={2} className="border border-slate-900 p-1 text-right font-extrabold">Confirmed By:-</td>
                  <td className="border border-slate-900 p-1 font-extrabold text-center">LEADER</td>
                  <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                    <input 
                      type="text" 
                      className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60" 
                      placeholder="Shift Leader Sign / Stamp" 
                      value={scaleMeta.confirmedBy} 
                      onChange={(e) => setScaleMeta({ ...scaleMeta, confirmedBy: e.target.value })} 
                    />
                  </td>
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
