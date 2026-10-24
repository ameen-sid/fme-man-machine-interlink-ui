import ChecksheetHeaderNav from '../../../../shared/ChecksheetHeaderNav';
import PmObservationSwitcher from '../../../../shared/PmObservationSwitcher';
import React, { useState } from 'react';
import { Wrench, Save, RotateCcw, Printer, ArrowLeft } from 'lucide-react';
// 
const INITIAL_PM_SECTIONS = [
  {
    id: 1,
    title: 'Main Frame & Motor Drive Unit',
    color: '#9bc2e6',
    items: [
      {
        sNo: '1.1',
        checkLocation: 'Electric Drive Motor & Inverter',
        checkPoint: 'Motor sound, vibration & operating temperature',
        frequency: 'M',
        checkMethods: 'Run test & acoustic/temperature check',
        judgementCriteria: 'No abnormal noise, vibration or overheating (< 65°C)',
        actionNotOk: 'Check motor bearings / service inverter'
      },
      {
        sNo: '1.2',
        checkLocation: 'Flywheel & Drive V-Belt Tension',
        checkPoint: 'Belt tension & wear condition',
        frequency: 'M',
        checkMethods: 'Check deflection with finger (approx. 5-8 mm)',
        judgementCriteria: 'Proper tension, no cracks or slippage',
        actionNotOk: 'Tension adjustment / Replace belt'
      },
      {
        sNo: '1.3',
        checkLocation: 'Clutch / Crankshaft Mechanism',
        checkPoint: 'Cycle engagement & single-stroke stop position',
        frequency: '3M',
        checkMethods: 'Test cycle & check TDC (Top Dead Center) stop',
        judgementCriteria: 'Stops reliably at Top Dead Center (TDC)',
        actionNotOk: 'Adjust brake clutch gap / microswitch'
      }
    ]
  },
  {
    id: 2,
    title: 'Applicator Clamping & Ram Mechanism',
    color: '#9bc2e6',
    items: [
      {
        sNo: '2.1',
        checkLocation: 'Ram Slide & Gib Clearance',
        checkPoint: 'Check ram guide backlash & lateral play',
        frequency: 'M',
        checkMethods: 'Dial gauge measurement',
        judgementCriteria: 'Backlash < 0.05 mm',
        actionNotOk: 'Tighten slide gib adjusting screws'
      },
      {
        sNo: '2.2',
        checkLocation: 'Applicator Quick Clamping Wedge',
        checkPoint: 'Base plate clamp tightness & T-screw',
        frequency: 'M',
        checkMethods: 'Check clamp torque & firmness',
        judgementCriteria: 'Applicator clamped rigidly without movement',
        actionNotOk: 'Tighten clamp or replace worn T-screw'
      },
      {
        sNo: '2.3',
        checkLocation: 'Ram Height Adjusting Ring (Dial Head)',
        checkPoint: 'Crimp height adjustment scale calibration',
        frequency: '3M',
        checkMethods: 'Rotate dial & measure stroke variation with micrometer',
        judgementCriteria: 'Smooth click rotation, scale matches actual stroke',
        actionNotOk: 'Disassemble, clean & calibrate dial ring'
      }
    ]
  },
  {
    id: 3,
    title: 'Pneumatic System & Pressure Regulators',
    color: '#9bc2e6',
    items: [
      {
        sNo: '3.1',
        checkLocation: 'Main Air Filter Regulator & Gauge',
        checkPoint: 'Incoming air pressure & filter water trap',
        frequency: 'M',
        checkMethods: 'Check gauge reading & drain condensation',
        judgementCriteria: 'Stable pressure at 0.50 - 0.60 MPa, dry bowl',
        actionNotOk: 'Drain water / replace filter element'
      },
      {
        sNo: '3.2',
        checkLocation: 'Solenoid Valves & Air Piping',
        checkPoint: 'Air leakage & valve response time',
        frequency: 'M',
        checkMethods: 'Acoustic / soap bubble test & trigger response',
        judgementCriteria: 'No audible or bubble leakage, crisp actuation',
        actionNotOk: 'Tighten fittings / replace solenoid valve'
      }
    ]
  },
  {
    id: 4,
    title: 'Electrical & Safety Systems',
    color: '#9bc2e6',
    items: [
      {
        sNo: '4.1',
        checkLocation: 'Emergency Stop Push Button',
        checkPoint: 'Instant circuit trip upon pressing',
        frequency: 'M',
        checkMethods: 'Press while cycling',
        judgementCriteria: 'Machine halts immediately, power cutoff',
        actionNotOk: 'Replace emergency contact block'
      },
      {
        sNo: '4.2',
        checkLocation: 'Safety Guard Interlock Microswitch',
        checkPoint: 'Safety cover sensor actuation',
        frequency: 'M',
        checkMethods: 'Open cover & press foot pedal',
        judgementCriteria: 'Machine must NOT cycle when cover is open',
        actionNotOk: 'Adjust interlock bracket / replace switch'
      },
      {
        sNo: '4.3',
        checkLocation: 'Foot Pedal Switch & Wiring Cord',
        checkPoint: 'Pedal spring return & cable sheath condition',
        frequency: 'M',
        checkMethods: 'Actuation feel & visual cable inspection',
        judgementCriteria: 'Crisp spring return, no cuts/cracks in insulation',
        actionNotOk: 'Replace foot pedal switch or cable'
      },
      {
        sNo: '4.4',
        checkLocation: 'CFM (Crimp Force Monitor) System',
        checkPoint: 'Piezo load cell, amplifier & error trip',
        frequency: '3M',
        checkMethods: 'Test sample with missing strands / high crimp',
        judgementCriteria: 'CFM gives red alarm & interlocks next cycle',
        actionNotOk: 'Recalibrate CFM sensitivity curve'
      }
    ]
  },
  {
    id: 5,
    title: 'Lubrication & Tooling Seating',
    color: '#9bc2e6',
    items: [
      {
        sNo: '5.1',
        checkLocation: 'Slide Guides & Crank Lubrication',
        checkPoint: 'Grease lubrication on sliding contact surfaces',
        frequency: 'M',
        checkMethods: 'Visual & apply recommended grease (Shell Alvania #2)',
        judgementCriteria: 'Smooth wet oil/grease film, no dry rubbing',
        actionNotOk: 'Clean old grease & replenish fresh grease'
      },
      {
        sNo: '5.2',
        checkLocation: 'Anvil Seating Plate & Scrap Chute',
        checkPoint: 'Cleanliness of anvil base & slug clearance',
        frequency: 'M',
        checkMethods: 'Disassemble anvil & inspect seating surface',
        judgementCriteria: 'No scrap buildup, flatness < 0.02 mm',
        actionNotOk: 'Clean thoroughly / lap seating face'
      }
    ]
  }
];

export default function MachinePmChecksheet({
  machine,
  onClose,
  onSwitchToObservation
}) {
  const machineName = machine?.name || 'MCR';
  const modelName = machine?.model || 'Mecal-05';
  const displayMachine = `${machineName} (${modelName})`;

  const [headerInfo, setHeaderInfo] = useState({
    docNo: 'CHK-WH-MT-043',
    rev: '19',
    machineName: displayMachine,
    processName: 'Manual Crimping',
    month: 'OCTOBER',
    year: '2026',
    freqPeriod: 'Monthly & Periodic PM',
    executedDate: new Date().toISOString().split('T')[0]
  });

  const [judgements, setJudgements] = useState(() => {
    const initial = {};
    INITIAL_PM_SECTIONS.forEach((sec) => {
      sec.items.forEach((item) => {
        initial[item.sNo] = {
          judgement: 'OK',
          actualObservation: 'Normal operating condition',
          actionTaken: '',
          sign: 'Tech'
        };
      });
    });
    return initial;
  });

  const [savedToast, setSavedToast] = useState('');

  const handleFieldChange = (sNo, field, val) => {
    setJudgements((prev) => ({
      ...prev,
      [sNo]: {
        ...prev[sNo],
        [field]: val
      }
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset PM Checksheet records to default?')) {
      const reset = {};
      INITIAL_PM_SECTIONS.forEach((sec) => {
        sec.items.forEach((item) => {
          reset[item.sNo] = {
            judgement: 'OK',
            actualObservation: 'Normal operating condition',
            actionTaken: '',
            sign: 'Tech'
          };
        });
      });
      setJudgements(reset);
      setSavedToast('PM Checksheet values reset successfully');
      setTimeout(() => setSavedToast(''), 3000);
    }
  };

  const handleSave = () => {
    setSavedToast('Monthly & Periodic PM Checksheet saved successfully!');
    setTimeout(() => setSavedToast(''), 3000);
  };

  return (
    <div className="flex flex-col gap-4 w-full text-slate-800">
      <ChecksheetHeaderNav
        title="MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET"
        subtitle={`${displayMachine} — Periodic PM & Maintenance Checksheet`}
        icon={Wrench}
        iconBgClass="bg-purple-100 text-purple-700"
        onClose={onClose}
        onReset={handleReset}
        onSave={handleSave}
        savedToast={savedToast}
        showSwitcher={true}
        activeTab="pm"
        onSelectTab={(tab) => {
          if (tab === 'observation' && onSwitchToObservation) {
            onSwitchToObservation();
          }
        }}
        extraActions={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            onClick={() => window.print()}
            title="Print PM Checksheet"
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

      {/* Main Table Container */}
      <div className="bg-white border-2 border-black p-3 shadow-lg rounded-sm overflow-x-auto">
        <div className="min-w-[1750px] w-max select-text text-black">
          {/* Company Format Header */}
          <div className="border border-black p-2 bg-slate-50 mb-2 flex items-center justify-between">
            <div>
              <h1 className="text-base font-black text-black m-0 uppercase">
                FURUKAWA MINDA ELECTRIC PVT. LTD.
              </h1>
              <h2 className="text-sm font-black text-slate-800 m-0 uppercase tracking-tight">
                MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET — {displayMachine}
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs font-bold text-slate-800">
              <span>DOC NO: {headerInfo.docNo} Rev.{headerInfo.rev}</span>
              <span>MACHINE: {headerInfo.machineName}</span>
              <span>PROCESS: {headerInfo.processName}</span>
              <span>MONTH / YEAR: {headerInfo.month} {headerInfo.year}</span>
            </div>
          </div>

          {/* PM Grid Table */}
          <table className="w-full border-collapse border border-black text-center text-xs">
            <thead>
              <tr className="bg-slate-200 text-black font-extrabold text-[11px]">
                <th className="border border-black py-1 px-1 w-12">S.No</th>
                <th className="border border-black py-1 px-2 w-48 text-left">Check Location</th>
                <th className="border border-black py-1 px-2 w-72 text-left">Check Point</th>
                <th className="border border-black py-1 px-1 w-16">Freq</th>
                <th className="border border-black py-1 px-2 w-64 text-left">Check Method</th>
                <th className="border border-black py-1 px-2 w-72 text-left">Judgement Criteria</th>
                <th className="border border-black py-1 px-2 w-28">Judgement</th>
                <th className="border border-black py-1 px-2 text-left">Actual Observation / Remarks</th>
                <th className="border border-black py-1 px-2 w-48 text-left">Action Taken</th>
                <th className="border border-black py-1 px-1 w-20">Sign</th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_PM_SECTIONS.map((sec) => (
                <React.Fragment key={sec.id}>
                  {/* Section Title Banner */}
                  <tr className="bg-blue-100/70 text-slate-900 font-black text-[11.5px] border-t-2 border-black">
                    <td colSpan={10} className="border border-black py-1.5 px-3 text-left uppercase tracking-wider">
                      Section {sec.id}: {sec.title}
                    </td>
                  </tr>

                  {/* Section Items */}
                  {sec.items.map((item) => {
                    const rowData = judgements[item.sNo] || {
                      judgement: 'OK',
                      actualObservation: '',
                      actionTaken: '',
                      sign: 'Tech'
                    };
                    return (
                      <tr key={item.sNo} className="hover:bg-yellow-50/30 transition-colors">
                        <td className="border border-black p-1 font-bold text-[11px]">{item.sNo}</td>
                        <td className="border border-black p-1.5 text-left font-semibold text-slate-800 text-[11px]">
                          {item.checkLocation}
                        </td>
                        <td className="border border-black p-1.5 text-left font-medium text-slate-700 text-[11px]">
                          {item.checkPoint}
                        </td>
                        <td className="border border-black p-1 font-bold text-[11px] bg-slate-50">{item.frequency}</td>
                        <td className="border border-black p-1.5 text-left text-[10.5px] text-slate-600">
                          {item.checkMethods}
                        </td>
                        <td className="border border-black p-1.5 text-left font-bold text-slate-800 text-[11px]">
                          {item.judgementCriteria}
                        </td>
                        <td className="border border-black p-0">
                          <select
                            className={`w-full h-8 text-center font-extrabold text-xs border-none outline-none cursor-pointer ${
                              rowData.judgement === 'OK' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                            }`}
                            value={rowData.judgement}
                            onChange={(e) => handleFieldChange(item.sNo, 'judgement', e.target.value)}
                          >
                            <option value="OK">OK</option>
                            <option value="NOT OK">NOT OK</option>
                          </select>
                        </td>
                        <td className="border border-black p-0 text-left">
                          <input
                            type="text"
                            className="w-full h-8 px-2 text-xs border-none outline-none bg-transparent focus:bg-white"
                            value={rowData.actualObservation}
                            placeholder="Observation..."
                            onChange={(e) => handleFieldChange(item.sNo, 'actualObservation', e.target.value)}
                          />
                        </td>
                        <td className="border border-black p-0 text-left">
                          <input
                            type="text"
                            className="w-full h-8 px-2 text-xs border-none outline-none bg-transparent focus:bg-white"
                            value={rowData.actionTaken}
                            placeholder="Action taken if any..."
                            onChange={(e) => handleFieldChange(item.sNo, 'actionTaken', e.target.value)}
                          />
                        </td>
                        <td className="border border-black p-0">
                          <input
                            type="text"
                            className="w-full h-8 text-center text-xs font-semibold border-none outline-none bg-transparent focus:bg-white"
                            value={rowData.sign}
                            onChange={(e) => handleFieldChange(item.sNo, 'sign', e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* PM Verification Footer */}
          <div className="flex items-center justify-between border border-black border-t-0 p-3 bg-slate-50 text-xs font-bold text-slate-800">
            <div>
              PM Executed By: <span className="font-semibold underline decoration-dotted">Maint. Technician (Sign)</span>
            </div>
            <div>
              Reviewed By: <span className="font-semibold underline decoration-dotted">Maintenance Engineer</span>
            </div>
            <div>
              Approved By: <span className="font-semibold underline decoration-dotted">Maintenance Incharge / Head</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
