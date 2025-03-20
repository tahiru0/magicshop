"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/lib/api';
import { Product } from '@/context/CartContext';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch products and categories
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const products = await getProducts(selectedCategory || undefined);
        setFilteredProducts(products);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(products.map((p: { category: string }) => p.category))];
        setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [selectedCategory]);
  
  // Update selected category from URL params
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    
    if (category) {
      router.push(`/shop/products?category=${category}`);
    } else {
      router.push('/shop/products');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Arcane Treasures</h1>
        <p className="font-cinzel text-lg max-w-2xl mx-auto">
          Browse our collection of mystical items, each with unique properties and powers
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Category Filter */}
        <div className="category-filter">
          <button 
            className={`category-button ${selectedCategory === null ? 'active border-magic-primary' : ''}`}
            onClick={() => handleCategoryChange(null)}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button 
              key={category}
              className={`category-button ${selectedCategory === category ? 'active border-magic-primary' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center my-12">
            <div className="w-16 h-16 border-4 border-magic-primary rounded-full border-t-magic-dark animate-spin"></div>
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <Link href={`/shop/product/${product.id}`}>
                    <div className="w-full h-full relative">
                      <Image 
                        src={product.image || '/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  {product.category === 'artifacts' && (
                    <div className="product-badge">Rare</div>
                  )}
                </div>
                
                <div className="product-details">
                  <Link href={`/shop/product/${product.id}`} className="product-title hover:text-magic-accent transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-sm line-clamp-2 mb-4 font-cinzel">{product.description.split('\n')[0]}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="product-price">{product.price}</span>
                    <button 
                      className="px-3 py-2 text-xs font-cinzel uppercase border border-magic-border hover:bg-magic-dark/50 transition-all"
                      onClick={() => addToCart(product)}
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">✧</div>
            <h3 className="font-pirata text-xl mb-2">No arcane items found</h3>
            <p className="font-cinzel">The ethereal planes have yet to deliver these mysteries.</p>
          </div>
        )}
      </div>
    </div>
  );
}
