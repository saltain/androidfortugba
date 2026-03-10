import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

export interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  className?: string;
  theme?: 'light' | 'dark'; // Add light so we can force dark text on bright buttons
}

export const Typography = ({ variant = 'body', className = '', style, theme = 'dark', ...props }: TypographyProps) => {
  let baseClass = theme === 'dark' ? 'text-brand-text ' : 'text-brand-bg ';
  
  switch (variant) {
    case 'h1':
       baseClass += 'font-serif text-5xl tracking-tighter leading-tight '; break;
    case 'h2':
       baseClass += 'font-serif text-3xl tracking-tight '; break;
    case 'h3':
       baseClass += 'font-serif text-2xl tracking-tight '; break;
    case 'body':
       baseClass += 'font-sans text-base leading-relaxed '; break;
    case 'caption':
       baseClass += 'font-sans text-sm opacity-70 '; break;
  }

  return (
    <RNText className={`${baseClass} ${className}`} style={style} {...props} />
  );
};
