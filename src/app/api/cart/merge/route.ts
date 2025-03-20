import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: string;
    numericPrice: number;
    image: string;
    category: string;
    description: string;
  };
  quantity: number;
}

// POST: Merge local cart with server cart
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { cart: localCart } = await request.json() as { cart: CartItem[] };
    
    // Fetch existing server cart
    const serverCartData = await prisma.userCart.findUnique({
      where: { userId: user.id },
      select: { cartItems: true }
    });
    
    const serverCart = serverCartData?.cartItems as CartItem[] || [];
    const mergedCart = [...serverCart];
    
    // Merge the carts
    localCart.forEach((localItem: CartItem) => {
      // Check if item already exists in server cart
      const existingItemIndex = mergedCart.findIndex(
        (item: CartItem) => item.id === localItem.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        mergedCart[existingItemIndex].quantity += localItem.quantity;
      } else {
        // Add new item if it doesn't exist
        mergedCart.push(localItem);
      }
    });
    
    // Save merged cart
    await prisma.userCart.upsert({
      where: { userId: user.id },
      update: { cartItems: mergedCart },
      create: {
        userId: user.id,
        cartItems: mergedCart
      }
    });
    
    return NextResponse.json({ 
      message: 'Cart merged successfully',
      cart: mergedCart
    }, { status: 200 });
  } catch (error) {
    console.error('Error merging cart:', error);
    return NextResponse.json(
      { error: 'Failed to merge cart' },
      { status: 500 }
    );
  }
}
