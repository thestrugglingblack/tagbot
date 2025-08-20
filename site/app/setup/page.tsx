'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SetupPage() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Invite TagBot',
      description: 'Add the bot to your Discord server'
    },
    {
      id: 2,
      title: 'Add to Registration Workflow',
      description: 'Set up proper channels and instructions'
    },
    {
      id: 3,
      title: 'Add Gamer Tag',
      description: 'Add and retrieve gamer tag'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{
               backgroundImage: `url('../assets/0J3A0970-cb.jpg')`
             }}>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Setup Guide
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get TagBot running in your Discord server in just a few simple steps
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup Progress</h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      activeStep === step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        activeStep === step.id
                          ? 'bg-white text-blue-600'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {step.id}
                      </div>
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className={`text-sm ${activeStep === step.id ? 'text-blue-100' : 'text-gray-500'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            {activeStep === 1 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Step 1: Invite TagBot</h2>
                
                <div className="mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <i className="ri-information-line text-white"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-900">Required Permissions</h3>
                    </div>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-600"></i>
                        <span>Send Messages</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-600"></i>
                        <span>Manage Messages</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-600"></i>
                        <span>Embed Links</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-600"></i>
                        <span>Read Message History</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center mb-6">

                    <a
                        href="https://discord.com/oauth2/authorize?client_id=1273113791709843496&permissions=92160&integration_type=0&scope=bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-discord-fill mr-2"></i>
                      Invite to Discord
                    </a>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">After clicking the invite link:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Select your Discord server from the dropdown</li>
                      <li>Review the requested permissions</li>
                      <li>Click "Authorize" to add the bot</li>
                      <li>Complete the captcha verification if prompted</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Step 2: Add to Registration Workflow</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Add TagBot to Channel</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700 mb-4">Create dedicated channels for onboarding players for example:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 mb-2">#registration</h4>
                          <p className="text-sm text-gray-600">Players add their tag at registration</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 mb-2">#checkin</h4>
                          <p className="text-sm text-gray-600">Players add their gamer tag at checkin</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Functionality</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div>
                            <h4 className="font-semibold text-gray-900">Personal Gamer Tag Management</h4>
                            <p className="text-sm text-gray-600">Users can only add or update their own gamer tag </p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Self-Only</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div>
                            <h4 className="font-semibold text-gray-900">Public Gamer Tag Lookup</h4>
                            <p className="text-sm text-gray-600">Anyone can call for someones gamer tag</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Public</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Test TagBot Commands</h3>
                    <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono">
                      <p className="mb-2"># Test if TagBot is working</p>
                      <p className="text-white">tagbot help</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Step 3: Add Gamer Tag</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start Command</h3>
                    <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono mb-4">
                      <p className="text-white">tagbot add psn saibotnoob</p>
                    </div>
                    <p className="text-gray-700">This adds "saibotnoob" as your gamer tag for PlayStation Network.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Player Check In Flow</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                        <div>
                          <h5 className="font-medium text-blue-900">Player Joins Discord</h5>
                          <p className="text-sm text-blue-700">Player joins channel with TagBot</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                        <div>
                          <h5 className="font-medium text-green-900">Player Checks In</h5>
                          <p className="text-sm text-green-700">Player checks in with TO </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                        <div>
                          <h5 className="font-medium text-purple-900">Player Adds Tag</h5>
                          <p className="text-sm text-purple-700">Players add their gamer tag with a simple command after checkin with TO</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                        <div>
                          <h5 className="font-medium text-yellow-900">Competitors Retrieves Tag</h5>
                          <p className="text-sm text-yellow-700">Call the bot to quickly grab your opponent’s tag before the match</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <i className="ri-trophy-line text-white"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-green-900">Congratulations!</h3>
                    </div>
                    <p className="text-green-800">
                      Your Discord server is now ready to use TagBot in your tournaments! Check out the documentation page for additional details and steps.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}