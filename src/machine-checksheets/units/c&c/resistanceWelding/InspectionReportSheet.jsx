import React, { useState, useEffect } from 'react';
import { Plus, Printer, RotateCcw, ArrowLeft, FileSpreadsheet } from 'lucide-react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';

const WIRE_ROWS_PER_BLOCK = 7;

const createEmptyWireRow = () => ({
  wireTypeSize: '',
  quantity: '',
  peelingStrength: ''
});

const createEmptyJointBlock = (id) => ({
  id,
  whProduct: '',
  indicationNo: '',
  kanbanSymbol: '',
  jointNo: '',
  weldingConditionNo: '',
  electrode: '',
  // Left side (L)
  leftWires: Array.from({ length: WIRE_ROWS_PER_BLOCK }, () => createEmptyWireRow()),
  leftStrippingResult: 'OK', // 'OK' | 'NG'
  // Left side (R) [spelled Left side (R) in the official sheet]
  rightWires: Array.from({ length: WIRE_ROWS_PER_BLOCK }, () => createEmptyWireRow()),
  rightStrippingResult: 'OK',
  appearance: '',
  counterReset: '',
  // W/H (Weld Height)
  whStdMin: '',
  whStdMax: '',
  whBegin: '',
  whEnd: '',
  // W/W (Weld Width)
  wwStd: '±0.1mm',
  wwBegin: '',
  // Counter Number
  counterOk: '',
  counterNg: '',
  // Defective occurrence situation
  defCoreBending: '',
  defCoreBreaking: '',
  defCoreDrawnOut: '',
  defProtruding: '',
  defTooLongCore: '',
  defOther: '',
  // Confirm By Quality
  qcWeldHeight: '',
  qcVisualStatus: 'OK',
  qcInspectorSign: '',
  qcVerifiedByLeader: ''
});

const INITIAL_BLOCKS = [
  createEmptyJointBlock(1),
  createEmptyJointBlock(2),
  createEmptyJointBlock(3),
  createEmptyJointBlock(4)
];

export default function InspectionReportSheet({ machine, onClose }) {
  const machineKey = machine?.id || machine?.name || 'rw_default';
  const storageKey = `rw_inspection_report_${machineKey}`;

  // Top Operation Header State
  const [opMeta, setOpMeta] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_meta`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      operationDate: new Date().toISOString().split('T')[0],
      beginTime: '',
      endTime: '',
      operatorName: '',
      ultraSonicMachineNo: machine?.name || 'R/W-01',
      bladeMicrometerNo: '',
      tensileMachineNo: '',
      confirmationSign: '',
      pageNumber: '1 / 1',
      abnormality: ''
    };
  });

  // Table Blocks State
  const [blocks, setBlocks] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_blocks`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_BLOCKS;
  });

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_meta`, JSON.stringify(opMeta));
    } catch (e) { }
  }, [opMeta, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_blocks`, JSON.stringify(blocks));
    } catch (e) { }
  }, [blocks, storageKey]);

  // Handlers
  const handleMetaChange = (field, value) => {
    setOpMeta(prev => ({ ...prev, [field]: value }));
  };

  const handleBlockChange = (blockIdx, field, value) => {
    setBlocks(prev => {
      const copy = [...prev];
      copy[blockIdx] = { ...copy[blockIdx], [field]: value };
      return copy;
    });
  };

  const handleWireChange = (blockIdx, side, wireIdx, field, value) => {
    setBlocks(prev => {
      const copy = [...prev];
      const wires = side === 'left' ? [...copy[blockIdx].leftWires] : [...copy[blockIdx].rightWires];
      wires[wireIdx] = { ...wires[wireIdx], [field]: value };
      if (side === 'left') {
        copy[blockIdx] = { ...copy[blockIdx], leftWires: wires };
      } else {
        copy[blockIdx] = { ...copy[blockIdx], rightWires: wires };
      }
      return copy;
    });
  };

  const handleToggleStripping = (blockIdx, side, result) => {
    setBlocks(prev => {
      const copy = [...prev];
      const field = side === 'left' ? 'leftStrippingResult' : 'rightStrippingResult';
      copy[blockIdx] = { ...copy[blockIdx], [field]: result };
      return copy;
    });
  };

  const handleAddBlock = () => {
    setBlocks(prev => [...prev, createEmptyJointBlock(prev.length + 1)]);
  };

  const handleReset = () => {
    if (window.confirm('Reset all fields in this inspection report to empty defaults?')) {
      const empty = [
        createEmptyJointBlock(1),
        createEmptyJointBlock(2),
        createEmptyJointBlock(3),
        createEmptyJointBlock(4)
      ];
      setBlocks(empty);
      setOpMeta({
        operationDate: new Date().toISOString().split('T')[0],
        beginTime: '',
        endTime: '',
        operatorName: '',
        ultraSonicMachineNo: machine?.name || 'R/W-01',
        bladeMicrometerNo: '',
        tensileMachineNo: '',
        confirmationSign: '',
        pageNumber: '1 / 1',
        abnormality: ''
      });
      localStorage.removeItem(`${storageKey}_meta`);
      localStorage.removeItem(`${storageKey}_blocks`);
    }
  };

  // Calculate totals
  const totalOk = blocks.reduce((acc, b) => acc + (parseInt(b.counterOk, 10) || 0), 0);
  const totalNg = blocks.reduce((acc, b) => acc + (parseInt(b.counterNg, 10) || 0), 0);

  return (
    <div className="flex flex-col gap-3 w-full bg-slate-50 transition-all duration-200 pb-10">
      {/* Top Header Navigation */}
      <ChecksheetHeaderNav
        title="RESISTANCE WELDING INSPECTION REPORT SHEET"
        subtitle={`Format: FRM-WH-PE-264 • Rev: 00 • Base: OSM-10CB309 Format 1 • Machine: ${machine?.name || 'Resistance Welding'}`}
        icon={FileSpreadsheet}
        iconBgClass="bg-purple-100 text-purple-700"
        onClose={onClose}
        onReset={handleReset}
        extraActions={
          <>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-bold py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              onClick={handleAddBlock}
              title="Add Joint Block"
            >
              <Plus size={15} />
              <span>Add Joint Block</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-bold py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              onClick={() => window.print()}
              title="Print sheet"
            >
              <Printer size={15} />
              <span>Print</span>
            </button>
          </>
        }
      />

      {/* Main Excel Sheet Canvas */}
      <div className="bg-white border-2 border-black p-3 shadow-md rounded overflow-x-auto">
        <div className="min-w-[2180px] w-max select-text text-black font-sans">

          {/* ========================================================= */}
          {/* TOP SECTION: TITLE & FORMAT CONTROL BOX */}
          {/* ========================================================= */}
          <div className="flex items-start justify-between w-full mb-2">
            {/* Sheet Title */}
            <div className="flex items-center pt-1">
              <h1 className="text-[17px] font-black text-black tracking-normal m-0 underline">
                Daily operation record of resistance welding Joint [ Head ・ Intermediate ]
              </h1>
            </div>

            {/* Document Control Box (Top Right) */}
            <div className="border border-black bg-white text-[10px] w-[520px]">
              <div className="grid grid-cols-2 border-b border-black">
                <div className="border-r border-black p-1 text-center font-bold text-slate-800">
                  FRM-WH-PE-264
                </div>
                <div className="p-1 text-center font-bold text-blue-700">
                  Revision 00 06/13/2024
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="border-r border-black p-1 text-center font-semibold text-slate-800">
                  Base Format No.[FAS] OSM-10CB309 Format 1
                </div>
                <div className="p-1 text-center font-bold text-blue-700">
                  Revision 11 11/20/2020
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* OPERATION DETAILS & CONFIRMATION BOX (Lavender #dadaff) */}
          {/* ========================================================= */}
          <div className="flex items-start justify-between w-full mb-3 gap-4">
            {/* Left Operation Details Table */}
            <div className="border border-black bg-white">
              <table className="border-collapse text-[10.5px] text-center">
                <thead>
                  <tr className="bg-[#dadaff] font-bold text-black">
                    <th className="border border-black p-1.5 w-28">Operation date</th>
                    <th className="border border-black p-1.5 w-32">Begin of operation<br />time</th>
                    <th className="border border-black p-1.5 w-32">End of operation<br />time</th>
                    <th className="border border-black p-1.5 w-36">Operator's name</th>
                    <th colSpan={3} className="border border-black p-1.5">Machine No.</th>
                  </tr>
                  <tr className="bg-[#dadaff] font-semibold text-black text-[10px]">
                    <th colSpan={4} className="border-r border-black p-0"></th>
                    <th className="border border-black p-1 w-36">Ultra Sonic Welding<br />machine</th>
                    <th className="border border-black p-1 w-32">Blade micrometer no.</th>
                    <th className="border border-black p-1 w-44">Tensile strength inspection<br />machine</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-7 bg-white">
                    <td className="border border-black p-0">
                      <input
                        type="date"
                        className="w-full h-full text-center text-xs font-semibold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={opMeta.operationDate}
                        onChange={(e) => handleMetaChange('operationDate', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="time"
                        className="w-full h-full text-center text-xs font-semibold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={opMeta.beginTime}
                        onChange={(e) => handleMetaChange('beginTime', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="time"
                        className="w-full h-full text-center text-xs font-semibold border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={opMeta.endTime}
                        onChange={(e) => handleMetaChange('endTime', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="text"
                        placeholder="Operator"
                        className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={opMeta.operatorName}
                        onChange={(e) => handleMetaChange('operatorName', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="text"
                        placeholder="R/W-01"
                        className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={opMeta.ultraSonicMachineNo}
                        onChange={(e) => handleMetaChange('ultraSonicMachineNo', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="text"
                        placeholder="Blade mic. no."
                        className="w-full h-full text-center text-xs font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={opMeta.bladeMicrometerNo}
                        onChange={(e) => handleMetaChange('bladeMicrometerNo', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="text"
                        placeholder="Tensile machine no."
                        className="w-full h-full text-center text-xs font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={opMeta.tensileMachineNo}
                        onChange={(e) => handleMetaChange('tensileMachineNo', e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right: Confirmation & Page Number Boxes */}
            <div className="flex items-start gap-4">
              {/* Confirmation */}
              <div className="border border-black bg-white w-28 text-center">
                <div className="bg-[#dadaff] font-bold text-[11px] p-1 border-b border-black">
                  Confirmation
                </div>
                <div className="h-10 flex items-center justify-center p-1">
                  <input
                    type="text"
                    placeholder="Sign / Stamp"
                    className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                    value={opMeta.confirmationSign}
                    onChange={(e) => handleMetaChange('confirmationSign', e.target.value)}
                  />
                </div>
              </div>

              {/* Page Number */}
              <div className="border border-black bg-white w-32 text-center">
                <div className="bg-[#dadaff] font-bold text-[11px] p-1 border-b border-black">
                  Page number
                </div>
                <div className="h-10 flex items-center justify-center p-1">
                  <input
                    type="text"
                    className="w-full h-full text-center text-xs font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                    value={opMeta.pageNumber}
                    onChange={(e) => handleMetaChange('pageNumber', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* MASTER DATA TABLE (EXACT EXCEL MATCH) */}
          {/* ========================================================= */}
          <table className="w-full border-collapse border-2 border-black text-[10px] text-center">
            <thead>
              {/* HEADER ROW 1 */}
              <tr className="bg-[#dadaff] font-bold text-black">
                {/* W/H Product */}
                <th rowSpan={4} className="border border-black p-1 w-24 align-middle">
                  W / H product
                </th>
                {/* Indication No. (Production No.) */}
                <th rowSpan={4} className="border border-black p-1 w-24 align-middle leading-tight">
                  Indication No.<br />(Production No.)
                </th>
                {/* Kanban symbol */}
                <th rowSpan={4} className="border border-black p-1 w-16 align-middle leading-tight">
                  Kanban<br />symbol
                </th>
                {/* Joint No. */}
                <th rowSpan={4} className="border border-black p-1 w-16 align-middle">
                  Joint No.
                </th>
                {/* W/H condition No. */}
                <th colSpan={2} className="border border-black p-1 align-middle text-[9.5px]">
                  W/H condition<br />No.
                </th>

                {/* Left side (L) */}
                <th colSpan={4} className="border-2 border-black p-1 text-[11px] font-black tracking-wide">
                  Left side (L)<br />
                  <span className="text-[9px] font-normal">※ Fill and type in this</span>
                </th>

                {/* Left side (R) [Spelled as in sheet] */}
                <th colSpan={4} className="border-2 border-black p-1 text-[11px] font-black tracking-wide">
                  Left side (R)<br />
                  <span className="text-[9px] font-normal">※ Fill and type in this</span>
                </th>

                {/* Appearance */}
                <th rowSpan={4} className="border border-black p-1 w-16 align-middle leading-tight">
                  Appear-<br />ance
                </th>
                {/* Counter reset */}
                <th rowSpan={4} className="border border-black p-1 w-16 align-middle leading-tight">
                  Counter<br />reset
                </th>

                {/* Weld Height (W/H) & Setting Value */}
                <th className="border border-black p-0.5 w-14 align-middle font-black text-[9.5px]">
                  Weld<br />Height<br />(W/H)
                </th>
                <th colSpan={2} className="border border-black p-1 bg-[#dadaff] font-bold text-[9px] leading-tight">
                  Setting value)<br />
                  <span className="text-black font-semibold">Standard MIN value ～ Standard MAX value</span>
                </th>

                {/* Counter Number */}
                <th colSpan={2} className="border border-black p-1 text-[10px] font-bold">
                  Counter Number
                </th>

                {/* Defective occurrence situation */}
                <th colSpan={6} className="border border-black p-1 text-[10px] font-bold">
                  Defective occurrence situation
                </th>

                {/* Confirm By Quality */}
                <th colSpan={4} className="border-2 border-black p-1 text-[11px] font-black">
                  Confirm By Quality
                </th>
              </tr>

              {/* HEADER ROW 2 */}
              <tr className="bg-[#dadaff] font-bold text-black text-[9px]">
                {/* Under W/H condition No. */}
                <th rowSpan={3} className="border border-black p-1 w-16 align-middle leading-tight font-bold">
                  Welding<br />condition No.
                </th>
                <th rowSpan={3} className="border border-black p-1 w-14 align-middle font-bold">
                  Electrode
                </th>

                {/* Under Left side (L) */}
                <th colSpan={2} className="border border-black p-1">
                  Wire combination structure
                </th>
                <th className="border border-black p-1 w-14 leading-tight">
                  Stripping<br />length
                </th>
                <th rowSpan={3} className="border border-black p-1 w-16 align-middle leading-tight font-black">
                  Peeling<br />strength<br />(N)
                </th>

                {/* Under Left side (R) */}
                <th colSpan={2} className="border border-black p-1">
                  Wire combination structure
                </th>
                <th className="border border-black p-1 w-14 leading-tight">
                  Stripping<br />length
                </th>
                <th rowSpan={3} className="border border-black p-1 w-16 align-middle leading-tight font-black">
                  Peeling<br />strength<br />(N)
                </th>

                {/* Under Weld Height (W/H) */}
                <th className="border border-black p-0.5 w-14 align-middle bg-[#fef9c3] font-bold text-blue-800 text-[8.5px] leading-tight">
                  Actual value when<br />begin of operation
                </th>
                <th colSpan={2} className="border border-black p-0.5 bg-[#fef9c3] font-bold text-black text-[8.5px] leading-tight">
                  Actual value after<br />finished operation
                </th>

                {/* Under Counter Number */}
                <th rowSpan={3} className="border border-black p-1 w-12 align-middle font-black">
                  OK
                </th>
                <th rowSpan={3} className="border border-black p-1 w-12 align-middle font-black">
                  NG
                </th>

                {/* Defective Occurrence items (Vertical style headers) */}
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-semibold tracking-tight">
                  Core wire bending
                </th>
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-semibold tracking-tight">
                  Core wire breaking
                </th>
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-semibold tracking-tight">
                  Core wire drawn out
                </th>
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-semibold tracking-tight">
                  protruding
                </th>
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-semibold tracking-tight">
                  Too long core wire
                </th>
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-semibold tracking-tight">
                  Other
                </th>

                {/* Confirm By Quality items (Vertical style headers) */}
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-bold tracking-tight">
                  (W/H) Weld Height
                </th>
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-bold tracking-tight">
                  Visual Status
                </th>
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-bold tracking-tight">
                  QC Inspector<br />Sign / Stamp
                </th>
                <th rowSpan={3} className="border border-black p-1 w-8 align-middle text-[9px] [writing-mode:vertical-rl] rotate-180 font-bold tracking-tight">
                  Verified By QC<br />Leader
                </th>
              </tr>

              {/* HEADER ROW 3 */}
              <tr className="bg-[#dadaff] font-bold text-black text-[9px]">
                {/* Left wire sub-headers */}
                <th rowSpan={2} className="border border-black p-1 w-28 align-middle">
                  Wire type, wire size
                </th>
                <th rowSpan={2} className="border border-black p-1 w-14 align-middle">
                  Quantity
                </th>
                <th rowSpan={2} className="border border-black p-1 w-14 align-middle text-[8.5px] text-blue-700 leading-tight">
                  confirmation<br />result
                </th>

                {/* Right wire sub-headers */}
                <th rowSpan={2} className="border border-black p-1 w-28 align-middle">
                  Wire type, wire size
                </th>
                <th rowSpan={2} className="border border-black p-1 w-14 align-middle">
                  Quantity
                </th>
                <th rowSpan={2} className="border border-black p-1 w-14 align-middle text-[8.5px] text-blue-700 leading-tight">
                  confirmation<br />result
                </th>

                {/* Weld Height (W/W) */}
                <th className="border border-black p-0.5 w-14 align-middle bg-[#fef9c3] font-bold text-blue-800 text-[8.5px] leading-tight">
                  Standard value
                </th>
                <th colSpan={2} className="border border-black p-0.5 bg-[#fef9c3] font-black text-black text-[10px]">
                  Electrode size
                </th>
              </tr>

              {/* HEADER ROW 4 */}
              <tr className="bg-[#dadaff] font-bold text-black text-[9px]">
                <th className="border border-black p-0.5 w-14 align-middle text-[8px] leading-tight">
                  Actual value at<br />beginning
                </th>
                <th colSpan={2} className="border border-black p-0.5 bg-white"></th>
              </tr>
            </thead>

            {/* ========================================================= */}
            {/* TABLE BODY: JOINT BLOCKS */}
            {/* ========================================================= */}
            <tbody>
              {blocks.map((block, bIdx) => (
                <React.Fragment key={block.id || bIdx}>
                  {/* Wire Row 0 (Top sub-row of the 7-row block) */}
                  <tr className="h-6 border-t-2 border-black bg-white hover:bg-slate-50 transition-colors">
                    {/* W / H product */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <textarea
                        className="w-full h-32 resize-none text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 p-1"
                        value={block.whProduct}
                        placeholder="W/H Product"
                        onChange={(e) => handleBlockChange(bIdx, 'whProduct', e.target.value)}
                      />
                    </td>

                    {/* Indication No. (Production No.) */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <textarea
                        className="w-full h-32 resize-none text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 p-1"
                        value={block.indicationNo}
                        placeholder="Indication No."
                        onChange={(e) => handleBlockChange(bIdx, 'indicationNo', e.target.value)}
                      />
                    </td>

                    {/* Kanban symbol */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.kanbanSymbol}
                        placeholder="Symbol"
                        onChange={(e) => handleBlockChange(bIdx, 'kanbanSymbol', e.target.value)}
                      />
                    </td>

                    {/* Joint No. */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-extrabold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.jointNo}
                        placeholder="Joint"
                        onChange={(e) => handleBlockChange(bIdx, 'jointNo', e.target.value)}
                      />
                    </td>

                    {/* Welding condition No. */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.weldingConditionNo}
                        placeholder="Cond No."
                        onChange={(e) => handleBlockChange(bIdx, 'weldingConditionNo', e.target.value)}
                      />
                    </td>

                    {/* Electrode */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.electrode}
                        placeholder="Electrode"
                        onChange={(e) => handleBlockChange(bIdx, 'electrode', e.target.value)}
                      />
                    </td>

                    {/* Left Wire 0: Wire Type / Size */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[0]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 0, 'wireTypeSize', e.target.value)}
                      />
                    </td>

                    {/* Left Wire 0: Quantity */}
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.leftWires[0]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'left', 0, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>

                    {/* Left Stripping Confirmation Result (OK / NG Toggle spanning all 7 rows) */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-1 align-middle bg-white">
                      <div className="flex flex-col items-center justify-center gap-2 select-none">
                        <button
                          type="button"
                          className={`px-2 py-0.5 text-xs font-black rounded border cursor-pointer transition-all ${block.leftStrippingResult === 'OK'
                              ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                              : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
                            }`}
                          onClick={() => handleToggleStripping(bIdx, 'left', 'OK')}
                        >
                          OK
                        </button>
                        <span className="text-[10px] text-slate-400 font-bold">•</span>
                        <button
                          type="button"
                          className={`px-2 py-0.5 text-xs font-black rounded border cursor-pointer transition-all ${block.leftStrippingResult === 'NG'
                              ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                              : 'bg-white text-rose-600 border-rose-300 hover:bg-rose-50'
                            }`}
                          onClick={() => handleToggleStripping(bIdx, 'left', 'NG')}
                        >
                          NG
                        </button>
                      </div>
                    </td>

                    {/* Left Wire 0: Peeling Strength */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[0]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 0, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* Right Wire 0: Wire Type / Size */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[0]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 0, 'wireTypeSize', e.target.value)}
                      />
                    </td>

                    {/* Right Wire 0: Quantity */}
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.rightWires[0]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'right', 0, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>

                    {/* Right Stripping Confirmation Result (OK / NG Toggle spanning all 7 rows) */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-1 align-middle bg-white">
                      <div className="flex flex-col items-center justify-center gap-2 select-none">
                        <button
                          type="button"
                          className={`px-2 py-0.5 text-xs font-black rounded border cursor-pointer transition-all ${block.rightStrippingResult === 'OK'
                              ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                              : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
                            }`}
                          onClick={() => handleToggleStripping(bIdx, 'right', 'OK')}
                        >
                          OK
                        </button>
                        <span className="text-[10px] text-slate-400 font-bold">•</span>
                        <button
                          type="button"
                          className={`px-2 py-0.5 text-xs font-black rounded border cursor-pointer transition-all ${block.rightStrippingResult === 'NG'
                              ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                              : 'bg-white text-rose-600 border-rose-300 hover:bg-rose-50'
                            }`}
                          onClick={() => handleToggleStripping(bIdx, 'right', 'NG')}
                        >
                          NG
                        </button>
                      </div>
                    </td>

                    {/* Right Wire 0: Peeling Strength */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[0]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 0, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* Appearance (spanning 7 rows) */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.appearance}
                        placeholder="OK"
                        onChange={(e) => handleBlockChange(bIdx, 'appearance', e.target.value)}
                      />
                    </td>

                    {/* Counter reset (spanning 7 rows) */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.counterReset}
                        placeholder="Reset"
                        onChange={(e) => handleBlockChange(bIdx, 'counterReset', e.target.value)}
                      />
                    </td>

                    {/* W/H Label Row 1 (spanning rows 0..3) */}
                    <td rowSpan={4} className="border border-black p-1 text-center font-black text-xs align-middle bg-white">
                      W/H
                    </td>

                    {/* W/H Standard MIN ~ MAX (Yellow box, spans 2 sub-columns) */}
                    <td colSpan={2} className="border border-black p-1 bg-[#fffde7] text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-blue-700">
                        <span>(</span>
                        <input
                          type="text"
                          className="w-16 text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-200"
                          value={block.whStdMin}
                          placeholder="±0.02mm"
                          onChange={(e) => handleBlockChange(bIdx, 'whStdMin', e.target.value)}
                        />
                        <span>～</span>
                        <input
                          type="text"
                          className="w-16 text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-200"
                          value={block.whStdMax}
                          placeholder=""
                          onChange={(e) => handleBlockChange(bIdx, 'whStdMax', e.target.value)}
                        />
                        <span>)</span>
                      </div>
                    </td>

                    {/* Counter OK (spanning 7 rows) */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="number"
                        className="w-full text-center font-extrabold text-sm text-emerald-700 border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.counterOk}
                        onChange={(e) => handleBlockChange(bIdx, 'counterOk', e.target.value)}
                      />
                    </td>

                    {/* Counter NG (spanning 7 rows) */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="number"
                        className="w-full text-center font-extrabold text-sm text-rose-700 border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.counterNg}
                        onChange={(e) => handleBlockChange(bIdx, 'counterNg', e.target.value)}
                      />
                    </td>

                    {/* Defective 1: Core wire bending */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.defCoreBending}
                        onChange={(e) => handleBlockChange(bIdx, 'defCoreBending', e.target.value)}
                      />
                    </td>

                    {/* Defective 2: Core wire breaking */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.defCoreBreaking}
                        onChange={(e) => handleBlockChange(bIdx, 'defCoreBreaking', e.target.value)}
                      />
                    </td>

                    {/* Defective 3: Core wire drawn out */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.defCoreDrawnOut}
                        onChange={(e) => handleBlockChange(bIdx, 'defCoreDrawnOut', e.target.value)}
                      />
                    </td>

                    {/* Defective 4: Protruding */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.defProtruding}
                        onChange={(e) => handleBlockChange(bIdx, 'defProtruding', e.target.value)}
                      />
                    </td>

                    {/* Defective 5: Too long core wire */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.defTooLongCore}
                        onChange={(e) => handleBlockChange(bIdx, 'defTooLongCore', e.target.value)}
                      />
                    </td>

                    {/* Defective 6: Other */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.defOther}
                        onChange={(e) => handleBlockChange(bIdx, 'defOther', e.target.value)}
                      />
                    </td>

                    {/* Quality 1: (W/H) Weld Height */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.qcWeldHeight}
                        onChange={(e) => handleBlockChange(bIdx, 'qcWeldHeight', e.target.value)}
                      />
                    </td>

                    {/* Quality 2: Visual Status */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-black text-xs text-emerald-700 border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.qcVisualStatus}
                        onChange={(e) => handleBlockChange(bIdx, 'qcVisualStatus', e.target.value)}
                      />
                    </td>

                    {/* Quality 3: QC Inspector Sign */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.qcInspectorSign}
                        onChange={(e) => handleBlockChange(bIdx, 'qcInspectorSign', e.target.value)}
                      />
                    </td>

                    {/* Quality 4: Verified By QC Leader */}
                    <td rowSpan={WIRE_ROWS_PER_BLOCK} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.qcVerifiedByLeader}
                        onChange={(e) => handleBlockChange(bIdx, 'qcVerifiedByLeader', e.target.value)}
                      />
                    </td>
                  </tr>

                  {/* Wire Row 1 (sub-row 1): Begin / End headers for W/H */}
                  <tr className="h-6 bg-white hover:bg-slate-50 transition-colors">
                    {/* Left Wire 1 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[1]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 1, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.leftWires[1]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'left', 1, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[1]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 1, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* Right Wire 1 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[1]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 1, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.rightWires[1]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'right', 1, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[1]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 1, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* W/H Begin / End Header Row */}
                    <td className="border border-black p-0.5 bg-[#fffde7] text-center font-bold text-[10px] text-blue-700 w-16">
                      Begin
                    </td>
                    <td className="border border-black p-0.5 bg-[#fffde7] text-center font-bold text-[10px] text-blue-700 w-16">
                      End
                    </td>
                  </tr>

                  {/* Wire Row 2 (sub-row 2): Actual values for Begin / End (Yellow) */}
                  <tr className="h-6 bg-white hover:bg-slate-50 transition-colors">
                    {/* Left Wire 2 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[2]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 2, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.leftWires[2]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'left', 2, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[2]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 2, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* Right Wire 2 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[2]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 2, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.rightWires[2]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'right', 2, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[2]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 2, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* W/H Begin / End Input Cells (Yellow) */}
                    <td className="border border-black p-0.5 bg-[#fffde7]">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-200"
                        value={block.whBegin}
                        onChange={(e) => handleBlockChange(bIdx, 'whBegin', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5 bg-[#fffde7]">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-200"
                        value={block.whEnd}
                        onChange={(e) => handleBlockChange(bIdx, 'whEnd', e.target.value)}
                      />
                    </td>
                  </tr>

                  {/* Wire Row 3 (sub-row 3): Empty spacer in W/H */}
                  <tr className="h-6 bg-white hover:bg-slate-50 transition-colors">
                    {/* Left Wire 3 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[3]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 3, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.leftWires[3]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'left', 3, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[3]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 3, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* Right Wire 3 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[3]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 3, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.rightWires[3]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'right', 3, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[3]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 3, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* W/H Row 3 (Yellow blank continuation) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-[#fffde7]"></td>
                  </tr>

                  {/* Wire Row 4 (sub-row 4): W/W Section Begins */}
                  <tr className="h-6 bg-white hover:bg-slate-50 transition-colors">
                    {/* Left Wire 4 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[4]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 4, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.leftWires[4]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'left', 4, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[4]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 4, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* Right Wire 4 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[4]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 4, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.rightWires[4]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'right', 4, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[4]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 4, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* W/W Label Row 4 (spans rows 4..6) */}
                    <td rowSpan={3} className="border border-black p-1 text-center font-black text-xs align-middle bg-white">
                      W/W
                    </td>

                    {/* W/W Standard value (±0.1mm) */}
                    <td colSpan={2} className="border border-black p-1 text-center font-bold text-xs bg-white">
                      {block.wwStd || '±0.1mm'}
                    </td>
                  </tr>

                  {/* Wire Row 5 (sub-row 5): W/W Begin Header */}
                  <tr className="h-6 bg-white hover:bg-slate-50 transition-colors">
                    {/* Left Wire 5 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[5]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 5, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.leftWires[5]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'left', 5, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[5]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 5, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* Right Wire 5 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[5]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 5, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.rightWires[5]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'right', 5, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[5]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 5, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* W/W Begin Header Row */}
                    <td className="border border-black p-0.5 text-center font-bold text-[10px] bg-white">
                      Begin
                    </td>
                    <td className="border border-black p-0.5 bg-white"></td>
                  </tr>

                  {/* Wire Row 6 (sub-row 6): W/W Begin Input Value */}
                  <tr className="h-6 bg-white hover:bg-slate-50 transition-colors">
                    {/* Left Wire 6 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[6]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 6, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.leftWires[6]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'left', 6, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.leftWires[6]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'left', 6, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* Right Wire 6 */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-medium border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[6]?.wireTypeSize || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 6, 'wireTypeSize', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <div className="flex items-center justify-center">
                        <span className="text-slate-400 text-[10px] mr-1">×</span>
                        <input
                          type="text"
                          className="w-8 text-center text-[10px] font-bold border-none outline-none bg-transparent focus:bg-yellow-50"
                          value={block.rightWires[6]?.quantity || ''}
                          onChange={(e) => handleWireChange(bIdx, 'right', 6, 'quantity', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] font-semibold border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={block.rightWires[6]?.peelingStrength || ''}
                        onChange={(e) => handleWireChange(bIdx, 'right', 6, 'peelingStrength', e.target.value)}
                      />
                    </td>

                    {/* W/W Begin Value Input */}
                    <td className="border border-black p-0.5 bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50"
                        value={block.wwBegin}
                        onChange={(e) => handleBlockChange(bIdx, 'wwBegin', e.target.value)}
                      />
                    </td>
                    <td className="border border-black p-0.5 bg-white"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* ========================================================= */}
          {/* BOTTOM TOTALS & ABNORMALITY ROW */}
          {/* ========================================================= */}
          <div className="flex items-stretch border-2 border-t-0 border-black bg-white">
            {/* Abnormality Section (Left) */}
            <div className="flex-1 flex flex-col justify-start p-2 border-r border-black">
              <span className="font-bold text-[11px] text-black mb-1">
                [Abnormality]
              </span>
              <textarea
                className="w-full h-12 resize-none text-xs border border-slate-200 rounded p-1 outline-none focus:bg-yellow-50"
                placeholder="Enter any abnormality or remarks..."
                value={opMeta.abnormality}
                onChange={(e) => handleMetaChange('abnormality', e.target.value)}
              />
            </div>

            {/* Total Counters Box */}
            <div className="w-[320px] flex items-center justify-end px-3 py-2 bg-white gap-2">
              <div className="border border-black bg-[#dadaff] font-black text-xs py-1.5 px-4 text-center">
                Total
              </div>
              <div className="border border-black bg-[#dadaff] font-black text-xs py-1.5 px-4 text-center min-w-[70px]">
                {totalNg > 0 ? `NG: ${totalNg}` : 'NG: 0'}
              </div>
              <div className="border border-black bg-emerald-100 text-emerald-800 font-black text-xs py-1.5 px-4 text-center min-w-[70px]">
                {totalOk > 0 ? `OK: ${totalOk}` : 'OK: 0'}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* FOOTER INSTRUCTIONS (EXACT AS SCREENSHOT) */}
          {/* ========================================================= */}
          <div className="flex flex-col pt-2 text-[10px] text-black font-semibold space-y-0.5">
            <div>※ Fill by ball-point pen or signature pen clearly</div>
            <div>※ In case of operator change, change new daily record to fill</div>
            <div>※ In case of equipment adjustment in the same lot, change new column in record to fill</div>
          </div>

        </div>
      </div>
    </div>
  );
}