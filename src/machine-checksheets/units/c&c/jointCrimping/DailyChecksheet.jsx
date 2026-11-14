import React, { useState } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import { CalendarCheck2, Printer, Plus, Check, Sparkles } from 'lucide-react';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

// Section 1: Related with m/c operations (9 items from physical screenshot)
export const JCR_DAILY_OPERATION_ITEMS = [
  {
    id: 'op1',
    pointEn: 'Cleaning of Applicator Clamping Area and Applicator Lock Properly Work',
    subEn: '(Base Plate)',
    pointHi: 'Applicator Clamping एरिया की सफाई और एप्लीकेटर लॉक को चेक करें',
    resp: 'Machine Operator',
    criteria: 'No chips /No dust',
    method: 'Visullay',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op2',
    pointEn: 'Check safety cover operation and interlocking',
    pointHi: 'सेफ्टी कवर के ऑपरेशन और इंटरलॉकिंग को चेक करें',
    resp: 'Machine Operator',
    criteria: 'Machine will not operate when safety cover is open and smooth operation of safety cover',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op3',
    pointEn: 'Check working of nose plier interlocking',
    pointHi: 'नोज़ प्लायर की इंटरलॉकिंग को चेक करें',
    resp: 'Machine Operator',
    criteria: 'Machine will not operate when nose plier is not on its location',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op4',
    pointEn: 'Check The Working of Foot Switch',
    pointHi: 'फुट स्विच की वर्किंग को चेक करें',
    resp: 'Machine Operator',
    criteria: 'Functioning OK',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op5',
    pointEn: 'All Emergency and Saftey Door Condition',
    pointHi: 'सभी इमरजेंसी स्विच और सेफ्टी डोर की कंडीशन को चेक करें',
    resp: 'Machine Operator',
    criteria: 'M/C must stop when safety cover open & emergency pressed',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op6',
    pointEn: 'Check M/C Mannual Handle and Handle Stand',
    pointHi: 'मशीन के मैन्युअल हैंडल और हैंडल के स्टैंड को चेक करें',
    resp: 'Machine Operator',
    criteria: 'Present',
    method: 'Visullay',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op7',
    pointEn: 'Check the Terminal Stopper & Proper Tight',
    pointHi: 'टर्मिनल स्टॉपर को चेक करें और प्रॉपर टाइट करें',
    resp: 'Machine Operator',
    criteria: 'Ter. Reel Smothly Movement',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op8',
    pointEn: 'Check BLO (Bad Limit Overall) Value',
    pointHi: 'BLO वैल्यू को चेक करें',
    resp: 'Machine Operator',
    criteria: '70 Max',
    method: 'Visullay',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  },
  {
    id: 'op9',
    pointEn: 'Check the barcode availability on applicator',
    pointHi: 'एप्लीकेटर पर बारकोड की उपलब्धता की जांच करें',
    resp: 'Machine Operator',
    criteria: 'available',
    method: 'Visullay',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  }
];

// Section 2: Related with m/c Maintenance (1 item)
export const JCR_DAILY_MAINT_ITEMS = [
  {
    id: 'maint1',
    pointEn: 'Check The Ram Bolt Assembly & Cam Play',
    pointHi: 'रेम बोल्ट असेंबली और कैम प्ले को चेक करें',
    resp: 'Maint. Technician',
    criteria: 'Lubrication & No play',
    method: 'Visusaly & By Hand',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  }
];

// Section 3: Related with m/c Pokayoke (1 item)
export const JCR_DAILY_POKAYOKE_ITEMS = [
  {
    id: 'poka1',
    pointEn: 'Check the CFA unit functioning',
    pointHi: 'CFA यूनिट के फंक्शन को चेक करें',
    resp: 'Maint. Technician',
    criteria: 'Functioning OK',
    method: 'Test & trial',
    freqD: '✓',
    freqW: '',
    shifts: ['A', 'B', 'C']
  }
];

// Section 4: Weekly Maintenance (3 items, Shift A)
export const JCR_WEEKLY_MAINT_ITEMS = [
  {
    id: 'w1',
    pointEn: 'Check The Chip Cutter Duct Condition',
    pointHi: 'चिप कटर डक्ट की कंडीशन को चेक करें',
    resp: 'Maint. Technician',
    criteria: 'No Loose / No Damage',
    method: 'By Hand',
    freqD: '',
    freqW: '✓',
    shifts: ['A']
  },
  {
    id: 'w2',
    pointEn: 'Check The Electrical Connection (Leads) and Motor Fan & remove the dust',
    pointHi: 'इलेक्ट्रिकल कनेक्शन और मोटर फैन को चेक करें',
    resp: 'Maint. Technician',
    criteria: 'Proper Tight / Working',
    method: 'Test & trial',
    freqD: '',
    freqW: '✓',
    shifts: ['A']
  },
  {
    id: 'w3',
    pointEn: 'lubricate the slide and the relative guides',
    pointHi: 'स्लाइड और संबंधित गाइडों को लुब्रिकेट करें',
    resp: 'Maint. Technician',
    criteria: 'Lubrication',
    method: 'Visullay',
    freqD: '',
    freqW: '✓',
    shifts: ['A']
  }
];

const INITIAL_ABNORMALITY_ROWS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  date: '',
  shift: '',
  area: '',
  specificArea: '',
  abnormality: '',
  immediateAction: '',
  resp: '',
  targetDate: '',
  status: '',
  operatorFeedback: '',
  maintSupervisor: '',
  prodSupervisor: ''
}));

export default function JcrDailyChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'JCR 01';
  const modelName = machine?.model || 'JCR-01';
  const displayMachine = `${machineName} (${modelName})`;

  const storageKey = `jcr_daily_checksheet_${machineName}`;

  const [headerInfo, setHeaderInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      companyName: 'FURUKAWA MINDA ELECTRIC PVT. LTD.',
      docNo: '-CHK-WH-MT-007',
      rev: 'REV.-13',
      date: '27.02.2025',
      machineName: '2T & 4T Mecal Press',
      machineNo: machineName || 'JCR-01'
    };
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

  const [abnormalities, setAbnormalities] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_abnormalities`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_ABNORMALITY_ROWS;
  });

  const [savedToast, setSavedToast] = useState('');
  const [selectedToolSymbol, setSelectedToolSymbol] = useState('✓');

  const handleHeaderChange = (key, val) => {
    setHeaderInfo((prev) => ({ ...prev, [key]: val }));
  };

  const handleCellChange = (key, val) => {
    setGridValues((prev) => ({ ...prev, [key]: val }));
  };

  const cycleCellValue = (key) => {
    const symbols = ['', '✓', 'X', '⨂', 'N/A'];
    const current = gridValues[key] || '';
    const currentIndex = symbols.indexOf(current);
    const next = currentIndex === -1 ? '✓' : symbols[(currentIndex + 1) % symbols.length];
    handleCellChange(key, next);
  };

  const handleAddAbnormalityRow = () => {
    setAbnormalities((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: '',
        shift: '',
        area: '',
        specificArea: '',
        abnormality: '',
        immediateAction: '',
        resp: '',
        targetDate: '',
        status: '',
        operatorFeedback: '',
        maintSupervisor: '',
        prodSupervisor: ''
      }
    ]);
  };


  const handleAbnormalChange = (id, field, val) => {
    setAbnormalities((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: val } : row))
    );
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`${storageKey}_header`, JSON.stringify(headerInfo));
      localStorage.setItem(`${storageKey}_grid`, JSON.stringify(gridValues));
      localStorage.setItem(`${storageKey}_abnormalities`, JSON.stringify(abnormalities));
      setSavedToast('JCR Daily Checksheet saved successfully!');
      setTimeout(() => setSavedToast(''), 3000);
    } catch (e) {
      setSavedToast('Error saving data.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all values and abnormality records for this JCR Daily Checksheet?')) {
      setGridValues({});
      setAbnormalities(INITIAL_ABNORMALITY_ROWS);
      try {
        localStorage.removeItem(`${storageKey}_grid`);
        localStorage.removeItem(`${storageKey}_abnormalities`);
      } catch (e) {
        // ignore
      }
      setSavedToast('Checksheet reset successfully.');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleQuickFillCurrentDay = (dayNum) => {
    const updated = { ...gridValues };
    const allItems = [
      ...JCR_DAILY_OPERATION_ITEMS,
      ...JCR_DAILY_MAINT_ITEMS,
      ...JCR_DAILY_POKAYOKE_ITEMS
    ];
    allItems.forEach((item) => {
      item.shifts.forEach((sh) => {
        const k = `${item.id}_${sh}_d${dayNum}`;
        if (!updated[k]) {
          updated[k] = item.id === 'op8' ? '45' : selectedToolSymbol;
        }
      });
    });
    setGridValues(updated);
    setSavedToast(`Filled Day ${dayNum} with ${selectedToolSymbol}!`);
    setTimeout(() => setSavedToast(''), 3000);
  };

  const renderCheckItemRows = (item) => {
    return item.shifts.map((sh, sIdx) => {
      const isFirstShift = sIdx === 0;
      return (
        <tr key={`${item.id}_${sh}`} className="border-b border-black hover:bg-slate-50/50 transition-colors">
          {/* Item details rendered once per item with rowSpan */}
          {isFirstShift && (
            <>
              <td
                rowSpan={item.shifts.length}
                className="border-r border-black p-1.5 text-left align-middle leading-tight"
                style={{ width: '260px', minWidth: '260px' }}
              >
                <div className="font-bold text-[11px] text-black">
                  {item.pointEn}
                  {item.subEn && <span className="block text-[10.5px] font-medium text-slate-700">{item.subEn}</span>}
                </div>
                <div className="text-[10px] text-slate-800 font-normal mt-0.5">{item.pointHi}</div>
              </td>
              <td
                rowSpan={item.shifts.length}
                className="border-r border-black p-1 text-center align-middle font-medium text-[10.5px]"
                style={{ width: '90px', minWidth: '90px' }}
              >
                {item.resp}
              </td>
              <td
                rowSpan={item.shifts.length}
                className="border-r border-black p-1 text-left align-middle font-semibold text-[10.5px] leading-tight"
                style={{ width: '160px', minWidth: '160px' }}
              >
                {item.criteria}
              </td>
              <td
                rowSpan={item.shifts.length}
                className="border-r border-black p-1 text-center align-middle font-medium text-[10.5px]"
                style={{ width: '90px', minWidth: '90px' }}
              >
                {item.method}
              </td>
              <td
                rowSpan={item.shifts.length}
                className="border-r border-black p-0 text-center align-middle font-black text-xs"
                style={{ width: '28px', minWidth: '28px' }}
              >
                {item.freqD}
              </td>
              <td
                rowSpan={item.shifts.length}
                className="border-r border-black p-0 text-center align-middle font-black text-xs"
                style={{ width: '28px', minWidth: '28px' }}
              >
                {item.freqW}
              </td>
            </>
          )}

          {/* Shift column cell (A / B / C) */}
          <td
            className="border-r border-black p-0 text-center align-middle font-bold text-[11px] bg-slate-50"
            style={{ width: '26px', minWidth: '26px' }}
          >
            {sh}
          </td>

          {/* Days 1 to 31 Cells */}
          {DAYS.map((d) => {
            const cellKey = `${item.id}_${sh}_d${d}`;
            const val = gridValues[cellKey] || '';
            const isNotOk = val === 'X' || val === '⨂';
            return (
              <td
                key={d}
                onClick={() => cycleCellValue(cellKey)}
                className={`border-r border-black p-0 text-center align-middle h-[25px] cursor-pointer select-none transition-colors ${isNotOk
                  ? 'bg-rose-100 text-rose-800 font-black'
                  : val === '✓'
                    ? 'bg-emerald-50/70 text-emerald-800 font-black'
                    : 'hover:bg-amber-50/60'
                  }`}
                style={{ width: '28px', minWidth: '28px', maxWidth: '28px' }}
                title={`${item.pointEn} — Shift ${sh}, Day ${d}: click to toggle or type`}
              >
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleCellChange(cellKey, e.target.value)}
                  className="w-full h-full text-center font-bold text-[11px] border-0 outline-none bg-transparent"
                  maxLength={6}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const renderSignRow = (label, keyPrefix) => (
    <tr className="border-b border-black bg-slate-50/60">
      <td
        colSpan={7}
        className="border-r border-black px-2 py-1 text-left font-bold text-[11px] text-black"
      >
        {label}
      </td>
      {DAYS.map((d) => {
        const signKey = `${keyPrefix}_d${d}`;
        return (
          <td
            key={d}
            className="border-r border-black p-0 h-[26px] text-center"
            style={{ width: '28px', minWidth: '28px', maxWidth: '28px' }}
          >
            <input
              type="text"
              value={gridValues[signKey] || ''}
              onChange={(e) => handleCellChange(signKey, e.target.value)}
              title={`${label} Day ${d}`}
              className="w-full h-full text-center text-[10px] font-semibold border-0 outline-none bg-transparent hover:bg-yellow-50 focus:bg-yellow-100"
            />
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 pb-12">
      {/* Top Navigation */}
      <ChecksheetHeaderNav
        title="MACHINE DAILY CHECKSHEET 13"
        subtitle={`${displayMachine} — 2T & 4T Mecal Press Daily Inspection & Abnormality Log (CHK-WH-MT-007 Rev 13)`}
        icon={CalendarCheck2}
        iconBgClass="bg-blue-100 text-blue-800"
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
        <div className="min-w-[1500px] w-full text-black select-text">
          {/* Top Company Header & Document Control Info */}
          <div className="border border-black border-b-0 p-2 bg-white flex items-start justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-black m-0 uppercase tracking-wider font-sans">
                DAILY CHECK SHEET
              </h1>
              <div className="flex items-center gap-2 text-xs font-bold mt-2">
                <span>Machine Name :</span>
                <input
                  type="text"
                  value={headerInfo.machineName}
                  onChange={(e) => handleHeaderChange('machineName', e.target.value)}
                  className="border-b border-black outline-none font-bold text-xs bg-transparent w-52"
                />
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-black text-xs text-black uppercase tracking-wider mb-1">
                FURUKAWA MINDA ELECTRIC PVT. LTD.
              </span>
              <div className="border border-black text-[11px] font-bold bg-white text-right divide-y divide-black">
                <div className="px-2 py-0.5 flex items-center justify-between gap-3">
                  <span>Doc No. :</span>
                  <input
                    type="text"
                    value={headerInfo.docNo}
                    onChange={(e) => handleHeaderChange('docNo', e.target.value)}
                    className="border-0 outline-none font-bold text-right w-36 bg-transparent"
                  />
                </div>
                <div className="px-2 py-0.5 flex items-center justify-between gap-3">
                  <span>REV :</span>
                  <input
                    type="text"
                    value={headerInfo.rev}
                    onChange={(e) => handleHeaderChange('rev', e.target.value)}
                    className="border-0 outline-none font-bold text-right w-20 bg-transparent"
                  />
                </div>
                <div className="px-2 py-0.5 flex items-center justify-between gap-3">
                  <span>DATE :</span>
                  <input
                    type="text"
                    value={headerInfo.date}
                    onChange={(e) => handleHeaderChange('date', e.target.value)}
                    className="border-0 outline-none font-bold text-right w-28 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold mt-1.5">
                <span>Machine No. :</span>
                <input
                  type="text"
                  value={headerInfo.machineNo}
                  onChange={(e) => handleHeaderChange('machineNo', e.target.value)}
                  className="border-b border-black outline-none font-bold text-xs bg-transparent w-28 text-center"
                />
              </div>
            </div>
          </div>

          {/* Main Inspection Table */}
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              {/* Releated with m/c operations banner */}
              <tr className="border-b border-black bg-[#bfbfbf]">
                <th
                  colSpan={38}
                  className="py-1 px-3 text-left font-black text-xs text-black uppercase tracking-wider"
                >
                  Releated with m/c operations
                </th>
              </tr>

              {/* Column Headers */}
              <tr className="border-b border-black text-center text-[10.5px] font-bold bg-slate-100">
                <th
                  rowSpan={2}
                  className="border-r border-black p-1 align-middle"
                  style={{ width: '260px', minWidth: '260px' }}
                >
                  STARTUP CHECK POINTS<br />( SHIFT CONFIRMATION )
                </th>
                <th
                  className="border-r border-black p-1"
                  style={{ width: '90px', minWidth: '90px' }}
                >
                  Resp.
                </th>
                <th
                  className="border-r border-black p-1"
                  style={{ width: '160px', minWidth: '160px' }}
                >
                  Criteria
                </th>
                <th
                  className="border-r border-black p-1"
                  style={{ width: '90px', minWidth: '90px' }}
                >
                  Method
                </th>
                <th
                  colSpan={2}
                  className="border-r border-black p-1"
                  style={{ width: '56px', minWidth: '56px' }}
                >
                  FREQ
                </th>
                <th
                  rowSpan={2}
                  className="border-r border-black p-0 align-middle"
                  style={{ width: '26px', minWidth: '26px' }}
                >
                  Shift
                </th>
                <th
                  colSpan={31}
                  className="p-1 font-black text-xs text-center border-l border-black bg-slate-200"
                >
                  Daily Status
                </th>
              </tr>

              {/* Sub-header row for Methods, Criteria, FREQ & Day numbers 1 to 31 */}
              <tr className="border-b border-black text-center text-[10px] font-bold bg-slate-100">
                <th className="border-r border-black p-1">Who</th>
                <th className="border-r border-black p-1">STD VALUE</th>
                <th className="border-r border-black p-1">Measuring Method</th>
                <th className="border-r border-black p-0.5" style={{ width: '28px' }}>D</th>
                <th className="border-r border-black p-0.5" style={{ width: '28px' }}>W</th>
                {DAYS.map((d) => (
                  <th
                    key={d}
                    className="border-r border-black p-0 h-[22px] font-black text-[11px]"
                    style={{ width: '28px', minWidth: '28px', maxWidth: '28px' }}
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* SECTION 1: Related with m/c operations items (9 items) */}
              {JCR_DAILY_OPERATION_ITEMS.map((item) => renderCheckItemRows(item))}

              {/* Operations Signatures */}
              {renderSignRow('Filled By (M/C Operator Sign) (A Shift - )', 'op_sign_A')}
              {renderSignRow('Filled By (M/C Operator Sign) (B Shift - )', 'op_sign_B')}
              {renderSignRow('Filled By (M/C Operator Sign) (C Shift - )', 'op_sign_C')}
              {renderSignRow('Supervisor - Production (Sign)', 'prod_sup_sign')}

              {/* SECTION 2: Related with m/c Maintenance */}
              <tr className="border-b border-black bg-[#bfbfbf]">
                <td
                  colSpan={38}
                  className="py-1 px-3 text-left font-black text-xs text-black uppercase tracking-wider"
                >
                  Releated with m/c Maintenance
                </td>
              </tr>
              {JCR_DAILY_MAINT_ITEMS.map((item) => renderCheckItemRows(item))}

              {/* SECTION 3: Related with m/c Pokayoke */}
              <tr className="border-b border-black bg-[#bfbfbf]">
                <td
                  colSpan={38}
                  className="py-1 px-3 text-left font-black text-xs text-black uppercase tracking-wider"
                >
                  Releated with m/c Pokayoke
                </td>
              </tr>
              {JCR_DAILY_POKAYOKE_ITEMS.map((item) => renderCheckItemRows(item))}

              {/* Maintenance Technician Signatures */}
              {renderSignRow('Checked & Corrected By (Maint. Technician Sign) (A Shift - )', 'maint_tech_A')}
              {renderSignRow('Checked & Corrected By (Maint. Technician Sign) (B Shift - )', 'maint_tech_B')}
              {renderSignRow('Checked & Corrected By (Maint. Technician Sign) (C Shift - )', 'maint_tech_C')}

              {/* SECTION 4: Weekly Maintenance Items */}
              {JCR_WEEKLY_MAINT_ITEMS.map((item) => renderCheckItemRows(item))}

              {/* Supervisor & Technician Maintenance Signatures */}
              {renderSignRow('Technician - Maintenance (Sign)', 'maint_tech_final')}
              {renderSignRow('Supervisor - Maintenance (Sign)', 'maint_sup_final')}
            </tbody>
          </table>

          {/* Bottom Legends Box */}
          <div className="border border-black border-t-0 p-3 bg-white text-xs font-bold leading-relaxed">
            <div className="text-[11px] font-semibold text-slate-800">
              <div>* Checking Frequency of Daily / Shift: <span className="font-bold">Shift Start</span></div>
              <div>* Checking Frequency of Weekly: <span className="font-bold">First day of week</span></div>
            </div>
            <div className="mt-2 text-[11px] font-black text-black">
              [LEGANDS]
            </div>
            <div className="text-[10.5px] font-bold text-slate-900 mt-1 space-y-0.5">
              <div>1) PUT (✓) FOR OK CONDITION</div>
              <div>2) PUT (X) FOR NOT OK CONDITION,</div>
              <div>3) PUT VALUE WHERE VALUE IS MENTION</div>
              <div>4) TAKE NECESSARY ACTION AND ENCIRCLE ON THE CROSS MARK ( ⨂ ) AND FILL THE COUNTERACTION SHEET.</div>
              <div>5) PUT (N/A) FOR NOT APPLICABLE</div>
            </div>
          </div>

          {/* ABNORMALITY OBSERVATION & ACTION SHEET (Exact 1:1 match to Screenshot) */}
          <div className="mt-6">
            <div className="flex items-center justify-end mb-1 print:hidden gap-2">
              <button
                type="button"
                onClick={handleAddAbnormalityRow}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                <span>Add Abnormality Row</span>
              </button>
            </div>

            <table className="w-full border-collapse border-2 border-black text-xs bg-white">
              <thead>
                {/* Title Row */}
                <tr className="border-b-2 border-black">
                  <th
                    colSpan={12}
                    className="py-1 px-3 text-center font-normal text-sm md:text-base text-black bg-white tracking-normal font-sans"
                  >
                    Abnormality Observation &amp; Action Sheet
                  </th>
                </tr>

                {/* Column Headers */}
                <tr className="border-b-2 border-black text-center font-normal text-[11px] text-black bg-white">
                  <th className="border-r border-black p-1 align-middle w-20 font-normal">
                    Date
                  </th>
                  <th className="border-r border-black p-1 align-middle w-16 font-normal">
                    Shift
                  </th>
                  <th className="border-r border-black p-1 align-middle w-20 font-normal">
                    Area
                  </th>
                  <th className="border-r border-black p-1 align-middle w-24 font-normal leading-tight">
                    Specific<br />Area
                  </th>
                  <th className="border-r-2 border-black p-1 align-middle w-64 font-normal">
                    Abnormailaity
                  </th>
                  <th className="border-r border-slate-300 p-1 align-middle w-52 font-normal">
                    Immediate Action Req.
                  </th>
                  <th className="border-r border-slate-300 p-1 align-middle w-20 font-normal">
                    Resp.
                  </th>
                  <th className="border-r-2 border-black p-1 align-middle w-28 font-normal leading-tight">
                    Target<br />Date /Time
                  </th>
                  <th className="border-r border-slate-300 p-1 align-middle w-24 font-normal">
                    Status
                  </th>
                  <th className="border-r-2 border-black p-1 align-middle w-40 font-normal">
                    Operator Feedback
                  </th>
                  <th className="border-r border-slate-300 p-1 align-middle w-28 font-normal leading-tight">
                    Maint.<br />Supervisor
                  </th>
                  <th className="p-1 align-middle w-28 font-normal leading-tight">
                    Production<br />Supervisor
                  </th>
                </tr>
              </thead>

              <tbody>
                {abnormalities.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b-2 border-black h-12 hover:bg-yellow-50/20 transition-colors group"
                  >
                    <td className="border-r border-black p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.date}
                        onChange={(e) => handleAbnormalChange(row.id, 'date', e.target.value)}
                        className="w-full h-full text-center text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.shift}
                        onChange={(e) => handleAbnormalChange(row.id, 'shift', e.target.value)}
                        className="w-full h-full text-center text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.area}
                        onChange={(e) => handleAbnormalChange(row.id, 'area', e.target.value)}
                        className="w-full h-full px-1 text-left text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-black p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.specificArea}
                        onChange={(e) => handleAbnormalChange(row.id, 'specificArea', e.target.value)}
                        className="w-full h-full px-1 text-left text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r-2 border-black p-0 h-12 align-middle">
                      <input
                        type="text"
                        value={row.abnormality}
                        onChange={(e) => handleAbnormalChange(row.id, 'abnormality', e.target.value)}
                        className="w-full h-full px-2 text-left text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-slate-300 p-0 h-12 align-middle">
                      <input
                        type="text"
                        value={row.immediateAction}
                        onChange={(e) => handleAbnormalChange(row.id, 'immediateAction', e.target.value)}
                        className="w-full h-full px-2 text-left text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-slate-300 p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.resp}
                        onChange={(e) => handleAbnormalChange(row.id, 'resp', e.target.value)}
                        className="w-full h-full text-center text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r-2 border-black p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.targetDate}
                        onChange={(e) => handleAbnormalChange(row.id, 'targetDate', e.target.value)}
                        className="w-full h-full text-center text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-slate-300 p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.status}
                        onChange={(e) => handleAbnormalChange(row.id, 'status', e.target.value)}
                        className="w-full h-full text-center text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r-2 border-black p-0 h-12 align-middle">
                      <input
                        type="text"
                        value={row.operatorFeedback}
                        onChange={(e) => handleAbnormalChange(row.id, 'operatorFeedback', e.target.value)}
                        className="w-full h-full px-2 text-left text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="border-r border-slate-300 p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.maintSupervisor}
                        onChange={(e) => handleAbnormalChange(row.id, 'maintSupervisor', e.target.value)}
                        className="w-full h-full text-center text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                    <td className="p-0 h-12 text-center align-middle">
                      <input
                        type="text"
                        value={row.prodSupervisor}
                        onChange={(e) => handleAbnormalChange(row.id, 'prodSupervisor', e.target.value)}
                        className="w-full h-full text-center text-[11px] font-sans border-0 outline-none bg-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

