/**
 * Stockage sécurisé du rôle (et futur token) :
 * - iOS/Android : expo-secure-store (keychain / Keystore)
 * - Web : AsyncStorage (fallback, moins sécurisé)
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const SECURE_KEY = 'userRole';
const LEGACY_KEY = '@userRole';

let secureAvailable: boolean | null = null;

async function useSecureStore(): Promise<boolean> {
  if (secureAvailable === null) {
    secureAvailable = await SecureStore.isAvailableAsync();
  }
  return secureAvailable;
}

/** Récupère le rôle utilisateur (SecureStore ou AsyncStorage). */
export async function getRole(): Promise<string | null> {
  if (await useSecureStore()) {
    return SecureStore.getItemAsync(SECURE_KEY);
  }
  return AsyncStorage.getItem(LEGACY_KEY);
}

/** Enregistre le rôle utilisateur (SecureStore ou AsyncStorage). */
export async function setRole(role: string): Promise<void> {
  if (await useSecureStore()) {
    await SecureStore.setItemAsync(SECURE_KEY, role);
  } else {
    await AsyncStorage.setItem(LEGACY_KEY, role);
  }
}

/** Déconnexion : supprime les données d’auth partout (SecureStore + AsyncStorage legacy). */
export async function clearSession(): Promise<void> {
  if (await useSecureStore()) {
    await SecureStore.deleteItemAsync(SECURE_KEY);
  }
  await AsyncStorage.removeItem(LEGACY_KEY);
}
