export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type UserLevel =
  | 'Beginner'
  | 'Explorer'
  | 'Problem Solver'
  | 'Debugger'
  | 'Algorithm Learner'
  | 'Code Builder';

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type SubmissionStatus =
  | 'passed'
  | 'failed'
  | 'runtime_error'
  | 'time_limit_exceeded'
  | 'compilation_error';

export type MistakeCategory =
  | 'syntax_error'
  | 'infinite_loop'
  | 'wrong_condition'
  | 'index_error'
  | 'off_by_one'
  | 'type_error'
  | 'other';

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Language {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  created_at?: string;
}

export interface TestCase {
  input: any[];
  expected: any;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  language: string;
  category: string;
  starter_code: string;
  solution?: string;
  test_cases: TestCase[];
  hints?: string[];
  created_at?: string;
}

export interface Submission {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  execution_time: number;
  attempt_number: number;
  first_try: boolean;
  error_message?: string | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  xp_reward: number;
  created_at?: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement?: Achievement;
}

export interface UserXP {
  id: string;
  user_id: string;
  total_xp: number;
  level: UserLevel;
  updated_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  language: string;
  topic: string;
  duration: number; // in seconds
  created_at: string;
}

export interface Mistake {
  id: string;
  user_id: string;
  problem_id?: string | null;
  category: MistakeCategory;
  description: string;
  code_snippet?: string;
  correction?: string;
  created_at: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  problem_id?: string | null;
  mode: 'explain' | 'debug' | 'hint' | 'review';
  message: string;
  response: string;
  created_at: string;
}

export interface Streak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
}
