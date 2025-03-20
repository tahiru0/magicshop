import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Order {
  total: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // Get product count
    const productCount = await prisma.product.count();
    
    // Get low stock products
    const lowStockProducts = await prisma.product.count({
      where: {
        inventory: {
          lte: 3
        }
      }
    });
    
    // Get order count
    const orderCount = await prisma.order.count();
    
    // Get total revenue
    const orders = await prisma.order.findMany();
    const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.total, 0);
    
    return NextResponse.json({
      productCount,
      lowStockCount: lowStockProducts,
      orderCount,
      totalRevenue
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
