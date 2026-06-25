import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  compact?: boolean;
}

export default function StatCard({ label, value, icon, trend, compact = false }: StatCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const trendColor = trend === 'up'
    ? colors.positive
    : trend === 'down'
    ? colors.negative
    : colors.textSecondary;

  return (
    <AnimatedPressable
      style={[
        animatedStyle,
        compact ? styles.compactContainer : styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: trendColor }]} numberOfLines={1}>
        {value}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    minWidth: 100,
  },
  compactContainer: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  icon: {
    fontSize: 20,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '500',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
});
