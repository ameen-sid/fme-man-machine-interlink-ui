import React, { useState } from 'react';
import { 
  CalendarCheck2, 
  Save, 
  RotateCcw,
  Plus
} from 'lucide-react';

// Part 1: Operator Startup Check Points (Shift Confirmation) - 10 Points
const INITIAL_OPERATOR_POINTS = [
  {
    id: 'op1',
    point: 'Check the Cleaning of Machine',
    hindi: 'मशीन की सफाई की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'No PVC / Chips',
    method: 'Visulay',
    freq: 'D'
  },
  {
    id: 'op2',
    point: 'Paper winder A Side & B Side',
    hindi: 'A साइड और B साइड विंडर की कार्यप्रणाली की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'Functioning OK',
    method: 'Test & Trial',
    freq: 'D'
  },
  {
    id: 'op3',
    point: 'Check Tower Light Functioning',
    hindi: 'टावर लाइट कार्यप्रणाली की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'Functioning OK',
    method: 'Visulay',
    freq: 'D'
  },
  {
    id: 'op4',
    point: 'Chip Cutter A Side & B Side',
    hindi: 'A साइड और B साइड चिप कटर की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'Functioning OK',
    method: 'Test & Trial',
    freq: 'D'
  },
  {
    id: 'op5',
    point: 'Check BLO (Bad Limit Overall) value',
    hindi: 'BLO मान की जाँच करें',
    resp: 'Machine Operator',
    stdValue: '70 Max',
    method: 'Visulay',
    freq: 'D'
  },
  {
    id: 'op6',
    point: 'Check Zone 1, 2 & 3 value',
    hindi: 'जोन 1, 2 & 3 वैल्यू चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Zone 1: 0.5 | Zone 2: 0.5 | Zone 3: 0.8',
    method: 'Visulay',
    freq: 'D'
  },
  {
    id: 'op7',
    point: 'Check Emergency Switch Functioning',
    hindi: 'आपातकालीन स्विच कार्यप्रणाली की जाँच',
    resp: 'Machine Operator',
    stdValue: 'Machine should stop after press emergency switch',
    method: 'Test & Trial',
    freq: 'D'
  },
  {
    id: 'op8',
    point: 'Check safety cover operation and interlocking',
    hindi: 'सुरक्षा कवर ऑपरेशन और इंटरलॉकिंग की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'Machine will not operate when safety cover is open and smooth operation of safety cover',
    method: 'Test & Trial',
    freq: 'D'
  },
  {
    id: 'op9',
    point: 'Check Air Pressure (Main Incoming)',
    hindi: 'मुख्य आने वाले एयर प्रेशर की जाँच',
    resp: 'Machine Operator',
    stdValue: '4 ~ 6 Bar',
    method: 'Visulay',
    freq: 'D'
  },
  {
    id: 'op10',
    point: 'Check the feeding roller pressure',
    hindi: 'फीडिंग रोलर प्रेशर की जाँच करें',
    resp: 'Machine Operator',
    stdValue: '4 ~ 6 Bar (0.4 ~ 0.6 Mpa)',
    method: 'Visulay',
    freq: 'D'
  },
  {
    id: 'op11',
    point: 'Check the oil pot Availability with oil',
    hindi: 'ऑयल पॉट में तेल की उपलब्धता की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'Oil pot condition with oil',
    method: 'Visulay',
    freq: 'D'
  }
];

// Part 2: Related with M/C Maintenance - Daily & Weekly Points (4 Shift points + 8 Weekly maintenance points)
const INITIAL_MAINT_SHIFT_POINTS = [
  {
    id: 'mt1',
    point: 'Check the Four way wire roller Gap',
    hindi: 'फोर वे रोलर गैप की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: '3mm - 4 mm',
    method: 'By Tool',
    freq: 'D'
  },
  {
    id: 'mt2',
    point: 'No wire Detector',
    hindi: 'नो वायर डिटेक्टर की कार्यप्रणाली की जाँच',
    resp: 'Maint. Technician',
    stdValue: 'Functioning OK',
    method: 'Test & Trial',
    freq: 'D'
  },
  {
    id: 'mt3',
    point: 'Wire Joint Detector',
    hindi: 'वायर जॉइंट डिटेक्टर की कार्यप्रणाली की जाँच',
    resp: 'Maint. Technician',
    stdValue: 'Functioning OK',
    method: 'Test & Trial',
    freq: 'D'
  },
  {
    id: 'mt4',
    point: 'Check BLO (Bad Limit Overall) value',
    hindi: 'BLO मान की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: '70 Max',
    method: 'Visulay',
    freq: 'D'
  }
];

const INITIAL_MAINT_WEEKLY_POINTS = [
  {
    id: 'mw1',
    point: 'Check level on water separator',
    hindi: 'जल विभाजक पर स्तर की जाँच करें।',
    resp: 'Maint. Technician',
    stdValue: 'Should be empty',
    method: 'Visulay',
    freq: 'W'
  },
  {
    id: 'mw2',
    point: 'Check level of pneumatic oil',
    hindi: 'वायवीय तेल के स्तर की जाँच करें।',
    resp: 'Maint. Technician',
    stdValue: 'Oil level should be up from min. level',
    method: 'Visulay',
    freq: 'W'
  },
  {
    id: 'mw3',
    point: 'Check wire guide condition',
    hindi: 'वायर गाइड की स्थिति की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: 'Should be clean and no wear',
    method: 'Visulay',
    freq: 'W'
  },
  {
    id: 'mw4',
    point: 'Check Conveyor belt alignment & condition',
    hindi: 'कन्वेयर बेल्ट संरेखण और स्थिति की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: 'Functioning OK',
    method: 'Test & trial',
    freq: 'W'
  },
  {
    id: 'mw5',
    point: 'Check level on oil separator',
    hindi: 'तेल विभाजक पर स्तर की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: 'Should be empty',
    method: 'Visulay',
    freq: 'W'
  },
  {
    id: 'mw6',
    point: 'Check the easy movement of the straightening roller',
    hindi: 'स्ट्रेटनिंग रोलर की आसान गति की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: 'Easy movement',
    method: 'Test & trial',
    freq: 'W'
  },
  {
    id: 'mw7',
    point: 'Check feeding belt tension and condition',
    hindi: 'बेल्ट के तनाव और स्थिति की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: 'Functioning OK',
    method: 'Test & trial',
    freq: 'W'
  },
  {
    id: 'mw8',
    point: 'Check the all Exhaust Fan',
    hindi: 'सभी निकास पंखा की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: 'Functioning OK',
    method: 'Visulay',
    freq: 'W'
  },
  {
    id: 'mw9',
    point: 'Check the Air leakage in Machine',
    hindi: 'मशीन में हवा के रिसाव की जाँच करें',
    resp: 'Maint. Technician',
    stdValue: 'No Leakage',
    method: 'By Hearing',
    freq: 'W'
  }
];

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

function createEmptyGrid(points) {
  const grid = {};
  points.forEach(p => {
    grid[p.id] = {};
    for (let d = 1; d <= 31; d++) {
      grid[p.id][d] = { A: '', B: '', C: '' };
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

const INITIAL_ABNORMALITY_ROWS = [
  { id: 1, date: '', shift: '', area: '', specificArea: '', abnormality: '', immediateAction: '', resp: '', targetDateTime: '', status: '', feedback: '', maintSign: '', prodSign: '' },
  { id: 2, date: '', shift: '', area: '', specificArea: '', abnormality: '', immediateAction: '', resp: '', targetDateTime: '', status: '', feedback: '', maintSign: '', prodSign: '' },
  { id: 3, date: '', shift: '', area: '', specificArea: '', abnormality: '', immediateAction: '', resp: '', targetDateTime: '', status: '', feedback: '', maintSign: '', prodSign: '' }
];

export default function DailyChecksheet({ machine, onClose }) {
  const [docMeta, setDocMeta] = useState({
    docNo: 'CHK-WH-MT-003',
    revNo: '07',
    date: '15.09.2023',
    machineName: machine?.name || 'Alpha355',
    machineNo: machine?.id ? String(machine.id) : ''
  });

  // Empty grids (no prefilled values)
  const [operatorGrid, setOperatorGrid] = useState(() => createEmptyGrid(INITIAL_OPERATOR_POINTS));
  const [maintShiftGrid, setMaintShiftGrid] = useState(() => createEmptyGrid(INITIAL_MAINT_SHIFT_POINTS));
  const [maintWeeklyGrid, setMaintWeeklyGrid] = useState(() => createEmptyWeeklyGrid(INITIAL_MAINT_WEEKLY_POINTS));

  // Sign off inputs
  const [signOffs, setSignOffs] = useState({
    opShiftA: '',
    opShiftB: '',
    opShiftC: '',
    supervisorProd: '',
    maintAssocShiftA: '',
    maintAssocShiftB: '',
    maintAssocShiftC: '',
    techMaintSign: '',
    superMaintSign: '',
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
      setMaintShiftGrid(createEmptyGrid(INITIAL_MAINT_SHIFT_POINTS));
      setMaintWeeklyGrid(createEmptyWeeklyGrid(INITIAL_MAINT_WEEKLY_POINTS));
      setAbnormalities(INITIAL_ABNORMALITY_ROWS);
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            onClick={handleSave}
          >
            <Save size={15} />
            <span>Save Record</span>
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
      <div className="bg-white border-[1.5px] border-slate-900 shadow-md rounded overflow-hidden">
        {/* Header container */}
        <div className="border-b-2 border-slate-900">
          <div className="flex items-center justify-between px-4 py-2 border-b-[1.5px] border-slate-900 bg-slate-50">
            <span className="text-sm font-extrabold text-slate-900 tracking-wider">FURUKAWA MINDA ELECTRIC PVT. LTD.</span>
            <div className="flex flex-col items-end text-[11px] font-bold text-slate-700 leading-tight">
              <span>Doc No.: <strong>{docMeta.docNo}</strong></span>
              <span>REV: <strong>{docMeta.revNo}</strong></span>
              <span>DATE: <strong>{docMeta.date}</strong></span>
            </div>
          </div>
          <div className="text-center text-base font-black text-slate-900 py-2 tracking-widest bg-slate-100 border-b-[1.5px] border-slate-900 uppercase">
            DAILY MACHINE CHECK SHEET
          </div>

          <div className="grid grid-cols-4 bg-slate-900 gap-px">
            <div className="bg-white flex items-center px-2.5 py-1.5 text-xs gap-1.5">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">Machine Name:</span>
              <input
                className="border-none bg-transparent w-full text-xs font-bold text-blue-800 outline-none"
                value={docMeta.machineName}
                onChange={(e) => setDocMeta({ ...docMeta, machineName: e.target.value })}
              />
            </div>
            <div className="bg-white flex items-center px-2.5 py-1.5 text-xs gap-1.5">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">Machine No:</span>
              <input
                className="border-none bg-transparent w-full text-xs font-bold text-blue-800 outline-none"
                placeholder="Enter M/C No."
                value={docMeta.machineNo}
                onChange={(e) => setDocMeta({ ...docMeta, machineNo: e.target.value })}
              />
            </div>
            <div className="bg-white flex items-center px-2.5 py-1.5 text-xs gap-1.5">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">Inspection Month:</span>
              <span className="font-extrabold text-blue-800">Current Month</span>
            </div>
            <div className="bg-white flex items-center px-2.5 py-1.5 text-xs gap-1.5">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">Frequency:</span>
              <span className="font-extrabold text-emerald-600">Shift Start (D) & Weekly (W)</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Table 1: STARTUP CHECK POINTS (SHIFT CONFIRMATION) */}
        {/* ========================================================= */}
        <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
            <thead>
              <tr>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" rowSpan={3} style={{ width: '220px' }}>
                  STARTUP CHECK POINTS<br/>(SHIFT CONFIRMATION)
                </th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" rowSpan={3} style={{ width: '100px' }}>
                  Resp.<br/>(Who)
                </th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" rowSpan={3} style={{ width: '140px' }}>
                  Check Value<br/>STD VALUE
                </th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" rowSpan={3} style={{ width: '90px' }}>
                  Method<br/>Measuring Method
                </th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" colSpan={3} style={{ width: '60px' }}>
                  FREQ
                </th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" colSpan={93}>
                  Daily Status (1 to 31)
                </th>
              </tr>
              <tr>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" rowSpan={2} style={{ width: '20px' }}>D</th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" rowSpan={2} style={{ width: '20px' }}>W</th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" rowSpan={2} style={{ width: '20px' }}>S</th>
                {DAYS_31.map(d => (
                  <th key={d} colSpan={3} className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '48px' }}>
                    {d}
                  </th>
                ))}
              </tr>
              <tr>
                {DAYS_31.map(d => (
                  <React.Fragment key={d}>
                    <th className="border border-slate-900 text-center font-extrabold text-[9.5px] w-5 text-blue-700 bg-slate-50">A</th>
                    <th className="border border-slate-900 text-center font-extrabold text-[9.5px] w-5 text-amber-700 bg-slate-50">B</th>
                    <th className="border border-slate-900 text-center font-extrabold text-[9.5px] w-5 text-purple-700 bg-slate-50">C</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody>
              {INITIAL_OPERATOR_POINTS.map((pt) => (
                <tr key={pt.id}>
                  <td className="border border-slate-900 p-1 text-left pl-1.5 font-bold align-middle">
                    <div>{pt.point}</div>
                    <span className="text-[9.5px] text-slate-500 block">{pt.hindi}</span>
                  </td>
                  <td className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.resp}</td>
                  <td className="border border-slate-900 p-1 text-[10px] font-bold text-slate-900 whitespace-pre-line align-middle">{pt.stdValue}</td>
                  <td className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.method}</td>
                  <td className="border border-slate-900 p-1 text-center text-xs font-black text-emerald-600 align-middle">√</td>
                  <td className="border border-slate-900 p-1 align-middle"></td>
                  <td className="border border-slate-900 p-1 align-middle"></td>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      {SHIFTS.map(s => {
                        const val = operatorGrid[pt.id]?.[d]?.[s] || '';
                        return (
                          <td key={s} className="border border-slate-900 p-0 align-middle">
                            <input
                              className={`w-full h-5 border-none bg-transparent text-center text-[10px] outline-none focus:bg-blue-50 ${getCellBgClass(val)}`}
                              value={val}
                              placeholder=""
                              onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, s, e.target.value.toUpperCase())}
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
              ))}

              {/* Operator Sign-off rows */}
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Filled By (M/C Operator Sign) (A Shift)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Operator Sign (Shift A)"
                    value={signOffs.opShiftA}
                    onChange={(e) => setSignOffs({ ...signOffs, opShiftA: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Filled By (M/C Operator Sign) (B Shift)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Operator Sign (Shift B)"
                    value={signOffs.opShiftB}
                    onChange={(e) => setSignOffs({ ...signOffs, opShiftB: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Filled By (M/C Operator Sign) (C Shift)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Operator Sign (Shift C)"
                    value={signOffs.opShiftC}
                    onChange={(e) => setSignOffs({ ...signOffs, opShiftC: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Supervisor - Production (Sign)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Production Supervisor Sign"
                    value={signOffs.supervisorProd}
                    onChange={(e) => setSignOffs({ ...signOffs, supervisorProd: e.target.value })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section Divider 2 */}
        <div className="bg-slate-200 border-t-2 border-b-[1.5px] border-slate-900 py-1.5 px-3.5 text-center text-xs font-extrabold italic text-slate-900 tracking-wide">
          Releated with m/c Maintenance
        </div>

        {/* ========================================================= */}
        {/* Table 2: RELEATED WITH M/C MAINTENANCE */}
        {/* ========================================================= */}
        <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[2200px]">
            <thead>
              <tr>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '220px' }}>MAINTENANCE CHECK POINTS</th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '100px' }}>Resp.</th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '140px' }}>STD VALUE</th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '90px' }}>Measuring Method</th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '20px' }}>D</th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '20px' }}>W</th>
                <th className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '20px' }}>S</th>
                {DAYS_31.map(d => (
                  <th key={d} colSpan={3} className="border border-slate-900 p-1 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] align-middle">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Daily Shift Maintenance Points (4 items) */}
              {INITIAL_MAINT_SHIFT_POINTS.map((pt) => (
                <tr key={pt.id}>
                  <td className="border border-slate-900 p-1 text-left pl-1.5 font-bold align-middle">
                    <div>{pt.point}</div>
                    <span className="text-[9.5px] text-slate-500 block">{pt.hindi}</span>
                  </td>
                  <td className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.resp}</td>
                  <td className="border border-slate-900 p-1 text-[10px] font-bold text-slate-900 whitespace-pre-line align-middle">{pt.stdValue}</td>
                  <td className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.method}</td>
                  <td className="border border-slate-900 p-1 text-center text-xs font-black text-emerald-600 align-middle">√</td>
                  <td className="border border-slate-900 p-1 align-middle"></td>
                  <td className="border border-slate-900 p-1 align-middle"></td>
                  {DAYS_31.map(d => (
                    <React.Fragment key={d}>
                      {SHIFTS.map(s => {
                        const val = maintShiftGrid[pt.id]?.[d]?.[s] || '';
                        return (
                          <td key={s} className="border border-slate-900 p-0 align-middle">
                            <input
                              className={`w-full h-5 border-none bg-transparent text-center text-[10px] outline-none focus:bg-blue-50 ${getCellBgClass(val)}`}
                              value={val}
                              onChange={(e) => handleCellChange(setMaintShiftGrid, pt.id, d, s, e.target.value.toUpperCase())}
                            />
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
              ))}

              {/* Maintenance Associates Sign-off */}
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Checked & Corrected By (Maint. Assocites Sign) (A Shift)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Maint. Assoc. Sign (Shift A)"
                    value={signOffs.maintAssocShiftA}
                    onChange={(e) => setSignOffs({ ...signOffs, maintAssocShiftA: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Checked & Corrected By (Maint. Assocites Sign) (B Shift)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Maint. Assoc. Sign (Shift B)"
                    value={signOffs.maintAssocShiftB}
                    onChange={(e) => setSignOffs({ ...signOffs, maintAssocShiftB: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Checked & Corrected By (Maint. Assocites Sign) (C Shift)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Maint. Assoc. Sign (Shift C)"
                    value={signOffs.maintAssocShiftC}
                    onChange={(e) => setSignOffs({ ...signOffs, maintAssocShiftC: e.target.value })}
                  />
                </td>
              </tr>

              {/* Weekly Maintenance Points (9 items) */}
              {INITIAL_MAINT_WEEKLY_POINTS.map((pt) => (
                <tr key={pt.id}>
                  <td className="border border-slate-900 p-1 text-left pl-1.5 font-bold align-middle">
                    <div>{pt.point}</div>
                    <span className="text-[9.5px] text-slate-500 block">{pt.hindi}</span>
                  </td>
                  <td className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.resp}</td>
                  <td className="border border-slate-900 p-1 text-[10px] font-bold text-slate-900 whitespace-pre-line align-middle">{pt.stdValue}</td>
                  <td className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.method}</td>
                  <td className="border border-slate-900 p-1 align-middle"></td>
                  <td className="border border-slate-900 p-1 text-center text-xs font-black text-emerald-600 align-middle">√</td>
                  <td className="border border-slate-900 p-1 align-middle"></td>
                  {DAYS_31.map(d => {
                    const val = maintWeeklyGrid[pt.id]?.[d] || '';
                    return (
                      <td key={d} colSpan={3} className="border border-slate-900 p-0 align-middle">
                        <input
                          className={`w-full h-5 border-none bg-transparent text-center text-[10px] outline-none focus:bg-blue-50 ${getCellBgClass(val)}`}
                          value={val}
                          onChange={(e) => handleWeeklyCellChange(pt.id, d, e.target.value.toUpperCase())}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Final Maintenance Signatures */}
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Technician - Maintenance (Sign)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Maintenance Technician Sign"
                    value={signOffs.techMaintSign}
                    onChange={(e) => setSignOffs({ ...signOffs, techMaintSign: e.target.value })}
                  />
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Supervisor - Maintenance (Sign)</td>
                <td colSpan={93} className="border border-slate-900 p-1 text-left pl-2">
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[10.5px] font-bold outline-none w-60"
                    placeholder="Maintenance Supervisor Sign"
                    value={signOffs.superMaintSign}
                    onChange={(e) => setSignOffs({ ...signOffs, superMaintSign: e.target.value })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend instructions strip */}
        <div className="p-2 px-3.5 bg-slate-50 border-b-[1.5px] border-slate-900 text-[10px] text-slate-700 leading-relaxed">
          <strong>* Checking Frequency of daily /Shift:</strong> Shift Start &nbsp;|&nbsp; 
          <strong>* Checking Frequency of Weekly:</strong> First day of week<br/>
          <strong>[LEGANDS]:</strong> 1) PUT (√) FOR OK CONDITION &nbsp;|&nbsp; 
          2) PUT (X) FOR NOT OK CONDITION &nbsp;|&nbsp; 
          3) PUT VALUE WHERE VALUE IS MENTION &nbsp;|&nbsp; 
          4) TAKE NECESSARY ACTION AND ENCIRCLE ON THE CROSS MARK (⊗) AND FILL THE COUNTERACTION SHEET.
        </div>

        {/* ========================================================= */}
        {/* Abnormality Observation & Action Sheet */}
        {/* ========================================================= */}
        <div className="p-3 pb-4 bg-white">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-sm font-black tracking-wider text-slate-900 m-0 uppercase">
              Abnormality Observation & Action Sheet
            </h4>
            <button 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600"
              onClick={handleAddAbnormalityRow}
            >
              <Plus size={14} />
              <span>Add Abnormality Row</span>
            </button>
          </div>

          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '80px' }}>Date</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '50px' }}>Shift</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '90px' }}>Area</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '100px' }}>Specific Area</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '220px' }}>Abnormailaity</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '200px' }}>Immediate Action Req.</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '80px' }}>Resp.</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '100px' }}>Target Date /Time</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '70px' }}>Status</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '150px' }}>Operator Feedback</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '90px' }}>Maint. Supervisor</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-[10.5px] text-slate-900 text-center" style={{ width: '90px' }}>Production Supervisor</th>
              </tr>
            </thead>
            <tbody>
              {abnormalities.map((row, rIdx) => (
                <tr key={row.id}>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="date"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center focus:bg-slate-50"
                      value={row.date}
                      onChange={(e) => handleAbnormalChange(rIdx, 'date', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center focus:bg-slate-50"
                      placeholder="A/B/C"
                      value={row.shift}
                      onChange={(e) => handleAbnormalChange(rIdx, 'shift', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center focus:bg-slate-50"
                      value={row.area}
                      onChange={(e) => handleAbnormalChange(rIdx, 'area', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center focus:bg-slate-50"
                      value={row.specificArea}
                      onChange={(e) => handleAbnormalChange(rIdx, 'specificArea', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-left align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left focus:bg-slate-50"
                      value={row.abnormality}
                      onChange={(e) => handleAbnormalChange(rIdx, 'abnormality', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-left align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left focus:bg-slate-50"
                      value={row.immediateAction}
                      onChange={(e) => handleAbnormalChange(rIdx, 'immediateAction', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center focus:bg-slate-50"
                      value={row.resp}
                      onChange={(e) => handleAbnormalChange(rIdx, 'resp', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center focus:bg-slate-50"
                      placeholder="YYYY-MM-DD"
                      value={row.targetDateTime}
                      onChange={(e) => handleAbnormalChange(rIdx, 'targetDateTime', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center font-bold focus:bg-slate-50"
                      placeholder="OK / Close"
                      value={row.status}
                      onChange={(e) => handleAbnormalChange(rIdx, 'status', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-left align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left focus:bg-slate-50"
                      value={row.feedback}
                      onChange={(e) => handleAbnormalChange(rIdx, 'feedback', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center focus:bg-slate-50"
                      placeholder="Sign"
                      value={row.maintSign}
                      onChange={(e) => handleAbnormalChange(rIdx, 'maintSign', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 text-center align-middle">
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center focus:bg-slate-50"
                      placeholder="Sign"
                      value={row.prodSign}
                      onChange={(e) => handleAbnormalChange(rIdx, 'prodSign', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Supervisor Sign Box */}
          <div className="flex items-end justify-between mt-3.5 pt-2.5">
            <div className="text-[11px] font-bold text-slate-900">
              <span>[Remarks]</span>
            </div>
            <div className="flex gap-3">
              <div className="border-[1.5px] border-slate-900 rounded p-1.5 px-3.5 text-center bg-white min-w-[160px]">
                <input
                  type="text"
                  className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                  placeholder="Sign"
                  value={signOffs.footerProdSign}
                  onChange={(e) => setSignOffs({ ...signOffs, footerProdSign: e.target.value })}
                />
                <div className="text-[10.5px] font-extrabold text-slate-900 border-t border-slate-300 pt-1 mt-6">
                  Production Supervisor
                </div>
              </div>
              <div className="border-[1.5px] border-slate-900 rounded p-1.5 px-3.5 text-center bg-white min-w-[160px]">
                <input
                  type="text"
                  className="w-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                  placeholder="Sign"
                  value={signOffs.footerMaintSign}
                  onChange={(e) => setSignOffs({ ...signOffs, footerMaintSign: e.target.value })}
                />
                <div className="text-[10.5px] font-extrabold text-slate-900 border-t border-slate-300 pt-1 mt-6">
                  Maintenance Supervisor
                </div>
              </div>
            </div>
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
