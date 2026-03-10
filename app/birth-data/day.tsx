import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';

const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function DayScreen() {
  const router = useRouter();
  const { year, month } = useLocalSearchParams();
  const [selectedDay, setSelectedDay] = useState(days[0].toString());

  const handleNext = () => {
    router.push({ pathname: '/birth-data/time', params: { year, month, day: selectedDay } });
  };

  return (
    <Container className="justify-between pb-12 pt-24">
      <MotiView 
        from={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: 1, translateX: 0 }}
        className="flex-1"
      >
        <Typography variant="h2" className="mb-8">Doğum günün</Typography>
        <View className="h-[1px] w-12 bg-brand-text/30 mb-8" />
        
        <View className="flex-1 justify-center">
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
            itemStyle={{ color: '#FAFAF8', fontFamily: 'Inter', fontSize: 24 }}
          >
            {days.map(d => (
              <Picker.Item key={d} label={d.toString()} value={d.toString()} />
            ))}
          </Picker>
        </View>
      </MotiView>

      <Button title="İleri" onPress={handleNext} />
    </Container>
  );
}
