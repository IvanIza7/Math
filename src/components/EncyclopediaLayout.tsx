import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  CheckCircle,
  Lock,
  BookOpen,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  Flame,
  Star,
  Play,
  Zap,
  RotateCcw,
  Trophy,
  ChevronLeft,
} from 'lucide-react';
import { VOLUMES_DATA, VolumeTopic, VolumeData } from '../data/curriculum';
import { ENCYCLOPEDIA_QUIZZES } from '../data/quizQuestions';
import { ARENA_CHALLENGES, ArenaChallenge } from '../data/arenaChallengesData';
import { Header } from './Header';
import { ProfileView } from './ProfileView';
import { TopicDetailView } from './TopicDetailView';
import { InteractiveQuizScreen, QuizQuestion } from './InteractiveQuizScreen';
import { ArenaChallengeRunner } from './ArenaChallengeRunner';
import { AsedioLinealGame } from './AsedioLinealGame';
import { CrossMathGame } from './CrossMathGame';
import {
  CatlyneAvatar,
  HeroMemphisIllustration,
  TopicThumbnail,
} from './Illustrations';
import { UserStats, UserProfile } from '../types';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { getActiveHeroSessions, ActiveHeroItem } from '../utils/activeSession';
import { APP_TEXTS } from '../config/appText';

interface EncyclopediaLayoutProps {
  userStats: UserStats;
  userProfile?: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
  onAwardXp: (amount: number) => void;
  onOpenNotifications?: () => void;
  onOpenBadges?: () => void;
}

export const EncyclopediaLayout: React.FC<EncyclopediaLayoutProps> = ({
  userStats,
  userProfile,
  onUpdateProfile,
  onAwardXp,
  onOpenNotifications = () => {},
  onOpenBadges = () => {},
}) => {
  const [activeHeroSessions, setActiveHeroSessions] = useState<ActiveHeroItem[]>(() =>
    getActiveHeroSessions()
  );
  const [activeSessionIndex, setActiveSessionIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [expandedVolumeCodes, setExpandedVolumeCodes] = useState<string[]>(['VOL-01']);
  const [selectedTopicData, setSelectedTopicData] = useState<{
    topic: VolumeTopic;
    volume: VolumeData;
  } | null>(null);

  // Active game modal states for resuming
  const [activeQuiz, setActiveQuiz] = useState<{ title: string; questions: QuizQuestion[] } | null>(
    null
  );
  const [activeArenaChallenge, setActiveArenaChallenge] = useState<ArenaChallenge | null>(null);
  const [activeAsedioLevel, setActiveAsedioLevel] = useState<number | null>(null);
  const [isCrossMathActive, setIsCrossMathActive] = useState<boolean>(false);

  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(['vol1-t1', 'vol1-t2']);

  useEffect(() => {
    setActiveHeroSessions(getActiveHeroSessions());
  }, [activeQuiz, activeArenaChallenge, activeAsedioLevel, isCrossMathActive]);

  const toggleVolumeExpand = (volCode: string) => {
    playSound('click');
    setExpandedVolumeCodes((prev) =>
      prev.includes(volCode) ? prev.filter((c) => c !== volCode) : [...prev, volCode]
    );
  };

  const toggleAllVolumes = () => {
    playSound('click');
    if (expandedVolumeCodes.length === VOLUMES_DATA.length) {
      setExpandedVolumeCodes([]);
    } else {
      setExpandedVolumeCodes(VOLUMES_DATA.map((v) => v.code));
    }
  };

  const volumes = VOLUMES_DATA;

  const startQuizForVolume = (volCode: string, title: string) => {
    const questions = ENCYCLOPEDIA_QUIZZES[volCode] || ENCYCLOPEDIA_QUIZZES['VOL-01'];
    setActiveQuiz({ title, questions });
  };

  // Handle Resuming from Netflix Carousel
  const handleResumeSession = (session: ActiveHeroItem) => {
    playSound('click');

    if (session.type === 'asedio') {
      const levelNum = session.actionPayload?.levelNumber || 1;
      setActiveAsedioLevel(levelNum - 1);
    } else if (session.type === 'arena-challenge') {
      const cId = session.actionPayload?.challengeId || 'desafio-1';
      const found = ARENA_CHALLENGES.find((c) => c.id === cId) || ARENA_CHALLENGES[0];
      setActiveArenaChallenge(found);
    } else if (session.type === 'crossmath') {
      setIsCrossMathActive(true);
    } else if (session.type === 'quiz') {
      const vCode = session.actionPayload?.volCode || 'VOL-01';
      startQuizForVolume(vCode, session.title);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    playSound('click');
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Resume Modals
  if (activeAsedioLevel !== null) {
    return (
      <AsedioLinealGame
        onBack={() => setActiveAsedioLevel(null)}
        onAwardXp={onAwardXp}
        initialLevelIndex={activeAsedioLevel}
      />
    );
  }

  if (activeArenaChallenge) {
    return (
      <ArenaChallengeRunner
        challenge={activeArenaChallenge}
        onClose={() => setActiveArenaChallenge(null)}
        onComplete={(score, total, passed) => {
          if (passed) onAwardXp(75);
          else onAwardXp(15);
        }}
      />
    );
  }

  if (isCrossMathActive) {
    return (
      <CrossMathGame
        onBack={() => setIsCrossMathActive(false)}
        onAwardXp={onAwardXp}
      />
    );
  }

  if (activeQuiz) {
    return (
      <InteractiveQuizScreen
        title={activeQuiz.title}
        questions={activeQuiz.questions}
        onClose={() => setActiveQuiz(null)}
        onComplete={(xp) => {
          onAwardXp(xp);
          setActiveQuiz(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7FC] dark:bg-[#0F1117] text-[#1E1E24] dark:text-[#F4F7FC] no-scrollbar max-w-md mx-auto relative font-jakarta transition-colors duration-200">
      <AnimatePresence initial={false} mode="wait">
        {isProfileOpen ? (
          <ProfileView
            key="profile-screen"
            onBack={() => setIsProfileOpen(false)}
            userStats={userStats}
            userProfile={userProfile}
            onUpdateProfile={onUpdateProfile}
            onOpenBadgesFull={() => {
              setIsProfileOpen(false);
              onOpenBadges();
            }}
          />
        ) : selectedTopicData ? (
          <TopicDetailView
            key={`topic-detail-${selectedTopicData.topic.id}`}
            topic={selectedTopicData.topic}
            volume={selectedTopicData.volume}
            onBack={() => setSelectedTopicData(null)}
            onStartQuiz={(topicTitle) => {
              const vCode = selectedTopicData.volume.code;
              setSelectedTopicData(null);
              startQuizForVolume(vCode, topicTitle);
            }}
            onMarkCompleted={(topicId) => {
              if (!completedTopicIds.includes(topicId)) {
                setCompletedTopicIds((prev) => [...prev, topicId]);
              }
              onAwardXp(50);
            }}
            isCompleted={completedTopicIds.includes(selectedTopicData.topic.id)}
            onAwardXp={onAwardXp}
          />
        ) : (
          <motion.div
            key="home-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col min-h-screen pb-24"
          >
            {/* Header Bar */}
            <Header
              userStats={userStats}
              userProfile={userProfile}
              onOpenProfile={() => {
                playSound('click');
                setIsProfileOpen(true);
              }}
              onOpenNotifications={onOpenNotifications}
              greetingSubtitle={`${APP_TEXTS.header.greetingSubtitlePrefix} ${userProfile?.name ? userProfile.name.split(' ')[0] : APP_TEXTS.header.defaultStudentName}`}
              greetingTitle={APP_TEXTS.header.greetingTitle}
            />

            {/* Netflix-Style Sliding Carousel Section for Active Challenges */}
            <div className="pt-3">
              {/* Carousel Header with Navigation Arrows */}
              <div className="px-5 flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#1E1E24] dark:text-white">
                    {APP_TEXTS.home.activeChallengesTitle}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => scrollCarousel('left')}
                    className="w-6 h-6 rounded-full bg-white dark:bg-[#1E202E] border border-[#1E1E24]/20 dark:border-white/20 flex items-center justify-center text-[#1E1E24] dark:text-white shadow-2xs hover:bg-[#F7CA38] dark:hover:bg-[#F7CA38] dark:hover:text-[#1E1E24] transition-colors cursor-pointer"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    className="w-6 h-6 rounded-full bg-white dark:bg-[#1E202E] border border-[#1E1E24]/20 dark:border-white/20 flex items-center justify-center text-[#1E1E24] dark:text-white shadow-2xs hover:bg-[#F7CA38] dark:hover:bg-[#F7CA38] dark:hover:text-[#1E1E24] transition-colors cursor-pointer"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Horizontal Sliding Track (Netflix Style with Snap Points - Matching Reference Design) */}
              <div
                ref={carouselRef}
                className="flex items-stretch gap-3.5 overflow-x-auto px-5 pb-2 snap-x snap-mandatory no-scrollbar"
                style={{ scrollbarWidth: 'none' }}
              >
                {activeHeroSessions.map((session, idx) => (
                  <motion.div
                    key={session.id}
                    whileHover={{ scale: 1.01 }}
                    className={`w-[84vw] sm:w-[320px] max-w-[340px] h-[142px] snap-center shrink-0 rounded-3xl p-3.5 sm:p-4 border-2 border-[#1E1E24] shadow-xs flex items-center justify-between relative overflow-hidden transition-transform ${session.bgColor || session.bgGradient || 'bg-[#FFDE59]'} ${session.textColor}`}
                  >
                    {/* Left Column: Title, Subtitle / Questions, Milestone Timeline & Action Button */}
                    <div className="flex-1 flex flex-col justify-between h-full z-10 pr-1">
                      {/* Title & Questions / Subtitle */}
                      <div>
                        <h2 className="text-[15px] font-black leading-tight tracking-tight line-clamp-1">
                          {session.title}
                        </h2>
                        <p className="text-[11px] font-bold opacity-80 line-clamp-1 mt-0.5">
                          {session.subtitle}
                        </p>
                      </div>

                      {/* Milestone Progress Bar (Matching reference image with filled line and dots) */}
                      <div className="my-auto py-1">
                        <div className="relative w-28 sm:w-32 flex items-center h-2">
                          {/* Background Track Line */}
                          <div className="absolute left-0 right-0 h-1 bg-black/25 rounded-full" />
                          {/* Active Filled White/Color Line */}
                          <div
                            className="absolute left-0 h-1 bg-white rounded-full transition-all duration-300 shadow-2xs"
                            style={{
                              width: `${Math.max(18, Math.min(100, (session.currentStep / (session.totalSteps || 3)) * 100))}%`,
                            }}
                          />
                          {/* Milestone Dots */}
                          <div className="relative w-full flex items-center justify-between">
                            {Array.from({ length: session.totalSteps || 3 }).map((_, sIdx) => {
                              const isPast = sIdx < session.currentStep;
                              const isCurrent = sIdx === session.currentStep;
                              return (
                                <span
                                  key={sIdx}
                                  className={`w-2.5 h-2.5 rounded-full border border-[#1E1E24]/30 z-10 transition-all ${
                                    isPast
                                      ? 'bg-[#1E1E24]'
                                      : isCurrent
                                      ? 'bg-white shadow-2xs scale-110'
                                      : 'bg-white/60'
                                  }`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Button (Pill with border like "Let's go!" in the reference image) */}
                      <div>
                        <button
                          onClick={() => handleResumeSession(session)}
                          className={`px-3.5 py-1 rounded-full text-xs font-black tracking-tight border-2 border-[#1E1E24] shadow-2xs transition-transform hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-1 ${session.ctaBg}`}
                        >
                          <span>¡Vamos!</span>
                          <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Illustration fitting the compact card */}
                    <div className="w-24 sm:w-28 h-full flex items-center justify-center shrink-0 relative overflow-hidden">
                      <div className="scale-80 sm:scale-85 origin-center">
                        <HeroMemphisIllustration theme={session.theme} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Module List Cards */}
            <div className="px-5 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#8A909F] dark:text-gray-400 block">
                    Enciclopedia de Matemáticas
                  </span>
                  <span className="text-xs font-black text-[#6F78DB] dark:text-[#8D96F5]">
                    {volumes.length} Volúmenes Disponibles
                  </span>
                </div>

                <button
                  onClick={toggleAllVolumes}
                  className="text-[11px] font-bold text-[#6F78DB] dark:text-[#8D96F5] hover:underline cursor-pointer"
                >
                  {expandedVolumeCodes.length === volumes.length
                    ? 'Colapsar Todos'
                    : 'Expandir Todos'}
                </button>
              </div>

              {/* Volumes Accordion List */}
              <div className="space-y-3">
                {volumes.map((volume) => {
                  const isExpanded = expandedVolumeCodes.includes(volume.code);

                  return (
                    <motion.div
                      key={volume.code}
                      className="border-2 border-[#1E1E24] dark:border-[#2C2C3C] rounded-3xl overflow-hidden shadow-xs transition-all bg-white dark:bg-[#161822]"
                    >
                      {/* Volume Header Banner */}
                      <div
                        onClick={() => toggleVolumeExpand(volume.code)}
                        className={`p-4 flex items-center justify-between cursor-pointer select-none transition-colors ${
                          volume.code === 'VOL-01'
                            ? 'bg-[#FFF9E6] dark:bg-[#2A2416]'
                            : volume.code === 'VOL-02'
                            ? 'bg-[#EEF2FF] dark:bg-[#1B2038]'
                            : volume.code === 'VOL-03'
                            ? 'bg-[#F0FDF4] dark:bg-[#14291E]'
                            : 'bg-[#FAF5FF] dark:bg-[#251A33]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-11 h-11 rounded-2xl border-2 border-[#1E1E24] flex items-center justify-center text-sm font-black shadow-xs text-white"
                            style={{ backgroundColor: volume.color }}
                          >
                            {volume.label}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#8A909F] dark:text-gray-400">
                                {volume.code}
                              </span>
                              <span className="text-[10px] font-bold text-[#4A4E69] dark:text-gray-300">
                                {volume.subtitle}
                              </span>
                            </div>
                            <h3 className="font-black text-sm text-[#1E1E24] dark:text-white leading-tight">
                              {volume.title}
                            </h3>
                          </div>
                        </div>

                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-7 h-7 rounded-full bg-white dark:bg-[#1E202E] border border-[#1E1E24]/20 dark:border-white/20 flex items-center justify-center text-[#1E1E24] dark:text-white"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Topics List within Volume */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="divide-y divide-[#1E1E24]/10 dark:divide-white/10"
                          >
                            {volume.topics.map((topic, tIdx) => {
                              const isCompleted = completedTopicIds.includes(topic.id);

                              return (
                                <div
                                  key={topic.id}
                                  onClick={() => {
                                    playSound('click');
                                    setSelectedTopicData({ topic, volume });
                                  }}
                                  className="p-3.5 flex items-center justify-between hover:bg-[#F8FAFC] dark:hover:bg-[#1E202E] transition-colors cursor-pointer"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#F4F7FC] dark:bg-[#202334] border border-[#1E1E24]/20 dark:border-white/10 flex items-center justify-center text-xs font-black text-[#1E1E24] dark:text-white shrink-0">
                                      {tIdx + 1}
                                    </div>

                                    <div>
                                      <h4 className="font-bold text-xs text-[#1E1E24] dark:text-white line-clamp-1">
                                        {topic.title}
                                      </h4>
                                      <span className="text-[10px] text-[#8A909F] dark:text-gray-400 font-semibold block">
                                        {topic.subtopics?.length || 3} Subtemas conceptuales
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {isCompleted && (
                                      <span className="w-5 h-5 rounded-full bg-[#22C55E] text-white flex items-center justify-center text-[10px] font-black shadow-2xs">
                                        ✓
                                      </span>
                                    )}
                                    <ChevronRight className="w-4 h-4 text-[#8A909F] dark:text-gray-400" />
                                  </div>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
