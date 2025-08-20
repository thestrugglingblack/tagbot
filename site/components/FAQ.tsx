'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const generalFAQs = [
    {
      question: 'What is TagBot?',
      answer: 'TagBot is your Discord sidekick for online FGC tournaments 🎮. Instead of chasing down DMs or scrolling through chat, TagBot instantly fetches gamer tags so you can stop waiting and start playing.'
    },
    {
      question: 'Is TagBot free to use?',
      answer: 'Yep, totally free 💸. All we ask is that you spread the word, run it in your tournaments, and maybe drop us feedback to make it even better.'
    },
    {
      question: 'What platforms does TagBot support?',
      answer: 'Right now, TagBot works with PlayStation and Warner Brothers. Games accounts (perfect for Mortal Kombat 🐉). But we’re listening! If enough of the community wants it, we’ll expand to other platforms like Steam, Xbox, and beyond.'
    },
      {
          question: 'Who can I contact for support?',
          answer: 'Got questions, issues, or cool ideas? You can always drop a message to the dev (that’s me 👋) via Twitter (@ZuriHunter). We’ll get back to you faster than a roundhouse kick.'
      }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Quick answers to common questions about TagBot
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {generalFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <i className={`ri-arrow-${openIndex === index ? 'up' : 'down'}-s-line text-gray-400`}></i>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-shield-user-line text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Tournament Organizers</h3>
            <p className="text-gray-600 mb-6">
              Detailed setup guides, management tips, and advice.
            </p>
            <Link href="/faq-organizers" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
              Organizer FAQ
            </Link>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-user-heart-line text-purple-600 text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Players</h3>
            <p className="text-gray-600 mb-6">
              Instructions to add, update and retrieve tag names.
            </p>
            <Link href="/faq-users" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer">
              Player FAQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}