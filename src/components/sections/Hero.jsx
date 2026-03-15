import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Award, Globe, Cake, Download } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import TiltCard from '../ui/TiltCard';
import { motion } from 'framer-motion';

const roles = [
  "Data Analyst",
  "Data Engineer",
  "Data Scientist",
  "ML Engineer",
  "AI Engineer",
  "Business Analyst",
  "Problem Solver",
];

const socialLinks = [
  { href: 'mailto:varunbala2809@gmail.com', icon: Mail, label: 'Email', color: 'hover:border-cyan-500 text-cyan-400' },
  { href: 'tel:+918838193946', icon: Phone, label: 'Phone', color: 'hover:border-purple-500 text-purple-400' },
  { href: 'https://www.linkedin.com/in/varun-s-226513305', icon: Linkedin, label: 'LinkedIn', color: 'hover:border-blue-500 text-blue-400', external: true },
  { href: 'https://github.com/Varun5526', icon: Github, label: 'GitHub', color: 'hover:border-gray-500 text-gray-400', external: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 12 },
  },
};

const Hero = () => {
  const { isDark } = useTheme();
  const typingText = useTypingAnimation(roles);
  const { scrollToSection, scrollY } = useScrollPosition();

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-sky-900/20 pointer-events-none" />

      {/* Parallax orbs */}
      <div
        aria-hidden="true"
        className={`absolute top-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse pointer-events-none will-change-transform ${isDark ? 'bg-[#c4b5fd]/20' : 'bg-purple-300/20'}`}
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
      <div
        aria-hidden="true"
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse delay-1000 pointer-events-none will-change-transform ${isDark ? 'bg-[#38bdf8]/20' : 'bg-cyan-300/20'}`}
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      />

      {/* Floating decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }} aria-hidden="true">
        <div className="absolute top-20 left-10 w-20 h-20"
          style={{ animation: 'float3D 8s ease-in-out infinite, rotate3D 20s linear infinite', transform: `translateY(${scrollY * 0.02}px)` }}>
          <div className={`absolute inset-0 border ${isDark ? 'bg-gradient-to-br from-sky-400/20 to-indigo-400/20 border-sky-400/30' : 'bg-gradient-to-br from-cyan-300/30 to-blue-300/30 border-cyan-300/40'} backdrop-blur-sm`}
            style={{ transform: 'rotateY(0deg) translateZ(10px)' }} />
        </div>
        <div className="absolute top-1/3 right-20 w-16 h-16"
          style={{ animation: 'float3D 10s ease-in-out infinite reverse, rotate3D 15s linear infinite', transform: `translateY(${scrollY * -0.03}px)` }}>
          <div className={`absolute inset-0 border ${isDark ? 'bg-gradient-to-br from-purple-400/20 to-indigo-400/20 border-purple-400/30' : 'bg-gradient-to-br from-pink-300/40 to-purple-300/40 border-pink-300/50'}`}
            style={{ transform: 'rotateX(45deg) rotateZ(45deg)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        </div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24"
          style={{ animation: 'float3D 12s ease-in-out infinite, rotate3D 25s linear infinite reverse', transform: `translateY(${scrollY * 0.04}px)` }}>
          <div className={`absolute inset-0 border ${isDark ? 'bg-gradient-to-br from-sky-300/15 to-indigo-300/15 border-sky-300/25' : 'bg-gradient-to-br from-cyan-200/25 to-purple-200/25 border-cyan-200/35'} backdrop-blur-sm`}
            style={{ transform: 'rotateY(0deg) translateZ(12px)' }} />
        </div>
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-4xl"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className={`inline-block px-4 py-2 rounded-full border text-xs tracking-widest uppercase backdrop-blur-md shadow-[0_0_25px_rgba(14,165,233,0.3)] transform hover:scale-110 transition-all duration-300 ${isDark ? 'border-sky-400/30 bg-sky-500/10 text-sky-300' : 'border-cyan-600/20 bg-cyan-100 text-cyan-700'}`}
            style={{ animation: 'float 3s ease-in-out infinite' }}>
            Data &amp; AI Professional
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className={`text-7xl md:text-9xl font-bold mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={isDark ? { textShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 50px rgba(14,165,233,0.4)' } : {}}
        >
          Varun{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">S</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div variants={itemVariants} className={`text-2xl md:text-4xl font-light mb-8 flex justify-center items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          I am a{' '}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-purple-300">
            {typingText}
          </span>
          <span className="animate-pulse text-sky-400" aria-hidden="true">|</span>
        </motion.div>

        <motion.p variants={itemVariants} className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          B.Tech AI &amp; Data Science Student &nbsp;|&nbsp;{' '}
          <span className="text-cyan-500 font-bold">CGPA 8.0</span>{' '}
          &nbsp;|&nbsp; Chennai, India
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className={`
              px-8 py-3 rounded-full font-bold shadow-lg transition-colors duration-300
              bg-gradient-to-r from-sky-500 to-indigo-500 text-white
              hover:shadow-[0_20px_50px_rgba(14,165,233,0.4)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
            `}
          >
            Get In Touch
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
            className={`
              px-8 py-3 rounded-full border font-bold transition-colors backdrop-blur-md
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
              ${isDark
                ? 'border-white/10 bg-[#0f172a]/30 text-white hover:bg-white/5'
                : 'border-gray-300 bg-white/80 text-gray-700 hover:bg-gray-100'}
            `}
          >
            View Projects
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex gap-6 justify-center mb-24" role="list" aria-label="Social links">
          {socialLinks.map(({ href, icon: Icon, label, color, external }) => {
            const baseClasses = "p-4 border rounded-full flex items-center justify-center";
            const themeClasses = isDark ? "bg-[#0f1729]/80 border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)]" : "bg-white border-gray-200 shadow-sm";

            return (
              <motion.a
                whileHover={{ scale: 1.15, y: -8 }}
                whileTap={{ scale: 0.95 }}
                key={label}
                href={href}
                aria-label={label}
                role="listitem"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`${baseClasses} ${color} ${themeClasses} transition-colors`}
              >
                <Icon size={22} strokeWidth={1.5} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Info strip */}
        <motion.div variants={itemVariants}>
          <TiltCard className={`max-w-4xl mx-auto w-full !rounded-[2rem] shadow-[0_0_30px_rgba(0,0,0,0.15)] backdrop-blur-xl ${isDark ? '!bg-[#0f1524]/90 !border-white/5' : '!bg-white/90 !border-gray-200/60'}`}>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-around gap-8 sm:gap-4 px-6 py-10 w-full relative z-10">
              {[
                { icon: MapPin, color: isDark ? 'text-cyan-400' : 'text-cyan-600', label: 'Chennai, India' },
                { icon: Cake, color: isDark ? 'text-purple-400' : 'text-purple-600', label: 'Born May 5, 2006' },
                { icon: Globe, color: isDark ? 'text-green-400' : 'text-green-600', label: '3 Languages' },
              ].map(({ icon: Icon, color, label }) => (
                <div key={label} className="flex flex-col items-center gap-4 flex-1">
                  <Icon size={26} className={color} strokeWidth={2} aria-hidden="true" />
                  <span className={`text-[15px] font-light tracking-wide text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
                </div>
              ))}
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
