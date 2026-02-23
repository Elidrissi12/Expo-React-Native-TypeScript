import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import {useNavigation} from '@react-navigation/native';
import Link from 'expo-router/link';

function FormValidation() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    if (name.trim() === '') {
      setError('Name is required');
    } else if (password.trim() === '') {
      setError('Password is required');
    } else {
      setError('');
    }
  }, [name, password]);

  const handleSubmit = () => {
    if (error === '') {
      alert('formulaire soumis avec succès');
    } else {
      alert('erreur dans le formulaire: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="saisir le nom d'utilisateur"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="saisir le mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Link href="/new3"><Button title="valider" onPress={handleSubmit} /></Link>
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  buttonContainer: {
    width: '80%',
  },
});

export default FormValidation;
