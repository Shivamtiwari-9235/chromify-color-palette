import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Sparkles, ShieldCheck, Bookmark, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-pink-500 to-amber-400 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="flex items-center gap-0.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span className="w-2 h-2 rounded-full bg-pink-500 -ml-1"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 -ml-1"></span>
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Chromify
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Chromify is an open workspace for color exploration, accessibility validation, and developer-ready palette generation. Built for designers, developers, and visual creators who demand perfection.
            </p>

          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Navigation
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  Palette Studio
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">v1</span>
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  Accessibility Lab
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  My Collections
                </Link>
              </li>
              <li>
                <Link to="/guide" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  Color Theory Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Features / Capabilities Links */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Studio Capabilities
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/studio" className="hover:text-indigo-400 transition-colors">
                  Smart Color Harmonies
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-indigo-400 transition-colors">
                  Lock & Tweak Swatches
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-indigo-400 transition-colors">
                  WCAG 2.1 Contrast Testing
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-indigo-400 transition-colors">
                  Live UI Component Previews
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-indigo-400 transition-colors">
                  Tailwind CSS & Token Export
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-indigo-400 transition-colors">
                  Offline Local Storage
                </Link>
              </li>
            </ul>
          </div>

          {/* Audience & Workflow Links */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Who Chromify Is For
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/guide" className="hover:text-slate-200 transition-colors">
                  UI & UX Product Designers
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-slate-200 transition-colors">
                  Frontend & Fullstack Developers
                </Link>
              </li>
              <li>
                <Link to="/guide" className="hover:text-slate-200 transition-colors">
                  Graphic & Web Students
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-slate-200 transition-colors">
                  Beginners & Solopreneurs
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-slate-200 transition-colors">
                  Design System Engineers
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1">
            <span>Chromify – Color Palette Studio. Crafted with precision for visual builders.</span>
          </p>

          <p className="flex items-center gap-1 font-mono">
            <span>© 2026 Chromify. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
