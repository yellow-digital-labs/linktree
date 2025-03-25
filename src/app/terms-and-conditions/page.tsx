"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsAndConditions(): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-gray-200 rounded-lg bg-white p-6 md:p-8"
      >
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-2xl md:text-3xl font-medium text-indigo-900 mb-2">Terms and Conditions</h1>
          <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            These terms and conditions outline the rules and regulations for the use of LinkFolio's website.
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use 
            LinkFolio's website if you do not accept all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">2. License to Use</h2>
          <p className="text-gray-700 leading-relaxed">
            Unless otherwise stated, LinkFolio and/or its licensors own the intellectual property rights for all material on LinkFolio. 
            All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use 
            subject to restrictions set in these terms and conditions.
          </p>
          
          <p className="text-gray-700 leading-relaxed mt-3">You must not:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 my-4">
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from this website</li>
            <li>Reproduce, duplicate or copy material from this website</li>
            <li>Redistribute content from LinkFolio (unless content is specifically made for redistribution)</li>
          </ul>

          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">3. User Content</h2>
          <p className="text-gray-700 leading-relaxed">
            In these terms and conditions, "User Content" means material (including without limitation text, images, audio material, 
            video material and audio-visual material) that you submit to this website, for whatever purpose.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            You grant to LinkFolio a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, 
            translate and distribute your User Content in any existing or future media. You also grant to LinkFolio the right to 
            sub-license these rights, and the right to bring an action for infringement of these rights.
          </p>

          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">4. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            The materials on LinkFolio's website are provided on an 'as is' basis. LinkFolio makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of 
            merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            In no event shall LinkFolio or its suppliers be liable for any damages (including, without limitation, damages for loss of 
            data or profit, or due to business interruption) arising out of the use or inability to use the materials on LinkFolio's 
            website, even if LinkFolio or a LinkFolio authorized representative has been notified orally or in writing of the possibility 
            of such damage.
          </p>

          <h2 className="text-xl font-medium text-indigo-800 mt-6 mb-3">5. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the 
            exclusive jurisdiction of the courts in that location.
          </p>
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