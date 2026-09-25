import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { securelyStore, securelyRetrieve, securelyDelete } from '@/utils/security';
import { useRouter, useSegments } from 'expo-router';

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
  authenticateWithBiometrics: () => Promise<boolean>;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  // Load session on startup
  useEffect(() => {
    async function loadSession() {
      try {
        const storedUser = await securelyRetrieve('user_session');
        if (storedUser) {
          // Verify with biometrics if available and stored session exists
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();
          
          if (hasHardware && isEnrolled) {
            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Authenticate to access your account',
              fallbackLabel: 'Use Passcode',
            });
            if (result.success) {
              setUser(storedUser);
            } else {
              // Biometric failed or cancelled, force manual login
              await securelyDelete('user_session');
            }
          } else {
            // No biometrics, just restore session
            setUser(storedUser);
          }
        }
      } catch (e) {
        console.error('Session load error', e);
      } finally {
        setIsReady(true);
      }
    }
    loadSession();
  }, []);

  // Protected routing logic
  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // Redirect to sign in if not authenticated
      router.replace('/(auth)/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect to tabs if authenticated
      router.replace('/(tabs)');
    }
  }, [user, segments, isReady]);

  const login = async (email: string) => {
    setUser(email);
    await securelyStore('user_session', email);
  };

  const logout = async () => {
    setUser(null);
    await securelyDelete('user_session');
  };

  const authenticateWithBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirm action',
      });
      return result.success;
    }
    return false; // Or true if you want to bypass on simulators without FaceID
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authenticateWithBiometrics, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
