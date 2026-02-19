// features/restaurant/components/OrderCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Meal, Order } from '../types';

type Props = {
  order: Order;
  meals: Meal[];
};

function getStatusLabel(status: Order['status']) {
  if (status === 'PENDING') return 'En attente';
  if (status === 'PREPARING') return 'En préparation';
  return 'Livré';
}

export const OrderCard = React.memo(function OrderCard({ order, meals }: Props) {
  const date = new Date(order.createdAt);
  const formatted = date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.id}>Commande #{order.id}</Text>
        <Text style={styles.status}>{getStatusLabel(order.status)}</Text>
      </View>
      <Text style={styles.date}>{formatted}</Text>
      {order.items.map(item => {
        const meal = meals.find(m => m.id === item.mealId);
        if (!meal) return null;
        return (
          <Text key={meal.id} style={styles.line}>
            {item.quantity} × {meal.name}
          </Text>
        );
      })}
      <Text style={styles.total}>{order.total.toFixed(2)} €</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  id: {
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    color: '#0a7ea4',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  line: {
    fontSize: 13,
  },
  total: {
    marginTop: 4,
    fontWeight: '700',
  },
});