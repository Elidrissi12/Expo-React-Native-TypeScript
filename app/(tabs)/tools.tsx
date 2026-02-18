import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function ToolsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outils</Text>
      <Text style={styles.subtitle}>Utilitaires pour ton application industrielle.</Text>

      <View style={styles.buttonsRow}>
        <Link href="/timer" asChild>
          <Button title="Timer" onPress={() => {}} />
        </Link>
      </View>

      <View style={styles.buttonsRow}>
        <Link href="/form" asChild>
          <Button title="Formulaire" onPress={() => {}} />
        </Link>
      </View>

      <View style={styles.buttonsRow}>
        <Link href="/user-types-dashboard" asChild>
          <Button title="Rôles / Types d’utilisateurs" onPress={() => {}} />
        </Link>
      </View>

      <View style={styles.buttonsRow}>
        <Link href="/industrial-dashboard" asChild>
          <Button title="Dashboard (UI maquette)" onPress={() => {}} />
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
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonsRow: {
    width: '80%',
    marginVertical: 4,
  },
});

