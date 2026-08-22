import { useState, useEffect } from 'react';

const STORAGE_KEY = 'math_magic_formulas';

export function useMagicFormulas() {
  const [magicFormulas, setMagicFormulas] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['signos', 'jerarquia']; // default selection
    } catch {
      return ['signos', 'jerarquia'];
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setMagicFormulas(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener('magic-formulas-updated', handleStorageChange);
    return () => window.removeEventListener('magic-formulas-updated', handleStorageChange);
  }, []);

  const toggleFormula = (id: string) => {
    const newFormulas = magicFormulas.includes(id)
      ? magicFormulas.filter(f => f !== id)
      : [...magicFormulas, id];
    
    setMagicFormulas(newFormulas);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFormulas));
    window.dispatchEvent(new Event('magic-formulas-updated'));
  };

  return { magicFormulas, toggleFormula };
}
