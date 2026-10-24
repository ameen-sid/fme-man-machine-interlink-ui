import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import React, { useState } from 'react';
import { ClipboardCheck, Printer, Save, RotateCcw, Camera, Trash2, Eye } from 'lucide-react';

// Exact rows from the physical Furukawa Minda Electric 5S Weekly Check Sheet
const INITIAL_FIVE_S_WEEKLY_ITEMS = [
  {
    id: 'sn_1',
    sn: '1',
    sType: '1 S (SORT)',
    sTypeSpan: 1,
    itemToClean: 'APPLICATOR RACK',
    photoKey: 'p1',
    photoLabel: 'Applicator on Worktable',
    what: 'REMOVE THE UNWANTED MATERIAL ON MACHINE',
    howType: 'cloth',
    who: 'MAIN OPERATOR',
    freq: 'WEEKLY',
    method: 'CLEAN THE RACK WITH AIR PRASSURE',
    timeMin: '3 MIN',
    timeSpan: 2,
    disabledWeeks: []
  },
  {
    id: 'sn_2',
    sn: '2',
    sType: '2 S (SET)',
    sTypeSpan: 1,
    itemToClean: 'APPLICATOR RACK',
    photoKey: 'p2',
    photoLabel: 'Tiered Applicator Rack',
    what: 'REMOVE THE DUST ON MOTOR',
    howType: 'cloth',
    who: 'MAIN OPERATOR',
    freq: 'WEEKLY',
    method: 'LOCATION WISE APPLICATOR VERIFY',
    timeMin: null, // Merged with sn_1
    disabledWeeks: []
  },
  {
    id: 'sn_3_1',
    sn: '3.1',
    sType: '3 S (SHINE)',
    sTypeSpan: 4,
    itemToClean: 'DISPLAY PIPE',
    photoKey: 'p3_1',
    photoLabel: 'Wiping Display Pipe',
    what: 'REMOVE THE DUST ON DISPLAY PIPE',
    howType: 'cloth',
    who: 'MAIN OPERATOR',
    freq: 'WEEKLY',
    method: 'REMOVE THE DUST BY CLOTH',
    timeMin: '1 MIN',
    timeSpan: 1,
    disabledWeeks: [3, 5] // Greyed out in weeks 3 and 5
  },
  {
    id: 'sn_3_2',
    sn: '3.2',
    sType: null,
    itemToClean: 'BIN',
    photoKey: 'p3_2',
    photoLabel: 'Scrap Bin with CFM Cables',
    what: 'REMOVE THE DUST ON CFM GUIDE',
    howType: 'cloth',
    who: 'MAIN OPERATOR',
    freq: 'WEEKLY',
    method: 'CLEAN THE BIN WITH THE HELP OF WASHING CLOTH',
    timeMin: '15',
    timeSpan: 1,
    disabledWeeks: [1, 3, 5] // Greyed out in weeks 1, 3, 5
  },
  {
    id: 'sn_3_3',
    sn: '3.3',
    sType: null,
    itemToClean: 'DISPLAY BOARD',
    photoKey: 'p3_3',
    photoLabel: 'Green Production Display Board',
    what: 'DUST AND PVC REMOVE ON TABLE',
    howType: 'cloth',
    who: 'MAIN OPERATOR',
    freq: 'WEEKLY',
    method: 'CLEAN AND STRAIGHT OF DISPLAY BOARD',
    timeMin: '10',
    timeSpan: 2,
    disabledWeeks: []
  },
  {
    id: 'sn_3_4',
    sn: '3.4',
    sType: null,
    itemToClean: 'TERMINAL RACK',
    photoKey: 'p3_4',
    photoLabel: 'Multi-Level Wire / Terminal Rack',
    what: 'DUST REMOVE IN PAPER COLLECTOR BIN',
    howType: 'cloth',
    who: 'MAIN OPERATOR',
    freq: 'WEEKLY',
    method: 'CLIP FIX AND RACK CLEAN',
    timeMin: null, // Merged with sn_3_3
    disabledWeeks: []
  },
  {
    id: 'sn_4',
    sn: '4',
    sType: '4 S (STANDARDIZATION)',
    sTypeSpan: 1,
    itemToClean: 'WI , OSM ,AND M/C STANDARD',
    photoKey: 'p4',
    photoLabel: 'Work Instructions & SOP Board',
    what: 'SHOULD BE DISPLAY AT M/C AS PER DOCUMENT LIST',
    howType: 'eye',
    who: 'MAIN OPERATOR',
    freq: 'WEEKLY',
    method: 'VISUALLY',
    timeMin: '',
    timeSpan: 1,
    disabledWeeks: [1, 3, 5] // Greyed out in weeks 1, 3, 5
  },
  {
    id: 'sn_5',
    sn: '5',
    sType: '5 S (SUSTAIN)',
    sTypeSpan: 1,
    itemToClean: 'CHECK SHEET AND FORMAT',
    photoKey: 'p5',
    photoLabel: 'Filling Check Sheet with Pen',
    what: 'FILL THE CHECK SHEET AND FORMAT WITH THE HELP OF BLUE BLACK PEN',
    howType: 'pen',
    who: 'MAIN OPERATOR',
    freq: 'WEEKLY',
    method: 'VISUALLY',
    timeMin: '',
    timeSpan: 1,
    disabledWeeks: []
  }
];

const WEEKS = [1, 2, 3, 4, 5];

export default function FiveSChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'MCR';
  const modelName = machine?.model || 'Mecal-05';
  const displayMachine = `MANUAL CRIMPING (${machineName})`;

  const [month, setMonth] = useState('OCTOBER 2026');

  // Weekly check grid: { [itemId]: { 1: 'O', 2: 'O', ... } }
  const [weeklyGrid, setWeeklyGrid] = useState(() => {
    const initial = {};
    INITIAL_FIVE_S_WEEKLY_ITEMS.forEach((item) => {
      initial[item.id] = {};
      WEEKS.forEach((w) => {
        initial[item.id][w] = item.disabledWeeks.includes(w) ? '' : '';
      });
    });
    return initial;
  });

  // Uploaded photo storage for PHOTO column
  const [photos, setPhotos] = useState({});

  // Uploaded photo storage for HOW column
  const [howPhotos, setHowPhotos] = useState({});

  // Signatures
  const [operatorSigns, setOperatorSigns] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });

  const [supervisorSigns, setSupervisorSigns] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });

  const [savedToast, setSavedToast] = useState('');

  const handleCellClick = (itemId, week, isDisabled) => {
    if (isDisabled) return;
    setWeeklyGrid((prev) => {
      const current = prev[itemId]?.[week] || '';
      let next = 'O';
      if (current === 'O') next = 'X';
      else if (current === 'X') next = '';
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          [week]: next
        }
      };
    });
  };

  const handleCellInput = (itemId, week, val, isDisabled) => {
    if (isDisabled) return;
    const clean = val.toUpperCase().trim();
    if (clean === 'O' || clean === 'X' || clean === '') {
      setWeeklyGrid((prev) => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          [week]: clean
        }
      }));
    }
  };

  const handlePhotoUpload = (key, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotos((prev) => ({
          ...prev,
          [key]: event.target?.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (key) => {
    setPhotos((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleHowPhotoUpload = (itemId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setHowPhotos((prev) => ({
          ...prev,
          [itemId]: event.target?.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveHowPhoto = (itemId) => {
    setHowPhotos((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const handleReset = () => {
    if (window.confirm('Reset all values and uploaded photos in the 5S Weekly Check Sheet?')) {
      const reset = {};
      INITIAL_FIVE_S_WEEKLY_ITEMS.forEach((item) => {
        reset[item.id] = {};
        WEEKS.forEach((w) => {
          reset[item.id][w] = '';
        });
      });
      setWeeklyGrid(reset);
      setPhotos({});
      setHowPhotos({});
      setOperatorSigns({ 1: '', 2: '', 3: '', 4: '', 5: '' });
      setSupervisorSigns({ 1: '', 2: '', 3: '', 4: '', 5: '' });
      setSavedToast('5S Weekly Checksheet reset successfully');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleSave = () => {
    setSavedToast('5S Weekly Checksheet saved successfully!');
    setTimeout(() => setSavedToast(''), 3000);
  };

  // Helper to render realistic item photo cards matching screenshot
  const renderItemPhotoCard = (item) => {
    const customPhoto = photos[item.photoKey];
    if (customPhoto) {
      return (
        <div className="w-full h-full relative group">
          <img
            src={customPhoto}
            alt={item.what}
            className="w-full h-full object-cover block"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemovePhoto(item.photoKey);
            }}
            title="Remove photo"
          >
            <Trash2 size={11} />
          </button>
        </div>
      );
    }

    // Default visual illustration cards matching the physical sheet photos
    switch (item.photoKey) {
      case 'p1':
        return (
          <div className="w-full h-full bg-slate-900 flex flex-col justify-between items-center p-1 text-[9px] font-bold text-white relative overflow-hidden">
            <div className="text-[8px] font-black text-amber-300 tracking-wider">APPLICATOR WORKBENCH</div>
            <div className="flex items-center gap-1.5 my-1">
              <div className="w-6 h-6 bg-slate-700 border border-slate-500 rounded-sm flex items-center justify-center text-[10px]">
                ⚙️
              </div>
              <div className="w-4 h-4 bg-red-700/80 rounded-sm flex items-center justify-center text-[9px]">
                🔧
              </div>
            </div>
            <div className="text-[7.5px] text-slate-300">Operator Table Clean</div>
          </div>
        );
      case 'p2':
        return (
          <div className="w-full h-full bg-slate-800 flex flex-col justify-between items-center p-1 text-[9px] font-bold text-white relative">
            <div className="text-[8px] font-black text-sky-300">APPLICATOR RACK</div>
            <div className="flex flex-col gap-0.5 w-full px-2">
              <div className="h-1.5 bg-blue-400 rounded-xs"></div>
              <div className="h-1.5 bg-blue-500 rounded-xs"></div>
              <div className="h-1.5 bg-blue-600 rounded-xs"></div>
            </div>
            <div className="text-[7.5px] text-slate-300">Tier Storage Unit</div>
          </div>
        );
      case 'p3_1':
        return (
          <div className="w-full h-full bg-amber-50 flex flex-col justify-between items-center p-1 text-slate-800">
            <div className="text-[8px] font-black text-slate-900">DISPLAY PIPE</div>
            <div className="w-12 h-2.5 bg-white border border-slate-400 rounded-full flex items-center justify-end px-1">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            </div>
            <div className="text-[7.5px] text-slate-500">Wipe with Cloth</div>
          </div>
        );
      case 'p3_2':
        return (
          <div className="w-full h-full bg-sky-50 flex flex-col justify-between items-center p-1 text-slate-800">
            <div className="text-[8px] font-black text-blue-900">CFM GUIDE & BIN</div>
            <div className="w-7 h-6 bg-white border-2 border-slate-400 rounded-sm flex items-center justify-center text-xs">
              🗑️
            </div>
            <div className="text-[7.5px] text-slate-600">Clean Waste Bin</div>
          </div>
        );
      case 'p3_3':
        return (
          <div className="w-full h-full bg-emerald-700 flex flex-col justify-between items-center p-1 text-white">
            <div className="text-[7.5px] font-black bg-white text-emerald-900 px-1 rounded-2xs">FME STATUS</div>
            <div className="text-[8px] font-mono font-bold text-yellow-300">C&C HOURLY OUTPUT</div>
            <div className="text-[7.5px] text-emerald-200">Straight & Clean</div>
          </div>
        );
      case 'p3_4':
        return (
          <div className="w-full h-full bg-slate-100 flex flex-col justify-between items-center p-1 text-slate-800">
            <div className="text-[8px] font-black text-slate-900">TERMINAL RACK</div>
            <div className="flex flex-col gap-0.5 w-10">
              <div className="h-1 bg-amber-500 rounded-full"></div>
              <div className="h-1 bg-amber-600 rounded-full"></div>
              <div className="h-1 bg-amber-700 rounded-full"></div>
            </div>
            <div className="text-[7.5px] text-slate-500">Reel Guide Track</div>
          </div>
        );
      case 'p4':
        return (
          <div className="w-full h-full bg-slate-50 flex flex-col justify-between items-center p-1 text-slate-900">
            <div className="text-[8px] font-black text-indigo-900">WI & OSM STANDARDS</div>
            <div className="flex gap-1">
              <div className="w-4 h-5 bg-white border border-slate-300 shadow-2xs"></div>
              <div className="w-4 h-5 bg-white border border-slate-300 shadow-2xs"></div>
            </div>
            <div className="text-[7.5px] text-slate-600">Displayed at Station</div>
          </div>
        );
      case 'p5':
        return (
          <div className="w-full h-full bg-slate-100 flex flex-col justify-between items-center p-1 text-slate-900">
            <div className="text-[8px] font-black text-slate-900">CHECK SHEET</div>
            <div className="w-7 h-5 bg-white border border-slate-400 p-0.5 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-blue-600"></div>
              <div className="w-full h-0.5 bg-blue-600"></div>
            </div>
            <div className="text-[7.5px] text-slate-600">Fill with Pen</div>
          </div>
        );
      default:
        return <div className="text-[8px] text-slate-400">{item.itemToClean}</div>;
    }
  };

  // Helper to render the HOW method column (Cloth, Eye, or Pen)
  const renderHowContent = (item) => {
    const customHow = howPhotos[item.id];
    if (customHow) {
      return (
        <div className="w-full h-full relative group">
          <img
            src={customHow}
            alt={`How - ${item.what}`}
            className="w-full h-full object-cover block"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemoveHowPhoto(item.id);
            }}
            title="Remove HOW photo"
          >
            <Trash2 size={11} />
          </button>
        </div>
      );
    }

    if (item.howType === 'eye') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-1">
          <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white shadow-2xs">
            <Eye size={18} className="text-black" />
          </div>
          <span className="text-[8px] font-black mt-1 uppercase tracking-tight">VISUALLY</span>
        </div>
      );
    }
    if (item.howType === 'pen') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-1">
          <div className="w-7 h-10 border-2 border-black rounded-sm flex flex-col items-center justify-center bg-white shadow-2xs">
            <div className="w-2 h-4 bg-black rounded-t-xs"></div>
            <div className="w-1.5 h-3 bg-blue-700"></div>
            <div className="w-0.5 h-1 bg-amber-500"></div>
          </div>
          <span className="text-[8px] font-black mt-1 uppercase tracking-tight">PEN</span>
        </div>
      );
    }
    // Default: Cleaning Cloth
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-1">
        <div className="w-7 h-10 border-2 border-black rounded-xs flex flex-col items-center justify-between p-0.5 bg-yellow-100 shadow-2xs">
          <div className="w-3 h-0.5 bg-slate-400"></div>
          <div className="w-5 h-6 bg-yellow-400 border border-amber-600 rounded-xs flex items-center justify-center text-[10px]">
            🧹
          </div>
          <div className="w-4 h-0.5 bg-amber-500"></div>
        </div>
        <span className="text-[8px] font-black mt-1 uppercase tracking-tight">CLOTH</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900">
      <ChecksheetHeaderNav
        title="5S CHECK POINTS (WEEKLY)"
        subtitle={`${displayMachine} — Sort, Set, Shine, Standardization & Sustain Weekly Sheet`}
        icon={ClipboardCheck}
        iconBgClass="bg-blue-100 text-blue-700"
        onClose={onClose}
        onReset={handleReset}
        onSave={handleSave}
        savedToast={savedToast}
        extraActions={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            onClick={() => window.print()}
            title="Print 5S Sheet"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
        }
      />

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between">
          <span>✓ {savedToast}</span>
          <button
            type="button"
            className="text-emerald-700 font-bold hover:underline"
            onClick={() => setSavedToast('')}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Printable Table Container - 100% Width */}
      <div className="w-full bg-white border-2 border-black p-3 sm:p-4 shadow-xl rounded-sm overflow-x-auto print:p-0 print:border-none print:shadow-none">
        <div className="w-full min-w-[1100px] select-text">
          {/* Top Title Bar matching physical sheet */}
          <div className="w-full bg-[#d9d9d9] border-2 border-black py-2.5 px-4 text-center">
            <h1 className="text-xl font-black text-black m-0 tracking-wider uppercase font-sans">
              5S CHECK POINTS (WEEKLY)
            </h1>
          </div>

          {/* Subheader: Machine Name on left, Month on right */}
          <div className="w-full border-2 border-black border-t-0 flex items-center justify-between px-4 py-2 bg-white text-xs font-black">
            <div className="flex items-center gap-2">
              <span className="uppercase text-slate-900 font-extrabold text-[13px]">
                M/C: {displayMachine}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="uppercase text-slate-900 font-extrabold text-[13px]">
                MONTH:
              </span>
              <input
                type="text"
                className="font-bold text-xs border border-slate-300 rounded px-2.5 py-1 outline-none focus:border-black uppercase w-40 text-center"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
          </div>

          {/* Main 5S Table - 100% Width */}
          <table className="w-full border-collapse border-2 border-black text-center text-xs">
            <thead>
              <tr className="bg-white text-black font-extrabold text-[11px]">
                <th className="border-2 border-black py-2 px-1 w-[3.5%]">S.N.</th>
                <th className="border-2 border-black py-2 px-1 w-[8.5%]">5 S TYPE</th>
                <th className="border-2 border-black py-2 px-2 w-[11.5%]">ITEMS TO BE CLEANED</th>
                <th className="border-2 border-black py-2 px-1 w-[12%]">PHOTO</th>
                <th className="border-2 border-black py-2 px-2.5 w-[19.5%] text-left">WHAT</th>
                <th className="border-2 border-black py-2 px-1 w-[8%]">HOW</th>
                <th className="border-2 border-black py-2 px-1 w-[8%]">WHO</th>
                <th className="border-2 border-black py-2 px-1 w-[6%]">FREQ</th>
                <th className="border-2 border-black py-2 px-2 w-[14.5%] text-left">METHOD</th>
                <th className="border-2 border-black py-2 px-1 w-[5%]">TIME (min)</th>
                <th colSpan={5} className="border-2 border-black py-1 px-1 bg-white w-[15%]">
                  <div className="font-black text-[11px] pb-1 uppercase border-b border-black">
                    WEEKLY
                  </div>
                  <div className="grid grid-cols-5 text-[10.5px] font-extrabold pt-1">
                    <span>WEEK-1</span>
                    <span>WEEK-2</span>
                    <span>WEEK-3</span>
                    <span>WEEK-4</span>
                    <span>WEEK-5</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_FIVE_S_WEEKLY_ITEMS.map((item) => {
                return (
                  <tr key={item.id} className="h-20 hover:bg-slate-50/50 transition-colors">
                    {/* S.N. */}
                    <td className="border-2 border-black font-extrabold text-sm p-1">
                      {item.sn}
                    </td>

                    {/* 5 S TYPE (grouped with rowspan) */}
                    {item.sType && (
                      <td
                        rowSpan={item.sTypeSpan || 1}
                        className="border-2 border-black font-black text-xs p-1 uppercase bg-white tracking-wider text-black overflow-hidden"
                      >
                        <div className="flex flex-col items-center justify-center font-black leading-tight text-center break-words max-w-full">
                          {item.sType.includes('(') ? (
                            <>
                              <span className="text-[11px] font-black">{item.sType.split('(')[0].trim()}</span>
                              <span className="text-[8.5px] font-extrabold tracking-tight">({item.sType.split('(')[1]}</span>
                            </>
                          ) : (
                            item.sType
                          )}
                        </div>
                      </td>
                    )}

                    {/* ITEMS TO BE CLEANED */}
                    <td className="border-2 border-black font-black text-xs p-2 uppercase text-black leading-tight">
                      {item.itemToClean}
                    </td>

                    {/* PHOTO (with red border and photo upload support) */}
                    <td className="border-2 border-black p-1.5 align-middle">
                      <div className="w-[110px] max-w-full h-[75px] mx-auto border-2 border-red-500 rounded-2xs overflow-hidden relative group cursor-pointer bg-slate-100 shadow-2xs">
                        <label className="w-full h-full block cursor-pointer" title="Click to upload/change photo">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handlePhotoUpload(item.photoKey, e)}
                          />
                          {renderItemPhotoCard(item)}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] font-bold text-white transition-opacity">
                            <Camera size={11} className="mr-0.5" /> Photo
                          </div>
                        </label>
                      </div>
                    </td>

                    {/* WHAT */}
                    <td className="border-2 border-black font-black text-[11px] p-2 text-left uppercase leading-snug text-black">
                      {item.what}
                    </td>

                    {/* HOW (with red border and photo upload support) */}
                    <td className="border-2 border-black p-1.5 align-middle">
                      <div className="w-[64px] max-w-full h-[75px] mx-auto border-2 border-red-500 rounded-2xs overflow-hidden relative group cursor-pointer bg-white shadow-2xs">
                        <label className="w-full h-full block cursor-pointer" title="Click to upload/change HOW method photo">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleHowPhotoUpload(item.id, e)}
                          />
                          {renderHowContent(item)}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
                            <Camera size={10} className="mr-0.5" /> Photo
                          </div>
                        </label>
                      </div>
                    </td>

                    {/* WHO */}
                    <td className="border-2 border-black font-extrabold text-[10.5px] p-1 uppercase">
                      {item.who}
                    </td>

                    {/* FREQ */}
                    <td className="border-2 border-black font-extrabold text-[10.5px] p-1 uppercase">
                      {item.freq}
                    </td>

                    {/* METHOD */}
                    <td className="border-2 border-black font-black text-[11px] p-2 text-left uppercase leading-snug">
                      {item.method}
                    </td>

                    {/* TIME (min) with rowspan */}
                    {item.timeMin !== null && (
                      <td
                        rowSpan={item.timeSpan || 1}
                        className="border-2 border-black font-black text-xs p-1 bg-white"
                      >
                        {item.timeMin}
                      </td>
                    )}

                    {/* 5 WEEKS CHECK CELLS */}
                    {WEEKS.map((w) => {
                      const isDisabled = item.disabledWeeks.includes(w);
                      const val = weeklyGrid[item.id]?.[w] || '';
                      if (isDisabled) {
                        return (
                          <td
                            key={w}
                            className="border-2 border-black bg-[#9ca3af] p-0"
                            title="Not scheduled for this week"
                          />
                        );
                      }
                      return (
                        <td
                          key={w}
                          className="border-2 border-black p-0 cursor-pointer hover:bg-blue-50/70 transition-colors"
                          onClick={() => handleCellClick(item.id, w, false)}
                          title={`Week ${w}: Click to toggle [O] OK / [X] NG`}
                        >
                          <input
                            type="text"
                            maxLength={1}
                            className={`w-full h-full text-center font-black text-lg outline-none cursor-pointer bg-transparent border-none ${
                              val === 'O' ? 'text-emerald-700' : val === 'X' ? 'text-rose-600' : 'text-transparent'
                            }`}
                            value={val}
                            onChange={(e) => handleCellInput(item.id, w, e.target.value, false)}
                            placeholder=""
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Bottom Row 1: Time Taken & Weekly Score */}
              <tr className="h-10 bg-white font-black text-xs">
                <td colSpan={10} className="border-2 border-black text-left px-3 text-[11px] uppercase tracking-wide">
                  <div className="flex items-center justify-between">
                    <span>TIME TAKEN: 28 MINT</span>
                    <span className="text-slate-500 font-bold text-[10px]">
                      (Standard Weekly 5S Cycle Time)
                    </span>
                  </div>
                </td>
                <td className="border-2 border-black p-1 text-center font-black text-xs">0</td>
                <td className="border-2 border-black p-1 text-center font-black text-xs">20</td>
                <td className="border-2 border-black p-1 text-center font-black text-xs">0</td>
                <td className="border-2 border-black p-1 text-center font-black text-xs">20</td>
                <td className="border-2 border-black p-1 text-center font-black text-xs">0</td>
              </tr>

              {/* Bottom Row 2: Legend & Operator Signature */}
              <tr className="h-10 bg-white font-black text-xs">
                <td colSpan={10} className="border-2 border-black text-left px-3 text-[11px] uppercase font-bold text-slate-800">
                  <div className="flex items-center justify-between">
                    <span>PUT [O] FOR OK &amp; [X] FOR NG</span>
                    <span className="font-black text-black tracking-wider uppercase text-xs">
                      MAIN OPERATOR SIGN
                    </span>
                  </div>
                </td>
                {WEEKS.map((w) => (
                  <td key={w} className="border-2 border-black p-0">
                    <input
                      type="text"
                      className="w-full h-full text-center font-bold text-xs border-none outline-none bg-transparent hover:bg-yellow-50 focus:bg-white"
                      placeholder="Sign"
                      value={operatorSigns[w]}
                      onChange={(e) => setOperatorSigns({ ...operatorSigns, [w]: e.target.value })}
                    />
                  </td>
                ))}
              </tr>

              {/* Bottom Row 3: Blank & Supervisor Signature */}
              <tr className="h-10 bg-white font-black text-xs">
                <td colSpan={10} className="border-2 border-black text-right px-3 text-xs uppercase font-black text-black">
                  SUPERVISOR SIGN
                </td>
                {WEEKS.map((w) => (
                  <td key={w} className="border-2 border-black p-0">
                    <input
                      type="text"
                      className="w-full h-full text-center font-bold text-xs border-none outline-none bg-transparent hover:bg-yellow-50 focus:bg-white"
                      placeholder="Sign"
                      value={supervisorSigns[w]}
                      onChange={(e) => setSupervisorSigns({ ...supervisorSigns, [w]: e.target.value })}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Footer note */}
          <div className="w-full flex items-center justify-between border-2 border-black border-t-0 p-2.5 bg-slate-50 text-[11px] font-bold text-slate-700">
            <div>
              <span>Form Ref: FME-5S-WKL-01</span>
              <span className="mx-2">•</span>
              <span>Machine: {displayMachine}</span>
            </div>
            <div>
              <span>Verification Rule: Minimum 100% adherence to Sort, Set &amp; Shine targets every week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
