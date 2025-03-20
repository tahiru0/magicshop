"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  productCount: number;
  orderCount: number;
  totalRevenue: number;
  lowStockCount: number;
}

interface Product {
  id: string;
  inventory: number;
}

interface Order {
  total: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    productCount: 0,
    orderCount: 0,
    totalRevenue: 0,
    lowStockCount: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Fetch products
        const productsRes = await fetch('/api/products');
        const productsData = await productsRes.json();
        
        // Fetch orders
        const ordersRes = await fetch('/api/orders');
        const ordersData = await ordersRes.json();
        
        // Calculate stats
        const products = productsData.products || [];
        const orders = ordersData.orders || [];
        
        const lowStockItems = products.filter((p: Product) => p.inventory <= 3);
        const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.total, 0);
        
        setStats({
          productCount: products.length,
          orderCount: orders.length,
          totalRevenue,
          lowStockCount: lowStockItems.length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);
  
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
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-pirata text-3xl text-magic-primary mb-8">Arcane Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="magic-card p-6">
            <div className="text-sm font-cinzel opacity-70">Total Products</div>
            <div className="text-3xl font-pirata text-magic-primary mt-2">{stats.productCount}</div>
            <Link href="/admin/products" className="text-xs font-cinzel mt-4 inline-block opacity-70 hover:opacity-100">
              View All Products →
            </Link>
          </div>
          
          <div className="magic-card p-6">
            <div className="text-sm font-cinzel opacity-70">Total Orders</div>
            <div className="text-3xl font-pirata text-magic-primary mt-2">{stats.orderCount}</div>
            <Link href="/admin/orders" className="text-xs font-cinzel mt-4 inline-block opacity-70 hover:opacity-100">
              View All Orders →
            </Link>
          </div>
          
          <div className="magic-card p-6">
            <div className="text-sm font-cinzel opacity-70">Total Revenue</div>
            <div className="text-3xl font-pirata text-magic-accent mt-2">{stats.totalRevenue} souls</div>
            <div className="text-xs font-cinzel mt-4 opacity-70">
              From all completed orders
            </div>
          </div>
          
          <div className="magic-card p-6">
            <div className="text-sm font-cinzel opacity-70">Low Stock Items</div>
            <div className="text-3xl font-pirata text-magic-accent mt-2">{stats.lowStockCount}</div>
            <Link href="/admin/products" className="text-xs font-cinzel mt-4 inline-block opacity-70 hover:opacity-100">
              Check Inventory →
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="magic-card p-6">
            <h2 className="font-pirata text-xl text-magic-primary mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link href="/admin/products/new" className="block magic-button text-center">
                <span className="relative z-10">Add New Product</span>
              </Link>
              <Link href="/admin/orders" className="block magic-button text-center">
                <span className="relative z-10">Manage Orders</span>
              </Link>
              <Link href="/" className="block magic-button text-center">
                <span className="relative z-10">View Store Front</span>
              </Link>
            </div>
          </div>
          
          <div className="magic-card p-6">
            <h2 className="font-pirata text-xl text-magic-primary mb-4">Arcane Notifications</h2>
            
            {stats.lowStockCount > 0 && (
              <div className="flex items-start space-x-4 mb-4 pb-4 border-b border-magic-border/30">
                <div className="text-magic-accent text-lg">⚠</div>
                <div>
                  <p className="font-cinzel text-sm">
                    {stats.lowStockCount} product{stats.lowStockCount > 1 ? 's' : ''} have low inventory
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    Consider replenishing your arcane supplies soon
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className="text-magic-primary text-lg">✧</div>
              <div>
                <p className="font-cinzel text-sm">
                  The arcane energies are aligned for commerce
                </p>
                <p className="text-xs opacity-70 mt-1">
                  Today is a favorable day for magical transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
