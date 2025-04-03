import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const users = await query(
      'SELECT id, email, username FROM users WHERE email = ? LIMIT 1',
      [email]
    ) as any[];

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Generate new auth token
    const token = Buffer.from(
      `${user.id}:${user.email}:${Date.now()}:${crypto.randomBytes(32).toString('hex')}`
    ).toString('base64');

    // Update auth token in database
    await query(
      'UPDATE users SET auth_token = ? WHERE id = ?',
      [token, user.id]
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 