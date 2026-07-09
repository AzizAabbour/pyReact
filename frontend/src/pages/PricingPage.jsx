import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PricingSection from '../components/home/PricingSection';

export function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}

export default PricingPage;
