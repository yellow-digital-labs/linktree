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
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    fullName: '',
    bio: '',
    profileImage: null,
    links: [{ title: '', url: '', buttonText: '' }],
    theme: 'Minimal' // Default theme
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const totalSteps = 6;

  const validateStep = (currentStep: number) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
        isValid = false;
      } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, underscores and hyphens';
        isValid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!formData.industry) {
        newErrors.industry = 'Please select your industry';
        isValid = false;
      }
    } else if (currentStep === 4) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
      }
    } else if (currentStep === 5) {
      const hasValidLink = formData.links.some(link => 
        link.title.trim() && link.url.trim() && link.url.includes('.')
      );
      
      if (!hasValidLink) {
        newErrors.links = 'At least one valid link is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        // Submit and redirect to dashboard
        router.push('/dashboard');
      }
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
    
    // Add URL prefix when platform is selected
    if (field === 'title') {
      let urlPrefix = '';
      switch (value) {
        case 'Instagram':
          urlPrefix = 'https://instagram.com/';
          break;
        case 'Facebook':
          urlPrefix = 'https://facebook.com/';
          break;
        case 'YouTube':
          urlPrefix = 'https://youtube.com/';
          break;
        case 'X':
          urlPrefix = 'https://x.com/';
          break;
        case 'Spotify':
          urlPrefix = 'https://open.spotify.com/';
          break;
        case 'SoundCloud':
          urlPrefix = 'https://soundcloud.com/';
          break;
        case 'Apple Music':
          urlPrefix = 'https://music.apple.com/';
          break;
        case 'Audiomack':
          urlPrefix = 'https://audiomack.com/';
          break;
        case 'Pinterest':
          urlPrefix = 'https://pinterest.com/';
          break;
        case 'Clubhouse':
          urlPrefix = 'https://clubhouse.com/@';
          break;
        default:
          urlPrefix = 'https://';
      }
      updatedLinks[index].url = urlPrefix;
      
      // Set default button text based on platform
      if (!updatedLinks[index].buttonText) {
        updatedLinks[index].buttonText = value;
      }
    }
    
    setFormData({ ...formData, links: updatedLinks });
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { title: '', url: '', buttonText: '' }]
    });
  };

  const removeLink = (index: number) => {
    const updatedLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: updatedLinks });
  };

  const getPrefixForDisplay = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'instagram.com/';
      case 'Facebook': return 'facebook.com/';
      case 'YouTube': return 'youtube.com/';
      case 'X': return 'x.com/';
      case 'Spotify': return 'open.spotify.com/';
      case 'SoundCloud': return 'soundcloud.com/';
      case 'Apple Music': return 'music.apple.com/';
      case 'Audiomack': return 'audiomack.com/';
      case 'Pinterest': return 'pinterest.com/';
      case 'Clubhouse': return 'clubhouse.com/@';
      default: return '';
    }
  };

  const getInputValue = (link: { title: string, url: string }) => {
    if (!link.title) return link.url;
    
    const prefix = getPrefixForUrl(link.title);
    if (link.url.startsWith(prefix)) {
      return link.url.substring(prefix.length);
    }
    return link.url;
  };

  const getPrefixForUrl = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'https://instagram.com/';
      case 'Facebook': return 'https://facebook.com/';
      case 'YouTube': return 'https://youtube.com/';
      case 'X': return 'https://x.com/';
      case 'Spotify': return 'https://open.spotify.com/';
      case 'SoundCloud': return 'https://soundcloud.com/';
      case 'Apple Music': return 'https://music.apple.com/';
      case 'Audiomack': return 'https://audiomack.com/';
      case 'Pinterest': return 'https://pinterest.com/';
      case 'Clubhouse': return 'https://clubhouse.com/@';
      default: return 'https://';
    }
  };

  const handleUrlChange = (index: number, value: string, platform: string) => {
    const prefix = getPrefixForUrl(platform);
    const updatedLinks = [...formData.links];
    updatedLinks[index] = { 
      ...updatedLinks[index], 
      url: platform ? prefix + value : value 
    };
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleThemeSelect = (themeName: string) => {
    setFormData({
      ...formData,
      theme: themeName
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-medium text-indigo-900 hover:text-indigo-700 transition-colors">
            LinkFolio
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
                        className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3 ${
                          errors.username ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                        }`}
                        placeholder="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.username ? (
                      <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500">
                        This will be your unique URL: linkfolio.com/{formData.username || 'username'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 ${
                        errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                      }`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      We'll use this to send you important updates and notifications.
                    </p>
                  </div>
                </div>
              </StepContainer>
            )}

            {step === 2 && (
              <StepContainer key="step2">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Create your password</h2>
                <p className="text-gray-600 mb-8">Choose a secure password to protect your account.</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 ${
                        errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                      }`}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Use at least 8 characters with a mix of letters, numbers, and symbols.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 ${
                        errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                      }`}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mt-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-indigo-700">
                        Your password is securely stored and never shared with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </StepContainer>
            )}

            {step === 3 && (
              <StepContainer key="step3">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">What industry are you in?</h2>
                <p className="text-gray-600 mb-8">This helps us customize your experience and connect you with like-minded creators.</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                      Select your industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      className={`mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                        errors.industry ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                      }`}
                      value={formData.industry}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an industry</option>
                      <option value="fashion">Fashion</option>
                      <option value="health_fitness">Health & Fitness</option>
                      <option value="marketing">Marketing</option>
                      <option value="music">Music</option>
                      <option value="art_design">Art & Design</option>
                      <option value="technology">Technology</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance</option>
                      <option value="food_beverage">Food & Beverage</option>
                      <option value="travel">Travel</option>
                      <option value="gaming">Gaming</option>
                      <option value="beauty">Beauty</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="mt-2 text-sm text-red-600">{errors.industry}</p>
                    )}
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mt-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-indigo-700">
                        We'll use this information to suggest relevant features and templates for your profile.
                      </p>
                    </div>
                  </div>
                </div>
              </StepContainer>
            )}

            {step === 4 && (
              <StepContainer key="step4">
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
                      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 ${
                        errors.fullName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                      }`}
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                    )}
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
                </div>
              </StepContainer>
            )}

            {step === 5 && (
              <StepContainer key="step5">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Add your links</h2>
                <p className="text-gray-600 mb-8">Share your social media profiles, websites, or any other links you want to showcase.</p>
                
                {errors.links && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.links}</p>
                  </div>
                )}
                
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
                            Platform
                          </label>
                          <select
                            id={`link-title-${index}`}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3"
                            value={link.title}
                            onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                          >
                            <option value="">Select a platform</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Facebook">Facebook</option>
                            <option value="YouTube">YouTube</option>
                            <option value="X">X (Twitter)</option>
                            <option value="Spotify">Spotify</option>
                            <option value="SoundCloud">SoundCloud</option>
                            <option value="Apple Music">Apple Music</option>
                            <option value="Audiomack">Audiomack</option>
                            <option value="Pinterest">Pinterest</option>
                            <option value="Clubhouse">Clubhouse</option>
                            <option value="Books">Books</option>
                            <option value="FAQs">FAQs</option>
                            <option value="Header">Header</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Music">Music</option>
                            <option value="Music Presave">Music Presave</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor={`link-url-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            URL
                          </label>
                          <div className="flex">
                            {link.title && (
                              <div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                {getPrefixForDisplay(link.title)}
                              </div>
                            )}
                            <input
                              type="text"
                              id={`link-url-${index}`}
                              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 py-3 ${
                                link.title ? 'rounded-r-md' : 'rounded-md'
                              }`}
                              placeholder={link.title ? "username" : "https://"}
                              value={getInputValue(link)}
                              onChange={(e) => handleUrlChange(index, e.target.value, link.title)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor={`button-text-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Button Text
                          </label>
                          <input
                            type="text"
                            id={`button-text-${index}`}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3"
                            placeholder="Follow me on Instagram"
                            value={link.buttonText || ''}
                            onChange={(e) => handleLinkChange(index, 'buttonText', e.target.value)}
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Text that will appear on the button for this link
                          </p>
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

            {step === 6 && (
              <StepContainer key="step6">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Choose your style</h2>
                <p className="text-gray-600 mb-8">Select a theme that matches your personal brand.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { name: 'Minimal', color: '#6366F1', bg: '#FFFFFF' },
                    { name: 'Dark', color: '#10B981', bg: '#1F2937' },
                    { name: 'Sunset', color: '#F59E0B', bg: '#FFFBEB' },
                    { name: 'Ocean', color: '#0EA5E9', bg: '#F0F9FF' }
                  ].map((theme) => (
                    <div 
                      key={theme.name}
                      className={`border rounded-lg p-4 cursor-pointer hover:border-indigo-500 transition-colors ${
                        formData.theme === theme.name ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
                      }`}
                      style={{ 
                        backgroundColor: theme.bg
                      }}
                      onClick={() => handleThemeSelect(theme.name)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="text-sm font-medium" 
                          style={{ color: theme.bg === '#1F2937' ? '#FFFFFF' : '#1F2937' }}
                        >
                          {theme.name}
                        </span>
                        {formData.theme === theme.name && (
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