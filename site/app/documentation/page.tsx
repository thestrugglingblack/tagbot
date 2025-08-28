'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from "next/image";

export default function DocumentationPage() {
  const [activeCategory, setActiveCategory] = useState('basic');

  const categories = [
    { id: 'basic', name: 'Basic Commands', icon: 'ri-command-line' },
    { id: 'utility', name: 'Utility Commands', icon: 'ri-tools-line' }
  ];

  const commands = {
    basic: [
      {
        command: '!tagbot tag',
        description: 'List all available gamer tags for Discord user',
        example: '!tagbot tag @errormacro',
        category: 'Information'
      },
      {
        command: '!tagbot add "platform" "player tag name"',
        description: 'Add or update  plater gamer tag to platform ',
        example: '!tagbot add psn forthelinkuei',
        category: 'Creation',
          options: [
              'psn: Set tag name for Playstation Network',
              'wb: Set tag name for Warner Brothers',
              'steam: Set name for Steam ',
              'sf: Set tag name for Capcom Fighter Network',
              'tekken: Set tag name for Tekken',
              'xbox: Set tag name for Xbox'
            ]
      },
      {
        command: '!tagbot commands',
        description: 'Display all available commands for Tagbot',
        example: '!tagbot commands',
        category: 'Utility'
      },
              {
        command: '!tagbot list',
        description: 'Display all available platforms supported for Tagbot',
        example: '!tagbot list',
        category: 'Utility'
      }
    ],
    utility: [
      {
        command: '!tagbot healthcheck',
        description: 'Checks the running status of TagBot server',
        example: '!tagbot healthcheck',
        category: 'Information'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 py-20">
          <Image
              alt="Image of players at EVO"
              src="/assets/optimized/0J3A7425-evo.jpg"
              fill
              className="object-cover opacity-20"
              priority={true}
              quality={80}
              sizes="100vw"
          />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Documentation
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Complete command reference and usage guide for TagBot
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Command Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <i className={`${category.icon} text-lg`}></i>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="ri-information-line text-white text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-blue-900">Command Syntax</h2>
                    <p className="text-blue-700">All commands start with the prefix: <code className="bg-blue-200 px-2 py-1 rounded">!tagbot</code></p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Required Parameters</h4>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="text-blue-700">Shown in quotes: "Platform Name"</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Optional Parameters</h4>
                    <p className="text-blue-700">Shown with dashes: --option value</p>
                  </div>
                </div>
              </div>

              {commands[activeCategory as keyof typeof commands]?.map((cmd, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{cmd.command}</h3>
                      <p className="text-gray-600">{cmd.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
                      {cmd.category}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Example Usage:</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      {cmd.example}
                    </div>
                  </div>

                  {'options' in cmd && cmd.options && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Available Options:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {cmd.options.map((option, optIndex) => (
                          <li key={optIndex} className="flex items-start space-x-2">
                            <i className="ri-arrow-right-s-line text-gray-400 mt-0.5"></i>
                            <span>{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}