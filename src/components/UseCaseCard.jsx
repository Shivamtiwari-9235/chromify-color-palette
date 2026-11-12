import React from 'react';
import { Palette, Terminal, GraduationCap, Sparkles, Check } from 'lucide-react';

const iconMap = {
  Palette,
  Terminal,
  GraduationCap,
  Sparkles,
};

export default function UseCaseCard({ useCase }) {
  const Icon = iconMap[useCase.iconName] || Sparkles;

  return (
    <div className="relative flex flex-col p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div 
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-950 border border-slate-800"
          style={{ color: useCase.color }}
        >
          <Icon className="w-6 h-6" />
        </div>

        <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono">
          {useCase.badge}
        </span>
      </div>

      {/* Role & Tagline */}
      <h3 className="text-lg font-bold text-white mb-1">
        {useCase.role}
      </h3>
      <p className="text-xs text-indigo-400 font-medium mb-3">
        {useCase.tagline}
      </p>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        {useCase.description}
      </p>

      {/* Key Highlights list */}
      <div className="mt-auto pt-4 border-t border-slate-800/80 space-y-2">
        {useCase.highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
            <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Check className="w-2.5 h-2.5" />
            </span>
            <span>{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
