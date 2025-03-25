"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EmailStep from './EmailStep';
import UserDetailsStep from './UserDetailsStep';
import SuccessStep from './SuccessStep';

type OnboardingStep = 'email' | 'details' | 'success';

export default function OnboardingContainer() {
  const [step, setStep] = useState<OnboardingStep>('email');
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    role: '',
    company: '',
  });

  const handleEmailSubmit = async (data: { email: string }) => {
    setUserData({ ...userData, email: data.email });
    setStep('details');
  };

  const handleUserDetailsSubmit = async (data: {
    email: string;
    name: string;
    role: string;
    company?: string;
  }) => {
    try {
      // Update local state
      setUserData({
        ...userData,
        name: data.name,
        role: data.role,
        company: data.company || '',
      });

      // Send data to API
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit onboarding data');
      }

      // Move to success step
      setStep('success');
    } catch (error) {
      console.error('Error submitting user details:', error);
      alert('There was an error submitting your information. Please try again.');
    }
  };

  const handleBack = () => {
    setStep('email');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="skeuomorphic-card w-full max-w-md p-8 md:p-10">
        <AnimatePresence mode="wait">
          {step === 'email' && <EmailStep key="email" onNext={handleEmailSubmit} />}
          {step === 'details' && (
            <UserDetailsStep
              key="details"
              email={userData.email}
              onSubmit={handleUserDetailsSubmit}
              onBack={handleBack}
            />
          )}
          {step === 'success' && <SuccessStep key="success" />}
        </AnimatePresence>
      </div>
    </div>
  );
} 