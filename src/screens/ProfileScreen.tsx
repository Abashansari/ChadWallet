import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { mockUser } from '../mocks/user';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  isDestructive?: boolean;
  onPress?: () => void;
  showChevron?: boolean;
  rightElement?: React.ReactNode;
}

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const SettingItem = ({
    icon,
    label,
    value,
    isDestructive,
    onPress,
    showChevron = true,
    rightElement,
  }: SettingItemProps) => (
    <Pressable
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.settingIconContainer, { backgroundColor: isDestructive ? colors.negative + '15' : colors.surfaceElevated }]}>
        <Ionicons
          name={icon}
          size={20}
          color={isDestructive ? colors.negative : colors.textPrimary}
        />
      </View>
      <View style={styles.settingContent}>
        <Text
          style={[
            styles.settingLabel,
            { color: isDestructive ? colors.negative : colors.textPrimary },
          ]}
        >
          {label}
        </Text>
        {value && <Text style={[styles.settingValue, { color: colors.textSecondary }]}>{value}</Text>}
      </View>
      {rightElement ? (
        rightElement
      ) : showChevron ? (
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      ) : null}
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + SPACING.lg }]}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceElevated }]}>
            <Text style={styles.avatarEmoji}>{mockUser.profileEmoji}</Text>
          </View>
          <Text style={[styles.username, { color: colors.textPrimary }]}>{mockUser.username}</Text>
          <Text style={[styles.walletAddress, { color: colors.textSecondary }]}>
            {mockUser.walletAddress}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={[styles.statBox, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {mockUser.totalTrades}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Trades</Text>
          </View>
          <View style={{ width: SPACING.md }} />
          <View style={[styles.statBox, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {mockUser.joinDate.split(' ')[1]}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Joined</Text>
          </View>
        </View>

        {/* Settings Groups */}
        <View style={styles.settingsGroup}>
          <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>PREFERENCES</Text>
          <View style={[styles.groupContainer, { backgroundColor: colors.surface }]}>
            <SettingItem
              icon={isDark ? "moon" : "sunny"}
              label="Dark Mode"
              showChevron={false}
              rightElement={
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: colors.border, true: colors.accent }}
                  thumbColor="#FFFFFF"
                />
              }
            />
            <SettingItem icon="notifications" label="Notifications" />
            <SettingItem icon="globe" label="Language" value="English" />
            <SettingItem icon="wallet" label="Default Currency" value="USD" />
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>SECURITY</Text>
          <View style={[styles.groupContainer, { backgroundColor: colors.surface }]}>
            <SettingItem icon="lock-closed" label="App Lock" value="Face ID" />
            <SettingItem icon="key" label="Recovery Phrase" />
            <SettingItem icon="shield-checkmark" label="Connected Apps" />
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>OTHER</Text>
          <View style={[styles.groupContainer, { backgroundColor: colors.surface }]}>
            <SettingItem icon="help-circle" label="Help Center" />
            <SettingItem icon="document-text" label="Terms of Service" />
            <SettingItem
              icon="log-out"
              label="Log Out"
              isDestructive
              showChevron={false}
              onPress={() => console.log('Logout')}
            />
          </View>
        </View>
        
        <Text style={[styles.versionText, { color: colors.textTertiary }]}>
          ChadWallet v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  username: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    marginBottom: 4,
  },
  walletAddress: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'monospace',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxxl,
  },
  statBox: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
  },
  settingsGroup: {
    marginBottom: SPACING.xl,
  },
  groupTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.sm,
    letterSpacing: 1,
  },
  groupContainer: {
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
  versionText: {
    textAlign: 'center',
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.md,
    marginBottom: SPACING.xxxl,
  },
});
