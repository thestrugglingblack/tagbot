'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BugReportsPage() {
  const [reportType, setReportType] = useState('bug');
  const [severity, setSeverity] = useState('medium');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="relative bg-gradient-to-r from-red-600 to-orange-600 py-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{
               backgroundImage: `url('../assets/0J3A1076-cb.jpg')`
             }}>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Bug Reports
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Help us improve TagBot by reporting bugs and issues
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Bug Report</h2>
              
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <i className="ri-check-circle-line text-green-600 text-xl"></i>
                    <p className="text-green-800 font-medium">Bug report submitted successfully! We\ll investigate this issue.</p>
                  </div>
                </div>
              )}

              <form id="bug-report-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <select
                      name="report_type"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors pr-8"
                    >
                      <option value="bug">Bug Report</option>
                      <option value="crash">Bot Crash</option>
                      <option value="performance">Performance Issue</option>
                      <option value="command">Command Not Working</option>
                      <option value="data">Data Loss/Corruption</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Severity Level
                    </label>
                    <select
                      name="severity"
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors pr-8"
                    >
                      <option value="low">Low - Minor inconvenience</option>
                      <option value="medium">Medium - Affects functionality</option>
                      <option value="high">High - Major feature broken</option>
                      <option value="critical">Critical - Bot unusable</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bug Title *
                  </label>
                  <input
                    type="text"
                    name="bug_title"
                    placeholder="Brief description of the bug"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    placeholder="Describe what happened, what you expected to happen, and any error messages you received..."
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                    required
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">Maximum 500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Steps to Reproduce
                  </label>
                  <textarea
                    name="steps_to_reproduce"
                    rows={4}
                    placeholder="1. Go to...&#10;2. Click on...&#10;3. Enter...&#10;4. See error"
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discord Server ID
                    </label>
                    <input
                      type="text"
                      name="server_id"
                      placeholder="Your Discord server ID (optional)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Discord Tag
                    </label>
                    <input
                      type="text"
                      name="discord_tag"
                      placeholder="username#1234 (optional)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additional_info"
                    rows={3}
                    placeholder="Any other relevant information, screenshots descriptions, or context..."
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-bug-line mr-2"></i>
                  Submit Bug Report
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="ri-lightbulb-line text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Before Reporting</h3>
              </div>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-blue-600 mt-0.5"></i>
                  <span>Check if the issue is already reported</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-blue-600 mt-0.5"></i>
                  <span>Try restarting the bot command</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-blue-600 mt-0.5"></i>
                  <span>Verify bot permissions in your server</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-blue-600 mt-0.5"></i>
                  <span>Check our status page for known issues</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <i className="ri-time-line text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-yellow-900">Response Time</h3>
              </div>
              <div className="space-y-3 text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>Critical Issues:</span>
                  <span className="font-semibold">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>High Priority:</span>
                  <span className="font-semibold">2-3 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Priority:</span>
                  <span className="font-semibold">1 week</span>
                </div>
                <div className="flex justify-between">
                  <span>Low Priority:</span>
                  <span className="font-semibold">2 weeks</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <i className="ri-customer-service-line text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-green-900">Need Help?</h3>
              </div>
              <p className="text-sm text-green-800 mb-4">
                For urgent issues or immediate support,send the dev a message.
              </p>
              <a className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap" href="https://www.x.com/ZuriHunter" target="_blank" rel="noopener noreferrer">
                <i className="ri-twitter-fill mr-2"></i>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}