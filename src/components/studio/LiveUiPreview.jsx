import React, { useState } from 'react';
import { Layout, Sparkles, ArrowRight, CheckCircle2, Bell } from 'lucide-react';
import { isDarkColor } from '../../utils/colorUtils';

const PREVIEW_TABS = ['Overview', 'Analytics', 'Pricing'];

export default function LiveUiPreview({ colors, onNotify }) {
  const [activeTab, setActiveTab] = useState('Overview');

  if (!colors || colors.length < 5) return null;

  const surface = colors[0].hex;
  const primary = colors[1].hex;
  const accent = colors[2].hex;
  const success = colors[3].hex;
  const highlight = colors[4].hex;

  const surfaceIsDark = isDarkColor(surface);
  const cssVars = {
    '--chromify-surface': surface,
    '--chromify-surface-text': surfaceIsDark ? '#F8FAFC' : '#0F172A',
    '--chromify-surface-muted': surfaceIsDark ? '#CBD5E1' : '#475569',
    '--chromify-surface-border': surfaceIsDark
      ? 'rgba(255,255,255,0.12)'
      : 'rgba(15,23,42,0.12)',
    '--chromify-card-bg': surfaceIsDark
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(255,255,255,0.75)',
    '--chromify-primary': primary,
    '--chromify-primary-text': isDarkColor(primary) ? '#FFFFFF' : '#0F172A',
    '--chromify-accent': accent,
    '--chromify-accent-text': isDarkColor(accent) ? '#FFFFFF' : '#0F172A',
    '--chromify-success': success,
    '--chromify-success-text': isDarkColor(success) ? '#FFFFFF' : '#0F172A',
    '--chromify-highlight': highlight,
    '--chromify-highlight-text': isDarkColor(highlight) ? '#FFFFFF' : '#0F172A',
  };

  const handlePreviewButtonClick = (label, colorToken, color) => {
    onNotify?.(`${label} clicked — using ${colorToken} ${color}`);
  };

  const renderTabContent = () => {
    if (activeTab === 'Analytics') {
      return (
        <div className="space-y-4">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--chromify-surface-muted)' }}
            >
              Weekly performance
            </span>
            <h3 className="text-lg font-bold leading-snug">Your workspace is growing</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ['Visitors', '12.8K', 'var(--chromify-primary)'],
              ['Projects', '248', 'var(--chromify-accent)'],
              ['Growth', '+24%', 'var(--chromify-success)'],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="rounded-lg border p-3"
                style={{
                  borderColor: 'var(--chromify-surface-border)',
                  backgroundColor: 'var(--chromify-surface)',
                }}
              >
                <span
                  className="text-[11px]"
                  style={{ color: 'var(--chromify-surface-muted)' }}
                >
                  {label}
                </span>
                <p className="text-base font-bold" style={{ color }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'Pricing') {
      return (
        <div
          className="rounded-lg border p-4 space-y-3"
          style={{
            borderColor: 'var(--chromify-primary)',
            backgroundColor: 'var(--chromify-surface)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold" style={{ color: 'var(--chromify-primary)' }}>
                Pro plan
              </span>
              <h3 className="text-lg font-bold">Everything you need to ship</h3>
            </div>
            <span className="text-xl font-bold">$24</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--chromify-surface-muted)' }}>
            Unlimited projects, advanced insights, and priority support.
          </p>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-transform active:scale-95 shadow-sm"
            style={{
              backgroundColor: 'var(--chromify-primary)',
              color: 'var(--chromify-primary-text)',
            }}
            onClick={() => handlePreviewButtonClick('Choose plan', 'Primary Brand', primary)}
          >
            Choose plan
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-2.5">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
            style={{
              backgroundColor: 'var(--chromify-highlight)',
              color: 'var(--chromify-highlight-text)',
            }}
          >
            <Bell className="w-3 h-3" />
            New Release
          </span>
          <h3 className="text-lg font-bold leading-snug">
            Build cohesive interfaces faster
          </h3>
          <p
            className="text-xs leading-relaxed"
            style={{ color: 'var(--chromify-surface-muted)' }}
          >
            This card automatically inherits your Surface, Primary, Accent, and Highlight CSS variables so you can judge visual hierarchy at a glance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-transform active:scale-95"
            style={{
              backgroundColor: 'var(--chromify-primary)',
              color: 'var(--chromify-primary-text)',
            }}
            onClick={() => handlePreviewButtonClick('Primary Action', 'Primary Brand', primary)}
          >
            <span>Primary Action</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-transform active:scale-95"
            style={{
              backgroundColor: 'var(--chromify-accent)',
              color: 'var(--chromify-accent-text)',
            }}
            onClick={() => handlePreviewButtonClick('Secondary', 'Interactive Accent', accent)}
          >
            <span>Secondary</span>
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20">
            <Layout className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Live UI Design Preview</h2>
            <p className="text-xs text-slate-400">
              Real-time mockup applying your active palette via CSS variables to a navbar, card, and buttons.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 self-start sm:self-auto">
          CSS Variables Live
        </span>
      </div>

      {/* Preview Canvas driven by CSS variables */}
      <div
        className="rounded-xl p-4 sm:p-6 border border-white/10 transition-colors duration-200 space-y-6"
        style={{
          ...cssVars,
          backgroundColor: 'var(--chromify-surface)',
          color: 'var(--chromify-surface-text)',
        }}
      >
        {/* Sample Navbar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 rounded-xl border"
          style={{
            borderColor: 'var(--chromify-surface-border)',
            backgroundColor: 'var(--chromify-card-bg)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: 'var(--chromify-primary)',
                color: 'var(--chromify-primary-text)',
              }}
            >
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm tracking-tight">BrandKit</span>
          </div>

          <div
            className="hidden sm:flex items-center gap-5 text-xs font-medium"
            style={{ color: 'var(--chromify-surface-muted)' }}
          >
            {PREVIEW_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(tab)}
                  className="rounded-md px-2 py-1 transition-colors"
                  style={{
                    color: isActive
                      ? 'var(--chromify-primary-text)'
                      : 'var(--chromify-surface-muted)',
                    backgroundColor: isActive
                      ? 'var(--chromify-primary)'
                      : 'transparent',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-transform active:scale-95 shadow-sm"
              style={{
                backgroundColor: 'var(--chromify-primary)',
                color: 'var(--chromify-primary-text)',
              }}
              onClick={() => handlePreviewButtonClick('Get Started', 'Primary Brand', primary)}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Sample Hero / Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Feature Card */}
          <div
            className="rounded-xl p-5 border flex flex-col justify-between space-y-4"
            style={{
              borderColor: 'var(--chromify-surface-border)',
              backgroundColor: 'var(--chromify-card-bg)',
            }}
          >
            {renderTabContent()}
          </div>

          {/* Status & Metrics Card */}
          <div
            className="rounded-xl p-5 border flex flex-col justify-between space-y-4"
            style={{
              borderColor: 'var(--chromify-surface-border)',
              backgroundColor: 'var(--chromify-card-bg)',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--chromify-surface-muted)' }}
              >
                Palette Roles
              </span>
              <span
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'var(--chromify-success)',
                  color: 'var(--chromify-success-text)',
                }}
              >
                <CheckCircle2 className="w-3 h-3" />
                Active
              </span>
            </div>

            <div className="space-y-2">
              {colors.map((c, idx) => (
                <div key={c.id || idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-medium">{c.role}</span>
                  </div>
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: 'var(--chromify-surface-muted)' }}
                  >
                    {c.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
