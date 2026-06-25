import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';
import { Tool } from '../types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ToolCardProps {
  tool: Tool;
  onPress?: (tool: Tool) => void;
}

export default function ToolCard({ tool, onPress }: ToolCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[animatedStyle, styles.container]}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }}
      onPress={() => onPress?.(tool)}
    >
      <LinearGradient
        colors={[tool.gradient[0] + '20', tool.gradient[1] + '08']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { borderColor: tool.gradient[0] + '30' }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: tool.gradient[0] + '25' }]}>
            <Text style={styles.icon}>{tool.icon}</Text>
          </View>
          {tool.score && (
            <View style={[styles.scoreBadge, { backgroundColor: tool.gradient[0] + '25' }]}>
              <Text style={[styles.scoreText, { color: tool.gradient[0] }]}>
                {tool.score}/100
              </Text>
            </View>
          )}
        </View>

        {/* Title & Description */}
        <Text style={[styles.name, { color: colors.textPrimary }]}>
          {tool.name}
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {tool.description}
        </Text>

        {/* Status */}
        {tool.status && (
          <View style={[styles.statusRow, { borderTopColor: colors.border }]}>
            <Text style={[styles.statusLabel, { color: colors.textTertiary }]}>
              Status
            </Text>
            <Text style={[styles.statusValue, { color: tool.gradient[0] }]}>
              {tool.status}
            </Text>
          </View>
        )}

        {/* Insights Preview */}
        <View style={styles.insightsPreview}>
          {tool.insights.slice(0, 3).map((insight, i) => (
            <View key={i} style={[styles.insightRow, { borderTopColor: colors.border }]}>
              <Text style={[styles.insightLabel, { color: colors.textSecondary }]}>
                {insight.label}
              </Text>
              <Text
                style={[
                  styles.insightValue,
                  {
                    color:
                      insight.trend === 'up'
                        ? colors.positive
                        : insight.trend === 'down'
                        ? colors.negative
                        : colors.textPrimary,
                  },
                ]}
              >
                {insight.value}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  gradient: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  scoreBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  scoreText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  name: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 0.5,
    marginBottom: SPACING.sm,
  },
  statusLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  insightsPreview: {
    marginTop: SPACING.xs,
  },
  insightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderTopWidth: 0.5,
  },
  insightLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '400',
  },
  insightValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});
