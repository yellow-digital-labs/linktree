"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().max(160, 'Bio must be 160 characters or less').optional(),
  email: z.string().email('Please enter a valid email'),
  location: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile(): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'deleting' | 'success' | 'error'>('idle');
  
  // Mock profile data - in a real app, this would come from your API
  const defaultValues = {
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'Product designer and developer based in New York City',
    email: 'john@example.com',
    location: 'New York, NY',
    website: 'https://johndoe.com',
  };
  
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  
  const onSubmit = async (data: ProfileFormData) => {
    try {
      setSaveStatus('saving');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this data to your API
      console.log('Profile data:', data);
      
      setSaveStatus('success');
      setIsEditing(false);
      
      // Reset form with new values
      reset(data);
      
      // Reset status after a delay
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus('error');
      
      // Reset status after a delay
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    reset(defaultValues);
    setAvatarPreview(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      setDeleteStatus('deleting');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send a delete request to your API
      console.log('Deleting profile...');
      
      setDeleteStatus('success');
      
      // Show success message before redirecting
      setTimeout(() => {
        // In a real app, you would redirect to login or home page
        // and clear user session/auth
        console.log('Profile deleted successfully, would redirect user');
        // window.location.href = '/';
      }, 2000);
      
    } catch (error) {
      console.error('Error deleting profile:', error);
      setDeleteStatus('error');
      
      // Reset status after a delay
      setTimeout(() => setDeleteStatus('idle'), 2000);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="skeuomorphic-card w-full p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">Your Profile</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-primary py-2 px-4 text-sm md:text-base self-start"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <div className="md:col-span-1">
          <div className="skeuomorphic-card p-4 flex flex-col items-center">
            <div className="relative mb-4">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Profile Preview" 
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  {defaultValues.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-1">{defaultValues.displayName}</h2>
            <p className="text-gray-500 text-sm mb-3">@{defaultValues.username}</p>
            
            {!isEditing && (
              <>
                <p className="text-center text-gray-700 text-sm mb-4">{defaultValues.bio}</p>
                <div className="w-full space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {defaultValues.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {defaultValues.email}
                  </div>
                  
                  {defaultValues.website && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={defaultValues.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]">
                        {defaultValues.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          {/* Profile Stats Card - Only visible in non-edit mode */}
          {!isEditing && (
            <div className="skeuomorphic-card p-4 mt-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Profile Stats</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xl font-bold text-gray-800">1,234</p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">567</p>
                  <p className="text-xs text-gray-500">Clicks</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">89%</p>
                  <p className="text-xs text-gray-500">CTR</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Profile Form Section */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Username</label>
                <input
                  {...register('username')}
                  className="input-field"
                  placeholder="username"
                  disabled={!isEditing}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Display Name</label>
                <input
                  {...register('displayName')}
                  className="input-field"
                  placeholder="Your Name"
                  disabled={!isEditing}
                />
                {errors.displayName && <p className="text-red-500 text-xs mt-1">{errors.displayName.message}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Bio</label>
              <textarea
                {...register('bio')}
                className="input-field min-h-[80px] resize-y"
                placeholder="Tell us about yourself (160 characters max)"
                disabled={!isEditing}
              />
              {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Email</label>
              <input
                {...register('email')}
                type="email"
                className="input-field"
                placeholder="email@example.com"
                disabled={!isEditing}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Location</label>
                <input
                  {...register('location')}
                  className="input-field"
                  placeholder="City, Country"
                  disabled={!isEditing}
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Website</label>
                <input
                  {...register('website')}
                  className="input-field"
                  placeholder="https://yourwebsite.com"
                  disabled={!isEditing}
                />
                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
              </div>
            </div>
            
            {isEditing && (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
                <button 
                  type="submit" 
                  className="btn-primary py-2 flex-1 flex justify-center items-center"
                  disabled={saveStatus === 'saving' || !isDirty}
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="btn-secondary py-2 flex-1"
                >
                  Cancel
                </button>
              </div>
            )}
            
            {saveStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm"
              >
                Profile updated successfully!
              </motion.div>
            )}
            
            {saveStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm"
              >
                There was an error updating your profile. Please try again.
              </motion.div>
            )}
          </form>
          
          {/* Delete Profile Section */}
          {isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your profile, there is no going back. Please be certain.
              </p>
              
              {!showDeleteConfirm ? (
                <button 
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-50 text-red-600 border border-red-300 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Delete Profile
                </button>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-700 font-medium mb-4">
                    Are you sure you want to delete your profile? This action cannot be undone.
                  </p>
                  <div className="flex space-x-3">
                    <button 
                      type="button"
                      onClick={handleDeleteProfile}
                      disabled={deleteStatus === 'deleting'}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {deleteStatus === 'deleting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : 'Yes, Delete My Profile'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              {deleteStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm"
                >
                  Profile deleted successfully! Redirecting...
                </motion.div>
              )}
              
              {deleteStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm"
                >
                  There was an error deleting your profile. Please try again.
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 