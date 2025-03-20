/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';
import { verify } from 'jsonwebtoken';

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

/**
 * Get user from request
 */
export const getUserFromRequest = async (request: NextRequest): Promise<User | null> => {
  try {
    // Fix: await the cookies() call
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) return null;
    
    // Verify JWT
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret'
    ) as { id: string };
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    
    if (!user) return null;
    
    // Return user (excluding password)
    return {
      id: user.id,
      name: user.name || '',
      email: user.email,
      isAdmin: !!user.isAdmin
    };
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
};

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = async (request: NextRequest): Promise<boolean> => {
  const user = await getUserFromRequest(request);
  return !!user;
};

/**
 * Check if the user is an admin
 */
export const isAdmin = async (request: NextRequest): Promise<boolean> => {
  const user = await getUserFromRequest(request);
  return !!user?.isAdmin;
};
