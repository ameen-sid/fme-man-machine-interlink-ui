import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import React, { useState } from 'react';
import { CalendarCheck2, Save, RotateCcw, Plus, ArrowLeft } from 'lucide-react';

// =========================================================================
// TRD411F DAILY MACHINE CHECK SHEET DATA (EXACT REPLICA OF PHYSICAL SHEET)
// =========================================================================

// Part 1: Operator Startup Check Points (Shift Confirmation) - Exactly 12 Points
const INITIAL_OPERATOR_POINTS = [
    {
        id: 'op1',
        point: 'Check the Cleaning of Machine',
        hindi: 'मशीन की सफाई की जाँच करें',
        resp: 'Machine Operator',
        stdValue: 'No PVC / Chips',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op2',
        point: 'Check both side Knot detector working',
        hindi: 'दोनों साइड के नॉट डिटेक्टर काम करे रहे है',
        resp: 'Machine Operator',
        stdValue: 'Functioning OK',
        method: 'Test & Trial',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op3',
        point: 'Check Tower Light Functioning',
        hindi: 'टावर लाइट के फंक्शन को चेक करे',
        resp: 'Machine Operator',
        stdValue: 'Functioning OK',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op4',
        point: 'Check wire chopper',
        hindi: 'wire chopper को चेक करे',
        resp: 'Machine Operator',
        stdValue: 'Functioning OK',
        method: 'Test & Trial',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op5',
        point: 'Check the Main Incoming Pressure',
        hindi: 'मैन इनकमिंग प्रेशर को चेक करे',
        resp: 'Machine Operator',
        stdValue: '0.45 - 0.55mpa',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op6',
        point: 'Check the Measuring Belt Pressure',
        hindi: 'मैसुरिंग बेल्ट के प्रेशर को चेक करे',
        resp: 'Machine Operator',
        stdValue: '0.25 - 0.35mpa',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op7',
        point: 'Check the F Clamp Pressure',
        hindi: 'F क्लैंप प्रेशर को चेक करे',
        resp: 'Machine Operator',
        stdValue: '0.35 - 0.45mpa',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op8',
        point: 'Check the R Clamp Pressure',
        hindi: 'R क्लैंप प्रेशर को चेक करे',
        resp: 'Machine Operator',
        stdValue: '0.35 - 0.45mpa',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op9',
        point: 'Check safety cover operation and interlocking',
        hindi: 'सुरक्षा कवर ऑपरेशन और इंटरलॉकिंग की जाँच करें',
        resp: 'Machine Operator',
        stdValue: 'Machine will not operate when safety cover is open and smooth operation of safety cover',
        method: 'Test & Trial',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op10',
        point: 'Check Emergency Switch Functioning',
        hindi: 'आपातकालीन स्विच कामकाज की जाँच',
        resp: 'Machine Operator',
        stdValue: 'Machine should be stop after press the emergency switch',
        method: 'Test & Trial',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op11',
        point: 'Check The Adaptor Bolt & App, Locking Plate',
        hindi: 'एडाप्टर बोल्ट और एप्लिकेटर लॉक प्लेट को चेक करे',
        resp: 'Machine Operator',
        stdValue: 'Fitment',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'op12',
        point: 'Check the oil pot Availability with oil',
        hindi: 'ऑयल पॉट में तेल की उपलब्धता की जाँच करें',
        resp: 'Machine Operator',
        stdValue: 'Oil pot condition with oil',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    }
];

// Part 2A: Maintenance Shift Points (Daily Confirmation) - Exactly 5 Points
const INITIAL_MAINT_SHIFT_POINTS = [
    {
        id: 'mt1',
        point: 'Check the Four way wire roller Gap',
        hindi: 'Four way रोलर गैप की जाँच करें',
        resp: 'Maint. Technician',
        stdValue: '3mm ~ 4 mm',
        method: 'By Tool',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'mt2',
        point: 'Check level on water separator.',
        hindi: 'जल विभाजक पर स्तर की जाँच करें।',
        resp: 'Maint. Technician',
        stdValue: 'Should be empty',
        method: 'Visullay',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'mt3',
        point: 'Paper winder A Side & B Side',
        hindi: 'A साइड और B साइड के पेपर वाइंडर को चेक करे',
        resp: 'Maint. Technician',
        stdValue: 'Functioning OK',
        method: 'Test & trial',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'mt4',
        point: 'No wire Detector',
        hindi: 'No Wire सेंसर की कार्य स्थिति चेक करे',
        resp: 'Maint. Technician',
        stdValue: 'Functioning OK',
        method: 'Test & trial',
        freqD: '√',
        freqW: ''
    },
    {
        id: 'mt5',
        point: 'Strip Miss Sensor',
        hindi: 'Strip Miss सेंसर की कार्य स्थिति चेक करे',
        resp: 'Maint. Technician',
        stdValue: 'Functioning OK',
        method: 'Test & trial',
        freqD: '√',
        freqW: ''
    }
];

// Part 2B: Maintenance Weekly Points - Exactly 5 Points
const INITIAL_MAINT_WEEKLY_POINTS = [
    {
        id: 'mw1',
        point: 'Checks Emergency switch Functioning',
        hindi: 'इमरजेंसी स्विच के फंक्शन को चेक करे',
        resp: 'Maint. Technician',
        stdValue: 'Machine should be stop after press the emergency switch',
        method: 'Test & trial',
        freqD: '',
        freqW: '√'
    },
    {
        id: 'mw2',
        point: 'Check Conveyor belt alignment & Condition',
        hindi: 'कन्वेयर बेल्ट के संरेखण और स्थिति की जाँच करें',
        resp: 'Maint. Technician',
        stdValue: 'Functioning OK',
        method: 'Test & trial',
        freqD: '',
        freqW: '√'
    },
    {
        id: 'mw3',
        point: 'Check the blade condition',
        hindi: 'ब्लेड की कंडीशन की जाँच करें',
        resp: 'Maint. Technician',
        stdValue: 'Functioning / Product Quality',
        method: 'Test & trial',
        freqD: '',
        freqW: '√'
    },
    {
        id: 'mw4',
        point: 'Check the oil Grease Pot',
        hindi: 'ऑयल ग्रीस पॉट की जाँच करें',
        resp: 'Maint. Technician',
        stdValue: 'Available',
        method: 'Visullay',
        freqD: '',
        freqW: '√'
    },
    {
        id: 'mw5',
        point: 'Check the air leakage',
        hindi: 'मशीन में हवा के रिसाव की जाँच करें',
        resp: 'Maint. Technician',
        stdValue: 'No Leakage',
        method: 'By Hearing',
        freqD: '',
        freqW: '√'
    }
];

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);
const SHIFTS = ['A', 'B', 'C'];

function createEmptyGrid(points) {
    const grid = {};
    points.forEach(p => {
        grid[p.id] = {};
        for (let d = 1; d <= 31; d++) {
            grid[p.id][d] = {};
            SHIFTS.forEach(s => {
                grid[p.id][d][s] = '';
            });
        }
    });
    return grid;
}

function createEmptyWeeklyGrid(points) {
    const grid = {};
    points.forEach(p => {
        grid[p.id] = {};
        for (let d = 1; d <= 31; d++) {
            grid[p.id][d] = '';
        }
    });
    return grid;
}

// Exactly 10 blank abnormality rows as visible in the printed sheet
const INITIAL_ABNORMALITY_ROWS = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    date: '',
    shift: '',
    area: '',
    specificArea: '',
    abnormality: '',
    immediateAction: '',
    resp: '',
    targetDateTime: '',
    status: '',
    feedback: '',
    maintSign: '',
    prodSign: ''
}));

export default function DailyChecksheet({ machine, onClose }) {
    const formattedModel = machine?.model ? machine.model.replace('_', ' ') : 'TRD 411F';
    const initialMachineNo = machine?.name || (machine?.id ? `C&C ${String(machine.id).padStart(2, '0')}` : 'C&C 14');

    const [docMeta, setDocMeta] = useState({
        docNo: 'CHK-WH-MT-003',
        revNo: '07',
        date: '',
        modelName: formattedModel,
        machineName: machine?.name || formattedModel,
        machineNo: initialMachineNo
    });

    // Grids for 31 days
    const [operatorGrid, setOperatorGrid] = useState(() => createEmptyGrid(INITIAL_OPERATOR_POINTS));
    const [maintShiftGrid, setMaintShiftGrid] = useState(() => createEmptyGrid(INITIAL_MAINT_SHIFT_POINTS));
    const [maintWeeklyGrid, setMaintWeeklyGrid] = useState(() => createEmptyWeeklyGrid(INITIAL_MAINT_WEEKLY_POINTS));

    // Sign off inputs
    const [signOffs, setSignOffs] = useState({
        opShiftA: '',
        opShiftB: '',
        opShiftC: '',
        supervisorProd: '',
        maintAssocShiftA: '',
        maintAssocShiftB: '',
        maintAssocShiftC: '',
        techMaintSign: '',
        superMaintSign: '',
        remarks: '',
        footerProdSign: '',
        footerMaintSign: ''
    });

    const [abnormalities, setAbnormalities] = useState(INITIAL_ABNORMALITY_ROWS);
    const [savedToast, setSavedToast] = useState('');

    const handleCellChange = (setGridFn, pointId, day, shift, value) => {
        setGridFn(prev => {
            const copy = JSON.parse(JSON.stringify(prev));
            if (!copy[pointId]) copy[pointId] = {};
            if (!copy[pointId][day]) copy[pointId][day] = {};
            copy[pointId][day][shift] = value;
            return copy;
        });
    };

    const handleWeeklyCellChange = (pointId, day, value) => {
        setMaintWeeklyGrid(prev => {
            const copy = JSON.parse(JSON.stringify(prev));
            if (!copy[pointId]) copy[pointId] = {};
            copy[pointId][day] = value;
            return copy;
        });
    };

    const handleAbnormalChange = (idx, field, value) => {
        setAbnormalities(prev => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], [field]: value };
            return copy;
        });
    };

    const handleAddAbnormalityRow = () => {
        setAbnormalities(prev => [
            ...prev,
            {
                id: prev.length + 1,
                date: '',
                shift: '',
                area: '',
                specificArea: '',
                abnormality: '',
                immediateAction: '',
                resp: '',
                targetDateTime: '',
                status: '',
                feedback: '',
                maintSign: '',
                prodSign: ''
            }
        ]);
    };

    const handleSave = () => {
        setSavedToast('TRD411F Daily Checksheet saved successfully!');
        setTimeout(() => setSavedToast(''), 4000);
    };

    const handleReset = () => {
        if (window.confirm('Reset all values in this TRD411F Daily Checksheet?')) {
            setOperatorGrid(createEmptyGrid(INITIAL_OPERATOR_POINTS));
            setMaintShiftGrid(createEmptyGrid(INITIAL_MAINT_SHIFT_POINTS));
            setMaintWeeklyGrid(createEmptyWeeklyGrid(INITIAL_MAINT_WEEKLY_POINTS));
            setAbnormalities(INITIAL_ABNORMALITY_ROWS);
            setSignOffs({
                opShiftA: '',
                opShiftB: '',
                opShiftC: '',
                supervisorProd: '',
                maintAssocShiftA: '',
                maintAssocShiftB: '',
                maintAssocShiftC: '',
                techMaintSign: '',
                superMaintSign: '',
                remarks: '',
                footerProdSign: '',
                footerMaintSign: ''
            });
        }
    };

    const getCellBgClass = (val) => {
        if (!val) return '';
        const v = String(val).trim().toUpperCase();
        if (v === 'O' || v === 'OK' || v === '√') return 'bg-emerald-100 text-emerald-800 font-black';
        if (v === 'X' || v === 'NG') return 'bg-rose-100 text-rose-800 font-black';
        return 'bg-blue-50/70 text-blue-900 font-bold';
    };

    return (
        <div className="flex flex-col gap-4 w-full bg-slate-50 transition-all duration-200">
            {/* Action Bar */}
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
                    <CalendarCheck2 size={18} className="text-emerald-500 bg-emerald-50 p-2 rounded-lg w-9 h-9 box-content shrink-0" />
                    <div>
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">
                            FURUKAWA MINDA ELECTRIC PVT. LTD. — DAILY MACHINE CHECK SHEET
                        </h3>
                        <span className="text-[11.5px] text-slate-500 font-medium">
                            Machine: <strong>{docMeta.machineName || machine?.name || 'TRD411F'}</strong> • Format: <strong>{docMeta.docNo}</strong> • Rev: <strong>{docMeta.revNo}</strong>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {savedToast && (
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-md text-xs font-semibold">
                            {savedToast}
                        </div>
                    )}
                    <button
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        onClick={handleSave}
                    >
                        <Save size={15} />
                        <span>Save Record</span>
                    </button>
                    <button
                        className="inline-flex items-center gap-1.5 p-2 rounded-lg text-xs font-bold cursor-pointer transition-all bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600"
                        onClick={handleReset}
                        title="Reset table"
                    >
                        <RotateCcw size={15} />
                    </button>
                    {onClose && (
                        <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600"
                            onClick={onClose}
                        >
                            Close Checksheet
                        </button>
                    )}
                </div>
            </div>

            {/* Sheet Card */}
            <div className="bg-white border-2 border-slate-900 shadow-md rounded overflow-hidden">
                {/* Company Header Tag */}
                <div className="flex justify-end px-3 pt-2 pb-0.5 bg-white">
                    <span className="text-[11px] font-black tracking-wider text-slate-900 uppercase">
                        FURUKAWA MINDA ELECTRIC PVT. LTD.
                    </span>
                </div>

                {/* Top Meta Box */}
                <div className="border-t-2 border-b-2 border-slate-900 bg-white">
                    <div className="flex border-b border-slate-900">
                        <div className="flex-1 flex items-center px-4 py-2 bg-white">
                            <h1 className="text-xl sm:text-2xl font-black tracking-wide text-slate-900 uppercase m-0">
                                DAILY MACHINE CHECK SHEET
                            </h1>
                        </div>
                        <div className="w-60 min-w-[220px] border-l-2 border-slate-900 flex flex-col justify-center bg-white text-[11px] font-bold text-slate-900">
                            <div className="border-b border-slate-900 px-3 py-1 flex items-center">
                                <span className="whitespace-nowrap font-bold text-slate-900">Doc No.:</span>
                                <input
                                    type="text"
                                    className="border-none bg-transparent font-bold text-slate-900 outline-none w-32 ml-1"
                                    value={docMeta.docNo}
                                    onChange={(e) => setDocMeta({ ...docMeta, docNo: e.target.value })}
                                />
                            </div>
                            <div className="px-3 py-1 flex items-center">
                                <span className="whitespace-nowrap font-bold text-slate-900">REV:</span>
                                <input
                                    type="text"
                                    className="border-none bg-transparent font-bold text-slate-900 outline-none w-20 ml-1"
                                    value={docMeta.revNo}
                                    onChange={(e) => setDocMeta({ ...docMeta, revNo: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* SECTION 1: RELATED WITH M/C OPERATIONS (OPERATOR) */}
                {/* ========================================================= */}
                <div className="flex items-center justify-between border-b-2 border-slate-900 bg-[#cbd5e1] px-4 py-1.5">
                    <div className="text-sm font-black text-slate-950 flex items-center gap-1.5 tracking-wide">
                        <span>Machine name:-</span>
                        <span className="underline decoration-slate-950 underline-offset-4 decoration-2">{docMeta.modelName || 'TRD411F'}</span>
                    </div>
                    <div className="text-sm font-black italic tracking-wide text-slate-950 uppercase pr-8">
                        Releated with m/c operations
                    </div>
                    <div className="text-xs font-extrabold text-slate-900">
                        <span>MONTH: </span>
                        <input
                            type="text"
                            placeholder="e.g. October 2026"
                            className="bg-white px-2 py-0.5 rounded text-xs font-bold border border-slate-400 outline-none w-36 ml-1"
                            value={docMeta.date}
                            onChange={(e) => setDocMeta({ ...docMeta, date: e.target.value })}
                        />
                    </div>
                </div>

                {/* Table 1: Operator Points */}
                <div className="w-full overflow-x-auto border-b-2 border-slate-900">
                    <table className="w-full border-collapse text-[10.5px] min-w-[1550px]">
                        <thead>
                            <tr>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-60 max-w-[260px]">
                                    STARTUP CHECK POINTS<br />( SHIFT CONFIRMATION )
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-24">
                                    Resp.
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-36">
                                    Check Value
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-28">
                                    Method
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-14" colSpan={2}>
                                    FREQ
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-8" rowSpan={2}>
                                    Shift
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10.5px] align-middle" colSpan={31}>
                                    Daily Status
                                </th>
                            </tr>
                            <tr>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px] tracking-wide">
                                    ACTIVITY
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px]">
                                    Who
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px]">
                                    STD VALUE
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px] leading-tight">
                                    Measuring Method
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px] w-7">
                                    D
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px] w-7">
                                    W
                                </th>
                                {DAYS_31.map(d => (
                                    <th key={d} className="border border-slate-900 p-0.5 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] w-7 min-w-[28px]">
                                        {d}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {INITIAL_OPERATOR_POINTS.map((pt) => (
                                <React.Fragment key={pt.id}>
                                    {/* Shift A Row */}
                                    <tr>
                                        <td rowSpan={3} className="border border-slate-900 p-1 pl-2 text-left font-bold align-middle max-w-[260px]">
                                            <div className="text-[10.5px] font-extrabold text-slate-900 leading-snug">{pt.point}</div>
                                            <span className="text-[9.5px] text-slate-600 font-semibold block leading-tight mt-0.5">{pt.hindi}</span>
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-800 align-middle">
                                            {pt.resp}
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-[9.5px] font-bold text-slate-900 whitespace-pre-line align-middle">
                                            {pt.stdValue}
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-800 align-middle">
                                            {pt.method}
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-center text-xs font-black text-slate-900 align-middle w-7">
                                            {pt.freqD || '√'}
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-center text-xs font-black text-slate-900 align-middle w-7">
                                            {pt.freqW || ''}
                                        </td>
                                        <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-blue-700 w-8">
                                            A
                                        </td>
                                        {DAYS_31.map(d => {
                                            const val = operatorGrid[pt.id]?.[d]?.A || '';
                                            return (
                                                <td key={d} className="border border-slate-900 p-0 align-middle w-7 min-w-[28px] h-6 bg-white">
                                                    <input
                                                        className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-blue-100 ${getCellBgClass(val)}`}
                                                        value={val}
                                                        onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, 'A', e.target.value.toUpperCase())}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    {/* Shift B Row */}
                                    <tr>
                                        <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-amber-700 w-8">
                                            B
                                        </td>
                                        {DAYS_31.map(d => {
                                            const val = operatorGrid[pt.id]?.[d]?.B || '';
                                            return (
                                                <td key={d} className="border border-slate-900 p-0 align-middle w-7 min-w-[28px] h-6 bg-white">
                                                    <input
                                                        className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-amber-100 ${getCellBgClass(val)}`}
                                                        value={val}
                                                        onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, 'B', e.target.value.toUpperCase())}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    {/* Shift C Row */}
                                    <tr>
                                        <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-purple-700 w-8">
                                            C
                                        </td>
                                        {DAYS_31.map(d => {
                                            const val = operatorGrid[pt.id]?.[d]?.C || '';
                                            return (
                                                <td key={d} className="border border-slate-900 p-0 align-middle w-7 min-w-[28px] h-6 bg-white">
                                                    <input
                                                        className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-purple-100 ${getCellBgClass(val)}`}
                                                        value={val}
                                                        onChange={(e) => handleCellChange(setOperatorGrid, pt.id, d, 'C', e.target.value.toUpperCase())}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </React.Fragment>
                            ))}

                            {/* Operator Sign-off rows (Screenshot 1) */}
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Filled By (M/C Operator Sign) (A Shift) - &nbsp; (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`opA_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`opA_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Filled By (M/C Operator Sign) (B Shift) - &nbsp; (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`opB_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`opB_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Filled By (M/C Operator Sign) (C Shift) - &nbsp; (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`opC_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`opC_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Supervisor - Production (Sign)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`supProd_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`supProd_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ========================================================= */}
                {/* SECTION 2: RELATED WITH M/C MAINTENANCE */}
                {/* ========================================================= */}
                <div className="w-full flex items-center justify-center border-b-2 border-slate-900 bg-[#cbd5e1] px-4 py-1.5 text-center">
                    <span className="text-base font-black italic text-slate-950 uppercase tracking-wide text-center">
                        Related with m/c Maintenance
                    </span>
                </div>

                {/* Table 2: Maintenance Points */}
                <div className="w-full overflow-x-auto border-b-2 border-slate-900">
                    <table className="w-full border-collapse text-[10.5px] min-w-[1550px]">
                        <thead>
                            <tr>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-60 max-w-[260px]">
                                    STARTUP CHECK POINTS<br />( SHIFT CONFIRMATION )
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-24">
                                    Resp.
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-36">
                                    Check Value
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-28">
                                    Method
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-14" colSpan={2}>
                                    FREQ
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10px] align-middle w-8" rowSpan={2}>
                                    Shift
                                </th>
                                <th className="border border-slate-900 p-1 bg-white font-black text-slate-900 text-center text-[10.5px] align-middle" colSpan={31}>
                                    Daily Status
                                </th>
                            </tr>
                            <tr>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px] tracking-wide">
                                    ACTIVITY
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px]">
                                    Who
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px]">
                                    STD VALUE
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px] leading-tight">
                                    Measuring Method
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px] w-7">
                                    D
                                </th>
                                <th className="border border-slate-900 p-1 bg-[#cbd5e1] font-black text-slate-900 text-center text-[10px] w-7">
                                    W
                                </th>
                                {DAYS_31.map(d => (
                                    <th key={d} className="border border-slate-900 p-0.5 bg-slate-100 font-extrabold text-slate-900 text-center text-[10px] w-7 min-w-[28px]">
                                        {d}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {/* Part 2A: Daily Shift Maintenance Points (5 Items) */}
                            {INITIAL_MAINT_SHIFT_POINTS.map((pt) => (
                                <React.Fragment key={pt.id}>
                                    {/* Shift A Row */}
                                    <tr>
                                        <td rowSpan={3} className="border border-slate-900 p-1 pl-2 text-left font-bold align-middle max-w-[260px]">
                                            <div className="text-[10.5px] font-extrabold text-slate-900 leading-snug">{pt.point}</div>
                                            <span className="text-[9.5px] text-slate-600 font-semibold block leading-tight mt-0.5">{pt.hindi}</span>
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-800 align-middle">
                                            {pt.resp}
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-[9.5px] font-bold text-slate-900 whitespace-pre-line align-middle">
                                            {pt.stdValue}
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-800 align-middle">
                                            {pt.method}
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-center text-xs font-black text-slate-900 align-middle w-7">
                                            {pt.freqD || '√'}
                                        </td>
                                        <td rowSpan={3} className="border border-slate-900 p-1 text-center text-xs font-black text-slate-900 align-middle w-7">
                                            {pt.freqW || ''}
                                        </td>
                                        <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-blue-700 w-8">
                                            A
                                        </td>
                                        {DAYS_31.map(d => {
                                            const val = maintShiftGrid[pt.id]?.[d]?.A || '';
                                            return (
                                                <td key={d} className="border border-slate-900 p-0 align-middle w-7 min-w-[28px] h-6 bg-white">
                                                    <input
                                                        className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-blue-100 ${getCellBgClass(val)}`}
                                                        value={val}
                                                        onChange={(e) => handleCellChange(setMaintShiftGrid, pt.id, d, 'A', e.target.value.toUpperCase())}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    {/* Shift B Row */}
                                    <tr>
                                        <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-amber-700 w-8">
                                            B
                                        </td>
                                        {DAYS_31.map(d => {
                                            const val = maintShiftGrid[pt.id]?.[d]?.B || '';
                                            return (
                                                <td key={d} className="border border-slate-900 p-0 align-middle w-7 min-w-[28px] h-6 bg-white">
                                                    <input
                                                        className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-amber-100 ${getCellBgClass(val)}`}
                                                        value={val}
                                                        onChange={(e) => handleCellChange(setMaintShiftGrid, pt.id, d, 'B', e.target.value.toUpperCase())}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    {/* Shift C Row */}
                                    <tr>
                                        <td className="border border-slate-900 text-center font-extrabold text-[9.5px] bg-slate-50 text-purple-700 w-8">
                                            C
                                        </td>
                                        {DAYS_31.map(d => {
                                            const val = maintShiftGrid[pt.id]?.[d]?.C || '';
                                            return (
                                                <td key={d} className="border border-slate-900 p-0 align-middle w-7 min-w-[28px] h-6 bg-white">
                                                    <input
                                                        className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-purple-100 ${getCellBgClass(val)}`}
                                                        value={val}
                                                        onChange={(e) => handleCellChange(setMaintShiftGrid, pt.id, d, 'C', e.target.value.toUpperCase())}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </React.Fragment>
                            ))}

                            {/* Maintenance Associates Sign-off (Screenshot 2) */}
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Checked & Corrected By (Maint. Assocites Sign) (A Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`maintA_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`maintA_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Checked & Corrected By (Maint. Assocites Sign) (B Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`maintB_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`maintB_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Checked & Corrected By (Maint. Assocites Sign) (C Shift - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`maintC_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`maintC_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>

                            {/* Part 2B: Weekly Maintenance Points (5 Items) */}
                            {INITIAL_MAINT_WEEKLY_POINTS.map((pt) => (
                                <tr key={pt.id}>
                                    <td className="border border-slate-900 p-1 pl-2 text-left font-bold align-middle max-w-[260px]">
                                        <div className="text-[10.5px] font-extrabold text-slate-900 leading-snug">{pt.point}</div>
                                        <span className="text-[9.5px] text-slate-600 font-semibold block leading-tight mt-0.5">{pt.hindi}</span>
                                    </td>
                                    <td className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-800 align-middle">
                                        {pt.resp}
                                    </td>
                                    <td className="border border-slate-900 p-1 text-[9.5px] font-bold text-slate-900 whitespace-pre-line align-middle">
                                        {pt.stdValue}
                                    </td>
                                    <td className="border border-slate-900 p-1 text-center text-[9.5px] font-bold text-slate-800 align-middle">
                                        {pt.method}
                                    </td>
                                    <td className="border border-slate-900 p-1 text-center text-xs font-black text-slate-900 align-middle w-7">
                                        {pt.freqD || ''}
                                    </td>
                                    <td className="border border-slate-900 p-1 text-center text-xs font-black text-slate-900 align-middle w-7">
                                        {pt.freqW || '√'}
                                    </td>
                                    <td className="border border-slate-900 text-center font-bold text-[9px] text-slate-400 bg-slate-50">
                                        -
                                    </td>
                                    {DAYS_31.map(d => {
                                        const val = maintWeeklyGrid[pt.id]?.[d] || '';
                                        return (
                                            <td key={d} className="border border-slate-900 p-0 align-middle w-7 min-w-[28px] h-6 bg-white">
                                                <input
                                                    className={`w-full h-full border-none bg-transparent text-center text-[10px] font-bold outline-none focus:bg-blue-100 ${getCellBgClass(val)}`}
                                                    value={val}
                                                    onChange={(e) => handleWeeklyCellChange(pt.id, d, e.target.value.toUpperCase())}
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}

                            {/* Final Maintenance Signatures */}
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Technician - Maintenance (Sign)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`techSign_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`techSign_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr className="bg-slate-50 font-bold text-[10px]">
                                <td colSpan={7} className="border border-slate-900 p-1 text-left pl-3 font-extrabold text-slate-900">
                                    Supervisor - Maintenance (Sign)
                                </td>
                                {DAYS_31.map(d => (
                                    <td key={d} className="border border-slate-900 p-0 text-center">
                                        <input
                                            className="w-full text-center border-none bg-transparent text-[8.5px] font-bold p-0.5 outline-none"
                                            placeholder=""
                                            value={signOffs[`superSign_${d}`] || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, [`superSign_${d}`]: e.target.value })}
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Legend Instructions Strip (Verbatim from Screenshot 2) */}
                <div className="p-2.5 px-4 bg-slate-50 border-b-2 border-slate-900 text-[10px] font-bold text-slate-800 leading-relaxed font-sans">
                    <div>* Checking Frequency of daily /Shift: Shift Start</div>
                    <div>* Checking Frequency of weekly : First day of week</div>
                    <div className="mt-1 font-extrabold text-slate-950">[JUDGANCE]</div>
                    <div>1) PUT (O) FOR OK CONDITION</div>
                    <div>2) PUT (X) FOR NG CONDITION</div>
                    <div>3) PUT VALUE WHERE VALUE IS MENTION</div>
                    <div>4) TAKE IMMEDIATE ACTION AND MENTION ON THE OBSERVATION & ALSO FILL THE COUNTERACTION SHEET.</div>
                </div>

                {/* ========================================================= */}
                {/* SECTION 3: ABNORMALITY OBSERVATION & ACTION SHEET */}
                {/* ========================================================= */}
                <div className="p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex-1" />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-all bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700"
                                onClick={handleAddAbnormalityRow}
                            >
                                <Plus size={13} />
                                <span>Add Row</span>
                            </button>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto border-2 border-slate-900">
                        <table className="w-full border-collapse text-[11px] min-w-[1200px]">
                            <thead>
                                <tr>
                                    <th
                                        colSpan={12}
                                        className="border-b-2 border-slate-900 p-2 bg-white font-black text-slate-950 text-center text-base tracking-wide uppercase"
                                    >
                                        Abnormality Observation & Action Sheet
                                    </th>
                                </tr>
                                <tr>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-24">
                                        Date
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-16">
                                        Shift
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-24">
                                        Area
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-28">
                                        Specific<br />Area
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-56">
                                        Abnormailaity
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-48">
                                        Immediate Action Req.
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-20">
                                        Resp.
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-28">
                                        Target<br />Date /Time
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-20">
                                        Status
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-36">
                                        Operator Feedback
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-28">
                                        Maint.<br />Supervisor
                                    </th>
                                    <th className="border border-slate-900 p-1.5 bg-white font-extrabold text-[10.5px] text-slate-950 text-center w-28">
                                        Production<br />Supervisor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {abnormalities.map((row, rIdx) => (
                                    <tr key={row.id} className="h-8">
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                                                placeholder=""
                                                value={row.date}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'date', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center font-bold"
                                                placeholder=""
                                                value={row.shift}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'shift', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                                                value={row.area}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'area', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                                                value={row.specificArea}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'specificArea', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-left align-middle px-1">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left"
                                                value={row.abnormality}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'abnormality', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-left align-middle px-1">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left"
                                                value={row.immediateAction}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'immediateAction', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                                                value={row.resp}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'resp', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                                                value={row.targetDateTime}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'targetDateTime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center font-bold"
                                                value={row.status}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'status', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-left align-middle px-1">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-left"
                                                value={row.feedback}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'feedback', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                                                placeholder=""
                                                value={row.maintSign}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'maintSign', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-900 p-0 text-center align-middle">
                                            <input
                                                type="text"
                                                className="w-full h-full border-none bg-transparent text-[10.5px] font-sans outline-none text-center"
                                                placeholder=""
                                                value={row.prodSign}
                                                onChange={(e) => handleAbnormalChange(rIdx, 'prodSign', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}

                                {/* Bottom Remarks & Signature Row */}
                                <tr>
                                    <td colSpan={10} className="border border-slate-900 p-2 align-top bg-white">
                                        <div className="text-[11px] font-bold text-slate-950 mb-1">[Remarks]</div>
                                        <textarea
                                            rows={3}
                                            className="w-full border border-slate-300 rounded p-1 text-xs outline-none focus:border-blue-500 font-sans resize-none"
                                            placeholder="Enter remarks here..."
                                            value={signOffs.remarks || ''}
                                            onChange={(e) => setSignOffs({ ...signOffs, remarks: e.target.value })}
                                        />
                                    </td>
                                    <td className="border border-slate-900 p-1.5 align-bottom bg-white">
                                        <div className="border border-slate-900 bg-white flex flex-col justify-between h-20 text-center">
                                            <input
                                                type="text"
                                                className="w-full border-none bg-transparent text-[10px] outline-none text-center flex-1"
                                                placeholder=""
                                                value={signOffs.footerProdSign || ''}
                                                onChange={(e) => setSignOffs({ ...signOffs, footerProdSign: e.target.value })}
                                            />
                                            <div className="text-[9.5px] font-bold text-slate-900 border-t border-slate-900 py-1 bg-slate-50">
                                                Production Supervisor
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-slate-900 p-1.5 align-bottom bg-white">
                                        <div className="border border-slate-900 bg-white flex flex-col justify-between h-20 text-center">
                                            <input
                                                type="text"
                                                className="w-full border-none bg-transparent text-[10px] outline-none text-center flex-1"
                                                placeholder=""
                                                value={signOffs.footerMaintSign || ''}
                                                onChange={(e) => setSignOffs({ ...signOffs, footerMaintSign: e.target.value })}
                                            />
                                            <div className="text-[9.5px] font-bold text-slate-900 border-t border-slate-900 py-1 bg-slate-50">
                                                Maintenance Supervisor
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Document Stamp */}
                <div className="flex items-center justify-between p-1.5 px-3.5 bg-slate-100 border-t-2 border-slate-900 text-[10px] font-bold text-slate-600">
                    <span>DOC NO: <strong>CHK-WH-MT-003</strong></span>
                    <span>REV: <strong>07</strong></span>
                    <span>DATE: <strong>15.09.2023</strong></span>
                    <span>FURUKAWA MINDA ELECTRIC PVT. LTD.</span>
                </div>
            </div>
        </div>
    );
}