import React from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useTheme } from '../../context/ThemeContext';

const ParallaxLayer = ({ children, speed = 0.5, className = "" }) => {
    const scrollY = useScrollPosition();
    const { isDark } = useTheme();

    return (
        <div
            className={className}
            style={{
                transform: `translateY(${scrollY * speed}px) translateZ(0)`,
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    );
};

export default ParallaxLayer;
