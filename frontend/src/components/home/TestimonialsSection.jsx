import React from 'react';
import { Star, Quote } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';

export function TestimonialsSection() {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Lead Frontend Developer',
      company: 'TechFlow Ltd',
      rating: 5,
      comment: 'PromptForge changed how we scaffold client apps. The prompt layouts contain folder schemas and API details that are 100% accurate.',
      initials: 'SJ',
    },
    {
      name: 'Alex Rivera',
      role: 'Full Stack Engineer',
      company: 'Supabase Fans',
      rating: 5,
      comment: 'Generating NextJS app prompts with Tailwind styling frameworks and Prisma schemas. Saved hours of typing design systems manually.',
      initials: 'AR',
    },
    {
      name: 'Marcus Chen',
      role: 'Solopreneur & Creator',
      company: 'IndieHacker Hub',
      rating: 5,
      comment: 'The Pro plan is easily worth it. Unlimited generates means I can prototype 5 landing pages with clean custom styles in a single afternoon.',
      initials: 'MC',
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center gap-16 text-center">
        {/* Title */}
        <div className="max-w-2xl flex flex-col gap-3">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Loved by Developers
          </h2>
          <p className="text-text-secondary text-sm">
            Read comments and reviews from developers using PromptForge to accelerate their coding projects.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
          {reviews.map((rev, index) => (
            <Card key={index} variant="glass" className="relative pt-8">
              <Quote className="w-10 h-10 text-primary-500/10 absolute top-4 right-4" />
              
              <CardBody className="flex flex-col gap-5">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment text */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Author profile */}
                <div className="flex items-center gap-3.5 mt-2">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white text-xs">
                    {rev.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-text-primary">{rev.name}</span>
                    <span className="text-[11px] text-text-tertiary">
                      {rev.role} at {rev.company}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
