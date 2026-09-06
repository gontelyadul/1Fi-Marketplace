import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radius, typography } from '../theme/colors';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>₹{product.basePrice.toLocaleString('en-IN')}</Text>
        <Text style={styles.emiHint}>EMI available</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    margin: spacing.xs,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 140, backgroundColor: colors.surface },
  info: { padding: spacing.sm },
  name: { ...typography.body, color: colors.textPrimary, marginBottom: spacing.xs },
  price: { ...typography.price, color: colors.textPrimary },
  emiHint: { ...typography.caption, color: colors.primary, marginTop: spacing.xs },
});
