import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';

const TABS = ['1H', '4H', '24H', '7D', '30D'];

interface ChartTabsProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

export default function ChartTabs({ onTabChange, activeTab: controlledTab }: ChartTabsProps) {
  const { colors } = useTheme();
  const [internalTab, setInternalTab] = useState('24H');
  const activeTab = controlledTab || internalTab;

  const handlePress = (tab: string) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <Pressable
            key={tab}
            style={[
              styles.tab,
              isActive && { backgroundColor: colors.positive + '20' },
            ]}
            onPress={() => handlePress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: isActive ? colors.positive : colors.textSecondary },
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: RADIUS.lg,
    padding: SPACING.xs,
    gap: SPACING.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  tabText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});
