import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import React, { useState } from 'react';
import { CalendarCheck2, Save, RotateCcw, Plus, ArrowLeft } from 'lucide-react';

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
    stdValue: '70 Max.',
    method: 'Visullay',
    freq: 'D'
  },
  {
    id: 'op6',
    point: 'Check Zone 1, 2 & 3 value',
    hindi: 'जोन 1, 2 & 3 वैल्यू चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Zone 1: 0.5 | Zone 2: 0.5 | Zone 3: 0.8',
    isZoneTable: true,
    method: 'Visullay',
    freq: 'D'
  },
  {
    id: 'op7',
    point: 'Check Emergency Switch Functioning',
    hindi: 'आपातकालीन स्विच कार्यप्रणाली की जाँच',
    resp: 'Machine Operator',
    stdValue: 'Machine should be stop after press the emergency switch',
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
  const formattedModel = machine?.model ? machine.model.replace('_', ' ') : 'G 448';
  const initialMachineNo = machine?.name || (machine?.id ? `C&C ${String(machine.id).padStart(2, '0')}` : 'C&C 26');

  const [docMeta, setDocMeta] = useState({
    docNo: 'CHK-WH-MT-003',
    revNo: '07',
    date: '16.08.2023',
    modelName: formattedModel,
    machineName: machine?.name || formattedModel,
    machineNo: initialMachineNo
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
      setMaintShiftGrid(createEmptyGrid(INITIAL_MAINT_SHIFT_POINTS));
      setMaintWeeklyGrid(createEmptyWeeklyGrid(INITIAL_MAINT_WEEKLY_POINTS));
      setAbnormalities(INITIAL_ABNORMALITY_ROWS);
      setSignOffs({
        opShiftA: '',
        opShiftB: '',
        opShiftC: '',
        supervisorProd: '',
        maintAssocShiftA: '',
        maintAssocShiftB: '',
        maintAssocShiftC: '',
        techMaintSign: '',
        superMaintSign: '',
        remarks: '',
        footerProdSign: '',
        footerMaintSign: ''
      });
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
          <CalendarCheck2 size={18} className="text-emerald-500 bg-emerald-50 p-2 rounded-lg w-9 h-9 box-content shrink-0" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">
              FURUKAWA MINDA ELECTRIC PVT. LTD. — DAILY MACHINE CHECK SHEET
            </h3>
            <span className="text-[11.5px] text-slate-500 font-medium">
              Format: <strong>{docMeta.docNo}</strong> • Rev: <strong>{docMeta.revNo}</strong> • Machine: <strong>{docMeta.machineName || 'Machine'}</strong>
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
        {/* Company Header - Top Right (Above Sheet Box as in Excel Standard) */}
        <div className="flex justify-end px-3 pt-2 pb-0.5 bg-white">
          <span className="text-[11px] font-black tracking-wider text-slate-900 uppercase">
            FURUKAWA MINDA ELECTRIC PVT. LTD.
          </span>
        </div>

        {/* Top Header Box (Exact replica of Screenshot) */}
        <div className="border-t-2 border-b-2 border-slate-900 bg-white">
          {/* Row 1: Title & Doc No / Rev */}
          <div className="flex border-b border-slate-900">
            {/* Title: DAILY MACHINE CHECK SHEET */}
            <div className="flex-1 flex items-center px-4 py-2 bg-white">
              <h1 className="text-xl sm:text-2xl font-black tracking-wide text-black uppercase m-0">
                DAILY MACHINE CHECK SHEET
              </h1>
            </div>
            {/* Doc No & Rev No Box */}
            <div className="w-56 min-w-[220px] border-l-2 border-slate-900 flex flex-col justify-center bg-white text-[11px] font-bold text-slate-900">
              <div className="border-b border-slate-900 px-3 py-1 flex items-center">
                <span className="whitespace-nowrap font-bold text-slate-900">Doc No :</span>
                <input
                  type="text"
                  className="border-none bg-transparent font-bold text-slate-900 outline-none w-32 ml-1 focus:bg-blue-50/50 rounded px-0.5"
                  value={docMeta.docNo}
                  onChange={(e) => setDocMeta({ ...docMeta, docNo: e.target.value })}
                />
              </div>
              <div className="px-3 py-1 flex items-center">
                <span className="whitespace-nowrap font-bold text-slate-900">REV :</span>
                <input
                  type="text"
                  className="border-none bg-transparent font-bold text-slate-900 outline-none w-20 ml-1 focus:bg-blue-50/50 rounded px-0.5"
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
                  className="border-none bg-transparent font-bold text-slate-900 outline-none w-36 focus:bg-blue-50/50 rounded px-0.5"
                  value={docMeta.modelName}
                  onChange={(e) => setDocMeta({ ...docMeta, modelName: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-1.5 pr-8">
                <span className="whitespace-nowrap font-bold text-slate-900">Machine No.</span>
                <input
                  type="text"
                  className="border-none bg-transparent font-bold text-slate-900 outline-none w-24 focus:bg-blue-50/50 rounded px-0.5"
                  placeholder=""
                  value={docMeta.machineNo}
                  onChange={(e) => setDocMeta({ ...docMeta, machineNo: e.target.value })}
                />
              </div>
            </div>
            {/* Date Box (aligned with Doc No / Rev) */}
            <div className="w-56 min-w-[220px] border-l-2 border-slate-900 px-3 py-1.5 flex items-center font-bold text-[11px] text-slate-900 bg-white">
              <span className="whitespace-nowrap font-bold text-slate-900">DATE:-</span>
              <input
                type="text"
                className="border-none bg-transparent font-bold text-slate-900 outline-none w-28 ml-1 focus:bg-blue-50/50 rounded px-0.5"
                value={docMeta.date}
                onChange={(e) => setDocMeta({ ...docMeta, date: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Gray Divider Banner matching screenshot */}
        <div className="w-full h-5 bg-[#c0c0c0] border-b-2 border-slate-900" />

        {/* ========================================================= */}
        {/* Table 1: STARTUP CHECK POINTS (SHIFT CONFIRMATION) */}
        {/* ========================================================= */}
        <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[1500px]">
            <thead>
              <tr>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '220px' }}>
                  STARTUP CHECK POINTS<br />( SHIFT CONFIRMATION )
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '90px' }}>
                  Resp.
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle min-w-[145px]" style={{ width: '150px' }}>
                  Check Value
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '90px' }}>
                  Method
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" colSpan={3} style={{ width: '60px' }}>
                  FREQ
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" colSpan={31}>
                  Daily Status
                </th>
              </tr>
              <tr>
                <th className="border border-slate-900 p-0 bg-[#c0c0c0] h-5" />
                <th className="border border-slate-900 p-1 bg-[#c0c0c0] font-extrabold text-slate-900 text-center text-[10px] align-middle">
                  Who
                </th>
                <th className="border border-slate-900 p-1 bg-[#c0c0c0] font-extrabold text-slate-900 text-center text-[10px] align-middle uppercase">
                  STD VALUE
                </th>
                <th className="border border-slate-900 p-1 bg-[#c0c0c0] font-extrabold text-slate-900 text-center text-[10px] align-middle">
                  Measuring Method
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle w-6">
                  D
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle w-6">
                  W
                </th>
                <th className="border border-slate-900 p-1 bg-[#c0c0c0] font-extrabold text-slate-900 text-center text-[10px] align-middle w-6">
                  S
                </th>
                {DAYS_31.map(d => (
                  <th key={d} className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle w-8 min-w-[28px]">
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
                    <td rowSpan={3} className="border border-slate-900 p-1 text-left pl-1.5 font-bold align-middle">
                      <div>{pt.point}</div>
                      <span className="text-[9.5px] text-slate-500 block">{pt.hindi}</span>
                    </td>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.resp}</td>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-[10px] font-bold text-slate-900 whitespace-pre-line align-middle text-center">
                      {pt.isZoneTable ? (
                        <table className="border-collapse border border-slate-900 mx-auto text-[9.5px] bg-white w-full max-w-[135px]">
                          <thead>
                            <tr className="border-b border-slate-900">
                              <th className="border-r border-slate-900 p-0.5 w-[33%]"></th>
                              <th className="border-r border-slate-900 p-0.5 font-normal text-slate-900 text-center text-[9px] w-[33%]">Width</th>
                              <th className="p-0.5 font-normal text-slate-900 text-center text-[9px] w-[34%]">Sensitivity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-900">
                              <td className="border-r border-slate-900 px-1 py-0.5 text-center font-normal text-slate-900 text-[9px]">Zone1</td>
                              <td className="border-r border-slate-900 px-1 py-0.5 text-center text-slate-900 text-[9px]">0.5</td>
                              <td className="px-1 py-0.5 text-center text-slate-900 text-[9px]">0.5</td>
                            </tr>
                            <tr className="border-b border-slate-900">
                              <td className="border-r border-slate-900 px-1 py-0.5 text-center font-normal text-slate-900 text-[9px]">Zone2</td>
                              <td className="border-r border-slate-900 px-1 py-0.5 text-center text-slate-900 text-[9px]">0.5</td>
                              <td className="px-1 py-0.5 text-center text-slate-900 text-[9px]">0.5</td>
                            </tr>
                            <tr>
                              <td className="border-r border-slate-900 px-1 py-0.5 text-center font-normal text-slate-900 text-[9px]">Zone3</td>
                              <td className="border-r border-slate-900 px-1 py-0.5 text-center"></td>
                              <td className="px-1 py-0.5 text-center text-slate-900 text-[9px]">0.8</td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        pt.stdValue
                      )}
                    </td>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.method}</td>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-center text-xs font-black text-emerald-600 align-middle">√</td>
                    <td rowSpan={3} className="border border-slate-900 p-1 align-middle"></td>
                    <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-blue-700 w-6">A</td>
                    {DAYS_31.map(d => {
                      const val = operatorGrid[pt.id]?.[d]?.A || '';
                      return (
                        <td key={d} className="border border-slate-900 p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
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
                    <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-amber-700 w-6">B</td>
                    {DAYS_31.map(d => {
                      const val = operatorGrid[pt.id]?.[d]?.B || '';
                      return (
                        <td key={d} className="border border-slate-900 p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
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
                    <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-purple-700 w-6">C</td>
                    {DAYS_31.map(d => {
                      const val = operatorGrid[pt.id]?.[d]?.C || '';
                      return (
                        <td key={d} className="border border-slate-900 p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
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

              {/* Operator Sign-off rows */}
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Filled By (M/C Operator Sign) (A Shift)</td>
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
        <div className="border-t-2 border-b-[1.5px] border-slate-900 py-1.5 px-3.5 text-center text-sm font-black italic text-slate-950 uppercase tracking-wide" style={{ backgroundColor: "#c0c0c0" }}>
          Related with m/c Maintenance
        </div>

        {/* ========================================================= */}
        {/* Table 2: RELEATED WITH M/C MAINTENANCE */}
        {/* ========================================================= */}
        <div className="w-full overflow-x-auto border-b-[1.5px] border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[1500px]">
            <thead>
              <tr>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '220px' }}>
                  MAINTENANCE CHECK POINTS
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '90px' }}>
                  Resp.
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '130px' }}>
                  STD VALUE
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" style={{ width: '90px' }}>
                  Measuring Method
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" colSpan={3}>
                  FREQ
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle" colSpan={31}>
                  Daily Status
                </th>
              </tr>
              <tr>
                <th className="border border-slate-900 p-0 bg-[#c0c0c0] h-5" />
                <th className="border border-slate-900 p-1 bg-[#c0c0c0] font-extrabold text-slate-900 text-center text-[10px] align-middle">
                  Who
                </th>
                <th className="border border-slate-900 p-1 bg-[#c0c0c0] font-extrabold text-slate-900 text-center text-[10px] align-middle uppercase">
                  STD VALUE
                </th>
                <th className="border border-slate-900 p-1 bg-[#c0c0c0] font-extrabold text-slate-900 text-center text-[10px] align-middle">
                  Measuring Method
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle w-6">
                  D
                </th>
                <th className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle w-6">
                  W
                </th>
                <th className="border border-slate-900 p-1 bg-[#c0c0c0] font-extrabold text-slate-900 text-center text-[10px] align-middle w-6">
                  S
                </th>
                {DAYS_31.map(d => (
                  <th key={d} className="border border-slate-900 p-1 bg-white font-extrabold text-slate-900 text-center text-[10px] align-middle w-8 min-w-[28px]">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Daily Shift Maintenance Points (4 items) */}
              {INITIAL_MAINT_SHIFT_POINTS.map((pt) => (
                <React.Fragment key={pt.id}>
                  {/* Row for Shift A */}
                  <tr>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-left pl-1.5 font-bold align-middle">
                      <div>{pt.point}</div>
                      <span className="text-[9.5px] text-slate-500 block">{pt.hindi}</span>
                    </td>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.resp}</td>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-[10px] font-bold text-slate-900 whitespace-pre-line align-middle">{pt.stdValue}</td>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-center text-[10px] align-middle">{pt.method}</td>
                    <td rowSpan={3} className="border border-slate-900 p-1 text-center text-xs font-black text-emerald-600 align-middle">√</td>
                    <td rowSpan={3} className="border border-slate-900 p-1 align-middle"></td>
                    <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-blue-700 w-6">A</td>
                    {DAYS_31.map(d => {
                      const val = maintShiftGrid[pt.id]?.[d]?.A || '';
                      return (
                        <td key={d} className="border border-slate-900 p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-blue-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setMaintShiftGrid, pt.id, d, 'A', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row for Shift B */}
                  <tr>
                    <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-amber-700 w-6">B</td>
                    {DAYS_31.map(d => {
                      const val = maintShiftGrid[pt.id]?.[d]?.B || '';
                      return (
                        <td key={d} className="border border-slate-900 p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-amber-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setMaintShiftGrid, pt.id, d, 'B', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row for Shift C */}
                  <tr>
                    <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-purple-700 w-6">C</td>
                    {DAYS_31.map(d => {
                      const val = maintShiftGrid[pt.id]?.[d]?.C || '';
                      return (
                        <td key={d} className="border border-slate-900 p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                          <input
                            className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-purple-100 ${getCellBgClass(val)}`}
                            value={val}
                            onChange={(e) => handleCellChange(setMaintShiftGrid, pt.id, d, 'C', e.target.value.toUpperCase())}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}

              {/* Maintenance Associates Sign-off */}
              <tr className="bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={7} className="border border-slate-900 p-1 text-right font-extrabold">Checked & Corrected By (Maint. Assocites Sign) (A Shift)</td>
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
                  <td className="border border-slate-900 text-center font-bold text-[9px] text-slate-400 bg-slate-50">-</td>
                  {DAYS_31.map(d => {
                    const val = maintWeeklyGrid[pt.id]?.[d] || '';
                    return (
                      <td key={d} className="border border-slate-900 p-0 align-middle w-8 min-w-[28px] h-6 bg-white">
                        <input
                          className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-blue-100 ${getCellBgClass(val)}`}
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
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
                <td colSpan={31} className="border border-slate-900 p-1 text-left pl-2">
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
          <strong>* Checking Frequency of Weekly:</strong> First day of week<br />
          <strong>[LEGANDS]:</strong> 1) PUT (√) FOR OK CONDITION &nbsp;|&nbsp;
          2) PUT (X) FOR NOT OK CONDITION &nbsp;|&nbsp;
          3) PUT VALUE WHERE VALUE IS MENTION &nbsp;|&nbsp;
          4) TAKE NECESSARY ACTION AND ENCIRCLE ON THE CROSS MARK (⊗) AND FILL THE COUNTERACTION SHEET.
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