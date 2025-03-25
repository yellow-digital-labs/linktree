"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

type Link = {
  id: string;
  title: string;
  url: string;
  icon?: string;
};

type LinkTreeProps = {
  links: Link[];
  username: string;
  avatarUrl?: string;
};

export default function LinkTree({ links, username, avatarUrl }: LinkTreeProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      {/* Profile Section */}
      <div className="mb-6 md:mb-8 text-center">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={username} 
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 border-2 border-gray-300 shadow-md"
          />
        ) : (
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
            {username.charAt(0).toUpperCase()}
          </div>
        )}
        <h2 className="text-lg md:text-xl font-bold text-gray-800">@{username}</h2>
      </div>

      {/* Links Section */}
      <div className="w-full space-y-2 md:space-y-3">
        {links.map((link) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="skeuomorphic-card block p-3 md:p-4 text-center hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            <span className="font-medium text-sm md:text-base text-gray-800">{link.title}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
} 