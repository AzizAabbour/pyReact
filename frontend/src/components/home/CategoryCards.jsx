import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Laptop, 
  Layers, 
  Database, 
  Lock, 
  Terminal, 
  Cpu, 
  LineChart, 
  Globe 
} from 'lucide-react';
import Card, { CardBody } from '../ui/Card';

export function CategoryCards() {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Full Stack App',
      icon: Globe,
      description: 'Generates comprehensive frontend, backend, database and routing plans.',
      count: 24,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Landing Pages',
      icon: Laptop,
      description: 'Stunning marketing setups optimized for conversion and micro-animations.',
      count: 18,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      name: 'SaaS Dashboards',
      icon: LineChart,
      description: 'Professional layout, stats cards, and charts integrations designs.',
      count: 15,
      color: 'from-violet-500 to-purple-600',
    },
    {
      name: 'APIs & Backend',
      icon: Cpu,
      description: 'SQLAlchemy models, CRUD routes, validation and error handling.',
      count: 20,
      color: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Database Models',
      icon: Database,
      description: 'Relational diagrams, fields, index optimization, and indexes keys.',
      count: 12,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'Auth & Security',
      icon: Lock,
      description: 'OAuth setups, JWT tokens, RBAC roles validation schema configurations.',
      count: 9,
      color: 'from-red-500 to-rose-600',
    },
  ];

  const handleCardClick = (name) => {
    navigate(`/generator?category=${encodeURIComponent(name)}`);
  };

  return (
    <section className="py-20 bg-surface-50 dark:bg-surface-950/20 border-t border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Explore Generating Categories
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            Choose a starting workspace category below to generate clean design assets, API schemas, and architecture frameworks.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.name}
                variant="glass"
                onClick={() => handleCardClick(cat.name)}
                className="group relative"
              >
                {/* Accent glow line on top */}
                <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${cat.color}`} />
                
                <CardBody className="flex flex-col items-start text-left gap-4">
                  {/* Icon */}
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Header Title */}
                  <div className="flex justify-between items-baseline w-full">
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-primary-500 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-bold text-text-tertiary">
                      {cat.count} templates
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary line-clamp-3">
                    {cat.description}
                  </p>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategoryCards;
