import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

const premiumFeatures = [
  { icon: '♥', label: 'Aşk hayatı & ilişki analizi' },
  { icon: '◈', label: 'Kariyer yolu & para döngüleri' },
  { icon: '◉', label: 'Gelecek 5 yıl tahmini' },
  { icon: '◆', label: 'Gizli potansiyel analizi' },
  { icon: '✦', label: 'Kader döngüleri & kritik tarihler' },
];

export default function PremiumScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0E27' }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ paddingHorizontal: 32, paddingVertical: 12 }}
      >
        <Typography variant="caption" className="opacity-50 tracking-widest uppercase">← Geri</Typography>
      </TouchableOpacity>

      <View style={{ flex: 1, paddingHorizontal: 32, paddingTop: 16, justifyContent: 'space-between' }}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <Typography variant="caption" className="tracking-widest uppercase opacity-60 mb-3">Premium</Typography>
          <Typography variant="h2" className="leading-tight mb-2">
            Kader analizinin{'\n'}sadece bir kısmını{'\n'}gördün.
          </Typography>
          <View style={{ height: 1, width: 48, backgroundColor: 'rgba(250,250,248,0.3)', marginBottom: 36 }} />

          <View>
            {premiumFeatures.map((feat, index) => (
              <MotiView
                key={feat.label}
                from={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 400 + (index * 150) }}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
              >
                <Typography variant="body" style={{ marginRight: 16, opacity: 0.6 }}>{feat.icon}</Typography>
                <Typography variant="body" style={{ opacity: 0.9 }}>{feat.label}</Typography>
              </MotiView>
            ))}
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 1000, delay: 1200 }}
          style={{ paddingBottom: 12 }}
        >
          <Button
            title="Kaderimin Tamamını Gör"
            onPress={() => router.push('/analysis/payment')}
          />
          <Typography variant="caption" style={{ textAlign: 'center', marginTop: 16, opacity: 0.4, letterSpacing: 2 }}>
            ₺129.99 / TEK SEFERLİK
          </Typography>
        </MotiView>
      </View>
    </SafeAreaView>
  );
}
