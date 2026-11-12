import React from 'react';
import { Sparkles, LockKeyhole, CheckCircle2, FileCode } from 'lucide-react';

const iconMap = {
  Sparkles,
  LockKeyhole,
  CheckCircle2,
  FileCode,
};

export default function StepCard({ stepItem, index, total }) {
  const Icon = iconMap[stepItem.iconName] || Sparkles;

  return (
    <div className="relative flex flex-col p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-200">
      
      {/* Step Header: Step Number & Icon */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-3xl font-extrabold text-slate-700 tracking-tighter">
          {stepItem.step}
        </span>
        
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Tag */}
      <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-2 font-mono">
        {stepItem.tag}
      </span>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-2 leading-snug">
        {stepItem.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4">
        {stepItem.description}
      </p>

      {/* Detail hint */}
      <div className="mt-auto pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
        <span>{stepItem.detail}</span>
      </div>
    </div>
  );
}
