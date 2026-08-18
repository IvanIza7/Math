-- Execute this script in the Supabase SQL Editor

-- 1. Create User Profiles Table
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  avatar_id TEXT DEFAULT 'astro',
  academic_goal TEXT DEFAULT 'Bachillerato · Examen UNAM',
  bio TEXT DEFAULT 'Dominando el álgebra y las matemáticas sin adivinar ✨',
  favorite_area TEXT DEFAULT 'Álgebra',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create User Stats Table
CREATE TABLE public.user_stats (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  perfect_trials_count INTEGER DEFAULT 0,
  illegal_moves_caught_count INTEGER DEFAULT 0,
  trials_completed TEXT[] DEFAULT '{}',
  badges_unlocked TEXT[] DEFAULT '{}',
  completed_topics TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Attendance Records Table
CREATE TABLE public.attendance_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date_str TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  session_number INTEGER NOT NULL,
  topic_covered TEXT,
  notes TEXT,
  status TEXT NOT NULL CHECK (status IN ('completed', 'cancelled', 'absence', 'none')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Setup Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policies for user_stats
CREATE POLICY "Users can view their own stats"
  ON public.user_stats FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own stats"
  ON public.user_stats FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own stats"
  ON public.user_stats FOR UPDATE
  USING (auth.uid() = id);

-- Policies for attendance_records
CREATE POLICY "Users can view their own attendance"
  ON public.attendance_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attendance"
  ON public.attendance_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attendance"
  ON public.attendance_records FOR UPDATE
  USING (auth.uid() = user_id);

-- 5. Function to automatically create profile and stats on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name, handle)
  VALUES (new.id, split_part(new.email, '@', 1), '@' || split_part(new.email, '@', 1));
  
  INSERT INTO public.user_stats (id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after a new user is created in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
