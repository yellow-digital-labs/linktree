import { initDatabase } from '@/lib/db';

// Initialize database when the server starts
export async function init() {
  await initDatabase();
} 