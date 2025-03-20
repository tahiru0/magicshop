import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET: Fetch user's cart
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Fetch user's cart from database
    const cartData = await prisma.userCart.findUnique({
      where: { userId: user.id },
      select: { cartItems: true }
    });
    
    // If no cart exists yet, return empty cart
    if (!cartData) {
      return NextResponse.json({ cart: [] }, { status: 200 });
    }
    
    return NextResponse.json({ cart: cartData.cartItems }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart data' },
      { status: 500 }
    );
  }
}

// PUT: Update user's cart
export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { cart } = await request.json();
    
    // Upsert cart data
    await prisma.userCart.upsert({
      where: { userId: user.id },
      update: { cartItems: cart },
      create: {
        userId: user.id,
        cartItems: cart
      }
    });
    
    return NextResponse.json(
      { message: 'Cart updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}
