import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart } from './CartContext';
import { MOCK_PRODUCTS } from '../utils/api';

describe('CartContext', () => {
  it('should initialize with empty cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.cartTotal).toBe(0);
  });

  it('should add item to cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(MOCK_PRODUCTS[0]);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].id).toBe(MOCK_PRODUCTS[0].id);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('should increase quantity for existing item', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(MOCK_PRODUCTS[0]);
    });
    
    act(() => {
      result.current.addToCart(MOCK_PRODUCTS[0]);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.cartTotal).toBe(MOCK_PRODUCTS[0].price * 2);
  });

  it('should remove item from cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(MOCK_PRODUCTS[0]);
    });
    
    act(() => {
      result.current.removeFromCart(MOCK_PRODUCTS[0].id);
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });
});
