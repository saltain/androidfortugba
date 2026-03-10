import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

export default function YearScreen() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(years[25].toString()); 

  const handleNext = () => {
    router.push({ pathname: '/birth-data/month', params: { year: selectedYear } });
  };

  return (
    <Container className="justify-between pb-12 pt-24">
      <MotiView 
        from={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: 1, translateX: 0 }}
        className="flex-1"
      >
        <Typography variant="h2" className="mb-8">Doğum yılın</Typography>
        <View className="h-[1px] w-12 bg-brand-text/30 mb-8" />
        
        <View className="flex-1 justify-center">
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            itemStyle={{ color: '#FAFAF8', fontFamily: 'Inter', fontSize: 24 }}
          >
            {years.map(y => (
              <Picker.Item key={y} label={y.toString()} value={y.toString()} />
            ))}
          </Picker>
        </View>
      </MotiView>

      <Button title="İleri" onPress={handleNext} />
    </Container>
  );
}
