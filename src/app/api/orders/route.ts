import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

interface OrderItem {
  productId: string;
  quantity: number;
}

// GET: Lấy danh sách đơn hàng (yêu cầu xác thực)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement authentication
    // const user = await getAuthenticatedUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi truy vấn dữ liệu' },
      { status: 500 }
    );
  }
}

// POST: Tạo đơn hàng mới
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate dữ liệu đầu vào
    if (!data.userId || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Thông tin đơn hàng không đầy đủ' },
        { status: 400 }
      );
    }
    
    // Tính tổng tiền và kiểm tra sản phẩm
    let total = 0;
    const productsToCheck = data.items.map((item: OrderItem) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productsToCheck } }
    });
    
    // Kiểm tra sản phẩm tồn tại
    if (products.length !== productsToCheck.length) {
      return NextResponse.json(
        { error: 'Một vài sản phẩm không tồn tại' },
        { status: 400 }
      );
    }
    
    // Tạo đơn hàng trong transaction
    const order = await prisma.$transaction(async (tx: PrismaClient) => {
      // Tạo đơn hàng
      const newOrder = await tx.order.create({
        data: {
          userId: data.userId,
          total: 0, // Sẽ cập nhật sau
          status: 'PENDING',
          items: {
            create: []
          }
        }
      });
      
      // Tạo chi tiết đơn hàng và cập nhật tổng tiền
      for (const item of data.items) {
        const product = products.find((p: { id: string }) => p.id === item.productId);
        const price = product.price;
        total += price * item.quantity;
        
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: price
          }
        });
        
        // Cập nhật số lượng tồn kho
        await tx.product.update({
          where: { id: item.productId },
          data: { inventory: { decrement: item.quantity } }
        });
      }
      
      // Cập nhật tổng tiền của đơn hàng
      return tx.order.update({
        where: { id: newOrder.id },
        data: { total },
        include: { items: true }
      });
    });
    
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi tạo đơn hàng' },
      { status: 500 }
    );
  }
}
