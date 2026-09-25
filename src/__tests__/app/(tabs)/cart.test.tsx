import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartScreen from '@/app/(tabs)/cart';
import { CartProvider } from '@/context/CartContext';
import * as CartContextModule from '@/context/CartContext';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockItems = [
  { id: '1', name: 'Product 1', price: 10, image: '', description: '', quantity: 2 },
];

describe('CartScreen', () => {
  it('renders empty cart message when no items', () => {
    jest.spyOn(CartContextModule, 'useCart').mockReturnValue({
      items: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      cartTotal: 0,
    });

    const { getByText } = render(<CartScreen />);
    expect(getByText('Your cart is empty')).toBeTruthy();
  });

  it('renders cart items and total when items are present', () => {
    jest.spyOn(CartContextModule, 'useCart').mockReturnValue({
      items: mockItems,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      cartTotal: 20,
    });

    const { getByText } = render(<CartScreen />);
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Total: $20.00')).toBeTruthy();
  });
});
