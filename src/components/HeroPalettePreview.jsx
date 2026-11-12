import React, { useState } from 'react';
import { Copy, Check, Lock, Unlock, Sparkles, SlidersHorizontal, Share2, Layers } from 'lucide-react';
import { SAMPLE_PALETTES } from '../data/palettes';

export default function HeroPalettePreview() {
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState(null);
  const [lockedIndices, setLockedIndices] = useState([1]); // By default swatch 1 is locked as demonstration

  const currentPalette = SAMPLE_PALETTES[activePaletteIndex];

  const handleCopy = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex(null);
    }, 2000);
  };

  const toggleLock = (index, e) => {
    e.stopPropagation();
    if (lockedIndices.includes(index)) {
      setLockedIndices(lockedIndices.filter((i) => i !== index));
    } else {
      setLockedIndices([...lockedIndices, index]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 sm:mt-12">
      {/* Outer Glow & Card Container */}
      <div className="relative rounded-2xl p-1 bg-gradient-to-b from-slate-700/50 via-slate-800/20 to-slate-900/60 shadow-2xl shadow-indigo-950/50">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-indigo-500/20 via-pink-500/20 to-amber-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 sm:p-6 space-y-4">
          
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Live Studio Preset:
              </span>
              <span className="text-sm font-bold text-white">
                {currentPalette.name}
              </span>
              <span className="text-xs text-slate-400 hidden lg:inline-block">
                — {currentPalette.tagline}
              </span>
            </div>

            {/* Presets Switcher */}
            <div className="flex items-center gap-1.5 self-stretch sm:self-auto bg-slate-950/70 p-1 rounded-lg border border-slate-800/80">
              {SAMPLE_PALETTES.map((palette, idx) => (
                <button
                  key={palette.id}
                  onClick={() => setActivePaletteIndex(idx)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    activePaletteIndex === idx
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  {palette.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* The 5-Color Interactive Swatch Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 h-auto sm:h-80">
            {currentPalette.colors.map((color, index) => {
              const isLocked = lockedIndices.includes(index);
              const isCopied = copiedHex === color.hex;

              return (
                <div
                  key={`${currentPalette.id}-${color.hex}-${index}`}
                  onClick={() => handleCopy(color.hex)}
                  className="group relative flex flex-col justify-between p-4 rounded-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:z-10 border border-white/10 overflow-hidden min-h-[120px] sm:min-h-0"
                  style={{ backgroundColor: color.hex }}
                  title="Click to copy HEX code"
                >
                  {/* Subtle top glare/sheen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-50"></div>

                  {/* Top Swatch Row: Role tag and Lock button */}
                  <div className="relative flex items-center justify-between w-full">
                    <span 
                      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full backdrop-blur-md ${
                        color.isDark
                          ? 'bg-black/30 text-white/90 border border-white/10'
                          : 'bg-white/50 text-slate-900 border border-black/10'
                      }`}
                    >
                      {color.role.split(' ')[0]}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleLock(index, e)}
                      className={`p-1.5 rounded-full transition-transform active:scale-95 ${
                        color.isDark 
                          ? 'bg-black/30 text-white hover:bg-black/50' 
                          : 'bg-white/60 text-slate-900 hover:bg-white/80'
                      }`}
                      title={isLocked ? 'Unlocked in Stage 2' : 'Lock color'}
                    >
                      {isLocked ? (
                        <Lock className="w-3.5 h-3.5 text-amber-300" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      )}
                    </button>
                  </div>

                  {/* Middle / Center Swatch: Copy prompt on hover */}
                  <div className="relative flex items-center justify-center py-2 sm:py-6">
                    <span 
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg ${
                        color.isDark 
                          ? 'bg-black/70 text-white' 
                          : 'bg-white/80 text-slate-950'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy HEX</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Bottom Swatch Info: Name, Hex, WCAG */}
                  <div 
                    className={`relative p-2.5 rounded-lg backdrop-blur-md transition-colors ${
                      color.isDark
                        ? 'bg-slate-950/60 text-white'
                        : 'bg-white/70 text-slate-950 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm sm:text-base font-bold tracking-tight">
                        {color.hex}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-black/20">
                        {color.wcag.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs font-medium truncate opacity-90">
                        {color.name}
                      </span>
                      <span className="text-[10px] opacity-75 font-mono">
                        {color.wcag.split(' ')[1]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Palette Feature Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 rounded font-mono text-[11px]">
                  Spacebar
                </kbd>
                <span>Generate random harmonies in Studio</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Click any color to copy HEX code</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">Color System:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-200 font-semibold text-[11px]">
                sRGB / HEX / HSL
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
