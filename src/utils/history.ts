import { supabase } from '../config/supabase';

export interface ChallengeAttempt {
  id: string; // unique ID for the attempt (now uuid in DB, but we keep this for TS)
  challengeId: string; // e.g. "VOL-01", "desafio-1", "preset-1"
  type: 'quiz' | 'arena' | 'asedio' | 'practice';
  title: string;
  timeSeconds: number;
  score: number;
  maxScore: number;
  date: number; // For compatibility we map created_at to timestamp
}

export async function getChallengeHistory(): Promise<ChallengeAttempt[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('challenge_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      console.error('Error fetching challenge history:', error);
      return [];
    }

    return (data || []).map(row => ({
      id: row.id,
      challengeId: row.challenge_id,
      type: row.type,
      title: row.title,
      timeSeconds: row.time_seconds,
      score: row.score,
      maxScore: row.max_score,
      date: new Date(row.created_at).getTime()
    }));
  } catch (e) {
    console.error('Failed to get history', e);
    return [];
  }
}

export async function saveChallengeAttempt(attempt: Omit<ChallengeAttempt, 'id' | 'date'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('challenge_attempts')
      .insert([{
        user_id: user.id,
        challenge_id: attempt.challengeId,
        type: attempt.type,
        title: attempt.title,
        time_seconds: Math.round(attempt.timeSeconds),
        score: attempt.score,
        max_score: attempt.maxScore
      }]);

    if (error) {
      console.error('Error saving challenge attempt:', error);
    }
  } catch (e) {
    console.error('Failed to save attempt', e);
  }
}

