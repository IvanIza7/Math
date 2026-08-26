import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, CheckCircle, Lock, BookOpen, ChevronDown, Sparkles, ArrowLeft, Flame, Star, Play, Zap, RotateCcw, Trophy, ChevronLeft,
} from 'lucide-react';
import { ENCYCLOPEDIA_QUIZZES } from '../data/quizQuestions';
import { ARENA_CHALLENGES, ArenaChallenge } from '../data/arenaChallengesData';
import { ENCYCLOPEDIA_CARDS, EncyclopediaCard } from '../data/encyclopediaCards';
import { VOLUMES_DATA } from '../data/curriculum';
import { Header } from './Header';
import { ProfileView } from './ProfileView';
import { InteractiveQuizScreen, QuizQuestion } from './InteractiveQuizScreen';
import { ArenaChallengeRunner } from './ArenaChallengeRunner';
import { AsedioLinealGame } from './AsedioLinealGame';
import { CrossMathGame } from './CrossMathGame';
import { TopicCard } from './TopicCard';
import { TopicModal } from './TopicModal';
import { InteractiveLabModal } from './InteractiveLabModal';
import { UserStats, UserProfile } from '../types';
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
  onAdminClick?: () => void;
}

export const EncyclopediaLayout: React.FC<EncyclopediaLayoutProps> = ({
  userStats,
  userProfile,
  onUpdateProfile,
  onAwardXp,
  onOpenNotifications = () => {},
  onOpenBadges = () => {},
  onAdminClick,
}) => {
  const [activeHeroSessions, setActiveHeroSessions] = useState<ActiveHeroItem[]>(() =>
    getActiveHeroSessions()
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Active game modal states for resuming
  const [activeQuiz, setActiveQuiz] = useState<{ title: string; questions: QuizQuestion[] } | null>(null);
  const [activeArenaChallenge, setActiveArenaChallenge] = useState<ArenaChallenge | null>(null);
  const [activeAsedioLevel, setActiveAsedioLevel] = useState<number | null>(null);
  const [isCrossMathActive, setIsCrossMathActive] = useState<boolean>(false);

  // Cards state
  const [selectedCard, setSelectedCard] = useState<EncyclopediaCard | null>(null);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [activeLabTab, setActiveLabTab] = useState<'sets' | 'towers' | 'algebra'>('sets');

  // Accordion state
  const [expandedVolumeCodes, setExpandedVolumeCodes] = useState<string[]>([]);

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

  useEffect(() => {
    setActiveHeroSessions(getActiveHeroSessions());
  }, [activeQuiz, activeArenaChallenge, activeAsedioLevel, isCrossMathActive]);

  const startQuizForVolume = (volCode: string, title: string) => {
    const questions = ENCYCLOPEDIA_QUIZZES[volCode] || ENCYCLOPEDIA_QUIZZES['VOL-01'];
    setActiveQuiz({ title, questions });
  };

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

  const handleOpenLab = (widgetType: string) => {
    if (widgetType === 'number-sets' || widgetType === 'sign-laws') setActiveLabTab('sets');
    else if (widgetType === 'divisibility-towers') setActiveLabTab('towers');
    else setActiveLabTab('algebra');
    
    setIsLabOpen(true);
  };

  // Group cards by category maintaining original order
  const categories = Array.from(new Set(ENCYCLOPEDIA_CARDS.map(c => c.categoria)));

  if (activeAsedioLevel !== null) return <AsedioLinealGame onBack={() => setActiveAsedioLevel(null)} onAwardXp={onAwardXp} initialLevelIndex={activeAsedioLevel} />;
  if (activeArenaChallenge) return <ArenaChallengeRunner challenge={activeArenaChallenge} onClose={() => setActiveArenaChallenge(null)} onComplete={(score, total, passed) => onAwardXp(passed ? 75 : 15, 'TRIAL_COMPLETED', activeArenaChallenge.id, { isPerfect: score === total })} />;
  if (isCrossMathActive) return <CrossMathGame onBack={() => setIsCrossMathActive(false)} onAwardXp={onAwardXp} />;
  if (activeQuiz) return <InteractiveQuizScreen title={activeQuiz.title} questions={activeQuiz.questions} onClose={() => setActiveQuiz(null)} onComplete={(xp) => { onAwardXp(xp); setActiveQuiz(null); }} />;

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7FC] dark:bg-[#0F1117] text-[#1E1E24] dark:text-[#F4F7FC] no-scrollbar max-w-md mx-auto relative font-jakarta transition-colors duration-200">
      

      
      <InteractiveLabModal
        isOpen={isLabOpen}
        onClose={() => setIsLabOpen(false)}
        onAwardXp={onAwardXp}
        initialTab={activeLabTab}
      />

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
            onAdminClick={onAdminClick}
          />
        ) : selectedCard !== null ? (
          <TopicModal 
            key="topic-screen"
            isOpen={selectedCard !== null} 
            onClose={() => setSelectedCard(null)} 
            card={selectedCard}
            onOpenLab={handleOpenLab}
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
                    className="w-6 h-6 rounded-full bg-white dark:bg-[#1E202E] border-2 border-[#1E1E24] flex items-center justify-center text-[#1E1E24] dark:text-white shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    className="w-6 h-6 rounded-full bg-white dark:bg-[#1E202E] border-2 border-[#1E1E24] flex items-center justify-center text-[#1E1E24] dark:text-white shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Horizontal Sliding Track (Netflix Style with Snap Points - Matching Reference Design) */}
              <div
                ref={carouselRef}
                className="flex items-stretch gap-3.5 overflow-x-auto px-5 pb-2 snap-x snap-mandatory no-scrollbar"
                style={{ scrollbarWidth: 'none' }}
              >
                {activeHeroSessions.length > 0 ? (
                  activeHeroSessions.map((session) => (
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
                          className={`px-3.5 py-1 rounded-full text-xs font-black tracking-tight border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1 ${session.ctaBg}`}
                        >
                          <span>¡Vamos!</span>
                          <Play className="w-2.5 h-2.5 fill-current ml-0.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Illustration fitting the compact card */}
                    <div className="w-32 sm:w-40 h-[110%] flex items-center justify-end shrink-0 relative overflow-visible -mr-2">
                      <img 
                        src={
                          session.type === 'asedio' ? '/src/assets/asedio-removebg-preview.png' :
                          session.type === 'crossmath' ? '/src/assets/crossmath-removebg-preview.png' :
                          session.type === 'arena-challenge' ? '/src/assets/desafio_leyessignos-removebg-preview.png' :
                          session.title.includes('Axiomas') ? '/src/assets/axiomasreales-removebg-preview.png' :
                          '/src/assets/quiz_leyessignosycombos-removebg-preview.png'
                        }
                        alt={session.title}
                        className="w-[130%] h-[130%] object-contain drop-shadow-md origin-right"
                      />
                    </div>
                  </motion.div>
                ))) : (
                  <div className="w-[84vw] sm:w-[320px] max-w-[340px] h-[142px] snap-center shrink-0 rounded-3xl p-3.5 sm:p-4 border-2 border-dashed border-[#1E1E24]/30 bg-white/50 dark:bg-[#1E202E]/50 flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-3xl opacity-50 grayscale">🚀</span>
                    <p className="text-sm font-bold text-[#4A4E69] dark:text-gray-300">No tienes misiones en curso</p>
                    <p className="text-xs font-semibold text-[#8A909F] dark:text-gray-500">Inicia un desafío para que aparezca aquí</p>
                  </div>
                )}
              </div>
            </div>

            {/* Accordion of Volumes wrapping Grid of Cards */}
            <div className="px-5 pt-4 pb-8 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#8A909F] dark:text-gray-400 block">
                    Enciclopedia de Matemáticas
                  </span>
                  <span className="text-[10px] font-black text-[#6F78DB] dark:text-[#8D96F5]">
                    {ENCYCLOPEDIA_CARDS.length} TEMAS EN {VOLUMES_DATA.length} VOLÚMENES
                  </span>
                </div>

                <button
                  onClick={toggleAllVolumes}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1E1E24] border-2 border-[#1E1E24] dark:border-[#4A4E69] rounded-full text-[11px] font-black text-[#1E1E24] dark:text-white shadow-[2px_2px_0px_0px_#1E1E24] dark:shadow-[2px_2px_0px_0px_#4A4E69] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer group"
                >
                  {expandedVolumeCodes.length === VOLUMES_DATA.length ? 'Colapsar todos' : 'Expandir todos'}
                  <ChevronDown className={`w-3 h-3 stroke-[3] transition-transform ${expandedVolumeCodes.length === VOLUMES_DATA.length ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="space-y-4">
                {VOLUMES_DATA.map((volume) => {
                  const isExpanded = expandedVolumeCodes.includes(volume.code);
                  const categoryCards = ENCYCLOPEDIA_CARDS.filter(c => c.categoria === volume.title);
                  
                  return (
                    <motion.div
                      key={volume.code}
                      className="border-2 border-[#1E1E24] dark:border-[#2C2C3C] rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_#1E1E24] transition-all bg-white dark:bg-[#161822]"
                    >
                      {/* Volume Header Banner */}
                      <div
                        onClick={() => toggleVolumeExpand(volume.code)}
                        className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none transition-colors group relative overflow-hidden`}
                        style={{ backgroundColor: isExpanded ? volume.bgShade : '#ffffff' }}
                      >
                        {isExpanded && <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#1E1E24_1px,_transparent_1px)]" style={{ backgroundSize: '8px 8px' }}></div>}
                        
                        <div className="flex items-center gap-3 sm:gap-4 relative z-10 flex-1 min-w-0 pr-2">
                          <div
                            className="w-12 h-12 rounded-2xl border-2 border-[#1E1E24] flex items-center justify-center text-lg font-black shadow-[2px_2px_0px_0px_#1E1E24] text-white shrink-0"
                            style={{ backgroundColor: volume.color }}
                          >
                            {volume.label}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#1E1E24] px-2 py-0.5 rounded border border-[#1E1E24]/20 bg-black/5 shrink-0">
                                {volume.code}
                              </span>
                            </div>
                            <h3 className="font-black text-base sm:text-lg text-[#1E1E24] dark:text-white leading-tight break-words whitespace-normal">
                              {volume.title} <span className="text-[11px] sm:text-[12px] font-bold text-[#4A4E69] dark:text-gray-300 break-words whitespace-normal inline-block ml-1">{volume.subtitle}</span>
                            </h3>
                          </div>
                        </div>

                        <div
                          className="w-10 h-10 shrink-0 rounded-full bg-white dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-white/20 flex items-center justify-center text-[#1E1E24] dark:text-white shadow-[2px_2px_0px_0px_#1E1E24] dark:shadow-[2px_2px_0px_0px_#000000] group-active:translate-y-0.5 group-active:translate-x-0.5 group-active:shadow-none transition-all z-10"
                        >
                          <motion.div
                             animate={{ rotate: isExpanded ? 180 : 0 }}
                             transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 stroke-[3]" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Topics List within Volume */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t-2 border-[#1E1E24] dark:border-white/10 bg-[#f8faf9] p-4 sm:p-5"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {categoryCards.map((card) => (
                                <TopicCard 
                                  key={card.id}
                                  card={card}
                                  onClick={() => setSelectedCard(card)}
                                />
                              ))}
                            </div>
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
