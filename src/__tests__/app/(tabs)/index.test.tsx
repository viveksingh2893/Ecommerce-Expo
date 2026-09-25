import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ShopScreen from '@/app/(tabs)/index';
import { CartProvider } from '@/context/CartContext';
import * as ApiModule from '@/utils/api';

jest.mock('@/utils/api', () => ({
  fetchProducts: jest.fn(),
}));

const mockProducts = [
  { id: '1', name: 'Product 1', price: 10, image: '', description: 'Desc 1' },
];

describe('ShopScreen', () => {
  it('renders loading initially and then the products list', async () => {
    (ApiModule.fetchProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    const { getByText, queryByTestId } = render(
      <CartProvider>
        <ShopScreen />
      </CartProvider>
    );

    // After resolving, the product should be in the document
    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy();
    });
  });
});
