import React, { useState, useEffect } from 'react';
import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import { Wrench, Printer, RotateCcw, Save, Check } from 'lucide-react';

const LEGEND_SYMBOLS = [
  { symbol: '✓', label: 'OK/DONE' },
  { symbol: 'X', label: 'NOT OK' },
  { symbol: '△', label: 'ATTENTION' },
  { symbol: '⋈', label: 'RECTIFIED' },
  { symbol: '⬭', label: 'SPARE CHANGE' }
];

const PM_DATA = [
  {
    section: null,
    items: [
      {
        id: 1,
        point: 'Check for loose part if any tighten them. ( Loose part check djsa ;fn dksh7 loose part gSa rks mls tight djsaA ½',
        judgement: 'Should be tight',
        method: 'By Tool'
      },
      {
        id: 2,
        point: 'Check for worn out screws , replacem them. ( psau upsa dh screws MseSt u gks ;fn gSa rks mls change djsaA)',
        judgement: 'Should be not worn out screws',
        method: 'Visully'
      },
      {
        id: 3,
        point: 'Check the applicator bush plate lock ( applicator bush plate lock dks check djsa',
        judgement: 'Should be locked',
        method: 'Visully'
      },
      {
        id: 4,
        point: 'Check for the foot switch normaly fauction ( check djsa foot switch lgh rjg ls dk;Z dj jgk gSa ;k ugh%',
        judgement: 'Should be Working condition ok',
        method: 'By foot'
      },
      {
        id: 5,
        point: 'Check the wear &tear of guides ,slide plain bearings. ¼psd djsa dhAxkbM] lkybM lysu fo;fjx]fo;fjxl br;kfn [kfrxzLr ugksaA½',
        judgement: 'Should be ok Condition',
        method: 'By hearing'
      },
      {
        id: 6,
        point: 'Check the printed circuit board of the press whether it is ok or damaged ( psd djsa dh press dk printed circuit board ok gSa ;k MSeStA',
        judgement: 'Should be no damage',
        method: 'Visully'
      },
      {
        id: 7,
        point: 'Check the emergency switch working (check djsa amarwgncy switch dks dk;Z dj jgkSa ;k ughA',
        judgement: 'Should be Working condtion ok',
        method: 'BY hand'
      },
      {
        id: 8,
        point: 'Check the push start button ( push start button dks check djsuA½',
        judgement: 'Should be ok Condition',
        method: 'BY hand'
      },
      {
        id: 9,
        point: 'Check the working condition of piezo sensor',
        judgement: 'If wire combition change, Should be detect by CFM',
        method: 'Test and trial'
      }
    ]
  },
  {
    section: "Setting's & Adjustments",
    items: [
      {
        id: 10,
        point: "Check the shut height and adjusted if required ( shut height dks check djsa] ;fn vko';d gks rks adjust djsaA½",
        judgement: 'should be set height 119.8 mm (30 mm Stock Height)',
        method: 'By Shut hight gauge'
      },
      {
        id: 11,
        point: 'Check the distance between the brake disk and related electromagnet. ( brake disk vkSj mlls related electromagnet dh chp dh nwjh dks check djsaA½',
        judgement: 'Should be 0.3mm',
        method: 'By Tool'
      },
      {
        id: 12,
        point: "check the distance between proximity sensor and the cam's surface ( proximity sensor vkSj cam's surface dh chp dh nwjh dks check djsaA½",
        judgement: 'Should be 1.5mm',
        method: 'By Tool'
      }
    ]
  },
  {
    section: 'Lubrication',
    items: [
      {
        id: 13,
        point: 'Proper lubricate the slides.( slide proper lubaricate gksuk pkfg,As½',
        judgement: 'Should be lubricate the slides ok',
        method: 'Visully'
      },
      {
        id: 14,
        point: 'Proper lubricate the slides.( lubaricate slide proper gksuk pkfg,s%',
        judgement: 'Should be lubricate the slides ok',
        method: 'Visully'
      },
      {
        id: 15,
        point: 'Remove the oil from the gear box before disposing of press ( press ds disposing ls igys xs;j ckWDI ls oil dks remove dj nsA½',
        judgement: 'Remove the oil from the gear box before disposing of press.',
        method: 'By hand'
      }
    ]
  }
];

const FOOTER_FIELDS = [
  { key: 'pm_done_date', label: 'PM Done on ** date', placeholder: 'DD/MM/YYYY' },
  { key: 'start_time', label: 'Start Time', placeholder: 'HH:MM' },
  { key: 'end_time', label: 'End time', placeholder: 'HH:MM' },
  { key: 'total_time', label: 'Total Time', placeholder: 'e.g. 1 hr' },
  { key: 'sig_tech', label: 'SIGNATURE TECHNICIAN', placeholder: 'Sign' },
  { key: 'sig_eng', label: 'SIGNATURE ENGINEER', placeholder: 'Sign' },
  { key: 'sig_cell_owner', label: 'SIGNATURE CELL OWNER', placeholder: 'Sign' }
];

const COLS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function MachinePmChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'MCR';
  const modelName = machine?.model || 'Mecal-05';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `mcr_pm_checksheet_${machineName}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      docNo: '-CHK-WH-MT-035',
      rev: '-07',
      date: '-05.11.2025',
      mcName: 'SEMI AUTO CRIMPING MACHINE',
      srNo: '',
      mcDisplayNo: 'MCR-01',
      installationDate: '',
      year: new Date().getFullYear().toString(),
      preparedBy: 'SARWAR YADAV',
      approvedBy: 'SATYAPAL SINGH'
    };
  });

  const [cells, setCells] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_cells`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {};
  });

  const [footerTexts, setFooterTexts] = useState(() => {
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

  const handleCellChange = (k, v) => {
    setCells((prev) => ({ ...prev, [k]: v }));
  };

  const cycleCellValue = (k) => {
    const symbols = ['', '✓', 'X', '△', '⋈', '⬭'];
    const current = cells[k] || '';
    const currentIndex = symbols.indexOf(current);
    const next = currentIndex === -1 ? '✓' : symbols[(currentIndex + 1) % symbols.length];
    handleCellChange(k, next);
  };

  const handleFooterChange = (k, v) => {
    setFooterTexts((prev) => ({ ...prev, [k]: v }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_header`, JSON.stringify(headerInfo));
      localStorage.setItem(`${storageKey}_cells`, JSON.stringify(cells));
      localStorage.setItem(`${storageKey}_footer`, JSON.stringify(footerTexts));
      setSavedToast('PM Checksheet saved successfully!');
      setTimeout(() => setSavedToast(''), 3000);
    } catch (err) {
      setSavedToast('Error saving data to local storage.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all records on this PM Checksheet?')) {
      setCells({});
      setFooterTexts({});
      try {
        localStorage.removeItem(`${storageKey}_cells`);
        localStorage.removeItem(`${storageKey}_footer`);
      } catch (e) {
        // ignore
      }
      setSavedToast('Checksheet records reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  /* Render a diagonal cell with Before PM (top-left) & After PM (bottom-right) */
  const renderDiagonalCell = (pointId, colIndex) => {
    const keyBefore = `p${pointId}_c${colIndex}_before`;
    const keyAfter = `p${pointId}_c${colIndex}_after`;
    const valBefore = cells[keyBefore] || '';
    const valAfter = cells[keyAfter] || '';

    return (
      <td
        key={colIndex}
        className="border border-black p-0 relative h-[38px] overflow-hidden bg-white select-none group"
        style={{ width: '46px', minWidth: '46px', maxWidth: '46px' }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="100" x2="100" y2="0" stroke="#000" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Top-Left: Before PM */}
        <div
          title={`Before PM (Col ${colIndex}): click to cycle or type`}
          className="absolute inset-0 w-full h-full cursor-pointer hover:bg-amber-100/40 transition-colors"
          style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          onClick={(e) => {
            if (e.target.tagName !== 'INPUT') cycleCellValue(keyBefore);
          }}
        >
          <input
            type="text"
            value={valBefore}
            onChange={(e) => handleCellChange(keyBefore, e.target.value)}
            className="w-full h-full text-left font-black text-xs text-black border-0 outline-none bg-transparent pl-1.5 pt-0.5"
            style={{ width: '65%', height: '65%' }}
            maxLength={3}
          />
        </div>

        {/* Bottom-Right: After PM */}
        <div
          title={`After PM (Col ${colIndex}): click to cycle or type`}
          className="absolute inset-0 w-full h-full cursor-pointer hover:bg-emerald-100/40 transition-colors flex items-end justify-end"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          onClick={(e) => {
            if (e.target.tagName !== 'INPUT') cycleCellValue(keyAfter);
          }}
        >
          <input
            type="text"
            value={valAfter}
            onChange={(e) => handleCellChange(keyAfter, e.target.value)}
            className="w-full h-full text-right font-black text-xs text-black border-0 outline-none bg-transparent pr-1.5 pb-0.5"
            style={{ width: '65%', height: '65%' }}
            maxLength={3}
          />
        </div>
      </td>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Navbar without any switcher or observation checksheet filter */}
      <ChecksheetHeaderNav
        title="MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET"
        subtitle={`${displayMachine} — Semi Auto Crimping Machine PM Checksheet`}
        icon={Wrench}
        iconBgClass="bg-emerald-100 text-emerald-800"
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
              title="Print PM Checksheet"
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



      {/* Main Checksheet Table Container */}
      <div className="bg-white border-2 border-black p-2 md:p-3 shadow-md rounded-sm overflow-x-auto">
        <div className="min-w-[1260px] w-full text-black select-text">
          <table className="w-full border-collapse border border-black text-xs">
            {/* Header Rows */}
            <thead>
              {/* Row 1: Company Name & Document Info */}
              <tr className="border-b border-black">
                <th
                  colSpan={3}
                  className="border-r border-black py-2 px-4 text-center font-black text-sm tracking-widest uppercase"
                  style={{ backgroundColor: '#c8e6c9' }}
                >
                  FURUKAWA MINDA ELECTRIC PVT. LTD
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

              {/* Row 2: Title Banner */}
              <tr className="border-b border-black" style={{ backgroundColor: '#fff2b2' }}>
                <th
                  colSpan={15}
                  className="py-1.5 px-2 text-center font-black text-xs tracking-wider uppercase text-black"
                >
                  MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET
                </th>
              </tr>

              {/* Row 3: Machine Info Fields */}
              <tr className="border-b border-black text-[11px] font-bold bg-white">
                <td colSpan={3} className="border-r border-black p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">M/C NAME:</span>
                    <input
                      type="text"
                      value={headerInfo.mcName}
                      onChange={(e) => handleHeaderChange('mcName', e.target.value)}
                      className="font-bold outline-none border-0 bg-transparent flex-1"
                    />
                  </div>
                </td>
                <td colSpan={3} className="border-r border-black p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">SR.NO. :</span>
                    <input
                      type="text"
                      value={headerInfo.srNo}
                      onChange={(e) => handleHeaderChange('srNo', e.target.value)}
                      placeholder="e.g. MCR-01"
                      className="outline-none border-0 bg-transparent font-semibold w-full"
                    />
                  </div>
                </td>
                <td colSpan={3} className="border-r border-black p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">M/C DISPLAY NO :</span>
                    <input
                      type="text"
                      value={headerInfo.mcDisplayNo}
                      onChange={(e) => handleHeaderChange('mcDisplayNo', e.target.value)}
                      className="outline-none border-0 bg-transparent font-semibold w-full"
                    />
                  </div>
                </td>
                <td colSpan={3} className="border-r border-black p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">INSTALLATION DATE:-</span>
                    <input
                      type="text"
                      value={headerInfo.installationDate}
                      onChange={(e) => handleHeaderChange('installationDate', e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="outline-none border-0 bg-transparent font-semibold w-full"
                    />
                  </div>
                </td>
                <td colSpan={3} className="p-1.5">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">YEAR :-</span>
                    <input
                      type="text"
                      value={headerInfo.year}
                      onChange={(e) => handleHeaderChange('year', e.target.value)}
                      className="outline-none border-0 bg-transparent font-semibold w-full"
                    />
                  </div>
                </td>
              </tr>

              {/* Row 4: Column Headers & P.M. COUNTER */}
              <tr className="border-b border-black text-center text-[11px] font-bold">
                <th className="border-r border-black p-1.5 text-center w-[360px] min-w-[340px] bg-white">
                  Check Points
                </th>
                <th className="border-r border-black p-1.5 text-center w-[230px] min-w-[210px] bg-white">
                  Judgement
                </th>
                <th className="border-r border-black p-1.5 text-center w-[150px] min-w-[130px] bg-white">
                  Checking Method.
                </th>
                <th
                  colSpan={12}
                  className="py-1 px-1 font-black text-xs uppercase tracking-wider text-black border-l border-black"
                  style={{ backgroundColor: '#bbf2f6' }}
                >
                  P.M. COUNTER
                </th>
              </tr>
            </thead>

            {/* Check Point Rows */}
            <tbody>
              {PM_DATA.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  {/* Optional Section Subheader Banner */}
                  {group.section && (
                    <tr className="border-b border-black" style={{ backgroundColor: '#bbf2f6' }}>
                      <td
                        colSpan={15}
                        className="py-1 px-3 text-left font-black text-xs text-black uppercase tracking-wider"
                      >
                        {group.section}
                      </td>
                    </tr>
                  )}

                  {/* Section Check Items */}
                  {group.items.map((item) => (
                    <tr key={item.id} className="border-b border-black hover:bg-slate-50/50 transition-colors">
                      {/* Check Points */}
                      <td className="border-r border-black p-2 text-left text-[11px] leading-tight text-black align-middle font-normal">
                        {item.point}
                      </td>

                      {/* Judgement */}
                      <td className="border-r border-black p-2 text-left text-[11px] leading-tight text-black align-middle font-normal">
                        {item.judgement}
                      </td>

                      {/* Checking Method */}
                      <td className="border-r border-black p-2 text-center text-[11px] leading-tight text-black align-middle font-normal">
                        {item.method}
                      </td>

                      {/* 12 PM Columns with Diagonal Split */}
                      {COLS.map((colIdx) => renderDiagonalCell(item.id, colIdx))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Footer Section: Signatures, Timings & Verification */}
              {FOOTER_FIELDS.map((field, fIdx) => (
                <tr key={field.key} className="border-b border-black">
                  {/* Left block: PREPARED BY & APPROVED BY spanning columns 1-3 */}
                  {fIdx === 0 && (
                    <td
                      colSpan={3}
                      rowSpan={4}
                      className="border-r border-black p-3 align-middle bg-white"
                    >
                      <div className="flex items-center gap-2 text-xs font-black text-black">
                        <span>PREPARED BY :</span>
                        <input
                          type="text"
                          value={headerInfo.preparedBy}
                          onChange={(e) => handleHeaderChange('preparedBy', e.target.value)}
                          className="font-black text-black bg-transparent border-0 outline-none flex-1 uppercase"
                        />
                      </div>
                    </td>
                  )}
                  {fIdx === 4 && (
                    <td
                      colSpan={3}
                      rowSpan={3}
                      className="border-r border-black p-3 align-middle bg-white"
                    >
                      <div className="flex items-center gap-2 text-xs font-black text-black">
                        <span>APPROVED BY :</span>
                        <input
                          type="text"
                          value={headerInfo.approvedBy}
                          onChange={(e) => handleHeaderChange('approvedBy', e.target.value)}
                          className="font-black text-black bg-transparent border-0 outline-none flex-1 uppercase"
                        />
                      </div>
                    </td>
                  )}

                  {/* 12 PM Columns for each footer field */}
                  {COLS.map((colIdx) => {
                    const textKey = `${field.key}_${colIdx}`;
                    return (
                      <td
                        key={colIdx}
                        className="border-r border-black p-0 h-[28px] text-center"
                        style={{ width: '46px', minWidth: '46px', maxWidth: '46px' }}
                      >
                        <input
                          type="text"
                          value={footerTexts[textKey] || ''}
                          onChange={(e) => handleFooterChange(textKey, e.target.value)}
                          placeholder=""
                          title={`${field.label} (Col ${colIdx})`}
                          className="w-full h-full text-center text-[10.5px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Notes & Legend Table Row */}
              <tr className="border-b border-black bg-white">
                {/* Notes Column (columns 1 to 3) */}
                <td colSpan={3} className="border-r border-black p-2 text-[10.5px] leading-relaxed text-black">
                  <div className="font-bold space-y-0.5">
                    <div>NOTE: 1. PERIODIC CHECKS WILL BE DONE IN MAR, JUNE, SEPT, DEC</div>
                    <div>NOTE: 2. INPUT FROM DAILY WEEKLY & START UP CHECKSHEET RESULT SHOULD BE CONSIDERED</div>
                    <div>NOTE: 3. REFER MAINTENANCE MANUAL DURING PREVENTIVE MAINTENANCE</div>
                    <div>NOTE: 4. PREVENTIVE MAINTENANCE MUST BE DONE IN EVERY QUARTER</div>
                  </div>
                </td>

                {/* Legend and Symbols (across the 12 columns) */}
                <td colSpan={12} className="p-0 align-middle">
                  <div className="flex items-center h-full w-full">
                    {/* LEGEND title */}
                    <div className="px-3 font-black text-xs text-black border-r border-black uppercase whitespace-nowrap">
                      LEGEND
                    </div>

                    {/* Before PM / After PM Diagonal Sample Box */}
                    <div
                      className="relative border-r border-black h-[50px] shrink-0"
                      style={{ width: '100px' }}
                    >
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <line x1="0" y1="100" x2="100" y2="0" stroke="#000" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      </svg>
                      <span className="absolute top-1 left-1.5 text-[9.5px] font-bold text-black">
                        Before PM
                      </span>
                      <span className="absolute bottom-1 right-1.5 text-[9.5px] font-bold text-black">
                        After PM
                      </span>
                    </div>

                    {/* Symbols items */}
                    <div className="flex items-center justify-around flex-1 divide-x divide-black text-[11px] font-bold h-full">
                      {LEGEND_SYMBOLS.map((item) => (
                        <div key={item.symbol} className="flex-1 flex flex-col items-center justify-center p-1 text-center h-full">
                          <span className="text-sm font-black">{item.symbol}</span>
                          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
