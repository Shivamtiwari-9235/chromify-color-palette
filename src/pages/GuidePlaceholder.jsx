import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ArrowLeft, 
  ShieldCheck, 
  Lightbulb 
} from 'lucide-react';

export default function GuidePlaceholder() {
  const harmonies = [
    {
      name: 'Analogous',
      angle: '30° apart on color wheel',
      description: 'Colors that sit next to each other on the color wheel. Creates serene, natural, and comfortable visual moods.',
      swatches: ['#3B82F6', '#6366F1', '#8B5CF6'],
      useCase: 'Best for background surfaces, subtle gradients, and cohesive product moodboards.'
    },
    {
      name: 'Complementary',
      angle: '180° opposite on color wheel',
      description: 'Colors on directly opposite ends of the color wheel. Maximizes visual tension and immediate optical pop.',
      swatches: ['#4F46E5', '#F59E0B'],
      useCase: 'Best for primary buttons, call-to-action badges, and high-impact hero accents.'
    },
    {
      name: 'Triadic',
      angle: '120° equidistant triangle',
      description: 'Three colors evenly spaced around the color wheel. Highly vibrant even when using desaturated tints.',
      swatches: ['#EF4444', '#10B981', '#3B82F6'],
      useCase: 'Best for data visualization charts, multi-category tags, and playful brand palettes.'
    },
    {
      name: 'Split-Complementary',
      angle: '150° and 210° from the base',
      description: 'A base color paired with the two colors on either side of its complement. Creates contrast with more flexibility than a direct complement.',
      swatches: ['#4F46E5', '#F97316', '#FACC15'],
      useCase: 'Best for dashboards, editorial layouts, and expressive interfaces that need balanced contrast.'
    },
    {
      name: 'Monochromatic',
      angle: 'Same hue, varied lightness & saturation',
      description: 'Variations in tint, tone, and shade of a single seed hue. Clean, professional, and visually unified.',
      swatches: ['#1E1B4B', '#4338CA', '#818CF8'],
      useCase: 'Best for minimalist SaaS apps, corporate dashboards, and typography scales.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interactive Reference Guide</span>
        </div>
      </div>

      {/* Hero Header - Exact heading required: Everything You Need to Master Color */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-xl mb-2">
          <BookOpen className="w-7 h-7" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Everything You Need to Master Color
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Master the principles of optical harmony, accessible contrast ratios, and systematic color token architecture for modern web applications.
        </p>
      </div>

      {/* Section 1: The 60-30-10 Rule */}
      <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The 60-30-10 Rule in Modern UI</h2>
            <p className="text-xs text-slate-400">The timeless interior and visual design ratio adapted for digital interfaces.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono text-2xl font-bold text-indigo-400">60%</span>
            <h3 className="text-sm font-bold text-white">Dominant Surface Neutral</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Main canvas background, cards, and container surfaces (typically rich dark slate or clean light off-white). Sets the overall mood.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono text-2xl font-bold text-indigo-400">30%</span>
            <h3 className="text-sm font-bold text-white">Secondary Structural Hue</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Typography, sidebars, borders, muted badges, and secondary buttons. Creates depth and legible structure without competing.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono text-2xl font-bold text-pink-400">10%</span>
            <h3 className="text-sm font-bold text-white">High-Impact Accent</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Primary calls-to-action, key badges, status alerts, and active navigation indicators. Draws the user's eye directly to vital actions.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Mathematical Harmonies */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Mathematical Color Harmonies</h2>
          <p className="text-sm text-slate-400 mt-1">How Chromify’s generator engine determines balanced relationships on the 360° color wheel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {harmonies.map((harmony) => (
            <div key={harmony.name} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{harmony.name}</h3>
                  <span className="text-xs font-mono text-indigo-400">{harmony.angle}</span>
                </div>

                <div className="flex gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                  {harmony.swatches.map((hex, i) => (
                    <span 
                      key={i} 
                      className="w-6 h-6 rounded-md shadow-sm"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    ></span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {harmony.description}
              </p>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">Use Case:</span>
                <span>{harmony.useCase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: WCAG Contrast Standards */}
      <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">WCAG 2.1 Contrast Reference Thresholds</h2>
            <p className="text-xs text-slate-400">Guaranteed legibility criteria defined by the Web Content Accessibility Guidelines.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-bold text-emerald-400">3.0:1</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Level AA (Large)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Minimum ratio required for large text (18pt+ or 14pt+ bold) and essential graphical UI components (icons, borders, focus rings).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-bold text-indigo-400">4.5:1</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Level AA (Normal)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mandatory standard for all normal body text, captions, and table cells. Ensures readability for users with moderate vision loss.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-bold text-purple-400">7.0:1</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Level AAA (Enhanced)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enhanced contrast benchmark for optimal readability across varying screen brightness, direct sunlight, and older display hardware.
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="text-center pt-6">
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
