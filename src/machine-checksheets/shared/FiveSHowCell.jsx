import React from 'react';
import { Camera, Eye, Sparkles, PenTool, Scissors } from 'lucide-react';

export default function FiveSHowCell({
  item,
  uploadedPhoto,
  onHowPhotoUpload,
  onRemoveHowPhoto
}) {
  const renderDefaultGraphic = (type) => {
    const lower = (type || '').toLowerCase();
    if (lower === 'eye' || lower === 'visual') {
      return (
        <div className="flex flex-col items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" className="my-0.5">
            {/* Outer magnifying ring */}
            <circle cx="16" cy="16" r="12" stroke="#000000" strokeWidth="2.5" fill="#ffffff" />
            {/* Inner concentric ring */}
            <circle cx="16" cy="16" r="6" stroke="#000000" strokeWidth="2.2" fill="#ffffff" />
            {/* Center pupil dot */}
            <circle cx="16" cy="16" r="2.5" fill="#000000" />
            {/* Magnifier handle at bottom right */}
            <rect x="23.5" y="24" width="4" height="8.5" rx="1.8" transform="rotate(-45 23.5 24)" fill="#000000" />
          </svg>
          <span className="text-[8px] font-black text-black uppercase tracking-tight leading-none">VISUAL</span>
        </div>
      );
    }

    if (lower === 'cloth' || lower === 'colin' || lower === 'oil_can') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-7 h-9 flex flex-col items-center justify-center relative">
            <div className="w-1.5 h-3.5 bg-slate-300 border border-slate-600 rounded-t-sm"></div>
            <div className="w-6 h-5.5 bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 rounded-b-md shadow-sm border border-amber-600 flex items-center justify-center">
              <Sparkles size={11} className="text-amber-800 opacity-75" />
            </div>
          </div>
          <span className="text-[7.5px] font-black text-black uppercase mt-0.5 tracking-tight leading-none">CLOTH</span>
        </div>
      );
    }

    if (lower === 'brush') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-7 h-9 flex flex-col items-center justify-center relative">
            <div className="w-2 h-4.5 bg-amber-700 rounded-t-sm border border-amber-900"></div>
            <div className="w-5 h-4 bg-slate-800 rounded-b-sm border border-black flex items-center justify-center">
              <span className="w-4 h-1 bg-amber-200 rounded-full"></span>
            </div>
          </div>
          <span className="text-[7.5px] font-black text-black uppercase mt-0.5 tracking-tight leading-none">BRUSH</span>
        </div>
      );
    }

    if (lower === 'suction') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-7 h-9 flex flex-col items-center justify-center relative">
            <div className="w-5 h-4 bg-teal-600 border border-teal-800 rounded-sm"></div>
            <div className="w-2 h-4 bg-slate-700 border border-slate-900 -mt-0.5"></div>
          </div>
          <span className="text-[7.5px] font-black text-black uppercase mt-0.5 tracking-tight leading-none">SUCTION</span>
        </div>
      );
    }

    if (lower === 'pen') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-7 h-9 flex flex-col items-center justify-center relative">
            <div className="w-2 h-5.5 bg-gradient-to-r from-red-600 via-amber-400 to-blue-700 rounded-t-sm border border-slate-700"></div>
            <div className="w-1.5 h-2 bg-yellow-400 border border-slate-800 rotate-45 -mt-0.5"></div>
          </div>
          <span className="text-[7.5px] font-black text-black uppercase mt-0.5 tracking-tight leading-none">PEN</span>
        </div>
      );
    }

    if (lower === 'hand_bin') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-7 h-8 flex flex-col items-center justify-center">
            <div className="w-6 h-5 bg-sky-600 rounded-sm border border-sky-800 flex items-center justify-center text-white text-[7px] font-black shadow-sm">
              BIN
            </div>
            <div className="w-4 h-1.5 bg-amber-700/60 rounded-full mt-0.5"></div>
          </div>
          <span className="text-[7px] font-black text-black uppercase mt-0.5 tracking-tight leading-none">BIN CLEAN</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center">
        <Eye size={16} />
        <span className="text-[7.5px] font-black text-black uppercase mt-0.5 tracking-tight leading-none">CHECK</span>
      </div>
    );
  };

  return (
    <div className="w-[52px] h-[58px] mx-auto relative group">
      <label
        className="w-full h-full flex flex-col items-center justify-center p-0.5 border-[1.5px] border-red-500 bg-white cursor-pointer relative overflow-hidden block select-none hover:border-red-600 transition-colors shadow-2xs"
        title={uploadedPhoto ? 'Click to change HOW photo' : 'Click to add photo for HOW method'}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onHowPhotoUpload}
        />
        {uploadedPhoto ? (
          <div className="w-full h-full relative">
            <img
              src={uploadedPhoto}
              alt="HOW method"
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
              Change
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            {renderDefaultGraphic(item.how)}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
              <Camera size={11} className="mr-0.5" /> + Photo
            </div>
          </div>
        )}
      </label>

      {uploadedPhoto && onRemoveHowPhoto && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemoveHowPhoto();
          }}
          title="Reset to default icon"
          className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8.5px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-rose-700 cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
}
