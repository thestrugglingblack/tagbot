'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from "next/image";

export default function FeatureRequestsPage() {
  const [category, setCategory] = useState('enhancement');
  const [priority, setPriority] = useState('medium');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // TODO: Implement voting system once feature requests arrive

  // const popularRequests = [
  //   { title: 'Custom Tournament Brackets', votes: 156, status: 'In Development' },
  //   { title: 'Automated Prize Distribution', votes: 134, status: 'Planned' },
  //   { title: 'Tournament Statistics Dashboard', votes: 98, status: 'Considering' },
  //   { title: 'Multi-Game Support', votes: 87, status: 'In Development' },
  //   { title: 'Voice Channel Integration', votes: 76, status: 'Planned' },
  // ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="relative bg-gradient-to-r from-green-600 to-teal-600 py-20">
          <Image
              alt="Image of players at ComboBreaker"
              src="/assets/optimized/0J3A1829-cb.jpg"
              fill
              className="object-cover opacity-20"
              priority={true}
              quality={80}
              sizes="100vw"
          />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Feature Requests
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Share your ideas to help shape the future of TagBot
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Feature Request</h2>
              
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <i className="ri-check-circle-line text-green-600 text-xl"></i>
                    <p className="text-green-800 font-medium">Feature request submitted! We\ll review your suggestion.</p>
                  </div>
                </div>
              )}

              <form id="feature-request-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feature Category
                    </label>
                    <select
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-8"
                    >
                      <option value="enhancement">UI/UX Enhancement</option>
                      <option value="tournament">Tournament Management</option>
                      <option value="automation">Automation Features</option>
                      <option value="integration">Third-party Integration</option>
                      <option value="analytics">Analytics & Reporting</option>
                      <option value="social">Social Features</option>
                      <option value="performance">Performance Improvement</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      name="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-8"
                    >
                      <option value="low">Low - Nice to have</option>
                      <option value="medium">Medium - Would be helpful</option>
                      <option value="high">High - Important feature</option>
                      <option value="critical">Critical - Essential need</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feature Title *
                  </label>
                  <input
                    type="text"
                    name="feature_title"
                    placeholder="Brief, descriptive title for your feature request"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feature Description *
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    placeholder="Describe the feature you\d like to see. What should it do? How would it work?"
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    required
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">Maximum 500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Problem This Solves
                  </label>
                  <textarea
                    name="problem_solved"
                    rows={3}
                    placeholder="What problem or pain point would this feature address?"
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Behavior
                  </label>
                  <textarea
                    name="expected_behavior"
                    rows={4}
                    placeholder="Describe how you envision this feature working step by step..."
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Discord Tag
                    </label>
                    <input
                      type="text"
                      name="discord_tag"
                      placeholder="username#1234 (optional)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Server Size
                    </label>
                    <select
                      name="server_size"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-8"
                    >
                      <option value="">Select server size</option>
                      <option value="small">Small (1-50 members)</option>
                      <option value="medium">Medium (51-250 members)</option>
                      <option value="large">Large (251-1000 members)</option>
                      <option value="huge">Huge (1000+ members)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Context
                  </label>
                  <textarea
                    name="additional_context"
                    rows={3}
                    placeholder="Any additional information, examples, or references that might help..."
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-lightbulb-line mr-2"></i>
                  Submit Feature Request
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            {/*<div className="bg-green-50 border border-green-200 rounded-xl p-6">*/}
            {/*  <div className="flex items-center space-x-3 mb-4">*/}
            {/*    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">*/}
            {/*      <i className="ri-fire-line text-white text-lg"></i>*/}
            {/*    </div>*/}
            {/*    <h3 className="text-lg font-semibold text-green-900">Popular Requests</h3>*/}
            {/*  </div>*/}
            {/*  <div className="space-y-3">*/}
            {/*    {popularRequests.map((request, index) => (*/}
            {/*      <div key={index} className="bg-white p-4 rounded-lg border border-green-200">*/}
            {/*        <div className="flex justify-between items-start mb-2">*/}
            {/*          <h4 className="font-medium text-gray-900 text-sm leading-tight">{request.title}</h4>*/}
            {/*          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${*/}
            {/*            request.status === 'In Development' ? 'bg-blue-100 text-blue-800' :*/}
            {/*            request.status === 'Planned' ? 'bg-yellow-100 text-yellow-800' :*/}
            {/*            'bg-gray-100 text-gray-800'*/}
            {/*          }`}>*/}
            {/*            {request.status}*/}
            {/*          </span>*/}
            {/*        </div>*/}
            {/*        <div className="flex items-center space-x-2 text-sm text-gray-600">*/}
            {/*          <i className="ri-thumb-up-line"></i>*/}
            {/*          <span>{request.votes} votes</span>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="ri-roadmap-line text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Development Process</h3>
              </div>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Review and analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Community feedback</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Development planning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Implementation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Testing and release</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <i className="ri-chat-3-line text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-purple-900">Are You A Developer?</h3>
              </div>
              <p className="text-sm text-purple-800 mb-4">
                Check out the project on GitHub!
              </p>
              <a className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap" href="https://github.com/thestrugglingblack/tagbot">
                <i className="ri-github-fill mr-2"></i>
                Contribute!
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}