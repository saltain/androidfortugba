import React from 'react';
import { View, TouchableOpacity, Share } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';

export default function ViralScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rareType = JSON.parse(params.rareType as string || '{}');

  const name = rareType.name || rareType.description || '';
  const percentage = rareType.percentage || rareType.description || '';

  const onShare = async () => {
    try {
      await Share.share({
        message: `Benim nadir kader tipim: ${name}. ${percentage} Seninki ne? #SajuDestiny`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    router.push('/analysis/premium');
  };

  return (
    <Container className="pt-24 pb-12 justify-center items-center">
      <MotiView 
        from={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'timing', duration: 1200 }}
        className="w-full bg-brand-text p-8 border border-white/20 items-center justify-center py-24"
      >
        <Typography variant="caption" theme="light" className="mb-6 tracking-[0.3em] uppercase opacity-70">
          Nadir Kader Tipin
        </Typography>
        
        <Typography variant="h2" theme="light" className="text-center mb-8 px-4 leading-tight">
          {name}
        </Typography>

        <View className="h-[1px] w-16 bg-brand-bg/30 mb-8" />
        
        <Typography variant="body" theme="light" className="text-center opacity-90 max-w-[280px]">
          {percentage.includes('%') ? percentage : "Dünyadaki insanların sadece %4.1'i bu kader desenine sahip."}
        </Typography>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 600 }}
        className="w-full absolute bottom-12 px-8"
      >
        <Button title="Sonucu Paylaş" variant="outline" onPress={onShare} className="mb-4 bg-transparent border-brand-text text-brand-text" />
        <Button title="İleri" onPress={handleNext} />
      </MotiView>
    </Container>
  );
}
