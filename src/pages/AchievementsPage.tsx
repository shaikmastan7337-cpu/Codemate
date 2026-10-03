import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  Flame,
  Target,
  Play,
  Bug,
  Zap,
  Compass,
  Crown,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface AchievementItem {
  id: string;
  name: string;
  desc: string;
  icon: any;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xp: number;
  unlocked: boolean;
}

export const AchievementsPage: React.FC = () => {
  const { reduceAnimations } = useSettings();
  const [showCelebration, setShowCelebration] = useState(false);

  const achievementsList: AchievementItem[] = [
    {
      id: 'first_code',
      name: 'First Code',
      desc: 'Wrote and ran your very first program on CodeMate.',
      icon: Play,
      rarity: 'common',
      xp: 25,
      unlocked: true,
    },
    {
      id: 'first_try',
      name: 'First Try',
      desc: 'Solved a coding problem on the very first attempt without failing tests.',
      icon: Target,
      rarity: 'rare',
      xp: 50,
      unlocked: true,
    },
    {
      id: 'streak_7',
      name: '7 Day Streak',
      desc: 'Maintained a consistent daily coding habit for 7 days in a row.',
      icon: Flame,
      rarity: 'rare',
      xp: 100,
      unlocked: false,
    },
    {
      id: 'hundred_problems',
      name: '100 Problems',
      desc: 'Solved 100 coding problems across your learning journey.',
      icon: Trophy,
      rarity: 'legendary',
      xp: 500,
      unlocked: false,
    },
    {
      id: 'python_starter',
      name: 'Python Starter',
      desc: 'Completed your first 5 Python problems successfully.',
      icon: Sparkles,
      rarity: 'common',
      xp: 40,
      unlocked: false,
    },
    {
      id: 'debugger',
      name: 'Debugger',
      desc: 'Identified and fixed a bug with the assistance of CodeMate AI Debugger.',
      icon: Bug,
      rarity: 'common',
      xp: 30,
      unlocked: false,
    },
    {
      id: 'speed_coder',
      name: 'Speed Coder',
      desc: 'Submitted an accepted solution within 5 minutes of opening the problem.',
      icon: Zap,
      rarity: 'rare',
      xp: 75,
      unlocked: false,
    },
    {
      id: 'dsa_explorer',
      name: 'DSA Explorer',
      desc: 'Solved at least one problem in Arrays, Strings, and Linked Lists.',
      icon: Compass,
      rarity: 'epic',
      xp: 150,
      unlocked: false,
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      desc: 'Reached an unbroken daily coding streak of 30 days.',
      icon: Crown,
      rarity: 'legendary',
      xp: 300,
      unlocked: false,
    },
  ];

  const triggerCelebrationDemo = () => {
    setShowCelebration(true);

    if (!reduceAnimations) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#6366f1', '#06b6d4', '#eab308'],
      });
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'rare':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-semibold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Gamification & XP • Section 5 & 6 Spec</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Achievements</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Earn XP for meaningful learning milestones. Passing a problem on your first submission triggers the First-Try Mastery celebration.
            </p>
          </div>

          <button
            type="button"
            onClick={triggerCelebrationDemo}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-purple-600/30 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Test First-Try Celebration</span>
          </button>
        </div>
      </div>

      {/* Celebration Modal / Banner Overlay */}
      {showCelebration && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/50 shadow-2xl animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/40">
              <Target className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">First-Try Mastery!</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  +50 XP
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Zero previous failed attempts on this problem. Outstanding precision!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowCelebration(false)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            Continue Coding
          </button>
        </div>
      )}

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievementsList.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                item.unlocked
                  ? 'bg-slate-900/80 border-purple-500/30 hover:border-purple-500/50 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.unlocked ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getRarityBadge(
                      item.rarity
                    )}`}
                  >
                    {item.rarity}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{item.name}</span>
                  {item.unlocked ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="font-bold text-purple-300">+{item.xp} XP</span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {item.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
