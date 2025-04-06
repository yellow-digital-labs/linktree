'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { MdLocationOn, MdWork } from 'react-icons/md';
import { trackProfileVisit, getSessionId, getDeviceInfo } from '@/utils/analytics';

interface ProfileData {
  username: string;
  name: string;
  bio: string;
  avatar?: string;
  industry?: string;
  theme?: string;
  socialLinks?: {
    platform: string;
    url: string;
    buttonText?: string;
  }[];
}

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const sessionId = getSessionId();
  const { device, browser } = getDeviceInfo();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setProfile(data.profile);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
        console.error('Profile fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchProfile();
      
      // Track page view
      trackProfileVisit({
        profileUsername: username as string,
        sessionId,
        eventType: 'page_view',
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        device,
        browser
      });
    }
  }, [username, sessionId, device, browser]);

  // Function to track link clicks
  const handleLinkClick = (platform: string, url: string) => {
    trackProfileVisit({
      profileUsername: username as string,
      sessionId,
      eventType: 'link_click',
      linkData: {
        platform,
        url
      },
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      device,
      browser
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-gray-600">{error || 'Profile not found'}</p>
      </div>
    );
  }

  // Determine theme colors
  const theme = profile.theme || 'Light';
  const bgColor = 
    theme === 'Dark' ? 'bg-gray-900' : 
    theme === 'Sunset' ? 'bg-amber-50' : 
    theme === 'Ocean' ? 'bg-sky-50' : 
    'bg-white';
  
  const textColor = 
    theme === 'Dark' ? 'text-white' : 'text-gray-900';
  
  const secondaryTextColor = 
    theme === 'Dark' ? 'text-gray-300' : 'text-gray-500';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className={`w-full max-w-md border rounded-lg overflow-hidden ${bgColor}`}>
        {/* Profile Header */}
        <div className="p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
            {profile.avatar ? (
              <Image 
                src={profile.avatar} 
                alt={profile.name} 
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${
                theme === 'Dark' ? 'text-gray-600' : 'text-gray-400'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          
          <h1 className={`text-xl font-bold ${textColor}`}>
            {profile.name}
          </h1>
          
          <p className={`text-sm mt-1 ${secondaryTextColor}`}>
            @{profile.username}
          </p>
          
          {profile.industry && (
            <p className={`text-sm mt-2 ${secondaryTextColor}`}>
              {profile.industry}
            </p>
          )}
          
          {profile.bio && (
            <p className={`mt-4 text-sm ${secondaryTextColor}`}>
              {profile.bio}
            </p>
          )}
        </div>
        
        {/* Links */}
        <div className="px-6 pb-8 space-y-3">
          {profile.socialLinks && profile.socialLinks.map((link, index) => {
            if (!link.url) return null;
            
            const buttonColor = 
              theme === 'Minimal' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' :
              theme === 'Dark' ? 'bg-green-600 hover:bg-green-700 text-white' :
              theme === 'Sunset' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
              'bg-sky-500 hover:bg-sky-600 text-white';
              
            return (
              <div key={index} className="w-full">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors ${buttonColor} block text-center`}
                  onClick={() => handleLinkClick(link.platform, link.url)}
                >
                  {link.buttonText || getPlatformName(link.platform)}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getPlatformName(platform: string): string {
  const platforms: Record<string, string> = {
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    website: 'Website',
    instagram: 'Instagram',
    facebook: 'Facebook',
    youtube: 'YouTube',
    tiktok: 'TikTok'
  };
  
  return platforms[platform.toLowerCase()] || platform;
} 