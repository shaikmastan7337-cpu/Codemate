import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  Award,
  Trophy,
  CheckCircle2,
  Calendar,
  Save,
  Globe,
  Edit3,
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const { profile, userXP, streak, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name || 'Alex Rivera');
  const [username, setUsername] = useState(profile?.username || 'alex_coder');
  const [avatarUrl, setAvatarUrl] = useState(
    profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      full_name: fullName,
      username,
      avatar_url: avatarUrl,
    });
    setSavedSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const unlockedAchievements = [
    {
      name: 'First Code',
      icon: 'Play',
      desc: 'Wrote and ran your very first program on CodeMate.',
      rarity: 'common',
      unlockedAt: 'Yesterday',
    },
    {
      name: 'First Try',
      icon: 'Target',
      desc: 'Solved a coding problem on the very first attempt without errors.',
      rarity: 'rare',
      unlockedAt: '2 hours ago',
    },
    {
      name: '7 Day Streak',
      icon: 'Flame',
      desc: 'Maintained a consistent daily coding habit for 7 days.',
      rarity: 'rare',
      unlockedAt: 'In Progress (5/7)',
    },
  ];

  const recentActivity = [
    {
      title: 'Solved "Sum of Two Numbers"',
      time: '2 hours ago',
      type: 'solve',
      xp: '+50 XP',
    },
    {
      title: 'Consulted AI Explainer on List Slicing in Python',
      time: 'Yesterday',
      type: 'ai',
      xp: '+10 XP',
    },
    {
      title: 'Extended Daily Coding Streak to 5 Days',
      time: 'Today',
      type: 'streak',
      xp: '+15 XP',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="relative group">
            <img
              src={avatarUrl}
              alt={username}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-purple-500/40 shadow-xl shadow-purple-500/10"
            />
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-purple-600 text-white shadow-lg">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile?.full_name || fullName}
                </h1>
                <p className="text-sm font-medium text-purple-400">@{profile?.username || username}</p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-center sm:self-auto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-2 flex items-center justify-center sm:justify-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Joined CodeMate Student community recently</span>
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile successfully updated!</span>
          </div>
        )}

        {/* Edit Form Modal/Drawer */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stats Grid: Level, XP, Streak, Problems Solved, Languages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="w-8 h-8 mx-auto rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-white block">{userXP?.level || 'Problem Solver'}</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Level</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="w-8 h-8 mx-auto rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-white block">{userXP?.total_xp || 320}</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Total XP</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="w-8 h-8 mx-auto rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-2">
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-white block">{streak?.current_streak || 5} Days</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Streak</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-white block">14</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Problems Solved</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center col-span-2 sm:col-span-1">
          <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-white block">Python, C</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Languages</span>
        </div>
      </div>

      {/* Two Columns: Achievements & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements Section */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>Earned Achievements</span>
            </h3>
            <span className="text-xs text-slate-400">2 / 9 Unlocked</span>
          </div>

          <div className="space-y-3">
            {unlockedAchievements.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 shrink-0">
                  {item.unlockedAt}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>Recent Activity History</span>
          </h3>

          <div className="space-y-3">
            {recentActivity.map((act, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">{act.title}</h4>
                  <p className="text-[10px] text-slate-500">{act.time}</p>
                </div>
                <span className="text-xs font-bold text-purple-300 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                  {act.xp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
