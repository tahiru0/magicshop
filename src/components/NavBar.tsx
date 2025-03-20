"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import UserMenu from './UserMenu';

export default function NavBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cart, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { name: 'Home', path: '/shop' },
    { name: 'Grimoires', path: '/products?category=grimoires' },
    { name: 'Artifacts', path: '/products?category=artifacts' },
    { name: 'Potions', path: '/products?category=potions' },
    { name: 'Forbidden Lore', path: '/forbidden' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when path changes
    setIsMenuOpen(false);
  }, [pathname]);

  // Helper function to check if the path matches (handles category params too)
  const isActivePath = (path: string) => {
    if (path === '/shop') return pathname === '/shop';
    
    // Handle category paths - fixed to work in SSR
    if (path.includes('?category=')) {
      const [basePath, categoryParam] = path.split('?');
      const category = categoryParam.split('=')[1];
      const currentCategory = searchParams.get('category');
      return pathname === basePath && currentCategory === category;
    }
    
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className={`py-5 px-6 sticky top-0 z-50 transition-all duration-300 ${
      scrolled || isMenuOpen ? 'bg-magic-dark shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 bg-magic-primary rounded-full opacity-20 animate-pulse"></div>
            <Image 
              src="/magic-emblem.svg" 
              alt="Arcane Nexus" 
              width={40} 
              height={40}
              className="relative z-10"
            />
          </div>
          <h1 className="text-xl ml-3 font-pirata tracking-wider text-magic-primary">Arcane Nexus</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`font-cinzel text-sm uppercase tracking-widest relative group ${
                    isActivePath(item.path) ? 'text-magic-accent' : 'text-foreground'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-magic-accent transition-all duration-300 ${
                    isActivePath(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* User Menu */}
          <UserMenu />

          {/* Cart Button - Desktop */}
          <button 
            className="cart-indicator ml-4 p-2"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
        </nav>

        {/* Mobile Navigation Area */}
        <div className="flex items-center md:hidden">
          {/* User Menu for mobile */}
          <UserMenu />
          
          {/* Cart Button - Mobile */}
          <button 
            className="cart-indicator mr-4 p-2"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-magic-dark/80 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Mobile Menu */}
      <div 
        className={`fixed top-[73px] left-0 right-0 bg-magic-dark z-40 md:hidden transition-transform duration-300 origin-top border-t border-magic-border ${
          isMenuOpen ? 'transform-none' : 'transform -translate-y-full'
        }`}
      >
        <nav className="p-6">
          <ul className="space-y-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`font-cinzel text-lg uppercase tracking-widest block relative ${
                    isActivePath(item.path) ? 'text-magic-accent' : 'text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-8 border-t border-magic-border">
            <div 
              className="magic-button w-full text-center" 
              onClick={() => {
                toggleCart();
                setIsMenuOpen(false);
              }}
            >
              <span className="relative z-10">View Cart ({totalItems})</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
