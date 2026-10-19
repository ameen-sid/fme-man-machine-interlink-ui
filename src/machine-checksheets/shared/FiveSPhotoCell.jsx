import React from 'react';
import { Camera, Eye, Sparkles, PenTool, Scissors, Box, Layers, Monitor, Wrench } from 'lucide-react';

export default function FiveSPhotoCell({
  item,
  uploadedPhoto,
  onPhotoUpload,
  onRemovePhoto
}) {
  // Determine callout bubble text
  const getBubbleText = () => {
    if (item.bubbleText) return item.bubbleText;
    const lowerHow = (item.how || '').toLowerCase();
    const lowerBadge = (item.badge || '').toLowerCase();
    const lowerWhat = (item.what || '').toLowerCase();

    if (lowerHow === 'eye' || lowerHow === 'visual' || lowerBadge.includes('visual')) {
      return 'visual';
    }
    if (lowerHow === 'brush' || lowerBadge.includes('brush')) {
      return 'BRUSH';
    }
    if (lowerHow === 'suction' || lowerBadge.includes('suction')) {
      return 'SUCTION';
    }
    if (lowerHow === 'pen' || lowerBadge.includes('pen')) {
      return 'PEN';
    }
    return 'CLOTH';
  };

  const bubbleText = getBubbleText();

  // Render default illustration card when no custom photo is uploaded
  const renderIllustrationCard = () => {
    const sNoStr = String(item.sNo || item.sn || '');
    const locationLower = (item.location || item.itemCleaned || '').toLowerCase();

    // 1S: Work Place / Unwanted Items
    if (sNoStr === '1' || (locationLower.includes('work area') && sNoStr.startsWith('1'))) {
      return (
        <div className="w-full h-full flex flex-col justify-between items-center bg-amber-50/40 p-1 rounded-sm border border-amber-300">
          <div className="text-[7.5px] font-black text-amber-800 leading-none tracking-tight">WORK PLACE</div>
          <div className="flex gap-1.5 items-center my-0.5">
            <span className="w-3.5 h-2 bg-[#f87171] rounded-full"></span>
            <span className="w-4.5 h-2 bg-[#fbbf24] rounded-full"></span>
            <span className="w-2.5 h-2 bg-[#93c5fd] rounded-full"></span>
          </div>
          <div className="text-[6.5px] text-slate-400 font-semibold tracking-tight">Unwanted Items</div>
        </div>
      );
    }

    // 2S: Arranged Area / Defined Order
    if (sNoStr === '2' || locationLower.includes('tool kit') || (locationLower.includes('work area') && sNoStr.startsWith('2'))) {
      return (
        <div className="w-full h-full flex flex-col justify-between items-center bg-blue-50/40 p-1 rounded-sm border border-blue-300">
          <div className="text-[7.5px] font-black text-[#1e40af] leading-none tracking-tight">ARRANGED AREA</div>
          <div className="flex gap-1.5 items-center my-0.5">
            <span className="w-3 h-3 bg-[#94a3b8] border border-slate-600 rounded-2xs"></span>
            <span className="w-3 h-3 bg-[#94a3b8] border border-slate-600 rounded-2xs"></span>
            <span className="w-3 h-3 bg-[#94a3b8] border border-slate-600 rounded-2xs"></span>
          </div>
          <div className="text-[6.5px] text-[#059669] font-bold tracking-tight">Defined Order</div>
        </div>
      );
    }

    // Computer / Monitor
    if (locationLower.includes('computer') || locationLower.includes('pc')) {
      return (
        <div className="w-full h-full flex flex-col justify-between items-center bg-sky-50 p-1 rounded border border-sky-200">
          <div className="text-[7px] font-bold text-slate-800 leading-none">COMPUTER</div>
          <div className="w-7 h-4 bg-slate-800 border-2 border-slate-400 rounded-sm flex items-center justify-center">
            <span className="w-4 h-2 bg-sky-300 rounded-2xs"></span>
          </div>
          <div className="text-[6.5px] text-slate-600">PC &amp; Screen</div>
        </div>
      );
    }

    // Default card for all other 5S cleaning points
    return (
      <div className="w-full h-full flex flex-col justify-between items-center bg-slate-100 p-1 rounded border border-slate-300 text-slate-800">
        <div className="text-[7px] font-bold uppercase truncate max-w-full leading-tight text-center">
          {item.location || item.itemCleaned || '5S Item'}
        </div>
        <div className="flex items-center justify-center text-slate-600 my-0.5">
          <Wrench size={13} className="text-slate-600" />
        </div>
        <div className="text-[6.5px] text-slate-500 font-medium">Clean &amp; Checked</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[78px] relative group p-0.5">
      {/* Cyan Speech Bubble with downward triangle pointing to photo */}
      <div className="mb-0.5 relative flex flex-col items-center">
        <span className="bg-[#bfe6ee] border border-black text-black font-black text-[8px] px-2 py-0.5 rounded-sm inline-block shadow-2xs leading-none uppercase">
          {bubbleText}
        </span>
        <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-black mx-auto"></div>
      </div>

      {/* Photo Frame with File Upload Support */}
      <label
        className="w-full flex-1 border border-black overflow-hidden relative cursor-pointer block bg-white rounded-sm select-none"
        title={uploadedPhoto ? 'Click to change photo' : 'Click to upload photo from device'}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPhotoUpload}
        />
        {uploadedPhoto ? (
          <div className="w-full h-full relative">
            <img
              src={uploadedPhoto}
              alt={item.what || '5S Photo'}
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
              Change
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            {renderIllustrationCard()}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7.5px] font-bold text-white transition-opacity">
              <Camera size={11} className="mr-0.5" /> + Photo
            </div>
          </div>
        )}
      </label>

      {/* Remove Photo Action */}
      {uploadedPhoto && onRemovePhoto && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemovePhoto();
          }}
          title="Reset to default illustration"
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8.5px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-rose-700 cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
}
