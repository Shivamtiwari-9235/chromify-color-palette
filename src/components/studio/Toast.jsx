import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, isVisible }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-white text-xs font-mono ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-6 opacity-0 scale-95'
      }`}
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
      <span className="font-medium text-slate-200">{message}</span>
    </div>
  );
}
