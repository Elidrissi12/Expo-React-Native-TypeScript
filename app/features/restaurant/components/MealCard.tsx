// features/restaurant/components/MealCard.tsx
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Meal } from '../types';
import { Link } from 'expo-router';

type Props = {
  meal: Meal;
  onAddToCart: () => void;
};

export const MealCard = React.memo(function MealCard({ meal, onAddToCart }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: meal.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.description}>{meal.description}</Text>

        <View style={styles.sizesRow}>
          <View style={styles.sizeBadgeFilled}>
            <Text style={styles.sizeTextFilled}>Small</Text>
          </View>
          <View style={styles.sizeBadge}>
            <Text style={styles.sizeText}>Medium</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>{meal.price.toFixed(2)} €</Text>
          <Pressable style={styles.button} onPress={onAddToCart}>
            <Link href="/features/restaurant/page2"><Text style={styles.buttonText}>Add Cart</Text></Link>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#111827',
    marginBottom: 12,
  },
  image: {
    width: 70,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    marginBottom: 2,
    color: '#f9fafb',
    fontSize: 14,
  },
  description: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 4,
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  sizeBadgeFilled: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#ef4444',
  },
  sizeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#f97316',
  },
  sizeTextFilled: {
    fontSize: 10,
    color: '#fee2e2',
    fontWeight: '600',
  },
  sizeText: {
    fontSize: 10,
    color: '#fed7aa',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: '700',
    color: '#f9fafb',
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#ef4444',
  },
  buttonText: {
    fontSize: 12,
    color: '#fef2f2',
    fontWeight: '700',
  },
});