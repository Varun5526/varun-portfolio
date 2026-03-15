import React from 'react';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const navItems = ['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'];

const Footer = () => {
  const { isDark } = useTheme();
  const { scrollToSection } = useScrollPosition();
  const year = new Date().getFullYear();

  return (
    <footer className={`relative pt-12 pb-8 ${isDark ? 'bg-[#030014]' : 'bg-gray-50'}`}>
      {/* Animated gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
      <div className="max-w-6xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text mb-3">
              <Terminal size={22} className="text-cyan-500" />
              Varun S
            </div>
            <p className={`text-sm max-w-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Data & AI Professional crafting end-to-end solutions at the intersection of data engineering, ML, and cloud.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm text-left transition-colors ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Connect</h4>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/Varun5526', icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/varun-s-226513305', icon: Linkedin, label: 'LinkedIn' },
                { href: 'mailto:varunbala2809@gmail.com', icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className={`p-2.5 rounded-full border transition-all hover:scale-110 hover:-translate-y-1 ${isDark ? 'border-gray-800 text-gray-400 hover:border-cyan-500 hover:text-cyan-400' : 'border-gray-200 text-gray-500 hover:border-cyan-400 hover:text-cyan-600'}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className={`border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs ${isDark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
          <p>&copy; {year} Varun S. All rights reserved.</p>
          <p>Built with React, Vite &amp; Tailwind CSS — Designed with passion for data &amp; technology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
