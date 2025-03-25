"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

type Link = {
  id: string;
  title: string;
  url: string;
  icon?: string;
};

const linkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Please enter a valid URL'),
});

type LinkFormData = z.infer<typeof linkSchema>;

export default function LinkManager() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

  const onSubmit = (data: LinkFormData) => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: data.title,
      url: data.url,
    };
    
    setLinks([...links, newLink]);
    reset();
    setIsAddingLink(false);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">Manage Your Links</h2>
      
      {/* Link List */}
      <div className="mb-4 md:mb-6 space-y-2 md:space-y-3">
        {links.length === 0 ? (
          <p className="text-gray-500 text-center py-4 text-sm md:text-base">No links added yet</p>
        ) : (
          links.map(link => (
            <div key={link.id} className="skeuomorphic-card p-3 md:p-4 flex justify-between items-center">
              <div className="overflow-hidden">
                <h3 className="font-medium text-sm md:text-base text-gray-800">{link.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 truncate max-w-[180px] md:max-w-xs">{link.url}</p>
              </div>
              <button 
                onClick={() => removeLink(link.id)}
                className="text-red-500 hover:text-red-700 text-sm md:text-base ml-2 flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      
      {/* Add Link Form */}
      {isAddingLink ? (
        <motion.form 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="skeuomorphic-card p-3 md:p-4"
        >
          <div className="mb-3 md:mb-4">
            <label className="block text-gray-700 mb-1 text-sm md:text-base">Link Title</label>
            <input
              {...register('title')}
              className="input-field text-sm md:text-base"
              placeholder="My Website"
            />
            {errors.title && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.title.message}</p>}
          </div>
          
          <div className="mb-3 md:mb-4">
            <label className="block text-gray-700 mb-1 text-sm md:text-base">URL</label>
            <input
              {...register('url')}
              className="input-field text-sm md:text-base"
              placeholder="https://example.com"
            />
            {errors.url && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.url.message}</p>}
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button type="submit" className="btn-primary text-sm md:text-base py-2 md:py-3 flex-1">
              Save Link
            </button>
            <button 
              type="button" 
              onClick={() => setIsAddingLink(false)}
              className="btn-secondary text-sm md:text-base py-2 md:py-3 flex-1"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      ) : (
        <button 
          onClick={() => setIsAddingLink(true)}
          className="btn-primary w-full text-sm md:text-base py-2 md:py-3"
        >
          Add New Link
        </button>
      )}
    </div>
  );
} 