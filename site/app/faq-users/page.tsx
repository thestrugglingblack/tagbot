'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function FAQUsers() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

const userFAQs = [
  {
    category: 'Basic Usage',
    questions: [
      {
        question: 'How do I add my gamer tag to TagBot?',
        answer: 'Easy! Just hop into a channel with TagBot and type: `!tagbot add [platform] [gamer tag]`. Example: `tagbot add wb getoverhere`.'
      },
      {
        question: 'Can I add multiple gamer tags for a platform?',
        answer: 'Nope—TagBot only saves one tag per platform. Keeps things simple and clean.'
      },
      {
        question: 'How do I update my gamer tag if I change my username?',
        answer: 'Just run the same add command again: `!tagbot add [platform] [gamer tag]`. TagBot will overwrite your old one with the new hotness.'
      },
      {
        question: 'What platforms does TagBot support?',
        answer: 'Right now TagBot supports PlayStation Network and Warner Brothers (perfect for Mortal Kombat). If the FGC wants it, we’ll expand to Steam, Xbox, and more!'
      }
    ]
  },
  {
    category: 'Tag Management',
    questions: [
      {
        question: 'How do I check what gamer tag I have stored?',
        answer: 'Type: `!tagbot tag [discord username]`. You’ll see all the tags you’ve saved so far.'
      },
      {
        question: 'Can I delete my gamer tag from the bot?',
        answer: 'Not in-app yet. If you really want it gone, drop a bug report with your Discord user ID and the devs will handle it.'
      },
      {
        question: 'What if my gamer tag has special characters or spaces?',
        answer: 'No worries—TagBot can handle spaces, numbers, special characters, even if your tag looks wild.'
      }
    ]
  },
  {
    category: 'Finding Other Players',
    questions: [
      {
        question: 'How do I look up someone else\'s gamer tag?',
        answer: 'Simple! Type: `!tagbot tag [discord username]` and you’ll get their stored tag instantly.'
      },
      {
        question: 'I get an error when trying to add my tag. What\'s wrong?',
        answer: 'Double-check your command format and make sure there aren’t typos. If it still breaks, file a bug report and we’ll check it out.'
      },
      {
        question: 'How do I know if TagBot is online and working?',
        answer: 'Run `!tagbot healthcheck`. If you get a response, the bot’s alive and kicking.'
      }
    ]
  },
  {
    category: 'Privacy & Data',
    questions: [
      {
        question: 'Who can see my stored gamer tags?',
        answer: 'Only tournament organizers, your opponents, and the dev team when needed. No randoms peeking.'
      },
      {
        question: 'How long does TagBot keep my information?',
        answer: 'Your Discord ID + your gamer tags stick around until you ask us to remove them.'
      },
      {
        question: 'Can I prevent others from looking up or changing my tags?',
        answer: 'Anyone can look up your tag, but only YOU can change it. Nobody else touches your info.'
      },
      {
        question: 'What happens to my data if I leave the server?',
        answer: 'Your tags stay with TagBot. If you want them wiped, just send a bug report with your Discord ID.'
      }
    ]
  },
  {
    category: 'Tournament Integration',
    questions: [
      {
        question: 'How do organizers use my stored tags for tournaments?',
        answer: 'Organizers can only *view* your tag to run events smoothly. They can’t change or delete it.'
      },
      {
        question: 'Do I need to re-enter my tag for each tournament?',
        answer: 'Nope! Once your tag is saved, it works for every event on that server.'
      },
      {
        question: 'Can I have different tags for different tournament types?',
        answer: 'Not yet. TagBot is one tag per platform for now.'
      },
      {
        question: 'What if I want to use a different gamer tag for a specific tournament?',
        answer: 'You’ll need to update your stored tag with: `!tagbot add [platform] [gamer tag]`. Quick and easy.'
      }
    ]
  }
];

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 1000 + questionIndex;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-user-heart-line text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tournament User FAQ
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Everything you need to know about participating in TagBot tournaments
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Commands for Players</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-purple-600 font-mono">!tagbot add [platform] [name]</code>
                <p className="text-sm text-gray-600 mt-1">Add or update gamer tag</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-purple-600 font-mono">!tagbot tag [discord username]</code>
                <p className="text-sm text-gray-600 mt-1">Retrieve gamer tag</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-purple-600 font-mono">!tagbot commands</code>
                <p className="text-sm text-gray-600 mt-1">Display available commands</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-purple-600 font-mono">!tagbot healthcheck</code>
                <p className="text-sm text-gray-600 mt-1">Check Tagbot status</p>
              </div>
            </div>
          </div>

          {userFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = categoryIndex * 1000 + questionIndex;
                  return (
                    <div key={questionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        <i className={`ri-arrow-${openIndex === index ? 'up' : 'down'}-s-line text-gray-400 flex-shrink-0`}></i>
                      </button>
                      {openIndex === index && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="bg-purple-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
             For urgent issues or immediate support,send the dev a message.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.x.com/ZuriHunter" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer">
                Twitter
              </Link>
              <Link href="/faq-organizers" className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors whitespace-nowrap cursor-pointer">
                Organizer FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}