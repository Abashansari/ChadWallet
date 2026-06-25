import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE, GRADIENTS } from '../constants/colors';

export default function BalanceCard() {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#1A1A2E', '#0F2027']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.label}>Total Balance</Text>
            <Text style={styles.balance}>$24,567.89</Text>
          </View>
          <View style={[styles.changeBadge, { backgroundColor: 'rgba(0, 214, 143, 0.15)' }]}>
            <Text style={[styles.changeText, { color: '#00D68F' }]}>
              +3.42%
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>24h P&L</Text>
            <Text style={[styles.statValue, { color: '#00D68F' }]}>+$842.30</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Holdings</Text>
            <Text style={styles.statValue}>6 tokens</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>SOL</Text>
            <Text style={styles.statValue}>12.45</Text>
          </View>
        </View>

        {/* Decorative elements */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  container: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
    marginBottom: 4,
  },
  balance: {
    fontSize: FONT_SIZE.hero,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  changeBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  changeText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: SPACING.lg,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: FONT_SIZE.md,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  decorCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 214, 143, 0.06)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(78, 154, 241, 0.04)',
  },
});
