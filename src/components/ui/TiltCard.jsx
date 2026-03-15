import React, { useState, useRef, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

const TiltCard = ({ children, className = "", onClick }) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotation({ x: rotateX, y: rotateY });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const baseClasses = isDark
    ? "bg-[#0a0a16] border-[#1f1f3a] bg-opacity-90 text-gray-300"
    : "bg-white border-gray-200 bg-opacity-80 text-gray-700 shadow-lg";

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
      className={`rounded-2xl backdrop-blur-sm transition-all duration-300 relative overflow-hidden ${baseClasses} ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        boxShadow: isHovered ? (isDark ? '0 10px 30px -10px rgba(6, 182, 212, 0.3)' : '0 10px 30px -10px rgba(6, 182, 212, 0.2)') : 'none',
        borderColor: isHovered ? 'rgba(6, 182, 212, 0.5)' : (isDark ? '#1f1f3a' : '#e5e7eb')
      }}
    >
      {/* Mouse-following glow spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${glowPos.x}% ${glowPos.y}%, ${isDark ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.08)'}, transparent 70%)`
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
