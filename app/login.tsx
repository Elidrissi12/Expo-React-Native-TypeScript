import { Colors, Radius, Spacing } from '@/constants/theme';
import { setRole } from '@/services/authStorage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';

const ROLES = [
  { id: 'operator', label: 'Opérateur' },
  { id: 'supervisor', label: 'Chef d’équipe' },
] as const;

export default function LoginScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Colors[scheme ?? 'light'];

  const handleRole = async (roleId: (typeof ROLES)[number]['id']) => {
    await setRole(roleId);
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.page, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.text }]}>Connexion</Text>
      <Text style={[styles.subtitle, { color: c.textSecondary }]}>
        Choisis ton rôle (simulé)
      </Text>
      <View style={styles.buttons}>
        {ROLES.map(({ id, label }) => (
          <Pressable
            key={id}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: c.primaryLight },
              pressed && { opacity: 0.88 },
            ]}
            onPress={() => handleRole(id)}>
            <Text style={[styles.buttonText, { color: c.textOnPrimary }]}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: Spacing.xxl,
  },
  buttons: {
    width: '100%',
    maxWidth: 280,
    gap: Spacing.md,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
