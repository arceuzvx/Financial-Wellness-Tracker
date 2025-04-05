import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle-button"
      aria-label="Toggle theme"
    >
      {theme === 'light' && <span role="img" aria-label="sun">☀️</span>}
      {theme === 'dark' && <span role="img" aria-label="moon">🌙</span>}
      {theme === 'system' && <span role="img" aria-label="computer">💻</span>}
    </button>
  );
};