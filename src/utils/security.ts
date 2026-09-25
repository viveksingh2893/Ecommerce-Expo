import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Checks if the device appears to be rooted (Android) or jailbroken (iOS).
 * Note: This is an experimental API and should not be your ONLY line of defense,
 * but it raises the bar for attackers.
 * 
 * Returns `true` if compromised, `false` if safe.
 */
export async function isDeviceCompromised(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  
  try {
    const isRooted = await Device.isRootedExperimentalAsync();
    return isRooted;
  } catch (error) {
    console.error('[Security] Failed to check device root status:', error);
    // Fail closed or open depending on your security needs.
    // For extreme security, return true (block access if check fails).
    return false;
  }
}

/**
 * Securely stores sensitive data (auth tokens, secrets) using the OS Keychain/Keystore.
 * NEVER use AsyncStorage for sensitive data.
 */
export async function securelyStore(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    // Web has no secure storage equivalent to Keychain. Consider using httpOnly cookies via your backend.
    console.warn('[Security] SecureStore is not supported on web. Falling back to sessionStorage (INSECURE).');
    sessionStorage.setItem(key, value);
    return;
  }
  
  await SecureStore.setItemAsync(key, value, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED, // Most secure default
  });
}

/**
 * Retrieves securely stored data.
 */
export async function securelyRetrieve(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return sessionStorage.getItem(key);
  }
  
  return await SecureStore.getItemAsync(key);
}

/**
 * Deletes securely stored data (e.g., on logout).
 */
export async function securelyDelete(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    sessionStorage.removeItem(key);
    return;
  }
  
  await SecureStore.deleteItemAsync(key);
}
