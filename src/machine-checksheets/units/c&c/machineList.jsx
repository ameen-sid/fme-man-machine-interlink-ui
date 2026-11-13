import React from 'react';
import AutoCrimpingView from './autoCrimping';
import ResistanceWeldingView from './resistanceWelding';
import ManualCrimpingView from './manualCrimping';
import JointCrimpingView from './jointCrimping';

export default function MachineList({
  activeProcess = 'Auto Crimping',
  selectedUnitLocation = 'Bawal',
  onSelectMachine
}) {
  if (activeProcess === 'Resistance Welding') {
    return (
      <ResistanceWeldingView
        selectedUnitLocation={selectedUnitLocation}
        onSelectMachine={onSelectMachine}
      />
    );
  }

  if (activeProcess === 'Manual Crimping') {
    return (
      <ManualCrimpingView
        selectedUnitLocation={selectedUnitLocation}
        onSelectMachine={onSelectMachine}
      />
    );
  }

  if (activeProcess === 'Joint Crimping') {
    return (
      <JointCrimpingView
        selectedUnitLocation={selectedUnitLocation}
        onSelectMachine={onSelectMachine}
      />
    );
  }

  return (
    <AutoCrimpingView
      selectedUnitLocation={selectedUnitLocation}
      onSelectMachine={onSelectMachine}
    />
  );
}
