import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ContainerProps extends ViewProps {
  useSafeArea?: boolean;
  padded?: boolean;
}

export const Container = ({ useSafeArea = true, padded = true, className = '', children, ...props }: ContainerProps) => {
  const Comp = useSafeArea ? SafeAreaView : View;
  
  return (
    <Comp className={`flex-1 bg-brand-bg ${padded ? 'px-8' : ''} ${className}`} {...props}>
      {children}
    </Comp>
  );
};
