// features/restaurant/components/StatCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  value: string | number;
};

export const StatCard = React.memo(function StatCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#6b7280',
  },
});