import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LEETCODE_STATS, PERSONAL_INFO } from '../data/portfolioData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LeetCodeIcon } from './LeetCodeIcon.tsx';
import {
  ExternalLink,
  Flame,
  Calendar,
  Award,
  CheckCircle2,
  TrendingUp,
  Code2,
  Zap,
  Target,
  Radio,
  RefreshCw
} from 'lucide-react';

export const LeetCodeSection: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState(LEETCODE_STATS);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-fetch live stats so day-to-day solved problems update automatically
  useEffect(() => {
    let isMounted = true;
    const fetchLatestLeetCode = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_STATS.username}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted) return;

        if (data && typeof data.totalSolved === 'number') {
          let activeDaysCount = LEETCODE_STATS.activeDays;
          let annualSubs = LEETCODE_STATS.annualSubmissions;

          if (data.submissionCalendar && typeof data.submissionCalendar === 'object') {
            activeDaysCount = Object.keys(data.submissionCalendar).length;
            annualSubs = Object.values(data.submissionCalendar).reduce(
              (acc: number, val: any) => acc + (Number(val) || 0),
              0
            );
          }

          setStats(prev => ({
            ...prev,
            totalSolved: data.totalSolved,
            totalQuestions: data.totalQuestions || prev.totalQuestions,
            easy: {
              solved: data.easySolved ?? prev.easy.solved,
              total: data.totalEasy ?? prev.easy.total,
            },
            medium: {
              solved: data.mediumSolved ?? prev.medium.solved,
              total: data.totalMedium ?? prev.medium.total,
            },
            hard: {
              solved: data.hardSolved ?? prev.hard.solved,
              total: data.totalHard ?? prev.hard.total,
            },
            ranking: data.ranking ? Number(data.ranking).toLocaleString() : prev.ranking,
            activeDays: activeDaysCount || prev.activeDays,
            annualSubmissions: annualSubs || prev.annualSubmissions,
          }));
          setIsLive(true);
        }
      } catch (err) {
        // Fallback to verified baseline stats
        console.warn('LeetCode live sync fallback:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchLatestLeetCode();
    return () => {
      isMounted = false;
    };
  }, []);

  const easyPercent = Math.round((stats.easy.solved / stats.easy.total) * 100);
  const medPercent = Math.round((stats.medium.solved / stats.medium.total) * 100);
  const hardPercent = Math.round((stats.hard.solved / stats.hard.total) * 100);
  const totalPercent = ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1);

  // Circular gauge calculations (circumference for r=70: 2 * PI * 70 ≈ 440)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  // Segment lengths based on solved ratio out of total solved
  const easyRatio = stats.totalSolved > 0 ? stats.easy.solved / stats.totalSolved : 0;
  const medRatio = stats.totalSolved > 0 ? stats.medium.solved / stats.totalSolved : 0;
  const hardRatio = stats.totalSolved > 0 ? stats.hard.solved / stats.totalSolved : 0;

  const easyStroke = circumference * 0.75 * easyRatio;
  const medStroke = circumference * 0.75 * medRatio;
  const hardStroke = circumference * 0.75 * hardRatio;

  return (
    <section id="leetcode" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0e17] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              <LeetCodeIcon className="w-4 h-4 text-amber-400" />
              <span>{t.leetcode.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex flex-wrap items-center gap-3">
              <span>{t.leetcode.title}</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Top Problem Solver
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isLive ? 'Daily Auto-Sync: Active' : 'Daily Live Sync'}</span>
              </span>
            </h2>
            <div className="h-0.5 w-12 bg-amber-500 mt-3" />
            <p className="mt-3 text-xs sm:text-sm text-slate-400">
              {t.leetcode.subtitle}{' '}
              <span className="font-mono text-amber-400 font-semibold">@{stats.username}</span>
            </p>
          </div>

          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary self-start md:self-auto group border-amber-500/30 hover:border-amber-400/60"
          >
            <LeetCodeIcon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{t.leetcode.viewProfile}</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Highlight Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="p-5 rounded-2xl bg-[#111827] border border-slate-800/90 hover:border-amber-500/40 transition-colors group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">{t.leetcode.rankLabel}</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-amber-300 transition-colors">
              #{stats.ranking}
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">Global ranking</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-5 rounded-2xl bg-[#111827] border border-slate-800/90 hover:border-orange-500/40 transition-colors group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">{t.leetcode.maxStreakLabel}</span>
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-orange-400 group-hover:text-orange-300 transition-colors">
              {stats.maxStreak} Days
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">Continuous streak</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="p-5 rounded-2xl bg-[#111827] border border-slate-800/90 hover:border-cyan-500/40 transition-colors group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">{t.leetcode.activeDaysLabel}</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
              {stats.activeDays} Days
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">{stats.annualSubmissions} submissions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-5 rounded-2xl bg-[#111827] border border-slate-800/90 hover:border-purple-500/40 transition-colors group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">{t.leetcode.badgesLabel}</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-300 group-hover:text-purple-200 transition-colors">
              {stats.badgesCount} Badges
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 truncate" title={stats.recentBadge}>
              {stats.recentBadge}
            </div>
          </motion.div>
        </div>

        {/* Main Statistics Breakdown & Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left: Interactive Solved Ring & Difficulty Breakdown (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#111827] border border-slate-800 shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-amber-400" />
                  {t.leetcode.solvedLabel}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Solving algorithmic challenges across data structures
                </p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                {totalPercent}% of catalog
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Circular Gauge Centerpiece */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center relative py-2">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                    {/* Background Track */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      className="text-slate-800"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {/* Easy Arc (Teal/Emerald) */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeDasharray={`${easyStroke} ${circumference}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Medium Arc (Amber) */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="#f59e0b"
                      strokeWidth="10"
                      strokeDasharray={`${medStroke} ${circumference}`}
                      strokeDashoffset={-easyStroke}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Hard Arc (Rose/Red) */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="#f43f5e"
                      strokeWidth="10"
                      strokeDasharray={`${hardStroke} ${circumference}`}
                      strokeDashoffset={-(easyStroke + medStroke)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Centered Total */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-3xl font-extrabold font-mono text-white">
                      {stats.totalSolved}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      / {stats.totalQuestions}
                    </span>
                    <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Solved</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-mono text-slate-400">
                    Attempting: <span className="text-slate-200 font-semibold">5</span>
                  </span>
                </div>
              </div>

              {/* Difficulty Progress Bars */}
              <div className="sm:col-span-7 space-y-4">
                {/* Easy */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      {t.leetcode.easyLabel}
                    </span>
                    <span className="text-slate-300 font-bold">
                      {stats.easy.solved} <span className="text-slate-400 text-[11px]">/ {stats.easy.total}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${easyPercent}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Target: Foundational</span>
                    <span>{easyPercent}% Completed</span>
                  </div>
                </div>

                {/* Medium */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      {t.leetcode.mediumLabel}
                    </span>
                    <span className="text-slate-300 font-bold">
                      {stats.medium.solved} <span className="text-slate-400 text-[11px]">/ {stats.medium.total}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${medPercent}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Target: Interview Grade</span>
                    <span>{medPercent}% Completed</span>
                  </div>
                </div>

                {/* Hard */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                      {t.leetcode.hardLabel}
                    </span>
                    <span className="text-slate-300 font-bold">
                      {stats.hard.solved} <span className="text-slate-400 text-[11px]">/ {stats.hard.total}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${hardPercent}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Target: Advanced Algorithms</span>
                    <span>{hardPercent}% Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom badge acknowledgment */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Most Active: <strong className="text-slate-200">C++ / Python / Java</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>Acceptance Rate: <strong className="text-slate-200">High Reliability</strong></span>
              </div>
            </div>
          </motion.div>

          {/* Right: Badge Spotlight & Core Domains (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 50 Days Badge Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#111827] via-[#111827] to-amber-950/20 border border-amber-500/30 shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
              
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      OFFICIAL BADGE
                    </span>
                    <span className="text-xs font-mono text-slate-400">2026</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-mono group-hover:text-amber-300 transition-colors">
                    {stats.recentBadge}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Awarded for maintaining rigorous consistency and successfully solving problems across 50 consecutive calendar periods.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Total Badges Earned: <strong className="text-amber-300">{stats.badgesCount}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Streak
                </span>
              </div>
            </motion.div>

            {/* Core Problem Solving Domains */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="p-6 rounded-2xl bg-[#111827] border border-slate-800 shadow-xl flex-grow flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  {t.leetcode.topTopicsTitle}
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Key patterns frequently utilized in algorithm design and technical evaluations:
                </p>

                <div className="flex flex-wrap gap-2">
                  {stats.topTopics.map((topic) => (
                    <div
                      key={topic.name}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors text-xs font-mono flex items-center gap-2"
                    >
                      <span className="text-slate-300">{topic.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                        {topic.solved}+
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Problem-solving speed:</span>
                <span className="text-cyan-300 font-semibold">Optimal Time & Space</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recent Accepted Solutions Showcase */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t.leetcode.recentAcceptedTitle}</span>
            </h3>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              Verified on profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.recentAccepted.map((prob, idx) => {
              const diffColor =
                prob.difficulty === 'Easy'
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : prob.difficulty === 'Medium'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                  : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

              return (
                <motion.div
                  key={prob.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="p-4 rounded-xl bg-[#111827] border border-slate-800/90 hover:border-cyan-500/40 hover:shadow-cyan-950/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border ${diffColor}`}>
                        {prob.difficulty}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{prob.solvedTime}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white font-mono group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
                      {prob.title}
                    </h4>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {prob.tags.slice(0, 2).map((tg) => (
                        <span
                          key={tg}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0a0e17] text-slate-400 border border-slate-800/80"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={prob.url || PERSONAL_INFO.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-between group/link"
                  >
                    <span>{t.leetcode.viewProblem}</span>
                    <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
