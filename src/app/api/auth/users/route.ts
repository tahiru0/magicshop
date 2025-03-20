import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // Check if any users exist
    const userCount = await prisma.user.count();
    
    return NextResponse.json(
      { isEmpty: userCount === 0 },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking users:', error);
    return NextResponse.json(
      { error: 'Failed to check users' },
      { status: 500 }
    );
  }
}
