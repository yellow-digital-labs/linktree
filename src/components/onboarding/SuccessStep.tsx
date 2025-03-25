import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SuccessStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full text-center"
    >
      <div className="mb-8">
        <svg
          className="w-20 h-20 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
      <p className="mb-8 text-gray-300">
        Thank you for completing your profile. You're all set to start using our platform.
      </p>

      <Link href="/dashboard" className="btn-primary inline-block">
        Go to Dashboard
      </Link>
    </motion.div>
  );
} 