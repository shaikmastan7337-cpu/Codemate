import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

import type { MistakeCategory } from '../types/database';

interface RecordedMistake {
  id: string;
  category: MistakeCategory;
  categoryLabel: string;
  problemTitle: string;
  description: string;
  codeSnippet: string;
  correction: string;
  frequency: number;
}

const mockMistakes: RecordedMistake[] = [
  {
    id: 'm1',
    category: 'off_by_one',
    categoryLabel: 'Off-By-One Error',
    problemTitle: 'Find Maximum in Array',
    description: 'Used range(len(nums) + 1) which triggered an IndexError on the final loop iteration.',
    codeSnippet: 'for i in range(len(nums) + 1):\n    if nums[i] > max_val: ...',
    correction: 'for i in range(len(nums)):\n    # Arrays are 0 to len-1',
    frequency: 3,
  },
  {
    id: 'm2',
    category: 'wrong_condition',
    categoryLabel: 'Wrong Loop / Branch Condition',
    problemTitle: 'Reverse a String',
    description: 'Checked while i > 0 instead of while i >= 0, dropping the first character at index 0.',
    codeSnippet: 'while i > 0:\n    res += s[i]\n    i -= 1',
    correction: 'while i >= 0:\n    res += s[i]\n    i -= 1',
    frequency: 2,
  },
  {
    id: 'm3',
    category: 'infinite_loop',
    categoryLabel: 'Infinite Loop',
    problemTitle: 'Two Sum Problem',
    description: 'Forgot to increment the left pointer inside the inner while loop condition.',
    codeSnippet: 'while left < right:\n    if total == target: return\n    # missing left += 1',
    correction: 'left += 1 # Ensure loop moves towards termination',
    frequency: 1,
  },
];

export const MistakesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredMistakes = mockMistakes.filter((m) => {
    if (selectedFilter === 'all') return true;
    return m.category === selectedFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Learning • Section 9 Spec</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Mistake Notebook</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Turn recurring coding errors into masteries. Every tracked mistake links to explanations, corrections, and tailored practice problems.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Personalized Adaptive Prompt</span>
            <button
              type="button"
              className="mt-1 text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>"What should I practice next?"</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Mistakes' },
          { id: 'off_by_one', label: 'Off-By-One' },
          { id: 'wrong_condition', label: 'Wrong Conditions' },
          { id: 'infinite_loop', label: 'Infinite Loops' },
          { id: 'index_error', label: 'Index Errors' },
          { id: 'syntax_error', label: 'Syntax Errors' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              selectedFilter === tab.id
                ? 'bg-purple-600 border-purple-500 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mistake Entries */}
      <div className="space-y-4">
        {filteredMistakes.map((mistake) => (
          <div
            key={mistake.id}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{mistake.categoryLabel}</h3>
                  <p className="text-xs text-slate-400">Observed in: {mistake.problemTitle}</p>
                </div>
              </div>

              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 self-start sm:self-auto">
                Encountered {mistake.frequency}x
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{mistake.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-rose-500/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  Mistake Snippet
                </span>
                <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap">{mistake.codeSnippet}</pre>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Corrected Concept
                </span>
                <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap">{mistake.correction}</pre>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>Practice Similar Problem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
