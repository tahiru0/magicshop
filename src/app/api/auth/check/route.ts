/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Fix: await the cookies() call
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
    
    // Verify JWT
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret'
    ) as { id: string };
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    
    if (!user) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
    
    // Return user data (except password)
    const { password: _, ...userData } = user;
    
    return NextResponse.json({ 
      authenticated: true,
      user: {
        ...userData,
        isAdmin: !!user.isAdmin
      }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
