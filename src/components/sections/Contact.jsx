import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Loader, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../ui/SectionTitle';

const CONTACT_CARDS = [
  {
    href: 'mailto:varunbala2809@gmail.com',
    icon: Mail,
    label: 'Email',
    value: 'varunbala2809@gmail.com',
    hoverBorder: 'hover:border-cyan-500',
    hoverBg: 'group-hover:bg-cyan-500',
    darkBg: 'bg-cyan-500/10',
    darkText: 'text-cyan-400',
    lightBg: 'bg-cyan-50',
    lightText: 'text-cyan-600',
  },
  {
    href: 'tel:+918838193946',
    icon: Phone,
    label: 'Phone',
    value: '+91-8838193946',
    hoverBorder: 'hover:border-pink-500',
    hoverBg: 'group-hover:bg-pink-500',
    darkBg: 'bg-pink-500/10',
    darkText: 'text-pink-400',
    lightBg: 'bg-pink-50',
    lightText: 'text-pink-600',
  },
  {
    href: 'https://www.linkedin.com/in/varun-s-226513305',
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'View Profile',
    external: true,
    hoverBorder: 'hover:border-blue-500',
    hoverBg: 'group-hover:bg-blue-500',
    darkBg: 'bg-blue-500/10',
    darkText: 'text-blue-400',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-600',
  },
  {
    href: 'https://github.com/Varun5526',
    icon: Github,
    label: 'GitHub',
    value: 'View Profile',
    external: true,
    hoverBorder: 'hover:border-gray-500',
    hoverBg: 'group-hover:bg-gray-500',
    darkBg: 'bg-gray-500/10',
    darkText: 'text-gray-400',
    lightBg: 'bg-gray-100',
    lightText: 'text-gray-600',
  },
];

const INITIAL_FORM = { name: '', email: '', message: '' };

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const payload = new FormData();
      Object.entries({
        ...formData,
        _subject: `New Portfolio Contact from ${formData.name}`,
        _replyto: formData.email,
        _captcha: 'false',
        _template: 'table',
        _autoresponse: 'Thanks for reaching out! I received your message and will reply soon.',
        _honey: '',
      }).forEach(([k, v]) => payload.append(k, v));

      const response = await fetch('https://formsubmit.co/varunbala2809@gmail.com', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Server error');

      setFormStatus({ type: 'success', message: '✓ Message sent! I\'ll get back to you soon.' });
      setFormData(INITIAL_FORM);
    } catch {
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try emailing me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-20 px-6 relative ${isDark ? 'bg-[#020617]' : 'bg-gray-50'}`}>
      {isDark && (
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />
      )}
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionTitle title="Let's Connect" subtitle="I'm always open to discussing new opportunities, projects, or collaborations" />

        {/* Contact cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {CONTACT_CARDS.map((card) => (
            <a
              key={card.label}
              href={card.href}
              aria-label={card.label}
              {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`p-6 rounded-2xl border flex flex-col items-center gap-3 ${card.hoverBorder} transition-all group ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200 shadow-lg'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.hoverBg} group-hover:text-white transition-all duration-300 ${isDark ? `${card.darkBg} ${card.darkText}` : `${card.lightBg} ${card.lightText}`}`}>
                <card.icon size={22} />
              </div>
              <div className="text-center">
                <h4 className={`font-bold mb-1 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{card.label}</h4>
                <p className={`text-xs break-all ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{card.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <div className={`p-8 rounded-2xl border mb-12 ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200 shadow-xl'}`}>
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Send Me a Message</h3>

          <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                autoComplete="name"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Your Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                placeholder="john@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                placeholder="Tell me about your project or opportunity..."
              />
              <p className={`text-xs mt-1 text-right ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                {formData.message.length} / 1000
              </p>
            </div>

            {/* Status message */}
            {formStatus.message && (
              <div
                role="alert"
                className={`flex items-center gap-3 p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}
              >
                {formStatus.type === 'success'
                  ? <CheckCircle size={20} className="text-green-500 shrink-0" />
                  : <AlertCircle size={20} className="text-red-500 shrink-0" />
                }
                <p className={formStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}>
                  {formStatus.message}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
              className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-all bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg
                ${isSubmitting || !formData.name || !formData.email || !formData.message
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 hover:shadow-cyan-500/50'
                }`}
            >
              {isSubmitting ? (
                <><Loader className="animate-spin" size={20} /><span>Sending...</span></>
              ) : (
                <><Send size={20} /><span>Send Message</span></>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className={`grid grid-cols-3 gap-4 border-t pt-10 ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
          <div className="text-center">
            <h5 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Current Status</h5>
            <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>B.Tech AI &amp; Data Science</p>
            <p className="text-cyan-500 text-xs">CGPA: 8.0</p>
          </div>
          <div className={`text-center border-l border-r ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
            <h5 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Location</h5>
            <div className={`flex items-center justify-center gap-1 font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <MapPin size={14} className="text-cyan-500" /> Chennai, India
            </div>
          </div>
          <div className="text-center">
            <h5 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Availability</h5>
            <p className="text-green-500 font-bold text-sm flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              Open to Work
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
