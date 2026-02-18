import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  important: boolean;
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
};

const STORAGE_KEY = '@todos';

export default function IndustrialDashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'done' | 'urgent'>('all');

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

  const data = useMemo(() => {
    return todos
      .filter((t) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          t.text.toLowerCase().includes(q) ||
          (t.assignee ?? '').toLowerCase().includes(q)
        );
      })
      .filter((t) => {
        if (filter === 'active') return !t.done;
        if (filter === 'done') return t.done;
        if (filter === 'urgent') return t.priority === 'high' || t.important;
        return true;
      });
  }, [todos, search, filter]);

  const renderCard = ({ item }: { item: Todo }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text
          style={[
            styles.cardTitle,
            item.done && styles.cardTitleDone,
          ]}>
          {item.text}
        </Text>
      </View>
      <View style={styles.cardMeta}>
        {item.assignee && (
          <Text style={styles.cardAssignee}>Opérateur: {item.assignee}</Text>
        )}
        <View style={styles.cardMetaRow}>
          <Text style={styles.cardDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          {item.priority && (
            <Text
              style={[
                styles.priorityBadge,
                item.priority === 'high' && styles.priorityHigh,
                item.priority === 'medium' && styles.priorityMedium,
                item.priority === 'low' && styles.priorityLow,
              ]}>
              {item.priority === 'high'
                ? 'Haute'
                : item.priority === 'medium'
                  ? 'Normale'
                  : 'Basse'}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardStatus}>
          {item.done ? 'Terminée' : 'À faire'}
        </Text>
        <Pressable style={styles.cardAction}>
          <Text style={styles.cardActionText}>›</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerHello}>Bonjour,</Text>
          <Text style={styles.headerName}>Opérateur</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>OP</Text>
        </View>
      </View>

      {/* Hero */}
      <ImageBackground
        source={require('@/assets/images/react-logo.png')}
        style={styles.hero}
        imageStyle={styles.heroImage}>
        <View style={styles.heroOverlay} />
        <Text style={styles.heroText}>Quelles interventions pour aujourd’hui ?</Text>
      </ImageBackground>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une tâche ou une machine..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'active', label: 'En cours' },
          { key: 'done', label: 'Terminées' },
          { key: 'urgent', label: 'Urgentes' },
        ].map((f) => (
          <Pressable
            key={f.key}
            style={[
              styles.filterChip,
              filter === f.key && styles.filterChipActive,
            ]}
            onPress={() => setFilter(f.key as typeof filter)}>
            <Text
              style={
                filter === f.key ? styles.filterTextActive : styles.filterText
              }>
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Cards grid */}
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucune intervention ne correspond aux filtres.
          </Text>
        }
        renderItem={renderCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#f3f4f6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    color: '#f9fafb',
    fontSize: 18,
  },
  headerText: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerHello: {
    fontSize: 12,
    color: '#6b7280',
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ecfdf5',
    fontWeight: '700',
    fontSize: 13,
  },
  hero: {
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  heroText: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '700',
    padding: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginLeft: -40,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconText: {
    fontSize: 16,
  },
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  filterChipActive: {
    backgroundColor: '#111827',
  },
  filterText: {
    fontSize: 12,
    color: '#374151',
  },
  filterTextActive: {
    fontSize: 12,
    color: '#f9fafb',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginHorizontal: 4,
  },
  cardHeader: {
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardTitleDone: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  cardMeta: {
    marginBottom: 6,
  },
  cardAssignee: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 2,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 11,
    color: '#6b7280',
  },
  priorityBadge: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    color: '#111827',
  },
  priorityHigh: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
  },
  priorityMedium: {
    backgroundColor: '#fffbeb',
    color: '#92400e',
  },
  priorityLow: {
    backgroundColor: '#e0f2fe',
    color: '#075985',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardStatus: {
    fontSize: 12,
    color: '#4b5563',
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
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 24,
  },
});

