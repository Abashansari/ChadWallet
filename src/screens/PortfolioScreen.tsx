import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { mockHoldings, portfolioValue, todayPL, weeklyPL, monthlyPL, mockActivities } from '../mocks/portfolio';
import { formatPrice } from '../mocks/tokens';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';

// Components
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import FloatingWalletButton from '../components/FloatingWalletButton';
import WalletModal from '../components/WalletModal';
import { fullWalletAddress } from '../mocks/user';

export default function PortfolioScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [walletModalVisible, setWalletModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Total Value */}
        <View style={styles.headerSection}>
          <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>
            Total Balance
          </Text>
          <Text style={[styles.balanceValue, { color: colors.textPrimary }]}>
            {formatPrice(portfolioValue)}
          </Text>
        </View>

        {/* P&L Cards */}
        <View style={styles.plSection}>
          <StatCard
            label="Today's P&L"
            value={`+${formatPrice(todayPL)}`}
            trend="up"
            compact
          />
          <View style={{ width: SPACING.md }} />
          <StatCard
            label="Weekly P&L"
            value={`+${formatPrice(weeklyPL)}`}
            trend="up"
            compact
          />
          <View style={{ width: SPACING.md }} />
          <StatCard
            label="Monthly"
            value={`+${formatPrice(monthlyPL)}`}
            trend="up"
            compact
          />
        </View>

        {/* Holdings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Your Holdings
          </Text>
          {mockHoldings.map((holding, index) => (
            <View
              key={holding.token.id}
              style={[
                styles.holdingItem,
                { borderBottomColor: colors.border },
                index === mockHoldings.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <View style={[styles.logoContainer, { backgroundColor: holding.token.logoColor + '20' }]}>
                <Text style={styles.logoEmoji}>{holding.token.logoEmoji}</Text>
              </View>
              <View style={styles.holdingInfo}>
                <Text style={[styles.holdingName, { color: colors.textPrimary }]} numberOfLines={1}>
                  {holding.token.name}
                </Text>
                <Text style={[styles.holdingQuantity, { color: colors.textSecondary }]}>
                  {holding.quantity.toLocaleString()} {holding.token.symbol}
                </Text>
              </View>
              <View style={styles.holdingValueContainer}>
                <Text style={[styles.holdingValue, { color: colors.textPrimary }]}>
                  {formatPrice(holding.currentValue)}
                </Text>
                <Text
                  style={[
                    styles.holdingGainLoss,
                    { color: holding.gainLoss >= 0 ? colors.positive : colors.negative },
                  ]}
                >
                  {holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Recent Activity
          </Text>
          {mockActivities.slice(0, 5).map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingWalletButton onPress={() => setWalletModalVisible(true)} />

      {/* Wallet Modal */}
      <WalletModal
        visible={walletModalVisible}
        onClose={() => setWalletModalVisible(false)}
        walletAddress={fullWalletAddress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  balanceLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  balanceValue: {
    fontSize: FONT_SIZE.hero,
    fontWeight: '800',
    letterSpacing: -1,
  },
  plSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxxl,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  holdingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
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
  holdingInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  holdingName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  holdingQuantity: {
    fontSize: FONT_SIZE.sm,
  },
  holdingValueContainer: {
    alignItems: 'flex-end',
  },
  holdingValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  holdingGainLoss: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});
