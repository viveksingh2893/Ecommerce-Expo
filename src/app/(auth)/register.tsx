import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';
import { registerUser } from '@/utils/database';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!email || password.length < 6) {
      Alert.alert('Error', 'Please enter a valid email and a password of at least 6 characters.');
      return;
    }
    
    try {
      await registerUser(email.toLowerCase(), password);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => login(email.toLowerCase()) }
      ]);
    } catch (e: any) {
      Alert.alert('Registration Failed', e.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Create Account</ThemedText>
        <ThemedText style={styles.subtitle}>Join our offline E-Commerce app</ThemedText>
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
          placeholder="Password (min 6 char)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <ThemedText style={styles.btnText}>Register</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <ThemedText>Already have an account? </ThemedText>
        <Link href="/(auth)/sign-in" asChild>
          <TouchableOpacity>
            <ThemedText style={styles.linkTextBold}>Sign In</ThemedText>
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
  linkTextBold: { color: '#0a7ea4', fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
});
