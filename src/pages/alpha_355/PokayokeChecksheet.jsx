import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Save, 
  RotateCcw, 
  Plus, 
  Eye, 
  Camera, 
  Cpu, 
  Layers 
} from 'lucide-react';

// Master initial items directly from user's provided Poka-Yoke format
const INITIAL_POKAYOKE_ITEMS = [
  {
    id: 1,
    srNo: 1,
    process: 'Inserting the Outer Cap and Seal',
    pokayokeName: 'Pika-Pika system (Picking insertion)',
    photoType: 'pika',
    checkingMethod: 'Check the part presence sensor, select the model and remove the required material from pika-pika system on the process after that model should not pass.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('')
    }
  },
  {
    id: 2,
    srNo: 2,
    process: 'MCR12 Shield Ring Crimping',
    pokayokeName: 'CFM (Crimp Force Monitor)',
    photoType: 'cfm',
    checkingMethod: '• Checked by increasing or decreasing conductors, in running setup, CFM will give Error.\n• For less/More crimping height, CFM will give Error.\n• Finger lock condition check.\n• Error circuit should be cut by Chopper cutter.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('OK')
    }
  },
  {
    id: 3,
    srNo: 3,
    process: 'MCR12 Shield Ring Crimping',
    pokayokeName: 'Camera Vision',
    photoType: 'camera',
    checkingMethod: 'Insert the wrong dimension dummy sample in Jig, Camera vision detect this wrong dimention.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('')
    }
  },
  {
    id: 4,
    srNo: 4,
    process: 'Ferrule Crimp',
    pokayokeName: 'Camera Vision',
    photoType: 'camera',
    checkingMethod: 'Insert the wrong dimension dummy sample in Jig, Camera vision detect this wrong dimention.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('')
    }
  },
  {
    id: 5,
    srNo: 5,
    process: 'Ferrule Crimp',
    pokayokeName: 'Inner Ferrule Presence Sensor',
    photoType: 'sensor',
    checkingMethod: '• To check the Inner Ferrule presence sensor, remove the inner ferrule from the sample wire and then insert it into the jig the sensor should then not pass.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('OK')
    }
  },
  {
    id: 6,
    srNo: 6,
    process: 'Ferrule Crimp',
    pokayokeName: 'Outer Ferrule Presence Sensor',
    photoType: 'sensor',
    checkingMethod: '• To check the Outer Ferrule presence sensor, remove the Outer ferrule from the sample wire and then insert it into the jig the sensor should then not pass.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('OK')
    }
  },
  {
    id: 7,
    srNo: 7,
    process: 'MCR15 Manual Crimping',
    pokayokeName: 'CFM (Crimp Force Monitor)',
    photoType: 'cfm',
    checkingMethod: '• Checked by increasing or decreasing conductors, in running setup, CFM will give Error.\n• For less/More crimping height, CFM will give Error.\n• Finger lock condition check.\n• Error circuit should be cut by Chopper cutter.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('')
    }
  },
  {
    id: 8,
    srNo: 8,
    process: 'Joint Crimping (Jnt-01)',
    pokayokeName: 'CFM (Crimp Force Monitor)',
    photoType: 'cfm',
    checkingMethod: '• Checked by increasing or decreasing conductors, in running setup, CFM will give Error.\n• For less/More crimping height, CFM will give Error.\n• Finger lock condition check.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('')
    }
  },
  {
    id: 9,
    srNo: 9,
    process: 'Joint Crimping (Jnt-02)',
    pokayokeName: 'CFM (Crimp Force Monitor)',
    photoType: 'cfm',
    checkingMethod: '• Checked by increasing or decreasing conductors, in running setup, CFM will give Error.\n• For less/More crimping height, CFM will give Error.\n• Finger lock condition check.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('')
    }
  },
  {
    id: 10,
    srNo: 10,
    process: 'Heat Shrinking (HS - 1)',
    pokayokeName: 'Heat Temperature',
    photoType: 'temp',
    checkingMethod: '• IN SCREEN (VISUAL): Temp should be set 300°C ± 5°C.\n• To check, if the temperature is less the standard, insert the slider, after that slider should be automatically come out.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('')
    }
  },
  {
    id: 11,
    srNo: 11,
    process: 'Heat Shrinking (HS - 2)',
    pokayokeName: 'Heat Temperature',
    photoType: 'temp',
    checkingMethod: '• IN SCREEN (VISUAL): Temp should be set 300°C ± 5°C.\n• To check, if the temperature is less the standard, insert the slider, after that slider should be automatically come out.',
    shifts: {
      A: Array(20).fill('OK'),
      B: Array(20).fill('')
    }
  }
];

const INITIAL_OBSERVATIONS = [
  { id: 1, date: '2026-09-02', observation: 'CFM error triggered due to conductor count mismatch', rootCause: 'Operator loaded wrong core count', actionPlan: 'Retrained operator on core count check standard', responsibility: 'Shift Leader', targetDate: '2026-09-03', reviewStatus: 'Closed' },
  { id: 2, date: '', observation: '', rootCause: '', actionPlan: '', responsibility: '', targetDate: '', reviewStatus: '' }
];

export default function PokayokeChecksheet({ machine, onClose }) {
  const [items, setItems] = useState(INITIAL_POKAYOKE_ITEMS);
  const [observations, setObservations] = useState(INITIAL_OBSERVATIONS);
  const [savedToast, setSavedToast] = useState('');
  const [checkedByLeader, setCheckedByLeader] = useState('Anil Kumar');
  const [verifiedByIncharge, setVerifiedByIncharge] = useState('Sunil Verma');

  const [headerInfo, setHeaderInfo] = useState({
    docNo: 'FFM-WH-QA-096',
    revDate: '01.06.26',
    issueDate: '01.06.26',
    station: machine?.name || 'C&C 01',
    line: 'Assembly Line #02',
    monthYear: 'September 2026'
  });

  const handleStatusChange = (itemIdx, shift, dayIdx, value) => {
    setItems(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[itemIdx].shifts[shift][dayIdx] = value;
      return copy;
    });
  };

  const handleObsChange = (idx, field, value) => {
    setObservations(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleAddObservation = () => {
    setObservations(prev => [
      ...prev,
      {
        id: prev.length + 1,
        date: '',
        observation: '',
        rootCause: '',
        actionPlan: '',
        responsibility: '',
        targetDate: '',
        reviewStatus: ''
      }
    ]);
  };

  const handleSave = () => {
    setSavedToast(`Pokayoke Checksheet successfully saved for ${headerInfo.station}!`);
    setTimeout(() => setSavedToast(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this Pokayoke Checksheet to standard initial state?')) {
      setItems(INITIAL_POKAYOKE_ITEMS);
      setObservations(INITIAL_OBSERVATIONS);
    }
  };

  // Render photo mock icon & thumbnail based on user image type
  const renderPhotoCard = (type) => {
    switch (type) {
      case 'pika':
        return (
          <div className="border border-slate-300 rounded bg-white p-1 flex flex-col items-center gap-1">
            <div className="w-[76px] h-[52px] rounded flex items-center justify-center text-[9px] font-extrabold text-white bg-gradient-to-br from-sky-600 to-sky-700">
              <Layers size={18} />
            </div>
            <span className="text-[9px] text-slate-500 font-bold">Pika System</span>
          </div>
        );
      case 'cfm':
        return (
          <div className="border border-slate-300 rounded bg-white p-1 flex flex-col items-center gap-1">
            <div className="w-[76px] h-[52px] rounded flex items-center justify-center text-[9px] font-extrabold text-white bg-gradient-to-br from-slate-900 to-slate-700">
              <Cpu size={18} />
            </div>
            <span className="text-[9px] text-slate-500 font-bold">CFM Screen</span>
          </div>
        );
      case 'camera':
        return (
          <div className="border border-slate-300 rounded bg-white p-1 flex flex-col items-center gap-1">
            <div className="w-[76px] h-[52px] rounded flex items-center justify-center text-[9px] font-extrabold text-white bg-gradient-to-br from-emerald-600 to-emerald-800">
              <Camera size={18} />
            </div>
            <span className="text-[9px] text-slate-500 font-bold">Vision Jig</span>
          </div>
        );
      case 'sensor':
        return (
          <div className="border border-slate-300 rounded bg-white p-1 flex flex-col items-center gap-1">
            <div className="w-[76px] h-[52px] rounded flex items-center justify-center text-[9px] font-extrabold text-white bg-gradient-to-br from-amber-600 to-amber-700">
              <Eye size={18} />
            </div>
            <span className="text-[9px] text-slate-500 font-bold">Ferrule Jig</span>
          </div>
        );
      case 'temp':
        return (
          <div className="border border-slate-300 rounded bg-white p-1 flex flex-col items-center gap-1">
            <div className="w-[76px] h-[52px] rounded flex items-center justify-center text-xs font-bold text-red-500 font-mono bg-gray-900 border border-gray-700">
              <span>300°C</span>
            </div>
            <span className="text-[9px] text-slate-500 font-bold">Temp Sensor</span>
          </div>
        );
      default:
        return (
          <div className="border border-slate-300 rounded bg-white p-1 flex flex-col items-center gap-1">
            <div className="w-[76px] h-[52px] rounded flex items-center justify-center text-[9px] font-extrabold text-white bg-gradient-to-br from-slate-900 to-slate-700">
              <ShieldAlert size={18} />
            </div>
            <span className="text-[9px] text-slate-500 font-bold">Pokayoke</span>
          </div>
        );
    }
  };

  const daysList = Array.from({ length: 20 }, (_, i) => i + 1);

  const getSelectClass = (val) => {
    if (val === 'OK') return 'bg-emerald-100 text-emerald-800 font-black';
    if (val === 'NG') return 'bg-rose-100 text-rose-800 font-black';
    return 'text-slate-400 font-bold';
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-50 transition-all duration-200">
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldAlert size={18} className="text-rose-600 bg-rose-50 p-2 rounded-lg w-9 h-9 box-content" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">
              FURUKAWA MINDA ELECTRIC PVT. LTD. — POKA-YOKE CHECKSHEET
            </h3>
            <span className="text-[11.5px] text-slate-500 font-medium">
              Format: <strong>{headerInfo.docNo}</strong> • Station: <strong>{headerInfo.station}</strong> • Verification Frequency: Daily Shifts (A & B)
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

      {/* Main Sheet Paper Layout */}
      <div className="bg-white border-[1.5px] border-slate-900 shadow-md rounded overflow-hidden">
        {/* Header container */}
        <div className="border-b-2 border-slate-900 bg-white">
          <div className="flex items-center justify-between p-2.5 px-4 border-b-[1.5px] border-slate-900 bg-slate-50">
            <span className="text-base font-extrabold text-slate-900 tracking-wider">FURUKAWA MINDA ELECTRIC PVT. LTD.</span>
            <div className="flex flex-col items-end text-[11px] font-bold text-slate-700 leading-tight">
              <span>DOC NO: <strong>{headerInfo.docNo}</strong></span>
              <span>REV DATE: <strong>{headerInfo.revDate}</strong></span>
              <span>ISSUE DATE: <strong>{headerInfo.issueDate}</strong></span>
            </div>
          </div>
          <div className="text-center text-sm font-black text-slate-900 p-2 tracking-wider bg-yellow-200 border-b-[1.5px] border-slate-900 uppercase">
            POKA-YOKE DAILY VERIFICATION AND INSPECTION CHECK SHEET
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-4 bg-slate-900 gap-px">
            <div className="bg-white flex items-center p-1.5 px-2.5 text-xs gap-1.5">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">MACHINE / STATION:</span>
              <input 
                className="border-none bg-transparent w-full text-xs font-bold text-blue-800 outline-none" 
                value={headerInfo.station}
                onChange={(e) => setHeaderInfo({ ...headerInfo, station: e.target.value })}
              />
            </div>
            <div className="bg-white flex items-center p-1.5 px-2.5 text-xs gap-1.5">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">LINE / PROCESS:</span>
              <input 
                className="border-none bg-transparent w-full text-xs font-bold text-blue-800 outline-none" 
                value={headerInfo.line}
                onChange={(e) => setHeaderInfo({ ...headerInfo, line: e.target.value })}
              />
            </div>
            <div className="bg-white flex items-center p-1.5 px-2.5 text-xs gap-1.5">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">MONTH & YEAR:</span>
              <input 
                className="border-none bg-transparent w-full text-xs font-bold text-blue-800 outline-none" 
                value={headerInfo.monthYear}
                onChange={(e) => setHeaderInfo({ ...headerInfo, monthYear: e.target.value })}
              />
            </div>
            <div className="bg-white flex items-center p-1.5 px-2.5 text-xs gap-1.5">
              <span className="font-extrabold text-slate-900 whitespace-nowrap">CHECKED FREQUENCY:</span>
              <span className="font-extrabold text-emerald-600 text-[11px]">Shift-wise (A & B)</span>
            </div>
          </div>
        </div>

        {/* Toolbar Guide */}
        <div className="flex items-center justify-between bg-slate-100 p-2 px-3.5 border-b-[1.5px] border-slate-900 text-xs gap-3">
          <div className="flex items-center gap-3 font-semibold text-slate-600">
            <span>JUDGEMENT CRITERIA:</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-300">OK = Pokayoke Active / Pass</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-extrabold bg-rose-100 text-rose-700 border border-rose-300">NG = Pokayoke Bypass / Fail</span>
          </div>
          <span className="text-[11px] text-slate-500 italic">
            ↔ Scroll horizontally to inspect days 1 to 20
          </span>
        </div>

        {/* Master Pokayoke Grid */}
        <div className="w-full overflow-x-auto border-b-2 border-slate-900">
          <table className="w-full border-collapse font-sans text-[11px] min-w-[1600px]">
            <thead>
              <tr>
                <th className="border border-slate-900 p-1 bg-slate-50 text-slate-900 font-extrabold text-center text-[11px]" rowSpan={3} style={{ width: '40px' }}>Sr. No</th>
                <th className="border border-slate-900 p-1 bg-slate-50 text-slate-900 font-extrabold text-center text-[11px]" rowSpan={3} style={{ width: '130px' }}>Machine Name / Process</th>
                <th className="border border-slate-900 p-1 bg-slate-50 text-slate-900 font-extrabold text-center text-[11px]" rowSpan={3} style={{ width: '110px' }}>Poka-Yoke Name</th>
                <th className="border border-slate-900 p-1 bg-slate-50 text-slate-900 font-extrabold text-center text-[11px]" rowSpan={3} style={{ width: '90px' }}>PHOTO</th>
                <th className="border border-slate-900 p-1 bg-slate-50 text-slate-900 font-extrabold text-center text-[11px]" rowSpan={3} style={{ width: '260px' }}>CHECKING METHOD</th>
                <th className="border border-slate-900 p-1 bg-slate-50 text-slate-900 font-extrabold text-center text-[11px]" rowSpan={3} style={{ width: '32px' }}>Shift</th>
                <th className="border border-slate-900 p-1 bg-slate-50 text-slate-900 font-extrabold text-center text-[11px]" colSpan={20}>Date: September 2026</th>
              </tr>
              <tr>
                {daysList.map(d => (
                  <th key={d} className="border border-slate-900 text-[10.5px] font-extrabold p-1 bg-slate-100 text-center w-12 min-w-[48px]">
                    {String(d).padStart(2, '0')}
                  </th>
                ))}
              </tr>
              <tr>
                {daysList.map(d => (
                  <th key={d} className="border border-slate-900 text-[9.5px] font-bold text-slate-600 text-center bg-slate-50 py-0.5">
                    Status<br/>OK/NG
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {items.map((item, itemIdx) => {
                return (
                  <React.Fragment key={item.id}>
                    {/* Shift A Row */}
                    <tr>
                      <td rowSpan={2} className="border border-slate-900 p-1 text-center font-extrabold align-middle">{item.srNo}</td>
                      <td rowSpan={2} className="border border-slate-900 font-bold p-1.5 px-2 align-middle">{item.process}</td>
                      <td rowSpan={2} className="border border-slate-900 font-extrabold text-blue-800 p-1.5 px-2 align-middle">{item.pokayokeName}</td>
                      <td rowSpan={2} className="border border-slate-900 p-1 text-center w-[90px] min-w-[90px] bg-slate-50 align-middle">
                        {renderPhotoCard(item.photoType)}
                      </td>
                      <td rowSpan={2} className="border border-slate-900 text-[10.5px] leading-snug text-slate-800 max-w-[280px] p-1.5 px-2 align-middle">
                        <div className="whitespace-pre-line">{item.checkingMethod}</div>
                      </td>
                      <td className="border border-slate-900 text-center font-extrabold text-slate-900 bg-slate-50 w-[22px] align-middle">A</td>

                      {/* Shift A day cells */}
                      {daysList.map((_, dayIdx) => {
                        const val = item.shifts.A[dayIdx] || '';
                        return (
                          <td key={dayIdx} className="border border-slate-900 p-0 align-middle">
                            <select
                              className={`w-full h-6 text-[10px] font-extrabold text-center border border-transparent rounded cursor-pointer outline-none transition-all ${getSelectClass(val)}`}
                              value={val}
                              onChange={(e) => handleStatusChange(itemIdx, 'A', dayIdx, e.target.value)}
                            >
                              <option value="">-</option>
                              <option value="OK">OK</option>
                              <option value="NG">NG</option>
                            </select>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Shift B Row */}
                    <tr>
                      <td className="border border-slate-900 text-center font-extrabold text-slate-900 bg-slate-50 w-[22px] align-middle">B</td>
                      {daysList.map((_, dayIdx) => {
                        const val = item.shifts.B[dayIdx] || '';
                        return (
                          <td key={dayIdx} className="border border-slate-900 p-0 align-middle">
                            <select
                              className={`w-full h-6 text-[10px] font-extrabold text-center border border-transparent rounded cursor-pointer outline-none transition-all ${getSelectClass(val)}`}
                              value={val}
                              onChange={(e) => handleStatusChange(itemIdx, 'B', dayIdx, e.target.value)}
                            >
                              <option value="">-</option>
                              <option value="OK">OK</option>
                              <option value="NG">NG</option>
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}

              {/* Signatures Row */}
              <tr className="bg-slate-50 font-bold text-xs">
                <td colSpan={5} className="border border-slate-900 p-1.5 px-2.5 text-right font-extrabold">Checked by: Leader</td>
                <td colSpan={21} className="border border-slate-900 p-1.5 px-2.5">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>Signature / Name:</span>
                    <input 
                      type="text" 
                      className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[11px] font-bold text-slate-900 outline-none w-48" 
                      value={checkedByLeader} 
                      onChange={(e) => setCheckedByLeader(e.target.value)} 
                    />
                  </div>
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-xs">
                <td colSpan={5} className="border border-slate-900 p-1.5 px-2.5 text-right font-extrabold">Verified By: Shift Incharge</td>
                <td colSpan={21} className="border border-slate-900 p-1.5 px-2.5">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>Signature / Name:</span>
                    <input 
                      type="text" 
                      className="border border-slate-300 bg-white px-2 py-0.5 rounded text-[11px] font-bold text-slate-900 outline-none w-48" 
                      value={verifiedByIncharge} 
                      onChange={(e) => setVerifiedByIncharge(e.target.value)} 
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Observation Section (CAPA) */}
        <div className="p-3 px-3.5 pb-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-black text-slate-900 m-0 uppercase tracking-wide">
              Poka Yoke Observation & Corrective Action (CAPA)
            </h4>
            <button 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600"
              onClick={handleAddObservation}
            >
              <Plus size={14} />
              <span>Add Observation Row</span>
            </button>
          </div>

          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-slate-900 text-center" style={{ width: '110px' }}>Date</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-slate-900 text-center" style={{ width: '220px' }}>Observation</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-slate-900 text-center" style={{ width: '200px' }}>Root Cause</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-slate-900 text-center" style={{ width: '220px' }}>Action Plan</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-slate-900 text-center" style={{ width: '130px' }}>Responsibility</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-slate-900 text-center" style={{ width: '100px' }}>Target Date</th>
                <th className="border border-slate-900 p-1.5 bg-slate-100 font-extrabold text-slate-900 text-center" style={{ width: '110px' }}>Review Status</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs, oIdx) => (
                <tr key={obs.id}>
                  <td className="border border-slate-900 p-1.5 align-middle">
                    <input 
                      type="date" 
                      className="w-full border-none bg-transparent text-[11px] font-sans text-slate-900 outline-none focus:bg-slate-50" 
                      value={obs.date} 
                      onChange={(e) => handleObsChange(oIdx, 'date', e.target.value)} 
                    />
                  </td>
                  <td className="border border-slate-900 p-1.5 align-middle">
                    <input 
                      type="text" 
                      className="w-full border-none bg-transparent text-[11px] font-sans text-slate-900 outline-none focus:bg-slate-50" 
                      placeholder="e.g. CFM sensor detected loose contact" 
                      value={obs.observation} 
                      onChange={(e) => handleObsChange(oIdx, 'observation', e.target.value)} 
                    />
                  </td>
                  <td className="border border-slate-900 p-1.5 align-middle">
                    <input 
                      type="text" 
                      className="w-full border-none bg-transparent text-[11px] font-sans text-slate-900 outline-none focus:bg-slate-50" 
                      placeholder="e.g. Cable wear / alignment shift" 
                      value={obs.rootCause} 
                      onChange={(e) => handleObsChange(oIdx, 'rootCause', e.target.value)} 
                    />
                  </td>
                  <td className="border border-slate-900 p-1.5 align-middle">
                    <input 
                      type="text" 
                      className="w-full border-none bg-transparent text-[11px] font-sans text-slate-900 outline-none focus:bg-slate-50" 
                      placeholder="e.g. Replaced cable and recalibrated" 
                      value={obs.actionPlan} 
                      onChange={(e) => handleObsChange(oIdx, 'actionPlan', e.target.value)} 
                    />
                  </td>
                  <td className="border border-slate-900 p-1.5 align-middle">
                    <input 
                      type="text" 
                      className="w-full border-none bg-transparent text-[11px] font-sans text-slate-900 outline-none focus:bg-slate-50" 
                      placeholder="e.g. Shift Incharge" 
                      value={obs.responsibility} 
                      onChange={(e) => handleObsChange(oIdx, 'responsibility', e.target.value)} 
                    />
                  </td>
                  <td className="border border-slate-900 p-1.5 align-middle">
                    <input 
                      type="date" 
                      className="w-full border-none bg-transparent text-[11px] font-sans text-slate-900 outline-none focus:bg-slate-50" 
                      value={obs.targetDate} 
                      onChange={(e) => handleObsChange(oIdx, 'targetDate', e.target.value)} 
                    />
                  </td>
                  <td className="border border-slate-900 p-1.5 align-middle">
                    <select
                      className="w-full border-none bg-transparent text-[11px] font-sans text-slate-900 outline-none font-bold focus:bg-slate-50"
                      value={obs.reviewStatus}
                      onChange={(e) => handleObsChange(oIdx, 'reviewStatus', e.target.value)}
                    >
                      <option value="">-</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Document Stamp */}
        <div className="flex items-center justify-between p-1.5 px-3.5 bg-slate-100 border-t border-slate-900 text-[10.5px] font-bold text-slate-600">
          <span>DOC NO: <strong>FFM-WH-QA-096</strong></span>
          <span>REV DATE: <strong>01.06.26</strong></span>
          <span>ISSUE DATE: <strong>01.06.26</strong></span>
          <span>FURUKAWA MINDA ELECTRIC PVT. LTD. — QUALITY ASSURANCE</span>
        </div>
      </div>
    </div>
  );
}
