import React, { useState } from 'react';
import { 
  Save, 
  RotateCcw, 
  Wrench 
} from 'lucide-react';

// Default static structure & initial rows based directly on FURUKAWA MINDA ELECTRIC PVT. LTD. sheet
const INITIAL_PM_SECTIONS = [
  {
    id: 1,
    title: 'Computer',
    color: '#0284c7',
    items: [
      {
        sNo: '1.1',
        checkLocation: 'Software back up',
        checkPoint: 'Latest updated date',
        checkMethods: 'Take back up of current software, provide date extension',
        judgementCriteria: 'Should be latest back-up',
        actionNotOk: 'Take Backup',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 2,
    title: 'Wire Feeding Unit',
    color: '#0284c7',
    hasCalibrationNote: 'Calibration required after every servicing using calibration block',
    items: [
      {
        sNo: '2.1',
        checkLocation: 'Feeding & Measuring Wheel surface condition',
        checkPoint: 'No Wire slippage',
        checkMethods: 'Pull the wire through rollers in closed condition to check movement of roller.',
        judgementCriteria: 'Roller should not move.',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '2.2',
        checkLocation: 'Gap between Feeding rollers in close condition',
        checkPoint: '0.2mm gap b/w rollers',
        checkMethods: 'Check Gap',
        judgementCriteria: 'Adjust with Filler Gauge',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '2.3',
        checkLocation: 'Feeding & Timing Belt',
        checkPoint: 'Damaged Teeth / Play',
        checkMethods: 'Check belt Tension',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '2.4',
        checkLocation: 'Encoder circlip',
        checkPoint: 'No damage / No loose',
        checkMethods: 'Check looseness of circlip',
        judgementCriteria: 'Circlip hard insert in encoder shaft',
        actionNotOk: 'Replace if required',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '2.5',
        checkLocation: 'Gears',
        checkPoint: 'Damaged Teeth / Play / Sound',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '2.6',
        checkLocation: 'Air Pressure Feeding roller',
        checkPoint: '0.1 to 0.3 mpa',
        checkMethods: 'Check Pressure',
        judgementCriteria: 'Should be 0.1 to 0.3 mpa',
        actionNotOk: 'Adjust if required',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '2.7',
        checkLocation: 'Condition of bearings',
        checkPoint: 'Play / Jam / Sound',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Replace if required',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '2.8',
        checkLocation: 'Straightner / Ceramic Bush',
        checkPoint: 'Jam / Damage',
        checkMethods: 'Check Movement',
        judgementCriteria: 'Smooth Movement / Undamaged',
        actionNotOk: 'Replace if required',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '2.9',
        checkLocation: 'Wire Guide Block',
        checkPoint: 'Damage / Wire guide play',
        checkMethods: 'Check Movement',
        judgementCriteria: 'Smooth Movement / Undamaged',
        actionNotOk: 'Replace if required',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 3,
    title: 'Swivel Unit- 1 & 2  &  Push Pull unit 1 & 2',
    color: '#0284c7',
    hasCalibrationNote: 'Calibration required after every servicing.',
    items: [
      {
        sNo: '3.1',
        checkLocation: 'Gripper',
        checkPoint: 'Damaged Teeth / Play',
        checkMethods: 'Check movement',
        judgementCriteria: 'Should close smooth',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '3.2',
        checkLocation: 'Lever left & right arm',
        checkPoint: 'Damaged Teeth / Play',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '3.3',
        checkLocation: 'Timing Belt',
        checkPoint: 'Damaged Teeth / Play',
        checkMethods: 'Check belt Tension',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '3.4',
        checkLocation: 'Gripper Air Pressure',
        checkPoint: '0.4 to 0.6 mpa',
        checkMethods: 'Check Pressure',
        judgementCriteria: 'Should be 0.4 to 0.6 mpa',
        actionNotOk: 'Adjust if required',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '3.5',
        checkLocation: 'LM Guide',
        checkPoint: 'No Play in guides',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust & Tighten / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '3.6',
        checkLocation: 'Sensors',
        checkPoint: 'Sensors Mounting & Connections.',
        checkMethods: 'Sensor working & bolt tightening.',
        judgementCriteria: 'No loose connections & Physical damage.',
        actionNotOk: 'Reconnect / Replace / Remount',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '3.8',
        checkLocation: 'Linear motor pulley',
        checkPoint: 'Motor pulley not free movement from shaft',
        checkMethods: 'Check mounting bolt of motor pulley',
        judgementCriteria: 'Pulley not free movement',
        actionNotOk: 'Adjust & Tighten / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 4,
    title: 'Cutting Head Unit',
    color: '#0284c7',
    hasCalibrationNote: 'Calibration required after every servicing using calibration block',
    items: [
      {
        sNo: '4.1',
        checkLocation: 'Blades',
        checkPoint: 'Condition of Blades',
        checkMethods: 'Visual check',
        judgementCriteria: 'No U grooves',
        actionNotOk: 'Replace if required',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '4.2',
        checkLocation: 'Holding Block/Bolts',
        checkPoint: 'Condition of block',
        checkMethods: 'Visual check',
        judgementCriteria: 'No Play & Smooth Tightening of bolts',
        actionNotOk: 'Check the lubricating line for block / belt',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '4.3',
        checkLocation: 'LM Guide',
        checkPoint: 'No Play in guides / Lubricate',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust & Tighten / Replace / Lubricate',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '4.4',
        checkLocation: 'PVC Collection unit',
        checkPoint: 'Air Flow',
        checkMethods: 'Operate Manually',
        judgementCriteria: 'Air should flow',
        actionNotOk: 'Clean with air pressure',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 5,
    title: 'Conveyor',
    color: '#0284c7',
    items: [
      {
        sNo: '5.1',
        checkLocation: 'Conveyor belt & Band drum',
        checkPoint: 'Belt movement',
        checkMethods: 'Band drum & Belt Alignment',
        judgementCriteria: 'No Wear tear of belt & Banddrum',
        actionNotOk: 'Adjust / Replace the wornout part',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '5.2',
        checkLocation: 'Trough',
        checkPoint: 'Up-down Speed',
        checkMethods: 'Check up-down timing',
        judgementCriteria: 'Should be up-down speed ok',
        actionNotOk: 'Adjust the valve',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '5.3',
        checkLocation: 'Conveyor trough',
        checkPoint: 'Any sharp edge / obstruction',
        checkMethods: 'Check sharp edge & obstruction',
        judgementCriteria: 'Should be sharp edge ok',
        actionNotOk: 'Remove sharp edge & obstruction',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '5.4',
        checkLocation: 'Sensors',
        checkPoint: 'Sensors Mounting & Connections.',
        checkMethods: 'Sensor working & bolt tightening.',
        judgementCriteria: 'No loose connections & Physical damage.',
        actionNotOk: 'Reconnect / Replace / Remount',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 6,
    title: 'Servo Controller Rack and Electrical Panel',
    color: '#0284c7',
    items: [
      {
        sNo: '6.1',
        checkLocation: 'Mounting of cards',
        checkPoint: 'Proper orientation in the slots',
        checkMethods: 'Check screws tighten',
        judgementCriteria: 'Should be tight.',
        actionNotOk: 'Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '6.2',
        checkLocation: 'Exhaust fan condition',
        checkPoint: 'Mounting and proper working',
        checkMethods: 'Clean with air pressure',
        judgementCriteria: 'If not working.',
        actionNotOk: 'Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '6.3',
        checkLocation: 'Dust on connectors / PCBs / Relays',
        checkPoint: 'No Dust or foreign matter',
        checkMethods: 'Clean with brush / air',
        judgementCriteria: 'Should be ok.',
        actionNotOk: 'Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '6.4',
        checkLocation: 'Drive Resistance',
        checkPoint: 'Resistance condition',
        checkMethods: 'Check Dust or Carbon on Leg',
        judgementCriteria: 'No wear or no carbon on resistance leg',
        actionNotOk: 'Replace if required or clean the resistance leg',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 7,
    title: 'Crimping Press / Crimp Force monitor',
    color: '#0284c7',
    items: [
      {
        sNo: '7.1',
        checkLocation: 'Base Plate & Lock',
        checkPoint: 'Plate loose & Lock Damage',
        checkMethods: 'Tighten all Bolts.',
        judgementCriteria: 'No play after Mounting applicator.',
        actionNotOk: 'Replace Allen Bolts.',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '7.2',
        checkLocation: 'Ram mounted Piezo sensor',
        checkPoint: 'Looseness, Cleanliness',
        checkMethods: 'Check mounting bolt of Ram',
        judgementCriteria: 'Should be ok.',
        actionNotOk: 'Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '7.3',
        checkLocation: 'Sensor Cable',
        checkPoint: 'Physical damage & routing',
        checkMethods: 'Binding cable properly',
        judgementCriteria: 'Should be ok.',
        actionNotOk: 'Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '7.4',
        checkLocation: 'Press card communication cable and port',
        checkPoint: 'Condition of cable coupler and port soldering',
        checkMethods: 'Check Movement of coupler and looseness of port soldering',
        judgementCriteria: 'Should not be looseness in coupler after insert in press card',
        actionNotOk: 'If not ok replace the communication cable or if soldering loose then re-solder',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 8,
    title: 'FRL Unit and Prefeeder unit',
    color: '#0284c7',
    items: [
      {
        sNo: '8.1',
        checkLocation: 'Complete FRL Unit.',
        checkPoint: 'Filter & Oil',
        checkMethods: 'Check oil level, Clean Filter & Drain the Moisture from Filter.',
        judgementCriteria: 'No moisture. Oil level acc. to marked level',
        actionNotOk: 'Dismantle & clean thoroughly & lubricate',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '8.2',
        checkLocation: 'Machine',
        checkPoint: 'Air Leakage',
        checkMethods: 'Check connectors & Pneumatic pipes',
        judgementCriteria: 'No Air Leakage & No moisture, Oil level acc. marking.',
        actionNotOk: 'Retight / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '8.3',
        checkLocation: 'Prefeeder Roller pulleys & Shaft',
        checkPoint: 'Pulley & Shaft Movement',
        checkMethods: 'Visual check',
        judgementCriteria: 'No cut and damage in pulley.',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '8.4',
        checkLocation: 'Sensors',
        checkPoint: 'Sensors Mounting & Connections.',
        checkMethods: 'Sensor working & bolt tightening.',
        judgementCriteria: 'No loose connections & Physical damage.',
        actionNotOk: 'Reconnect / Replace / Remount',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '8.5',
        checkLocation: 'All Cylinders / Pressure Gauges',
        checkPoint: 'Proper Functioning.',
        checkMethods: 'Manual Movement / Check Reading',
        judgementCriteria: 'Should be proper functioning.',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 9,
    title: 'Wire Quality & Insulation',
    color: '#0284c7',
    items: [
      {
        sNo: '9.1',
        checkLocation: 'Wire',
        checkPoint: 'Insulation resistance (HVT) of CIVUS wire',
        checkMethods: 'Wire HVT',
        judgementCriteria: 'HVT test of wire',
        actionNotOk: 'Check by HVT tester',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  },
  {
    id: 10,
    title: 'Seal Unit',
    color: '#16a34a',
    items: [
      {
        sNo: '10.1',
        checkLocation: 'Separation tool',
        checkPoint: 'Movement of separation tool',
        checkMethods: 'Visual check',
        judgementCriteria: 'Should be free movement',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '10.2',
        checkLocation: 'Sensor',
        checkPoint: 'Sensors Mounting & Connections.',
        checkMethods: 'Sensor working & bolt tightening.',
        judgementCriteria: 'No loose connections & Physical damage.',
        actionNotOk: 'Reconnect / Replace / Remount',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '10.3',
        checkLocation: 'Knock out unit piston',
        checkPoint: 'Knock out unit piston bolt',
        checkMethods: 'Bolt fully tight by tool',
        judgementCriteria: 'Should be fully tight',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '10.4',
        checkLocation: 'Push plate piston',
        checkPoint: 'Push plate piston Nut',
        checkMethods: 'Nut fully tight by tool',
        judgementCriteria: 'Should be fully tight',
        actionNotOk: 'Adjust setting / Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      },
      {
        sNo: '10.5',
        checkLocation: 'Check the Ring Condition',
        checkPoint: 'Locking of Separation Tool',
        checkMethods: 'Visual check',
        judgementCriteria: 'No wear Tear',
        actionNotOk: 'Replace',
        status: 'OK',
        beforePm: 'OK',
        afterPm: 'OK'
      }
    ]
  }
];

// Periodic Periodic Blocks (Quarterly, Half Yearly, Yearly)
const INITIAL_PERIODIC_CHECKS = {
  quarterly: [
    {
      sNo: '1*',
      checkLocation: 'Oiling / Greasing of Guide rods / Linear Bearings',
      checkPoint: 'Noise',
      checkMethods: 'Oiling of linear bushes',
      judgementCriteria: 'Smooth Movement',
      actionNotOk: 'Replace guide rods if required',
      mar: 'OK',
      jun: 'OK',
      sep: 'OK',
      dec: 'OK'
    },
    {
      sNo: '2*',
      checkLocation: 'Linear Measuring Scale',
      checkPoint: 'LMS cleaning',
      checkMethods: 'Clean with Cotton or Tissue paper',
      judgementCriteria: 'No Scratch',
      actionNotOk: 'Replace damage bolts',
      mar: 'OK',
      jun: 'OK',
      sep: 'OK',
      dec: 'OK'
    },
    {
      sNo: '3*',
      checkLocation: 'Base Plate Locking arrangement',
      checkPoint: 'Looseness',
      checkMethods: 'Lock bolts washers stiffness',
      judgementCriteria: 'Should be not looseness',
      actionNotOk: 'Replace damage bolts',
      mar: 'OK',
      jun: 'OK',
      sep: 'OK',
      dec: 'OK'
    },
    {
      sNo: '4*',
      checkLocation: 'Press Ram guide rod Lubrication',
      checkPoint: 'Free Movement',
      checkMethods: 'Cleaning & Oiling',
      judgementCriteria: 'Should be movement',
      actionNotOk: 'Replace damage bolts',
      mar: 'OK',
      jun: 'OK',
      sep: 'OK',
      dec: 'OK'
    }
  ],
  halfYearly: [
    {
      sNo: '1*',
      checkLocation: 'Power Contactors',
      checkPoint: 'Contact points',
      checkMethods: 'Should Clean with CRC or IPA',
      judgementCriteria: 'Continuity ok',
      actionNotOk: 'Dismantle & clean or Replace',
      jun: 'OK',
      dec: 'OK'
    },
    {
      sNo: '2*',
      checkLocation: 'Measuring Encoder',
      checkPoint: 'Encoder mount plate',
      checkMethods: 'Check the plate breakage',
      judgementCriteria: 'No any crack on encoder mount plate',
      actionNotOk: 'Replace to encoder mount plate if any crack',
      jun: 'OK',
      dec: 'OK'
    }
  ],
  yearly: [
    {
      sNo: '1*',
      checkLocation: 'Swivel 1 & 2 / Push Pull',
      checkPoint: 'All damaged nut-bolts should be changed & Tighten. Greasing & lubrication of all moving parts',
      checkMethods: 'Complete Overhauling of guide rods & linear bearings.',
      judgementCriteria: 'No play, wear Tear & No abnormal sound',
      actionNotOk: 'Dismantle, clean & Lubricate or Replace',
      dec: 'OK'
    }
  ]
};

export default function MachinePmChecksheet({ machine, onClose }) {
  // Machine header details
  const [headerInfo, setHeaderInfo] = useState({
    mcName: 'ALPHA - 355 CUT & CRIMP MACHINE',
    srNo: machine?.id === 1 ? 'CC-01-FME-2024' : 'CC-03-FME-2023',
    mcDisplayNo: machine?.name || 'C&C 01',
    installationDate: '15-08-2022',
    year: '2026',
    date: '01.04.2026',
    pmCounter: '04',
    preparedBy: 'NAVEEN',
    approvedBy: 'SARWAR YADAV'
  });

  // PM Execution Audit Columns (12 monthly slots / inspections)
  const [auditColumns, setAuditColumns] = useState(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      slot: i + 1,
      date: `2026-04-${String(i + 1).padStart(2, '0')}`,
      startTime: '08:30',
      closeTime: '11:45',
      totalTime: '3h 15m',
      sigTech: 'Ramesh K.',
      sigEng: 'Naveen S.',
      sigQEng: 'Anil M.',
      sigOwner: 'Vikram P.'
    }));
  });

  const [activeSlotIdx, setActiveSlotIdx] = useState(0);

  // Editable sections
  const [sections, setSections] = useState(INITIAL_PM_SECTIONS);
  const [periodic, setPeriodic] = useState(INITIAL_PERIODIC_CHECKS);
  const [savedMessage, setSavedMessage] = useState('');

  const handleItemFieldChange = (sectionIdx, itemIdx, field, value) => {
    setSections(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sectionIdx].items[itemIdx][field] = value;
      return copy;
    });
  };

  const handlePeriodicFieldChange = (type, itemIdx, key, value) => {
    setPeriodic(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[type][itemIdx][key] = value;
      return copy;
    });
  };

  const handleSave = () => {
    setSavedMessage(`PM Checksheet for ${machine?.name || 'Machine'} successfully saved to FME Maintenance Server!`);
    setTimeout(() => setSavedMessage(''), 4500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values in this PM Checksheet to standard defaults?')) {
      setSections(INITIAL_PM_SECTIONS);
      setPeriodic(INITIAL_PERIODIC_CHECKS);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-slate-50 transition-all duration-200">
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Wrench size={18} className="text-blue-600 bg-blue-50 p-2 rounded-lg w-9 h-9 box-content" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight m-0">FURUTAWA MINDA ELECTRIC PVT. LTD. — PREVENTIVE MAINTENANCE</h3>
            <span className="text-[11.5px] text-slate-500 font-medium">Doc No: CHK-WH-MT-043 • Rev: 19 • Assigned to: <strong>{machine?.name} ({headerInfo.mcName})</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedMessage && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-md text-xs font-bold animate-pulse">
              {savedMessage}
            </div>
          )}
          <button 
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            onClick={handleSave}
          >
            <Save size={15} />
            <span>Save Record</span>
          </button>
          <button 
            className="inline-flex items-center gap-1.5 p-2 rounded-lg text-xs font-bold cursor-pointer transition-all bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600"
            onClick={handleReset} 
            title="Reset to standard defaults"
          >
            <RotateCcw size={15} />
          </button>
          {onClose && (
            <button 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all bg-rose-100 hover:bg-rose-200 text-rose-700"
              onClick={onClose}
            >
              Close Checksheet
            </button>
          )}
        </div>
      </div>

      {/* Main Excel Sheet Canvas */}
      <div className="bg-white border-[1.5px] border-black p-2 font-sans shadow-md rounded">
        {/* Header Title Banner */}
        <div className="bg-emerald-100 border-[1.5px] border-black p-1.5 px-3.5 flex items-center justify-between mb-1">
          <div className="text-lg font-black text-black tracking-widest text-center flex-1">
            FURUKAWA MINDAELECTRIC PVT. LTD
          </div>
          <div className="text-[11px] font-bold text-black text-right leading-tight">
            <div>Doc No: <strong>-CHK-WH-MT-043</strong></div>
            <div>Rev: <strong>19</strong></div>
          </div>
        </div>

        <div className="bg-yellow-200 border-[1.5px] border-black text-center text-sm font-black tracking-widest text-black py-1 mb-1">
          MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET
        </div>

        {/* Machine Metadata Grid */}
        <div className="border border-black bg-white mb-1.5">
          <div className="flex items-center flex-wrap">
            <div className="p-1 px-2 text-[11px] border-r border-black bg-slate-50 font-extrabold text-black">M/C NAME:</div>
            <div className="p-1 px-2 text-[11px] border-r border-black flex-1 min-w-[100px] font-bold">
              <input 
                type="text" 
                value={headerInfo.mcName} 
                onChange={(e) => setHeaderInfo({ ...headerInfo, mcName: e.target.value })}
                className="w-full border-none outline-none bg-transparent font-sans text-xs font-bold text-black focus:bg-yellow-100"
              />
            </div>

            <div className="p-1 px-2 text-[11px] border-r border-black bg-slate-50 font-extrabold text-black">SR.NO. :</div>
            <div className="p-1 px-2 text-[11px] border-r border-black flex-1 min-w-[100px]">
              <input 
                type="text" 
                value={headerInfo.srNo} 
                onChange={(e) => setHeaderInfo({ ...headerInfo, srNo: e.target.value })}
                className="w-full border-none outline-none bg-transparent font-sans text-xs font-semibold text-black focus:bg-yellow-100"
              />
            </div>

            <div className="p-1 px-2 text-[11px] border-r border-black bg-slate-50 font-extrabold text-black">M/C DISPLAY NO. :</div>
            <div className="p-1 px-2 text-[11px] border-r border-black flex-1 min-w-[100px] bg-blue-50">
              <input 
                type="text" 
                value={headerInfo.mcDisplayNo} 
                onChange={(e) => setHeaderInfo({ ...headerInfo, mcDisplayNo: e.target.value })}
                className="w-full border-none outline-none bg-transparent font-sans text-xs font-extrabold text-blue-700 focus:bg-yellow-100"
              />
            </div>

            <div className="p-1 px-2 text-[11px] border-r border-black bg-slate-50 font-extrabold text-black">INSTALLATION DATE:</div>
            <div className="p-1 px-2 text-[11px] border-r border-black flex-1 min-w-[100px]">
              <input 
                type="text" 
                value={headerInfo.installationDate} 
                onChange={(e) => setHeaderInfo({ ...headerInfo, installationDate: e.target.value })}
                className="w-full border-none outline-none bg-transparent font-sans text-xs font-semibold text-black focus:bg-yellow-100"
              />
            </div>

            <div className="p-1 px-2 text-[11px] border-r border-black bg-slate-50 font-extrabold text-black">YEAR:</div>
            <div className="p-1 px-2 text-[11px] border-r border-black max-w-[90px]">
              <input 
                type="text" 
                value={headerInfo.year} 
                onChange={(e) => setHeaderInfo({ ...headerInfo, year: e.target.value })}
                className="w-full border-none outline-none bg-transparent font-sans text-xs font-semibold text-black text-center focus:bg-yellow-100"
              />
            </div>

            <div className="p-1 px-2 text-[11px] bg-slate-50 font-extrabold text-black">DATE:</div>
            <div className="p-1 px-2 text-[11px] max-w-[90px]">
              <input 
                type="text" 
                value={headerInfo.date} 
                onChange={(e) => setHeaderInfo({ ...headerInfo, date: e.target.value })}
                className="w-full border-none outline-none bg-transparent font-sans text-xs font-semibold text-black text-center focus:bg-yellow-100"
              />
            </div>
          </div>
        </div>

        {/* PM Inspection Slot Selector Strip */}
        <div className="flex items-center gap-3 bg-slate-100 border border-slate-300 p-1.5 px-2.5 mb-2 overflow-x-auto">
          <span className="text-[11px] font-extrabold text-slate-900 whitespace-nowrap">P.M. COUNTER / AUDIT LOG:</span>
          <div className="flex gap-1.5 flex-1 overflow-x-auto">
            {auditColumns.map((slot, sIdx) => (
              <button
                key={slot.slot}
                type="button"
                className={`text-[10.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
                  activeSlotIdx === sIdx 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setActiveSlotIdx(sIdx)}
              >
                P.M. #{slot.slot} ({slot.date})
              </button>
            ))}
          </div>
        </div>

        {/* Master Inspection Table */}
        <div className="w-full overflow-x-auto border border-black mb-3">
          <table className="w-full border-collapse text-[10.5px] min-w-[1400px]">
            <thead>
              <tr className="bg-slate-200 text-slate-900 font-extrabold text-center border-b border-black">
                <th className="border border-black p-1" style={{ width: '45px' }}>S.No</th>
                <th className="border border-black p-1" style={{ width: '130px' }}>SECTIONS PHOTOGRAPHS</th>
                <th className="border border-black p-1" style={{ minWidth: '170px' }}>CHECK LOCATION</th>
                <th className="border border-black p-1" style={{ minWidth: '180px' }}>CHECK POINT</th>
                <th className="border border-black p-1" style={{ minWidth: '220px' }}>CHECK METHODS</th>
                <th className="border border-black p-1" style={{ minWidth: '180px' }}>JUDGEMENT CRITERIA</th>
                <th className="border border-black p-1" style={{ minWidth: '170px' }}>ACTION REQUIRED FOR NOT OK CONDITION</th>
                <th className="border border-black p-1 bg-blue-100 text-blue-900" style={{ width: '130px' }}>
                  P.M. STATUS (#{auditColumns[activeSlotIdx].slot})
                </th>
                <th className="border border-black p-1" style={{ width: '90px' }}>BEFORE PM</th>
                <th className="border border-black p-1" style={{ width: '90px' }}>AFTER PM</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, secIdx) => (
                <React.Fragment key={section.id}>
                  {/* Category Header Row */}
                  <tr className="bg-sky-200 border-b border-black">
                    <td className="border border-black p-1 text-center font-extrabold">{section.id}</td>
                    <td colSpan={9} className="border border-black p-1 pl-2 font-black text-blue-900">
                      {section.title}
                    </td>
                  </tr>

                  {/* Category Checklist Items */}
                  {section.items.map((item, itemIdx) => (
                    <tr key={item.sNo} className="hover:bg-slate-50">
                      <td className="border border-black p-1 text-center font-semibold text-slate-500 bg-slate-50">{item.sNo}</td>
                      {itemIdx === 0 ? (
                        <td rowSpan={section.items.length} className="border border-black p-1 text-center align-middle bg-slate-50">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-20 h-14 border border-slate-300 rounded bg-white flex flex-col items-center justify-center p-1 text-[9px] font-bold text-slate-700 shadow-sm">
                              <Wrench size={20} className="text-blue-600 mb-0.5" />
                              <span className="truncate max-w-[70px]">{section.title}</span>
                            </div>
                            <span className="text-[9px] text-slate-500 font-bold">Station Inspection</span>
                          </div>
                        </td>
                      ) : null}
                      <td className="border border-black p-1 font-semibold text-slate-900">{item.checkLocation}</td>
                      <td className="border border-black p-1">{item.checkPoint}</td>
                      <td className="border border-black p-1 text-slate-600">{item.checkMethods}</td>
                      <td className="border border-black p-1 font-medium text-emerald-800">{item.judgementCriteria}</td>
                      <td className="border border-black p-1 text-rose-700 font-semibold">{item.actionNotOk}</td>
                      <td className="border border-black p-0 text-center bg-blue-50/50">
                        <input
                          type="text"
                          className="w-full h-6 border-none bg-transparent text-center font-black text-xs outline-none focus:bg-yellow-100"
                          value={item.status}
                          onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'status', e.target.value)}
                          placeholder="OK / ✕"
                        />
                      </td>
                      <td className="border border-black p-0 text-center">
                        <input
                          type="text"
                          className="w-full h-6 border-none bg-transparent text-center font-bold text-xs outline-none focus:bg-yellow-100"
                          value={item.beforePm}
                          onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'beforePm', e.target.value)}
                          placeholder="✓"
                        />
                      </td>
                      <td className="border border-black p-0 text-center">
                        <input
                          type="text"
                          className="w-full h-6 border-none bg-transparent text-center font-bold text-xs outline-none focus:bg-yellow-100"
                          value={item.afterPm}
                          onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'afterPm', e.target.value)}
                          placeholder="✓"
                        />
                      </td>
                    </tr>
                  ))}

                  {/* Calibration Notice Row if applicable */}
                  {section.hasCalibrationNote && (
                    <tr className="bg-amber-50 border-b border-black">
                      <td colSpan={10} className="border border-black p-1 text-center italic font-semibold text-blue-900">
                        ★ {section.hasCalibrationNote}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {/* ======================================================== */}
              {/* QUARTERLY / PERIODIC CHECKS */}
              {/* ======================================================== */}
              <tr className="bg-amber-100 border-b border-black">
                <td colSpan={10} className="border border-black p-1 text-center font-black text-slate-900 tracking-wider">
                  QUARTERLY / PERIODIC CHECKS
                </td>
              </tr>
              {periodic.quarterly.map((q, qIdx) => (
                <tr key={q.sNo} className="hover:bg-slate-50">
                  <td className="border border-black p-1 text-center font-bold">{q.sNo}</td>
                  <td className="border border-black p-1 text-center italic text-slate-500">Quarterly Inspection</td>
                  <td className="border border-black p-1 font-semibold">{q.checkLocation}</td>
                  <td className="border border-black p-1">{q.checkPoint}</td>
                  <td className="border border-black p-1 text-slate-600">{q.checkMethods}</td>
                  <td className="border border-black p-1 font-medium">{q.judgementCriteria}</td>
                  <td className="border border-black p-1 text-rose-700 font-semibold">{q.actionNotOk}</td>
                  <td colSpan={3} className="border border-black p-1">
                    <div className="grid grid-cols-4 gap-1">
                      <div className="flex flex-col items-center">
                        <span className="text-[8.5px] font-black text-slate-700">MAR</span>
                        <input
                          type="text"
                          className="w-full text-center border border-slate-300 rounded text-[10px] font-bold outline-none"
                          value={q.mar}
                          onChange={(e) => handlePeriodicFieldChange('quarterly', qIdx, 'mar', e.target.value)}
                          placeholder="OK"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8.5px] font-black text-slate-700">JUN</span>
                        <input
                          type="text"
                          className="w-full text-center border border-slate-300 rounded text-[10px] font-bold outline-none"
                          value={q.jun}
                          onChange={(e) => handlePeriodicFieldChange('quarterly', qIdx, 'jun', e.target.value)}
                          placeholder="OK"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8.5px] font-black text-slate-700">SEP</span>
                        <input
                          type="text"
                          className="w-full text-center border border-slate-300 rounded text-[10px] font-bold outline-none"
                          value={q.sep}
                          onChange={(e) => handlePeriodicFieldChange('quarterly', qIdx, 'sep', e.target.value)}
                          placeholder="OK"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8.5px] font-black text-slate-700">DEC</span>
                        <input
                          type="text"
                          className="w-full text-center border border-slate-300 rounded text-[10px] font-bold outline-none"
                          value={q.dec}
                          onChange={(e) => handlePeriodicFieldChange('quarterly', qIdx, 'dec', e.target.value)}
                          placeholder="OK"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {/* ======================================================== */}
              {/* HALF YEARLY CHECK POINTS */}
              {/* ======================================================== */}
              <tr className="bg-amber-100 border-b border-black">
                <td colSpan={10} className="border border-black p-1 text-center font-black text-slate-900 tracking-wider">
                  HALF YEARLY CHECK POINTS
                </td>
              </tr>
              {periodic.halfYearly.map((h, hIdx) => (
                <tr key={h.sNo} className="hover:bg-slate-50">
                  <td className="border border-black p-1 text-center font-bold">{h.sNo}</td>
                  <td className="border border-black p-1 text-center italic text-slate-500">Half Yearly</td>
                  <td className="border border-black p-1 font-semibold">{h.checkLocation}</td>
                  <td className="border border-black p-1">{h.checkPoint}</td>
                  <td className="border border-black p-1 text-slate-600">{h.checkMethods}</td>
                  <td className="border border-black p-1 font-medium">{h.judgementCriteria}</td>
                  <td className="border border-black p-1 text-rose-700 font-semibold">{h.actionNotOk}</td>
                  <td colSpan={3} className="border border-black p-1">
                    <div className="grid grid-cols-2 gap-2 max-w-[180px] mx-auto">
                      <div className="flex flex-col items-center">
                        <span className="text-[8.5px] font-black text-slate-700">JUN</span>
                        <input
                          type="text"
                          className="w-full text-center border border-slate-300 rounded text-[10px] font-bold outline-none"
                          value={h.jun}
                          onChange={(e) => handlePeriodicFieldChange('halfYearly', hIdx, 'jun', e.target.value)}
                          placeholder="OK"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8.5px] font-black text-slate-700">DEC</span>
                        <input
                          type="text"
                          className="w-full text-center border border-slate-300 rounded text-[10px] font-bold outline-none"
                          value={h.dec}
                          onChange={(e) => handlePeriodicFieldChange('halfYearly', hIdx, 'dec', e.target.value)}
                          placeholder="OK"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {/* ======================================================== */}
              {/* YEARLY CHECK POINTS */}
              {/* ======================================================== */}
              <tr className="bg-amber-100 border-b border-black">
                <td colSpan={10} className="border border-black p-1 text-center font-black text-slate-900 tracking-wider">
                  YEARLY CHECK POINTS
                </td>
              </tr>
              {periodic.yearly.map((y, yIdx) => (
                <tr key={y.sNo} className="hover:bg-slate-50">
                  <td className="border border-black p-1 text-center font-bold">{y.sNo}</td>
                  <td className="border border-black p-1 text-center italic text-slate-500">Annual Overhaul</td>
                  <td className="border border-black p-1 font-semibold">{y.checkLocation}</td>
                  <td className="border border-black p-1">{y.checkPoint}</td>
                  <td className="border border-black p-1 text-slate-600">{y.checkMethods}</td>
                  <td className="border border-black p-1 font-medium">{y.judgementCriteria}</td>
                  <td className="border border-black p-1 text-rose-700 font-semibold">{y.actionNotOk}</td>
                  <td colSpan={3} className="border border-black p-1">
                    <div className="max-w-[100px] mx-auto flex flex-col items-center">
                      <span className="text-[8.5px] font-black text-slate-700">DEC</span>
                      <input
                        type="text"
                        className="w-full text-center border border-slate-300 rounded text-[10px] font-bold outline-none"
                        value={y.dec}
                        onChange={(e) => handlePeriodicFieldChange('yearly', yIdx, 'dec', e.target.value)}
                        placeholder="OK"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Execution Log & Signatures Table */}
        <div className="border border-black mb-3 p-2 bg-white">
          <div className="text-center font-black text-xs text-slate-900 uppercase tracking-wider mb-2">
            <h4>P.M. EXECUTION LOG & TIME TRACKING</h4>
          </div>

          <table className="w-full border-collapse text-[10.5px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-black p-1 text-left font-extrabold" style={{ width: '170px' }}>PARAMETER</th>
                {auditColumns.slice(0, 8).map(col => (
                  <th key={col.slot} className="border border-black p-1 text-center font-extrabold">P.M. {col.slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-1 font-bold bg-slate-50">DATE</td>
                {auditColumns.slice(0, 8).map((col, idx) => (
                  <td key={col.slot} className="border border-black p-0.5">
                    <input 
                      type="text" 
                      value={col.date} 
                      onChange={(e) => {
                        const copy = [...auditColumns];
                        copy[idx].date = e.target.value;
                        setAuditColumns(copy);
                      }} 
                      className="w-full border-none bg-transparent text-center text-[10.5px] outline-none font-medium" 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black p-1 font-bold bg-slate-50">START TIME</td>
                {auditColumns.slice(0, 8).map((col, idx) => (
                  <td key={col.slot} className="border border-black p-0.5">
                    <input 
                      type="text" 
                      value={col.startTime} 
                      onChange={(e) => {
                        const copy = [...auditColumns];
                        copy[idx].startTime = e.target.value;
                        setAuditColumns(copy);
                      }} 
                      className="w-full border-none bg-transparent text-center text-[10.5px] outline-none font-medium" 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black p-1 font-bold bg-slate-50">CLOSE TIME</td>
                {auditColumns.slice(0, 8).map((col, idx) => (
                  <td key={col.slot} className="border border-black p-0.5">
                    <input 
                      type="text" 
                      value={col.closeTime} 
                      onChange={(e) => {
                        const copy = [...auditColumns];
                        copy[idx].closeTime = e.target.value;
                        setAuditColumns(copy);
                      }} 
                      className="w-full border-none bg-transparent text-center text-[10.5px] outline-none font-medium" 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black p-1 font-bold bg-slate-50">TOTAL TIME</td>
                {auditColumns.slice(0, 8).map((col, idx) => (
                  <td key={col.slot} className="border border-black p-0.5 font-bold">
                    <input 
                      type="text" 
                      value={col.totalTime} 
                      onChange={(e) => {
                        const copy = [...auditColumns];
                        copy[idx].totalTime = e.target.value;
                        setAuditColumns(copy);
                      }} 
                      className="w-full border-none bg-transparent text-center text-[10.5px] outline-none font-bold text-blue-700" 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black p-1 font-bold bg-slate-50">SIGNATURE TECHNICIAN</td>
                {auditColumns.slice(0, 8).map((col, idx) => (
                  <td key={col.slot} className="border border-black p-0.5">
                    <input 
                      type="text" 
                      value={col.sigTech} 
                      onChange={(e) => {
                        const copy = [...auditColumns];
                        copy[idx].sigTech = e.target.value;
                        setAuditColumns(copy);
                      }} 
                      className="w-full border-none bg-transparent text-center text-[10.5px] outline-none" 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black p-1 font-bold bg-slate-50">SIGNATURE ENGINEER</td>
                {auditColumns.slice(0, 8).map((col, idx) => (
                  <td key={col.slot} className="border border-black p-0.5">
                    <input 
                      type="text" 
                      value={col.sigEng} 
                      onChange={(e) => {
                        const copy = [...auditColumns];
                        copy[idx].sigEng = e.target.value;
                        setAuditColumns(copy);
                      }} 
                      className="w-full border-none bg-transparent text-center text-[10.5px] outline-none" 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black p-1 font-bold bg-slate-50">SIGNATURE QUALITY ENGINEER</td>
                {auditColumns.slice(0, 8).map((col, idx) => (
                  <td key={col.slot} className="border border-black p-0.5">
                    <input 
                      type="text" 
                      value={col.sigQEng} 
                      onChange={(e) => {
                        const copy = [...auditColumns];
                        copy[idx].sigQEng = e.target.value;
                        setAuditColumns(copy);
                      }} 
                      className="w-full border-none bg-transparent text-center text-[10.5px] outline-none" 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black p-1 font-bold bg-slate-50">SIGNATURE CELL OWNER</td>
                {auditColumns.slice(0, 8).map((col, idx) => (
                  <td key={col.slot} className="border border-black p-0.5">
                    <input 
                      type="text" 
                      value={col.sigOwner} 
                      onChange={(e) => {
                        const copy = [...auditColumns];
                        copy[idx].sigOwner = e.target.value;
                        setAuditColumns(copy);
                      }} 
                      className="w-full border-none bg-transparent text-center text-[10.5px] outline-none" 
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend & Administrative Sign-off Footer */}
        <div className="flex items-center justify-between gap-4 border border-black p-2 bg-slate-50 mb-3 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-black text-slate-900">LEGEND / SYMBOLS:</span>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <div className="flex items-center gap-1">
                <span className="text-emerald-700 font-black">✓</span>
                <span>OK / DONE</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-rose-700 font-black">✕</span>
                <span>NOT OK</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-700 font-black">△</span>
                <span>ATTENTION</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-700 font-black">⤹</span>
                <span>RECTIFIED</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-purple-700 font-black">◯</span>
                <span>SPARE CHANGE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-slate-300 rounded p-1.5 px-3 bg-white flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-700">PREPARED BY:</span>
              <input 
                type="text" 
                value={headerInfo.preparedBy} 
                onChange={(e) => setHeaderInfo({ ...headerInfo, preparedBy: e.target.value })}
                className="border-none outline-none font-bold text-[11px] text-slate-900 w-28"
              />
            </div>
            <div className="border border-slate-300 rounded p-1.5 px-3 bg-white flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-700">APPROVED BY:</span>
              <input 
                type="text" 
                value={headerInfo.approvedBy} 
                onChange={(e) => setHeaderInfo({ ...headerInfo, approvedBy: e.target.value })}
                className="border-none outline-none font-bold text-[11px] text-slate-900 w-28"
              />
            </div>
          </div>
        </div>

        {/* Compliance Notes */}
        <div className="text-[10px] text-slate-600 space-y-0.5 border-t border-slate-300 pt-2">
          <p><strong>NOTE 1:</strong> QUARTERLY CHECKS WILL BE DONE IN MAR, JUNE, SEPT, DEC</p>
          <p><strong>NOTE 2:</strong> INPUT FROM DAILY, WEEKLY & START UP CHECKSHEET RESULT SHOULD BE CONSIDERED</p>
          <p><strong>NOTE 3:</strong> REFER MAINTENANCE MANUAL DURING PREVENTIVE MAINTENANCE</p>
          <p><strong>NOTE 4:</strong> PREVENTIVE MAINTENANCE MUST BE DONE IN EVERY QUARTER</p>
        </div>
      </div>
    </div>
  );
}
