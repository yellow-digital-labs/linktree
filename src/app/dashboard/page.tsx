"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="skeuomorphic-card w-full p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Dashboard</h1>
      
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Welcome back!</h2>
        <p className="text-sm md:text-base text-gray-600">
          Here's an overview of your LinkTree performance and quick actions.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="skeuomorphic-card p-3 md:p-4 text-center">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Total Views</p>
          <p className="text-xl md:text-3xl font-bold text-gray-800">1,234</p>
        </div>
        <div className="skeuomorphic-card p-3 md:p-4 text-center">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Total Clicks</p>
          <p className="text-xl md:text-3xl font-bold text-gray-800">567</p>
        </div>
        <div className="skeuomorphic-card p-3 md:p-4 text-center sm:col-span-2 lg:col-span-1">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Active Links</p>
          <p className="text-xl md:text-3xl font-bold text-gray-800">3</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <Link href="/dashboard/links" className="btn-primary py-3 md:py-4 text-center text-sm md:text-base">
            Add New Link
          </Link>
          <Link href="/view" className="btn-secondary py-3 md:py-4 text-center text-sm md:text-base">
            View Your LinkTree
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Recent Activity</h2>
        <div className="skeuomorphic-card p-3 md:p-4">
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <div>
                <p className="font-medium text-sm md:text-base text-gray-800">New click on "Twitter"</p>
                <p className="text-xs md:text-sm text-gray-500">2 minutes ago</p>
              </div>
              <span className="text-blue-500 text-sm md:text-base">+1</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <div>
                <p className="font-medium text-sm md:text-base text-gray-800">New click on "Instagram"</p>
                <p className="text-xs md:text-sm text-gray-500">15 minutes ago</p>
              </div>
              <span className="text-blue-500 text-sm md:text-base">+1</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-sm md:text-base text-gray-800">Profile viewed</p>
                <p className="text-xs md:text-sm text-gray-500">1 hour ago</p>
              </div>
              <span className="text-green-500 text-sm md:text-base">+1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 