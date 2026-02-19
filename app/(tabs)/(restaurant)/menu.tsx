// app/(tabs)/(restaurant)/menu.tsx
import { AppHeader } from '@/components/AppHeader';
import { useRestaurant } from '@/app/features/restaurant/hooks/useRestaurant';
import { MealCard } from '@/app/features/restaurant/components/MealCard';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function RestaurantMenuScreen() {
  const { meals, addToCart } = useRestaurant();

  const keyExtractor = useCallback(
    (item: (typeof meals)[number]) => item.id,
    [meals],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof meals)[number] }) => (
      <MealCard meal={item} onAddToCart={() => addToCart(item.id)} />
    ),
    [addToCart],
  );

  return (
    <View style={styles.page}>
      <AppHeader title="Menu" />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={meals}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000', // fond sombre comme la maquette
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
});

