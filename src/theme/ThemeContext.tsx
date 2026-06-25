import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemeColors } from '../types';
import { darkTheme, lightTheme } from '../constants/colors';

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  colors: darkTheme,
  toggleTheme: () => {},
  setTheme: () => {},
  isDark: true,
});

const THEME_KEY = '@chadwallet_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        setMode(saved);
      }
    } catch (e) {
      // Default to dark
    }
  };

  const toggleTheme = async () => {
    const newMode: ThemeMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    try {
      await AsyncStorage.setItem(THEME_KEY, newMode);
    } catch (e) {
      // Silently fail
    }
  };

  const setThemeMode = async (newMode: ThemeMode) => {
    setMode(newMode);
    try {
      await AsyncStorage.setItem(THEME_KEY, newMode);
    } catch (e) {
      // Silently fail
    }
  };

  const colors = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        colors,
        toggleTheme,
        setTheme: setThemeMode,
        isDark: mode === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
