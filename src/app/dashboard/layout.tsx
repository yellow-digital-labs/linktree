"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Auto-collapse sidebar on mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Manage Links', path: '/dashboard/links', icon: '🔗' },
    { name: 'Analytics', path: '/dashboard/analytics', icon: '📈' },
    { name: 'Profile', path: '/dashboard/profile', icon: '👤' },
    { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 skeuomorphic-card m-2 rounded-xl">
        <h1 className="text-xl font-bold text-gray-800">LinkTree</h1>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-200"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}
      
      {/* Sidebar - Desktop & Mobile */}
      <div 
        className={`skeuomorphic-card transition-all duration-300 z-50
          ${mobileMenuOpen ? 'fixed inset-y-0 left-0 w-64 m-0 rounded-r-xl' : 'hidden'} 
          md:flex md:relative md:h-screen md:m-4 md:rounded-xl
          ${collapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        <div className="flex flex-col p-4 h-full">
          {/* Header - Desktop only */}
          <div className="hidden md:flex md:items-center md:justify-between mb-8">
            {!collapsed && <h2 className="text-xl font-bold text-gray-800">LinkTree</h2>}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-200"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>
          
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end mb-4">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-200"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      pathname === item.path
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    {(!collapsed || mobileMenuOpen) && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-300">
            <Link
              href="/"
              className="flex items-center p-3 rounded-lg hover:bg-gray-200 text-gray-700"
            >
              <span className="text-xl mr-3">🚪</span>
              {(!collapsed || mobileMenuOpen) && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 md:p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
} 