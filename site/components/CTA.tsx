'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to use TagBot?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join the players already using TagBot to save time and focus on the fight.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/setup" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
            Add to Discord
          </Link>
          <Link href="/faq-organizers" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}