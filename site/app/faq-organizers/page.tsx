'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function FAQOrganizers() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

const organizerFAQs = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I add TagBot to my Discord server?',
        answer: 'Just click the "Add to Discord" button, pick your server, and grant permissions. TagBot needs to be able to send messages, manage messages, embed links, and read message history to run smoothly.'
      },
      {
        question: 'What permissions does TagBot need?',
        answer: 'Send Messages, Embed Links, Manage Messages, and Read Message History. That’s it.'
      },
      {
        question: 'How do I add my own gamer tag?',
        answer: 'Easy—just type: `!tagbot add [platform] [gamer tag]`. Example: `tagbot add psn oneonedeadlywinds`.'
      },
      {
        question: 'How do I verify TagBot is working properly in my Discord Server?',
        answer: 'Run `!tagbot healthcheck`. If you get a response, you’re good to go.'
      },
      {
        question: 'Can I restrict TagBot to a specific channel only?',
        answer: 'Yep. Go to that channel’s permissions and remove TagBot’s rights there. Boom—restricted.'
      }
    ]
  },
  {
    category: 'Tournament Management',
    questions: [
      {
        question: 'What platforms are supported?',
        answer: 'Right now: PlayStation Network and Warner Brothers. More to come if demand grows.'
      },
      {
        question: 'Can I delete or add another player’s gamer tag?',
        answer: 'Nope—that’s on the players. Only they can add or update their own tags.'
      },
      {
        question: 'Will TagBot be running during my tournament?',
        answer: 'We aim to keep TagBot online 24/7. If you’ve got a critical tournament time, ping the devs just in case.'
      },
      {
        question: 'Do you have any advice in getting players to add their gamer tag?',
        answer: 'Make it part of your tournament registration. No tag, no entry—that way every player’s covered.'
      },
      {
        question: 'Is there a limit to how many tags can be stored per server?',
        answer: 'Nope. Store as many as your server needs.'
      },
      {
        question: 'How do I export all participant tags for bracket creation?',
        answer: 'That feature isn’t live yet. If you’d like it, please drop a feature request.'
      },
      {
        question: 'Can I see a list of all registered gamer tags at once?',
        answer: 'Not right now. Want it? Fill out a feature request—we’re listening.'
      },
      {
        question: 'Is there a way to bulk verify all submitted gamer tags are valid?',
        answer: 'Not yet. Feature requests welcome!'
      }
    ]
  },
  {
    category: 'Player Experience',
    questions: [
      {
        question: 'What if a player has multiple accounts on the same platform?',
        answer: 'TagBot only supports one tag per platform. Players need to decide which one to use and update it before your tournament.'
      },
      {
        question: 'What if a player’s username has special characters or spaces?',
        answer: 'No problem—TagBot can handle spaces and special characters.'
      },
      {
        question: 'How do players update their tag if they made a mistake?',
        answer: 'They just re-run the same add command: `!tagbot add [platform] [gamer tag]`. Super simple.'
      },
      {
        question: 'Can TagBot integrate with tournament bracket software?',
        answer: 'Not right now. If that’s something you’d love to see, submit a feature request.'
      }
    ]
  },
  {
    category: 'Data & Privacy',
    questions: [
      {
        question: 'Is TagBot collecting server or user data?',
        answer: 'Nope. Only gamer tags, Discord user IDs, and server IDs—nothing extra.'
      },
      {
        question: 'How long are gamer tags stored in the database?',
        answer: 'Until you ask us to delete them. Simple as that.'
      },
      {
        question: 'Is there a backup if TagBot data is lost?',
        answer: 'Yes—we’ve got backups so your data won’t just vanish.'
      },
      {
        question: 'Who has access to the stored gamer tag information?',
        answer: 'Only the TagBot devs, and only for troubleshooting or rare cases.'
      }
    ]
  },
  {
    category: 'Troubleshooting',
    questions: [
      {
        question: 'What if TagBot goes offline during a tournament?',
        answer: 'File a bug report and the dev team will jump on it ASAP.'
      },
      {
        question: 'A player can’t add or retrieve a gamer tag—what should I check?',
        answer: 'Usually it’s either a typo in the command or TagBot doesn’t have the right permissions in that channel. Run `tagbot healthcheck` to make sure it’s online.'
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
      
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-shield-user-line text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tournament Organizer FAQ
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Complete guide for setting up and managing tournaments with TagBot
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start Commands</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-green-600 font-mono">!tagbot add [platform] [name]</code>
                <p className="text-sm text-gray-600 mt-1">Add or update gamer tag</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-green-600 font-mono">!tagbot tag [discord username]</code>
                <p className="text-sm text-gray-600 mt-1">Retrieve gamer tag</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-green-600 font-mono">!tagbot commands</code>
                <p className="text-sm text-gray-600 mt-1">Display available commands</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-green-600 font-mono">!tagbot healthcheck</code>
                <p className="text-sm text-gray-600 mt-1">Check Tagbot status</p>
              </div>
            </div>
          </div>

          {organizerFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-200 pb-2">
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

          <div className="bg-green-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h3>
            <p className="text-gray-600 mb-6">
             For urgent issues or immediate support,send the dev a message.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.x.com/ZuriHunter" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
                Twitter
              </Link>
              <Link href="/faq-users" className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors whitespace-nowrap cursor-pointer">
                User FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}