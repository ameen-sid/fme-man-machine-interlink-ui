export default function SrcOverview({ selectedUnitLocation = 'Bawal', selectedSubDept = 'SRC' }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-50/80 py-1.5 px-3.5 rounded-full w-max">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span>{selectedUnitLocation} Unit</span>
          <span className="text-purple-300">•</span>
          <span>{selectedSubDept} Section</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0">
          SRC Inspection & Quality
        </h2>
        <p className="text-sm text-slate-500 m-0 max-w-3xl leading-relaxed">
          Machine Checksheet parameters, secondary retention clip audit criteria and operational logs for{' '}
          <strong className="text-slate-700 font-semibold">SRC Quality Section</strong> in{' '}
          {selectedSubDept} Section ({selectedUnitLocation} Plant).
        </p>
      </div>
    </div>
  );
}