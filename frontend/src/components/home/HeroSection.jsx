import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Zap, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export function HeroSection() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-dot-pattern min-h-[90vh] flex items-center">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-secondary-500/10 dark:bg-secondary-500/20 rounded-full blur-[120px] pointer-events-none animate-float [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Info */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-left gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50/80 dark:bg-primary-950/20 border border-primary-500/20 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
              Introducing PromptForge v1.0
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]"
          >
            Instantly Forge <br />
            <span className="gradient-text">Production-Ready</span> <br />
            AI Prompts
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg text-text-secondary max-w-xl"
          >
            Generate comprehensive prompts containing clean architecture, UX designs, database designs, folder hierarchies, and SEO practices for modern web apps.
          </motion.p>

          {/* CTA Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-2"
          >
            <Button 
              variant="gradient" 
              size="lg" 
              icon={ArrowRight} 
              iconPosition="right"
              onClick={() => navigate('/generator')}
            >
              Start Generating
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/explore')}
            >
              Browse Templates
            </Button>
          </motion.div>

          {/* Integration badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-3 mt-6"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Support for frameworks</span>
            <div className="flex flex-wrap gap-4 items-center text-text-secondary font-semibold text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary border border-border-color rounded-xl"><Terminal className="w-4 h-4" /> React & Next.js</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary border border-border-color rounded-xl"><Zap className="w-4 h-4" /> Vue & Tailwind</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary border border-border-color rounded-xl"><Cpu className="w-4 h-4" /> Python & FastAPI</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Animated Visual */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-[420px] aspect-square relative"
          >
            {/* Outer Glowing Rings */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl opacity-20 blur-xl animate-pulse-glow" />
            
            {/* The Visual Container */}
            <div className="w-full h-full glass-card border-border-glass rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Fake Terminal Header */}
              <div className="flex items-center gap-2 border-b border-border-color/50 pb-4">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-text-tertiary ml-2 font-mono">promptforge_engine.py</span>
              </div>

              {/* Fake Code / Prompt Generation animation */}
              <div className="flex-1 py-6 flex flex-col gap-4 font-mono text-xs text-text-secondary select-none">
                <div className="text-primary-500 font-bold">&gt; Initializing Forge AI model...</div>
                <div className="text-secondary-500">&gt; Building React + Tailwind Design System...</div>
                <div className="pl-4 border-l border-primary-500/30 flex flex-col gap-1.5">
                  <span className="text-text-primary">Color Palette: #4F46E5, #06B6D4</span>
                  <span>Pages: Hero, Gallery, Admin Dashboard</span>
                  <span className="text-accent-500">Database Schema: SQL Model config added</span>
                </div>
                <div className="text-success font-bold">&gt; Complete. Ready to copy markdown!</div>
              </div>

              {/* Sparkles / Info overlay */}
              <div className="flex items-center justify-between border-t border-border-color/50 pt-4 text-xs font-semibold text-text-tertiary">
                <span>Output Format: Markdown & JSON</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-secondary-500" /> AI Suggestions</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
