import React from 'react';

export interface AvatarOption {
  id: string;
  name: string;
  badge: string;
  bgColor: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'astro', name: 'Astronauta Clásico', badge: 'Espacial', bgColor: '#6F78DB' },
  { id: 'astro-blue', name: 'Explorador Cósmico', badge: 'Estelar', bgColor: '#38BDF8' },
  { id: 'astro-yellow', name: 'Pionero Solar', badge: 'Nebulosa', bgColor: '#FBBF24' },
  { id: 'astro-green', name: 'Piloto Cibernético', badge: 'Galáctico', bgColor: '#34D399' },
  { id: 'astro-purple', name: 'Viajero Cuántico', badge: 'Gravitacional', bgColor: '#A855F7' },
  { id: 'astro-red', name: 'Comandante de Marte', badge: 'Orbital', bgColor: '#F87171' },
  { id: 'astro-teal', name: 'Buzo del Espacio', badge: 'Cosmos', bgColor: '#2DD4BF' },
  { id: 'astro-black', name: 'Centinela Oscuro', badge: 'Horizonte', bgColor: '#334155' },
];

// Universal Avatar Renderer for space astronaut style avatars
export const UserAvatar: React.FC<{
  avatarId?: string;
  size?: number;
  className?: string;
}> = ({ avatarId = 'astro', size = 48, className = '' }) => {
  // 1. Astro Classic (Default)
  if (avatarId === 'astro' || avatarId === 'catlyne') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`rounded-full overflow-hidden shrink-0 ${className}`}
      >
        <circle cx="50" cy="50" r="50" fill="#6F78DB" />
        {/* Antenna */}
        <path d="M42 19L50 11L58 19" stroke="#F7CA38" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="10" r="3.5" fill="#EF4444" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Helmet Base */}
        <circle cx="50" cy="48" r="28" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="3" />
        {/* Visor */}
        <ellipse cx="50" cy="48" rx="20" ry="16" fill="#F7CA38" stroke="#1E1E24" strokeWidth="2.5" />
        <ellipse cx="44" cy="44" rx="6" ry="3" fill="#FFFFFF" opacity="0.85" />
        {/* Helmet Ear pieces */}
        <rect x="19" y="43" width="6" height="11" rx="3" fill="#EF4444" stroke="#1E1E24" strokeWidth="1.5" />
        <rect x="75" y="43" width="6" height="11" rx="3" fill="#EF4444" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Suit collar */}
        <path d="M25 95C25 80 35 76 50 76C65 76 75 80 75 95V100H25V95Z" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="3" />
        <path d="M40 85H60" stroke="#6F78DB" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 2. Astro Blue (Cosmic Cyan)
  if (avatarId === 'astro-blue' || avatarId === 'leo') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`rounded-full overflow-hidden shrink-0 ${className}`}
      >
        <circle cx="50" cy="50" r="50" fill="#38BDF8" />
        {/* Dual Antennas */}
        <line x1="38" y1="20" x2="33" y2="10" stroke="#1E1E24" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="9" r="3" fill="#38BDF8" stroke="#1E1E24" strokeWidth="1.5" />
        <line x1="62" y1="20" x2="67" y2="10" stroke="#1E1E24" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="68" cy="9" r="3" fill="#38BDF8" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Helmet Base */}
        <circle cx="50" cy="48" r="28" fill="#1E293B" stroke="#1E1E24" strokeWidth="3" />
        {/* Cyan Glowing Visor */}
        <ellipse cx="50" cy="48" rx="20" ry="16" fill="#06B6D4" stroke="#1E1E24" strokeWidth="2.5" />
        <ellipse cx="44" cy="44" rx="6" ry="3" fill="#E0F2FE" opacity="0.9" />
        {/* Tech lines */}
        <path d="M38 52H62" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6" />
        {/* Ear pieces */}
        <circle cx="21" cy="48" r="4.5" fill="#FACC15" stroke="#1E1E24" strokeWidth="1.5" />
        <circle cx="79" cy="48" r="4.5" fill="#FACC15" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Suit */}
        <path d="M25 95C25 80 35 76 50 76C65 76 75 80 75 95V100H25V95Z" fill="#0284C7" stroke="#1E1E24" strokeWidth="3" />
        <path d="M42 86H58" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. Astro Yellow (Solar Gold)
  if (avatarId === 'astro-yellow' || avatarId === 'sara') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`rounded-full overflow-hidden shrink-0 ${className}`}
      >
        <circle cx="50" cy="50" r="50" fill="#FBBF24" />
        {/* Radar Dish */}
        <path d="M50 20V12" stroke="#1E1E24" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="50" cy="11" rx="8" ry="3" fill="#EF4444" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Helmet */}
        <circle cx="50" cy="48" r="28" fill="#FFFBEB" stroke="#1E1E24" strokeWidth="3" />
        {/* Gold Visor */}
        <ellipse cx="50" cy="48" rx="20" ry="16" fill="#F59E0B" stroke="#1E1E24" strokeWidth="2.5" />
        <ellipse cx="44" cy="44" rx="6" ry="3" fill="#FEF3C7" opacity="0.9" />
        {/* Accents */}
        <rect x="19" y="43" width="6" height="11" rx="3" fill="#3B82F6" stroke="#1E1E24" strokeWidth="1.5" />
        <rect x="75" y="43" width="6" height="11" rx="3" fill="#3B82F6" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Suit */}
        <path d="M25 95C25 80 35 76 50 76C65 76 75 80 75 95V100H25V95Z" fill="#F59E0B" stroke="#1E1E24" strokeWidth="3" />
        <circle cx="50" cy="85" r="4" fill="#EF4444" stroke="#1E1E24" strokeWidth="1.5" />
      </svg>
    );
  }

  // 4. Astro Green (Cyber Voyager)
  if (avatarId === 'astro-green' || avatarId === 'alex') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`rounded-full overflow-hidden shrink-0 ${className}`}
      >
        <circle cx="50" cy="50" r="50" fill="#34D399" />
        {/* Tech Fin */}
        <path d="M46 20L50 8L54 20" fill="#10B981" stroke="#1E1E24" strokeWidth="2" />
        {/* Helmet */}
        <circle cx="50" cy="48" r="28" fill="#ECFDF5" stroke="#1E1E24" strokeWidth="3" />
        {/* Visor with HUD Matrix */}
        <ellipse cx="50" cy="48" rx="20" ry="16" fill="#10B981" stroke="#1E1E24" strokeWidth="2.5" />
        <ellipse cx="44" cy="44" rx="6" ry="3" fill="#D1FAE5" opacity="0.9" />
        <line x1="38" y1="48" x2="62" y2="48" stroke="#6EE7B7" strokeWidth="1.5" />
        {/* Ear tech */}
        <rect x="19" y="44" width="6" height="9" rx="2" fill="#1E1E24" />
        <rect x="75" y="44" width="6" height="9" rx="2" fill="#1E1E24" />
        {/* Suit */}
        <path d="M25 95C25 80 35 76 50 76C65 76 75 80 75 95V100H25V95Z" fill="#047857" stroke="#1E1E24" strokeWidth="3" />
        <path d="M40 85H60" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 5. Astro Purple (Nebula Voyager)
  if (avatarId === 'astro-purple' || avatarId === 'maya') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`rounded-full overflow-hidden shrink-0 ${className}`}
      >
        <circle cx="50" cy="50" r="50" fill="#A855F7" />
        {/* Cosmic Ring Antenna */}
        <ellipse cx="50" cy="12" rx="7" ry="4" stroke="#FDE047" strokeWidth="2" fill="none" />
        <line x1="50" y1="16" x2="50" y2="20" stroke="#1E1E24" strokeWidth="2" />
        {/* Helmet */}
        <circle cx="50" cy="48" r="28" fill="#FAF5FF" stroke="#1E1E24" strokeWidth="3" />
        {/* Pink/Violet Visor */}
        <ellipse cx="50" cy="48" rx="20" ry="16" fill="#D946EF" stroke="#1E1E24" strokeWidth="2.5" />
        <ellipse cx="44" cy="44" rx="6" ry="3" fill="#FDF4FF" opacity="0.9" />
        {/* Ear pieces */}
        <circle cx="21" cy="48" r="4.5" fill="#FDE047" stroke="#1E1E24" strokeWidth="1.5" />
        <circle cx="79" cy="48" r="4.5" fill="#FDE047" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Suit */}
        <path d="M25 95C25 80 35 76 50 76C65 76 75 80 75 95V100H25V95Z" fill="#7E22CE" stroke="#1E1E24" strokeWidth="3" />
        <circle cx="50" cy="85" r="3.5" fill="#FDE047" stroke="#1E1E24" strokeWidth="1.5" />
      </svg>
    );
  }

  // 6. Astro Red (Mars Commander)
  if (avatarId === 'astro-red' || avatarId === 'marcus') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`rounded-full overflow-hidden shrink-0 ${className}`}
      >
        <circle cx="50" cy="50" r="50" fill="#F87171" />
        {/* Beacon */}
        <line x1="50" y1="20" x2="50" y2="10" stroke="#1E1E24" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="50,7 46,13 54,13" fill="#FDE047" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Helmet */}
        <circle cx="50" cy="48" r="28" fill="#1E1E24" stroke="#1E1E24" strokeWidth="3" />
        {/* Red Glow Visor */}
        <ellipse cx="50" cy="48" rx="20" ry="16" fill="#DC2626" stroke="#1E1E24" strokeWidth="2.5" />
        <ellipse cx="44" cy="44" rx="6" ry="3" fill="#FEE2E2" opacity="0.85" />
        {/* Accents */}
        <rect x="19" y="43" width="6" height="11" rx="3" fill="#FACC15" stroke="#1E1E24" strokeWidth="1.5" />
        <rect x="75" y="43" width="6" height="11" rx="3" fill="#FACC15" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Suit */}
        <path d="M25 95C25 80 35 76 50 76C65 76 75 80 75 95V100H25V95Z" fill="#B91C1C" stroke="#1E1E24" strokeWidth="3" />
        <path d="M42 86H58" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 7. Astro Teal (Space Diver)
  if (avatarId === 'astro-teal' || avatarId === 'elena') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`rounded-full overflow-hidden shrink-0 ${className}`}
      >
        <circle cx="50" cy="50" r="50" fill="#2DD4BF" />
        {/* Double antennas */}
        <path d="M44 20L40 10" stroke="#1E1E24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M56 20L60 10" stroke="#1E1E24" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="40" cy="9" r="2.5" fill="#F43F5E" />
        <circle cx="60" cy="9" r="2.5" fill="#F43F5E" />
        {/* Helmet */}
        <circle cx="50" cy="48" r="28" fill="#F0FDFA" stroke="#1E1E24" strokeWidth="3" />
        {/* Teal Glass Visor */}
        <ellipse cx="50" cy="48" rx="20" ry="16" fill="#14B8A6" stroke="#1E1E24" strokeWidth="2.5" />
        <ellipse cx="44" cy="44" rx="6" ry="3" fill="#CCFBF1" opacity="0.9" />
        {/* Accents */}
        <circle cx="21" cy="48" r="4.5" fill="#F43F5E" stroke="#1E1E24" strokeWidth="1.5" />
        <circle cx="79" cy="48" r="4.5" fill="#F43F5E" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Suit */}
        <path d="M25 95C25 80 35 76 50 76C65 76 75 80 75 95V100H25V95Z" fill="#0F766E" stroke="#1E1E24" strokeWidth="3" />
        <circle cx="50" cy="85" r="4" fill="#F43F5E" stroke="#1E1E24" strokeWidth="1.5" />
      </svg>
    );
  }

  // 8. Astro Black (Stealth Horizon)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
    >
      <circle cx="50" cy="50" r="50" fill="#334155" />
      {/* Stealth Fin */}
      <polygon points="50,6 44,20 56,20" fill="#F59E0B" stroke="#1E1E24" strokeWidth="2" />
      {/* Helmet */}
      <circle cx="50" cy="48" r="28" fill="#0F172A" stroke="#1E1E24" strokeWidth="3" />
      {/* Amber Visor */}
      <ellipse cx="50" cy="48" rx="20" ry="16" fill="#F59E0B" stroke="#1E1E24" strokeWidth="2.5" />
      <ellipse cx="44" cy="44" rx="6" ry="3" fill="#FEF3C7" opacity="0.9" />
      {/* Ear parts */}
      <rect x="19" y="44" width="6" height="9" rx="2" fill="#F59E0B" stroke="#1E1E24" strokeWidth="1.5" />
      <rect x="75" y="44" width="6" height="9" rx="2" fill="#F59E0B" stroke="#1E1E24" strokeWidth="1.5" />
      {/* Suit */}
      <path d="M25 95C25 80 35 76 50 76C65 76 75 80 75 95V100H25V95Z" fill="#1E293B" stroke="#1E1E24" strokeWidth="3" />
      <path d="M42 86H58" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// Character avatar for Catlyne (The main profile avatar matching screenshot 1, 2, 3)
export const CatlyneAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-full overflow-hidden ${className}`}
  >
    <circle cx="50" cy="50" r="50" fill="#E8F1FF" />
    {/* Hair back */}
    <path d="M22 45C22 28 32 15 50 15C68 15 78 28 78 45C78 60 74 72 70 78C64 68 62 60 62 55C50 62 38 60 30 55C30 65 26 72 22 78C18 70 22 55 22 45Z" fill="#FCE170" />
    {/* Face */}
    <ellipse cx="50" cy="52" rx="22" ry="24" fill="#FFE0B2" />
    {/* Eyes */}
    <ellipse cx="42" cy="50" rx="2.5" ry="3.5" fill="#2D3748" />
    <ellipse cx="58" cy="50" rx="2.5" ry="3.5" fill="#2D3748" />
    {/* Smile / whistling */}
    <circle cx="50" cy="62" r="3" fill="#E2847A" />
    {/* Cheeks */}
    <circle cx="36" cy="56" r="4" fill="#FF8A80" opacity="0.5" />
    <circle cx="64" cy="56" r="4" fill="#FF8A80" opacity="0.5" />
    {/* Hair front strands */}
    <path d="M30 35C38 32 48 36 50 42C52 35 62 32 70 36C68 45 62 48 58 48C50 45 42 48 30 35Z" fill="#FCE170" />
    {/* Shirt */}
    <path d="M25 95C25 80 35 75 50 75C65 75 75 80 75 95V100H25V95Z" fill="#7C78EB" />
  </svg>
);

// Friend Avatars
export const FriendAvatars: Array<{ id: string; name: string; avatarBg: string; seed: string }> = [
  { id: 'f1', name: 'Alex', avatarBg: '#FCE7F3', seed: 'boy1' },
  { id: 'f2', name: 'Sara', avatarBg: '#FEF3C7', seed: 'girl1' },
  { id: 'f3', name: 'Leo', avatarBg: '#DBEAFE', seed: 'boy2' },
  { id: 'f4', name: 'Elena', avatarBg: '#E0E7FF', seed: 'girl2' },
  { id: 'f5', name: 'Marcus', avatarBg: '#FEE2E2', seed: 'boy3' },
  { id: 'f6', name: 'Maya', avatarBg: '#F3E8FF', seed: 'girl3' },
];

export const AvatarItem: React.FC<{ friend: typeof FriendAvatars[0]; size?: number }> = ({ friend, size = 44 }) => {
  const colors = [
    { bg: '#FDE68A', skin: '#FFE0B2', hair: '#1E1E24', shirt: '#F472B6' },
    { bg: '#BAE6FD', skin: '#FCD34D', hair: '#D97706', shirt: '#38BDF8' },
    { bg: '#DDD6FE', skin: '#FFEDD5', hair: '#4B5563', shirt: '#A78BFA' },
    { bg: '#BBF7D0', skin: '#FDBA74', hair: '#92400E', shirt: '#34D399' },
    { bg: '#FECDD3', skin: '#FFE4E6', hair: '#1F2937', shirt: '#F87171' },
    { bg: '#FED7AA', skin: '#FEF08A', hair: '#047857', shirt: '#FB923C' },
  ];
  const idx = Math.abs(friend.id.charCodeAt(1) % colors.length);
  const c = colors[idx];

  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-xs shrink-0"
      style={{ width: size, height: size, backgroundColor: c.bg }}
    >
      <svg width={size * 0.9} height={size * 0.9} viewBox="0 0 100 100" fill="none">
        <ellipse cx="50" cy="50" rx="26" ry="28" fill={c.skin} />
        <ellipse cx="40" cy="48" rx="3" ry="4" fill="#1E1E24" />
        <ellipse cx="60" cy="48" rx="3" ry="4" fill="#1E1E24" />
        <path d="M44 62C47 65 53 65 56 62" stroke="#1E1E24" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 35C35 20 65 20 76 35C70 42 60 36 50 38C40 36 30 42 24 35Z" fill={c.hair} />
        <path d="M20 95C20 80 32 75 50 75C68 75 80 80 80 95V100H20V95Z" fill={c.shirt} />
      </svg>
    </div>
  );
};

// Hero Memphis Illustration (matching screenshot 2 & 3: Character with magnifying glass, question mark, doodle lines)
export const HeroMemphisIllustration: React.FC<{ theme?: string }> = ({ theme = 'arithmetic' }) => {
  const isDarkCard = theme === 'equations' || theme === 'purple';
  const accentColor = isDarkCard ? '#F7CA38' : '#6F78DB';
  const textColor = isDarkCard ? '#FFFFFF' : '#1E1E24';

  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Floating math shapes */}
      <circle cx="25" cy="30" r="14" fill={accentColor} opacity="0.25" />
      <rect x="150" y="20" width="22" height="22" rx="6" transform="rotate(25 150 20)" fill="#38BDF8" opacity="0.3" />
      <path d="M120 15L128 30H112L120 15Z" fill="#F472B6" opacity="0.4" />

      {/* Giant Question Mark / Math Symbol */}
      <text
        x="145"
        y="95"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="64"
        fontWeight="900"
        fill={textColor}
        opacity="0.85"
      >
        ?
      </text>

    {/* Memphis playful character exploring with arms */}
    <g transform="translate(45, 25)">
      {/* Body / Shirt */}
      <path d="M35 55C35 42 45 35 60 35C75 35 85 42 85 55V85H35V55Z" fill="#38BDF8" />
      {/* Head */}
      <circle cx="60" cy="22" r="15" fill="#FFE0B2" />
      {/* Glasses / Eyes */}
      <circle cx="55" cy="20" r="5" stroke="#1E1E24" strokeWidth="2.5" fill="#FFFFFF" />
      <circle cx="67" cy="20" r="5" stroke="#1E1E24" strokeWidth="2.5" fill="#FFFFFF" />
      <line x1="60" y1="20" x2="62" y2="20" stroke="#1E1E24" strokeWidth="2.5" />
      {/* Smiling mouth */}
      <path d="M58 28C60 30 64 30 66 28" stroke="#1E1E24" strokeWidth="2" strokeLinecap="round" />
      {/* Hair */}
      <path d="M46 16C50 8 70 8 74 16C72 20 68 16 60 17C52 16 48 20 46 16Z" fill="#F7CA38" />

      {/* Arms reaching out */}
      <path
        d="M35 50C20 45 10 30 22 15"
        stroke="#1E1E24"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Magnifying Glass */}
      <circle cx="20" cy="12" r="11" stroke="#F43F5E" strokeWidth="4" fill="#FEE2E2" fillOpacity="0.6" />
      <line x1="28" y1="20" x2="35" y2="28" stroke="#1E1E24" strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Sparkles & Dots */}
    <circle cx="40" cy="85" r="3" fill="#1E1E24" />
    <circle cx="95" cy="15" r="2.5" fill="#1E1E24" />
    <circle cx="175" cy="115" r="4" fill="#F7CA38" />
  </svg>
  );
};

// Quiz Memphis Illustration (Matching screenshot 4 - Character with plant/microscope & shapes)
export const QuizMemphisIllustration: React.FC = () => (
  <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 h-28 mx-auto">
    <circle cx="80" cy="55" r="45" fill="#FFFFFF" fillOpacity="0.15" />
    {/* Floating math geometric items */}
    <rect x="20" y="20" width="16" height="16" rx="4" transform="rotate(15 20 20)" fill="#F7CA38" />
    <circle cx="135" cy="30" r="10" fill="#38BDF8" />
    <path d="M125 80L135 95H115L125 80Z" fill="#F472B6" />

    {/* Character inspecting */}
    <g transform="translate(35, 15)">
      {/* Body */}
      <path d="M30 45C30 35 40 30 52 30C64 30 74 35 74 45V75H30V45Z" fill="#38BDF8" />
      {/* Head */}
      <circle cx="52" cy="18" r="14" fill="#FFE0B2" />
      {/* Hair */}
      <path d="M39 15C43 6 61 6 65 15C63 19 59 15 52 16C45 15 41 19 39 15Z" fill="#1E1E24" />
      {/* Eye looking curious */}
      <circle cx="48" cy="17" r="3" fill="#1E1E24" />
      <circle cx="58" cy="17" r="3" fill="#1E1E24" />
      {/* Smile */}
      <path d="M50 24C52 26 56 26 58 24" stroke="#1E1E24" strokeWidth="2" strokeLinecap="round" />

      {/* Magnifier in hand */}
      <path d="M68 40C78 35 88 40 85 52" stroke="#1E1E24" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="85" cy="54" r="10" stroke="#F7CA38" strokeWidth="4" fill="#FEF3C7" fillOpacity="0.8" />
      {/* Little green caterpillar / math curve */}
      <path d="M15 65Q25 55 35 65T55 65" stroke="#4ADE80" strokeWidth="7" strokeLinecap="round" fill="none" />
      <circle cx="15" cy="65" r="5" fill="#22C55E" />
      <circle cx="13" cy="63" r="1.5" fill="#1E1E24" />
    </g>
  </svg>
);

// Streak Banner Character (Faithful to the screenshot: Runner with waving flag & bag)
export const StreakCheeringCharacter: React.FC = () => (
  <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-14">
    {/* Running character */}
    <g transform="translate(10, 5)">
      {/* Waving Ribbon / Flag */}
      <path
        d="M48 6C60 2 75 14 90 8C95 6 100 10 102 14L98 28C88 24 72 32 60 22C54 18 48 24 45 20Z"
        fill="#86EFAC"
        stroke="#1E1E24"
        strokeWidth="1.8"
      />
      <path
        d="M48 10C58 6 72 16 85 11C90 9 95 12 97 16L94 24C85 20 70 27 58 19C53 16 48 20 46 17Z"
        fill="#FEF08A"
      />

      {/* Upraised Arm holding roller / flag handle */}
      <rect x="38" y="2" width="12" height="10" rx="2" fill="#F43F5E" stroke="#1E1E24" strokeWidth="1.8" />
      <path d="M42 12V24" stroke="#1E1E24" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 20C38 16 35 22 30 26" stroke="#9333EA" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Head */}
      <circle cx="48" cy="22" r="8" fill="#FFE0B2" stroke="#1E1E24" strokeWidth="1.8" />
      {/* Hair */}
      <path d="M42 18C45 14 53 14 56 18C54 22 48 20 42 18Z" fill="#1E1E24" />

      {/* Torso / Shirt */}
      <path d="M36 28C36 26 42 25 48 25C54 25 58 26 58 35H36V28Z" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1.8" />

      {/* Blue Bag */}
      <rect x="58" y="32" width="10" height="14" rx="2" fill="#1E40AF" stroke="#1E1E24" strokeWidth="1.5" />
      <line x1="58" y1="36" x2="68" y2="36" stroke="#FFFFFF" strokeWidth="1" />

      {/* Blue Running Legs */}
      <path
        d="M38 35L30 48L22 50"
        stroke="#60A5FA"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M52 35L58 46L68 54"
        stroke="#60A5FA"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M38 35L30 48L22 50"
        stroke="#1E1E24"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M52 35L58 46L68 54"
        stroke="#1E1E24"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  </svg>
);

// Hexagon Badge Component (Matching the 4 badges in Screenshot 1 / User Request image)
export const HexagonBadgeSvg: React.FC<{
  type: 'super-star' | 'quiz-champ' | 'math-whiz' | 'science-pro';
  size?: number;
}> = ({ type, size = 68 }) => {
  if (type === 'super-star') {
    return (
      <svg width={size} height={size * 1.08} viewBox="0 0 100 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,4 94,28 94,80 50,104 6,80 6,28"
          fill="#FDE047"
          stroke="#1E1E24"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* 3 Stars */}
        <path d="M26 28L28 32L32 33L29 36L30 40L26 38L22 40L23 36L20 33L24 32Z" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1" />
        <path d="M50 20L52 24L56 25L53 28L54 32L50 30L46 32L47 28L44 25L48 24Z" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1" />
        <path d="M74 28L76 32L80 33L77 36L78 40L74 38L70 40L71 36L68 33L72 32Z" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1" />
        {/* Character Head */}
        <circle cx="50" cy="46" r="14" fill="#FFE0B2" stroke="#1E1E24" strokeWidth="2.5" />
        <path d="M38 42C42 32 58 32 62 42C58 46 54 44 50 44C46 44 42 46 38 42Z" fill="#1E1E24" />
        {/* Red/Coral Shirt with arms up */}
        <path d="M22 84C24 64 36 60 50 60C64 60 76 64 78 84H22Z" fill="#F43F5E" stroke="#1E1E24" strokeWidth="2.5" />
        <path d="M32 78L22 62" stroke="#1E1E24" strokeWidth="3" strokeLinecap="round" />
        <path d="M68 78L78 62" stroke="#1E1E24" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'quiz-champ') {
    return (
      <svg width={size} height={size * 1.08} viewBox="0 0 100 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,4 94,28 94,80 50,104 6,80 6,28"
          fill="#93C5FD"
          stroke="#1E1E24"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Bubbles */}
        <circle cx="34" cy="24" r="3" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1.5" />
        <circle cx="48" cy="22" r="4.5" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1.5" />
        <circle cx="64" cy="24" r="3" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1.5" />
        {/* Character Head reading */}
        <circle cx="60" cy="46" r="13" fill="#FFE0B2" stroke="#1E1E24" strokeWidth="2.5" />
        <path d="M50 42C54 34 68 34 72 42C68 46 64 44 60 44C56 44 52 46 50 42Z" fill="#1E1E24" />
        {/* Red Book Held */}
        <rect x="25" y="60" width="46" height="24" rx="3" transform="rotate(-6 25 60)" fill="#EF4444" stroke="#1E1E24" strokeWidth="2.5" />
        <line x1="48" y1="56" x2="46" y2="80" stroke="#FFFFFF" strokeWidth="2" />
        {/* Hands */}
        <circle cx="28" cy="68" r="5" fill="#FDBA74" stroke="#1E1E24" strokeWidth="2" />
        <circle cx="68" cy="64" r="5" fill="#FDBA74" stroke="#1E1E24" strokeWidth="2" />
      </svg>
    );
  }

  if (type === 'math-whiz') {
    return (
      <svg width={size} height={size * 1.08} viewBox="0 0 100 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,4 94,28 94,80 50,104 6,80 6,28"
          fill="#F87171"
          stroke="#1E1E24"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Character Head with coffee/flask */}
        <circle cx="62" cy="44" r="13" fill="#FFE0B2" stroke="#1E1E24" strokeWidth="2.5" />
        <path d="M52 40C56 32 70 32 74 40C70 44 66 42 62 42C58 42 54 44 52 40Z" fill="#1E1E24" />
        {/* Cup */}
        <rect x="42" y="38" width="10" height="12" rx="2" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="2" />
        {/* Green Body */}
        <path d="M22 84C24 64 36 60 50 60C64 60 76 64 78 84H22Z" fill="#A3E635" stroke="#1E1E24" strokeWidth="2.5" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size * 1.08} viewBox="0 0 100 108" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="50,4 94,28 94,80 50,104 6,80 6,28"
        fill="#C084FC"
        stroke="#1E1E24"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Science Flask & Bubbles */}
      <circle cx="34" cy="24" r="3" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1.5" />
      <circle cx="48" cy="20" r="4.5" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1.5" />
      <circle cx="64" cy="24" r="3" fill="#FFFFFF" stroke="#1E1E24" strokeWidth="1.5" />
      <circle cx="50" cy="46" r="13" fill="#FFE0B2" stroke="#1E1E24" strokeWidth="2.5" />
      <path d="M40 42C44 34 58 34 62 42C58 46 54 44 50 44C46 44 42 46 40 42Z" fill="#1E1E24" />
      {/* Green/Cyan Robe */}
      <path d="M22 84C24 64 36 60 50 60C64 60 76 64 78 84H22Z" fill="#2DD4BF" stroke="#1E1E24" strokeWidth="2.5" />
    </svg>
  );
};

// Topic Thumbnails (For the module cards on the home screen)
export const TopicThumbnail: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden"
      style={{ backgroundColor: `${color}18` }}
    >
      <div
        className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full opacity-30"
        style={{ backgroundColor: color }}
      />
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg"
        style={{ backgroundColor: color, color: '#1E1E24' }}
      >
        {type === 'VOL-01' ? '🔢' : type === 'VOL-02' ? '📐' : type === 'VOL-03' ? '📈' : type === 'VOL-04' ? '🔶' : '🔺'}
      </div>
    </div>
  );
};
