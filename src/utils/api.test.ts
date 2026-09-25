import { fetchProducts, MOCK_PRODUCTS } from './api';

describe('API Utils', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch mock products with a delay', async () => {
    const promise = fetchProducts();
    
    // Fast-forward time so the setTimeout resolves instantly in the test
    jest.advanceTimersByTime(800);
    
    const products = await promise;
    expect(products).toEqual(MOCK_PRODUCTS);
    expect(products.length).toBeGreaterThan(0);
  });
});
