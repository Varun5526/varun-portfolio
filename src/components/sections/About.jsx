import React from 'react';
import { FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../ui/SectionTitle';
import TiltCard from '../ui/TiltCard';

const About = () => {
  const { isDark } = useTheme();

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Varun Resume.pdf';
    link.download = 'Varun_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="About Me" />
        <div className="grid md:grid-cols-2 gap-8">
          <TiltCard className={`border-l-4 border-l-cyan-500 h-full p-8 ${isDark ? 'bg-[#0a0a16]/90' : 'bg-white/90 shadow-xl'}`}>
            <h3 className="text-2xl font-bold text-cyan-500 mb-4">Professional Summary</h3>
            <p className="leading-relaxed mb-4">I'm an aspiring Artificial Intelligence and Data Science professional with a strong foundation in probability, statistics, and mathematics. Currently pursuing my B.Tech in AI & Data Science at Rajalakshmi Institute of Technology with a CGPA of 8.0.</p>
            <p className="leading-relaxed mb-6">Proficient in Python, SQL, Machine Learning, and Deep Learning, with hands-on experience in LangChain, RAG pipelines, FastAPI, Airflow, and Azure cloud. I build end-to-end data pipelines and interactive dashboards using Power BI, Pandas, and Matplotlib.</p>

            <button onClick={downloadResume} className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-[0_20px_50px_rgba(6,182,212,0.5)] transition-all duration-300 group">
              <FileText size={22} className="group-hover:rotate-12 transition-transform" />
              <span>Download Resume</span>
            </button>
          </TiltCard>

          <div className="flex flex-col gap-6">
            <TiltCard className={`border-l-4 border-l-purple-500 p-8 ${isDark ? 'bg-[#0a0a16]/90' : 'bg-white/90 shadow-xl'}`}>
              <h3 className="text-2xl font-bold text-purple-500 mb-6">Languages</h3>
              <div className="space-y-6">
                {[
                  { lang: "English", level: "Fluent", color: "bg-cyan-500" },
                  { lang: "Tamil", level: "Fluent", color: "bg-purple-500" },
                  { lang: "Hindi", level: "Read/Write", color: "bg-pink-500", width: "70%" }
                ].map((l, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2"><span className={isDark ? 'text-white' : 'text-gray-900'}>{l.lang}</span><span className="text-xs opacity-70">{l.level}</span></div>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}><div className={`h-full rounded-full ${l.color}`} style={{ width: l.width || '100%' }}></div></div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
