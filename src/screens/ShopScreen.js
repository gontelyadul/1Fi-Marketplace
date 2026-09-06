import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MarketplaceListScreen from './MarketplaceListScreen';
import { colors, spacing, typography } from '../theme/colors';

const TABS = ['Top Brands', 'Nearby Stores', '1Fi Marketplace'];

export default function ShopScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('1Fi Marketplace');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Shop</Text>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {activeTab === 'Top Brands' && <BlankTab label="Top Brands" />}
        {activeTab === 'Nearby Stores' && <BlankTab label="Nearby Stores" />}
        {activeTab === '1Fi Marketplace' && (
          <MarketplaceListScreen navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
}

// Placeholder per assignment spec — "no implementation required, can remain blank"
function BlankTab({ label }) {
  return (
    <View style={styles.blank}>
      <Text style={styles.blankText}>{label} — coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { ...typography.h1, color: colors.textPrimary, padding: spacing.md },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
  },
  tab: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tabText: { ...typography.body, color: colors.textSecondary },
  tabTextActive: { color: colors.primary, fontWeight: '700' },
  content: { flex: 1 },
  blank: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  blankText: { ...typography.body, color: colors.textSecondary },
});
