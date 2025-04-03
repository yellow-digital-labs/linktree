import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    // Ensure username is properly extracted
    if (!params || !(await params).username) {
      return NextResponse.json(
        { success: false, message: 'Username parameter is required' },
        { status: 400 }
      );
    }

    const username = (await params).username;
    console.log('Fetching profile for username:', username);

    // Fetch user details
    const users = await query(
      `SELECT id, username, email, full_name, bio, industry, theme_preference 
       FROM users WHERE username = ? LIMIT 1`,
      [username]
    ) as any[];

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Profile not found' },
        { status: 404 }
      );
    }

    const user = users[0];

    // Fetch user's social links
    const links = await query(
      `SELECT platform, url, button_text 
       FROM social_links 
       WHERE user_id = ?`,
      [user.id]
    ) as any[];

    return NextResponse.json({
      success: true,
      profile: {
        username: user.username,
        name: user.full_name || '',
        bio: user.bio || '',
        industry: user.industry || '',
        theme: user.theme_preference || 'light',
        socialLinks: links.map(link => ({
          platform: link.platform,
          url: link.url,
          buttonText: link.button_text
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch profile', error: String(error) },
      { status: 500 }
    );
  }
} 