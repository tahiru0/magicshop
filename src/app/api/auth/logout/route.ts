import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // Clear the auth token cookie
  const cookie = serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expire immediately
    path: '/',
    sameSite: 'strict'
  });
  
  return NextResponse.json(
    { message: 'Logged out successfully' },
    { 
      status: 200,
      headers: { 'Set-Cookie': cookie }
    }
  );
}
