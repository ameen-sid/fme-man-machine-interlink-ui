import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Save, 
  RotateCcw,
  Eye,
  PenTool,
  Sparkles,
  Scissors
} from 'lucide-react';

// Master 5S Rows according to provided sheets
const INITIAL_FIVE_S_ITEMS = [
  // 1S (SORT)
  {
    id: '1s_1',
    sType: '1S (SORT)',
    sNo: '1',
    categoryBanner: null,
    location: 'M/C work area',
    badge: 'REMOVE UNWANTED THING',
    photoBg: '#0284c7',
    what: 'Remove unwanted material from workplace',
    how: 'eye',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '30sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 2S (SET)
  {
    id: '2s_2',
    sType: '2S (SET)',
    sNo: '2',
    categoryBanner: null,
    location: 'Tool kit',
    badge: 'SET IN ORDER',
    photoBg: '#334155',
    what: 'Arrange the material/tool as per define location',
    how: 'eye',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '30sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 3S (SHINE) - 90 Section
  {
    id: '3s_3',
    sType: '3S (SHINE)',
    sNo: '3',
    categoryBanner: '90',
    location: 'Piano stand',
    badge: 'CLOTH',
    photoBg: '#10b981',
    what: 'Clean:\n1. Wire guide\n2. Roller\n3. Pvc sheet\n4. Knot Detector',
    how: 'cloth',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '54sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 3S (SHINE) - PREFEEDER Section
  {
    id: '3s_4',
    sType: '3S (SHINE)',
    sNo: '4',
    categoryBanner: 'PREFEEDER',
    location: 'Prefeeder',
    badge: 'CLOTH',
    photoBg: '#64748b',
    what: 'Clean:\n1. Wire guide\n2. Nowire detector\n3. Pulley\n4. Surface',
    how: 'cloth',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '59sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 3S (SHINE) - STRAIGHTNER Section
  {
    id: '3s_5',
    sType: '3S (SHINE)',
    sNo: '5',
    categoryBanner: 'STRAIGHTNER',
    location: 'Straightner',
    badge: 'CLOTH',
    photoBg: '#f59e0b',
    what: 'Clean:\n1. Wire guide\n2. Roller\n3. Splice detector\n4. Feeder cover',
    how: 'cloth',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '63sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 3S (SHINE) - M/C HEAD Section
  {
    id: '3s_6a',
    sType: '3S (SHINE)',
    sNo: '6.a',
    categoryBanner: 'M/C HEAD',
    location: 'Cutting head',
    badge: 'CLOTH, BRUSH',
    photoBg: '#0f172a',
    what: 'Clean:\n1. Swivel\n2. Cutting head',
    how: 'brush',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '45sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  {
    id: '3s_6b',
    sType: '3S (SHINE)',
    sNo: '6.b',
    categoryBanner: null,
    location: 'Seal unit',
    badge: 'SUCTION GUN',
    photoBg: '#0d9488',
    what: 'Clean:\n1. Mat\n2. Under seal unit',
    how: 'suction',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '14sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  {
    id: '3s_6c',
    sType: '3S (SHINE)',
    sNo: '6.c',
    categoryBanner: null,
    location: 'Press',
    badge: 'CLOTH',
    photoBg: '#475569',
    what: 'Clean:\n1. Press rear\n2. App. Base rear\n3. Press front\n4. App. Base front',
    how: 'cloth',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '56sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  {
    id: '3s_6d',
    sType: '3S (SHINE)',
    sNo: '6.d',
    categoryBanner: null,
    location: 'Terminal feeder',
    badge: 'CLOTH',
    photoBg: '#ca8a04',
    what: 'Clean:\n1. Terminal feeder rear\n2. Terminal feeder front',
    how: 'cloth',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '30sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  {
    id: '3s_6e',
    sType: '3S (SHINE)',
    sNo: '6.e',
    categoryBanner: null,
    location: 'Oil pot',
    badge: 'CLOTH, OIL LEVEL',
    photoBg: '#c2410c',
    what: 'Clean:\n1. Oil pot\n2. Check cotton condition\n3. Fill oil',
    how: 'oil_can',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '20sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 3S (SHINE) - COMPUTER Section
  {
    id: '3s_7',
    sType: '3S (SHINE)',
    sNo: '7.a',
    categoryBanner: 'COMPUTER',
    location: 'Computer',
    badge: 'CLOTH WITH COLIN',
    photoBg: '#2563eb',
    what: 'Clean:\n1. Monitor\n2. Printer\n3. Mouse\n4. Key board',
    how: 'colin',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '59sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 3S (SHINE) - OTHERS Section
  {
    id: '3s_8a',
    sType: '3S (SHINE)',
    sNo: '8.a',
    categoryBanner: 'OTHERS',
    location: 'Magnifying glass, Tower light',
    badge: 'CLOTH WITH COLIN',
    photoBg: '#7c3aed',
    what: 'Clean:\n1. Magnifying glass\n2. Tower light',
    how: 'cloth',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '18sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  {
    id: '3s_8b',
    sType: '3S (SHINE)',
    sNo: '8.b',
    categoryBanner: null,
    location: 'Review board, scrap collector bin',
    badge: 'CLOTH WITH COLIN',
    photoBg: '#059669',
    what: 'Clean:\n1. Board\n2. Bin',
    how: 'colin',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '18 sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 4S (STANDARDIZE)
  {
    id: '4s_9',
    sType: '4S (STANDERIZE)',
    sNo: '9',
    categoryBanner: null,
    location: 'Display',
    badge: 'VISUALLY',
    photoBg: '#e11d48',
    what: 'Should be display at m/c as per document list',
    how: 'eye',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '20sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  },
  // 5S (SUSTAIN)
  {
    id: '5s_10',
    sType: '5S (SUSTAIN)',
    sNo: '10',
    categoryBanner: null,
    location: 'Documents',
    badge: 'FILL PROPERLY',
    photoBg: '#4338ca',
    what: 'Fill:\n1. Checksheets\n2. Format',
    how: 'pen',
    who: 'M/C OPERATOR',
    freq: 'DAILY 2 TIMES IN SHIFT',
    time: '30sec',
    when: 'SHIFT START / SHIFT END',
    resp: 'Main operator'
  }
];

// Days 1 to 15 (Page 1 format)
const DAYS_15 = Array.from({ length: 15 }, (_, i) => i + 1);

function createEmptyGrid() {
  const grid = {};
  INITIAL_FIVE_S_ITEMS.forEach(it => {
    grid[it.id] = {};
    for (let d = 1; d <= 15; d++) {
      grid[it.id][d] = {
        A_start: '',
        A_end: '',
        B_start: '',
        B_end: ''
      };
    }
  });
  return grid;
}

export default function FiveSChecksheet({ machine, onClose }) {
  const [docMeta, setDocMeta] = useState({
    chkNo: 'CHK-5S-03',
    revNo: '01',
    revDate: '16 AUG. 2017',
    mcName: machine?.name || 'Alpha355',
    month: ''
  });

  const [gridData, setGridData] = useState(() => createEmptyGrid());
  const [sharpEdges, setSharpEdges] = useState(() => {
    const obj = {};
    for (let d = 1; d <= 15; d++) {
      obj[d] = '';
    }
    return obj;
  });

  const [signOffs, setSignOffs] = useState(() => {
    const obj = { opA: {}, opB: {}, sup: {} };
    for (let d = 1; d <= 15; d++) {
      obj.opA[d] = '';
      obj.opB[d] = '';
      obj.sup[d] = '';
    }
    return obj;
  });

  const [savedToast, setSavedToast] = useState('');

  const handleCellChange = (itemId, day, key, val) => {
    setGridData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[itemId]) copy[itemId] = {};
      if (!copy[itemId][day]) copy[itemId][day] = {};
      copy[itemId][day][key] = val;
      return copy;
    });
  };

  const handleSharpEdgeChange = (day, val) => {
    setSharpEdges(prev => ({ ...prev, [day]: val }));
  };

  const handleSignChange = (role, day, val) => {
    setSignOffs(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[role][day] = val;
      return copy;
    });
  };

  const handleSave = () => {
    setSavedToast('5S Check Sheet successfully saved!');
    setTimeout(() => setSavedToast(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this 5S Check Sheet?')) {
      setGridData(createEmptyGrid());
    }
  };

  const renderHowIcon = (type) => {
    switch (type) {
      case 'eye':
        return (
          <div className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-slate-600">
            <Eye size={18} className="text-blue-600" />
            <span>Visual</span>
          </div>
        );
      case 'cloth':
        return (
          <div className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-slate-600">
            <Sparkles size={18} className="text-emerald-600" />
            <span>Cloth</span>
          </div>
        );
      case 'brush':
        return (
          <div className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-slate-600">
            <PenTool size={18} className="text-amber-600" />
            <span>Brush</span>
          </div>
        );
      case 'suction':
        return (
          <div className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-slate-600">
            <Scissors size={18} className="text-teal-600" />
            <span>Suction</span>
          </div>
        );
      case 'colin':
        return (
          <div className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-slate-600">
            <Sparkles size={18} className="text-blue-500" />
            <span>Colin</span>
          </div>
        );
      case 'oil_can':
        return (
          <div className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-slate-600">
            <PenTool size={18} className="text-orange-600" />
            <span>Oil Can</span>
          </div>
        );
      case 'pen':
        return (
          <div className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-slate-600">
            <PenTool size={18} className="text-indigo-600" />
            <span>Pen</span>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-slate-600">
            <Eye size={18} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-50 animate-fadeIn">
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">FURUKAWA MINDA ELECTRIC PVT. LTD. — 5S CHECK POINT</h3>
            <span className="text-xs text-slate-500 font-medium">
              CHK NO: <strong className="text-slate-800">{docMeta.chkNo}</strong> • REV: <strong className="text-slate-800">{docMeta.revNo}</strong> • M/C: <strong className="text-slate-800">{docMeta.mcName}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {savedToast && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-md text-xs font-semibold">
              {savedToast}
            </div>
          )}
          <button 
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
            onClick={handleSave}
          >
            <Save size={15} />
            <span>Save Record</span>
          </button>
          <button 
            className="inline-flex items-center px-2.5 py-2 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-200 border border-slate-300 text-slate-600 transition-colors cursor-pointer"
            onClick={handleReset} 
            title="Reset values"
          >
            <RotateCcw size={15} />
          </button>
          {onClose && (
            <button 
              className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-rose-100 border border-slate-200 hover:border-rose-300 text-rose-600 transition-colors cursor-pointer"
              onClick={onClose}
            >
              Close Checksheet
            </button>
          )}
        </div>
      </div>

      {/* Sheet Card */}
      <div className="bg-white border-2 border-slate-900 shadow-md rounded overflow-hidden">
        {/* Header Title Banner */}
        <div className="text-center text-base font-black text-slate-900 py-2 tracking-widest bg-white border-b-2 border-slate-900 uppercase">
          5S CHECK POINT
        </div>

        {/* Machine & Month Strip */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 bg-slate-50 px-3.5 py-1.5">
          <div className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span>M/C:</span>
            <input 
              className="border border-slate-300 bg-white px-2 py-0.5 rounded text-xs font-bold text-blue-700 outline-none" 
              value={docMeta.mcName} 
              onChange={(e) => setDocMeta({ ...docMeta, mcName: e.target.value })} 
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
            <span>MONTH:-</span>
            <input 
              className="border border-slate-300 bg-white px-2 py-0.5 rounded text-xs font-bold text-blue-700 outline-none w-44" 
              placeholder="e.g. September 2026" 
              value={docMeta.month} 
              onChange={(e) => setDocMeta({ ...docMeta, month: e.target.value })} 
            />
          </div>
        </div>

        {/* Master Table */}
        <div className="w-full overflow-x-auto border-b-2 border-slate-900">
          <table className="w-full border-collapse text-[10.5px] min-w-[1650px]">
            <thead>
              <tr>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-14" rowSpan={2}>S TYPE</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-9" rowSpan={2}>S. NO</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-28" rowSpan={2}>LOCATION</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-20" rowSpan={2}>PHOTO</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-44" rowSpan={2}>WHAT</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-12" rowSpan={2}>HOW</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-16" rowSpan={2}>WHO</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-16" rowSpan={2}>FREQ.</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-11" rowSpan={2}>TIME</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-16" rowSpan={2}>WHEN</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-16" rowSpan={2}>RESP.</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-7" rowSpan={2}>SHIFT</th>
                <th className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1" colSpan={15}>DATE (1 to 15)</th>
              </tr>
              <tr>
                {DAYS_15.map(d => (
                  <th key={d} className="border border-slate-900 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] p-1 w-9 min-w-9">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {INITIAL_FIVE_S_ITEMS.map((item) => (
                <React.Fragment key={item.id}>
                  {/* Category Banner Row if defined (e.g. 90, PREFEEDER, STRAIGHTNER, etc.) */}
                  {item.categoryBanner && (
                    <tr>
                      <td colSpan={27} className="border border-slate-900 bg-amber-200 text-slate-950 font-black text-center text-xs tracking-wider py-1 uppercase">
                        {item.categoryBanner}
                      </td>
                    </tr>
                  )}

                  {/* Shift A Row */}
                  <tr>
                    <td rowSpan={2} className="border border-slate-900 bg-slate-50 font-black text-center text-[11px] text-slate-900 p-1">{item.sType}</td>
                    <td rowSpan={2} className="border border-slate-900 font-extrabold text-center text-[11px] p-1">{item.sNo}</td>
                    <td rowSpan={2} className="border border-slate-900 font-bold pl-1.5 text-[10.5px]">{item.location}</td>
                    <td rowSpan={2} className="border border-slate-900 p-1 text-center bg-slate-50/50">
                      <div className="border border-slate-300 rounded bg-white p-1 flex flex-col items-center gap-0.5">
                        <div className="w-16 h-10 rounded flex items-center justify-center text-[8.5px] font-black text-white" style={{ backgroundColor: item.photoBg }}>
                          <span className="p-0.5 text-center">Photo</span>
                        </div>
                        <span className="text-[7.5px] font-extrabold px-1 py-0.5 rounded border border-slate-300 bg-slate-100 text-slate-900 uppercase">
                          {item.badge}
                        </span>
                      </div>
                    </td>
                    <td rowSpan={2} className="border border-slate-900 text-[10px] font-bold text-slate-800 whitespace-pre-line p-1.5 leading-snug">{item.what}</td>
                    <td rowSpan={2} className="border border-slate-900 text-center p-1 bg-white">{renderHowIcon(item.how)}</td>
                    <td rowSpan={2} className="border border-slate-900 text-center text-[9.5px] font-bold p-1">{item.who}</td>
                    <td rowSpan={2} className="border border-slate-900 text-center text-[9px] font-extrabold p-1">{item.freq}</td>
                    <td rowSpan={2} className="border border-slate-900 text-center text-[9.5px] font-extrabold p-1">{item.time}</td>
                    <td rowSpan={2} className="border border-slate-900 text-center text-[9px] font-bold p-1 leading-tight text-slate-700">
                      (SHIFT START)<br/>/<br/>(SHIFT END)
                    </td>
                    <td rowSpan={2} className="border border-slate-900 text-center text-[9.5px] font-bold p-1">{item.resp}</td>
                    <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-blue-700 w-6">A</td>

                    {/* Shift A 15 days with diagonal split (Start / End) */}
                    {DAYS_15.map(d => {
                      const startVal = gridData[item.id]?.[d]?.A_start || '';
                      const endVal = gridData[item.id]?.[d]?.A_end || '';
                      return (
                        <td key={d} className="border border-slate-900 relative w-8 h-6 p-0 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.75px),#0f172a_calc(50%-0.75px),#0f172a_calc(50%+0.75px),transparent_calc(50%+0.75px))]">
                          <div className="absolute top-0 left-0.5 w-1/2 h-1/2 flex items-center justify-center" title="Shift A - Start">
                            <input
                              className="w-3.5 h-3.5 border-none bg-transparent text-center text-[8.5px] font-black outline-none cursor-pointer focus:bg-blue-50 focus:rounded"
                              value={startVal}
                              onChange={(e) => handleCellChange(item.id, d, 'A_start', e.target.value.toUpperCase())}
                            />
                          </div>
                          <div className="absolute bottom-0 right-0.5 w-1/2 h-1/2 flex items-center justify-center" title="Shift A - End">
                            <input
                              className="w-3.5 h-3.5 border-none bg-transparent text-center text-[8.5px] font-black outline-none cursor-pointer focus:bg-blue-50 focus:rounded"
                              value={endVal}
                              onChange={(e) => handleCellChange(item.id, d, 'A_end', e.target.value.toUpperCase())}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Shift B Row */}
                  <tr>
                    <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-amber-700 w-6">B</td>
                    {DAYS_15.map(d => {
                      const startVal = gridData[item.id]?.[d]?.B_start || '';
                      const endVal = gridData[item.id]?.[d]?.B_end || '';
                      return (
                        <td key={d} className="border border-slate-900 relative w-8 h-6 p-0 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.75px),#0f172a_calc(50%-0.75px),#0f172a_calc(50%+0.75px),transparent_calc(50%+0.75px))]">
                          <div className="absolute top-0 left-0.5 w-1/2 h-1/2 flex items-center justify-center" title="Shift B - Start">
                            <input
                              className="w-3.5 h-3.5 border-none bg-transparent text-center text-[8.5px] font-black outline-none cursor-pointer focus:bg-blue-50 focus:rounded"
                              value={startVal}
                              onChange={(e) => handleCellChange(item.id, d, 'B_start', e.target.value.toUpperCase())}
                            />
                          </div>
                          <div className="absolute bottom-0 right-0.5 w-1/2 h-1/2 flex items-center justify-center" title="Shift B - End">
                            <input
                              className="w-3.5 h-3.5 border-none bg-transparent text-center text-[8.5px] font-black outline-none cursor-pointer focus:bg-blue-50 focus:rounded"
                              value={endVal}
                              onChange={(e) => handleCellChange(item.id, d, 'B_end', e.target.value.toUpperCase())}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}

              {/* Point 11: CHECK SHARP EDGES ON M/C */}
              <tr className="border-t border-slate-900 bg-white font-extrabold text-xs">
                <td className="border border-slate-900 text-center p-1.5">11</td>
                <td colSpan={11} className="border border-slate-900 text-left pl-2 p-1.5">
                  CHECK SHARP EDGES ON M/C
                </td>
                {DAYS_15.map(d => (
                  <td key={d} className="border border-slate-900 p-0">
                    <input
                      className="w-full text-center border-none bg-transparent text-[10px] font-bold p-1 outline-none"
                      value={sharpEdges[d] || ''}
                      onChange={(e) => handleSharpEdgeChange(d, e.target.value.toUpperCase())}
                    />
                  </td>
                ))}
              </tr>

              {/* Instructions Row */}
              <tr className="border border-slate-900 bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={12} className="border border-slate-900 text-left pl-2 text-[10px] p-1.5">
                  PUT ( √ ) FOR <strong className="text-slate-900 font-black">OK</strong> & (X) FOR <strong className="text-slate-900 font-black">NG</strong> &nbsp;|&nbsp; 
                  <span className="text-slate-600">CLEANING TIME FOR MAIN OPERATOR: 10 MIN</span>
                </td>
                <td colSpan={15} className="border border-slate-900 text-center font-extrabold text-emerald-700 p-1.5">
                  DAILY VERIFICATION LOG
                </td>
              </tr>

              {/* Signatures Rows */}
              <tr className="border border-slate-900 bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={12} className="border border-slate-900 text-right font-extrabold pr-2 p-1">M/C OPERATOR (A)</td>
                {DAYS_15.map(d => (
                  <td key={d} className="border border-slate-900 p-0">
                    <input
                      className="w-full text-center border-none bg-transparent text-[10px] font-bold p-1 outline-none"
                      placeholder="Sign"
                      value={signOffs.opA[d] || ''}
                      onChange={(e) => handleSignChange('opA', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
              <tr className="border border-slate-900 bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={12} className="border border-slate-900 text-right font-extrabold pr-2 p-1">M/C OPERATOR (B)</td>
                {DAYS_15.map(d => (
                  <td key={d} className="border border-slate-900 p-0">
                    <input
                      className="w-full text-center border-none bg-transparent text-[10px] font-bold p-1 outline-none"
                      placeholder="Sign"
                      value={signOffs.opB[d] || ''}
                      onChange={(e) => handleSignChange('opB', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
              <tr className="border border-slate-900 bg-slate-50 font-bold text-[10.5px]">
                <td colSpan={12} className="border border-slate-900 text-right font-extrabold pr-2 p-1">SUPERVISOR SIGN</td>
                {DAYS_15.map(d => (
                  <td key={d} className="border border-slate-900 p-0">
                    <input
                      className="w-full text-center border-none bg-transparent text-[10px] font-bold p-1 outline-none"
                      placeholder="Sign"
                      value={signOffs.sup[d] || ''}
                      onChange={(e) => handleSignChange('sup', d, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Document Stamp */}
        <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-100 border-t border-slate-900 text-[10px] font-bold text-slate-600">
          <span>CHK NO. :- <strong className="text-slate-900">{docMeta.chkNo}</strong></span>
          <span>REV. NO. :- <strong className="text-slate-900">{docMeta.revNo}</strong></span>
          <span>REV. DATE :- <strong className="text-slate-900">{docMeta.revDate}</strong></span>
          <span>FURUKAWA MINDA ELECTRIC PVT. LTD.</span>
        </div>
      </div>
    </div>
  );
}
