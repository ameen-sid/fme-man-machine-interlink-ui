import React, { useState } from 'react';
import MachinePmChecksheet from './alpha_355/MachinePmChecksheet';
import InspectionReportSheet from './alpha_355/InspectionReportSheet';
import PokayokeChecksheet from './alpha_355/PokayokeChecksheet';
import InstrumentChecksheet from './alpha_355/InstrumentChecksheet';
import DailyChecksheet from './alpha_355/DailyChecksheet';
import FiveSChecksheet from './alpha_355/FiveSChecksheet';
import OperationalChecksheets from './OperationalChecksheets';
import {
  ChevronDown,
  ChevronRight,
  Cpu,
  Boxes,
  Building2,
  MapPin,
  ArrowLeft,
  Factory,
  CheckCircle2,
  BarChart3,
  AlertOctagon,
  Lock,
  ShieldCheck,
  X,
  CreditCard,
  Users,
  Clock
} from 'lucide-react';

// Machine Model Mapping as specified
// Model: Machine Numbers
// G_252: 20, 21, 22
// G_253: 02, 04, 11, 12, 15, 16, 17, 18
// Alpha_355: 01, 03
// TRD_301: 05, 06, 07, 08, 09, 10
// TRD_411F: 14, 24, 23, 29, 19
// JAN: 25
// G_448: 26, 27, 28, 30, 31, 32
const MACHINE_MODEL_MAP = {
  // Alpha_355: 01, 03
  1: 'Alpha_355',
  3: 'Alpha_355',

  // G_253: 02, 04, 11, 12, 15, 16, 17, 18
  2: 'G_253',
  4: 'G_253',
  11: 'G_253',
  12: 'G_253',
  15: 'G_253',
  16: 'G_253',
  17: 'G_253',
  18: 'G_253',

  // TRD_301: 05, 06, 07, 08, 09, 10
  5: 'TRD_301',
  6: 'TRD_301',
  7: 'TRD_301',
  8: 'TRD_301',
  9: 'TRD_301',
  10: 'TRD_301',

  // TRD_411F: 14, 24, 23, 29, 19
  14: 'TRD_411F',
  19: 'TRD_411F',
  23: 'TRD_411F',
  24: 'TRD_411F',
  29: 'TRD_411F',

  // G_252: 20, 21, 22
  20: 'G_252',
  21: 'G_252',
  22: 'G_252',

  // JAN: 25
  25: 'JAN',

  // G_448: 26, 27, 28, 30, 31, 32
  26: 'G_448',
  27: 'G_448',
  28: 'G_448',
  30: 'G_448',
  31: 'G_448',
  32: 'G_448'
};

function getMachineModel(machineId) {
  const idNum = Number(machineId);
  return MACHINE_MODEL_MAP[idNum] || `Model ${machineId}`;
}

export default function MachineChecksheet({ onChecksheetStateChange }) {
  const [activeTab, setActiveTab] = useState('Auto Crimping');
  const [selectedUnitLocation, setSelectedUnitLocation] = useState('Bawal'); // Default 'Bawal' to directly show C&C machines
  const [selectedSubDept, setSelectedSubDept] = useState('CNC'); // Default 'CNC' section
  const [selectedMachine, setSelectedMachine] = useState(null); // null | { id: number, name: string }
  const [selectedChecksheet, setSelectedChecksheetState] = useState(null); // null | string

  const setSelectedChecksheet = (val) => {
    setSelectedChecksheetState(val);
    if (onChecksheetStateChange) {
      onChecksheetStateChange(Boolean(val));
    }
  };

  // Login Modal State for Operator & Quality Inspector Card Numbers
  const [pendingMachine, setPendingMachine] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [operatorCardNo, setOperatorCardNo] = useState('');
  const [inspectorCardNo, setInspectorCardNo] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSession, setActiveSession] = useState(null); // { operatorCardNo, inspectorCardNo }

  const handleMachineCardClick = (machine) => {
    // If session is already active for this checksheet session, directly open machine
    if (activeSession) {
      setSelectedMachine(machine);
      setSelectedChecksheet(null);
      return;
    }
    // Otherwise, open authentication modal first
    setPendingMachine(machine);
    setOperatorCardNo('');
    setInspectorCardNo('');
    setLoginError('');
    setShowLoginModal(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!operatorCardNo.trim()) {
      setLoginError('Please enter the Operator Card No.');
      return;
    }
    if (!inspectorCardNo.trim()) {
      setLoginError('Please enter the Quality Inspector Card No.');
      return;
    }

    // Set authenticated session and open the requested machine
    setActiveSession({
      operatorCardNo: operatorCardNo.trim(),
      inspectorCardNo: inspectorCardNo.trim()
    });
    // Auto-fill into C&C Excel sheet meta if available
    setCcSheetData(prev => ({
      ...prev,
      operatorName: operatorCardNo.trim(),
      inspectorName: inspectorCardNo.trim(),
      filledBy: operatorCardNo.trim()
    }));

    setSelectedMachine(pendingMachine);
    setSelectedChecksheet(null);
    setShowLoginModal(false);
    setPendingMachine(null);
    setLoginError('');
  };

  const handleLogout = () => {
    setActiveSession(null);
    setSelectedMachine(null);
    setSelectedChecksheet(null);
  };
  // State for editable C&C Production Status Excel sheet
  const [ccSheetData, setCcSheetData] = useState({
    date: new Date().toISOString().split('T')[0],
    shift: 'Shift A',
    operatorName: '',
    inspectorName: '',
    hourMeter: '8',
    plan: '4200',
    startTime: '06:00',
    finishTime: '14:00',
    workingTime: '480',
    hourlyRows: [
      { id: 1, machineProcess: 'C&C Crimping Terminal A', plan: '550', startTime: '06:00', finishTime: '07:00', hourMeter: '1', h1: '540', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '540' },
      { id: 2, machineProcess: 'C&C Crimping Terminal B', plan: '550', startTime: '07:00', finishTime: '08:00', hourMeter: '1', h1: '', h2: '562', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '562' }
    ],
    downtimeRows: [
      { id: 'dt1', reason: 'Wire Short from Store (Min)', h1: '0', h2: '0', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '0', changes: '0' },
      { id: 'dt2', reason: 'Terminal short from Store (Min)', h1: '0', h2: '15', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '15', changes: '1' },
      { id: 'dt3', reason: 'Seal Short from Store (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt4', reason: 'Wire entangle (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt5', reason: 'Wire changeover (Min)', h1: '10', h2: '0', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '10', changes: '1' },
      { id: 'dt6', reason: 'Seal Changeover (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt7', reason: 'Terminal Changeover (Min)', h1: '', h2: '12', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '12', changes: '1' },
      { id: 'dt8', reason: 'Applicator Changeover (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt9', reason: 'Applicator Waiting (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt10', reason: 'Terminal + Applicator Changeover (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt11', reason: 'Wire+Terminal+Applicator Changeover (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt12', reason: 'Quality Problem (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt13', reason: 'Quality Waiting (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' },
      { id: 'dt14', reason: 'Breakdown (Min)', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', total: '', changes: '' }
    ],
    scrapPRS: '',
    scrapORS: '',
    scrapCFM: '',
    filledBy: '',
    checkedBy: ''
  });

  const handleCellChange = (category, rowIdx, field, val) => {
    setCcSheetData(prev => {
      const copy = { ...prev };
      copy[category] = [...copy[category]];
      copy[category][rowIdx] = { ...copy[category][rowIdx], [field]: val };
      return copy;
    });
  };

  const handleMetaChange = (field, val) => {
    setCcSheetData(prev => ({ ...prev, [field]: val }));
  };



  // Sub sidebar items definition: 3 Links - CNC, Assembly, SRC
  const subSidebarItems = [
    {
      id: 'CNC',
      label: 'CNC',
      fullName: 'CNC Machining Section',
      icon: Cpu,
      count: selectedUnitLocation === 'Bawal' ? 680 : 440,
      activeCount: selectedUnitLocation === 'Bawal' ? 658 : 426,
      color: '#0284c7'
    },
    {
      id: 'Assembly',
      label: 'Assembly',
      fullName: 'Assembly Line Section',
      icon: Boxes,
      count: selectedUnitLocation === 'Bawal' ? 890 : 560,
      activeCount: selectedUnitLocation === 'Bawal' ? 852 : 540,
      color: '#10b981'
    },
    {
      id: 'SRC',
      label: 'SRC',
      fullName: 'SRC Inspection & Quality',
      icon: Building2,
      count: selectedUnitLocation === 'Bawal' ? 510 : 335,
      activeCount: selectedUnitLocation === 'Bawal' ? 468 : 297,
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 w-full">
      {/* ========================================================= */}
      {/* In-Page Sub Sidebar: Shown only when NO page is active */}
      {/* ========================================================= */}
      {!selectedSubDept ? (
        <aside className="w-full lg:w-[250px] lg:min-w-[250px] bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-4 shadow-sm lg:sticky lg:top-20">
          {/* Unit Location Dropdown Filter on Top of Card */}
          <div className="flex flex-col gap-1.5 pb-3.5 border-b border-slate-100">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <MapPin size={13} className="text-blue-600" />
              <span>SELECT UNIT</span>
            </label>
            <div className="relative flex items-center w-full">
              <select
                className="w-full appearance-none bg-slate-50 border-[1.5px] border-slate-200 rounded-xl py-2 pl-3 pr-8 text-sm font-bold text-slate-900 cursor-pointer outline-none hover:bg-white hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                value={selectedUnitLocation}
                onChange={(e) => {
                  setSelectedUnitLocation(e.target.value);
                  setSelectedSubDept(''); // keep pages unselected until clicked
                }}
              >
                <option value="">-- Choose Unit --</option>
                <option value="Bawal">Bawal Unit</option>
                <option value="Gujrat">Gujrat Unit</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 pointer-events-none text-slate-500" />
            </div>
          </div>

          {/* If unit is selected, show the 3 pages: CNC, Assembly, SRC (unselected) */}
          {selectedUnitLocation ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">OPERATIONAL UNITS</span>
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 py-0.5 px-2 rounded-full">{selectedUnitLocation}</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {subSidebarItems.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="w-full border border-transparent bg-transparent rounded-xl p-2.5 px-3 flex items-center justify-between cursor-pointer text-left hover:bg-slate-50 hover:border-slate-200 transition-all"
                      onClick={() => setSelectedSubDept(item.id)}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color
                          }}
                        >
                          <ItemIcon size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13.5px] font-bold text-slate-800 whitespace-nowrap">{item.label}</span>
                          {item.fullName && (
                            <span className="text-[11px] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">{item.fullName}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11.5px] font-bold text-slate-500 bg-slate-100 py-0.5 px-1.5 rounded-md">
                          {item.count}
                        </span>
                        <ChevronRight size={14} className="text-slate-400" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 gap-2">
              <Factory size={22} className="text-slate-400" />
              <p className="text-[13px] font-bold text-slate-700 m-0">No Unit Selected</p>
              <p className="text-[11.5px] text-slate-500 leading-snug m-0">
                Please select a unit from the dropdown above to view operational units.
              </p>
            </div>
          )}
        </aside>
      ) : null}

      {/* ========================================================= */}
      {/* Operators Main Content Area */}
      {/* ========================================================= */}
      <div className={`flex flex-col gap-5 flex-1 min-w-0 ${selectedSubDept ? 'w-full' : ''}`}>
        {/* If a page is selected (CNC, Assembly, SRC), show Back Button & Banner */}
        {selectedSubDept ? (
          <div className="flex items-center justify-between bg-white p-3 px-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              {selectedChecksheet ? (
                <button
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-slate-200 bg-white text-slate-800 text-[13px] font-bold cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
                  onClick={() => setSelectedChecksheet(null)}
                  title="Back to Checksheets Menu"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Checksheets</span>
                </button>
              ) : selectedMachine ? (
                <button
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-slate-200 bg-white text-slate-800 text-[13px] font-bold cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
                  onClick={() => {
                    setSelectedMachine(null);
                    setSelectedChecksheet(null);
                  }}
                  title="Back to Machine Overview"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Machines</span>
                </button>
              ) : (
                <button
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-slate-200 bg-white text-slate-800 text-[13px] font-bold cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
                  onClick={() => {
                    setSelectedSubDept('');
                    setSelectedMachine(null);
                    setSelectedChecksheet(null);
                  }}
                  title="Back to Units"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Units</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 bg-slate-100 py-1.5 px-3.5 rounded-full text-[12.5px]">
              <span className="text-slate-500 font-semibold">{selectedUnitLocation} Unit</span>
              <span className="text-slate-400">/</span>
              <span className="text-blue-600 font-bold">{selectedSubDept} Section</span>
              {selectedMachine && (
                <>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-900 font-bold">{selectedMachine.name}</span>
                </>
              )}
              {selectedChecksheet && (
                <>
                  <span className="text-slate-400">/</span>
                  <span className="text-indigo-600 font-extrabold">{selectedChecksheet}</span>
                </>
              )}
            </div>
          </div>
        ) : null}

        {/* If unit or section is NOT selected, do not show tabs or card data */}
        {!selectedUnitLocation || !selectedSubDept ? (
          <div className="flex items-center justify-center p-12 min-h-[360px]">
            <div className="bg-white border border-slate-200 rounded-3xl p-10 max-w-[460px] text-center shadow-sm flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                <Factory size={36} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 m-0">
                {!selectedUnitLocation
                  ? 'Please Select a Plant / Unit'
                  : `Please Select a Section for ${selectedUnitLocation} Unit`}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed m-0">
                {!selectedUnitLocation
                  ? 'Choose either Bawal or Gujrat unit from the sidebar dropdown to view available sections.'
                  : 'Select an operational section (CNC, Assembly, or SRC) to view its machine checksheets and real-time telemetry.'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Switcher: 7 Operations Tabs (Hidden when checksheet is open for clean full page) */}
            {!selectedChecksheet && (
              <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full max-w-full overflow-x-auto whitespace-nowrap">
                {[
                  'Auto Crimping',
                  'Manual Crimping',
                  'Joint Crimping',
                  'Registance Welding',
                  'Twisting',
                  'Blue Taping',
                  'Head Sinking'
                ].map((tabName) => (
                  <button
                    key={tabName}
                    className={`border-none py-2 px-4 rounded-full text-xs font-semibold cursor-pointer inline-flex items-center gap-2 whitespace-nowrap transition-all ${
                      activeTab === tabName
                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                        : 'bg-transparent text-slate-500 hover:text-slate-900'
                    }`}
                    onClick={() => {
                      setActiveTab(tabName);
                      setSelectedMachine(null);
                      setSelectedChecksheet(null);
                    }}
                  >
                    {tabName}
                  </button>
                ))}
              </div>
            )}

            {/* If a machine card is clicked, show checksheets menu OR full-page checksheet */}
            {selectedMachine ? (
              <div className="flex flex-col gap-5 w-full">
                {!selectedChecksheet && (
                  <OperationalChecksheets
                    selectedMachine={selectedMachine}
                    machineModel={getMachineModel(selectedMachine.id)}
                    activeTab={activeTab}
                    selectedUnitLocation={selectedUnitLocation}
                    activeSession={activeSession}
                    selectedChecksheet={selectedChecksheet}
                    onSelectChecksheet={setSelectedChecksheet}
                    onLogout={handleLogout}
                  />
                )}

                {/* Checksheet Active Stage (when clicked - Full Page View) */}
                {selectedChecksheet === 'Operator & Machine Summary' ? (
                  /* ======================================================== */
                  /* Operator & Machine Summary View */
                  /* ======================================================== */
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                      <div className="flex items-center gap-3">
                        <Users size={22} className="text-emerald-600 bg-emerald-50 p-2 rounded-xl w-10 h-10" />
                        <div>
                          <h3 className="text-base font-black text-slate-900 m-0">Operator & Machine Summary</h3>
                          <p className="text-xs text-slate-500 m-0">
                            Consolidated telemetry and operator shift login audit for {selectedMachine.name} ({activeTab})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 py-1.5 px-3 rounded-full">Today: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <button
                          className="text-xs font-bold py-1.5 px-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer border-none transition-all"
                          onClick={() => setSelectedChecksheet(null)}
                        >
                          Close Summary
                        </button>
                      </div>
                    </div>

                    {/* Overall Machine Telemetry KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="rounded-2xl p-4 flex flex-col justify-between border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-bold text-blue-700">
                          <span>TOTAL MACHINE RUNTIME</span>
                          <Clock size={18} />
                        </div>
                        <div className="flex items-baseline gap-1 my-2">
                          <span className="text-3xl font-black text-slate-900">18.4</span>
                          <span className="text-xs font-bold text-slate-500">hrs</span>
                        </div>
                        <span className="text-[11px] text-slate-500">Active runtime across all shift logins</span>
                      </div>

                      <div className="rounded-2xl p-4 flex flex-col justify-between border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-bold text-rose-700">
                          <span>TOTAL BREAKDOWN TIME</span>
                          <AlertOctagon size={18} />
                        </div>
                        <div className="flex items-baseline gap-1 my-2">
                          <span className="text-3xl font-black text-slate-900">0.8</span>
                          <span className="text-xs font-bold text-slate-500">hrs (48 min)</span>
                        </div>
                        <span className="text-[11px] text-slate-500">Tooling change & pneumatic downtime</span>
                      </div>

                      <div className="rounded-2xl p-4 flex flex-col justify-between border border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                          <span>TOTAL PRODUCTION OUTPUT</span>
                          <Boxes size={18} />
                        </div>
                        <div className="flex items-baseline gap-1 my-2">
                          <span className="text-3xl font-black text-slate-900">3,840</span>
                          <span className="text-xs font-bold text-slate-500">units</span>
                        </div>
                        <span className="text-[11px] text-slate-500">Good parts produced on {selectedMachine.name}</span>
                      </div>

                      <div className="rounded-2xl p-4 flex flex-col justify-between border border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-bold text-purple-700">
                          <span>OPERATOR SESSIONS</span>
                          <Users size={18} />
                        </div>
                        <div className="flex items-baseline gap-1 my-2">
                          <span className="text-3xl font-black text-slate-900">3</span>
                          <span className="text-xs font-bold text-slate-500">operators</span>
                        </div>
                        <span className="text-[11px] text-slate-500">Active / logged operator shifts</span>
                      </div>
                    </div>

                    {/* Detailed Operator Login Table */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-slate-900 m-0">Operator Login & Performance Log</h4>
                        <span className="text-xs text-slate-500">Individual operator sessions, runtimes, breakdowns and output volume</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs text-left">
                          <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                            <tr>
                              <th className="p-3">Operator Card No.</th>
                              <th className="p-3">Inspector Card No.</th>
                              <th className="p-3">Shift / Timing</th>
                              <th className="p-3">Login Status</th>
                              <th className="p-3">Runtime (hrs)</th>
                              <th className="p-3">Breakdown (min)</th>
                              <th className="p-3">Production (units)</th>
                              <th className="p-3">Efficiency</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {/* Current active authenticated session */}
                            {activeSession && (
                              <tr className="bg-blue-50/50 font-medium">
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">OP</span>
                                    <div>
                                      <div className="font-bold text-slate-900">{activeSession.operatorCardNo}</div>
                                      <div className="text-[10px] text-emerald-600 font-bold">● Current Active Login</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="font-bold text-slate-900">{activeSession.inspectorCardNo}</div>
                                  <span className="text-[10px] text-slate-400">Certified QI</span>
                                </td>
                                <td className="p-3">
                                  <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full font-bold text-[11px]">Shift A (06:00 - 14:00)</span>
                                </td>
                                <td className="p-3"><span className="bg-emerald-100 text-emerald-700 py-0.5 px-2 rounded-full text-[10px] font-bold">Active Now</span></td>
                                <td className="p-3 font-bold text-blue-600">6.8 hrs</td>
                                <td className="p-3 font-bold text-rose-600">15 min</td>
                                <td className="p-3 font-bold text-emerald-600">1,420</td>
                                <td className="p-3">
                                  <span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-md font-bold text-[11px]">96.2%</span>
                                </td>
                              </tr>
                            )}

                            {/* Historical Shift B Login */}
                            <tr className="hover:bg-slate-50">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">OP</span>
                                  <div>
                                    <div className="font-semibold text-slate-800">OP-78219 (Sunil Verma)</div>
                                    <div className="text-[10px] text-slate-400">Logged out normally</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="font-semibold text-slate-800">QI-10928</div>
                                <span className="text-[10px] text-slate-400">Quality Inspector</span>
                              </td>
                              <td className="p-3">
                                <span className="bg-slate-100 text-slate-700 py-0.5 px-2 rounded-full text-[11px]">Shift B (14:00 - 22:00)</span>
                              </td>
                              <td className="p-3"><span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px]">Completed</span></td>
                              <td className="p-3 font-bold text-blue-600">7.4 hrs</td>
                              <td className="p-3 font-bold text-rose-600">20 min</td>
                              <td className="p-3 font-bold text-emerald-600">1,580</td>
                              <td className="p-3">
                                <span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-md font-bold text-[11px]">94.8%</span>
                              </td>
                            </tr>

                            {/* Historical Shift C Login */}
                            <tr className="hover:bg-slate-50">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">OP</span>
                                  <div>
                                    <div className="font-semibold text-slate-800">OP-92415 (Manoj Kumar)</div>
                                    <div className="text-[10px] text-slate-400">Logged out normally</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="font-semibold text-slate-800">QI-88312</div>
                                <span className="text-[10px] text-slate-400">Quality Inspector</span>
                              </td>
                              <td className="p-3">
                                <span className="bg-slate-100 text-slate-700 py-0.5 px-2 rounded-full text-[11px]">Shift C (22:00 - 06:00)</span>
                              </td>
                              <td className="p-3"><span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px]">Completed</span></td>
                              <td className="p-3 font-bold text-blue-600">4.2 hrs</td>
                              <td className="p-3 font-bold text-rose-600">13 min</td>
                              <td className="p-3 font-bold text-emerald-600">840</td>
                              <td className="p-3">
                                <span className="bg-amber-100 text-amber-800 py-0.5 px-2 rounded-md font-bold text-[11px]">91.4%</span>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot className="bg-slate-100 font-bold text-slate-800 border-t border-slate-200">
                            <tr>
                              <td colSpan={4} className="p-3 font-bold">Total Summary for {selectedMachine.name}</td>
                              <td className="p-3 font-bold text-blue-600">18.4 hrs</td>
                              <td className="p-3 font-bold text-rose-600">48 min</td>
                              <td className="p-3 font-bold text-emerald-600">3,840 units</td>
                              <td className="p-3"><span className="bg-emerald-200 text-emerald-900 py-0.5 px-2 rounded-md text-[11px] font-bold">94.1% Avg</span></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : selectedChecksheet === 'C&C process production status summary' ? (
                  /* ======================================================== */
                  /* Dedicated Excel-like C&C Process Production Status Summary */
                  /* ======================================================== */
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                      <div className="flex items-center gap-3">
                        <BarChart3 size={22} className="text-teal-600 bg-teal-50 p-2 rounded-xl w-10 h-10" />
                        <div>
                          <h3 className="text-base font-black text-slate-900 m-0">C&C Process Production Status Summary</h3>
                          <p className="text-xs text-slate-500 m-0">
                            Excel Checksheet format for {selectedMachine.name} • FRM-PR-201 (Rev No. 03)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-xs font-bold py-1.5 px-3.5 rounded-full bg-teal-600 text-white hover:bg-teal-700 cursor-pointer border-none shadow-sm transition-all"
                          onClick={() => alert(`C&C Production Status saved for ${selectedMachine.name}!`)}
                        >
                          Save Record
                        </button>
                        <button
                          className="text-xs font-bold py-1.5 px-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer border-none transition-all"
                          onClick={() => setSelectedChecksheet(null)}
                        >
                          Close Checksheet
                        </button>
                      </div>
                    </div>

                    {/* Excel Sheet Outer Container */}
                    <div className="bg-white border-[1.5px] border-black p-3 font-sans shadow-sm rounded">
                      <div className="text-center border-b border-black pb-2 mb-3">
                        <h2 className="text-base font-black tracking-wide text-black m-0 underline">C&C Process Production Status Summary</h2>
                      </div>

                      {/* Header meta inputs (Date, Shift, Operator, Inspector) */}
                      <div className="grid grid-cols-2 md:grid-cols-4 border border-black mb-3">
                        <div className="flex flex-col border-r border-b md:border-b-0 border-black p-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase">Date:</label>
                          <input
                            type="date"
                            className="border-none outline-none text-xs font-bold text-slate-900 bg-transparent"
                            value={ccSheetData.date}
                            onChange={(e) => handleMetaChange('date', e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col border-r border-b md:border-b-0 border-black p-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase">Shift:</label>
                          <input
                            type="text"
                            placeholder="Shift A"
                            className="border-none outline-none text-xs font-bold text-slate-900 bg-transparent"
                            value={ccSheetData.shift}
                            onChange={(e) => handleMetaChange('shift', e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col border-r border-black p-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase">Operator Name:</label>
                          <input
                            type="text"
                            placeholder="Enter Operator Name"
                            className="border-none outline-none text-xs font-bold text-slate-900 bg-transparent"
                            value={ccSheetData.operatorName}
                            onChange={(e) => handleMetaChange('operatorName', e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col p-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase">Inspector Name:</label>
                          <input
                            type="text"
                            placeholder="Enter Inspector Name"
                            className="border-none outline-none text-xs font-bold text-slate-900 bg-transparent"
                            value={ccSheetData.inspectorName}
                            onChange={(e) => handleMetaChange('inspectorName', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Table 1: Hourly Production & Machine Process */}
                      <div className="overflow-x-auto border border-black mb-3">
                        <table className="w-full border-collapse text-xs text-left min-w-[950px]">
                          <thead>
                            <tr className="bg-slate-100 text-black font-extrabold border-b border-black text-center text-[11px]">
                              <th className="border-r border-black p-1 w-[45px]">S.No</th>
                              <th className="border-r border-black p-1 min-w-[180px]">Machine/Process</th>
                              <th className="border-r border-black p-1 w-[70px]">PLAN</th>
                              <th className="border-r border-black p-1 w-[80px]">Start Time</th>
                              <th className="border-r border-black p-1 w-[80px]">Finish Time</th>
                              <th className="border-r border-black p-1 w-[85px]">Hour Meter</th>
                              <th className="border-r border-black p-1 w-[65px]">1st Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">2nd Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">3rd Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">4th Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">5th Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">6th Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">7th Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">8th Hr</th>
                              <th className="border-r border-black p-1 w-[80px]">Total</th>
                              <th className="p-1 w-[100px]">Working Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ccSheetData.hourlyRows.map((row, rIdx) => (
                              <tr key={row.id} className="border-b border-black">
                                <td className="border-r border-black p-1 text-center bg-slate-50 font-bold">{row.id}</td>
                                <td className="border-r border-black p-0.5">
                                  <input
                                    className="w-full border-none outline-none bg-transparent p-1 text-xs"
                                    type="text"
                                    value={row.machineProcess}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'machineProcess', e.target.value)}
                                  />
                                </td>
                                <td className="border-r border-black p-0.5">
                                  <input
                                    className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-semibold"
                                    type="text"
                                    value={row.plan}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'plan', e.target.value)}
                                  />
                                </td>
                                <td className="border-r border-black p-0.5">
                                  <input
                                    className="w-full border-none outline-none bg-transparent p-1 text-xs text-center"
                                    type="text"
                                    value={row.startTime}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'startTime', e.target.value)}
                                  />
                                </td>
                                <td className="border-r border-black p-0.5">
                                  <input
                                    className="w-full border-none outline-none bg-transparent p-1 text-xs text-center"
                                    type="text"
                                    value={row.finishTime}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'finishTime', e.target.value)}
                                  />
                                </td>
                                <td className="border-r border-black p-0.5">
                                  <input
                                    className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-semibold"
                                    type="text"
                                    value={row.hourMeter}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'hourMeter', e.target.value)}
                                  />
                                </td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h1} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h1', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h2} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h2', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h3} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h3', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h4} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h4', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h5} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h5', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h6} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h6', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h7} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h7', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={row.h8} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h8', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5 bg-yellow-100">
                                  <input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold text-slate-900" type="text" value={row.total} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'total', e.target.value)} />
                                </td>
                                {rIdx === 0 && (
                                  <td rowSpan={ccSheetData.hourlyRows.length + 1} className="p-1 text-center bg-slate-50 font-bold">
                                    <input
                                      className="w-full border-none outline-none bg-transparent text-center font-bold text-xs"
                                      type="text"
                                      value={ccSheetData.workingTime}
                                      onChange={(e) => handleMetaChange('workingTime', e.target.value)}
                                    />
                                    <span className="text-[10px] text-slate-500">min</span>
                                  </td>
                                )}
                              </tr>
                            ))}
                            {/* Summary Total Row */}
                            <tr className="bg-slate-100 font-bold">
                              <td colSpan={2} className="border-r border-black p-1 text-center font-bold">Total</td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="1100" /></td>
                              <td className="border-r border-black"></td>
                              <td className="border-r border-black"></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="2" /></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="540" /></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="562" /></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                              <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold" type="text" placeholder="" /></td>
                              <td className="border-r border-black p-0.5 bg-yellow-100"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold text-blue-700" type="text" placeholder="1102" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Table 2: Down Time in Minutes */}
                      <div className="overflow-x-auto border border-black mb-3">
                        <table className="w-full border-collapse text-xs text-left min-w-[950px]">
                          <thead>
                            <tr className="bg-slate-100 text-black font-extrabold border-b border-black text-center text-[11px]">
                              <th className="border-r border-black p-1 text-left" colSpan={2}>Down Time in Minutes</th>
                              <th className="border-r border-black p-1 w-[65px]">1st Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">2nd Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">3rd Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">4th Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">5th Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">6th Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">7th Hr</th>
                              <th className="border-r border-black p-1 w-[65px]">8th Hr</th>
                              <th className="border-r border-black p-1 w-[80px]">Total</th>
                              <th className="p-1 w-[100px]">No of Changes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ccSheetData.downtimeRows.map((dt, dIdx) => (
                              <tr key={dt.id} className="border-b border-black">
                                <td colSpan={2} className="border-r border-black p-1 px-2 font-medium text-slate-800 text-[11px]">{dt.reason}</td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h1} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h1', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h2} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h2', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h3} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h3', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h4} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h4', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h5} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h5', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h6} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h6', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h7} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h7', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5"><input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center" type="text" value={dt.h8} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h8', e.target.value)} /></td>
                                <td className="border-r border-black p-0.5 bg-yellow-100">
                                  <input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold text-slate-900" type="text" value={dt.total} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'total', e.target.value)} />
                                </td>
                                <td className="p-0.5">
                                  <input className="w-full border-none outline-none bg-transparent p-1 text-xs text-center font-bold text-slate-900" type="text" value={dt.changes} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'changes', e.target.value)} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Excel Sheet Footer (Scrap boxes & Signatures matching sheet) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-black p-2.5 mb-2 bg-slate-50">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
                            <span className="text-[10px] font-bold text-slate-600">Scrap (PRS) in gms</span>
                            <input
                              type="text"
                              placeholder="0.00"
                              className="border-none outline-none text-xs font-bold text-slate-900"
                              value={ccSheetData.scrapPRS}
                              onChange={(e) => handleMetaChange('scrapPRS', e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
                            <span className="text-[10px] font-bold text-slate-600">Scrap (ORS) in gms</span>
                            <input
                              type="text"
                              placeholder="0.00"
                              className="border-none outline-none text-xs font-bold text-slate-900"
                              value={ccSheetData.scrapORS}
                              onChange={(e) => handleMetaChange('scrapORS', e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
                            <span className="text-[10px] font-bold text-slate-600">Scrap (CFM) in gms</span>
                            <input
                              type="text"
                              placeholder="0.00"
                              className="border-none outline-none text-xs font-bold text-slate-900"
                              value={ccSheetData.scrapCFM}
                              onChange={(e) => handleMetaChange('scrapCFM', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
                            <span className="text-[10px] font-bold text-slate-600">Filled By (Operator)</span>
                            <input
                              type="text"
                              placeholder="Operator Sign / ID"
                              className="border-none outline-none text-xs font-bold text-slate-900"
                              value={ccSheetData.filledBy}
                              onChange={(e) => handleMetaChange('filledBy', e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col border border-slate-300 p-1.5 bg-white rounded flex-1">
                            <span className="text-[10px] font-bold text-slate-600">Checked By (Shift Incharge)</span>
                            <input
                              type="text"
                              placeholder="Shift Incharge Sign"
                              className="border-none outline-none text-xs font-bold text-slate-900"
                              value={ccSheetData.checkedBy}
                              onChange={(e) => handleMetaChange('checkedBy', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Sheet Metadata Bar */}
                      <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 font-semibold pt-1">
                        <span>FRM-PR-201</span>
                        <span>Rev No.: <strong className="text-slate-800">03</strong></span>
                        <span>Effective: 7/12/2025</span>
                        <span className="font-bold text-slate-700">FME Production Division</span>
                      </div>
                    </div>
                  </div>
                ) : selectedChecksheet === 'Machine PM checksheet' && (selectedMachine.id === 1 || selectedMachine.id === 3 || selectedMachine.name === 'C&C 01' || selectedMachine.name === 'C&C 03') ? (
                  /* ======================================================== */
                  /* Dedicated Furukawa Minda Electric PM Checksheet for C&C 01 & C&C 03 */
                  /* ======================================================== */
                  <MachinePmChecksheet
                    machine={selectedMachine}
                    onClose={() => setSelectedChecksheet(null)}
                  />
                ) : selectedChecksheet === 'Inspection report' && (selectedMachine.id === 1 || selectedMachine.id === 3 || selectedMachine.name === 'C&C 01' || selectedMachine.name === 'C&C 03') ? (
                  /* ======================================================== */
                  /* Dedicated Daily Record of Cutting & Crimping (FRM-QC-PS-244) for C&C 01 & C&C 03 */
                  /* ======================================================== */
                  <InspectionReportSheet
                    machine={selectedMachine}
                    onClose={() => setSelectedChecksheet(null)}
                  />
                ) : selectedChecksheet === 'Machine Pokayoke checksheet' ? (
                  /* ======================================================== */
                  /* Dedicated Poka-Yoke Daily Verification Checksheet (FFM-WH-QA-096) */
                  /* ======================================================== */
                  <PokayokeChecksheet
                    machine={selectedMachine}
                    onClose={() => setSelectedChecksheet(null)}
                  />
                ) : selectedChecksheet === 'Machine Instrument checksheet' ? (
                  /* ======================================================== */
                  /* Dedicated Instrument Check Sheet (FRM-WH-QA-046) */
                  /* ======================================================== */
                  <InstrumentChecksheet
                    machine={selectedMachine}
                    onClose={() => setSelectedChecksheet(null)}
                  />
                ) : selectedChecksheet === 'Machine Daily checksheet' ? (
                  /* ======================================================== */
                  /* Dedicated Daily Machine Check Sheet (CHK-WH-MT-003) */
                  /* ======================================================== */
                  <DailyChecksheet
                    machine={selectedMachine}
                    onClose={() => setSelectedChecksheet(null)}
                  />
                ) : selectedChecksheet === 'Machine 5S checksheet' ? (
                  /* ======================================================== */
                  /* Dedicated 5S Check Sheet (CHK-5S-03) */
                  /* ======================================================== */
                  <FiveSChecksheet
                    machine={selectedMachine}
                    onClose={() => setSelectedChecksheet(null)}
                  />
                ) : selectedChecksheet ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={20} className="text-emerald-600" />
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 m-0">{selectedChecksheet}</h3>
                          <p className="text-xs text-slate-500 m-0">
                            Active Checksheet form for {selectedMachine.name} ({activeTab})
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-xs font-bold py-1.5 px-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer border-none transition-all"
                        onClick={() => setSelectedChecksheet(null)}
                      >
                        Close Checksheet
                      </button>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full border-collapse text-xs text-left">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Inspection Parameter</th>
                            <th className="p-3">Standard / Specification</th>
                            <th className="p-3">Verification Frequency</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Observation / Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-500">1</td>
                            <td className="p-3 font-semibold text-slate-900">Visual Cleaning & Chip Removal</td>
                            <td className="p-3 text-slate-600">Dust & debris free fixture table</td>
                            <td className="p-3 text-slate-600">Start of Shift</td>
                            <td className="p-3"><span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full font-bold text-[10px]">OK</span></td>
                            <td className="p-3 text-slate-600">Cleaned properly with compressed air nozzle</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-500">2</td>
                            <td className="p-3 font-semibold text-slate-900">Operating Air Pressure</td>
                            <td className="p-3 text-slate-600">0.5 ~ 0.7 MPa</td>
                            <td className="p-3 text-slate-600">Hourly</td>
                            <td className="p-3"><span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full font-bold text-[10px]">0.62 MPa</span></td>
                            <td className="p-3 text-slate-600">Within normal operating range</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-500">3</td>
                            <td className="p-3 font-semibold text-slate-900">Sensor & Pokayoke Alignment</td>
                            <td className="p-3 text-slate-600">Red beam aligns with target notch</td>
                            <td className="p-3 text-slate-600">Every 2 Hours</td>
                            <td className="p-3"><span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full font-bold text-[10px]">Verified</span></td>
                            <td className="p-3 text-slate-600">Part position detection active</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-500">4</td>
                            <td className="p-3 font-semibold text-slate-900">Emergency Stop & Safety Interlock</td>
                            <td className="p-3 text-slate-600">Instant shutoff on trigger</td>
                            <td className="p-3 text-slate-600">Daily</td>
                            <td className="p-3"><span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full font-bold text-[10px]">OK</span></td>
                            <td className="p-3 text-slate-600">Tested during shift changeover</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-500">5</td>
                            <td className="p-3 font-semibold text-slate-900">Lubrication Level & Oil Mist</td>
                            <td className="p-3 text-slate-600">Between MIN and MAX markers</td>
                            <td className="p-3 text-slate-600">Daily</td>
                            <td className="p-3"><span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full font-bold text-[10px]">Normal</span></td>
                            <td className="p-3 text-slate-600">Level at 85% capacity</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : activeTab === 'Auto Crimping' && selectedSubDept === 'CNC' ? (
              /* C&C 1 to C&C 32 KPI Cards Grid */
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 px-5 shadow-sm gap-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900 m-0">C&C Machines Overview</h3>
                    <p className="text-xs text-slate-500 m-0">Real-time status, health, and output monitoring for C&C 1 to C&C 32 ({selectedUnitLocation} Plant)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 py-1 px-3 rounded-full">● 27 Running</span>
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 py-1 px-3 rounded-full">● 3 Idle / Stopped</span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 py-1 px-3 rounded-full">● 1 Maint.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full">
                  {Array.from({ length: 32 }, (_, i) => i + 1)
                    .filter((machineNum) => machineNum !== 13)
                    .map((machineNum) => {
                      const machineName = `C&C ${String(machineNum).padStart(2, '0')}`;
                      // Status variations:
                      // 1. Running: Green full card background
                      // 2. Stopped / Idle: Red full card background
                      // 3. Maintenance: Yellow full card background
                      const isMaintenance = machineNum === 17;
                      const isIdleOrStopped = machineNum === 8 || machineNum === 24;
                      const statusText = isMaintenance ? 'Maintenance' : isIdleOrStopped ? 'Idle / Stopped' : 'Running';

                      const theme = isMaintenance
                        ? {
                            cardBg: 'bg-amber-50 hover:bg-amber-100/70 border-amber-300',
                            badge: 'bg-amber-200/80 text-amber-900 border border-amber-400',
                            iconBg: 'bg-amber-200/80 text-amber-900',
                            pill: 'bg-amber-200 text-amber-950 border border-amber-400',
                            dot: 'bg-amber-600',
                            divider: 'border-amber-200/80'
                          }
                        : isIdleOrStopped
                          ? {
                              cardBg: 'bg-rose-50 hover:bg-rose-100/70 border-rose-300',
                              badge: 'bg-rose-200/80 text-rose-900 border border-rose-400',
                              iconBg: 'bg-rose-200/80 text-rose-900',
                              pill: 'bg-rose-200 text-rose-950 border border-rose-400',
                              dot: 'bg-rose-600',
                              divider: 'border-rose-200/80'
                            }
                          : {
                              cardBg: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-300',
                              badge: 'bg-emerald-200/80 text-emerald-900 border border-emerald-400',
                              iconBg: 'bg-emerald-200/80 text-emerald-900',
                              pill: 'bg-emerald-200 text-emerald-950 border border-emerald-400',
                              dot: 'bg-emerald-600',
                              divider: 'border-emerald-200/80'
                            };

                      // Metrics
                      const output = 120 + ((machineNum * 37) % 180);

                      return (
                        <div
                          key={machineNum}
                          className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg min-h-[175px] shadow-sm ${theme.cardBg}`}
                          onClick={() => handleMachineCardClick({ id: machineNum, name: machineName })}
                          title={`Click to open checksheets for ${machineName}`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-base font-extrabold text-slate-900 tracking-tight">{machineName}</div>
                              <div className="text-xs font-bold text-slate-600 mt-0.5">({getMachineModel(machineNum)})</div>
                            </div>
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${theme.iconBg}`}>
                              <Cpu size={18} />
                            </div>
                          </div>

                          <div className="my-3">
                            <span className="text-3xl font-black text-slate-900">{output}</span>
                            <span className="text-sm font-bold text-slate-600"> pcs/hr</span>
                          </div>

                          <div className={`flex items-center justify-end text-xs pt-3 border-t ${theme.divider}`}>
                            <span className={`text-[11px] font-bold py-1 px-3 rounded-full flex items-center gap-1.5 ${theme.pill}`}>
                              <span className={`w-2 h-2 rounded-full ${theme.dot}`}></span>
                              {statusText}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              /* View for other operations tabs or sections */
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 py-1 px-3 rounded-full w-max">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    <span>{selectedUnitLocation} Unit</span>
                    <span className="text-blue-300">• {selectedSubDept} Section</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 m-0">{activeTab}</h2>
                  <p className="text-sm text-slate-500 m-0 max-w-2xl leading-relaxed">
                    Machine Checksheet parameters, real-time inspection criteria and operational logs for <strong>{activeTab}</strong> in {selectedSubDept} Section ({selectedUnitLocation} Plant).
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ========================================================= */}
      {/* Operator & Quality Inspector Login Modal */}
      {/* ========================================================= */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-[460px] w-full shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 m-0">Operator & Inspector Login</h3>
                  <p className="text-xs text-slate-500 m-0">
                    Authenticate for <strong>{pendingMachine?.name}</strong>
                  </p>
                </div>
              </div>
              <button
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg border-none bg-transparent cursor-pointer"
                onClick={() => {
                  setShowLoginModal(false);
                  setPendingMachine(null);
                  setLoginError('');
                }}
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 mt-4">
              {loginError && (
                <div className="bg-red-50 text-red-700 border border-red-200 p-2.5 rounded-xl text-xs font-semibold">
                  {loginError}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <CreditCard size={15} className="text-indigo-600" />
                  <span>Operator Card No.</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-xl p-2.5 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                  placeholder="e.g. OP-84210 or Scan Card"
                  value={operatorCardNo}
                  onChange={(e) => setOperatorCardNo(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <ShieldCheck size={15} className="text-indigo-600" />
                  <span>Quality Inspector Card No.</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-xl p-2.5 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                  placeholder="e.g. QI-39145 or Scan Card"
                  value={inspectorCardNo}
                  onChange={(e) => setInspectorCardNo(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  className="text-xs font-bold py-2 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer transition-all"
                  onClick={() => {
                    setShowLoginModal(false);
                    setPendingMachine(null);
                    setLoginError('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold py-2 px-5 rounded-xl border-none bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer shadow-sm transition-all inline-flex items-center gap-1.5"
                >
                  <Lock size={15} />
                  <span>Authenticate & Proceed</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
