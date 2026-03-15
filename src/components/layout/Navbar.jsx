import React, { useState, useEffect } from 'react';
import { Terminal, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const navItems = ['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'];

const Navbar = ({ activeSection }) => {
  const { isDark, toggleTheme } = useTheme();
  const { scrollToSection } = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (item) => {
    scrollToSection(item.toLowerCase());
    setIsMenuOpen(false);
  };

  // Close mobile menu on Escape key press and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header>
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-lg border-b transition-colors duration-500 ${isDark ? 'bg-[#030014]/70 border-white/10' : 'bg-white/70 border-gray-200'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            aria-label="Varun S – go to top"
          >
            <Terminal size={24} className="text-cyan-500" aria-hidden="true" />
            Varun S
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-8 text-sm font-medium items-center">
            {navItems.map(item => {
              const isActive = activeSection === item.toLowerCase();
              let navItemClass = "relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1 py-0.5";

              if (isActive) {
                navItemClass += " text-cyan-400";
              } else if (isDark) {
                navItemClass += " text-gray-300 hover:text-cyan-400";
              } else {
                navItemClass += " text-gray-600 hover:text-cyan-600";
              }

              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  aria-current={isActive ? 'page' : undefined}
                  className={navItemClass}
                >
                  {item}
                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${isDark ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-gray-200 text-gray-700'}`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-gray-200 text-gray-700'}`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden border-t animate-in fade-in duration-200 ${isDark ? 'bg-[#030014]/95 border-white/10' : 'bg-white/95 border-gray-200'}`}
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map(item => {
                const isActive = activeSection === item.toLowerCase();
                let mobileItemClass = "block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-colors";

                if (isActive) {
                  mobileItemClass += " text-cyan-400 bg-cyan-500/10";
                } else if (isDark) {
                  mobileItemClass += " text-gray-300 hover:text-cyan-400 hover:bg-white/5";
                } else {
                  mobileItemClass += " text-gray-600 hover:text-cyan-600 hover:bg-gray-50";
                }

                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    aria-current={isActive ? 'page' : undefined}
                    className={mobileItemClass}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
