import { AppHeader } from '@/components/AppHeader';
import { OrderCard } from '@/app/features/restaurant/components/OrderCard';
import { useRestaurant } from '@/app/features/restaurant/hooks/useRestaurant';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function RestaurantOrdersScreen() {
  const { orders, meals } = useRestaurant();

  const keyExtractor = useCallback(
    (order: (typeof orders)[number]) => order.id,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof orders)[number] }) => (
      <OrderCard order={item} meals={meals} />
    ),
    [meals],
  );

  return (
    <View style={styles.page}>
      <AppHeader title="Commandes" />
      <FlatList
        contentContainerStyle={styles.content}
        data={orders}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune commande pour l’instant.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 16,
  },
  empty: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
  },
});