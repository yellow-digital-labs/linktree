"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicy(): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-gray-200 rounded-lg bg-white p-6 md:p-8"
      >
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-2xl md:text-3xl font-medium text-indigo-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to LinkFolio. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">2. The Data We Collect About You</h2>
          <p className="text-gray-700 leading-relaxed">
            Personal data, or personal information, means any information about an individual from which that person can be identified. 
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 my-4">
            <li><span className="text-indigo-700 font-medium">Identity Data</span> includes first name, last name, username or similar identifier.</li>
            <li><span className="text-indigo-700 font-medium">Contact Data</span> includes email address and telephone numbers.</li>
            <li><span className="text-indigo-700 font-medium">Technical Data</span> includes internet protocol (IP) address, your login data, browser type and version, 
              time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology 
              on the devices you use to access this website.</li>
            <li><span className="text-indigo-700 font-medium">Profile Data</span> includes your username and password, your interests, preferences, feedback, and survey responses.</li>
            <li><span className="text-indigo-700 font-medium">Usage Data</span> includes information about how you use our website and services.</li>
          </ul>

          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">3. How We Use Your Personal Data</h2>
          <p className="text-gray-700 leading-relaxed">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 my-4">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">4. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, 
            or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those 
            employees, agents, contractors, and other third parties who have a business need to know.
          </p>

          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">5. Your Legal Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 my-4">
            <li>The right to request access to your personal data.</li>
            <li>The right to request correction of your personal data.</li>
            <li>The right to request erasure of your personal data.</li>
            <li>The right to object to processing of your personal data.</li>
            <li>The right to request restriction of processing your personal data.</li>
            <li>The right to request transfer of your personal data.</li>
            <li>The right to withdraw consent.</li>
          </ul>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 