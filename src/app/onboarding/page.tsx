"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    bio: '',
    profileImage: null,
    links: [{ title: '', url: '' }]
  });
  const router = useRouter();
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Submit and redirect to dashboard
      router.push('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, links: updatedLinks });
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { title: '', url: '' }]
    });
  };

  const removeLink = (index: number) => {
    const updatedLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: updatedLinks });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-medium text-indigo-900">LinkFolio</div>
          <Link 
            href="/dashboard" 
            className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            Skip
          </Link>
        </div>
      </header>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 mt-8">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-indigo-600 font-semibold">Step {step} of {totalSteps}</div>
            <div className="text-xs text-indigo-600 font-semibold">{Math.round((step / totalSteps) * 100)}%</div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-100">
            <motion.div 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
              initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepContainer key="step1">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Welcome to LinkFolio! 👋</h2>
                <p className="text-gray-600 mb-8">Let's set up your profile so you can start sharing your links with the world.</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Choose your username
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">@</span>
                      </div>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                        placeholder="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      This will be your unique URL: linkfolio.com/{formData.username || 'username'}
                    </p>
                  </div>
                </div>
              </StepContainer>
            )}

            {step === 2 && (
              <StepContainer key="step2">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Tell us about yourself</h2>
                <p className="text-gray-600 mb-8">Add some personal details to make your profile stand out.</p>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      id="bio"
                      rows={3}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="Tell the world a little about yourself"
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture
                    </label>
                    <div className="mt-1 flex items-center space-x-5">
                      <div className="flex-shrink-0">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                          {formData.profileImage ? (
                            <Image 
                              src={formData.profileImage} 
                              alt="Profile" 
                              width={64} 
                              height={64} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <svg className="h-8 w-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </StepContainer>
            )}

            {step === 3 && (
              <StepContainer key="step3">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Add your links</h2>
                <p className="text-gray-600 mb-8">Share your social media profiles, websites, or any other links you want to showcase.</p>
                
                <div className="space-y-6">
                  {formData.links.map((link, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Link #{index + 1}</h3>
                        {formData.links.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLink(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor={`link-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            id={`link-title-${index}`}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3"
                            placeholder="e.g. Twitter, Portfolio, Blog"
                            value={link.title}
                            onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`link-url-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            URL
                          </label>
                          <input
                            type="url"
                            id={`link-url-${index}`}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3"
                            placeholder="https://"
                            value={link.url}
                            onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addLink}
                    className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add another link
                  </button>
                </div>
              </StepContainer>
            )}

            {step === 4 && (
              <StepContainer key="step4">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Choose your style</h2>
                <p className="text-gray-600 mb-8">Select a theme that matches your personal brand.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { name: 'Minimal', color: '#6366F1', bg: '#FFFFFF' },
                    { name: 'Dark', color: '#10B981', bg: '#1F2937' },
                    { name: 'Sunset', color: '#F59E0B', bg: '#FFFBEB' },
                    { name: 'Ocean', color: '#0EA5E9', bg: '#F0F9FF' }
                  ].map((theme, index) => (
                    <div 
                      key={index}
                      className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 transition-colors"
                      style={{ 
                        backgroundColor: theme.bg,
                        borderColor: index === 0 ? '#6366F1' : '#E5E7EB'
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="text-sm font-medium" 
                          style={{ color: theme.bg === '#1F2937' ? '#FFFFFF' : '#1F2937' }}
                        >
                          {theme.name}
                        </span>
                        {index === 0 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <div 
                          className="h-6 w-6 rounded-full" 
                          style={{ backgroundColor: theme.color }}
                        />
                        <div 
                          className="h-6 w-6 rounded-full border" 
                          style={{ 
                            backgroundColor: theme.bg,
                            borderColor: theme.bg === '#FFFFFF' ? '#E5E7EB' : theme.bg
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start space-x-4">
                  <div className="flex-shrink-0 pt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-indigo-800">You can change your theme anytime</h3>
                    <p className="mt-1 text-sm text-indigo-700">
                      Don't worry about making the perfect choice now. You can always update your theme from your dashboard settings.
                    </p>
                  </div>
                </div>
              </StepContainer>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={step === 1}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                step === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {step === totalSteps ? 'Finish Setup' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step container component with animations
function StepContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8"
    >
      {children}
    </motion.div>
  );
} 