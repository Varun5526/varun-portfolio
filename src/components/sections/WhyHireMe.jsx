import React from 'react';
import { Brain, Rocket, Users, Heart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../ui/SectionTitle';
import TiltCard from '../ui/TiltCard';

const reasons = [
  {
    icon: Brain,
    bgClass: "bg-cyan-500/10",
    iconClass: "text-cyan-500",
    titleClass: "text-cyan-500",
    title: "Strong Analytical Mind",
    text: "I excel at transforming complex data into actionable insights. My projects demonstrate my ability to tackle challenging problems with ML and deep learning solutions."
  },
  {
    icon: Rocket,
    bgClass: "bg-purple-500/10",
    iconClass: "text-purple-500",
    titleClass: "text-purple-500",
    title: "Quick Learner & Adaptable",
    text: "From mastering new technologies to adapting to different project requirements, I thrive in dynamic environments and embrace challenges as opportunities to grow."
  },
  {
    icon: Users,
    bgClass: "bg-green-500/10",
    iconClass: "text-green-500",
    titleClass: "text-green-500",
    title: "Team Player",
    text: "Collaboration is key to success. I communicate effectively, share knowledge willingly, and contribute positively to team dynamics."
  },
  {
    icon: Heart,
    bgClass: "bg-red-500/10",
    iconClass: "text-red-500",
    titleClass: "text-red-500",
    title: "Passionate About Impact",
    text: "I don't just write code or analyze data\u2014I create solutions that solve real problems and drive meaningful outcomes for businesses and users."
  },
];

const WhyHireMe = () => {
  const { isDark } = useTheme();

  return (
    <section className={`py-20 px-6 bg-gradient-to-b ${isDark ? 'from-[#030014] to-[#0a0a25]' : 'from-gray-50 to-white'}`}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Why Hire Me?" subtitle="What makes me stand out as your next team member" />
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, idx) => (
            <TiltCard key={idx} className={`flex gap-5 p-6 border-none ${isDark ? 'bg-[#0c0c24]' : 'bg-white shadow-lg'}`}>
              <div className={`p-3 ${reason.bgClass} rounded-xl h-fit`}>
                <reason.icon className={reason.iconClass} size={32} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${reason.titleClass} mb-2`}>{reason.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{reason.text}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHireMe;
