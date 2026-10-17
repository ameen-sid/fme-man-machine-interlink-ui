import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import React, { useState } from 'react';
import { Save, RotateCcw, Printer, Camera, Trash2, Replace, CheckCircle2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA  (taken row-by-row from the TRD301 Excel sheet)               */
/*  photos: [{ at: firstRowIndex, span: rowsCovered }]  -> upload slots */
/*  plain: true -> counter cells without the diagonal (as in the sheet) */
/* ------------------------------------------------------------------ */
const V = 'Visual check';
const VT = 'Visual check, check by touch';
const AS = 'Adjust setting/Replace';
const RR = 'Replace if required';
const CENTER = 'No center displacement (within 1mm)  /  No looseness';
const SHOULD_SENSOR = 'Photo sensor should be shielded just before the stroke end';
const ESTOP = 'Should not be broken / When pressed, “EMERGENCY-STOP” is displayed and the button remains depressed';
const ESTOP_METHOD = 'Visual check: Check (front & rear)';
const DETECT = 'Proper appearance / Should detect the absence of rubber seals';
const OPT = 'Operation test (front and rear)';

const SECTIONS = [
  {
    id: 1, loc: '1.Whole', photos: [], items: [
      ['1.1', 'Cleaning', V, 'Should be no scrap or dirt', 'Clean with clothes', true],
      ['1.2', 'Lubrication', V, 'Lubricate specified parts', 'Lubrication', true],
      ['1.3', 'Wiring and piping conditions', V, 'Air hoses and wires have no frictions and are bound', RR],
    ]
  },
  {
    id: 2, loc: '2.Prefeeder units', photos: [], items: [
      ['2.1', 'Straightener', 'Check by touch', 'Should rotate smoothly', AS],
      ['2.2', 'Control lever', 'Checkl by touch', 'Should move smoothly', AS],
    ]
  },
  {
    id: 3, loc: '3. Measuring units', photos: [{ at: 0, span: 6 }], items: [
      ['3.1', 'Timing belt', V, 'Check tension and wear', AS],
      ['3.2', 'Measuring rollers looseness', 'by tool', 'Should not be loose', AS],
      ['3.3', 'Link and pin parts looseness', 'by tool', 'Should not be loose', AS],
      ['3.4', 'Bearing', 'Bearing condition check after remove the bearing form shaft and base', 'Should be free movement', RR],
      ['3.5', 'Roller gap adjustment bolt position mark check', V, 'Should be marking match of bolt and base', AS],
      ['3.5', 'Motor pulley , Motor Shaft and Key condition check', V, 'Should be no damage', RR],
    ]
  },
  {
    id: 4, loc: '4. Front clamp units', photos: [{ at: 0, span: 3 }], items: [
      ['4.1', 'Nozzle', V, 'Should be no wear or burrs', RR],
      ['4.2', 'Wire path wear & F side breaket assembly condition', V, 'Should be no wear in the wire path parts', RR],
      ['4.3', 'Center (F clamp, cutting blade)', VT, CENTER, AS],
      ['4.4', 'Center (F clamp, stripping blade)', VT, CENTER, AS],
      ['4.5', 'Center (F clamp, press)', VT, 'No center displacement / No looseness', AS],
    ]
  },
  {
    id: 5, loc: '5. Cutting units', photos: [{ at: 0, span: 3 }], items: [
      ['5.1', 'Blades', V, 'Should be no wear or damage', RR],
      ['5.2', 'Cutter holder', 'Check by touch', 'Cutter holder and shaft should not be loose', AS],
      ['5.3', 'Cutter', 'Measurement', 'Overlap of the blades when closed: approx 1.0mm (0.5mm~1.5mm)', 'Adjust setting'],
      ['5.4', 'Air Blow ON/OFF', 'Listen for sound', 'Listen for the sound of the air at 0.5 MPa ~ 0.6MPa', 'Adjust setting'],
    ]
  },
  {
    id: 6, loc: '6. Rear clamp units', photos: [{ at: 0, span: 3 }], items: [
      ['6.1', 'Rear clamp looseness', VT, 'Should be no wear or looseness', RR],
      ['6.2', 'Center (R clamp, cutting blade)', VT, CENTER, 'Adjust setting'],
      ['6.3', 'Center (R clamp, stripping blade)', VT, CENTER, 'Adjust setting'],
      ['6.4', 'Center (R clamp, press)', VT, 'No center displacement / No looseness', 'Adjust setting'],
    ]
  },
  {
    id: 7, loc: '7. Discharge units', photos: [{ at: 0, span: 2 }], items: [
      ['7.1', 'Timing belt', V, 'Check belt tension and wear', AS],
      ['7.2', 'Discharge unit looseness', 'by tool', 'Should not be loose', AS],
      ['7.3', 'Cover lock', 'Check by touch', 'Should neither be loose nor displaced', 'Adjust setting'],
    ]
  },
  {
    id: 8, loc: '8. sensor', photos: [], items: [
      ['8.1', 'FX and FY photo sensor operation', V, SHOULD_SENSOR, 'Adjust setting'],
      ['8.2', 'RX and RY photo sensor operation', V, SHOULD_SENSOR, 'Adjust setting'],
      ['8.3', 'Cutter photo sensor operation', V, SHOULD_SENSOR, 'Adjust setting'],
      ['8.4', 'Discharge photo sensor operation', V, SHOULD_SENSOR, 'Adjust setting'],
    ]
  },
  {
    id: 9, loc: '09. Safety devices', photos: [{ at: 0, span: 2 }, { at: 2, span: 2 }], items: [
      ['9.1', 'Remote controller emergency stop switch', ESTOP_METHOD, ESTOP, RR],
      ['9.2', 'Emergency stop switch on the back of the press', ESTOP_METHOD, ESTOP, RR],
      ['9.3', 'Press panel emergency stop switch', ESTOP_METHOD, ESTOP, RR],
      ['9.4', 'Safety cover', ESTOP_METHOD, 'Should not be broken / When opened, “EMERGENCY-STOP” is displayed', RR],
    ]
  },
  {
    id: 10, loc: '10. Air pressure control', photos: [{ at: 0, span: 3 }], items: [
      ['10.1', 'Main', V, 'Pressure: 0.4MPa ~ 0.6MPa', 'Adjust setting'],
      ['10.2', 'Measuring roller', V, 'Pressure: 0.3MPa ~ 0.5MPa', 'Adjust setting'],
      ['10.3', 'F clamp', V, 'Pressure: 0.3MPa ~ 0.5MPa', 'Adjust setting'],
      ['10.4', 'R clamp', V, 'Pressure: 0.3MPa ~ 0.5MPa', 'Adjust setting'],
      ['10.5', 'Discharge clamp', V, 'Pressure: 0.3MPa ~ 0.5MPa', 'Adjust setting'],
    ]
  },
  {
    id: 11, loc: '11. Detector', photos: [{ at: 0, span: 2 }, { at: 3, span: 2 }], items: [
      ['11.1', 'Strip sensor detection value', OPT, '1010± 10 using 1.6mm diameter rod', 'Adjust setting'],
      ['11.2', 'Strip sensor detection accuracy', OPT, 'To detect AVSS0.5sq wire with about 50% (3 out of 7) strand remaining', 'Adjust setting'],
      ['11.3', 'Strip sensor accuracy control', 'Check registration value', '“STRIP SENSOR %” should be 25% or less', 'Adjust setting'],
      ['11.4', 'Miscrimping detector', OPT, DETECT, 'Adjust setting'],
      ['11.5', 'Terminal presence detection', OPT, DETECT, 'Adjust setting'],
      ['11.6', 'Joint detector', 'Operation test', DETECT, 'Adjust setting'],
    ]
  },
  {
    id: 12, loc: '12. Dynamic check point', photos: [], items: [
      ['12.1', 'Home positioning of machine', 'Operation test', 'Put machine in single step check the centre position during cutting and stripping adjust the sensors accordingly and mark the positions', 'Adjust setting'],
      ['12.2', 'Fan condition of Control Panel rack', V, 'Fan should be working when the machine ON', RR],
      ['12.3', 'Emergency switch on the Remot box', 'by hand', ESTOP, RR],
    ]
  },
  {
    id: 13, loc: '13', horizontalLoc: true, photos: [], items: [
      ['13', 'Operation check', V, 'Check operation (by cutting and crimping 200 wires or more using a cutting and crimping instruction tag).', RR],
    ]
  },
  {
    id: 14, loc: '14', horizontalLoc: true, photos: [], items: [
      ['14', 'Insulation resistance (HVT) of CIVUS wire', 'BY HVT tester', 'HVT test of wire', '', true],
    ]
  },
];

// Periodic blocks: spans = how many of the 12 counter columns each cell covers
const PERIODIC = [
  {
    title: 'QUATERLY CHECKS', months: ['MAR', 'JUN', 'SEP', 'DEC'], span: 3,
    items: [['1', 'Motor Drive', V, 'Should be no scrap or dirt', 'Clean with air vacuum Gun']]
  },
  {
    title: 'HALF YEARLY CHECK POINT', months: ['JUN', 'DEC'], span: 6,
    items: [['2', 'Motor pulley', 'Replaced motor pulley', 'Should be New pulley', 'New pulley installed']]
  },
  {
    title: 'YEARLY CHECK POINT', months: ['DEC'], span: 12,
    items: [['3', 'F clamp mounting plate', V, 'Should be no crack in F clamp mountion plate', RR]]
  },
];

const FOOTER_ROWS = ['DATE', 'START TIME', 'CLOSE TIME', 'TOTAL TIME', 'SIGNATURE TECHNICIAN',
  'SIGNATURE MAINTENANCE ENGINEER', 'SIGNATURE QUALITY ENGINEER', 'SIGNATURE CELL OWNER'];

const COLS = Array.from({ length: 12 }, (_, i) => i + 1);
const GREEN = '#ccffcc';
const YELLOW = '#ffff99';
const BAND = '#c4d79b';
const td = 'border border-black px-1 py-[3px] text-[12.5px] leading-tight align-middle text-black';

/* ------------------------------------------------------------------ */
export default function MachinePmChecksheet({ machine, onClose }) {
  const formattedModel = machine?.model ? machine.model.replace('_', ' ') : 'TRD 301';
  const initialMcName = machine?.name ? `${machine.name} (${formattedModel}) CUT & CRIMP MACHINE` : `${formattedModel} CUT & CRIMP MACHINE`;

  const [head, setHead] = useState({
    mcName: initialMcName,
    srNo: machine?.name || (machine?.id ? `CC-${String(machine.id).padStart(2, '0')}` : ''),
    installDate: '',
    year: '',
    docNo: 'CHK-WH-MT-042',
    rev: '17',
    date: '15.11.2025',
    preparedBy: 'Yogesh',
    approvedBy: 'Sarwar Yadav',
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
    setMsg('Checksheet saved');
    setTimeout(() => setMsg(''), 3500);
  };
  const reset = () => {
    if (window.confirm('Clear all entries and photos from this checksheet?')) {
      setCells({}); setTexts({}); setPhotos({});
    }
  };

  /* ---- counter cell: "/" diagonal splits it into two triangles, each is a text input ----
     upper-left = Before PM, lower-right = After PM.
     (Plain function, not a component, so inputs keep focus while typing.) */
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

  /* ---- rows of one main section ----
     Item format: [no, checkPoint, method, criteria, action, plainCells?]
     The vertical "CHECK LOCATION" column is the section name. */
  const rows = (s) => {
    const starts = Object.fromEntries(s.photos.map((p, i) => [p.at, { ...p, i }]));
    const covered = new Set(s.photos.flatMap((p) => Array.from({ length: p.span - 1 }, (_, j) => p.at + 1 + j)));
    return s.items.map(([no, point, method, crit, action, plain], idx) => (
      <tr key={`${s.id}-${idx}`}>
        <td className={`${td} text-center`} style={{ width: 40 }}>{no}</td>
        {starts[idx]
          ? <PhotoSlot k={`${s.id}_${starts[idx].i}`} span={starts[idx].span} />
          : !covered.has(idx) && <td className={td} style={{ width: 128 }} />}
        {idx === 0 && (
          <td rowSpan={s.items.length} className="border border-black p-0 text-center align-middle" style={{ width: 44 }}>
            {s.horizontalLoc
              ? <span className="text-[12.5px]">{s.loc}</span>
              : <div className="mx-auto text-[12.5px] whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{s.loc}</div>}
          </td>
        )}
        <td className={td} style={{ minWidth: 200 }}>{point}</td>
        <td className={td} style={{ minWidth: 150 }}>{method}</td>
        <td className={td} style={{ minWidth: 230 }}>{crit}</td>
        <td className={td} style={{ minWidth: 150 }}>{action}</td>
        {COLS.map((c) => counter({ k: `${s.id}_${idx}_${c}`, plain: plain === true }))}
      </tr>
    ));
  };

  const LegendSymbol = ({ ch, label }) => (
    <div className="flex flex-col items-center justify-end border-l border-black px-5 pt-2">
      <span className="text-2xl leading-none">{ch}</span>
      <span className="text-[11px] font-bold mt-2">{label}</span>
    </div>
  );

  const inputCls = 'bg-transparent border-0 outline-none font-bold text-[14px] flex-1 min-w-0 focus:bg-yellow-50';

  return (
    <div className="flex flex-col gap-3 w-full font-sans pb-10">
      {/* toolbar (hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-300 rounded-lg px-4 py-2 print:hidden">
        <div className="text-sm font-bold text-slate-800">
          Monthly &amp; periodic maintenance check sheet — {head.docNo} Rev.{head.rev}
        </div>
        <div className="flex items-center gap-2">
          {msg && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded px-2 py-1">
              <CheckCircle2 size={14} /> {msg}
            </span>
          )}
          <button type="button" onClick={save} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border-0 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"><Save size={14} /> Save</button>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"><Printer size={14} /> Print</button>
          <button type="button" onClick={reset} title="Clear sheet" className="inline-flex items-center px-2.5 py-1.5 rounded border border-slate-300 bg-white text-slate-500 hover:text-red-600 cursor-pointer"><RotateCcw size={14} /></button>
          {onClose && <button type="button" onClick={onClose} className="text-xs font-semibold px-3 py-1.5 rounded border-0 bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer">Close Checksheet</button>}
        </div>
      </div>

      {/* the sheet */}
      <div className="overflow-x-auto bg-white border border-black">
        <div className="min-w-[1900px] text-black" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
          {/* Title bands */}
          <div className="grid border-b border-black" style={{ gridTemplateColumns: '1fr 300px', background: GREEN }}>
            <div className="text-center font-bold text-[26px] py-1 tracking-wide">FURUKAWA MINDAELECTRIC PVT. LTD</div>
            <div className="border-l border-black px-2 flex items-end text-[13px] pb-1">
              Doc No:-<input className="bg-transparent border-0 outline-none flex-1 min-w-0 focus:bg-yellow-50" value={head.docNo} onChange={setH('docNo')} />
            </div>
          </div>
          <div className="grid border-b border-black" style={{ gridTemplateColumns: '1fr 300px', background: YELLOW }}>
            <div className="text-center font-bold text-[20px] py-1.5">MONTHLY &amp; PERIODIC MAINTENANCE CHECK SHEETS</div>
            <div className="border-l border-black px-2 flex items-end text-[13px] pb-1">
              Rev:-<input className="bg-transparent border-0 outline-none flex-1 min-w-0 focus:bg-yellow-50" value={head.rev} onChange={setH('rev')} />
            </div>
          </div>

          {/* Machine info row */}
          <div className="grid border-b border-black items-end" style={{ gridTemplateColumns: '440px 1fr 540px 130px 300px' }}>
            <label className="flex items-end gap-1 px-1 py-1 font-bold text-[15px]">M/C NAME:-<input className={inputCls} value={head.mcName} onChange={setH('mcName')} /></label>
            <label className="flex items-end gap-1 px-1 py-1 font-bold text-[15px] border-l border-black">SR.NO.<input className={inputCls} value={head.srNo} onChange={setH('srNo')} /></label>
            <label className="flex items-end gap-1 px-1 py-1 font-bold text-[15px] border-l border-black">INSTALLATION DATE:-<input className={inputCls} value={head.installDate} onChange={setH('installDate')} /></label>
            <label className="flex items-end gap-1 px-1 py-1 font-bold text-[15px] border-l border-black">YEAR :-<input className={inputCls} value={head.year} onChange={setH('year')} /></label>
            <div className="border-l border-black px-2 py-1 text-[13px] flex items-end">
              Date:-<input className="bg-transparent border-0 outline-none flex-1 min-w-0 focus:bg-yellow-50" value={head.date} onChange={setH('date')} />
            </div>
          </div>

          <table className="w-full border-collapse" style={{ tableLayout: 'auto' }}>
            <thead>
              <tr className="text-[13px]">
                <th rowSpan={2} className={`${td} font-normal text-[11px]`}>S.NO.</th>
                <th rowSpan={2} className={`${td} font-normal`}>SECTION<br />PHOTOGRAPHS</th>
                <th rowSpan={2} className={`${td} font-normal`}>CHECK<br />LOCATION</th>
                <th rowSpan={2} className={`${td} font-normal`}>CHECK POINT</th>
                <th rowSpan={2} className={`${td} font-normal`}>Check methods</th>
                <th rowSpan={2} className={`${td} font-normal`}>JUGDEMANT CRITIRA</th>
                <th rowSpan={2} className={`${td} font-normal text-[12px]`}>ACTION&nbsp; REQUIRED FOR<br />NOT OK CONDITION</th>
                <th colSpan={12} className={`${td} font-bold text-[15px] text-center`}>P.M. COUNTER</th>
              </tr>
              <tr>{COLS.map((c) => <th key={c} className="border border-black h-3" />)}</tr>
            </thead>

            <tbody>
              {SECTIONS.map((s) => <React.Fragment key={s.id}>{rows(s)}</React.Fragment>)}

              {/* Quarterly / half-yearly / yearly blocks */}
              {PERIODIC.map((p) => (
                <React.Fragment key={p.title}>
                  <tr style={{ background: BAND }}>
                    <td colSpan={2} className="border border-black" />
                    <td colSpan={5} className="border border-black text-center text-[13px] py-[3px]">{p.title}</td>
                    {p.months.map((m) => (
                      <td key={m} colSpan={p.span} className="border border-black text-center text-[15px] bg-white">{m}</td>
                    ))}
                  </tr>
                  {p.items.map(([no, point, method, crit, action]) => (
                    <tr key={no}>
                      <td className={td} />
                      <td className={td} />
                      <td className={`${td} text-center`}>{no}</td>
                      <td className={td}>{point}</td>
                      <td className={td}>{method}</td>
                      <td className={td}>{crit}</td>
                      <td className={td}>{action}</td>
                      {p.months.map((m) => (
                        counter({ k: `P${no}_${m}`, span: p.span, line: '#5b0f0f' })
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
                      <div>Prepared By : <input className="bg-transparent border-0 outline-none focus:bg-yellow-50" value={head.preparedBy} onChange={setH('preparedBy')} /></div>
                      <div className="absolute left-1" style={{ top: '45%' }}>
                        Approved By &nbsp;&nbsp;&nbsp;: <input className="bg-transparent border-0 outline-none focus:bg-yellow-50" value={head.approvedBy} onChange={setH('approvedBy')} />
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
                  <div className="border-t border-black text-[12.5px]">
                    {[
                      'NOTE : 1    QUATERLY CHECKS WILL BE DONE IN  MAR,JUNE,SEPT,DEC',
                      'NOTE: 2,   INPUT FROM DAILY/WEEKLY, START UP CHECKSHEET RESULT & OBSERVATION SHEET SHOULD BE CONSIDERED',
                      'NOTE:3    REFER  MAINTENANCE MANNUAL DURING PREVENTIVE MAINTENANCE',
                      'NOTE:4    PREVENTIVE MAINTENANCE MUST BE DONE IN EVERY QUARTER.',
                    ].map((n, i) => (
                      <div key={i} className={`px-1 py-[2px] whitespace-pre ${i ? 'border-t border-black' : ''}`}>{n}</div>
                    ))}
                  </div>
                </td>
                <td colSpan={13} className="border-0" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}