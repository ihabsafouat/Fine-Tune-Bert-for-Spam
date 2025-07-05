import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const icon =
    theme === 'light' ? <Sun className="w-5 h-5" /> :
    theme === 'dark' ? <Moon className="w-5 h-5" /> :
    <Monitor className="w-5 h-5" />;

  const label =
    theme === 'light' ? 'Light' :
    theme === 'dark' ? 'Dark' :
    'System';

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      title="Toggle theme"
      type="button"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}; 