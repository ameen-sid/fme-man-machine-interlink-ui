import React, { useState } from 'react';
import { Save, RotateCcw, Plus, Printer, FileSpreadsheet, Trash2 } from 'lucide-react';
import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';

const createEmptyRecord = (id) => ({
  id,
  productionNo: '',
  lotNo: '',
  shikakariNo: '',
  wireType: '',
  wireSize: '',
  wireColor: '',
  terminalName: '',
  terminalLotNo: '',
  rubberSealName: '',
  rubberSealLotNo: '',
  // Crimping height (Standard min/max and Actual begin/middle/end)
  chStdMin: '',
  chStdMax: '',
  chActualBegin: '',
  chActualMiddle: '',
  chActualEnd: '',
  // Insulation height (Standard min/max and Actual begin/end)
  ihStdMin: '',
  ihStdMax: '',
  ihActualBegin: '',
  ihActualEnd: '',
  // Crimping width (Standard and Actual begin)
  cwStd: '',
  cwActualBegin: '',
  // Beginning crimping confirmation
  begAppearance: '',
  begPullStrength: '',
  applicatorMachineNo: '',
  goodQty: '',
  // Operators Defect when occurring (3 pairs)
  defect1Mode: '',
  defect1Qty: '',
  defect2Mode: '',
  defect2Qty: '',
  defect3Mode: '',
  defect3Qty: '',
  // Confirm By Quality
  qcChBegin: '',
  qcChEnd: '',
  qcIhBegin: '',
  qcIhEnd: '',
  qcCw: '',
  qcVisualStatus: '',
  qcInspectorSign: '',
  qcLeaderVerified: '',
  qcSample: '',
  remarks: ''
});

const INITIAL_ROWS = Array.from({ length: 12 }, (_, i) => createEmptyRecord(i + 1));

const DEFECT_CODES = [
  { code: 'A-01', label: 'Too long protruding core wire' },
  { code: 'A-02', label: 'No protruding core wire' },
  { code: 'A-03', label: 'Core wire pulling out' },
  { code: 'A-04', label: 'Core wire breaking' },
  { code: 'A-05', label: 'Core wire drawn out' },
  { code: 'A-06', label: 'No core wire' },
  { code: 'A-07', label: 'Barrel open' },
  { code: 'A-08', label: 'Pinched sheath, pinched shrinking tube' },
  { code: 'A-09', label: 'Sheath lowering, shrinking tube lowering' },
  { code: 'A-10', label: 'Shrinking tube breaking' },
  { code: 'A-11', label: 'Shrinking tube sticking' },
  { code: 'A-12', label: 'Crack' },
  { code: 'A-13', label: 'Soft-set core wire' },
  { code: 'B-01', label: 'Mating part, spring tongue damage' },
  { code: 'B-02', label: 'Lance, stabilizer deformation' },
  { code: 'C-01', label: 'Pinched wire seal, pinched wire seal rib' },
  { code: 'C-02', label: 'Wire seal lowering' },
  { code: 'C-03', label: 'Wire seal scratch, breaking' },
  { code: 'C-04', label: 'Reverse insertion of wire seal' },
  { code: 'D-01', label: 'NG crimping standard (C/H, I/H)' },
  { code: 'E-01', label: 'NG bell-mouth' },
  { code: 'E-02', label: 'NG cut-off tab size' },
  { code: 'E-03', label: 'Curling burr' },
  { code: 'E-04', label: 'Crimping burr' },
  { code: 'E-05', label: 'Anvil damage' },
  { code: 'E-06', label: 'Core wire seeing' },
  { code: 'E-07', label: 'Crimper damage' },
  { code: 'F-01', label: 'Bend-up' },
  { code: 'F-02', label: 'Bend-down' },
  { code: 'F-03', label: 'Twist' },
  { code: 'F-04', label: 'Rolling' },
  { code: 'H-01', label: 'Potential failure' },
  { code: 'I-01', label: 'NG wire length' },
  { code: 'I-02', label: 'NG stripping' },
  { code: 'J-01', label: 'CFM error' }
];

export default function InspectionReportSheet({ machine, onClose }) {
  const machineKey = machine?.id || machine?.name || 'mcr_01';
  const storageKey = `mcr_inspection_report_${machineKey}`;
  const defaultMachineName = machine?.name || 'MCR-01';

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      dateShift: '24.10.2026 (A)',
      operatorName: '',
      crimpingMachine: defaultMachineName,
      chMicrometer: '',
      bladeMicrometer: '',
      pullTestingMachine: '',
      confirmationSign: '',
      pageNumber: '1',
      docNo: 'FRM-WH-PE-262',
      rev02Date: '24/05/2025',
      baseFormatNo: 'OSM– 10CB110 Format 2',
      rev13Date: '08-03-2024'
    };
  });

  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_records`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ROWS;
  });

  const [abnormalityText, setAbnormalityText] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_abnormality`);
      if (saved) return saved;
    } catch (e) {}
    return '';
  });

  const [savedToast, setSavedToast] = useState('');

  const handleFieldChange = (recordIdx, field, value) => {
    setRecords((prev) => {
      const copy = [...prev];
      copy[recordIdx] = { ...copy[recordIdx], [field]: value };
      return copy;
    });
  };

  const handleAddRecord = () => {
    setRecords((prev) => [...prev, createEmptyRecord(prev.length + 1)]);
  };

  const handleRemoveRecord = (recordIdx) => {
    if (records.length <= 1) return;
    setRecords((prev) => prev.filter((_, idx) => idx !== recordIdx));
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_header`, JSON.stringify(headerInfo));
      localStorage.setItem(`${storageKey}_records`, JSON.stringify(records));
      localStorage.setItem(`${storageKey}_abnormality`, abnormalityText);
      setSavedToast('Daily record of terminal fitting operation saved successfully!');
      setTimeout(() => setSavedToast(''), 3500);
    } catch (e) {
      console.error(e);
      setSavedToast('Saved locally!');
      setTimeout(() => setSavedToast(''), 3500);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this inspection report sheet?')) {
      setRecords(INITIAL_ROWS);
      setAbnormalityText('');
      localStorage.removeItem(`${storageKey}_header`);
      localStorage.removeItem(`${storageKey}_records`);
      localStorage.removeItem(`${storageKey}_abnormality`);
      setSavedToast('Sheet reset successfully');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const totalGoodProducts = records.reduce((sum, r) => sum + (Number(r.goodQty) || 0), 0);

  return (
    <div className="flex flex-col gap-4 w-full text-slate-800 bg-slate-50 transition-all duration-200">
      <ChecksheetHeaderNav
        title="INSPECTION FORMAT CHECKSHEET"
        subtitle={`${defaultMachineName} — Daily record of terminal fitting operation (FRM-WH-PE-262 Rev 13)`}
        icon={FileSpreadsheet}
        iconBgClass="bg-indigo-100 text-indigo-700"
        onClose={onClose}
        onReset={handleReset}
        onSave={handleSave}
        savedToast={savedToast}
        extraActions={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            onClick={() => window.print()}
            title="Print Inspection Sheet"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
        }
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

      {/* Main Unified Printable Sheet */}
      <div className="bg-white border-2 border-black p-4 shadow-xl rounded-sm overflow-x-auto select-text text-black font-sans print:p-0 print:border-none print:shadow-none">
        <div className="min-w-[2150px] w-max select-text text-black">
          
          {/* TOP SECTION: Title, Warning Note & Metadata Block */}
          <div className="flex items-start justify-between w-full mb-3 gap-4">
            {/* Left Title */}
            <div className="flex flex-col pt-1">
              <h1 className="text-xl font-black text-black m-0 tracking-tight font-sans">
                Daily record of terminal fitting operation
              </h1>
            </div>

            {/* Center Warning Note */}
            <div className="flex items-center pt-2">
              <span className="text-xs font-black text-black font-sans">
                Note- Again Setup Approval to be taken for CFM Error
              </span>
            </div>

            {/* Right Document Format Box (Exact match of Screenshot 1) */}
            <div className="w-[360px] shrink-0">
              <table className="w-full border-collapse border border-black text-left text-[11px] font-sans">
                <tbody>
                  <tr>
                    <td colSpan={3} className="border border-black px-2 py-0.5 font-bold text-right">
                      {headerInfo.docNo}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-1.5 py-0.5 font-bold w-16 bg-white">Rev.02</td>
                    <td className="border border-black px-1.5 py-0.5 bg-white"></td>
                    <td className="border border-black px-1.5 py-0.5 font-bold text-right">{headerInfo.rev02Date}</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-1.5 py-0.5 bg-white"></td>
                    <td className="border border-black px-1.5 py-0.5 font-bold text-[10px] whitespace-nowrap">Base Format No [FAS]</td>
                    <td className="border border-black px-1.5 py-0.5 font-bold text-right text-[10px]">{headerInfo.baseFormatNo}</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-1.5 py-0.5 font-bold bg-white">Rev.13</td>
                    <td className="border border-black px-1.5 py-0.5 bg-white"></td>
                    <td className="border border-black px-1.5 py-0.5 font-bold text-right">{headerInfo.rev13Date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SUBHEADER BOX: Date/Shift, Operator, Machine Numbers, Confirmation, Page Number */}
          <div className="flex items-stretch w-full mb-3 gap-2">
            {/* 1. Date (Shift) & Operator Full Name */}
            <div className="w-[340px] border border-black flex flex-col shrink-0">
              <div className="grid grid-cols-2 border-b border-black text-center text-[10.5px] font-bold">
                <div className="border-r border-black p-1">Date (Shift)</div>
                <div className="p-1">Operator's full name</div>
              </div>
              <div className="grid grid-cols-2 text-center text-xs h-10">
                <div className="border-r border-black p-0 flex items-center justify-center">
                  <input
                    type="text"
                    className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                    value={headerInfo.dateShift}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, dateShift: e.target.value })}
                  />
                </div>
                <div className="p-0 flex items-center justify-center">
                  <input
                    type="text"
                    className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                    value={headerInfo.operatorName}
                    placeholder="Operator name"
                    onChange={(e) => setHeaderInfo({ ...headerInfo, operatorName: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 2. Machine Number Block */}
            <div className="flex-1 border border-black flex flex-col">
              <div className="border-b border-black text-center text-[10.5px] font-bold py-1 bg-white">
                Machine number
              </div>
              <div className="grid grid-cols-4 border-b border-black text-center text-[10px] font-bold divide-x divide-black py-0.5">
                <div>Crimping machine</div>
                <div>C/H micrometer</div>
                <div>Blade micrometer</div>
                <div>Pulling strength testing machine</div>
              </div>
              <div className="grid grid-cols-4 text-center text-xs divide-x divide-black h-7">
                <div className="p-0">
                  <input
                    type="text"
                    className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                    value={headerInfo.crimpingMachine}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, crimpingMachine: e.target.value })}
                  />
                </div>
                <div className="p-0">
                  <input
                    type="text"
                    className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                    value={headerInfo.chMicrometer}
                    placeholder="C/H Micrometer"
                    onChange={(e) => setHeaderInfo({ ...headerInfo, chMicrometer: e.target.value })}
                  />
                </div>
                <div className="p-0">
                  <input
                    type="text"
                    className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                    value={headerInfo.bladeMicrometer}
                    placeholder="Blade Micrometer"
                    onChange={(e) => setHeaderInfo({ ...headerInfo, bladeMicrometer: e.target.value })}
                  />
                </div>
                <div className="p-0">
                  <input
                    type="text"
                    className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                    value={headerInfo.pullTestingMachine}
                    placeholder="Pull tester"
                    onChange={(e) => setHeaderInfo({ ...headerInfo, pullTestingMachine: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 3. Confirmation & Page Number */}
            <div className="w-[320px] border border-black flex shrink-0">
              <div className="flex-1 border-r border-black flex flex-col">
                <div className="border-b border-black text-center text-[10.5px] font-bold py-1">Confirmation</div>
                <input
                  type="text"
                  className="w-full flex-1 text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                  placeholder="Sign / Stamp"
                  value={headerInfo.confirmationSign}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, confirmationSign: e.target.value })}
                />
              </div>
              <div className="w-24 flex flex-col">
                <div className="border-b border-black text-center text-[10.5px] font-bold py-1">Page number</div>
                <div className="flex-1 flex items-center justify-center p-1 text-xs font-bold gap-1">
                  <input
                    type="text"
                    className="w-8 text-center text-xs font-bold border-none outline-none bg-transparent"
                    value={headerInfo.pageNumber}
                    onChange={(e) => setHeaderInfo({ ...headerInfo, pageNumber: e.target.value })}
                  />
                  <span>/</span>
                  <span className="text-xs">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              Terminal Fitting Records ({records.length} jobs logged)
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm transition-all"
              onClick={handleAddRecord}
            >
              <Plus size={13} />
              <span>Add Record Row</span>
            </button>
          </div>

          {/* MAIN INSPECTION TABLE (Exact layout of Screenshot 1) */}
          <table className="w-full border-collapse border-2 border-black text-center text-[10.5px] font-sans">
            <thead>
              {/* Header Row 1 */}
              <tr className="bg-white font-bold text-black">
                <th rowSpan={3} className="border border-black p-1 w-20">Production<br />Number</th>
                <th rowSpan={3} className="border border-black p-1 w-16">Lot No</th>
                <th rowSpan={3} className="border border-black p-1 w-20">Shikakari<br />Number</th>
                <th rowSpan={3} className="border border-black p-1 w-16">Wire<br />type</th>
                <th rowSpan={3} className="border border-black p-1 w-12">Size</th>
                <th rowSpan={3} className="border border-black p-1 w-14">Colour</th>
                <th className="border border-black p-1 w-32">Terminal name</th>
                <th className="border border-black p-1 w-32">Rubber seal name</th>
                <th colSpan={3} className="border border-black p-1 bg-white">Crimping height</th>
                <th colSpan={2} className="border border-black p-1 bg-white">Insulation height</th>
                <th className="border border-black p-1 bg-white">Crimping<br />Width</th>
                <th colSpan={2} className="border border-black p-1 bg-white">Beginning<br />crimping confirmation</th>
                <th rowSpan={3} className="border border-black p-1 w-24">Applicator<br />machine<br />number</th>
                <th rowSpan={3} className="border border-black p-1 w-20">Number<br />of good<br />product</th>
                <th colSpan={6} className="border border-black p-1 bg-white">Operators<br />Defect when occurring</th>
                <th colSpan={8} className="border border-black p-1 bg-white">Confirm By Quality</th>
                <th rowSpan={3} className="border border-black p-1 w-24">Remarks</th>
              </tr>

              {/* Header Row 2 */}
              <tr className="bg-white font-bold text-black text-[10px]">
                {/* Under Terminal / Rubber seal name: spacer */}
                <th className="border-x border-black p-0.5"></th>
                <th className="border-x border-black p-0.5"></th>
                {/* Standard values row */}
                <th colSpan={3} className="border border-black p-0.5 bg-[#fef9c3]">Standard value</th>
                <th colSpan={2} className="border border-black p-0.5 bg-[#fef9c3]">Standard value</th>
                <th className="border border-black p-0.5 bg-[#fef9c3]">Standard value</th>
                <th rowSpan={2} className="border border-black p-0.5 w-16">Appearance</th>
                <th rowSpan={2} className="border border-black p-0.5 w-16">Pulling<br />strength<br />[N]</th>
                {/* Operators Defect */}
                <th className="border border-black p-0.5 w-10">Mode</th>
                <th className="border border-black p-0.5 w-10">Quantity</th>
                <th className="border border-black p-0.5 w-10">Mode</th>
                <th className="border border-black p-0.5 w-10">Quantity</th>
                <th className="border border-black p-0.5 w-10">Mode</th>
                <th className="border border-black p-0.5 w-10">Quantity</th>
                {/* Confirm By Quality */}
                <th className="border border-black p-0.5 w-14">C/H</th>
                <th className="border border-black p-0.5 w-14">I/H</th>
                <th rowSpan={2} className="border border-black p-0.5 w-14">Crimping<br />Width</th>
                <th rowSpan={2} className="border border-black p-0.5 w-12">Visual<br />Status</th>
                <th rowSpan={2} className="border border-black p-0.5 w-16">QC<br />Inspector<br />Sign/Stamp</th>
                <th rowSpan={2} className="border border-black p-0.5 w-14">Verified<br />By QC<br />Leader</th>
                <th rowSpan={2} className="border border-black p-0.5 w-12">Sample</th>
              </tr>

              {/* Header Row 3 */}
              <tr className="bg-white font-bold text-black text-[9.5px]">
                <th className="border border-black p-0.5">Lot No.</th>
                <th className="border border-black p-0.5">Lot No.</th>
                {/* Actual value columns */}
                <th className="border border-black p-0.5 w-12 bg-white">Begin</th>
                <th className="border border-black p-0.5 w-12 bg-white">Middle</th>
                <th className="border border-black p-0.5 w-12 bg-white">End</th>
                <th className="border border-black p-0.5 w-12 bg-white">Begin</th>
                <th className="border border-black p-0.5 w-12 bg-white">End</th>
                <th className="border border-black p-0.5 w-14 bg-white">Begin</th>
                {/* Defect columns empty spacer / repetition */}
                <th colSpan={6} className="border border-black p-0 text-[8.5px] text-slate-500 font-normal">
                  (Defect code & qty)
                </th>
                <th className="border border-black p-0.5">Begin<br />End</th>
                <th className="border border-black p-0.5">Begin<br />End</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, rIdx) => (
                <React.Fragment key={r.id}>
                  {/* Top Sub-Row for Record: Terminal Name / Rubber seal name & Standard Values (yellow) */}
                  <tr className="h-6 hover:bg-slate-50/50">
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.productionNo}
                        onChange={(e) => handleFieldChange(rIdx, 'productionNo', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.lotNo}
                        onChange={(e) => handleFieldChange(rIdx, 'lotNo', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.shikakariNo}
                        onChange={(e) => handleFieldChange(rIdx, 'shikakariNo', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.wireType}
                        onChange={(e) => handleFieldChange(rIdx, 'wireType', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.wireSize}
                        onChange={(e) => handleFieldChange(rIdx, 'wireSize', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.wireColor}
                        onChange={(e) => handleFieldChange(rIdx, 'wireColor', e.target.value)}
                      />
                    </td>

                    {/* Terminal name (Top) */}
                    <td className="border-x border-t border-b-0 border-dashed border-black p-0">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        placeholder="Terminal"
                        value={r.terminalName}
                        onChange={(e) => handleFieldChange(rIdx, 'terminalName', e.target.value)}
                      />
                    </td>

                    {/* Rubber seal name (Top) */}
                    <td className="border-x border-t border-b-0 border-dashed border-black p-0">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        placeholder="Rubber seal"
                        value={r.rubberSealName}
                        onChange={(e) => handleFieldChange(rIdx, 'rubberSealName', e.target.value)}
                      />
                    </td>

                    {/* Crimping height Standard Value (Yellow background spanning Begin, Middle, End) */}
                    <td colSpan={3} className="border border-black p-0 bg-[#fef9c3]">
                      <div className="flex items-center justify-center gap-0.5 w-full h-5 text-[9.5px] font-bold">
                        <input
                          type="text"
                          className="w-10 text-center font-bold border-none outline-none bg-transparent"
                          placeholder="Min"
                          value={r.chStdMin}
                          onChange={(e) => handleFieldChange(rIdx, 'chStdMin', e.target.value)}
                        />
                        <span>~</span>
                        <input
                          type="text"
                          className="w-10 text-center font-bold border-none outline-none bg-transparent"
                          placeholder="Max"
                          value={r.chStdMax}
                          onChange={(e) => handleFieldChange(rIdx, 'chStdMax', e.target.value)}
                        />
                      </div>
                    </td>

                    {/* Insulation height Standard Value (Yellow background spanning Begin, End) */}
                    <td colSpan={2} className="border border-black p-0 bg-[#fef9c3]">
                      <div className="flex items-center justify-center gap-0.5 w-full h-5 text-[9.5px] font-bold">
                        <input
                          type="text"
                          className="w-10 text-center font-bold border-none outline-none bg-transparent"
                          placeholder="Min"
                          value={r.ihStdMin}
                          onChange={(e) => handleFieldChange(rIdx, 'ihStdMin', e.target.value)}
                        />
                        <span>~</span>
                        <input
                          type="text"
                          className="w-10 text-center font-bold border-none outline-none bg-transparent"
                          placeholder="Max"
                          value={r.ihStdMax}
                          onChange={(e) => handleFieldChange(rIdx, 'ihStdMax', e.target.value)}
                        />
                      </div>
                    </td>

                    {/* Crimping Width Standard Value (Yellow background) */}
                    <td className="border border-black p-0 bg-[#fef9c3]">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent"
                        placeholder="Std"
                        value={r.cwStd}
                        onChange={(e) => handleFieldChange(rIdx, 'cwStd', e.target.value)}
                      />
                    </td>

                    {/* Beginning confirmation (Appearance & Pull strength rowSpan 2) */}
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="OK"
                        value={r.begAppearance}
                        onChange={(e) => handleFieldChange(rIdx, 'begAppearance', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="[N]"
                        value={r.begPullStrength}
                        onChange={(e) => handleFieldChange(rIdx, 'begPullStrength', e.target.value)}
                      />
                    </td>

                    {/* Applicator machine number rowSpan 2 */}
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.applicatorMachineNo}
                        onChange={(e) => handleFieldChange(rIdx, 'applicatorMachineNo', e.target.value)}
                      />
                    </td>

                    {/* Number of good product rowSpan 2 */}
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="number"
                        className="w-full h-full text-center text-[11px] font-black border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.goodQty}
                        onChange={(e) => handleFieldChange(rIdx, 'goodQty', e.target.value)}
                      />
                    </td>

                    {/* Defects (Mode & Quantity 1, 2, 3) rowSpan 2 */}
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        list="defectCodesList"
                        className="w-full h-full text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.defect1Mode}
                        placeholder="Mode"
                        onChange={(e) => handleFieldChange(rIdx, 'defect1Mode', e.target.value.toUpperCase())}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.defect1Qty}
                        onChange={(e) => handleFieldChange(rIdx, 'defect1Qty', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        list="defectCodesList"
                        className="w-full h-full text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.defect2Mode}
                        placeholder="Mode"
                        onChange={(e) => handleFieldChange(rIdx, 'defect2Mode', e.target.value.toUpperCase())}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.defect2Qty}
                        onChange={(e) => handleFieldChange(rIdx, 'defect2Qty', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        list="defectCodesList"
                        className="w-full h-full text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.defect3Mode}
                        placeholder="Mode"
                        onChange={(e) => handleFieldChange(rIdx, 'defect3Mode', e.target.value.toUpperCase())}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.defect3Qty}
                        onChange={(e) => handleFieldChange(rIdx, 'defect3Qty', e.target.value)}
                      />
                    </td>

                    {/* Confirm By Quality: C/H (Begin) & I/H (Begin) */}
                    <td className="border-x border-t border-b-0 border-dashed border-black p-0">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="Begin"
                        value={r.qcChBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'qcChBegin', e.target.value)}
                      />
                    </td>
                    <td className="border-x border-t border-b-0 border-dashed border-black p-0">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="Begin"
                        value={r.qcIhBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'qcIhBegin', e.target.value)}
                      />
                    </td>

                    {/* QC Crimping Width, Visual, Sign, Verified, Sample rowSpan 2 */}
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[9px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.qcCw}
                        onChange={(e) => handleFieldChange(rIdx, 'qcCw', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="OK"
                        value={r.qcVisualStatus}
                        onChange={(e) => handleFieldChange(rIdx, 'qcVisualStatus', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[9px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="Sign"
                        value={r.qcInspectorSign}
                        onChange={(e) => handleFieldChange(rIdx, 'qcInspectorSign', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[9px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="QC Leader"
                        value={r.qcLeaderVerified}
                        onChange={(e) => handleFieldChange(rIdx, 'qcLeaderVerified', e.target.value)}
                      />
                    </td>
                    <td rowSpan={2} className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center text-[9px] border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={r.qcSample}
                        onChange={(e) => handleFieldChange(rIdx, 'qcSample', e.target.value)}
                      />
                    </td>

                    {/* Remarks rowSpan 2 */}
                    <td rowSpan={2} className="border border-black p-0">
                      <div className="flex items-center w-full h-full">
                        <input
                          type="text"
                          className="w-full h-full text-left text-[9.5px] border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                          value={r.remarks}
                          onChange={(e) => handleFieldChange(rIdx, 'remarks', e.target.value)}
                        />
                        {records.length > 1 && (
                          <button
                            type="button"
                            className="text-slate-300 hover:text-rose-600 p-0.5 print:hidden cursor-pointer"
                            title="Remove row"
                            onClick={() => handleRemoveRecord(rIdx)}
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Bottom Sub-Row for Record: Lot No. & Actual values (Begin, Middle, End) */}
                  <tr className="h-6 hover:bg-slate-50/50">
                    {/* Terminal Lot No. */}
                    <td className="border-x border-b border-t-0 border-dashed border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        placeholder="Lot No."
                        value={r.terminalLotNo}
                        onChange={(e) => handleFieldChange(rIdx, 'terminalLotNo', e.target.value)}
                      />
                    </td>

                    {/* Rubber seal Lot No. */}
                    <td className="border-x border-b border-t-0 border-dashed border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        placeholder="Lot No."
                        value={r.rubberSealLotNo}
                        onChange={(e) => handleFieldChange(rIdx, 'rubberSealLotNo', e.target.value)}
                      />
                    </td>

                    {/* Crimping height Actual values: Begin, Middle, End */}
                    <td className="border border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-blue-50"
                        value={r.chActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'chActualBegin', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-blue-50"
                        value={r.chActualMiddle}
                        onChange={(e) => handleFieldChange(rIdx, 'chActualMiddle', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-blue-50"
                        value={r.chActualEnd}
                        onChange={(e) => handleFieldChange(rIdx, 'chActualEnd', e.target.value)}
                      />
                    </td>

                    {/* Insulation height Actual values: Begin, End */}
                    <td className="border border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-blue-50"
                        value={r.ihActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'ihActualBegin', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-blue-50"
                        value={r.ihActualEnd}
                        onChange={(e) => handleFieldChange(rIdx, 'ihActualEnd', e.target.value)}
                      />
                    </td>

                    {/* Crimping Width Actual: Begin */}
                    <td className="border border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9.5px] font-bold border-none outline-none bg-transparent focus:bg-blue-50"
                        value={r.cwActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'cwActualBegin', e.target.value)}
                      />
                    </td>

                    {/* Confirm By Quality: C/H (End) & I/H (End) */}
                    <td className="border-x border-b border-t-0 border-dashed border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="End"
                        value={r.qcChEnd}
                        onChange={(e) => handleFieldChange(rIdx, 'qcChEnd', e.target.value)}
                      />
                    </td>
                    <td className="border-x border-b border-t-0 border-dashed border-black p-0 bg-white">
                      <input
                        type="text"
                        className="w-full h-5 text-center text-[9px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                        placeholder="End"
                        value={r.qcIhEnd}
                        onChange={(e) => handleFieldChange(rIdx, 'qcIhEnd', e.target.value)}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}

              {/* Total Good Product Row (Exact match of Screenshot 1) */}
              <tr className="bg-white font-black text-xs h-7">
                <td colSpan={17} className="border-0"></td>
                <td className="border border-black p-1 text-center bg-white font-black">
                  Total
                </td>
                <td className="border border-black p-1 text-center bg-white font-black text-blue-700">
                  {totalGoodProducts || ''}
                </td>
                <td colSpan={15} className="border-0"></td>
              </tr>
            </tbody>
          </table>

          {/* Datalist for Defect Codes Autocomplete */}
          <datalist id="defectCodesList">
            {DEFECT_CODES.map((d) => (
              <option key={d.code} value={d.code}>
                {d.code} - {d.label}
              </option>
            ))}
          </datalist>

          {/* ========================================================================= */}
          {/* BOTTOM SECTION: Setting Value & Defect Classification Tables (Screenshot 2) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 items-start">
            
            {/* 1. Left Box: Setting value of crimping height & Abnormality Box */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <div>
                <div className="text-[11px] font-black text-black">
                  ◆ Setting value of crimping height
                </div>
                <div className="text-[10px] font-bold text-black leading-tight mt-0.5">
                  Set target value of crimping height is the center range of standard value tolerance.
                </div>
              </div>

              {/* Tolerance Table */}
              <div className="border border-black bg-white">
                <table className="w-full border-collapse text-[10px] text-center font-sans">
                  <thead>
                    <tr className="bg-white border-b border-black font-bold">
                      <th className="border-r border-black p-1">Tolerance of C/H standard value</th>
                      <th className="p-1">Target range of center value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="border-r border-black py-0.5 px-2 text-left">A: ±0.02 mm</td>
                      <td className="py-0.5 px-2 text-left">A: ±0.01 mm</td>
                    </tr>
                    <tr>
                      <td className="border-r border-black py-0.5 px-2 text-left">B: ±0.025 mm</td>
                      <td className="py-0.5 px-2 text-left">B: ±0.01 mm</td>
                    </tr>
                    <tr>
                      <td className="border-r border-black py-0.5 px-2 text-left">C: ±0.03 mm</td>
                      <td className="py-0.5 px-2 text-left">C: ±0.01 mm</td>
                    </tr>
                    <tr>
                      <td className="border-r border-black py-0.5 px-2 text-left">D: ±0.05 mm</td>
                      <td className="py-0.5 px-2 text-left">D: ±0.02 mm</td>
                    </tr>
                    <tr>
                      <td className="border-r border-black py-0.5 px-2 text-left">E: ±0.10 mm</td>
                      <td className="py-0.5 px-2 text-left">E: ±0.04 mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* [Abnormality] Box */}
              <div className="border border-black p-2 bg-white flex flex-col min-h-[90px]">
                <span className="font-black text-[10.5px] text-black mb-1">[Abnormality]</span>
                <textarea
                  rows={3}
                  className="w-full flex-1 border-none outline-none resize-none text-[10px] font-sans bg-transparent"
                  placeholder="Record any abnormality observed here..."
                  value={abnormalityText}
                  onChange={(e) => setAbnormalityText(e.target.value)}
                />
              </div>
            </div>

            {/* 2. Middle Box: Defect Code Table 1 (NG Crimping: State, Terminal deformation, Wire seal) */}
            <div className="lg:col-span-4 border border-black bg-white">
              <table className="w-full border-collapse text-[9.5px] text-left font-sans">
                <thead>
                  <tr className="bg-[#70b8e8] text-black font-extrabold text-center border-b border-black">
                    <th className="border-r border-black p-1 w-20">Big classification</th>
                    <th className="border-r border-black p-1 w-28">Median classification</th>
                    <th className="border-r border-black p-1">Small classification</th>
                    <th className="p-1 w-12">No.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  {/* NG crimping -> Crimping state */}
                  <tr>
                    <td rowSpan={19} className="border-r border-black p-1.5 font-black text-center align-middle bg-white">
                      NG crimping
                    </td>
                    <td rowSpan={13} className="border-r border-black p-1 font-bold text-center align-middle bg-white">
                      Crimping state
                    </td>
                    <td className="border-r border-black p-1">Too long protruding core wire</td>
                    <td className="p-1 text-center font-bold">A-01</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">No protruding core wire</td>
                    <td className="p-1 text-center font-bold">A-02</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Core wire pulling out</td>
                    <td className="p-1 text-center font-bold">A-03</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Core wire breaking</td>
                    <td className="p-1 text-center font-bold">A-04</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Core wire drawn out</td>
                    <td className="p-1 text-center font-bold">A-05</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">No core wire</td>
                    <td className="p-1 text-center font-bold">A-06</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Barrel open</td>
                    <td className="p-1 text-center font-bold">A-07</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Pinched sheath, pinched shrinking tube</td>
                    <td className="p-1 text-center font-bold">A-08</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Sheath lowering, shrinking tube lowering</td>
                    <td className="p-1 text-center font-bold">A-09</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Shrinking tube breaking</td>
                    <td className="p-1 text-center font-bold">A-10</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Shrinking tube sticking</td>
                    <td className="p-1 text-center font-bold">A-11</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Crack</td>
                    <td className="p-1 text-center font-bold">A-12</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Soft-set core wire</td>
                    <td className="p-1 text-center font-bold">A-13</td>
                  </tr>

                  {/* Terminal deformation */}
                  <tr>
                    <td rowSpan={2} className="border-r border-black p-1 font-bold text-center align-middle bg-white">
                      Terminal deformation
                    </td>
                    <td className="border-r border-black p-1">Mating part, spring tongue damage</td>
                    <td className="p-1 text-center font-bold">B-01</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Lance, stabilizer deformation</td>
                    <td className="p-1 text-center font-bold">B-02</td>
                  </tr>

                  {/* Wire seal state (Waterproof terminal only) */}
                  <tr>
                    <td rowSpan={4} className="border-r border-black p-1 font-bold text-center align-middle bg-white text-[8.5px] leading-tight">
                      Wire seal state<br />(Waterproof terminal only)
                    </td>
                    <td className="border-r border-black p-1">Pinched wire seal, pinched wire seal rib</td>
                    <td className="p-1 text-center font-bold">C-01</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Wire seal lowering</td>
                    <td className="p-1 text-center font-bold">C-02</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Wire seal scratch, breaking</td>
                    <td className="p-1 text-center font-bold">C-03</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Reverse insertion of wire seal</td>
                    <td className="p-1 text-center font-bold">C-04</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 3. Right Box: Defect Code Table 2 (Standard, Crimping state, Terminal deformation, Potential failure & Except NG) */}
            <div className="lg:col-span-5 border border-black bg-white">
              <table className="w-full border-collapse text-[9.5px] text-left font-sans">
                <thead>
                  <tr className="bg-[#70b8e8] text-black font-extrabold text-center border-b border-black">
                    <th className="border-r border-black p-1 w-20">Big classification</th>
                    <th className="border-r border-black p-1 w-32">Median classification</th>
                    <th className="border-r border-black p-1">Small classification</th>
                    <th className="p-1 w-12">No.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  {/* NG crimping */}
                  <tr>
                    <td rowSpan={13} className="border-r border-black p-1.5 font-black text-center align-middle bg-white">
                      NG crimping
                    </td>
                    <td className="border-r border-black p-1 font-bold text-center bg-white">
                      Standard
                    </td>
                    <td className="border-r border-black p-1">NG crimping standard (C/H, I/H)</td>
                    <td className="p-1 text-center font-bold">D-01</td>
                  </tr>

                  {/* Crimping state */}
                  <tr>
                    <td rowSpan={7} className="border-r border-black p-1 font-bold text-center align-middle bg-white">
                      Crimping state
                    </td>
                    <td className="border-r border-black p-1">NG bell-mouth</td>
                    <td className="p-1 text-center font-bold">E-01</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">NG cut-off tab size</td>
                    <td className="p-1 text-center font-bold">E-02</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Curling burr</td>
                    <td className="p-1 text-center font-bold">E-03</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Crimping burr</td>
                    <td className="p-1 text-center font-bold">E-04</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Anvil damage</td>
                    <td className="p-1 text-center font-bold">E-05</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Core wire seeing</td>
                    <td className="p-1 text-center font-bold">E-06</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Crimper damage</td>
                    <td className="p-1 text-center font-bold">E-07</td>
                  </tr>

                  {/* Terminal deformation */}
                  <tr>
                    <td rowSpan={4} className="border-r border-black p-1 font-bold text-center align-middle bg-white">
                      Terminal deformation
                    </td>
                    <td className="border-r border-black p-1">Bend-up</td>
                    <td className="p-1 text-center font-bold">F-01</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Bend-down</td>
                    <td className="p-1 text-center font-bold">F-02</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Twist</td>
                    <td className="p-1 text-center font-bold">F-03</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1">Rolling</td>
                    <td className="p-1 text-center font-bold">F-04</td>
                  </tr>

                  {/* Potential failure */}
                  <tr>
                    <td className="border-r border-black p-1 font-bold text-center bg-white">
                      Potential failure
                    </td>
                    <td className="border-r border-black p-1"></td>
                    <td className="p-1 text-center font-bold">H-01</td>
                  </tr>

                  {/* Except NG crimping */}
                  <tr>
                    <td rowSpan={3} className="border-r border-black p-1.5 font-black text-center align-middle bg-white leading-tight">
                      Except NG crimping
                    </td>
                    <td className="border-r border-black p-1 font-bold text-center bg-white">
                      NG wire length
                    </td>
                    <td className="border-r border-black p-1"></td>
                    <td className="p-1 text-center font-bold">I-01</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1 font-bold text-center bg-white">
                      NG stripping
                    </td>
                    <td className="border-r border-black p-1"></td>
                    <td className="p-1 text-center font-bold">I-02</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1 font-bold text-center bg-white">
                      Crimping state
                    </td>
                    <td className="border-r border-black p-1 font-bold text-rose-700">CFM error</td>
                    <td className="p-1 text-center font-bold text-rose-700">J-01</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
