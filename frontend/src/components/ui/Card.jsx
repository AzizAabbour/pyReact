import React from 'react';
import { motion } from 'framer-motion';

export function Card({
  children,
  className = '',
  variant = 'default',
  hoverEffect = true,
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-2xl border transition-all duration-300 overflow-hidden';
  
  const variants = {
    default: 'bg-bg-secondary border-border-color text-text-primary shadow-sm',
    glass: 'glass border-border-glass text-text-primary shadow-lg backdrop-blur-md',
    gradient: 'gradient-border text-text-primary shadow-lg',
  };

  const hoverStyles = hoverEffect 
    ? 'hover:shadow-xl hover:-translate-y-1 hover:border-primary-500/50' 
    : '';

  const classes = `${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`;

  if (onClick) {
    return (
      <motion.div
        whileHover={hoverEffect ? { y: -4 } : {}}
        onClick={onClick}
        className={`${classes} cursor-pointer`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-6 border-b border-border-color/50 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`p-6 bg-surface-50/50 dark:bg-surface-900/50 border-t border-border-color/50 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
