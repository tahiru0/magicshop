"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

interface Order {
  id: string;
  userId: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      
      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };
  
  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (!res.ok) {
        throw new Error('Failed to update order status');
      }
      
      // Update the order in state
      setOrders(prev => 
        prev.map(order => 
          order.id === id ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl mb-4 opacity-30">✧</div>
        <h2 className="font-pirata text-2xl mb-2">{error}</h2>
        <button 
          className="mt-6 magic-button"
          onClick={() => fetchOrders()}
        >
          <span className="relative z-10">Try Again</span>
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-pirata text-3xl text-magic-primary">
              Arcane Orders
            </h1>
            <p className="font-cinzel text-sm mt-1 opacity-70">
              Manage soul bindings and deliveries
            </p>
          </div>
          
          <Link href="/admin" className="magic-button inline-block">
            <span className="relative z-10">Return to Dashboard</span>
          </Link>
        </div>
        
        {orders.length === 0 ? (
          <div className="magic-card text-center py-20">
            <div className="text-5xl mb-4 opacity-30">✧</div>
            <h3 className="font-pirata text-xl mb-2">No orders have been placed</h3>
            <p className="font-cinzel">The summoning pentagram remains dormant.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="magic-card">
                <div className="flex justify-between items-center mb-4 border-b border-magic-border pb-4">
                  <div>
                    <h3 className="font-pirata text-xl text-magic-primary">Order #{order.id.slice(0, 8)}</h3>
                    <p className="font-cinzel text-xs opacity-70">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="font-cinzel text-sm">Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="bg-magic-dark/50 border border-magic-border p-1 font-cinzel text-sm"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="font-cinzel">{item.quantity}x</span>
                        <span className="font-pirata text-magic-primary">{item.product.name}</span>
                      </div>
                      <span className="font-pirata text-magic-accent">
                        {item.price * item.quantity} souls
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-magic-border pt-4 flex justify-between items-center">
                  <span className="font-cinzel">Total Essence:</span>
                  <span className="font-pirata text-magic-accent text-xl">{order.total} souls</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
