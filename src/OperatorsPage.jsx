import React, { useState } from 'react';
import './OperatorsPage.css';
import {
  ChevronDown,
  ChevronRight,
  Cpu,
  Boxes,
  Building2,
  MapPin,
  ArrowLeft,
  Factory,
  ClipboardCheck,
  CalendarCheck2,
  Gauge,
  ShieldAlert,
  Wrench,
  CheckCircle2,
  BarChart3,
  FileSpreadsheet,
  AlertOctagon,
  Lock,
  UserCheck,
  ShieldCheck,
  LogOut,
  X,
  CreditCard,
  Users,
  Clock,
  Activity
} from 'lucide-react';

export default function OperatorsPage() {
  const [activeTab, setActiveTab] = useState('Auto Crimping');
  const [selectedUnitLocation, setSelectedUnitLocation] = useState(''); // '' | 'Bawal' | 'Gujrat'
  const [selectedSubDept, setSelectedSubDept] = useState(''); // '' | 'CNC' | 'Assembly' | 'SRC'
  const [selectedMachine, setSelectedMachine] = useState(null); // null | { id: number, name: string }
  const [selectedChecksheet, setSelectedChecksheet] = useState(null); // null | string

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

  // The checksheets sequence: Operator & Machine Summary is first
  const machineChecksheets = [
    {
      id: 'op_machine_summary',
      name: 'Operator & Machine Summary',
      shortDesc: 'Total runtime, breakdowns, outputs & operator login sessions',
      icon: Users,
      color: '#059669',
      bg: '#d1fae5'
    },
    {
      id: '5s',
      name: 'Machine 5S checksheet',
      shortDesc: 'Sort, Set in order, Shine, Standardize & Sustain checklist',
      icon: ClipboardCheck,
      color: '#0284c7',
      bg: '#e0f2fe'
    },
    {
      id: 'daily',
      name: 'Machine Daily checksheet',
      shortDesc: 'Shift routine inspection, lubrication, pressure and air check',
      icon: CalendarCheck2,
      color: '#10b981',
      bg: '#d1fae5'
    },
    {
      id: 'instrument',
      name: 'Machine Instrument checksheet',
      shortDesc: 'Calibrated gauges, sensors, digital micrometers & alignment',
      icon: Gauge,
      color: '#f59e0b',
      bg: '#fef3c7'
    },
    {
      id: 'pokayoke',
      name: 'Machine Pokayoke checksheet',
      shortDesc: 'Error-proofing sensors, interlocks, part presence detection',
      icon: ShieldAlert,
      color: '#ef4444',
      bg: '#fee2e2'
    },
    {
      id: 'cc_summary',
      name: 'C&C process production status summary',
      shortDesc: 'Hourly output tracking, cycle rates, rejects & lot status summary',
      icon: BarChart3,
      color: '#0d9488',
      bg: '#ccfbf1'
    },
    {
      id: 'inspection_report',
      name: 'Inspection report',
      shortDesc: 'Dimensional QA report, visual parameters & QA stamp verification',
      icon: FileSpreadsheet,
      color: '#6366f1',
      bg: '#e0e7ff'
    },
    {
      id: 'breakdown_summary',
      name: 'Machine Breakdown Summary',
      shortDesc: 'Downtime logs, MTTR / MTBF analysis & root cause breakdown summary',
      icon: AlertOctagon,
      color: '#e11d48',
      bg: '#ffe4e6'
    },
    {
      id: 'pm',
      name: 'Machine PM checksheet',
      shortDesc: 'Preventive maintenance schedule, belt tension & motor health',
      icon: Wrench,
      color: '#8b5cf6',
      bg: '#ede9fe'
    }
  ];

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
    <div className="operators-layout-with-subsidebar">
      {/* ========================================================= */}
      {/* In-Page Sub Sidebar: Shown only when NO page is active */}
      {/* ========================================================= */}
      {!selectedSubDept ? (
        <aside className="operators-sub-sidebar">
          {/* Unit Location Dropdown Filter on Top of Card */}
          <div className="sub-sidebar-location-select-box">
            <label className="sub-location-label">
              <MapPin size={13} className="pin-icon" />
              <span>SELECT UNIT</span>
            </label>
            <div className="sub-location-dropdown-wrapper">
              <select
                className="sub-location-select"
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
              <ChevronDown size={14} className="dropdown-chevron-icon" />
            </div>
          </div>

          {/* If unit is selected, show the 3 pages: CNC, Assembly, SRC (unselected) */}
          {selectedUnitLocation ? (
            <>
              <div className="sub-sidebar-header">
                <span className="sub-sidebar-title">OPERATIONAL UNITS</span>
                <span className="sub-sidebar-badge">{selectedUnitLocation}</span>
              </div>

              <div className="sub-sidebar-nav">
                {subSidebarItems.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="sub-nav-item"
                      onClick={() => setSelectedSubDept(item.id)}
                    >
                      <div className="sub-nav-item-left">
                        <div
                          className="sub-nav-icon-box"
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color
                          }}
                        >
                          <ItemIcon size={16} />
                        </div>
                        <div className="sub-nav-text-group">
                          <span className="sub-nav-label">{item.label}</span>
                          {item.fullName && (
                            <span className="sub-nav-caption">{item.fullName}</span>
                          )}
                        </div>
                      </div>
                      <div className="sub-nav-badges">
                        <span className="sub-nav-count">
                          {item.count}
                        </span>
                        <ChevronRight size={14} className="sub-nav-chevron" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="empty-unit-hint-box">
              <Factory size={22} className="empty-hint-icon" />
              <p className="empty-hint-title">No Unit Selected</p>
              <p className="empty-hint-desc">
                Please select a unit from the dropdown above to view operational units.
              </p>
            </div>
          )}
        </aside>
      ) : null}

      {/* ========================================================= */}
      {/* Operators Main Content Area */}
      {/* ========================================================= */}
      <div className={`operators-container ${selectedSubDept ? 'full-width-view' : ''}`}>
        {/* If a page is selected (CNC, Assembly, SRC), show Back Button & Banner */}
        {selectedSubDept ? (
          <div className="unit-page-navigation-header">
            <div className="nav-header-left-actions">
              {selectedMachine ? (
                <button
                  className="back-to-units-btn"
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
                  className="back-to-units-btn"
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

            <div className="active-unit-crumb-pill">
              <span className="crumb-unit-tag">{selectedUnitLocation} Unit</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-page-name">{selectedSubDept} Section</span>
              {selectedMachine && (
                <>
                  <span className="crumb-sep">/</span>
                  <span className="crumb-machine-name">{selectedMachine.name}</span>
                </>
              )}
              {selectedChecksheet && (
                <>
                  <span className="crumb-sep">/</span>
                  <span className="crumb-checksheet-name">{selectedChecksheet}</span>
                </>
              )}
            </div>
          </div>
        ) : null}

        {/* If unit or section is NOT selected, do not show tabs or card data */}
        {!selectedUnitLocation || !selectedSubDept ? (
          <div className="section-unselected-empty-state">
            <div className="empty-state-card">
              <div className="empty-state-icon-circle">
                <Factory size={36} />
              </div>
              <h3 className="empty-state-title">
                {!selectedUnitLocation
                  ? 'Please Select a Plant / Unit'
                  : `Please Select a Section for ${selectedUnitLocation} Unit`}
              </h3>
              <p className="empty-state-desc">
                {!selectedUnitLocation
                  ? 'Choose either Bawal or Gujrat unit from the sidebar dropdown to view available sections.'
                  : 'Select an operational section (CNC, Assembly, or SRC) to view its machine checksheets and real-time telemetry.'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Switcher: 7 Operations Tabs */}
            <div className="operators-top-nav-tabs">
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
                  className={`op-nav-pill ${activeTab === tabName ? 'active' : ''}`}
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

            {/* If a machine card is clicked, show its 5 checksheets */}
            {selectedMachine ? (
              <div className="machine-checksheets-container">
                <div className="machine-detail-header-card">
                  <div className="machine-detail-info">
                    <div className="machine-badge-tag">
                      <Cpu size={15} />
                      <span>{selectedMachine.name} — Station #{String(selectedMachine.id).padStart(2, '0')}</span>
                      <span className="dot-sep">•</span>
                      <span>{activeTab}</span>
                      <span className="dot-sep">•</span>
                      <span>{selectedUnitLocation} Unit</span>
                    </div>
                    <h2 className="machine-detail-title">Operational Checksheets</h2>
                    <p className="machine-detail-subtitle">
                      Select a checksheet below to open and record inspection values for <strong>{selectedMachine.name}</strong>.
                    </p>
                  </div>
                  <div className="machine-status-summary-box">
                    {activeSession && (
                      <div className="logged-in-user-pill">
                        <UserCheck size={14} className="user-check-icon" />
                        <span>Op: <strong>{activeSession.operatorCardNo}</strong></span>
                        <span className="dot-sep">•</span>
                        <span>QI: <strong>{activeSession.inspectorCardNo}</strong></span>
                      </div>
                    )}
                    <span className="cnc-status-tag status-live">● Online & Ready</span>
                    <button
                      className="header-logout-btn"
                      onClick={handleLogout}
                      title="Logout and return to Machines"
                    >
                      <LogOut size={15} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>

                {/* 5 Checksheets Cards in Exact Sequence */}
                <div className="checksheets-cards-grid">
                  {machineChecksheets.map((cs, idx) => {
                    const CsIcon = cs.icon;
                    const isSelected = selectedChecksheet === cs.name;
                    return (
                      <div
                        key={cs.id}
                        className={`checksheet-link-card ${isSelected ? 'active-cs-card' : ''}`}
                        onClick={() => setSelectedChecksheet(cs.name)}
                      >
                        <div className="cs-card-top">
                          <div className="cs-order-badge">0{idx + 1}</div>
                          <div
                            className="cs-icon-circle"
                            style={{ backgroundColor: cs.bg, color: cs.color }}
                          >
                            <CsIcon size={22} />
                          </div>
                        </div>

                        <div className="cs-card-body">
                          <h4 className="cs-card-title">{cs.name}</h4>
                          <p className="cs-card-desc">{cs.shortDesc}</p>
                        </div>

                        <div className="cs-card-footer">
                          <span className="cs-action-text">Open Checksheet</span>
                          <ChevronRight size={16} className="cs-chevron" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Checksheet Active Stage (when clicked) */}
                {selectedChecksheet === 'Operator & Machine Summary' ? (
                  /* ======================================================== */
                  /* Operator & Machine Summary View */
                  /* ======================================================== */
                  <div className="active-checksheet-stage-view op-machine-summary-stage">
                    <div className="active-cs-header">
                      <div className="active-cs-title-group">
                        <Users size={22} className="active-cs-icon" style={{ color: '#059669' }} />
                        <div>
                          <h3 className="active-cs-title">Operator & Machine Summary</h3>
                          <p className="active-cs-sub">
                            Consolidated telemetry and operator shift login audit for {selectedMachine.name} ({activeTab})
                          </p>
                        </div>
                      </div>
                      <div className="cs-header-btn-row">
                        <span className="summary-date-badge">Today: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <button
                          className="close-cs-btn"
                          onClick={() => setSelectedChecksheet(null)}
                        >
                          Close Summary
                        </button>
                      </div>
                    </div>

                    {/* Overall Machine Telemetry KPI Cards */}
                    <div className="op-summary-kpis-grid">
                      <div className="op-kpi-metric-card blue-grad">
                        <div className="op-kpi-head">
                          <span className="op-kpi-label">TOTAL MACHINE RUNTIME</span>
                          <Clock size={18} className="op-kpi-icon" />
                        </div>
                        <div className="op-kpi-val-group">
                          <span className="op-kpi-number">18.4</span>
                          <span className="op-kpi-unit">hrs</span>
                        </div>
                        <span className="op-kpi-caption">Active runtime across all shift logins</span>
                      </div>

                      <div className="op-kpi-metric-card rose-grad">
                        <div className="op-kpi-head">
                          <span className="op-kpi-label">TOTAL BREAKDOWN TIME</span>
                          <AlertOctagon size={18} className="op-kpi-icon" />
                        </div>
                        <div className="op-kpi-val-group">
                          <span className="op-kpi-number">0.8</span>
                          <span className="op-kpi-unit">hrs (48 min)</span>
                        </div>
                        <span className="op-kpi-caption">Tooling change & pneumatic downtime</span>
                      </div>

                      <div className="op-kpi-metric-card emerald-grad">
                        <div className="op-kpi-head">
                          <span className="op-kpi-label">TOTAL PRODUCTION OUTPUT</span>
                          <Boxes size={18} className="op-kpi-icon" />
                        </div>
                        <div className="op-kpi-val-group">
                          <span className="op-kpi-number">3,840</span>
                          <span className="op-kpi-unit">units</span>
                        </div>
                        <span className="op-kpi-caption">Good parts produced on {selectedMachine.name}</span>
                      </div>

                      <div className="op-kpi-metric-card purple-grad">
                        <div className="op-kpi-head">
                          <span className="op-kpi-label">OPERATOR SESSIONS</span>
                          <Users size={18} className="op-kpi-icon" />
                        </div>
                        <div className="op-kpi-val-group">
                          <span className="op-kpi-number">3</span>
                          <span className="op-kpi-unit">operators</span>
                        </div>
                        <span className="op-kpi-caption">Active / logged operator shifts</span>
                      </div>
                    </div>

                    {/* Detailed Operator Login Table */}
                    <div className="op-session-table-wrapper">
                      <div className="op-table-title-row">
                        <h4 className="op-table-heading">Operator Login & Performance Log</h4>
                        <span className="op-table-sub">Individual operator sessions, runtimes, breakdowns and output volume</span>
                      </div>

                      <table className="op-summary-detail-table">
                        <thead>
                          <tr>
                            <th>Operator Card No.</th>
                            <th>Inspector Card No.</th>
                            <th>Shift / Timing</th>
                            <th>Login Status</th>
                            <th>Runtime (hrs)</th>
                            <th>Breakdown (min)</th>
                            <th>Production (units)</th>
                            <th>Efficiency</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Current active authenticated session */}
                          {activeSession && (
                            <tr className="active-operator-row">
                              <td>
                                <div className="op-name-cell">
                                  <span className="op-avatar-badge">OP</span>
                                  <div>
                                    <div className="op-card-id">{activeSession.operatorCardNo}</div>
                                    <div className="op-status-text-live">● Current Active Login</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="qi-card-id">{activeSession.inspectorCardNo}</div>
                                <span className="qi-role-sub">Certified QI</span>
                              </td>
                              <td>
                                <span className="shift-pill shift-current">Shift A (06:00 - 14:00)</span>
                              </td>
                              <td><span className="tag-live-session">Active Now</span></td>
                              <td className="font-bold text-blue">6.8 hrs</td>
                              <td className="text-rose font-bold">15 min</td>
                              <td className="font-bold text-emerald">1,420</td>
                              <td>
                                <span className="eff-badge eff-high">96.2%</span>
                              </td>
                            </tr>
                          )}

                          {/* Historical Shift B Login */}
                          <tr>
                            <td>
                              <div className="op-name-cell">
                                <span className="op-avatar-badge past">OP</span>
                                <div>
                                  <div className="op-card-id">OP-78219 (Sunil Verma)</div>
                                  <div className="op-status-text">Logged out normally</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="qi-card-id">QI-10928</div>
                              <span className="qi-role-sub">Quality Inspector</span>
                            </td>
                            <td>
                              <span className="shift-pill">Shift B (14:00 - 22:00)</span>
                            </td>
                            <td><span className="tag-past-session">Completed</span></td>
                            <td className="font-bold text-blue">7.4 hrs</td>
                            <td className="text-rose font-bold">20 min</td>
                            <td className="font-bold text-emerald">1,580</td>
                            <td>
                              <span className="eff-badge eff-high">94.8%</span>
                            </td>
                          </tr>

                          {/* Historical Shift C Login */}
                          <tr>
                            <td>
                              <div className="op-name-cell">
                                <span className="op-avatar-badge past">OP</span>
                                <div>
                                  <div className="op-card-id">OP-92415 (Manoj Kumar)</div>
                                  <div className="op-status-text">Logged out normally</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="qi-card-id">QI-88312</div>
                              <span className="qi-role-sub">Quality Inspector</span>
                            </td>
                            <td>
                              <span className="shift-pill">Shift C (22:00 - 06:00)</span>
                            </td>
                            <td><span className="tag-past-session">Completed</span></td>
                            <td className="font-bold text-blue">4.2 hrs</td>
                            <td className="text-rose font-bold">13 min</td>
                            <td className="font-bold text-emerald">840</td>
                            <td>
                              <span className="eff-badge eff-med">91.4%</span>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="op-table-total-row">
                            <td colSpan={4} className="font-bold">Total Summary for {selectedMachine.name}</td>
                            <td className="font-bold text-blue">18.4 hrs</td>
                            <td className="font-bold text-rose">48 min</td>
                            <td className="font-bold text-emerald">3,840 units</td>
                            <td><span className="eff-badge eff-high font-bold">94.1% Avg</span></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                ) : selectedChecksheet === 'C&C process production status summary' ? (
                  /* ======================================================== */
                  /* Dedicated Excel-like C&C Process Production Status Summary */
                  /* ======================================================== */
                  <div className="active-checksheet-stage-view cc-excel-stage-view">
                    <div className="active-cs-header">
                      <div className="active-cs-title-group">
                        <BarChart3 size={22} className="active-cs-icon" style={{ color: '#0d9488' }} />
                        <div>
                          <h3 className="active-cs-title">C&C Process Production Status Summary</h3>
                          <p className="active-cs-sub">
                            Excel Checksheet format for {selectedMachine.name} • FRM-PR-201 (Rev No. 03)
                          </p>
                        </div>
                      </div>
                      <div className="cs-header-btn-row">
                        <button
                          className="excel-save-btn"
                          onClick={() => alert(`C&C Production Status saved for ${selectedMachine.name}!`)}
                        >
                          Save Record
                        </button>
                        <button
                          className="close-cs-btn"
                          onClick={() => setSelectedChecksheet(null)}
                        >
                          Close Checksheet
                        </button>
                      </div>
                    </div>

                    {/* Excel Sheet Outer Container */}
                    <div className="excel-sheet-outer">
                      <div className="excel-sheet-header-title">
                        <h2>C&C Process Production Status Summary</h2>
                      </div>

                      {/* Header meta inputs (Date, Shift, Operator, Inspector) */}
                      <div className="excel-meta-grid">
                        <div className="excel-meta-item">
                          <label>Date:</label>
                          <input
                            type="date"
                            value={ccSheetData.date}
                            onChange={(e) => handleMetaChange('date', e.target.value)}
                          />
                        </div>
                        <div className="excel-meta-item">
                          <label>Shift:</label>
                          <input
                            type="text"
                            placeholder="Shift A"
                            value={ccSheetData.shift}
                            onChange={(e) => handleMetaChange('shift', e.target.value)}
                          />
                        </div>
                        <div className="excel-meta-item">
                          <label>Operator Name:</label>
                          <input
                            type="text"
                            placeholder="Enter Operator Name"
                            value={ccSheetData.operatorName}
                            onChange={(e) => handleMetaChange('operatorName', e.target.value)}
                          />
                        </div>
                        <div className="excel-meta-item">
                          <label>Inspector Name:</label>
                          <input
                            type="text"
                            placeholder="Enter Inspector Name"
                            value={ccSheetData.inspectorName}
                            onChange={(e) => handleMetaChange('inspectorName', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Table 1: Hourly Production & Machine Process */}
                      <div className="excel-table-scroll-container">
                        <table className="excel-grid-table">
                          <thead>
                            <tr className="excel-th-main">
                              <th style={{ width: '45px' }}>S.No</th>
                              <th style={{ minWidth: '180px' }}>Machine/Process</th>
                              <th style={{ width: '70px' }}>PLAN</th>
                              <th style={{ width: '80px' }}>Start Time</th>
                              <th style={{ width: '80px' }}>Finish Time</th>
                              <th style={{ width: '85px' }}>Hour Meter (hr/shift)</th>
                              <th style={{ width: '65px' }}>1st Hr</th>
                              <th style={{ width: '65px' }}>2nd Hr</th>
                              <th style={{ width: '65px' }}>3rd Hr</th>
                              <th style={{ width: '65px' }}>4th Hr</th>
                              <th style={{ width: '65px' }}>5th Hr</th>
                              <th style={{ width: '65px' }}>6th Hr</th>
                              <th style={{ width: '65px' }}>7th Hr</th>
                              <th style={{ width: '65px' }}>8th Hr</th>
                              <th style={{ width: '80px' }}>Total</th>
                              <th style={{ width: '100px' }}>Working Time (D/Shift)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ccSheetData.hourlyRows.map((row, rIdx) => (
                              <tr key={row.id}>
                                <td className="excel-cell-center excel-bg-muted">{row.id}</td>
                                <td>
                                  <input
                                    className="excel-cell-input text-left"
                                    type="text"
                                    value={row.machineProcess}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'machineProcess', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="excel-cell-input text-center"
                                    type="text"
                                    value={row.plan}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'plan', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="excel-cell-input text-center"
                                    type="text"
                                    value={row.startTime}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'startTime', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="excel-cell-input text-center"
                                    type="text"
                                    value={row.finishTime}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'finishTime', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="excel-cell-input text-center"
                                    type="text"
                                    value={row.hourMeter}
                                    onChange={(e) => handleCellChange('hourlyRows', rIdx, 'hourMeter', e.target.value)}
                                  />
                                </td>
                                <td><input className="excel-cell-input text-center" type="text" value={row.h1} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h1', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={row.h2} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h2', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={row.h3} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h3', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={row.h4} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h4', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={row.h5} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h5', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={row.h6} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h6', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={row.h7} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h7', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={row.h8} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'h8', e.target.value)} /></td>
                                <td className="excel-bg-highlight">
                                  <input className="excel-cell-input text-center font-bold" type="text" value={row.total} onChange={(e) => handleCellChange('hourlyRows', rIdx, 'total', e.target.value)} />
                                </td>
                                {rIdx === 0 && (
                                  <td rowSpan={ccSheetData.hourlyRows.length + 1} className="excel-cell-center excel-bg-muted font-bold">
                                    <input
                                      className="excel-cell-input text-center font-bold"
                                      type="text"
                                      value={ccSheetData.workingTime}
                                      onChange={(e) => handleMetaChange('workingTime', e.target.value)}
                                    />
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>min</span>
                                  </td>
                                )}
                              </tr>
                            ))}
                            {/* Summary Total Row */}
                            <tr className="excel-row-total">
                              <td colSpan={2} className="excel-cell-center font-bold">Total</td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="1100" /></td>
                              <td></td>
                              <td></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="2" /></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="540" /></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="562" /></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="" /></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="" /></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="" /></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="" /></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="" /></td>
                              <td><input className="excel-cell-input text-center font-bold" type="text" placeholder="" /></td>
                              <td className="excel-bg-highlight"><input className="excel-cell-input text-center font-bold text-blue" type="text" placeholder="1102" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Table 2: Down Time in Minutes */}
                      <div className="excel-table-scroll-container" style={{ marginTop: '16px' }}>
                        <table className="excel-grid-table">
                          <thead>
                            <tr className="excel-th-sub">
                              <th style={{ minWidth: '350px' }} colSpan={2}>Down Time in Minutes</th>
                              <th style={{ width: '65px' }}>1st Hr</th>
                              <th style={{ width: '65px' }}>2nd Hr</th>
                              <th style={{ width: '65px' }}>3rd Hr</th>
                              <th style={{ width: '65px' }}>4th Hr</th>
                              <th style={{ width: '65px' }}>5th Hr</th>
                              <th style={{ width: '65px' }}>6th Hr</th>
                              <th style={{ width: '65px' }}>7th Hr</th>
                              <th style={{ width: '65px' }}>8th Hr</th>
                              <th style={{ width: '80px' }}>Total</th>
                              <th style={{ width: '100px' }}>No of Changes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ccSheetData.downtimeRows.map((dt, dIdx) => (
                              <tr key={dt.id}>
                                <td colSpan={2} className="excel-cell-label">{dt.reason}</td>
                                <td><input className="excel-cell-input text-center" type="text" value={dt.h1} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h1', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={dt.h2} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h2', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={dt.h3} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h3', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={dt.h4} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h4', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={dt.h5} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h5', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={dt.h6} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h6', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={dt.h7} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h7', e.target.value)} /></td>
                                <td><input className="excel-cell-input text-center" type="text" value={dt.h8} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'h8', e.target.value)} /></td>
                                <td className="excel-bg-highlight">
                                  <input className="excel-cell-input text-center font-bold" type="text" value={dt.total} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'total', e.target.value)} />
                                </td>
                                <td>
                                  <input className="excel-cell-input text-center font-bold" type="text" value={dt.changes} onChange={(e) => handleCellChange('downtimeRows', dIdx, 'changes', e.target.value)} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Excel Sheet Footer (Scrap boxes & Signatures matching sheet) */}
                      <div className="excel-footer-grid">
                        <div className="excel-footer-scrap-group">
                          <div className="excel-scrap-box">
                            <span className="excel-scrap-title">Scrap (PRS) in gms</span>
                            <input
                              type="text"
                              placeholder="0.00"
                              value={ccSheetData.scrapPRS}
                              onChange={(e) => handleMetaChange('scrapPRS', e.target.value)}
                            />
                          </div>
                          <div className="excel-scrap-box">
                            <span className="excel-scrap-title">Scrap (ORS) in gms</span>
                            <input
                              type="text"
                              placeholder="0.00"
                              value={ccSheetData.scrapORS}
                              onChange={(e) => handleMetaChange('scrapORS', e.target.value)}
                            />
                          </div>
                          <div className="excel-scrap-box">
                            <span className="excel-scrap-title">Scrap (CFM) in gms</span>
                            <input
                              type="text"
                              placeholder="0.00"
                              value={ccSheetData.scrapCFM}
                              onChange={(e) => handleMetaChange('scrapCFM', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="excel-footer-sign-group">
                          <div className="excel-sign-box">
                            <span className="excel-sign-title">Filled By (Operator)</span>
                            <input
                              type="text"
                              placeholder="Operator Sign / ID"
                              value={ccSheetData.filledBy}
                              onChange={(e) => handleMetaChange('filledBy', e.target.value)}
                            />
                          </div>
                          <div className="excel-sign-box">
                            <span className="excel-sign-title">Checked By (Shift Incharge)</span>
                            <input
                              type="text"
                              placeholder="Shift Incharge Sign"
                              value={ccSheetData.checkedBy}
                              onChange={(e) => handleMetaChange('checkedBy', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Sheet Metadata Bar */}
                      <div className="excel-doc-meta-bar">
                        <span className="doc-num">FRM-PR-201</span>
                        <span className="doc-rev">Rev No.: <strong>03</strong></span>
                        <span className="doc-date">Effective: 7/12/2025</span>
                        <span className="doc-fme-tag">FME Production Division</span>
                      </div>
                    </div>
                  </div>
                ) : selectedChecksheet ? (
                  <div className="active-checksheet-stage-view">
                    <div className="active-cs-header">
                      <div className="active-cs-title-group">
                        <CheckCircle2 size={20} className="active-cs-icon" />
                        <div>
                          <h3 className="active-cs-title">{selectedChecksheet}</h3>
                          <p className="active-cs-sub">
                            Active Checksheet form for {selectedMachine.name} ({activeTab})
                          </p>
                        </div>
                      </div>
                      <button
                        className="close-cs-btn"
                        onClick={() => setSelectedChecksheet(null)}
                      >
                        Close Checksheet
                      </button>
                    </div>

                    <div className="cs-checklist-table-wrapper">
                      <table className="cs-checklist-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Inspection Parameter</th>
                            <th>Standard / Specification</th>
                            <th>Verification Frequency</th>
                            <th>Status</th>
                            <th>Observation / Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Visual Cleaning & Chip Removal</td>
                            <td>Dust & debris free fixture table</td>
                            <td>Start of Shift</td>
                            <td><span className="tag-pass">OK</span></td>
                            <td>Cleaned properly with compressed air nozzle</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Operating Air Pressure</td>
                            <td>0.5 ~ 0.7 MPa</td>
                            <td>Hourly</td>
                            <td><span className="tag-pass">0.62 MPa</span></td>
                            <td>Within normal operating range</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Sensor & Pokayoke Alignment</td>
                            <td>Red beam aligns with target notch</td>
                            <td>Every 2 Hours</td>
                            <td><span className="tag-pass">Verified</span></td>
                            <td>Part position detection active</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Emergency Stop & Safety Interlock</td>
                            <td>Instant shutoff on trigger</td>
                            <td>Daily</td>
                            <td><span className="tag-pass">OK</span></td>
                            <td>Tested during shift changeover</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Lubrication Level & Oil Mist</td>
                            <td>Between MIN and MAX markers</td>
                            <td>Daily</td>
                            <td><span className="tag-pass">Normal</span></td>
                            <td>Level at 85% capacity</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : activeTab === 'Auto Crimping' && selectedSubDept === 'CNC' ? (
              /* C&C 1 to C&C 32 KPI Cards Grid */
              <div className="cnc-kpi-section">
                <div className="cnc-section-header-bar">
                  <div>
                    <h3 className="cnc-section-title">C&C Machines Overview</h3>
                    <p className="cnc-section-subtitle">Real-time status, health, and output monitoring for C&C 1 to C&C 32 ({selectedUnitLocation} Plant)</p>
                  </div>
                  <div className="cnc-summary-pills">
                    <span className="cnc-pill pill-online">● 27 Running</span>
                    <span className="cnc-pill pill-idle">● 3 Idle</span>
                    <span className="cnc-pill pill-maintenance">● 1 Maint.</span>
                  </div>
                </div>

                <div className="kpi-cards-grid cnc-grid-32">
                  {Array.from({ length: 32 }, (_, i) => i + 1)
                    .filter((machineNum) => machineNum !== 13)
                    .map((machineNum, idx) => {
                      const machineName = `C&C ${String(machineNum).padStart(2, '0')}`;
                      // Rotate through the 5 pastel color styles
                      const colorVariants = [
                        { style: 'kpi-card-blue', badge: 'blue-badge' },
                        { style: 'kpi-card-green', badge: 'green-badge' },
                        { style: 'kpi-card-yellow', badge: 'yellow-badge' },
                        { style: 'kpi-card-red', badge: 'red-badge' },
                        { style: 'kpi-card-purple', badge: 'purple-badge' }
                      ];
                      const variant = colorVariants[idx % colorVariants.length];
                      
                      // Status variations
                      const isMaintenance = machineNum === 17;
                      const isIdle = machineNum === 8 || machineNum === 24;
                      const statusText = isMaintenance ? 'Maintenance' : isIdle ? 'Idle' : 'Running';
                      const statusClass = isMaintenance ? 'status-maint' : isIdle ? 'status-idle' : 'status-live';

                      // Pseudo-realistic machine metrics based on machine number
                      const output = 120 + ((machineNum * 37) % 180);
                      const efficiency = isMaintenance ? 0 : isIdle ? 42 : Math.min(99, 84 + ((machineNum * 7) % 15));

                      return (
                        <div
                          key={machineNum}
                          className={`kpi-card ${variant.style} cnc-machine-kpi-card`}
                          onClick={() => handleMachineCardClick({ id: machineNum, name: machineName })}
                          title={`Click to open checksheets for ${machineName}`}
                        >
                          <div className="kpi-card-header">
                            <div>
                              <span className="kpi-card-title">{machineName}</span>
                              <div className="cnc-card-subinfo">Station #{String(machineNum).padStart(2, '0')}</div>
                            </div>
                            <div className={`kpi-icon-badge ${variant.badge}`}>
                              <Cpu size={16} />
                            </div>
                          </div>

                          <div className="kpi-card-number">
                            {output}
                            <span className="kpi-card-unit"> pcs/hr</span>
                          </div>

                          <div className="kpi-card-footer-row">
                            <span className="kpi-card-desc">Efficiency: <strong>{efficiency}%</strong></span>
                            <span className={`cnc-status-tag ${statusClass}`}>{statusText}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              /* View for other operations tabs or sections */
              <div className="checksheet-content-stage">
                <div className="checksheet-stage-card">
                  <div className="checksheet-stage-header">
                    <div className="checksheet-stage-badge">
                      <span className="dot-pulse"></span>
                      <span>{selectedUnitLocation} Unit</span>
                      <span className="stage-dept-tag">• {selectedSubDept} Section</span>
                    </div>
                    <h2 className="checksheet-operation-title">{activeTab}</h2>
                    <p className="checksheet-operation-desc">
                      Machine Checksheet parameters, real-time inspection criteria and operational logs for <strong>{activeTab}</strong> in {selectedSubDept} Section ({selectedUnitLocation} Plant).
                    </p>
                  </div>
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
        <div className="op-login-modal-overlay">
          <div className="op-login-modal-card">
            <div className="op-login-modal-header">
              <div className="op-login-header-icon">
                <Lock size={22} />
              </div>
              <div className="op-login-header-text">
                <h3 className="op-login-modal-title">Operator & Inspector Authentication</h3>
                <p className="op-login-modal-subtitle">
                  Authenticate to access checksheets for <strong>{pendingMachine?.name}</strong>
                </p>
              </div>
              <button
                className="op-login-close-btn"
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

            <form onSubmit={handleLoginSubmit} className="op-login-form">
              {loginError && (
                <div className="op-login-error-banner">
                  {loginError}
                </div>
              )}

              <div className="op-login-field-group">
                <label className="op-login-field-label">
                  <CreditCard size={15} />
                  <span>Operator Card No.</span>
                  <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  className="op-login-input"
                  placeholder="e.g. OP-84210 or Scan Card"
                  value={operatorCardNo}
                  onChange={(e) => setOperatorCardNo(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="op-login-field-group">
                <label className="op-login-field-label">
                  <ShieldCheck size={15} />
                  <span>Quality Inspector Card No.</span>
                  <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  className="op-login-input"
                  placeholder="e.g. QI-39145 or Scan Card"
                  value={inspectorCardNo}
                  onChange={(e) => setInspectorCardNo(e.target.value)}
                />
              </div>

              <div className="op-login-modal-actions">
                <button
                  type="button"
                  className="op-login-cancel-btn"
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
                  className="op-login-submit-btn"
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
