import { Colors, Radius, Spacing } from '@/constants/theme';
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
import { useColorScheme } from 'react-native';



function New() {
  const [vaar, setVar] = useState('');

  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        
        secureTextEntry
      />
      <Button title="Submit" onPress={() => alert('Form submitted!')} />     
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
    color: '#000000',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  buttonContainer: {
    width: '70%',
  },
});

export default New;




