import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import React, { useState } from 'react';
import { Save, RotateCcw, Plus, Printer, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

const createEmptyRecord = (id) => ({
  id,
  partNo: '',
  lotNo: '',
  circuitNo: '',
  setupApprovalNo: '',
  // Wire specifications
  wireType: '',
  wireSize: '',
  wireColor: '',
  wireLengthTolerance: '',
  wireLengthStd: '',
  wireLengthActual: '',
  // R-Side Crimping
  rTerminalName: '',
  rApplicatorNo: '',
  rStripStd: '',
  rStripActual: '',
  rChStd: '-',
  rChActualBegin: '',
  rChActualEnd: '',
  rIhStd: '-',
  rIhActualBegin: '',
  rIhActualEnd: '',
  rCwStd: '~',
  rCwActualBegin: '',
  rPullStrength: '',
  // F-Side Crimping
  fTerminalName: '',
  fApplicatorNo: '',
  fStripStd: '',
  fStripActual: '',
  fChStd: '-',
  fChActualBegin: '',
  fChActualEnd: '',
  fIhStd: '-',
  fIhActualBegin: '',
  fIhActualEnd: '',
  fCwStd: '~',
  fCwActualBegin: '',
  fPullStrength: '',
  // Quality & Verification
  numberOfOkProducts: '',
  visualStatusRSide: 'OK',
  visualStatusFSide: 'OK',
  defectQtyRSide: '',
  defectQtyFSide: '',
  qcInspectorSign: '',
  verifiedByQcLeader: '',
  sample: ''
});

const INITIAL_ROWS = [
  createEmptyRecord(1),
  createEmptyRecord(2),
  createEmptyRecord(3),
  createEmptyRecord(4),
  createEmptyRecord(5),
  createEmptyRecord(6)
];

export default function InspectionReportSheet({ machine, onClose }) {
  const formattedModel = machine?.model ? machine.model.replace('_', ' ') : 'TRD 301';
  const initialMachineName = machine?.name ? `${machine.name} (${formattedModel})` : formattedModel;

  // Sheet Header Information matching Screenshot 1 & 2
  const [headerInfo, setHeaderInfo] = useState({
    machineName: initialMachineName,
    operatorName: '',
    inspectorName: '',
    date: new Date().toISOString().split('T')[0],
    shift: 'Shift 1',
    docNo: 'FRM-WH-PE-244',
    rev06Date: '01.07.2026',
    baseFormatNo: 'OSM– 10CB110 Form 1',
    rev13Date: '08-03-2024'
  });

  const [records, setRecords] = useState(INITIAL_ROWS);
  const [savedToast, setSavedToast] = useState('');

  const handleFieldChange = (recordIdx, field, value) => {
    setRecords(prev => {
      const copy = [...prev];
      copy[recordIdx] = { ...copy[recordIdx], [field]: value };
      return copy;
    });
  };

  const handleAddRecord = () => {
    setRecords(prev => [...prev, createEmptyRecord(prev.length + 1)]);
  };

  const handleRemoveRecord = (recordIdx) => {
    if (records.length <= 1) return;
    setRecords(prev => prev.filter((_, idx) => idx !== recordIdx));
  };

  const handleSave = () => {
    setSavedToast(`DAILY RECORD OF CUTTING AND CRIMPING OPERATION saved successfully!`);
    setTimeout(() => setSavedToast(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this inspection report to empty defaults?')) {
      setRecords([
        createEmptyRecord(1),
        createEmptyRecord(2),
        createEmptyRecord(3),
        createEmptyRecord(4),
        createEmptyRecord(5),
        createEmptyRecord(6)
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full animate-fadeIn font-sans pb-10">
      {/* Top Floating Control Bar */}
      <div className="flex flex-wrap items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <FileSpreadsheet size={20} className="text-emerald-700 bg-emerald-50 p-2 rounded-lg w-10 h-10" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0 uppercase">
                DAILY RECORD OF CUTTING AND CRIMPING OPERATION
              </h3>
              <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 rounded">
                {headerInfo.docNo}
              </span>
            </div>
            <p className="text-[11.5px] text-slate-500 font-medium m-0">
              Inspection Report Checksheet
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedToast && (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold py-1.5 px-3 rounded-lg animate-pulse">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>{savedToast}</span>
            </div>
          )}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border-none cursor-pointer bg-slate-800 text-white hover:bg-slate-900 transition-all shadow-sm"
            onClick={handleAddRecord}
            title="Add new circuit inspection block"
          >
            <Plus size={14} />
            <span>Add Circuit</span>
          </button>
          
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-300 cursor-pointer bg-white text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            onClick={() => window.print()}
            title="Print sheet"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-slate-200 cursor-pointer bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
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

      {/* Main Excel Sheet Canvas Container with Horizontal Scroll */}
      <div className="bg-white border-2 border-black p-3 shadow-lg rounded-[2px] overflow-x-auto">
        <div className="min-w-[2180px] w-max select-text text-black">

          {/* Top Header Section matching Excel sheet */}
          <div className="flex items-start justify-between w-full mb-1 select-text">
            {/* Left Area: Empty space on top, 5-column meta table below */}
            <div className="flex flex-col justify-end w-[465px] shrink-0 pt-6">
              <table className="w-full border-collapse border border-black text-center">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-black py-1 px-1 text-[11px] font-bold text-black w-[100px]">Machine name</th>
                    <th className="border border-black py-1 px-1 text-[11px] font-bold text-black w-[95px]">Operator Name</th>
                    <th className="border border-black py-1 px-1 text-[11px] font-bold text-black w-[95px]">Inspector Name</th>
                    <th className="border border-black py-1 px-1 text-[11px] font-bold text-black w-[95px]">Date</th>
                    <th className="border border-black py-1 px-1 text-[11px] font-bold text-black w-[80px]">Shift</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-7 bg-white">
                    <td className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={headerInfo.machineName}
                        onChange={(e) => setHeaderInfo({ ...headerInfo, machineName: e.target.value })}
                        placeholder={initialMachineName || "TRD 301"}
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={headerInfo.operatorName}
                        onChange={(e) => setHeaderInfo({ ...headerInfo, operatorName: e.target.value })}
                        placeholder="Operator"
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={headerInfo.inspectorName}
                        onChange={(e) => setHeaderInfo({ ...headerInfo, inspectorName: e.target.value })}
                        placeholder="Inspector"
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="date"
                        className="w-full h-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={headerInfo.date}
                        onChange={(e) => setHeaderInfo({ ...headerInfo, date: e.target.value })}
                      />
                    </td>
                    <td className="border border-black p-0">
                      <input
                        type="text"
                        className="w-full h-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-1"
                        value={headerInfo.shift}
                        onChange={(e) => setHeaderInfo({ ...headerInfo, shift: e.target.value })}
                        placeholder="Shift 1"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Middle Area: Title centered over R-Side / F-Side */}
            <div className="flex-1 flex justify-center pt-2 px-4">
              <h1 className="text-[15px] font-black tracking-wider text-black underline uppercase m-0 leading-tight">
                DAILY RECORD OF CUTTING AND CRIMPING OPERATION
              </h1>
            </div>

            {/* Right Area: Note Box and Format Box joined together */}
            <div className="flex items-start shrink-0">
              {/* Note Box */}
              <div className="border border-black p-1 px-2 bg-white text-[10px] leading-tight w-[310px]">
                <div className="font-bold text-black mb-0.5">
                  Note- Mention Setup approval number for following Change
                </div>
                <div className="grid grid-cols-1 gap-0 text-[9px] text-black leading-tight">
                  <span>1- Circuit number change</span>
                  <span>2- Terminal reel change over</span>
                  <span>3- Wire Change over</span>
                  <span>4- Applicator break down</span>
                  <span>5- Machine break down</span>
                  <span>6- Applicator change over</span>
                  <span>7- CFA / CFM / TCM Error Continue 3 time</span>
                </div>
              </div>

              {/* Format Box attached directly to the Note Box right border */}
              <div className="w-[260px]">
                <table className="w-full border-collapse border-t border-r border-b border-black text-center text-[9.5px]">
                  <tbody>
                    <tr>
                      <td colSpan={2} className="border-b border-black py-0.5 px-2 font-bold text-black text-[10px] bg-white tracking-wide text-center">
                        {headerInfo.docNo}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-r border-black py-0.5 px-1 text-center font-medium w-[70px]">
                        Rev.06
                      </td>
                      <td className="border-b border-black py-0.5 px-1 text-center font-medium w-[190px]">
                        {headerInfo.rev06Date}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="border-b border-black py-0.5 px-1 text-center font-semibold text-[9px]">
                        Base Format No.[FAS] &nbsp; {headerInfo.baseFormatNo}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-r border-black py-0.5 px-1 text-center font-medium w-[70px]">
                        Rev.13
                      </td>
                      <td className="py-0.5 px-1 text-center font-medium w-[190px]">
                        {headerInfo.rev13Date}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Master Inspection Table with Exact Excel Borders and Color Structure */}
          <table className="w-full border-collapse border-2 border-black text-[10px] text-center">
            <thead>
              {/* Header Row 1: Group Headers and Top Labels */}
              <tr className="bg-white">
                <th rowSpan={4} className="border border-black p-1 font-bold text-black w-[75px] min-w-[75px] align-middle">
                  Part No.
                </th>
                <th rowSpan={4} className="border border-black p-1 font-bold text-black w-[65px] min-w-[65px] align-middle">
                  Lot No
                </th>
                <th rowSpan={4} className="border border-black p-1 font-bold text-black w-[65px] min-w-[65px] align-middle">
                  Circuit<br />No
                </th>
                <th rowSpan={4} className="border border-black p-1 font-bold text-black w-[80px] min-w-[80px] align-middle">
                  Setup<br />Approval<br />No
                </th>

                {/* Wire Specs Stacked Column (Top: Wire type) */}
                <th className="border border-black p-1 font-bold text-black w-[80px] min-w-[80px] align-middle">
                  Wire type
                </th>

                {/* Wire length */}
                <th className="border border-black p-1 font-bold text-black w-[100px] min-w-[100px] align-middle">
                  Wire length<br />
                  <span className="text-[9px] font-normal text-black">(Tolerance<br />+2~4mm)</span>
                </th>

                {/* R-Side Crimping Group Header */}
                <th colSpan={8} className="border-2 border-black p-1 font-black text-black text-[12px] bg-white tracking-wider">
                  R-Side
                </th>

                {/* F-Side Crimping Group Header */}
                <th colSpan={8} className="border-2 border-black p-1 font-black text-black text-[12px] bg-white tracking-wider">
                  F-Side
                </th>

                {/* Output & QC Section Headers */}
                <th rowSpan={4} className="border border-black p-1 font-bold text-black w-[75px] min-w-[75px] align-middle">
                  Number<br />of OK<br /><br />products
                </th>
                <th className="border border-black p-1 font-bold text-black w-[100px] min-w-[100px] align-middle">
                  Visual Status<br />(OK/Defect Name)
                </th>
                <th className="border border-black p-1 font-bold text-black w-[65px] min-w-[65px] align-middle">
                  Defect<br />Qty.
                </th>
                <th rowSpan={4} className="border border-black p-1 font-bold text-black w-[80px] min-w-[80px] align-middle">
                  QC<br />Inspector<br />Sign
                </th>
                <th rowSpan={4} className="border border-black p-1 font-bold text-black w-[90px] min-w-[90px] align-middle">
                  Verified<br />By QC<br />Leader
                </th>
                <th rowSpan={4} className="border border-black p-1 font-bold text-black w-[360px] min-w-[360px] text-center text-sm align-middle tracking-wider">
                  Sample
                </th>
                {/* <th rowSpan={4} className="border border-black p-1 font-bold text-slate-400 w-[35px] min-w-[35px] align-middle">
                  Act
                </th> */}
              </tr>

              {/* Header Row 2: Secondary labels & R/F sub-headers */}
              <tr className="bg-white">
                {/* Under Wire type -> Wire size */}
                <th rowSpan={2} className="border border-black p-1 font-bold text-black align-middle">
                  Wire size
                </th>

                {/* Under Wire length -> Standard value (Yellow) */}
                <th rowSpan={2} className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Standard value
                </th>

                {/* Under R-Side */}
                <th className="border border-black p-1 font-bold text-black w-[75px] align-middle">
                  Terminal<br />name
                </th>
                <th className="border border-black p-1 font-bold text-black w-[75px] align-middle">
                  Confirm<br />initial<br />stripping<br />state
                </th>
                <th colSpan={2} className="border border-black p-1 font-bold text-black w-[90px] align-middle">
                  C/H
                </th>
                <th colSpan={2} className="border border-black p-1 font-bold text-black w-[90px] align-middle">
                  I/H
                </th>
                <th className="border border-black p-1 font-bold text-black w-[60px] align-middle">
                  C / W
                </th>
                <th rowSpan={2} className="border border-black p-1 font-bold text-black w-[60px] align-middle">
                  Pulling<br />strength
                </th>

                {/* Under F-Side */}
                <th className="border border-black p-1 font-bold text-black w-[75px] align-middle">
                  Terminal<br />name
                </th>
                <th className="border border-black p-1 font-bold text-black w-[75px] align-middle">
                  Confirm<br />initial<br />stripping<br />state
                </th>
                <th colSpan={2} className="border border-black p-1 font-bold text-black w-[90px] align-middle">
                  C/H
                </th>
                <th colSpan={2} className="border border-black p-1 font-bold text-black w-[90px] align-middle">
                  I/H
                </th>
                <th className="border border-black p-1 font-bold text-black w-[60px] align-middle">
                  C / W
                </th>
                <th rowSpan={2} className="border border-black p-1 font-bold text-black w-[60px] align-middle">
                  Pulling<br />strength
                </th>

                {/* Under Visual Status -> R side */}
                <th className="border border-black p-1 font-bold text-black align-middle">
                  R side
                </th>
                {/* Under Defect Qty -> R side */}
                <th className="border border-black p-1 font-bold text-black align-middle">
                  R side
                </th>
              </tr>

              {/* Header Row 3: Standards / Applicator / Values */}
              <tr className="bg-white">
                {/* Under R-Side */}
                <th rowSpan={2} className="border border-black p-1 font-bold text-black align-middle">
                  Applicator<br />No.
                </th>
                <th className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Standard
                </th>
                <th colSpan={2} className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Standard value
                </th>
                <th colSpan={2} className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Standard value
                </th>
                <th className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Std.value
                </th>

                {/* Under F-Side */}
                <th rowSpan={2} className="border border-black p-1 font-bold text-black align-middle">
                  Applicator<br />No.
                </th>
                <th className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Standard
                </th>
                <th colSpan={2} className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Standard value
                </th>
                <th colSpan={2} className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Standard value
                </th>
                <th className="border border-black p-1 font-bold text-black bg-[#fffde7] align-middle">
                  Std.value
                </th>

                {/* Under Visual Status -> F side */}
                <th className="border border-black p-1 font-bold text-black align-middle">
                  F side
                </th>
                {/* Under Defect Qty -> F side */}
                <th className="border border-black p-1 font-bold text-black align-middle">
                  F side
                </th>
              </tr>

              {/* Header Row 4: Actual / Begin / End / Units */}
              <tr className="bg-white">
                {/* Under Wire size -> Wire color */}
                <th className="border border-black p-1 font-bold text-black align-middle">
                  Wire color
                </th>

                {/* Under Wire length Standard -> Actual value */}
                <th className="border border-black p-1 font-bold text-black align-middle">
                  Actual value
                </th>

                {/* Under R-Side */}
                <th className="border border-black p-1 font-bold text-black align-middle">
                  Actual
                </th>
                <th className="border border-black p-0.5 font-bold text-black w-[45px] align-middle">
                  Begin
                </th>
                <th className="border border-black p-0.5 font-bold text-black w-[45px] align-middle">
                  End
                </th>
                <th className="border border-black p-0.5 font-bold text-black w-[45px] align-middle">
                  Begin
                </th>
                <th className="border border-black p-0.5 font-bold text-black w-[45px] align-middle">
                  End
                </th>
                <th className="border border-black p-0.5 font-bold text-black align-middle">
                  Actual<br />value<br />Begin
                </th>
                <th className="border border-black p-1 font-bold text-black align-middle">
                  (N)
                </th>

                {/* Under F-Side */}
                <th className="border border-black p-1 font-bold text-black align-middle">
                  Actual
                </th>
                <th className="border border-black p-0.5 font-bold text-black w-[45px] align-middle">
                  Begin
                </th>
                <th className="border border-black p-0.5 font-bold text-black w-[45px] align-middle">
                  End
                </th>
                <th className="border border-black p-0.5 font-bold text-black w-[45px] align-middle">
                  Begin
                </th>
                <th className="border border-black p-0.5 font-bold text-black w-[45px] align-middle">
                  End
                </th>
                <th className="border border-black p-0.5 font-bold text-black align-middle">
                  Actual<br />value<br />Begin
                </th>
                <th className="border border-black p-1 font-bold text-black align-middle">
                  (N)
                </th>

                {/* Bottom line spacer under Visual & Defect */}
                <th className="border border-black p-0 bg-white"></th>
                <th className="border border-black p-0 bg-white"></th>
              </tr>
            </thead>

            {/* Table Body: Each Circuit Inspection Block Consists of 3 Sub-Rows */}
            <tbody>
              {records.map((rec, rIdx) => (
                <React.Fragment key={rec.id || rIdx}>

                  {/* --- SUB-ROW 1 OF 3 --- */}
                  <tr className="h-7 hover:bg-slate-50 border-t-2 border-black transition-colors">
                    {/* Part No (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.partNo}
                        onChange={(e) => handleFieldChange(rIdx, 'partNo', e.target.value)}
                        placeholder="Part No."
                      />
                    </td>

                    {/* Lot No (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.lotNo}
                        onChange={(e) => handleFieldChange(rIdx, 'lotNo', e.target.value)}
                        placeholder="Lot No"
                      />
                    </td>

                    {/* Circuit No (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.circuitNo}
                        onChange={(e) => handleFieldChange(rIdx, 'circuitNo', e.target.value)}
                        placeholder="Circuit"
                      />
                    </td>

                    {/* Setup Approval No (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.setupApprovalNo}
                        onChange={(e) => handleFieldChange(rIdx, 'setupApprovalNo', e.target.value)}
                        placeholder="Setup No"
                      />
                    </td>

                    {/* Wire Type (Sub-row 1) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.wireType}
                        onChange={(e) => handleFieldChange(rIdx, 'wireType', e.target.value)}
                        placeholder="Wire type"
                      />
                    </td>

                    {/* Wire Length Tolerance/Spec (Sub-row 1) */}
                    <td className="border border-black p-0.5 text-center text-slate-400">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.wireLengthTolerance}
                        onChange={(e) => handleFieldChange(rIdx, 'wireLengthTolerance', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* R-Side: Terminal Name (Sub-row 1) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rTerminalName}
                        onChange={(e) => handleFieldChange(rIdx, 'rTerminalName', e.target.value)}
                        placeholder="Term Name"
                      />
                    </td>

                    {/* R-Side: Initial Stripping Sub-row 1 (Empty in Excel) */}
                    <td className="border border-black p-0.5 bg-white"></td>

                    {/* R-Side: C/H Sub-row 1 (Empty in Excel) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-white"></td>

                    {/* R-Side: I/H Sub-row 1 (Empty in Excel) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-white"></td>

                    {/* R-Side: C/W Sub-row 1 (Empty in Excel) */}
                    <td className="border border-black p-0.5 bg-white"></td>

                    {/* R-Side: Pulling Strength (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rPullStrength}
                        onChange={(e) => handleFieldChange(rIdx, 'rPullStrength', e.target.value)}
                        placeholder="N"
                      />
                    </td>

                    {/* F-Side: Terminal Name (Sub-row 1) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fTerminalName}
                        onChange={(e) => handleFieldChange(rIdx, 'fTerminalName', e.target.value)}
                        placeholder="Term Name"
                      />
                    </td>

                    {/* F-Side: Initial Stripping Sub-row 1 (Empty in Excel) */}
                    <td className="border border-black p-0.5 bg-white"></td>

                    {/* F-Side: C/H Sub-row 1 (Empty in Excel) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-white"></td>

                    {/* F-Side: I/H Sub-row 1 (Empty in Excel) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-white"></td>

                    {/* F-Side: C/W Sub-row 1 (Empty in Excel) */}
                    <td className="border border-black p-0.5 bg-white"></td>

                    {/* F-Side: Pulling Strength (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fPullStrength}
                        onChange={(e) => handleFieldChange(rIdx, 'fPullStrength', e.target.value)}
                        placeholder="N"
                      />
                    </td>

                    {/* Number of OK products (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-extrabold text-sm text-emerald-700 border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.numberOfOkProducts}
                        onChange={(e) => handleFieldChange(rIdx, 'numberOfOkProducts', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* Visual Status: R side (Sub-row 1) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.visualStatusRSide}
                        onChange={(e) => handleFieldChange(rIdx, 'visualStatusRSide', e.target.value)}
                        placeholder="OK"
                      />
                    </td>

                    {/* Defect Qty: R side (Sub-row 1) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.defectQtyRSide}
                        onChange={(e) => handleFieldChange(rIdx, 'defectQtyRSide', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* QC Inspector Sign (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-medium text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.qcInspectorSign}
                        onChange={(e) => handleFieldChange(rIdx, 'qcInspectorSign', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* Verified By QC Leader (RowSpan 3) */}
                    <td rowSpan={3} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-medium text-xs border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.verifiedByQcLeader}
                        onChange={(e) => handleFieldChange(rIdx, 'verifiedByQcLeader', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* Sample Column (RowSpan 3 - Wide open cell matching Screenshot 2) */}
                    <td rowSpan={3} className="border border-black p-1 align-middle bg-white">
                      <textarea
                        className="w-full h-16 resize-none font-sans text-xs border-none outline-none bg-transparent focus:bg-yellow-50 p-1"
                        value={rec.sample}
                        onChange={(e) => handleFieldChange(rIdx, 'sample', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* Action (Delete record) */}
                    {/* <td rowSpan={3} className="border border-black p-0.5 align-middle text-center bg-white">
                      <button
                        type="button"
                        className="bg-transparent border-none text-slate-300 hover:text-red-600 hover:bg-red-50 cursor-pointer p-1 rounded transition-all"
                        onClick={() => handleRemoveRecord(rIdx)}
                        title="Delete circuit row"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td> */}
                  </tr>

                  {/* --- SUB-ROW 2 OF 3 (Yellow Standard Values) --- */}
                  <tr className="h-7 hover:bg-slate-50 transition-colors">
                    {/* Wire Size (Sub-row 2) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.wireSize}
                        onChange={(e) => handleFieldChange(rIdx, 'wireSize', e.target.value)}
                        placeholder="Wire size"
                      />
                    </td>

                    {/* Wire Length: Standard value (Yellow, Sub-row 2) */}
                    <td className="border border-black p-0.5 bg-[#fffde7]">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.wireLengthStd}
                        onChange={(e) => handleFieldChange(rIdx, 'wireLengthStd', e.target.value)}
                        placeholder="Std"
                      />
                    </td>

                    {/* R-Side: Applicator No (RowSpan 2 across Sub-row 2 & 3) */}
                    <td rowSpan={2} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rApplicatorNo}
                        onChange={(e) => handleFieldChange(rIdx, 'rApplicatorNo', e.target.value)}
                        placeholder="App No"
                      />
                    </td>

                    {/* R-Side: Confirm initial stripping Standard (Yellow, Sub-row 2) */}
                    <td className="border border-black p-0.5 bg-[#fffde7]">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.rStripStd}
                        onChange={(e) => handleFieldChange(rIdx, 'rStripStd', e.target.value)}
                        placeholder="Std"
                      />
                    </td>

                    {/* R-Side: C/H Standard value (Yellow merged, default '-' as in screenshot) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-[#fffde7] text-center">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.rChStd}
                        onChange={(e) => handleFieldChange(rIdx, 'rChStd', e.target.value)}
                        placeholder="-"
                      />
                    </td>

                    {/* R-Side: I/H Standard value (Yellow merged, default '-' as in screenshot) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-[#fffde7] text-center">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.rIhStd}
                        onChange={(e) => handleFieldChange(rIdx, 'rIhStd', e.target.value)}
                        placeholder="-"
                      />
                    </td>

                    {/* R-Side: C/W Std.value (Yellow, default '~' as in screenshot) */}
                    <td className="border border-black p-0.5 bg-[#fffde7] text-center">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.rCwStd}
                        onChange={(e) => handleFieldChange(rIdx, 'rCwStd', e.target.value)}
                        placeholder="~"
                      />
                    </td>

                    {/* F-Side: Applicator No (RowSpan 2 across Sub-row 2 & 3) */}
                    <td rowSpan={2} className="border border-black p-0.5 align-middle bg-white">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fApplicatorNo}
                        onChange={(e) => handleFieldChange(rIdx, 'fApplicatorNo', e.target.value)}
                        placeholder="App No"
                      />
                    </td>

                    {/* F-Side: Confirm initial stripping Standard (Yellow, Sub-row 2) */}
                    <td className="border border-black p-0.5 bg-[#fffde7]">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.fStripStd}
                        onChange={(e) => handleFieldChange(rIdx, 'fStripStd', e.target.value)}
                        placeholder="Std"
                      />
                    </td>

                    {/* F-Side: C/H Standard value (Yellow merged, default '-' as in screenshot) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-[#fffde7] text-center">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.fChStd}
                        onChange={(e) => handleFieldChange(rIdx, 'fChStd', e.target.value)}
                        placeholder="-"
                      />
                    </td>

                    {/* F-Side: I/H Standard value (Yellow merged, default '-' as in screenshot) */}
                    <td colSpan={2} className="border border-black p-0.5 bg-[#fffde7] text-center">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.fIhStd}
                        onChange={(e) => handleFieldChange(rIdx, 'fIhStd', e.target.value)}
                        placeholder="-"
                      />
                    </td>

                    {/* F-Side: C/W Std.value (Yellow, default '~' as in screenshot) */}
                    <td className="border border-black p-0.5 bg-[#fffde7] text-center">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-200 px-0.5"
                        value={rec.fCwStd}
                        onChange={(e) => handleFieldChange(rIdx, 'fCwStd', e.target.value)}
                        placeholder="~"
                      />
                    </td>

                    {/* Visual Status: F side (Sub-row 2) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.visualStatusFSide}
                        onChange={(e) => handleFieldChange(rIdx, 'visualStatusFSide', e.target.value)}
                        placeholder="OK"
                      />
                    </td>

                    {/* Defect Qty: F side (Sub-row 2) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center font-semibold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.defectQtyFSide}
                        onChange={(e) => handleFieldChange(rIdx, 'defectQtyFSide', e.target.value)}
                        placeholder=""
                      />
                    </td>
                  </tr>

                  {/* --- SUB-ROW 3 OF 3 (Actual Values) --- */}
                  <tr className="h-7 hover:bg-slate-50 transition-colors">
                    {/* Wire Color (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.wireColor}
                        onChange={(e) => handleFieldChange(rIdx, 'wireColor', e.target.value)}
                        placeholder="Wire color"
                      />
                    </td>

                    {/* Wire Length: Actual value (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center font-bold text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.wireLengthActual}
                        onChange={(e) => handleFieldChange(rIdx, 'wireLengthActual', e.target.value)}
                        placeholder="Act"
                      />
                    </td>

                    {/* R-Side: Confirm initial stripping Actual (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rStripActual}
                        onChange={(e) => handleFieldChange(rIdx, 'rStripActual', e.target.value)}
                        placeholder="OK"
                      />
                    </td>

                    {/* R-Side: C/H Actual Begin (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rChActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'rChActualBegin', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* R-Side: C/H Actual End (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rChActualEnd}
                        onChange={(e) => handleFieldChange(rIdx, 'rChActualEnd', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* R-Side: I/H Actual Begin (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rIhActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'rIhActualBegin', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* R-Side: I/H Actual End (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rIhActualEnd}
                        onChange={(e) => handleFieldChange(rIdx, 'rIhActualEnd', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* R-Side: C/W Actual Begin (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.rCwActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'rCwActualBegin', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* F-Side: Confirm initial stripping Actual (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fStripActual}
                        onChange={(e) => handleFieldChange(rIdx, 'fStripActual', e.target.value)}
                        placeholder="OK"
                      />
                    </td>

                    {/* F-Side: C/H Actual Begin (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fChActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'fChActualBegin', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* F-Side: C/H Actual End (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fChActualEnd}
                        onChange={(e) => handleFieldChange(rIdx, 'fChActualEnd', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* F-Side: I/H Actual Begin (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fIhActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'fIhActualBegin', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* F-Side: I/H Actual End (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fIhActualEnd}
                        onChange={(e) => handleFieldChange(rIdx, 'fIhActualEnd', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* F-Side: C/W Actual Begin (Sub-row 3) */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        className="w-full text-center text-[10px] border-none outline-none bg-transparent focus:bg-yellow-50 px-0.5"
                        value={rec.fCwActualBegin}
                        onChange={(e) => handleFieldChange(rIdx, 'fCwActualBegin', e.target.value)}
                        placeholder=""
                      />
                    </td>

                    {/* Sub-row 3 under Visual Status & Defect Qty */}
                    <td className="border border-black p-0 bg-white"></td>
                    <td className="border border-black p-0 bg-white"></td>
                  </tr>

                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Footer Quality Note & Approval */}
          <div className="flex items-center justify-between mt-3 text-[10.5px] text-slate-700 px-1">
            <div className="flex items-center gap-4">
              <span>* C/H: Crimp Height</span>
              <span>* I/H: Insulation Height</span>
              <span>* C/W: Crimp Width</span>
              <span>* CFA / CFM / TCM Error Monitoring Active</span>
            </div>
            <div className="font-semibold text-slate-800">
              Base Format No.[FAS]: OSM– 10CB110 Form 1 • FRM-WH-PE-244 Rev.06
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}