// Helper functions for API calls

// Get all products
export async function getProducts(category?: string) {
  const url = category 
    ? `/api/products?category=${encodeURIComponent(category)}` 
    : '/api/products';
  
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  
  const data = await res.json();
  return data.products;
}

// Get featured products
export async function getFeaturedProducts() {
  const res = await fetch('/api/products?featured=true');
  if (!res.ok) throw new Error('Failed to fetch featured products');
  
  const data = await res.json();
  return data.products;
}

// Get product by id
export async function getProductById(id: string) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  
  const data = await res.json();
  return data.product;
}

// Create an order
export async function createOrder(orderData: {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  
  if (!res.ok) throw new Error('Failed to create order');
  
  const data = await res.json();
  return data.order;
}
