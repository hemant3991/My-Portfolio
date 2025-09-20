'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-5 w-5" />;
      case 'dark': return <Moon className="h-5 w-5" />;
      case 'system': return <Monitor className="h-5 w-5" />;
      default: return <Sun className="h-5 w-5" />;
    }
  };

  const getNextTheme = () => {
    switch (theme) {
      case 'light': return 'dark';
      case 'dark': return 'system';
      case 'system': return 'light';
      default: return 'light';
    }
  };

  const handleThemeChange = () => {
    setTheme(getNextTheme());
  };

  return (
    <motion.button
      onClick={handleThemeChange}
      className={`p-2 rounded-lg transition-all duration-300 interactive-card ${
        theme === 'light'
          ? 'bg-white/20 shadow-lg border border-white/30 text-gray-800 hover:bg-white/30'
          : 'glass hover:bg-white/10 text-muted-foreground hover:text-white'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${getNextTheme()} theme`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {getThemeIcon()}
      </motion.div>
    </motion.button>
  );
}
