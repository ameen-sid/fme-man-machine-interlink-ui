import React, { useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';

// Badge positions calibrated over the plunger micrometer reference photo
const PLUNGER_BADGES = [
  { id: 1, label: '1', title: '1: Anvil Tip',           style: { bottom: '12%', left: '10%' } },
  { id: 2, label: '2', title: '2: Anvil Tightness',     style: { bottom: '28%', left: '28%' } },
  { id: 3, label: '3', title: '3: Spindle',             style: { bottom: '12%', right: '12%' } },
  { id: 4, label: '4', title: '4: Display',             style: { top: '38%',  right: '4%'  } },
  { id: 5, label: '5', title: '5: Switch',              style: { top: '38%',  left: '10%'  } },
  { id: 6, label: '6', title: '6: Push Button',         style: { top: '4%',   right: '25%' } },
  { id: 7, label: '7', title: '7: Calibration Tag',     style: { top: '12%',  right: '5%'  } },
];

const BLADE_BADGES = [
  { id: 1, label: '1', title: '1: Anvil Blade',         style: { top: '5%',   left: '4%'   } },
  { id: 2, label: '2', title: '2: Spindle',             style: { top: '11%',  left: '20%'  } },
  { id: 3, label: '3', title: '3: Display',             style: { top: '12%',  right: '4%'  } },
  { id: 4, label: '4', title: '4: Switch',              style: { bottom: '3%', left: '7%'  } },
  { id: 5, label: '5', title: '5: Ratchet',             style: { bottom: '3%', right: '10%'} },
  { id: 6, label: '6', title: '6: Calibration Validity',style: { top: '2.5%', right: '20%' } },
];

// Default reference image (real photo of the instrument)
const PLUNGER_DEFAULT_IMG = '/plunger-micrometer-guide.png';

// Helper to compress uploaded images for localStorage safety
const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

function getSavedPhoto(key) {
  try {
    return localStorage.getItem(key) || null;
  } catch (err) {
    console.warn('Failed to read stored photo:', err);
    return null;
  }
}

export default function MicrometerComponentGuide({
  machine,
  type = 'plunger', // 'plunger' | 'blade'
  title = ''
}) {
  const machineKey = machine?.name || machine?.id || 'default';
  const storageKey = `fme_instrument_center_photo_${machineKey}_${type}`;
  const isPlunger = type === 'plunger';
  const guideTitle = title || (isPlunger
    ? 'Plunger Micrometer Component Identification Guide (1 ~ 7)'
    : 'Blade Micrometer Component Identification Guide (1 ~ 6)');

  // userPhoto: a user-uploaded custom photo (stored in localStorage)
  const [userPhoto, setUserPhoto] = useState(() => getSavedPhoto(storageKey));

  // The displayed image: user-uploaded if available, otherwise the real reference photo
  const displaySrc = userPhoto || PLUNGER_DEFAULT_IMG;

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setUserPhoto(compressed);
      try {
        localStorage.setItem(storageKey, compressed);
      } catch (err) {
        console.warn('Failed to save to localStorage:', err);
      }
    } catch (err) {
      console.error('Error uploading photo:', err);
    }
    e.target.value = '';
  };

  const handleRemovePhoto = () => {
    if (window.confirm('Remove custom photo and restore default instrument photo?')) {
      setUserPhoto(null);
      try {
        localStorage.removeItem(storageKey);
      } catch (err) {
        console.warn('Failed to remove from localStorage:', err);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <label
        className="relative w-full max-w-[460px] aspect-[1.95/1] overflow-hidden flex items-center justify-center cursor-pointer group border border-slate-900 bg-white"
        title={userPhoto ? 'Hover to change photo' : 'Click to upload your own photo'}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />

        {/* Real instrument reference photo (or user-uploaded replacement) */}
        <img
          src={displaySrc}
          alt={guideTitle}
          className="w-full h-full object-fill bg-white"
        />

        {/* Hover overlay — shows camera icon + change/remove actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
          {userPhoto ? (
            <>
              <span className="text-white text-xs font-bold bg-black/60 px-2 py-1 rounded">Change Photo</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemovePhoto();
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                title="Remove Custom Photo"
              >
                <Trash2 size={13} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 text-white bg-black/50 px-3 py-1.5 rounded">
              <Camera size={18} />
              <span className="text-xs font-extrabold">Upload / Change Photo</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
