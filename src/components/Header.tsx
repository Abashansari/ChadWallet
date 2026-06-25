import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE, GRADIENTS } from '../constants/colors';

interface HeaderProps {
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
}

export default function Header({ onNotificationPress, onSearchPress }: HeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.leftSection}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.greetingContainer}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Good evening
          </Text>
          <Text style={[styles.username, { color: colors.textPrimary }]}>
            ChadTrader 👋
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Pressable
          style={[styles.iconButton, { backgroundColor: colors.surfaceElevated }]}
          onPress={onSearchPress}
        >
          <Text style={styles.iconText}>🔍</Text>
        </Pressable>
        <Pressable
          style={[styles.iconButton, { backgroundColor: colors.surfaceElevated }]}
          onPress={onNotificationPress}
        >
          <Text style={styles.iconText}>🔔</Text>
          <View style={styles.notificationDot} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingTop: SPACING.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.lg,
    marginRight: SPACING.md,
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '400',
  },
  username: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4757',
  },
});
