import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  Settings2, 
  Terminal, 
  Eye, 
  Rocket, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Database,
  Lock,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Card, { CardBody } from '../ui/Card';
import Input from '../ui/Input';
import PromptOutput from './PromptOutput';
import api from '../../services/api';
import toast from 'react-hot-toast';

export function PromptGenerator() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    framework: 'React',
    promptType: 'Code Prompt',
    dbType: 'PostgreSQL',
    authType: 'JWT Token',
    styleFramework: 'Tailwind CSS',
    features: '',
    pages: 'Home, Dashboard, Settings',
  });

  useEffect(() => {
    // Fill from search parameters if preset
    const titleParam = searchParams.get('title');
    const categoryParam = searchParams.get('category');
    const frameworkParam = searchParams.get('tech');

    if (titleParam) {
      setFormData(prev => ({
        ...prev,
        title: titleParam,
        description: `Create a custom ${titleParam} with complete details.`
      }));
    }

    if (frameworkParam) {
      setFormData(prev => ({ ...prev, framework: frameworkParam }));
    }
  }, [searchParams]);

  const frameworks = [
    'React', 'Next.js', 'Vue', 'Angular', 'HTML CSS JS',
    'Python FastAPI', 'Django', 'Flask', 'Node.js Express',
    'Laravel PHP', 'Flutter', 'React Native', 'Electron'
  ];

  const promptTypes = [
    'Code Prompt', 'Design Prompt', 'UI Prompt', 'UX Prompt',
    'Database Prompt', 'Backend Prompt', 'API Prompt',
    'Authentication Prompt', 'Deployment Prompt', 'SEO Prompt'
  ];

  const dbOptions = ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Firebase', 'Supabase', 'None'];
  const authOptions = ['JWT Token', 'OAuth (Google/GitHub)', 'Session Cookies', 'Supabase Auth', 'Firebase Auth', 'None'];

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const generatePromptClient = (data) => {
    // Elegant client-side prompt template fallback generator
    return `# Project Overview: ${data.title || 'PromptForge Built Project'}

Objectives:
Create a high-performance, responsive ${data.framework} application utilizing ${data.styleFramework} for styling and a backend configured for ${data.authType} authentication.

Target Audience:
Developers, digital workspace administrators, and tech enthusiasts.

## Tech Stack
- Frontend: ${data.framework}
- Styling: ${data.styleFramework}
- Database: ${data.dbType}
- Authentication: ${data.authType}
- Icons: Lucide Icons
- State Management: Context API

## UI Design & Theme Colors
- Dark Mode Background: #0F172A (Slate 900)
- Light Mode Background: #F8FAFC (Slate 50)
- Brand Primary: #4F46E5 (Indigo 600)
- Brand Secondary: #06B6D4 (Cyan 500)
- Accent: #8B5CF6 (Violet 500)
- Rounded Corners: md (12px), lg (16px)

## Pages & Structure
${data.pages.split(',').map(p => `- ${p.trim()}: Responsive views setup`).join('\n')}

## Core Features Setup
${data.features ? data.features.split(',').map(f => `- ${f.trim()}`).join('\n') : '- Auto-generated configuration profiles\n- Real-time CRUD state handlers\n- Light/Dark theme triggers'}

## Database Models & Structure
\`\`\`sql
-- Schema Definition
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    config JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## API Router Paths
- POST \`/api/v1/auth/login\` - Request security JWT access tokens
- POST \`/api/v1/auth/register\` - Create user profiles
- GET \`/api/v1/workspaces\` - List user workspace configs

## Best Practices & Security
- Implement strict JWT access token expiry parameters (e.g. 15-30 minutes).
- Sanitize database statements to avoid SQL injections.
- Run complete accessibility checks (contrast ratios, keyboard focuses).
- Cache index queries in Redis or local memory stores.
`;
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/v1/prompts/generate', formData);
      setResult(response.data);
      toast.success('Prompt generated successfully!');
      handleNext();
    } catch (error) {
      console.warn('Backend connection failed, running template fallback.', error);
      // Fallback
      setTimeout(() => {
        const clientGenerated = generatePromptClient(formData);
        setResult({
          title: formData.title || 'Custom Generator Blueprint',
          framework: formData.framework,
          prompt_type: formData.promptType,
          content: clientGenerated,
          config: formData,
        });
        toast.success('Prompt generated (Client Fallback)');
        handleNext();
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-8">
      {/* Wizard Step Progress Tracker */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                step >= s
                  ? 'gradient-bg text-white shadow-md'
                  : 'bg-surface-200 dark:bg-surface-800 text-text-tertiary border border-border-color'
              }`}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`h-[2px] w-12 md:w-20 transition-colors ${
                  step > s ? 'bg-primary-500' : 'bg-border-color'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Base Details */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-8 flex flex-col gap-6 bg-bg-secondary p-8 rounded-2xl border border-border-color shadow-sm">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary-500" />
                Configure Base Blueprint
              </h2>

              <Input
                label="Workspace Project Title"
                placeholder="e.g. AI Marketing SaaS Platform"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Project Details</label>
                <textarea
                  placeholder="Explain what your app does in a few sentences..."
                  rows={4}
                  className="w-full bg-surface-100 dark:bg-surface-900 border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tech Framework */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Tech Framework</label>
                  <select
                    className="w-full bg-surface-100 dark:bg-surface-900 border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    value={formData.framework}
                    onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
                  >
                    {frameworks.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                {/* Prompt Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Prompt Output Type</label>
                  <select
                    className="w-full bg-surface-100 dark:bg-surface-900 border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    value={formData.promptType}
                    onChange={(e) => setFormData({ ...formData, promptType: e.target.value })}
                  >
                    {promptTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="primary" icon={ChevronRight} iconPosition="right" onClick={handleNext}>
                  Next: Tech Configurations
                </Button>
              </div>
            </div>

            {/* Sidebar Guidance card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card variant="glass" className="border-primary-500/20">
                <CardBody className="flex flex-col gap-4">
                  <Sparkles className="w-8 h-8 text-primary-500" />
                  <h3 className="font-bold text-text-primary text-base">Quick Guidelines</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Start by setting up the project title and outline. You can use search parameters or blueprints from our gallery to automatically fill base configurations.
                  </p>
                </CardBody>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 2: Advanced Tech Configs */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-8 flex flex-col gap-6 bg-bg-secondary p-8 rounded-2xl border border-border-color shadow-sm">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary-500" />
                Advanced Stack Configuration
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DB Choice */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Database System</label>
                  <select
                    className="w-full bg-surface-100 dark:bg-surface-900 border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none"
                    value={formData.dbType}
                    onChange={(e) => setFormData({ ...formData, dbType: e.target.value })}
                  >
                    {dbOptions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                {/* Auth Choice */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Security Authentication</label>
                  <select
                    className="w-full bg-surface-100 dark:bg-surface-900 border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none"
                    value={formData.authType}
                    onChange={(e) => setFormData({ ...formData, authType: e.target.value })}
                  >
                    {authOptions.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Pages */}
              <Input
                label="Required Application Pages (Comma-Separated)"
                placeholder="Home, Dashboard, Settings, Details"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
              />

              {/* Custom Features */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Custom Features Checklist (Comma-Separated)</label>
                <textarea
                  placeholder="e.g. Dark mode switch, drag and drop columns, real-time sync, PDF export"
                  rows={3}
                  className="w-full bg-surface-100 dark:bg-surface-900 border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button variant="ghost" icon={ChevronLeft} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="gradient" icon={Sparkles} isLoading={loading} onClick={handleGenerate}>
                  Forge AI Prompt
                </Button>
              </div>
            </div>

            {/* Sidebar Guidance card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card variant="glass" className="border-secondary-500/20">
                <CardBody className="flex flex-col gap-4">
                  <Database className="w-8 h-8 text-secondary-500" />
                  <h3 className="font-bold text-text-primary text-base">Schema Builder</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Provide comma-separated features and views to automatically generate SQL script statements and router paths tailored to your application.
                  </p>
                </CardBody>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 3: Result View */}
        {step === 3 && result && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            <div className="mb-4">
              <Button variant="ghost" icon={ChevronLeft} onClick={() => setStep(2)}>
                Edit Setup Config
              </Button>
            </div>
            
            {/* Prompt Output display component */}
            <PromptOutput prompt={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PromptGenerator;
