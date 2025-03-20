import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { serialize } from 'cookie';

// Simple password verification without bcrypt for demo purposes
// In production, use a proper bcrypt implementation
const verifyPassword = (password: string, hashedPassword: string): boolean => {
  // This is a very simplified version. In production, use bcrypt.compare
  const hash = crypto.createHash('sha256')
    .update(password + "magicshopsalt")  // Simple salt for demo
    .digest('hex');
  
  return hash === hashedPassword;
};

// Login endpoint
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Verify password (simplified for demo)
    if (!verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Create session token
    const token = crypto.randomBytes(64).toString('hex');
    
    // Set cookie
    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });
    
    // Return user data (except password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: __password, ...userData } = user;
    
    return NextResponse.json(
      { user: userData, message: 'Login successful' },
      { 
        status: 200,
        headers: { 'Set-Cookie': cookie }
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
