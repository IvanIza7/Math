import React from 'react';

export type MascotMood =
  | 'normal'
  | 'happy'
  | 'thinking'
  | 'celebration'
  | 'boss'
  | 'wizard'
  | 'cheering'
  | 'fighting';

interface MascotProps {
  mood?: MascotMood;
  className?: string;
  size?: number;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  className = '',
  size = 64,
}) => {
  const isBoss = mood === 'boss';

  return (
    <div className={`relative inline-flex items-center justify-center mascot-bounce ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md transition-transform duration-300"
      >
        {/* Soft Drop Shadow beneath */}
        <ellipse cx="50" cy="92" rx="32" ry="6" fill="#000000" fillOpacity="0.08" />

        {/* Mascot Main Body - Round Blob with Lemon Yellow #FEE041 or Purple in Boss Mode */}
        <path
          d="M20 50C20 30 32 16 50 16C68 16 80 30 80 50C80 72 68 84 50 84C32 84 20 72 20 50Z"
          fill={isBoss ? '#6C47FF' : '#FEE041'}
        />

        {/* Mascot Little Ears/Studs on top */}
        <rect x="34" y="10" width="10" height="10" rx="4" fill={isBoss ? '#5E35B1' : '#FEE041'} />
        <rect x="56" y="10" width="10" height="10" rx="4" fill={isBoss ? '#5E35B1' : '#FEE041'} />

        {/* Pink Cheeks #FFB7CE */}
        <ellipse cx="32" cy="58" rx="6" ry="4" fill={isBoss ? '#BAFF29' : '#FFB7CE'} />
        <ellipse cx="68" cy="58" rx="6" ry="4" fill={isBoss ? '#BAFF29' : '#FFB7CE'} />

        {/* Eyes according to Mood */}
        {mood === 'happy' || mood === 'cheering' || mood === 'celebration' ? (
          <>
            {/* Curved Happy Eyes */}
            <path d="M34 46C34 42 42 42 42 46" stroke="#2D3748" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M58 46C58 42 66 42 66 46" stroke="#2D3748" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : mood === 'thinking' ? (
          <>
            {/* Curious Big Eyes looking up */}
            <circle cx="38" cy="46" r="5" fill="#2D3748" />
            <circle cx="62" cy="46" r="5" fill="#2D3748" />
            <circle cx="39" cy="44" r="1.8" fill="#FFFFFF" />
            <circle cx="63" cy="44" r="1.8" fill="#FFFFFF" />
            {/* Thinking Hand / Eyebrow */}
            <path d="M32 38 Q38 35 44 38" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : mood === 'fighting' || mood === 'boss' ? (
          <>
            {/* Determined / Fierce Eyebrows and Eyes */}
            <path d="M32 40 L44 45" stroke={isBoss ? '#BAFF29' : '#2D3748'} strokeWidth="3" strokeLinecap="round" />
            <path d="M68 40 L56 45" stroke={isBoss ? '#BAFF29' : '#2D3748'} strokeWidth="3" strokeLinecap="round" />
            <circle cx="38" cy="48" r="4" fill={isBoss ? '#FFFFFF' : '#2D3748'} />
            <circle cx="62" cy="48" r="4" fill={isBoss ? '#FFFFFF' : '#2D3748'} />
          </>
        ) : (
          <>
            {/* Standard / Normal Round Eyes */}
            <circle cx="38" cy="48" r="4.5" fill="#2D3748" />
            <circle cx="62" cy="48" r="4.5" fill="#2D3748" />
            <circle cx="39.5" cy="46.5" r="1.5" fill="#FFFFFF" />
            <circle cx="63.5" cy="46.5" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* Mouth */}
        {mood === 'happy' || mood === 'cheering' || mood === 'celebration' ? (
          <path
            d="M44 58C44 63 56 63 56 58"
            stroke="#2D3748"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="#FF5A5A"
          />
        ) : mood === 'thinking' ? (
          <ellipse cx="50" cy="62" rx="4" ry="3" fill="#2D3748" />
        ) : mood === 'fighting' || mood === 'boss' ? (
          <path d="M42 62 Q50 56 58 62" stroke={isBoss ? '#BAFF29' : '#2D3748'} strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : (
          <path
            d="M45 58 Q50 64 55 58"
            stroke="#2D3748"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Optional Wizard Hat */}
        {mood === 'wizard' && (
          <g transform="translate(26, -2)">
            <path d="M24 20 L38 2 L10 20 Z" fill="#6C47FF" />
            <ellipse cx="24" cy="20" rx="18" ry="4" fill="#5E35B1" />
            <polygon points="24,8 26,13 31,13 27,16 29,21 24,18 19,21 21,16 17,13 22,13" fill="#BAFF29" transform="scale(0.5) translate(24, 5)" />
          </g>
        )}

        {/* Star Sparkles for Cheering / Celebration */}
        {(mood === 'cheering' || mood === 'celebration') && (
          <g transform="translate(72, 28) scale(0.6)">
            <polygon points="10,0 13,7 20,8 15,13 16,20 10,16 4,20 5,13 0,8 7,7" fill="#BAFF29" />
          </g>
        )}
      </svg>
    </div>
  );
};
