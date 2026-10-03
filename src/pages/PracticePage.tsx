import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Terminal,
} from 'lucide-react';

import type { Difficulty } from '../types/database';

interface PracticeProblem {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  language: string;
  solved: boolean;
  firstTryEligible: boolean;
}

const mockProblems: PracticeProblem[] = [
  {
    id: '1',
    title: 'Sum of Two Numbers',
    category: 'Variables',
    difficulty: 'Easy',
    language: 'Python',
    solved: true,
    firstTryEligible: false,
  },
  {
    id: '2',
    title: 'Reverse a String',
    category: 'Strings',
    difficulty: 'Easy',
    language: 'Python',
    solved: false,
    firstTryEligible: true,
  },
  {
    id: '3',
    title: 'Find Maximum in Array',
    category: 'Arrays',
    difficulty: 'Easy',
    language: 'Python',
    solved: false,
    firstTryEligible: true,
  },
  {
    id: '4',
    title: 'Detect Palindrome',
    category: 'Strings',
    difficulty: 'Easy',
    language: 'Python',
    solved: false,
    firstTryEligible: true,
  },
  {
    id: '5',
    title: 'Two Sum Problem',
    category: 'Arrays',
    difficulty: 'Medium',
    language: 'Python',
    solved: false,
    firstTryEligible: true,
  },
  {
    id: '6',
    title: 'Valid Parentheses',
    category: 'Stacks',
    difficulty: 'Medium',
    language: 'Python',
    solved: false,
    firstTryEligible: true,
  },
];

const categories = [
  'All',
  'Variables',
  'Conditions',
  'Loops',
  'Arrays',
  'Strings',
  'Functions',
  'Recursion',
  'Searching',
  'Sorting',
  'Linked Lists',
  'Stacks',
  'Queues',
  'Trees',
  'Dynamic Programming',
];

export const PracticePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const filteredProblems = mockProblems.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDiff && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice Arena • Coming in V1 CodeMate Core</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Coding Practice Arena</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Solve real engineering problems with Monaco Editor, actual sandbox execution, progressive AI hints, and First-Try Achievement verification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs">
              <span className="font-bold text-white block text-sm">First-Try Mastery</span>
              <span>Pass on attempt #1 for +50 XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by name or concept..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-slate-800 border-purple-500/50 text-purple-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Difficulty</th>
                <th className="py-3 px-4 font-semibold">Language</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredProblems.map((prob) => (
                <tr key={prob.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    {prob.solved ? (
                      <span className="inline-flex items-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block ml-1" />
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span>{prob.title}</span>
                      {prob.firstTryEligible && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                          1st-Try Ready
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400">{prob.category}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400">{prob.language}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors"
                    >
                      <span>Code</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor & Execution Architecture Spec Preview */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>V1 Code Execution Engine Pipeline</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Frontend (Monaco Editor) → Supabase Edge Function → Secure Isolated Sandbox Container → Real Output / Compiler Error → Student Feedback.
          <strong className="text-slate-200"> Never simulated or faked.</strong>
        </p>
      </div>
    </div>
  );
};
