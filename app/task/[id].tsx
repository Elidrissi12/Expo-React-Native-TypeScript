import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  important: boolean;
};

const STORAGE_KEY = '@todos';

export default function TaskDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!stored) {
          setTodo(null);
          return;
        }
        const parsed: Todo[] = JSON.parse(stored);
        const found = parsed.find((t) => t.id === id);
        setTodo(found ?? null);
      } catch {
        setTodo(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Chargement de la tâche...</Text>
      </View>
    );
  }

  if (!todo) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Tâche introuvable.</Text>
        <Button title="Retour au Dashboard" onPress={() => router.back()} />
      </View>
    );
  }

  const created = new Date(todo.createdAt);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Détail de la tâche</Text>
        <Text style={styles.subtitle}>{todo.id}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{todo.text}</Text>

        <Text style={styles.label}>Statut</Text>
        <Text style={styles.value}>{todo.done ? 'Terminée' : 'À faire'}</Text>

        <Text style={styles.label}>Importance</Text>
        <Text style={styles.value}>{todo.important ? 'Importante' : 'Normale'}</Text>

        <Text style={styles.label}>Créée le</Text>
        <Text style={styles.value}>
          {created.toLocaleDateString()} à {created.toLocaleTimeString()}
        </Text>
      </View>

      <View style={styles.bottom}>
        <Button title="Retour au Dashboard" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    marginBottom: 4,
    fontSize: 15,
  },
  bottom: {
    marginTop: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

