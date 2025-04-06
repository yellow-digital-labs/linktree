import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.profileUsername || !data.sessionId || !data.eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Insert analytics data into MySQL database
    await query(
      `INSERT INTO profile_analytics (
        id, profile_username, visitor_id, session_id, event_type,
        link_data, referrer, user_agent, country, city, device, browser
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        data.profileUsername,
        data.visitorId || null,
        data.sessionId,
        data.eventType,
        data.linkData ? JSON.stringify(data.linkData) : null,
        data.referrer || null,
        data.userAgent || null,
        data.country || null,
        data.city || null,
        data.device || null,
        data.browser || null
      ]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing analytics:', error);
    return NextResponse.json(
      { error: 'Failed to store analytics data' },
      { status: 500 }
    );
  }
}