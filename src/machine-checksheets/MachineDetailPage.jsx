import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import OperationalChecksheets from './shared/OperationalChecksheets';
import { getMachineModel } from '../utils/machineModels';
import { useAuth } from '../context/AuthContext';

export default function MachineDetailPage() {
  const { unit, operationalUnit, machineId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeSession, logout } = useAuth();

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

  // Parse machine id number & model
  const cleanId = rawMachineId.trim().toUpperCase().replace(/[-_\s]/g, '');
  let idNum = 1;
  let modelName = '';
  let machineName = '';

  if (rawMachineId.startsWith('C&C')) {
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

  const handleSelectChecksheet = (csName) => {
    navigate(`/machine-checksheet/${currentUnit}/${currentOpUnit}/${encodeURIComponent(machineName)}/${encodeURIComponent(csName)}`);
  };

  const handleBack = () => {
    navigate(`/machine-checksheet/${currentUnit}/${currentOpUnit}`);
  };

  const handleLogout = () => {
    logout();
    navigate(`/machine-checksheet/${currentUnit}/${currentOpUnit}`);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <OperationalChecksheets
        selectedMachine={selectedMachine}
        machineModel={modelName}
        activeTab="Auto Crimping"
        selectedUnitLocation={currentUnit}
        activeSession={activeSession}
        onSelectChecksheet={handleSelectChecksheet}
        onLogout={handleLogout}
        onBack={handleBack}
      />
    </div>
  );
}
