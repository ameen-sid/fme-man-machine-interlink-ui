import React, { useState, useEffect } from 'react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
import {
  ClipboardCheck,
  Save,
  RotateCcw,
  Printer,
  Camera,
  Check,
  X,
  Eye,
  PenTool,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

// 31 days
const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

// Master Resistance Welding 5S Items matching user screenshots
const RW_FIVE_S_ITEMS = [
  // 1S (SORT)
  {
    id: '1s_1',
    sn: '1',
    sType: '1 S (SORT)',
    sTypeCategory: '1S',
    itemCleaned: 'M/C WORK AREA',
    bubbleText: 'visual',
    photoKey: 'mc_work_area_sort',
    defaultPhotoTitle: 'M/C Work Area Unwanted Materials',
    what: 'REMOVE THE UNWANTED MATERIAL ON WORK PLACE',
    how: 'visual',
    howLabel: 'Visual',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  // 2S (SET)
  {
    id: '2s_2',
    sn: '2',
    sType: '2 S (SET)',
    sTypeCategory: '2S',
    itemCleaned: 'M/C WORK AREA',
    bubbleText: 'visual',
    photoKey: 'mc_work_area_set',
    defaultPhotoTitle: 'Arrange Material & Tools',
    what: 'ARRANGE THE MATERIAL AND TOOL ON DEFINE LOCATION',
    how: 'visual',
    howLabel: 'Visual',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  // 3S (SHINE) - 7 items
  {
    id: '3s_3_1',
    sn: '3.1',
    sType: '3 S (SHINE)',
    sTypeCategory: '3S',
    itemCleaned: 'TROLLY',
    bubbleText: 'CLOTH',
    photoKey: 'trolly',
    defaultPhotoTitle: 'Trolly Pipes Cleaning',
    what: 'REMOVE THE DUST AND RUST ON TROLLY PIPE',
    how: 'cloth',
    howLabel: 'Cloth',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  {
    id: '3s_3_2',
    sn: '3.2',
    sType: '3 S (SHINE)',
    sTypeCategory: '3S',
    itemCleaned: 'WIRE TRAY DUMMY STAND',
    bubbleText: 'CLOTH',
    photoKey: 'wire_tray',
    defaultPhotoTitle: 'Wire Tray Dummy Stand',
    what: 'REMOVE THE DUST',
    how: 'cloth',
    howLabel: 'Cloth',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  {
    id: '3s_3_3',
    sn: '3.3',
    sType: '3 S (SHINE)',
    sTypeCategory: '3S',
    itemCleaned: 'COMPUTER',
    bubbleText: 'CLOTH',
    photoKey: 'computer',
    defaultPhotoTitle: 'Computer Keyboard & Screen',
    what: 'REMOVE THE DUST',
    how: 'cloth',
    howLabel: 'Cloth',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  {
    id: '3s_3_4',
    sn: '3.4',
    sType: '3 S (SHINE)',
    sTypeCategory: '3S',
    itemCleaned: 'M/C ENVI. FIXTURE, MICROMETER,SCALE',
    bubbleText: 'CLOTH',
    photoKey: 'micrometer_scale',
    defaultPhotoTitle: 'Fixture / Micrometer / Scale',
    what: 'REMOVE THE DUST',
    how: 'cloth',
    howLabel: 'Cloth',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  {
    id: '3s_3_5',
    sn: '3.5',
    sType: '3 S (SHINE)',
    sTypeCategory: '3S',
    itemCleaned: 'ELECTRIC PANEL',
    bubbleText: 'CLOTH',
    photoKey: 'electric_panel',
    defaultPhotoTitle: 'Electric Panel Cleaning',
    what: 'REMOVE THE DUST',
    how: 'cloth',
    howLabel: 'Cloth',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  {
    id: '3s_3_6',
    sn: '3.6',
    sType: '3 S (SHINE)',
    sTypeCategory: '3S',
    itemCleaned: 'DISPLAY, HANGER, SCRAP BIN',
    bubbleText: 'CLOTH',
    photoKey: 'display_hanger',
    defaultPhotoTitle: 'Display Board & Hangers',
    what: 'REMOVE THE DUST',
    how: 'cloth',
    howLabel: 'Cloth',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  {
    id: '3s_3_7',
    sn: '3.7',
    sType: '3 S (SHINE)',
    sTypeCategory: '3S',
    itemCleaned: 'SCRAP BIN',
    bubbleText: 'CLOTH',
    photoKey: 'scrap_bin',
    defaultPhotoTitle: 'Scrap Bin Table',
    what: 'REMOVE THE DUST',
    how: 'hand_bin',
    howLabel: 'Bin Clean',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  // 4S (STANDARDIZATION)
  {
    id: '4s_4',
    sn: '4',
    sType: '4 S (STANDARDIZATION)',
    sTypeCategory: '4S',
    itemCleaned: 'WI, OSM, M/C STANDAND',
    bubbleText: 'CLOTH',
    photoKey: 'wi_osm_display',
    defaultPhotoTitle: 'WI, OSM, M/C Standard Display',
    what: 'SHOULD BE DISPLAY AT M/C AS PER DOCUMENT LIST',
    how: 'visual',
    howLabel: 'Visual',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  },
  // 5S (SUSTAIN)
  {
    id: '5s_5',
    sn: '5',
    sType: '5 S (SUSTAIN)',
    sTypeCategory: '5S',
    itemCleaned: 'CHECK SHEET AND FORMAT',
    bubbleText: 'CLOTH',
    photoKey: 'check_sheet_format',
    defaultPhotoTitle: 'Check Sheet & Format Filling',
    what: 'FILL THE CHECK SHEET AND FORMAT WITH THE HELP OF BLUE BLACK PEN',
    how: 'pen',
    howLabel: 'Pen',
    who: 'MAIN OPERATOR',
    freq: 'DAILY IN ALL SHIFT'
  }
];

function createEmptyGrid() {
  const grid = {};
  RW_FIVE_S_ITEMS.forEach(it => {
    grid[it.id] = {};
    for (let d = 1; d <= 31; d++) {
      grid[it.id][d] = {
        A_start: '',
        A_end: '',
        B_start: '',
        B_end: '',
        C_start: '',
        C_end: ''
      };
    }
  });
  return grid;
}

export default function ResistanceWeldingFiveSChecksheet({ machine, onClose }) {
  const machineName = machine?.name || 'R/SW 01';
  const modelName = machine?.model || 'Machine 1';
  const storageKey = `fme_rw_5s_${machineName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const [docMeta, setDocMeta] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_meta`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { }
    }
    return {
      chkNo: 'CHK-5S-03',
      revNo: '01',
      mcName: `M/C: ${machineName}`,
      month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
    };
  });

  const [gridData, setGridData] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_grid`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { }
    }
    return createEmptyGrid();
  });

  const [sharpEdges, setSharpEdges] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_sharp`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { }
    }
    const obj = {};
    for (let d = 1; d <= 31; d++) obj[d] = '';
    return obj;
  });

  const [signOffs, setSignOffs] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_signs`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { }
    }
    const obj = { opA: {}, opB: {}, opC: {}, sup: {} };
    for (let d = 1; d <= 31; d++) {
      obj.opA[d] = '';
      obj.opB[d] = '';
      obj.opC[d] = '';
      obj.sup[d] = '';
    }
    return obj;
  });

  // User uploaded photos for ITEM and HOW sections
  const [itemPhotos, setItemPhotos] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_photos`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { }
    }
    return {};
  });

  const [howPhotos, setHowPhotos] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_how_photos`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { }
    }
    return {};
  });

  const [savedToast, setSavedToast] = useState('');

  // Persist state changes
  useEffect(() => {
    localStorage.setItem(`${storageKey}_meta`, JSON.stringify(docMeta));
  }, [docMeta, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_grid`, JSON.stringify(gridData));
  }, [gridData, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_sharp`, JSON.stringify(sharpEdges));
  }, [sharpEdges, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_signs`, JSON.stringify(signOffs));
  }, [signOffs, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_photos`, JSON.stringify(itemPhotos));
  }, [itemPhotos, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_how_photos`, JSON.stringify(howPhotos));
  }, [howPhotos, storageKey]);

  const handleCellChange = (itemId, day, shiftKey, val) => {
    setGridData(prev => {
      const copy = { ...prev };
      if (!copy[itemId]) copy[itemId] = {};
      if (!copy[itemId][day]) copy[itemId][day] = {};
      copy[itemId][day] = { ...copy[itemId][day], [shiftKey]: val };
      return copy;
    });
  };

  const toggleDiagonalCell = (itemId, day, shiftKey) => {
    const current = gridData[itemId]?.[day]?.[shiftKey] || '';
    let next = '√';
    if (current === '√') next = 'X';
    else if (current === 'X') next = '';
    else next = '√';
    handleCellChange(itemId, day, shiftKey, next);
  };

  const handleSharpEdgeChange = (day, val) => {
    setSharpEdges(prev => ({ ...prev, [day]: val }));
  };

  const toggleSharpEdge = (day) => {
    const current = sharpEdges[day] || '';
    const next = current === '√' ? 'X' : current === 'X' ? '' : '√';
    setSharpEdges(prev => ({ ...prev, [day]: next }));
  };

  const handleSignChange = (role, day, val) => {
    setSignOffs(prev => ({
      ...prev,
      [role]: { ...prev[role], [day]: val }
    }));
  };

  const handlePhotoUpload = (itemId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setItemPhotos(prev => ({
          ...prev,
          [itemId]: event.target.result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (itemId) => {
    setItemPhotos(prev => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const handleHowPhotoUpload = (itemId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setHowPhotos(prev => ({
          ...prev,
          [itemId]: event.target.result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveHowPhoto = (itemId) => {
    setHowPhotos(prev => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const handleSave = () => {
    localStorage.setItem(`${storageKey}_meta`, JSON.stringify(docMeta));
    localStorage.setItem(`${storageKey}_grid`, JSON.stringify(gridData));
    localStorage.setItem(`${storageKey}_sharp`, JSON.stringify(sharpEdges));
    localStorage.setItem(`${storageKey}_signs`, JSON.stringify(signOffs));
    localStorage.setItem(`${storageKey}_photos`, JSON.stringify(itemPhotos));
    localStorage.setItem(`${storageKey}_how_photos`, JSON.stringify(howPhotos));
    setSavedToast('5S Checksheet saved successfully!');
    setTimeout(() => setSavedToast(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm(`Reset 5S Check Sheet values for ${machineName}?`)) {
      setGridData(createEmptyGrid());
      const emptySharp = {};
      for (let d = 1; d <= 31; d++) emptySharp[d] = '';
      setSharpEdges(emptySharp);
      const emptySigns = { opA: {}, opB: {}, opC: {}, sup: {} };
      for (let d = 1; d <= 31; d++) {
        emptySigns.opA[d] = '';
        emptySigns.opB[d] = '';
        emptySigns.opC[d] = '';
        emptySigns.sup[d] = '';
      }
      setSignOffs(emptySigns);
      setItemPhotos({});
      setHowPhotos({});
      localStorage.removeItem(`${storageKey}_grid`);
      localStorage.removeItem(`${storageKey}_sharp`);
      localStorage.removeItem(`${storageKey}_signs`);
      localStorage.removeItem(`${storageKey}_photos`);
      localStorage.removeItem(`${storageKey}_how_photos`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Render default HOW graphic if no custom photo uploaded
  const renderDefaultHowGraphic = (type) => {
    if (type === 'visual') {
      return (
        <div className="flex flex-col items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" className="my-0.5">
            {/* Outer magnifying ring */}
            <circle cx="16" cy="16" r="12" stroke="#000000" strokeWidth="2.5" fill="#ffffff" />
            {/* Inner concentric ring */}
            <circle cx="16" cy="16" r="6" stroke="#000000" strokeWidth="2.2" fill="#ffffff" />
            {/* Center pupil dot */}
            <circle cx="16" cy="16" r="2.5" fill="#000000" />
            {/* Magnifier handle at bottom right */}
            <rect x="23.5" y="24" width="4" height="8.5" rx="1.8" transform="rotate(-45 23.5 24)" fill="#000000" />
          </svg>
          <span className="text-[8px] font-black text-black uppercase tracking-tight leading-none">VISUAL</span>
        </div>
      );
    }
    if (type === 'cloth') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-7 h-10 flex flex-col items-center justify-center relative">
            <div className="w-1.5 h-4 bg-slate-300 border border-slate-600 rounded-t-sm"></div>
            <div className="w-6 h-6 bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 rounded-b-md shadow-sm border border-amber-600 flex items-center justify-center">
              <Sparkles size={11} className="text-amber-800 opacity-75" />
            </div>
          </div>
          <span className="text-[7.5px] font-black text-black uppercase mt-0.5 tracking-tighter">CLOTH</span>
        </div>
      );
    }
    if (type === 'hand_bin') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-7 h-8 flex flex-col items-center justify-center">
            <div className="w-6 h-5 bg-sky-600 rounded-sm border border-sky-800 flex items-center justify-center text-white text-[7px] font-black shadow-sm">
              BIN
            </div>
            <div className="w-4 h-1.5 bg-amber-700/60 rounded-full mt-0.5"></div>
          </div>
          <span className="text-[7px] font-black text-black uppercase mt-0.5 tracking-tighter">BIN CLEAN</span>
        </div>
      );
    }
    if (type === 'pen') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-7 h-9 flex flex-col items-center justify-center relative">
            <div className="w-2 h-6 bg-gradient-to-r from-red-600 via-amber-400 to-blue-700 rounded-t-sm border border-slate-700"></div>
            <div className="w-1.5 h-2 bg-yellow-400 border border-slate-800 rotate-45 -mt-0.5"></div>
          </div>
          <span className="text-[7.5px] font-black text-black uppercase mt-0.5 tracking-tighter">PEN</span>
        </div>
      );
    }
    return <Eye size={16} />;
  };

  // Render HOW Box with Photo Upload Functionality
  const renderHowBox = (item) => {
    const uploaded = howPhotos[item.id];
    return (
      <div className="w-12 h-14 mx-auto relative group">
        <label
          className="w-full h-full flex flex-col items-center justify-center p-0.5 border border-red-500 bg-white cursor-pointer relative overflow-hidden block select-none hover:border-red-700 transition-colors"
          title={uploaded ? 'Click to change HOW photo' : 'Click to add photo for HOW method'}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleHowPhotoUpload(item.id, e)}
          />
          {uploaded ? (
            <div className="w-full h-full relative">
              <img
                src={uploaded}
                alt={`${item.howLabel} method`}
                className="w-full h-full object-cover block"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
                Change
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {renderDefaultHowGraphic(item.how)}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
                <Camera size={11} className="mr-0.5" /> + Photo
              </div>
            </div>
          )}
        </label>
        {uploaded && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemoveHowPhoto(item.id);
            }}
            title="Reset to default icon"
            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8.5px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-rose-700"
          >
            ×
          </button>
        )}
      </div>
    );
  };

  // Render illustrative default photo matching screenshots
  const renderItemPhoto = (item) => {
    const uploaded = itemPhotos[item.id];
    if (uploaded) {
      return (
        <img
          src={uploaded}
          alt={item.itemCleaned}
          className="w-full h-full object-cover block"
        />
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-700 p-1 group-hover:bg-slate-200 transition-colors">
        {item.photoKey === 'mc_work_area_sort' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-amber-50/70 p-0.5 rounded border border-amber-200">
            <div className="text-[7px] font-bold text-amber-900 leading-none">WORK PLACE</div>
            <div className="flex gap-1 items-center">
              <span className="w-3 h-2 bg-rose-300 rounded-sm"></span>
              <span className="w-4 h-1.5 bg-yellow-300 rounded-sm"></span>
              <span className="w-2 h-2 bg-blue-300 rounded-sm"></span>
            </div>
            <div className="text-[6.5px] text-slate-500">Unwanted Items</div>
          </div>
        )}
        {item.photoKey === 'mc_work_area_set' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-blue-50/70 p-0.5 rounded border border-blue-200">
            <div className="text-[7px] font-bold text-blue-900 leading-none">ARRANGED AREA</div>
            <div className="flex gap-1 items-center">
              <span className="w-2.5 h-3 bg-slate-400 border border-slate-600 rounded-sm"></span>
              <span className="w-2.5 h-3 bg-slate-400 border border-slate-600 rounded-sm"></span>
              <span className="w-2.5 h-3 bg-slate-400 border border-slate-600 rounded-sm"></span>
            </div>
            <div className="text-[6.5px] text-emerald-600 font-bold">Defined Order</div>
          </div>
        )}
        {item.photoKey === 'trolly' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-slate-200/80 p-0.5 rounded border border-slate-300">
            <div className="text-[7px] font-bold text-slate-800">TROLLY PIPE</div>
            <div className="w-7 h-3 border-2 border-slate-600 rounded flex justify-between px-0.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
            </div>
            <div className="text-[6.5px] text-slate-600">Rust & Dust Free</div>
          </div>
        )}
        {item.photoKey === 'wire_tray' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-stone-100 p-0.5 rounded border border-stone-300">
            <div className="text-[7px] font-bold text-stone-800">DUMMY STAND</div>
            <div className="w-8 h-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 border border-slate-400 rounded-sm"></div>
            <div className="text-[6.5px] text-stone-600">Clean Tray</div>
          </div>
        )}
        {item.photoKey === 'computer' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-sky-50 p-0.5 rounded border border-sky-200">
            <div className="w-6 h-4 bg-slate-800 border-2 border-slate-400 rounded-sm flex items-center justify-center">
              <span className="w-4 h-2 bg-sky-300 rounded-2xs"></span>
            </div>
            <div className="w-6 h-1.5 bg-slate-300 rounded-2xs border border-slate-400"></div>
            <div className="text-[6.5px] text-slate-600">PC & Monitor</div>
          </div>
        )}
        {item.photoKey === 'micrometer_scale' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-amber-50/60 p-0.5 rounded border border-amber-200">
            <div className="text-[7px] font-bold text-slate-800">MICROMETER</div>
            <div className="w-7 h-2 bg-slate-400 rounded-sm border border-slate-600 flex items-center">
              <span className="w-2 h-3 bg-amber-300 -ml-1 rounded-sm border border-amber-500"></span>
            </div>
            <div className="text-[6.5px] text-slate-600">Clean Fixture</div>
          </div>
        )}
        {item.photoKey === 'electric_panel' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-slate-100 p-0.5 rounded border border-slate-300">
            <div className="text-[7px] font-bold text-slate-800">ELEC PANEL</div>
            <div className="w-7 h-4 bg-slate-200 border border-slate-400 rounded-sm flex items-center justify-around px-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </div>
            <div className="text-[6.5px] text-slate-600">Panel Box</div>
          </div>
        )}
        {item.photoKey === 'display_hanger' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-slate-50 p-0.5 rounded border border-slate-300">
            <div className="text-[7px] font-bold text-slate-800">DISPLAY BOARD</div>
            <div className="w-7 h-4 border border-dashed border-blue-400 bg-white rounded-sm flex items-center justify-center">
              <ClipboardCheck size={12} className="text-blue-600" />
            </div>
            <div className="text-[6.5px] text-slate-600">Hanger & Pockets</div>
          </div>
        )}
        {item.photoKey === 'scrap_bin' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-amber-50/80 p-0.5 rounded border border-amber-300">
            <div className="text-[7px] font-bold text-amber-900">SCRAP BIN</div>
            <div className="w-7 h-4 bg-amber-700/80 border border-amber-900 rounded-sm flex items-center justify-center text-white text-[7px] font-bold shadow-sm">
              BIN
            </div>
            <div className="text-[6.5px] text-slate-600">Empty & Clean</div>
          </div>
        )}
        {item.photoKey === 'wi_osm_display' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-blue-50/80 p-0.5 rounded border border-blue-300">
            <div className="text-[7px] font-bold text-blue-900">WI / OSM / DOC</div>
            <div className="w-7 h-4 bg-white border border-slate-400 rounded-sm flex flex-col justify-around p-0.5">
              <span className="w-full h-0.5 bg-blue-500"></span>
              <span className="w-full h-0.5 bg-slate-400"></span>
              <span className="w-3/4 h-0.5 bg-slate-400"></span>
            </div>
            <div className="text-[6.5px] text-slate-600">At M/C Display</div>
          </div>
        )}
        {item.photoKey === 'check_sheet_format' && (
          <div className="w-full h-full flex flex-col justify-between items-center bg-emerald-50/80 p-0.5 rounded border border-emerald-300">
            <div className="text-[7px] font-bold text-emerald-900">CHECKSHEET</div>
            <div className="w-6 h-4 bg-white border border-slate-500 rounded-sm flex items-center justify-center relative">
              <PenTool size={11} className="text-indigo-600" />
            </div>
            <div className="text-[6.5px] text-slate-600">Blue / Black Pen</div>
          </div>
        )}
      </div>
    );
  };

  // Helper rendering each shift row's 31 date cells with dashed diagonal line & thick vertical separators
  const renderDateCells = (itemId, shiftKey, isLastShiftOfItem) => {
    return DAYS_31.map(d => {
      // Prominent thick border every 6 days (after 6, 12, 18, 24, 30, 31) matching spreadsheet screenshot
      const isThickCol = d === 6 || d === 12 || d === 18 || d === 24 || d === 30 || d === 31;
      const startVal = gridData[itemId]?.[d]?.[`${shiftKey}_start`] || '';
      const endVal = gridData[itemId]?.[d]?.[`${shiftKey}_end`] || '';

      return (
        <td
          key={d}
          className={`p-0 relative h-7 min-w-[42px] bg-white cursor-pointer select-none transition-colors border-t border-black border-l border-black ${
            isThickCol ? 'border-r-2 border-r-black' : 'border-r border-black'
          } ${
            isLastShiftOfItem ? 'border-b-2 border-b-black' : 'border-b border-black'
          } focus-within:ring-2 focus-within:ring-[#107c41] focus-within:ring-inset focus-within:z-10`}
          onDoubleClick={() => toggleDiagonalCell(itemId, d, `${shiftKey}_start`)}
          title={`Day ${d} Shift ${shiftKey} (Double-click to toggle √ / X)`}
        >
          {/* Dashed diagonal line matching Excel screenshot */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="#000000" strokeWidth="0.9" strokeDasharray="3,2" />
          </svg>
          {/* Top-left half for shift start */}
          <div className="absolute top-0 left-0 w-[50%] h-[50%] flex items-center justify-center">
            <input
              type="text"
              value={startVal}
              onChange={(e) => handleCellChange(itemId, d, `${shiftKey}_start`, e.target.value)}
              className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[8.5px] font-black focus:bg-emerald-50/60"
            />
          </div>
          {/* Bottom-right half for shift end */}
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] flex items-center justify-center">
            <input
              type="text"
              value={endVal}
              onChange={(e) => handleCellChange(itemId, d, `${shiftKey}_end`, e.target.value)}
              className="w-full h-full text-center bg-transparent border-0 outline-none p-0 text-[8.5px] font-black focus:bg-emerald-50/60"
            />
          </div>
        </td>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-100 min-h-screen p-2 sm:p-4 text-black font-sans leading-none animate-fadeIn">
      {/* Top Standardized Header Navigation */}
      <div className="print:hidden">
        <ChecksheetHeaderNav
          title={`5S CHECK POINTS — ${machineName}`}
          subtitle={`Process: Resistance Welding • Model: ${modelName} • CHK-5S-03 Rev 01`}
          icon={ClipboardCheck}
          iconBgClass="bg-sky-100 text-sky-700"
          onClose={onClose}
          onSave={handleSave}
          onReset={handleReset}
          savedToast={savedToast}
          extraActions={
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-colors cursor-pointer"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
          }
        />
      </div>

      {/* Main Checksheet White Paper Card */}
      <div className="bg-white border-2 border-black shadow-lg rounded-sm overflow-hidden p-2">
        {/* Top Header Gray Banner (Exactly matching screenshot) */}
        <div className="bg-[#dcdcdc] border-2 border-black py-1.5 px-4 text-center mb-0.5">
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-widest uppercase m-0">
            5S CHECK POINTS
          </h1>
        </div>

        {/* Machine & Month Control Strip (MONTH: in blue on the right matching screenshot) */}
        <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-1 px-1 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-black">M/C:</span>
            <input
              type="text"
              value={docMeta.mcName}
              onChange={(e) => setDocMeta({ ...docMeta, mcName: e.target.value })}
              className="text-sm font-black border-b border-black outline-none bg-transparent px-1 py-0.5 w-40 text-black uppercase"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-[#0000ff] uppercase tracking-wide">MONTH:</span>
            <input
              type="text"
              value={docMeta.month}
              onChange={(e) => setDocMeta({ ...docMeta, month: e.target.value })}
              placeholder="Month & Year"
              className="text-xs font-bold border-b border-black outline-none bg-transparent px-2 py-0.5 w-48 text-black"
            />
          </div>
        </div>

        {/* Master Table Scrollable Container */}
        <div className="w-full overflow-x-auto">
          <table
            className="border-collapse border-2 border-black text-center text-black min-w-[2180px] table-fixed"
            style={{ fontSize: '9px' }}
          >
            {/* Column Widths Definition */}
            <colgroup>
              <col style={{ width: '38px' }} />
              <col style={{ width: '68px' }} />
              <col style={{ width: '135px' }} />
              <col style={{ width: '110px' }} />
              <col style={{ width: '165px' }} />
              <col style={{ width: '65px' }} />
              <col style={{ width: '75px' }} />
              <col style={{ width: '60px' }} />
              <col style={{ width: '28px' }} />
              {DAYS_31.map(d => (
                <col key={d} style={{ width: '42px' }} />
              ))}
            </colgroup>

            <thead>
              {/* Header Row 1: High Level Titles & Date Heading */}
              <tr className="bg-white font-bold h-7">
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black">
                  S.N.
                </th>
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black leading-tight">
                  5S TYPES<br />
                  <span className="text-[7.5px] font-normal">OF 5S</span>
                </th>
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black leading-tight">
                  ITEMS TO BE<br />CLEANED
                </th>
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black">
                  PHOTO
                </th>
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black">
                  WHAT
                </th>
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black">
                  HOW
                </th>
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black">
                  WHO
                </th>
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black">
                  FREQ
                </th>
                <th rowSpan={2} className="border border-black p-0.5 align-middle text-center font-black">
                  SHIFT
                </th>
                <th colSpan={31} className="border border-black p-0.5 text-center font-black tracking-widest text-[10.5px]">
                  DATE
                </th>
              </tr>

              {/* Header Row 2: Days 1 to 31 with thick vertical separator every 6 days */}
              <tr className="bg-white font-bold h-6">
                {DAYS_31.map(d => {
                  const isThickCol = d === 6 || d === 12 || d === 18 || d === 24 || d === 30 || d === 31;
                  return (
                    <th
                      key={d}
                      className={`p-0.5 text-center font-black text-[9.5px] border-t border-black border-l border-black border-b-2 border-b-black ${
                        isThickCol ? 'border-r-2 border-r-black' : 'border-r border-black'
                      }`}
                    >
                      {d}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {/* 1. Item 1: 1S (SORT) */}
              {(() => {
                const item = RW_FIVE_S_ITEMS[0];
                return (
                  <React.Fragment key={item.id}>
                    <tr className="h-7">
                      <td rowSpan={3} className="border border-black font-black align-middle text-center">{item.sn}</td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight">
                        1 S<br />(SORT)
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1">
                        {item.itemCleaned}
                      </td>
                      {/* Photo Box with Blue Callout Bubble & Upload functionality */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        <div className="flex flex-col items-center justify-center w-full h-[76px] relative group">
                          {/* Callout Speech Bubble */}
                          <div className="mb-0.5 relative">
                            <span className="bg-[#bfe6ee] border border-black text-black font-black text-[8px] px-2 py-0.5 rounded-sm inline-block shadow-2xs">
                              {item.bubbleText}
                            </span>
                            {/* Down arrow triangle */}
                            <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-black mx-auto"></div>
                          </div>
                          {/* Photo Frame with Upload support */}
                          <label className="w-full flex-1 border border-black overflow-hidden relative cursor-pointer block bg-slate-50">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(item.id, e)}
                            />
                            {renderItemPhoto(item)}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
                              <Camera size={12} className="mr-0.5" /> Photo
                            </div>
                          </label>
                          {itemPhotos[item.id] && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemovePhoto(item.id);
                              }}
                              title="Reset to default illustration"
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8.5px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-rose-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1.5 leading-tight text-[8px]">
                        {item.what}
                      </td>
                      {/* HOW Box with Photo Upload functionality */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        {renderHowBox(item)}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8.5px]">
                        {item.who}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8px]">
                        {item.freq}
                      </td>
                      {/* Shift A */}
                      <td className="border border-black font-black align-middle text-center bg-slate-50">A</td>
                      {renderDateCells(item.id, 'A', false)}
                    </tr>
                    {/* Shift B */}
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50">B</td>
                      {renderDateCells(item.id, 'B', false)}
                    </tr>
                    {/* Shift C */}
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50 border-b-2 border-b-black">C</td>
                      {renderDateCells(item.id, 'C', true)}
                    </tr>
                  </React.Fragment>
                );
              })()}

              {/* 2. Item 2: 2S (SET) */}
              {(() => {
                const item = RW_FIVE_S_ITEMS[1];
                return (
                  <React.Fragment key={item.id}>
                    <tr className="h-7">
                      <td rowSpan={3} className="border border-black font-black align-middle text-center">{item.sn}</td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight">
                        2 S<br />(SET)
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1">
                        {item.itemCleaned}
                      </td>
                      {/* Photo Box */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        <div className="flex flex-col items-center justify-center w-full h-[76px] relative group">
                          <div className="mb-0.5 relative">
                            <span className="bg-[#bfe6ee] border border-black text-black font-black text-[8px] px-2 py-0.5 rounded-sm inline-block shadow-2xs">
                              {item.bubbleText}
                            </span>
                            <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-black mx-auto"></div>
                          </div>
                          <label className="w-full flex-1 border border-black overflow-hidden relative cursor-pointer block bg-slate-50">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(item.id, e)}
                            />
                            {renderItemPhoto(item)}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
                              <Camera size={12} className="mr-0.5" /> Photo
                            </div>
                          </label>
                          {itemPhotos[item.id] && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemovePhoto(item.id);
                              }}
                              title="Reset to default illustration"
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8.5px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-rose-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1.5 leading-tight text-[8px]">
                        {item.what}
                      </td>
                      {/* HOW Box with Photo Upload functionality */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        {renderHowBox(item)}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8.5px]">
                        {item.who}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8px]">
                        {item.freq}
                      </td>
                      <td className="border border-black font-black align-middle text-center bg-slate-50">A</td>
                      {renderDateCells(item.id, 'A', false)}
                    </tr>
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50">B</td>
                      {renderDateCells(item.id, 'B', false)}
                    </tr>
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50 border-b-2 border-b-black">C</td>
                      {renderDateCells(item.id, 'C', true)}
                    </tr>
                  </React.Fragment>
                );
              })()}

              {/* Yellow Highlight Separator Row matching Screenshot */}
              <tr className="bg-yellow-300 h-4 border-2 border-black">
                <td className="border border-black font-black text-center">3</td>
                <td colSpan={2} className="border border-black font-black text-center text-[8px] tracking-wider uppercase">
                  3 S (SHINE)
                </td>
                <td colSpan={37} className="border border-black bg-yellow-300"></td>
              </tr>

              {/* 3. Items 3.1 through 3.7: 3S (SHINE) */}
              {RW_FIVE_S_ITEMS.filter(it => it.sTypeCategory === '3S').map((item, idx) => {
                const isFirst = idx === 0;
                return (
                  <React.Fragment key={item.id}>
                    <tr className="h-7">
                      <td rowSpan={3} className="border border-black font-black align-middle text-center">{item.sn}</td>
                      {isFirst && (
                        <td
                          rowSpan={7 * 3}
                          className="border border-black font-black align-middle text-center leading-tight bg-white select-none"
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span className="font-black text-sm">3 S</span>
                            <span className="font-extrabold text-[9px] mt-1">(SHINE)</span>
                          </div>
                        </td>
                      )}
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1">
                        {item.itemCleaned}
                      </td>
                      {/* Photo Box */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        <div className="flex flex-col items-center justify-center w-full h-[76px] relative group">
                          <div className="mb-0.5 relative">
                            <span className="bg-[#bfe6ee] border border-black text-black font-black text-[8px] px-2 py-0.5 rounded-sm inline-block shadow-2xs">
                              {item.bubbleText}
                            </span>
                            <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-black mx-auto"></div>
                          </div>
                          <label className="w-full flex-1 border border-black overflow-hidden relative cursor-pointer block bg-slate-50">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(item.id, e)}
                            />
                            {renderItemPhoto(item)}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
                              <Camera size={12} className="mr-0.5" /> Photo
                            </div>
                          </label>
                          {itemPhotos[item.id] && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemovePhoto(item.id);
                              }}
                              title="Reset to default illustration"
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8.5px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-rose-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1.5 leading-tight text-[8px]">
                        {item.what}
                      </td>
                      {/* HOW Box with Photo Upload functionality */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        {renderHowBox(item)}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8.5px]">
                        {item.who}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8px]">
                        {item.freq}
                      </td>
                      <td className="border border-black font-black align-middle text-center bg-slate-50">A</td>
                      {renderDateCells(item.id, 'A', false)}
                    </tr>
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50">B</td>
                      {renderDateCells(item.id, 'B', false)}
                    </tr>
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50 border-b-2 border-b-black">C</td>
                      {renderDateCells(item.id, 'C', true)}
                    </tr>
                  </React.Fragment>
                );
              })}

              {/* 4. Item 4: 4S (STANDARDIZATION) */}
              {(() => {
                const item = RW_FIVE_S_ITEMS.find(it => it.id === '4s_4');
                return (
                  <React.Fragment key={item.id}>
                    <tr className="h-7">
                      <td rowSpan={3} className="border border-black font-black align-middle text-center">{item.sn}</td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8px]">
                        4 S<br />(STANDARDIZATION)
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1">
                        {item.itemCleaned}
                      </td>
                      {/* Photo Box */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        <div className="flex flex-col items-center justify-center w-full h-[76px] relative group">
                          <div className="mb-0.5 relative">
                            <span className="bg-[#bfe6ee] border border-black text-black font-black text-[8px] px-2 py-0.5 rounded-sm inline-block shadow-2xs">
                              {item.bubbleText}
                            </span>
                            <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-black mx-auto"></div>
                          </div>
                          <label className="w-full flex-1 border border-black overflow-hidden relative cursor-pointer block bg-slate-50">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(item.id, e)}
                            />
                            {renderItemPhoto(item)}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
                              <Camera size={12} className="mr-0.5" /> Photo
                            </div>
                          </label>
                          {itemPhotos[item.id] && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemovePhoto(item.id);
                              }}
                              title="Reset to default illustration"
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8.5px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-rose-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1.5 leading-tight text-[8px]">
                        {item.what}
                      </td>
                      {/* HOW Box with Photo Upload functionality */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        {renderHowBox(item)}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8.5px]">
                        {item.who}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8px]">
                        {item.freq}
                      </td>
                      <td className="border border-black font-black align-middle text-center bg-slate-50">A</td>
                      {renderDateCells(item.id, 'A', false)}
                    </tr>
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50">B</td>
                      {renderDateCells(item.id, 'B', false)}
                    </tr>
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50 border-b-2 border-b-black">C</td>
                      {renderDateCells(item.id, 'C', true)}
                    </tr>
                  </React.Fragment>
                );
              })()}

              {/* 5. Item 5: 5S (SUSTAIN) */}
              {(() => {
                const item = RW_FIVE_S_ITEMS.find(it => it.id === '5s_5');
                return (
                  <React.Fragment key={item.id}>
                    <tr className="h-7">
                      <td rowSpan={3} className="border border-black font-black align-middle text-center">{item.sn}</td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8px]">
                        5 S<br />(SUSTAIN)
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1">
                        {item.itemCleaned}
                      </td>
                      {/* Photo Box */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        <div className="flex flex-col items-center justify-center w-full h-[76px] relative group">
                          <div className="mb-0.5 relative">
                            <span className="bg-[#bfe6ee] border border-black text-black font-black text-[8px] px-2 py-0.5 rounded-sm inline-block shadow-2xs">
                              {item.bubbleText}
                            </span>
                            <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-black mx-auto"></div>
                          </div>
                          <label className="w-full flex-1 border border-black overflow-hidden relative cursor-pointer block bg-slate-50">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(item.id, e)}
                            />
                            {renderItemPhoto(item)}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
                              <Camera size={12} className="mr-0.5" /> Photo
                            </div>
                          </label>
                          {itemPhotos[item.id] && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemovePhoto(item.id);
                              }}
                              title="Reset to default illustration"
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8.5px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-rose-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center px-1.5 leading-tight text-[8px]">
                        {item.what}
                      </td>
                      {/* HOW Box with Photo Upload functionality */}
                      <td rowSpan={3} className="border border-black p-1 align-middle text-center">
                        {renderHowBox(item)}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8.5px]">
                        {item.who}
                      </td>
                      <td rowSpan={3} className="border border-black font-black align-middle text-center leading-tight text-[8px]">
                        {item.freq}
                      </td>
                      <td className="border border-black font-black align-middle text-center bg-slate-50">A</td>
                      {renderDateCells(item.id, 'A', false)}
                    </tr>
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50">B</td>
                      {renderDateCells(item.id, 'B', false)}
                    </tr>
                    <tr className="h-7">
                      <td className="border border-black font-black align-middle text-center bg-slate-50 border-b-2 border-b-black">C</td>
                      {renderDateCells(item.id, 'C', true)}
                    </tr>
                  </React.Fragment>
                );
              })()}

              {/* BOTTOM ROW 1: CHECK SHARP EDGES ON M/C */}
              <tr className="h-6 bg-white font-black text-[9.5px]">
                <td colSpan={9} className="border border-black text-center font-black py-1 tracking-wider uppercase">
                  CHECK SHARP EDGES ON M/C
                </td>
                {DAYS_31.map(d => {
                  const isThickCol = d === 6 || d === 12 || d === 18 || d === 24 || d === 30 || d === 31;
                  return (
                    <td
                      key={d}
                      className={`p-0 text-center cursor-pointer select-none border-t border-black border-l border-black border-b border-black ${
                        isThickCol ? 'border-r-2 border-r-black' : 'border-r border-black'
                      } focus-within:ring-2 focus-within:ring-[#107c41] focus-within:ring-inset`}
                      onDoubleClick={() => toggleSharpEdge(d)}
                    >
                      <input
                        type="text"
                        value={sharpEdges[d] || ''}
                        onChange={(e) => handleSharpEdgeChange(d, e.target.value)}
                        className="w-full h-full text-center border-none bg-transparent text-[9px] font-black outline-none p-0 focus:bg-emerald-50/50"
                      />
                    </td>
                  );
                })}
              </tr>

              {/* BOTTOM ROW 2: Time taken & OPERATOR SIGN. Shift A */}
              <tr className="h-6 bg-white font-bold text-[8.5px]">
                <td rowSpan={3} colSpan={4} className="border border-black font-black align-middle text-center text-[9px]">
                  Time taken: 4 min
                </td>
                <td colSpan={4} className="border border-black font-black align-middle text-center uppercase tracking-wide">
                  OPERATOR SIGN.
                </td>
                <td className="border border-black font-black align-middle text-center bg-slate-50">A</td>
                {DAYS_31.map(d => {
                  const isThickCol = d === 6 || d === 12 || d === 18 || d === 24 || d === 30 || d === 31;
                  return (
                    <td
                      key={d}
                      className={`p-0 text-center border-t border-black border-l border-black border-b border-black ${
                        isThickCol ? 'border-r-2 border-r-black' : 'border-r border-black'
                      } focus-within:ring-2 focus-within:ring-[#107c41] focus-within:ring-inset`}
                    >
                      <input
                        type="text"
                        value={signOffs.opA[d] || ''}
                        onChange={(e) => handleSignChange('opA', d, e.target.value)}
                        className="w-full h-full text-center border-none bg-transparent text-[8px] font-bold outline-none p-0 focus:bg-emerald-50/50"
                      />
                    </td>
                  );
                })}
              </tr>

              {/* BOTTOM ROW 3: OPERATOR SIGN. Shift B */}
              <tr className="h-6 bg-white font-bold text-[8.5px]">
                <td colSpan={4} className="border border-black font-black align-middle text-center uppercase tracking-wide">
                  OPERATOR SIGN.
                </td>
                <td className="border border-black font-black align-middle text-center bg-slate-50">B</td>
                {DAYS_31.map(d => {
                  const isThickCol = d === 6 || d === 12 || d === 18 || d === 24 || d === 30 || d === 31;
                  return (
                    <td
                      key={d}
                      className={`p-0 text-center border-t border-black border-l border-black border-b border-black ${
                        isThickCol ? 'border-r-2 border-r-black' : 'border-r border-black'
                      } focus-within:ring-2 focus-within:ring-[#107c41] focus-within:ring-inset`}
                    >
                      <input
                        type="text"
                        value={signOffs.opB[d] || ''}
                        onChange={(e) => handleSignChange('opB', d, e.target.value)}
                        className="w-full h-full text-center border-none bg-transparent text-[8px] font-bold outline-none p-0 focus:bg-emerald-50/50"
                      />
                    </td>
                  );
                })}
              </tr>

              {/* BOTTOM ROW 4: OPERATOR SIGN. Shift C */}
              <tr className="h-6 bg-white font-bold text-[8.5px]">
                <td colSpan={4} className="border border-black font-black align-middle text-center uppercase tracking-wide">
                  OPERATOR SIGN.
                </td>
                <td className="border border-black font-black align-middle text-center bg-slate-50">C</td>
                {DAYS_31.map(d => {
                  const isThickCol = d === 6 || d === 12 || d === 18 || d === 24 || d === 30 || d === 31;
                  return (
                    <td
                      key={d}
                      className={`p-0 text-center border-t border-black border-l border-black border-b border-black ${
                        isThickCol ? 'border-r-2 border-r-black' : 'border-r border-black'
                      } focus-within:ring-2 focus-within:ring-[#107c41] focus-within:ring-inset`}
                    >
                      <input
                        type="text"
                        value={signOffs.opC[d] || ''}
                        onChange={(e) => handleSignChange('opC', d, e.target.value)}
                        className="w-full h-full text-center border-none bg-transparent text-[8px] font-bold outline-none p-0 focus:bg-emerald-50/50"
                      />
                    </td>
                  );
                })}
              </tr>

              {/* BOTTOM ROW 5: PUT (√) FOR OK & (X) FOR NG & SUPERVISOR SIGN. */}
              <tr className="h-6 bg-white font-bold text-[8px]">
                <td colSpan={4} className="border border-black font-black align-middle text-center text-[7.5px] px-0.5">
                  PUT (√) FOR OK &amp; (X) FOR NG
                </td>
                <td colSpan={5} className="border border-black font-black align-middle text-center uppercase tracking-wide">
                  SUPERVISOR SIGN.
                </td>
                {DAYS_31.map(d => {
                  const isThickCol = d === 6 || d === 12 || d === 18 || d === 24 || d === 30 || d === 31;
                  return (
                    <td
                      key={d}
                      className={`p-0 text-center border-t border-black border-l border-black border-b border-black ${
                        isThickCol ? 'border-r-2 border-r-black' : 'border-r border-black'
                      } focus-within:ring-2 focus-within:ring-[#107c41] focus-within:ring-inset`}
                    >
                      <input
                        type="text"
                        value={signOffs.sup[d] || ''}
                        onChange={(e) => handleSignChange('sup', d, e.target.value)}
                        className="w-full h-full text-center border-none bg-transparent text-[8px] font-bold outline-none p-0 focus:bg-emerald-50/50"
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Meta Row: CHK NO & REV NO */}
        <div className="flex items-center justify-between text-[10px] font-black text-black pt-2 px-2">
          <div>
            CHK NO. :- <span className="font-extrabold">{docMeta.chkNo}</span>
          </div>
          <div>
            REV. NO. :- <span className="font-extrabold">{docMeta.revNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
