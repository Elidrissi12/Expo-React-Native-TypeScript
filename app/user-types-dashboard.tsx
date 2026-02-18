import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import { TaskCard } from '@/components/TaskCard';
import { AppHeader } from '@/components/AppHeader';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  important: boolean;
};

const STORAGE_KEY = '@todos';

const USER_TYPES = [
  { key: 'operator', label: 'Opérateurs' },
  { key: 'supervisor', label: 'Chefs d’équipe' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'quality', label: 'Qualité' },
] as const;

type UserTypeKey = (typeof USER_TYPES)[number]['key'] | 'all';

export default function UserTypesDashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedType, setSelectedType] = useState<UserTypeKey>('all');

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: Todo[] = JSON.parse(stored);
          setTodos(parsed);
        }
      } catch {
        setTodos([]);
      }
    };
    load();
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((t) => {
      if (selectedType === 'all') return true;
      if (selectedType === 'operator') {
        return !t.done;
      }
      if (selectedType === 'supervisor') {
        return t.done;
      }
      if (selectedType === 'maintenance') {
        const low = t.text.toLowerCase();
        return low.includes('maintenance') || low.includes('machine');
      }
      if (selectedType === 'quality') {
        const low = t.text.toLowerCase();
        return low.includes('qualité') || low.includes('quality');
      }
      return true;
    });
  }, [todos, selectedType]);

  return (
    <View style={styles.page}>
      <View style={{ flex: 1 }}>
    <AppHeader title="Dashboard opérateur" />
    <View style={styles.page}>
      {/* le contenu actuel de ta page (hero, search, listes, etc.) */}
    </View>
  </View>
      <View style={styles.header}>
        <Text style={styles.title}>Utilisateurs / Rôles</Text>
        <Text style={styles.subtitle}>
          Visualise les tâches selon le type d’utilisateur.
        </Text>
      </View>

      <View style={styles.typesRow}>
        <Pressable
          style={[
            styles.typeChip,
            selectedType === 'all' && styles.typeChipActive,
          ]}
          onPress={() => setSelectedType('all')}>
          <Text
            style={
              selectedType === 'all' ? styles.typeChipTextActive : styles.typeChipText
            }>
            Tous
          </Text>
        </Pressable>

        {USER_TYPES.map((t) => (
          <Pressable
            key={t.key}
            style={[
              styles.typeChip,
              selectedType === t.key && styles.typeChipActive,
            ]}
            onPress={() => setSelectedType(t.key)}>
            <Text
              style={
                selectedType === t.key
                  ? styles.typeChipTextActive
                  : styles.typeChipText
              }>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        style={styles.list}
        data={visibleTodos}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucune tâche pour ce type d’utilisateur.
          </Text>
        }
        renderItem={({ item }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle} numberOfLines={2}>
      {item.text}
    </Text>
    <Text style={styles.cardSubtitle}>
      {item.done ? 'Terminée' : 'À faire'}
    </Text>

    <View style={styles.cardFooter}>
      <Text style={styles.cardBadge}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <View style={styles.cardAction}>
        <Text style={styles.cardActionText}>›</Text>
      </View>
    </View>
  </View>
)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  row: {
  marginRight: 12,
},

card: {
  width: 140,
  height: 140,
  backgroundColor: '#166534',    // vert foncé
  borderRadius: 18,
  padding: 10,
  justifyContent: 'space-between',
},

cardTitle: {
  color: '#f9fafb',
  fontSize: 14,
  fontWeight: '600',
},

cardSubtitle: {
  color: '#d1fae5',
  fontSize: 12,
  marginTop: 4,
},

cardFooter: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

cardBadge: {
  fontSize: 11,
  color: '#bbf7d0',
},

cardAction: {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: '#a3e635',
  justifyContent: 'center',
  alignItems: 'center',
},

cardActionText: {
  fontSize: 16,
  color: '#1a2e05',
},
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  typeChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  typeChipActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  typeChipText: {
    fontSize: 12,
    color: '#374151',
  },
  typeChipTextActive: {
    fontSize: 12,
    color: '#f9fafb',
    fontWeight: '600',
  },
  list: {
    flexGrow: 0,
  },
  
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 24,
  },
});

