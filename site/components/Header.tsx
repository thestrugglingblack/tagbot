'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-gamepad-line text-white text-lg"></i>
              </div>
              <span className="font-['Silkscreen'] text-xl text-gray-900">TagBot</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer">
              Home
            </Link>
            <Link href="/documentation" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer">
              Documentation
            </Link>

            <Link href="/faq-organizers" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer">
              FAQ for Organizers
            </Link>
            <Link href="/faq-users" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer">
              FAQ for Users
            </Link>
            <Link href="/setup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
              Get Started
            </Link>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/faq-organizers" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                FAQ for Organizers
              </Link>
              <Link href="/faq-users" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                FAQ for Users
              </Link>
              <Link href="/setup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}