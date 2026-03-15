import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Award, Rocket, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const stats = [
  { icon: Rocket, label: "Projects", value: 8, suffix: "+" },
  { icon: Award, label: "Certifications", value: 8, suffix: "+" },
  { icon: Briefcase, label: "Internships", value: 2, suffix: "+" },
  { icon: TrendingUp, label: "CGPA", value: 8.0, suffix: "", decimals: 1 },
];

const AnimatedCounter = ({ target, suffix, decimals = 0, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const Stats = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <section ref={ref} className={`py-16 px-6 relative z-10 ${isDark ? 'bg-[#050515]/30' : 'bg-white/50'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`text-center p-6 rounded-2xl border transition-all hover:scale-105 ${isDark ? 'bg-[#0a0a16]/80 border-gray-800/50' : 'bg-white border-gray-200 shadow-md'}`}>
              <div className={`inline-flex p-3 rounded-full mb-4 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
                <stat.icon className="text-cyan-500" size={24} />
              </div>
              <div className="mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals} isVisible={isVisible} />
              </div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
