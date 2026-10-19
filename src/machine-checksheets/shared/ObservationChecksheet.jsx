import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Printer, RotateCcw, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import PmObservationSwitcher from './PmObservationSwitcher';

const DEFAULT_ROW_COUNT = 16;

const createEmptyRow = (id) => ({
  id,
  month: '',
  nameAndDept: '',
  observations: '',
  correctiveAction: '',
  permanentAction: '',
  resp: '',
  targetDate: '',
  signature: '',
  status: ''
});

export default function ObservationChecksheet({
  machine,
  onClose,
  onSwitchToPm
}) {
  const formattedModel = machine?.model ? machine.model.replace(/_/g, ' ') : '';
  const defaultMachineName = machine?.name
    ? `${machine.name}${formattedModel ? ` (${formattedModel})` : ''}`
    : 'C&C Machine';
  const defaultSerialNo = machine?.name || (machine?.id ? `CC-${String(machine.id).padStart(2, '0')}` : '');

  const storageKey = `fme_observation_pm_${machine?.name || machine?.id || 'default'}`;

  const [machineName, setMachineName] = useState(defaultMachineName);
  const [serialNo, setSerialNo] = useState(defaultSerialNo);
  const [rows, setRows] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.rows) && parsed.rows.length > 0) {
          return parsed.rows;
        }
      }
    } catch (e) {
      console.error('Error loading saved observation checksheet:', e);
    }
    return Array.from({ length: DEFAULT_ROW_COUNT }, (_, i) => createEmptyRow(i + 1));
  });

  const [savedMessage, setSavedMessage] = useState('');

  // Load machine header data when machine changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.machineName) setMachineName(parsed.machineName);
        if (parsed.serialNo) setSerialNo(parsed.serialNo);
        if (Array.isArray(parsed.rows) && parsed.rows.length > 0) {
          setRows(parsed.rows);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    setMachineName(defaultMachineName);
    setSerialNo(defaultSerialNo);
  }, [storageKey, defaultMachineName, defaultSerialNo]);

  const handleCellChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    setRows((prev) => [...prev, createEmptyRow(prev.length + 1)]);
  };

  const handleSave = () => {
    try {
      const dataToSave = {
        machineName,
        serialNo,
        rows,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      setSavedMessage('Observations saved successfully!');
      setTimeout(() => setSavedMessage(''), 4000);
    } catch (e) {
      console.error('Failed to save observation checksheet:', e);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all observations on this sheet?')) {
      const freshRows = Array.from({ length: DEFAULT_ROW_COUNT }, (_, i) => createEmptyRow(i + 1));
      setRows(freshRows);
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.error(e);
      }
      setSavedMessage('Sheet reset to defaults.');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full animate-fadeIn font-sans pb-12">
      {/* Top Floating Control Bar / Navbar */}
      <div className="flex flex-wrap items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm gap-3 print:hidden">
        <div className="flex items-center gap-3 flex-wrap">
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

          {/* Two Side-by-Side Switcher Buttons: PM Checksheet | Observation Checksheet */}
          <PmObservationSwitcher
            activeTab="observation"
            onSelectTab={(tab) => {
              if (tab === 'pm' && onSwitchToPm) {
                onSwitchToPm();
              }
            }}
          />

          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0 uppercase">
              OBSERVATIONS OF PREVENTIVE MAINTENANCE
            </h3>
            <p className="text-[11.5px] text-slate-500 font-medium m-0">
              {machineName} — Observation Record
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {savedMessage && (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold py-1.5 px-3 rounded-lg animate-pulse">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>{savedMessage}</span>
            </div>
          )}

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-300 cursor-pointer bg-white text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            onClick={handleAddRow}
            title="Add a new observation row"
          >
            <Plus size={14} className="text-blue-600" />
            <span>Add Row</span>
          </button>
          

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-300 cursor-pointer bg-white text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            onClick={() => window.print()}
            title="Print Observation Sheet"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-slate-200 cursor-pointer bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
            onClick={handleReset}
            title="Reset sheet to default"
          >
            <RotateCcw size={14} />
          </button>

          {onClose && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg border-none cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition-all ml-1"
              onClick={onClose}
            >
              Close Checksheet
            </button>
          )}
        </div>
      </div>

      {/* Main Sheet Container - Exact match to screenshot */}
      <div className="bg-white border border-slate-300 p-3 sm:p-5 shadow-md rounded-md overflow-x-auto">
        <div className="min-w-[1100px] w-full text-black select-text" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>

          {/* Top Right Header: FURUKAWA MINDA ELECTRIC PVT. LTD. */}
          <div className="flex justify-end pb-1 pr-1">
            <span className="text-[11px] font-black tracking-wider text-black uppercase">
              FURUKAWA MINDA ELECTRIC PVT. LTD.
            </span>
          </div>

          {/* Main Title Row: OBSERVATIONS OF PREVENTIVE MAINTENANCE */}
          <div className="border border-black bg-white py-1.5 text-center">
            <h1 className="text-[17px] font-black tracking-wide text-[#002060] m-0 uppercase leading-snug">
              OBSERVATIONS OF PREVENTIVE MAINTENANCE
            </h1>
          </div>

          {/* Machine and Serial No Row */}
          <div className="grid grid-cols-[130px_1fr_150px_1fr] border-x border-b border-black bg-white items-stretch text-xs">
            {/* Machine Label */}
            <div className="border-r border-black px-3 py-1.5 flex items-center justify-center font-bold text-[#002060] text-[13px]">
              <span>Machine:</span>
            </div>

            {/* Machine Value */}
            <div className="border-r border-black px-2 py-1 flex items-center relative focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
              <input
                type="text"
                value={machineName}
                onChange={(e) => setMachineName(e.target.value)}
                placeholder="Enter Machine Name / Number"
                className="w-full bg-transparent border-0 outline-none text-xs font-bold text-slate-900 px-1 py-0.5"
              />
            </div>

            {/* Serial No Label */}
            <div className="border-r border-black px-3 py-1.5 flex items-center justify-center font-bold text-[#002060] text-[13px]">
              <span>Serial No:</span>
            </div>

            {/* Serial No Value */}
            <div className="px-2 py-1 flex items-center relative focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
              <input
                type="text"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                placeholder="Enter Serial Number"
                className="w-full bg-transparent border-0 outline-none text-xs font-bold text-slate-900 px-1 py-0.5"
              />
            </div>
          </div>

          {/* Observation Table */}
          <table className="w-full border-collapse border-x border-b border-black text-xs text-center table-fixed">
            <thead>
              {/* Table Column Headers (Maroon/Red text) */}
              <tr className="bg-white border-b border-black font-bold text-[11px] text-[#800000]">
                <th className="border-r border-black p-1.5 w-[70px] font-bold text-[#800000]">
                  Month
                </th>
                <th className="border-r border-black p-1.5 w-[110px] font-bold text-[#800000]">
                  Name&amp; Dept.
                </th>
                <th className="border-r border-black p-1.5 w-[250px] font-bold text-[#800000]">
                  Observations
                </th>
                <th className="border-r border-black p-1.5 w-[250px] font-bold text-[#800000]">
                  Corrective Action
                </th>
                <th className="border-r border-black p-1.5 w-[250px] font-bold text-[#800000]">
                  Permanent Action.
                </th>
                <th className="border-r border-black p-1.5 w-[80px] font-bold text-[#800000]">
                  Resp.
                </th>
                <th className="border-r border-black p-1.5 w-[95px] font-bold text-[#800000]">
                  Target date
                </th>
                <th className="border-r border-black p-1.5 w-[95px] font-bold text-[#800000]">
                  signature
                </th>
                <th className="p-1.5 w-[85px] font-bold text-[#800000]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-black h-8 hover:bg-slate-50/50 transition-colors">
                  {/* Month */}
                  <td className="border-r border-black p-0 relative focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.month}
                      onChange={(e) => handleCellChange(row.id, 'month', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-center text-xs bg-transparent px-1 font-medium text-slate-800"
                    />
                  </td>

                  {/* Name & Dept */}
                  <td className="border-r border-black p-0 relative focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.nameAndDept}
                      onChange={(e) => handleCellChange(row.id, 'nameAndDept', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-center text-xs bg-transparent px-1 font-medium text-slate-800"
                    />
                  </td>

                  {/* Observations */}
                  <td className="border-r border-black p-0 relative text-left focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.observations}
                      onChange={(e) => handleCellChange(row.id, 'observations', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-left text-xs bg-transparent px-2 font-medium text-slate-800"
                    />
                  </td>

                  {/* Corrective Action */}
                  <td className="border-r border-black p-0 relative text-left focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.correctiveAction}
                      onChange={(e) => handleCellChange(row.id, 'correctiveAction', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-left text-xs bg-transparent px-2 font-medium text-slate-800"
                    />
                  </td>

                  {/* Permanent Action. */}
                  <td className="border-r border-black p-0 relative text-left focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.permanentAction}
                      onChange={(e) => handleCellChange(row.id, 'permanentAction', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-left text-xs bg-transparent px-2 font-medium text-slate-800"
                    />
                  </td>

                  {/* Resp. */}
                  <td className="border-r border-black p-0 relative focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.resp}
                      onChange={(e) => handleCellChange(row.id, 'resp', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-center text-xs bg-transparent px-1 font-medium text-slate-800"
                    />
                  </td>

                  {/* Target date */}
                  <td className="border-r border-black p-0 relative focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.targetDate}
                      onChange={(e) => handleCellChange(row.id, 'targetDate', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-center text-xs bg-transparent px-1 font-medium text-slate-800"
                    />
                  </td>

                  {/* signature */}
                  <td className="border-r border-black p-0 relative focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.signature}
                      onChange={(e) => handleCellChange(row.id, 'signature', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-center text-xs bg-transparent px-1 font-medium text-slate-800"
                    />
                  </td>

                  {/* Status */}
                  <td className="p-0 relative focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-inset">
                    <input
                      type="text"
                      value={row.status}
                      onChange={(e) => handleCellChange(row.id, 'status', e.target.value)}
                      className="w-full h-full min-h-[30px] border-none outline-none text-center text-xs bg-transparent px-1 font-medium text-slate-800"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
