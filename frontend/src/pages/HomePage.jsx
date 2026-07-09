import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import CategoryCards from '../components/home/CategoryCards';
import TemplateShowcase from '../components/home/TemplateShowcase';
import PricingSection from '../components/home/PricingSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection />
        <CategoryCards />
        <TemplateShowcase />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
