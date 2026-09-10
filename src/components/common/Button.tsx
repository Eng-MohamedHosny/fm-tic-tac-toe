import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'yellow' | 'teal' | 'silver' | 'navy';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'yellow',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'font-outfit font-bold uppercase tracking-wider transition-all duration-150 active:translate-y-1 cursor-pointer select-none flex items-center justify-center';

  const variantStyles = {
    yellow: 'bg-yellow text-navy-dark shadow-btn-yellow hover:bg-yellow-hover',
    teal: 'bg-teal text-navy-dark shadow-btn-teal hover:bg-teal-hover',
    silver: 'bg-silver text-navy-dark shadow-btn-silver-sm hover:bg-silver-hover',
    navy: 'bg-navy-semi text-silver shadow-tile hover:bg-navy-semi/80',
  };

  const sizeStyles = {
    sm: 'text-sm sm:text-base py-3 px-4 rounded-xl shadow-btn-silver-sm pb-4 active:pb-3',
    md: 'text-base py-3.5 px-6 rounded-2xl pb-5 active:pb-4',
    lg: 'text-base sm:text-xl py-4 sm:py-5 px-6 rounded-2xl pb-6 active:pb-5',
  };

  // Adjust shadow for small buttons if variant is yellow or teal
  const specificShadow =
    size === 'sm'
      ? variant === 'yellow'
        ? '!shadow-btn-yellow-sm'
        : variant === 'teal'
        ? '!shadow-btn-teal-sm'
        : ''
      : '';

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        specificShadow,
        fullWidth && 'w-full',
        props.disabled && 'opacity-50 cursor-not-allowed active:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
