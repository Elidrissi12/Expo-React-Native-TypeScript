import React, { useState } from 'react';
import { Image } from 'expo-image';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      setError('Email et mot de passe sont obligatoires');
      return;
    }
    setError('');
    // Ici plus tard: appel API .NET pour authentifier
    alert('Login simulé khass itzad lbackend menbaed');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}>
      <View style={styles.container}>
        <Text style={styles.appName}><Image source={require('@/assets/images/logo.png')}
                      style={styles.logo}
                    />Industrial Tasks</Text>
        <Text style={styles.appSubtitle}>Connexion</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email professionnel</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="prenom.nom@entreprise.com"
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="********"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <Button title="Se connecter" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    padding: 25,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 4,
  },
  error: {
    color: 'red',
    marginTop: 8,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 12,
  },
});

