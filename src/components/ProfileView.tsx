import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight, Edit3, Check, X, Sparkles, User, GraduationCap, Heart, BookOpen, Sun, Moon, LogOut } from 'lucide-react';
import { UserAvatar, StreakCheeringCharacter, HexagonBadgeSvg, AVATAR_OPTIONS } from './Illustrations';
import { supabase } from '../config/supabase';
import { UserStats, UserProfile } from '../types';
import { playSound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';
import { APP_TEXTS } from '../i18n';

interface ProfileViewProps {
  onBack: () => void;
  userStats: UserStats;
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  onOpenBadgesFull?: () => void;
}

const MATH_AREAS = [
  'Aritmética',
  'Álgebra',
  'Geometría',
  'Trigonometría',
  'Cálculo',
  'Probabilidad',
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  onBack,
  userStats,
  userProfile = {
    name: 'Ian',
    handle: '@ian_math',
    avatarId: 'astro',
    academicGoal: 'Bachillerato · Examen de Admisión',
    bio: 'Dominando los axiomas de números reales sin adivinar ✨',
    favoriteArea: 'Álgebra',
  },
  onUpdateProfile,
  onOpenBadgesFull,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(userProfile);

  const currentXp = userStats.xp || 323;
  const progressPercent = Math.min(100, Math.round(((currentXp % 500) / 500) * 100)) || 34;

  const badges = [
    { id: 'b1', name: 'Super Star', type: 'super-star' as const },
    { id: 'b2', name: 'Quiz Champion', type: 'quiz-champ' as const },
    { id: 'b3', name: 'Math Whiz Kid', type: 'math-whiz' as const },
    { id: 'b4', name: 'Science Pro', type: 'science-pro' as const },
  ];

  const handleOpenEdit = () => {
    playSound('click');
    setEditForm(userProfile);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('correct');
    if (onUpdateProfile) {
      onUpdateProfile(editForm);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    playSound('click');
    setEditForm(userProfile);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7CA38] dark:bg-[#181A24] text-[#1E1E24] dark:text-[#F4F7FC] pb-16 font-jakarta relative overflow-hidden transition-colors duration-200">
      {/* Top Header Section */}
      <motion.div
        initial={{ 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scaleY: 0.9,
          y: -15
        }}
        animate={{ 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scaleY: 1,
          y: 0
        }}
        exit={{ 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scaleY: 0.9,
          y: -15
        }}
        transition={{ 
          duration: 0.38, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        style={{ transformOrigin: 'top center' }}
        className="w-full bg-[#F7CA38] dark:bg-[#232736] pt-4 pb-8 px-5 flex flex-col items-center relative z-10 transition-colors"
      >
        {/* Background Memphis Accents */}
        <div className="absolute top-3 left-6 w-6 h-6 rounded-full border-2 border-[#1E1E24]/20 dark:border-white/15 pointer-events-none" />
        <div className="absolute top-10 left-16 w-2 h-2 rounded-full bg-[#1E1E24]/30 dark:bg-white/20 pointer-events-none" />
        <div className="absolute top-6 right-8 text-[#1E1E24]/20 dark:text-white/20 font-black text-lg pointer-events-none select-none">
          ✦
        </div>

        {/* Top Action Bar with Back button and Edit Profile toggle */}
        <div className="w-full flex items-center justify-between mb-2 max-w-md">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              playSound('click');
              onBack();
            }}
            className="w-10 h-10 bg-white/95 dark:bg-[#1E202E] hover:bg-white dark:hover:bg-[#282B3E] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-full flex items-center justify-center text-[#1E1E24] dark:text-white shadow-xs cursor-pointer transition-colors"
            title="Volver a Inicio"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          <span className="text-xs font-black uppercase tracking-wider text-[#1E1E24] dark:text-white bg-white/80 dark:bg-[#1E202E]/90 border-2 border-[#1E1E24] dark:border-[#3E4259] px-3.5 py-1 rounded-full shadow-2xs">
            {APP_TEXTS.profile.title}
          </span>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleOpenEdit}
            className="w-10 h-10 bg-white/95 dark:bg-[#1E202E] hover:bg-white dark:hover:bg-[#282B3E] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-full flex items-center justify-center text-[#1E1E24] dark:text-white shadow-xs cursor-pointer transition-colors"
            title="Editar Datos de Usuario"
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Profile Avatar with bouncy spring pop */}
        <motion.div
          initial={{ scale: 0.2, rotate: -15, y: -20 }}
          animate={{ scale: 1, rotate: 0, y: 0 }}
          transition={{ type: 'spring', damping: 13, stiffness: 240, delay: 0.1 }}
          onClick={handleOpenEdit}
          className="mt-1 p-1.5 bg-white dark:bg-[#1E202E] rounded-full shadow-lg border-2 border-[#1E1E24] dark:border-[#3E4259] relative group cursor-pointer transition-colors"
          title="Toca para cambiar avatar"
        >
          <UserAvatar avatarId={userProfile.avatarId} size={84} />
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#6F78DB] text-white border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-[10px] shadow-xs">
            ✏️
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#22C55E] border-2 border-white dark:border-[#1E202E] shadow-xs" />
        </motion.div>

        {/* User Name & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.25 }}
          className="text-center mt-2.5 space-y-1"
        >
          <h2 className="text-2xl font-black text-[#1E1E24] dark:text-white tracking-tight flex items-center justify-center gap-1.5">
            {userProfile.name}
          </h2>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#1E1E24]/85 dark:text-gray-200 bg-white/40 dark:bg-white/10 border border-[#1E1E24]/30 dark:border-white/20 px-2.5 py-0.5 rounded-full">
              {userProfile.handle.startsWith('@') ? userProfile.handle : `@${userProfile.handle}`}
            </span>
            <span className="text-xs font-extrabold text-[#1E1E24] bg-[#FDE047] border border-[#1E1E24] px-2.5 py-0.5 rounded-full">
              {userProfile.favoriteArea || 'Álgebra'}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main White/Dark Profile Card with Rounded Top Corners */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.35 }}
        className="relative z-20 w-full max-w-md mx-auto bg-white dark:bg-[#161822] rounded-t-[36px] border-t-2 border-x-2 border-[#1E1E24] dark:border-[#2C2C3C] shadow-2xl p-5 pt-6 pb-12 space-y-4 flex-1 transition-colors duration-200"
      >
        {/* User Bio & Academic Goal Banner */}
        <div className="bg-[#F8FAFC] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] rounded-3xl p-4 space-y-2 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#6F78DB] dark:text-[#8D96F5] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#6F78DB] dark:text-[#8D96F5]" />
              {userProfile.academicGoal || 'Meta Académica'}
            </span>

            <button
              onClick={handleOpenEdit}
              className="text-[11px] font-black text-[#1E1E24] dark:text-white hover:underline flex items-center gap-1 cursor-pointer bg-white dark:bg-[#282B3E] px-2.5 py-0.5 rounded-full border border-[#1E1E24] dark:border-[#3E4259] shadow-2xs"
            >
              <Edit3 className="w-3 h-3" /> Editar
            </button>
          </div>

          <p className="text-xs font-medium text-[#4A4E69] dark:text-gray-300 leading-relaxed italic bg-white dark:bg-[#161822] p-2.5 rounded-2xl border border-[#E2E8F0] dark:border-[#2C2E40]">
            "{userProfile.bio || 'Estudiando con rigor axiomático y enfoque anti-adivinanza.'}"
          </p>
        </div>

        {/* Global Dark Mode High-Contrast Toggle Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            playSound('click');
            toggleDarkMode();
          }}
          className="bg-[#F8FAFC] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] rounded-3xl p-4 flex items-center justify-between shadow-xs transition-colors cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isDarkMode ? 360 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className={`w-10 h-10 rounded-2xl border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center shadow-2xs transition-colors ${
                isDarkMode ? 'bg-[#38BDF8] text-[#0F172A]' : 'bg-[#FFDE59] text-[#1E1E24]'
              }`}
            >
              {isDarkMode ? <Moon className="w-5 h-5 stroke-[2.5]" /> : <Sun className="w-5 h-5 stroke-[2.5]" />}
            </motion.div>
            <div>
              <span className="text-xs font-black text-[#1E1E24] dark:text-white block">
                {APP_TEXTS.profile.darkModeLabel}
              </span>
              <span className="text-[11px] font-medium text-[#8A909F] dark:text-gray-400 block">
                {isDarkMode ? 'Modo Oscuro activo 🌙' : 'Modo Claro activo ☀️'}
              </span>
            </div>
          </div>

          {/* High-Contrast Interactive Neo-Brutalist Switch */}
          <div
            role="switch"
            aria-checked={isDarkMode}
            className={`w-14 h-8 rounded-full border-2 border-[#1E1E24] dark:border-white p-0.5 flex items-center transition-colors cursor-pointer relative shadow-xs shrink-0 ${
              isDarkMode ? 'bg-[#38BDF8]' : 'bg-[#E2E8F0]'
            }`}
            title="Alternar Modo Oscuro"
          >
            <motion.div
              animate={{ x: isDarkMode ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className="w-6 h-6 rounded-full border-2 border-[#1E1E24] bg-white flex items-center justify-center shadow-xs"
            >
              {isDarkMode ? (
                <Moon className="w-3.5 h-3.5 text-[#0F172A] stroke-[2.5]" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-[#D97706] stroke-[2.5]" />
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Top Streaks Yellow Hero Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#FDE047] border-2 border-[#1E1E24] rounded-3xl p-4 flex items-center justify-between shadow-xs cursor-pointer transition-transform text-[#1E1E24]"
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#1E1E24]/80 block">
              Racha de Estudio
            </span>
            <h3 className="text-2xl font-black text-[#1E1E24] tracking-tight">
              {userStats.streak || 6} días activos 🔥
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <StreakCheeringCharacter />
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-[#1E1E24] stroke-[3]" />
            </div>
          </div>
        </motion.div>

        {/* 2-Column Core Stats: Level Gold & Points */}
        <div className="grid grid-cols-2 gap-3">
          {/* Level Pill */}
          <div className="bg-[#F8FAFC] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] rounded-3xl p-3.5 flex items-center gap-3 shadow-xs transition-colors">
            <div className="w-11 h-11 rounded-full bg-white dark:bg-[#282B3E] border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-lg shrink-0 shadow-2xs relative">
              <span className="text-base">📐</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8A909F] dark:text-gray-400 block">
                Nivel
              </span>
              <span className="text-base font-black text-[#1E1E24] dark:text-white">
                Niv. {userStats.level || 1}
              </span>
            </div>
          </div>

          {/* Points Pill */}
          <div className="bg-[#F8FAFC] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] rounded-3xl p-3.5 flex items-center gap-3 shadow-xs transition-colors">
            <div className="w-11 h-11 rounded-full bg-white dark:bg-[#282B3E] border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-lg shrink-0 shadow-2xs relative">
              <span className="text-base">⭐</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8A909F] dark:text-gray-400 block">
                Puntos XP
              </span>
              <span className="text-base font-black text-[#1E1E24] dark:text-white">
                {currentXp}
              </span>
            </div>
          </div>
        </div>

        {/* Level Progression Section */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-black text-[#1E1E24] dark:text-white tracking-tight">
              Progreso de Nivel
            </h4>
            <span className="text-xs font-bold text-[#8A909F] dark:text-gray-400">
              {currentXp % 500} / 500 XP
            </span>
          </div>
          <div className="w-full bg-[#F1F5F9] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] h-11 rounded-full p-1 flex items-center overflow-hidden shadow-2xs transition-colors">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(28, progressPercent)}%` }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              className="bg-[#6F78DB] h-full rounded-full flex items-center justify-start px-4 text-xs font-black text-white shadow-xs"
            >
              {progressPercent}%
            </motion.div>
          </div>
        </div>

        {/* Featured Hexagonal Badges */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-black text-[#1E1E24] dark:text-white tracking-tight">
              Mis Medallas
            </h4>
            <button
              onClick={() => {
                playSound('click');
                if (onOpenBadgesFull) onOpenBadgesFull();
              }}
              className="text-xs font-bold text-[#8A909F] dark:text-gray-400 hover:text-[#1E1E24] dark:hover:text-white hover:underline cursor-pointer"
            >
              Ver Todas
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {badges.map((b) => (
              <motion.div
                key={b.id}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1.5 cursor-pointer group"
                onClick={() => {
                  playSound('click');
                  if (onOpenBadgesFull) onOpenBadgesFull();
                }}
              >
                <div className="transition-transform group-hover:rotate-6 flex items-center justify-center">
                  <HexagonBadgeSvg type={b.type} size={58} />
                </div>
                <span className="text-[11px] font-bold text-[#1E1E24] dark:text-gray-200 leading-tight line-clamp-2">
                  {b.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons: Edit Profile and Back to Home */}
        <div className="pt-4 grid grid-cols-2 gap-3">
          <button
            onClick={handleOpenEdit}
            className="py-3.5 bg-white dark:bg-[#1E202E] hover:bg-[#F8FAFC] dark:hover:bg-[#282B3E] text-[#1E1E24] dark:text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] dark:border-[#3E4259] shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Editar Datos</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onBack();
            }}
            className="py-3.5 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
        </div>

        {/* Logout Button */}
        <div className="pt-4 mt-2">
          <button
            onClick={async () => {
              playSound('click');
              await supabase.auth.signOut();
            }}
            className="w-full py-3.5 bg-[#FF4757] hover:bg-[#FF6B81] text-white dark:text-[#1E1E24] dark:bg-[#FF6B81] dark:hover:bg-[#FF4757] font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </motion.div>

      {/* Profile Edit Modal with Memphis Styling */}
      <AnimatePresence>
        {isEditing && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-jakarta"
            onClick={handleCancelEdit}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#161822] rounded-3xl border-2 border-[#1E1E24] dark:border-[#2C2C3C] shadow-2xl max-w-md w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 space-y-4 no-scrollbar text-[#1E1E24] dark:text-[#F4F7FC] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b-2 border-[#1E1E24]/15 dark:border-white/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#F7CA38] border-2 border-[#1E1E24] flex items-center justify-center shadow-xs">
                    <User className="w-5 h-5 text-[#1E1E24]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-[#1E1E24] dark:text-white">
                      Editar Perfil
                    </h3>
                    <span className="text-xs font-bold text-[#8A909F] dark:text-gray-400">
                      Personaliza tus datos de estudiante
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCancelEdit}
                  className="w-9 h-9 rounded-full bg-[#F4F7FC] dark:bg-[#202334] hover:bg-[#E8EEF8] dark:hover:bg-[#2A2E44] border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-[#1E1E24] dark:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSaveEdit} className="space-y-4">
                {/* Avatar Selection Carousel */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24] dark:text-white block">
                    Selecciona tu Avatar:
                  </label>
                  <div className="grid grid-cols-4 gap-3 p-1">
                    {AVATAR_OPTIONS.map((opt) => {
                      const isSelected = editForm.avatarId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            playSound('click');
                            setEditForm((prev) => ({ ...prev, avatarId: opt.id }));
                          }}
                          className={`p-2.5 rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer aspect-square ${
                            isSelected
                              ? 'bg-[#FEF08A] border-[#1E1E24] shadow-xs scale-105 ring-2 ring-[#6F78DB]'
                              : 'bg-[#F8FAFC] dark:bg-[#202334] border-[#1E1E24]/20 dark:border-white/10 hover:border-[#1E1E24] dark:hover:border-white'
                          }`}
                          title={opt.name}
                        >
                          <UserAvatar avatarId={opt.id} size={46} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Handle Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24] dark:text-white block mb-1">
                      Nombre Completo:
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Ej. Ian"
                      className="w-full px-3.5 py-2.5 text-xs font-bold bg-[#F8FAFC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6F78DB] text-[#1E1E24] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24] dark:text-white block mb-1">
                      Nombre de Usuario (@handle):
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.handle}
                      onChange={(e) => setEditForm({ ...editForm, handle: e.target.value })}
                      placeholder="Ej. @ian_math"
                      className="w-full px-3.5 py-2.5 text-xs font-bold bg-[#F8FAFC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6F78DB] text-[#1E1E24] dark:text-white"
                    />
                  </div>
                </div>

                {/* Academic Goal */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24] dark:text-white block mb-1">
                    Grado / Meta Académica:
                  </label>
                  <input
                    type="text"
                    value={editForm.academicGoal}
                    onChange={(e) => setEditForm({ ...editForm, academicGoal: e.target.value })}
                    placeholder="Ej. Bachillerato · Examen UNAM"
                    className="w-full px-3.5 py-2.5 text-xs font-bold bg-[#F8FAFC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6F78DB] text-[#1E1E24] dark:text-white"
                  />
                </div>

                {/* Favorite Math Area */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24] dark:text-white block mb-1.5">
                    Área Favorita de Matemáticas:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {MATH_AREAS.map((area) => {
                      const isSelected = editForm.favoriteArea === area;
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => {
                            playSound('click');
                            setEditForm({ ...editForm, favoriteArea: area });
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-black border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F7CA38] text-[#1E1E24] border-[#1E1E24] shadow-xs'
                              : 'bg-white dark:bg-[#202334] text-[#4A4E69] dark:text-gray-300 border-[#1E1E24]/20 dark:border-white/15 hover:border-[#1E1E24] dark:hover:border-white'
                          }`}
                        >
                          {area}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bio / Quote */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24] dark:text-white block mb-1">
                    Lema o Biografía:
                  </label>
                  <textarea
                    rows={2}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Escribe una frase o lema de estudio..."
                    className="w-full px-3.5 py-2 text-xs font-semibold bg-[#F8FAFC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6F78DB] text-[#1E1E24] dark:text-white resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="py-3 bg-[#F4F7FC] dark:bg-[#202334] hover:bg-[#E8EEF8] dark:hover:bg-[#2A2E44] text-[#1E1E24] dark:text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] dark:border-[#3E4259] cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="py-3 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
