import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  HardDrive,
  ArrowLeft,
  Copy,
  Trash2,
  Palette,
  ArrowUpRight,
} from 'lucide-react';
import Toast from '../components/studio/Toast';
import {
  loadSavedPalettes,
  savePalettesToStorage,
  saveActivePalette,
} from '../utils/colorUtils';

export default function FavoritesPlaceholder() {
  const navigate = useNavigate();
  const [savedPalettes, setSavedPalettes] = useState(() => loadSavedPalettes());

  useEffect(() => {
    const syncFromStorage = () => {
      setSavedPalettes(loadSavedPalettes());
    };
    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, []);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleApplyInStudio = (palette) => {
    saveActivePalette(palette.colors);
    navigate('/studio');
  };

  const handleCopyHexList = (palette) => {
    const hexList = palette.colors.map((c) => c.hex).join(', ');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hexList).catch(() => {});
    }
    triggerToast(`Copied ${palette.name} HEX codes!`);
  };

  const handleDelete = (id, name) => {
    const updated = savedPalettes.filter((p) => p.id !== id);
    setSavedPalettes(updated);
    savePalettesToStorage(updated);
    triggerToast(`Removed "${name}" from Collections`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
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

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
          <HardDrive className="w-3.5 h-3.5" />
          <span>Saved in LocalStorage ({savedPalettes.length})</span>
        </div>
      </div>

      {/* Hero Header - Exact heading required: Your Saved Color Collections */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-600/15 text-purple-400 border border-purple-500/30 shadow-xl mb-2">
          <Bookmark className="w-7 h-7" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Your Saved Color Collections
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Your personal library of curated palettes stored locally in your browser. Reopen any saved palette directly in the Studio at any time.
        </p>
      </div>

      {/* Saved Palettes Grid */}
      <div className="rounded-2xl p-1 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-slate-900/60 shadow-2xl">
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Saved Palettes</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {savedPalettes.length} {savedPalettes.length === 1 ? 'Palette' : 'Palettes'}
              </span>
            </div>

            <Link
              to="/studio"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Create New in Studio</span>
            </Link>
          </div>

          {savedPalettes.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                You haven't saved any palettes yet. Head to Palette Studio, generate or customize a palette, and click <strong>Save Palette</strong> to store it here.
              </p>
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <Palette className="w-4 h-4" />
                <span>Go to Palette Studio</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white truncate">
                        {palette.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 capitalize flex-shrink-0">
                        {palette.mode || 'custom'}
                      </span>
                    </div>

                    <div className="flex h-14 rounded-lg overflow-hidden border border-slate-800">
                      {palette.colors.map((c, idx) => (
                        <div
                          key={idx}
                          className="w-1/5 h-full group relative cursor-pointer"
                          style={{ backgroundColor: c.hex }}
                          title={`${c.hex} (${c.name})`}
                          onClick={() => handleCopyHexList(palette)}
                        />
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {palette.colors.map((c, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800"
                        >
                          {c.hex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleApplyInStudio(palette)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>Apply in Studio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyHexList(palette)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                        title="Copy HEX list"
                        aria-label={`Copy HEX list for ${palette.name}`}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(palette.id, palette.name)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                        title="Delete saved palette"
                        aria-label={`Delete ${palette.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home Page</span>
        </Link>
      </div>
    </div>
  );
}
