import { ThemeColors } from '../types';

export const darkTheme: ThemeColors = {
  background: '#0A0A0F',
  surface: '#12121A',
  surfaceElevated: '#1A1A2E',
  primary: '#FFFFFF',
  accent: '#4E9AF1',
  positive: '#00D68F',
  negative: '#FF4757',
  gold: '#FFD700',
  textPrimary: '#FFFFFF',
  textSecondary: '#8E8E9A',
  textTertiary: '#5A5A6E',
  border: '#1F1F2E',
  card: '#14141E',
  tabBar: '#0E0E16',
  tabBarActive: '#00D68F',
  tabBarInactive: '#5A5A6E',
  overlay: 'rgba(0, 0, 0, 0.7)',
  inputBackground: '#1A1A2E',
};

export const lightTheme: ThemeColors = {
  background: '#F5F5FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  primary: '#0A0A0F',
  accent: '#4E9AF1',
  positive: '#00C07B',
  negative: '#E74050',
  gold: '#F5A623',
  textPrimary: '#0A0A0F',
  textSecondary: '#6B6B7B',
  textTertiary: '#9E9EB0',
  border: '#E8E8F0',
  card: '#FFFFFF',
  tabBar: '#FFFFFF',
  tabBarActive: '#00C07B',
  tabBarInactive: '#9E9EB0',
  overlay: 'rgba(0, 0, 0, 0.4)',
  inputBackground: '#F0F0F5',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  hero: 36,
} as const;

export const GRADIENTS = {
  primary: ['#00D68F', '#00B377'] as [string, string],
  accent: ['#4E9AF1', '#3B7FD9'] as [string, string],
  gold: ['#FFD700', '#F5A623'] as [string, string],
  negative: ['#FF4757', '#E03545'] as [string, string],
  dark: ['#1A1A2E', '#0A0A0F'] as [string, string],
  card: ['#14141E', '#1A1A2E'] as [string, string],
  hero: ['#00D68F', '#4E9AF1'] as [string, string],
  purple: ['#8B5CF6', '#6D28D9'] as [string, string],
  sunset: ['#F97316', '#EF4444'] as [string, string],
};
