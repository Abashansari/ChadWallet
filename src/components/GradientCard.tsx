import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { RADIUS, SPACING } from '../constants/colors';

interface GradientCardProps {
  children: ReactNode;
  colors?: [string, string];
  style?: StyleProp<ViewStyle>;
  padding?: number;
}

export default function GradientCard({
  children,
  colors: customColors,
  style,
  padding = SPACING.lg,
}: GradientCardProps) {
  const { colors: themeColors, mode } = useTheme();

  const defaultColors: [string, string] =
    mode === 'dark' ? ['#1A1A2E', '#14141E'] : ['#FFFFFF', '#F0F0F5'];

  return (
    <LinearGradient
      colors={customColors || defaultColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        {
          padding,
          borderColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
