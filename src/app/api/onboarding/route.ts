import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import crypto from 'crypto';
import { verifyAuthToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if(body.stepName !== 'account_setup') {
      // Decode the token
      try {
        const { userId, email } = await verifyAuthToken(request);
        body.data.userId = userId;
      } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json(
            { success: false, message: error.message },
            { status: 401 }
          );
        }
        return NextResponse.json(
          { success: false, message: 'Authentication failed' },
          { status: 401 }
        );
      }
    }

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
    } else if (body.stepName === 'password') {
      // Hash the password before storing it
      const hashedPassword = crypto.createHash('sha256').update(body.data.password).digest('hex');
      
      await query(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, body.data.userId]
      );
      
      return NextResponse.json({ 
        success: true,
        message: 'Password updated successfully'
      });
    } else if (body.stepName === 'industry') {
      
      await query(
        'UPDATE users SET industry = ? WHERE id = ?',
        [body.data.industry, body.data.userId]
      );
      
      return NextResponse.json({ 
        success: true,
        message: 'Industry information saved successfully'
      });
    } else if (body.stepName === 'profile_info') {
      await query(
        'UPDATE users SET bio = ?, full_name = ? WHERE id = ?',
        [body.data.bio, body.data.fullName, body.data.userId]
      );
      
      return NextResponse.json({ 
        success: true,
        message: 'Profile information updated successfully'
      });
    } else if (body.stepName === 'links') {
      // First delete any existing links for this user
      await query(
        'DELETE FROM social_links WHERE user_id = ?',
        [body.data.userId]
      );
      
      // Insert all the new links
      for (const link of body.data.links) {
        await query(
          'INSERT INTO social_links (user_id, platform, url, button_text) VALUES (?, ?, ?, ?)',
          [body.data.userId, link.title, link.url, link.buttonText]
        );
      }
      
      return NextResponse.json({ 
        success: true,
        message: 'Social links updated successfully'
      });
    } else if (body.stepName === 'theme') {
      await query(
        'UPDATE users SET theme_preference = ? WHERE id = ?',
        [body.data.theme, body.data.userId]
      );
      
      return NextResponse.json({ 
        success: true,
        message: 'Theme preference saved successfully'
      });
    } else if (body.stepName === 'complete') {
      await query(
        'UPDATE users SET onboarding_completed = TRUE, onboarding_completed_at = NOW() WHERE id = ?',
        [body.data.userId]
      );
      
      return NextResponse.json({ 
        success: true,
        message: 'Onboarding completed successfully'
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