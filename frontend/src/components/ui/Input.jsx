import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  icon: Icon,
  helperText,
  id,
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-text-tertiary">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`w-full bg-surface-100 dark:bg-surface-900 border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-text-tertiary ${Icon ? 'pl-11' : ''} ${error ? 'border-danger focus:ring-danger/20 focus:border-danger' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-danger font-medium flex items-center mt-0.5">
          {error.message || error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-text-tertiary">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
