import { AppHeader } from '@/components/AppHeader';
import { Colors, Radius, Spacing } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useColorScheme } from 'react-native';

type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  important: boolean;
  dueDate?: number;
};

const STORAGE_KEY = '@todos';

type RangeFilter = 'today' | 'tomorrow' | 'week';

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function getDayKey(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function PlanningScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme ?? 'light'];

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<RangeFilter>('today');
  const [activeDateKey, setActiveDateKey] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

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

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch {
        // ignore
      }
    };
    save();
  }, [todos]);

  const today = useMemo(() => startOfDay(new Date()), []);
  const tomorrow = useMemo(() => startOfDay(addDays(today, 1)), [today]);

  const days = useMemo(() => {
    if (filter === 'today') return [today];
    if (filter === 'tomorrow') return [tomorrow];

    // Cette semaine : aujourd’hui + 6 jours
    return Array.from({ length: 7 }, (_, i) => addDays(today, i));
  }, [filter, today, tomorrow]);

  const tasksByDay = useMemo(() => {
    const map: Record<string, Todo[]> = {};
    for (const t of todos) {
      const base = t.dueDate ?? t.createdAt;
      const d = startOfDay(new Date(base));
      const key = getDayKey(d);
      if (!map[key]) map[key] = [];
      map[key].push(t);
    }
    Object.values(map).forEach(list =>
      list.sort((a, b) => Number(a.done) - Number(b.done) || a.createdAt - b.createdAt),
    );
    return map;
  }, [todos]);

  const handleAddForDate = (day: Date) => {
    const key = getDayKey(day);
    setActiveDateKey(key);
    setDraft('');
  };

  const handleCreateForDate = (day: Date) => {
    const text = draft.trim();
    if (!text) return;

    const due = startOfDay(day).getTime();

    const todo: Todo = {
      id: createId(),
      text,
      done: false,
      createdAt: Date.now(),
      important: false,
      dueDate: due,
    };

    setTodos(prev => [todo, ...prev]);
    setDraft('');
    setActiveDateKey(null);
  };

  const getBadge = (day: Date) => {
    const d = startOfDay(day).getTime();
    if (d === startOfDay(today).getTime()) return 'Aujourd’hui';
    if (d === startOfDay(tomorrow).getTime()) return 'Demain';
    return null;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.background }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}>
      <View style={{ flex: 1 }}>
        <AppHeader title="Calendrier / Planning" showBack />

        <View style={styles.content}>
          <View style={styles.filtersRow}>
            <Pressable
              style={[
                styles.filterChip,
                { borderColor: c.border },
                filter === 'today' && { backgroundColor: c.secondary, borderColor: c.secondary },
              ]}
              onPress={() => setFilter('today')}>
              <Text
                style={[
                  styles.filterChipText,
                  { color: c.text },
                  filter === 'today' && styles.filterChipTextActive,
                ]}>
                Aujourd’hui
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.filterChip,
                { borderColor: c.border },
                filter === 'tomorrow' && {
                  backgroundColor: c.secondary,
                  borderColor: c.secondary,
                },
              ]}
              onPress={() => setFilter('tomorrow')}>
              <Text
                style={[
                  styles.filterChipText,
                  { color: c.text },
                  filter === 'tomorrow' && styles.filterChipTextActive,
                ]}>
                Demain
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.filterChip,
                { borderColor: c.border },
                filter === 'week' && { backgroundColor: c.secondary, borderColor: c.secondary },
              ]}
              onPress={() => setFilter('week')}>
              <Text
                style={[
                  styles.filterChipText,
                  { color: c.text },
                  filter === 'week' && styles.filterChipTextActive,
                ]}>
                Cette semaine
              </Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.daysContainer}>
            {days.map(day => {
              const key = getDayKey(day);
              const badge = getBadge(day);
              const tasks = tasksByDay[key] ?? [];
              const isActive = activeDateKey === key;

              return (
                <View
                  key={key}
                  style={[
                    styles.dayCard,
                    {
                      backgroundColor: c.surface,
                      borderColor: c.borderLight,
                    },
                  ]}>
                  <View style={styles.dayHeader}>
                    <View>
                      <Text style={[styles.dayLabel, { color: c.text }]}>
                        {formatDayLabel(day)}
                      </Text>
                      {badge && (
                        <Text style={[styles.dayBadge, { color: c.textMuted }]}>{badge}</Text>
                      )}
                    </View>
                    <Text style={[styles.dayCount, { color: c.textSecondary }]}>
                      {tasks.length} tâche{tasks.length > 1 ? 's' : ''}
                    </Text>
                  </View>

                  {tasks.length === 0 ? (
                    <Text style={[styles.emptyText, { color: c.textMuted }]}>
                      Aucune tâche planifiée.
                    </Text>
                  ) : (
                    tasks.map(t => (
                      <View key={t.id} style={styles.todoRow}>
                        <View
                          style={[
                            styles.todoDot,
                            { backgroundColor: t.done ? c.success : c.secondary },
                          ]}
                        />
                        <Text
                          style={[
                            styles.todoText,
                            { color: c.text },
                            t.done && { color: c.textMuted, textDecorationLine: 'line-through' },
                            t.important && { fontWeight: '700' },
                          ]}>
                          {t.text}
                        </Text>
                      </View>
                    ))
                  )}

                  {isActive ? (
                    <View style={styles.addRow}>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            borderColor: c.border,
                            backgroundColor: c.surfaceMuted,
                            color: c.text,
                          },
                        ]}
                        placeholder="Nouvelle tâche pour ce jour"
                        placeholderTextColor={c.textMuted}
                        value={draft}
                        onChangeText={setDraft}
                        returnKeyType="done"
                        onSubmitEditing={() => handleCreateForDate(day)}
                      />
                      <Pressable
                        style={[
                          styles.addButton,
                          { backgroundColor: c.primaryLight },
                          !draft.trim() && { opacity: 0.5 },
                        ]}
                        disabled={!draft.trim()}
                        onPress={() => handleCreateForDate(day)}>
                        <Text style={[styles.addButtonText, { color: c.textOnPrimary }]}>
                          Ajouter
                        </Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      style={[styles.addInlineButton, { borderColor: c.border }]}
                      onPress={() => handleAddForDate(day)}>
                      <Text style={[styles.addInlineText, { color: c.secondary }]}>
                        + Ajouter une tâche
                      </Text>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: Spacing.xl,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 13,
  },
  filterChipTextActive: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  daysContainer: {
    gap: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  dayCard: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  dayBadge: {
    fontSize: 12,
  },
  dayCount: {
    fontSize: 12,
  },
  emptyText: {
    fontSize: 13,
    marginTop: Spacing.xs,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  todoDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
  },
  todoText: {
    flex: 1,
    fontSize: 14,
  },
  addInlineButton: {
    marginTop: Spacing.sm,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  addInlineText: {
    fontSize: 13,
    fontWeight: '500',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    fontSize: 14,
  },
  addButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 8,
    borderRadius: Radius.md,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

