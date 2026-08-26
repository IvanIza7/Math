import { ProgressEvent, UserStats, AttendanceRecord } from '../types';

export class ProgressEngine {
  
  /**
   * Reconstruye el UserStats completamente desde cero leyendo una lista de eventos inmutables.
   */
  static calculateStateFromEvents(events: ProgressEvent[], baseStats?: Partial<UserStats>): UserStats {
    // Default initial state
    const state: UserStats = {
      xp: 0,
      level: 1,
      streak: 0,
      trialsCompleted: [],
      badgesUnlocked: [],
      perfectTrialsCount: 0,
      illegalMovesCaughtCount: 0,
      attendanceRecords: [],
      completedTopics: [],
      ...baseStats
    };

    // Sort events by timestamp ascending
    const sortedEvents = [...events].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    let lastValidActivityDate = '';

    sortedEvents.forEach(event => {
      // 1. Process XP
      if (event.xpDelta) {
        state.xp += event.xpDelta;
      }

      // 2. Track Trials
      if (event.eventType === 'TRIAL_COMPLETED') {
        if (!state.trialsCompleted.includes(event.entityId)) {
          state.trialsCompleted.push(event.entityId);
        }
        if (event.metadata?.isPerfect) {
          state.perfectTrialsCount++;
        }
      }

      // 3. Track Topics
      if (event.eventType === 'TOPIC_COMPLETED' || event.eventType === 'TOPIC_MASTERED') {
        if (!state.completedTopics.includes(event.entityId)) {
          state.completedTopics.push(event.entityId);
        }
      }

      // 4. Track Attendance
      if (event.eventType === 'ATTENDANCE_REGISTERED') {
        if (event.metadata?.record) {
          // Verify if it doesn't exist
          const exists = state.attendanceRecords.find(r => r.id === event.metadata.record.id);
          if (!exists) {
            state.attendanceRecords.push(event.metadata.record as AttendanceRecord);
          }
        }
      }

      // 5. Track Illegal Moves
      if (event.eventType === 'ILLEGAL_MOVE') {
        state.illegalMovesCaughtCount++;
      }

      // 6. Streak Logic (Racha)
      // Only certain events count towards streak (e.g. completing a trial, a session, or attendance)
      const validStreakEvents = ['TRIAL_COMPLETED', 'SESSION_COMPLETED', 'TOPIC_COMPLETED'];
      if (validStreakEvents.includes(event.eventType)) {
        const eventDateStr = event.timestamp.split('T')[0] || event.timestamp.split(' ')[0];
        
        if (lastValidActivityDate !== eventDateStr) {
          if (!lastValidActivityDate) {
            state.streak = 1;
          } else {
            const diffDays = this.getDiffDays(lastValidActivityDate, eventDateStr);
            if (diffDays === 1) {
              state.streak++;
            } else if (diffDays > 1) {
              state.streak = 1; // reset streak if missed a day
            }
          }
          lastValidActivityDate = eventDateStr;
        }
      }
    });

    // Level calculation (500 XP per level)
    state.level = Math.floor(state.xp / 500) + 1;

    // 7. Evaluate Badge Unlocks
    state.badgesUnlocked = this.evaluateBadges(state, sortedEvents);

    return state;
  }

  /**
   * Evalúa y devuelve la lista de IDs de insignias desbloqueadas
   */
  private static evaluateBadges(state: UserStats, events: ProgressEvent[]): string[] {
    const unlocked: string[] = [];
    
    // Insignias Fáciles
    if (state.completedTopics.length >= 1) unlocked.push('badge-explorer');
    if (state.completedTopics.length >= 5) unlocked.push('badge-bookworm');
    if (state.trialsCompleted.length >= 1) unlocked.push('badge-first-victory');

    // Insignias Medias
    if (state.perfectTrialsCount >= 1) unlocked.push('badge-perfect-combo');
    
    const hasFastPractice = events.some(e => e.eventType === 'PRACTICE_COMPLETED' && e.metadata?.durationSeconds <= 30);
    if (hasFastPractice) unlocked.push('badge-speed-demon');

    // Erudito de Volúmenes (al menos un volumen completado - asumimos que vol 1 tiene ciertos temas, pero podemos checar si tiene muchos)
    // For simplicity: if they completed at least 8 topics, they likely completed a volume. (Vol 1 has 7-8 topics)
    if (state.completedTopics.length >= 7) unlocked.push('badge-volume-scholar');

    // Insignias Difíciles
    const arenaChallenges = ['modulo-1', 'modulo-2', 'modulo-3', 'modulo-4', 'modulo-5', 'modulo-6'];
    const completedAllArena = arenaChallenges.every(id => state.trialsCompleted.includes(id));
    if (completedAllArena) unlocked.push('badge-arena-master');

    if (state.trialsCompleted.includes('puente-bachillerato')) {
      unlocked.push('badge-bridge-conqueror');
      
      const bridgePerfectEvent = events.find(e => e.eventType === 'TRIAL_COMPLETED' && e.entityId === 'puente-bachillerato' && e.metadata?.isPerfect);
      if (bridgePerfectEvent) {
        unlocked.push('badge-mastermind');
      }
    }

    return unlocked;
  }

  /**
   * Devuelve un nuevo evento configurado con los datos base
   */
  static createEvent(
    studentId: string, 
    eventType: ProgressEvent['eventType'], 
    entityId: string, 
    xpDelta: number = 0,
    metadata: any = {}
  ): ProgressEvent {
    return {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      studentId,
      eventType,
      entityId,
      timestamp: new Date().toISOString(),
      xpDelta,
      metadata
    };
  }

  private static getDiffDays(date1: string, date2: string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    // Ignore time part for day difference calculation
    d1.setHours(0,0,0,0);
    d2.setHours(0,0,0,0);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }
}
