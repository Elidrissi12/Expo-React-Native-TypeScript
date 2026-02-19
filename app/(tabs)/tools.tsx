import { Colors, Radius, Spacing } from '@/constants/theme';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';

export default function ToolsTab() {
  const scheme = useColorScheme();
  const c = Colors[scheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.text }]}>Outils</Text>
      <Text style={[styles.subtitle, { color: c.textSecondary }]}>
        Utilitaires pour ton application industrielle.
      </Text>

      <View style={styles.buttonsRow}>
        <Link href="/planning" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: c.primaryLight },
              pressed && { opacity: 0.88 },
            ]}>
            <Text style={[styles.buttonText, { color: c.textOnPrimary }]}>
              Calendrier / Planning
            </Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.buttonsRow}>
        <Link href="/timer" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: c.primaryLight },
              pressed && { opacity: 0.88 },
            ]}>
            <Text style={[styles.buttonText, { color: c.textOnPrimary }]}>Timer</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.buttonsRow}>
        <Link href="/form" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: c.primaryLight },
              pressed && { opacity: 0.88 },
            ]}>
            <Text style={[styles.buttonText, { color: c.textOnPrimary }]}>Formulaire</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.buttonsRow}>
        <Link href="/user-types-dashboard" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: c.primaryLight },
              pressed && { opacity: 0.88 },
            ]}>
            <Text style={[styles.buttonText, { color: c.textOnPrimary }]}>
              Rôles / Types d’utilisateurs
            </Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.buttonsRow}>
        <Link href="/industrial-dashboard" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: c.primaryLight },
              pressed && { opacity: 0.88 },
            ]}>
            <Text style={[styles.buttonText, { color: c.textOnPrimary }]}>
              Dashboard (UI maquette)
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
    gap: Spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  buttonsRow: {
    width: '80%',
    marginVertical: Spacing.xs,
  },
  button: {
    paddingVertical: Spacing.lg - 2,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

