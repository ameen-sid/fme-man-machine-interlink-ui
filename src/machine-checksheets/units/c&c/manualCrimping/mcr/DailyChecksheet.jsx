import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import React, { useState } from 'react';
import { CalendarCheck2, Save, RotateCcw, Plus } from 'lucide-react';

// Section 1: Related with m/c operations (7 Startup points - Shift confirmation)
const INITIAL_OPERATOR_POINTS = [
  {
    id: 'op1',
    point: 'Check the cleaning of Applicator clamping area (Base Plate)',
    hindi: 'Applicator clamping एरिया की सफाई को चेक करें (बेस प्लेट)',
    resp: 'Machine Operator',
    stdValue: 'No chips /No dust',
    method: 'Visually',
    freqD: '√'
  },
  {
    id: 'op2',
    point: 'Check working of nose plier interlocking',
    hindi: 'नोज़ प्लायर की इंटरलॉकिंग को चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Machine will not operate when nose plier is not on its location',
    method: 'Test & trial',
    freqD: '√'
  },
  {
    id: 'op3',
    point: 'Check Shut height adjust Bolt and Nut',
    hindi: 'शट हाइट एडजस्टमेंट बोल्ट और नट को चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Should be tight',
    method: 'Test & trial',
    freqD: '√'
  },
  {
    id: 'op4',
    point: 'Check the CFM (clamping force monitor )',
    hindi: 'सीएफएम को चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Functioning OK',
    method: 'Test & trial',
    freqD: '√'
  },
  {
    id: 'op5',
    point: 'Check the Auto/Manual Mode Functioning/',
    hindi: 'ऑटो मैनुअल मोड को चेक करें काम कर रहा है या नहीं',
    resp: 'Machine Operator',
    stdValue: 'Functioning OK',
    method: 'Test & trial',
    freqD: '√'
  },
  {
    id: 'op6',
    point: 'Check safety cover operation and interlocking',
    hindi: 'सेफ्टी कवर के ऑपरेशन और इंटरलॉकिंग को चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Machine will not operate when safety cover is open and smooth operation of safety cover',
    method: 'Test & trial',
    freqD: '√'
  },
  {
    id: 'op7',
    point: 'Check Emergency Switch Functioning',
    hindi: 'आपातकालीन स्विच कामकाज की जाँच',
    resp: 'Machine Operator',
    stdValue: 'Functioning ok',
    method: 'Test & trial',
    freqD: '√'
  }
];

// Section 2: Related with m/c Pokayoke (1 Daily Point - Shift confirmation)
const INITIAL_POKEYOKE_POINTS = [
  {
    id: 'poka1',
    point: 'Check The Safety Door condition or interlocking',
    hindi: 'सेफ्टी कवर की कंडीशन और इंटरलॉकिंग को चेक करें',
    resp: 'Maint. Technician',
    stdValue: 'Machine will not operate when safety cover is open and smooth operation of safety cover',
    method: 'Test & trial',
    freqD: '√'
  }
];

// Section 3: Related with m/c Maintenance (2 Weekly Points)
const INITIAL_MAINT_WEEKLY_POINTS = [
  {
    id: 'mw1',
    point: 'Check The Ram Adjustment Bolt',
    hindi: 'रैम एडजस्टमेंट बोल्ट को चेक करें',
    resp: 'Maint. Technician',
    stdValue: 'Tightning / No Damage',
    method: 'Test & trial',
    freqW: '√'
  },
  {
    id: 'mw2',
    point: 'Electrical Panel Cleaning & Ensure The Panel Conditions and Proper Lock',
    hindi: 'इलेक्ट्रिकल पैनल की सफाई और सुनिश्चित करें कि पैनल की स्थिति और उचित लॉक हो',
    resp: 'Maint. Technician',
    stdValue: 'Cleaning / Fitment',
    method: 'Visually',
    freqW: '√'
  }
];

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

function createEmptyGrid(points) {
  const grid = {};
  points.forEach(p => {
    grid[p.id] = {};
    for (let d = 1; d <= 31; d++) {
      grid[p.id][d] = {};
      SHIFTS.forEach(s => {
        grid[p.id][d][s] = '';
      });
    }
  });
  return grid;
}

function createEmptyWeeklyGrid(points) {
  const grid = {};
  points.forEach(p => {
    grid[p.id] = {};
    for (let d = 1; d <= 31; d++) {
      grid[p.id][d] = '';
    }
  });
  return grid;
}

const INITIAL_ABNORMALITY_ROWS = Array.from({ length: 10 }, (_, i) => ({
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
  const [docMeta, setDocMeta] = useState({
    docNo: 'CHK-VM-MT-105',
    revNo: '01',
    date: '04.01.2021',
    machineName: 'Regento (2 ton / 4 ton)',
    machineNo: machine?.name || ''
  });

  // Empty grids (no prefilled values)
  const [operatorGrid, setOperatorGrid] = useState(() => createEmptyGrid(INITIAL_OPERATOR_POINTS));
  const [pokayokeGrid, setPokayokeGrid] = useState(() => createEmptyGrid(INITIAL_POKEYOKE_POINTS));
  const [maintWeeklyGrid, setMaintWeeklyGrid] = useState(() => createEmptyWeeklyGrid(INITIAL_MAINT_WEEKLY_POINTS));

  // Sign off inputs
  const [signOffs, setSignOffs] = useState({
    opShiftA: '',
    opShiftB: '',
    opShiftC: '',
    supervisorProd: '',
    pokaAssocShiftA: '',
    pokaAssocShiftB: '',
    pokaAssocShiftC: '',
    techMaintSign: '',
    superMaintSign: '',
    remarks: '',
    footerProdSign: '',
    footerMaintSign: ''
  });

  const [abnormalities, setAbnormalities] = useState(INITIAL_ABNORMALITY_ROWS);
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

  const handleWeeklyCellChange = (pointId, day, value) => {
    setMaintWeeklyGrid(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[pointId]) copy[pointId] = {};
      copy[pointId][day] = value;
      return copy;
    });
  };

  const handleAbnormalChange = (idx, field, value) => {
    setAbnormalities(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleAddAbnormalityRow = () => {
    setAbnormalities(prev => [
      ...prev,
      {
        id: prev.length + 1,
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

  const handleSave = () => {
    setSavedToast('Daily Machine Check Sheet saved successfully to FME Server!');
    setTimeout(() => setSavedToast(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this Daily Machine Check Sheet?')) {
      setOperatorGrid(createEmptyGrid(INITIAL_OPERATOR_POINTS));
      setPokayokeGrid(createEmptyGrid(INITIAL_POKEYOKE_POINTS));
      setMaintWeeklyGrid(createEmptyWeeklyGrid(INITIAL_MAINT_WEEKLY_POINTS));
      setAbnormalities(INITIAL_ABNORMALITY_ROWS);
      setSignOffs({
        opShiftA: '',
        opShiftB: '',
        opShiftC: '',
        supervisorProd: '',
        pokaAssocShiftA: '',
        pokaAssocShiftB: '',
        pokaAssocShiftC: '',
        techMaintSign: '',
        superMaintSign: '',
        remarks: '',
        footerProdSign: '',
        footerMaintSign: ''
      });
    }
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
          <CalendarCheck2 size={18} className="text-emerald-500 bg-emerald-50 p-2 rounded-lg w-9 h-9 box-content" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">
              FURUKAWA MINDA ELECTRIC PVT. LTD. — DAILY MACHINE CHECK SHEET
            </h3>
            <span className="text-[11.5px] text-slate-500 font-medium">
              Format: <strong>{docMeta.docNo}</strong> • Rev: <strong>{docMeta.revNo}</strong> • Machine: <strong>{docMeta.machineName}</strong>
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

      {/* Sheet Card */}
      <div className="bg-white border-[1.5px] border-black shadow-md rounded overflow-hidden">
        {/* Company Header - Top Right (as in Screenshot 2) */}
        <div className="flex justify-end px-3 pt-2 pb-0.5 bg-white border-b border-black">
          <span className="text-[11.5px] font-black tracking-wider text-black uppercase font-sans">
            FURUKAWA MINDA ELECTRIC PVT. LTD.
          </span>
        </div>

        {/* Top Header Box (Exact replica of Screenshot 2) */}
        <div className="border-b-[1.5px] border-black bg-white flex items-stretch">
          {/* Centered Title: DAILY CHECK SHEET */}
          <div className="flex-1 flex items-center justify-center px-4 py-2 bg-white">
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-black uppercase m-0 font-sans text-center">
              DAILY CHECK SHEET
            </h1>
          </div>

          {/* Right Meta Box: Doc No, REV, DATE */}
          <div className="w-64 min-w-[240px] border-l-[1.5px] border-black flex flex-col justify-center bg-white text-[11px] font-bold text-black font-sans">
            <div className="border-b-[1.5px] border-black px-2.5 py-1 flex items-center">
              <span className="whitespace-nowrap font-bold text-black text-[11px]">Doc No:-</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-0.5 text-xs"
                value={docMeta.docNo}
                onChange={(e) => setDocMeta({ ...docMeta, docNo: e.target.value })}
              />
            </div>
            <div className="border-b-[1.5px] border-black px-2.5 py-1 flex items-center">
              <span className="whitespace-nowrap font-bold text-black text-[11px]">REV:-</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-0.5 text-xs"
                value={docMeta.revNo}
                onChange={(e) => setDocMeta({ ...docMeta, revNo: e.target.value })}
              />
            </div>
            <div className="px-2.5 py-1 flex items-center">
              <span className="whitespace-nowrap font-bold text-black text-[11px]">DATE:-</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-black outline-none w-full ml-1 focus:bg-yellow-50 px-0.5 text-xs"
                value={docMeta.date}
                onChange={(e) => setDocMeta({ ...docMeta, date: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Subheader: Machine Name (Left) and Machine No (Right) */}
        <div className="border-b-[1.5px] border-black bg-white flex items-center justify-between px-3 py-1.5 text-xs font-bold text-black">
          <div className="flex items-center gap-1.5 flex-1">
            <span className="whitespace-nowrap font-bold">Machine Name :</span>
            <input
              type="text"
              className="border-none bg-transparent font-bold text-black outline-none w-80 focus:bg-yellow-50 px-1 text-xs"
              value={docMeta.machineName}
              onChange={(e) => setDocMeta({ ...docMeta, machineName: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="whitespace-nowrap font-bold">Machine No.</span>
            <input
              type="text"
              className="border-b border-black bg-transparent font-bold text-black outline-none w-48 focus:bg-yellow-50 px-1 text-xs"
              value={docMeta.machineNo}
              placeholder="e.g. MCR-01"
              onChange={(e) => setDocMeta({ ...docMeta, machineNo: e.target.value })}
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* Table 1: STARTUP CHECK POINTS (SHIFT CONFIRMATION) */}
        {/* ========================================================= */}
        <div className="w-full overflow-x-auto border-b-[1.5px] border-black">
          <table className="w-full border-collapse text-[10.5px] min-w-[1500px]">
            <thead>
              {/* Row 1: Releated with m/c operations Banner */}
              <tr className="border-b-[1.5px] border-black bg-[#bfbfbf]">
                <th
                  colSpan={39}
                  className="border border-black p-1 text-left pl-3 font-black italic text-xs tracking-wider text-black bg-[#bfbfbf]"
                >
                  Releated with m/c operations
                </th>
              </tr>

              {/* Row 2: Header columns */}
              <tr className="border-b border-black bg-white">
                <th
                  className="border border-black p-1 text-center font-black text-[10px] text-black bg-white leading-tight"
                  style={{ width: '230px' }}
                >
                  START UP CHECK POINTS<br />(SHIFT CONFIRMATION)
                </th>
                <th
                  className="border border-black p-1 text-center font-bold text-[10px] text-black bg-white"
                  style={{ width: '90px' }}
                >
                  Resp.
                </th>
                <th
                  className="border border-black p-1 text-center font-bold text-[10px] text-black bg-white"
                  style={{ width: '180px' }}
                >
                  Check Value
                </th>
                <th
                  className="border border-black p-1 text-center font-bold text-[10px] text-black bg-white"
                  style={{ width: '90px' }}
                >
                  Method
                </th>
                <th
                  colSpan={3}
                  className="border border-black p-1 text-center font-bold text-[10px] text-black bg-white"
                  style={{ width: '72px' }}
                >
                  FREQ
                </th>
                <th
                  rowSpan={2}
                  className="border border-black p-0.5 text-center font-bold text-[9px] text-black bg-white w-6 leading-tight align-middle"
                >
                  Shift
                </th>
                <th
                  colSpan={31}
                  className="border border-black p-1 text-center font-bold text-[10px] text-black bg-white"
                >
                  Daily Status
                </th>
              </tr>

              {/* Row 3: ACTIVITY, Who, STD VALUE, Measuring Method, D, W, S, 1..31 */}
              <tr className="border-b-[1.5px] border-black">
                <th className="border border-black p-1 text-center font-black text-[10px] text-black bg-[#bfbfbf]">
                  ACTIVITY
                </th>
                <th className="border border-black p-1 text-center font-black text-[10px] text-black bg-[#bfbfbf]">
                  Who
                </th>
                <th className="border border-black p-1 text-center font-black text-[10px] text-black bg-[#bfbfbf]">
                  STD VALUE
                </th>
                <th className="border border-black p-1 text-center font-black text-[10px] text-black bg-[#bfbfbf]">
                  Measuring Method
                </th>
                <th className="border border-black p-0.5 text-center font-black text-[10px] text-black bg-white w-6">
                  D
                </th>
                <th className="border border-black p-0.5 text-center font-black text-[10px] text-black bg-white w-6">
                  W
                </th>
                <th className="border border-black p-0.5 text-center font-black text-[10px] text-black bg-white w-6">
                  S
                </th>
                {DAYS_31.map((d) => (
                  <th
                    key={d}
                    className="border border-black p-0.5 text-center font-black text-[10px] text-black bg-white w-8 min-w-[28px]"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {INITIAL_OPERATOR_POINTS.map((pt) => (
                <React.Fragment key={pt.id}>
                  {/* Row for Shift A */}
                  <tr>
                    <td rowSpan={3} className="border border-black p-1 text-left pl-1.5 font-bold align-middle bg-white">
                      <div>{pt.point}</div>
                      <span className="text-[9.5px] text-slate-600 block font-normal">{pt.hindi}</span>
                    </td>
                    <td rowSpan={3} className="border border-black p-1 text-center text-[10px] align-middle font-bold bg-white">{pt.resp}</td>
                    <td rowSpan={3} className="border border-black p-1 text-[10px] font-bold text-black whitespace-pre-line align-middle bg-white">{pt.stdValue}</td>
                    <td rowSpan={3} className="border border-black p-1 text-center text-[10px] align-middle font-bold bg-white">{pt.method}</td>
                    <td rowSpan={3} className="border border-black p-1 text-center text-xs font-black text-black align-middle bg-white">√</td>
                    <td rowSpan={3} className="border border-black p-1 align-middle bg-white"></td>
                    <td rowSpan={3} className="border border-black p-1 align-middle bg-white"></td>
                    <td className="border border-black text-center font-extrabold text-[9.5px] bg-slate-50 text-blue-700 w-6">A</td>
                    {DAYS_31.map(d => {
                      const val = operatorGrid[pt.id]?.[d]?.A || '';
                      return (
                        <td key={d} className="border border-black p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-blue-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, 'A', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row for Shift B */}
                  <tr>
                    <td className="border border-black text-center font-extrabold text-[9.5px] bg-slate-50 text-amber-700 w-6">B</td>
                    {DAYS_31.map(d => {
                      const val = operatorGrid[pt.id]?.[d]?.B || '';
                      return (
                        <td key={d} className="border border-black p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-amber-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, 'B', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row for Shift C */}
                  <tr>
                    <td className="border border-black text-center font-extrabold text-[9.5px] bg-slate-50 text-purple-700 w-6">C</td>
                    {DAYS_31.map(d => {
                      const val = operatorGrid[pt.id]?.[d]?.C || '';
                      return (
                        <td key={d} className="border border-black p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-purple-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, 'C', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}

              {/* Section 1 Sign-offs matching Screenshot 2 */}
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-left pl-6 font-extrabold text-black">
                  Filled By (M/C Operator Sign) [A Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Operator Sign (Shift A)"
                    value={signOffs.opShiftA}
                    onChange={(e) => setSignOffs({ ...signOffs, opShiftA: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-left pl-6 font-extrabold text-black">
                  Filled By (M/C Operator Sign) [B Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Operator Sign (Shift B)"
                    value={signOffs.opShiftB}
                    onChange={(e) => setSignOffs({ ...signOffs, opShiftB: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-left pl-6 font-extrabold text-black">
                  Filled By (M/C Operator Sign) [C Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Operator Sign (Shift C)"
                    value={signOffs.opShiftC}
                    onChange={(e) => setSignOffs({ ...signOffs, opShiftC: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-center font-extrabold text-black">
                  Supervisor - Production (Sign)
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Production Supervisor Sign"
                    value={signOffs.supervisorProd}
                    onChange={(e) => setSignOffs({ ...signOffs, supervisorProd: e.target.value })}
                  />
                </td>
              </tr>

              {/* ========================================================= */}
              {/* SECTION 2: RELEATED WITH M/C POKAYOKE */}
              {/* ========================================================= */}
              <tr className="border-t-[1.5px] border-b-[1.5px] border-black bg-[#bfbfbf]">
                <th
                  colSpan={39}
                  className="border border-black p-1 text-left pl-3 font-black italic text-xs tracking-wider text-black bg-[#bfbfbf]"
                >
                  Releated with m/c Pokayoke
                </th>
              </tr>

              {INITIAL_POKEYOKE_POINTS.map((pt) => (
                <React.Fragment key={pt.id}>
                  {/* Row for Shift A */}
                  <tr>
                    <td rowSpan={3} className="border border-black p-1 text-left pl-1.5 font-bold align-middle bg-white">
                      <div>{pt.point}</div>
                      <span className="text-[9.5px] text-slate-600 block font-normal">{pt.hindi}</span>
                    </td>
                    <td rowSpan={3} className="border border-black p-1 text-center text-[10px] align-middle font-bold bg-white">{pt.resp}</td>
                    <td rowSpan={3} className="border border-black p-1 text-[10px] font-bold text-black whitespace-pre-line align-middle bg-white">{pt.stdValue}</td>
                    <td rowSpan={3} className="border border-black p-1 text-center text-[10px] align-middle font-bold bg-white">{pt.method}</td>
                    <td rowSpan={3} className="border border-black p-1 text-center text-xs font-black text-black align-middle bg-white">√</td>
                    <td rowSpan={3} className="border border-black p-1 align-middle bg-white"></td>
                    <td rowSpan={3} className="border border-black p-1 align-middle bg-white"></td>
                    <td className="border border-black text-center font-extrabold text-[9.5px] bg-slate-50 text-blue-700 w-6">A</td>
                    {DAYS_31.map(d => {
                      const val = pokayokeGrid[pt.id]?.[d]?.A || '';
                      return (
                        <td key={d} className="border border-black p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-blue-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setPokayokeGrid, pt.id, d, 'A', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row for Shift B */}
                  <tr>
                    <td className="border border-black text-center font-extrabold text-[9.5px] bg-slate-50 text-amber-700 w-6">B</td>
                    {DAYS_31.map(d => {
                      const val = pokayokeGrid[pt.id]?.[d]?.B || '';
                      return (
                        <td key={d} className="border border-black p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-amber-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setPokayokeGrid, pt.id, d, 'B', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row for Shift C */}
                  <tr>
                    <td className="border border-black text-center font-extrabold text-[9.5px] bg-slate-50 text-purple-700 w-6">C</td>
                    {DAYS_31.map(d => {
                      const val = pokayokeGrid[pt.id]?.[d]?.C || '';
                      return (
                        <td key={d} className="border border-black p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-purple-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setPokayokeGrid, pt.id, d, 'C', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}

              {/* Section 2 Sign-offs matching Screenshot 2 & 3 */}
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-left pl-6 font-extrabold text-black">
                  Checked & Corrected By (Maint. Assocites Sign) [A Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Maint. Associate Sign (Shift A)"
                    value={signOffs.pokaAssocShiftA}
                    onChange={(e) => setSignOffs({ ...signOffs, pokaAssocShiftA: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-left pl-6 font-extrabold text-black">
                  Checked & Corrected By (Maint. Assocites Sign) [B Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Maint. Associate Sign (Shift B)"
                    value={signOffs.pokaAssocShiftB}
                    onChange={(e) => setSignOffs({ ...signOffs, pokaAssocShiftB: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-left pl-6 font-extrabold text-black">
                  Checked & Corrected By (Maint. Assocites Sign) [C Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Maint. Associate Sign (Shift C)"
                    value={signOffs.pokaAssocShiftC}
                    onChange={(e) => setSignOffs({ ...signOffs, pokaAssocShiftC: e.target.value })}
                  />
                </td>
              </tr>

              {/* ========================================================= */}
              {/* SECTION 3: RELEATED WITH M/C MAINTENANCE */}
              {/* ========================================================= */}
              <tr className="border-t-[1.5px] border-b-[1.5px] border-black bg-[#bfbfbf]">
                <th
                  colSpan={39}
                  className="border border-black p-1 text-left pl-3 font-black italic text-xs tracking-wider text-black bg-[#bfbfbf]"
                >
                  Releated with m/c Maintenance
                </th>
              </tr>

              {INITIAL_MAINT_WEEKLY_POINTS.map((pt) => (
                <tr key={pt.id} className="h-7">
                  <td className="border border-black p-1 text-left pl-1.5 font-bold align-middle bg-white">
                    <div>{pt.point}</div>
                    <span className="text-[9.5px] text-slate-600 block font-normal">{pt.hindi}</span>
                  </td>
                  <td className="border border-black p-1 text-center text-[10px] align-middle font-bold bg-white">{pt.resp}</td>
                  <td className="border border-black p-1 text-[10px] font-bold text-black whitespace-pre-line align-middle bg-white">{pt.stdValue}</td>
                  <td className="border border-black p-1 text-center text-[10px] align-middle font-bold bg-white">{pt.method}</td>
                  <td className="border border-black p-1 align-middle bg-white"></td>
                  <td className="border border-black p-1 text-center text-xs font-black text-black align-middle bg-white">√</td>
                  <td className="border border-black p-1 align-middle bg-white"></td>
                  <td className="border border-black text-center font-extrabold text-[9.5px] bg-white text-slate-500 w-6"></td>
                  {DAYS_31.map(d => {
                    const val = maintWeeklyGrid[pt.id]?.[d] || '';
                    return (
                      <td key={d} className="border border-black p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                        <input
                          className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-emerald-100 ${getCellBgClass(val)}`}
                          value={val}
                          onChange={(e) => handleWeeklyCellChange(pt.id, d, e.target.value.toUpperCase())}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Section 3 Sign-offs matching Screenshot 3 */}
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-center font-extrabold text-black">
                  Technician - Maintenance (Sign)
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Technician - Maintenance Sign"
                    value={signOffs.techMaintSign}
                    onChange={(e) => setSignOffs({ ...signOffs, techMaintSign: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-white font-bold text-[10.5px]">
                <td colSpan={8} className="border border-black p-1 text-center font-extrabold text-black">
                  Supervisor - Maintenance (Sign)
                </td>
                <td colSpan={31} className="border border-black p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-72 focus:border-black"
                    placeholder="Supervisor - Maintenance Sign"
                    value={signOffs.superMaintSign}
                    onChange={(e) => setSignOffs({ ...signOffs, superMaintSign: e.target.value })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Notes & Legends (Exact match of Screenshot 3) */}
        <div className="p-3 bg-white border-b-[1.5px] border-black text-[10px] font-bold text-black font-sans leading-relaxed">
          <div className="text-black font-bold mb-0.5">* Checking Frequency of Daily / Shift : Shift Start</div>
          <div className="text-black font-bold mb-2">* Checking Frequency of Weekly : First day of week</div>
          <div className="font-black text-black tracking-wide">[LEGANDS]</div>
          <div className="font-bold text-black">1). PUT [O] FOR OK CONDITION.</div>
          <div className="font-bold text-black">2). PUT [X] FOR NOT OK CONDITION.</div>
          <div className="font-bold text-black">3). TAKE NECESSETY ACTION AND ENCIRCLE ON THE CROSS MARK [ (X) ] AND FILL THE COUNTERACTION SHEET.</div>
        </div>
        {/* ========================================================= */}
        {/* SECTION 3: ABNORMALITY OBSERVATION & ACTION SHEET */}
        {/* ========================================================= */}
        <div className="p-3 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1" />
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-all bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700"
                onClick={handleAddAbnormalityRow}
              >
                <Plus size={13} />
                <span>Add Row</span>
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto border-2 border-slate-900">
            <table className="w-full border-collapse text-[11px] min-w-[1200px]">
              <thead>
                <tr>
                  <th
                    colSpan={12}
                    className="border-b-2 border-slate-900 p-2 bg-white font-black text-slate-950 text-center text-base tracking-wide uppercase"
                  >
                    Abnormality Observation & Action Sheet
                  </th>
                </tr>
                <tr>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-24">
                    Date
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-16">
                    Shift
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-24">
                    Area
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-28">
                    Specific<br />Area
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-56">
                    Abnormailaity
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-48">
                    Immediate Action Req.
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-20">
                    Resp.
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-28">
                    Target<br />Date /Time
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-20">
                    Status
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-36">
                    Operator Feedback
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-28">
                    Maint.<br />Supervisor
                  </th>
                  <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-28">
                    Production<br />Supervisor
                  </th>
                </tr>
              </thead>
              <tbody>
                {abnormalities.map((row, rIdx) => (
                  <tr key={row.id} className="h-8">
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                        value={row.date}
                        onChange={(e) => handleAbnormalChange(rIdx, 'date', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center font-bold"
                        value={row.shift}
                        onChange={(e) => handleAbnormalChange(rIdx, 'shift', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                        value={row.area}
                        onChange={(e) => handleAbnormalChange(rIdx, 'area', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                        value={row.specificArea}
                        onChange={(e) => handleAbnormalChange(rIdx, 'specificArea', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-left align-middle px-1">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left"
                        value={row.abnormality}
                        onChange={(e) => handleAbnormalChange(rIdx, 'abnormality', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-left align-middle px-1">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left"
                        value={row.immediateAction}
                        onChange={(e) => handleAbnormalChange(rIdx, 'immediateAction', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                        value={row.resp}
                        onChange={(e) => handleAbnormalChange(rIdx, 'resp', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                        value={row.targetDateTime}
                        onChange={(e) => handleAbnormalChange(rIdx, 'targetDateTime', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center font-bold"
                        value={row.status}
                        onChange={(e) => handleAbnormalChange(rIdx, 'status', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-left align-middle px-1">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left"
                        value={row.feedback}
                        onChange={(e) => handleAbnormalChange(rIdx, 'feedback', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                        value={row.maintSign}
                        onChange={(e) => handleAbnormalChange(rIdx, 'maintSign', e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-900 p-0 text-center align-middle">
                      <input
                        type="text"
                        className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                        value={row.prodSign}
                        onChange={(e) => handleAbnormalChange(rIdx, 'prodSign', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}

                {/* Bottom Remarks & Supervisor Signature Row */}
                <tr>
                  <td colSpan={10} className="border border-slate-900 p-2 align-top bg-white">
                    <div className="text-[11px] font-bold text-slate-950 mb-1">[Remarks]</div>
                    <textarea
                      rows={3}
                      className="w-full border border-slate-300 rounded p-1 text-xs outline-none focus:border-blue-500 font-sans resize-none"
                      placeholder="Enter remarks here..."
                      value={signOffs.remarks || ''}
                      onChange={(e) => setSignOffs({ ...signOffs, remarks: e.target.value })}
                    />
                  </td>
                  <td className="border border-slate-900 p-1.5 align-bottom bg-white">
                    <div className="border border-slate-900 bg-white flex flex-col justify-between h-20 text-center">
                      <input
                        type="text"
                        className="w-full border-none bg-transparent text-[10px] outline-none text-center flex-1"
                        placeholder=""
                        value={signOffs.footerProdSign || ''}
                        onChange={(e) => setSignOffs({ ...signOffs, footerProdSign: e.target.value })}
                      />
                      <div className="text-[9.5px] font-bold text-slate-900 border-t border-slate-900 py-1 bg-slate-50">
                        Production Supervisor
                      </div>
                    </div>
                  </td>
                  <td className="border border-slate-900 p-1.5 align-bottom bg-white">
                    <div className="border border-slate-900 bg-white flex flex-col justify-between h-20 text-center">
                      <input
                        type="text"
                        className="w-full border-none bg-transparent text-[10px] outline-none text-center flex-1"
                        placeholder=""
                        value={signOffs.footerMaintSign || ''}
                        onChange={(e) => setSignOffs({ ...signOffs, footerMaintSign: e.target.value })}
                      />
                      <div className="text-[9.5px] font-bold text-slate-900 border-t border-slate-900 py-1 bg-slate-50">
                        Maintenance Supervisor
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Document Stamp */}
        <div className="flex items-center justify-between p-1.5 px-3.5 bg-slate-100 border-t border-slate-900 text-[10px] font-bold text-slate-600">
          <span>DOC NO: <strong>CHK-WH-MT-003</strong></span>
          <span>REV: <strong>07</strong></span>
          <span>DATE: <strong>15.09.2023</strong></span>
          <span>FURUKAWA MINDA ELECTRIC PVT. LTD.</span>
        </div>
      </div>
    </div>
  );
}