import React, { useState } from 'react';
import { Save, RotateCcw, Wrench, Camera, X, Eye, Printer, CheckCircle2, ArrowLeft } from 'lucide-react';

// Master sections directly from FURUKAWA MINDA ELECTRIC PVT. LTD. sheet
const INITIAL_PM_SECTIONS = [
  {
    id: 1,
    title: 'Computer',
    color: '#9bc2e6',
    noPhoto: true,
    items: [
      {
        sNo: '1.1',
        checkLocation: 'Software back up',
        checkPoint: 'Latest updated date',
        checkMethods: 'Take back up of current software, provide date extension',
        judgementCriteria: 'should be latest back-up.',
        actionNotOk: 'Take Backup'
      }
    ]
  },
  {
    id: 2,
    title: 'Wire Feeding Unit',
    color: '#9bc2e6',
    hasCalibrationNote: 'Calibration required after every servicing using calibration block',
    photoGroups: [
      { startIndex: 0, count: 4, label: 'Feeding & Measuring Rollers' },
      { startIndex: 4, count: 5, label: 'Gears & Straightener Unit' }
    ],
    items: [
      {
        sNo: '2.1',
        checkLocation: 'Feeding & Measuring Wheel surface condition',
        checkPoint: 'No Wire slippage',
        checkMethods: 'Pull the wire through rollers in closed condition to check the movement of roller.',
        judgementCriteria: 'Roller should not move.',
        actionNotOk: 'Adjust setting/Replace'
      },
      {
        sNo: '2.2',
        checkLocation: 'Gap between Feeding rollers in close condition',
        checkPoint: '0.2mm gap b/w rollers',
        checkMethods: 'Check Gap',
        judgementCriteria: 'Adjust with Filler Gauge',
        actionNotOk: 'Adjust setting/Replace'
      },
      {
        sNo: '2.3',
        checkLocation: 'Feeding & Timing Belt',
        checkPoint: 'Damaged Teeth/ Play',
        checkMethods: 'Check belt Tension',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust setting/Replace'
      },
      {
        sNo: '2.4',
        checkLocation: 'Encoder circlip',
        checkPoint: 'No damage / No loose',
        checkMethods: 'Check looseness of circlip',
        judgementCriteria: 'Circlip hand insert in encoder shaft',
        actionNotOk: 'Replace if required'
      },
      {
        sNo: '2.5',
        checkLocation: 'Gears',
        checkPoint: 'Damaged Teeth/ Play/Sound',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust setting/Replace'
      },
      {
        sNo: '2.6',
        checkLocation: 'Air Pressure Feeding roller.',
        checkPoint: '0.1 to 0.3 mpa',
        checkMethods: 'Check Pressure',
        judgementCriteria: 'should be 0.1 to 0.3 mpa',
        actionNotOk: 'Adjust if required'
      },
      {
        sNo: '2.7',
        checkLocation: 'Condition of bearings.',
        checkPoint: 'Play/ Jam /Sound',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Replace if required'
      },
      {
        sNo: '2.8',
        checkLocation: 'Straightner /Ceramic Bush',
        checkPoint: 'Jam / Damage',
        checkMethods: 'Check Movement',
        judgementCriteria: 'Smooth Movement/Damaged',
        actionNotOk: 'Replace if required'
      },
      {
        sNo: '2.9',
        checkLocation: 'Wire Guide Block',
        checkPoint: 'Damage / Wire guide play',
        checkMethods: 'Check Movement',
        judgementCriteria: 'Smooth Movement / Undamaged',
        actionNotOk: 'Replace if required'
      }
    ]
  },
  {
    id: 3,
    title: 'Swivel Unit- 1 & 2  &  Push Pull unit 1 & 2',
    color: '#9bc2e6',
    hasCalibrationNote: 'Calibration required after every servicing.',
    photoGroups: [
      { startIndex: 0, count: 4, label: 'Swivel Gripper & Arms' },
      { startIndex: 4, count: 3, label: 'LM Guide & Sensors' }
    ],
    items: [
      {
        sNo: '3.1',
        checkLocation: 'Gripper',
        checkPoint: 'Damaged Teeth / Play',
        checkMethods: 'Check movement',
        judgementCriteria: 'Should close smooth',
        actionNotOk: 'Adjust setting / Replace'
      },
      {
        sNo: '3.2',
        checkLocation: 'Lever left & right arm',
        checkPoint: 'Damaged Teeth / Play',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust setting / Replace'
      },
      {
        sNo: '3.3',
        checkLocation: 'Timing Belt',
        checkPoint: 'Damaged Teeth / Play',
        checkMethods: 'Check belt Tension',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust setting / Replace'
      },
      {
        sNo: '3.4',
        checkLocation: 'Gripper Air Pressure',
        checkPoint: '0.4 to 0.6 mpa',
        checkMethods: 'Check Pressure',
        judgementCriteria: 'Should be 0.4 to 0.6 mpa',
        actionNotOk: 'Adjust if required'
      },
      {
        sNo: '3.5',
        checkLocation: 'LM Guide',
        checkPoint: 'No Play in guides',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust & Tighten / Replace'
      },
      {
        sNo: '3.6',
        checkLocation: 'Sensors',
        checkPoint: 'Sensors Mounting & Connections.',
        checkMethods: 'Sensor working & bolt tightening.',
        judgementCriteria: 'No loose connections & Physical damage.',
        actionNotOk: 'Reconnect / Replace / Remount'
      },
      {
        sNo: '3.8',
        checkLocation: 'Linear motor pulley',
        checkPoint: 'Motor pulley not free movement from shaft',
        checkMethods: 'Check mounting bolt of motor pulley',
        judgementCriteria: 'Pulley not free movement',
        actionNotOk: 'Adjust & Tighten / Replace'
      }
    ]
  },
  {
    id: 4,
    title: 'Cutting Head Unit',
    color: '#9bc2e6',
    hasCalibrationNote: 'Calibration required after every servicing using calibration block',
    photoGroups: [
      { startIndex: 0, count: 4, label: 'Cutting Blades & LM Guide' }
    ],
    items: [
      {
        sNo: '4.1',
        checkLocation: 'Blades',
        checkPoint: 'Condition of Blades',
        checkMethods: 'Visual check',
        judgementCriteria: 'No U grooves',
        actionNotOk: 'Replace if required'
      },
      {
        sNo: '4.2',
        checkLocation: 'Holding Block/Bolts',
        checkPoint: 'Condition of block',
        checkMethods: 'Visual check',
        judgementCriteria: 'No Play & Smooth Tightening of bolts',
        actionNotOk: 'Check the lubricating line for block / belt'
      },
      {
        sNo: '4.3',
        checkLocation: 'LM Guide',
        checkPoint: 'No Play in guides / Lubricate',
        checkMethods: 'Check movement',
        judgementCriteria: 'Smooth Movement',
        actionNotOk: 'Adjust & Tighten / Replace / Lubricate'
      },
      {
        sNo: '4.4',
        checkLocation: 'PVC Collection unit',
        checkPoint: 'Air Flow',
        checkMethods: 'Operate Manually',
        judgementCriteria: 'Air should flow',
        actionNotOk: 'Clean with air pressure'
      }
    ]
  },
  {
    id: 5,
    title: 'Conveyor',
    color: '#9bc2e6',
    photoGroups: [
      { startIndex: 0, count: 4, label: 'Conveyor & Trough' }
    ],
    items: [
      {
        sNo: '5.1',
        checkLocation: 'Conveyor belt & Band drum',
        checkPoint: 'Belt movement',
        checkMethods: 'Band drum & Belt Alignment',
        judgementCriteria: 'No Wear tear of belt & Banddrum',
        actionNotOk: 'Adjust / Replace the wornout part'
      },
      {
        sNo: '5.2',
        checkLocation: 'Trough',
        checkPoint: 'Up-down Speed',
        checkMethods: 'Check up-down timing',
        judgementCriteria: 'Should be up-down speed ok',
        actionNotOk: 'Adjust the valve'
      },
      {
        sNo: '5.3',
        checkLocation: 'Conveyor trough',
        checkPoint: 'Any sharp edge / obstruction',
        checkMethods: 'Check sharp edge & obstruction',
        judgementCriteria: 'Should be sharp edge ok',
        actionNotOk: 'Remove sharp edge & obstruction'
      },
      {
        sNo: '5.4',
        checkLocation: 'Sensors',
        checkPoint: 'Sensors Mounting & Connections.',
        checkMethods: 'Sensor working & bolt tightening.',
        judgementCriteria: 'No loose connections & Physical damage.',
        actionNotOk: 'Reconnect / Replace / Remount'
      }
    ]
  },
  {
    id: 6,
    title: 'Servo Controller Rack and Electrical Panel',
    color: '#9bc2e6',
    photoGroups: [
      { startIndex: 0, count: 4, label: 'Control Rack & Cards' }
    ],
    items: [
      {
        sNo: '6.1',
        checkLocation: 'Mounting of cards',
        checkPoint: 'Proper orientation in the slots',
        checkMethods: 'Check screws tighten',
        judgementCriteria: 'Should be tight.',
        actionNotOk: 'Replace'
      },
      {
        sNo: '6.2',
        checkLocation: 'Exhaust fan condition',
        checkPoint: 'Mounting and proper working',
        checkMethods: 'Clean with air pressure',
        judgementCriteria: 'If not working.',
        actionNotOk: 'Replace'
      },
      {
        sNo: '6.3',
        checkLocation: 'Dust on connectors / PCBs / Relays',
        checkPoint: 'No Dust or foreign matter',
        checkMethods: 'Clean with brush / air',
        judgementCriteria: 'Should be ok.',
        actionNotOk: 'Replace'
      },
      {
        sNo: '6.4',
        checkLocation: 'Drive Resistance',
        checkPoint: 'Resistance condition',
        checkMethods: 'Check Dust or Carbon on Leg',
        judgementCriteria: 'No wear or no carbon on resistance leg',
        actionNotOk: 'Replace if required or clean the resistance leg'
      }
    ]
  },
  {
    id: 7,
    title: 'Crimping Press / Crimp Force monitor',
    color: '#9bc2e6',
    photoGroups: [
      { startIndex: 0, count: 4, label: 'Crimping Press & CFM' }
    ],
    items: [
      {
        sNo: '7.1',
        checkLocation: 'Base Plate & Lock',
        checkPoint: 'Plate loose & Lock Damage',
        checkMethods: 'Tighten all Bolts.',
        judgementCriteria: 'No play after Mounting applicator.',
        actionNotOk: 'Replace Allen Bolts.'
      },
      {
        sNo: '7.2',
        checkLocation: 'Ram mounted Piezo sensor',
        checkPoint: 'Looseness, Cleanliness',
        checkMethods: 'Check mounting bolt of Ram',
        judgementCriteria: 'Should be ok.',
        actionNotOk: 'Replace'
      },
      {
        sNo: '7.3',
        checkLocation: 'Sensor Cable',
        checkPoint: 'Physical damage & routing',
        checkMethods: 'Binding cable properly',
        judgementCriteria: 'Should be ok.',
        actionNotOk: 'Replace'
      },
      {
        sNo: '7.4',
        checkLocation: 'Press card communication cable and port',
        checkPoint: 'Condition of cable coupler and port soldering',
        checkMethods: 'Check Movement of coupler and looseness of port soldering',
        judgementCriteria: 'Should not be looseness in coupler after insert in press card',
        actionNotOk: 'If not ok replace the communication cable or if soldering loose then re-solder'
      }
    ]
  },
  {
    id: 8,
    title: 'FRL Unit and Prefeeder unit',
    color: '#9bc2e6',
    photoGroups: [
      { startIndex: 0, count: 2, label: 'Complete FRL Unit' },
      { startIndex: 2, count: 3, label: 'Prefeeder Unit' }
    ],
    items: [
      {
        sNo: '8.1',
        checkLocation: 'Complete FRL Unit.',
        checkPoint: 'Filter & Oil',
        checkMethods: 'Check oil level, Clean Filter & Drain the Moisture from Filter.',
        judgementCriteria: 'No moisture. Oil level acc. to marked level',
        actionNotOk: 'Dismantle & clean thoroughly & lubricate'
      },
      {
        sNo: '8.2',
        checkLocation: 'Machine',
        checkPoint: 'Air Leakage',
        checkMethods: 'Check connectors & Pneumatic pipes',
        judgementCriteria: 'No Air Leakage & No moisture, Oil level acc. marking.',
        actionNotOk: 'Retight / Replace'
      },
      {
        sNo: '8.3',
        checkLocation: 'Prefeeder Roller pulleys & Shaft',
        checkPoint: 'Pulley & Shaft Movement',
        checkMethods: 'Visual check',
        judgementCriteria: 'No cut and damage in pulley.',
        actionNotOk: 'Adjust setting / Replace'
      },
      {
        sNo: '8.4',
        checkLocation: 'Sensors',
        checkPoint: 'Sensors Mounting & Connections.',
        checkMethods: 'Sensor working & bolt tightening.',
        judgementCriteria: 'No loose connections & Physical damage.',
        actionNotOk: 'Reconnect / Replace / Remount'
      },
      {
        sNo: '8.5',
        checkLocation: 'All Cylinders / Pressure Gauges',
        checkPoint: 'Proper Functioning.',
        checkMethods: 'Manual Movement / Check Reading',
        judgementCriteria: 'Should be proper functioning.',
        actionNotOk: 'Adjust setting / Replace'
      },
      {
        sNo: '8.6',
        noPhoto: true,
        checkLocation: 'Wire',
        checkPoint: 'Insulation resistance (HVT) of CIVUS wire',
        checkMethods: 'Wire HVT',
        judgementCriteria: 'HVT test of wire',
        actionNotOk: 'Check by HVT tester'
      }
    ]
  },
  {
    id: 10,
    title: 'Seal Unit',
    color: '#9bc2e6',
    photoGroups: [
      { startIndex: 0, count: 5, label: 'Seal Insertion Unit' }
    ],
    items: [
      {
        sNo: '10.1',
        checkLocation: 'Separation tool',
        checkPoint: 'Movement of separation tool',
        checkMethods: 'Visual check',
        judgementCriteria: 'Should be free movement',
        actionNotOk: 'Adjust setting / Replace'
      },
      {
        sNo: '10.2',
        checkLocation: 'Sensor',
        checkPoint: 'Sensors Mounting & Connections.',
        checkMethods: 'Sensor working & bolt tightening.',
        judgementCriteria: 'No loose connections & Physical damage.',
        actionNotOk: 'Reconnect / Replace / Remount'
      },
      {
        sNo: '10.3',
        checkLocation: 'Knock out unit piston',
        checkPoint: 'Knock out unit piston bolt',
        checkMethods: 'Bolt fully tight by tool',
        judgementCriteria: 'Should be fully tight',
        actionNotOk: 'Adjust setting / Replace'
      },
      {
        sNo: '10.4',
        checkLocation: 'Push plate piston',
        checkPoint: 'Push plate piston Nut',
        checkMethods: 'Nut fully tight by tool',
        judgementCriteria: 'Should be fully tight',
        actionNotOk: 'Adjust setting / Replace'
      },
      {
        sNo: '10.5',
        checkLocation: 'Check the Ring Condition',
        checkPoint: 'Locking of Separation Tool',
        checkMethods: 'Visual check',
        judgementCriteria: 'No wear Tear',
        actionNotOk: 'Replace'
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
      actionNotOk: 'Replace guide rods if required'
    },
    {
      sNo: '2*',
      checkLocation: 'Linear Measuring Scale',
      checkPoint: 'LMS cleaning',
      checkMethods: 'Clean with Cotton or Tissue paper',
      judgementCriteria: 'No Scratch',
      actionNotOk: 'Replace damage bolts'
    },
    {
      sNo: '3*',
      checkLocation: 'Base Plate Locking arrangement',
      checkPoint: 'Looseness',
      checkMethods: 'Lock bolts washers stiffness',
      judgementCriteria: 'Should be not looseness',
      actionNotOk: 'Replace damage bolts'
    },
    {
      sNo: '4*',
      checkLocation: 'Press Ram guide rod Lubrication',
      checkPoint: 'Free Movement',
      checkMethods: 'Cleaning & Oiling',
      judgementCriteria: 'Should be movement',
      actionNotOk: 'Replace damage bolts'
    }
  ],
  halfYearly: [
    {
      sNo: '1*',
      checkLocation: 'Power Contactors',
      checkPoint: 'Contact points',
      checkMethods: 'Should Clean with CRC or IPA',
      judgementCriteria: 'Continuity ok',
      actionNotOk: 'Dismantle & clean or Replace'
    },
    {
      sNo: '2*',
      checkLocation: 'Measuring Encoder',
      checkPoint: 'Encoder mount plate',
      checkMethods: 'Check the plate breakage',
      judgementCriteria: 'No any crack on encoder mount plate',
      actionNotOk: 'Replace to encoder mount plate if any crack'
    }
  ],
  yearly: [
    {
      sNo: '1*',
      checkLocation: 'Swivel 1 & 2 / Push Pull',
      checkPoint: 'All damaged nut-bolts should be changed & Tighten. Greasing & lubrication of all moving parts',
      checkMethods: 'Complete Overhauling of guide rods & linear bearings.',
      judgementCriteria: 'No play, wear Tear & No abnormal sound',
      actionNotOk: 'Dismantle, clean & Lubricate or Replace'
    }
  ]
};

export default function MachinePmChecksheet({ machine, onClose }) {
  const formattedModel = machine?.model ? machine.model.replace('_', ' ') : 'G 252';
  const initialMcName = machine?.name ? `${machine.name} (${formattedModel}) CUT & CRIMP MACHINE` : `${formattedModel} CUT & CRIMP MACHINE`;

  // Machine header details matching screenshots
  const [headerInfo, setHeaderInfo] = useState({
    mcName: initialMcName,
    srNo: machine?.name || (machine?.id ? `CC-${String(machine.id).padStart(2, '0')}` : ''),
    mcDisplayNo: machine?.name || '',
    installationDate: '',
    year: String(new Date().getFullYear()),
    date: '',
    docNo: 'CHK-WH-MT-043',
    rev: '19',
    preparedBy: '',
    approvedBy: ''
  });

  // PM columns (1 to 12 counter columns as shown in screenshot 2)
  const pmColumns = Array.from({ length: 12 }, (_, i) => i + 1);

  // Status matrix for PM counter cells: key `${sNo}_${col}_top` and `${sNo}_${col}_bottom`
  const [counterCells, setCounterCells] = useState({});
  const [headerDates, setHeaderDates] = useState({});

  // Uploaded photo storage: key `${secId}_${photoGroupIdx}`
  const [sectionPhotos, setSectionPhotos] = useState({});

  // Lightbox preview modal state
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // PM Sections and Periodic checks
  const sections = INITIAL_PM_SECTIONS;
  const periodic = INITIAL_PERIODIC_CHECKS;
  const [savedMessage, setSavedMessage] = useState('');

  // Handle cell input in both triangles
  const handleCounterInputChange = (key, value) => {
    setCounterCells(prev => ({ ...prev, [key]: value }));
  };

  const handleHeaderDateChange = (col, value) => {
    setHeaderDates(prev => ({ ...prev, [col]: value }));
  };

  // Handle Photo Upload
  const handlePhotoUpload = (secId, photoGroupIdx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const key = `${secId}_${photoGroupIdx}`;
      setSectionPhotos(prev => ({ ...prev, [key]: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle Photo Removal
  const handleRemovePhoto = (secId, photoGroupIdx, e) => {
    e.stopPropagation();
    const key = `${secId}_${photoGroupIdx}`;
    setSectionPhotos(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleSave = () => {
    setSavedMessage(`PM Checksheet (${headerInfo.docNo}) successfully saved!`);
    setTimeout(() => setSavedMessage(''), 4500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values and photos in this PM Checksheet to standard defaults?')) {
      setCounterCells({});
      setHeaderDates({});
      setSectionPhotos({});
    }
  };

  // Helper to render each cell with a diagonal line (bottom-left to top-right /) and inputs in both triangles
  const renderDiagonalCell = (sNo, col) => {
    const topKey = `${sNo}_${col}_top`;
    const bottomKey = `${sNo}_${col}_bottom`;
    const topVal = counterCells[topKey] || '';
    const bottomVal = counterCells[bottomKey] || '';

    return (
      <td
        key={col}
        className="border border-black p-0 relative w-[48px] min-w-[48px] h-9 overflow-hidden bg-white text-center"
      >
        {/* Crisp Diagonal Line from Bottom-Left to Top-Right (/) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke="#000"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Top-Left Triangle Input */}
        <input
          type="text"
          className="absolute top-0 left-0 w-[55%] h-[55%] text-center text-[10px] font-black border-none outline-none bg-transparent focus:bg-amber-100 z-10 p-0 text-slate-900"
          value={topVal}
          onChange={(e) => handleCounterInputChange(topKey, e.target.value)}
          placeholder=""
          title={`P.M. #${col} Upper-Left Input (Plan/Before)`}
        />

        {/* Bottom-Right Triangle Input */}
        <input
          type="text"
          className="absolute bottom-0 right-0 w-[55%] h-[55%] text-center text-[10px] font-black border-none outline-none bg-transparent focus:bg-amber-100 z-10 p-0 text-slate-900"
          value={bottomVal}
          onChange={(e) => handleCounterInputChange(bottomKey, e.target.value)}
          placeholder=""
          title={`P.M. #${col} Lower-Right Input (Actual/After)`}
        />
      </td>
    );
  };

  // Helper to render photo card with full upload, change, delete, and zoom preview capabilities
  const renderPhotoCell = (secId, photoGroupIdx, label, rowSpan) => {
    const photoKey = `${secId}_${photoGroupIdx}`;
    const photoUrl = sectionPhotos[photoKey];
    const fileInputId = `pm-photo-upload-${secId}-${photoGroupIdx}`;

    return (
      <td
        rowSpan={rowSpan}
        className="border border-black p-1 text-center align-middle bg-white w-[130px] min-w-[130px] max-w-[130px]"
      >
        <input
          id={fileInputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handlePhotoUpload(secId, photoGroupIdx, e.target.files[0]);
            }
          }}
        />

        {photoUrl ? (
          <div className="flex flex-col items-center gap-1 group relative">
            <div
              className="w-28 h-20 border border-black rounded overflow-hidden relative cursor-pointer shadow-sm bg-slate-100"
              onClick={() => setPreviewPhoto({ url: photoUrl, label })}
              title="Click to enlarge"
            >
              <img
                src={photoUrl}
                alt={label}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                <Eye size={16} />
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 w-full text-[9.5px] font-bold">
              <label
                htmlFor={fileInputId}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                title="Change Photo"
              >
                Change
              </label>
              <span className="text-slate-400">•</span>
              <button
                type="button"
                className="text-rose-600 hover:text-rose-800 cursor-pointer bg-transparent border-none p-0 text-[9.5px] font-bold"
                onClick={(e) => handleRemovePhoto(secId, photoGroupIdx, e)}
                title="Remove Photo"
              >
                Delete
              </button>
            </div>
            <span className="text-[8.5px] text-slate-500 font-semibold truncate max-w-[110px]" title={label}>
              {label}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <label
              htmlFor={fileInputId}
              className="w-28 h-20 border-2 border-dashed border-slate-300 hover:border-blue-600 rounded bg-slate-50 hover:bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer transition-all gap-1 text-slate-500 hover:text-blue-600"
              title="Click to upload photograph for this section"
            >
              <Camera size={18} className="text-blue-600" />
              <span className="text-[9.5px] font-extrabold text-blue-700">+ Add Photo</span>
            </label>
            <span className="text-[8.5px] text-slate-500 font-semibold truncate max-w-[110px]" title={label}>
              {label}
            </span>
          </div>
        )}
      </td>
    );
  };

  return (
    <div className="flex flex-col gap-3 w-full animate-fadeIn font-sans pb-10">
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

      {/* Main Excel Sheet Canvas */}
      <div className="bg-white border-2 border-black p-2 font-sans shadow-lg rounded-[2px] overflow-x-auto">
        <div className="min-w-[1900px] w-max select-text text-black">

          {/* Header Banner 1: Green Background with Company Name & Doc No */}
          <div className="grid grid-cols-[1fr_240px] border-2 border-black bg-[#d9f2d9] items-center">
            <div className="text-center font-black text-[15px] tracking-wider text-black py-1">
              FURUKAWA MINDAELECTRIC PVT. LTD
            </div>
            <div className="border-l-2 border-black bg-[#d9f2d9] px-2 py-0.5 text-xs font-bold text-black text-left">
              Doc No:-{headerInfo.docNo}
            </div>
          </div>

          {/* Header Banner 2: Pastel Yellow Background with Sheet Title & Rev No */}
          <div className="grid grid-cols-[1fr_240px] border-x-2 border-b-2 border-black bg-[#fff2cc] items-center">
            <div className="text-center font-black text-sm tracking-[0.25em] text-black py-1 uppercase">
              MONTHLY  AND  PERIODIC  PREVENTIVE  CHECK  SHEET
            </div>
            <div className="border-l-2 border-black bg-[#fff2cc] px-2 py-0.5 text-xs font-bold text-black text-left">
              Rev:-{headerInfo.rev}
            </div>
          </div>

          {/* Metadata Row: M/C Name, Sr.No, Display No, Installation Date, Year, Date */}
          <div className="grid grid-cols-[380px_200px_220px_220px_160px_1fr_240px] border-x-2 border-b-2 border-black bg-white text-xs items-center">
            {/* M/C Name */}
            <div className="border-r border-black p-1 px-2 font-bold flex items-center gap-1">
              <span className="whitespace-nowrap font-black">M/C NAME:</span>
              <input
                type="text"
                className="w-full border-none outline-none font-bold text-xs bg-transparent focus:bg-yellow-50"
                value={headerInfo.mcName}
                onChange={(e) => setHeaderInfo({ ...headerInfo, mcName: e.target.value })}
              />
            </div>

            {/* SR.NO. */}
            <div className="border-r border-black p-1 px-2 flex items-center gap-1 font-bold">
              <span className="whitespace-nowrap font-black">SR.NO. :</span>
              <input
                type="text"
                className="w-full border-none outline-none font-semibold text-xs bg-transparent focus:bg-yellow-50"
                value={headerInfo.srNo}
                onChange={(e) => setHeaderInfo({ ...headerInfo, srNo: e.target.value })}
              />
            </div>

            {/* M/C DISPLAY NO. */}
            <div className="border-r border-black p-1 px-2 flex items-center gap-1 font-bold">
              <span className="whitespace-nowrap font-black">M/C DISPLAY NO.</span>
              <input
                type="text"
                className="w-full border-none outline-none font-extrabold text-xs text-blue-700 bg-transparent focus:bg-yellow-50"
                value={headerInfo.mcDisplayNo}
                onChange={(e) => setHeaderInfo({ ...headerInfo, mcDisplayNo: e.target.value })}
              />
            </div>

            {/* INSTALLATION DATE */}
            <div className="border-r border-black p-1 px-2 flex items-center gap-1 font-bold">
              <span className="whitespace-nowrap font-black">INSTALLATION DATE:-</span>
              <input
                type="text"
                className="w-full border-none outline-none font-semibold text-xs bg-transparent focus:bg-yellow-50"
                value={headerInfo.installationDate}
                onChange={(e) => setHeaderInfo({ ...headerInfo, installationDate: e.target.value })}
              />
            </div>

            {/* YEAR */}
            <div className="border-r border-black p-1 px-2 flex items-center gap-1 font-bold">
              <span className="whitespace-nowrap font-black">YEAR-</span>
              <input
                type="text"
                className="w-full border-none outline-none font-bold text-xs bg-transparent focus:bg-yellow-50 text-center"
                value={headerInfo.year}
                onChange={(e) => setHeaderInfo({ ...headerInfo, year: e.target.value })}
              />
            </div>

            {/* Empty Center Fill */}
            <div className="bg-white"></div>

            {/* Date Box on Far Right */}
            <div className="border-l-2 border-black p-1 px-2 text-xs font-bold text-black text-left bg-white">
              Date:-{headerInfo.date}
            </div>
          </div>

          {/* Master Table Container with Vertical Overflow and Scrollability */}
          <div className="w-full max-h-[720px] overflow-y-auto border-x-2 border-b-2 border-black relative">
            <table className="w-full border-collapse text-[10.5px]">
              <thead className="sticky top-0 z-20 bg-white">
                {/* Header Row 1: Main Headings and P.M. Counter Group */}
                <tr className="border-b-2 border-black bg-white">
                  <th rowSpan={2} className="border border-black p-1 font-black text-black w-[45px] min-w-[45px] text-center align-middle bg-white">
                    S.No
                  </th>
                  <th rowSpan={2} className="border border-black p-1 font-black text-black w-[130px] min-w-[130px] text-center align-middle bg-white">
                    SECTIONS PHOTOGRAPHS
                  </th>
                  <th rowSpan={2} className="border border-black p-1 font-black text-black w-[190px] min-w-[190px] text-center align-middle bg-white">
                    CHECK LOCATION
                  </th>
                  <th rowSpan={2} className="border border-black p-1 font-black text-black w-[180px] min-w-[180px] text-center align-middle bg-white">
                    CHECK POINT
                  </th>
                  <th rowSpan={2} className="border border-black p-1 font-black text-black w-[230px] min-w-[230px] text-center align-middle bg-white">
                    CHECK METHODS
                  </th>
                  <th rowSpan={2} className="border border-black p-1 font-black text-black w-[180px] min-w-[180px] text-center align-middle bg-white">
                    JUGDEMANT CRITIERA
                  </th>
                  <th rowSpan={2} className="border border-black p-1 font-black text-black w-[180px] min-w-[180px] text-center align-middle bg-white">
                    ACTION REQUIRED FOR NOT<br />OK CONDITION
                  </th>

                  {/* P.M. COUNTER spanning 12 columns */}
                  <th colSpan={12} className="border border-black p-1 font-black text-black text-center text-xs tracking-wider bg-white">
                    P.M. COUNTER
                  </th>
                </tr>

                {/* Header Row 2: 1 to 12 PM Counter Columns */}
                <tr className="border-b-2 border-black bg-white">
                  {pmColumns.map((col) => (
                    <th
                      key={col}
                      className="border border-black p-1 text-center font-extrabold text-black w-[48px] min-w-[48px] bg-slate-50 text-xs"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {sections.map((section) => {
                  const isSection3 = section.id === 3;

                  return (
                    <React.Fragment key={section.id}>
                      {/* Category Blue Banner Row (#9bc2e6 as in screenshot) */}
                      <tr className="border-y-2 border-black bg-[#9bc2e6]">
                        <td className="border border-black p-1 text-center font-black text-sm text-black">
                          {section.id}
                        </td>
                        <td
                          colSpan={18}
                          className="border border-black p-1 pl-3 font-black text-sm text-black text-center uppercase tracking-wide"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span>{section.title}</span>
                          </div>
                        </td>
                      </tr>

                      {/* Items for this Section */}
                      {section.items.map((item, itemIdx) => {
                        // Check if this item has no photo, or starts a photo group, or is the single section photo
                        let photoCell = null;
                        if (item.noPhoto || item.sNo === '8.6' || item.checkLocation === 'Wire') {
                          photoCell = (
                            <td
                              className="border border-black p-1 text-center align-middle bg-white w-[130px] min-w-[130px] max-w-[130px]"
                            />
                          );
                        } else if (section.noPhoto) {
                          if (itemIdx === 0) {
                            photoCell = (
                              <td
                                rowSpan={section.items.length}
                                className="border border-black p-1 text-center align-middle bg-white w-[130px] min-w-[130px] max-w-[130px]"
                              />
                            );
                          }
                        } else if (section.photoGroups) {
                          const group = section.photoGroups.find(g => g.startIndex === itemIdx);
                          if (group) {
                            if (group.noPhoto) {
                              photoCell = (
                                <td
                                  rowSpan={group.count}
                                  className="border border-black p-1 text-center align-middle bg-white w-[130px] min-w-[130px] max-w-[130px]"
                                />
                              );
                            } else {
                              const groupIdx = section.photoGroups.indexOf(group);
                              photoCell = renderPhotoCell(section.id, groupIdx, group.label, group.count);
                            }
                          }
                        } else if (itemIdx === 0) {
                          // Default single photo for entire section
                          photoCell = renderPhotoCell(section.id, 0, section.title, section.items.length);
                        }

                        return (
                          <tr
                            key={item.sNo}
                            className={`hover:bg-slate-50/80 transition-colors ${isSection3 ? 'bg-sky-50/30' : ''
                              }`}
                          >
                            {/* S.No */}
                            <td className="border border-black p-1 text-center font-bold text-black align-middle">
                              {item.sNo}
                            </td>

                            {/* Section Photograph Cell (spanned across rows) */}
                            {photoCell}

                            {/* Check Location */}
                            <td className="border border-black p-1.5 font-bold text-black align-middle">
                              {item.checkLocation}
                            </td>

                            {/* Check Point */}
                            <td className="border border-black p-1.5 text-black align-middle leading-snug">
                              {item.checkPoint}
                            </td>

                            {/* Check Methods */}
                            <td className="border border-black p-1.5 text-black align-middle leading-snug">
                              {item.checkMethods}
                            </td>

                            {/* Jugdemant Critiera */}
                            <td className="border border-black p-1.5 text-black align-middle leading-snug">
                              {item.judgementCriteria}
                            </td>

                            {/* Action Required for Not OK Condition */}
                            <td className="border border-black p-1.5 text-black font-medium align-middle leading-snug">
                              {item.actionNotOk}
                            </td>

                            {/* 12 P.M. Counter Columns with Dual Triangle Inputs */}
                            {pmColumns.map((col) => renderDiagonalCell(item.sNo, col))}
                          </tr>
                        );
                      })}

                      {/* Calibration Note Row if applicable */}
                      {section.hasCalibrationNote && (
                        <tr className="bg-amber-50 border-b-2 border-black">
                          <td colSpan={19} className="border border-black p-1 text-center italic font-bold text-blue-900 text-xs">
                            ★ {section.hasCalibrationNote}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* ======================================================== */}
                {/* QUARTERLY / PERIODIC CHECKS */}
                {/* ======================================================== */}
                <tr className="border-y-2 border-black bg-[#ffe699]">
                  <td colSpan={19} className="border border-black p-1.5 text-center font-black text-xs uppercase tracking-wider text-black">
                    QUARTERLY / PERIODIC CHECKS (MAR, JUN, SEP, DEC)
                  </td>
                </tr>
                {periodic.quarterly.map((q) => (
                  <tr key={q.sNo} className="hover:bg-slate-50">
                    <td className="border border-black p-1 text-center font-bold">{q.sNo}</td>
                    <td className="border border-black p-1 text-center italic font-semibold text-slate-500">Quarterly</td>
                    <td className="border border-black p-1.5 font-bold">{q.checkLocation}</td>
                    <td className="border border-black p-1.5">{q.checkPoint}</td>
                    <td className="border border-black p-1.5">{q.checkMethods}</td>
                    <td className="border border-black p-1.5">{q.judgementCriteria}</td>
                    <td className="border border-black p-1.5 font-semibold text-rose-700">{q.actionNotOk}</td>
                    {pmColumns.map((col) => renderDiagonalCell(q.sNo, col))}
                  </tr>
                ))}

                {/* ======================================================== */}
                {/* HALF YEARLY CHECK POINTS */}
                {/* ======================================================== */}
                <tr className="border-y-2 border-black bg-[#ffe699]">
                  <td colSpan={19} className="border border-black p-1.5 text-center font-black text-xs uppercase tracking-wider text-black">
                    HALF YEARLY CHECK POINTS (JUN, DEC)
                  </td>
                </tr>
                {periodic.halfYearly.map((h) => (
                  <tr key={h.sNo} className="hover:bg-slate-50">
                    <td className="border border-black p-1 text-center font-bold">{h.sNo}</td>
                    <td className="border border-black p-1 text-center italic font-semibold text-slate-500">Half Yearly</td>
                    <td className="border border-black p-1.5 font-bold">{h.checkLocation}</td>
                    <td className="border border-black p-1.5">{h.checkPoint}</td>
                    <td className="border border-black p-1.5">{h.checkMethods}</td>
                    <td className="border border-black p-1.5">{h.judgementCriteria}</td>
                    <td className="border border-black p-1.5 font-semibold text-rose-700">{h.actionNotOk}</td>
                    {pmColumns.map((col) => renderDiagonalCell(h.sNo, col))}
                  </tr>
                ))}

                {/* ======================================================== */}
                {/* YEARLY CHECK POINTS */}
                {/* ======================================================== */}
                <tr className="border-y-2 border-black bg-[#ffe699]">
                  <td colSpan={19} className="border border-black p-1.5 text-center font-black text-xs uppercase tracking-wider text-black">
                    YEARLY CHECK POINTS (DEC)
                  </td>
                </tr>
                {periodic.yearly.map((y) => (
                  <tr key={y.sNo} className="hover:bg-slate-50">
                    <td className="border border-black p-1 text-center font-bold">{y.sNo}</td>
                    <td className="border border-black p-1 text-center italic font-semibold text-slate-500">Yearly Overhaul</td>
                    <td className="border border-black p-1.5 font-bold">{y.checkLocation}</td>
                    <td className="border border-black p-1.5">{y.checkPoint}</td>
                    <td className="border border-black p-1.5">{y.checkMethods}</td>
                    <td className="border border-black p-1.5">{y.judgementCriteria}</td>
                    <td className="border border-black p-1.5 font-semibold text-rose-700">{y.actionNotOk}</td>
                    {pmColumns.map((col) => renderDiagonalCell(y.sNo, col))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Metadata & Legend */}
          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-700 px-1">
            <div className="flex items-center gap-4">
              <span>* Both triangles in each cell are editable inputs: <strong>Upper (Plan) / Lower (Actual)</strong></span>
              <span>* Click "+ Add Photo" to attach section verification photographs</span>
              <span>* Base Format: CHK-WH-MT-043 Rev.19</span>
            </div>
            <div className="flex items-center gap-4 font-bold text-slate-900">
              <label className="flex items-center gap-1">
                <span>Prepared By:</span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={headerInfo.preparedBy}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, preparedBy: e.target.value })}
                  className="border-b border-black outline-none px-1 text-xs font-semibold bg-transparent w-28"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>Approved By:</span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={headerInfo.approvedBy}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, approvedBy: e.target.value })}
                  className="border-b border-black outline-none px-1 text-xs font-semibold bg-transparent w-28"
                />
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 px-4 border-b border-slate-200 bg-slate-50">
              <span className="font-extrabold text-sm text-slate-800">
                {previewPhoto.label || 'Inspection Photograph'}
              </span>
              <button
                type="button"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer border-none bg-transparent"
                onClick={() => setPreviewPhoto(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-slate-900 max-h-[70vh] overflow-hidden">
              <img
                src={previewPhoto.url}
                alt="Enlarged inspection view"
                className="max-h-[65vh] max-w-full object-contain rounded"
              />
            </div>
            <div className="p-2.5 px-4 bg-slate-50 border-t border-slate-200 text-right">
              <button
                type="button"
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer border-none shadow-sm"
                onClick={() => setPreviewPhoto(null)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}