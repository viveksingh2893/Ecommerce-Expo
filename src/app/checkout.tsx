import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/context/CartContext';

export default function CheckoutScreen() {
  const { cartTotal } = useCart();
  const router = useRouter();
  
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleCheckout = () => {
    if (!address || !cardNumber) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      Alert.alert('Success', 'Your order has been placed!', [
        { text: 'OK', onPress: () => router.navigate('/') }
      ]);
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Checkout</ThemedText>
      
      <View style={styles.form}>
        <ThemedText type="subtitle" style={styles.label}>Shipping Address</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="123 Main St..."
          value={address}
          onChangeText={setAddress}
        />

        <ThemedText type="subtitle" style={styles.label}>Card Number</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000 0000"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
          secureTextEntry
        />
      </View>

      <View style={styles.footer}>
        <ThemedText type="title">Total: ${cartTotal.toFixed(2)}</ThemedText>
        <TouchableOpacity style={styles.payBtn} onPress={handleCheckout} disabled={processing}>
          {processing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.payText}>Place Order</ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  form: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  footer: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  payBtn: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
