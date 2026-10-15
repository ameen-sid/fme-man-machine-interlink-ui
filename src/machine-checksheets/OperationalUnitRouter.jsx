import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import CnCLayout from './units/c&c/c&cLayout';
import AssemblyLayout from './units/assembly/assemblyLayout';
import SrcLayout from './units/src/srcLayout';

export default function OperationalUnitRouter() {
  const { operationalUnit, unit } = useParams();
  const normalized = operationalUnit ? operationalUnit.toUpperCase() : '';

  if (normalized === 'CNC' || normalized === 'C&C') {
    return <CnCLayout />;
  }

  if (normalized === 'ASSEMBLY') {
    return <AssemblyLayout />;
  }

  if (normalized === 'SRC') {
    return <SrcLayout />;
  }

  return <Navigate to={`/machine-checksheet/${unit || 'Bawal'}`} replace />;
}
