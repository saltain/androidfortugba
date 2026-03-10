import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { analyzeDestiny } from '@/lib/gemini';
import { MotiView, AnimatePresence } from 'moti';

const messages = [
  "Enerjin analiz ediliyor...",
  "Doğum anındaki kozmik düzen okunuyor...",
  "Kişilik desenlerin çözümleniyor...",
  "Kader haritan oluşturuluyor..."
];

export default function LoadingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const fetchAttempted = useRef(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchAnalysis = async () => {
      if (fetchAttempted.current) return;
      fetchAttempted.current = true;

      const year = params.year as string;
      const month = params.month as string;
      const day = params.day as string;
      const time = params.time as string;
      const place = params.place as string;

      const result = await analyzeDestiny(year, month, day, time, place);
      
      setTimeout(() => {
        if (isMounted) {
          router.replace({
            pathname: '/analysis/results',
            params: { data: JSON.stringify(result) }
          });
        }
      }, 1500);
    };

    fetchAnalysis();
    
    return () => { isMounted = false; };
  }, []);

  return (
    <Container className="justify-center items-center">
      <MotiView
        from={{ scale: 0.8, opacity: 0.3 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ type: 'timing', duration: 1500, loop: true }}
        className="w-16 h-16 border rounded-full border-brand-text items-center justify-center mb-12"
      >
        <View className="w-2 h-2 rounded-full bg-brand-text" />
      </MotiView>

      <View className="h-10">
        <AnimatePresence mode="wait">
          <MotiView
            key={`msg-${messageIndex}`}
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ type: 'timing', duration: 800 }}
          >
            <Typography variant="body" className="text-center italic opacity-80">
              {messages[messageIndex]}
            </Typography>
          </MotiView>
        </AnimatePresence>
      </View>
    </Container>
  );
}
