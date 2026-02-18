import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
};

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const STORAGE_KEY = '@todos';

const Home = () => {
  const [draft, setDraft] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState('');

  const canAdd = draft.trim().length > 0;

  const addTodo = useCallback(() => {
    const text = draft.trim();
    if (!text) return;

    const newTodo: Todo = {
      id: createId(),
      text,
      done: false,
      createdAt: Date.now(),
      important: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setDraft('');
    Keyboard.dismiss();
  }, [draft]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.done));
  }, []);

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.done).length;
    const remaining = total - done;
    return { total, done, remaining };
  }, [todos]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: Todo[] = JSON.parse(stored);
          setTodos(parsed);
        }
      } catch {
        // ignore load error
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch {
        // ignore save error
      }
    };
    saveTodos();
  }, [todos]);

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'done') return todos.filter((t) => t.done);
    return todos;
  }, [filter, todos]);

  const startEditing = useCallback((todo: Todo) => {
    setEditingId(todo.id);
    setEditingDraft(todo.text);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingId(null);
    setEditingDraft('');
  }, []);

  const saveEditing = useCallback(() => {
    const text = editingDraft.trim();
    if (!editingId || !text) {
      cancelEditing();
      return;
    }

    setTodos((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, text } : t)),
    );
    cancelEditing();
  }, [cancelEditing, editingDraft, editingId]);

  const toggleImportant = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              important: !t.important,
            }
          : t,
      ),
    );
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}>
      <View style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
            />
            <View>
              <Text style={styles.title}>Ma Todo List</Text>
              <Text style={styles.subtitle}>Dashboard des tâches</Text>
            </View>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <View style={styles.filtersRow}>
            <Pressable
              style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
              onPress={() => setFilter('all')}>
              <Text style={filter === 'all' ? styles.filterChipTextActive : styles.filterChipText}>
                Toutes
              </Text>
            </Pressable>
            <Pressable
              style={[styles.filterChip, filter === 'active' && styles.filterChipActive]}
              onPress={() => setFilter('active')}>
              <Text
                style={filter === 'active' ? styles.filterChipTextActive : styles.filterChipText}>
                À faire
              </Text>
            </Pressable>
            <Pressable
              style={[styles.filterChip, filter === 'done' && styles.filterChipActive]}
              onPress={() => setFilter('done')}>
              <Text style={filter === 'done' ? styles.filterChipTextActive : styles.filterChipText}>
                Terminées
              </Text>
            </Pressable>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Ajouter une tâche"
              value={draft}
              onChangeText={setDraft}
              returnKeyType="done"
              onSubmitEditing={addTodo}
              blurOnSubmit={false}
            />
            <View style={styles.addButton}>
              <Button title="Ajouter" onPress={addTodo} disabled={!canAdd} />
            </View>
          </View>

          <FlatList
            style={styles.list}
            contentContainerStyle={
              visibleTodos.length === 0 ? styles.emptyListContainer : undefined
            }
            keyboardShouldPersistTaps="handled"
            data={visibleTodos}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                Aucune tâche pour l’instant. Ajoute ta première tâche au-dessus.
              </Text>
            }
            renderItem={({ item }) => {
              const isEditing = item.id === editingId;

              return (
                <View style={styles.todoRow}>
                  <Pressable
                    onPress={() => toggleTodo(item.id)}
                    style={[styles.checkbox, item.done ? styles.checkboxDone : styles.checkboxTodo]}
                    accessibilityRole="button"
                    accessibilityLabel={
                      item.done ? 'Marquer comme non terminée' : 'Marquer comme terminée'
                    }
                  />

                  <Pressable
                    onLongPress={() => toggleImportant(item.id)}
                    style={styles.todoTextContainer}>
                    {isEditing ? (
                      <TextInput
                        style={styles.editInput}
                        value={editingDraft}
                        onChangeText={setEditingDraft}
                        autoFocus
                        onSubmitEditing={saveEditing}
                        onBlur={saveEditing}
                      />
                    ) : (
                      <Text
                        style={[
                          styles.todoText,
                          item.done ? styles.todoTextDone : undefined,
                          item.important ? styles.todoTextImportant : undefined,
                        ]}>
                        {item.text}
                      </Text>
                    )}
                    {item.important && !isEditing && (
                      <Text style={styles.importantBadge}>Important</Text>
                    )}
                  </Pressable>

                  <View style={styles.rowButtons}>
                    <View style={styles.detailsButton}>
                      
                      <Link
                        href="/login"
                        asChild>
                        <Button title="login" onPress={() => {}} />
                      </Link>
                    </View>
                    {isEditing ? (
                      <Button title="Annuler" onPress={cancelEditing} />
                    ) : (
                      <Button title="Modifier" onPress={() => startEditing(item)} />
                    )}
                    <View style={styles.rowButtonsSpacer} />
                    <Button title="X" onPress={() => deleteTodo(item.id)} />
                  </View>
                </View>
              );
            }}
          />
        </View>

        {/* BOTTOM */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomStats}>
            {stats.remaining} à faire · {stats.done} terminée(s) · {stats.total} total
          </Text>
          <View style={styles.bottomActions}>
            <Button
              title="Supprimer terminées"
              onPress={clearCompleted}
              disabled={stats.done === 0}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#f3f4f6',
  },
  header: {
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#666',
    fontSize: 13,
  },
  content: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButton: {
    minWidth: 110,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterChipActive: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  filterChipText: {
    color: '#333',
    fontSize: 13,
  },
  filterChipTextActive: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderColor: '#eee',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    gap: 10,
  },
  todoTextContainer: {
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
  },
  checkboxTodo: {
    borderColor: '#0a7ea4',
    backgroundColor: 'transparent',
  },
  checkboxDone: {
    borderColor: '#2e7d32',
    backgroundColor: '#2e7d32',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  todoTextDone: {
    color: '#777',
    textDecorationLine: 'line-through',
  },
  todoTextImportant: {
    fontWeight: '700',
  },
  importantBadge: {
    marginTop: 2,
    alignSelf: 'flex-start',
    fontSize: 11,
    color: '#d32f2f',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  rowButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButton: {
    marginRight: 6,
  },
  rowButtonsSpacer: {
    width: 6,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
  bottomBar: {
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
  bottomStats: {
    fontSize: 13,
    color: '#444',
    marginBottom: 8,
  },
  bottomActions: {
    alignItems: 'flex-start',
  },
});

export default Home;

