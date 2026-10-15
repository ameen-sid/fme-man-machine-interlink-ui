import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProcessFilters, { CNC_PROCESSES } from './processFilters';
import MachineList from './machineList';
import GujratEmptyCncPage from './GujratEmptyCncPage';
import { useAuth } from '../../../context/AuthContext';

export default function CnCLayout() {
  const { unit } = useParams();
  const navigate = useNavigate();
  const { requestAuth } = useAuth();
  const [activeProcess, setActiveProcess] = useState('Auto Crimping');
  const currentUnit = unit || 'Bawal';
  const isGujrat = currentUnit.toLowerCase() === 'gujrat';

  if (isGujrat) {
    return <GujratEmptyCncPage />;
  }

  const handleMachineSelect = (machine) => {
    requestAuth(machine, () => {
      navigate(`/machine-checksheet/${currentUnit}/CNC/${machine.name}`);
    });
  };

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

      {/* Content based on Active Process */}
      {activeProcess === 'Auto Crimping' ? (
        <MachineList
          selectedUnitLocation={currentUnit}
          onSelectMachine={handleMachineSelect}
        />
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50/80 py-1.5 px-3.5 rounded-full w-max">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>{currentUnit} Unit</span>
              <span className="text-blue-300">•</span>
              <span>CNC Section</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0">
              {activeProcess}
            </h2>
            <p className="text-sm text-slate-500 m-0 max-w-3xl leading-relaxed">
              Machine Checksheet parameters, real-time inspection criteria and operational logs for{' '}
              <strong className="text-slate-700 font-semibold">{activeProcess}</strong> in CNC Section ({currentUnit} Plant).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
