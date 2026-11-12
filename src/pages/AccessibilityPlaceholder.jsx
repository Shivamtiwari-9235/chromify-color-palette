import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowLeftRight,
  Scale,
  Palette,
} from 'lucide-react';
import {
  getWcagCompliance,
  isValidHex,
  normalizeHex,
  loadActivePalette,
} from '../utils/colorUtils';

export default function AccessibilityPlaceholder() {
  const activePalette = loadActivePalette();

  const [foreground, setForeground] = useState(
    activePalette?.[4]?.hex || '#FFFFFF'
  );
  const [background, setBackground] = useState(
    activePalette?.[0]?.hex || '#0F172A'
  );
  const [fgInput, setFgInput] = useState(foreground);
  const [bgInput, setBgInput] = useState(background);

  const compliance = getWcagCompliance(foreground, background);

  const handleFgChange = (val) => {
    setFgInput(val);
    if (isValidHex(val)) {
      setForeground(normalizeHex(val));
    }
  };

  const handleBgChange = (val) => {
    setBgInput(val);
    if (isValidHex(val)) {
      setBackground(normalizeHex(val));
    }
  };

  const handleSwap = () => {
    setForeground(background);
    setFgInput(background);
    setBackground(foreground);
    setBgInput(foreground);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </Link>

        <Link
          to="/studio"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors font-mono"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Open Palette Studio</span>
        </Link>
      </div>

      {/* Hero Header - Exact heading required: Make Every Color Accessible */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 shadow-xl mb-2">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Make Every Color Accessible
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Verify WCAG 2.1 AA and AAA contrast compliance between any two colors using relative luminance calculations.
        </p>
      </div>

      {/* Interactive Contrast Checker Workspace */}
      <div className="rounded-2xl p-1 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-slate-900/60 shadow-2xl">
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-6 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">
                Interactive WCAG 2.1 Contrast Checker
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Formula: (L1 + 0.05) / (L2 + 0.05)
            </span>
          </div>

          {/* Color Pickers Row */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            {/* Foreground Selector */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                  Foreground (Text)
                </label>
                <span className="text-xs font-mono text-slate-400">{foreground}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={foreground}
                  onChange={(e) => handleFgChange(e.target.value)}
                  aria-label="Foreground color picker"
                  className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                />
                <input
                  type="text"
                  value={fgInput}
                  onChange={(e) => handleFgChange(e.target.value)}
                  maxLength={7}
                  placeholder="#FFFFFF"
                  aria-label="Foreground HEX input"
                  className="flex-grow px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm uppercase focus:outline-none focus:border-indigo-500"
                />
              </div>
              {activePalette && (
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 mr-1">
                    Studio:
                  </span>
                  {activePalette.map((c, idx) => (
                    <button
                      key={c.id || idx}
                      type="button"
                      onClick={() => handleFgChange(c.hex)}
                      className="w-6 h-6 rounded-md border border-white/20 transition-transform hover:scale-110"
                      style={{ backgroundColor: c.hex }}
                      title={`Use ${c.hex} as foreground`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="lg:col-span-1 flex justify-center">
              <button
                type="button"
                onClick={handleSwap}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                title="Swap foreground and background colors"
                aria-label="Swap foreground and background colors"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Background Selector */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                  Background (Surface)
                </label>
                <span className="text-xs font-mono text-slate-400">{background}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={background}
                  onChange={(e) => handleBgChange(e.target.value)}
                  aria-label="Background color picker"
                  className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                />
                <input
                  type="text"
                  value={bgInput}
                  onChange={(e) => handleBgChange(e.target.value)}
                  maxLength={7}
                  placeholder="#0F172A"
                  aria-label="Background HEX input"
                  className="flex-grow px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm uppercase focus:outline-none focus:border-indigo-500"
                />
              </div>
              {activePalette && (
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 mr-1">
                    Studio:
                  </span>
                  {activePalette.map((c, idx) => (
                    <button
                      key={c.id || idx}
                      type="button"
                      onClick={() => handleBgChange(c.hex)}
                      className="w-6 h-6 rounded-md border border-white/20 transition-transform hover:scale-110"
                      style={{ backgroundColor: c.hex }}
                      title={`Use ${c.hex} as background`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Ratio Score & Live Sample Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Contrast Ratio & Badges */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Contrast Ratio
                </span>
                <div className="text-5xl font-extrabold font-mono text-white mt-1">
                  {compliance.ratio}:1
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: 'AA Normal Text (4.5:1)', pass: compliance.aaNormal },
                  { label: 'AA Large Text (3.0:1)', pass: compliance.aaLarge },
                  { label: 'AAA Normal Text (7.0:1)', pass: compliance.aaaNormal },
                  { label: 'AAA Large Text (4.5:1)', pass: compliance.aaaLarge },
                  { label: 'UI Components & Icons (3.0:1)', pass: compliance.uiComponent },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                  >
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <span
                      className={`inline-flex items-center gap-1 font-mono font-bold px-2 py-0.5 rounded ${
                        item.pass
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {item.pass ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>PASS</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>FAIL</span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Typography & UI Sample */}
            <div
              className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-white/10 flex flex-col justify-center space-y-5 transition-colors"
              style={{ backgroundColor: background, color: foreground }}
            >
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider opacity-80">
                  Live Readability Preview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  Large Heading Sample (18pt+ Bold)
                </h2>
              </div>

              <p className="text-sm sm:text-base leading-relaxed">
                Normal body text sample: Good contrast ensures that your interface remains legible across desktop monitors, mobile screens, and for users with low vision.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <span
                  className="px-4 py-2 rounded-lg text-xs font-bold border"
                  style={{ borderColor: foreground }}
                >
                  Outlined Control
                </span>
                <span
                  className="px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ backgroundColor: foreground, color: background }}
                >
                  Inverted Button
                </span>
              </div>
            </div>
          </div>
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
