import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { DestinyAnalysis } from '@/lib/gemini';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 64; // 32px padding on each side

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [data, setData] = useState<DestinyAnalysis | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reactions, setReactions] = useState<Record<number, boolean>>({});
  const flatListRef = useRef<FlatList>(null);

  React.useEffect(() => {
    if (params.data) {
      try {
        const parsed = JSON.parse(params.data as string);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse results");
      }
    }
  }, [params.data]);

  const handleFinish = () => {
    if (data) {
      router.push({
        pathname: '/analysis/forecast',
        params: {
          forecasts: JSON.stringify(data.forecasts),
          rareType: JSON.stringify(data.rareType)
        }
      });
    }
  };

  const react = (index: number, val: boolean) => {
    setReactions(prev => ({ ...prev, [index]: val }));
    
    // Auto advance to next card for better UX
    if (data && index < data.cards.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
        setCurrentIndex(index + 1);
      }, 400); // 400ms delay to let the user see their reaction color change
    }
  };

  if (!data) return <Container />;

  return (
    <Container padded={false} className="pt-24 pb-12 w-full">
      <View className="px-8 mb-4">
        <Typography variant="caption" className="tracking-widest uppercase">
          {currentIndex + 1} / {data.cards.length}
        </Typography>
      </View>
      
      <View className="flex-1 w-full mt-4">
        <FlatList
          ref={flatListRef}
          data={data.cards}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 16));
            setCurrentIndex(index);
          }}
          contentContainerStyle={{ paddingHorizontal: 32 }}
          renderItem={({ item, index }) => (
            <View 
              style={{ width: CARD_WIDTH, marginRight: index === data.cards.length - 1 ? 0 : 16 }}
              className="bg-brand-text p-8 h-[80%] justify-between"
            >
              <View>
                <Typography variant="h3" theme="light" className="mb-6">{item.title}</Typography>
                <View className="h-[1px] w-12 bg-brand-bg/30 mb-6" />
                <Typography variant="body" theme="light" className="opacity-90 leading-relaxed">
                  {item.description}
                </Typography>
              </View>

              <View className="flex-row justify-between mt-8">
                <TouchableOpacity 
                  onPress={() => react(index, false)}
                  className={`w-[48%] h-12 border border-brand-bg/30 items-center justify-center ${reactions[index] === false ? 'bg-brand-bg/10' : ''}`}
                >
                  <Typography variant="body" theme="light" className="font-semibold text-sm">❌ Uymadı</Typography>
                </TouchableOpacity>

                <TouchableOpacity 
                   onPress={() => react(index, true)}
                  className={`w-[48%] h-12 bg-brand-bg items-center justify-center ${reactions[index] === true ? 'opacity-80' : ''}`}
                >
                  <Typography variant="body" theme="dark" className="font-semibold text-sm text-brand-text">✔️ Uyuyor</Typography>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <MotiView
        animate={{ opacity: currentIndex === data.cards.length - 1 ? 1 : 0 }}
        className="w-full px-8 absolute bottom-12"
      >
        <Button 
          title="Aylık Öngörüleri Gör ✨" 
          onPress={handleFinish} 
          disabled={currentIndex !== data.cards.length - 1} 
        />
      </MotiView>
    </Container>
  );
}
