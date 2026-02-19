import { AppHeader } from '@/components/AppHeader';
import { Colors, Radius, Shadows, Spacing } from '@/constants/theme';
import { getRole } from '@/services/authStorage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useColorScheme } from 'react-native';

const STORAGE_KEY = '@todos';

type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  important: boolean;
};

const ROLE_LABELS: Record<string, string> = {
  operator: 'Opérateur',
  supervisor: 'Chef d’équipe',
};

export default function DashboardScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme ?? 'light'];
  const [role, setRole] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, done: 0, remaining: 0 });

  useEffect(() => {
    getRole().then(setRole);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const todos: Todo[] = JSON.parse(stored);
          const done = todos.filter((t) => t.done).length;
          setStats({ total: todos.length, done, remaining: todos.length - done });
        }
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  return (
    <View style={[styles.page, { backgroundColor: c.background }]}>
      <AppHeader title="Tableau de bord" showBack={false} />
      <View style={styles.content}>
        <View style={styles.welcome}>
          <Text style={[styles.welcomeTitle, { color: c.textMuted }]}>Bonjour</Text>
          <Text style={[styles.welcomeRole, { color: c.text }]}>
            {role ? ROLE_LABELS[role] ?? role : '—'}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: c.text }]}>Résumé des tâches</Text>
        <View style={styles.cards}>
          <View style={[styles.card, { backgroundColor: c.primaryLight }]}>
            <Text style={styles.cardValue}>{stats.total}</Text>
            <Text style={styles.cardLabel}>Total</Text>
          </View>
          <View style={[styles.card, { backgroundColor: c.secondary }]}>
            <Text style={styles.cardValue}>{stats.remaining}</Text>
            <Text style={styles.cardLabel}>À faire</Text>
          </View>
          <View style={[styles.card, { backgroundColor: c.successLight }]}>
            <Text style={styles.cardValue}>{stats.done}</Text>
            <Text style={styles.cardLabel}>Terminées</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: c.text }]}>Accès rapide</Text>
        <View style={styles.links}>
          <Link href="/(tabs)/index" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.link,
                { backgroundColor: c.surface, borderColor: c.border },
                pressed && { opacity: 0.9 },
              ]}>
              <Text style={[styles.linkText, { color: c.text }]}>📋 Liste des tâches</Text>
              <Text style={[styles.linkArrow, { color: c.textMuted }]}>›</Text>
            </Pressable>
          </Link>
          <Link href="/(tabs)/api" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.link,
                { backgroundColor: c.surface, borderColor: c.border },
                pressed && { opacity: 0.9 },
              ]}>
              <Text style={[styles.linkText, { color: c.text }]}>🌐 API</Text>
              <Text style={[styles.linkArrow, { color: c.textMuted }]}>›</Text>
            </Pressable>
          </Link>
          <Link href="/(tabs)/tools" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.link,
                { backgroundColor: c.surface, borderColor: c.border },
                pressed && { opacity: 0.9 },
              ]}>
              <Text style={[styles.linkText, { color: c.text }]}>🔧 Outils</Text>
              <Text style={[styles.linkArrow, { color: c.textMuted }]}>›</Text>
            </Pressable>
          </Link>
          <Link href="/industrial-dashboard" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.link,
                { backgroundColor: c.surface, borderColor: c.border },
                pressed && { opacity: 0.9 },
              ]}>
              <Text style={[styles.linkText, { color: c.text }]}>📊 Dashboard maquette</Text>
              <Text style={[styles.linkArrow, { color: c.textMuted }]}>›</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
  },
  welcome: {
    marginBottom: Spacing.xxl,
  },
  welcomeTitle: {
    fontSize: 14,
    marginBottom: Spacing.xs,
  },
  welcomeRole: {
    fontSize: 22,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  cards: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xxl + 4,
  },
  card: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: 'center',
    ...Shadows?.card,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.92)',
    marginTop: Spacing.xs,
  },
  links: {
    gap: Spacing.sm,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    ...Shadows?.card,
  },
  linkText: {
    fontSize: 16,
  },
  linkArrow: {
    fontSize: 20,
  },
});
