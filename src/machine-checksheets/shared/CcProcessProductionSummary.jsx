import React, { useState } from 'react';
import { BarChart3, ArrowLeft } from 'lucide-react';

export default function CcProcessProductionSummary({
  machine = { name: 'C&C 01' },
  activeSession,
  onClose
}) {
  const [ccSheetData, setCcSheetData] = useState({
    date: new Date().toISOString().split('T')[0],
    shift: 'Shift A',
    operatorName: activeSession?.operatorCardNo || '',
    inspectorName: activeSession?.inspectorCardNo || '',
    hourMeter: '8',
    plan: '4200',
    startTime: '06:00',
    finishTime: '14:00',
    workingTime: '480',
    hourlyRows: [
      { id: 1, machineProcess: 'C&C Crimping Terminal A', plan: '550', startTime: '06:00', finishTime: '07:00', hourMeter: '1', h1: '540', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '540' },
      { id: 2, machineProcess: 'C&C Crimping Terminal B', plan: '550', startTime: '07:00', finishTime: '08:00', hourMeter: '1', h1: '', h2: '562', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '562' }
    ],
    downtimeRows: [
      { id: 'dt1', reason: 'Wire Short from Store (Min)', h1: '0', h2: '0', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '0', changes: '0' },
      { id: 'dt2', reason: 'Terminal short from Store (Min)', h1: '0', h2: '15', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '15', changes: '1' },
      { id: 'dt3', reason: 'Seal Short from Store (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt4', reason: 'Wire entangle (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt5', reason: 'Wire changeover (Min)', h1: '10', h2: '0', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '10', changes: '1' },
      { id: 'dt6', reason: 'Seal Changeover (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt7', reason: 'Terminal Changeover (Min)', h1: '', h2: '12', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '12', changes: '1' },
      { id: 'dt8', reason: 'Applicator Changeover (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt9', reason: 'Applicator Waiting (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt10', reason: 'Terminal + Applicator Changeover (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt11', reason: 'Wire+Terminal+Applicator Changeover (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt12', reason: 'Quality Problem (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt13', reason: 'Quality Waiting (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt14', reason: 'Breakdown (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' }
    ],
    scrapPRS: '',
    scrapORS: '',
    scrapCFM: '',
    filledBy: activeSession?.operatorCardNo || '',
    checkedBy: activeSession?.inspectorCardNo || ''
  });

  const handleCellChange = (category, rowIdx, field, val) => {
    setCcSheetData(prev => {
      const copy = { ...prev };
      copy[category] = [...copy[category]];
      copy[category][rowIdx] = { ...copy[category][rowIdx], [field]: val };
      return copy;
    });
  };

  const handleMetaChange = (field, val) => {
    setCcSheetData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <BarChart3 size={22} className="text-teal-600 bg-teal-50 p-2 rounded-xl w-10 h-10" />
          <div>
            <h3 className="text-base font-black text-slate-900 m-0">C&C Process Production Status Summary</h3>
            <p className="text-xs text-slate-500 m-0">
              Excel Checksheet format for {machine?.name || 'Machine'} &bull; FRM-PR-201 (Rev No. 03)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-xs font-bold py-1.5 px-3.5 rounded-full bg-teal-600 text-white hover:bg-teal-700 cursor-pointer border-none shadow-sm transition-all"
            onClick={() => alert(`C&C Production Status saved for ${machine?.name}!`)}
          >
            Save Record
          </button>
          {onClose && (
            <button
              className="text-xs font-bold py-1.5 px-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer border-none transition-all flex items-center gap-1"
              onClick={onClose}
            >
              <ArrowLeft size={13} />
              <span>Close Checksheet</span>
            </button>
          )}
        </div>
      </div>

      {/* Excel Sheet Outer Container */}
      <div className="bg-white border-[1.5px] border-black p-3 font-sans shadow-sm rounded">
        <div className="text-center border-b border-black pb-2 mb-3">
          <h2 className="text-base font-black tracking-wide text-black m-0 underline">
            C&C Process Production Status Summary
          </h2>
        </div>

        {/* Header meta inputs */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-black mb-3">
          <div className="flex flex-col border-r border-b md:border-b-0 border-black p-1.5">
            <label className="text-[10px] font-bold text-slate-600 uppercase">Date:</label>
            <input
              type="date"
              className="border-none outline-none text-xs font-bold text-slate-900 bg-transparent"
              value={ccSheetData.date}
              onChange={(e) => handleMetaChange('date', e.target.value)}
            />
          </div>
          <div className="flex flex-col border-r border-b md:border-b-0 border-black p-1.5">
            <label className="text-[10px] font-bold text-slate-600 uppercase">Shift:</label>
            <input
              type="text"
              placeholder="Shift A"
              className="border-none outline-none text-xs font-bold text-slate-900 bg-transparent"
              value={ccSheetData.shift}
              onChange={(e) => handleMetaChange('shift', e.target.value)}
            />
          </div>
          <div className="flex flex-col border-r border-black p-1.5">
            <label className="text-[10px] font-bold text-slate-600 uppercase">Operator Name:</label>
            <input
              type="text"
              placeholder="Enter Operator Name"
              className="border-none outline-none text-xs font-bold text-slate-900 bg-transparent"
              value={ccSheetData.operatorName}
              onChange={(e) => handleMetaChange('operatorName', e.target.value)}
            />
          </div>
          <div className="flex flex-col p-1.5">
            <label className="text-[10px] font-bold text-slate-600 uppercase">Inspector Name:</label>
            <input
              type="text"
              placeholder="Enter Inspector Name"
              className="border-none outline-none text-xs font-bold text-slate-900 bg-transparent"
              value={ccSheetData.inspectorName}
              onChange={(e) => handleMetaChange('inspectorName', e.target.value)}
            />
          </div>
        </div>

        {/* Table 1: Hourly Production & Machine Process */}
        <div className="overflow-x-auto border border-black mb-3">
          <table className="w-full border-collapse text-xs text-left min-w-[950px]">
            <thead>
              <tr className="bg-slate-100 text-black font-extrabold border-b border-black text-center text-[11px]">
                <th className="border-r border-black p-1 w-[45px]">S.No</th>
                <th className="border-r border-black p-1 min-w-[180px]">Machine/Process</th>
                <th className="border-r border-black p-1 w-[70px]">PLAN</th>
                <th className="border-r border-black p-1 w-[80px]">Start Time</th>
                <th className="border-r border-black p-1 w-[80px]">Finish Time</th>
                <th className="border-r border-black p-1 w-[85px]">Hour Meter</th>
                <th className="border-r border-black p-1 w-[65px]">1st Hr</th>
                <th className="border-r border-black p-1 w-[65px]">2nd Hr</th>
                <th className="border-r border-black p-1 w-[65px]">3rd Hr</th>
                <th className="border-r border-black p-1 w-[65px]">4th Hr</th>
                <th className="border-r border-black p-1 w-[65px]">5th Hr</th>
                <th className="border-r border-black p-1 w-[65px]">6th Hr</th>
                <th className="border-r border-black p-1 w-[65px]">7th Hr</th>
                <th className="border-r border-black p-1 w-[65px]">8th Hr</th>
                <th className="border-r border-black p-1 w-[80px]">Total</th>
                <th className="p-1 w-[100px]">Working Time</th>
              </tr>
            </thead>
            <tbody>
              {ccSheetData.hourlyRows.map((row, rIdx) => (
                <tr key={row.id} className="border-b border-black">
                  <td className="border-r border-black p-1 text-center bg-slate-50 font-bold">{row.id}</td>
                  <td className="border-r border-black p-0.5">
                    <input
                      className="w-full border-none outline-none bg-transparent p-1 text-xs"
                      type="text"
                      value={row.machineProcess}
                      onChange={(e) => handleCellChange('hourlyRows', rIdx, 'machineProcess', e.target.value)}
                    />
                  </td>
                  <td className="border-r border-black p-0.5">
                    <input
                      className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-semibold"
                      type="text"
                      value={row.plan}
                      onChange={(e) => handleCellChange('hourlyRows', rIdx, 'plan', e.target.value)}
                    />
                  </td>
                  <td className="border-r border-black p-0.5">
                    <input
                      className="w-full border-none outline-none bg-transparent p-1 text-xs text-center"
                      type="text"
                      value={row.startTime}
                      onChange={(e) => handleCellChange('hourlyRows', rIdx, 'startTime', e.target.value)}
                    />
                  </td>
                  <td className="border-r border-black p-0.5">
                    <input
                      className="w-full border-none outline-none bg-transparent p-1 text-xs text-center"
                      type="text"
                      value={row.finishTime}
                      onChange={(e) => handleCellChange('hourlyRows', rIdx, 'finishTime', e.target.value)}
                    />
                  </td>
                  <td className="border-r border-black p-0.5">
                    <input
                      className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-semibold"
                      type="text"
                      value={row.hourMeter}
                      onChange={(e) => handleCellChange('hourlyRows', rIdx, 'hourMeter', e.target.value)}
                    />
                  </td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h1} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h1', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h2} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h2', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h3} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h3', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h4} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h4', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h5} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h5', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h6} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h6', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h7} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h7', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h8} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h8', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5 bg-yellow-100">
                    <input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold text-slate-900" type="text" value={row.total} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'total', e.target.value)} />
                  </td>
                  {rIdx === 0 && (
                    <td rowSpan={ccSheetData.hourlyRows.length + 1} className="p-1 text-center bg-slate-50 font-bold">
                      <input
                        className="w-full border-none outline-none bg-transparent text-center font-bold text-xs"
                        type="text"
                        value={ccSheetData.workingTime}
                        onChange={(e) => handleMetaChange('workingTime', e.target.value)}
                      />
                      <span className="text-[10px] text-slate-500">min</span>
                    </td>
                  )}
                </tr>
              ))}
              {/* Summary Total Row */}
              <tr className="bg-slate-100 font-bold">
                <td colSpan={2} className="border-r border-black p-1 text-center font-bold">Total</td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="1100" /></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="2" /></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="540" /></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="562" /></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                <td className="border-r border-black p-0.5 bg-yellow-100"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold text-blue-700" type="text" placeholder="1102" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 2: Down Time in Minutes */}
        <div className="overflow-x-auto border border-black mb-3">
          <table className="w-full border-collapse text-xs text-left min-w-[950px]">
            <thead>
              <tr className="bg-slate-100 text-black font-extrabold border-b border-black text-center text-[11px]">
                <th className="border-r border-black p-1 text-left" colSpan={2}>Down Time in Minutes</th>
                <th className="border-r border-black p-1 w-[65px]">1st Hr</th>
                <th className="border-r border-black p-1 w-[65px]">2nd Hr</th>
                <th className="border-r border-black p-1 w-[65px]">3rd Hr</th>
                <th className="border-r border-black p-1 w-[65px]">4th Hr</th>
                <th className="border-r border-black p-1 w-[65px]">5th Hr</th>
                <th className="border-r border-black p-1 w-[65px]">6th Hr</th>
                <th className="border-r border-black p-1 w-[65px]">7th Hr</th>
                <th className="border-r border-black p-1 w-[65px]">8th Hr</th>
                <th className="border-r border-black p-1 w-[80px]">Total</th>
                <th className="p-1 w-[100px]">No of Changes</th>
              </tr>
            </thead>
            <tbody>
              {ccSheetData.downtimeRows.map((dt, dIdx) => (
                <tr key={dt.id} className="border-b border-black">
                  <td colSpan={2} className="border-r border-black p-1 px-2 font-medium text-slate-800 text-[11px]">{dt.reason}</td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h1} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h1', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h2} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h2', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h3} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h3', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h4} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h4', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h5} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h5', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h6} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h6', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h7} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h7', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h8} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h8', e.target.value)} /></td>
                  <td className="border-r border-black p-0.5 bg-yellow-100">
                    <input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold text-slate-900" type="text" value={dt.total} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'total', e.target.value)} />
                  </td>
                  <td className="p-0.5">
                    <input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold text-slate-900" type="text" value={dt.changes} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'changes', e.target.value)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Excel Sheet Footer (Scrap boxes & Signatures) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-black p-2.5 mb-2 bg-slate-50">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
              <span className="text-[10px] font-bold text-slate-600">Scrap (PRS) in gms</span>
              <input
                type="text"
                placeholder="0.00"
                className="border-none outline-none text-xs font-bold text-slate-900"
                value={ccSheetData.scrapPRS}
                onChange={(e) => handleMetaChange('scrapPRS', e.target.value)}
              />
            </div>
            <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
              <span className="text-[10px] font-bold text-slate-600">Scrap (ORS) in gms</span>
              <input
                type="text"
                placeholder="0.00"
                className="border-none outline-none text-xs font-bold text-slate-900"
                value={ccSheetData.scrapORS}
                onChange={(e) => handleMetaChange('scrapORS', e.target.value)}
              />
            </div>
            <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
              <span className="text-[10px] font-bold text-slate-600">Scrap (CFM) in gms</span>
              <input
                type="text"
                placeholder="0.00"
                className="border-none outline-none text-xs font-bold text-slate-900"
                value={ccSheetData.scrapCFM}
                onChange={(e) => handleMetaChange('scrapCFM', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
              <span className="text-[10px] font-bold text-slate-600">Filled By (Operator)</span>
              <input
                type="text"
                placeholder="Operator Sign / ID"
                className="border-none outline-none text-xs font-bold text-slate-900"
                value={ccSheetData.filledBy}
                onChange={(e) => handleMetaChange('filledBy', e.target.value)}
              />
            </div>
            <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
              <span className="text-[10px] font-bold text-slate-600">Checked By (Shift Incharge)</span>
              <input
                type="text"
                placeholder="Shift Incharge Sign"
                className="border-none outline-none text-xs font-bold text-slate-900"
                value={ccSheetData.checkedBy}
                onChange={(e) => handleMetaChange('checkedBy', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Bottom Sheet Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 font-semibold pt-1">
          <span>FRM-PR-201</span>
          <span>Rev No.: <strong className="text-slate-800">03</strong></span>
          <span>Effective: 7/12/2025</span>
          <span className="font-bold text-slate-700">FME Production Division</span>
        </div>
      </div>
    </div>
  );
}
