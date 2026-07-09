import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { 
  Sparkles, 
  Trash2, 
  Copy, 
  Bookmark, 
  History as HistoryIcon,
  TrendingUp,
  Settings as SettingsIcon,
  FolderHeart,
  Calendar,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

export function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('my-prompts'); // 'my-prompts', 'favorites', 'history', 'analytics', 'settings'

  // Profile Form States
  const [profileName, setProfileName] = useState('DeveloperName');
  const [profileEmail, setProfileEmail] = useState('dev@domain.com');

  // Simulated items
  const [savedPrompts, setSavedPrompts] = useState([
    {
      id: '1',
      title: 'FastAPI SQL Model Client',
      framework: 'FastAPI',
      prompt_type: 'Backend Prompt',
      date: '2026-07-09',
      isFavorite: true,
      description: 'SQLAlchemy models for multi-tenant database connection setups.',
    },
    {
      id: '2',
      title: 'Tailwind SaaS Hero Panel',
      framework: 'Next.js',
      prompt_type: 'UI Prompt',
      date: '2026-07-08',
      isFavorite: false,
      description: 'Stunning glassmorphism hero banner with Framer animations.',
    },
  ]);

  const toggleFavorite = (id) => {
    setSavedPrompts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    toast.success('Updated favorite status!');
  };

  const deletePrompt = (id) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
    toast.success('Prompt deleted.');
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied!');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Collapsible Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Dashboard Content area */}
        <main className="flex-1 bg-surface-50 dark:bg-surface-950/20 p-6 md:p-10 text-left overflow-y-auto">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            
            {/* Quick Header info switcher */}
            <div className="flex justify-between items-center border-b border-border-color/50 pb-5">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-text-tertiary">User Dashboard</span>
                <h1 className="text-2xl md:text-3xl font-black text-text-primary capitalize">
                  {currentTab.replace('-', ' ')}
                </h1>
              </div>

              {/* Tab Selector fallback buttons */}
              <div className="flex gap-2 bg-surface-100 dark:bg-surface-900 p-1 rounded-xl border border-border-color">
                <button 
                  onClick={() => setCurrentTab('my-prompts')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${currentTab === 'my-prompts' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'}`}
                >
                  My Prompts
                </button>
                <button 
                  onClick={() => setCurrentTab('favorites')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${currentTab === 'favorites' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'}`}
                >
                  Favorites
                </button>
                <button 
                  onClick={() => setCurrentTab('history')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${currentTab === 'history' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'}`}
                >
                  History
                </button>
                <button 
                  onClick={() => setCurrentTab('analytics')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${currentTab === 'analytics' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'}`}
                >
                  Analytics
                </button>
                <button 
                  onClick={() => setCurrentTab('settings')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${currentTab === 'settings' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'}`}
                >
                  Settings
                </button>
              </div>
            </div>

            {/* TAB: My Prompts */}
            {currentTab === 'my-prompts' && (
              <div className="flex flex-col gap-6">
                {savedPrompts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedPrompts.map((prompt) => (
                      <Card key={prompt.id} variant="default" className="flex flex-col justify-between">
                        <CardBody className="flex flex-col gap-4">
                          <div className="flex justify-between items-center w-full">
                            <Badge variant="primary">{prompt.framework}</Badge>
                            <span className="flex items-center gap-1 text-[10px] text-text-tertiary">
                              <Calendar className="w-3.5 h-3.5" />
                              {prompt.date}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-base text-text-primary">{prompt.title}</h3>
                          <p className="text-xs text-text-secondary line-clamp-2">{prompt.description}</p>
                        </CardBody>

                        <div className="px-6 py-4 border-t border-border-color/40 flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={prompt.isFavorite ? Bookmark : Bookmark}
                            className={prompt.isFavorite ? '!text-primary-500' : ''}
                            onClick={() => toggleFavorite(prompt.id)}
                          >
                            {prompt.isFavorite ? 'Favorited' : 'Favorite'}
                          </Button>

                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              icon={Copy}
                              onClick={() => handleCopy(prompt.description)}
                              className="!px-2"
                            />
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              icon={Trash2}
                              onClick={() => deletePrompt(prompt.id)}
                              className="!text-danger hover:!bg-red-50 dark:hover:!bg-red-950/20 !px-2"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 flex flex-col items-center gap-3">
                    <FolderHeart className="w-10 h-10 text-text-tertiary" />
                    <span className="font-bold text-text-primary text-base">No Saved Blueprints</span>
                    <p className="text-xs text-text-secondary max-w-xs">
                      Start using the AI generator to forge and save modular project outlines.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Favorites */}
            {currentTab === 'favorites' && (
              <div className="flex flex-col gap-6">
                {savedPrompts.filter(p => p.isFavorite).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedPrompts.filter(p => p.isFavorite).map((prompt) => (
                      <Card key={prompt.id} variant="default" className="flex flex-col justify-between">
                        <CardBody className="flex flex-col gap-4">
                          <div className="flex justify-between items-center w-full">
                            <Badge variant="primary">{prompt.framework}</Badge>
                            <Badge variant="default">{prompt.prompt_type}</Badge>
                          </div>
                          <h3 className="font-extrabold text-base text-text-primary">{prompt.title}</h3>
                          <p className="text-xs text-text-secondary line-clamp-2">{prompt.description}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 flex flex-col items-center gap-3">
                    <Bookmark className="w-10 h-10 text-text-tertiary" />
                    <span className="font-bold text-text-primary text-base">No Favorited Prompts</span>
                    <p className="text-xs text-text-secondary max-w-xs">
                      Mark templates or designs as favorites to view them instantly here.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: History */}
            {currentTab === 'history' && (
              <Card variant="default">
                <CardBody className="p-0">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-100 dark:bg-surface-900 border-b border-border-color">
                        <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Project Title</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Tech Stack</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Action Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-color/50 hover:bg-surface-50 dark:hover:bg-surface-900/40">
                        <td className="px-6 py-4 text-sm font-bold text-text-primary">E-commerce API Integration</td>
                        <td className="px-6 py-4"><Badge variant="primary">FastAPI</Badge></td>
                        <td className="px-6 py-4 text-xs text-text-secondary">2026-07-09 14:32</td>
                      </tr>
                      <tr className="border-b border-border-color/50 hover:bg-surface-50 dark:hover:bg-surface-900/40">
                        <td className="px-6 py-4 text-sm font-bold text-text-primary">React Login Page Form</td>
                        <td className="px-6 py-4"><Badge variant="primary">React</Badge></td>
                        <td className="px-6 py-4 text-xs text-text-secondary">2026-07-09 11:15</td>
                      </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            )}

            {/* TAB: Analytics */}
            {currentTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Usage statistics cards */}
                <Card variant="glass">
                  <CardBody className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Total Generated</span>
                    <span className="text-3xl font-extrabold text-text-primary">48</span>
                    <span className="text-[10px] text-success font-semibold flex items-center mt-1">
                      <TrendingUp className="w-3.5 h-3.5 mr-1" /> +15% from last week
                    </span>
                  </CardBody>
                </Card>

                <Card variant="glass">
                  <CardBody className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Saved Blueprints</span>
                    <span className="text-3xl font-extrabold text-text-primary">12</span>
                    <span className="text-[10px] text-text-tertiary">Active in collections</span>
                  </CardBody>
                </Card>

                <Card variant="glass">
                  <CardBody className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">API Connection Queries</span>
                    <span className="text-3xl font-extrabold text-text-primary">850 / 1000</span>
                    <span className="text-[10px] text-warning font-semibold">Monthly quota check</span>
                  </CardBody>
                </Card>
              </div>
            )}

            {/* TAB: Settings */}
            {currentTab === 'settings' && (
              <Card variant="default">
                <CardHeader>
                  <h3 className="font-bold text-text-primary text-base">Update Profile Info</h3>
                </CardHeader>
                <CardBody className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Username"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                    <Input
                      label="Contact Email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-3 border-t border-border-color/40 pt-5">
                    <Button variant="outline" size="sm">Cancel</Button>
                    <Button variant="gradient" size="sm" onClick={() => toast.success('Profile saved!')}>Save Config</Button>
                  </div>
                </CardBody>
              </Card>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
