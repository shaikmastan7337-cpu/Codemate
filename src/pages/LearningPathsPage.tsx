import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Terminal,
  Code2,
  Layers,
  Award,
} from 'lucide-react';


interface PathNode {
  title: string;
  completed: boolean;
  active?: boolean;
}

export const LearningPathsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'c' | 'dsa'>('python');

  const pythonSteps: PathNode[] = [
    { title: 'Variables', completed: true },
    { title: 'Data Types', completed: true },
    { title: 'Conditions', completed: true },
    { title: 'Loops', completed: true },
    { title: 'Functions', completed: false, active: true },
    { title: 'Lists', completed: false },
    { title: 'Dictionaries', completed: false },
    { title: 'OOP', completed: false },
    { title: 'Recursion', completed: false },
    { title: 'Algorithms', completed: false },
  ];

  const cSteps: PathNode[] = [
    { title: 'Basics', completed: true },
    { title: 'Conditions', completed: true },
    { title: 'Loops', completed: false, active: true },
    { title: 'Functions', completed: false },
    { title: 'Arrays', completed: false },
    { title: 'Strings', completed: false },
    { title: 'Pointers', completed: false },
    { title: 'Structures', completed: false },
    { title: 'Linked Lists', completed: false },
    { title: 'Stacks', completed: false },
    { title: 'Queues', completed: false },
  ];

  const dsaSteps: PathNode[] = [
    { title: 'Complexity (Big-O)', completed: true },
    { title: 'Arrays', completed: true },
    { title: 'Strings', completed: false, active: true },
    { title: 'Searching', completed: false },
    { title: 'Sorting', completed: false },
    { title: 'Linked Lists', completed: false },
    { title: 'Stack & Queue', completed: false },
    { title: 'Trees', completed: false },
    { title: 'Graphs', completed: false },
    { title: 'Dynamic Programming', completed: false },
  ];

  const getActiveSteps = () => {
    if (activeTab === 'python') return pythonSteps;
    if (activeTab === 'c') return cSteps;
    return dsaSteps;
  };

  const currentSteps = getActiveSteps();
  const completedCount = currentSteps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / currentSteps.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Structured Roadmaps • Section 8 Spec</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Learning Paths</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Step-by-step masteries designed to take you from initial syntax to advanced engineering algorithms.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block">Path Progress</span>
              <span className="text-base font-bold text-indigo-300">{progressPercent}% Completed</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Path Selector Tabs */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('python')}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeTab === 'python'
              ? 'bg-purple-600/20 border-purple-500/50 shadow-md shadow-purple-500/10'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
          }`}
        >
          <Code2 className="w-5 h-5 text-purple-400 shrink-0" />
          <div>
            <span className="text-sm font-bold text-white block">Python Roadmap</span>
            <span className="text-[11px] text-slate-400">10 Milestones</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('c')}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeTab === 'c'
              ? 'bg-purple-600/20 border-purple-500/50 shadow-md shadow-purple-500/10'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
          }`}
        >
          <Terminal className="w-5 h-5 text-cyan-400 shrink-0" />
          <div>
            <span className="text-sm font-bold text-white block">C Programming</span>
            <span className="text-[11px] text-slate-400">11 Milestones</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dsa')}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeTab === 'dsa'
              ? 'bg-purple-600/20 border-purple-500/50 shadow-md shadow-purple-500/10'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
          }`}
        >
          <Layers className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <span className="text-sm font-bold text-white block">DSA Roadmap</span>
            <span className="text-[11px] text-slate-400">10 Milestones</span>
          </div>
        </button>
      </div>

      {/* Interactive Path Visualizer */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-6">Milestone Progression</h3>
        <div className="space-y-4">
          {currentSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                step.completed
                  ? 'bg-emerald-950/20 border-emerald-800/30'
                  : step.active
                  ? 'bg-purple-950/30 border-purple-500/40 ring-1 ring-purple-500/30'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <span className="text-sm font-semibold text-white block">{step.title}</span>
                  <span className="text-[11px] text-slate-400">
                    {step.completed
                      ? 'Mastered & Verified'
                      : step.active
                      ? 'Current Focus Unit'
                      : 'Upcoming Milestone'}
                  </span>
                </div>
              </div>

              {step.completed ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Done</span>
                </div>
              ) : step.active ? (
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-colors"
                >
                  Start Unit
                </button>
              ) : (
                <span className="text-xs text-slate-600 font-medium">Locked</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
