import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './MainLayout';
import OperationsDashboard from './dashboard/OperationsDashboard';
import UnitSelectionPage from './machine-checksheets/UnitSelectionPage';
import OperationalUnitSelectionPage from './machine-checksheets/OperationalUnitSelectionPage';
import OperationalUnitRouter from './machine-checksheets/OperationalUnitRouter';
import MachineDetailPage from './machine-checksheets/MachineDetailPage';
import ChecksheetDetailPage from './machine-checksheets/ChecksheetDetailPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Default redirect to Dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard Route */}
            <Route path="dashboard" element={<OperationsDashboard />} />

            {/* Machine Checksheets Nested Routes */}
            <Route path="machine-checksheet">
              {/* 1. Select Unit */}
              <Route index element={<UnitSelectionPage />} />

              {/* 2. Select Operational Unit */}
              <Route path=":unit" element={<OperationalUnitSelectionPage />} />

              {/* 3. Operational Section View (CNC, Assembly, SRC) with filters */}
              <Route path=":unit/:operationalUnit" element={<OperationalUnitRouter />} />

              {/* 4. Selected Machine Checksheets Menu */}
              <Route path=":unit/:operationalUnit/:machineId" element={<MachineDetailPage />} />

              {/* 5. Selected Specific Checksheet Full View */}
              <Route path=":unit/:operationalUnit/:machineId/:checksheetId" element={<ChecksheetDetailPage />} />

              {/* Direct shorthand machine routes */}
              <Route path="trd411f" element={<MachineDetailPage />} />
              <Route path="trd411f/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="trd301" element={<MachineDetailPage />} />
              <Route path="trd301/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="alpha355" element={<MachineDetailPage />} />
              <Route path="alpha355/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="g448" element={<MachineDetailPage />} />
              <Route path="g448/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="g_448" element={<MachineDetailPage />} />
              <Route path="g_448/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="g252" element={<MachineDetailPage />} />
              <Route path="g252/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="g_252" element={<MachineDetailPage />} />
              <Route path="g_252/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="g253" element={<MachineDetailPage />} />
              <Route path="g253/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="g_253" element={<MachineDetailPage />} />
              <Route path="g_253/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="jam" element={<MachineDetailPage />} />
              <Route path="jam/:checksheetId" element={<ChecksheetDetailPage />} />
              <Route path="jan" element={<Navigate to="/machine-checksheet/jam" replace />} />
            </Route>

            {/* Direct top-level shorthand routes */}
            <Route path="trd411f" element={<MachineDetailPage />} />
            <Route path="trd411f/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="trd301" element={<MachineDetailPage />} />
            <Route path="trd301/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="alpha355" element={<MachineDetailPage />} />
            <Route path="alpha355/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="g448" element={<MachineDetailPage />} />
            <Route path="g448/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="g_448" element={<MachineDetailPage />} />
            <Route path="g_448/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="g252" element={<MachineDetailPage />} />
            <Route path="g252/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="g_252" element={<MachineDetailPage />} />
            <Route path="g_252/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="g253" element={<MachineDetailPage />} />
            <Route path="g253/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="g_253" element={<MachineDetailPage />} />
            <Route path="g_253/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="jam" element={<MachineDetailPage />} />
            <Route path="jam/:checksheetId" element={<ChecksheetDetailPage />} />
            <Route path="jan" element={<Navigate to="/jam" replace />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
