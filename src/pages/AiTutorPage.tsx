import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Bug,
  HelpCircle,
  Lightbulb,
  FileCheck,
  Send,
  Code2,
} from 'lucide-react';


type ExplanationLevel = 'beginner' | 'intermediate' | 'advanced';
type TutorMode = 'doubt' | 'explain' | 'debug' | 'hint' | 'review';

export const AiTutorPage: React.FC = () => {
  const [level, setLevel] = useState<ExplanationLevel>('intermediate');
  const [mode, setMode] = useState<TutorMode>('doubt');
  const [query, setQuery] = useState('');

  const sampleDoubtPrompt =
    'Why do I get an IndexError when looping through an array with len(nums) in Python?';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core AI Companion • Section 2 Spec</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">CodeMate AI Tutor</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Understand logic, debug runtime errors, and learn computational thinking at your exact skill level.
            </p>
          </div>

          {/* Level Switcher */}
          <div className="p-1 rounded-2xl bg-slate-950 border border-slate-800 flex items-center">
            {(['beginner', 'intermediate', 'advanced'] as ExplanationLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                className={`capitalize px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  level === lvl
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: 'doubt', label: 'Doubt Solver', icon: HelpCircle, color: 'text-purple-400' },
          { id: 'explain', label: 'Code Explainer', icon: Code2, color: 'text-blue-400' },
          { id: 'debug', label: 'Debugging Assistant', icon: Bug, color: 'text-rose-400' },
          { id: 'hint', label: 'Progressive Hints', icon: Lightbulb, color: 'text-amber-400' },
          { id: 'review', label: 'AI Code Review', icon: FileCheck, color: 'text-emerald-400' },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id as TutorMode)}
              className={`p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all ${
                isActive
                  ? 'bg-purple-600/20 border-purple-500/50 shadow-md shadow-purple-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-xs font-bold text-white block">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Demonstration Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Code or Question Input */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Ask or Paste Code
              </span>
              <button
                type="button"
                onClick={() => setQuery(sampleDoubtPrompt)}
                className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
              >
                Insert Sample Question
              </button>
            </div>

            <textarea
              rows={6}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Can you explain why my recursive Fibonacci function exceeds recursion depth?"
              className="w-full p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono leading-relaxed"
            />

            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-1">
                Active Level: {level.toUpperCase()}
              </span>
              {level === 'beginner' &&
                'Uses everyday intuitive analogies, visual metaphors, and zero unnecessary jargon.'}
              {level === 'intermediate' &&
                'Connects concepts to standard data structures, algorithmic paradigms, and runtime behavior.'}
              {level === 'advanced' &&
                'Explores memory layout, hardware cache lines, Big-O amortized bounds, and compiler optimizations.'}
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-4 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Generate Explanation via Gemini API</span>
          </button>
        </div>

        {/* Right: AI Output Stream Simulation */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">CodeMate Explanation Engine</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Structured Response
            </span>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-slate-300 font-sans">
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/30">
              <span className="font-bold text-purple-300 block mb-1">Core Concept:</span>
              <p>
                In 0-indexed arrays with length <code>N</code>, the valid index positions are <code>0</code> through <code>N - 1</code>.
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-200 block mb-1">Underlying Cause:</span>
              <p className="text-slate-400">
                When you access <code>nums[len(nums)]</code>, Python looks for an item at index <code>N</code>, which does not exist because indices stop at <code>N - 1</code>.
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-200 block mb-1">Idiomatic Correction:</span>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
                <code>
                  # Correct: iterate directly or stop before length<br />
                  for item in nums:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;print(item)<br />
                  <br />
                  # Or with range:<br />
                  for i in range(len(nums)): # range(N) stops at N-1<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;print(nums[i])
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
