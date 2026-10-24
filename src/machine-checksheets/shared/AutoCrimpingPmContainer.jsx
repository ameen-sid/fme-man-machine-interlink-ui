import React, { useState } from 'react';
import ObservationChecksheet from './ObservationChecksheet';

// Model-specific PM checksheets
import Alpha355MachinePm from '../units/c&c/autoCrimping/alpha355/MachinePmChecksheet';
import Trd301MachinePm from '../units/c&c/autoCrimping/trd301/MachinePmChecksheet';
import Trd411fMachinePm from '../units/c&c/autoCrimping/trd411f/MachinePmChecksheet';
import G448MachinePm from '../units/c&c/autoCrimping/g448/MachinePmChecksheet';
import G252MachinePm from '../units/c&c/autoCrimping/g252/MachinePmChecksheet';
import G253MachinePm from '../units/c&c/autoCrimping/g253/MachinePmChecksheet';
import JamMachinePm from '../units/c&c/autoCrimping/jam/MachinePmChecksheet';
import McrMachinePm from '../units/c&c/manualCrimping/mcr/MachinePmChecksheet';

/**
 * Reusable container for all Autocrimping machines to switch seamlessly between:
 * - PM Checksheet (model-specific)
 * - Observation Checksheet (shared standard)
 */
export default function AutoCrimpingPmContainer({
  machine,
  modelName,
  initialTab = 'pm', // 'pm' | 'observation'
  onClose
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderPmChecksheet = () => {
    const commonProps = {
      machine,
      onClose,
      onSwitchToObservation: () => setActiveTab('observation')
    };

    const cleanModel = (modelName || machine?.model || '').toUpperCase().replace(/[-_\s]/g, '');

    if (cleanModel.includes('ALPHA355')) {
      return <Alpha355MachinePm key={`${machine?.name}_pm`} {...commonProps} />;
    }
    if (cleanModel.includes('TRD301')) {
      return <Trd301MachinePm key={`${machine?.name}_pm`} {...commonProps} />;
    }
    if (cleanModel.includes('TRD411F') || cleanModel.includes('TRD411')) {
      return <Trd411fMachinePm key={`${machine?.name}_pm`} {...commonProps} />;
    }
    if (cleanModel.includes('G448')) {
      return <G448MachinePm key={`${machine?.name}_pm`} {...commonProps} />;
    }
    if (cleanModel.includes('G252')) {
      return <G252MachinePm key={`${machine?.name}_pm`} {...commonProps} />;
    }
    if (cleanModel.includes('G253')) {
      return <G253MachinePm key={`${machine?.name}_pm`} {...commonProps} />;
    }
    if (cleanModel.includes('JAM') || cleanModel.includes('JAN')) {
      return <JamMachinePm key={`${machine?.name}_pm`} {...commonProps} />;
    }
    if (cleanModel.includes('MCR') || cleanModel.includes('MECAL')) {
      return <McrMachinePm key={`${machine?.name}_pm`} {...commonProps} />;
    }

    // Default fallback to TRD411F PM
    return <Trd411fMachinePm key={`${machine?.name}_pm`} {...commonProps} />;
  };

  if (activeTab === 'observation') {
    return (
      <ObservationChecksheet
        key={`${machine?.name}_obs`}
        machine={machine}
        onClose={onClose}
        onSwitchToPm={() => setActiveTab('pm')}
      />
    );
  }

  return renderPmChecksheet();
}
