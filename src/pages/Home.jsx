import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Palette, 
  CheckCircle2, 
  Layers, 
  Users, 
  Compass,
  Zap,
  BookOpen
} from 'lucide-react';

import HeroPalettePreview from '../components/HeroPalettePreview';
import FeatureCard from '../components/FeatureCard';
import StepCard from '../components/StepCard';
import UseCaseCard from '../components/UseCaseCard';

import { CORE_FEATURES } from '../data/features';
import { WORKFLOW_STEPS } from '../data/steps';
import { USE_CASES } from '../data/useCases';

export default function Home() {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] pointer-events-none overflow-hidden opacity-40">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]"></div>
          <div className="absolute -top-32 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-48 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-indigo-300 border border-slate-700/80 shadow-lg mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Chromify Studio 1.0 — Free Open Palette Workspace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span className="text-slate-400 font-normal">No Sign-up Needed</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Find Your Perfect Colors.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-300">
              Build Better Designs.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Create harmonious color palettes, check accessibility, preview real-world designs, and export developer-ready color codes — all in one free workspace.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/studio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Palette className="w-5 h-5 text-indigo-200" />
              <span>Explore Palette Studio</span>
              <ArrowRight className="w-4 h-4 text-indigo-200" />
            </Link>

            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-850 rounded-full border border-slate-700/80 transition-all duration-200"
            >
              <Compass className="w-4 h-4 text-slate-400" />
              <span>Learn How It Works</span>
            </button>
          </div>

          {/* Social Proof / Trust Line */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>WCAG 2.1 Compliant</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tailwind & CSS Tokens</span>
            </span>
            <span className="flex items-center gap-1.5 hidden sm:inline-flex">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Client-Side</span>
            </span>
          </div>

          {/* Hero Palette Preview */}
          <HeroPalettePreview />

        </div>
      </section>


      {/* =========================================================================
          FEATURES SECTION - Unique heading distinguishing it from Color Guide
          ========================================================================= */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Core Toolset</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Core Capabilities & Studio Features
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Eliminate color guesswork with precision tools crafted specifically for modern product designers, frontend developers, and visual creators.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>


      {/* =========================================================================
          HOW IT WORKS SECTION
          ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Subtle Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Step-by-Step Flow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            A Streamlined Workflow From Idea to Production
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Four simple stages ensure your color choices are harmonious, contrast-verified, and instantly usable in code.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((stepItem, idx) => (
            <StepCard 
              key={stepItem.step} 
              stepItem={stepItem} 
              index={idx} 
              total={WORKFLOW_STEPS.length} 
            />
          ))}
        </div>

        {/* Workflow Callout Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Need color inspiration right now?
              </h3>
              <p className="text-xs text-slate-400">
                You can cycle through presets or jump directly into the Studio to begin experimenting.
              </p>
            </div>
          </div>

          <Link
            to="/studio"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>


      {/* =========================================================================
          USE CASES SECTION
          ========================================================================= */}
      <section id="use-cases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Target Audiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Built for Creators of Every Discipline
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Whether you are configuring production Tailwind themes or learning the fundamentals of optical contrast, Chromify adapts to your goals.
          </p>
        </div>

        {/* 4 Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((useCase) => (
            <UseCaseCard key={useCase.role} useCase={useCase} />
          ))}
        </div>
      </section>


      {/* =========================================================================
          PRE-FOOTER CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl text-center">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
              Ready to Upgrade Your Palette Workflow?
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Start Designing With Confident, Accessible Colors
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Chromify gives you the tools to explore harmonies, guarantee contrast compliance, and copy production-ready tokens in seconds.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/studio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Palette className="w-5 h-5" />
                <span>Open Palette Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/guide"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-700 transition-all"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Explore Color Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
