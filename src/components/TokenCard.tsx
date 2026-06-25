import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';
import { Token } from '../types';
import { formatPrice, formatMarketCap } from '../mocks/tokens';
import SparklineChart from './SparklineChart';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TokenCardProps {
  token: Token;
  onPress: (token: Token) => void;
  index?: number;
}

export default function TokenCard({ token, onPress, index = 0 }: TokenCardProps) {
  const { colors } = useTheme();
  const scale = React.useRef(new Animated.Value(1)).current;

  const isPositive = token.change24h >= 0;
  const changeColor = isPositive ? colors.positive : colors.negative;
  const changeText = isPositive
    ? `▲ ${token.change24h.toFixed(2)}%`
    : `▼ ${Math.abs(token.change24h).toFixed(2)}%`;

  return (
    <AnimatedPressable
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          transform: [{ scale }],
        },
      ]}
      onPressIn={() => {
        Animated.spring(scale, {
          toValue: 0.97,
          friction: 5,
          tension: 300,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          tension: 300,
          useNativeDriver: true,
        }).start();
      }}
      onPress={() => onPress(token)}
    >
      {/* Token Logo */}
      <View style={[styles.logoContainer, { backgroundColor: token.logoColor + '20' }]}>
        <Text style={styles.logoEmoji}>{token.logoEmoji}</Text>
      </View>

      {/* Token Info */}
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
          {token.name}
        </Text>
        <Text style={[styles.symbol, { color: colors.textSecondary }]}>
          {token.symbol}
        </Text>
      </View>

      {/* Sparkline */}
      <View style={styles.chartContainer}>
        <SparklineChart
          data={token.sparkline}
          color={changeColor}
          width={70}
          height={28}
        />
      </View>

      {/* Price & Change */}
      <View style={styles.priceContainer}>
        <Text style={[styles.marketCap, { color: colors.textPrimary }]}>
          {formatMarketCap(token.marketCap)}
        </Text>
        <Text style={[styles.change, { color: changeColor }]}>
          {changeText}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 0.5,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  logoEmoji: {
    fontSize: 22,
  },
  infoContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  name: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  symbol: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '400',
  },
  chartContainer: {
    marginRight: SPACING.md,
  },
  priceContainer: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  marketCap: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  change: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});
