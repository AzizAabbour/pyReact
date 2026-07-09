import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', path: '/#features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Explore Gallery', path: '/explore' },
        { name: 'Generator', path: '/generator' },
      ],
    },
    {
      title: 'Templates',
      links: [
        { name: 'React Apps', path: '/generator?tech=React' },
        { name: 'Next.js Sites', path: '/generator?tech=Next.js' },
        { name: 'Landing Pages', path: '/generator?category=Landing%20Pages' },
        { name: 'API Services', path: '/generator?category=API' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '#' },
        { name: 'Best Practices', path: '#' },
        { name: 'AI Models', path: '#' },
        { name: 'Support', path: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-bg-secondary border-t border-border-color pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        
        {/* Branding & Newsletter */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              PromptForge<span className="text-text-primary">AI</span>
            </span>
          </Link>
          <p className="text-sm text-text-secondary">
            Instantly design and customize professional full-stack prompts with styling frameworks, animations, and database setup.
          </p>
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Subscribe to newsletter</h4>
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="you@domain.com"
                className="bg-surface-100 dark:bg-surface-900 border border-border-color px-4 py-2 text-sm rounded-xl focus:outline-none focus:border-primary-500 w-full"
              />
              <Button variant="primary" className="!px-3 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Sections */}
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">{section.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social and API status */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Connection</h4>
          <div className="flex gap-3">
            <a href="#" className="p-2 bg-surface-100 dark:bg-surface-850 hover:bg-primary-500 hover:text-white rounded-xl text-text-secondary transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-surface-100 dark:bg-surface-850 hover:bg-primary-500 hover:text-white rounded-xl text-text-secondary transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-surface-100 dark:bg-surface-850 hover:bg-primary-500 hover:text-white rounded-xl text-text-secondary transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-text-secondary font-medium">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Copyright border */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border-color/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-tertiary">
          &copy; {currentYear} PromptForge AI Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-text-tertiary hover:text-text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-text-tertiary hover:text-text-primary transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-text-tertiary hover:text-text-primary transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
