import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProcessFilters, { CNC_PROCESSES } from './processFilters';
import GujratEmptyCncPage from './GujratEmptyCncPage';
import { useAuth } from '../../../context/AuthContext';

// Filter views managed in dedicated folders
import AutoCrimpingView from './autoCrimping';
import ManualCrimpingView from './manualCrimping';
import JointCrimpingView from './jointCrimping';
import ResistanceWeldingView from './resistanceWelding';
import TwistingView from './twisting';
import BlueTapingView from './blueTaping';
import HeadSinkingView from './headSinking';

const PROCESS_VIEWS = {
  'Auto Crimping': AutoCrimpingView,
  'Manual Crimping': ManualCrimpingView,
  'Joint Crimping': JointCrimpingView,
  'Registance Welding': ResistanceWeldingView,
  'Twisting': TwistingView,
  'Blue Taping': BlueTapingView,
  'Head Sinking': HeadSinkingView
};

export default function CnCLayout() {
  const { unit } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { requestAuth } = useAuth();
  const [activeProcess, setActiveProcess] = useState(
    location.state?.activeProcess || 'Auto Crimping'
  );
  const currentUnit = unit || 'Bawal';
  const isGujrat = currentUnit.toLowerCase() === 'gujrat';

  if (isGujrat) {
    return <GujratEmptyCncPage />;
  }

  const handleMachineSelect = (machine) => {
    requestAuth(machine, () => {
      const machineSlug = machine.name.includes('/')
        ? machine.name.replace(/\//g, '-')
        : machine.name;
      navigate(`/machine-checksheet/${currentUnit}/CNC/${machineSlug}`);
    });
  };

  const ActiveProcessView = PROCESS_VIEWS[activeProcess] || AutoCrimpingView;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Breadcrumb & Back Bar */}
      <div className="flex flex-wrap items-center justify-between bg-white p-3 px-4 rounded-2xl border border-slate-200 shadow-sm gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold cursor-pointer hover:bg-blue-100 transition-all shadow-sm"
          onClick={() => navigate(`/machine-checksheet/${currentUnit}`)}
          title="Back to Operational Units"
        >
          <ArrowLeft size={16} />
          <span>Back to Sections</span>
        </button>

        <div className="flex items-center gap-2 bg-slate-100 py-1.5 px-3.5 rounded-full text-xs font-medium flex-wrap">
          <button
            type="button"
            className="text-slate-500 font-semibold hover:text-blue-600 bg-transparent border-none p-0 cursor-pointer"
            onClick={() => navigate('/machine-checksheet')}
            title="Change Unit"
          >
            {currentUnit} Unit
          </button>
          <span className="text-slate-400">/</span>
          <span className="text-blue-600 font-bold">CNC Section</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-bold">{activeProcess}</span>
        </div>
      </div>

      {/* Process Filter Tabs */}
      <ProcessFilters
        activeProcess={activeProcess}
        onSelectProcess={setActiveProcess}
      />

      {/* Content based on Active Process Folder Component */}
      <ActiveProcessView
        selectedUnitLocation={currentUnit}
        onSelectMachine={handleMachineSelect}
      />
    </div>
  );
}
