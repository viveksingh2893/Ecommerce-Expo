export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Wireless Headphones', 
    price: 199.99, 
    image: 'https://picsum.photos/seed/headphones/400', 
    description: 'High-quality sound with noise cancellation.' 
  },
  { 
    id: '2', 
    name: 'Smart Watch', 
    price: 299.99, 
    image: 'https://picsum.photos/seed/watch/400', 
    description: 'Track your fitness and stay connected.' 
  },
  { 
    id: '3', 
    name: 'Mechanical Keyboard', 
    price: 149.99, 
    image: 'https://picsum.photos/seed/keyboard/400', 
    description: 'Clicky and satisfying mechanical switches.' 
  },
];

export async function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 800));
}
