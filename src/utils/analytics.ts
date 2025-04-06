import { v4 as uuidv4 } from 'uuid';

interface ProfileVisitData {
  profileUsername: string;
  visitorId?: string;
  sessionId: string;
  eventType: 'page_view' | 'link_click' | 'share';
  linkData?: {
    platform: string;
    url: string;
  };
  referrer?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
}

// Function to get user's geolocation
async function getGeolocation() {
  return new Promise<{ latitude: number; longitude: number; country?: string; city?: string; state?: string }>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        resolve({
          latitude,
          longitude,
        });
      }, reject);
    } else {
      reject(new Error('Geolocation not supported'));
    }
  });
}

// Update trackProfileVisit to include geolocation data
export async function trackProfileVisit(data: ProfileVisitData) {
  try {
    const geolocation = await getGeolocation();
    const payload = {
      ...data,
      ...geolocation,
    };

    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Analytics API error:', errorData);
    }
  } catch (err) {
    console.error('Failed to track profile visit:', err);
  }
}

// Generate a unique session ID if one doesn't exist
export function getSessionId() {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('profile_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('profile_session_id', sessionId);
  }
  return sessionId;
}

// Helper function to extract device and browser info
export function getDeviceInfo() {
  if (typeof window === 'undefined') return { device: '', browser: '' };
  
  const userAgent = navigator.userAgent;
  
  // Simple device detection
  let device = 'desktop';
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    device = 'ios';
  } else if (/Android/i.test(userAgent)) {
    device = 'android';
  } else if (/Windows Phone/i.test(userAgent)) {
    device = 'windows_phone';
  }
  
  // Simple browser detection
  let browser = 'unknown';
  if (/Chrome/i.test(userAgent) && !/Chromium|Edge|Edg/i.test(userAgent)) {
    browser = 'chrome';
  } else if (/Firefox/i.test(userAgent)) {
    browser = 'firefox';
  } else if (/Safari/i.test(userAgent) && !/Chrome|Chromium/i.test(userAgent)) {
    browser = 'safari';
  } else if (/Edge|Edg/i.test(userAgent)) {
    browser = 'edge';
  } else if (/MSIE|Trident/i.test(userAgent)) {
    browser = 'ie';
  }
  
  return { device, browser };
}
