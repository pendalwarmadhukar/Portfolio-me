import React from 'react';
import { GITHUB_REPOS, PERSONAL_INFO } from '../data/portfolioData.ts';
import { Github, ExternalLink, GitFork, Star, FolderGit2 } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0e17] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Version Control & Open Source</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              GitHub Projects
            </h2>
            <div className="h-0.5 w-12 bg-cyan-500 mt-3" />
            <p className="mt-3 text-xs sm:text-sm text-slate-400">
              Selected public repositories by{' '}
              <span className="font-mono text-cyan-400 font-semibold">@{PERSONAL_INFO.githubUsername}</span>
            </p>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 transition-all self-start md:self-auto shadow-md group"
          >
            <Github className="w-4 h-4 text-slate-300 group-hover:text-cyan-400 transition-colors" />
            <span>View GitHub Profile</span>
            <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GITHUB_REPOS.map((repo) => (
            <div
              key={repo.name}
              className="p-6 rounded-2xl bg-[#111827] border border-slate-800/90 shadow-lg hover:border-cyan-500/40 hover:shadow-cyan-950/20 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <h3 className="text-base font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                      {repo.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    {repo.stars !== undefined && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        <span>{repo.stars}</span>
                      </span>
                    )}
                    {repo.forks !== undefined && (
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-slate-400" />
                        <span>{repo.forks}</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {repo.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {repo.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#0a0e17] border border-slate-800 text-xs font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  />
                  <span className="text-xs font-mono text-slate-400">
                    {repo.technologies[0]}
                  </span>
                </div>

                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 transition-colors"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
