"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  description: string;
  image: string;
  category: string;
  inventory: number;
  featured: boolean;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const isNewProduct = params.id === 'new';
  
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    priceDisplay: '',
    description: '',
    image: '',
    category: 'grimoires', // default category
    inventory: 10,
    featured: false
  });
  
  const [loading, setLoading] = useState(!isNewProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!isNewProduct) {
      fetchProduct();
    }
  }, [params.id, isNewProduct]);
  
  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      
      const data = await res.json();
      setProduct(data.product);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      // Handle checkbox (for featured)
      const checkbox = e.target as HTMLInputElement;
      setProduct({ ...product, [name]: checkbox.checked });
    } else if (name === 'price') {
      // Handle price updates
      const numericPrice = parseFloat(value);
      setProduct({ 
        ...product, 
        price: numericPrice,
        priceDisplay: !isNaN(numericPrice) ? `${numericPrice} souls` : value
      });
    } else {
      // Handle other inputs
      setProduct({ ...product, [name]: value });
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      const method = isNewProduct ? 'POST' : 'PUT';
      const url = isNewProduct ? '/api/products' : `/api/products/${params.id}`;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      
      if (!res.ok) {
        throw new Error('Failed to save product');
      }
      
      router.push('/admin');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setSaving(false);
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
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-pirata text-3xl text-magic-primary">
            {isNewProduct ? 'Conjure New Arcane Item' : 'Modify Arcane Item'}
          </h1>
          
          <Link href="/admin" className="font-cinzel text-sm underline">
            Return to Repository
          </Link>
        </div>
        
        {error && (
          <div className="bg-magic-accent/20 text-magic-accent p-4 mb-6 font-cinzel text-sm magic-border">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="magic-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block font-cinzel text-sm mb-2">
                  Item Name
                </label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="category" className="block font-cinzel text-sm mb-2">
                  Category
                </label>
                <select 
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  required
                >
                  <option value="grimoires">Grimoires</option>
                  <option value="artifacts">Artifacts</option>
                  <option value="potions">Potions</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="price" className="block font-cinzel text-sm mb-2">
                    Price (souls)
                  </label>
                  <input 
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="priceDisplay" className="block font-cinzel text-sm mb-2">
                    Price Display
                  </label>
                  <input 
                    type="text"
                    id="priceDisplay"
                    name="priceDisplay"
                    value={product.priceDisplay}
                    onChange={handleChange}
                    className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="inventory" className="block font-cinzel text-sm mb-2">
                    Inventory
                  </label>
                  <input 
                    type="number"
                    id="inventory"
                    name="inventory"
                    value={product.inventory}
                    onChange={handleChange}
                    className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                    min="0"
                  />
                </div>
                
                <div className="flex items-end mb-2">
                  <div className="flex items-center h-10">
                    <input 
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={product.featured}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="featured" className="font-cinzel text-sm">
                      Featured Item
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label htmlFor="image" className="block font-cinzel text-sm mb-2">
                  Image URL
                </label>
                <input 
                  type="text"
                  id="image"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                  placeholder="/products/your-image.jpg"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block font-cinzel text-sm mb-2">
                  Description
                </label>
                <textarea 
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel h-[180px]"
                  required
                ></textarea>
              </div>
              
              <div className="mt-2 text-xs opacity-70 font-cinzel">
                <p>Use \n for line breaks in the description.</p>
              </div>
            </div>
          </div>
          
          {/* Preview */}
          <div className="mt-8 border-t border-magic-border pt-6">
            <h3 className="font-pirata text-xl mb-4 text-magic-primary">Astral Preview</h3>
            <div className="flex items-start space-x-4">
              <div className="w-24 h-24 bg-magic-dark/50 relative">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-3xl opacity-30">⚝</div>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-pirata text-lg text-magic-primary">{product.name || 'Unnamed Artifact'}</h4>
                <p className="text-xs opacity-70 font-cinzel">{product.category}</p>
                <p className="text-magic-accent font-pirata mt-1">{product.priceDisplay || `${product.price} souls`}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <Link 
              href="/admin"
              className="px-6 py-2 border border-magic-border font-cinzel hover:bg-magic-dark/50"
            >
              Cancel Incantation
            </Link>
            <button 
              type="submit"
              className="magic-button"
              disabled={saving}
            >
              <span className="relative z-10">
                {saving ? 'Inscribing Runes...' : 'Materialize Item'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
