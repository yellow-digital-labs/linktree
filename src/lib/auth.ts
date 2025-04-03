import { NextRequest } from 'next/server';
import { query } from './db';

export async function verifyAuthToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    throw new Error('No authorization header');
  }

  const token = authHeader.replace('Bearer ', '');
  const [userId, email] = Buffer.from(token, 'base64')
    .toString()
    .split(':');

  // Verify token exists in database
  const users = await query(
    'SELECT id FROM users WHERE id = ? AND auth_token = ?',
    [userId, token]
  ) as any[];

  if (users.length === 0) {
    throw new Error('Invalid token');
  }

  return { userId: Number(userId), email };
} 