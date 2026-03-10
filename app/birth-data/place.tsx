import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';

export default function PlaceScreen() {
  const router = useRouter();
  const { year, month, day, time } = useLocalSearchParams();
  const [place, setPlace] = useState('');

  const handleNext = () => {
    if (place.trim().length > 0) {
      router.push({ pathname: '/analysis/loading', params: { year, month, day, time, place } });
    }
  };

  return (
    <Container className="justify-between pb-12 pt-24">
      <MotiView 
        from={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: 1, translateX: 0 }}
        className="flex-[0.8]"
      >
        <Typography variant="h2" className="mb-8">Doğum yerin</Typography>
        <View className="h-[1px] w-12 bg-brand-text/30 mb-12" />
        
        <View className="w-full border-b border-brand-text/50 pb-2">
          <TextInput
            value={place}
            onChangeText={setPlace}
            placeholder="Şehir / Ülke"
            placeholderTextColor="#FAFAF850"
            className="text-brand-text font-sans text-2xl"
            autoFocus
          />
        </View>
      </MotiView>

      <Button title="Analizi Başlat" onPress={handleNext} disabled={place.trim().length === 0} />
    </Container>
  );
}
