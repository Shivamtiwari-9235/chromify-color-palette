import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Home, Palette } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 flex flex-col items-center justify-center text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-xl">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Page Not Found
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-md mx-auto">
          The color route you are looking for doesn't exist or has been moved to another coordinate.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/studio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
        >
          <Palette className="w-4 h-4 text-indigo-400" />
          <span>Go to Palette Studio</span>
        </Link>
      </div>
    </div>
  );
}
