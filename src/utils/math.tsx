import React from 'react';
import katex from 'katex';

interface MathViewProps {
  latex: string;
  inline?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ latex, inline = false, className = '' }) => {
  const processedLatex = React.useMemo(() => {
    if (!latex) return '';
    // Ensure fractions render vertically and prominently by replacing \frac with \dfrac where appropriate
    return latex.replace(/\\frac(?=\{)/g, '\\dfrac');
  }, [latex]);

  const html = React.useMemo(() => {
    try {
      return katex.renderToString(processedLatex, {
        displayMode: !inline,
        throwOnError: false,
      });
    } catch {
      return null;
    }
  }, [processedLatex, inline]);

  if (!html) {
    return <span className={`font-mono ${className}`}>{latex}</span>;
  }

  return (
    <span
      className={`inline-block align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

