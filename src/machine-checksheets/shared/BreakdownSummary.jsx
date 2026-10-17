import React, { useState } from 'react';
import { Plus, Wrench } from 'lucide-react';
import ChecksheetHeaderNav from './ChecksheetHeaderNav';

const createEmptyIncident = (id) => ({
  id,
  srNo: id,
  date: '',
  mcNo: '',
  shift: '',
  startTime: '',
  operatorName: '',
  problemDescription: '',
  breakdownStandTime: '',
  duringSetupOrRunning: '',
  typeOfProblem: '',
  reason: '',
  actionTaken: '',
  sparePartUsed: '',
  closeTime: '',
  totalTime: '',
  sign: '',
  partNo: '',
  lotNo: '',
  circuitNo: '',
  // Retroactive
  chWh: { stdF: '', stdR: '', resF: '', resR: '' },
  ihWw: { stdF: '', stdR: '', resF: '', resR: '' },
  strength: { stdF: '', stdR: '', resF: '', resR: '' },
  length: { std: '', res: '' },
  visual: { totalQty: '', ngQty: '' },
  prodSuprSign: '',
  inspectorName: '',
  setupPartLotCircuit: '',
  // Process Parameters
  cfmcfa: '',
  mainAirPressure: '',
  pokaYoke: '',
  otherParam: '',
  // Setup verification
  setupCh: { resF: '', resR: '' },
  setupIh: { resF: '', resR: '' },
  setupStrength: { resF: '', resR: '' },
  setupLength: '',
  setupVisual: '',
  qaShiftIncharge: '',
  // Containment
  containmentVisual: '',
  containmentDim1: '',
  containmentDim2: '',
  containmentDim3: '',
  verificationProcessOwner: '',
  approvedByQaIncharge: ''
});

const INITIAL_INCIDENTS = () => [
  createEmptyIncident(1),
  createEmptyIncident(2),
  createEmptyIncident(3),
  createEmptyIncident(4)
];

// Exact column definitions matching the panoramic screenshot
const COLUMNS = [
  { id: 'srNo', width: '32px' },
  { id: 'date', width: '68px' },
  { id: 'mcNo', width: '54px' },
  { id: 'shift', width: '42px' },
  { id: 'startTime', width: '58px' },
  { id: 'operatorName', width: '92px' },
  { id: 'problemDescription', width: '150px' },
  { id: 'breakdownStandTime', width: '66px' },
  { id: 'duringSetupOrRunning', width: '70px' },
  { id: 'typeOfProblem', width: '84px' },
  { id: 'reason', width: '140px' },
  { id: 'actionTaken', width: '140px' },
  { id: 'sparePartUsed', width: '70px' },
  { id: 'closeTime', width: '58px' },
  { id: 'totalTime', width: '58px' },
  { id: 'sign', width: '50px' },
  { id: 'partNo', width: '72px' },
  { id: 'lotNo', width: '68px' },
  { id: 'circuitNo', width: '56px' },
  { id: 'paramName', width: '82px' },
  { id: 'stdF', width: '42px' },
  { id: 'stdR', width: '42px' },
  { id: 'resF', width: '42px' },
  { id: 'resR', width: '42px' },
  { id: 'statusSign', width: '58px' },
  { id: 'inspectorName', width: '75px' },
  { id: 'setupPartCircuit', width: '88px' },
  { id: 'processParam', width: '96px' },
  { id: 'processRes', width: '48px' },
  { id: 'setupParamName', width: '84px' },
  { id: 'setupResF', width: '42px' },
  { id: 'setupResR', width: '42px' },
  { id: 'qaInchargeName', width: '76px' },
  { id: 'visual100', width: '74px' },
  { id: 'dim2Hourly', width: '88px' },
  { id: 'verificationProcessOwner', width: '80px' },
  { id: 'approvedByQaIncharge', width: '80px' }
];

export default function BreakdownSummary({ machine, onClose }) {
  const machineName = machine?.name || 'C&C 01';
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [savedToast, setSavedToast] = useState(false);

  const handleFieldChange = (idx, field, value) => {
    setIncidents((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleNestedChange = (idx, parent, field, value) => {
    setIncidents((prev) => {
      const copy = [...prev];
      copy[idx] = {
        ...copy[idx],
        [parent]: { ...copy[idx][parent], [field]: value }
      };
      return copy;
    });
  };

  const handleAddRow = () => {
    setIncidents((prev) => [...prev, createEmptyIncident(prev.length + 1)]);
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };
const handleReset = () => {
    if (window.confirm('Reset all values to blank spreadsheet?')) {
      setIncidents(INITIAL_INCIDENTS());
    }
  };

  return (
    <div className="w-full bg-white text-black font-sans text-[10px] p-2 leading-none">
      {/* Top Floating Control Bar */}
      <div className="mb-3">
        <ChecksheetHeaderNav
          title="DAILY MAINTENANCE LOG BOOK & 5M CHANGE RECORD"
          subtitle={<>Machine: <strong className="text-slate-800">{machineName}</strong></>}
          icon={Wrench}
          iconBgClass="bg-amber-100 text-amber-700"
          onClose={onClose}
          onSave={handleSave}
          onReset={handleReset}
          savedToast={savedToast ? 'Checksheet saved successfully!' : null}
          extraActions={
            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 cursor-pointer shadow-sm transition-colors"
            >
              <Plus size={14} />
              <span>Add Incident</span>
            </button>
          }
        />
      </div>

      {/* Main Table Scroll Area */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[2670px]">
          {/* Top Sheet Header */}
          <div className="flex items-baseline justify-between pb-1 font-bold text-[11px] border-b-2 border-black mb-1">
            <div className="text-[10px] font-bold">
              * If any part NG during retroactive and containment inspection then 100% parts to be check since last OK (Set up / In-process)
            </div>
            <div className="text-[12.5px] font-black tracking-tight">
              Daily Maintenance Log book & 5M Change record (Machine) - Crimping Section
            </div>
          </div>

          {/* EXACT SPREADSHEET TABLE: FIXED COLUMN WIDTHS */}
          <table className="border-collapse border border-black table-fixed w-[2670px] text-center text-black text-[9.5px]">
            {/* Explicit Colgroup matching each column's exact width */}
            <colgroup>
              {COLUMNS.map((col) => (
                <col key={col.id} style={{ width: col.width, minWidth: col.width, maxWidth: col.width }} />
              ))}
            </colgroup>

            <thead>
              {/* Header Row 1: High Level Group Sections */}
              <tr className="bg-white font-bold h-7">
                <th colSpan={7} className="border border-black p-0.5 text-[10.5px]">
                  (To be filled by operator)
                </th>
                <th colSpan={9} className="border border-black p-0.5 text-[10.5px]">
                  (To be filled by PE/Maint. IT)
                </th>
                <th colSpan={7} className="border border-black p-0.5 text-[10.5px]">
                  Retroactive Inspection (To be filled by operator during breakdown time)
                </th>
                <th rowSpan={3} className="border border-black p-0.5 align-middle text-[10px] whitespace-normal">
                  Inspector name
                </th>
                <th colSpan={6} className="border border-black p-0.5 text-[10.5px]">
                  Set up Approval(To be filled by Quality dept., Pick 5 samples for judgement)
                </th>
                <th colSpan={2} className="border border-black p-0.5 text-[10px] leading-tight">
                  Containment Action<br />(Add Monitoring sheet if required)
                </th>
                <th rowSpan={3} className="border border-black p-0.5 align-middle text-[10px] leading-tight whitespace-normal">
                  Verification<br />By Process<br />Owner
                </th>
                <th rowSpan={3} className="border border-black p-0.5 align-middle text-[10px] leading-tight whitespace-normal">
                  Approved<br />By<br />(QA Incharge)
                </th>
              </tr>

              {/* Header Row 2: Sub-Column Titles */}
              <tr className="bg-white font-bold align-middle h-8">
                {/* Operator Columns */}
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">Sr.<br />No.</th>
                <th rowSpan={2} className="border border-black p-0.5">Date</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">M/C No.</th>
                <th rowSpan={2} className="border border-black p-0.5">Shift</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">Start time</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">Operator<br />Name</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8px]">
                  Problem Description<br />
                  <span className="font-normal">
                    (Breakdown/PM/<br />Calibration/Abnormal<br />Condition)
                  </span>
                </th>

                {/* PE / Maint. IT Columns */}
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Breakdown<br />stand Time
                </th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  During set up /<br />Running
                </th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8px]">
                  Type of problem<br />
                  <span className="font-normal">
                    (Electrical/Mech-<br />anical/IT/Others)
                  </span>
                </th>
                <th rowSpan={2} className="border border-black p-0.5">Reason</th>
                <th rowSpan={2} className="border border-black p-0.5">Action taken</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Spare part<br />used
                </th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">Close time</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">Total time</th>
                <th rowSpan={2} className="border border-black p-0.5">Sign</th>

                {/* Retroactive Inspection Columns */}
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">Part No.</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">Lot No.</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight">Circuit<br />No.</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Last Produced<br />Part Status<br />(Parameters)
                </th>
                <th colSpan={2} className="border border-black p-0.5">Standard</th>
                <th colSpan={2} className="border border-black p-0.5">Result</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Status<br />
                  <span className="font-normal text-[7.5px]">Prod Supr Sign</span>
                </th>

                {/* Set up Approval Columns */}
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Part No./Lot<br />No./Circuit<br />No.
                </th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Process parameter
                </th>
                <th rowSpan={2} className="border border-black p-0.5">Result</th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Set up<br />Verification<br />(Parameters)
                </th>
                <th colSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Result<br />(After breakdown)
                </th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  QA Shift In-<br />charge name
                </th>

                {/* Containment Action Columns */}
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Visual<br />Insp(100%)
                </th>
                <th rowSpan={2} className="border border-black p-0.5 leading-tight text-[8.5px]">
                  Dimension<br />(2 Hourly)
                </th>
              </tr>

              {/* Header Row 3: Sub-Headers (F, R) */}
              <tr className="bg-white font-bold h-5">
                {/* Under Retroactive Standard */}
                <th className="border border-black p-0.5">F</th>
                <th className="border border-black p-0.5">R</th>
                {/* Under Retroactive Result */}
                <th className="border border-black p-0.5">F</th>
                <th className="border border-black p-0.5">R</th>
                {/* Under Setup Approval Result (After breakdown) */}
                <th className="border border-black p-0.5">F</th>
                <th className="border border-black p-0.5">R</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((row, idx) => (
                <React.Fragment key={row.id || idx}>
                  {/* SUB-ROW 1: C/H W/H | CFM/CFA | C/H */}
                  <tr className="h-6">
                    {/* Operator Fields (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-0.5 font-bold">
                      {row.srNo}
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.date}
                        onChange={(e) => handleFieldChange(idx, 'date', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5 font-bold">
                      <input
                        type="text"
                        value={row.mcNo}
                        onChange={(e) => handleFieldChange(idx, 'mcNo', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.shift}
                        onChange={(e) => handleFieldChange(idx, 'shift', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.startTime}
                        onChange={(e) => handleFieldChange(idx, 'startTime', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5 text-left">
                      <textarea
                        rows={6}
                        value={row.operatorName}
                        onChange={(e) => handleFieldChange(idx, 'operatorName', e.target.value)}
                        className="w-full h-full bg-transparent border-0 outline-none p-0 resize-none text-[9px]"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5 text-left">
                      <textarea
                        rows={6}
                        value={row.problemDescription}
                        onChange={(e) => handleFieldChange(idx, 'problemDescription', e.target.value)}
                        className="w-full h-full bg-transparent border-0 outline-none p-0 resize-none text-[8.5px] leading-tight"
                      />
                    </td>

                    {/* PE / Maint. IT Fields (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.breakdownStandTime}
                        onChange={(e) => handleFieldChange(idx, 'breakdownStandTime', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.duringSetupOrRunning}
                        onChange={(e) => handleFieldChange(idx, 'duringSetupOrRunning', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.typeOfProblem}
                        onChange={(e) => handleFieldChange(idx, 'typeOfProblem', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5 text-left">
                      <textarea
                        rows={6}
                        value={row.reason}
                        onChange={(e) => handleFieldChange(idx, 'reason', e.target.value)}
                        className="w-full h-full bg-transparent border-0 outline-none p-0 resize-none text-[8.5px] leading-tight"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5 text-left">
                      <textarea
                        rows={6}
                        value={row.actionTaken}
                        onChange={(e) => handleFieldChange(idx, 'actionTaken', e.target.value)}
                        className="w-full h-full bg-transparent border-0 outline-none p-0 resize-none text-[8.5px] leading-tight"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.sparePartUsed}
                        onChange={(e) => handleFieldChange(idx, 'sparePartUsed', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[9px]"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.closeTime}
                        onChange={(e) => handleFieldChange(idx, 'closeTime', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.totalTime}
                        onChange={(e) => handleFieldChange(idx, 'totalTime', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.sign}
                        onChange={(e) => handleFieldChange(idx, 'sign', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Retroactive Part/Lot/Circuit (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.partNo}
                        onChange={(e) => handleFieldChange(idx, 'partNo', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[9px]"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.lotNo}
                        onChange={(e) => handleFieldChange(idx, 'lotNo', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[9px]"
                      />
                    </td>
                    <td rowSpan={5} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.circuitNo}
                        onChange={(e) => handleFieldChange(idx, 'circuitNo', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[9px]"
                      />
                    </td>

                    {/* Parameter 1: C/H W/H */}
                    <td className="border border-black p-0.5 font-bold leading-tight">C/H<br />W/H</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.chWh.stdF}
                        onChange={(e) => handleNestedChange(idx, 'chWh', 'stdF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.chWh.stdR}
                        onChange={(e) => handleNestedChange(idx, 'chWh', 'stdR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.chWh.resF}
                        onChange={(e) => handleNestedChange(idx, 'chWh', 'resF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.chWh.resR}
                        onChange={(e) => handleNestedChange(idx, 'chWh', 'resR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Status cell (rowSpan 4): If NG (Scrap / Rework) */}
                    <td rowSpan={4} className="border border-black p-0.5 align-middle leading-tight text-[8px] text-center">
                      If NG<br />(Scrap /<br />Rework)
                    </td>

                    {/* Inspector name (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-0.5 align-middle">
                      <input
                        type="text"
                        value={row.inspectorName}
                        onChange={(e) => handleFieldChange(idx, 'inspectorName', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[9px]"
                      />
                    </td>

                    {/* Set up Approval: Part No./Lot No./Circuit No. (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-0.5 text-left">
                      <textarea
                        rows={6}
                        value={row.setupPartLotCircuit}
                        onChange={(e) => handleFieldChange(idx, 'setupPartLotCircuit', e.target.value)}
                        className="w-full h-full bg-transparent border-0 outline-none p-0 resize-none text-[8.5px]"
                      />
                    </td>

                    {/* Process parameter 1: CFM/CFA */}
                    <td className="border border-black p-0.5 font-bold">CFM/CFA</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.cfmcfa}
                        onChange={(e) => handleFieldChange(idx, 'cfmcfa', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Set up Verification 1: C/H */}
                    <td className="border border-black p-0.5 font-bold">C/H</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.setupCh.resF}
                        onChange={(e) => handleNestedChange(idx, 'setupCh', 'resF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.setupCh.resR}
                        onChange={(e) => handleNestedChange(idx, 'setupCh', 'resR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* QA Shift In-charge name (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-0.5 align-middle">
                      <input
                        type="text"
                        value={row.qaShiftIncharge}
                        onChange={(e) => handleFieldChange(idx, 'qaShiftIncharge', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[9px]"
                      />
                    </td>

                    {/* Containment Action: Visual Insp(100%) (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-1 text-left align-top leading-tight text-[8px]">
                      <div className="flex flex-col justify-between h-full py-0.5">
                        <div className="flex items-center gap-1">
                          <span className="font-bold">OK:</span>
                          <input
                            type="text"
                            value={row.containmentVisual}
                            onChange={(e) => handleFieldChange(idx, 'containmentVisual', e.target.value)}
                            className="w-8 border-b border-black outline-none bg-transparent p-0 text-[8px]"
                          />
                        </div>
                        <div>
                          <span className="font-bold">NG:</span>
                        </div>
                        <div>
                          <span className="font-bold">Remark:</span>
                        </div>
                      </div>
                    </td>

                    {/* Containment Action: Dimension (2 Hourly) (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-1 text-left align-top leading-tight text-[8px]">
                      <div className="flex flex-col justify-between h-full py-0.5">
                        <div>
                          <span className="font-bold">1st:</span><br />
                          Std C/H:<br />
                          Obs:
                        </div>
                        <div>
                          <span className="font-bold">2nd:</span><br />
                          Std C/H:<br />
                          Obs:
                        </div>
                        <div>
                          <span className="font-bold">3rd:</span><br />
                          Std C/H:<br />
                          Obs:
                        </div>
                      </div>
                    </td>

                    {/* Verification By Process Owner (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-0.5 align-middle">
                      <input
                        type="text"
                        value={row.verificationProcessOwner}
                        onChange={(e) => handleFieldChange(idx, 'verificationProcessOwner', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[9px]"
                      />
                    </td>

                    {/* Approved By (QA Incharge) (rowSpan 5) */}
                    <td rowSpan={5} className="border border-black p-0.5 align-middle">
                      <input
                        type="text"
                        value={row.approvedByQaIncharge}
                        onChange={(e) => handleFieldChange(idx, 'approvedByQaIncharge', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[9px]"
                      />
                    </td>
                  </tr>

                  {/* SUB-ROW 2: I/H W/W | Main Air Pressure | I/H */}
                  <tr className="h-6">
                    <td className="border border-black p-0.5 font-bold leading-tight">I/H<br />W/W</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.ihWw.stdF}
                        onChange={(e) => handleNestedChange(idx, 'ihWw', 'stdF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.ihWw.stdR}
                        onChange={(e) => handleNestedChange(idx, 'ihWw', 'stdR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.ihWw.resF}
                        onChange={(e) => handleNestedChange(idx, 'ihWw', 'resF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.ihWw.resR}
                        onChange={(e) => handleNestedChange(idx, 'ihWw', 'resR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Process parameter 2: Main Air Pressure */}
                    <td className="border border-black p-0.5 font-bold leading-tight text-[8px]">Main Air Pressure</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.mainAirPressure}
                        onChange={(e) => handleFieldChange(idx, 'mainAirPressure', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Set up Verification 2: I/H */}
                    <td className="border border-black p-0.5 font-bold">I/H</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.setupIh.resF}
                        onChange={(e) => handleNestedChange(idx, 'setupIh', 'resF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.setupIh.resR}
                        onChange={(e) => handleNestedChange(idx, 'setupIh', 'resR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                  </tr>

                  {/* SUB-ROW 3: Strength | Poka Yoke | Strength */}
                  <tr className="h-6">
                    <td className="border border-black p-0.5 font-bold">Strength</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.strength.stdF}
                        onChange={(e) => handleNestedChange(idx, 'strength', 'stdF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.strength.stdR}
                        onChange={(e) => handleNestedChange(idx, 'strength', 'stdR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.strength.resF}
                        onChange={(e) => handleNestedChange(idx, 'strength', 'resF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.strength.resR}
                        onChange={(e) => handleNestedChange(idx, 'strength', 'resR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Process parameter 3: Poka Yoke */}
                    <td className="border border-black p-0.5 font-bold text-[8.5px]">Poka Yoke</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.pokaYoke}
                        onChange={(e) => handleFieldChange(idx, 'pokaYoke', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Set up Verification 3: Strength */}
                    <td className="border border-black p-0.5 font-bold">Strength</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.setupStrength.resF}
                        onChange={(e) => handleNestedChange(idx, 'setupStrength', 'resF', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.setupStrength.resR}
                        onChange={(e) => handleNestedChange(idx, 'setupStrength', 'resR', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                  </tr>

                  {/* SUB-ROW 4: Length | Other (if applicable) | Length */}
                  <tr className="h-6">
                    <td className="border border-black p-0.5 font-bold">Length</td>
                    <td colSpan={2} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.length.std}
                        onChange={(e) => handleNestedChange(idx, 'length', 'std', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td colSpan={2} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.length.res}
                        onChange={(e) => handleNestedChange(idx, 'length', 'res', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Process parameter 4: Other (if applicable) */}
                    <td className="border border-black p-0.5 font-bold leading-tight text-[8px]">
                      Other (if<br />applicable)
                    </td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.otherParam}
                        onChange={(e) => handleFieldChange(idx, 'otherParam', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Set up Verification 4: Length */}
                    <td className="border border-black p-0.5 font-bold">Length</td>
                    <td colSpan={2} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.setupLength}
                        onChange={(e) => handleFieldChange(idx, 'setupLength', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                  </tr>

                  {/* SUB-ROW 5: Visual (Last bunch) with Total Qty & NG Qty | Visual */}
                  <tr className="h-6">
                    <td className="border border-black p-0.5 font-bold leading-tight text-[8px]">
                      Visual<br />(Last bunch)
                    </td>
                    <td className="border border-black p-0.5 font-bold text-[7.5px] leading-tight">Total Qty</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.visual.totalQty}
                        onChange={(e) => handleNestedChange(idx, 'visual', 'totalQty', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                    <td className="border border-black p-0.5 font-bold text-[7.5px] leading-tight">NG Qty</td>
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.visual.ngQty}
                        onChange={(e) => handleNestedChange(idx, 'visual', 'ngQty', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Status cell under 5th row: Prod Supr Sign */}
                    <td className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.prodSuprSign}
                        onChange={(e) => handleFieldChange(idx, 'prodSuprSign', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>

                    {/* Process parameter 5: Blank */}
                    <td className="border border-black p-0.5"></td>
                    <td className="border border-black p-0.5"></td>

                    {/* Set up Verification 5: Visual */}
                    <td className="border border-black p-0.5 font-bold">Visual</td>
                    <td colSpan={2} className="border border-black p-0.5">
                      <input
                        type="text"
                        value={row.setupVisual}
                        onChange={(e) => handleFieldChange(idx, 'setupVisual', e.target.value)}
                        className="w-full h-full text-center bg-transparent border-0 outline-none p-0"
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* LOWER SECTION 1: 5M Change type: Machine */}
          <div className="mt-4 border-t-2 border-black pt-2 w-[2670px]">
            <div className="font-bold text-[11px] mb-1">
              5M Change type: Machine
            </div>

            <table className="w-full border-collapse border border-black text-[9px] text-left">
              <tbody>
                <tr className="align-top">
                  {/* Column 1: Expected Change (Planned) */}
                  <td className="border border-black p-1.5 w-[30%]">
                    <div className="font-bold text-center border-b border-black pb-1 mb-1">
                      Expected Change<br />(Planned)
                    </div>
                    <table className="w-full border-collapse border border-black text-[8.5px]">
                      <tbody>
                        <tr className="border-b border-black">
                          <td rowSpan={3} className="border-r border-black p-1 font-bold w-1/3">
                            M/C Idle under Preventive maintenance/periodic maintenance
                          </td>
                          <td className="border-r border-black p-1">
                            Production shifted to other m/c (Same capacity where the part has been produced earlier)
                          </td>
                          <td className="p-1 font-semibold text-center whitespace-nowrap">
                            Set up Approval
                          </td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1">
                            Production shifted to higher capacity m/c
                          </td>
                          <td className="p-1 font-semibold text-center whitespace-nowrap">
                            Set up Approval &nbsp;|&nbsp; Containment Action
                          </td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1">
                            Production shifted to lower capacity m/c
                          </td>
                          <td className="p-1 font-semibold text-center whitespace-nowrap">
                            Set up Approval &nbsp;|&nbsp; Containment Action
                          </td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1 font-bold">
                            Tool / Machine part change (For ex: After life over)
                          </td>
                          <td className="border-r border-black p-1">
                            Start machine after setup
                          </td>
                          <td className="p-1 font-semibold text-center whitespace-nowrap">
                            Set up Approval
                          </td>
                        </tr>
                        <tr>
                          <td className="border-r border-black p-1 font-bold">
                            Change of production line
                          </td>
                          <td className="border-r border-black p-1">
                            Production line shifted one place to another place with same M/C & process
                          </td>
                          <td className="p-1 font-semibold text-center whitespace-nowrap">
                            Set up Approval
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  {/* Column 2: Un-expected Change (Un-planned) */}
                  <td className="border border-black p-1.5 w-[34%]">
                    <div className="font-bold text-center border-b border-black pb-1 mb-1">
                      Un-expected Change<br />(Un-planned)
                    </div>
                    <table className="w-full border-collapse border border-black text-[8.5px]">
                      <tbody>
                        <tr className="border-b border-black">
                          <td rowSpan={3} className="border-r border-black p-1 font-bold w-1/3">
                            Break down of M/C, Equipment, Jig & Fixture
                          </td>
                          <td className="border-r border-black p-1">
                            Production shifted to other m/c (Same capacity where the part has been produced earlier)
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Set up approval</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center"></td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1">
                            M/C Restart after temporary repairs
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Set up approval</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center whitespace-nowrap">Containment Action</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1">
                            Production shifted to higher/lower capacity m/c
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Set up approval</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center whitespace-nowrap">Containment Action</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1 font-bold">
                            Machine parameter of out of spec
                          </td>
                          <td className="border-r border-black p-1">
                            Stop production and re-start the production after resetting the parameter
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Set up approval</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center"></td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1 font-bold">
                            Checking fixture breakdown
                          </td>
                          <td className="border-r border-black p-1">
                            Stop the production and start after correction
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Set up approval</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center"></td>
                        </tr>
                        <tr>
                          <td className="border-r border-black p-1 font-bold">
                            Break down related to IT system
                          </td>
                          <td className="border-r border-black p-1">
                            Stop working on station till correction
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Set up approval</td>
                          <td className="border-r border-black p-0.5 text-center"></td>
                          <td className="p-0.5 text-center"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  {/* Column 3: Abnormal Condition & Explanatory Notes */}
                  <td className="border border-black p-1.5 w-[36%]">
                    <div className="font-bold text-center border-b border-black pb-1 mb-1">
                      Abnormal Condition
                    </div>
                    <table className="w-full border-collapse border border-black text-[8.5px] mb-2">
                      <tbody>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1 font-bold w-1/3">
                            Instrument Out of Calibration / NG during calibration
                          </td>
                          <td className="border-r border-black p-1">
                            1. Inspection to be stopped<br />
                            2. Submit to lab & issue ok calibrated instrument.
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Setup</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center"></td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1 font-bold">Power failure</td>
                          <td className="border-r border-black p-1">
                            Operator inform to supervisor/restart the m/c
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Setup</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center"></td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1 font-bold">Poka yoke not working</td>
                          <td className="border-r border-black p-1">
                            1. Validate the poka yoke<br />
                            2. Rejected part should be used for validate.
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Setup</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center"></td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="border-r border-black p-1 font-bold">Noise level high</td>
                          <td className="border-r border-black p-1">
                            Stop production & restart production after rectifying the noise of m/c.
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Setup</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center whitespace-nowrap">Containment Action</td>
                        </tr>
                        <tr>
                          <td className="border-r border-black p-1 font-bold">Air pressure low/high</td>
                          <td className="border-r border-black p-1">
                            Stop production & restart production after correction in m/air pressure
                          </td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Setup</td>
                          <td className="border-r border-black p-0.5 text-center whitespace-nowrap">Retroactive check</td>
                          <td className="p-0.5 text-center whitespace-nowrap">Containment Action</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Explanatory notes box */}
                    <div className="border border-black p-1 text-[8px] leading-tight space-y-0.5">
                      <div>* Retro parts are the parts which are already produced when we come to know of change in process like m/c breakdown, poka yoke failures etc.</div>
                      <div>* Containment parts are the parts produced after change (ex. Part produced by lower operator, part produce at time of poka yoke bypass)</div>
                      <div>* If any difficulty during set up by operator and maintenace change any spare part then machine run after set up approval (Shift with set up)</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* LOWER SECTION 2: 5M Recording matrix in case of production shifted to other M/C during PM OR Breakdown */}
          <div className="mt-4 border-t-2 border-black pt-2 w-[2670px]">
            <div className="font-bold text-[11px] mb-1">
              5M Recording matrix in case of production shifted to other M/C during PM OR Breakdown.
            </div>

            <table className="w-full border-collapse border border-black text-[8.5px] text-center">
              <tbody>
                <tr className="border-b border-black">
                  {/* KOMAX-252 */}
                  <td rowSpan={4} className="border-r border-black p-1 font-bold w-[7%]">
                    KOMAX-252
                  </td>
                  <td className="border-r border-black p-1 w-[8%] font-semibold">KOMAX-253</td>
                  <td className="border-r border-black p-1 w-[8%]">Setup approval</td>
                  <td className="border-r border-black p-1 w-[7%]">N/R</td>

                  {/* KOMAX-253 */}
                  <td rowSpan={4} className="border-r border-black p-1 font-bold w-[7%]">
                    KOMAX-253
                  </td>
                  <td className="border-r border-black p-1 w-[8%] font-semibold">KOMAX-252</td>
                  <td className="border-r border-black p-1 w-[8%]">Setup approval</td>
                  <td className="border-r border-black p-1 w-[7%]">N/R</td>

                  {/* TRD-301 */}
                  <td rowSpan={4} className="border-r border-black p-1 font-bold w-[7%]">
                    TRD-301
                  </td>
                  <td className="border-r border-black p-1 w-[8%] font-semibold">KOMAX-252</td>
                  <td className="border-r border-black p-1 w-[8%]">Setup approval</td>
                  <td className="border-r border-black p-1 w-[7%]">Containment Action</td>

                  {/* TRD-411 */}
                  <td rowSpan={4} className="border-r border-black p-1 font-bold w-[7%]">
                    TRD-411
                  </td>
                  <td className="border-r border-black p-1 w-[8%] font-semibold">KOMAX-252</td>
                  <td className="border-r border-black p-1 w-[8%]">Setup approval</td>
                  <td className="border-r border-black p-1 w-[7%]">Containment Action</td>

                  {/* TRD411F (LT) */}
                  <td rowSpan={4} className="border-r border-black p-1 font-bold w-[7%]">
                    TRD411F (LT)
                  </td>
                  <td className="border-r border-black p-1 w-[8%] font-semibold">TRD-301</td>
                  <td className="border-r border-black p-1 w-[8%]">Setup approval</td>
                  <td className="p-1 w-[7%]">Containment Action</td>
                </tr>

                <tr className="border-b border-black">
                  <td className="border-r border-black p-1 font-semibold">TRD-441</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1 font-semibold">TRD-441</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1 font-semibold">KOMAX-253</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1 font-semibold">KOMAX-253</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1"></td>
                  <td className="p-1"></td>
                </tr>

                <tr className="border-b border-black">
                  <td className="border-r border-black p-1 font-semibold">TRD-301</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1 font-semibold">TRD-301</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1 font-semibold">TRD-411</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">N/R</td>

                  <td className="border-r border-black p-1 font-semibold">TRD-301</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">N/R</td>

                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1"></td>
                  <td className="p-1"></td>
                </tr>

                <tr>
                  <td className="border-r border-black p-1 font-semibold">Manual</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1 font-semibold">Manual</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1 font-semibold">Manual</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1 font-semibold">Manual</td>
                  <td className="border-r border-black p-1">Setup approval</td>
                  <td className="border-r border-black p-1">Containment Action</td>

                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1"></td>
                  <td className="p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Document Numbers */}
          <div className="flex items-center justify-between pt-2 mt-2 font-bold text-[10px] w-[2670px]">
            <div>FRM-WH-QA-241</div>
            <div>Rev. No:02</div>
          </div>
        </div>
      </div>
    </div>
  );
}
