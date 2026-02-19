// features/restaurant/components/CartItemRow.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CartItem, Meal } from '../types';

type Props = {
  item: CartItem;
  meal: Meal;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

export const CartItemRow = React.memo(function CartItemRow({
  item,
  meal,
  onIncrement,
  onDecrement,
  onRemove,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.subtitle}>
          {item.quantity} × {meal.price.toFixed(2)} € ={' '}
          {(meal.price * item.quantity).toFixed(2)} €
        </Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onDecrement} style={styles.qtyButton}>
          <Text>-</Text>
        </Pressable>
        <Text style={styles.qty}>{item.quantity}</Text>
        <Pressable onPress={onIncrement} style={styles.qtyButton}>
          <Text>+</Text>
        </Pressable>
        <Pressable onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>X</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qty: {
    marginHorizontal: 6,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 8,
  },
  removeText: {
    color: '#b91c1c',
    fontWeight: '700',
  },
});