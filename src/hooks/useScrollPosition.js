import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollPosition(threshold = 500) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle via rAF to prevent excessive re-renders
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setShowBackToTop(window.scrollY > threshold);
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return { showBackToTop, scrollToTop, scrollToSection, scrollY };
}
