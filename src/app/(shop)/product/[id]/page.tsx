"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, getProducts } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { Product } from '@/context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        
        if (fetchedProduct) {
          // Find related products (same category, excluding current product)
          const allProducts = await getProducts(fetchedProduct.category);
          const related = allProducts
            .filter((p: { id: string }) => p.id !== fetchedProduct.id)
            .slice(0, 3);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct();
  }, [productId]);

  const addToCartWithQuantity = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Reset quantity
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-magic-border rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl animate-pulse">✧</div>
          </div>
        </div>
        <p className="font-pirata text-xl mt-6 animate-pulse">
          Summoning arcane item...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl mb-4 opacity-30">✧</div>
        <h2 className="font-pirata text-2xl">This item appears to have vanished into the void...</h2>
        <p className="mt-4 font-cinzel">Perhaps it was merely a figment of your imagination.</p>
        <Link href="/shop/products" className="mt-8 magic-button">
          <span className="relative z-10">Return to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="mb-8 font-cinzel text-sm">
          <Link href="/shop" className="hover:text-magic-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop/products" className="hover:text-magic-accent">Products</Link>
          <span className="mx-2">/</span>
          <Link 
            href={`/shop/products?category=${product.category}`} 
            className="hover:text-magic-accent"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-magic-primary">{product.name}</span>
        </div>
        
        {/* Product Detail */}
        <div className="product-detail-grid">
          <div>
            <div className="relative aspect-square bg-magic-dark/50 overflow-hidden magic-border">
              <Image 
                src={product.image || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square bg-magic-dark/50 relative magic-border">
                  <Image 
                    src={product.image || '/placeholder-product.jpg'}
                    alt={`${product.name} view ${i+1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="font-pirata text-4xl text-magic-primary mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-magic-accent">★</span>
                ))}
              </div>
              <span className="text-sm font-cinzel ml-2 opacity-70">(13 reviews)</span>
            </div>
            
            <p className="font-pirata text-2xl text-magic-accent mb-6">{product.price}</p>
            
            <div className="product-description font-cinzel mb-8">{product.description}</div>
            
            <div className="magic-card p-4 mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-cinzel">Quantity</span>
                <div className="flex border border-magic-border">
                  <button 
                    className="px-3 py-1 hover:bg-magic-dark/50"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    className="px-3 py-1 hover:bg-magic-dark/50"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="magic-button w-full"
                onClick={addToCartWithQuantity}
              >
                Add to Collection
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-between font-cinzel text-sm">
              <div className="flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M20 8.5V13.5M4 8.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 13V14C17.5 15.933 17.5 16.9 16.7 17.45C15.9 18 14.933 18 13 18H11C9.067 18 8.1 18 7.3 17.45C6.5 16.9 6.5 15.933 6.5 14V13" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M19.7693 6.8091L17.4574 4.4972C16.7836 3.8234 16.4467 3.4865 16.0431 3.2734C15.6395 3.0603 15.1917 2.9712 14.2962 2.7931L12.6336 2.4677C11.9453 2.331 11.6012 2.2626 11.2535 2.243C10.9058 2.2233 10.5513 2.25229 10.2452 2.28123L8.14058 2.48932C7.11587 2.5763 6.60351 2.6198 6.21335 2.87735C5.82319 3.13491 5.57545 3.57223 5.07995 4.44687L3.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M6.5 13L12 17L17.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Free Astral Delivery
              </div>
              <div className="flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M7 14C7 14 8.5 16 12 16C15.5 16 17 14 17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z" fill="currentColor"/>
                  <path d="M17 10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10Z" fill="currentColor"/>
                </svg>
                Satisfaction Ritual
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="magic-separator">
              <span className="magic-separator-icon">✧</span>
            </div>
            
            <h2 className="font-pirata text-3xl mt-12 mb-8 text-center">Related Arcane Treasures</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct.id} className="magic-card">
                  <Link href={`/shop/product/${relProduct.id}`} className="block">
                    <div className="h-48 bg-magic-dark relative mb-4 overflow-hidden">
                      <Image 
                        src={relProduct.image || '/placeholder-product.jpg'}
                        alt={relProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-pirata text-xl mb-2 text-magic-primary">{relProduct.name}</h3>
                  </Link>
                  <p className="text-magic-accent font-pirata">{relProduct.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
