import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Lấy thông tin một sản phẩm theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const product = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi truy vấn dữ liệu' },
      { status: 500 }
    );
  }
}

// PUT: Cập nhật thông tin sản phẩm
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();
    
    // Kiểm tra sản phẩm có tồn tại không
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }
    
    // Cập nhật sản phẩm
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price !== undefined ? parseFloat(data.price) : undefined,
        priceDisplay: data.priceDisplay,
        description: data.description,
        image: data.image,
        category: data.category,
        inventory: data.inventory !== undefined ? data.inventory : undefined,
        featured: data.featured !== undefined ? data.featured : undefined
      }
    });
    
    return NextResponse.json({ product: updatedProduct }, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi cập nhật sản phẩm' },
      { status: 500 }
    );
  }
}

// DELETE: Xóa sản phẩm
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Kiểm tra sản phẩm có tồn tại không
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }
    
    // Xóa sản phẩm
    await prisma.product.delete({
      where: { id }
    });
    
    return NextResponse.json(
      { message: 'Xóa sản phẩm thành công' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi xóa sản phẩm' },
      { status: 500 }
    );
  }
}
