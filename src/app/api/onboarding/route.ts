import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, you would save this data to a database
    console.log('Received onboarding data:', body);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ 
      success: true, 
      message: 'User onboarding data received successfully' 
    });
  } catch (error) {
    console.error('Error processing onboarding data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process onboarding data' },
      { status: 500 }
    );
  }
} 