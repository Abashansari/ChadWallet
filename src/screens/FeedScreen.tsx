import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { useTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';
import { FeedPost, RootStackParamList, TabParamList } from '../types';
import { initialFeeds, generateMockPosts } from '../mocks/feed';
import { mockTokens } from '../mocks/tokens';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Feed'>,
  NativeStackScreenProps<RootStackParamList>
>;

type TabKey = 'foryou' | 'radar' | 'surge' | 'kols';
const TABS: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'foryou', label: 'For you', icon: 'radio-button-on' },
  { key: 'radar', label: 'Radar', icon: 'pulse' },
  { key: 'surge', label: 'Surge', icon: 'flash' },
  { key: 'kols', label: 'KOLs', icon: 'people' },
];

export default function FeedScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [activeTab, setActiveTab] = useState<TabKey>('foryou');
  const [feeds, setFeeds] = useState(initialFeeds);
  const [refreshing, setRefreshing] = useState(false);

  const activeData = feeds[activeTab];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setFeeds(prev => ({
        ...prev,
        [activeTab]: generateMockPosts(50, activeTab),
      }));
      setRefreshing(false);
    }, 1500);
  }, [activeTab]);

  const onEndReached = useCallback(() => {
    setFeeds(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], ...generateMockPosts(20, activeTab)],
    }));
  }, [activeTab]);

  const handleCashtagPress = (symbol: string) => {
    const cleanSymbol = symbol.replace('$', '').toUpperCase();
    const token = mockTokens.find(t => t.symbol.toUpperCase() === cleanSymbol || t.symbol.toUpperCase() === `$${cleanSymbol}`);
    
    if (token) {
      navigation.navigate('TokenDetail', { token });
    }
  };

  const renderContentWithCashtags = (content: string, textColor: string, primaryColor: string) => {
    const words = content.split(/(\s+)/);
    return (
      <Text style={[styles.postContent, { color: textColor }]}>
        {words.map((word, index) => {
          if (word.startsWith('$') && word.length > 1) {
            return (
              <Text 
                key={index} 
                style={[styles.cashtag, { color: primaryColor }]}
                onPress={() => handleCashtagPress(word)}
              >
                {word}
              </Text>
            );
          }
          if (word.startsWith('@') && word.length > 1) {
            return (
              <Text key={index} style={[styles.cashtag, { color: primaryColor }]}>
                {word}
              </Text>
            );
          }
          return word;
        })}
      </Text>
    );
  };

  const renderItem = ({ item }: ListRenderItemInfo<FeedPost>) => (
    <View style={[styles.postCard, { borderBottomColor: colors.border }]}>
      <View style={styles.postHeader}>
        <View style={[styles.avatar, { backgroundColor: colors.surfaceElevated }]}>
          <Text style={styles.avatarEmoji}>{item.user.profileEmoji}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <View style={styles.nameRow}>
            <Text style={[styles.username, { color: colors.textPrimary }]}>{item.user.username}</Text>
            {item.user.verified && (
              <Ionicons name="checkmark-circle" size={14} color={colors.primary} style={styles.verifiedIcon} />
            )}
            <Text style={[styles.handle, { color: colors.textTertiary }]}>{item.user.handle}</Text>
            <Text style={[styles.dot, { color: colors.textTertiary }]}>·</Text>
            <Text style={[styles.timestamp, { color: colors.textTertiary }]}>
              {new Date(item.timestamp).getHours()}h
            </Text>
          </View>
        </View>
        <Pressable hitSlop={10}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textTertiary} />
        </Pressable>
      </View>

      <View style={styles.contentContainer}>
        {renderContentWithCashtags(item.content, colors.textPrimary, colors.primary)}
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={18} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.comments}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="repeat" size={18} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.reposts}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="heart-outline" size={18} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.likes}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="stats-chart-outline" size={18} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.views}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="share-outline" size={18} color={colors.textSecondary} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header Tabs */}
      <View style={[styles.tabContainer, { borderBottomColor: colors.border }]}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
            >
              <View style={styles.tabContent}>
                <Ionicons 
                  name={tab.icon} 
                  size={16} 
                  color={isActive ? colors.textPrimary : colors.textTertiary} 
                  style={{ marginRight: 6 }} 
                />
                <Text style={[
                  styles.tabText, 
                  { color: isActive ? colors.textPrimary : colors.textTertiary },
                  isActive && styles.tabTextActive
                ]}>
                  {tab.label}
                </Text>
              </View>
              {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </Pressable>
          );
        })}
      </View>

      {/* Feed List */}
      <View style={{ flex: 1, width: '100%' }}>
        <FlashList
          data={activeData}
          renderItem={renderItem}
          estimatedItemSize={150}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, SPACING.xl) }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -1,
    height: 3,
    width: 32,
    borderRadius: 3,
  },
  postCard: {
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 15,
    fontWeight: '700',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  handle: {
    fontSize: 14,
    marginLeft: 4,
  },
  dot: {
    marginHorizontal: 4,
    fontSize: 14,
  },
  timestamp: {
    fontSize: 14,
  },
  contentContainer: {
    marginLeft: 40 + SPACING.sm,
    marginBottom: SPACING.md,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
  },
  cashtag: {
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40 + SPACING.sm,
    paddingRight: SPACING.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    marginLeft: 6,
  },
});
