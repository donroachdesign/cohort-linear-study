'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme, setTheme } from '@/lib/theme';

export function ThemeToggle() {
  const theme = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="cursor-pointer rounded-control p-1.5 text-text-secondary hover:bg-surface hover:text-text-primary"
    >
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
