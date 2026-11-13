import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import { Wrench, Printer, Plus, Check, RotateCcw } from 'lucide-react';

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

export const INITIAL_JCR_PM_POINTS = [
  {
    id: 1,
    sNo: '4',
    checkPoint: 'There should be no loose wiring & dressing on machine',
    criteria: 'Propper dressing of wire',
    method: 'Visually'
  },
  {
    id: 2,
    sNo: '',
    checkPoint: '',
    criteria: '',
    method: ''
  },
  {
    id: 3,
    sNo: '',
    checkPoint: '',
    criteria: '',
    method: ''
  },
  {
    id: 4,
    sNo: '',
    checkPoint: '',
    criteria: '',
    method: ''
  },
  {
    id: 5,
    sNo: '',
    checkPoint: '',
    criteria: '',
    method: ''
  },
  {
    id: 6,
    sNo: '',
    checkPoint: '',
    criteria: '',
    method: ''
  }
];

const LEGEND_ITEMS = [
  { symbol: 'X', label: 'NOT OK' },
  { symbol: '✓', label: 'OK/DONE' },
  { symbol: '△', label: 'ATTENTION' },
  { symbol: '✕', label: 'RECTIFIED' },
  { symbol: '⬭', label: 'SPARE CHANGE' }
];

export default function JcrMachinePm({ machine, onClose }) {
  const machineName = machine?.name || 'JCR 01';
  const modelName = machine?.model || 'JCR-01';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `jcr_pm_${machineName}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      companyName: 'FURUKAWA MINDAELECTRIC PVT. LTD',
      docNo: '-CHK-WH-MT-026',
      rev: '-00',
      date: '-27.02.2019',
      machineName: machineName || 'JCR 01',
      machineNumber: modelName || 'JCR-01',
      year: new Date().getFullYear().toString(),
      remarks: ''
    };
  });

  const [checkPoints, setCheckPoints] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_points`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_JCR_PM_POINTS;
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
    const symbols = ['', '✓', 'X', '△', '✕', '⬭'];
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
        sNo: String(nextSNo),
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
      setSavedToast('JCR PM Checksheet saved successfully!');
      setTimeout(() => setSavedToast(''), 3000);
    } catch (e) {
      setSavedToast('Error saving data.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all values on this JCR PM Checksheet?')) {
      setGridValues({});
      setFooterValues({});
      setCheckPoints(INITIAL_JCR_PM_POINTS);
      try {
        localStorage.removeItem(`${storageKey}_grid`);
        localStorage.removeItem(`${storageKey}_footer`);
        localStorage.removeItem(`${storageKey}_points`);
      } catch (e) {
        // ignore
      }
      setSavedToast('Checksheet reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Top Header Navigation */}
      <ChecksheetHeaderNav
        title="MACHINE PM CHECKSHEET"
        subtitle={`${displayMachine} — PREDICTIVE MAINTENANCE CHECK SHEET (CHK-WH-MT-026)`}
        icon={Wrench}
        iconBgClass="bg-purple-100 text-purple-800"
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

      {/* Main Sheet Container */}
      <div className="bg-white border-2 border-black p-2 md:p-3 shadow-md rounded-sm overflow-x-auto">
        <div className="min-w-[1240px] w-full text-black select-text">
          <table className="w-full border-collapse border-2 border-black text-xs">
            <thead>
              {/* Row 1: Company Header (Green) & Document Box */}
              <tr className="border-b-2 border-black" style={{ backgroundColor: '#ebf1de' }}>
                <th
                  colSpan={4}
                  className="border-r-2 border-black py-2 px-4 text-center font-black text-sm tracking-widest uppercase text-black"
                >
                  {headerInfo.companyName}
                </th>
                <th
                  colSpan={12}
                  className="py-1 px-3 text-right text-[11px] font-bold text-black"
                >
                  <div className="flex flex-col items-end gap-0.5 leading-tight text-[11px] font-bold">
                    <div className="flex items-center gap-1">
                      <span>Doc No :</span>
                      <input
                        type="text"
                        value={headerInfo.docNo}
                        onChange={(e) => handleHeaderChange('docNo', e.target.value)}
                        className="bg-transparent border-0 outline-none w-36 font-bold text-right"
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

              {/* Row 2: Yellow Banner Title */}
              <tr className="border-b-2 border-black" style={{ backgroundColor: '#ffff00' }}>
                <th
                  colSpan={16}
                  className="py-1.5 px-2 text-center font-black text-xs tracking-widest uppercase text-black font-sans"
                >
                  PREDICTIVE MAINTENANCE CHECK SHEET
                </th>
              </tr>

              {/* Row 3: Meta Info (Machine Name, Machine Number, YEAR) */}
              <tr className="border-b-2 border-black text-[11px] font-bold bg-white">
                <td className="border-r border-black p-1 w-12 text-center"></td>
                <td className="border-r border-black p-1.5 w-72">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap font-black">Machine Name :</span>
                    <input
                      type="text"
                      value={headerInfo.machineName}
                      onChange={(e) => handleHeaderChange('machineName', e.target.value)}
                      className="font-bold outline-none border-0 bg-transparent flex-1"
                    />
                  </div>
                </td>
                <td colSpan={2} className="border-r-2 border-black p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap font-black">Machine Number :</span>
                    <input
                      type="text"
                      value={headerInfo.machineNumber}
                      onChange={(e) => handleHeaderChange('machineNumber', e.target.value)}
                      className="outline-none border-0 bg-transparent font-bold flex-1"
                    />
                  </div>
                </td>
                <td colSpan={12} className="p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap font-black">YEAR :</span>
                    <input
                      type="text"
                      value={headerInfo.year}
                      onChange={(e) => handleHeaderChange('year', e.target.value)}
                      className="outline-none border-0 bg-transparent font-bold w-24"
                    />
                  </div>
                </td>
              </tr>

              {/* Row 4: Column Headers */}
              <tr className="border-b-2 border-black text-center text-[11px] font-bold bg-white">
                <th className="border-r border-black p-1.5 w-12 font-black">S.No</th>
                <th className="border-r border-black p-1.5 w-72 text-center font-black">CHECK POINT</th>
                <th className="border-r border-black p-1.5 w-64 text-center font-black">JUGDEMANT CRITIERA</th>
                <th className="border-r-2 border-black p-1.5 w-44 text-center font-black">CHECKING METHOD</th>
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
                <tr key={pt.id} className="border-b border-black hover:bg-slate-50/50 transition-colors h-10 group">
                  <td className="border-r border-black p-1 text-center font-bold text-xs align-middle">
                    <input
                      type="text"
                      value={pt.sNo || ''}
                      onChange={(e) => handlePointChange(pt.id, 'sNo', e.target.value)}
                      className="w-full text-center border-0 outline-none bg-transparent font-bold"
                    />
                  </td>
                  <td className="border-r border-black p-1.5 text-left align-middle text-[11px]">
                    <textarea
                      rows={2}
                      value={pt.checkPoint}
                      onChange={(e) => handlePointChange(pt.id, 'checkPoint', e.target.value)}
                      placeholder=""
                      className="w-full resize-none border-0 outline-none bg-transparent font-semibold text-black leading-tight"
                    />
                  </td>
                  <td className="border-r border-black p-1.5 text-left align-middle text-[11px]">
                    <textarea
                      rows={2}
                      value={pt.criteria}
                      onChange={(e) => handlePointChange(pt.id, 'criteria', e.target.value)}
                      placeholder=""
                      className="w-full resize-none border-0 outline-none bg-transparent text-slate-800 leading-tight"
                    />
                  </td>
                  <td className="border-r-2 border-black p-1.5 text-center align-middle text-[11px]">
                    <input
                      type="text"
                      value={pt.method}
                      onChange={(e) => handlePointChange(pt.id, 'method', e.target.value)}
                      placeholder=""
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
                        className={`border-r border-black p-0 text-center align-middle h-[36px] cursor-pointer select-none transition-colors ${isNotOk
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

              {/* Date Row */}
              <tr className="border-b border-black">
                <td colSpan={4} className="border-r-2 border-black p-1.5 text-right font-bold text-xs pr-4">
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
                      placeholder=""
                      className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                    />
                  </td>
                ))}
              </tr>

              {/* Sig. Technician Row */}
              <tr className="border-b border-black">
                <td colSpan={4} className="border-r-2 border-black p-1.5 text-right font-bold text-xs pr-4">
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
                      placeholder=""
                      className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                    />
                  </td>
                ))}
              </tr>

              {/* Sig. Engineer Row */}
              <tr className="border-b-2 border-black">
                <td colSpan={4} className="border-r-2 border-black p-1.5 text-right font-bold text-xs pr-4">
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
                      placeholder=""
                      className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                    />
                  </td>
                ))}
              </tr>

              {/* Legend Box Row */}
              <tr className="border-b-2 border-black bg-white">
                <td colSpan={4} className="border-r-2 border-black p-0 align-middle">
                  <div className="grid grid-cols-6 divide-x divide-black h-full text-center text-xs">
                    <div className="p-2 flex items-center justify-center font-black uppercase text-[10.5px]">
                      LEGEND
                    </div>
                    {LEGEND_ITEMS.map((item) => (
                      <div key={item.label} className="p-1 flex flex-col items-center justify-center">
                        <span className="text-base font-black leading-none">{item.symbol}</span>
                        <span className="text-[9px] font-bold text-slate-800 leading-tight mt-1">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </td>
                {/* 12 Months: 3 empty horizontal line slots as in the screenshot */}
                <td colSpan={12} className="p-0">
                  <div className="flex flex-col divide-y divide-black h-full">
                    <div className="h-[14px]"></div>
                    <div className="h-[14px]"></div>
                    <div className="h-[14px]"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Bottom Blank Remarks/Notes Box */}
          <div className="border-2 border-black border-t-0 p-3 bg-white min-h-[70px]">
            <textarea
              value={headerInfo.remarks || ''}
              onChange={(e) => handleHeaderChange('remarks', e.target.value)}
              placeholder="Remarks / Notes..."
              className="w-full h-14 resize-none border-0 outline-none bg-transparent text-xs font-medium text-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

