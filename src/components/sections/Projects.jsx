import React, { useState, useCallback } from 'react';
import { ExternalLink, Github, Zap, Filter } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import SectionTitle from '../ui/SectionTitle';
import RevealOnScroll from '../ui/RevealOnScroll';
import TiltCard from '../ui/TiltCard';
import projectsData from '../../data/projects';

const Projects = ({ onSelectProject }) => {
  const { isDark } = useTheme();
  const { scrollY } = useScrollPosition();
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(projectsData.map(p => p.category))];
  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  const handleFilter = useCallback((cat) => setActiveFilter(cat), []);

  return (
    <section id="projects" className={`py-20 px-6 relative overflow-hidden ${isDark ? 'bg-[#050515]/50' : 'bg-gray-100/50'}`}>
      {/* Parallax background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className={`absolute top-20 right-10 w-64 h-64 rounded-full blur-[100px] ${isDark ? 'bg-purple-600/20' : 'bg-purple-300/15'}`}
          style={{ transform: `translateY(${scrollY * 0.05}px)`, willChange: 'transform' }}
        />
        <div
          className={`absolute bottom-32 left-20 w-80 h-80 rounded-full blur-[120px] ${isDark ? 'bg-cyan-600/20' : 'bg-cyan-300/15'}`}
          style={{ transform: `translateY(${scrollY * -0.03}px)`, willChange: 'transform' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          title="Featured Projects"
          subtitle="Showcasing my work in deep learning, data analytics, and software development"
        />

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 justify-center mb-12" role="group" aria-label="Filter projects by category">
          {categories.map(cat => {
            const isActive = activeFilter === cat;

            let btnClass = "px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

            if (isActive) {
              btnClass += " bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg";
            } else if (isDark) {
              btnClass += " bg-[#0a0a16] border border-gray-700 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400";
            } else {
              btnClass += " bg-white border border-gray-200 text-gray-600 hover:border-cyan-400 hover:text-cyan-600 shadow-sm";
            }

            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                aria-pressed={isActive}
                className={btnClass}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className={`text-center text-sm mb-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          {activeFilter !== 'All' ? ` in "${activeFilter}"` : ''}
        </p>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <RevealOnScroll key={project.title} delay={idx * 120}>
              <TiltCard className={`flex flex-col h-full border-t-4 border-t-transparent hover:border-t-cyan-500 overflow-hidden group p-0 ${isDark ? 'bg-[#0a0a16]' : 'bg-white shadow-xl'}`}>
                {/* Project thumbnail */}
                <div className={`h-48 w-full bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  <project.icon size={56} className="text-white/90 relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
                  {/* Category badge overlay */}
                  <span className="absolute top-3 right-3 text-xs font-bold tracking-wider text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-cyan-600 mb-3">
                    <Zap size={14} aria-hidden="true" />
                    <span>{project.metrics}</span>
                  </div>

                  <p className={`text-sm mb-5 flex-grow leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t, i) => (
                      <span key={i} className={`px-2 py-1 text-xs rounded border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className={`
                        flex-1 py-2.5 rounded-lg border font-medium transition-all flex items-center justify-center gap-2
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                        ${isDark
                          ? 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500'
                          : 'border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white'}
                      `}
                    >
                      View Details <ExternalLink size={14} />
                    </button>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className={`
                          p-2.5 rounded-lg border transition-all
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                          ${isDark
                            ? 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                            : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'}
                        `}
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
