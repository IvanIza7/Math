import React from 'react';

export interface MathFractionProps {
  num: React.ReactNode;
  den: React.ReactNode;
  whole?: React.ReactNode;
  sign?: '+' | '-' | '±' | '=' | '×' | '÷' | '' | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  numClassName?: string;
  denClassName?: string;
  lineClassName?: string;
  highlight?: boolean;
}

export const MathFraction: React.FC<MathFractionProps> = ({
  num,
  den,
  whole,
  sign = '',
  size = 'md',
  className = '',
  numClassName = '',
  denClassName = '',
  lineClassName = '',
  highlight = false,
}) => {
  const sizeStyles = {
    xs: {
      text: 'text-[11px]',
      padding: 'px-1 py-0.2',
      border: 'border-b',
      wholeText: 'text-xs mr-1',
      signText: 'text-[11px] mr-1',
    },
    sm: {
      text: 'text-xs',
      padding: 'px-1.5 py-0.5',
      border: 'border-b-[1.5px]',
      wholeText: 'text-sm mr-1.5 font-black',
      signText: 'text-xs mr-1 font-bold',
    },
    md: {
      text: 'text-sm',
      padding: 'px-2 py-0.5',
      border: 'border-b-2',
      wholeText: 'text-base mr-2 font-black',
      signText: 'text-sm mr-1.5 font-black',
    },
    lg: {
      text: 'text-base font-bold',
      padding: 'px-2.5 py-0.5',
      border: 'border-b-2',
      wholeText: 'text-xl mr-2 font-black',
      signText: 'text-base mr-2 font-black',
    },
    xl: {
      text: 'text-xl font-black',
      padding: 'px-3 py-1',
      border: 'border-b-[2.5px]',
      wholeText: 'text-2xl mr-2.5 font-black',
      signText: 'text-xl mr-2 font-black',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  return (
    <span
      className={`inline-flex items-center align-middle font-mono select-none leading-none ${currentSize.text} ${
        highlight ? 'bg-amber-100/80 px-2 py-1 rounded-xl border border-amber-300' : ''
      } ${className}`}
    >
      {/* Sign if present */}
      {sign && <span className={`${currentSize.signText} font-bold text-inherit`}>{sign}</span>}

      {/* Whole number part for mixed fractions (e.g. 2 1/3) */}
      {whole !== undefined && whole !== null && whole !== '' && (
        <span className={`${currentSize.wholeText} text-inherit`}>{whole}</span>
      )}

      {/* Vertical Stacking: Numerator over Denominator */}
      <span className="inline-flex flex-col items-center justify-center text-center">
        <span
          className={`w-full text-center ${currentSize.border} border-current ${currentSize.padding} ${numClassName}`}
        >
          {num}
        </span>
        <span className={`w-full text-center ${currentSize.padding} ${denClassName}`}>
          {den}
        </span>
      </span>
    </span>
  );
};

// Also export as VerticalFraction for backward compatibility
export const VerticalFraction = MathFraction;
