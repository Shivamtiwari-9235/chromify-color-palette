import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Copy,
  Check,
  Pipette,
  AlertCircle,
  SlidersHorizontal,
} from 'lucide-react';
import {
  isValidHex,
  normalizeHex,
  hexToHsl,
  hslToHex,
} from '../../utils/colorUtils';

export default function StudioSwatch({
  color,
  index,
  onToggleLock,
  onCopy,
  onUpdateHex,
}) {
  const [inputValue, setInputValue] = useState(color.hex);
  const [inputError, setInputError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSliders, setShowSliders] = useState(false);

  const hsl = hexToHsl(color.hex);

  // Synchronize internal input value when color changes externally
  useEffect(() => {
    setInputValue(color.hex);
    setInputError(false);
  }, [color.hex]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (isValidHex(val)) {
      setInputError(false);
      onUpdateHex(index, normalizeHex(val));
    } else {
      setInputError(true);
    }
  };

  const handleInputBlur = () => {
    if (inputError || !isValidHex(inputValue)) {
      setInputValue(color.hex);
      setInputError(false);
    } else {
      setInputValue(normalizeHex(inputValue));
    }
  };

  const handleColorPickerChange = (e) => {
    const val = e.target.value.toUpperCase();
    setInputValue(val);
    setInputError(false);
    onUpdateHex(index, val);
  };

  const handleHslChange = (channel, value) => {
    const num = Number(value);
    const nextHsl = { ...hsl, [channel]: num };
    const newHex = hslToHex(nextHsl.h, nextHsl.s, nextHsl.l);
    setInputValue(newHex);
    setInputError(false);
    onUpdateHex(index, newHex);
  };

  const handleCopyClick = (e) => {
    e.stopPropagation();
    onCopy(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isDark = color.isDark;

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 rounded-2xl transition-all duration-200 border overflow-hidden min-h-[380px] sm:min-h-[480px] shadow-lg ${
        color.isLocked
          ? 'border-amber-400/80 ring-2 ring-amber-400/20 shadow-amber-950/20'
          : 'border-white/10 hover:border-white/20'
      }`}
      style={{
        backgroundColor: color.hex,
        color: isDark ? '#FFFFFF' : '#0F172A',
      }}
    >
      {/* Subtle top glare/texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-40" />

      {/* TOP BAR: Role Badge & Lock Button */}
      <div className="relative flex items-center justify-between w-full z-10">
        <span
          className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm ${
            isDark
              ? 'bg-black/40 text-white/90 border border-white/15'
              : 'bg-white/60 text-slate-900 border border-black/10'
          }`}
        >
          {color.role.split(' ')[0]}
        </span>

        <div className="flex items-center gap-1.5">
          {/* HSL Sliders Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowSliders((prev) => !prev);
            }}
            className={`p-2 rounded-xl transition-all active:scale-95 shadow-md ${
              showSliders
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                : isDark
                ? 'bg-black/40 text-white hover:bg-black/60 border border-white/15'
                : 'bg-white/70 text-slate-900 hover:bg-white/90 border border-black/10'
            }`}
            title="Toggle HSL sliders"
            aria-label={`Toggle HSL sliders for swatch ${index + 1}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Functional Lock Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock(index);
            }}
            className={`p-2 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 shadow-md ${
              color.isLocked
                ? 'bg-amber-400 text-slate-950 font-bold shadow-amber-400/30 ring-2 ring-amber-300'
                : isDark
                ? 'bg-black/40 text-white hover:bg-black/60 border border-white/15'
                : 'bg-white/70 text-slate-900 hover:bg-white/90 border border-black/10'
            }`}
            title={
              color.isLocked
                ? 'Color is locked (click to unlock)'
                : 'Click to lock this color'
            }
            aria-label={
              color.isLocked
                ? `Unlock swatch ${index + 1}`
                : `Lock swatch ${index + 1}`
            }
          >
            {color.isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5 text-slate-950" />
                <span className="text-[10px] font-mono tracking-tight hidden lg:inline">
                  Locked
                </span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                <span className="text-[10px] font-mono opacity-70 group-hover:opacity-100 hidden lg:inline">
                  Lock
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CENTER AREA: Click to Copy Swatch Prompt */}
      <div
        onClick={handleCopyClick}
        className="relative flex-grow flex items-center justify-center cursor-pointer py-6 z-10"
        title="Click swatch to copy color code"
      >
        <button
          type="button"
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-md shadow-xl transition-all duration-200 transform group-hover:scale-105 active:scale-95 ${
            copied
              ? 'bg-emerald-500 text-white'
              : isDark
              ? 'bg-black/60 text-white border border-white/20 hover:bg-black/80'
              : 'bg-white/80 text-slate-950 border border-black/10 hover:bg-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy HEX</span>
            </>
          )}
        </button>
      </div>

      {/* BOTTOM CONTROL CARD: HSL Sliders (when open), Hex Input, Color Picker, and Info */}
      <div
        className={`relative p-3.5 rounded-xl backdrop-blur-md transition-colors z-10 space-y-2.5 ${
          isDark
            ? 'bg-slate-950/80 text-white border border-white/10'
            : 'bg-white/90 text-slate-950 shadow-md border border-slate-200/60'
        }`}
      >
        {/* Collapsible HSL Sliders */}
        {showSliders && (
          <div className="space-y-2 pb-2.5 border-b border-black/10 dark:border-white/10">
            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] font-mono opacity-80">
                <span>Hue</span>
                <span>{hsl.h}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="359"
                value={hsl.h}
                onChange={(e) => handleHslChange('h', e.target.value)}
                aria-label={`Hue slider for swatch ${index + 1}`}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500 bg-slate-700/40"
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] font-mono opacity-80">
                <span>Saturation</span>
                <span>{hsl.s}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => handleHslChange('s', e.target.value)}
                aria-label={`Saturation slider for swatch ${index + 1}`}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500 bg-slate-700/40"
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] font-mono opacity-80">
                <span>Lightness</span>
                <span>{hsl.l}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => handleHslChange('l', e.target.value)}
                aria-label={`Lightness slider for swatch ${index + 1}`}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500 bg-slate-700/40"
              />
            </div>
          </div>
        )}

        {/* Hex Input & Native Color Picker */}
        <div className="space-y-1">
          <label className="block text-[10px] font-mono uppercase tracking-wider opacity-70">
            Edit HEX Code
          </label>
          <div className="flex items-center gap-1.5">
            <div className="relative flex-grow">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                maxLength={7}
                placeholder="#RRGGBB"
                aria-label={`HEX code input for swatch ${index + 1}`}
                className={`w-full px-2.5 py-1.5 text-xs font-mono font-bold uppercase rounded-lg border focus:outline-none transition-all ${
                  inputError
                    ? 'border-red-500 bg-red-500/10 text-red-400 focus:ring-1 focus:ring-red-500'
                    : isDark
                    ? 'bg-slate-900/90 text-white border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    : 'bg-white text-slate-900 border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                }`}
                title="Enter custom HEX code, e.g. #FF5733"
              />
            </div>

            {/* Native HTML Color Picker integrated via Pipette icon */}
            <div className="relative flex-shrink-0" title="Open visual color picker">
              <input
                type="color"
                value={color.hex}
                onChange={handleColorPickerChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                aria-label={`Pick visual color for swatch ${index + 1}`}
              />
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300'
                    : 'bg-white border-slate-300 hover:border-slate-400 text-slate-700'
                }`}
              >
                <Pipette className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Error Message for Invalid Hex */}
          {inputError && (
            <div className="flex items-center gap-1 text-[10px] text-red-400 font-mono pt-0.5">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>Invalid HEX (e.g. #FF5733)</span>
            </div>
          )}
        </div>

        {/* Color Name and WCAG Readout */}
        <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
          <div className="truncate pr-2 font-medium" title={color.name}>
            {color.name}
          </div>
          <span
            className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/15 dark:bg-white/15 flex-shrink-0"
            title={`WCAG contrast rating: ${color.wcag}`}
          >
            {color.wcag.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
