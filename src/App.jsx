import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { ArrowUp, Loader } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { useScrollPosition } from './hooks/useScrollPosition';
import { useActiveSection } from './hooks/useActiveSection';
import { PORTFOLIO_CONTEXT } from './data/portfolio-context';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import About from './components/sections/About';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import WhyHireMe from './components/sections/WhyHireMe';
import Contact from './components/sections/Contact';

// UI
import ProjectModal from './components/ui/ProjectModal';
import RevealOnScroll from './components/ui/RevealOnScroll';

// Lazy-loaded heavy components
const ThreeBackground = lazy(() => import('./components/ui/ThreeBackground'));
const Skills = lazy(() => import('./components/sections/Skills'));
const ChatWidget = lazy(() => import('./components/chat/ChatWidget'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <Loader className="w-8 h-8 text-cyan-500 animate-spin" />
  </div>
);

const SECTIONS = ['about', 'education', 'experience', 'skills', 'projects', 'contact'];

export default function App() {
  const { isDark } = useTheme();
  const { showBackToTop, scrollToTop } = useScrollPosition();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Active section detection using custom hook
  const activeSection = useActiveSection(SECTIONS, !isLoading);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSelectProject = useCallback((project) => setSelectedProject(project), []);
  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#080a14]' : 'bg-gray-50'}`}>
        <div className="text-center">
          <Loader className="w-16 h-16 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-cyan-400 text-xl font-bold animate-pulse">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-700 ${isDark ? 'bg-[#080a14] text-gray-300' : 'bg-gray-50 text-gray-900'}`}>

      {/* Background particle effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
        {isDark && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080a14]/80 to-[#080a14] pointer-events-none" />
        )}
      </div>

      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <RevealOnScroll><Stats /></RevealOnScroll>

        {/* Gradient divider */}
        <div className={`h-px mx-auto max-w-4xl ${isDark ? 'bg-gradient-to-r from-transparent via-gray-700/50 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-300/50 to-transparent'}`} />

        <RevealOnScroll><About /></RevealOnScroll>
        <RevealOnScroll><Education /></RevealOnScroll>
        <RevealOnScroll><Experience /></RevealOnScroll>

        {/* Gradient divider */}
        <div className={`h-px mx-auto max-w-4xl ${isDark ? 'bg-gradient-to-r from-transparent via-cyan-700/40 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent'}`} />

        <Suspense fallback={<LoadingFallback />}>
          <Skills />
        </Suspense>
        <RevealOnScroll><Projects onSelectProject={handleSelectProject} /></RevealOnScroll>

        {/* Gradient divider */}
        <div className={`h-px mx-auto max-w-4xl ${isDark ? 'bg-gradient-to-r from-transparent via-purple-700/40 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-300/40 to-transparent'}`} />

        <RevealOnScroll><Certifications /></RevealOnScroll>
        <RevealOnScroll><WhyHireMe /></RevealOnScroll>
        <RevealOnScroll><Contact /></RevealOnScroll>
      </main>

      <Footer />

      {/* Project detail modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />

      {/* AI chat assistant */}
      <Suspense fallback={null}>
        <ChatWidget contextData={PORTFOLIO_CONTEXT} />
      </Suspense>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-cyan-500/50"
          aria-label="Back to top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}
