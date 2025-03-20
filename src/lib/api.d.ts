// Type declarations for API functions
export function getProducts(category?: string): Promise<any[]>;
export function getFeaturedProducts(): Promise<any[]>;
export function getProductById(id: string): Promise<any>;
export function createOrder(orderData: {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}): Promise<any>;
