import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PromptGenerator from '../components/prompt/PromptGenerator';

export function GeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-dot-pattern">
        {/* Header Title segment */}
        <div className="max-w-7xl mx-auto px-6 pt-12 text-center flex flex-col items-center gap-3">
          <h1 className="text-3xl md:text-5xl font-black text-text-primary">
            Prompt <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-xl">
            Configure application stack parameters, select components, database layouts, and generate detailed prompt structures.
          </p>
        </div>

        <PromptGenerator />
      </main>

      <Footer />
    </div>
  );
}

export default GeneratorPage;
