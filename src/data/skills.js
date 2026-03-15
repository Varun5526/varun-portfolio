import { BarChart, Database, Terminal, Brain, Zap, Cloud, Link, Eye } from 'lucide-react';
import { MessageSquare, Users, Lightbulb, User, Clock } from 'lucide-react';

export const skillsData = [
  { icon: Terminal, title: "Python", projects: "7+", certs: "2", exp: "2 Years", level: 100, color: { bg: "bg-green-500", text: "text-green-400", bar: "bg-green-500", grad: "from-emerald-500 to-teal-500" } },
  { icon: Database, title: "SQL", projects: "5+", certs: "1", exp: "2 Years", level: 100, color: { bg: "bg-pink-500", text: "text-pink-400", bar: "bg-pink-500", grad: "from-purple-500 to-pink-500" } },
  { icon: Brain, title: "Machine Learning", projects: "3+", certs: "2", exp: "1 Year", level: 100, color: { bg: "bg-pink-500", text: "text-pink-400", bar: "bg-pink-500", grad: "from-pink-500 to-purple-500" } },
  { icon: Brain, title: "Deep Learning", projects: "2+", certs: "1", exp: "1 Year", level: 100, color: { bg: "bg-purple-500", text: "text-purple-400", bar: "bg-purple-500", grad: "from-purple-600 to-indigo-500" } },
  { icon: Eye, title: "Computer Vision", projects: "1+", certs: "1", exp: "6 Months", level: 100, color: { bg: "bg-blue-500", text: "text-blue-400", bar: "bg-blue-500", grad: "from-blue-500 to-cyan-500" } },
  { icon: Link, title: "LangChain & RAG", projects: "2+", certs: "1", exp: "6 Months", level: 100, color: { bg: "bg-orange-500", text: "text-orange-400", bar: "bg-orange-500", grad: "from-orange-500 to-red-500" } },
  { icon: BarChart, title: "Power BI", projects: "3+", certs: "1", exp: "1 Year", level: 100, color: { bg: "bg-yellow-500", text: "text-yellow-400", bar: "bg-yellow-500", grad: "from-yellow-500 to-orange-500" } },
  { icon: BarChart, title: "Pandas & EDA", projects: "6+", certs: "2", exp: "2 Years", level: 100, color: { bg: "bg-cyan-500", text: "text-cyan-400", bar: "bg-cyan-500", grad: "from-cyan-500 to-blue-500" } },
  { icon: Zap, title: "FastAPI & REST", projects: "2+", certs: "0", exp: "6 Months", level: 100, color: { bg: "bg-teal-500", text: "text-teal-400", bar: "bg-teal-500", grad: "from-teal-500 to-green-500" } },
  { icon: Cloud, title: "Airflow & Azure", projects: "2+", certs: "0", exp: "6 Months", level: 100, color: { bg: "bg-blue-600", text: "text-blue-400", bar: "bg-blue-600", grad: "from-blue-600 to-indigo-600" } },
  { icon: Brain, title: "Hugging Face & LLMs", projects: "2+", certs: "1", exp: "6 Months", level: 100, color: { bg: "bg-yellow-600", text: "text-yellow-400", bar: "bg-yellow-600", grad: "from-yellow-600 to-amber-500" } },
  { icon: BarChart, title: "Matplotlib & Viz", projects: "5+", certs: "1", exp: "2 Years", level: 100, color: { bg: "bg-indigo-500", text: "text-indigo-400", bar: "bg-indigo-500", grad: "from-indigo-500 to-purple-500" } },
];

export const radarData = [
  { subject: 'Python', A: 100 },
  { subject: 'SQL', A: 100 },
  { subject: 'ML / DL', A: 100 },
  { subject: 'LangChain & RAG', A: 100 },
  { subject: 'Power BI', A: 100 },
  { subject: 'Pandas & EDA', A: 100 },
  { subject: 'FastAPI', A: 100 },
  { subject: 'Airflow & Azure', A: 100 },
  { subject: 'LLMs & HF', A: 100 },
  { subject: 'Data Viz', A: 100 },
];

export const softSkills = [
  { name: "Communication", icon: MessageSquare },
  { name: "Teamwork", icon: Users },
  { name: "Problem Solving", icon: Lightbulb },
  { name: "Adaptability", icon: Zap },
  { name: "Leadership", icon: User },
  { name: "Time Management", icon: Clock },
];
