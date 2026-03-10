import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';

const timeIntervals = [
  '00:00–02:00', '02:00–04:00', '04:00–06:00', '06:00–08:00',
  '08:00–10:00', '10:00–12:00', '12:00–14:00', '14:00–16:00',
  '16:00–18:00', '18:00–20:00', '20:00–22:00', '22:00–24:00'
];

export default function TimeScreen() {
  const router = useRouter();
  const { year, month, day } = useLocalSearchParams();
  const [selectedTime, setSelectedTime] = useState(timeIntervals[0]);

  const handleNext = () => {
    router.push({ pathname: '/birth-data/place', params: { year, month, day, time: selectedTime } });
  };

  return (
    <Container className="justify-between pb-12 pt-24">
      <MotiView 
        from={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: 1, translateX: 0 }}
        className="flex-1"
      >
        <Typography variant="h2" className="mb-8">Doğum saatin</Typography>
        <View className="h-[1px] w-12 bg-brand-text/30 mb-8" />
        
        <View className="flex-1 justify-center">
          <Picker
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
            itemStyle={{ color: '#FAFAF8', fontFamily: 'Inter', fontSize: 24 }}
          >
            {timeIntervals.map(t => (
              <Picker.Item key={t} label={t} value={t} />
            ))}
          </Picker>
        </View>
      </MotiView>

      <Button title="İleri" onPress={handleNext} />
    </Container>
  );
}
