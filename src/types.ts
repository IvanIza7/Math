export type Difficulty = 'facil' | 'medio' | 'dificil' | 'demostración';

export interface PropertyRule {
  id: string;
  name: string;
  shortCode: string;
  category: 'Suma' | 'Multiplicación' | 'Leyes de Signos' | 'Inversos' | 'Exponentes' | 'Igualdad';
  latexFormula: string;
  description: string;
  visualExample: string;
  color: string;
  commonTrap: string;
}

export interface StepChoice {
  id: string;
  latexResult: string;
  ruleId: string; // Which rule justifies this
  isLegal: boolean;
  illegalReason?: string;
  explanation: string;
}

export interface TrialStep {
  stepNumber: number;
  promptText: string;
  currentLatex: string;
  choices: StepChoice[];
}

export interface ComboTrial {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: 'Aritmética Básica' | 'Álgebra de Bloques' | 'Geometría/Trigo' | 'Demostración de Examen';
  topic: string;
  initialLatex: string;
  targetLatex: string;
  xpReward: number;
  steps: TrialStep[];
  hint: string;
  invisibleTrick?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  unlocked: boolean;
  requiredXp?: number;
}

export interface AttendanceRecord {
  id: string;
  dateStr: string; // YYYY-MM-DD
  timestamp: string; // YYYY-MM-DD HH:mm
  sessionNumber: number;
  topicCovered: string;
  notes?: string;
  status?: 'completed' | 'cancelled' | 'absence' | 'none';
}

export type Role = "student" | "admin";

export interface UserProfile {
  name: string;
  handle: string;
  avatarId: string;
  academicGoal: string;
  bio: string;
  favoriteArea: string;
  role?: Role;
}

export interface ProgressEvent {
  id: string;
  studentId: string;
  eventType: 'SESSION_COMPLETED' | 'TOPIC_STARTED' | 'TOPIC_COMPLETED' | 'TOPIC_MASTERED' | 'TRIAL_STARTED' | 'TRIAL_STEP_COMPLETED' | 'TRIAL_COMPLETED' | 'TRIAL_FAILED' | 'ILLEGAL_MOVE' | 'DEMO_COMPLETED' | 'BOSS_TRIAL_COMPLETED' | 'ATTENDANCE_REGISTERED';
  entityId: string;
  timestamp: string;
  xpDelta?: number;
  metadata?: any;
}

export interface AdminActionLog {
  id: string;
  adminId: string;
  actionType: 'DESBLOQUEO' | 'BLOQUEO' | 'EDICION' | 'RECALCULO' | 'ASIGNACION';
  contentId: string;
  targetStudentId?: string;
  timestamp: string;
  metadata?: any;
}

export interface ContentAccessRule {
  id: string;
  contentId: string;
  globalStatus: 'available' | 'locked' | 'archived';
  requiredContentIds: string[];
}

export interface StudentContentOverride {
  id: string;
  studentId: string;
  contentId: string;
  overrideStatus: 'available' | 'locked';
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  trialsCompleted: string[];
  badgesUnlocked: string[];
  perfectTrialsCount: number;
  illegalMovesCaughtCount: number;
  attendanceRecords: AttendanceRecord[];
  completedTopics: string[];
}

export type MainTab = 'guia' | 'arena' | 'formulario' | 'trials' | 'plan' | 'mas' | 'admin';

export type NumberSetType = 'N' | 'Z' | 'Q' | 'I' | 'R';

export interface NumberSetItem {
  id: string;
  valueDisplay: string;
  latex: string;
  correctSet: NumberSetType;
  explanation: string;
}

export interface SubTopic {
  id: string;
  title: string;
  badge: string;
  color: string;
  summary: string;
  latexFormulas: { title: string; latex: string; explanation: string }[];
  keyConcepts: { term: string; definition: string; bgPill: string }[];
  invisibleTrick: string;
  widgetType?: 'number-sets' | 'positional-table' | 'sign-laws' | 'divisibility-towers' | 'algebra-balance' | 'factoring-blocks' | 'cartesian-plotter' | 'trig-triangle';
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  subtopics: SubTopic[];
}

export interface ClassPlanStage {
  timeRange: string;
  title: string;
  type: 'warmup' | 'demo' | 'autonomous' | 'boss';
  description: string;
  actionHint: string;
  latexExample?: string;
}

export interface ClassSessionPlan {
  sessionNumber: number;
  topicId: string;
  topicTitle: string;
  moduleTitle: string;
  stages: ClassPlanStage[];
  bossTrialId: string;
}

export interface PracticePreset {
  id: string;
  name: string;
  minDigits: number;
  maxDigits: number;
  minRows: number;
  maxRows: number;
  allowSubtraction: boolean;
  inputDirection: 'left_to_right' | 'right_to_left';
  numQuestions: number;
}

export interface PracticeSession {
  id: string;
  presetId?: string;
  totalTime: number;
  fastestAnswer: number;
  slowestAnswer: number;
  accuracy: number;
  numQuestions: number;
  dateStr: string;
  createdAt?: string;
}
