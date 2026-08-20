import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10">
        
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-2xl font-bold tracking-tight">
            ticktock
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-gray-900 hover:text-primary transition-colors"
            >
              Timesheets
            </Link>
          </nav>
        </div>

        {/* Right Side: User Profile (Ready for shadcn DropdownMenu) */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          {/* Avatar Placeholder */}
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
              alt="John Doe" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            John Doe
          </span>
          
          {/* Dropdown Chevron Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-gray-500 hidden md:block"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </header>

      {/* Main Content Area */}
      {/* The max-w-[90rem] ensures your content doesn't stretch infinitely on ultrawide monitors */}
      <main className="flex-1 w-full max-w-layout mx-auto p-6 lg:p-10">
        {children}
      </main>
      
    </div>
  );
}