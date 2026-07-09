import React from 'react';

export function Skeleton({
  className = '',
  variant = 'text', // 'text', 'circular', 'rectangular'
}) {
  const baseStyles = 'shimmer bg-surface-200 dark:bg-surface-850';

  const variants = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
}

export default Skeleton;
