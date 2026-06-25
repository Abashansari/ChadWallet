import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList } from '../types';
import { formatPrice, formatMarketCap, formatChange } from '../mocks/tokens';
import { mockRecentTrades } from '../mocks/user';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';

// Components
import PriceChart from '../components/PriceChart';
import ChartTabs from '../components/ChartTabs';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import GradientCard from '../components/GradientCard';

type TokenDetailRouteProp = RouteProp<RootStackParamList, 'TokenDetail'>;

export default function TokenDetailScreen() {
  const route = useRoute<TokenDetailRouteProp>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { token } = route.params;

  const isPositive = token.change24h >= 0;
  const changeColor = isPositive ? colors.positive : colors.negative;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
        <Pressable
          style={[styles.backButton, { backgroundColor: colors.surfaceElevated }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {token.name}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Token Info Section */}
        <View style={styles.tokenInfoSection}>
          <View style={styles.tokenHeaderRow}>
            <View style={[styles.logoContainer, { backgroundColor: token.logoColor + '20' }]}>
              <Text style={styles.logoEmoji}>{token.logoEmoji}</Text>
            </View>
            <View>
              <Text style={[styles.priceText, { color: colors.textPrimary }]}>
                {formatPrice(token.price)}
              </Text>
              <Text style={[styles.changeText, { color: changeColor }]}>
                {formatChange(token.change24h)}
              </Text>
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <ChartTabs />
          <View style={styles.chartContainer}>
            <PriceChart data={token.sparkline} color={changeColor} height={220} />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Pressable
            style={[styles.actionButton, { backgroundColor: colors.positive }]}
          >
            <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>Buy</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, { backgroundColor: colors.negative }]}
          >
            <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>Sell</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, { backgroundColor: colors.surfaceElevated }]}
          >
            <Text style={[styles.actionButtonText, { color: colors.textPrimary }]}>Swap</Text>
          </Pressable>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatCard label="Market Cap" value={formatMarketCap(token.marketCap)} compact />
              <View style={{ width: SPACING.md }} />
              <StatCard label="Volume 24h" value={formatMarketCap(token.volume)} compact />
            </View>
            <View style={{ height: SPACING.md }} />
            <View style={styles.statsRow}>
              <StatCard label="Liquidity" value={formatMarketCap(token.liquidity)} compact />
              <View style={{ width: SPACING.md }} />
              <StatCard label="Holders" value={token.holders.toLocaleString()} compact />
            </View>
          </View>
        </View>

        {/* Activity Feed */}
        <View style={styles.activitySection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Recent Activity</Text>
          {mockRecentTrades
            .filter((t) => t.tokenSymbol === token.symbol)
            .slice(0, 5)
            .map((trade) => (
              <ActivityItem key={trade.id} trade={trade} />
            ))}
          {mockRecentTrades.filter((t) => t.tokenSymbol === token.symbol).length === 0 && (
            <Text style={{ color: colors.textSecondary, padding: SPACING.md }}>
              No recent activity found.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
  headerRight: {
    width: 40,
  },
  tokenInfoSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  tokenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  logoEmoji: {
    fontSize: 28,
  },
  priceText: {
    fontSize: FONT_SIZE.hero,
    fontWeight: '800',
    letterSpacing: -1,
  },
  changeText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginTop: 4,
  },
  chartSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  chartContainer: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  actionSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  actionButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  statsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  statsGrid: {
    // handled by rows
  },
  statsRow: {
    flexDirection: 'row',
  },
  activitySection: {
    paddingHorizontal: SPACING.lg,
  },
});
