import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { 
  Users, 
  FolderTree, 
  Layers, 
  TrendingUp, 
  Settings, 
  ShieldCheck,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminPage() {
  const [currentSection, setCurrentSection] = useState('users'); // 'users', 'categories', 'templates', 'analytics'
  
  // Simulated list
  const [usersList, setUsersList] = useState([
    { id: '1', name: 'Alice Smith', email: 'alice@domain.com', role: 'admin', active: true },
    { id: '2', name: 'Bob Jones', email: 'bob@domain.com', role: 'user', active: true },
    { id: '3', name: 'Charlie Dave', email: 'charlie@domain.com', role: 'user', active: false },
  ]);

  const toggleUserStatus = (id) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
    toast.success('User status toggled!');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow bg-surface-50 dark:bg-surface-950/20 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 text-left">
          
          {/* Main Title segment */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-color/50 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-text-tertiary">System Console</span>
                <h1 className="text-2xl font-black text-text-primary">Admin Control Center</h1>
              </div>
            </div>

            {/* Quick Switch Buttons */}
            <div className="flex bg-surface-100 dark:bg-surface-900 p-1 rounded-xl border border-border-color">
              <button 
                onClick={() => setCurrentSection('users')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${currentSection === 'users' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'}`}
              >
                <Users className="w-3.5 h-3.5" />
                Users
              </button>
              <button 
                onClick={() => setCurrentSection('categories')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${currentSection === 'categories' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'}`}
              >
                <FolderTree className="w-3.5 h-3.5" />
                Categories
              </button>
              <button 
                onClick={() => setCurrentSection('templates')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${currentSection === 'templates' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'}`}
              >
                <Layers className="w-3.5 h-3.5" />
                Templates
              </button>
            </div>
          </div>

          {/* TAB CONTENTS: Users */}
          {currentSection === 'users' && (
            <Card variant="default">
              <CardBody className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-100 dark:bg-surface-900 border-b border-border-color">
                      <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Name</th>
                      <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Email Address</th>
                      <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Role</th>
                      <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Status</th>
                      <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((usr) => (
                      <tr key={usr.id} className="border-b border-border-color/50 hover:bg-surface-50 dark:hover:bg-surface-900/40">
                        <td className="px-6 py-4 text-sm font-bold text-text-primary">{usr.name}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{usr.email}</td>
                        <td className="px-6 py-4">
                          <Badge variant={usr.role === 'admin' ? 'primary' : 'default'}>{usr.role}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${usr.active ? 'text-success' : 'text-text-tertiary'}`}>
                            {usr.active ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {usr.active ? 'Active' : 'Suspended'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleUserStatus(usr.id)}
                          >
                            {usr.active ? 'Suspend' : 'Activate'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          )}

          {/* TAB CONTENTS: Categories */}
          {currentSection === 'categories' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-text-primary text-base">Prompt Categories</h3>
                <Button variant="primary" size="sm" icon={Plus}>Add Category</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass">
                  <CardBody className="flex flex-col gap-2">
                    <span className="font-bold text-text-primary text-sm">Full Stack App</span>
                    <p className="text-xs text-text-secondary">Generates complete blueprints.</p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-border-color/40">
                      <span className="text-xs font-bold text-text-tertiary">24 blueprints</span>
                      <Button variant="ghost" size="sm" className="!px-2">Edit</Button>
                    </div>
                  </CardBody>
                </Card>

                <Card variant="glass">
                  <CardBody className="flex flex-col gap-2">
                    <span className="font-bold text-text-primary text-sm">Landing Pages</span>
                    <p className="text-xs text-text-secondary">Marketing design systems.</p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-border-color/40">
                      <span className="text-xs font-bold text-text-tertiary">18 blueprints</span>
                      <Button variant="ghost" size="sm" className="!px-2">Edit</Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}

          {/* TAB CONTENTS: Templates */}
          {currentSection === 'templates' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-text-primary text-base">Verified Blueprints</h3>
                <Button variant="primary" size="sm" icon={Plus}>Create Blueprint</Button>
              </div>

              <Card variant="default">
                <CardBody className="p-0">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-100 dark:bg-surface-900 border-b border-border-color">
                        <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Blueprint Title</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Tech Stack</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-text-secondary">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-color/50">
                        <td className="px-6 py-4 text-sm font-bold text-text-primary">E-commerce API Integration</td>
                        <td className="px-6 py-4"><Badge variant="primary">FastAPI</Badge></td>
                        <td className="px-6 py-4"><Badge variant="success">Verified</Badge></td>
                      </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminPage;
