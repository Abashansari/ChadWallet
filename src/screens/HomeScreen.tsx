import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { RootStackParamList, Token } from '../types';
import { mockTokens } from '../mocks/tokens';
import { SPACING, FONT_SIZE } from '../constants/colors';

// Components
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import TokenCard from '../components/TokenCard';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const CATEGORIES = [
  { id: 'trending', label: '📈 Trending' },
  { id: 'new', label: '🌱 New' },
  { id: 'soon', label: '🚀 Soon' },
  { id: 'graduated', label: '🎓 Graduated' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('trending');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleTokenPress = (token: Token) => {
    navigation.navigate('TokenDetail', { token });
  };

  const filteredTokens = mockTokens.filter(t => t.category === activeCategory);

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <BalanceCard />
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => {
            const isActive = activeCategory === item.id;
            return (
              <Pressable
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isActive ? colors.surfaceElevated : 'transparent',
                    borderColor: isActive ? colors.border : 'transparent',
                  },
                ]}
                onPress={() => setActiveCategory(item.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: isActive ? colors.textPrimary : colors.textSecondary,
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      
      <FlatList
        data={filteredTokens}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TokenCard token={item} index={index} onPress={handleTokenPress} />
        )}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    paddingTop: SPACING.md,
  },
  categoriesContainer: {
    marginBottom: SPACING.md,
  },
  categoriesList: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  categoryPill: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: FONT_SIZE.sm,
  },
});
