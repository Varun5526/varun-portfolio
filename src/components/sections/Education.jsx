import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../ui/SectionTitle';
import RevealOnScroll from '../ui/RevealOnScroll';
import TiltCard from '../ui/TiltCard';
import Badge from '../ui/Badge';

const Education = () => {
  const { isDark } = useTheme();

  return (
    <section id="education" className={`py-20 relative ${isDark ? 'bg-[#050515]/50' : 'bg-gray-100/50'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle title="Education" subtitle="Academic excellence and continuous learning" />

        <div className="relative mt-10">
          <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>

          <RevealOnScroll className="relative mb-12 md:flex justify-between items-center group">
            <div className="md:w-5/12 mb-4 md:mb-0 md:text-right order-1 pr-8 pl-16 md:pl-0">
              <TiltCard className={`p-6 border-l-4 border-l-cyan-500 ${isDark ? 'bg-[#0a0a16]' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Bachelor of Technology (B.Tech)</h3>
                <p className="text-cyan-500 text-sm mb-1">Artificial Intelligence & Data Science</p>
                <p className="text-sm opacity-70">Rajalakshmi Institute of Technology, Chennai</p>
                <div className="flex gap-2 mt-3 md:justify-end"><Badge className="bg-cyan-500/20 text-cyan-600">CGPA: 8.0</Badge><span className="text-xs self-center opacity-70">2023 - Present</span></div>
              </TiltCard>
            </div>
            <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-cyan-500 rounded-full z-10 flex items-center justify-center ${isDark ? 'bg-[#030014]' : 'bg-white'}`}><div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div></div>
            <div className="md:w-5/12 order-2"></div>
          </RevealOnScroll>

          <RevealOnScroll className="relative mb-12 md:flex justify-between items-center group">
            <div className="md:w-5/12 order-1"></div>
            <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-purple-500 rounded-full z-10 flex items-center justify-center ${isDark ? 'bg-[#030014]' : 'bg-white'}`}><div className="w-2 h-2 bg-purple-500 rounded-full"></div></div>
            <div className="md:w-5/12 mb-4 md:mb-0 order-2 pl-16 md:pl-8 text-left">
              <TiltCard className={`p-6 border-l-4 border-l-purple-500 ${isDark ? 'bg-[#0a0a16]' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Higher Secondary (Class XII)</h3>
                <p className="text-purple-500 text-sm mb-1">Tamil Nadu State Board</p>
                <div className="flex gap-2 mt-3"><Badge className="bg-purple-500/20 text-purple-600">89%</Badge><span className="text-xs self-center opacity-70">2023</span></div>
              </TiltCard>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="relative md:flex justify-between items-center group">
            <div className="md:w-5/12 mb-4 md:mb-0 md:text-right order-1 pr-8 pl-16 md:pl-0">
              <TiltCard className={`p-6 border-l-4 border-l-green-500 ${isDark ? 'bg-[#0a0a16]' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Secondary (Class X)</h3>
                <p className="text-green-500 text-sm mb-1">Tamil Nadu State Board</p>
                <div className="flex gap-2 mt-3 md:justify-end"><Badge className="bg-green-500/20 text-green-600">80%</Badge><span className="text-xs self-center opacity-70">2021</span></div>
              </TiltCard>
            </div>
            <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-green-500 rounded-full z-10 flex items-center justify-center ${isDark ? 'bg-[#030014]' : 'bg-white'}`}><div className="w-2 h-2 bg-green-500 rounded-full"></div></div>
            <div className="md:w-5/12 order-2"></div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Education;
