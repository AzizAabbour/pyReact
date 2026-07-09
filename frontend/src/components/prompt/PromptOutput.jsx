import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileJson, 
  FileText, 
  Maximize2, 
  RefreshCw, 
  Languages, 
  Sparkles,
  Zap,
  Bookmark
} from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export function PromptOutput({ prompt }) {
  const [copied, setCopied] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);
  const [activeView, setActiveView] = useState('raw'); // 'raw', 'preview'

  const handleCopyAll = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([prompt.content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${prompt.title.toLowerCase().replace(/\s+/g, '-')}-blueprint.md`;
    document.body.appendChild(element);
    element.click();
    toast.success('Markdown file exported!');
  };

  const handleExportJSON = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(prompt, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${prompt.title.toLowerCase().replace(/\s+/g, '-')}-blueprint.json`;
    document.body.appendChild(element);
    element.click();
    toast.success('JSON configuration exported!');
  };

  const parseSections = (text) => {
    // Regex or split to identify header titles and code lines
    const lines = text.split('\n');
    const sections = [];
    let currentSection = { title: 'Blueprint Document', content: [] };

    lines.forEach((line) => {
      if (line.startsWith('# ') || line.startsWith('## ')) {
        if (currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        currentSection = { 
          title: line.replace(/^#+\s+/, ''), 
          content: [] 
        };
      } else {
        currentSection.content.push(line);
      }
    });
    if (currentSection.content.length > 0) {
      sections.push(currentSection);
    }
    return sections;
  };

  const sectionsList = parseSections(prompt.content);

  const handleCopySection = (index, contentText) => {
    navigator.clipboard.writeText(contentText);
    setCopiedSection(index);
    toast.success('Section copied to clipboard!');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full text-left">
      {/* Top action strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-color/50 pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">Output Ready</span>
          <h2 className="text-2xl font-black text-text-primary truncate max-w-md">
            {prompt.title}
          </h2>
        </div>

        {/* Toolbar Button Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View toggle */}
          <div className="flex bg-surface-100 dark:bg-surface-900 p-1 rounded-xl border border-border-color">
            <button
              onClick={() => setActiveView('raw')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                activeView === 'raw' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'
              }`}
            >
              Raw Format
            </button>
            <button
              onClick={() => setActiveView('preview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                activeView === 'preview' ? 'bg-bg-secondary text-primary-500 shadow-xs' : 'text-text-secondary'
              }`}
            >
              Section Guide
            </button>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            icon={copied ? Check : Copy} 
            onClick={handleCopyAll}
          >
            {copied ? 'Copied' : 'Copy All'}
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            icon={FileText} 
            onClick={handleExportMarkdown}
          >
            MD
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            icon={FileJson} 
            onClick={handleExportJSON}
          >
            JSON
          </Button>

          <Button variant="gradient" size="sm" icon={Bookmark}>
            Save Output
          </Button>
        </div>
      </div>

      {/* AI Assistant panel triggers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="flex items-center gap-3 p-3 bg-surface-100 dark:bg-surface-900 hover:bg-primary-50 dark:hover:bg-primary-950/20 border border-border-color rounded-xl text-left transition-all cursor-pointer group">
          <Sparkles className="w-5 h-5 text-primary-500 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">Improve Prompt</span>
            <span className="text-[10px] text-text-tertiary">Inject styling detail</span>
          </div>
        </button>

        <button className="flex items-center gap-3 p-3 bg-surface-100 dark:bg-surface-900 hover:bg-primary-50 dark:hover:bg-primary-950/20 border border-border-color rounded-xl text-left transition-all cursor-pointer group">
          <RefreshCw className="w-5 h-5 text-secondary-500 group-hover:rotate-180 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">Optimize DB</span>
            <span className="text-[10px] text-text-tertiary">Normalize indexes keys</span>
          </div>
        </button>

        <button className="flex items-center gap-3 p-3 bg-surface-100 dark:bg-surface-900 hover:bg-primary-50 dark:hover:bg-primary-950/20 border border-border-color rounded-xl text-left transition-all cursor-pointer group">
          <Languages className="w-5 h-5 text-accent-500 group-hover:scale-110" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">Translate Language</span>
            <span className="text-[10px] text-text-tertiary">Convert prompt logic</span>
          </div>
        </button>

        <button className="flex items-center gap-3 p-3 bg-surface-100 dark:bg-surface-900 hover:bg-primary-50 dark:hover:bg-primary-950/20 border border-border-color rounded-xl text-left transition-all cursor-pointer group">
          <Zap className="w-5 h-5 text-success group-hover:scale-110" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">Inject Security</span>
            <span className="text-[10px] text-text-tertiary">Add OWASP protections</span>
          </div>
        </button>
      </div>

      {/* Main output box */}
      {activeView === 'raw' ? (
        <Card variant="glass" className="font-mono text-sm leading-relaxed border-border-color">
          <CardBody className="p-6 bg-surface-950 text-slate-100 overflow-x-auto selection:bg-primary-500/30">
            <pre className="whitespace-pre-wrap">{prompt.content}</pre>
          </CardBody>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {sectionsList.map((sec, idx) => {
            const sectionText = sec.content.join('\n');
            const isCodeBlock = sectionText.includes('```');
            return (
              <Card key={idx} variant="default" className="border-border-color">
                <div className="flex justify-between items-center bg-surface-50 dark:bg-surface-900/60 px-6 py-4 border-b border-border-color/50">
                  <h3 className="font-bold text-sm md:text-base text-text-primary">
                    {sec.title}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={copiedSection === idx ? Check : Copy}
                    onClick={() => handleCopySection(idx, sectionText)}
                  >
                    {copiedSection === idx ? 'Copied' : 'Copy Section'}
                  </Button>
                </div>
                <CardBody className="p-6 overflow-x-auto">
                  <pre className="whitespace-pre-wrap text-sm text-text-secondary font-mono leading-relaxed">
                    {sectionText}
                  </pre>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PromptOutput;
