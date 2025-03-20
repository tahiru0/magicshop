import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Lấy tất cả sản phẩm hoặc lọc theo category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    
    const where = {};
    if (category) Object.assign(where, { category });
    if (featured) Object.assign(where, { featured: true });
    
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi truy vấn dữ liệu' },
      { status: 500 }
    );
  }
}

// POST: Tạo sản phẩm mới
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate dữ liệu đầu vào
    if (!data.name || !data.price || !data.category) {
      return NextResponse.json(
        { error: 'Thông tin sản phẩm không đầy đủ' },
        { status: 400 }
      );
    }
    
    // Tạo sản phẩm mới
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        priceDisplay: data.priceDisplay || `${data.price} souls`,
        description: data.description || '',
        image: data.image,
        category: data.category,
        inventory: data.inventory || 0,
        featured: data.featured || false
      }
    });
    
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi tạo sản phẩm' },
      { status: 500 }
    );
  }
}
