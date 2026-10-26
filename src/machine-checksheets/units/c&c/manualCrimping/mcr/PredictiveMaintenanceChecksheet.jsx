import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import { Activity, Printer, Save, RotateCcw, Check, Plus, Trash2 } from 'lucide-react';

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
    sNo: 1,
    checkPoint: 'Safety Tool operation and interlocking',
    criteria: 'Machine will not operate when safety tool is remove',
    method: 'Test & Trial'
  },
  {
    id: 2,
    sNo: 2,
    checkPoint: 'There should be no abnormal sound',
    criteria: 'No abnormal sound',
    method: 'Hearing'
  },
  {
    id: 3,
    sNo: 3,
    checkPoint: 'Condition of Base plate',
    criteria: 'No wear and tear',
    method: 'Visually'
  },
  {
    id: 4,
    sNo: 4,
    checkPoint: 'There should be no loose wiring & dressing on machine',
    criteria: 'Propper dressing of wire',
    method: 'Visually'
  },
  {
    id: 5,
    sNo: 5,
    checkPoint: '',
    criteria: '',
    method: ''
  },
  {
    id: 6,
    sNo: 6,
    checkPoint: '',
    criteria: '',
    method: ''
  }
];

const LEGEND_ITEMS = [
  { symbol: 'X', label: 'NOT OK' },
  { symbol: '✓', label: 'OK/DONE' },
  { symbol: '△', label: 'ATTENTION' },
  { symbol: '⋈', label: 'RECTIFIED' },
  { symbol: '⬭', label: 'SPARE CHANGE' }
];

export default function PredictiveMaintenanceChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'MCR';
  const modelName = machine?.model || 'Mecal-05';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `mcr_predictive_${machineName}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      docNo: '-CHK-WH-MT-026',
      rev: '-00',
      date: '-27.02.2019',
      machineName: 'Semi Auto Crimping Machine',
      machineNumber: machineName || 'MCR-01',
      year: new Date().getFullYear().toString()
    };
  });

  const [checkPoints, setCheckPoints] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_points`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_CHECK_POINTS;
  });

  const [gridValues, setGridValues] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_grid`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {};
  });

  const [footerValues, setFooterValues] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_footer`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {};
  });

  const [savedToast, setSavedToast] = useState('');
  const [selectedToolSymbol, setSelectedToolSymbol] = useState('✓');

  const handleHeaderChange = (key, val) => {
    setHeaderInfo((prev) => ({ ...prev, [key]: val }));
  };

  const handleCellChange = (rowId, month, val) => {
    setGridValues((prev) => ({
      ...prev,
      [`${rowId}_${month}`]: val
    }));
  };

  const cycleCellValue = (rowId, month) => {
    const symbols = ['', '✓', 'X', '△', '⋈', '⬭'];
    const current = gridValues[`${rowId}_${month}`] || '';
    const currentIndex = symbols.indexOf(current);
    const next = currentIndex === -1 ? '✓' : symbols[(currentIndex + 1) % symbols.length];
    handleCellChange(rowId, month, next);
  };

  const handleFooterChange = (fieldKey, month, val) => {
    setFooterValues((prev) => ({
      ...prev,
      [`${fieldKey}_${month}`]: val
    }));
  };

  const handlePointChange = (id, field, val) => {
    setCheckPoints((prev) =>
      prev.map((pt) => (pt.id === id ? { ...pt, [field]: val } : pt))
    );
  };

  const handleAddPoint = () => {
    const nextSNo = checkPoints.length + 1;
    setCheckPoints((prev) => [
      ...prev,
      {
        id: Date.now(),
        sNo: nextSNo,
        checkPoint: '',
        criteria: '',
        method: ''
      }
    ]);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_header`, JSON.stringify(headerInfo));
      localStorage.setItem(`${storageKey}_points`, JSON.stringify(checkPoints));
      localStorage.setItem(`${storageKey}_grid`, JSON.stringify(gridValues));
      localStorage.setItem(`${storageKey}_footer`, JSON.stringify(footerValues));
      setSavedToast('Predictive Maintenance Checksheet saved successfully!');
      setTimeout(() => setSavedToast(''), 3000);
    } catch (e) {
      setSavedToast('Error saving data to local storage.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all values on this Predictive Maintenance Checksheet?')) {
      setGridValues({});
      setFooterValues({});
      try {
        localStorage.removeItem(`${storageKey}_grid`);
        localStorage.removeItem(`${storageKey}_footer`);
      } catch (e) {
        // ignore
      }
      setSavedToast('Checksheet records reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Header Navigation without switcher */}
      <ChecksheetHeaderNav
        title="PREDICTIVE MAINTENANCE CHECK SHEET"
        subtitle={`${displayMachine} — Periodic Predictive Check Sheet`}
        icon={Activity}
        iconBgClass="bg-teal-100 text-teal-800"
        onClose={onClose}
        onReset={handleReset}
        onSave={handleSave}
        savedToast={savedToast}
        showSwitcher={false}
        extraActions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shadow-sm"
              onClick={() => window.print()}
              title="Print Checksheet"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

          </div>
        }
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

      {/* Main Table Container */}
      <div className="bg-white border-2 border-black p-2 md:p-3 shadow-md rounded-sm overflow-x-auto">
        <div className="min-w-[1240px] w-full text-black select-text">
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              {/* Row 1: Company Header & Document Box */}
              <tr className="border-b border-black">
                <th
                  colSpan={4}
                  className="border-r border-black py-2 px-4 text-center font-black text-sm tracking-widest uppercase"
                  style={{ backgroundColor: '#c8e6c9' }}
                >
                  FURUKAWA MINDAELECTRIC PVT. LTD
                </th>
                <th
                  colSpan={12}
                  className="py-1 px-3 text-right text-[11px] font-bold"
                  style={{ backgroundColor: '#c8e6c9' }}
                >
                  <div className="flex flex-col items-end gap-0.5 leading-tight text-[11px] font-bold">
                    <div className="flex items-center gap-1">
                      <span>Doc No :</span>
                      <input
                        type="text"
                        value={headerInfo.docNo}
                        onChange={(e) => handleHeaderChange('docNo', e.target.value)}
                        className="bg-transparent border-0 outline-none w-32 font-bold text-right"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Rev :</span>
                      <input
                        type="text"
                        value={headerInfo.rev}
                        onChange={(e) => handleHeaderChange('rev', e.target.value)}
                        className="bg-transparent border-0 outline-none w-16 font-bold text-right"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Date :</span>
                      <input
                        type="text"
                        value={headerInfo.date}
                        onChange={(e) => handleHeaderChange('date', e.target.value)}
                        className="bg-transparent border-0 outline-none w-24 font-bold text-right"
                      />
                    </div>
                  </div>
                </th>
              </tr>

              {/* Row 2: Sub-banner Title */}
              <tr className="border-b border-black" style={{ backgroundColor: '#fff2b2' }}>
                <th
                  colSpan={16}
                  className="py-1.5 px-2 text-center font-black text-xs tracking-wider uppercase text-black"
                >
                  PREDICTIVE MAINTENANCE CHECK SHEET
                </th>
              </tr>

              {/* Row 3: Meta Info */}
              <tr className="border-b border-black text-[11px] font-bold bg-white">
                <td colSpan={2} className="border-r border-black p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Machine Name :</span>
                    <input
                      type="text"
                      value={headerInfo.machineName}
                      onChange={(e) => handleHeaderChange('machineName', e.target.value)}
                      className="font-bold outline-none border-0 bg-transparent flex-1"
                    />
                  </div>
                </td>
                <td colSpan={2} className="border-r border-black p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Machine Number :</span>
                    <input
                      type="text"
                      value={headerInfo.machineNumber}
                      onChange={(e) => handleHeaderChange('machineNumber', e.target.value)}
                      className="outline-none border-0 bg-transparent font-semibold flex-1"
                    />
                  </div>
                </td>
                <td colSpan={12} className="p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">YEAR :</span>
                    <input
                      type="text"
                      value={headerInfo.year}
                      onChange={(e) => handleHeaderChange('year', e.target.value)}
                      className="outline-none border-0 bg-transparent font-semibold w-24"
                    />
                  </div>
                </td>
              </tr>

              {/* Row 4: Table Column Headers */}
              <tr className="border-b border-black text-center text-[11px] font-bold bg-slate-100">
                <th className="border-r border-black p-1.5 w-12 min-w-[45px]">S.No</th>
                <th className="border-r border-black p-1.5 w-72 min-w-[260px] text-center">CHECK POINT</th>
                <th className="border-r border-black p-1.5 w-72 min-w-[260px] text-center">JUGDEMANT CRITIERA</th>
                <th className="border-r border-black p-1.5 w-44 min-w-[160px] text-center">CHECKING METHOD</th>
                {MONTHS.map((m) => (
                  <th
                    key={m}
                    className="border-r border-black p-1 font-black text-center"
                    style={{ width: '48px', minWidth: '48px', maxWidth: '48px' }}
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Check Point Rows */}
              {checkPoints.map((pt, idx) => (
                <tr key={pt.id} className="border-b border-black hover:bg-slate-50/50 transition-colors">
                  <td className="border-r border-black p-1 text-center font-bold text-xs align-middle">
                    {pt.sNo || idx + 1}
                  </td>
                  <td className="border-r border-black p-1.5 text-left align-middle text-[11px]">
                    <textarea
                      rows={2}
                      value={pt.checkPoint}
                      onChange={(e) => handlePointChange(pt.id, 'checkPoint', e.target.value)}
                      placeholder="Check point description..."
                      className="w-full resize-none border-0 outline-none bg-transparent font-semibold text-black leading-tight"
                    />
                  </td>
                  <td className="border-r border-black p-1.5 text-left align-middle text-[11px]">
                    <textarea
                      rows={2}
                      value={pt.criteria}
                      onChange={(e) => handlePointChange(pt.id, 'criteria', e.target.value)}
                      placeholder="Judgment criteria..."
                      className="w-full resize-none border-0 outline-none bg-transparent text-slate-800 leading-tight"
                    />
                  </td>
                  <td className="border-r border-black p-1.5 text-center align-middle text-[11px]">
                    <input
                      type="text"
                      value={pt.method}
                      onChange={(e) => handlePointChange(pt.id, 'method', e.target.value)}
                      placeholder="Method..."
                      className="w-full text-center border-0 outline-none bg-transparent font-medium"
                    />
                  </td>

                  {/* 12 Months Cells */}
                  {MONTHS.map((m) => {
                    const val = gridValues[`${pt.id}_${m}`] || '';
                    const isNotOk = val === 'X';
                    return (
                      <td
                        key={m}
                        onClick={() => cycleCellValue(pt.id, m)}
                        className={`border-r border-black p-0 text-center align-middle h-[34px] cursor-pointer select-none transition-colors ${isNotOk
                          ? 'bg-rose-100 text-rose-800 font-black'
                          : val === '✓'
                            ? 'bg-emerald-50/70 text-emerald-800 font-black'
                            : 'hover:bg-amber-50/60'
                          }`}
                        style={{ width: '48px', minWidth: '48px', maxWidth: '48px' }}
                        title={`${pt.checkPoint || 'Item'} — ${m}: click to cycle symbol or edit`}
                      >
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleCellChange(pt.id, m, e.target.value)}
                          className="w-full h-full text-center font-black text-xs border-0 outline-none bg-transparent"
                          maxLength={4}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Footer Rows: Date */}
              <tr className="border-b border-black">
                <td colSpan={4} className="border-r border-black p-1.5 text-right font-bold text-xs">
                  Date
                </td>
                {MONTHS.map((m) => (
                  <td
                    key={m}
                    className="border-r border-black p-0 h-[28px] text-center"
                    style={{ width: '48px', minWidth: '48px', maxWidth: '48px' }}
                  >
                    <input
                      type="text"
                      value={footerValues[`date_${m}`] || ''}
                      onChange={(e) => handleFooterChange('date', m, e.target.value)}
                      placeholder="DD/MM"
                      className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                    />
                  </td>
                ))}
              </tr>

              {/* Footer Rows: Sig. Technician */}
              <tr className="border-b border-black">
                <td colSpan={4} className="border-r border-black p-1.5 text-right font-bold text-xs">
                  Sig. Technician
                </td>
                {MONTHS.map((m) => (
                  <td
                    key={m}
                    className="border-r border-black p-0 h-[28px] text-center"
                    style={{ width: '48px', minWidth: '48px', maxWidth: '48px' }}
                  >
                    <input
                      type="text"
                      value={footerValues[`sig_tech_${m}`] || ''}
                      onChange={(e) => handleFooterChange('sig_tech', m, e.target.value)}
                      placeholder="Sign"
                      className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                    />
                  </td>
                ))}
              </tr>

              {/* Footer Rows: Sig. Engineer */}
              <tr className="border-b border-black">
                <td colSpan={4} className="border-r border-black p-1.5 text-right font-bold text-xs">
                  Sig. Engineer
                </td>
                {MONTHS.map((m) => (
                  <td
                    key={m}
                    className="border-r border-black p-0 h-[28px] text-center"
                    style={{ width: '48px', minWidth: '48px', maxWidth: '48px' }}
                  >
                    <input
                      type="text"
                      value={footerValues[`sig_eng_${m}`] || ''}
                      onChange={(e) => handleFooterChange('sig_eng', m, e.target.value)}
                      placeholder="Sign"
                      className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                    />
                  </td>
                ))}
              </tr>

              {/* Legend Box */}
              <tr className="border-b border-black bg-white">
                <td colSpan={4} className="border-r border-black p-2 align-middle">
                  <div className="flex items-center justify-around text-xs font-black">
                    <span className="uppercase tracking-wider">LEGEND</span>
                    {LEGEND_ITEMS.map((item) => (
                      <div key={item.symbol} className="flex items-center gap-1">
                        <span className="text-sm font-black">{item.symbol}</span>
                        <span className="text-[10px] font-bold text-slate-800">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border-r border-black p-0 bg-slate-50"></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
