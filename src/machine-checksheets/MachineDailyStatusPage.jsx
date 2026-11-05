import React, { useState } from 'react';
import { SHIFT_A_DATA_FULL, SHIFT_B_DATA_FULL } from './detailedTelemetryData';
import { Printer, Download, Search, Filter, Calendar, Layers, Table as TableIcon } from 'lucide-react';

// Exact consolidated daily summary data matching screenshot media_1793858680880_84a5f25e.png
export const DAILY_SUMMARY_ROWS = [
  { no: 'C&C-1', name: '(ALPHA-355)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '13.7', plannedStop: '0', goodOutput: '27,050', ability: '1,258' },
  { no: 'C&C-2', name: '(GAMMA-253)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '7.8', plannedStop: '0', goodOutput: '25,950', ability: '1,207' },
  { no: 'C&C-3', name: '(ALPHA-355)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '11.1', plannedStop: '0', goodOutput: '27,600', ability: '1,284' },
  { no: 'C&C-4', name: '(GAMMA-253)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '9.1', plannedStop: '0', goodOutput: '26,900', ability: '1,251' },
  { no: 'C&C-5', name: '(TRD-301)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '8.7', plannedStop: '0', goodOutput: '23,700', ability: '1,102' },
  { no: 'C&C-6', name: '(TRD-301)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '65', prodTime: '1225', hourMeter: '8.5', plannedStop: '0', goodOutput: '28,100', ability: '1,307' },
  { no: 'C&C-7', name: '(TRD-301)', plant: 'Plant-01', workingTime: '17.0', breakTime: '100', maintenance: '0', prodTime: '920', hourMeter: '8.8', plannedStop: '0', goodOutput: '20,300', ability: '1,324' },
  { no: 'C&C-8', name: '(TRD-301)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '8.8', plannedStop: '0', goodOutput: '27,650', ability: '1,286' },
  { no: 'C&C-9', name: '(TRD-301)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '9.0', plannedStop: '0', goodOutput: '26,850', ability: '1,249' },
  { no: 'C&C-10', name: '(TRD-301)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '13.6', plannedStop: '0', goodOutput: '29,250', ability: '1,360' },
  { no: 'C&C-11', name: '(GAMMA-253)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '7.9', plannedStop: '0', goodOutput: '22,750', ability: '1,058' },
  { no: 'C&C-12', name: '(GAMMA-253)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '70', prodTime: '1220', hourMeter: '12.6', plannedStop: '0', goodOutput: '28,300', ability: '1,316' },
  { no: 'C&C-14', name: '(TRD-411F)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '10.4', plannedStop: '0', goodOutput: '26,750', ability: '1,244' },
  { no: 'C&C-15', name: '(GAMMA-253)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '9.8', plannedStop: '0', goodOutput: '24,800', ability: '1,153' },
  { no: 'C&C-16', name: '(GAMMA-253)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '11.5', plannedStop: '0', goodOutput: '23,150', ability: '1,077' },
  { no: 'C&C-17', name: '(GAMMA-253)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '45', prodTime: '1245', hourMeter: '10.7', plannedStop: '0', goodOutput: '27,050', ability: '1,258' },
  { no: 'C&C-18', name: '(GAMMA-253)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '9.4', plannedStop: '0', goodOutput: '24,400', ability: '1,135' },
  { no: 'C&C-19', name: '(TRD-411F)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '10.9', plannedStop: '0', goodOutput: '29,350', ability: '1,365' },
  { no: 'C&C-20', name: '(GAMMA-252)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '106', prodTime: '1184', hourMeter: '8.8', plannedStop: '0', goodOutput: '23,250', ability: '1,081' },
  { no: 'C&C-21', name: '(GAMMA-252)', plant: 'Plant-01', workingTime: '17.0', breakTime: '100', maintenance: '0', prodTime: '920', hourMeter: '6.8', plannedStop: '0', goodOutput: '17,650', ability: '1,151' },
  { no: 'C&C-22', name: '(GAMMA-252)', plant: 'Plant-01', workingTime: '15.0', breakTime: '70', maintenance: '0', prodTime: '830', hourMeter: '5.5', plannedStop: '0', goodOutput: '15,800', ability: '1,142' },
  { no: 'C&C-23', name: '(TRD-411F)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '9.2', plannedStop: '0', goodOutput: '28,950', ability: '1,347' },
  { no: 'C&C-24', name: '(TRD-411F)', plant: 'Plant-01', workingTime: '17.0', breakTime: '100', maintenance: '30', prodTime: '890', hourMeter: '5.4', plannedStop: '0', goodOutput: '20,350', ability: '1,327' },
  { no: 'C&C-25', name: 'JAM', plant: 'Plant-01', workingTime: '0.0', breakTime: '0', maintenance: '0', prodTime: '0', hourMeter: '0.0', plannedStop: '0', goodOutput: '0', ability: '0' },
  { no: 'C&C-26', name: '(GAMMA-448)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '11.6', plannedStop: '0', goodOutput: '45,750', ability: '2,128' },
  { no: 'C&C-27', name: '(GAMMA-448)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '11.4', plannedStop: '0', goodOutput: '45,450', ability: '2,114' },
  { no: 'C&C-28', name: '(GAMMA-448)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '7.5', plannedStop: '0', goodOutput: '41,950', ability: '1,951' },
  { no: 'C&C-29', name: '(TRD-411F)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '11.3', plannedStop: '0', goodOutput: '38,500', ability: '1,791' },
  { no: 'C&C-30', name: '(GAMMA-448)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '11.5', plannedStop: '0', goodOutput: '45,650', ability: '2,123' },
  { no: 'C&C-31', name: '(GAMMA-448)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '9.3', plannedStop: '0', goodOutput: '45,750', ability: '2,128' },
  { no: 'C&C-32', name: '(GAMMA-448)', plant: 'Plant-01', workingTime: '23.5', breakTime: '120', maintenance: '0', prodTime: '1290', hourMeter: '11.6', plannedStop: '0', goodOutput: '41,150', ability: '1,914' }
];

export const DAILY_SUMMARY_OVERALL = {
  workingTime: '677.0',
  breakTime: '3490.0',
  maintenance: '316.0',
  prodTime: '36814.0',
  hourMeter: '292.2',
  plannedStop: '0.0',
  goodOutput: '880100.0',
  ability: '1,422'
};

export default function MachineDailyStatusPage() {
  const [activeShift, setActiveShift] = useState('ALL'); // 'ALL' | 'A' | 'B' | 'SUMMARY'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-11-05');

  // Filter telemetry rows based on shift & search
  const telemetryData = [...SHIFT_A_DATA_FULL, ...SHIFT_B_DATA_FULL].filter(row => {
    if (activeShift === 'A' && row.shift !== 'A') return false;
    if (activeShift === 'B' && row.shift !== 'B') return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return row.machineNo.toLowerCase().includes(q) || row.machineName.toLowerCase().includes(q);
    }
    return true;
  });

  // Filter daily summary rows
  const filteredSummaryRows = DAILY_SUMMARY_ROWS.filter(row => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return row.no.toLowerCase().includes(q) || row.name.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-3 sm:p-5 font-sans">
      {/* Scoped CSS to enforce solid black borders & opaque sticky headers (no transparency/bleed) */}
      <style>{`
        .checksheet-table {
          border-collapse: separate !important;
          border-spacing: 0 !important;
        }
        .checksheet-table th,
        .checksheet-table td {
          border-right: 1px solid #000000 !important;
          border-bottom: 1px solid #000000 !important;
          border-left: none !important;
          border-top: none !important;
          background-clip: padding-box;
        }
        .checksheet-table th:first-child,
        .checksheet-table td:first-child {
          border-left: 1px solid #000000 !important;
        }
        .checksheet-table thead tr:first-child th {
          border-top: 1px solid #000000 !important;
          position: sticky;
          top: 0;
          z-index: 35;
        }
        .checksheet-table thead tr:nth-child(2) th {
          border-top: 1px solid #000000 !important;
          position: sticky;
          top: 22px;
          z-index: 30;
        }
        .checksheet-table thead tr:nth-child(3) th {
          border-top: 1px solid #000000 !important;
          position: sticky;
          top: 42px;
          z-index: 25;
        }
        .summary-sheet-table {
          border-collapse: separate !important;
          border-spacing: 0 !important;
        }
        .summary-sheet-table th,
        .summary-sheet-table td {
          border-right: 1px solid #000000 !important;
          border-bottom: 1px solid #000000 !important;
          border-left: none !important;
          border-top: none !important;
          background-clip: padding-box;
        }
        .summary-sheet-table th:first-child,
        .summary-sheet-table td:first-child {
          border-left: 1px solid #000000 !important;
        }
        .summary-sheet-table thead tr:first-child th {
          border-top: 1px solid #000000 !important;
        }
        .summary-sheet-table .plant-col-divider {
          border-right: 2.5px solid #000000 !important;
        }
      `}</style>
      {/* Top Controls & Navigation Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Machine Daily Summary & Status Checksheet</h1>
            </div>
          </div>


        </div>
      </div>

      {/* SECTION 1: DETAILED 45-COLUMN TELEMETRY CHECKSHEET (Visible in ALL, A, B) */}
      {activeShift !== 'SUMMARY' && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-300 mb-6 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-300 px-4 py-2 flex items-center justify-between">
            <h2 className="text-sm font-bold italic tracking-wide text-slate-800">
              C&C process production status summary
            </h2>
            <span className="text-[11px] text-slate-500">
              Showing {telemetryData.length} machine shift records • Full 45-parameter checksheet
            </span>
          </div>

          <div className="overflow-x-auto max-h-[620px] overflow-y-auto border border-black">
            <table className="checksheet-table text-[11px] font-sans whitespace-nowrap min-w-full">
              {/* Category Top Banner Row */}
              <thead>
                {/* Row 1: Top Category Banner Row */}
                <tr className="text-center font-bold text-[10px] text-black h-[22px]">
                  <th className="bg-[#cfe2f3] py-0.5">QR</th>
                  <th className="bg-[#cfe2f3] py-0.5">QR</th>
                  <th colSpan={2} className="bg-[#ffc000] py-0.5 text-[9.5px]">設備稼働シート</th>
                  <th className="bg-[#ffc000] py-0.5 text-[9.5px]">設備稼働シート</th>
                  <th className="bg-[#cfe2f3] py-0.5">QR</th>
                  <th colSpan={2} className="bg-[#ffc000] py-0.5 text-[9.5px]">実績報告シート</th>
                  <th className="bg-[#cfe2f3] py-0.5">QR</th>
                  <th className="bg-[#cfe2f3] py-0.5">QR</th>
                  <th className="bg-[#ffc000] py-0.5 text-[9.5px]">稼働報告シート</th>
                  <th className="bg-[#ffc000] py-0.5 text-[9.5px]">実績報告シート</th>
                  <th className="bg-[#ffc000] py-0.5 text-[9.5px]">稼働報告シート</th>
                  <th className="bg-[#ff0000] text-white py-0.5 text-[9.5px] font-bold">アワーメーター</th>
                  <th className="bg-[#00b0f0] text-white py-0.5 text-[9.5px] font-bold">計画停止</th>
                  <th className="bg-[#ffc000] py-0.5 text-[9.5px]">稼働報告シート</th>
                  <th className="bg-[#ffff00] py-0.5 text-[9.5px]">計算</th>
                  <th className="bg-[#ffff00] py-0.5 text-[9.5px]">計算</th>
                  <th className="bg-[#ffff00] py-0.5 text-[9.5px]">計算</th>
                  <th className="bg-[#ffff00] py-0.5 text-[9.5px]">計算</th>
                  <th className="bg-[#ffff00] py-0.5 text-[9.5px]">計算</th>
                  <th className="bg-[#cfe2f3] py-0.5">QR</th>
                  <th className="bg-[#cfe2f3] py-0.5">QR</th>
                  <th className="bg-[#cfe2f3] py-0.5">QR</th>
                  <th colSpan={21} className="bg-white py-0.5"></th>
                </tr>

                {/* Row 2: 作業時間 production time Sub-bar */}
                <tr className="text-center font-medium text-[10px] text-black h-[20px]">
                  <th colSpan={5} className="bg-white py-0.5"></th>
                  <th colSpan={7} className="bg-[#cfe2f3] text-black font-semibold py-0.5 text-[9.5px]">
                    作業時間 production time
                  </th>
                  <th colSpan={33} className="bg-white py-0.5"></th>
                </tr>

                {/* Row 3: Main Japanese & English Column Headers without any arrows */}
                <tr className="text-center text-[10px] text-black font-normal align-top leading-tight">
                  {/* Col 1 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[70px]">
                    <div className="font-bold text-[10.5px]">場所</div>
                    <div className="text-[9px] mt-0.5">location / serv</div>
                  </th>

                  {/* Col 2 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[10.5px]">号機</div>
                    <div className="text-[9px] mt-0.5">Machine no.</div>
                  </th>

                  {/* Col 3 */}
                  <th className="bg-[#ffc000] px-1.5 py-1 min-w-[95px]">
                    <div className="font-bold text-[10.5px]">型式</div>
                    <div className="text-[9px] mt-0.5">Machine name</div>
                  </th>

                  {/* Col 4 */}
                  <th className="bg-[#ffc000] px-1 py-1 min-w-[60px]">
                    <div className="h-3.5"></div>
                    <div className="text-[9px] mt-0.5">Plant</div>
                  </th>

                  {/* Col 5 */}
                  <th className="bg-[#ffc000] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[10.5px]">使用車種</div>
                    <div className="text-[9px] mt-0.5">model</div>
                  </th>

                  {/* Col 6 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[50px]">
                    <div className="font-bold text-[10.5px]">生産直</div>
                    <div className="text-[9px] mt-0.5">shift</div>
                  </th>

                  {/* Col 7 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[10.5px]">所定時間</div>
                    <div className="text-[9px] mt-0.5">working time</div>
                    <div className="text-[8px] text-slate-700">(h/shift)</div>
                  </th>

                  {/* Col 8 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[10.5px]">開始時間</div>
                    <div className="text-[9px] mt-0.5">start time</div>
                  </th>

                  {/* Col 9 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[10.5px]">終了時間</div>
                    <div className="text-[9px] mt-0.5">finish time</div>
                  </th>

                  {/* Col 10 */}
                  <th className="bg-[#ffc000] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[10.5px]">休憩時間</div>
                    <div className="text-[9px] mt-0.5">break time</div>
                    <div className="text-[8px] text-slate-700">(mins/shift)</div>
                  </th>

                  {/* Col 11 */}
                  <th className="bg-[#ffc000] px-1 py-1 min-w-[80px]">
                    <div className="font-bold text-[10px] leading-3">保全・<br />その他時間</div>
                    <div className="text-[9px] mt-0.5">maintenance etc</div>
                    <div className="text-[8px] text-slate-700">(mins/sh)</div>
                  </th>

                  {/* Col 12 */}
                  <th className="bg-[#ffc000] px-1 py-1 min-w-[70px]">
                    <div className="font-bold text-[10.5px]">作業時間</div>
                    <div className="text-[9px] mt-0.5">production time</div>
                    <div className="text-[8px] text-slate-700">(mins)</div>
                  </th>

                  {/* Col 13 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[9.5px]">稼働積算時間</div>
                    <div className="text-[9px]">アワーメーター</div>
                    <div className="text-[9px]">hour meter</div>
                    <div className="text-[8px] text-slate-700">(hr/shift)</div>
                  </th>

                  {/* Col 14 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[10px]">計画停止時間</div>
                    <div className="text-[9px] mt-0.5">planned stop time</div>
                    <div className="text-[8px] text-slate-700">(hr/shift)</div>
                  </th>

                  {/* Col 15 */}
                  <th className="bg-[#ffc000] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[10.5px]">生産方式</div>
                    <div className="text-[9px] mt-0.5">production system</div>
                  </th>

                  {/* Col 16 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[80px]">
                    <div className="font-bold text-[10px]">良品A(実本数)</div>
                    <div className="text-[9px] mt-0.5">good output</div>
                    <div className="text-[8px] text-slate-700">(circuit / shift)</div>
                  </th>

                  {/* Col 17 */}
                  <th className="bg-[#92d050] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[10.5px]">切断能力</div>
                    <div className="text-[9px] mt-0.5">ability</div>
                    <div className="text-[8px] text-slate-700">(circuit/h)</div>
                  </th>

                  {/* Col 18 */}
                  <th className="bg-[#92d050] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[10.5px]">稼動時間</div>
                    <div className="text-[9px] mt-0.5">working time</div>
                    <div className="text-[8px] text-slate-700">(mins)</div>
                  </th>

                  {/* Col 19 */}
                  <th className="bg-[#92d050] px-1 py-1 min-w-[60px]">
                    <div className="font-bold text-[10.5px]">稼働率</div>
                    <div className="text-[9px] mt-0.5">Operation rate</div>
                    <div className="text-[8px] text-slate-700">(%)</div>
                  </th>

                  {/* Col 20 */}
                  <th className="bg-[#92d050] px-1 py-1 min-w-[60px]">
                    <div className="font-bold text-[10.5px]">可動率</div>
                    <div className="text-[9px] mt-0.5">Availability rate</div>
                    <div className="text-[8px] text-slate-700">(%)</div>
                  </th>

                  {/* Col 21 */}
                  <th className="bg-[#ffff00] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[10px]">設備稼働率</div>
                    <div className="text-[8.5px] mt-0.5 leading-none">Machine operation rate</div>
                    <div className="text-[8px] text-slate-700">(%)</div>
                  </th>

                  {/* Col 22 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[10px]">原紙受領枚数</div>
                    <div className="text-[9px] mt-0.5">nos of tag</div>
                    <div className="text-[8px] text-slate-700">(枚)</div>
                  </th>

                  {/* Col 23 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[60px]">
                    <div className="font-bold text-[10px]">平均LOT</div>
                    <div className="text-[9px] mt-0.5">avg lot</div>
                    <div className="text-[8px] text-slate-700">(本/枚)</div>
                  </th>

                  {/* Col 24 */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[60px]">
                    <div className="font-bold text-[10px]">平均線長</div>
                    <div className="text-[9px] mt-0.5">avg length</div>
                    <div className="text-[8px] text-slate-700">(mm)</div>
                  </th>

                  {/* WIRE CHANGE OVER (Col 25-26) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[9px]">WIRE CHANGE OVER</div>
                    <div className="text-[8.5px] mt-0.5">No.of wire changeover</div>
                    <div className="text-[8.5px] font-semibold mt-1">No.</div>
                  </th>
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[9px] invisible">WIRE CHANGE</div>
                    <div className="text-[8.5px] mt-0.5">(mins/shift)</div>
                    <div className="text-[8.5px] font-semibold mt-1">mins</div>
                  </th>

                  {/* APPLICTOR CHANGE OVER (Col 27-28) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[9px]">APPLICTOR CHANGE OVER</div>
                    <div className="text-[8.5px] mt-0.5">No.of App. changeover</div>
                    <div className="text-[8.5px] font-semibold mt-1">No.</div>
                  </th>
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[9px] invisible">APP CHANGE</div>
                    <div className="text-[8.5px] mt-0.5">(mins/shift)</div>
                    <div className="text-[8.5px] font-semibold mt-1">mins</div>
                  </th>

                  {/* TERMINAL CHANGE OVER (Col 29-30) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[80px]">
                    <div className="font-bold text-[9px]">TERMINAL CHANGE OVER</div>
                    <div className="text-[8.5px] mt-0.5">No.of Terminal changeover</div>
                    <div className="text-[8.5px] font-semibold mt-1">No.</div>
                  </th>
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[9px] invisible">TERM CHANGE</div>
                    <div className="text-[8.5px] mt-0.5">(mins/shift)</div>
                    <div className="text-[8.5px] font-semibold mt-1">mins</div>
                  </th>

                  {/* SEAL CHANGE OVER (Col 31-32) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[9px]">SEAL CHANGE OVER</div>
                    <div className="text-[8.5px] mt-0.5">No.of Seal changeover</div>
                    <div className="text-[8.5px] font-semibold mt-1">No.</div>
                  </th>
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[9px] invisible">SEAL CHANGE</div>
                    <div className="text-[8.5px] mt-0.5">(mins/shift)</div>
                    <div className="text-[8.5px] font-semibold mt-1">mins</div>
                  </th>

                  {/* Setup adjustment (Col 33) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[9px]">Setup adjustment</div>
                    <div className="text-[8.5px] mt-0.5">(mins/shift)</div>
                    <div className="text-[8.5px] font-semibold mt-1">mins</div>
                  </th>

                  {/* Material waiting time (Col 34) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[9px]">Material waiting time</div>
                    <div className="text-[8.5px] mt-0.5">(mins/shift)</div>
                    <div className="text-[8.5px] font-semibold mt-1">mins</div>
                  </th>

                  {/* Quality waiting time (Col 35) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[9px]">Quality waiting time</div>
                    <div className="text-[8.5px] mt-0.5">(mins/shift)</div>
                    <div className="text-[8.5px] font-semibold mt-1">mins</div>
                  </th>

                  {/* Wire entangle/knot (Col 36) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[75px]">
                    <div className="font-bold text-[9px]">Wire entangle/knot</div>
                    <div className="text-[8.5px] mt-0.5">(mins/shift)</div>
                    <div className="text-[8.5px] font-semibold mt-1">mins</div>
                  </th>

                  {/* scrap(p.r.s.) (Col 37) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[9px]">scrap(p.r.s.)</div>
                    <div className="text-[8.5px] font-semibold mt-2">kg</div>
                  </th>

                  {/* scrap(Q.r.s.) (Col 38) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[65px]">
                    <div className="font-bold text-[9px]">scrap(Q.r.s.)</div>
                    <div className="text-[8.5px] font-semibold mt-2">kg</div>
                  </th>

                  {/* Defect (Col 39) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[60px]">
                    <div className="font-bold text-[9px]">Defect</div>
                    <div className="text-[8.5px] font-semibold mt-2">Number</div>
                  </th>

                  {/* ppm (Col 40) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[50px]">
                    <div className="font-bold text-[9px] mt-3">ppm</div>
                  </th>

                  {/* Hours summary (Col 41-45) */}
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[55px]">
                    <div className="font-bold text-[9px]">loss min</div>
                    <div className="text-[8px] text-slate-700">mins</div>
                  </th>
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[50px]">
                    <div className="font-bold text-[9px]">loss hr</div>
                    <div className="text-[8px] text-slate-700">hr</div>
                  </th>
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[50px]">
                    <div className="font-bold text-[9px]">run hr</div>
                    <div className="text-[8px] text-slate-700">hr</div>
                  </th>
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[50px]">
                    <div className="font-bold text-[9px]">total hr</div>
                    <div className="text-[8px] text-slate-700">hr</div>
                  </th>
                  <th className="bg-[#cfe2f3] px-1 py-1 min-w-[50px]">
                    <div className="font-bold text-[9px]">shift hr</div>
                    <div className="text-[8px] text-slate-700">hr</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {telemetryData.map((r, i) => (
                  <tr key={r.id || i} className="hover:bg-amber-50">
                    <td className="bg-[#ffff00] border border-black text-center px-1.5 py-0.5">{r.location}</td>
                    <td className="bg-[#ffff00] border border-black text-center font-bold px-1.5 py-0.5">{r.machineNo}</td>
                    <td className="bg-[#ffff00] border border-black text-center px-2 py-0.5">{r.machineName}</td>
                    <td className="bg-[#ffff00] border border-black text-center px-1.5 py-0.5">{r.plant}</td>
                    <td className="bg-[#ffff00] border border-black text-center px-1.5 py-0.5">{r.model}</td>
                    <td className="bg-[#ffff00] border border-black text-center font-semibold px-1 py-0.5">{r.shift}</td>
                    <td className="bg-[#ffff00] border border-black text-center px-1.5 py-0.5">{r.workingTime}</td>
                    <td className="bg-[#ffff00] border border-black text-center px-1.5 py-0.5">{r.startTime}</td>
                    <td className="bg-[#ffff00] border border-black text-center px-1.5 py-0.5">{r.finishTime}</td>
                    <td className="bg-[#ffff00] border border-black text-center px-1 py-0.5">{r.breakTime}</td>
                    <td className="bg-[#ffff00] border border-black text-center px-1.5 py-0.5">{r.maintenance || ''}</td>
                    <td className="bg-white border border-black text-center px-1.5 py-0.5">{r.prodTime}</td>
                    <td className="bg-white border border-black text-center px-1 py-0.5">{r.hourMeter}</td>
                    <td className="bg-white border border-black text-center px-1 py-0.5">{r.plannedStop}</td>
                    <td className="bg-white border border-black text-center px-1.5 py-0.5">{r.prodSystem}</td>
                    <td className="bg-[#ffff00] border border-black text-right pr-1.5 font-medium py-0.5">{r.goodOutput ? r.goodOutput.toLocaleString() : 0}</td>
                    <td className="bg-white border border-black text-center px-1.5 py-0.5">{r.ability}</td>
                    <td className="bg-white border border-black text-center px-1 py-0.5">{r.workingTimeMin}</td>
                    <td className="bg-white border border-black text-center px-1 py-0.5">{typeof r.opRate === 'number' ? `${r.opRate}%` : r.opRate}</td>
                    <td className="bg-white border border-black text-center px-1 py-0.5">{typeof r.availRate === 'number' ? `${r.availRate}%` : r.availRate}</td>
                    <td className="bg-white border border-black text-center px-1 py-0.5">{typeof r.mcOpRate === 'number' ? `${r.mcOpRate}%` : r.mcOpRate}</td>
                    <td className="bg-[#00ffff] border border-black text-center px-1 py-0.5">{r.nosOfTag}</td>
                    <td className="bg-[#00ffff] border border-black text-center px-1 py-0.5">{r.avgLot}</td>
                    <td className="bg-[#00ffff] border border-black text-center px-1 py-0.5">{r.avgLength}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.wireNo}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.wireMin}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.appNo}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.appMin}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.termNo}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.termMin}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.sealNo}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.sealMin}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.setupAdj}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.matWait}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.qualWait}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.knotMin}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.scrapPrs}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.scrapQrs}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.defect}</td>
                    <td className="bg-[#f8cbad] border border-black text-center px-1 py-0.5">{r.ppm}</td>
                    <td className="bg-white border border-black text-right pr-1 py-0.5">{r.lossMin}</td>
                    <td className="bg-white border border-black text-right pr-1 py-0.5">{r.lossHr}</td>
                    <td className="bg-white border border-black text-right pr-1 py-0.5">{r.runHr}</td>
                    <td className="bg-white border border-black text-right pr-1 py-0.5">{r.totalHr}</td>
                    <td className="bg-white border border-black text-right pr-1 py-0.5">{r.shiftHr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: CONSOLIDATED DAILY MACHINE SUMMARY TABLE (EXACT REPLICA OF SCREENSHOT media_1793858680880_84a5f25e.png) */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-4">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h2 className="text-sm font-bold text-slate-800">
              Machine Daily Summary (Consolidated 11-Column Table)
            </h2>
          </div>
        </div>

        {/* Left-aligned compact table matching physical Excel sheet */}
        <div className="overflow-x-auto border border-black inline-block">
          <table className="summary-sheet-table text-[10px] font-sans">
            <thead>
              <tr className="text-center font-normal text-black h-7">
                {/* Machine no. - Light Blue (#cfe2f3) */}
                <th className="bg-[#cfe2f3] px-1.5 py-0.5 min-w-[65px]">
                  Machine no.
                </th>

                {/* Machine name - Golden Amber (#ffc000) */}
                <th className="bg-[#ffc000] px-2 py-0.5 min-w-[85px]">
                  Machine name
                </th>

                {/* Plant - Golden Amber (#ffc000) with prominent right border */}
                <th className="bg-[#ffc000] plant-col-divider px-1.5 py-0.5 min-w-[55px]">
                  Plant
                </th>

                {/* working time */}
                <th className="bg-[#ffc000] px-1.5 py-0.5 min-w-[68px]">
                  working time
                </th>

                {/* break time */}
                <th className="bg-[#ffc000] px-1.5 py-0.5 min-w-[60px]">
                  break time
                </th>

                {/* maintenance etc. (2 lines) */}
                <th className="bg-[#ffc000] px-1.5 py-0.5 min-w-[68px] leading-tight">
                  maintenance<br />etc.
                </th>

                {/* production time */}
                <th className="bg-[#ffc000] px-1.5 py-0.5 min-w-[75px]">
                  production time
                </th>

                {/* hour meter */}
                <th className="bg-[#ffc000] px-1.5 py-0.5 min-w-[62px]">
                  hour meter
                </th>

                {/* planned stop time (2 lines) */}
                <th className="bg-[#ffc000] px-1.5 py-0.5 min-w-[68px] leading-tight">
                  planned stop<br />time
                </th>

                {/* good output */}
                <th className="bg-[#ffc000] px-2 py-0.5 min-w-[68px]">
                  good output
                </th>

                {/* ability - Lime Green (#92d050) */}
                <th className="bg-[#92d050] px-1.5 py-0.5 min-w-[58px]">
                  ability
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSummaryRows.map((row, index) => (
                <tr key={index} className="h-5 hover:brightness-95 transition-[filter]">
                  {/* Left 3 columns: Bright Yellow (#ffff00) */}
                  <td className="bg-[#ffff00] text-center text-black px-1 py-0 font-medium">
                    {row.no}
                  </td>
                  <td className="bg-[#ffff00] text-center text-black px-1.5 py-0">
                    {row.name}
                  </td>
                  <td className="bg-[#ffff00] plant-col-divider text-center text-black px-1 py-0">
                    {row.plant}
                  </td>

                  {/* Data columns: Solid White (#ffffff) */}
                  <td className="bg-white text-center text-black px-1 py-0">
                    {row.workingTime}
                  </td>
                  <td className="bg-white text-center text-black px-1 py-0">
                    {row.breakTime}
                  </td>
                  <td className="bg-white text-center text-black px-1 py-0">
                    {row.maintenance}
                  </td>
                  <td className="bg-white text-center text-black px-1 py-0">
                    {row.prodTime}
                  </td>
                  <td className="bg-white text-center text-black px-1 py-0">
                    {row.hourMeter}
                  </td>
                  <td className="bg-white text-center text-black px-1 py-0">
                    {row.plannedStop}
                  </td>
                  <td className="bg-white text-center text-black px-1 py-0">
                    {row.goodOutput}
                  </td>
                  <td className="bg-white text-center text-black px-1 py-0">
                    {row.ability}
                  </td>
                </tr>
              ))}

              {/* Blank separator row between data and OVER ALL (as shown in screenshot) */}
              <tr className="h-4">
                <td className="bg-white"></td>
                <td className="bg-white"></td>
                <td className="bg-white plant-col-divider"></td>
                <td className="bg-white"></td>
                <td className="bg-white"></td>
                <td className="bg-white"></td>
                <td className="bg-white"></td>
                <td className="bg-white"></td>
                <td className="bg-white"></td>
                <td className="bg-white"></td>
                <td className="bg-white"></td>
              </tr>

              {/* OVER ALL ROW: Merged 3 columns in #ffff00 with exact totals from screenshot */}
              <tr className="h-6 font-bold">
                <td
                  colSpan={3}
                  className="bg-[#ffff00] plant-col-divider text-center text-black tracking-wider text-[10.5px]"
                >
                  OVER ALL
                </td>
                <td className="bg-white text-center text-black px-1 py-0">
                  {DAILY_SUMMARY_OVERALL.workingTime}
                </td>
                <td className="bg-white text-center text-black px-1 py-0">
                  {DAILY_SUMMARY_OVERALL.breakTime}
                </td>
                <td className="bg-white text-center text-black px-1 py-0">
                  {DAILY_SUMMARY_OVERALL.maintenance}
                </td>
                <td className="bg-white text-center text-black px-1 py-0">
                  {DAILY_SUMMARY_OVERALL.prodTime}
                </td>
                <td className="bg-white text-center text-black px-1 py-0">
                  {DAILY_SUMMARY_OVERALL.hourMeter}
                </td>
                <td className="bg-white text-center text-black px-1 py-0">
                  {DAILY_SUMMARY_OVERALL.plannedStop}
                </td>
                <td className="bg-white text-center text-black px-1 py-0">
                  {DAILY_SUMMARY_OVERALL.goodOutput}
                </td>
                <td className="bg-white text-center text-black px-1 py-0">
                  {DAILY_SUMMARY_OVERALL.ability}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
