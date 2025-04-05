import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SafeIcon } from '../utils/iconHelper';

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
      {theme === 'light' && <span className="theme-icon">☀️</span>}
      {theme === 'dark' && <span className="theme-icon">🌙</span>}
      {theme === 'system' && <span className="theme-icon">🖥️</span>}
    </button>
  );
};