import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CheckoutScreen from '@/app/checkout';
import { CartProvider } from '@/context/CartContext';
import * as CartContextModule from '@/context/CartContext';
import { Alert } from 'react-native';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: jest.fn(),
  }),
}));

describe('CheckoutScreen', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders checkout form correctly', () => {
    jest.spyOn(CartContextModule, 'useCart').mockReturnValue({
      items: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      cartTotal: 50.0,
    });

    const { getByText, getByPlaceholderText } = render(<CheckoutScreen />);
    
    expect(getByText('Checkout')).toBeTruthy();
    expect(getByPlaceholderText('123 Main St...')).toBeTruthy();
    expect(getByText('Total: $50.00')).toBeTruthy();
  });

  it('shows error if fields are empty', () => {
    const { getByText } = render(<CheckoutScreen />);
    
    fireEvent.press(getByText('Place Order'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all fields.');
  });
});
