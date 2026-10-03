import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile, UserXP, Streak } from '../types/database';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  userXP: UserXP | null;
  streak: Streak | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  loginAsDemoStudent: () => void;
}

const defaultDemoProfile: Profile = {
  id: 'demo-student-id',
  user_id: 'demo-student-id',
  username: 'alex_coder',
  full_name: 'Alex Rivera',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  created_at: new Date().toISOString(),
};

const defaultDemoXP: UserXP = {
  id: 'demo-xp-id',
  user_id: 'demo-student-id',
  total_xp: 320,
  level: 'Problem Solver',
  updated_at: new Date().toISOString(),
};

const defaultDemoStreak: Streak = {
  id: 'demo-streak-id',
  user_id: 'demo-student-id',
  current_streak: 5,
  longest_streak: 12,
  last_activity_date: new Date().toISOString().split('T')[0],
};

const isConfigured = isSupabaseConfigured();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(() => {
    if (!isConfigured && typeof window !== 'undefined') {
      const savedDemo = localStorage.getItem('codemate_demo_session');
      if (savedDemo === 'true') {
        return {
          id: 'demo-student-id',
          email: 'alex.rivera@codemate.dev',
          app_metadata: {},
          user_metadata: { username: 'alex_coder', full_name: 'Alex Rivera' },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as unknown as User;
      }
    }
    return null;
  });

  const [profile, setProfile] = useState<Profile | null>(() => {
    if (!isConfigured && typeof window !== 'undefined') {
      const savedDemo = localStorage.getItem('codemate_demo_session');
      if (savedDemo === 'true') {
        const storedProfile = localStorage.getItem('codemate_profile');
        return storedProfile ? JSON.parse(storedProfile) : defaultDemoProfile;
      }
    }
    return null;
  });

  const [userXP, setUserXP] = useState<UserXP | null>(() => {
    if (!isConfigured && typeof window !== 'undefined') {
      const savedDemo = localStorage.getItem('codemate_demo_session');
      if (savedDemo === 'true') {
        return defaultDemoXP;
      }
    }
    return null;
  });

  const [streak, setStreak] = useState<Streak | null>(() => {
    if (!isConfigured && typeof window !== 'undefined') {
      const savedDemo = localStorage.getItem('codemate_demo_session');
      if (savedDemo === 'true') {
        return defaultDemoStreak;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(() => {
    return isConfigured;
  });

  const loadUserData = React.useCallback(async (userId: string, userMeta?: any) => {
    if (!isConfigured) return;

    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      } else if (!profileErr) {
        // Fallback create if trigger hasn't finished
        const newProf: Profile = {
          id: userId,
          user_id: userId,
          username: userMeta?.username || 'student',
          full_name: userMeta?.full_name || 'CodeMate Student',
          avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
          created_at: new Date().toISOString(),
        };
        await supabase.from('profiles').insert(newProf);
        setProfile(newProf);
      }

      // 2. Fetch XP
      const { data: xpData } = await supabase
        .from('user_xp')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (xpData) setUserXP(xpData);

      // 3. Fetch Streak
      const { data: streakData } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (streakData) setStreak(streakData);
    } catch (err) {
      console.error('Error loading Supabase user data:', err);
    }
  }, []);

  useEffect(() => {
    if (!isConfigured) {
      return;
    }

    // Live Supabase initialization
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadUserData(session.user.id, session.user.user_metadata);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadUserData(session.user.id, session.user.user_metadata);
      } else {
        setUser(null);
        setProfile(null);
        setUserXP(null);
        setStreak(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUserData]);



  const signIn = async (email: string, password?: string): Promise<{ error: Error | null }> => {
    if (!isConfigured) {
      loginAsDemoStudent();
      return { error: null };
    }

    if (!password) {
      return { error: new Error('Password is required') };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (
    email: string,
    password: string,
    username: string,
    fullName: string
  ): Promise<{ error: Error | null }> => {
    if (!isConfigured) {
      // Demo signup
      const newProf: Profile = {
        id: 'user-' + Date.now(),
        user_id: 'user-' + Date.now(),
        username: username || 'student',
        full_name: fullName || 'New Student',
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
        created_at: new Date().toISOString(),
      };
      setProfile(newProf);
      setUserXP({
        id: 'xp-' + Date.now(),
        user_id: newProf.user_id,
        total_xp: 50,
        level: 'Beginner',
        updated_at: new Date().toISOString(),
      });
      setStreak({
        id: 'streak-' + Date.now(),
        user_id: newProf.user_id,
        current_streak: 1,
        longest_streak: 1,
        last_activity_date: new Date().toISOString().split('T')[0],
      });
      setUser({
        id: newProf.user_id,
        email,
        app_metadata: {},
        user_metadata: { username, full_name: fullName },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User);
      localStorage.setItem('codemate_demo_session', 'true');
      localStorage.setItem('codemate_profile', JSON.stringify(newProf));
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName,
        },
      },
    });

    return { error };
  };

  const signOut = async () => {
    if (isConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('codemate_demo_session');
    localStorage.removeItem('codemate_profile');
    setUser(null);
    setProfile(null);
    setUserXP(null);
    setStreak(null);
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<{ error: Error | null }> => {
    if (!profile) return { error: new Error('No active profile') };

    const updated = { ...profile, ...updates };

    if (!isConfigured) {
      setProfile(updated);
      localStorage.setItem('codemate_profile', JSON.stringify(updated));
      return { error: null };
    }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', profile.user_id);

    if (!error) {
      setProfile(updated);
    }
    return { error };
  };

  const loginAsDemoStudent = () => {
    localStorage.setItem('codemate_demo_session', 'true');
    localStorage.setItem('codemate_profile', JSON.stringify(defaultDemoProfile));
    setProfile(defaultDemoProfile);
    setUserXP(defaultDemoXP);
    setStreak(defaultDemoStreak);
    setUser({
      id: defaultDemoProfile.user_id,
      email: 'alex.rivera@codemate.dev',
      app_metadata: {},
      user_metadata: { username: 'alex_coder', full_name: 'Alex Rivera' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        userXP,
        streak,
        loading,
        isConfigured,
        signIn,
        signUp,
        signOut,
        updateProfile,
        loginAsDemoStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
