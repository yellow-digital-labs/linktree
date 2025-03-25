import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © {currentYear} LinkFolio. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="/privacy-policy" 
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-and-conditions" 
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Terms & Conditions
            </Link>
            <a 
              href="mailto:support@linkfolio.com" 
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 