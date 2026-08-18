import { ClassSessionPlan } from '../types';
import { CURRICULUM_MODULES } from './curriculum';

export function getPlanForSession(sessionNumber: number): ClassSessionPlan {
  // Collect all subtopics across all 5 modules in order
  const allSubtopics: {
    topicId: string;
    topicTitle: string;
    moduleTitle: string;
    summary: string;
    invisibleTrick: string;
    latexFormula: string;
  }[] = [];

  CURRICULUM_MODULES.forEach((mod) => {
    mod.subtopics.forEach((sub) => {
      allSubtopics.push({
        topicId: sub.id,
        topicTitle: sub.title,
        moduleTitle: mod.title,
        summary: sub.summary,
        invisibleTrick: sub.invisibleTrick,
        latexFormula: sub.latexFormulas[0]?.latex || 'x + y = z',
      });
    });
  });

  // Zero-based index bounded by topic count
  const index = Math.max(0, (sessionNumber - 1) % allSubtopics.length);
  const currentSubtopic = allSubtopics[index];

  return {
    sessionNumber,
    topicId: currentSubtopic.topicId,
    topicTitle: currentSubtopic.topicTitle,
    moduleTitle: currentSubtopic.moduleTitle,
    bossTrialId: `trial-boss-${currentSubtopic.topicId}`,
    stages: [
      {
        timeRange: 'Minutos 00 - 10',
        title: 'Warm-up & Concepto Clave',
        type: 'warmup',
        description: `Revisión exprés del concepto: ${currentSubtopic.summary}.`,
        actionHint: `💡 Truco Invisible: ${currentSubtopic.invisibleTrick}`,
        latexExample: currentSubtopic.latexFormula,
      },
      {
        timeRange: 'Minutos 10 - 30',
        title: 'Demostración Guiada',
        type: 'demo',
        description: 'Explicación del profesor paso a paso bajo la Ley del Arsenal Real. Cada transformación requiere declarar primero la regla axiomática.',
        actionHint: 'Abre la caja del Arsenal Real si necesitas recordar las 6 Leyes universales.',
      },
      {
        timeRange: 'Minutos 30 - 50',
        title: 'Combo Trials Autónomos',
        type: 'autonomous',
        description: 'El estudiante resuelve de 3 a 5 ejercicios interactivos en la Arena Trials sin opción a adivinar.',
        actionHint: 'Completa los pasos sin cometer faltas de movimiento para acumular puntos XP.',
      },
      {
        timeRange: 'Minutos 50 - 60',
        title: 'Boss Trial / Checkpoint',
        type: 'boss',
        description: 'Ejercicio integrador de fin de sesión para validar el dominio del tema y desbloquear el siguiente bloque curricular.',
        actionHint: 'Resuelve el Boss Trial del día para sellar la clase de hoy.',
      },
    ],
  };
}
