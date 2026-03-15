import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import RevealOnScroll from './RevealOnScroll';

const SectionTitle = ({ title, subtitle }) => {
  const { isDark } = useTheme();

  return (
    <RevealOnScroll className="text-center mb-12">
      <h2 className={`text-3xl md:text-5xl font-bold mb-4 inline-block relative tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          {title}
        </span>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
      </h2>
      {subtitle && <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
    </RevealOnScroll>
  );
};

export default SectionTitle;
