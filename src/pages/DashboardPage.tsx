import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Sparkles,
  Trophy,
  ArrowRight,
  Code2,
  Clock,
  BookOpen,
  Target,
  Bot,
  Compass,
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import type { UserLevel } from '../types/database';

export const DashboardPage: React.FC = () => {
  const { profile, userXP, streak } = useAuth();

  const currentLevel: UserLevel = userXP?.level || 'Beginner';
  const totalXp = userXP?.total_xp || 320;

  // Level thresholds
  const levelThresholds: Record<UserLevel, { min: number; max: number; next: UserLevel | 'Max' }> = {
    Beginner: { min: 0, max: 100, next: 'Explorer' },
    Explorer: { min: 100, max: 300, next: 'Problem Solver' },
    'Problem Solver': { min: 300, max: 600, next: 'Debugger' },
    Debugger: { min: 600, max: 1000, next: 'Algorithm Learner' },
    'Algorithm Learner': { min: 1000, max: 2000, next: 'Code Builder' },
    'Code Builder': { min: 2000, max: 5000, next: 'Max' },
  };

  const currentRange = levelThresholds[currentLevel] || { min: 0, max: 500, next: 'Explorer' };
  const levelProgressPercent = Math.min(
    100,
    Math.max(0, Math.round(((totalXp - currentRange.min) / (currentRange.max - currentRange.min)) * 100))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Greeting Banner & Level Progress */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-900/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Dashboard • V0 Foundation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {profile?.full_name || profile?.username || 'Student'}!
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Ready to code? The AI companion is standing by to help you understand every error,
              line of logic, and problem constraint.
            </p>
          </div>

          {/* Level Progress Gauge */}
          <div className="w-full lg:w-80 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400">Current Level:</span>
              <span className="font-bold text-purple-300">{currentLevel}</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
              <span>{totalXp} XP</span>
              <span>Next: {currentRange.next} ({currentRange.max} XP)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Metrics Grid: Streak, Today's Activity, Recent Achievement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-orange-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Daily Streak
            </span>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-orange-500/30" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {streak?.current_streak || 5}
              </span>
              <span className="text-sm font-semibold text-orange-400">Days Active</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Last activity recorded: {streak?.last_activity_date || 'Today'}. Longest streak: {streak?.longest_streak || 12} days.
            </p>
          </div>
        </div>

        {/* Today's Activity */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Today's Activity
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-2xl font-bold text-white">2</span>
                <p className="text-xs text-slate-400">Problems Solved</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-cyan-300">45m</span>
                <p className="text-xs text-slate-400">Study Session</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Meaningful daily progress without burnout.
            </p>
          </div>
        </div>

        {/* Recent Achievement */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Recent Achievement
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">First Try Mastery</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                +50 XP
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Solved "Sum of Two Numbers" on your very first test run!
            </p>
          </div>
        </div>
      </div>

      {/* 3. Next Recommended Problem Card */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Next Recommended Problem
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Easy
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Python
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Reverse a String</h3>
            <p className="text-slate-400 text-sm max-w-2xl">
              Write a function <code className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-purple-300 font-mono">reverse_string(s: str) -&gt; str</code> that takes a string and returns it reversed. Master string indexing and step notation.
            </p>
          </div>

          <Link
            to="/practice"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-purple-600/25"
          >
            <Code2 className="w-4 h-4" />
            <span>Open Practice Arena</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4. Quick Action Hub */}
      <div>
        <h3 className="text-base font-bold text-white mb-4">CodeMate Learning Suite</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/practice"
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Practice Arena</h4>
            <p className="text-xs text-slate-400">
              Problems across 15 DSA categories with Monaco editor and test runner.
            </p>
          </Link>

          <Link
            to="/ai-tutor"
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">AI Tutor & Explainer</h4>
            <p className="text-xs text-slate-400">
              Ask doubts with 3 explanation tiers: Beginner, Intermediate & Advanced.
            </p>
          </Link>

          <Link
            to="/learning-paths"
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Learning Paths</h4>
            <p className="text-xs text-slate-400">
              Curated roadmaps for Python, C, and Data Structures & Algorithms.
            </p>
          </Link>

          <Link
            to="/mistakes"
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Mistake Notebook</h4>
            <p className="text-xs text-slate-400">
              Review off-by-one errors, infinite loops, and past syntax missteps.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
