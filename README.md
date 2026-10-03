# CodeMate Student: AI Coding Companion & Learning Platform

> **Vision**: The coding companion that helps students understand code, not just generate it.
>
> **Core Loop**: Code → Run → Fail/Pass → Understand → Try Again → Solve → Achievement → Learn Next.

---

## 🚀 V0 Foundation Architecture

In accordance with the **Antigravity Development Plan (Section 19: First Antigravity Task)**, this codebase establishes the rock-solid **V0 Foundation**:

- **Frontend Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with dark developer aesthetics, purple/blue subtle glow, and custom scrollbars
- **Routing**: React Router with protected routes and responsive navigation
- **Backend & Auth**: Supabase integration with Row Level Security (RLS) policies, triggers, and client
- **Local Sandbox Mode**: Built-in 1-click student demo authentication (`demo@codemate.dev`) with mock state for evaluation without credentials
- **Settings & Accessibility**: Dark/Light/System theme toggles and a mandatory **Reduce Animations** toggle (Section 5 & 13)
- **Pages**:
  - **Landing Page**: Value proposition, interactive Core Loop visualizer, 3-tier AI teaser, and CTAs
  - **Auth Pages**: Student Sign In and Sign Up with validation and error alerts
  - **Dashboard Shell**: Greeting, Level progression bar (Beginner → Code Builder), 5-Day Streak counter, Today's Activity, Recent Achievement, and Next Recommended Problem
  - **Student Profile**: Full profile editor, XP, Level tier, achievements list, and recent activity log
  - **Feature Shells**: Practice Arena (V1 preview), AI Tutor (V1 preview), Learning Paths (V1.5 preview), Achievements (V2 preview with interactive First-Try celebration demo), and Mistake Notebook (V1.5 preview)

---

## 📁 Project Structure

```text
CODEMATE/
├── supabase/
│   ├── migrations/
│   │   └── 0001_initial_schema.sql  # Complete schema, RLS policies, triggers & seeds
│   └── schema.sql                   # Reference schema for Supabase SQL Editor
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── SettingsModal.tsx    # Theme & Reduce Animations settings
│   │   └── layout/
│   │       ├── Layout.tsx           # Main app layout with background ambient glows
│   │       ├── Navbar.tsx           # Header with streak, level, XP & user dropdown
│   │       └── Sidebar.tsx          # Responsive navigation drawer
│   ├── contexts/
│   │   ├── AuthContext.tsx          # Supabase auth + local demo student session
│   │   └── SettingsContext.tsx      # Theme and animation preferences
│   ├── lib/
│   │   └── supabase.ts              # Supabase client wrapper & configuration guard
│   ├── pages/
│   │   ├── LandingPage.tsx          # Landing page & core loop breakdown
│   │   ├── LoginPage.tsx            # Student sign in
│   │   ├── SignupPage.tsx           # Student registration
│   │   ├── DashboardPage.tsx        # Dashboard shell & telemetry
│   │   ├── ProfilePage.tsx          # Student profile & editable info
│   │   ├── PracticePage.tsx         # Practice arena & execution pipeline preview
│   │   ├── AiTutorPage.tsx          # 3-tier explanation & debug engine preview
│   │   ├── LearningPathsPage.tsx    # Python, C, and DSA curricula roadmaps
│   │   ├── AchievementsPage.tsx     # Gamification & First-Try celebration demo
│   │   └── MistakesPage.tsx         # Mistake notebook & personalized practice
│   ├── types/
│   │   └── database.ts              # Database interfaces matching Section 10
│   ├── App.tsx                      # Routing & Provider setup
│   ├── index.css                    # Tailwind v4, glassmorphism, reduced motion
│   └── main.tsx                     # Entry mount
├── .env.example                     # Documented environment variables
├── package.json
└── vite.config.ts
```

---

## 🛠️ Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```
*(Note: If left blank or unconfigured, CodeMate Student runs in local Student Sandbox mode automatically).*

### 3. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173/` in your browser.

### 4. Build & Typecheck
```bash
npx tsc --noEmit
npm run lint
npm run build
```

---

## 🗄️ Database Schema & RLS

The database schema in `supabase/migrations/0001_initial_schema.sql` implements all tables requested in Section 10:
- `profiles`
- `languages`
- `problems`
- `submissions`
- `achievements`
- `user_achievements`
- `user_xp`
- `study_sessions`
- `mistakes`
- `ai_conversations`
- `streaks`

Row Level Security is enabled on every table so students can only access their own submissions, XP, streaks, mistakes, and profile.
