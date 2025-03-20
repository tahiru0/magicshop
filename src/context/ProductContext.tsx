"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, getFeaturedProducts } from '@/lib/api';
import { Product } from '@/context/CartContext';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all products
      const allProducts = await getProducts();
      setProducts(allProducts);
      
      // Extract categories
      const uniqueCategories = [...new Set(allProducts.map((p: { category: string }) => p.category))];
      setCategories(uniqueCategories as string[]);
      
      // Fetch featured products
      const featured = await getFeaturedProducts();
      setFeaturedProducts(featured);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      featuredProducts,
      categories,
      loading,
      error,
      refreshProducts: fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
