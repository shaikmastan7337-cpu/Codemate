import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Code2,
  Sparkles,
  Bot,
  Trophy,

  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Zap,
  RotateCcw
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const { user, loginAsDemoStudent } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    loginAsDemoStudent();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-purple-600/15 via-indigo-600/10 to-transparent blur-[120px]" />
        <div className="absolute top-96 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px]" />
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CodeMate
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                Student
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-xl transition-all shadow-lg shadow-purple-600/30"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Try Demo Student
                </button>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 rounded-xl shadow-lg shadow-purple-600/25 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Student-Focused AI Coding Companion</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Understand code,{' '}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            not just generate it.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Combining progressive AI doubt solving, line-by-line explanation, intelligent debugging,
          secure code execution, and meaningful student achievements.
        </p>

        {/* CTA Group */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/signup"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all hover:border-slate-600"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Launch Instant Demo</span>
          </button>
        </div>

        {/* Core Learning Loop Visualizer (Spec Section: Core Loop) */}
        <div className="mt-16 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
            The CodeMate Student Core Loop
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs font-medium">
            {[
              { step: 'Code', icon: Terminal, color: 'text-purple-400', border: 'border-purple-500/30' },
              { step: 'Run', icon: Zap, color: 'text-indigo-400', border: 'border-indigo-500/30' },
              { step: 'Fail / Pass', icon: RotateCcw, color: 'text-amber-400', border: 'border-amber-500/30' },
              { step: 'Understand', icon: Bot, color: 'text-cyan-400', border: 'border-cyan-500/30' },
              { step: 'Try Again', icon: Code2, color: 'text-blue-400', border: 'border-blue-500/30' },
              { step: 'Solve', icon: CheckCircle2, color: 'text-emerald-400', border: 'border-emerald-500/30' },
              { step: 'Achievement', icon: Trophy, color: 'text-yellow-400', border: 'border-yellow-500/30' },
              { step: 'Learn Next', icon: Sparkles, color: 'text-purple-400', border: 'border-purple-500/30' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl bg-slate-950/80 border ${item.border} flex flex-col items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5`}
                >
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-slate-200 font-semibold">{item.step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core AI Pillars */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Designed for Real Student Learning
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Never just paste solutions. CodeMate guides you with progressive hints, explanations,
            and actual error diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3-Tier AI Doubt Solver</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Toggle between Beginner (intuitive analogies), Intermediate (data structures & algorithms),
              and Advanced (time/space complexity, memory layout).
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Line-by-Line Explainer</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Break down loops, pointer arithmetic, recursion stacks, and variable mutations line-by-line
              so you know exactly what is happening in memory.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">First-Try Achievement (+50 XP)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Rewarded when your solution passes all test cases on your very first submission.
              Server-verified, with optional reduced-animation settings.
            </p>
          </div>
        </div>
      </section>

      {/* Target Students & Languages */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-purple-950/30 via-slate-900 to-indigo-950/30 border border-purple-900/30">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-purple-400">
              For Computer Science & Engineering Students
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Built for Python, C, C++, Java, & JavaScript
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              From intro programming to advanced dynamic programming and graph algorithms.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-purple-600/30"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Exploring</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300 font-semibold">CodeMate Student</span>
            <span>— The coding companion that helps students understand code.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>V0 Foundation</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Supabase RLS Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
