import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmiPlanCard from '../components/EmiPlanCard';
import { LoadingView, ErrorView } from '../components/StateView';
import { useAsync } from '../hooks/useAsync';
import { fetchProductById, fetchEmiPlansForProduct, calculateEmiAmount } from '../api/marketplaceApi';
import { colors, spacing, radius, typography } from '../theme/colors';

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;

  const {
    data: product,
    status: productStatus,
    error: productError,
    retry: retryProduct,
  } = useAsync(() => fetchProductById(productId), [productId]);

  const {
    data: plans,
    status: plansStatus,
    error: plansError,
    retry: retryPlans,
  } = useAsync(() => fetchEmiPlansForProduct(productId), [productId]);

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  // Set sensible defaults once data arrives
  React.useEffect(() => {
    if (product && !selectedVariantId) setSelectedVariantId(product.variants[0]?.id);
  }, [product]);

  const selectedVariant = product?.variants.find((v) => v.id === selectedVariantId);
  const totalPrice = product ? product.basePrice + (selectedVariant?.extraPrice || 0) : 0;

  const selectedPlan = plans?.find((p) => p.id === selectedPlanId);

  const handleProceed = () => {
    if (!selectedPlan) {
      Alert.alert('Select a plan', 'Please choose an EMI plan to continue.');
      return;
    }
    Alert.alert(
      'Proceeding',
      `${product.name} (${selectedVariant.label})\n${selectedPlan.tenureMonths}-month plan selected.`
    );
    // In a real app: navigate to a checkout/confirmation flow here.
  };

  if (productStatus === 'loading') return <LoadingView label="Loading product..." />;
  if (productStatus === 'error') {
    return <ErrorView message={productError} onRetry={retryProduct} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.section}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹{totalPrice.toLocaleString('en-IN')}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {product.variants.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Variant</Text>
            <View style={styles.variantRow}>
              {product.variants.map((variant) => (
                <TouchableOpacity
                  key={variant.id}
                  style={[
                    styles.variantChip,
                    selectedVariantId === variant.id && styles.variantChipSelected,
                  ]}
                  onPress={() => setSelectedVariantId(variant.id)}
                >
                  <Text
                    style={[
                      styles.variantText,
                      selectedVariantId === variant.id && styles.variantTextSelected,
                    ]}
                  >
                    {variant.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose an EMI plan</Text>

          {plansStatus === 'loading' && <LoadingView label="Loading EMI options..." />}
          {plansStatus === 'error' && <ErrorView message={plansError} onRetry={retryPlans} />}
          {plansStatus === 'success' &&
            plans.map((plan) => (
              <EmiPlanCard
                key={plan.id}
                plan={plan}
                monthlyAmount={calculateEmiAmount(totalPrice, plan)}
                selected={selectedPlanId === plan.id}
                onSelect={() => setSelectedPlanId(plan.id)}
              />
            ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cta} onPress={handleProceed} activeOpacity={0.8}>
          <Text style={styles.ctaText}>Proceed with selected plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing.xl },
  image: { width: '100%', height: 280, backgroundColor: colors.surface },
  section: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  name: { ...typography.h1, color: colors.textPrimary },
  price: { ...typography.h2, color: colors.textPrimary, marginTop: spacing.xs },
  description: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  sectionTitle: { ...typography.h2, color: colors.textPrimary, marginBottom: spacing.sm },
  variantRow: { flexDirection: 'row', flexWrap: 'wrap' },
  variantChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  variantChipSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  variantText: { ...typography.body, color: colors.textPrimary },
  variantTextSelected: { color: colors.primary, fontWeight: '600' },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
