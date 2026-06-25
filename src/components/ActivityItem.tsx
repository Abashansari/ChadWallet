import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';
import { Activity, Trade } from '../types';

interface ActivityItemProps {
  activity?: Activity;
  trade?: Trade;
}

export default function ActivityItem({ activity, trade }: ActivityItemProps) {
  const { colors } = useTheme();

  if (trade) {
    const isBuy = trade.type === 'buy';
    const typeColor = isBuy ? colors.positive : colors.negative;
    const typeIcon = isBuy ? '🟢' : '🔴';
    const typeLabel = trade.type.toUpperCase();

    return (
      <View style={[styles.container, { borderBottomColor: colors.border }]}>
        <View style={[styles.iconContainer, { backgroundColor: typeColor + '15' }]}>
          <Text style={styles.icon}>{typeIcon}</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.description, { color: colors.textPrimary }]}>
            {typeLabel} {trade.tokenSymbol}
          </Text>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
            {trade.walletAddress} · {trade.timestamp}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: typeColor }]}>
            {isBuy ? '+' : '-'}{trade.amount.toLocaleString()}
          </Text>
          <Text style={[styles.total, { color: colors.textSecondary }]}>
            ${trade.total.toLocaleString()}
          </Text>
        </View>
      </View>
    );
  }

  if (activity) {
    const typeColors: Record<string, string> = {
      trade: colors.accent,
      deposit: colors.positive,
      withdrawal: colors.negative,
    };
    const typeIcons: Record<string, string> = {
      trade: '🔄',
      deposit: '📥',
      withdrawal: '📤',
    };
    const color = typeColors[activity.type] || colors.accent;
    const icon = typeIcons[activity.type] || '📋';

    return (
      <View style={[styles.container, { borderBottomColor: colors.border }]}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.description, { color: colors.textPrimary }]}>
            {activity.description}
          </Text>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
            {activity.timestamp}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: colors.textPrimary }]}>
            {activity.amount}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  activity.status === 'completed'
                    ? colors.positive + '15'
                    : activity.status === 'pending'
                    ? colors.gold + '15'
                    : colors.negative + '15',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    activity.status === 'completed'
                      ? colors.positive
                      : activity.status === 'pending'
                      ? colors.gold
                      : colors.negative,
                },
              ]}
            >
              {activity.status}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 0.5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: FONT_SIZE.sm,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  total: {
    fontSize: FONT_SIZE.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginTop: 2,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
