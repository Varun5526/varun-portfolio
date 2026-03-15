import { skillsData } from './skills';
import projectsData from './projects';
import experienceData from './experience';
import certificationsData from './certifications';

export const PORTFOLIO_CONTEXT = {
  skills: skillsData.map(s => s.title),
  projects: projectsData,
  experience: experienceData,
  certifications: certificationsData,
  summary: "B.Tech AI & Data Science Student at Rajalakshmi Institute of Technology with a CGPA of 8.0."
};

export const generateOfflineResponse = (query, context) => {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('skill') || lowerQuery.includes('tech') || lowerQuery.includes('stack')) {
    return `I am proficient in ${context.skills.slice(0, 4).join(', ')}, and ${context.skills[4]}. My core strengths are Data Analytics, Python, and SQL.`;
  }

  if (lowerQuery.includes('project') || lowerQuery.includes('built') || lowerQuery.includes('work')) {
    const projectNames = context.projects.map(p => p.title).join(', ');
    return `I've worked on several exciting projects like: ${projectNames}. My featured project is the RAG Chatbot using LangChain.`;
  }

  if (lowerQuery.includes('experience') || lowerQuery.includes('intern') || lowerQuery.includes('job') || lowerQuery.includes('company')) {
    const experiences = context.experience.map(e => `${e.title} at ${e.company}`).join(' and ');
    return `I have professional experience as a ${experiences}.`;
  }

  if (lowerQuery.includes('certif') || lowerQuery.includes('course')) {
    return `I hold certifications in ${context.certifications[0]}, ${context.certifications[1]}, and specifically Power BI Data Modelling.`;
  }

  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach')) {
    return "You can reach me via email at varunbala2809@gmail.com or call me at +91-8838193946.";
  }

  if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('college')) {
    return "I am currently pursuing my B.Tech in AI & Data Science at Rajalakshmi Institute of Technology with a CGPA of 8.0.";
  }

  if (lowerQuery.includes('excel') || lowerQuery.includes('power bi')) {
    return "Yes! I have strong proficiency in Excel and Power BI, including Data Modelling certifications and internship experience using these tools.";
  }

  return "I'm currently in offline mode. I can tell you about my Skills, Projects, Experience, or how to Contact me. What would you like to know?";
};
