import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';

export default function SplashScreen() {
  const router = useRouter();

  const handleStart = () => {
    // Navigate to Birth Data Flow
    router.push('/birth-data/year');
  };

  return (
    <Container className="justify-between pb-12 pt-24">
      <MotiView 
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 300 }}
        className="flex-1"
      >
        <Typography variant="h1" className="mb-8">
          Kaderin{'\n'}doğduğun{'\n'}anda yazıldı.
        </Typography>
        <View className="h-[1px] w-16 bg-brand-text/30 mb-8" />
        <Typography variant="body" className="max-w-[280px] opacity-80">
          Doğum bilgilerine göre gizli kişiliğini ve kader desenini keşfet.
        </Typography>
      </MotiView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000, delay: 900 }}
      >
        <Button title="Başla" onPress={handleStart} />
      </MotiView>
    </Container>
  );
}
