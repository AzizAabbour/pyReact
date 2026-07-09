import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const faqs = [
    {
      q: 'What is PromptForge AI and how does it work?',
      a: 'PromptForge AI is a specialized assistant that lets developers instantly generate detailed code specifications, UI systems, page views, and API layers to feed directly into LLM models (like ChatGPT, Claude, Gemini, or V0). You customize files, folder schemas, and coding guidelines.',
    },
    {
      q: 'Can I copy the prompts directly for commercial projects?',
      a: 'Absolutely. All prompts and coding blueprints you generate on PromptForge AI are completely open source and free for commercial development use.',
    },
    {
      q: 'What formats can I export the blueprints to?',
      a: 'We support three primary formats: Markdown (.md) which is ideal for LLMs, raw JSON configuration data for API operations, and PDF formats for project scoping briefs.',
    },
    {
      q: 'Is there a limit to how many prompts I can forge?',
      a: 'Free starter users can generate up to 5 prompts per day. Pro Architect and Team plans unlock unlimited generation, dashboard favorites, history tracking, and direct API tokens.',
    },
    {
      q: 'How does the "AI suggestions" feature work?',
      a: 'Once a prompt is generated, you can click "Improve Prompt", "Rewrite Prompt", or "Optimize Schema". Our backend AI model will refactor your objectives, add best practices, and suggest structural code details.',
    },
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 border-t border-border-color/50">
      <div className="flex flex-col items-center gap-16 text-center">
        {/* Title */}
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-sm">
            Everything you need to know about PromptForge AI features, plans, and prompt generation configurations.
          </p>
        </div>

        {/* Accordion List */}
        <Accordion.Root
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 text-left"
        >
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="bg-bg-secondary border border-border-color rounded-2xl overflow-hidden transition-colors"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex justify-between items-center w-full px-6 py-5 text-sm md:text-base font-bold text-text-primary hover:text-primary-500 hover:bg-surface-50 dark:hover:bg-surface-900/40 text-left transition-colors cursor-pointer group">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-text-secondary group-data-[state=open]:rotate-180 transition-transform duration-200" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up overflow-hidden">
                <div className="px-6 pb-6 pt-1 text-sm text-text-secondary leading-relaxed border-t border-border-color/30">
                  {faq.a}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

export default FAQSection;
