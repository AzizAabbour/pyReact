import React from 'react';

export function Badge({
  children,
  variant = 'default',
  className = '',
}) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border transition-colors';

  const variants = {
    default: 'bg-surface-100 dark:bg-surface-800 text-text-secondary border-border-color',
    primary: 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 border-primary-500/20',
    secondary: 'bg-secondary-50 dark:bg-secondary-950/30 text-secondary-600 dark:text-secondary-400 border-secondary-500/20',
    accent: 'bg-accent-50 dark:bg-accent-950/30 text-accent-600 dark:text-accent-400 border-accent-500/20',
    success: 'bg-green-50 dark:bg-green-950/30 text-success border-green-500/20',
    warning: 'bg-amber-50 dark:bg-amber-950/30 text-warning border-amber-500/20',
    danger: 'bg-red-50 dark:bg-red-950/30 text-danger border-red-500/20',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
