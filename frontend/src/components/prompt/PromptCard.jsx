import React from 'react';
import { Heart, Copy, Share2, CornerDownRight, Sparkles } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export function PromptCard({ prompt, onSelect }) {
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content || '');
    toast.success('Prompt copied!');
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/generator?template=${prompt.id}`);
    toast.success('Share link copied to clipboard!');
  };

  return (
    <Card 
      variant="default" 
      onClick={() => onSelect && onSelect(prompt)}
      className="flex flex-col justify-between w-full h-full text-left"
    >
      <CardBody className="flex flex-col gap-4">
        {/* Header tags */}
        <div className="flex justify-between items-center w-full">
          <Badge variant="primary">{prompt.framework || 'React'}</Badge>
          <Badge variant="default">{prompt.prompt_type || 'Code'}</Badge>
        </div>

        {/* Title & Desc */}
        <div className="flex flex-col gap-2">
          <h3 className="font-extrabold text-base text-text-primary group-hover:text-primary-500 line-clamp-1">
            {prompt.title}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
            {prompt.description || 'Custom configured coding blueprint created with PromptForge.'}
          </p>
        </div>
      </CardBody>

      <CardFooter className="flex items-center justify-between gap-4 pt-4 border-t border-border-color/40">
        <span className="flex items-center gap-1 text-[11px] text-text-tertiary">
          <Heart className="w-3.5 h-3.5 text-danger fill-danger" />
          {prompt.likes_count || 12} saves
        </span>

        {/* Quick copy, share buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handleShare}
            className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
            title="Share Link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={handleCopy}
            className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
            title="Copy Content"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PromptCard;
