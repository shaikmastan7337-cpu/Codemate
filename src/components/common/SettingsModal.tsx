import React from 'react';
import { X, Moon, Sun, Monitor, Zap, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { useAuth } from '../../contexts/AuthContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, reduceAnimations, setReduceAnimations } = useSettings();
  const { isConfigured } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white">Platform Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Appearance / Theme */}
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-2">Appearance</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                  theme === 'dark'
                    ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                  theme === 'light'
                    ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                  theme === 'system'
                    ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Monitor className="w-4 h-4" />
                System
              </button>
            </div>
          </div>

          {/* Reduce Animations Toggle (Explicitly required in Section 5 & 13) */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-sm font-medium text-white block">Reduce Animations</span>
                <p className="text-xs text-slate-400 mt-1">
                  Minimizes motion and celebration particle effects for focus or sensitivity.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={reduceAnimations}
                onClick={() => setReduceAnimations(!reduceAnimations)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  reduceAnimations ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    reduceAnimations ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Supabase Connection Telemetry */}
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Database className="w-3.5 h-3.5" />
              Database & Auth Backend
            </div>
            {isConfigured ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Connected to Supabase Project</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-amber-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Local Student Sandbox Mode</span>
                </div>
                <p className="text-xs text-slate-400">
                  Ready with full local mock auth and simulated persistence. Connect real Supabase anytime in <code className="text-purple-300">.env.local</code>.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-lg shadow-purple-600/30"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
