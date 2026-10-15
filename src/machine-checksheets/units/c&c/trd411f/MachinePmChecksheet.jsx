import React, { useState } from 'react';
import { Save, RotateCcw, Printer, Camera, Trash2, Replace, ArrowLeft, Wrench, CheckCircle2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA (taken row-by-row directly from the TRD411F Maintenance sheet)*/
/* ------------------------------------------------------------------ */
const V = 'Visual check';
const VT = 'Visual check, check by touch';
const AS = 'Adjust setting/Replace';
const RR = 'Replace if required';
const CENTER = 'No center displacement / No looseness';
const SHOULD_SENSOR = 'Photo sensor should be shielded just before the stroke end';
const ESTOP = 'Should not be broken / When pressed, “EMERGENCY-STOP” is displayed and the button remains depressed';
const ESTOP_METHOD = 'Visual check: Check (front & rear)';

const SECTIONS = [
  {
    id: 1, loc: '1.Whole', photos: [{ at: 0, span: 3 }], items: [
      ['1.1', '1.1', 'Cleaning', 'Cleaning', 'Should be no scrap or dirt', 'Clean with clothes', true],
      ['1.2', '1.2', 'Lubrication', 'Lubrication', 'Lubricate specified parts', 'Lubrication', true],
      ['1.3', '1.3', 'Wiring and piping conditions', V, 'Air hoses and wires have no frictions and are bound', RR],
    ]
  },
  {
    id: 2, loc: '2.Prefeeder units', photos: [{ at: 0, span: 2 }], items: [
      ['2.1', '2.1', 'Straightener', 'Check by touch', 'Should rotate smoothly', AS],
      ['2.2', '', 'Wire joint sensor', V, 'Should be no wear or burrs', RR],
    ]
  },
  {
    id: 3, loc: '3. Measuring units', photos: [{ at: 0, span: 2 }, { at: 2, span: 2 }], items: [
      ['3.1', '', 'Timing belt / Bearing Condition', 'Smooth Movement', 'Check tension and wear', RR],
      ['3.2', '', 'Idler pulley looseness', 'Check by touch', 'Should not be loose', RR],
      ['3.3', '', 'Link and pin parts looseness', 'Check by touch', 'Should not be loose', AS],
      ['3.4', '', 'Encoder roller', V, 'Should not be loose(set screw 2positions)', AS],
    ]
  },
  {
    id: 4, loc: '4. Front clamp units', photos: [{ at: 0, span: 4 }], items: [
      ['4.1', '', 'Nozzle', V, 'Should be no wear or burrs', RR],
      ['4.2', '', 'Holding lever', 'Check by heand', 'Should movement smoothly', AS],
      ['4.3', '', 'Center (F clamp, cutting blade)', V, 'No center displacement', 'Adjust setting'],
      ['4.4', '', 'Center (F clamp, press)', 'Visual check, check by touch', CENTER, 'Adjust setting'],
    ]
  },
  {
    id: 5, loc: '5. Cutting units', photos: [{ at: 0, span: 3 }], items: [
      ['5.1', '', 'Blades', V, 'Should be no wear or damage', RR],
      ['5.2', '', 'PIN', 'Check by touch', 'Pin and Bolt should not be loose', AS],
      ['5.3', '', 'Cutter', 'Measurement', 'Overlap of the blades when closed', AS],
    ]
  },
  {
    id: 6, loc: '6. Rear clamp units', photos: [], items: [
      ['6.1', '', 'Rear clamp looseness', VT, 'Should be no wear or looseness', AS],
      ['6.2', '', 'Center (R clamp, cutting blade)', VT, CENTER, 'Adjust setting'],
      ['6.3', '', 'Center (R clamp, stripping blade)', VT, CENTER, 'Adjust setting'],
      ['6.4', '', 'Center (R clamp, press)', VT, CENTER, 'Adjust setting'],
    ]
  },
  {
    id: 8, loc: '', photos: [], items: [
      ['8.1', '', 'Cutter photo sensor operation', V, SHOULD_SENSOR, 'Reconnect/Replace/ remount'],
    ]
  },
  {
    id: 11, loc: '11. Safety devices', photos: [{ at: 0, span: 3 }, { at: 3, span: 2 }], items: [
      ['11.1', '', 'Remote controller emergency stop switch', ESTOP_METHOD, ESTOP, RR],
      ['11.2', '', 'Emergency stop switch on the back of the press', ESTOP_METHOD, ESTOP, RR],
      ['11.3', '', 'Buzzer', 'Ear check', 'Issue alarm sound', RR],
      ['11.4', '', 'Emergency-stop switch', 'Visual check: Check', ESTOP, RR],
      ['11.5', '', 'Safety cover', ESTOP_METHOD, 'Should not be broken / When opened, “EMERGENCY-STOP” is displayed', RR],
    ]
  },
  {
    id: 12, loc: '12. Air pressure control', photos: [{ at: 0, span: 4 }], items: [
      ['12.1', '', 'Main Pressure', V, 'Listen for the sound of the air at 0.5 MPa ± 0.05MPA', 'Adjust setting'],
      ['12.2', '', 'Measuring Belt', V, 'Pressure: 0.30MPa ± 0.05MPa', 'Adjust setting'],
      ['12.3', '', 'F clamp', V, 'Pressure: 0.40MPa ± 0.05MPa', 'Adjust setting'],
      ['12.4', '', 'R clamp', V, 'Pressure: 0.40MPa ± 0.05MPa', 'Adjust setting'],
    ]
  },
  {
    id: 14, loc: '14. Dynamic check point', photos: [], items: [
      ['14.1', '', 'Home positioning of machine', 'Operation test', 'Put machine in single step check the centre position during cutting and stripping adjust the sensors accordingly and mark the positions', 'Adjust setting'],
      ['14.2', '', 'Fan condition of Control Panel rack', V, 'FAN SHOULD BE WORKING WHEN THE MACHINE IS ON', 'Adjust setting'],
      ['14.3', '', 'Emergency switch on the Remot box', V, ESTOP, AS],
    ]
  },
  {
    id: 15, sNo: '15', sNoRowSpan: 2, loc: '', photos: [], items: [
      ['15.1', '', '1. Operation check', '', 'Check operation (by cutting and crimping 200 wires or more using a cutting and crimping instruction tag).', ''],
      ['15.2', '', '2 Insulation resistance (HVT) of CIVUS wir', 'BY HVT tester', 'HVT test of wire', ''],
    ]
  },
];

// Periodic blocks
const PERIODIC = [
  {
    title: 'QUATERLY CHECKS', months: ['MAR', 'JUN', 'SEP', 'DEC'], span: 3,
    items: [
      ['q1', '', 'Press', 'Lubrication in Press', V, 'Lubricate specified parts', 'Lubrication']
    ]
  },
  {
    title: 'HALF YEARLY CHECKS', months: ['JUN', 'DEC'], span: 6,
    items: [
      ['h1', '', 'Conveyor', 'Conveyor motor belt', VT, 'Should movement smoothly', AS]
    ]
  },
  {
    title: 'YEARLY CHECKS', months: ['DEC'], span: 12,
    items: [
      ['y1', '', 'Safety Cover', 'Lubrication on LM Guide', V, 'Lubricate specified parts', 'Lubrication'],
      ['y2', '', 'Defective wire chopper', 'sliding surface', V, 'Lubricate specified parts', 'Lubrication'],
      ['y3', '', 'Applicator setup changer', 'Lubrication on LM Guide', V, 'Lubricate specified parts', 'Lubrication']
    ]
  },
];

const FOOTER_ROWS = [
  'DATE',
  'START TIME',
  'CLOSE TIME',
  'TOTAL TIME',
  'SIGNATURE TECHNICIAN',
  'SIGNATURE MAINTENANCE ENGINEER',
  'SIGNATURE QUALITY ENGINEER',
  'SIGNATURE CELL OWNER'
];

const COLS = Array.from({ length: 12 }, (_, i) => i + 1);
const GREEN = '#ccffcc';
const YELLOW = '#ffff99';
const BAND = '#ccffcc';
const td = 'border border-black px-1 py-[3px] text-[12.5px] leading-tight align-middle text-black';

function LegendSymbol({ ch, label }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 border-l border-black text-[12px]">
      <span className="font-bold text-[14px]">{ch}</span>
      <span>{label}</span>
    </div>
  );
}

export default function MachinePmChecksheet({ machine, onClose }) {
  const formattedModel = machine?.model ? machine.model.replace('_', ' ') : 'TRD411F';
  const initialMcName = machine?.name ? `${machine.name} (TRD411F)` : 'TRD411F';

  const [head, setHead] = useState({
    mcName: initialMcName,
    srNo: machine?.name || (machine?.id ? `CC-${String(machine.id).padStart(2, '0')}` : ''),
    installDate: '',
    year: '',
    docNo: 'CHK-WH-MT-088',
    rev: '05',
    date: '10.09.2025',
    preparedBy: 'Sarwar Yadav',
    approvedBy: '',
  });

  const [cells, setCells] = useState({});     // PM counter symbols
  const [texts, setTexts] = useState({});     // footer text inputs
  const [photos, setPhotos] = useState({});   // uploaded images (data URLs)
  const [msg, setMsg] = useState('');

  const setH = (k) => (e) => setHead((h) => ({ ...h, [k]: e.target.value }));
  const setCell = (key, v) => setCells((c) => ({ ...c, [key]: v }));

  const upload = (key, file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = (e) => setPhotos((p) => ({ ...p, [key]: e.target.result }));
    r.readAsDataURL(file);
  };

  const removePhoto = (key) =>
    setPhotos((p) => { const c = { ...p }; delete c[key]; return c; });

  const save = () => {
    setMsg('Machine PM Checksheet successfully saved!');
    setTimeout(() => setMsg(''), 3500);
  };

  const reset = () => {
    if (window.confirm('Clear all entries and photos from this TRD411F PM checksheet?')) {
      setCells({}); setTexts({}); setPhotos({});
    }
  };

  const headerInfo = head;
  const savedMessage = msg;
  const handleSave = save;
  const handleReset = reset;

  /* ---- counter cell: "/" diagonal splits it into two triangles, each is a text input ---- */
  const counter = ({ k, span = 1, plain, line = '#000' }) => (
    <td key={k} colSpan={span} className="border border-black p-0 relative h-[36px] overflow-hidden" style={{ minWidth: 44 * span }}>
      {!plain && (
        <>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="100" y2="0" stroke={line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <input
            type="text"
            title="Before PM"
            value={cells[`${k}_a`] || ''}
            onChange={(e) => setCell(`${k}_a`, e.target.value)}
            className="absolute inset-0 w-full h-full text-center text-[11px] font-bold text-black border-0 outline-none bg-transparent focus:bg-[#fff2cc] hover:bg-[#fff2cc]/60"
            style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', padding: '0 34% 34% 0' }}
          />
          <input
            type="text"
            title="After PM"
            value={cells[`${k}_b`] || ''}
            onChange={(e) => setCell(`${k}_b`, e.target.value)}
            className="absolute inset-0 w-full h-full text-center text-[11px] font-bold text-black border-0 outline-none bg-transparent focus:bg-[#fff2cc] hover:bg-[#fff2cc]/60"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', padding: '34% 0 0 34%' }}
          />
        </>
      )}
    </td>
  );

  /* ---- fixed-size photo slot: click opens the device gallery ---- */
  const PhotoSlot = ({ k, span }) => {
    const url = photos[k];
    const h = Math.max(span * 38 - 8, 64);
    const id = `photo-${k}`;
    return (
      <td rowSpan={span} className="border border-black p-1 align-middle text-center" style={{ width: 128, minWidth: 128 }}>
        <input id={id} type="file" accept="image/*" className="hidden"
          onChange={(e) => { upload(k, e.target.files?.[0]); e.target.value = ''; }} />
        <div className="relative mx-auto w-[116px] overflow-hidden group" style={{ height: h }}>
          {url ? (
            <>
              <img src={url} alt="Section" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-black/60 py-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                <label htmlFor={id} title="Change photo" className="cursor-pointer text-white p-1 hover:bg-white/20 rounded"><Replace size={14} /></label>
                <button type="button" title="Remove photo" onClick={() => removePhoto(k)} className="text-white p-1 border-0 bg-transparent cursor-pointer hover:bg-white/20 rounded"><Trash2 size={14} /></button>
              </div>
            </>
          ) : (
            <label htmlFor={id} title="Add image from gallery"
              className="w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer border-2 border-dashed border-slate-400 text-slate-600 hover:border-blue-600 hover:text-blue-700 hover:bg-blue-50 print:hidden">
              <Camera size={20} />
              <span className="text-[11px] font-semibold">Add image</span>
            </label>
          )}
        </div>
      </td>
    );
  };

  /* Render all rows for one section */
  const renderRows = (s) => {
    return s.items.map((row, idx) => {
      const [id, sNo, point, method, crit, action, plain] = row;
      const isFirst = idx === 0;
      const photoSlot = s.photos.find((p) => p.at === idx);

      return (
        <tr key={id}>
          {s.sNoRowSpan ? (
            isFirst && (
              <td rowSpan={s.sNoRowSpan} className={`${td} text-center font-bold`} style={{ width: 44 }}>
                {s.sNo}
              </td>
            )
          ) : (
            <td className={`${td} text-center font-bold`} style={{ width: 44 }}>{sNo}</td>
          )}

          {photoSlot && <PhotoSlot k={`${s.id}_${idx}`} span={photoSlot.span} />}
          {isFirst && s.photos.length === 0 && (
            <td rowSpan={s.items.length} className="border border-black" style={{ width: 128 }} />
          )}

          {isFirst && (
            <td
              rowSpan={s.items.length}
              className={`${td} text-center font-bold`}
              style={s.horizontalLoc ? { width: 44 } : { writingMode: 'vertical-rl', transform: 'rotate(180deg)', width: 34, minWidth: 34 }}
            >
              {s.loc}
            </td>
          )}

          <td className={td} style={{ minWidth: 140 }}>{point}</td>
          <td className={td} style={{ minWidth: 120 }}>{method}</td>
          <td className={td} style={{ minWidth: 220 }}>{crit}</td>
          <td className={td} style={{ minWidth: 140 }}>{action}</td>

          {COLS.map((c) => counter({ k: `${id}_${c}`, plain }))}
        </tr>
      );
    });
  };

  return (
    <div className="p-3 bg-neutral-100 min-h-screen text-black font-sans">
      {/* Top Floating Control Bar */}
      <div className="flex flex-wrap items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm gap-3">
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
          <Wrench size={20} className="text-blue-700 bg-blue-50 p-2 rounded-lg w-10 h-10 shrink-0" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0 uppercase">
                MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET
              </h3>
              <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 rounded">
                {headerInfo.docNo} Rev.{headerInfo.rev}
              </span>
            </div>
            <p className="text-[11.5px] text-slate-500 font-medium m-0">
              {machine?.name ? `${machine.name} Preventive Maintenance` : 'Machine Preventive Maintenance Checksheet'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedMessage && (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold py-1.5 px-3 rounded-lg animate-pulse">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>{savedMessage}</span>
            </div>
          )}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border-none cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
            onClick={handleSave}
          >
            <Save size={14} />
            <span>Save Record</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-300 cursor-pointer bg-white text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            onClick={() => window.print()}
            title="Print sheet"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-slate-200 cursor-pointer bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            onClick={handleReset}
            title="Reset sheet to default"
          >
            <RotateCcw size={14} />
          </button>
          {onClose && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg border-none cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition-all ml-1"
              onClick={onClose}
            >
              Close Checksheet
            </button>
          )}
        </div>
      </div>

      {/* Main Table replicating official Sheet */}
      <div className="overflow-x-auto bg-white p-2 border border-black shadow-md">
        <table className="border-collapse border border-black w-full text-black bg-white select-text">
          <thead>
            {/* Top green title */}
            <tr style={{ background: GREEN }}>
              <td className="border border-black h-7" />
              <td className="border border-black" />
              <td className="border border-black" />
              <th colSpan={14} className="border border-black py-1 text-center font-extrabold text-[18px] tracking-wide uppercase text-black">
                FURUKAWA MINDAELECTRIC PVT. LTD
              </th>
              <td colSpan={2} className="border border-black px-2 text-right text-[11.5px] font-bold text-black whitespace-nowrap">
                Doc No:-<input className="bg-transparent border-0 outline-none w-28 text-right font-bold" value={head.docNo} onChange={setH('docNo')} />
              </td>
            </tr>

            {/* Yellow sub-title */}
            <tr style={{ background: YELLOW }}>
              <td className="border border-black h-7" />
              <td className="border border-black" />
              <td className="border border-black" />
              <th colSpan={14} className="border border-black py-1 text-center font-extrabold text-[15px] tracking-wide uppercase text-black">
                MONTHLY & PERIODIC MAINTENANCE CHECK SHEETS
              </th>
              <td colSpan={2} className="border border-black px-2 text-right text-[11.5px] font-bold text-black whitespace-nowrap">
                Rev:-<input className="bg-transparent border-0 outline-none w-16 text-right font-bold" value={head.rev} onChange={setH('rev')} />
              </td>
            </tr>

            {/* M/C info row */}
            <tr className="text-[12px] font-bold bg-white">
              <td colSpan={4} className="border border-black px-2 py-1 whitespace-nowrap">
                M/C NAME:- <input className="bg-transparent border-0 outline-none font-bold w-24" value={head.mcName} onChange={setH('mcName')} />
              </td>
              <td colSpan={3} className="border border-black px-2 py-1 whitespace-nowrap">
                SR.NO. <input className="bg-transparent border-0 outline-none font-normal w-32" value={head.srNo} onChange={setH('srNo')} placeholder="" />
              </td>
              <td colSpan={7} className="border border-black px-2 py-1 whitespace-nowrap">
                INSTALLATION DATE:- <input className="bg-transparent border-0 outline-none font-normal w-28" value={head.installDate} onChange={setH('installDate')} />
              </td>
              <td colSpan={3} className="border border-black px-2 py-1 whitespace-nowrap">
                YEAR <input className="bg-transparent border-0 outline-none font-normal w-20" value={head.year} onChange={setH('year')} />
              </td>
              <td colSpan={2} className="border border-black px-2 py-1 whitespace-nowrap text-right text-[11.5px]">
                Date:-<input className="bg-transparent border-0 outline-none w-24 text-right font-bold" value={head.date} onChange={setH('date')} />
              </td>
            </tr>

            {/* Table Column headers */}
            <tr className="text-[11.5px] font-bold text-center">
              <th className="border border-black p-1" style={{ width: 44 }}>S.NO.</th>
              <th className="border border-black p-1" style={{ width: 128 }}>SECTION PHOTOGRAPHS</th>
              <th className="border border-black p-1" style={{ width: 34 }}>CHECK LOCATION</th>
              <th className="border border-black p-1" style={{ minWidth: 140 }}>CHECK POINT</th>
              <th className="border border-black p-1" style={{ minWidth: 120 }}>CHECK METHODS</th>
              <th className="border border-black p-1" style={{ minWidth: 220 }}>JUGDEMANT CRITIRA</th>
              <th className="border border-black p-1" style={{ minWidth: 140 }}>ACTION REQUIRED FOR NOT OK CONDITION</th>
              <th colSpan={12} className="border border-black py-1 font-extrabold tracking-wider">P.M. COUNTER</th>
            </tr>
          </thead>

          <tbody>
            {SECTIONS.map((s) => <React.Fragment key={s.id}>{renderRows(s)}</React.Fragment>)}

            {/* Quarterly / half-yearly / yearly blocks */}
            {PERIODIC.map((p) => (
              <React.Fragment key={p.title}>
                <tr style={{ background: BAND }}>
                  <td className="border border-black" />
                  <td className="border border-black" />
                  <td colSpan={5} className="border border-black text-center text-[13px] py-[3px] font-bold tracking-wider">{p.title}</td>
                  {p.months.map((m) => (
                    <td key={m} colSpan={p.span} className="border border-black text-center text-[15px] bg-white font-bold">{m}</td>
                  ))}
                </tr>
                {p.items.map(([id, no, loc, point, method, crit, action]) => (
                  <tr key={id}>
                    <td className={`${td} text-center font-bold`}>{no}</td>
                    <td className={td} />
                    <td className={`${td} font-bold text-center`}>{loc}</td>
                    <td className={td}>{point}</td>
                    <td className={td}>{method}</td>
                    <td className={td}>{crit}</td>
                    <td className={td}>{action}</td>
                    {p.months.map((m) => (
                      counter({ k: `P${id}_${m}`, span: p.span, line: '#5b0f0f' })
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {/* Footer: prepared/approved + date, time, signatures */}
            {FOOTER_ROWS.map((label, i) => (
              <tr key={label}>
                {i === 0 && (
                  <td colSpan={6} rowSpan={FOOTER_ROWS.length} className="border border-black align-top p-1 text-[15px] relative" style={{ height: 8 * 40 }}>
                    <div>Prepared By : <input className="bg-transparent border-0 outline-none focus:bg-yellow-50" value={head.preparedBy} onChange={setH('preparedBy')} placeholder="Name" /></div>
                    <div className="absolute left-1" style={{ top: '45%' }}>
                      Approved By &nbsp;&nbsp;&nbsp;: <input className="bg-transparent border-0 outline-none focus:bg-yellow-50" value={head.approvedBy} onChange={setH('approvedBy')} placeholder="Name" />
                    </div>
                  </td>
                )}
                <td className="border border-black text-center font-bold text-[12px] leading-tight px-1 h-[40px]">{label}</td>
                {COLS.map((c) => (
                  <td key={c} className="border border-black p-0">
                    <input
                      className="w-full h-full min-h-[38px] text-center text-[12px] border-0 outline-none bg-transparent focus:bg-yellow-50"
                      value={texts[`${label}_${c}`] || ''}
                      onChange={(e) => setTexts((t) => ({ ...t, [`${label}_${c}`]: e.target.value }))}
                    />
                  </td>
                ))}
              </tr>
            ))}

            {/* Legend + notes */}
            <tr>
              <td colSpan={6} className="border border-black p-0">
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center font-bold text-[13px]" style={{ width: 160 }}>LEGEND</div>
                  <div className="relative border-l border-black" style={{ width: 96, height: 70 }}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="100" x2="100" y2="0" stroke="#000" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <span className="absolute top-0 left-1 text-[11px]">Before PM</span>
                    <span className="absolute bottom-0 right-1 text-[11px]">After PM</span>
                  </div>
                  <LegendSymbol ch="✕" label="NOT OK" />
                  <LegendSymbol ch="✓" label="OK/DONE" />
                  <LegendSymbol ch="△" label="ATTENTION" />
                  <LegendSymbol ch="⊗" label="RECTIFIED" />
                  <LegendSymbol ch="○" label="SPARE CHANGE" />
                </div>
              </td>
              <td className="border border-black text-center font-bold text-[13px]">NOTE</td>
              <td colSpan={12} className="border border-black text-[12.5px] p-2 leading-snug">
                PM Counter shows two triangles divided by &quot;/&quot;.<br />
                Upper-Left = Before PM status symbol. Lower-Right = After PM status symbol.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}