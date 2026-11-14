import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import { FileSpreadsheet, Printer, Check, RotateCcw, Plus } from 'lucide-react';

const createEmptyCombination = () => [
  { wire: '', qty: '' },
  { wire: '', qty: '' },
  { wire: '', qty: '' },
  { wire: '', qty: '' }
];

const createEmptyRecord = (id) => ({
  id,
  productNo: '',
  lotNo: '',
  jointNo: '',
  terminalName: '',
  terminalLotNo: '',
  combinations: createEmptyCombination(),
  strippingResult: '', // OK / NG
  tensile: '',
  appearance: '',
  protrudingCoreWire: '',
  // Insulation height
  ihStdMin: '',
  ihStdMax: '',
  ihActualBegin: '',
  ihActualEnd: '',
  // Crimping height
  chStdMin: '',
  chStdMax: '',
  chActualBeginning: '',
  chActualMiddle: '',
  chActualFinishing: '',
  applicatorMachineNo: '',
  yield: '',
  // Defect occurring situation during production
  defectNoCoreWireProtruding: '',
  defectInsulationBiting: '',
  defectCoreWireDrawnOut: '',
  defectCoreWireSag: '',
  defectCoreWireBreaking: '',
  defectTerminalDeformation: '',
  defectOther: '',
  // Confirm By Quality
  qcCrimpingHeight: '',
  qcInsulationHeight: '',
  qcVisualStatus: '',
  qcInspectorSign: '',
  qcVerifiedLeader: '',
  qcSample: '',
  notes: ''
});

const INITIAL_ROWS = Array.from({ length: 10 }, (_, i) => createEmptyRecord(i + 1));

export default function InspectionReportSheet({ machine, onClose }) {
  const machineName = machine?.name || 'JCR 01';
  const modelName = machine?.model || 'JCR-01';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `jcr_inspection_report_${machineName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      docNo: 'FRM-WH-PE-263',
      revision: 'Revision 00 2024.06.13',
      baseFormatNo: 'Base Format No.[FAS] OSM-10CB110 Format 3-E',
      baseRevision: 'Revision 8 2013.06.14',
      checkedBy: '',
      page: '1 / 1',
      dateShift: new Date().toISOString().split('T')[0] + ' (A)',
      operatorName: '',
      crimpingMachine: machineName,
      chMicrometer: '',
      bladeMicrometer: '',
      tensileMachine: '',
      abnormality: ''
    };
  });

  const [rows, setRows] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_rows`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_ROWS;
  });

  const [savedToast, setSavedToast] = useState('');

  const handleHeaderChange = (field, val) => {
    setHeaderInfo((prev) => ({ ...prev, [field]: val }));
  };

  const handleRowChange = (id, field, val) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleCombinationChange = (rowId, combIdx, field, val) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r;
        const newCombs = [...r.combinations];
        newCombs[combIdx] = { ...newCombs[combIdx], [field]: val };
        return { ...r, combinations: newCombs };
      })
    );
  };

  const handleAddRow = () => {
    setRows((prev) => [...prev, createEmptyRecord(Date.now())]);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_header`, JSON.stringify(headerInfo));
      localStorage.setItem(`${storageKey}_rows`, JSON.stringify(rows));
      setSavedToast('Inspection Report saved successfully!');
      setTimeout(() => setSavedToast(''), 3000);
    } catch (e) {
      setSavedToast('Error saving data to local storage.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all inspection records and values on this sheet?')) {
      setRows(INITIAL_ROWS);
      setHeaderInfo((prev) => ({
        ...prev,
        checkedBy: '',
        operatorName: '',
        chMicrometer: '',
        bladeMicrometer: '',
        tensileMachine: '',
        abnormality: ''
      }));
      try {
        localStorage.removeItem(`${storageKey}_header`);
        localStorage.removeItem(`${storageKey}_rows`);
      } catch (e) { }
      setSavedToast('Inspection report reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  // Defect column totals
  const totalNoCore = rows.reduce((acc, r) => acc + (Number(r.defectNoCoreWireProtruding) || 0), 0);
  const totalInsulationBiting = rows.reduce((acc, r) => acc + (Number(r.defectInsulationBiting) || 0), 0);
  const totalDrawnOut = rows.reduce((acc, r) => acc + (Number(r.defectCoreWireDrawnOut) || 0), 0);
  const totalSag = rows.reduce((acc, r) => acc + (Number(r.defectCoreWireSag) || 0), 0);
  const totalBreaking = rows.reduce((acc, r) => acc + (Number(r.defectCoreWireBreaking) || 0), 0);
  const totalDeformation = rows.reduce((acc, r) => acc + (Number(r.defectTerminalDeformation) || 0), 0);
  const totalOther = rows.reduce((acc, r) => acc + (Number(r.defectOther) || 0), 0);

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Top Header Navigation */}
      <ChecksheetHeaderNav
        title="INSPECTION REPORT CHECKSHEET"
        subtitle={`${displayMachine} — Daily record of joint fitting operation (FRM-WH-PE-263)`}
        icon={FileSpreadsheet}
        iconBgClass="bg-indigo-100 text-indigo-800"
        onClose={onClose}
        onReset={handleReset}
        onSave={handleSave}
        savedToast={savedToast}
        showSwitcher={false}

      />

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm">
          <span className="flex items-center gap-2">
            <Check size={16} className="text-emerald-600" />
            {savedToast}
          </span>
          <button
            type="button"
            className="text-emerald-700 font-bold hover:underline cursor-pointer"
            onClick={() => setSavedToast('')}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Sheet Paper Container */}
      <div className="bg-white border-2 border-black p-2 md:p-3 shadow-md rounded-sm overflow-x-auto">
        <div className="min-w-[1950px] w-full text-black select-text font-sans">
          {/* Top Title and Document Control Box */}
          <div className="flex items-start justify-between mb-2">
            {/* Empty spacer to balance header */}
            <div className="w-[320px]"></div>

            {/* Title (Center, Underlined) */}
            <div className="text-center pt-2">
              <h1 className="text-xl font-bold text-black underline tracking-wide uppercase m-0">
                Daily record of joint fitting operation
              </h1>
            </div>

            {/* Document Control Box (Top Right) */}
            <div className="w-[320px] text-right">
              <table className="border-collapse border border-black text-[10px] w-full bg-white font-semibold">
                <tbody>
                  <tr className="border-b border-black">
                    <td colSpan={2} className="p-1 text-center font-bold tracking-wider">
                      {headerInfo.docNo}
                    </td>
                  </tr>
                  <tr className="border-b border-black">
                    <td colSpan={2} className="p-0.5 text-center text-blue-700 font-bold">
                      {headerInfo.revision}
                    </td>
                  </tr>
                  <tr className="border-b border-black">
                    <td colSpan={2} className="p-0.5 text-center text-[9.5px]">
                      {headerInfo.baseFormatNo}
                    </td>
                  </tr>
                  <tr className="border-b border-black">
                    <td colSpan={2} className="p-0.5 text-center text-blue-700 font-bold text-[9.5px]">
                      {headerInfo.baseRevision}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1 w-3/4 text-center">
                      <div className="text-[9px] font-bold">Checked by</div>
                      <input
                        type="text"
                        placeholder="Sign"
                        value={headerInfo.checkedBy}
                        onChange={(e) => handleHeaderChange('checkedBy', e.target.value)}
                        className="w-full text-center text-[10px] outline-none border-0 bg-transparent font-semibold"
                      />
                    </td>
                    <td className="p-1 w-1/4 text-center">
                      <div className="text-[9px] font-bold">Page</div>
                      <input
                        type="text"
                        value={headerInfo.page}
                        onChange={(e) => handleHeaderChange('page', e.target.value)}
                        className="w-full text-center text-[10px] outline-none border-0 bg-transparent font-semibold"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Header Metadata Bar */}
          <div className="border border-black mb-2 bg-white">
            <div className="grid grid-cols-12 text-center text-[11px] font-bold border-b border-black">
              <div className="col-span-2 border-r border-black p-1 bg-white flex items-center justify-center">
                Date (shift)
              </div>
              <div className="col-span-2 border-r border-black p-1 bg-white flex items-center justify-center">
                Operator's full name
              </div>
              <div className="col-span-8 p-1 bg-white text-center">
                Machine number
              </div>
            </div>

            <div className="grid grid-cols-12 text-center text-[10.5px]">
              <div className="col-span-2 border-r border-black p-1">
                <input
                  type="text"
                  value={headerInfo.dateShift}
                  onChange={(e) => handleHeaderChange('dateShift', e.target.value)}
                  className="w-full text-center font-semibold outline-none border-0 bg-transparent"
                />
              </div>
              <div className="col-span-2 border-r border-black p-1">
                <input
                  type="text"
                  placeholder="Operator Name"
                  value={headerInfo.operatorName}
                  onChange={(e) => handleHeaderChange('operatorName', e.target.value)}
                  className="w-full text-center font-semibold outline-none border-0 bg-transparent"
                />
              </div>

              {/* 4 Machine Number Sub-columns */}
              <div className="col-span-2 border-r border-black p-0 flex flex-col">
                <div className="border-b border-black p-0.5 text-[9.5px] font-bold bg-white">
                  Crimping machine
                </div>
                <input
                  type="text"
                  value={headerInfo.crimpingMachine}
                  onChange={(e) => handleHeaderChange('crimpingMachine', e.target.value)}
                  className="w-full text-center font-semibold outline-none border-0 bg-transparent p-1"
                />
              </div>
              <div className="col-span-2 border-r border-black p-0 flex flex-col">
                <div className="border-b border-black p-0.5 text-[9.5px] font-bold bg-white">
                  C/H micrometer
                </div>
                <input
                  type="text"
                  placeholder="Micrometer No."
                  value={headerInfo.chMicrometer}
                  onChange={(e) => handleHeaderChange('chMicrometer', e.target.value)}
                  className="w-full text-center font-semibold outline-none border-0 bg-transparent p-1"
                />
              </div>
              <div className="col-span-2 border-r border-black p-0 flex flex-col">
                <div className="border-b border-black p-0.5 text-[9.5px] font-bold bg-white">
                  Blade micrometer
                </div>
                <input
                  type="text"
                  placeholder="Blade Micrometer No."
                  value={headerInfo.bladeMicrometer}
                  onChange={(e) => handleHeaderChange('bladeMicrometer', e.target.value)}
                  className="w-full text-center font-semibold outline-none border-0 bg-transparent p-1"
                />
              </div>
              <div className="col-span-2 p-0 flex flex-col">
                <div className="border-b border-black p-0.5 text-[9.5px] font-bold bg-white">
                  Tensile testing machine
                </div>
                <input
                  type="text"
                  placeholder="Tensile Machine No."
                  value={headerInfo.tensileMachine}
                  onChange={(e) => handleHeaderChange('tensileMachine', e.target.value)}
                  className="w-full text-center font-semibold outline-none border-0 bg-transparent p-1"
                />
              </div>
            </div>
          </div>

          {/* Master Table */}
          <table className="w-full border-collapse border border-black text-xs text-center">
            <thead>
              {/* Row 1: Main Column Headers */}
              <tr className="border-b border-black font-bold text-[10.5px] bg-white">
                <th rowSpan={3} className="border-r border-black p-1 align-middle w-24">
                  Product No.
                </th>
                <th rowSpan={3} className="border-r border-black p-1 align-middle w-20">
                  Lot No.
                </th>
                <th rowSpan={3} className="border-r border-black p-1 align-middle w-14">
                  Joint<br />No.
                </th>
                <th rowSpan={3} className="border-r border-black p-1 align-middle w-24">
                  Terminal<br />name<br />
                  <span className="text-[9.5px] font-normal text-blue-700">(Lot No.)</span>
                </th>
                <th colSpan={3} className="border-r border-black p-1 align-middle w-48">
                  Combination
                </th>
                <th className="border-r border-black p-1 align-middle w-28">
                  Confirmation<br />during sampling<br />stage
                </th>
                <th colSpan={3} className="border-r border-black p-1 align-middle w-48">
                  Crimping confirmation<br />during sampling stage
                </th>
                <th colSpan={3} className="border-r border-black p-1 align-middle w-44">
                  Insulation height
                </th>
                <th colSpan={4} className="border-r border-black p-1 align-middle w-56">
                  Crimping height
                </th>
                <th rowSpan={3} className="border-r border-black p-1 align-middle w-20 text-[9.5px] leading-tight">
                  Applicator<br />&<br />machine<br />number
                </th>
                <th rowSpan={3} className="border-r border-black p-1 align-middle w-12 text-[10px]">
                  Yield
                </th>

                {/* Defect occurring situation during production (vertical headers) */}
                <th colSpan={7} className="border-r border-black p-1 text-[9.5px]">
                  Defect occurring situation during production
                </th>

                {/* Confirm By Quality */}
                <th colSpan={6} className="border-r border-black p-1 text-[10px]">
                  Confirm By Quality
                </th>

                <th rowSpan={3} className="p-1 align-middle w-24">
                  Notes
                </th>
              </tr>

              {/* Row 2: Sub-headers */}
              <tr className="border-b border-black font-bold text-[9.5px] bg-white">
                {/* Combination subheaders */}
                <th rowSpan={2} className="border-r border-black p-0.5 w-28">
                  Wire type - size
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 w-5">
                  *
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 w-14">
                  Quantity
                </th>

                {/* Stripping length confirmation */}
                <th rowSpan={2} className="border-r border-black p-0.5 text-[8.5px] leading-tight">
                  Confirmation<br />result of stripping<br />length
                </th>

                {/* Sampling Stage: Tensile, Appearance, Protruding */}
                <th rowSpan={2} className="border-r border-black p-0.5 w-16 text-[9px]">
                  Tensile<br />(N)
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 w-14 text-[8.5px]">
                  Appearance
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 w-18 text-[7.5px] leading-tight">
                  Protruding core wire<br />1mm or less &<br />within 2mm
                </th>

                {/* Insulation Height: Standard & Actual */}
                <th className="border-r border-black p-0.5 bg-yellow-100/70" colSpan={1}>
                  Standard value
                </th>
                <th className="border-r border-black p-0.5" colSpan={2}>
                  Actual value
                </th>

                {/* Crimping Height: Standard & Actual */}
                <th className="border-r border-black p-0.5 bg-yellow-100/70" colSpan={1}>
                  Standard value
                </th>
                <th className="border-r border-black p-0.5" colSpan={3}>
                  Actual value
                </th>

                {/* Defect Column Titles (Rotated or vertical) */}
                <th rowSpan={2} className="border-r border-black p-1 text-[8.5px] w-8 [writing-mode:vertical-lr] rotate-180">
                  No core wire protruding
                </th>
                <th rowSpan={2} className="border-r border-black p-1 text-[8.5px] w-8 [writing-mode:vertical-lr] rotate-180">
                  Insulation biting
                </th>
                <th rowSpan={2} className="border-r border-black p-1 text-[8.5px] w-8 [writing-mode:vertical-lr] rotate-180">
                  Core wire drawn out
                </th>
                <th rowSpan={2} className="border-r border-black p-1 text-[8.5px] w-8 [writing-mode:vertical-lr] rotate-180">
                  Core wire sag
                </th>
                <th rowSpan={2} className="border-r border-black p-1 text-[8.5px] w-8 [writing-mode:vertical-lr] rotate-180">
                  Core wire breaking
                </th>
                <th rowSpan={2} className="border-r border-black p-1 text-[8.5px] w-8 [writing-mode:vertical-lr] rotate-180">
                  Terminal deformation
                </th>
                <th rowSpan={2} className="border-r border-black p-1 text-[8.5px] w-8 [writing-mode:vertical-lr] rotate-180">
                  Other
                </th>

                {/* QC Subheaders */}
                <th rowSpan={2} className="border-r border-black p-0.5 text-[8px] w-14 leading-tight">
                  Crimping<br />Height
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 text-[8px] w-14 leading-tight">
                  Insulation<br />Height
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 text-[8.5px] w-12">
                  Visual<br />Status
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 text-[8px] w-16 leading-tight">
                  QC<br />Inspector<br />Sign/Stamp
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 text-[8px] w-16 leading-tight">
                  Verified<br />By QC<br />Leader
                </th>
                <th rowSpan={2} className="border-r border-black p-0.5 text-[8.5px] w-12">
                  Sample
                </th>
              </tr>

              {/* Row 3: Sub-values for Insulation & Crimping height */}
              <tr className="border-b border-black font-bold text-[8.5px] bg-white">
                {/* Insulation Height: Standard range / Begin / End */}
                <th className="border-r border-black p-0.5 w-20 bg-yellow-100/70">
                  Min ~ Max
                </th>
                <th className="border-r border-black p-0.5 w-12">Begin</th>
                <th className="border-r border-black p-0.5 w-12">End</th>

                {/* Crimping Height: Standard range / Beginning / Middle / Finishing */}
                <th className="border-r border-black p-0.5 w-20 bg-yellow-100/70">
                  Min ~ Max
                </th>
                <th className="border-r border-black p-0.5 w-12">Beginning</th>
                <th className="border-r border-black p-0.5 w-12">Middle</th>
                <th className="border-r border-black p-0.5 w-12">Finishing</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={row.id} className="border-b border-black hover:bg-slate-50/50 transition-colors">
                  {/* Product No. */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.productNo}
                      onChange={(e) => handleRowChange(row.id, 'productNo', e.target.value)}
                      className="w-full text-center text-[10.5px] font-semibold border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Lot No. */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.lotNo}
                      onChange={(e) => handleRowChange(row.id, 'lotNo', e.target.value)}
                      className="w-full text-center text-[10.5px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Joint No. */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.jointNo}
                      onChange={(e) => handleRowChange(row.id, 'jointNo', e.target.value)}
                      className="w-full text-center text-[10.5px] font-bold border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Terminal name & Lot No. */}
                  <td className="border-r border-black p-0.5 align-middle flex-col">
                    <input
                      type="text"
                      placeholder="Terminal"
                      value={row.terminalName}
                      onChange={(e) => handleRowChange(row.id, 'terminalName', e.target.value)}
                      className="w-full text-center text-[10.5px] font-medium border-0 outline-none bg-transparent"
                    />
                    <input
                      type="text"
                      placeholder="(Lot No.)"
                      value={row.terminalLotNo}
                      onChange={(e) => handleRowChange(row.id, 'terminalLotNo', e.target.value)}
                      className="w-full text-center text-[9.5px] text-blue-700 border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Combination (4 sub-rows: Wire type - size * Quantity) */}
                  <td colSpan={3} className="border-r border-black p-0 align-middle">
                    <div className="flex flex-col divide-y divide-slate-200">
                      {row.combinations.map((comb, cIdx) => (
                        <div key={cIdx} className="flex items-center h-[22px]">
                          <input
                            type="text"
                            value={comb.wire}
                            onChange={(e) => handleCombinationChange(row.id, cIdx, 'wire', e.target.value)}
                            className="w-28 text-center text-[10px] border-0 outline-none bg-transparent px-0.5"
                          />
                          <span className="w-5 text-center text-[10px] font-bold text-slate-500 border-x border-slate-200">
                            *
                          </span>
                          <input
                            type="text"
                            value={comb.qty}
                            onChange={(e) => handleCombinationChange(row.id, cIdx, 'qty', e.target.value)}
                            className="w-14 text-center text-[10px] border-0 outline-none bg-transparent px-0.5"
                          />
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Confirmation result of stripping length (OK / NG) */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <div className="flex flex-col items-center justify-center gap-1 font-bold text-[10px]">
                      <button
                        type="button"
                        onClick={() => handleRowChange(row.id, 'strippingResult', row.strippingResult === 'OK' ? '' : 'OK')}
                        className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${row.strippingResult === 'OK' ? 'bg-emerald-600 text-white font-black' : 'hover:bg-slate-100 text-slate-700'
                          }`}
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRowChange(row.id, 'strippingResult', row.strippingResult === 'NG' ? '' : 'NG')}
                        className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${row.strippingResult === 'NG' ? 'bg-rose-600 text-white font-black' : 'hover:bg-slate-100 text-slate-700'
                          }`}
                      >
                        NG
                      </button>
                    </div>
                  </td>

                  {/* Tensile (N) */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.tensile}
                      onChange={(e) => handleRowChange(row.id, 'tensile', e.target.value)}
                      className="w-full text-center text-[10.5px] border-0 outline-none bg-transparent font-medium"
                    />
                  </td>

                  {/* Appearance */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.appearance}
                      onChange={(e) => handleRowChange(row.id, 'appearance', e.target.value)}
                      className="w-full text-center text-[10.5px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Protruding core wire 1mm or less & within 2mm */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.protrudingCoreWire}
                      onChange={(e) => handleRowChange(row.id, 'protrudingCoreWire', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Insulation Height: Standard range */}
                  <td className="border-r border-black p-0.5 align-middle bg-yellow-50/50">
                    <div className="flex items-center justify-center gap-0.5">
                      <input
                        type="text"
                        value={row.ihStdMin}
                        onChange={(e) => handleRowChange(row.id, 'ihStdMin', e.target.value)}
                        className="w-9 text-center text-[10px] border-0 outline-none bg-transparent"
                      />
                      <span>~</span>
                      <input
                        type="text"
                        value={row.ihStdMax}
                        onChange={(e) => handleRowChange(row.id, 'ihStdMax', e.target.value)}
                        className="w-9 text-center text-[10px] border-0 outline-none bg-transparent"
                      />
                    </div>
                  </td>

                  {/* Insulation Height: Actual Begin */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.ihActualBegin}
                      onChange={(e) => handleRowChange(row.id, 'ihActualBegin', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Insulation Height: Actual End */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.ihActualEnd}
                      onChange={(e) => handleRowChange(row.id, 'ihActualEnd', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Crimping Height: Standard range */}
                  <td className="border-r border-black p-0.5 align-middle bg-yellow-50/50">
                    <div className="flex items-center justify-center gap-0.5">
                      <input
                        type="text"
                        value={row.chStdMin}
                        onChange={(e) => handleRowChange(row.id, 'chStdMin', e.target.value)}
                        className="w-9 text-center text-[10px] border-0 outline-none bg-transparent"
                      />
                      <span>~</span>
                      <input
                        type="text"
                        value={row.chStdMax}
                        onChange={(e) => handleRowChange(row.id, 'chStdMax', e.target.value)}
                        className="w-9 text-center text-[10px] border-0 outline-none bg-transparent"
                      />
                    </div>
                  </td>

                  {/* Crimping Height: Actual Beginning */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.chActualBeginning}
                      onChange={(e) => handleRowChange(row.id, 'chActualBeginning', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Crimping Height: Actual Middle */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.chActualMiddle}
                      onChange={(e) => handleRowChange(row.id, 'chActualMiddle', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Crimping Height: Actual Finishing */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.chActualFinishing}
                      onChange={(e) => handleRowChange(row.id, 'chActualFinishing', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Applicator & machine number */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.applicatorMachineNo}
                      onChange={(e) => handleRowChange(row.id, 'applicatorMachineNo', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Yield */}
                  <td className="border-r border-black p-0.5 align-middle text-slate-400 font-bold">
                    <input
                      type="text"
                      placeholder="/"
                      value={row.yield}
                      onChange={(e) => handleRowChange(row.id, 'yield', e.target.value)}
                      className="w-full text-center text-[10.5px] border-0 outline-none bg-transparent font-medium text-black"
                    />
                  </td>

                  {/* 7 Defect Columns */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.defectNoCoreWireProtruding}
                      onChange={(e) => handleRowChange(row.id, 'defectNoCoreWireProtruding', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.defectInsulationBiting}
                      onChange={(e) => handleRowChange(row.id, 'defectInsulationBiting', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.defectCoreWireDrawnOut}
                      onChange={(e) => handleRowChange(row.id, 'defectCoreWireDrawnOut', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.defectCoreWireSag}
                      onChange={(e) => handleRowChange(row.id, 'defectCoreWireSag', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.defectCoreWireBreaking}
                      onChange={(e) => handleRowChange(row.id, 'defectCoreWireBreaking', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.defectTerminalDeformation}
                      onChange={(e) => handleRowChange(row.id, 'defectTerminalDeformation', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.defectOther}
                      onChange={(e) => handleRowChange(row.id, 'defectOther', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Confirm By Quality */}
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.qcCrimpingHeight}
                      onChange={(e) => handleRowChange(row.id, 'qcCrimpingHeight', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.qcInsulationHeight}
                      onChange={(e) => handleRowChange(row.id, 'qcInsulationHeight', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.qcVisualStatus}
                      onChange={(e) => handleRowChange(row.id, 'qcVisualStatus', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.qcInspectorSign}
                      onChange={(e) => handleRowChange(row.id, 'qcInspectorSign', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.qcVerifiedLeader}
                      onChange={(e) => handleRowChange(row.id, 'qcVerifiedLeader', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                  <td className="border-r border-black p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.qcSample}
                      onChange={(e) => handleRowChange(row.id, 'qcSample', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>

                  {/* Notes */}
                  <td className="p-0.5 align-middle">
                    <input
                      type="text"
                      value={row.notes}
                      onChange={(e) => handleRowChange(row.id, 'notes', e.target.value)}
                      className="w-full text-center text-[10px] border-0 outline-none bg-transparent"
                    />
                  </td>
                </tr>
              ))}

              {/* Total Row matching screenshot */}
              <tr className="border-t-2 border-black font-bold text-xs bg-slate-50">
                <td colSpan={18} className="border-r border-black p-1 text-right pr-4">
                  Total
                </td>
                <td className="border-r border-black p-1 text-center font-bold text-xs">
                  {totalNoCore || ''}
                </td>
                <td className="border-r border-black p-1 text-center font-bold text-xs">
                  {totalInsulationBiting || ''}
                </td>
                <td className="border-r border-black p-1 text-center font-bold text-xs">
                  {totalDrawnOut || ''}
                </td>
                <td className="border-r border-black p-1 text-center font-bold text-xs">
                  {totalSag || ''}
                </td>
                <td className="border-r border-black p-1 text-center font-bold text-xs">
                  {totalBreaking || ''}
                </td>
                <td className="border-r border-black p-1 text-center font-bold text-xs">
                  {totalDeformation || ''}
                </td>
                <td className="border-r border-black p-1 text-center font-bold text-xs">
                  {totalOther || ''}
                </td>
                <td colSpan={7} className="p-1"></td>
              </tr>
            </tbody>
          </table>

          {/* Add Row Button (Print Hidden) */}
          <div className="mt-2 flex justify-start print:hidden">
            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Product Row</span>
            </button>
          </div>

          {/* Bottom Section: Crimp Height Setting Value Table + Abnormality Box */}
          <div className="mt-4 grid grid-cols-12 gap-4 items-start">
            {/* Left: Crimp height setting value Table */}
            <div className="col-span-4 border border-black p-2 bg-white text-xs">
              <div className="font-bold text-[11px] text-black">
                ◆ Crimp height setting value
              </div>
              <div className="text-[10px] text-slate-800 leading-tight mt-0.5 mb-2">
                The initial target value of crimp-height is set in the range of crimp-height standard central value.
              </div>

              <table className="w-full border-collapse border border-black text-[10.5px] text-center">
                <thead>
                  <tr className="border-b border-black bg-slate-50 font-bold">
                    <th className="border-r border-black p-1">
                      Tolerance of crimp-height<br />standard value
                    </th>
                    <th className="p-1">
                      Target range of crimp-height<br />standard center value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black">
                    <td className="border-r border-black p-1 font-semibold">
                      0 ± 0.05
                    </td>
                    <td className="p-1 font-semibold">
                      0 ± 0.02
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-1 font-semibold">
                      0 ± 0.10
                    </td>
                    <td className="p-1 font-semibold">
                      0 ± 0.04
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right: [Abnormality] Box */}
            <div className="col-span-8 border border-black p-2 bg-white min-h-[140px] flex flex-col justify-between">
              <div className="font-bold text-[11px] text-black mb-1">
                [Abnormality]
              </div>
              <textarea
                rows={5}
                value={headerInfo.abnormality}
                onChange={(e) => handleHeaderChange('abnormality', e.target.value)}
                placeholder="Record any abnormality, root cause and immediate corrective actions taken during the shift..."
                className="w-full h-full p-1.5 text-xs text-black border border-slate-300 rounded outline-none resize-none focus:border-black font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

