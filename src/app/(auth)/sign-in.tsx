import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/utils/database';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    try {
      await loginUser(email.toLowerCase(), password);
      // If db login is successful, store session globally
      await login(email.toLowerCase());
    } catch (e: any) {
      Alert.alert('Login Failed', e.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Welcome Back</ThemedText>
        <ThemedText style={styles.subtitle}>Sign in to your account</ThemedText>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Link href="/(auth)/forgot-password" asChild>
          <TouchableOpacity style={styles.forgotBtn}>
            <ThemedText type="small" style={styles.linkText}>Forgot Password?</ThemedText>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
          <ThemedText style={styles.btnText}>Sign In</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <ThemedText>Don't have an account? </ThemedText>
        <Link href="/(auth)/register" asChild>
          <TouchableOpacity>
            <ThemedText style={styles.linkTextBold}>Register</ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { marginBottom: 32 },
  subtitle: { marginTop: 8, opacity: 0.7 },
  form: { marginBottom: 32 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 24 },
  linkText: { color: '#0a7ea4' },
  linkTextBold: { color: '#0a7ea4', fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
});
