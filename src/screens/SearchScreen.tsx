import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { mockTools } from '../mocks/tools';
import { SPACING, RADIUS, FONT_SIZE } from '../constants/colors';

// Components
import Header from '../components/Header';
import ToolCard from '../components/ToolCard';

export default function SearchScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: colors.surfaceElevated }]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search tokens, wallets, or tools..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </Pressable>
            )}
          </View>
        </View>

        {/* AI Tools Section */}
        <View style={styles.toolsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Chad AI Tools
            </Text>
            <View style={[styles.proBadge, { backgroundColor: colors.gold + '20' }]}>
              <Text style={[styles.proText, { color: colors.gold }]}>PRO</Text>
            </View>
          </View>
          
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Advanced analytics and on-chain intelligence
          </Text>

          {mockTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    height: 48,
    borderRadius: RADIUS.lg,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: SPACING.sm,
    fontSize: FONT_SIZE.md,
  },
  toolsSection: {
    paddingHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    marginRight: SPACING.sm,
  },
  proBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  proText: {
    fontSize: 10,
    fontWeight: '800',
  },
  sectionSubtitle: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.xl,
  },
});
