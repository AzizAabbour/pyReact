import React, { useState } from 'react';
import { Check, Shield } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  const tiers = [
    {
      name: 'Free Starter',
      price: 0,
      description: 'Test promptforge-ai structure configurations completely free.',
      features: [
        '5 Prompt generations per day',
        'Standard tech layouts access',
        'One-click prompt copy',
        'Markdown formats export',
      ],
      buttonText: 'Sign Up Free',
      variant: 'default',
      popular: false,
    },
    {
      name: 'Pro Architect',
      price: annual ? 19 : 29,
      description: 'For power developers demanding full stack code details and database schemas.',
      features: [
        'Unlimited prompt generation',
        'All frameworks & languages access',
        'API schema & database design modules',
        'PDF, Markdown, & JSON file export',
        'Save, collections, & history dashboards',
        'AI prompt refactor / suggestion wizard',
      ],
      buttonText: 'Get Pro Access',
      variant: 'gradient',
      popular: true,
    },
    {
      name: 'Team Workspace',
      price: annual ? 49 : 79,
      description: 'Ideal for agency devs, startup workspaces, and engineering groups.',
      features: [
        'Everything in Pro Architect plan',
        'Shared group collections & workspace',
        'Custom prompt template designer',
        'API integration tokens',
        'Priority prompt generation queue',
        'Dedicated account engineer support',
      ],
      buttonText: 'Contact Enterprise',
      variant: 'default',
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-surface-50 dark:bg-surface-950/20 border-t border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-12">
        
        {/* Header */}
        <div className="max-w-2xl flex flex-col gap-3">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Flexible Developer Plans
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            Start completely free or upgrade to Pro to unlock unlimited blueprints, custom templates, and database exports.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex items-center gap-3 bg-surface-100 dark:bg-surface-900 p-1.5 rounded-xl border border-border-color">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              !annual ? 'bg-bg-secondary text-primary-500 shadow-sm' : 'text-text-secondary'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              annual ? 'bg-bg-secondary text-primary-500 shadow-sm' : 'text-text-secondary'
            }`}
          >
            Annually
            <span className="text-[10px] bg-primary-100 dark:bg-primary-950/45 text-primary-600 px-1.5 py-0.5 rounded-full font-bold">
              Save 30%
            </span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start w-full">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              variant={tier.popular ? 'gradient' : 'default'}
              hoverEffect={true}
              className={`flex flex-col justify-between w-full h-full relative ${
                tier.popular ? 'border-primary-500/50 shadow-glow md:-translate-y-2' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-4 bg-primary-500 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Popular Choice
                </div>
              )}

              <CardBody className="flex flex-col gap-6 text-left">
                {/* Header title */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-text-primary">{tier.name}</h3>
                  <p className="text-xs text-text-secondary">{tier.description}</p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-text-primary">${tier.price}</span>
                  <span className="text-sm text-text-secondary">/ month</span>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-border-color/50 w-full" />

                {/* Features list */}
                <ul className="flex flex-col gap-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-text-secondary">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center text-success flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </CardBody>

              <CardFooter className="pt-0">
                <Button
                  variant={tier.popular ? 'gradient' : 'outline'}
                  className="w-full justify-center"
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
