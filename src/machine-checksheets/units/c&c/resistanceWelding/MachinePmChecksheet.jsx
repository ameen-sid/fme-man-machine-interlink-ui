import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, RotateCcw, Eye, X, ZoomIn, Check, Printer, Image as ImageIcon } from 'lucide-react';
import ChecksheetHeaderNav from '../../../shared/ChecksheetHeaderNav';
// 
// 14 Standard Check Points matching the official Resistance Welding PM Sheet
const PM_CHECK_POINTS = [
  {
    id: 1,
    imageId: 1,
    pictureLabel: 'Refer Image 1\n(Back sheet)',
    checkPoints: 'Check for loose part, if any tighten them. (Loose part check djsa ,fn dksbZ loose part gSa rks mls tight djsa %',
    judgement: 'properly tight',
    method: 'by tool',
    title: 'Image 1'
  },
  {
    id: 2,
    imageId: 2,
    pictureLabel: 'Refer Image 2\n(Back sheet)',
    checkPoints: 'Check the safety cover working properly & also check the touch screen working properly',
    judgement: 'Machine should not operate without safety cover & screen not be damage',
    method: 'Functionly and By hand',
    title: 'Image 2'
  },
  {
    id: 3,
    imageId: 3,
    pictureLabel: 'Refer Image 3\n(Back sheet)',
    checkPoints: 'Check for worn out screws, replace them. (pSd dj— fd Screws Damage u g^ ,fn gS Rk§ mls replace dj—A)',
    judgement: 'Should be not worn out screws',
    method: 'Visully',
    title: 'Image 3'
  },
  {
    id: 4,
    imageId: 4,
    pictureLabel: 'Refer Image 4\n(Back sheet)',
    checkPoints: 'Check Machine Connection & Supply 200 v.±10 ( dusDOu Ok 200 Okk YV IlykblZ d` pSd dj—A)',
    judgement: 'Should be 200V AC ±10(E-lh- 200 OkYV g\'Ukh pkfgEA)',
    method: 'By Multimeter',
    title: 'Image 4'
  },
  {
    id: 5,
    imageId: 5,
    pictureLabel: 'Refer Image 5\n(Back sheet)',
    checkPoints: 'Check for Abnormal Sound from Machine. (eÕhu dh vleKU; vkOkkTk+ d` pSd dj—A)',
    judgement: 'No any Abnormal Sound (dksbZ Hkh vleKU; vkOkkTk+ ugh aksuh pkfg A%',
    method: 'By hearing',
    title: 'Image 5'
  },
  // Divider: Setting's & Adjustments
  {
    id: 6,
    imageId: 6,
    isSettingsSection: true,
    pictureLabel: 'Refer Image 6\n(Back sheet)',
    checkPoints: 'Check all Electrical Conectons .(IHkh bykSDfVªdY dUkSDÕUk d` pSd dj—A)',
    judgement: 'Should be proper connection (dUkSDÕUk lgh gksus pkfo A%',
    method: 'By Tool',
    title: 'Image 6'
  },
  {
    id: 7,
    imageId: 7,
    pictureLabel: 'Refer Image 7\n(Back sheet)',
    checkPoints: 'Check for WELD BUTT / WIRE END is in home position .(pSd dj— fd Tk© (WELD BUTT / WIRE END) g e i ft+ÕUk e— g A)',
    judgement: 'Should be on 0 Position After that check the set (if required ) (0 i ft+Õu ij',
    method: 'Functionly',
    title: 'Image 7'
  },
  {
    id: 8,
    imageId: 8,
    pictureLabel: 'Refer Image 8\n(Back sheet)',
    checkPoints: 'check the Ceramic Guide,End Bump Plate (replaced if required) ( ,fn vkOK;\'d g` R\'k cny—A½',
    judgement: 'Should be Proper Align (vykbUk (LkajsÅ) g\'Ukk pfgE',
    method: 'Visully',
    title: 'Image 8'
  },
  {
    id: 9,
    imageId: 9,
    pictureLabel: 'Refer Image 9\n(Back sheet)',
    checkPoints: 'check the Cooling Water Circulation Apparatus (replaced water ) ( Water CknYk—A',
    judgement: 'Should be water level',
    method: 'Visually',
    title: 'Image 9'
  },
  {
    id: 10,
    imageId: 10,
    pictureLabel: 'Refer Image 10\n(Back sheet)',
    checkPoints: 'Clean the Air Filter( Evj fQYVj lkQ gSa ;k ugh½',
    judgement: 'Should be clean air filter (Evj fQYV) lkQ g\'Ukk pkfgEA)',
    method: 'Visually',
    title: 'Image 10'
  },
  {
    id: 11,
    imageId: 11,
    pictureLabel: 'Refer Image 11\n(Back sheet)',
    checkPoints: 'Check & Ensure Cleaning of Machine. (eÕhUk dh lQkbZ dks pSd djsaA)',
    judgement: 'Properly Clean of Machine (eÕhUk lkQ ;g Ukh pkfgEA½',
    method: 'By Hand',
    title: 'Image 11'
  },
  {
    id: 12,
    imageId: 12,
    pictureLabel: 'Refer Image 12\n(Back sheet)',
    checkPoints: 'Clean the ventilator filter mat (OkSflUVysVj fQYVj eSV lkQ gSa ;k ugh½',
    judgement: 'All ventilator to be cleaned ( IHkh OkSflUVysVj lkQ gksus pkfo sA',
    method: 'By compressed air',
    title: 'Image 12'
  },
  {
    id: 13,
    imageId: 13,
    pictureLabel: 'Refer Image 13\n(Back sheet)',
    checkPoints: 'Check the Lamp condition (Lamp की जाँच करें ।)',
    judgement: 'All lamp Should glow',
    method: 'Visually',
    title: 'Image 13'
  },
  {
    id: 14,
    imageId: 14,
    pictureLabel: 'Refer Image 14\n(Back sheet)',
    checkPoints: 'Check the electrode condition (electrode की Condition जाँच करें ।)',
    judgement: 'Smooth surface no dent/crak and weld sample as per OK',
    method: 'Visually and weld sample condition',
    title: 'Image 14'
  }
];

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const SYMBOL_OPTIONS = [
  { symbol: '✓', label: 'OK / DONE' },
  { symbol: 'X', label: 'NOT OK' },
  { symbol: '△', label: 'ATTENTION' },
  { symbol: '⋈', label: 'RECTIFIED' },
  { symbol: '◯', label: 'SPARE CHANGE' },
  { symbol: '', label: 'CLEAR' },
];

export default function ResistanceWeldingPM({ machine = {}, onClose }) {
  const machineKey = machine?.name || machine?.id || 'RSW_01';
  const storagePrefix = `rw_pm_checksheet_${machineKey}`;
  const photosStorageKey = `rw_pm_photos_${machineKey}`;

  // Header info state
  const [headerInfo, setHeaderInfo] = useState(() => {
    const saved = localStorage.getItem(`${storagePrefix}_header`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      machineName: 'RESISTANCE WELDING',
      srNo: '',
      displayNo: machine?.name || 'R/SW 01',
      installationDate: '24.12.2021',
      year: new Date().getFullYear().toString(),
      revNo: '06',
      revDate: '24.12.2021',
      preparedBy: 'SARWAR YADAV',
      approvedBy: 'MARUT'
    };
  });

  // Table cell values: { [rowId_month]: { before: '', after: '' } } (Empty by default)
  const [cellData, setCellData] = useState(() => {
    const saved = localStorage.getItem(`${storagePrefix}_cells`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clear old prefilled ticks if present
        const values = Object.values(parsed);
        const allPreFilledTicks = values.length > 0 && values.every((v) => v.before === '✓' && v.after === '✓');
        if (!allPreFilledTicks) {
          return parsed;
        }
      } catch (e) { /* ignore */ }
    }
    const initial = {};
    PM_CHECK_POINTS.forEach((item) => {
      MONTHS.forEach((m) => {
        initial[`${item.id}_${m}`] = { before: '', after: '' };
      });
    });
    return initial;
  });

  // Timing and signature bottom rows
  const [signOffData, setSignOffData] = useState(() => {
    const saved = localStorage.getItem(`${storagePrefix}_signoff`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    const initial = {
      pmDoneDate: {},
      startTime: {},
      endTime: {},
      totalTime: {},
      sigTechnician: {},
      sigEngineer: {},
      sigCellOwner: {}
    };
    MONTHS.forEach((m) => {
      initial.pmDoneDate[m] = '';
      initial.startTime[m] = '';
      initial.endTime[m] = '';
      initial.totalTime[m] = '';
      initial.sigTechnician[m] = '';
      initial.sigEngineer[m] = '';
      initial.sigCellOwner[m] = '';
    });
    return initial;
  });

  // Uploaded / Custom Photos state: { [imageId]: dataUrl }
  const [customPhotos, setCustomPhotos] = useState(() => {
    const saved = localStorage.getItem(photosStorageKey);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {};
  });

  // Active Symbol picker modal/popover state
  const [activePicker, setActivePicker] = useState(null); // { cellKey, half: 'before'|'after' }

  // Lightbox preview state
  const [previewImage, setPreviewImage] = useState(null); // { src, title, imgId }

  // Hidden file input refs for each image 1..14
  const fileInputRefs = useRef({});

  // Auto-save header
  useEffect(() => {
    localStorage.setItem(`${storagePrefix}_header`, JSON.stringify(headerInfo));
  }, [headerInfo, storagePrefix]);

  // Auto-save cells
  useEffect(() => {
    localStorage.setItem(`${storagePrefix}_cells`, JSON.stringify(cellData));
  }, [cellData, storagePrefix]);

  // Auto-save sign-offs
  useEffect(() => {
    localStorage.setItem(`${storagePrefix}_signoff`, JSON.stringify(signOffData));
  }, [signOffData, storagePrefix]);

  // Auto-save photos
  useEffect(() => {
    localStorage.setItem(photosStorageKey, JSON.stringify(customPhotos));
  }, [customPhotos, photosStorageKey]);

  // Helper to get image src (custom or default cropped image from /pm-rw/imageX.png)
  const getImageSrc = (imgId) => {
    if (customPhotos[imgId]) {
      return customPhotos[imgId];
    }
    return `/pm-rw/image${imgId}.png`;
  };

  // Handle uploading/adding photo
  const handlePhotoUpload = (imgId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setCustomPhotos((prev) => ({
        ...prev,
        [imgId]: dataUrl
      }));
    };
    reader.readAsDataURL(file);
  };

  // Reset photo back to default
  const handleResetPhoto = (imgId) => {
    setCustomPhotos((prev) => {
      const next = { ...prev };
      delete next[imgId];
      return next;
    });
  };

  // Trigger file selection for an image slot
  const triggerImageSelect = (imgId) => {
    if (fileInputRefs.current[imgId]) {
      fileInputRefs.current[imgId].click();
    }
  };

  // Direct cell input update
  const updateCellValue = (rowId, month, half, val) => {
    const key = `${rowId}_${month}`;
    setCellData((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || { before: '', after: '' }),
        [half]: val
      }
    }));
  };

  // Reset all cells
  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to clear all inputs for this machine checksheet?')) {
      localStorage.removeItem(`${storagePrefix}_cells`);
      localStorage.removeItem(`${storagePrefix}_signoff`);
      const initial = {};
      PM_CHECK_POINTS.forEach((item) => {
        MONTHS.forEach((m) => {
          initial[`${item.id}_${m}`] = { before: '', after: '' };
        });
      });
      setCellData(initial);

      const initSignoff = {
        pmDoneDate: {},
        startTime: {},
        endTime: {},
        totalTime: {},
        sigTechnician: {},
        sigEngineer: {},
        sigCellOwner: {}
      };
      MONTHS.forEach((m) => {
        initSignoff.pmDoneDate[m] = '';
        initSignoff.startTime[m] = '';
        initSignoff.endTime[m] = '';
        initSignoff.totalTime[m] = '';
        initSignoff.sigTechnician[m] = '';
        initSignoff.sigEngineer[m] = '';
        initSignoff.sigCellOwner[m] = '';
      });
      setSignOffData(initSignoff);
    }
  };

  const applySymbol = (sym) => {
    if (!activePicker) return;
    const { key, half } = activePicker;
    setCellData((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || { before: '', after: '' }),
        [half]: sym
      }
    }));
    setActivePicker(null);
  };

  // Helper renderer for an image block in Back Sheet
  const renderImageBlock = (imgId) => {
    const photoSrc = getImageSrc(imgId);
    const isCustom = !!customPhotos[imgId];

    return (
      <div key={`img-block-${imgId}`} className="flex flex-col items-center w-full">
        {/* Image Box */}
        <div className="relative group w-full aspect-[16/10] bg-slate-900 border-2 border-black overflow-hidden shadow-xs cursor-pointer">
          <img
            src={photoSrc}
            alt={`Image ${imgId}`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-102"
            onClick={() => setPreviewImage({ src: photoSrc, title: `Image ${imgId}`, imgId })}
          />

          {/* Hover Overlay with Action Buttons */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewImage({ src: photoSrc, title: `Image ${imgId}`, imgId });
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs cursor-pointer"
              >
                <ZoomIn size={14} />
                <span>Zoom</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerImageSelect(imgId);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow cursor-pointer transition-colors"
              >
                <Camera size={13} />
                <span>{isCustom ? 'Change' : '+ Add Photo'}</span>
              </button>
            </div>

            {isCustom && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetPhoto(imgId);
                }}
                className="text-[10px] text-rose-300 hover:text-rose-100 underline cursor-pointer"
              >
                Restore Default Reference
              </button>
            )}
          </div>

          {/* Badge if custom image uploaded */}
          {isCustom && (
            <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
              Custom
            </span>
          )}
        </div>

        {/* Caption text centered beneath image with add/change shortcut */}
        <div className="mt-1 text-center font-bold text-xs text-slate-900 flex items-center justify-center gap-1.5">
          <span>Image {imgId}</span>
          <button
            type="button"
            onClick={() => triggerImageSelect(imgId)}
            className="text-blue-600 hover:text-blue-800 text-[10px] font-semibold underline cursor-pointer"
            title="Upload image at this slot"
          >
            [+ Add Photo]
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 p-2 text-black font-sans">
      {/* Hidden File Inputs for Images 1 to 14 */}
      {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
        <input
          key={`hidden-file-${num}`}
          type="file"
          accept="image/*"
          ref={(el) => (fileInputRefs.current[num] = el)}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handlePhotoUpload(num, e.target.files[0]);
            }
          }}
        />
      ))}

      {/* Top Navbar: 100% Width, No PM/Observation switcher */}
      <div className="w-full mb-2">
        <ChecksheetHeaderNav
          title="RESISTANCE WELDING PM CHECK SHEET"
          subtitle="Monthly & Periodic Preventive Maintenance — Rev: 06 (24.12.2021)"
          onClose={onClose}
          showSwitcher={false}
          showSave={false}
          onReset={handleResetAll}
          extraActions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
              >
                <Printer size={15} />
                <span>Print / PDF</span>
              </button>
            </div>
          }
        />
      </div>

      {/* Main Container: 100% Width */}
      <div className="w-full bg-white border-2 border-black shadow-sm rounded-none p-2 sm:p-3 overflow-x-auto print:p-0 print:border-none print:shadow-none">

        {/* ========================================================= */}
        {/* TOP TITLE HEADER ROW (YELLOW BANNER WITH REV & DATE BOX) */}
        {/* ========================================================= */}
        <div className="relative border-2 border-black bg-[#ffffcc] text-black font-bold flex items-center justify-between mb-1">
          {/* Centered Title */}
          <div className="w-full text-center py-2 px-4 tracking-widest text-sm sm:text-base md:text-lg font-black uppercase font-mono">
            MONTHLY AND PERIODIC PREVENTIVE CHECK SHEET
          </div>

          {/* Top Right Rev & Date Box */}
          <div className="absolute top-0 right-0 h-full border-l-2 border-black bg-white flex flex-col justify-center text-[11px] leading-tight px-3 py-1 font-semibold text-slate-800">
            <div className="flex items-center justify-between gap-2 border-b border-black/40 pb-0.5">
              <span>Rev:</span>
              <input
                type="text"
                value={headerInfo.revNo}
                onChange={(e) => setHeaderInfo({ ...headerInfo, revNo: e.target.value })}
                className="w-10 text-right outline-none bg-transparent font-bold"
              />
            </div>
            <div className="flex items-center justify-between gap-1 pt-0.5">
              <span>Date:</span>
              <input
                type="text"
                value={headerInfo.revDate}
                onChange={(e) => setHeaderInfo({ ...headerInfo, revDate: e.target.value })}
                className="w-20 text-right outline-none bg-transparent font-bold"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SUB-HEADER: MACHINE DETAILS BAR */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-2 border-black bg-white text-[12px] font-bold divide-y md:divide-y-0 md:divide-x-2 divide-black mb-1">
          <div className="p-1.5 flex items-center gap-1.5 bg-slate-50">
            <span className="shrink-0 text-slate-700">M/C NAME:</span>
            <input
              type="text"
              value={headerInfo.machineName}
              onChange={(e) => setHeaderInfo({ ...headerInfo, machineName: e.target.value })}
              className="w-full font-extrabold uppercase bg-transparent outline-none text-slate-900"
            />
          </div>
          <div className="p-1.5 flex items-center gap-1.5">
            <span className="shrink-0 text-slate-700">SR.NO. :</span>
            <input
              type="text"
              placeholder="e.g. RW-001"
              value={headerInfo.srNo}
              onChange={(e) => setHeaderInfo({ ...headerInfo, srNo: e.target.value })}
              className="w-full font-bold bg-transparent outline-none"
            />
          </div>
          <div className="p-1.5 flex items-center gap-1.5 bg-slate-50">
            <span className="shrink-0 text-slate-700">M/C DISPLAY NO :</span>
            <input
              type="text"
              value={headerInfo.displayNo}
              onChange={(e) => setHeaderInfo({ ...headerInfo, displayNo: e.target.value })}
              className="w-full font-extrabold text-blue-800 bg-transparent outline-none uppercase"
            />
          </div>
          <div className="p-1.5 flex items-center gap-1.5">
            <span className="shrink-0 text-slate-700">INSTALLATION DATE:-</span>
            <input
              type="text"
              value={headerInfo.installationDate}
              onChange={(e) => setHeaderInfo({ ...headerInfo, installationDate: e.target.value })}
              className="w-full font-bold bg-transparent outline-none"
            />
          </div>
          <div className="p-1.5 flex items-center gap-1.5 bg-slate-50">
            <span className="shrink-0 text-slate-700">YEAR :-</span>
            <input
              type="text"
              value={headerInfo.year}
              onChange={(e) => setHeaderInfo({ ...headerInfo, year: e.target.value })}
              className="w-full font-extrabold bg-transparent outline-none"
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* TABLE SECTION: 100% WIDTH */}
        {/* ========================================================= */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black text-[11px] leading-tight">
            <thead>
              <tr className="bg-[#70ad47] text-black font-extrabold border-b-2 border-black text-center select-none">
                <th className="border border-black p-2 w-[120px] min-w-[110px]">Picture</th>
                <th className="border border-black p-2 min-w-[260px] text-left">Check Points</th>
                <th className="border border-black p-2 min-w-[190px] text-left">Judgement</th>
                <th className="border border-black p-2 w-[120px] min-w-[110px]">Checking Method.</th>
                {MONTHS.map((m) => (
                  <th key={m} className="border border-black p-1.5 w-[50px] min-w-[44px] text-center tracking-wider">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PM_CHECK_POINTS.map((item) => {
                const imgId = item.imageId;

                return (
                  <React.Fragment key={item.id}>
                    {/* Setting's & Adjustments Divider Row before item 6 */}
                    {item.isSettingsSection && (
                      <tr className="bg-[#70ad47] text-black font-black text-xs border-y-2 border-black">
                        <td colSpan={16} className="border border-black px-3 py-1.5 text-left italic font-bold">
                          Setting&apos;s & Adjustments
                        </td>
                      </tr>
                    )}

                    <tr className="border-b border-black hover:bg-slate-50 transition-colors">
                      {/* PICTURE COLUMN (Exact compact text matching screenshot) */}
                      <td className="border border-black p-1 text-center align-middle bg-slate-50/40 text-[11px] leading-tight font-medium">
                        <div className="font-semibold text-slate-800">Refer Image {item.imageId}</div>
                        <div className="text-[10px] text-slate-500">(Back sheet)</div>
                      </td>

                      {/* CHECK POINTS */}
                      <td className="border border-black p-2 align-middle font-medium text-slate-900 leading-snug">
                        {item.checkPoints}
                      </td>

                      {/* JUDGEMENT */}
                      <td className="border border-black p-2 align-middle font-medium text-slate-800 leading-snug">
                        {item.judgement}
                      </td>

                      {/* CHECKING METHOD */}
                      <td className="border border-black p-2 align-middle text-center font-bold text-slate-800">
                        {item.method}
                      </td>

                      {/* 12 MONTH COLUMNS WITH DIAGONAL SLASH (EMPTY INPUTS BY DEFAULT) */}
                      {MONTHS.map((m) => {
                        const cellKey = `${item.id}_${m}`;
                        const cellVal = cellData[cellKey] || { before: '', after: '' };

                        return (
                          <td
                            key={m}
                            className="border border-black p-0 w-[50px] min-w-[44px] h-10 relative align-middle bg-white select-none"
                          >
                            {/* SVG Diagonal line from bottom-left to top-right */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                              <line x1="0" y1="100%" x2="100%" y2="0" stroke="black" strokeWidth="1" />
                            </svg>

                            {/* Top-Left Empty Input: Before PM */}
                            <input
                              type="text"
                              value={cellVal.before}
                              onChange={(e) => updateCellValue(item.id, m, 'before', e.target.value)}
                              onDoubleClick={() => setActivePicker({ key: cellKey, rowId: item.id, month: m, half: 'before' })}
                              placeholder=""
                              className="absolute top-0 left-0 w-[50%] h-[50%] text-center text-[11px] font-bold bg-transparent outline-none border-none p-0 cursor-text focus:bg-blue-50/60"
                              title={`${m} Before PM (Type or double-click to pick symbol)`}
                            />

                            {/* Bottom-Right Empty Input: After PM */}
                            <input
                              type="text"
                              value={cellVal.after}
                              onChange={(e) => updateCellValue(item.id, m, 'after', e.target.value)}
                              onDoubleClick={() => setActivePicker({ key: cellKey, rowId: item.id, month: m, half: 'after' })}
                              placeholder=""
                              className="absolute bottom-0 right-0 w-[50%] h-[50%] text-center text-[11px] font-bold bg-transparent outline-none border-none p-0 cursor-text focus:bg-emerald-50/60 text-emerald-800"
                              title={`${m} After PM (Type or double-click to pick symbol)`}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}

              {/* ===================================================== */}
              {/* TIMING AND SIGN-OFF ROWS (ROWS BELOW CHECKPOINTS) */}
              {/* ===================================================== */}
              {/* Row 1: PM Done on ** date */}
              <tr className="border-t-2 border-black font-bold">
                <td colSpan={4} className="border border-black px-2 py-1.5 text-left bg-slate-50">
                  PM Done on ** date
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0.5 text-center">
                    <input
                      type="text"
                      placeholder=""
                      value={signOffData.pmDoneDate[m] || ''}
                      onChange={(e) =>
                        setSignOffData({
                          ...signOffData,
                          pmDoneDate: { ...signOffData.pmDoneDate, [m]: e.target.value }
                        })
                      }
                      className="w-full text-center text-[10px] outline-none font-semibold bg-transparent"
                    />
                  </td>
                ))}
              </tr>

              {/* Row 2: Start Time */}
              <tr className="font-bold">
                <td colSpan={4} className="border border-black px-2 py-1 text-left bg-slate-50">
                  Start Time
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0.5 text-center">
                    <input
                      type="text"
                      placeholder=""
                      value={signOffData.startTime[m] || ''}
                      onChange={(e) =>
                        setSignOffData({
                          ...signOffData,
                          startTime: { ...signOffData.startTime, [m]: e.target.value }
                        })
                      }
                      className="w-full text-center text-[10px] outline-none font-semibold bg-transparent"
                    />
                  </td>
                ))}
              </tr>

              {/* Row 3: End time */}
              <tr className="font-bold">
                <td colSpan={4} className="border border-black px-2 py-1 text-left bg-slate-50">
                  End time
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0.5 text-center">
                    <input
                      type="text"
                      placeholder=""
                      value={signOffData.endTime[m] || ''}
                      onChange={(e) =>
                        setSignOffData({
                          ...signOffData,
                          endTime: { ...signOffData.endTime, [m]: e.target.value }
                        })
                      }
                      className="w-full text-center text-[10px] outline-none font-semibold bg-transparent"
                    />
                  </td>
                ))}
              </tr>

              {/* Row 4: Total Time */}
              <tr className="font-bold">
                <td colSpan={4} className="border border-black px-2 py-1 text-left bg-slate-50">
                  Total Time
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0.5 text-center">
                    <input
                      type="text"
                      placeholder=""
                      value={signOffData.totalTime[m] || ''}
                      onChange={(e) =>
                        setSignOffData({
                          ...signOffData,
                          totalTime: { ...signOffData.totalTime, [m]: e.target.value }
                        })
                      }
                      className="w-full text-center text-[10px] outline-none font-semibold bg-transparent"
                    />
                  </td>
                ))}
              </tr>

              {/* Row 5: SIGNATURE TECHNICIAN */}
              <tr className="font-bold">
                <td colSpan={4} className="border border-black px-2 py-1 text-left bg-slate-50 uppercase">
                  SIGNATURE TECHNICIAN
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0.5 text-center">
                    <input
                      type="text"
                      placeholder=""
                      value={signOffData.sigTechnician[m] || ''}
                      onChange={(e) =>
                        setSignOffData({
                          ...signOffData,
                          sigTechnician: { ...signOffData.sigTechnician, [m]: e.target.value }
                        })
                      }
                      className="w-full text-center text-[10px] outline-none font-semibold bg-transparent italic"
                    />
                  </td>
                ))}
              </tr>

              {/* Row 6: SIGNATURE ENGINEER */}
              <tr className="font-bold">
                <td colSpan={4} className="border border-black px-2 py-1 text-left bg-slate-50 uppercase">
                  SIGNATURE ENGINEER
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0.5 text-center">
                    <input
                      type="text"
                      placeholder=""
                      value={signOffData.sigEngineer[m] || ''}
                      onChange={(e) =>
                        setSignOffData({
                          ...signOffData,
                          sigEngineer: { ...signOffData.sigEngineer, [m]: e.target.value }
                        })
                      }
                      className="w-full text-center text-[10px] outline-none font-semibold bg-transparent italic"
                    />
                  </td>
                ))}
              </tr>

              {/* Row 7: SIGNATURE CELL OWNER */}
              <tr className="font-bold">
                <td colSpan={4} className="border border-black px-2 py-1 text-left bg-slate-50 uppercase">
                  SIGNATURE CELL OWNER
                </td>
                {MONTHS.map((m) => (
                  <td key={m} className="border border-black p-0.5 text-center">
                    <input
                      type="text"
                      placeholder=""
                      value={signOffData.sigCellOwner[m] || ''}
                      onChange={(e) =>
                        setSignOffData({
                          ...signOffData,
                          sigCellOwner: { ...signOffData.sigCellOwner, [m]: e.target.value }
                        })
                      }
                      className="w-full text-center text-[10px] outline-none font-semibold bg-transparent italic"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* FOOTER: PREPARED BY, APPROVED BY, LEGEND & NOTES TABLE */}
        {/* ========================================================= */}
        <div className="border-2 border-t-0 border-black p-2 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

            {/* Left Signatures: Prepared By & Approved By */}
            <div className="md:col-span-4 flex flex-col justify-center gap-4 text-xs font-black uppercase text-slate-900 pl-2">
              <div className="flex items-center gap-2">
                <span>PREPAIRED BY :</span>
                <input
                  type="text"
                  value={headerInfo.preparedBy}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, preparedBy: e.target.value })}
                  className="border-b border-black font-extrabold outline-none bg-transparent w-44 uppercase text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2">
                <span>APPROVED BY :</span>
                <input
                  type="text"
                  value={headerInfo.approvedBy}
                  onChange={(e) => setHeaderInfo({ ...headerInfo, approvedBy: e.target.value })}
                  className="border-b border-black font-extrabold outline-none bg-transparent w-44 uppercase text-slate-800"
                />
              </div>
            </div>

            {/* Center / Right: LEGEND TABLE WITH SYMBOLS */}
            <div className="md:col-span-8 overflow-x-auto">
              <table className="border-collapse border border-black text-[10px] w-full text-center font-bold">
                <tbody>
                  {/* Legend Header & Before/After PM demo */}
                  <tr>
                    <td rowSpan={2} className="border border-black px-3 py-1 font-black bg-slate-100 text-xs w-28">
                      LEGEND
                    </td>
                    <td className="border border-black px-2 py-0.5 text-left text-[9px] text-slate-600 bg-slate-50">
                      Before PM
                    </td>
                    <td className="border border-black p-1 text-sm font-black">X</td>
                    <td className="border border-black p-1 text-sm font-black text-emerald-600">✓</td>
                    <td className="border border-black p-1 text-sm font-black">△</td>
                    <td className="border border-black p-1 text-sm font-black">⋈</td>
                    <td className="border border-black p-1 text-sm font-black">◯</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-0.5 text-left text-[9px] text-slate-600 bg-slate-50">
                      After PM
                    </td>
                    <td className="border border-black px-2 py-1 font-bold">NOT OK</td>
                    <td className="border border-black px-2 py-1 font-bold">OK/DONE</td>
                    <td className="border border-black px-2 py-1 font-bold">ATTENTION</td>
                    <td className="border border-black px-2 py-1 font-bold">RECTIFIED</td>
                    <td className="border border-black px-2 py-1 font-bold">SPARE CHANGE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes 1, 2, 3 */}
          <div className="mt-3 pt-2 border-t border-black text-[10px] font-bold text-slate-800 space-y-0.5 pl-2 font-mono">
            <div>NOTE : 1 &nbsp; PERIODIC CHECKS WILL BE DONE IN MAR,JUNE,SEPT,DEC</div>
            <div>NOTE : 2 &nbsp; INPUT FROM DAILY WEEKLY &amp; START UP CHECKSHEET RESULT SHOULD BE CONSIDERED</div>
            <div>NOTE : 3 &nbsp; REFER MAINTENANCE MANUAL DURING PREVENTIVE MAINTENANCE</div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BACK SHEET: 14 VISUAL INSPECTION PHOTOS GRID              */}
        {/* EXACT ALIGNMENT TO USER SCREENSHOT:                      */}
        {/* Row 1 (3 images): Image 1, Image 2, Image 3               */}
        {/* Row 2 (3 images): Image 4, Image 5, Image 6               */}
        {/* Row 3 (4 images): Image 7, Image 8, Image 9, Image 10     */}
        {/* Row 4 (4 images): Image 11, Image 12, Image 13, Image 14  */}
        {/* ========================================================= */}
        <div className="mt-6 border-2 border-black bg-white p-3">
          <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-2 mb-4 gap-2">
            <div>
              <h4 className="text-sm font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                <ImageIcon size={18} className="text-emerald-700" />
                <span>BACK SHEET — VISUAL REFERENCE IMAGES (1 TO 14)</span>
              </h4>
              <p className="text-[11px] text-slate-600 font-medium">
                Click on any photo or use <strong>&quot;+ Add Photo&quot;</strong> to upload or replace image for that location.
              </p>
            </div>
            {Object.keys(customPhotos).length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all custom uploaded photos back to default reference images?')) {
                    setCustomPhotos({});
                    localStorage.removeItem(photosStorageKey);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 rounded border border-amber-300 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset All Photos to Default</span>
              </button>
            )}
          </div>

          {/* Row 1: Exactly 3 Images (Image 1, Image 2, Image 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4">
            {renderImageBlock(1)}
            {renderImageBlock(2)}
            {renderImageBlock(3)}
          </div>

          {/* Row 2: Exactly 3 Images (Image 4, Image 5, Image 6) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4">
            {renderImageBlock(4)}
            {renderImageBlock(5)}
            {renderImageBlock(6)}
          </div>

          {/* Row 3: Exactly 4 Images (Image 7, Image 8, Image 9, Image 10) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 mb-4">
            {renderImageBlock(7)}
            {renderImageBlock(8)}
            {renderImageBlock(9)}
            {renderImageBlock(10)}
          </div>

          {/* Row 4: Exactly 4 Images (Image 11, Image 12, Image 13, Image 14) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            {renderImageBlock(11)}
            {renderImageBlock(12)}
            {renderImageBlock(13)}
            {renderImageBlock(14)}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* POPUP: SYMBOL PICKER MODAL (Double Click Shortcut)       */}
      {/* ========================================================= */}
      {activePicker && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActivePicker(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl border border-slate-200 p-4 max-w-xs w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <div>
                <h5 className="text-sm font-bold text-slate-900">Insert Status Symbol</h5>
                <p className="text-[11px] text-slate-500">
                  Month: <strong>{activePicker.month}</strong> | Phase: <strong>{activePicker.half === 'before' ? 'Before PM' : 'After PM'}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePicker(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SYMBOL_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => applySymbol(opt.symbol)}
                  className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left transition-all cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center font-black text-sm text-slate-800">
                    {opt.symbol || '—'}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LIGHTBOX MODAL: FULLSCREEN IMAGE PREVIEW */}
      {/* ========================================================= */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="bg-slate-800/90 px-4 py-2.5 flex items-center justify-between border-b border-slate-700 text-white">
              <span className="font-bold text-sm tracking-wide">{previewImage.title}</span>
              <div className="flex items-center gap-2">
                {previewImage.imgId && (
                  <button
                    type="button"
                    onClick={() => {
                      triggerImageSelect(previewImage.imgId);
                      setPreviewImage(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    <Camera size={13} />
                    <span>Upload New Photo</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Lightbox Image */}
            <div className="p-4 flex items-center justify-center max-h-[75vh] overflow-auto">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}