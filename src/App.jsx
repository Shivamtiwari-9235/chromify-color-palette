import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Studio = lazy(() => import('./pages/Studio'));
const AccessibilityPlaceholder = lazy(() => import('./pages/AccessibilityPlaceholder'));
const FavoritesPlaceholder = lazy(() => import('./pages/FavoritesPlaceholder'));
const GuidePlaceholder = lazy(() => import('./pages/GuidePlaceholder'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <ScrollToTop />
      
      {/* Shared Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-400" role="status">
              Loading Chromify...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/accessibility" element={<AccessibilityPlaceholder />} />
            <Route path="/favorites" element={<FavoritesPlaceholder />} />
            <Route path="/guide" element={<GuidePlaceholder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
