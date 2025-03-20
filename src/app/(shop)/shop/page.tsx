"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

export default function ShopHomePage() {
  const [loaded, setLoaded] = useState(false);
  const { addToCart } = useCart();
  const { featuredProducts, loading } = useProducts();
  
  useEffect(() => {
    setLoaded(true);
    
    // Add magical cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'magic-cursor';
    document.body.appendChild(cursor);
    
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className={`flex flex-col relative overflow-hidden ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      {/* Magic Sigils Background */}
      <div className="sigil top-20 left-10 animate-rotate-slow">
        <Image src="/sigil1.svg" alt="" width={200} height={200} />
      </div>
      <div className="sigil bottom-40 right-20 animate-rotate-slow" style={{ animationDuration: '25s' }}>
        <Image src="/sigil2.svg" alt="" width={150} height={150} />
      </div>

      {/* Main Hero Section */}
      <section className="hero-section flex flex-col items-center justify-center py-20 px-6 relative z-10 min-h-[80vh]">
        <div className="text-center max-w-4xl mx-auto mb-12 relative">
          <h1 className="magic-title mb-4 relative">
            Welcome to the Arcane Nexus
            <span className="absolute -top-8 -left-8 text-6xl opacity-20 text-magic-accent">⚝</span>
            <span className="absolute -bottom-8 -right-8 text-6xl opacity-20 text-magic-accent">⚝</span>
          </h1>
          
          <p className="magic-subtitle text-magic-primary mb-8">Where the veil between worlds thins</p>
          
          <p className="font-cinzel text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            By the ancient contract of the seven stars, I welcome thee, seeker of the arcane.
            Only those bearing the mark of the chosen may enter these hallowed halls and glimpse
            the eldritch wonders within.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <Link href="/products" className="magic-button relative">
              <span className="relative z-10">Enter the Gateway</span>
            </Link>
            <Link href="/forbidden" className="magic-button relative">
              <span className="relative z-10">Forbidden Knowledge</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Magical Items */}
      <section className="w-full max-w-6xl mx-auto mt-16 px-6 pb-20">
        <h2 className="font-pirata text-3xl mb-8 text-center">Featured Arcane Treasures</h2>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="w-16 h-16 border-4 border-magic-primary rounded-full border-t-magic-dark animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="magic-card group">
                  <div className="h-64 bg-magic-dark relative mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-magic-dark to-transparent z-10"></div>
                    <div className="w-full h-full relative flex items-center justify-center bg-magic-secondary/20 overflow-hidden">
                      {product.image ? (
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <div className="text-4xl opacity-40">⚝</div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-pirata text-2xl mb-2 text-magic-primary">{product.name}</h3>
                  <p className="text-sm mb-4 font-cinzel line-clamp-2">{product.description?.split('\n')[0]}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-magic-accent font-pirata">{product.price}</span>
                    <div className="flex gap-2">
                      <Link 
                        href={`/product/${product.id}`}
                        className="px-3 py-2 text-xs font-cinzel uppercase border border-magic-border hover:bg-magic-dark/50 transition-all"
                      >
                        Details
                      </Link>
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
            
            <div className="text-center mt-12">
              <Link href="/products" className="magic-button relative inline-block">
                <span className="relative z-10">View All Arcane Treasures</span>
              </Link>
            </div>
          </>
        )}
      </section>
      
      <style jsx global>{`
        .magic-cursor {
          width: 20px;
          height: 20px;
          border: 1px solid var(--magic-primary);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s ease;
        }

        .hero-section {
          background-image: linear-gradient(rgba(10, 7, 13, 0.7), rgba(10, 7, 13, 0.8)), url('/backgrounds/hero-bg.jpg');
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
}
