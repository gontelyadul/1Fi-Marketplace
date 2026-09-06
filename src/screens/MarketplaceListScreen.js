import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import { LoadingView, ErrorView, EmptyView } from '../components/StateView';
import { useAsync } from '../hooks/useAsync';
import { fetchProducts } from '../api/marketplaceApi';
import { spacing } from '../theme/colors';

export default function MarketplaceListScreen({ navigation }) {
  const { data: products, status, error, retry } = useAsync(fetchProducts, []);

  if (status === 'loading') return <LoadingView label="Loading marketplace..." />;
  if (status === 'error') return <ErrorView message={error} onRetry={retry} />;
  if (!products || products.length === 0) {
    return <EmptyView message="No products available right now." />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.sm },
});
