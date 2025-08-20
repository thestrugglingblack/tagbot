'use client';

import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}