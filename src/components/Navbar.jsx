import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Palette, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Bookmark, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Palette Studio', path: '/studio', icon: Palette, badge: 'New' },
    { name: 'Accessibility', path: '/accessibility', icon: ShieldCheck },
    { name: 'Collections', path: '/favorites', icon: Bookmark },
    { name: 'Color Guide', path: '/guide', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-pink-500 to-amber-400 p-[2px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="flex items-center gap-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 -ml-1"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 -ml-1"></span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                Chromify
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Studio
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide hidden sm:inline-block">
                Color Palette Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation using NavLink */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'text-white bg-slate-800 shadow-sm border border-slate-700/60 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/studio"
              className="relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 rounded-full hover:from-indigo-600 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Start Creating</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-200 hidden sm:inline-block" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl animate-fade-in">
            <div className="flex flex-col gap-1.5 px-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                          <span>{link.name}</span>
                        </div>
                        {link.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {link.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
              
              <div className="pt-3 mt-2 border-t border-slate-800/60 px-2">
                <Link
                  to="/studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Palette Studio</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
