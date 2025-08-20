'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-gamepad-line text-white text-lg"></i>
              </div>
              <span className="font-['Silkscreen'] text-xl">TagBot</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The ultimate Discord bot for instantly grabbing gamer tags and keeping your online FGC tournaments running smooth.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.x.com/ZuriHunter" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <i className="ri-twitter-line text-lg"></i>
              </a>
              <a href="https://www.github.com/thestrugglingblackk" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <i className="ri-github-line text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
                <li>
                <a href="/documentation" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Documentation
                </a>
              </li>
              <li>
                <Link href="/setup" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/faq-organizers" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Organizer FAQ
                </Link>
              </li>
              <li>
                <Link href="/faq-users" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  User FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/bug-reports" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Bug Reports
                </a>
              </li>
              <li>
                <a href="/feature-requests" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Feature Requests
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TagBot by thestrugglingblack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}