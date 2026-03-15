import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../ui/SectionTitle';
import testimonialsData from '../../data/testimonials';

const Testimonials = () => {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonialsData.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (index) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
    startAutoPlay();
  };

  const prev = () => goTo((current - 1 + testimonialsData.length) % testimonialsData.length);
  const next = () => goTo((current + 1) % testimonialsData.length);

  const testimonial = testimonialsData[current];

  return (
    <section className={`py-20 px-6 relative ${isDark ? 'bg-[#050515]/50' : 'bg-gray-100/50'}`}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Testimonials" subtitle="What people say about working with me" />

        <div className="relative">
          {/* Navigation arrows */}
          <button onClick={prev} className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full transition-all hover:scale-110 hidden md:block ${isDark ? 'bg-[#0a0a16] border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500' : 'bg-white border border-gray-200 text-gray-500 hover:text-cyan-600 shadow-lg'}`}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full transition-all hover:scale-110 hidden md:block ${isDark ? 'bg-[#0a0a16] border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500' : 'bg-white border border-gray-200 text-gray-500 hover:text-cyan-600 shadow-lg'}`}>
            <ChevronRight size={20} />
          </button>

          {/* Testimonial card */}
          <div className={`rounded-2xl p-8 md:p-12 border transition-all duration-500 ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200 shadow-xl'}`}>
            <Quote className={`mb-6 ${isDark ? 'text-cyan-500/30' : 'text-cyan-400/30'}`} size={48} />

            <p className={`text-lg md:text-xl leading-relaxed mb-8 italic ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              "{testimonial.text}"
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                  <p className="text-xs text-cyan-500">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === current ? 'bg-cyan-500 w-8' : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
