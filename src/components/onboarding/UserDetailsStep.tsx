"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

const userDetailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(1, 'Please select a role'),
  company: z.string().optional(),
});

type UserDetailsFormData = z.infer<typeof userDetailsSchema>;

interface UserDetailsStepProps {
  email: string;
  onSubmit: (data: UserDetailsFormData & { email: string }) => void;
  onBack: () => void;
}

export default function UserDetailsStep({ email, onSubmit, onBack }: UserDetailsStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsFormData>({
    resolver: zodResolver(userDetailsSchema),
  });

  const handleFormSubmit = (data: UserDetailsFormData) => {
    onSubmit({ ...data, email });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Tell us about yourself</h2>
      <p className="text-center mb-8 text-gray-300">
        We'll use this information to personalize your experience
      </p>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="input-field"
            {...register('name')}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Your Role
          </label>
          <select
            id="role"
            className="input-field"
            {...register('role')}
            disabled={isSubmitting}
          >
            <option value="">Select your role</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="product_manager">Product Manager</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>
          {errors.role && (
            <p className="mt-2 text-sm text-red-400">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company (Optional)
          </label>
          <input
            id="company"
            type="text"
            placeholder="Company name"
            className="input-field"
            {...register('company')}
            disabled={isSubmitting}
          />
          {errors.company && (
            <p className="mt-2 text-sm text-red-400">{errors.company.message}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary flex-1"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Complete Setup'}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 