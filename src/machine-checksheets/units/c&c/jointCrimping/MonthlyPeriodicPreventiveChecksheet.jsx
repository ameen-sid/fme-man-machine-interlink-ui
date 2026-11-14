import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
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
        point: 'Check for loose part if any tighten them. ( loose part check djsa ;fn dksh7 loose part gSa rks mls tight djsaA ½',
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
        judgement: 'should be set height 119.6 mm (30 mm Stock Height)',
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
        point: 'Proper lubricate the slides.( lubaricate slide proper gksuk pkfg,s½',
        judgement: 'Should be lubricate the slides ok',
        method: 'Visully'
      },
      {
        id: 15,
        point: 'Remove the oil from the gear box before disposing of press. ( press ds disposing ls igys xs;j ckWDI ls oil dks remove dj nsA½',
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

export default function MonthlyPeriodicPreventiveChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'JCR 01';
  const modelName = machine?.model || 'JCR-01';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `jcr_pm_preventive_${machineName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      docNo: '-CHK-WH-MT-035',
      rev: '-07',
      date: '-05.11.2025',
      mcName: 'SEMI AUTO CRIMPING MACHINE',
      srNo: '',
      mcDisplayNo: machineName,
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
    } catch (e) { }
    return {};
  });

  const [footerTexts, setFooterTexts] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_footer`);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
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
      setSavedToast('Monthly & Periodic PM Checksheet saved successfully!');
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
      } catch (e) { }
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

        {/* Top-left input: Before PM */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            cycleCellValue(keyBefore);
          }}
          className="absolute top-0 left-0 w-1/2 h-1/2 flex items-center justify-center cursor-pointer hover:bg-amber-100/40 text-[11px] font-bold text-slate-800"
          title="Before PM (click to toggle)"
        >
          <input
            type="text"
            value={valBefore}
            onChange={(e) => handleCellChange(keyBefore, e.target.value)}
            className="w-full h-full text-center border-0 bg-transparent outline-none font-black text-[11px] p-0"
            maxLength={2}
          />
        </div>

        {/* Bottom-right input: After PM */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            cycleCellValue(keyAfter);
          }}
          className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-center justify-center cursor-pointer hover:bg-emerald-100/40 text-[11px] font-bold text-emerald-800"
          title="After PM (click to toggle)"
        >
          <input
            type="text"
            value={valAfter}
            onChange={(e) => handleCellChange(keyAfter, e.target.value)}
            className="w-full h-full text-center border-0 bg-transparent outline-none font-black text-[11px] p-0"
            maxLength={2}
          />
        </div>
      </td>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Top Header Nav */}
      <ChecksheetHeaderNav
        title="MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET"
        subtitle={`${displayMachine} — Semi Auto Crimping Machine (CHK-WH-MT-035 Rev 07)`}
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
        <div className="min-w-[1450px] w-full text-black select-text font-sans">
          {/* Top Document Header */}
          <div className="border border-black border-b-0 bg-[#dff0d8] text-center font-bold text-xs py-1 tracking-wider">
            FURUKAWA MINDA ELECTRIC PVT. LTD
          </div>

          <div className="border border-black border-b-0 bg-[#fffbcc] text-center font-black text-sm py-1 tracking-widest uppercase">
            MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET
          </div>

          {/* Subheader Metadata Row */}
          <table className="w-full border-collapse border border-black text-xs font-bold bg-white">
            <tbody>
              <tr className="border-b border-black">
                <td className="border-r border-black p-1.5 w-[22%]">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">M/C NAME:</span>
                    <input
                      type="text"
                      value={headerInfo.mcName}
                      onChange={(e) => handleHeaderChange('mcName', e.target.value)}
                      className="w-full border-0 outline-none font-bold text-xs bg-transparent"
                    />
                  </div>
                </td>
                <td className="border-r border-black p-1.5 w-[14%]">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">SR.NO. :</span>
                    <input
                      type="text"
                      placeholder="e.g. 01"
                      value={headerInfo.srNo}
                      onChange={(e) => handleHeaderChange('srNo', e.target.value)}
                      className="w-full border-0 outline-none font-bold text-xs bg-transparent"
                    />
                  </div>
                </td>
                <td className="border-r border-black p-1.5 w-[20%]">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">M/C DISPLAY NO :</span>
                    <input
                      type="text"
                      value={headerInfo.mcDisplayNo}
                      onChange={(e) => handleHeaderChange('mcDisplayNo', e.target.value)}
                      className="w-full border-0 outline-none font-bold text-xs bg-transparent text-blue-700"
                    />
                  </div>
                </td>
                <td className="border-r border-black p-1.5 w-[18%]">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">INSTALLATION DATE:-</span>
                    <input
                      type="text"
                      placeholder="DD.MM.YYYY"
                      value={headerInfo.installationDate}
                      onChange={(e) => handleHeaderChange('installationDate', e.target.value)}
                      className="w-full border-0 outline-none font-bold text-xs bg-transparent"
                    />
                  </div>
                </td>
                <td className="border-r border-black p-1.5 w-[11%]">
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">YEAR :-</span>
                    <input
                      type="text"
                      value={headerInfo.year}
                      onChange={(e) => handleHeaderChange('year', e.target.value)}
                      className="w-full border-0 outline-none font-bold text-xs bg-transparent"
                    />
                  </div>
                </td>
                <td className="p-1.5 text-right text-[11px] font-bold w-[15%]">
                  <div>Doc No: {headerInfo.docNo}</div>
                  <div>Rev: {headerInfo.rev}</div>
                  <div>Date: {headerInfo.date}</div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Master Table Grid */}
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="border-b border-black text-center font-bold text-[11px]">
                <th rowSpan={2} className="border-r border-black p-2 w-[340px] text-center bg-white">
                  Check Points
                </th>
                <th rowSpan={2} className="border-r border-black p-2 w-[220px] text-center bg-white">
                  Judgement
                </th>
                <th rowSpan={2} className="border-r border-black p-2 w-[160px] text-center bg-white">
                  Checking Method.
                </th>
                <th colSpan={12} className="border-b border-black p-1 bg-[#cce5ff] text-center font-black tracking-widest text-[11.5px]">
                  P.M. COUNTER
                </th>
              </tr>

              {/* 12 Columns under P.M. Counter */}
              <tr className="border-b border-black text-center text-[10px] font-bold bg-[#e8f4fc]">
                {COLS.map((c) => (
                  <th
                    key={c}
                    className="border-r border-black p-0.5 text-center font-bold"
                    style={{ width: '46px', minWidth: '46px', maxWidth: '46px' }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {PM_DATA.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  {/* Optional Section Banner */}
                  {group.section && (
                    <tr className="border-b border-black bg-[#d0eef7] font-black text-xs">
                      <td colSpan={15} className="p-1.5 px-3 text-left tracking-wide">
                        {group.section}
                      </td>
                    </tr>
                  )}

                  {/* Items in section */}
                  {group.items.map((item) => (
                    <tr key={item.id} className="border-b border-black hover:bg-slate-50/50 transition-colors">
                      <td className="border-r border-black p-1.5 text-left text-[11px] font-medium leading-snug">
                        {item.point}
                      </td>
                      <td className="border-r border-black p-1.5 text-left text-[11px] font-semibold">
                        {item.judgement}
                      </td>
                      <td className="border-r border-black p-1.5 text-center text-[11px] font-semibold">
                        {item.method}
                      </td>
                      {COLS.map((c) => renderDiagonalCell(item.id, c))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Footer 7 Rows matching screenshot */}
              {FOOTER_FIELDS.map((fld) => (
                <tr key={fld.key} className="border-b border-black h-[28px]">
                  <td colSpan={3} className="border-r border-black p-1 px-3 text-right font-bold text-xs uppercase bg-white">
                    {fld.label}
                  </td>
                  {COLS.map((c) => (
                    <td
                      key={c}
                      className="border-r border-black p-0 text-center align-middle"
                      style={{ width: '46px', minWidth: '46px', maxWidth: '46px' }}
                    >
                      <input
                        type="text"
                        placeholder={fld.placeholder}
                        value={footerTexts[`${fld.key}_c${c}`] || ''}
                        onChange={(e) => handleFooterChange(`${fld.key}_c${c}`, e.target.value)}
                        className="w-full h-full text-center text-[10px] font-bold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
                      />
                    </td>
                  ))}
                </tr>
              ))}

              {/* Signatures & Legend Row matching screenshot */}
              <tr className="border-b border-black bg-white">
                <td className="border-r border-black p-1.5 font-bold text-xs">
                  <div className="flex items-center gap-1">
                    <span>PREPARED BY :</span>
                    <input
                      type="text"
                      value={headerInfo.preparedBy}
                      onChange={(e) => handleHeaderChange('preparedBy', e.target.value)}
                      className="border-0 outline-none font-black text-xs bg-transparent"
                    />
                  </div>
                </td>
                <td colSpan={2} className="border-r border-black p-1.5 text-center font-black text-xs tracking-wider">
                  LEGEND
                </td>

                {/* Diagonal Before/After PM demo box */}
                <td className="border-r border-black p-0 relative h-[38px] bg-white text-[9px] font-black">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="100" x2="100" y2="0" stroke="#000" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="absolute top-0.5 left-1 text-[8px] font-bold">Before PM</span>
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-bold">After PM</span>
                </td>

                {/* Legend Symbols */}
                <td colSpan={2} className="border-r border-black p-1 text-center font-bold text-[10.5px]">
                  <div className="text-base font-black text-rose-600">X</div>
                  <div>NOT OK</div>
                </td>
                <td colSpan={2} className="border-r border-black p-1 text-center font-bold text-[10.5px]">
                  <div className="text-base font-black text-emerald-600">✓</div>
                  <div>OK/DONE</div>
                </td>
                <td colSpan={2} className="border-r border-black p-1 text-center font-bold text-[10.5px]">
                  <div className="text-base font-black text-amber-600">△</div>
                  <div>ATTENTION</div>
                </td>
                <td colSpan={2} className="border-r border-black p-1 text-center font-bold text-[10.5px]">
                  <div className="text-base font-black text-blue-600">⋈</div>
                  <div>RECTIFIED</div>
                </td>
                <td colSpan={3} className="p-1 text-center font-bold text-[10.5px]">
                  <div className="text-base font-black text-purple-600">⬭</div>
                  <div>SPARE CHANGE</div>
                </td>
              </tr>

              {/* Approved by row */}
              <tr className="border-b border-black bg-white">
                <td colSpan={3} className="border-r border-black p-1.5 font-bold text-xs">
                  <div className="flex items-center gap-1">
                    <span>APPROVED BY :</span>
                    <input
                      type="text"
                      value={headerInfo.approvedBy}
                      onChange={(e) => handleHeaderChange('approvedBy', e.target.value)}
                      className="border-0 outline-none font-black text-xs bg-transparent"
                    />
                  </div>
                </td>
                <td colSpan={12} className="p-1 bg-slate-50"></td>
              </tr>
            </tbody>
          </table>

          {/* Notes Bottom Box */}
          <div className="border border-black border-t-0 p-2 bg-white text-[10.5px] font-bold text-slate-800 leading-normal space-y-0.5">
            <div>NOTE: 1 PERIODIC CHECKS WILL BE DONE IN MAR,JUNE,SEPT,DEC</div>
            <div>NOTE: 2, INPUT FROM DAILY WEEKLY & START UP CHECKSHEET RESULT SHOULD BE CONSIDERED</div>
            <div>NOTE 3: REFER MAINTENANCE MANNUAL DURING PREVENTIVE MAINTENANCE</div>
            <div>NOTE 4: PREVENTIVE MAINTENANCE MUST BE DONE IN EVERY QUARTER.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

