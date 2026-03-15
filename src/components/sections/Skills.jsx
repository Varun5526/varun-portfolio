import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import SectionTitle from '../ui/SectionTitle';
import RevealOnScroll from '../ui/RevealOnScroll';
import TiltCard from '../ui/TiltCard';
import { skillsData, softSkills } from '../../data/skills';

const Skills = () => {
  const { isDark } = useTheme();
  const { scrollY } = useScrollPosition();
  const [barsVisible, setBarsVisible] = useState(false);
  const barsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBarsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.2 });
    if (barsRef.current) observer.observe(barsRef.current);
    return () => { if (barsRef.current) observer.unobserve(barsRef.current); };
  }, []);

  return (
    <section id="skills" className="py-20 px-6 relative z-10 overflow-hidden">
      {/* 3D Parallax Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-10 left-10 w-72 h-72 rounded-full blur-[100px] ${isDark ? 'bg-cyan-600/15' : 'bg-cyan-300/10'}`}
          style={{
            transform: `translateY(${scrollY * -0.12}px) translateZ(0)`,
            willChange: 'transform'
          }}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-[120px] ${isDark ? 'bg-purple-600/15' : 'bg-purple-300/10'}`}
          style={{
            transform: `translateY(${scrollY * 0.18}px) translateZ(0)`,
            willChange: 'transform'
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle title="Technical Skills" subtitle="Powered by continuous learning and hands-on experience" />

        <div ref={barsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100} className="h-full">
              <TiltCard className={`relative overflow-hidden h-full p-6 border ${isDark ? 'bg-[#0a0a16] border-[#1f1f3a]' : 'bg-white border-gray-200 shadow-lg'}`}>
                <div className={`absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br ${skill.color.grad} opacity-10 rounded-full blur-xl`}></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className={`p-3 rounded-xl bg-opacity-10 ${skill.color.bg} ${skill.color.text} border border-white/5`}>
                    <skill.icon size={24} />
                  </div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{skill.title}</h3>
                </div>
                <div className={`w-full h-2 rounded-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color.grad} transition-all ease-out`}
                    style={{
                      width: barsVisible ? `${skill.level}%` : '0%',
                      transitionDuration: `${1000 + idx * 100}ms`,
                      transitionDelay: `${idx * 80}ms`
                    }}
                  ></div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>

        <SectionTitle title="Soft Skills" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {softSkills.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 80}>
              <TiltCard className={`flex flex-col items-center justify-center gap-3 p-6 hover:border-cyan-500/50 ${isDark ? 'bg-[#0a0a16]' : 'bg-white shadow-md'}`}>
                <div className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}><s.icon className="text-cyan-500" size={24} /></div>
                <span className={`font-medium text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{s.name}</span>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
