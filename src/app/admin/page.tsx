"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  category: string;
  inventory: number;
  featured: boolean;
  createdAt: string;
  image?: string; // Make image property optional
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  
  // Check authentication and if any users exist
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if any users exist in the system
        const usersRes = await fetch('/api/auth/users');
        const usersData = await usersRes.json();
        
        // If no users exist, show registration form
        if (usersData.isEmpty) {
          setIsFirstTimeSetup(true);
          setLoading(false);
          return;
        }
        
        // Otherwise check authentication
        const res = await fetch('/api/auth/check');
        if (res.ok) {
          setIsAuthenticated(true);
          fetchProducts();
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      
      setIsAuthenticated(true);
      fetchProducts();
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    }
  };
  
  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }
      
      setIsAuthenticated(true);
      fetchProducts();
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration');
    }
  };
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Remove product from state
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error occurred while deleting');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured })
      });

      if (res.ok) {
        // Update product in state
        setProducts(prev => 
          prev.map(p => p.id === id ? { ...p, featured: !featured } : p)
        );
      } else {
        alert('Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-magic-border rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl animate-pulse">✧</div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="magic-card w-full max-w-md">
          <h1 className="font-pirata text-3xl text-center mb-6 text-magic-primary">
            {isFirstTimeSetup ? 'Create Arcane Administrator' : 'Arcane Gatekeeper'}
          </h1>
          
          {error && (
            <div className="bg-magic-accent/20 text-magic-accent p-4 mb-6 font-cinzel text-sm">
              {error}
            </div>
          )}
          
          {isFirstTimeSetup ? (
            <form onSubmit={handleRegistration}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-cinzel text-sm mb-2">
                  Archmage Name
                </label>
                <input 
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block font-cinzel text-sm mb-2">
                  Ethereal Identifier (Email)
                </label>
                <input 
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block font-cinzel text-sm mb-2">
                  Arcane Password
                </label>
                <input 
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full magic-button"
              >
                <span className="relative z-10">Establish Administrator Access</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-cinzel text-sm mb-2">
                  Ethereal Identifier (Email)
                </label>
                <input 
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block font-cinzel text-sm mb-2">
                  Arcane Password
                </label>
                <input 
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full magic-button"
              >
                <span className="relative z-10">Enter the Inner Sanctum</span>
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-pirata text-3xl text-magic-primary">
            Arcane Repository Management
          </h1>
          
          <div>
            <Link href="/admin/products/new" className="magic-button">
              <span className="relative z-10">Conjure New Item</span>
            </Link>
          </div>
        </div>
        
        <div className="magic-card mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-magic-border">
                  <th className="py-4 px-6 text-left font-cinzel">Item</th>
                  <th className="py-4 px-6 text-left font-cinzel">Category</th>
                  <th className="py-4 px-6 text-left font-cinzel">Price</th>
                  <th className="py-4 px-6 text-left font-cinzel">Inventory</th>
                  <th className="py-4 px-6 text-left font-cinzel">Featured</th>
                  <th className="py-4 px-6 text-left font-cinzel">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-magic-border/30 hover:bg-magic-dark/30">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 bg-magic-dark/50">
                          <Image
                            src={product.image || '/placeholder-product.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-cinzel">{product.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-cinzel">{product.category}</td>
                    <td className="py-4 px-6 font-pirata text-magic-accent">{product.priceDisplay}</td>
                    <td className="py-4 px-6 font-cinzel">{product.inventory}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleFeatured(product.id, product.featured)}
                        className={`px-3 py-1 rounded text-xs ${
                          product.featured 
                            ? 'bg-magic-accent/30 text-magic-accent' 
                            : 'bg-magic-dark border border-magic-border'
                        }`}
                      >
                        {product.featured ? 'Featured' : 'Standard'}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="p-2 bg-magic-secondary/20 border border-magic-border hover:bg-magic-secondary/40"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 bg-magic-accent/20 border border-magic-accent/50 hover:bg-magic-accent/40"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center text-sm font-cinzel opacity-70">
          <p>
            The Arcane Council reminds you to handle these artifacts with care.
            Each deletion permanently removes the item from our dimensional inventory.
          </p>
        </div>
      </div>
    </div>
  );
}
