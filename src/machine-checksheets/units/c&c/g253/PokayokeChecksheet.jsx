import React, { useState } from 'react';
import { ShieldAlert, Save, RotateCcw, Plus, Eye, Camera, X, Image as ImageIcon, ArrowLeft } from 'lucide-react';

const createEmptyShifts = () => ({
  A: Array(31).fill(''),
  B: Array(31).fill(''),
  C: Array(31).fill('')
});

// Master initial items directly from user's provided Poka-Yoke format
const INITIAL_POKAYOKE_ITEMS = [
  {
    id: 1,
    srNo: 1,
    process: 'Inserting the Outer Cap and Seal',
    pokayokeName: 'Pika-Pika system (Picking insertion)',
    photoType: 'pika',
    checkingMethod: 'Check the part presence sensor, select the model and remove the required material from pika-pika system on the process after that model should not pass.',
    shifts: createEmptyShifts()
  },
  {
    id: 2,
    srNo: 2,
    process: 'MCR12 Shield Ring Crimping',
    pokayokeName: 'CFM (Crimp Force Monitor)',
    photoType: 'cfm',
    checkingMethod: '• Checked by increasing or decreasing conductors, in running setup, CFM will give Error.\n• For less/More crimping height, CFM will give Error.\n• Finger lock condition check.\n• Error circuit should be cut by Chopper cutter.',
    shifts: createEmptyShifts()
  },
  {
    id: 3,
    srNo: 3,
    process: 'MCR12 Shield Ring Crimping',
    pokayokeName: 'Camera Vision',
    photoType: 'camera',
    checkingMethod: 'Insert the wrong dimension dummy sample in Jig, Camera vision detect this wrong dimention.',
    shifts: createEmptyShifts()
  },
  {
    id: 4,
    srNo: 4,
    process: 'Ferrule Crimp',
    pokayokeName: 'Camera Vision',
    photoType: 'camera',
    checkingMethod: 'Insert the wrong dimension dummy sample in Jig, Camera vision detect this wrong dimention.',
    shifts: createEmptyShifts()
  },
  {
    id: 5,
    srNo: 5,
    process: 'Ferrule Crimp',
    pokayokeName: 'Inner Ferrule Presence Sensor',
    photoType: 'sensor',
    checkingMethod: '• To check the Inner Ferrule presence sensor, remove the inner ferrule from the sample wire and then insert it into the jig the sensor should then not pass.',
    shifts: createEmptyShifts()
  },
  {
    id: 6,
    srNo: 6,
    process: 'Ferrule Crimp',
    pokayokeName: 'Outer Ferrule Presence Sensor',
    photoType: 'sensor',
    checkingMethod: '* To check the Outer ferrule presence sensor, remove the Outer ferrule from the sample wire and then insert it into the jig the sensor should then not pass.',
    shifts: createEmptyShifts()
  },
  {
    id: 7,
    srNo: 7,
    process: 'M/CR 15\nManual Crimping',
    pokayokeName: 'CFM',
    photoType: 'cfm',
    checkingMethod: '* Checked by increasing or decreasing conductors, in running setup, CFM will give Error.\n* For less /More crimping heigh, CFM will give Error.\n\n*Finger lock condition check\n\n* Error circuit should be cut by Chopper cutter',
    shifts: createEmptyShifts()
  },
  {
    id: 8,
    srNo: 8,
    process: 'Joint\nCrimping\n(J/cr-05)',
    pokayokeName: 'CFM',
    photoType: 'cfm',
    checkingMethod: '* Checked by increasing or decreasing conductors, in running setup, CFM will give Error.\n* For less /More crimping heigh, CFM will give Error.\n\n*Finger lock condition check\n\n* Error circuit should be cut by Chopper cutter',
    shifts: createEmptyShifts()
  },
  {
    id: 9,
    srNo: 9,
    process: '(J/cr-06)',
    pokayokeName: 'CFM',
    photoType: 'cfm',
    checkingMethod: '* Checked by increasing or decreasing conductors, in running setup, CFM will give Error.\n* For less /More crimping heigh, CFM will give Error.\n\n*Finger lock condition check\n\n* Error circuit should be cut by Chopper cutter',
    shifts: createEmptyShifts()
  },
  {
    id: 10,
    srNo: 10,
    process: 'Heat\nShrinking\n(H/s - 3)',
    pokayokeName: 'Heat\nTemperature',
    photoType: 'temp',
    checkingMethod: 'ON SCREEN (VISUAL).\nTemp. should be set 300°c ± 5°c\n* To check, if the temperature is less the standard, insert the slider,after that slider should be automatically come out.',
    shifts: createEmptyShifts()
  },
  {
    id: 11,
    srNo: 11,
    process: 'Heat\nShrinking\n(H/s - 1)',
    pokayokeName: 'Heat\nTemperature',
    photoType: 'temp',
    checkingMethod: 'ON SCREEN (VISUAL).\nTemp. should be set 300°c ± 5°c\n* To check, if the temperature is less the standard, insert the slider,after that slider should be automatically come out.',
    shifts: createEmptyShifts()
  }
];

const INITIAL_OBSERVATIONS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  date: '',
  observation: '',
  rootCause: '',
  actionPlan: '',
  responsibility: '',
  targetDate: '',
  reviewStatus: ''
}));

export default function PokayokeChecksheet({ machine, onClose }) {
  const [items, setItems] = useState(INITIAL_POKAYOKE_ITEMS);
  const [observations, setObservations] = useState(INITIAL_OBSERVATIONS);
  const [savedToast, setSavedToast] = useState('');
  const [checkedByLeader, setCheckedByLeader] = useState('');
  const [verifiedByIncharge, setVerifiedByIncharge] = useState('');

  const formattedModel = machine?.model ? machine.model.replace('_', ' ') : 'G 253';
  const initialStation = machine?.name ? `${machine.name} (${formattedModel})` : formattedModel;

  const [headerInfo, setHeaderInfo] = useState({
    docNo: 'FFM-WH-QA-096',
    revDate: '',
    issueDate: '',
    station: initialStation,
    line: '',
    monthYear: ''
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

  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoUpload = (itemIdx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setItems(prev => {
        const copy = [...prev];
        copy[itemIdx] = { ...copy[itemIdx], customPhoto: dataUrl };
        return copy;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (itemIdx, e) => {
    e.stopPropagation();
    setItems(prev => {
      const copy = [...prev];
      copy[itemIdx] = { ...copy[itemIdx], customPhoto: null };
      return copy;
    });
  };

  const DEFAULT_PHOTO_MAP = {
    pika: '/pokayoke/pika.png',
    cfm: '/pokayoke/cfm.png',
    camera: '/pokayoke/camera.png',
    sensor: '/pokayoke/ferrule_sensor.png',
    temp: '/pokayoke/temp_controller.png',
  };

  // Render photo card with upload, view, change, and remove functionality
  const renderPhotoCard = (item, itemIdx) => {
    const fileInputId = `photo-upload-${item.id}`;
    const photoSrc = item.customPhoto || DEFAULT_PHOTO_MAP[item.photoType] || null;

    if (photoSrc) {
      return (
        <div className="flex flex-col items-center justify-center p-0.5 relative group">
          <input
            id={fileInputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handlePhotoUpload(itemIdx, e.target.files[0]);
            }}
          />
          <div
            className="w-[74px] max-h-[76px] overflow-hidden relative cursor-pointer border border-slate-400 bg-white shadow-none"
            onClick={() => setPhotoPreview({ url: photoSrc, title: item.pokayokeName, process: item.process })}
            title="Click to view photo full size"
          >
            <img src={photoSrc} alt={item.pokayokeName} className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
              <span className="p-1 rounded-full bg-white/90 text-slate-900 shadow">
                <Eye size={12} />
              </span>
            </div>
          </div>
          <label
            htmlFor={fileInputId}
            className="text-[8.5px] font-bold text-blue-600 hover:underline cursor-pointer mt-0.5"
            title="Change Photo"
          >
            Change
          </label>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center p-1">
        <input
          id={fileInputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handlePhotoUpload(itemIdx, e.target.files[0]);
          }}
        />
        <label
          htmlFor={fileInputId}
          className="w-[70px] h-[52px] border border-dashed border-slate-300 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 text-slate-500 hover:text-blue-600 transition-all gap-0.5"
          title="Click to add photo"
        >
          <Camera size={14} />
          <span className="text-[8.5px] font-bold">+ Photo</span>
        </label>
      </div>
    );
  };

  const daysList = Array.from({ length: 31 }, (_, i) => i + 1);

  const getSelectClass = (val) => {
    if (val === 'OK') return 'bg-emerald-100 text-emerald-800 font-black';
    if (val === 'NG') return 'bg-rose-100 text-rose-800 font-black';
    return 'text-slate-400 font-bold';
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-50 transition-all duration-200">
      {/* Top Floating Control Bar */}
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
          <ShieldAlert size={18} className="text-rose-600 bg-rose-50 p-2 rounded-lg w-9 h-9 box-content shrink-0" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">
              FURUKAWA MINDA ELECTRIC PVT. LTD. — POKA-YOKE CHECKSHEET
            </h3>
            <span className="text-[11.5px] text-slate-500 font-medium">
              Format: <strong>{headerInfo.docNo || 'FFM-WH-QA-096'}</strong> • Station: <strong>{headerInfo.station || machine?.name || 'Machine'}</strong> • Verification Frequency: Daily Shifts (A, B & C)
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

      {/* Main Sheet Paper Layout — starts directly with main table */}
      <div className="bg-white border-[1.5px] border-slate-900 shadow-md rounded overflow-hidden">
        {/* Master Pokayoke Grid */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse font-sans text-[11px] min-w-[2050px]">
            <thead>
              {/* Row 0: Top Header row matching screenshot */}
              <tr className="bg-white border-b-2 border-slate-900">
                <th
                  colSpan={5}
                  className="border border-slate-900 py-2 px-3 text-center text-sm font-black text-slate-900 tracking-wide bg-white"
                >
                  Poka Yoke Checked By QA
                </th>
                <th
                  colSpan={daysList.length + 1}
                  className="border border-slate-900 py-2 px-4 text-left text-xs font-black text-slate-900 tracking-wide bg-white"
                >
                  {machine?.name || headerInfo.station || headerInfo.line || 'YY-8 Line'}
                </th>
              </tr>

              {/* Row 1: Main column headers */}
              <tr className="bg-white border-b border-slate-900">
                <th rowSpan={2} className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[11px] w-10">
                  Sr.No
                </th>
                <th rowSpan={2} className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[11px] leading-tight w-[130px]">
                  Machine Name /<br />Process
                </th>
                <th rowSpan={2} className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[11px] leading-tight w-[120px]">
                  Poka-Yoke<br />Name
                </th>
                <th rowSpan={2} className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[11px] w-[85px]">
                  PHOTO
                </th>
                <th rowSpan={2} className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[11px] w-[260px]">
                  CHECKING METHOD
                </th>
                <th className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[10.5px] w-9">
                  Date:-
                </th>
                {daysList.map(d => (
                  <th key={d} className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[11px] w-12 min-w-[46px]">
                    {d}
                  </th>
                ))}
              </tr>

              {/* Row 2: Shift label & Status OK/NG */}
              <tr className="bg-white border-b-2 border-slate-900">
                <th className="border border-slate-900 p-1 font-black text-slate-900 text-center text-[10.5px]">
                  Shift
                </th>
                {daysList.map(d => (
                  <th key={d} className="border border-slate-900 py-1 px-0.5 font-bold text-slate-800 text-center text-[9px] leading-tight">
                    Status<br />OK/NG
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {items.map((item, itemIdx) => {
                return (
                  <React.Fragment key={item.id}>
                    {/* Shift A Row */}
                    <tr className="border-b border-slate-300">
                      <td rowSpan={3} className="border border-slate-900 p-1 text-center font-bold align-middle text-slate-900 text-[11px]">
                        {item.srNo}
                      </td>
                      <td rowSpan={3} className="border border-slate-900 p-1.5 px-2 text-center align-middle whitespace-pre-line text-slate-900 font-medium text-[11px] leading-snug">
                        {item.process}
                      </td>
                      <td rowSpan={3} className="border border-slate-900 p-1.5 px-2 text-center align-middle whitespace-pre-line text-slate-900 font-bold text-[11px] leading-snug">
                        {item.pokayokeName}
                      </td>
                      <td rowSpan={3} className="border border-slate-900 p-1 text-center w-[85px] min-w-[85px] bg-white align-middle">
                        {renderPhotoCard(item, itemIdx)}
                      </td>
                      <td rowSpan={3} className="border border-slate-900 text-[10px] font-bold text-slate-900 leading-snug p-2 align-middle max-w-[280px] text-center">
                        <div className="whitespace-pre-line">{item.checkingMethod}</div>
                      </td>
                      <td className="border border-slate-900 text-center font-black text-slate-900 bg-white w-9 h-10 align-middle text-xs">
                        A
                      </td>

                      {/* Shift A day cells */}
                      {daysList.map((_, dayIdx) => {
                        const val = item.shifts?.A?.[dayIdx] || '';
                        return (
                          <td key={dayIdx} className="border border-slate-900 p-0 align-middle text-center h-10">
                            <select
                              className={`w-full h-full text-[10px] font-extrabold text-center border-none cursor-pointer outline-none transition-all ${getSelectClass(val)}`}
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
                    <tr className="border-b border-slate-300">
                      <td className="border border-slate-900 text-center font-black text-slate-900 bg-white w-9 h-10 align-middle text-xs">
                        B
                      </td>

                      {/* Shift B day cells */}
                      {daysList.map((_, dayIdx) => {
                        const val = item.shifts?.B?.[dayIdx] || '';
                        return (
                          <td key={dayIdx} className="border border-slate-900 p-0 align-middle text-center h-10">
                            <select
                              className={`w-full h-full text-[10px] font-extrabold text-center border-none cursor-pointer outline-none transition-all ${getSelectClass(val)}`}
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

                    {/* Shift C Row */}
                    <tr className="border-b-2 border-slate-900">
                      <td className="border border-slate-900 text-center font-black text-slate-900 bg-white w-9 h-10 align-middle text-xs">
                        C
                      </td>

                      {/* Shift C day cells */}
                      {daysList.map((_, dayIdx) => {
                        const val = item.shifts?.C?.[dayIdx] || '';
                        return (
                          <td key={dayIdx} className="border border-slate-900 p-0 align-middle text-center h-10">
                            <select
                              className={`w-full h-full text-[10px] font-extrabold text-center border-none cursor-pointer outline-none transition-all ${getSelectClass(val)}`}
                              value={val}
                              onChange={(e) => handleStatusChange(itemIdx, 'C', dayIdx, e.target.value)}
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
                <td colSpan={daysList.length + 1} className="border border-slate-900 p-1.5 px-2.5">
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
                <td colSpan={daysList.length + 1} className="border border-slate-900 p-1.5 px-2.5">
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

        {/* Observation Section */}
        <div className="p-3 px-3.5 pb-4 bg-white border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="inline-block border border-slate-900 border-b-0 px-3 py-1 bg-white text-[11px] font-black text-slate-900">
              Poka Yoke Observation
            </div>
            <button
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600 mb-0.5"
              onClick={handleAddObservation}
              title="Add Row"
            >
              <Plus size={13} />
              <span>Add Row</span>
            </button>
          </div>

          <table className="w-full border-collapse border border-slate-900 text-[11px] bg-white">
            <thead>
              <tr className="bg-white">
                <th className="border border-slate-900 py-2 px-1.5 font-black text-slate-900 text-center" style={{ width: '13%' }}>Date</th>
                <th className="border border-slate-900 py-2 px-1.5 font-black text-slate-900 text-center" style={{ width: '16%' }}>Observation</th>
                <th className="border border-slate-900 py-2 px-1.5 font-black text-slate-900 text-center" style={{ width: '14%' }}>Root Cause</th>
                <th className="border border-slate-900 py-2 px-1.5 font-black text-slate-900 text-center" style={{ width: '22%' }}>Action Plan</th>
                <th className="border border-slate-900 py-2 px-1.5 font-black text-slate-900 text-center" style={{ width: '14%' }}>Responsibility</th>
                <th className="border border-slate-900 py-2 px-1.5 font-black text-slate-900 text-center" style={{ width: '9%' }}>Target Date</th>
                <th className="border border-slate-900 py-2 px-1.5 font-black text-slate-900 text-center" style={{ width: '12%' }}>Review Status</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs, oIdx) => (
                <tr key={obs.id} className="h-16">
                  <td className="border border-slate-900 p-1 align-middle text-center">
                    <input
                      type="text"
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-center text-slate-900 outline-none"
                      value={obs.date}
                      onChange={(e) => handleObsChange(oIdx, 'date', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 align-middle">
                    <textarea
                      rows={2}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-slate-900 outline-none resize-none p-1"
                      value={obs.observation}
                      onChange={(e) => handleObsChange(oIdx, 'observation', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 align-middle">
                    <textarea
                      rows={2}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-slate-900 outline-none resize-none p-1"
                      value={obs.rootCause}
                      onChange={(e) => handleObsChange(oIdx, 'rootCause', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 align-middle">
                    <textarea
                      rows={2}
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-slate-900 outline-none resize-none p-1"
                      value={obs.actionPlan}
                      onChange={(e) => handleObsChange(oIdx, 'actionPlan', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 align-middle text-center">
                    <input
                      type="text"
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-center text-slate-900 outline-none"
                      value={obs.responsibility}
                      onChange={(e) => handleObsChange(oIdx, 'responsibility', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 align-middle text-center">
                    <input
                      type="text"
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-center text-slate-900 outline-none"
                      value={obs.targetDate}
                      onChange={(e) => handleObsChange(oIdx, 'targetDate', e.target.value)}
                    />
                  </td>
                  <td className="border border-slate-900 p-1 align-middle text-center">
                    <input
                      type="text"
                      className="w-full h-full border-none bg-transparent text-[11px] font-medium text-center text-slate-900 outline-none"
                      value={obs.reviewStatus}
                      onChange={(e) => handleObsChange(oIdx, 'reviewStatus', e.target.value)}
                    />
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
      {/* Photo Preview Modal */}
      {photoPreview && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPhotoPreview(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 px-4 border-b border-slate-100 bg-slate-50">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 m-0">{photoPreview.title}</h4>
                <p className="text-xs text-slate-500 m-0">{photoPreview.process}</p>
              </div>
              <button
                onClick={() => setPhotoPreview(null)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 bg-transparent border-none cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-3 bg-slate-950 flex items-center justify-center max-h-[70vh]">
              <img src={photoPreview.url} alt="Poka Yoke Preview" className="max-h-[65vh] max-w-full object-contain rounded" />
            </div>
            <div className="p-3 bg-white flex justify-end">
              <button
                onClick={() => setPhotoPreview(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}