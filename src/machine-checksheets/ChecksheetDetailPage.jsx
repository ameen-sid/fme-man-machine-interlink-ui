import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getMachineModel } from '../utils/machineModels';
import { useAuth } from '../context/AuthContext';

// Shared checksheets
import OperatorMachineSummary from './shared/OperatorMachineSummary';
import CcProcessProductionSummary from './shared/CcProcessProductionSummary';
import BreakdownSummary from './shared/BreakdownSummary';
import ChecksheetNotAdded from './shared/ChecksheetNotAdded';
import ResistanceWeldingBlankSheet from './units/c&c/resistanceWelding/ResistanceWeldingBlankSheet';
import ResistanceWeldingFiveS from './units/c&c/resistanceWelding/FiveSChecksheet';
import ResistanceWeldingDaily from './units/c&c/resistanceWelding/DailyChecksheet';
import ResistanceWeldingInstrument from './units/c&c/resistanceWelding/InstrumentChecksheet';
import ResistanceWeldingInspectionReport from './units/c&c/resistanceWelding/InspectionReportSheet';
import ResistanceWeldingPM from './units/c&c/resistanceWelding/MachinePmChecksheet';
import PredictiveMaintainanceChecksheet from './units/c&c/resistanceWelding/PredictiveMaintainanceChecksheet';
import AutoCrimpingPmContainer from './shared/AutoCrimpingPmContainer';

// Manual Crimping (MCR) checksheets
import {
  McrFiveS,
  McrInspectionReport,
  McrInstrument,
  McrDaily,
  Mecal05DailyChecksheet,
  McrMachinePm
} from './units/c&c/manualCrimping';

// Alpha 355 checksheets
import Alpha355FiveS from './units/c&c/autoCrimping/alpha355/FiveSChecksheet';
import Alpha355Daily from './units/c&c/autoCrimping/alpha355/DailyChecksheet';
import Alpha355Instrument from './units/c&c/autoCrimping/alpha355/InstrumentChecksheet';
import Alpha355Pokayoke from './units/c&c/autoCrimping/alpha355/PokayokeChecksheet';
import Alpha355InspectionReport from './units/c&c/autoCrimping/alpha355/InspectionReportSheet';
import Alpha355MachinePm from './units/c&c/autoCrimping/alpha355/MachinePmChecksheet';

// TRD 301 checksheets
import Trd301FiveS from './units/c&c/autoCrimping/trd301/FiveSChecksheet';
import Trd301Daily from './units/c&c/autoCrimping/trd301/DailyChecksheet';
import Trd301Instrument from './units/c&c/autoCrimping/trd301/InstrumentChecksheet';
import Trd301Pokayoke from './units/c&c/autoCrimping/trd301/PokayokeChecksheet';
import Trd301InspectionReport from './units/c&c/autoCrimping/trd301/InspectionReportSheet';
import Trd301MachinePm from './units/c&c/autoCrimping/trd301/MachinePmChecksheet';

// TRD 411F checksheets
import Trd411fFiveS from './units/c&c/autoCrimping/trd411f/FiveSChecksheet';
import Trd411fDaily from './units/c&c/autoCrimping/trd411f/DailyChecksheet';
import Trd411fInstrument from './units/c&c/autoCrimping/trd411f/InstrumentChecksheet';
import Trd411fPokayoke from './units/c&c/autoCrimping/trd411f/PokayokeChecksheet';
import Trd411fInspectionReport from './units/c&c/autoCrimping/trd411f/InspectionReportSheet';
import Trd411fMachinePm from './units/c&c/autoCrimping/trd411f/MachinePmChecksheet';

// G448 checksheets
import G448FiveS from './units/c&c/autoCrimping/g448/FiveSChecksheet';
import G448Daily from './units/c&c/autoCrimping/g448/DailyChecksheet';
import G448Instrument from './units/c&c/autoCrimping/g448/InstrumentChecksheet';
import G448Pokayoke from './units/c&c/autoCrimping/g448/PokayokeChecksheet';
import G448InspectionReport from './units/c&c/autoCrimping/g448/InspectionReportSheet';
import G448MachinePm from './units/c&c/autoCrimping/g448/MachinePmChecksheet';

// G252 checksheets
import G252FiveS from './units/c&c/autoCrimping/g252/FiveSChecksheet';
import G252Daily from './units/c&c/autoCrimping/g252/DailyChecksheet';
import G252Instrument from './units/c&c/autoCrimping/g252/InstrumentChecksheet';
import G252Pokayoke from './units/c&c/autoCrimping/g252/PokayokeChecksheet';
import G252InspectionReport from './units/c&c/autoCrimping/g252/InspectionReportSheet';
import G252MachinePm from './units/c&c/autoCrimping/g252/MachinePmChecksheet';

// G253 checksheets
import G253FiveS from './units/c&c/autoCrimping/g253/FiveSChecksheet';
import G253Daily from './units/c&c/autoCrimping/g253/DailyChecksheet';
import G253Instrument from './units/c&c/autoCrimping/g253/InstrumentChecksheet';
import G253Pokayoke from './units/c&c/autoCrimping/g253/PokayokeChecksheet';
import G253InspectionReport from './units/c&c/autoCrimping/g253/InspectionReportSheet';
import G253MachinePm from './units/c&c/autoCrimping/g253/MachinePmChecksheet';

// JAM checksheets
import JamFiveS from './units/c&c/autoCrimping/jam/FiveSChecksheet';
import JamDaily from './units/c&c/autoCrimping/jam/DailyChecksheet';
import JamInstrument from './units/c&c/autoCrimping/jam/InstrumentChecksheet';
import JamPokayoke from './units/c&c/autoCrimping/jam/PokayokeChecksheet';
import JamInspectionReport from './units/c&c/autoCrimping/jam/InspectionReportSheet';
import JamMachinePm from './units/c&c/autoCrimping/jam/MachinePmChecksheet';

export default function ChecksheetDetailPage() {
  const { unit, operationalUnit, machineId, checksheetId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeSession } = useAuth();

  const currentUnit = unit || 'Bawal';
  const currentOpUnit = operationalUnit || 'CNC';

  const path = (location.pathname || '').toLowerCase();
  let defaultMachine = 'TRD_411F';
  if (path.includes('g448') || path.includes('g_448')) {
    defaultMachine = 'G448';
  } else if (path.includes('g252') || path.includes('g_252')) {
    defaultMachine = 'G252';
  } else if (path.includes('g253') || path.includes('g_253')) {
    defaultMachine = 'G253';
  } else if (/\/ja[mn](\/|$)/.test(path)) {
    defaultMachine = 'JAM';
  } else if (path.includes('trd301')) {
    defaultMachine = 'TRD_301';
  } else if (path.includes('alpha355')) {
    defaultMachine = 'Alpha_355';
  }
  const rawMachineId = machineId || defaultMachine;
  const decodedMachineId = decodeURIComponent(rawMachineId);
  const decodedChecksheetId = checksheetId ? decodeURIComponent(checksheetId) : '';

  // Parse machine id number & model
  const cleanId = decodedMachineId.trim().toUpperCase().replace(/[-_\s]/g, '');
  let idNum = 1;
  let modelName = '';
  let machineName = '';

  const isManualCrimping =
    cleanId === 'MCR' ||
    cleanId.startsWith('MCR') ||
    cleanId.includes('MANUALCRIMPING') ||
    (path && path.toLowerCase().includes('manualcrimping'));

  const isResistanceWelding =
    decodedMachineId.includes('R/SW') ||
    cleanId.includes('RSW') ||
    cleanId.includes('RESISTANCE') ||
    (path && path.toLowerCase().includes('resistance')) ||
    (currentOpUnit && currentOpUnit.toLowerCase().includes('resistance')) ||
    decodedMachineId.startsWith('R/SW') ||
    decodedMachineId.startsWith('RSW');

  if (isManualCrimping) {
    idNum = 1;
    machineName = 'MCR';
    modelName = 'Mecal-05';
  } else if (isResistanceWelding) {
    const numMatch = decodedMachineId.match(/\d+/);
    idNum = numMatch ? Number(numMatch[0]) : 1;
    machineName = `R/SW ${String(idNum).padStart(2, '0')}`;
    modelName = `Machine ${idNum}`;
  } else if (rawMachineId.startsWith('C&C')) {
    const numMatch = rawMachineId.match(/\d+/);
    idNum = numMatch ? Number(numMatch[0]) : 1;
    machineName = `C&C ${String(idNum).padStart(2, '0')}`;
    modelName = getMachineModel(idNum);
  } else if (cleanId.includes('G448')) {
    idNum = 26;
    machineName = 'C&C 26';
    modelName = 'G_448';
  } else if (cleanId.includes('G252')) {
    idNum = 20;
    machineName = 'C&C 20';
    modelName = 'G_252';
  } else if (cleanId.includes('G253')) {
    idNum = 2;
    machineName = 'C&C 02';
    modelName = 'G_253';
  } else if (cleanId === 'JAM' || cleanId === 'JAN') {
    idNum = 25;
    machineName = 'C&C 25';
    modelName = 'JAM';
  } else if (cleanId.includes('TRD411F') || cleanId.includes('TRD411')) {
    idNum = 14;
    machineName = 'C&C 14';
    modelName = 'TRD_411F';
  } else if (cleanId.includes('TRD301')) {
    idNum = 5;
    machineName = 'C&C 05';
    modelName = 'TRD_301';
  } else if (cleanId.includes('ALPHA355')) {
    idNum = 1;
    machineName = 'C&C 01';
    modelName = 'Alpha_355';
  } else {
    const numMatch = rawMachineId.match(/\d+/);
    idNum = numMatch ? Number(numMatch[0]) : 1;
    machineName = `C&C ${String(idNum).padStart(2, '0')}`;
    modelName = getMachineModel(idNum);
  }

  const selectedMachine = {
    id: idNum,
    name: machineName,
    model: modelName
  };

  const handleClose = () => {
    if (machineId) {
      const machineSlug = machineName.includes('/') ? machineName.replace(/\//g, '-') : machineName;
      navigate(`/machine-checksheet/${currentUnit}/${currentOpUnit}/${machineSlug}`);
    } else {
      if (path.includes('g448')) {
        navigate(path.startsWith('/machine-checksheet') ? '/machine-checksheet/g448' : '/g448');
      } else if (path.includes('g252') || path.includes('g_252')) {
        navigate(path.startsWith('/machine-checksheet') ? '/machine-checksheet/g252' : '/g252');
      } else if (path.includes('g253') || path.includes('g_253')) {
        navigate(path.startsWith('/machine-checksheet') ? '/machine-checksheet/g253' : '/g253');
      } else if (/\/ja[mn](\/|$)/.test(path)) {
        navigate(path.startsWith('/machine-checksheet') ? '/machine-checksheet/jam' : '/jam');
      } else if (path.includes('trd301')) {
        navigate(path.startsWith('/machine-checksheet') ? '/machine-checksheet/trd301' : '/trd301');
      } else if (path.includes('alpha355')) {
        navigate(path.startsWith('/machine-checksheet') ? '/machine-checksheet/alpha355' : '/alpha355');
      } else {
        navigate(path.startsWith('/machine-checksheet') ? '/machine-checksheet/trd411f' : '/trd411f');
      }
    }
  };

  // Helper matching checksheet name or id
  const isMatch = (targetName, targetId) => {
    return decodedChecksheetId === targetName || decodedChecksheetId === targetId;
  };

  const isObservationMatch = () => {
    const lower = (decodedChecksheetId || '').toLowerCase();
    return (
      lower.includes('observation') ||
      lower === 'obs' ||
      lower === 'pm_observation'
    );
  };

  const isPmMatch = () => {
    return isMatch('Machine PM checksheet', 'pm');
  };

  // Resistance Welding checksheets
  if (isResistanceWelding) {
    if (isMatch('Machine 5S checksheet', '5s') || decodedChecksheetId.toLowerCase().includes('5s')) {
      return (
        <ResistanceWeldingFiveS
          key={`${selectedMachine.name}_5s`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (isMatch('Machine Daily checksheet', 'daily') || decodedChecksheetId.toLowerCase().includes('daily')) {
      return (
        <ResistanceWeldingDaily
          key={`${selectedMachine.name}_daily`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (isMatch('Machine Instrument checksheet', 'instrument') || decodedChecksheetId.toLowerCase().includes('instrument')) {
      return (
        <ResistanceWeldingInstrument
          key={`${selectedMachine.name}_instrument`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (
      isMatch('Inspection report', 'inspection_report') ||
      isMatch('Machine Pokayoke checksheet', 'pokayoke') ||
      decodedChecksheetId.toLowerCase().includes('inspection')
    ) {
      return (
        <ResistanceWeldingInspectionReport
          key={`${selectedMachine.name}_inspection`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (isMatch('Machine PM checksheet', 'pm') || decodedChecksheetId.toLowerCase().includes('pm')) {
      return (
        <ResistanceWeldingPM
          key={`${selectedMachine.name}_pm`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (
      isMatch('Predictive Maintenance checksheet', 'predictive') ||
      isMatch('Predictive Maintainance checksheet', 'predictive_maintenance') ||
      decodedChecksheetId.toLowerCase().includes('predictive')
    ) {
      return (
        <PredictiveMaintainanceChecksheet
          key={`${selectedMachine.name}_predictive`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    return (
      <ResistanceWeldingBlankSheet
        key={`${selectedMachine.name}_${decodedChecksheetId}`}
        machine={selectedMachine}
        checksheetName={decodedChecksheetId}
        onClose={handleClose}
      />
    );
  }

  // Manual Crimping (MCR) checksheets
  if (isManualCrimping) {
    if (isMatch('Machine 5S checksheet', '5s') || decodedChecksheetId.toLowerCase().includes('5s')) {
      return (
        <McrFiveS
          key={`${selectedMachine.name}_5s`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (
      isMatch('Inspection format checksheet', 'inspection_format') ||
      isMatch('Inspection report', 'inspection_report') ||
      decodedChecksheetId.toLowerCase().includes('inspection')
    ) {
      return (
        <McrInspectionReport
          key={`${selectedMachine.name}_inspection`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (
      isMatch('Machine Instrument checksheet', 'instrument') ||
      decodedChecksheetId.toLowerCase().includes('instrument')
    ) {
      return (
        <McrInstrument
          key={`${selectedMachine.name}_instrument`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (
      isMatch('Mecal-05 Daily Checksheet', 'mecal_daily') ||
      decodedChecksheetId.toLowerCase().includes('mecal')
    ) {
      return (
        <Mecal05DailyChecksheet
          key={`${selectedMachine.name}_mecal_daily`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (
      isMatch('Machine Daily checksheet', 'daily') ||
      decodedChecksheetId.toLowerCase().includes('daily')
    ) {
      return (
        <McrDaily
          key={`${selectedMachine.name}_daily`}
          machine={selectedMachine}
          onClose={handleClose}
        />
      );
    }
    if (
      isMatch('Monthly and Periodic Preventive Checksheet', 'preventive_pm') ||
      decodedChecksheetId.toLowerCase().includes('preventive') ||
      decodedChecksheetId.toLowerCase().includes('periodic')
    ) {
      return (
        <McrMachinePm
          key={`${selectedMachine.name}_preventive_pm`}
          machine={selectedMachine}
          onClose={handleClose}
          onSwitchToObservation={() =>
            navigate(`/machine-checksheet/${currentUnit}/${currentOpUnit}/${selectedMachine.name}/Observation%20Checksheet`)
          }
        />
      );
    }
    if (
      isMatch('Machine PM checksheet', 'pm') ||
      decodedChecksheetId.toLowerCase().includes('pm') ||
      isObservationMatch()
    ) {
      return (
        <AutoCrimpingPmContainer
          key={`${selectedMachine.name}_pm_obs`}
          machine={selectedMachine}
          modelName={modelName}
          initialTab={isObservationMatch() ? 'observation' : 'pm'}
          onClose={handleClose}
        />
      );
    }
  }

  // 1. Operator & Machine Summary
  if (isMatch('Operator & Machine Summary', 'op_machine_summary')) {
    return (
      <OperatorMachineSummary
        machine={selectedMachine}
        activeTab="Auto Crimping"
        activeSession={activeSession}
        onClose={handleClose}
      />
    );
  }

  // 2. C&C process production status summary
  if (isMatch('C&C process production status summary', 'cc_summary')) {
    return (
      <CcProcessProductionSummary
        machine={selectedMachine}
        activeSession={activeSession}
        onClose={handleClose}
      />
    );
  }

  // 3. Machine Breakdown Summary
  if (isMatch('Machine Breakdown Summary', 'breakdown_summary')) {
    return (
      <BreakdownSummary
        machine={selectedMachine}
        activeSession={activeSession}
        onClose={handleClose}
      />
    );
  }

  // Autocrimping PM & Observation Checksheet Container (for all Autocrimping machines)
  if (isPmMatch() || isObservationMatch()) {
    return (
      <AutoCrimpingPmContainer
        key={`${selectedMachine.name}_pm_obs`}
        machine={selectedMachine}
        modelName={modelName}
        initialTab={isObservationMatch() ? 'observation' : 'pm'}
        onClose={handleClose}
      />
    );
  }

  // 4. Alpha_355 model checksheets
  if (modelName === 'Alpha_355') {
    if (isMatch('Machine 5S checksheet', '5s')) {
      return <Alpha355FiveS key={`${selectedMachine.name}_5s`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Daily checksheet', 'daily')) {
      return <Alpha355Daily key={`${selectedMachine.name}_daily`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Instrument checksheet', 'instrument')) {
      return <Alpha355Instrument key={`${selectedMachine.name}_inst`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Pokayoke checksheet', 'pokayoke')) {
      return <Alpha355Pokayoke key={`${selectedMachine.name}_poka`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Inspection report', 'inspection_report')) {
      return <Alpha355InspectionReport key={`${selectedMachine.name}_ir`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine PM checksheet', 'pm')) {
      return <Alpha355MachinePm key={`${selectedMachine.name}_pm`} machine={selectedMachine} onClose={handleClose} />;
    }
  }

  // 5. TRD_301 model checksheets
  if (modelName === 'TRD_301') {
    if (isMatch('Machine 5S checksheet', '5s')) {
      return <Trd301FiveS key={`${selectedMachine.name}_5s`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Daily checksheet', 'daily')) {
      return <Trd301Daily key={`${selectedMachine.name}_daily`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Instrument checksheet', 'instrument')) {
      return <Trd301Instrument key={`${selectedMachine.name}_inst`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Pokayoke checksheet', 'pokayoke')) {
      return <Trd301Pokayoke key={`${selectedMachine.name}_poka`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Inspection report', 'inspection_report')) {
      return <Trd301InspectionReport key={`${selectedMachine.name}_ir`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine PM checksheet', 'pm')) {
      return <Trd301MachinePm key={`${selectedMachine.name}_pm`} machine={selectedMachine} onClose={handleClose} />;
    }
  }

  // 6. TRD_411F model checksheets
  if (modelName === 'TRD_411F' || modelName === 'TRD411F') {
    if (isMatch('Machine 5S checksheet', '5s')) {
      return <Trd411fFiveS key={`${selectedMachine.name}_5s`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Daily checksheet', 'daily')) {
      return <Trd411fDaily key={`${selectedMachine.name}_daily`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Instrument checksheet', 'instrument')) {
      return <Trd411fInstrument key={`${selectedMachine.name}_inst`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Pokayoke checksheet', 'pokayoke')) {
      return <Trd411fPokayoke key={`${selectedMachine.name}_poka`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Inspection report', 'inspection_report')) {
      return <Trd411fInspectionReport key={`${selectedMachine.name}_ir`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine PM checksheet', 'pm')) {
      return <Trd411fMachinePm key={`${selectedMachine.name}_pm`} machine={selectedMachine} onClose={handleClose} />;
    }
  }

  // 7. G448 model checksheets
  if (modelName === 'G448' || modelName === 'G_448') {
    if (isMatch('Machine 5S checksheet', '5s')) {
      return <G448FiveS key={`${selectedMachine.name}_5s`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Daily checksheet', 'daily')) {
      return <G448Daily key={`${selectedMachine.name}_daily`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Instrument checksheet', 'instrument')) {
      return <G448Instrument key={`${selectedMachine.name}_inst`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Pokayoke checksheet', 'pokayoke')) {
      return <G448Pokayoke key={`${selectedMachine.name}_poka`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Inspection report', 'inspection_report')) {
      return <G448InspectionReport key={`${selectedMachine.name}_ir`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine PM checksheet', 'pm')) {
      return <G448MachinePm key={`${selectedMachine.name}_pm`} machine={selectedMachine} onClose={handleClose} />;
    }
  }

  // 8. G252 model checksheets
  if (modelName === 'G252' || modelName === 'G_252') {
    if (isMatch('Machine 5S checksheet', '5s')) {
      return <G252FiveS key={`${selectedMachine.name}_5s`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Daily checksheet', 'daily')) {
      return <G252Daily key={`${selectedMachine.name}_daily`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Instrument checksheet', 'instrument')) {
      return <G252Instrument key={`${selectedMachine.name}_inst`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Pokayoke checksheet', 'pokayoke')) {
      return <G252Pokayoke key={`${selectedMachine.name}_poka`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Inspection report', 'inspection_report')) {
      return <G252InspectionReport key={`${selectedMachine.name}_ir`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine PM checksheet', 'pm')) {
      return <G252MachinePm key={`${selectedMachine.name}_pm`} machine={selectedMachine} onClose={handleClose} />;
    }
  }

  // 9. G253 model checksheets
  if (modelName === 'G253' || modelName === 'G_253') {
    if (isMatch('Machine 5S checksheet', '5s')) {
      return <G253FiveS key={`${selectedMachine.name}_5s`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Daily checksheet', 'daily')) {
      return <G253Daily key={`${selectedMachine.name}_daily`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Instrument checksheet', 'instrument')) {
      return <G253Instrument key={`${selectedMachine.name}_inst`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Pokayoke checksheet', 'pokayoke')) {
      return <G253Pokayoke key={`${selectedMachine.name}_poka`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Inspection report', 'inspection_report')) {
      return <G253InspectionReport key={`${selectedMachine.name}_ir`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine PM checksheet', 'pm')) {
      return <G253MachinePm key={`${selectedMachine.name}_pm`} machine={selectedMachine} onClose={handleClose} />;
    }
  }

  // 10. JAM model checksheets
  if (modelName === 'JAM' || modelName === 'JAN') {
    if (isMatch('Machine 5S checksheet', '5s')) {
      return <JamFiveS key={`${selectedMachine.name}_5s`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Daily checksheet', 'daily')) {
      return <JamDaily key={`${selectedMachine.name}_daily`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Instrument checksheet', 'instrument')) {
      return <JamInstrument key={`${selectedMachine.name}_inst`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine Pokayoke checksheet', 'pokayoke')) {
      return <JamPokayoke key={`${selectedMachine.name}_poka`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Inspection report', 'inspection_report')) {
      return <JamInspectionReport key={`${selectedMachine.name}_ir`} machine={selectedMachine} onClose={handleClose} />;
    }
    if (isMatch('Machine PM checksheet', 'pm')) {
      return <JamMachinePm key={`${selectedMachine.name}_pm`} machine={selectedMachine} onClose={handleClose} />;
    }
  }

  // 11. Other models or unconfigured checksheets: show ChecksheetNotAdded UI!
  return (
    <ChecksheetNotAdded
      machine={selectedMachine}
      checksheetName={decodedChecksheetId}
      onClose={handleClose}
    />
  );
}
