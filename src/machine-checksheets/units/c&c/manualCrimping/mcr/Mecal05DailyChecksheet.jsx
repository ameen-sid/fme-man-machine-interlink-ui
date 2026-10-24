import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import React, { useState } from 'react';
import { CalendarCheck2, Save, RotateCcw, Plus, Trash2, ArrowLeft } from 'lucide-react';

// Operator Startup Check Points specifically for Mecal-05 Manual Crimping Press
const INITIAL_OPERATOR_POINTS = [
  {
    id: 'op1',
    point: 'Check the Cleaning of Machine, Applicator & Bench',
    hindi: 'मशीन, एप्लीकेटर और बेंच की सफाई की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'No PVC / Scrap slugs / Clean',
    method: 'Visually',
    freqD: '√'
  },
  {
    id: 'op2',
    point: 'Check Main Incoming Pneumatic Pressure',
    hindi: 'मुख्य इनकमिंग एयर प्रेशर की जाँच करें',
    resp: 'Machine Operator',
    stdValue: '0.50 - 0.60 MPa',
    method: 'Pressure Gauge',
    freqD: '√'
  },
  {
    id: 'op3',
    point: 'Check Main Power Switch & Indicator Lights',
    hindi: 'पावर स्विच और इंडिकेटर लाइट चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Functioning OK',
    method: 'Visual / Switch',
    freqD: '√'
  },
  {
    id: 'op4',
    point: 'Check Emergency Stop Push Button Functioning',
    hindi: 'इमरजेंसी स्टॉप स्विच के फंक्शन को चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Press stops instantly',
    method: 'Test & Trial',
    freqD: '√'
  },
  {
    id: 'op5',
    point: 'Check Safety Cover / Eye Guard Interlock',
    hindi: 'सुरक्षा कवर इंटरलॉक की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'Machine will not operate with cover open',
    method: 'Test & Trial',
    freqD: '√'
  },
  {
    id: 'op6',
    point: 'Check Foot Pedal Switch & Cable Condition',
    hindi: 'फुट पेडल स्विच और केबल की स्थिति चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Smooth actuation, no damage',
    method: 'Test & Trial',
    freqD: '√'
  },
  {
    id: 'op7',
    point: 'Check Crimp Force Monitor (CFM) Status',
    hindi: 'क्रिम फोर्स मॉनिटर (CFM) स्थिति चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Power ON, Normal status',
    method: 'Display View',
    freqD: '√'
  },
  {
    id: 'op8',
    point: 'Check Terminal Feed Finger & Pitch Setting',
    hindi: 'टर्मिनल फीड फिंगर और पिच सेटिंग चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Smooth feeding, no jamming',
    method: 'Visual & Trial',
    freqD: '√'
  },
  {
    id: 'op9',
    point: 'Check Terminal Reel Brake & Guide Tension',
    hindi: 'टर्मिनल रील ब्रेक और टेंशन चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Proper tension, no over-spin',
    method: 'Manual Check',
    freqD: '√'
  },
  {
    id: 'op10',
    point: 'Check Slug / Scrap Chute Cleared',
    hindi: 'स्क्रैप / कटिंग स्लग बॉक्स साफ करें',
    resp: 'Machine Operator',
    stdValue: 'Chute clean, no accumulation',
    method: 'Visually',
    freqD: '√'
  },
  {
    id: 'op11',
    point: 'Check Wire Stop & Strip Miss Locator',
    hindi: 'वायर स्टॉप और स्ट्रिप मिस लोकेटर चेक करें',
    resp: 'Machine Operator',
    stdValue: 'Firmly locked in position',
    method: 'Visual & Trial',
    freqD: '√'
  },
  {
    id: 'op12',
    point: 'Check Applicator Oil Pot / Lubricator Level',
    hindi: 'ऑयल पॉट में तेल की उपलब्धता की जाँच करें',
    resp: 'Machine Operator',
    stdValue: 'Oil level above minimum mark',
    method: 'Visually',
    freqD: '√'
  }
];

// Maintenance Daily Confirmation Points
const INITIAL_MAINT_SHIFT_POINTS = [
  {
    id: 'mt1',
    point: 'Check Ram Slide Backlash & Play',
    hindi: 'रैम स्लाइड प्ले और संरेखण चेक करें',
    resp: 'Maint. Technician',
    stdValue: '< 0.05 mm',
    method: 'Dial Gauge / Feel',
    freqD: '√'
  },
  {
    id: 'mt2',
    point: 'Drain Pneumatic Air Filter Water Trap',
    hindi: 'एयर फिल्टर वाटर सेपरेटर खाली करें',
    resp: 'Maint. Technician',
    stdValue: 'Should be dry/empty',
    method: 'Visually',
    freqD: '√'
  },
  {
    id: 'mt3',
    point: 'Check Anvil & Crimper Tooling Condition',
    hindi: 'एनविल और क्रिम्पर टूल की स्थिति चेक करें',
    resp: 'Maint. Technician',
    stdValue: 'No chipping, crack or burr',
    method: 'Magnifier / Visual',
    freqD: '√'
  },
  {
    id: 'mt4',
    point: 'Check Terminal Cutter Blade Clearance',
    hindi: 'टर्मिनल कटर ब्लेड क्लीयरेंस चेक करें',
    resp: 'Maint. Technician',
    stdValue: 'Clean shear cut, no burr',
    method: 'Visual & Trial',
    freqD: '√'
  }
];

// Maintenance Weekly Points
const INITIAL_MAINT_WEEKLY_POINTS = [
  {
    id: 'mw1',
    point: 'Lubricate Ram Slide Guides & Bearings',
    hindi: 'रैम स्लाइड गाइड और बेयरिंग की ग्रीसिंग करें',
    resp: 'Maint. Technician',
    stdValue: 'Grease Shell Alvania / ISO VG 46',
    method: 'Grease Gun',
    freqW: '√'
  },
  {
    id: 'mw2',
    point: 'Check Electrical Grounding & Safety Loop',
    hindi: 'अर्थिंग और इलेक्ट्रिकल सुरक्षा चेक करें',
    resp: 'Maint. Technician',
    stdValue: '< 1.0 Ohm, Ground OK',
    method: 'Multimeter',
    freqW: '√'
  },
  {
    id: 'mw3',
    point: 'Check Drive Belt Tension & Motor Flywheel',
    hindi: 'ड्राइव बेल्ट टेंशन और फ्लाईव्हील चेक करें',
    resp: 'Maint. Technician',
    stdValue: 'Belt deflection 5-8 mm',
    method: 'Manual Deflection',
    freqW: '√'
  },
  {
    id: 'mw4',
    point: 'CFM Load Cell Calibration Verification',
    hindi: 'CFM लोड सेल कैलिब्रेशन सत्यापन',
    resp: 'Maint. Technician',
    stdValue: 'Calibration within tolerance',
    method: 'Master Sample',
    freqW: '√'
  }
];

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

export default function Mecal05DailyChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'MCR';
  const modelName = machine?.model || 'Mecal-05';
  const displayMachine = `${machineName} (${modelName})`;

  const [headerInfo, setHeaderInfo] = useState({
    docNo: 'CHK-WH-MT-003',
    rev: '07',
    formatNo: 'FME-MCR-MECAL-05',
    machineName: displayMachine,
    processName: 'Manual Crimping',
    month: 'OCTOBER',
    year: '2026',
    plant: 'Bawal'
  });

  // Operator check grid state: { [pointId]: { [day]: { A, B, C } } }
  const [operatorGrid, setOperatorGrid] = useState(() => {
    const grid = {};
    INITIAL_OPERATOR_POINTS.forEach((p) => {
      grid[p.id] = {};
      DAYS_31.forEach((d) => {
        grid[p.id][d] = { A: '', B: '', C: '' };
      });
    });
    return grid;
  });

  // Maintenance daily grid state
  const [maintDailyGrid, setMaintDailyGrid] = useState(() => {
    const grid = {};
    INITIAL_MAINT_SHIFT_POINTS.forEach((p) => {
      grid[p.id] = {};
      DAYS_31.forEach((d) => {
        grid[p.id][d] = { A: '' };
      });
    });
    return grid;
  });

  // Maintenance weekly grid state (weeks 1 to 5)
  const [maintWeeklyGrid, setMaintWeeklyGrid] = useState(() => {
    const grid = {};
    INITIAL_MAINT_WEEKLY_POINTS.forEach((p) => {
      grid[p.id] = { W1: '', W2: '', W3: '', W4: '', W5: '' };
    });
    return grid;
  });

  // Abnormality action rows
  const [abnormalities, setAbnormalities] = useState([
    { id: 1, date: '', shift: 'A', problem: '', action: '', status: 'Resolved', sign: '' }
  ]);

  const [savedToast, setSavedToast] = useState('');

  const handleOperatorCellChange = (pointId, day, shift, val) => {
    setOperatorGrid((prev) => ({
      ...prev,
      [pointId]: {
        ...prev[pointId],
        [day]: {
          ...prev[pointId][day],
          [shift]: val
        }
      }
    }));
  };

  const handleMaintDailyCellChange = (pointId, day, val) => {
    setMaintDailyGrid((prev) => ({
      ...prev,
      [pointId]: {
        ...prev[pointId],
        [day]: {
          ...prev[pointId][day],
          A: val
        }
      }
    }));
  };

  const handleMaintWeeklyCellChange = (pointId, week, val) => {
    setMaintWeeklyGrid((prev) => ({
      ...prev,
      [pointId]: {
        ...prev[pointId],
        [week]: val
      }
    }));
  };

  const handleAddAbnormality = () => {
    setAbnormalities((prev) => [
      ...prev,
      { id: prev.length + 1, date: '', shift: 'A', problem: '', action: '', status: 'Resolved', sign: '' }
    ]);
  };

  const handleRemoveAbnormality = (idx) => {
    if (abnormalities.length <= 1) return;
    setAbnormalities((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in the Mecal-05 Daily Checksheet?')) {
      const resetOp = {};
      INITIAL_OPERATOR_POINTS.forEach((p) => {
        resetOp[p.id] = {};
        DAYS_31.forEach((d) => {
          resetOp[p.id][d] = { A: '', B: '', C: '' };
        });
      });
      setOperatorGrid(resetOp);
      setSavedToast('Mecal-05 Daily Checksheet reset successfully');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleSave = () => {
    setSavedToast('Mecal-05 Daily Checksheet saved successfully!');
    setTimeout(() => setSavedToast(''), 3000);
  };

  return (
    <div className="flex flex-col gap-4 w-full text-slate-800">
      <ChecksheetHeaderNav
        title="MECAL-05 DAILY MACHINE CHECKSHEET"
        subtitle={`${displayMachine} — Daily Maintenance & Abnormality Action Checksheet`}
        icon={CalendarCheck2}
        iconBgClass="bg-emerald-100 text-emerald-700"
        onClose={onClose}
        onReset={handleReset}
        onSave={handleSave}
        savedToast={savedToast}
      />

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between">
          <span>✓ {savedToast}</span>
          <button
            type="button"
            className="text-emerald-700 font-bold hover:underline"
            onClick={() => setSavedToast('')}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Table Container */}
      <div className="bg-white border-2 border-black p-3 shadow-lg rounded-sm overflow-x-auto">
        <div className="min-w-[1980px] w-max select-text text-black">
          {/* Top Form Header */}
          <div className="border border-black p-2 bg-slate-50 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-base font-black text-black m-0 uppercase">
                  FURUKAWA MINDA ELECTRIC PVT. LTD.
                </h1>
                <h2 className="text-sm font-extrabold text-slate-800 m-0 uppercase">
                  DAILY MACHINE CHECK SHEET & ABNORMALITY ACTION SHEET (MECAL-05)
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs font-bold text-slate-800">
              <span>DOC NO: {headerInfo.docNo} Rev.{headerInfo.rev}</span>
              <span>MACHINE: {headerInfo.machineName}</span>
              <span>PROCESS: {headerInfo.processName}</span>
              <span>MONTH: {headerInfo.month} {headerInfo.year}</span>
            </div>
          </div>

          {/* Section 1: Operator Checkpoints */}
          <div className="bg-slate-200 text-xs font-black p-1.5 border border-black border-b-0 flex items-center justify-between">
            <span>PART 1: OPERATOR STARTUP CHECK POINTS (CONFIRMATION EVERY SHIFT A, B, C)</span>
            <span className="text-[11px] font-bold">Judgement: (✓ = OK, ✗ = NG)</span>
          </div>
          <table className="w-full border-collapse border border-black text-center text-[10.5px] mb-4">
            <thead>
              <tr className="bg-slate-100 font-bold">
                <th rowSpan={2} className="border border-black p-1 w-10">Sr.</th>
                <th rowSpan={2} className="border border-black p-1 w-64 text-left">Check Point</th>
                <th rowSpan={2} className="border border-black p-1 w-24">Resp.</th>
                <th rowSpan={2} className="border border-black p-1 w-44 text-left">Standard Value</th>
                <th rowSpan={2} className="border border-black p-1 w-20">Method</th>
                <th rowSpan={2} className="border border-black p-1 w-12">Shift</th>
                {DAYS_31.map((d) => (
                  <th key={d} className="border border-black p-0.5 w-12 text-center text-[10px]">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INITIAL_OPERATOR_POINTS.map((pt, idx) => (
                <React.Fragment key={pt.id}>
                  {SHIFTS.map((shift, sIdx) => (
                    <tr key={`${pt.id}_${shift}`} className="hover:bg-yellow-50/30">
                      {sIdx === 0 && (
                        <>
                          <td rowSpan={3} className="border border-black p-1 font-bold">
                            {idx + 1}
                          </td>
                          <td rowSpan={3} className="border border-black p-1 text-left font-semibold">
                            <div>{pt.point}</div>
                            <div className="text-[9.5px] text-slate-500 font-normal">{pt.hindi}</div>
                          </td>
                          <td rowSpan={3} className="border border-black p-1 text-[10px]">
                            {pt.resp}
                          </td>
                          <td rowSpan={3} className="border border-black p-1 text-left font-bold text-slate-700">
                            {pt.stdValue}
                          </td>
                          <td rowSpan={3} className="border border-black p-1 text-[10px]">
                            {pt.method}
                          </td>
                        </>
                      )}
                      <td className="border border-black p-0.5 font-bold bg-slate-50">{shift}</td>
                      {DAYS_31.map((d) => {
                        const val = operatorGrid[pt.id]?.[d]?.[shift] || '';
                        return (
                          <td key={d} className="border border-black p-0">
                            <input
                              type="text"
                              className="w-full h-5 text-center text-[11px] font-bold border-none outline-none bg-transparent hover:bg-yellow-50 focus:bg-white"
                              value={val}
                              placeholder="✓"
                              onChange={(e) => handleOperatorCellChange(pt.id, d, shift, e.target.value)}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Section 2: Maintenance Daily Checkpoints */}
          <div className="bg-slate-200 text-xs font-black p-1.5 border border-black border-b-0 flex items-center justify-between">
            <span>PART 2A: MAINTENANCE DAILY CHECK POINTS</span>
            <span className="text-[11px] font-bold">Technician Daily Confirmation</span>
          </div>
          <table className="w-full border-collapse border border-black text-center text-[10.5px] mb-4">
            <thead>
              <tr className="bg-slate-100 font-bold">
                <th className="border border-black p-1 w-10">Sr.</th>
                <th className="border border-black p-1 w-64 text-left">Check Point</th>
                <th className="border border-black p-1 w-24">Resp.</th>
                <th className="border border-black p-1 w-44 text-left">Standard Value</th>
                <th className="border border-black p-1 w-20">Method</th>
                <th className="border border-black p-1 w-12">Freq</th>
                {DAYS_31.map((d) => (
                  <th key={d} className="border border-black p-0.5 w-12 text-center text-[10px]">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INITIAL_MAINT_SHIFT_POINTS.map((pt, idx) => (
                <tr key={pt.id} className="hover:bg-yellow-50/30">
                  <td className="border border-black p-1 font-bold">{idx + 1}</td>
                  <td className="border border-black p-1 text-left font-semibold">
                    <div>{pt.point}</div>
                    <div className="text-[9.5px] text-slate-500 font-normal">{pt.hindi}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]">{pt.resp}</td>
                  <td className="border border-black p-1 text-left font-bold text-slate-700">{pt.stdValue}</td>
                  <td className="border border-black p-1 text-[10px]">{pt.method}</td>
                  <td className="border border-black p-0.5 font-bold bg-slate-50">Daily</td>
                  {DAYS_31.map((d) => {
                    const val = maintDailyGrid[pt.id]?.[d]?.A || '';
                    return (
                      <td key={d} className="border border-black p-0">
                        <input
                          type="text"
                          className="w-full h-6 text-center text-[11px] font-bold border-none outline-none bg-transparent hover:bg-yellow-50 focus:bg-white"
                          value={val}
                          placeholder="✓"
                          onChange={(e) => handleMaintDailyCellChange(pt.id, d, e.target.value)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Section 3: Maintenance Weekly Checkpoints */}
          <div className="bg-slate-200 text-xs font-black p-1.5 border border-black border-b-0 flex items-center justify-between">
            <span>PART 2B: MAINTENANCE WEEKLY CHECK POINTS</span>
            <span className="text-[11px] font-bold">5 Weeks Tracking</span>
          </div>
          <table className="w-full border-collapse border border-black text-center text-[10.5px] mb-4">
            <thead>
              <tr className="bg-slate-100 font-bold">
                <th className="border border-black p-1 w-10">Sr.</th>
                <th className="border border-black p-1 w-80 text-left">Check Point</th>
                <th className="border border-black p-1 w-28">Resp.</th>
                <th className="border border-black p-1 w-64 text-left">Standard Value</th>
                <th className="border border-black p-1 w-24">Method</th>
                <th className="border border-black p-1 w-20">Week 1</th>
                <th className="border border-black p-1 w-20">Week 2</th>
                <th className="border border-black p-1 w-20">Week 3</th>
                <th className="border border-black p-1 w-20">Week 4</th>
                <th className="border border-black p-1 w-20">Week 5</th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_MAINT_WEEKLY_POINTS.map((pt, idx) => (
                <tr key={pt.id} className="hover:bg-yellow-50/30">
                  <td className="border border-black p-1 font-bold">{idx + 1}</td>
                  <td className="border border-black p-1 text-left font-semibold">
                    <div>{pt.point}</div>
                    <div className="text-[9.5px] text-slate-500 font-normal">{pt.hindi}</div>
                  </td>
                  <td className="border border-black p-1 text-[10px]">{pt.resp}</td>
                  <td className="border border-black p-1 text-left font-bold text-slate-700">{pt.stdValue}</td>
                  <td className="border border-black p-1 text-[10px]">{pt.method}</td>
                  {['W1', 'W2', 'W3', 'W4', 'W5'].map((wk) => (
                    <td key={wk} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-6 text-center text-xs font-bold border-none outline-none bg-transparent hover:bg-yellow-50 focus:bg-white"
                        value={maintWeeklyGrid[pt.id]?.[wk] || ''}
                        placeholder="✓"
                        onChange={(e) => handleMaintWeeklyCellChange(pt.id, wk, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Section 4: Abnormality Action Sheet */}
          <div className="flex items-center justify-between bg-slate-200 text-xs font-black p-1.5 border border-black border-b-0">
            <span>PART 3: ABNORMALITY RECORD & ACTION SHEET</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[11px] font-bold bg-white px-2 py-0.5 rounded border border-slate-300 hover:bg-slate-100 cursor-pointer"
              onClick={handleAddAbnormality}
            >
              <Plus size={12} />
              <span>Add Abnormality Record</span>
            </button>
          </div>
          <table className="w-full border-collapse border border-black text-center text-[11px] mb-2">
            <thead>
              <tr className="bg-slate-100 font-bold">
                <th className="border border-black p-1 w-10">Sr.</th>
                <th className="border border-black p-1 w-28">Date</th>
                <th className="border border-black p-1 w-16">Shift</th>
                <th className="border border-black p-1 text-left w-96">Problem Description</th>
                <th className="border border-black p-1 text-left">Action Taken</th>
                <th className="border border-black p-1 w-28">Status</th>
                <th className="border border-black p-1 w-28">Sign</th>
                <th className="border border-black p-1 w-12">Act</th>
              </tr>
            </thead>
            <tbody>
              {abnormalities.map((item, idx) => (
                <tr key={item.id} className="hover:bg-yellow-50/30">
                  <td className="border border-black p-1 font-bold">{idx + 1}</td>
                  <td className="border border-black p-0">
                    <input
                      type="date"
                      className="w-full h-7 text-center text-xs border-none outline-none bg-transparent"
                      value={item.date}
                      onChange={(e) => {
                        const copy = [...abnormalities];
                        copy[idx].date = e.target.value;
                        setAbnormalities(copy);
                      }}
                    />
                  </td>
                  <td className="border border-black p-0">
                    <select
                      className="w-full h-7 text-center font-bold text-xs border-none outline-none bg-transparent cursor-pointer"
                      value={item.shift}
                      onChange={(e) => {
                        const copy = [...abnormalities];
                        copy[idx].shift = e.target.value;
                        setAbnormalities(copy);
                      }}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </td>
                  <td className="border border-black p-0 text-left">
                    <input
                      type="text"
                      className="w-full h-7 px-2 text-xs border-none outline-none bg-transparent"
                      placeholder="Describe abnormality..."
                      value={item.problem}
                      onChange={(e) => {
                        const copy = [...abnormalities];
                        copy[idx].problem = e.target.value;
                        setAbnormalities(copy);
                      }}
                    />
                  </td>
                  <td className="border border-black p-0 text-left">
                    <input
                      type="text"
                      className="w-full h-7 px-2 text-xs border-none outline-none bg-transparent"
                      placeholder="Action taken to correct..."
                      value={item.action}
                      onChange={(e) => {
                        const copy = [...abnormalities];
                        copy[idx].action = e.target.value;
                        setAbnormalities(copy);
                      }}
                    />
                  </td>
                  <td className="border border-black p-0">
                    <select
                      className="w-full h-7 text-center font-bold text-xs border-none outline-none bg-transparent cursor-pointer"
                      value={item.status}
                      onChange={(e) => {
                        const copy = [...abnormalities];
                        copy[idx].status = e.target.value;
                        setAbnormalities(copy);
                      }}
                    >
                      <option value="Resolved">Resolved</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td className="border border-black p-0">
                    <input
                      type="text"
                      className="w-full h-7 text-center text-xs border-none outline-none bg-transparent"
                      placeholder="Tech Sign"
                      value={item.sign}
                      onChange={(e) => {
                        const copy = [...abnormalities];
                        copy[idx].sign = e.target.value;
                        setAbnormalities(copy);
                      }}
                    />
                  </td>
                  <td className="border border-black p-0">
                    <button
                      type="button"
                      className="w-full h-7 text-slate-400 hover:text-rose-600 flex items-center justify-center cursor-pointer"
                      onClick={() => handleRemoveAbnormality(idx)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signatures */}
          <div className="flex items-center justify-between border border-black p-2 bg-slate-50 text-xs font-bold text-slate-800">
            <div>Shift Incharge: <span className="font-semibold underline decoration-dotted">Confirmed Daily</span></div>
            <div>Maintenance Engineer: <span className="font-semibold underline decoration-dotted">Weekly Review OK</span></div>
            <div>Plant Head: <span className="font-semibold underline decoration-dotted">Approved</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
