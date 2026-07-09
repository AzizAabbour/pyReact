import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Copy, ExternalLink, Flame, ShieldCheck } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export function TemplateShowcase() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('popular');

  const templates = {
    popular: [
      {
        id: '1',
        title: 'Full-Stack SaaS Admin Panel',
        framework: 'React + FastAPI',
        type: 'Code + DB',
        likes: 120,
        description: 'Includes user management tables, charts, dark mode configurations, JWT authentications, and PostgreSQL schema.',
      },
      {
        id: '2',
        title: 'E-commerce Store Front',
        framework: 'Next.js + Tailwind',
        type: 'UI/UX',
        likes: 98,
        description: 'Features product filters, animated shopping carts, checkout layouts, and SEO schema tags.',
      },
      {
        id: '3',
        title: 'Real-time Chat Application',
        framework: 'React + Node + WebSocket',
        type: 'Backend',
        likes: 85,
        description: 'Detailed WebSocket channel management, event models, offline message sync, and scalable room collections.',
      },
    ],
    latest: [
      {
        id: '4',
        title: 'AI Portfolio Builder',
        framework: 'Vite React + Framer',
        type: 'Design + UI',
        likes: 42,
        description: 'Micro-interactions, 3D project display frameworks, custom color theme toggles, and performance optimization rules.',
      },
      {
        id: '5',
        title: 'JWT OAuth Authentication Hub',
        framework: 'Python FastAPI',
        type: 'Security',
        likes: 31,
        description: 'Google, GitHub logins flow configuration, secure cookies handling, token refresh schemas, and rate limit definitions.',
      },
      {
        id: '6',
        title: 'Blog CMS System',
        framework: 'Vue + PostgreSQL',
        type: 'Database',
        likes: 27,
        description: 'Post structure, author categories, markdown parsing logic, comment loops, and tag query indexing.',
      },
    ],
  };

  const handleSelectTemplate = (t) => {
    navigate(`/generator?template=${t.id}&title=${encodeURIComponent(t.title)}`);
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      
      {/* Title & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Featured Blueprints
          </h2>
          <p className="text-text-secondary text-sm max-w-xl">
            Choose from our pre-validated prompt templates. Click to import configurations directly into the generator.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-surface-100 dark:bg-surface-900 p-1 rounded-xl self-start md:self-auto border border-border-color">
          <button
            onClick={() => setActiveTab('popular')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'popular'
                ? 'bg-bg-secondary text-primary-500 shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Flame className="w-4 h-4" />
            Popular
          </button>
          <button
            onClick={() => setActiveTab('latest')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'latest'
                ? 'bg-bg-secondary text-primary-500 shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Latest
          </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates[activeTab].map((t) => (
          <Card key={t.id} variant="default" className="flex flex-col justify-between">
            <CardBody className="flex flex-col gap-4">
              {/* Badges */}
              <div className="flex justify-between items-center">
                <Badge variant="primary">{t.framework}</Badge>
                <Badge variant="default">{t.type}</Badge>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-text-primary line-clamp-1">{t.title}</h3>
                <p className="text-sm text-text-secondary line-clamp-3">{t.description}</p>
              </div>
            </CardBody>

            <CardFooter className="flex items-center justify-between">
              {/* Likes */}
              <span className="flex items-center gap-1 text-xs text-text-secondary font-medium">
                <Heart className="w-4 h-4 text-danger fill-danger" />
                {t.likes} saves
              </span>

              {/* Actions */}
              <Button
                variant="ghost"
                size="sm"
                icon={ExternalLink}
                iconPosition="right"
                onClick={() => handleSelectTemplate(t)}
                className="!text-primary-500 hover:!bg-primary-50 dark:hover:!bg-primary-950/20"
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default TemplateShowcase;
