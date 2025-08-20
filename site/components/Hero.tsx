'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      // style={{
      //   backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8)), url('https://readdy.ai/api/search-image?query=professional%20esports%20gaming%20tournament%20arena%20with%20modern%20gaming%20setup%2C%20competitive%20environment%2C%20neon%20lights%2C%20futuristic%20design%2C%20tournament%20brackets%20display%20screens%2C%20gaming%20chairs%20and%20desks%2C%20purple%20and%20blue%20color%20scheme%2C%20high-tech%20atmosphere&width=1920&height=1080&seq=hero1&orientation=landscape')`
      // }}
      style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8)), url('../assets/0J3A1445-cb.jpg')`
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stop Chasing Gamer Tags. Start Playing.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            The ultimate Discord bot for instantly fetching gamer tags, so matches start faster and players stop waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/setup" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              Add to Discord
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}