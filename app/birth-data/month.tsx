import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';

const months = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export default function MonthScreen() {
  const router = useRouter();
  const { year } = useLocalSearchParams();
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const handleNext = () => {
    router.push({ pathname: '/birth-data/day', params: { year, month: selectedMonth } });
  };

  return (
    <Container className="justify-between pb-12 pt-24">
      <MotiView 
        from={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: 1, translateX: 0 }}
        className="flex-1"
      >
        <Typography variant="h2" className="mb-8">Doğum ayın</Typography>
        <View className="h-[1px] w-12 bg-brand-text/30 mb-8" />
        
        <View className="flex-1 justify-center">
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            itemStyle={{ color: '#FAFAF8', fontFamily: 'Inter', fontSize: 24 }}
          >
            {months.map(m => (
              <Picker.Item key={m} label={m} value={m} />
            ))}
          </Picker>
        </View>
      </MotiView>

      <Button title="İleri" onPress={handleNext} />
    </Container>
  );
}
