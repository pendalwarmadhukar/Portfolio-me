import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  Shield,
  Cloud,
  Terminal,
  Wrench,
  GitBranch,
  Code2,
  BrainCircuit,
  Search,
  CheckCircle2
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    "SOC & Cybersecurity": <Shield className="w-5 h-5 text-cyan-400" />,
    "Cloud Security": <Cloud className="w-5 h-5 text-blue-400" />,
    "Networking & Linux": <Terminal className="w-5 h-5 text-teal-400" />,
    "Security Tools": <Wrench className="w-5 h-5 text-sky-400" />,
    "DevSecOps": <GitBranch className="w-5 h-5 text-emerald-400" />,
    "Programming & Development": <Code2 className="w-5 h-5 text-indigo-400" />,
    "Data & AI": <BrainCircuit className="w-5 h-5 text-purple-400" />
  };

  const getCategoryTitle = (catTitle: string) => {
    return t.skills.categories[catTitle] || catTitle;
  };

  const categoryOptions = [
    { id: 'All', label: isHindi ? 'सभी' : 'All' },
    ...SKILL_CATEGORIES.map(c => ({ id: c.title, label: getCategoryTitle(c.title) }))
  ];

  const filteredCategories = SKILL_CATEGORIES.map(cat => {
    if (selectedCategory !== 'All' && cat.title !== selectedCategory) {
      return null;
    }
    const matchingSkills = cat.skills.filter(s =>
      s.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (searchQuery && matchingSkills.length === 0) {
      return null;
    }
    return {
      ...cat,
      skills: matchingSkills
    };
  }).filter(Boolean) as typeof SKILL_CATEGORIES;

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0e17] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              {t.skills.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.skills.title}
            </h2>
            <div className="h-0.5 w-12 bg-cyan-500 mt-3" />
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={isHindi ? "कौशल खोजें (उदा. AWS, Splunk, लिनक्स)..." : "Search skill (e.g. AWS, Splunk, Linux)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#111827] border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categoryOptions.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-semibold shadow-sm'
                  : 'bg-[#111827] border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-[#111827] border border-slate-800/90 shadow-lg hover:border-cyan-500/40 hover:shadow-cyan-950/20 transition-colors duration-300 group"
              style={{
                perspective: '1000px'
              }}
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800/80">
                <div className="p-2.5 rounded-lg bg-[#0a0e17] border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                  {categoryIcons[cat.title] || <Shield className="w-5 h-5 text-cyan-400" />}
                </div>
                <h3 className="text-base font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                  {getCategoryTitle(cat.title)}
                </h3>
              </div>

              {/* Skill Items */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0a0e17] border border-slate-800/80 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400/80 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-[#111827] border border-slate-800 text-slate-400 font-mono text-sm">
            {isHindi ? `"${searchQuery}" से मेल खाता कोई कौशल नहीं मिला।` : `No technical skills found matching "${searchQuery}".`}
          </div>
        )}
      </div>
    </section>
  );
};

