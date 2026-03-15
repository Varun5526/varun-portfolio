import { useState, useEffect } from 'react';

/**
 * Custom hook to determine the currently active section on the page based on scrolling.
 * @param {string[]} sectionIds - Array of HTML element IDs corresponding to the page sections.
 * @param {boolean} isReady - Boolean flag to indicate when to start observing (e.g., after loading finishes).
 * @param {Object} options - IntersectionObserver configuration options.
 * @returns {string} The ID of the currently active section.
 */
export const useActiveSection = (
    sectionIds,
    isReady = true,
    options = { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (!isReady) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [isReady, sectionIds, options]);

    return activeSection;
};
