import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  Sparkles,
  Wand2,
  Lock,
  Unlock,
  SlidersHorizontal,
  ArrowLeft,
  Bookmark,
  ShieldCheck,
} from 'lucide-react';

import StudioSwatch from '../components/studio/StudioSwatch';
import LiveUiPreview from '../components/studio/LiveUiPreview';
import ExportPanel from '../components/studio/ExportPanel';
import Toast from '../components/studio/Toast';
import {
  generateHarmoniousPalette,
  getColorName,
  getWcagInfo,
  isDarkColor,
  isValidHex,
  normalizeHex,
  loadActivePalette,
  saveActivePalette,
  loadSavedPalettes,
  savePalettesToStorage,
  isDuplicatePalette,
} from '../utils/colorUtils';

const HARMONY_MODES = [
  { id: 'analogous', label: 'Analogous', description: 'Adjacent harmonious colors' },
  { id: 'complementary', label: 'Complementary', description: 'Opposite high-contrast colors' },
  { id: 'triadic', label: 'Triadic', description: 'Three evenly-spaced balanced colors' },
  { id: 'split-complementary', label: 'Split-Complementary', description: 'Base color plus two colors beside its complement' },
  { id: 'monochromatic', label: 'Monochromatic', description: 'Single hue across lightness steps' },
];

export default function Studio() {
  const [harmonyMode, setHarmonyMode] = useState('analogous');
  const [colors, setColors] = useState(() => {
    const savedActive = loadActivePalette();
    return savedActive || generateHarmoniousPalette('analogous');
  });
  const [paletteName, setPaletteName] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Sync active palette to localStorage for cross-page use (Accessibility & Collections)
  useEffect(() => {
    saveActivePalette(colors);
  }, [colors]);

  // Trigger non-blocking toast
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  }, []);

  // Generate a new palette respecting locked colors
  const handleGenerate = useCallback(
    (modeToUse) => {
      const mode = modeToUse || harmonyMode;
      setColors((prevColors) => {
        if (prevColors.every((c) => c.isLocked)) {
          triggerToast('All 5 colors are locked. Unlock at least one to regenerate.');
          return prevColors;
        }
        return generateHarmoniousPalette(mode, prevColors);
      });
    },
    [harmonyMode, triggerToast]
  );

  // Select harmony mode & generate
  const handleModeChange = (modeId) => {
    setHarmonyMode(modeId);
    handleGenerate(modeId);
    const modeObj = HARMONY_MODES.find((m) => m.id === modeId);
    triggerToast(`Switched to ${modeObj?.label || modeId} harmony`);
  };

  // Toggle lock state on a specific swatch
  const handleToggleLock = (index) => {
    setColors((prevColors) => {
      const updated = [...prevColors];
      const target = updated[index];
      const newLockedState = !target.isLocked;
      updated[index] = { ...target, isLocked: newLockedState };
      triggerToast(
        newLockedState
          ? `Locked ${target.hex} (Swatch ${index + 1})`
          : `Unlocked Swatch ${index + 1}`
      );
      return updated;
    });
  };

  // Unlock all swatches
  const handleUnlockAll = () => {
    setColors((prevColors) =>
      prevColors.map((c) => ({ ...c, isLocked: false }))
    );
    triggerToast('All swatches unlocked');
  };

  // Update a single swatch with a valid custom HEX code
  const handleUpdateHex = (index, newHex) => {
    if (!isValidHex(newHex)) return;
    const normalized = normalizeHex(newHex);

    setColors((prevColors) => {
      const updated = [...prevColors];
      const wcag = getWcagInfo(normalized);
      updated[index] = {
        ...updated[index],
        hex: normalized,
        name: getColorName(normalized),
        wcag: wcag.summary,
        isDark: isDarkColor(normalized),
      };
      return updated;
    });
  };

  // Copy text/code to clipboard
  const handleCopyText = (text, customMsg) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    } else {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    triggerToast(customMsg || `Copied ${text} to clipboard!`);
  };

  // Save current palette to localStorage (preventing duplicates)
  const handleSavePalette = () => {
    const existing = loadSavedPalettes();
    if (isDuplicatePalette(colors, existing)) {
      triggerToast('This palette is already saved in My Collections!');
      return;
    }
    const label =
      paletteName.trim() || `${colors[1]?.name || 'Custom'} Palette`;
    const newEntry = {
      id: `pal-${Date.now()}`,
      name: label,
      mode: harmonyMode,
      createdAt: new Date().toISOString(),
      colors: colors.map((c) => ({ ...c })),
    };
    const saved = savePalettesToStorage([newEntry, ...existing]);
    if (saved) {
      setPaletteName('');
      triggerToast(`Saved "${label}" to My Collections!`);
    } else {
      triggerToast('Unable to save palette to localStorage.');
    }
  };

  // Spacebar keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        const activeTag = document.activeElement?.tagName?.toUpperCase();
        const isEditable =
          activeTag === 'INPUT' ||
          activeTag === 'TEXTAREA' ||
          document.activeElement?.isContentEditable;

        if (isEditable) {
          return;
        }

        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  const lockedCount = colors.filter((c) => c.isLocked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Toast message={toastMessage} isVisible={toastVisible} />

      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          {lockedCount > 0 && (
            <button
              type="button"
              onClick={handleUnlockAll}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors font-mono"
              title="Unlock all swatches"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Unlock All ({lockedCount})</span>
            </button>
          )}

          <Link
            to="/accessibility"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors font-mono"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Check WCAG Contrast</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Color Engine</span>
          </div>
        </div>
      </div>

      {/* Main Studio Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-xl mb-1">
          <Palette className="w-7 h-7" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Your Creative Palette Studio
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Generate mathematically balanced color combinations, freeze shades you love with the lock icon, adjust HSL sliders, and export developer-ready tokens.
        </p>
      </div>

      {/* MAIN STUDIO WORKSPACE CONTAINER */}
      <div className="rounded-3xl p-1 bg-gradient-to-b from-slate-700/50 via-slate-800/30 to-slate-900/70 shadow-2xl space-y-6">
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-6 backdrop-blur-xl">
          
          {/* TOOLBAR: Harmony Modes & Generate Button */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            
            {/* Harmony Mode Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Harmony Mode:</span>
              </span>

              <div className="grid grid-cols-2 sm:flex gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full sm:w-auto">
                {HARMONY_MODES.map((mode) => {
                  const isActive = harmonyMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => handleModeChange(mode.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                      title={mode.description}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Action Button & Keyboard Hint */}
            <div className="flex flex-wrap items-center gap-3 justify-end">
              <span className="text-xs text-slate-400 font-mono hidden md:inline-flex items-center gap-1.5">
                <span>Press</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[11px] font-bold">
                  Spacebar
                </kbd>
                <span>to generate</span>
              </span>

              <button
                type="button"
                onClick={() => handleGenerate()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-95"
              >
                <Wand2 className="w-4 h-4 text-indigo-200" />
                <span>Generate Palette</span>
              </button>
            </div>

          </div>

          {/* THE 5-COLOR INTERACTIVE SWATCH CANVAS */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-2">
            {colors.map((color, index) => (
              <StudioSwatch
                key={color.id || `swatch-${index}`}
                color={color}
                index={index}
                onToggleLock={handleToggleLock}
                onCopy={(hex) => handleCopyText(hex)}
                onUpdateHex={handleUpdateHex}
              />
            ))}
          </div>

          {/* BOTTOM STUDIO CONTROL BAR: Save to Collections */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Lock icons freeze swatches while regenerating others</span>
              </span>
              <span className="hidden lg:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Use HSL sliders or HEX inputs to fine-tune any color</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                placeholder="Palette name (optional)"
                aria-label="Palette name for saving"
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 w-44 sm:w-48"
              />
              <button
                type="button"
                onClick={handleSavePalette}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors shadow-md shadow-purple-600/20 flex-shrink-0"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save Palette</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* LIVE UI DESIGN PREVIEW */}
      <LiveUiPreview colors={colors} onNotify={triggerToast} />

      {/* EXPORT OPTIONS (CSS, TAILWIND, HEX LIST) */}
      <ExportPanel colors={colors} onCopy={handleCopyText} onNotify={triggerToast} />
    </div>
  );
}
