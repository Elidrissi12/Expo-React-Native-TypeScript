import { setRole } from '@/services/authStorage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const ROLES = [
  { id: 'operator', label: 'Opérateur' },
  { id: 'supervisor', label: 'Chef d’équipe' },
] as const;

export default function LoginScreen() {
  const router = useRouter();

  const handleRole = async (roleId: (typeof ROLES)[number]['id']) => {
    await setRole(roleId);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>Choisis ton rôle (simulé)</Text>
      <View style={styles.buttons}>
        {ROLES.map(({ id, label }) => (
          <Pressable
            key={id}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => handleRole(id)}>
            <Text style={styles.buttonText}>{label}</Text>
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
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    maxWidth: 280,
    gap: 12,
  },
  button: {
    backgroundColor: '#215229',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
