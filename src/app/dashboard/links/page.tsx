"use client";

import { useState } from 'react';
import LinkManager from '@/components/links/LinkManager';
import LinkTree from '@/components/links/LinkTree';

export default function ManageLinks() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [username, setUsername] = useState('username');
  const [links, setLinks] = useState([
    { id: '1', title: 'My Website', url: 'https://example.com' },
    { id: '2', title: 'Twitter', url: 'https://twitter.com' },
    { id: '3', title: 'Instagram', url: 'https://instagram.com' },
  ]);

  return (
    <div className="skeuomorphic-card w-full p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Manage Links</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-300 mb-4 md:mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-3 md:px-4 py-2 font-medium text-sm md:text-base whitespace-nowrap ${
            activeTab === 'edit' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Edit Links
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-3 md:px-4 py-2 font-medium text-sm md:text-base whitespace-nowrap ${
            activeTab === 'preview' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Preview
        </button>
      </div>
      
      {/* Content */}
      {activeTab === 'edit' ? (
        <div>
          <div className="mb-4 md:mb-6">
            <label className="block text-gray-700 mb-1 text-sm md:text-base">Your Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field text-sm md:text-base"
              placeholder="username"
            />
          </div>
          <LinkManager />
        </div>
      ) : (
        <div className="py-2 md:py-4 flex justify-center">
          <div className="w-full max-w-sm">
            <div className="skeuomorphic-card p-4 mb-4 text-center">
              <p className="text-sm text-gray-600">This is how your LinkTree will look to visitors</p>
            </div>
            <LinkTree 
              username={username} 
              links={links}
            />
          </div>
        </div>
      )}
    </div>
  );
} 