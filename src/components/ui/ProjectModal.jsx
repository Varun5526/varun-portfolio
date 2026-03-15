import React from 'react';
import { X, Zap, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Badge from './Badge';

const ProjectModal = ({ project, onClose }) => {
  const { isDark } = useTheme();

  if (!project) return null;
  const Icon = project.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div
        className={`w-full max-w-2xl border rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200'}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-gray-900'}`}
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className={`border-none text-cyan-600 ${isDark ? 'bg-white/10' : 'bg-cyan-50'}`}>{project.category}</Badge>
              <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}><Zap size={12} /> {project.metrics}</span>
            </div>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Overview</h4>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{project.fullDescription || project.description}</p>
          </div>

          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <Badge key={i} className={`border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>{t}</Badge>
              ))}
            </div>
          </div>

          {(project.githubLink || project.demoLink) && (
            <div className="flex gap-3 pt-2">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${isDark ? 'border-gray-700 text-gray-300 hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  <Github size={16} /> View Code
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium hover:scale-105 transition-transform">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
