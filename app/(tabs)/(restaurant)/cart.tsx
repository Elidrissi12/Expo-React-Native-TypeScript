// app/(tabs)/(restaurant)/cart.tsx
import { AppHeader } from '@/components/AppHeader';
import { CartItemRow } from '@/app/features/restaurant/components/CartItemRow';
import { useRestaurant } from '@/app/features/restaurant/hooks/useRestaurant';
import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function RestaurantCartScreen() {
  const { cart, meals, cartTotal, updateQuantity, removeFromCart, placeOrder } =
    useRestaurant();

  const cartWithMeals = useMemo(
    () =>
      cart
        .map(item => ({
          item,
          meal: meals.find(m => m.id === item.mealId),
        }))
        .filter(entry => entry.meal != null) as {
        item: (typeof cart)[number];
        meal: (typeof meals)[number];
      }[],
    [cart, meals],
  );

  const keyExtractor = useCallback(
    (entry: { item: (typeof cart)[number]; meal: (typeof meals)[number] }) =>
      entry.item.mealId,
    [],
  );

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: { item: (typeof cart)[number]; meal: (typeof meals)[number] };
    }) => (
      <CartItemRow
        item={item.item}
        meal={item.meal}
        onIncrement={() => updateQuantity(item.item.mealId, item.item.quantity + 1)}
        onDecrement={() => updateQuantity(item.item.mealId, item.item.quantity - 1)}
        onRemove={() => removeFromCart(item.item.mealId)}
      />
    ),
    [removeFromCart, updateQuantity],
  );

  return (
    <View style={styles.page}>
      <AppHeader title="Panier" />
      <View style={styles.content}>
        <FlatList
          data={cartWithMeals}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>Votre panier est vide pour l’instant.</Text>
          }
        />
        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{cartTotal.toFixed(2)} €</Text>
        </View>
        <Pressable
          style={[styles.orderButton, cartTotal === 0 && styles.orderButtonDisabled]}
          onPress={placeOrder}
          disabled={cartTotal === 0}>
          <Text style={styles.orderText}>Passer la commande</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  empty: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 8,
  },
  totalLabel: {
    fontWeight: '500',
  },
  totalValue: {
    fontWeight: '700',
  },
  orderButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
  },
  orderButtonDisabled: {
    opacity: 0.5,
  },
  orderText: {
    color: '#fff',
    fontWeight: '600',
  },
});