// components/TaskCard.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type Priority = 'low' | 'medium' | 'high' | undefined;

export type TaskCardProps = {
  title: string;
  assignee?: string;
  createdAt: number;
  done: boolean;
  priority?: Priority;
  onPress?: () => void; // ex: ouvrir la fiche détail
};

export function TaskCard({
  title,
  assignee,
  createdAt,
  done,
  priority,
  onPress,
}: TaskCardProps) {
  const date = new Date(createdAt);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, done && styles.cardTitleDone]}>{title}</Text>
      </View>

      <View style={styles.cardMeta}>
        {assignee && <Text style={styles.cardAssignee}>Opérateur: {assignee}</Text>}
        <View style={styles.cardMetaRow}>
          <Text style={styles.cardDate}>{date.toLocaleDateString()}</Text>
          {priority && (
            <Text
              style={[
                styles.priorityBadge,
                priority === 'high' && styles.priorityHigh,
                priority === 'medium' && styles.priorityMedium,
                priority === 'low' && styles.priorityLow,
              ]}>
              {priority === 'high'
                ? 'Haute'
                : priority === 'medium'
                  ? 'Normale'
                  : 'Basse'}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.cardStatus}>{done ? 'Terminée' : 'À faire'}</Text>
        <Pressable style={styles.cardAction} onPress={onPress}>
          <Text style={styles.cardActionText}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // reprend (copie-colle) le style actuel de la carte depuis industrial-dashboard.tsx
  card: { /* ... */ },
  cardHeader: { /* ... */ },
  cardTitle: { /* ... */ },
  cardTitleDone: { /* ... */ },
  cardMeta: { /* ... */ },
  cardAssignee: { /* ... */ },
  cardMetaRow: { /* ... */ },
  cardDate: { /* ... */ },
  priorityBadge: { /* ... */ },
  priorityHigh: { /* ... */ },
  priorityMedium: { /* ... */ },
  priorityLow: { /* ... */ },
  cardFooter: { /* ... */ },
  cardStatus: { /* ... */ },
  cardAction: { /* ... */ },
  cardActionText: { /* ... */ },
});