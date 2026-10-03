-- CodeMate Student - Supabase Database Schema
-- Compatible with PostgreSQL 15+ and Supabase Auth & RLS

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Languages Table
CREATE TABLE IF NOT EXISTS public.languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Problems Table
CREATE TABLE IF NOT EXISTS public.problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    language TEXT NOT NULL,
    category TEXT NOT NULL,
    starter_code TEXT NOT NULL,
    solution TEXT,
    test_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    hints JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('passed', 'failed', 'runtime_error', 'time_limit_exceeded', 'compilation_error')),
    execution_time NUMERIC DEFAULT 0,
    attempt_number INTEGER NOT NULL DEFAULT 1,
    first_try BOOLEAN DEFAULT FALSE,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    rarity TEXT NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
    xp_reward INTEGER NOT NULL DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. User Achievements Table
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, achievement_id)
);

-- 7. User XP & Level Table
CREATE TABLE IF NOT EXISTS public.user_xp (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    total_xp INTEGER NOT NULL DEFAULT 0,
    level TEXT NOT NULL DEFAULT 'Beginner',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Study Sessions Table
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    topic TEXT NOT NULL,
    duration INTEGER NOT NULL DEFAULT 0, -- Duration in seconds
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Mistake Notebook Table
CREATE TABLE IF NOT EXISTS public.mistakes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES public.problems(id) ON DELETE SET NULL,
    category TEXT NOT NULL CHECK (category IN ('syntax_error', 'infinite_loop', 'wrong_condition', 'index_error', 'off_by_one', 'type_error', 'other')),
    description TEXT NOT NULL,
    code_snippet TEXT,
    correction TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. AI Conversations Table
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES public.problems(id) ON DELETE SET NULL,
    mode TEXT NOT NULL DEFAULT 'explain', -- explain, debug, hint, review
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Streaks Table
CREATE TABLE IF NOT EXISTS public.streaks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    current_streak INTEGER NOT NULL DEFAULT 1,
    longest_streak INTEGER NOT NULL DEFAULT 1,
    last_activity_date DATE NOT NULL DEFAULT CURRENT_DATE
);

--------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: Anyone authenticated can view public profiles; users can update only their own profile
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- 2. Languages: Viewable by anyone
CREATE POLICY "Languages are viewable by everyone" ON public.languages
    FOR SELECT USING (true);

-- 3. Problems: Viewable by everyone
CREATE POLICY "Problems are viewable by everyone" ON public.problems
    FOR SELECT USING (true);

-- 4. Submissions: Users can view and insert only their own submissions
CREATE POLICY "Users can view own submissions" ON public.submissions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions" ON public.submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Achievements: Viewable by everyone
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements
    FOR SELECT USING (true);

-- 6. User Achievements: Users can view only their own achievements
CREATE POLICY "Users can view own unlocked achievements" ON public.user_achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own unlocked achievements" ON public.user_achievements
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7. User XP: Users can view and update own XP
CREATE POLICY "Users can view own xp" ON public.user_xp
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own xp" ON public.user_xp
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own xp" ON public.user_xp
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 8. Study Sessions: Users can view and insert own study sessions
CREATE POLICY "Users can view own study sessions" ON public.study_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study sessions" ON public.study_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 9. Mistakes: Users can view, insert, update and delete own mistakes
CREATE POLICY "Users can manage own mistakes" ON public.mistakes
    FOR ALL USING (auth.uid() = user_id);

-- 10. AI Conversations: Users can view and insert own AI interactions
CREATE POLICY "Users can view own AI conversations" ON public.ai_conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI conversations" ON public.ai_conversations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 11. Streaks: Users can view and update own streak
CREATE POLICY "Users can view own streaks" ON public.streaks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON public.streaks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks" ON public.streaks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

--------------------------------------------------------------------------------
-- AUTOMATIC USER INITIALIZATION TRIGGER
--------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert default profile
  INSERT INTO public.profiles (user_id, username, full_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'full_name', 'Student Coder'),
    'https://api.dicebear.com/7.x/bottts/svg?seed=' || new.id
  );

  -- Insert default XP
  INSERT INTO public.user_xp (user_id, total_xp, level)
  VALUES (new.id, 0, 'Beginner');

  -- Insert default Streak
  INSERT INTO public.streaks (user_id, current_streak, longest_streak, last_activity_date)
  VALUES (new.id, 1, 1, CURRENT_DATE);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute upon user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

--------------------------------------------------------------------------------
-- SEED DATA (Languages, Initial Achievements, Sample Problems)
--------------------------------------------------------------------------------

INSERT INTO public.languages (name, slug, icon) VALUES
('Python', 'python', 'FileCode'),
('C', 'c', 'Terminal'),
('C++', 'cpp', 'Cpu'),
('Java', 'java', 'Coffee'),
('JavaScript', 'javascript', 'Globe')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.achievements (name, code, description, icon, rarity, xp_reward) VALUES
('First Code', 'first_code', 'Wrote and ran your very first program on CodeMate.', 'Play', 'common', 25),
('First Try', 'first_try', 'Solved a coding problem on the very first attempt without failing any test cases.', 'Target', 'rare', 50),
('7 Day Streak', 'streak_7', 'Maintained a consistent daily coding habit for 7 days in a row.', 'Flame', 'rare', 100),
('100 Problems', 'hundred_problems', 'Solved 100 coding problems across your learning journey.', 'Trophy', 'legendary', 500),
('Python Starter', 'python_starter', 'Completed your first 5 Python problems successfully.', 'Sparkles', 'common', 40),
('Debugger', 'debugger', 'Identified and fixed a bug with the assistance of CodeMate AI Debugger.', 'Bug', 'common', 30),
('Speed Coder', 'speed_coder', 'Submitted an accepted solution within 5 minutes of opening the problem.', 'Zap', 'rare', 75),
('DSA Explorer', 'dsa_explorer', 'Solved at least one problem in Arrays, Strings, and Linked Lists.', 'Compass', 'epic', 150),
('Streak Master', 'streak_master', 'Reached an unbroken streak of 30 days.', 'Crown', 'legendary', 300)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.problems (title, slug, description, difficulty, language, category, starter_code, solution, test_cases, hints) VALUES
(
  'Sum of Two Numbers',
  'sum-of-two-numbers',
  'Write a function `sum_two(a: int, b: int) -> int` that returns the sum of two integers.',
  'Easy',
  'python',
  'Variables',
  'def sum_two(a: int, b: int) -> int:\n    # Write your solution here\n    pass\n',
  'def sum_two(a: int, b: int) -> int:\n    return a + b\n',
  '[{"input": [2, 3], "expected": 5}, {"input": [-1, 5], "expected": 4}, {"input": [0, 0], "expected": 0}]',
  '["Think about standard arithmetic operators in Python.", "The addition operator is `+`."]'
),
(
  'Reverse a String',
  'reverse-a-string',
  'Write a function `reverse_string(s: str) -> str` that takes a string `s` and returns it reversed.',
  'Easy',
  'python',
  'Strings',
  'def reverse_string(s: str) -> str:\n    # Write your solution here\n    pass\n',
  'def reverse_string(s: str) -> str:\n    return s[::-1]\n',
  '[{"input": ["hello"], "expected": "olleh"}, {"input": ["CodeMate"], "expected": "etaMedoC"}, {"input": [""], "expected": ""}]',
  '["In Python, strings can be sliced with step notation `[start:stop:step]`.", "Consider a negative step like `[::-1]` or using a loop."]'
),
(
  'Find Maximum in Array',
  'find-max-in-array',
  'Write a function `find_max(nums: list[int]) -> int` that returns the largest number in a non-empty list of integers.',
  'Easy',
  'python',
  'Arrays',
  'def find_max(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n',
  'def find_max(nums: list[int]) -> int:\n    max_val = nums[0]\n    for n in nums[1:]:\n        if n > max_val:\n            max_val = n\n    return max_val\n',
  '[{"input": [[1, 5, 3, 9, 2]], "expected": 9}, {"input": [[-5, -2, -9]], "expected": -2}, {"input": [[42]], "expected": 42}]',
  '["Initialize your tracker with the first element `nums[0]` so you handle negative numbers correctly.", "Iterate through the rest of the list and update if a larger item is found."]'
)
ON CONFLICT (slug) DO NOTHING;
