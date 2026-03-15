import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../ui/SectionTitle';
import RevealOnScroll from '../ui/RevealOnScroll';
import TiltCard from '../ui/TiltCard';
import Badge from '../ui/Badge';
import experienceData from '../../data/experience';

const Experience = () => {
  const { isDark } = useTheme();

  return (
    <section id="experience" className="py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Experience" subtitle="My professional journey" />
        <div className="space-y-8 relative pl-8 border-l-2 border-gray-700/50 ml-4 md:ml-0 md:border-l-0 md:pl-0">
          <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>

          {experienceData.map((exp, idx) => (
            <RevealOnScroll key={idx} className={`relative md:flex justify-between items-center group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-[45%] mb-8 md:mb-0">
                <TiltCard className={`p-6 ${exp.color} ${isDark ? 'bg-[#0a0a16]' : 'bg-white'}`}>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.title}</h3>
                  <p className="text-cyan-500 font-medium text-sm mb-1">{exp.company}</p>
                  <p className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{exp.duration}</p>
                  <ul className="list-disc pl-4 space-y-2 text-sm opacity-80 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, i) => (
                      <Badge key={i} className={`text-[10px] border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                        {t}
                      </Badge>
                    ))}
                  </div>
                </TiltCard>
              </div>
              <div className={`absolute left-[-37px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 ${isDark ? 'bg-gray-900 border-cyan-500' : 'bg-white border-cyan-500'} z-10`}></div>
              <div className="md:w-[45%]"></div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
