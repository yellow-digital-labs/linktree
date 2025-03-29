import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Use the common query function to insert data
    const result = await query(
      'INSERT INTO users (name, email, created_at) VALUES (?, ?, NOW())',
      [body.data.username, body.data.email]
    );
    
    console.log('Saved onboarding data to database:', result);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ 
      success: true, 
      message: 'User onboarding data saved to database successfully' 
    });
  } catch (error) {
    console.error('Error processing onboarding data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process onboarding data' },
      { status: 500 }
    );
  }
} 