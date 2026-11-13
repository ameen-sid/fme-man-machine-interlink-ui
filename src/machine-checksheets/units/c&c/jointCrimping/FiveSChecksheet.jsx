import React, { useState } from 'react';
import { ArrowLeft, ClipboardCheck, RotateCcw } from 'lucide-react';
import FiveSPhotoCell from '../../../shared/FiveSPhotoCell';
import FiveSHowCell from '../../../shared/FiveSHowCell';

// Exact 12 Rows from the physical Furukawa Minda Electric JCR 5S Check Sheet (media_1794568718407_7e5e8cf1.png & media_1794568718402_e6959482.png)
export const JCR_FIVE_S_ITEMS = [
  // Row 1: 1S (SORT)
  {
    id: 'jcr_1',
    sr: '1',
    sType: '1 S (SORT)',
    sTypeSpan: 1,
    itemToCheck: 'M/C WORK AREA',
    bubbleText: 'REMOVE THE UNWANTED THING',
    photoKey: 'p1',
    what: 'REMOVE THE UNWANTED MATERIAL IN M/C PLACE',
    how: 'cloth',
    howLabel: 'CLOTH',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 2: 2S (SET)
  {
    id: 'jcr_2',
    sr: '2',
    sType: '2 S (SET)',
    sTypeSpan: 1,
    itemToCheck: 'M/C WORK AREA',
    bubbleText: 'SET IN ORDER',
    photoKey: 'p2',
    what: 'ARRANGE THE MATERIAL AND TOOL AS DEFINE LOCATION',
    how: 'visual',
    howLabel: 'VISUAL',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 3: 3S (SHINE) - Item 1
  {
    id: 'jcr_3',
    sr: '3',
    sType: '3 S (SHINE)',
    sTypeSpan: 8, // Spans rows 3 to 10
    itemToCheck: 'DANGER AND PVC SHEET',
    bubbleText: 'CLOTH',
    photoKey: 'p3',
    what: 'REMOVE THE DUST ON PVC',
    how: 'cloth',
    howLabel: 'CLOTH',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 4: 3S (SHINE) - Item 2
  {
    id: 'jcr_4',
    sr: '3',
    sType: null,
    itemToCheck: 'MOTOR, PNEUMATICS PIPE, SAFETY COVER, SCM UNIT',
    bubbleText: 'CLOTH',
    photoKey: 'p4',
    what: 'REMOVE THE DUST ON MOTOR',
    how: 'cloth',
    howLabel: 'CLOTH',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 5: 3S (SHINE) - Item 3
  {
    id: 'jcr_5',
    sr: '3',
    sType: null,
    itemToCheck: 'TERMINAL REEL STAND AND TERMINAL DEFLECTOR',
    bubbleText: 'CLOTH',
    photoKey: 'p5',
    what: 'REMOVE THE DUST ON TERMINAL GUIDE',
    how: 'cloth',
    howLabel: 'CLOTH',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 6: 3S (SHINE) - Item 4
  {
    id: 'jcr_6',
    sr: '3',
    sType: null,
    itemToCheck: 'CFM, APPLICATOR BASE PLATE',
    bubbleText: 'CLOTH',
    photoKey: 'p6',
    what: 'REMOVE THE DUST ON CFM GUIDE',
    how: 'cloth',
    howLabel: 'CLOTH',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 7: 3S (SHINE) - Item 5
  {
    id: 'jcr_7',
    sr: '4',
    sType: null,
    itemToCheck: 'TABLE, TOOL & FRONT WIRE STAND , CON BOX',
    bubbleText: 'CLOTH',
    photoKey: 'p7',
    what: 'DUST AND OIL REMOVE ON TABLE',
    how: 'cloth',
    howLabel: 'CLOTH',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 8: 3S (SHINE) - Item 6
  {
    id: 'jcr_8',
    sr: '4',
    sType: null,
    itemToCheck: 'PAPER, COLLECTOR BIN',
    bubbleText: 'CLOTH',
    photoKey: 'p8',
    what: 'DUST REMOVE IN PAPER COLLECTOR BIN',
    how: 'cloth',
    howLabel: 'CLOTH',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 9: 3S (SHINE) - Item 7
  {
    id: 'jcr_9',
    sr: '4',
    sType: null,
    itemToCheck: 'TERMINAL REEL',
    bubbleText: 'BROOM',
    photoKey: 'p9',
    what: 'DUST REMOVE IN TERMINAL RACK',
    how: 'broom',
    howLabel: 'BROOM',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 10: 3S (SHINE) - Item 8
  {
    id: 'jcr_10',
    sr: '4',
    sType: null,
    itemToCheck: 'APPLICATOR RACK AND BARREL HANDLE',
    bubbleText: 'CLOTH',
    photoKey: 'p10',
    what: 'REMOVE THE CHIPS AND PUT IN TERMINAL RACK',
    how: 'cloth',
    howLabel: 'CLOTH',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 11: 4S (STANDARDIZE)
  {
    id: 'jcr_11',
    sr: '4',
    sType: '4 S (STANDARDIZE)',
    sTypeSpan: 1,
    itemToCheck: 'WI, SOP, M/C 5S STANDARD',
    bubbleText: 'VISUALLY',
    photoKey: 'p11',
    what: 'SHOULD BE DISPLAY AT M/C AS PER DOCUMENT LIST',
    how: 'visual',
    howLabel: 'VISUAL',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  },

  // Row 12: 5S (SUSTAIN)
  {
    id: 'jcr_12',
    sr: '5',
    sType: '5 S (SUSTAIN)',
    sTypeSpan: 1,
    itemToCheck: '5S (SUSTAIN)',
    bubbleText: 'FILL PROPERLY',
    photoKey: 'p12',
    what: 'FILL THE CHECK SHEET AND FORMAT WITH THE HELP OF BLUE PENCIL PEN',
    how: 'pen',
    howLabel: 'PEN',
    who: 'MAIN OPERATOR',
    freq: ['SHIFT 1', 'SHIFT 2', 'SHIFT 3', '1ST DAY OF WEEK'],
    timeMin: '1 MIN',
    shifts: [
      { shift: 'A', when: '(06:40 - 15:10 PM)' },
      { shift: 'B', when: '(15:10 - 23:40 PM)' },
      { shift: 'C', when: '(23:40 - 06:40 AM)' }
    ]
  }
];

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);

function createEmptyGrid() {
  const grid = {};
  JCR_FIVE_S_ITEMS.forEach((it) => {
    grid[it.id] = {};
    for (let d = 1; d <= 31; d++) {
      grid[it.id][d] = {
        A: '',
        B: '',
        C: ''
      };
    }
  });
  return grid;
}

export default function FiveSChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'JCR 01';
  const storageKey = `jcr_5s_checksheet_${machineName}`;

  const [month, setMonth] = useState(() => {
    return localStorage.getItem(`${storageKey}_month`) || 'September 2026';
  });

  const [gridData, setGridData] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_grid`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return createEmptyGrid();
      }
    }
    return createEmptyGrid();
  });

  const [sharpEdges, setSharpEdges] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_sharp_edges`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    const obj = {};
    for (let d = 1; d <= 31; d++) {
      obj[d] = '';
    }
    return obj;
  });

  const [signatures, setSignatures] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_signatures`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    const obj = {
      opA: {},
      opB: {},
      opC: {},
      supA: {},
      supB: {},
      supC: {}
    };
    for (let d = 1; d <= 31; d++) {
      obj.opA[d] = '';
      obj.opB[d] = '';
      obj.opC[d] = '';
      obj.supA[d] = '';
      obj.supB[d] = '';
      obj.supC[d] = '';
    }
    return obj;
  });

  const [itemPhotos, setItemPhotos] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_photos`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const handleCellClick = (itemId, day, shift) => {
    setGridData((prev) => {
      const copy = { ...prev };
      if (!copy[itemId]) copy[itemId] = {};
      if (!copy[itemId][day]) copy[itemId][day] = {};

      const currentVal = copy[itemId][day][shift] || '';
      // Cycle: '' -> '/' -> '✓' -> ''
      const nextVal = currentVal === '' ? '/' : currentVal === '/' ? '✓' : '';
      copy[itemId][day] = {
        ...copy[itemId][day],
        [shift]: nextVal
      };

      try {
        localStorage.setItem(`${storageKey}_grid`, JSON.stringify(copy));
      } catch {
        // ignore
      }
      return copy;
    });
  };

  const handleSharpEdgeChange = (day, val) => {
    setSharpEdges((prev) => {
      const updated = { ...prev, [day]: val };
      try {
        localStorage.setItem(`${storageKey}_sharp_edges`, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleSignChange = (roleKey, day, val) => {
    setSignatures((prev) => {
      const updated = {
        ...prev,
        [roleKey]: {
          ...prev[roleKey],
          [day]: val
        }
      };
      try {
        localStorage.setItem(`${storageKey}_signatures`, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handlePhotoUpload = (itemId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setItemPhotos((prev) => {
          const updated = { ...prev, [itemId]: event.target.result };
          try {
            localStorage.setItem(`${storageKey}_photos`, JSON.stringify(updated));
          } catch {
            // ignore
          }
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (itemId) => {
    setItemPhotos((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      try {
        localStorage.setItem(`${storageKey}_photos`, JSON.stringify(copy));
      } catch {
        // ignore
      }
      return copy;
    });
  };

  const handleReset = () => {
    if (window.confirm('Reset all markings and values in this JCR 5S Check Sheet?')) {
      const empty = createEmptyGrid();
      setGridData(empty);
      localStorage.removeItem(`${storageKey}_grid`);
      localStorage.removeItem(`${storageKey}_sharp_edges`);
      localStorage.removeItem(`${storageKey}_signatures`);
      localStorage.removeItem(`${storageKey}_photos`);
      setItemPhotos({});
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-50 animate-fadeIn">
      {/* Top Floating Control Bar */}
      <div className="flex flex-wrap items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm gap-3 print:hidden">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-all shadow-sm"
              onClick={onClose}
              title="Back to Checksheets Menu"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          )}
          <div className="p-2 bg-sky-100 text-sky-600 rounded-lg shrink-0">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0 uppercase">
              FURUKAWA MINDA ELECTRIC PVT. LTD. — 5S CHECK POINT (M/C: JCR)
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              DOC NO: <strong className="text-slate-800">F-QA-15-01</strong> • REV: <strong className="text-slate-800">00</strong> • DATE: <strong className="text-slate-800">15.AUG. 2017</strong> • M/C: <strong className="text-slate-800">{machineName}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center p-2 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-200 border border-slate-300 text-slate-600 transition-colors cursor-pointer"
            onClick={handleReset}
            title="Reset values"
          >
            <RotateCcw size={15} />
          </button>
          {onClose && (
            <button
              type="button"
              className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-rose-100 border border-slate-200 hover:border-rose-300 text-rose-600 transition-colors cursor-pointer"
              onClick={onClose}
            >
              Close Checksheet
            </button>
          )}
        </div>
      </div>

      {/* Main Checksheet Sheet Container matching Screenshot */}
      <div className="bg-white border-2 border-black shadow-md rounded overflow-hidden">
        {/* Machine & Month Top Strip matching Screenshot 1 */}
        <div className="flex items-center justify-between border-b-2 border-black bg-white px-3.5 py-1">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-black text-black">M/C:</span>
            <span className="text-base sm:text-lg font-black text-black tracking-wide">
              JCR
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700">
            <span className="text-xs font-bold text-blue-700">MONTH :-</span>
            <input
              type="text"
              className="border-b border-blue-400 bg-transparent px-2 py-0.5 text-xs font-bold text-blue-800 outline-none w-36"
              placeholder="e.g. September 2026"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                localStorage.setItem(`${storageKey}_month`, e.target.value);
              }}
            />
          </div>
        </div>

        {/* Master 5S Table with Exact 12 Rows & Gridlines */}
        <div className="w-full overflow-x-auto">
          <table
            className="w-full border-collapse text-[10px] text-black bg-white min-w-[2150px]"
            style={{ border: '2px solid #000000', fontFamily: 'Arial, sans-serif' }}
          >
            <thead>
              <tr style={{ backgroundColor: '#ffffff' }}>
                <th
                  rowSpan={2}
                  className="py-1 px-1 text-center font-bold text-black border border-black"
                  style={{ width: '38px', minWidth: '35px' }}
                >
                  S.R.
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-1.5 text-center font-bold text-black border border-black"
                  style={{ width: '70px', minWidth: '65px' }}
                >
                  TYPES OF 5 S
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-2 text-center font-bold text-black border border-black"
                  style={{ width: '135px', minWidth: '130px' }}
                >
                  ITEMS TO BE CHECKED
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-1 text-center font-bold text-black border border-black"
                  style={{ width: '100px', minWidth: '95px' }}
                >
                  PHOTO
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-2 text-center font-bold text-black border border-black"
                  style={{ width: '155px', minWidth: '150px' }}
                >
                  WHAT
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-1 text-center font-bold text-black border border-black"
                  style={{ width: '60px', minWidth: '55px' }}
                >
                  HOW
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-1 text-center font-bold text-black border border-black"
                  style={{ width: '75px', minWidth: '70px' }}
                >
                  WHO
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-1 text-center font-bold text-black border border-black"
                  style={{ width: '75px', minWidth: '70px' }}
                >
                  FREQ
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-1 text-center font-bold text-black border border-black"
                  style={{ width: '45px', minWidth: '40px' }}
                >
                  TIME<br />[min]
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-1 text-center font-bold text-black border border-black"
                  style={{ width: '32px', minWidth: '30px' }}
                >
                  SHIFT
                </th>
                <th
                  rowSpan={2}
                  className="py-1 px-1.5 text-center font-bold text-black border border-black"
                  style={{ width: '95px', minWidth: '90px' }}
                >
                  WHEN
                </th>
                <th
                  colSpan={31}
                  className="py-1 px-2 text-center font-bold text-black border border-black"
                >
                  DATE
                </th>
              </tr>

              {/* Days 1 to 31 Header */}
              <tr style={{ backgroundColor: '#ffffff' }}>
                {DAYS_31.map((d) => (
                  <th
                    key={d}
                    className="py-0.5 text-center font-bold text-black border border-black"
                    style={{ width: '28px', minWidth: '26px', fontSize: '10px' }}
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {JCR_FIVE_S_ITEMS.map((item, idx) => {
                const sTypeSpan = item.sTypeSpan || 1;
                const isFirstOfSType = item.sType !== null;

                return (
                  <React.Fragment key={item.id}>
                    {/* Shift A Row */}
                    <tr className="hover:bg-blue-50/20">
                      {/* 1. S.R. */}
                      <td
                        rowSpan={3}
                        className="py-1 px-1 text-center font-bold text-black border border-black align-middle"
                      >
                        {item.sr}
                      </td>

                      {/* 2. TYPES OF 5 S (merged across rows if applicable) */}
                      {isFirstOfSType && (
                        <td
                          rowSpan={sTypeSpan * 3}
                          className="py-1 px-1.5 text-center font-black text-black border border-black align-middle bg-slate-50/50"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          <div className="py-2 text-[11px] font-black tracking-wide">
                            {item.sType}
                          </div>
                        </td>
                      )}

                      {/* 3. ITEMS TO BE CHECKED */}
                      <td
                        rowSpan={3}
                        className="py-1 px-2 text-left font-bold text-black border border-black align-middle text-[10px] leading-tight"
                      >
                        {item.itemToCheck}
                      </td>

                      {/* 4. PHOTO */}
                      <td
                        rowSpan={3}
                        className="p-1 border border-black align-middle bg-white"
                      >
                        <FiveSPhotoCell
                          item={{
                            sNo: item.sr,
                            location: item.itemToCheck,
                            what: item.what,
                            bubbleText: item.bubbleText,
                            how: item.how
                          }}
                          uploadedPhoto={itemPhotos[item.id]}
                          onPhotoUpload={(e) => handlePhotoUpload(item.id, e)}
                          onRemovePhoto={() => handleRemovePhoto(item.id)}
                        />
                      </td>

                      {/* 5. WHAT */}
                      <td
                        rowSpan={3}
                        className="py-1 px-2 text-left font-bold text-black border border-black align-middle text-[9.5px] leading-snug"
                      >
                        {item.what}
                      </td>

                      {/* 6. HOW */}
                      <td
                        rowSpan={3}
                        className="p-1 text-center border border-black align-middle bg-white"
                      >
                        <FiveSHowCell
                          item={{ how: item.how }}
                          uploadedPhoto={null}
                        />
                      </td>

                      {/* 7. WHO */}
                      <td
                        rowSpan={3}
                        className="py-1 px-1 text-center font-bold text-black border border-black align-middle text-[9px] leading-tight"
                      >
                        {item.who}
                      </td>

                      {/* 8. FREQ */}
                      <td
                        rowSpan={3}
                        className="py-1 px-1 text-center font-semibold text-black border border-black align-middle text-[8.5px] leading-tight"
                      >
                        {item.freq.map((line, li) => (
                          <div key={li}>{line}</div>
                        ))}
                      </td>

                      {/* 9. TIME [min] */}
                      <td
                        rowSpan={3}
                        className="py-1 px-1 text-center font-bold text-black border border-black align-middle text-[9.5px]"
                      >
                        {item.timeMin}
                      </td>

                      {/* 10. SHIFT A */}
                      <td
                        className="py-0.5 px-0.5 text-center font-bold text-black border border-black bg-slate-50/50"
                        style={{ height: '22px' }}
                      >
                        A
                      </td>

                      {/* 11. WHEN A */}
                      <td
                        className="py-0.5 px-1 text-center font-semibold text-black border border-black text-[8px] whitespace-nowrap bg-slate-50/50"
                      >
                        {item.shifts[0].when}
                      </td>

                      {/* 12. DAYS 1..31 for Shift A */}
                      {DAYS_31.map((d) => {
                        const val = gridData[item.id]?.[d]?.A || '';
                        return (
                          <td
                            key={`A_${d}`}
                            className="p-0 text-center font-black border border-black cursor-pointer hover:bg-blue-100/50 transition-colors select-none text-[10px]"
                            onClick={() => handleCellClick(item.id, d, 'A')}
                            title={`Click to mark Day ${d} Shift A`}
                          >
                            <span className={val === '✓' ? 'text-emerald-700' : 'text-slate-800'}>
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Shift B Row */}
                    <tr className="hover:bg-blue-50/20">
                      <td
                        className="py-0.5 px-0.5 text-center font-bold text-black border border-black bg-slate-50/50"
                        style={{ height: '22px' }}
                      >
                        B
                      </td>
                      <td
                        className="py-0.5 px-1 text-center font-semibold text-black border border-black text-[8px] whitespace-nowrap bg-slate-50/50"
                      >
                        {item.shifts[1].when}
                      </td>
                      {DAYS_31.map((d) => {
                        const val = gridData[item.id]?.[d]?.B || '';
                        return (
                          <td
                            key={`B_${d}`}
                            className="p-0 text-center font-black border border-black cursor-pointer hover:bg-blue-100/50 transition-colors select-none text-[10px]"
                            onClick={() => handleCellClick(item.id, d, 'B')}
                            title={`Click to mark Day ${d} Shift B`}
                          >
                            <span className={val === '✓' ? 'text-emerald-700' : 'text-slate-800'}>
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Shift C Row */}
                    <tr className="hover:bg-blue-50/20">
                      <td
                        className="py-0.5 px-0.5 text-center font-bold text-black border border-black bg-slate-50/50"
                        style={{ height: '22px' }}
                      >
                        C
                      </td>
                      <td
                        className="py-0.5 px-1 text-center font-semibold text-black border border-black text-[8px] whitespace-nowrap bg-slate-50/50"
                      >
                        {item.shifts[2].when}
                      </td>
                      {DAYS_31.map((d) => {
                        const val = gridData[item.id]?.[d]?.C || '';
                        return (
                          <td
                            key={`C_${d}`}
                            className="p-0 text-center font-black border border-black cursor-pointer hover:bg-blue-100/50 transition-colors select-none text-[10px]"
                            onClick={() => handleCellClick(item.id, d, 'C')}
                            title={`Click to mark Day ${d} Shift C`}
                          >
                            <span className={val === '✓' ? 'text-emerald-700' : 'text-slate-800'}>
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}

              {/* Row 13: CHECK SHARP EDGES ON M/C */}
              <tr style={{ backgroundColor: '#ffffff' }}>
                <td
                  colSpan={11}
                  className="py-1 px-3 text-center font-black text-black border border-black text-[11px] tracking-wide"
                >
                  CHECK SHARP EDGES ON M/C
                </td>
                {DAYS_31.map((d) => (
                  <td
                    key={`sharp_${d}`}
                    className="p-0 border border-black text-center"
                  >
                    <input
                      type="text"
                      className="w-full h-6 text-center text-[9px] font-bold text-black bg-transparent border-0 outline-none hover:bg-blue-50"
                      value={sharpEdges[d] || ''}
                      onChange={(e) => handleSharpEdgeChange(d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>

              {/* Row 14: Time Taken:15 min & Operator Signature Rows */}
              <tr style={{ backgroundColor: '#ffffff' }}>
                <td
                  rowSpan={6}
                  colSpan={9}
                  className="py-1 px-3 text-left font-bold text-black border border-black align-top text-[10px]"
                >
                  Time Taken:15 min
                </td>
                <td
                  rowSpan={3}
                  className="py-1 px-1 text-center font-bold text-black border border-black align-middle text-[9px]"
                >
                  OPERATOR<br />SIGN.
                </td>
                <td className="py-0.5 px-1 text-center font-bold text-black border border-black text-[8px] bg-slate-50/50">
                  A
                </td>
                {DAYS_31.map((d) => (
                  <td key={`opA_${d}`} className="p-0 border border-black text-center">
                    <input
                      type="text"
                      className="w-full h-5 text-center text-[8px] font-medium text-black bg-transparent border-0 outline-none"
                      value={signatures.opA[d] || ''}
                      onChange={(e) => handleSignChange('opA', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>

              <tr style={{ backgroundColor: '#ffffff' }}>
                <td className="py-0.5 px-1 text-center font-bold text-black border border-black text-[8px] bg-slate-50/50">
                  B
                </td>
                {DAYS_31.map((d) => (
                  <td key={`opB_${d}`} className="p-0 border border-black text-center">
                    <input
                      type="text"
                      className="w-full h-5 text-center text-[8px] font-medium text-black bg-transparent border-0 outline-none"
                      value={signatures.opB[d] || ''}
                      onChange={(e) => handleSignChange('opB', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>

              <tr style={{ backgroundColor: '#ffffff' }}>
                <td className="py-0.5 px-1 text-center font-bold text-black border border-black text-[8px] bg-slate-50/50">
                  C
                </td>
                {DAYS_31.map((d) => (
                  <td key={`opC_${d}`} className="p-0 border border-black text-center">
                    <input
                      type="text"
                      className="w-full h-5 text-center text-[8px] font-medium text-black bg-transparent border-0 outline-none"
                      value={signatures.opC[d] || ''}
                      onChange={(e) => handleSignChange('opC', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>

              {/* Row 15: Supervisor Signature Rows */}
              <tr style={{ backgroundColor: '#ffffff' }}>
                <td
                  rowSpan={3}
                  className="py-1 px-1 text-center font-bold text-black border border-black align-middle text-[9px]"
                >
                  SUPERVISOR<br />SIGN.
                </td>
                <td className="py-0.5 px-1 text-center font-bold text-black border border-black text-[8px] bg-slate-50/50">
                  A
                </td>
                {DAYS_31.map((d) => (
                  <td key={`supA_${d}`} className="p-0 border border-black text-center">
                    <input
                      type="text"
                      className="w-full h-5 text-center text-[8px] font-medium text-black bg-transparent border-0 outline-none"
                      value={signatures.supA[d] || ''}
                      onChange={(e) => handleSignChange('supA', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>

              <tr style={{ backgroundColor: '#ffffff' }}>
                <td className="py-0.5 px-1 text-center font-bold text-black border border-black text-[8px] bg-slate-50/50">
                  B
                </td>
                {DAYS_31.map((d) => (
                  <td key={`supB_${d}`} className="p-0 border border-black text-center">
                    <input
                      type="text"
                      className="w-full h-5 text-center text-[8px] font-medium text-black bg-transparent border-0 outline-none"
                      value={signatures.supB[d] || ''}
                      onChange={(e) => handleSignChange('supB', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>

              <tr style={{ backgroundColor: '#ffffff' }}>
                <td className="py-0.5 px-1 text-center font-bold text-black border border-black text-[8px] bg-slate-50/50">
                  C
                </td>
                {DAYS_31.map((d) => (
                  <td key={`supC_${d}`} className="p-0 border border-black text-center">
                    <input
                      type="text"
                      className="w-full h-5 text-center text-[8px] font-medium text-black bg-transparent border-0 outline-none"
                      value={signatures.supC[d] || ''}
                      onChange={(e) => handleSignChange('supC', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            </tbody>

            {/* Bottom Document Codes Footer matching Screenshot 2 */}
            <tfoot>
              <tr style={{ backgroundColor: '#ffffff' }}>
                <td
                  colSpan={9}
                  className="py-1 px-3 text-left font-bold text-[9px] text-black border border-black"
                >
                  DOC NO. : F-QA-15-01
                </td>
                <td
                  colSpan={11}
                  className="py-1 px-2 text-center font-bold text-[9px] text-black border border-black"
                >
                  REV. NO. : 00
                </td>
                <td
                  colSpan={22}
                  className="py-1 px-3 text-right font-bold text-[9px] text-black border border-black"
                >
                  REV. DATE : 15.AUG. 2017
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
