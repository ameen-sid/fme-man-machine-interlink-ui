import React from 'react';
import AutoCrimpingView from './autoCrimping';
import ResistanceWeldingView from './resistanceWelding';

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

  return (
    <AutoCrimpingView
      selectedUnitLocation={selectedUnitLocation}
      onSelectMachine={onSelectMachine}
    />
  );
}
