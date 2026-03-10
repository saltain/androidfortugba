import React from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}

export const Button = ({ title, variant = 'primary', loading, className = '', disabled, ...props }: ButtonProps) => {
  let baseClass = 'items-center justify-center transition-all min-h-[56px] px-8 border ';
  let textClass = 'font-sans font-semibold tracking-[0.2em] uppercase text-sm ';
  let textTheme: 'dark' | 'light' = 'dark';
  
  if (variant === 'primary') {
    baseClass += 'bg-brand-text border-brand-text';
    textTheme = 'light';
  } else if (variant === 'secondary') {
    baseClass += 'bg-brand-accent border-brand-accent';
    textTheme = 'dark';
  } else if (variant === 'outline') {
    baseClass += 'bg-transparent border-brand-text/30';
    textTheme = 'dark';
  }

  if (disabled || loading) {
    baseClass += ' opacity-50';
  }

  return (
    <TouchableOpacity
      className={`${baseClass} ${className}`}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#0A0E27' : '#FAFAF8'} />
      ) : (
        <Typography variant="body" theme={textTheme} className={textClass}>
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
