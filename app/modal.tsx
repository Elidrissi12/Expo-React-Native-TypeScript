import React from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Modal</ThemedText>
      <ThemedText style={styles.text}>Ceci est l’écran `/modal` (Expo Router).</ThemedText>
      <Link href="/" asChild>
        <ThemedText type="link">Retour à l’accueil</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  text: {
    textAlign: 'center',
  },
});
