-- Ejecuta este script en el SQL Editor de tu consola de Supabase

-- 1. Create Practice Presets Table
CREATE TABLE public.practice_presets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  min_digits INTEGER NOT NULL DEFAULT 1,
  max_digits INTEGER NOT NULL DEFAULT 2,
  min_rows INTEGER NOT NULL DEFAULT 2,
  max_rows INTEGER NOT NULL DEFAULT 2,
  allow_subtraction BOOLEAN NOT NULL DEFAULT false,
  input_direction TEXT NOT NULL DEFAULT 'right_to_left',
  num_questions INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Practice Sessions Table (for stats and charts)
CREATE TABLE public.practice_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  preset_id UUID REFERENCES public.practice_presets(id) ON DELETE SET NULL,
  total_time INTEGER NOT NULL, -- in seconds
  fastest_answer INTEGER NOT NULL, -- in seconds
  slowest_answer INTEGER NOT NULL, -- in seconds
  accuracy NUMERIC NOT NULL, -- percentage 0-100
  num_questions INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Setup Row Level Security (RLS)
ALTER TABLE public.practice_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;

-- 4. Policies for practice_presets
CREATE POLICY "Users can view their own practice presets"
  ON public.practice_presets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own practice presets"
  ON public.practice_presets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own practice presets"
  ON public.practice_presets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own practice presets"
  ON public.practice_presets FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Policies for practice_sessions
CREATE POLICY "Users can view their own practice sessions"
  ON public.practice_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own practice sessions"
  ON public.practice_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own practice sessions"
  ON public.practice_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Opcional: Insertar un Preset por defecto para que los usuarios nuevos no empiecen vacíos.
-- (No se puede hacer con un trigger a menos que se ajuste auth.users, pero con la UI pueden crearlos)
