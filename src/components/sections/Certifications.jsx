import React from 'react';
import { Award } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../ui/SectionTitle';
import RevealOnScroll from '../ui/RevealOnScroll';
import TiltCard from '../ui/TiltCard';
import certificationsData from '../../data/certifications';

const Certifications = () => {
  const { isDark } = useTheme();

  return (
    <section id="certifications" className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Certifications" subtitle="Committed to continuous professional development" />
        <div className="grid md:grid-cols-2 gap-4">
          {certificationsData.map((cert, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <TiltCard className={`flex items-center gap-4 p-5 hover:border-cyan-500/30 group transition-all ${isDark ? 'bg-[#0a0a16]' : 'bg-white shadow-md'}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{cert}</span>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
