import React, { useState, useEffect } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import {
  Save,
  RotateCcw,
  Printer,
  Plus,
  Trash2,
  Activity,
  Check,
  X,
  AlertTriangle,
  RotateCw,
  Circle
} from 'lucide-react';

const MONTHS = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

const INITIAL_CHECK_POINTS = [
  {
    id: 1,
    sNo: '1',
    checkPoint: 'There should be no abnormal sound',
    judgmentCriteria: 'No abnormal sound',
    checkingMethod: 'Hearing'
  },
  {
    id: 2,
    sNo: '2',
    checkPoint: 'Condition of Gripper jaw',
    judgmentCriteria: 'No damage & No wire slip',
    checkingMethod: 'Test & trial'
  },
  {
    id: 3,
    sNo: '3',
    checkPoint: 'There should be no loose wiring & dressing on machine',
    judgmentCriteria: 'Propper dressing of wire',
    checkingMethod: 'Visually'
  },
  { id: 4, sNo: '4', checkPoint: '', judgmentCriteria: '', checkingMethod: '' },
  { id: 5, sNo: '5', checkPoint: '', judgmentCriteria: '', checkingMethod: '' },
  { id: 6, sNo: '6', checkPoint: '', judgmentCriteria: '', checkingMethod: '' },
  { id: 7, sNo: '7', checkPoint: '', judgmentCriteria: '', checkingMethod: '' },
  { id: 8, sNo: '8', checkPoint: '', judgmentCriteria: '', checkingMethod: '' },
  { id: 9, sNo: '9', checkPoint: '', judgmentCriteria: '', checkingMethod: '' },
  { id: 10, sNo: '10', checkPoint: '', judgmentCriteria: '', checkingMethod: '' }
];

const SYMBOLS_CYCLE = ['', '✓', 'X', '△', 'X/', 'O'];

export default function PredictiveMaintainanceChecksheet({
  machine = { name: 'R/SW 01', model: 'Machine 1' },
  onClose
}) {
  const machineName = machine?.name || 'R/SW 01';
  const storageKey = `rw_predictive_${machineName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  // Header meta data
  const [docMeta, setDocMeta] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_meta`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      docNo: 'CHK-WH-MT-101',
      revNo: '00',
      date: '27.02.2019',
      machineName: 'Resistance welding',
      machineNumber: machineName,
      year: new Date().getFullYear().toString()
    };
  });

  // Check point rows
  const [checkPoints, setCheckPoints] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_items`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_CHECK_POINTS;
  });

  // Monthly values grid: { [rowId]: { [month]: '✓' | 'X' | '△' | 'X/' | 'O' } }
  const [gridData, setGridData] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_grid`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  // Monthly Date & Signatures
  const [footerData, setFooterData] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_footer`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const emptyFooter = {
      dates: {},
      technicians: {},
      engineers: {}
    };
    MONTHS.forEach((m) => {
      emptyFooter.dates[m] = '';
      emptyFooter.technicians[m] = '';
      emptyFooter.engineers[m] = '';
    });
    return emptyFooter;
  });

  const [activeSymbol, setActiveSymbol] = useState('✓');
  const [savedToast, setSavedToast] = useState('');

  // Persist automatically to localStorage
  useEffect(() => {
    localStorage.setItem(`${storageKey}_meta`, JSON.stringify(docMeta));
  }, [docMeta, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_items`, JSON.stringify(checkPoints));
  }, [checkPoints, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_grid`, JSON.stringify(gridData));
  }, [gridData, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_footer`, JSON.stringify(footerData));
  }, [footerData, storageKey]);

  // Cycle through symbols on cell click
  const handleCellClick = (rowId, month) => {
    setGridData((prev) => {
      const currentVal = prev[rowId]?.[month] || '';
      const nextIdx = (SYMBOLS_CYCLE.indexOf(currentVal) + 1) % SYMBOLS_CYCLE.length;
      const nextVal = SYMBOLS_CYCLE[nextIdx];
      return {
        ...prev,
        [rowId]: {
          ...(prev[rowId] || {}),
          [month]: nextVal
        }
      };
    });
  };

  // Stamp active symbol on click if shift/alt or right click or quick action
  const handleCellSetVal = (rowId, month, val) => {
    setGridData((prev) => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] || {}),
        [month]: val
      }
    }));
  };

  const handleFooterChange = (field, month, value) => {
    setFooterData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [month]: value
      }
    }));
  };

  const handleRowChange = (id, field, value) => {
    setCheckPoints((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    setCheckPoints((prev) => [
      ...prev,
      {
        id: Date.now(),
        sNo: (prev.length + 1).toString(),
        checkPoint: '',
        judgmentCriteria: '',
        checkingMethod: ''
      }
    ]);
  };

  const handleDeleteRow = (id) => {
    if (checkPoints.length <= 1) return;
    setCheckPoints((prev) => prev.filter((r) => r.id !== id));
    setGridData((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleSave = () => {
    localStorage.setItem(`${storageKey}_meta`, JSON.stringify(docMeta));
    localStorage.setItem(`${storageKey}_items`, JSON.stringify(checkPoints));
    localStorage.setItem(`${storageKey}_grid`, JSON.stringify(gridData));
    localStorage.setItem(`${storageKey}_footer`, JSON.stringify(footerData));
    setSavedToast('Checksheet saved successfully!');
    setTimeout(() => setSavedToast(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm(`Reset Predictive Maintenance values for ${machineName}?`)) {
      setGridData({});
      const emptyFooter = { dates: {}, technicians: {}, engineers: {} };
      MONTHS.forEach((m) => {
        emptyFooter.dates[m] = '';
        emptyFooter.technicians[m] = '';
        emptyFooter.engineers[m] = '';
      });
      setFooterData(emptyFooter);
      setCheckPoints(INITIAL_CHECK_POINTS);
      localStorage.removeItem(`${storageKey}_grid`);
      localStorage.removeItem(`${storageKey}_footer`);
      localStorage.removeItem(`${storageKey}_items`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getSymbolBadgeClass = (sym) => {
    switch (sym) {
      case '✓':
        return 'text-emerald-700 font-black text-sm';
      case 'X':
        return 'text-rose-700 font-black text-sm';
      case '△':
        return 'text-amber-600 font-black text-xs';
      case 'X/':
        return 'text-blue-700 font-black text-xs';
      case 'O':
        return 'text-indigo-700 font-black text-sm';
      default:
        return 'text-slate-800 font-bold';
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full min-h-[90vh] pb-10">
      {/* Standard Checksheet Header Bar */}
      <ChecksheetHeaderNav
        title={`Predictive Maintenance Checksheet — ${machineName}`}
        subtitle={`Process: Resistance Welding • Model: ${machine.model || 'Machine'} • CHK-WH-MT-101`}
        icon={Activity}
        iconBgClass="bg-teal-100 text-teal-700"
        onClose={onClose}
        onSave={handleSave}
        saveLabel="Save Sheet"
        onReset={handleReset}
        resetTitle="Reset Checksheet Values"
        savedToast={savedToast}
        extraActions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 transition-colors cursor-pointer shadow-xs"
              title="Print Checksheet"
            >
              <Printer size={15} />
              <span>Print</span>
            </button>
            
          </div>
        }
      />

      {/* Floating Notification Toast */}
      {savedToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg border border-emerald-500 flex items-center gap-2 animate-bounce">
          <Check size={16} />
          <span>{savedToast}</span>
        </div>
      )}

      {/* Quick Symbol Picker Bar (Sticky on Screen) */}
      <div className="flex flex-wrap items-center justify-between bg-white border border-slate-300 rounded-xl px-4 py-2.5 shadow-xs gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
            Quick Fill Symbol:
          </span>
          <span className="text-[11px] text-slate-500">
            (Click any cell to cycle, or pick a symbol below)
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { sym: '✓', label: 'OK/DONE', color: 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' },
            { sym: 'X', label: 'NOT OK', color: 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100' },
            { sym: '△', label: 'ATTENTION', color: 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100' },
            { sym: 'X/', label: 'RECTIFIED', color: 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100' },
            { sym: 'O', label: 'SPARE CHANGE', color: 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100' },
            { sym: '', label: 'CLEAR', color: 'bg-slate-50 text-slate-600 border-slate-300 hover:bg-slate-100' }
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveSymbol(item.sym)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-black border transition-all cursor-pointer ${item.color} ${
                activeSymbol === item.sym ? 'ring-2 ring-slate-800 scale-105 shadow-xs' : 'opacity-85'
              }`}
              title={`Select ${item.label}`}
            >
              <span className="font-black text-sm">{item.sym || '∅'}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={handleAddRow}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-teal-700 border border-teal-300 hover:bg-teal-100 ml-2 cursor-pointer transition-colors shadow-2xs"
            title="Add Checkpoint Row"
          >
            <Plus size={13} />
            <span>Add Row</span>
          </button>
        </div>
      </div>

      {/* Main Checksheet Document Container */}
      <div className="bg-white border-2 border-black rounded shadow-md overflow-hidden print:border-none print:shadow-none">
        {/* ROW 1: Company Title Bar (Light Green matching Excel screenshot) */}
        <div className="grid grid-cols-12 border-b border-black bg-[#d9ead3] text-black">
          <div className="col-span-10 sm:col-span-10 text-center py-1.5 px-2">
            <h1 className="text-sm sm:text-base font-black tracking-wider uppercase m-0 leading-tight">
              FURUKAWA MINDAELECTRIC PVT. LTD
            </h1>
          </div>
          <div className="col-span-2 sm:col-span-2 border-l border-black flex items-center justify-center px-1 py-1 text-[10px] sm:text-[11px] font-bold bg-white text-slate-900">
            <span>Doc No:-{docMeta.docNo}</span>
          </div>
        </div>

        {/* ROW 2: Document Name Banner (Yellow matching Excel screenshot) */}
        <div className="grid grid-cols-12 border-b border-black bg-[#fff2cc] text-black">
          <div className="col-span-10 sm:col-span-10 text-center py-1.5 px-2">
            <h2 className="text-xs sm:text-sm font-black tracking-widest uppercase m-0 leading-tight">
              PREDICTIVE MAINTENANCE C H E C K   S H E E T
            </h2>
          </div>
          <div className="col-span-2 sm:col-span-2 border-l border-black flex items-center justify-center px-1 py-1 text-[10px] sm:text-[11px] font-bold bg-white text-slate-900">
            <span>Rev:-{docMeta.revNo}</span>
          </div>
        </div>

        {/* ROW 3: Machine & Document Metadata Strip */}
        <div className="grid grid-cols-12 border-b-2 border-black bg-white text-black text-[11px] font-bold">
          {/* Machine Name */}
          <div className="col-span-4 sm:col-span-3 border-r border-black flex items-center px-2 py-1 gap-1">
            <span className="font-black text-slate-900">Machine Name:</span>
            <input
              type="text"
              value={docMeta.machineName}
              onChange={(e) => setDocMeta({ ...docMeta, machineName: e.target.value })}
              className="font-bold text-slate-800 bg-transparent outline-none flex-1 truncate"
            />
          </div>

          {/* Machine Number */}
          <div className="col-span-4 sm:col-span-3 border-r border-black flex items-center px-2 py-1 gap-1">
            <span className="font-black text-slate-900">Machine Number:</span>
            <input
              type="text"
              value={docMeta.machineNumber}
              onChange={(e) => setDocMeta({ ...docMeta, machineNumber: e.target.value })}
              className="font-bold text-slate-800 bg-transparent outline-none flex-1 truncate uppercase"
            />
          </div>

          {/* YEAR */}
          <div className="col-span-2 sm:col-span-3 border-r border-black flex items-center px-2 py-1 gap-1 justify-center">
            <span className="font-black text-slate-900">YEAR:</span>
            <input
              type="text"
              value={docMeta.year}
              onChange={(e) => setDocMeta({ ...docMeta, year: e.target.value })}
              className="font-bold text-slate-800 bg-transparent outline-none w-16 text-center"
            />
          </div>

          {/* Date */}
          <div className="col-span-2 sm:col-span-3 flex items-center justify-center px-2 py-1 text-[10px] sm:text-[11px] font-bold">
            <span className="font-black text-slate-900 mr-1">Date:-</span>
            <input
              type="text"
              value={docMeta.date}
              onChange={(e) => setDocMeta({ ...docMeta, date: e.target.value })}
              className="font-bold text-slate-800 bg-transparent outline-none w-24 text-center"
            />
          </div>
        </div>

        {/* Master Table */}
        <div className="w-full overflow-x-auto">
          <table
            className="w-full border-collapse text-[10.5px] min-w-[1000px]"
            style={{ tableLayout: 'fixed' }}
          >
            <colgroup>
              <col style={{ width: '42px' }} />
              <col style={{ width: '220px' }} />
              <col style={{ width: '200px' }} />
              <col style={{ width: '130px' }} />
              {MONTHS.map((m) => (
                <col key={m} style={{ width: '46px' }} />
              ))}
              <col style={{ width: '30px' }} className="print:hidden" />
            </colgroup>

            <thead>
              <tr className="bg-white text-black h-8">
                <th className="border border-black font-black text-center p-1 text-[10px]">
                  S.No
                </th>
                <th className="border border-black font-black text-center p-1 text-[10.5px] uppercase">
                  CHECK POINT
                </th>
                <th className="border border-black font-black text-center p-1 text-[10.5px] uppercase">
                  JUGDEMANT CRITIERA
                </th>
                <th className="border border-black font-black text-center p-1 text-[10px] uppercase">
                  CHECKING METHOD
                </th>
                {MONTHS.map((m) => (
                  <th
                    key={m}
                    className="border border-black font-black text-center p-1 text-[10px]"
                  >
                    {m}
                  </th>
                ))}
                <th className="border border-black font-black text-center p-1 text-[9px] print:hidden">
                  Act
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Check Point Rows */}
              {checkPoints.map((row) => (
                <tr key={row.id} className="h-7 hover:bg-slate-50/70 transition-colors">
                  {/* S.No */}
                  <td className="border border-black text-center font-black p-0 text-[10px]">
                    <input
                      type="text"
                      value={row.sNo}
                      onChange={(e) => handleRowChange(row.id, 'sNo', e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none font-black text-[10px]"
                    />
                  </td>

                  {/* CHECK POINT */}
                  <td className="border border-black text-left px-1.5 py-0.5 font-bold leading-tight">
                    <input
                      type="text"
                      value={row.checkPoint}
                      placeholder="Enter check point..."
                      onChange={(e) => handleRowChange(row.id, 'checkPoint', e.target.value)}
                      className="w-full h-full bg-transparent border-0 outline-none font-bold text-[10.5px] text-slate-900 placeholder:text-slate-300 placeholder:italic"
                    />
                  </td>

                  {/* JUGDEMANT CRITIERA */}
                  <td className="border border-black text-left px-1.5 py-0.5 font-bold leading-tight">
                    <input
                      type="text"
                      value={row.judgmentCriteria}
                      placeholder="Enter criteria..."
                      onChange={(e) =>
                        handleRowChange(row.id, 'judgmentCriteria', e.target.value)
                      }
                      className="w-full h-full bg-transparent border-0 outline-none font-bold text-[10.5px] text-slate-800 placeholder:text-slate-300 placeholder:italic"
                    />
                  </td>

                  {/* CHECKING METHOD */}
                  <td className="border border-black text-center px-1 py-0.5 font-bold">
                    <input
                      type="text"
                      value={row.checkingMethod}
                      placeholder="Method..."
                      onChange={(e) =>
                        handleRowChange(row.id, 'checkingMethod', e.target.value)
                      }
                      className="w-full h-full text-center bg-transparent border-0 outline-none font-bold text-[10.5px] text-slate-800 placeholder:text-slate-300 placeholder:italic"
                    />
                  </td>

                  {/* 12 Month Cells */}
                  {MONTHS.map((m) => {
                    const val = gridData[row.id]?.[m] || '';
                    return (
                      <td
                        key={m}
                        className="border border-black text-center p-0 relative cursor-pointer select-none bg-white hover:bg-teal-50/50 transition-colors"
                        onClick={() => handleCellClick(row.id, m)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          handleCellSetVal(row.id, m, activeSymbol);
                        }}
                        title={`Month: ${m} | Double click or click to cycle | Right-click to stamp active symbol (${activeSymbol || 'CLEAR'})`}
                      >
                        <div className="w-full h-full min-h-[28px] flex items-center justify-center">
                          <span className={getSymbolBadgeClass(val)}>
                            {val}
                          </span>
                        </div>
                      </td>
                    );
                  })}

                  {/* Action Column (Delete Row) */}
                  <td className="border border-black text-center p-0 print:hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(row.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Delete this row"
                    >
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Sub-Rows: Date, Sig. Technician, Sig. Engineer */}
              {/* DATE ROW */}
              <tr className="h-7 bg-white">
                <td
                  colSpan={4}
                  className="border border-black text-right font-black px-3 text-[11px] text-slate-900 uppercase tracking-tight"
                >
                  Date
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0 text-center">
                    <input
                      type="text"
                      value={footerData.dates[m] || ''}
                      placeholder="DD/MM"
                      onChange={(e) => handleFooterChange('dates', m, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[9px] font-bold text-slate-800 placeholder:text-slate-300"
                    />
                  </td>
                ))}
                <td className="border border-black print:hidden bg-slate-50"></td>
              </tr>

              {/* SIG. TECHNICIAN ROW */}
              <tr className="h-7 bg-white">
                <td
                  colSpan={4}
                  className="border border-black text-right font-black px-3 text-[11px] text-slate-900 uppercase tracking-tight"
                >
                  Sig. Technician
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0 text-center">
                    <input
                      type="text"
                      value={footerData.technicians[m] || ''}
                      placeholder="Sign"
                      onChange={(e) => handleFooterChange('technicians', m, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[9px] font-bold text-slate-800 placeholder:text-slate-300"
                    />
                  </td>
                ))}
                <td className="border border-black print:hidden bg-slate-50"></td>
              </tr>

              {/* SIG. ENGINEER ROW */}
              <tr className="h-7 bg-white">
                <td
                  colSpan={4}
                  className="border border-black text-right font-black px-3 text-[11px] text-slate-900 uppercase tracking-tight"
                >
                  Sig. Engineer
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0 text-center">
                    <input
                      type="text"
                      value={footerData.engineers[m] || ''}
                      placeholder="Sign"
                      onChange={(e) => handleFooterChange('engineers', m, e.target.value)}
                      className="w-full h-full text-center bg-transparent border-0 outline-none text-[9px] font-bold text-slate-800 placeholder:text-slate-300"
                    />
                  </td>
                ))}
                <td className="border border-black print:hidden bg-slate-50"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* BOTTOM FOOTER / LEGEND (Exact match to Screenshot 2) */}
        <div className="border-t-2 border-black bg-white flex flex-col sm:flex-row">
          {/* LEGEND Label Box */}
          <div className="w-full sm:w-24 border-b sm:border-b-0 sm:border-r border-black flex items-center justify-center p-2 bg-slate-50">
            <span className="text-xs font-black tracking-wider text-black uppercase">
              LEGEND
            </span>
          </div>

          {/* Symbol Items Strip */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 border-b sm:border-b-0 divide-x divide-black text-[10.5px]">
            {/* Symbol 1: NOT OK */}
            <div className="flex flex-col items-center justify-center py-2 px-1 text-center">
              <span className="text-base font-black text-black leading-none mb-1">X</span>
              <span className="text-[9.5px] font-black text-black uppercase tracking-tight">
                NOT OK
              </span>
            </div>

            {/* Symbol 2: OK/DONE */}
            <div className="flex flex-col items-center justify-center py-2 px-1 text-center">
              <span className="text-base font-black text-black leading-none mb-1">✓</span>
              <span className="text-[9.5px] font-black text-black uppercase tracking-tight">
                OK/DONE
              </span>
            </div>

            {/* Symbol 3: ATTENTION */}
            <div className="flex flex-col items-center justify-center py-2 px-1 text-center">
              <span className="text-base font-black text-black leading-none mb-1">△</span>
              <span className="text-[9.5px] font-black text-black uppercase tracking-tight">
                ATTENTION
              </span>
            </div>

            {/* Symbol 4: RECTIFIED */}
            <div className="flex flex-col items-center justify-center py-2 px-1 text-center">
              <span className="text-base font-black text-black leading-none mb-1">X /</span>
              <span className="text-[9.5px] font-black text-black uppercase tracking-tight">
                RECTIFIED
              </span>
            </div>

            {/* Symbol 5: SPARE CHANGE */}
            <div className="flex flex-col items-center justify-center py-2 px-1 text-center">
              <span className="text-sm font-black text-black leading-none mb-1">
                <svg width="22" height="12" viewBox="0 0 24 12" fill="none" className="inline-block">
                  <ellipse cx="12" cy="6" rx="10" ry="5" stroke="#000000" strokeWidth="2" fill="none" />
                </svg>
              </span>
              <span className="text-[9.5px] font-black text-black uppercase tracking-tight">
                SPARE CHANGE
              </span>
            </div>
          </div>

          {/* Notes / Lines Section on Right matching Excel lines in screenshot */}
          <div className="w-full sm:w-48 p-2 flex flex-col justify-around gap-1.5 border-t sm:border-t-0 sm:border-l border-black bg-white">
            <div className="w-full h-0.5 bg-slate-400"></div>
            <div className="w-full h-0.5 bg-slate-400"></div>
            <div className="w-full h-0.5 bg-slate-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}