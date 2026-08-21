import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-10">
        
        {/* Left Side: Logo & Links */}
        <div className="flex items-center  w-full 2xl:gap-0 gap-10">
          <Link href="/dashboard" className="text-2xl font-bold tracking-tight text-gray-900 ">
            ticktock
          </Link>
          
          <nav className="max-w-7xl w-full mx-auto flex flex-1">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-gray-900 hover:text-primary transition-colors"
            >
              Timesheets
            </Link>
          </nav>
        </div>

        <div className="flex items-center shrink-0 gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          
          <span className="text-sm font-medium text-gray-700">
            John Doe
          </span>
          
          <ChevronDown className="size-4 text-gray-500" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1328px] mx-auto md:p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full mb-6 xl:mb-[74px] pt-4">
        <div className='xl:py-8 xl:bg-white xl:rounded-lg text-center text-sm text-gray-500 max-w-[1280px] mx-auto xl:shadow-sm'>
          © 2024 tentwenty. All rights reserved.
        </div>
      </footer>
      
    </div>
  );
}