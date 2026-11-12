import React from 'react';
import { 
  Wand2, 
  Lock, 
  ShieldCheck, 
  Layout, 
  Code2, 
  Bookmark, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Wand2,
  Lock,
  ShieldCheck,
  Layout,
  Code2,
  Bookmark,
};

export default function FeatureCard({ feature }) {
  const Icon = iconMap[feature.iconName] || Sparkles;

  // Mini visual preview tailored to each feature
  const renderMiniVisual = (type) => {
    switch (type) {
      case 'harmonies':
        return (
          <div className="flex items-center gap-1.5 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="w-6 h-6 rounded-md bg-indigo-500 flex-shrink-0"></span>
            <span className="w-6 h-6 rounded-md bg-pink-500 flex-shrink-0"></span>
            <span className="w-6 h-6 rounded-md bg-amber-400 flex-shrink-0"></span>
            <span className="w-6 h-6 rounded-md bg-emerald-400 flex-shrink-0"></span>
            <span className="text-[10px] font-mono text-slate-400 ml-auto font-medium">Harmonic 72°</span>
          </div>
        );
      case 'locks':
        return (
          <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1">
              <span className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-[9px] text-white font-mono">
                🔒
              </span>
              <span className="w-5 h-5 rounded bg-slate-700"></span>
              <span className="w-5 h-5 rounded bg-amber-500 flex items-center justify-center text-[9px] text-white font-mono">
                🔒
              </span>
              <span className="w-5 h-5 rounded bg-slate-700"></span>
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-semibold">2 Locked</span>
          </div>
        );
      case 'contrast':
        return (
          <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                AAA 11.4:1
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AA Pass
              </span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        );
      case 'mockup':
        return (
          <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="h-1.5 w-16 bg-slate-800 rounded ml-1"></span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-1/2 h-5 rounded bg-indigo-500/30 border border-indigo-500/40"></div>
              <div className="w-1/2 h-5 rounded bg-pink-500/20 border border-pink-500/40"></div>
            </div>
          </div>
        );
      case 'code':
        return (
          <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300 space-y-0.5">
            <div className="text-indigo-400">--color-brand: #6366f1;</div>
            <div className="text-cyan-400">--color-accent: #06b6d4;</div>
          </div>
        );
      case 'favorites':
        return (
          <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-slate-300">Brand v2</span>
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            </div>
            <span className="text-[10px] text-indigo-400 font-mono">Saved in Storage</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group relative rounded-2xl p-6 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-950/20 hover:-translate-y-1">
      
      {/* Top row: Icon and Badge */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-slate-800 bg-slate-950 shadow-inner group-hover:scale-105 transition-transform"
            style={{ color: feature.accentColor }}
          >
            <Icon className="w-6 h-6" />
          </div>

          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 font-mono">
            {feature.badge}
          </span>
        </div>

        {/* Title and Tagline */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
            {feature.title}
          </h3>
          <p className="text-xs text-indigo-400/90 font-medium mt-0.5">
            {feature.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Bottom Visual Preview */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        {renderMiniVisual(feature.previewType)}
      </div>
    </div>
  );
}
