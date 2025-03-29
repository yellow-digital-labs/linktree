import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.stepName === 'account_setup') {
      // Check if username or email already exists
      const existingUser = await query(
        'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1',
        [body.data.username, body.data.email]
      );
      
      if ((existingUser as any[]).length > 0) {
        const existing = (existingUser as any[])[0];
        const field = existing.username === body.data.username ? 'username' : 'email';
        return NextResponse.json(
          { success: false, message: `This ${field} is already taken. Please choose another one.` },
          { status: 409 }
        );
      }
      
      // Use the common query function to insert data
      const result = await query(
        'INSERT INTO users (username, email, created_at) VALUES (?, ?, NOW())',
        [body.data.username, body.data.email]
      );

      let token = Buffer.from(
        `${(result as any).insertId}:${body.data.email}:${Date.now()}:${crypto.randomBytes(32).toString('hex')}`
      ).toString('base64')
      
      // Store the token in the database
      await query(
        'UPDATE users SET auth_token = ? WHERE id = ?',
        [token, (result as any).insertId]
      );

      return NextResponse.json({ 
        success: true,
        message: 'User onboarding data saved to database successfully', 
        userId: (result as any).insertId,
        token: token
      });
    } else {
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error processing onboarding data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process onboarding data' },
      { status: 500 }
    );
  }
} 