-- ========================================================
-- SCRIPT DE AJUSTE Y NORMALIZACIÓN DE XP Y NIVELES (SUPABASE)
-- ========================================================
-- Ejecuta este script en el SQL Editor de Supabase si deseas
-- actualizar de inmediato la base de datos para todos los usuarios.

-- 1. Normalizar el nivel de todos los usuarios en base a 500 XP por nivel
--    (Cualquier usuario nuevo o con 0 XP queda en Nivel 1)
UPDATE public.user_stats
SET 
  level = GREATEST(1, FLOOR(COALESCE(xp, 0) / 500) + 1);

-- 2. Asegurar que usuarios sin progreso o con XP nulo/negativo inicien en Nivel 1 con 0 XP
UPDATE public.user_stats
SET 
  level = 1,
  xp = 0
WHERE xp IS NULL OR xp <= 0;

-- 3. (Recomendado) Para usuarios que sufrieron el error de duplicación exponencial:
--    Recalcula su XP real a partir de la suma de sus eventos inmutables en progress_events
UPDATE public.user_stats u
SET 
  xp = COALESCE(sub.total_xp, 0),
  level = GREATEST(1, FLOOR(COALESCE(sub.total_xp, 0) / 500) + 1)
FROM (
  SELECT student_id, SUM(xp_delta) AS total_xp
  FROM public.progress_events
  GROUP BY student_id
) sub
WHERE u.id = sub.student_id;
