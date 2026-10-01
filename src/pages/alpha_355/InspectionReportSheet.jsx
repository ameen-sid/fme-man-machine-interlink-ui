import React, { useState } from 'react';
import { 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  FileSpreadsheet 
} from 'lucide-react';

const INITIAL_ROWS = [
  {
    id: 1,
    partNo: '',
    lotNo: '',
    circuitNo: '',
    setupApprovalNo: '',
    wireType: '',
    wireSize: '',
    wireColor: '',
    wireLengthStd: '',
    wireLengthActual: '',
    // R-Side
    rTerminalName: '',
    rApplicatorNo: '',
    rStripStd: '',
    rStripActual: '',
    rChStd: '',
    rChActualBegin: '',
    rChActualEnd: '',
    rIhStd: '',
    rIhActualBegin: '',
    rIhActualEnd: '',
    rCwStd: '',
    rCwActualBegin: '',
    rPullStrength: '',
    // F-Side
    fTerminalName: '',
    fApplicatorNo: '',
    fStripStd: '',
    fStripActual: '',
    fChStd: '',
    fChActualBegin: '',
    fChActualEnd: '',
    fIhStd: '',
    fIhActualBegin: '',
    fIhActualEnd: '',
    fCwStd: '',
    fCwActualBegin: '',
    fPullStrength: '',
    // Quality & Output
    numberOfOkProducts: '',
    visualStatusRSide: 'OK',
    visualStatusFSide: 'OK',
    defectQtyRSide: '',
    defectQtyFSide: '',
    qcInspectOrSign: '',
    verifiedByQcLeader: '',
    sample: ''
  },
  {
    id: 2,
    partNo: '',
    lotNo: '',
    circuitNo: '',
    setupApprovalNo: '',
    wireType: '',
    wireSize: '',
    wireColor: '',
    wireLengthStd: '',
    wireLengthActual: '',
    // R-Side
    rTerminalName: '',
    rApplicatorNo: '',
    rStripStd: '',
    rStripActual: '',
    rChStd: '',
    rChActualBegin: '',
    rChActualEnd: '',
    rIhStd: '',
    rIhActualBegin: '',
    rIhActualEnd: '',
    rCwStd: '',
    rCwActualBegin: '',
    rPullStrength: '',
    // F-Side
    fTerminalName: '',
    fApplicatorNo: '',
    fStripStd: '',
    fStripActual: '',
    fChStd: '',
    fChActualBegin: '',
    fChActualEnd: '',
    fIhStd: '',
    fIhActualBegin: '',
    fIhActualEnd: '',
    fCwStd: '',
    fCwActualBegin: '',
    fPullStrength: '',
    // Quality & Output
    numberOfOkProducts: '',
    visualStatusRSide: 'OK',
    visualStatusFSide: 'OK',
    defectQtyRSide: '',
    defectQtyFSide: '',
    qcInspectOrSign: '',
    verifiedByQcLeader: '',
    sample: ''
  },
  {
    id: 3,
    partNo: '',
    lotNo: '',
    circuitNo: '',
    setupApprovalNo: '',
    wireType: '',
    wireSize: '',
    wireColor: '',
    wireLengthStd: '',
    wireLengthActual: '',
    // R-Side
    rTerminalName: '',
    rApplicatorNo: '',
    rStripStd: '',
    rStripActual: '',
    rChStd: '',
    rChActualBegin: '',
    rChActualEnd: '',
    rIhStd: '',
    rIhActualBegin: '',
    rIhActualEnd: '',
    rCwStd: '',
    rCwActualBegin: '',
    rPullStrength: '',
    // F-Side
    fTerminalName: '',
    fApplicatorNo: '',
    fStripStd: '',
    fStripActual: '',
    fChStd: '',
    fChActualBegin: '',
    fChActualEnd: '',
    fIhStd: '',
    fIhActualBegin: '',
    fIhActualEnd: '',
    fCwStd: '',
    fCwActualBegin: '',
    fPullStrength: '',
    // Quality & Output
    numberOfOkProducts: '',
    visualStatusRSide: 'OK',
    visualStatusFSide: 'OK',
    defectQtyRSide: '',
    defectQtyFSide: '',
    qcInspectOrSign: '',
    verifiedByQcLeader: '',
    sample: ''
  },
  {
    id: 4,
    partNo: '',
    lotNo: '',
    circuitNo: '',
    setupApprovalNo: '',
    wireType: '',
    wireSize: '',
    wireColor: '',
    wireLengthStd: '',
    wireLengthActual: '',
    // R-Side
    rTerminalName: '',
    rApplicatorNo: '',
    rStripStd: '',
    rStripActual: '',
    rChStd: '',
    rChActualBegin: '',
    rChActualEnd: '',
    rIhStd: '',
    rIhActualBegin: '',
    rIhActualEnd: '',
    rCwStd: '',
    rCwActualBegin: '',
    rPullStrength: '',
    // F-Side
    fTerminalName: '',
    fApplicatorNo: '',
    fStripStd: '',
    fStripActual: '',
    fChStd: '',
    fChActualBegin: '',
    fChActualEnd: '',
    fIhStd: '',
    fIhActualBegin: '',
    fIhActualEnd: '',
    fCwStd: '',
    fCwActualBegin: '',
    fPullStrength: '',
    // Quality & Output
    numberOfOkProducts: '',
    visualStatusRSide: 'OK',
    visualStatusFSide: 'OK',
    defectQtyRSide: '',
    defectQtyFSide: '',
    qcInspectOrSign: '',
    verifiedByQcLeader: '',
    sample: ''
  },
  {
    id: 5,
    partNo: '',
    lotNo: '',
    circuitNo: '',
    setupApprovalNo: '',
    wireType: '',
    wireSize: '',
    wireColor: '',
    wireLengthStd: '',
    wireLengthActual: '',
    // R-Side
    rTerminalName: '',
    rApplicatorNo: '',
    rStripStd: '',
    rStripActual: '',
    rChStd: '',
    rChActualBegin: '',
    rChActualEnd: '',
    rIhStd: '',
    rIhActualBegin: '',
    rIhActualEnd: '',
    rCwStd: '',
    rCwActualBegin: '',
    rPullStrength: '',
    // F-Side
    fTerminalName: '',
    fApplicatorNo: '',
    fStripStd: '',
    fStripActual: '',
    fChStd: '',
    fChActualBegin: '',
    fChActualEnd: '',
    fIhStd: '',
    fIhActualBegin: '',
    fIhActualEnd: '',
    fCwStd: '',
    fCwActualBegin: '',
    fPullStrength: '',
    // Quality & Output
    numberOfOkProducts: '',
    visualStatusRSide: 'OK',
    visualStatusFSide: 'OK',
    defectQtyRSide: '',
    defectQtyFSide: '',
    qcInspectOrSign: '',
    verifiedByQcLeader: '',
    sample: ''
  },
  {
    id: 6,
    partNo: '',
    lotNo: '',
    circuitNo: '',
    setupApprovalNo: '',
    wireType: '',
    wireSize: '',
    wireColor: '',
    wireLengthStd: '',
    wireLengthActual: '',
    // R-Side
    rTerminalName: '',
    rApplicatorNo: '',
    rStripStd: '',
    rStripActual: '',
    rChStd: '',
    rChActualBegin: '',
    rChActualEnd: '',
    rIhStd: '',
    rIhActualBegin: '',
    rIhActualEnd: '',
    rCwStd: '',
    rCwActualBegin: '',
    rPullStrength: '',
    // F-Side
    fTerminalName: '',
    fApplicatorNo: '',
    fStripStd: '',
    fStripActual: '',
    fChStd: '',
    fChActualBegin: '',
    fChActualEnd: '',
    fIhStd: '',
    fIhActualBegin: '',
    fIhActualEnd: '',
    fCwStd: '',
    fCwActualBegin: '',
    fPullStrength: '',
    // Quality & Output
    numberOfOkProducts: '',
    visualStatusRSide: 'OK',
    visualStatusFSide: 'OK',
    defectQtyRSide: '',
    defectQtyFSide: '',
    qcInspectOrSign: '',
    verifiedByQcLeader: '',
    sample: ''
  }
];

export default function InspectionReportSheet({ machine, onClose }) {
  // Sheet Header State
  const [headerInfo, setHeaderInfo] = useState({
    machineName: machine?.name || 'C&C 01',
    operatorName: 'Sunil Verma',
    inspectorName: 'Ramesh Sharma',
    date: new Date().toISOString().split('T')[0],
    shift: 'Shift A',
    docNo: 'FRM-QC-PS-244',
    revNo: '01.07.2024',
    formRef: 'QMS-08 (FME)',
    effectiveDate: '01-07-2024'
  });

  const [rows, setRows] = useState(INITIAL_ROWS);
  const [savedToast, setSavedToast] = useState('');

  const handleCellChange = (rowIdx, field, value) => {
    setRows(prev => {
      const copy = [...prev];
      copy[rowIdx] = { ...copy[rowIdx], [field]: value };
      return copy;
    });
  };

  const handleAddRow = () => {
    setRows(prev => [
      ...prev,
      {
        id: prev.length + 1,
        partNo: '',
        lotNo: '',
        circuitNo: '',
        setupApprovalNo: '',
        wireType: '',
        wireSize: '',
        wireColor: '',
        wireLengthStd: '',
        wireLengthActual: '',
        rTerminalName: '',
        rApplicatorNo: '',
        rStripStd: '',
        rStripActual: '',
        rChStd: '',
        rChActualBegin: '',
        rChActualEnd: '',
        rIhStd: '',
        rIhActualBegin: '',
        rIhActualEnd: '',
        rCwStd: '',
        rCwActualBegin: '',
        rPullStrength: '',
        fTerminalName: '',
        fApplicatorNo: '',
        fStripStd: '',
        fStripActual: '',
        fChStd: '',
        fChActualBegin: '',
        fChActualEnd: '',
        fIhStd: '',
        fIhActualBegin: '',
        fIhActualEnd: '',
        fCwStd: '',
        fCwActualBegin: '',
        fPullStrength: '',
        numberOfOkProducts: '',
        visualStatusRSide: 'OK',
        visualStatusFSide: 'OK',
        defectQtyRSide: '',
        defectQtyFSide: '',
        qcInspectOrSign: '',
        verifiedByQcLeader: '',
        sample: ''
      }
    ]);
  };

  const handleRemoveRow = (rowIdx) => {
    if (rows.length <= 1) return;
    setRows(prev => prev.filter((_, idx) => idx !== rowIdx));
  };

  const handleSave = () => {
    setSavedToast(`Daily Record of Cutting & Crimping saved successfully for ${headerInfo.machineName}!`);
    setTimeout(() => setSavedToast(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this inspection report to empty defaults?')) {
      setRows(INITIAL_ROWS);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full animate-fadeIn">
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <FileSpreadsheet size={18} className="text-indigo-600 bg-indigo-50 p-2 rounded-lg w-9 h-9" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">DAILY RECORD OF CUTTING AND CRIMPING OPERATION</h3>
            <span className="text-[11.5px] text-slate-500 font-medium">
              Document No: <strong>{headerInfo.docNo}</strong> • Machine: <strong>{headerInfo.machineName}</strong> (C&C Cutting & Crimping Division)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {savedToast && <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11.5px] font-bold py-1.5 px-3 rounded-md animate-pulse">{savedToast}</div>}
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border-none cursor-pointer bg-sky-600 text-white hover:bg-sky-700 transition-all" onClick={handleAddRow} title="Add new row to table">
            <Plus size={15} />
            <span>Add Row</span>
          </button>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border-none cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm" onClick={handleSave}>
            <Save size={15} />
            <span>Save Record</span>
          </button>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-slate-200 cursor-pointer bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all" onClick={handleReset} title="Reset table">
            <RotateCcw size={15} />
          </button>
          {onClose && (
            <button className="inline-flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg border-none cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition-all" onClick={onClose}>
              Close Checksheet
            </button>
          )}
        </div>
      </div>

      {/* Main Excel Sheet Canvas */}
      <div className="bg-white border-[1.5px] border-black p-2 font-sans shadow-md rounded-[4px]">
        {/* Top Header Block: Title + Change Rules Table + Doc Meta */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3 border-b-[1.5px] border-black pb-2 mb-2">
          <div className="flex flex-col justify-between">
            <h2 className="text-[17px] font-black tracking-wide text-black underline mb-3 text-center">DAILY RECORD OF CUTTING AND CRIMPING OPERATION</h2>
            
            {/* Machine Meta Bar */}
            <div className="grid grid-cols-5 border border-black">
              <div className="flex flex-col border-r border-black">
                <span className="text-[11px] font-extrabold text-black bg-slate-50 py-1 px-1.5 border-b border-black text-center">Machine name</span>
                <input
                  type="text"
                  className="border-none outline-none text-[11.5px] font-bold text-blue-700 py-1 px-1.5 text-center bg-transparent focus:bg-yellow-100"
                  value={headerInfo.machineName}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, machineName: e.target.value })}
                />
              </div>
              <div className="flex flex-col border-r border-black">
                <span className="text-[11px] font-extrabold text-black bg-slate-50 py-1 px-1.5 border-b border-black text-center">Operator Name</span>
                <input
                  type="text"
                  className="border-none outline-none text-[11.5px] font-semibold text-black py-1 px-1.5 text-center bg-transparent focus:bg-yellow-100"
                  value={headerInfo.operatorName}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, operatorName: e.target.value })}
                />
              </div>
              <div className="flex flex-col border-r border-black">
                <span className="text-[11px] font-extrabold text-black bg-slate-50 py-1 px-1.5 border-b border-black text-center">Inspector Name</span>
                <input
                  type="text"
                  className="border-none outline-none text-[11.5px] font-semibold text-black py-1 px-1.5 text-center bg-transparent focus:bg-yellow-100"
                  value={headerInfo.inspectorName}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, inspectorName: e.target.value })}
                />
              </div>
              <div className="flex flex-col border-r border-black">
                <span className="text-[11px] font-extrabold text-black bg-slate-50 py-1 px-1.5 border-b border-black text-center">Date</span>
                <input
                  type="date"
                  className="border-none outline-none text-[11.5px] font-semibold text-black py-1 px-1.5 text-center bg-transparent focus:bg-yellow-100"
                  value={headerInfo.date}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, date: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold text-black bg-slate-50 py-1 px-1.5 border-b border-black text-center">Shift</span>
                <input
                  type="text"
                  className="border-none outline-none text-[11.5px] font-semibold text-black py-1 px-1.5 text-center bg-transparent focus:bg-yellow-100"
                  value={headerInfo.shift}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, shift: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Right Rules & Doc No Box */}
          <div className="flex flex-col gap-1.5">
            <div className="border border-black">
              <table className="w-full border-collapse text-[9.5px]">
                <tbody>
                  <tr>
                    <td className="bg-slate-100 font-bold w-[65px] p-0.5 px-1 border border-slate-300">Doc No:</td>
                    <td className="p-0.5 px-1 border border-slate-300 font-bold text-slate-900">{headerInfo.docNo}</td>
                  </tr>
                  <tr>
                    <td className="bg-slate-100 font-bold w-[65px] p-0.5 px-1 border border-slate-300">Rev. Dt:</td>
                    <td className="p-0.5 px-1 border border-slate-300 font-semibold text-slate-800">{headerInfo.revNo}</td>
                  </tr>
                  <tr>
                    <td className="bg-slate-100 font-bold w-[65px] p-0.5 px-1 border border-slate-300">Ref QMS:</td>
                    <td className="p-0.5 px-1 border border-slate-300 font-semibold text-slate-800">{headerInfo.formRef}</td>
                  </tr>
                  <tr>
                    <td className="bg-slate-100 font-bold w-[65px] p-0.5 px-1 border border-slate-300">Effective:</td>
                    <td className="p-0.5 px-1 border border-slate-300 font-semibold text-slate-800">{headerInfo.effectiveDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-black p-1 px-2 bg-slate-50">
              <div className="text-[9px] font-extrabold text-black mb-0.5">Note- Mention Setup approval number for following Change:</div>
              <ul className="list-none m-0 p-0 text-[8.5px] leading-tight text-slate-700">
                <li>1- Circuit number change</li>
                <li>2- Terminal reel change over</li>
                <li>3- Wire Change over</li>
                <li>4- Applicator breakdown</li>
                <li>5- Machine breakdown</li>
                <li>6- Applicator change over</li>
                <li>7- CFA / CFM / TCM Error Continue 3 time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Master Inspection Excel-like Table */}
        <div className="overflow-x-auto border-[1.5px] border-black mb-2 relative bg-white max-w-full">
          <table className="min-w-[2500px] w-max border-collapse text-[10.5px] text-left">
            <thead>
              {/* Row 1: Groupings */}
              <tr className="border-b border-black">
                <th rowSpan={3} className="sticky left-0 z-20 bg-white border border-black p-1 text-[9.5px] font-extrabold text-center w-[75px] min-w-[75px]">Part No.</th>
                <th rowSpan={3} className="sticky left-[75px] z-20 bg-white border border-black p-1 text-[9.5px] font-extrabold text-center w-[65px] min-w-[65px]">Lot No</th>
                <th rowSpan={3} className="sticky left-[140px] z-20 bg-white border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px] min-w-[70px]">Circuit No</th>
                <th rowSpan={3} className="sticky left-[210px] z-20 bg-white border border-black p-1 text-[9.5px] font-extrabold text-center w-[85px] min-w-[85px]">Setup Approval No</th>
                
                {/* Wire Specs Stacked Column */}
                <th className="sticky left-[295px] z-20 bg-white border border-black p-1 text-[9.5px] font-extrabold text-center w-[80px] min-w-[80px] shadow-[3px_0_6px_-1px_rgba(0,0,0,0.18)] !border-r-2 !border-r-black h-[22px]">Wire type</th>
                
                {/* Wire Length */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px]">
                  Wire length<br />
                  <span className="text-[8.5px] font-normal text-slate-500">(Tolerance +2~4mm)</span>
                </th>

                {/* R-Side Header Group */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[75px]">Terminal name</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px]">Confirm initial stripping state</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px]">C/H</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px]">I/H</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px]">C / W</th>
                <th rowSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px]">
                  Pulling strength
                </th>

                {/* F-Side Header Group */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[75px]">Terminal name</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px]">Confirm initial stripping state</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px]">C/H</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px]">I/H</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px]">C / W</th>
                <th rowSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px]">
                  Pulling strength
                </th>

                {/* Output & QC Headers */}
                <th rowSpan={3} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[65px]">Number of OK products</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px]">Visual Status (OK/Defect Name)</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[75px]">Defect Qty.</th>
                <th rowSpan={3} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px]">QC Inspector Sign</th>
                <th rowSpan={3} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px]">Verified By QC Leader</th>
                <th rowSpan={3} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[75px]">Sample</th>
                <th rowSpan={3} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[40px] bg-slate-50 text-slate-500">Act</th>
              </tr>

              {/* Row 2: Standard values and second stack */}
              <tr className="border-b border-black">
                {/* Wire Size */}
                <th className="sticky left-[295px] z-20 bg-white border border-black p-1 text-[9.5px] font-extrabold text-center w-[80px] min-w-[80px] shadow-[3px_0_6px_-1px_rgba(0,0,0,0.18)] !border-r-2 !border-r-black h-[22px]">Wire size</th>
                
                {/* Wire length Standard */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px]">Standard value</th>

                {/* R-Side Mid */}
                <th rowSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[75px]">Applicator No.</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px] bg-yellow-100 text-yellow-950">Standard</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px] bg-yellow-100 text-yellow-950">Standard value</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px] bg-yellow-100 text-yellow-950">Standard value</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px] bg-yellow-100 text-yellow-950">Std.value</th>

                {/* F-Side Mid */}
                <th rowSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[75px]">Applicator No.</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px] bg-yellow-100 text-yellow-950">Standard</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px] bg-yellow-100 text-yellow-950">Standard value</th>
                <th colSpan={2} className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px] bg-yellow-100 text-yellow-950">Standard value</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px] bg-yellow-100 text-yellow-950">Std.value</th>

                {/* QC Sub-headers Row 2 */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">R side</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">F side</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[38px]">R side</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[38px]">F side</th>
              </tr>

              {/* Row 3: Actual values, Begin/End, Units */}
              <tr className="border-b border-black">
                {/* Wire Color */}
                <th className="sticky left-[295px] z-20 bg-white border border-black p-1 text-[9.5px] font-extrabold text-center w-[80px] min-w-[80px] shadow-[3px_0_6px_-1px_rgba(0,0,0,0.18)] !border-r-2 !border-r-black h-[22px]">Wire color</th>

                {/* Wire length Actual */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[90px]">Actual value</th>

                {/* R-Side Sub-divisions */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px]">Actual</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">Begin</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">End</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">Begin</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">End</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px]">
                  Actual<br />value<br />Begin
                </th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px]">(N)</th>

                {/* F-Side Sub-divisions */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[70px]">Actual</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">Begin</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">End</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">Begin</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px]">End</th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px]">
                  Actual<br />value<br />Begin
                </th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[60px]">(N)</th>

                {/* Empty cells under QC for alignment */}
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px] bg-white !border-t-0"></th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[45px] bg-white !border-t-0"></th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[38px] bg-white !border-t-0"></th>
                <th className="border border-black p-1 text-[9.5px] font-extrabold text-center w-[38px] bg-white !border-t-0"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  {/* General */}
                  <td className="sticky left-0 z-10 bg-white hover:bg-slate-100 border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 focus:bg-yellow-100"
                      value={row.partNo}
                      onChange={(e) => handleCellChange(rIdx, 'partNo', e.target.value)}
                      placeholder="Part #"
                    />
                  </td>
                  <td className="sticky left-[75px] z-10 bg-white hover:bg-slate-100 border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.lotNo}
                      onChange={(e) => handleCellChange(rIdx, 'lotNo', e.target.value)}
                      placeholder="Lot"
                    />
                  </td>
                  <td className="sticky left-[140px] z-10 bg-white hover:bg-slate-100 border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.circuitNo}
                      onChange={(e) => handleCellChange(rIdx, 'circuitNo', e.target.value)}
                      placeholder="Ckt #"
                    />
                  </td>
                  <td className="sticky left-[210px] z-10 bg-white hover:bg-slate-100 border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.setupApprovalNo}
                      onChange={(e) => handleCellChange(rIdx, 'setupApprovalNo', e.target.value)}
                      placeholder="Appr #"
                    />
                  </td>
                  <td className="sticky left-[295px] z-10 bg-white hover:bg-slate-100 border border-black !border-r-2 !border-r-black shadow-[3px_0_6px_-1px_rgba(0,0,0,0.18)] p-0">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 h-6 px-1 text-center focus:bg-yellow-100"
                      value={row.wireType}
                      onChange={(e) => handleCellChange(rIdx, 'wireType', e.target.value)}
                      placeholder="Type"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 h-6 px-1 text-center border-t border-dashed border-slate-300 focus:bg-yellow-100"
                      value={row.wireSize}
                      onChange={(e) => handleCellChange(rIdx, 'wireSize', e.target.value)}
                      placeholder="Size"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 h-6 px-1 text-center border-t border-dashed border-slate-300 focus:bg-yellow-100"
                      value={row.wireColor}
                      onChange={(e) => handleCellChange(rIdx, 'wireColor', e.target.value)}
                      placeholder="Color"
                    />
                  </td>
                  <td className="border border-black p-0.5 bg-yellow-100">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.wireLengthStd}
                      onChange={(e) => handleCellChange(rIdx, 'wireLengthStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-blue-700 font-bold p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-200"
                      value={row.wireLengthActual}
                      onChange={(e) => handleCellChange(rIdx, 'wireLengthActual', e.target.value)}
                      placeholder="Act"
                    />
                  </td>

                  {/* R-Side */}
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 focus:bg-yellow-100"
                      value={row.rTerminalName}
                      onChange={(e) => handleCellChange(rIdx, 'rTerminalName', e.target.value)}
                      placeholder="Term R"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 border-t border-dashed border-slate-300 focus:bg-yellow-100"
                      value={row.rApplicatorNo}
                      onChange={(e) => handleCellChange(rIdx, 'rApplicatorNo', e.target.value)}
                      placeholder="App No"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-yellow-100 font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.rStripStd}
                      onChange={(e) => handleCellChange(rIdx, 'rStripStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-100"
                      value={row.rStripActual}
                      onChange={(e) => handleCellChange(rIdx, 'rStripActual', e.target.value)}
                      placeholder="Act"
                    />
                  </td>
                  <td className="border border-black p-0.5 bg-yellow-100">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.rChStd}
                      onChange={(e) => handleCellChange(rIdx, 'rChStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 font-bold p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-200"
                      value={row.rChActualBegin}
                      onChange={(e) => handleCellChange(rIdx, 'rChActualBegin', e.target.value)}
                      placeholder="Beg"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.rChActualEnd}
                      onChange={(e) => handleCellChange(rIdx, 'rChActualEnd', e.target.value)}
                      placeholder="End"
                    />
                  </td>
                  <td className="border border-black p-0.5 bg-yellow-100">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.rIhStd}
                      onChange={(e) => handleCellChange(rIdx, 'rIhStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 font-bold p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-200"
                      value={row.rIhActualBegin}
                      onChange={(e) => handleCellChange(rIdx, 'rIhActualBegin', e.target.value)}
                      placeholder="Beg"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.rIhActualEnd}
                      onChange={(e) => handleCellChange(rIdx, 'rIhActualEnd', e.target.value)}
                      placeholder="End"
                    />
                  </td>
                  <td className="border border-black p-0.5 bg-yellow-100">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.rCwStd}
                      onChange={(e) => handleCellChange(rIdx, 'rCwStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 font-bold p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-200"
                      value={row.rCwActualBegin}
                      onChange={(e) => handleCellChange(rIdx, 'rCwActualBegin', e.target.value)}
                      placeholder="Beg"
                    />
                  </td>
                  <td className="border border-black p-0.5 text-center text-slate-400 font-bold [background:linear-gradient(to_top_right,#f8fafc_calc(50%-0.75px),#cbd5e1,#ffffff_calc(50%+0.75px))]">
                    -
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-900 font-black p-0.5 text-center focus:bg-yellow-100"
                      value={row.rPullStrength}
                      onChange={(e) => handleCellChange(rIdx, 'rPullStrength', e.target.value)}
                      placeholder="N"
                    />
                  </td>

                  {/* F-Side */}
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 focus:bg-yellow-100"
                      value={row.fTerminalName}
                      onChange={(e) => handleCellChange(rIdx, 'fTerminalName', e.target.value)}
                      placeholder="Term F"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 border-t border-dashed border-slate-300 focus:bg-yellow-100"
                      value={row.fApplicatorNo}
                      onChange={(e) => handleCellChange(rIdx, 'fApplicatorNo', e.target.value)}
                      placeholder="App No"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-yellow-100 font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.fStripStd}
                      onChange={(e) => handleCellChange(rIdx, 'fStripStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-100"
                      value={row.fStripActual}
                      onChange={(e) => handleCellChange(rIdx, 'fStripActual', e.target.value)}
                      placeholder="Act"
                    />
                  </td>
                  <td className="border border-black p-0.5 bg-yellow-100">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.fChStd}
                      onChange={(e) => handleCellChange(rIdx, 'fChStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 font-bold p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-200"
                      value={row.fChActualBegin}
                      onChange={(e) => handleCellChange(rIdx, 'fChActualBegin', e.target.value)}
                      placeholder="Beg"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.fChActualEnd}
                      onChange={(e) => handleCellChange(rIdx, 'fChActualEnd', e.target.value)}
                      placeholder="End"
                    />
                  </td>
                  <td className="border border-black p-0.5 bg-yellow-100">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.fIhStd}
                      onChange={(e) => handleCellChange(rIdx, 'fIhStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 font-bold p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-200"
                      value={row.fIhActualBegin}
                      onChange={(e) => handleCellChange(rIdx, 'fIhActualBegin', e.target.value)}
                      placeholder="Beg"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.fIhActualEnd}
                      onChange={(e) => handleCellChange(rIdx, 'fIhActualEnd', e.target.value)}
                      placeholder="End"
                    />
                  </td>
                  <td className="border border-black p-0.5 bg-yellow-100">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-200"
                      value={row.fCwStd}
                      onChange={(e) => handleCellChange(rIdx, 'fCwStd', e.target.value)}
                      placeholder="Std"
                    />
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 font-bold p-0.5 text-center border-t border-dashed border-slate-300 focus:bg-yellow-200"
                      value={row.fCwActualBegin}
                      onChange={(e) => handleCellChange(rIdx, 'fCwActualBegin', e.target.value)}
                      placeholder="Beg"
                    />
                  </td>
                  <td className="border border-black p-0.5 text-center text-slate-400 font-bold [background:linear-gradient(to_top_right,#f8fafc_calc(50%-0.75px),#cbd5e1,#ffffff_calc(50%+0.75px))]">
                    -
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-900 font-black p-0.5 text-center focus:bg-yellow-100"
                      value={row.fPullStrength}
                      onChange={(e) => handleCellChange(rIdx, 'fPullStrength', e.target.value)}
                      placeholder="N"
                    />
                  </td>

                  {/* Quality & Output */}
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-emerald-600 font-extrabold p-0.5 text-center focus:bg-yellow-100"
                      value={row.numberOfOkProducts}
                      onChange={(e) => handleCellChange(rIdx, 'numberOfOkProducts', e.target.value)}
                      placeholder="Qty"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.visualStatusRSide}
                      onChange={(e) => handleCellChange(rIdx, 'visualStatusRSide', e.target.value)}
                      placeholder="OK"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.visualStatusFSide}
                      onChange={(e) => handleCellChange(rIdx, 'visualStatusFSide', e.target.value)}
                      placeholder="OK"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-red-600 font-bold p-0.5 text-center focus:bg-yellow-100"
                      value={row.defectQtyRSide}
                      onChange={(e) => handleCellChange(rIdx, 'defectQtyRSide', e.target.value)}
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-red-600 font-bold p-0.5 text-center focus:bg-yellow-100"
                      value={row.defectQtyFSide}
                      onChange={(e) => handleCellChange(rIdx, 'defectQtyFSide', e.target.value)}
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.qcInspectOrSign}
                      onChange={(e) => handleCellChange(rIdx, 'qcInspectOrSign', e.target.value)}
                      placeholder="Sign"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.verifiedByQcLeader}
                      onChange={(e) => handleCellChange(rIdx, 'verifiedByQcLeader', e.target.value)}
                      placeholder="Lead"
                    />
                  </td>
                  <td className="border border-black p-0.5">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent font-sans text-[10px] text-slate-800 p-0.5 text-center focus:bg-yellow-100"
                      value={row.sample}
                      onChange={(e) => handleCellChange(rIdx, 'sample', e.target.value)}
                      placeholder="Samp"
                    />
                  </td>
                  <td className="border border-black p-0.5 text-center">
                    <button
                      type="button"
                      className="bg-transparent border-none text-slate-400 hover:text-red-600 hover:bg-red-100 cursor-pointer p-1 rounded transition-all"
                      onClick={() => handleRemoveRow(rIdx)}
                      title="Delete row"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Document Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between p-1.5 px-3 bg-slate-50 border border-black text-[10px] text-slate-700">
          <span>Document Form: <strong className="text-slate-900">FRM-QC-PS-244</strong></span>
          <span>Revision: <strong className="text-slate-900">Rev 01.07.2024</strong></span>
          <span>Machine: <strong className="text-slate-900">{headerInfo.machineName} (Auto Crimping Station)</strong></span>
          <span>Department: <strong className="text-slate-900">Wire Harness / C&C Division</strong></span>
        </div>
      </div>
    </div>
  );
}
