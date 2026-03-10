import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MonthForecast } from '@/lib/gemini';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForecastScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedMonth, setSelectedMonth] = useState(0);

  const forecasts: MonthForecast[] = params.forecasts
    ? JSON.parse(params.forecasts as string)
    : [];

  const handleFinish = () => {
    router.push({
      pathname: '/analysis/viral',
      params: { rareType: params.rareType }
    });
  };

  if (!forecasts || forecasts.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0E27' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body">Yükleniyor...</Typography>
        </View>
      </SafeAreaView>
    );
  }

  const selected = forecasts[selectedMonth];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0E27' }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ paddingHorizontal: 32, paddingVertical: 12 }}
      >
        <Typography variant="caption" className="opacity-50 tracking-widest uppercase">← Geri</Typography>
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={{ paddingHorizontal: 32, marginBottom: 24 }}
        >
          <Typography variant="caption" className="tracking-widest uppercase opacity-60 mb-2">
            Aylık Öngörüler
          </Typography>
          <Typography variant="h2" className="leading-tight">
            Seninle neler{'\n'}yaşanacak?
          </Typography>
          <View style={{ height: 1, width: 48, backgroundColor: 'rgba(250,250,248,0.3)', marginTop: 16 }} />
        </MotiView>

        {/* Month Selector Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
          contentContainerStyle={{ paddingHorizontal: 32 }}
        >
          {forecasts.map((f, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setSelectedMonth(i)}
              style={{
                marginRight: 12,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: selectedMonth === i ? '#FAFAF8' : 'rgba(250,250,248,0.2)',
                backgroundColor: selectedMonth === i ? '#FAFAF8' : 'transparent',
              }}
            >
              <Typography
                variant="caption"
                style={{ color: selectedMonth === i ? '#0A0E27' : 'rgba(250,250,248,0.5)', fontWeight: selectedMonth === i ? '700' : '400' }}
              >
                {f.month.split(' ')[0].toUpperCase().slice(0, 3)}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Selected Month Detail */}
        <MotiView
          key={`month-${selectedMonth}`}
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400 }}
          style={{ paddingHorizontal: 32 }}
        >
          {/* Month Title */}
          <View style={{ marginBottom: 24 }}>
            <Typography variant="h3" className="mb-1">{selected.month}</Typography>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Typography variant="caption" style={{ opacity: 0.6, letterSpacing: 2, textTransform: 'uppercase', fontSize: 11 }}>
                {selected.theme}
              </Typography>
              <Typography variant="caption" style={{ marginLeft: 12 }}>{selected.energy}</Typography>
            </View>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: 'rgba(250,250,248,0.1)', marginBottom: 24 }} />

          {/* Love */}
          <View style={{ marginBottom: 28, borderLeftWidth: 2, borderLeftColor: 'rgba(250,250,248,0.25)', paddingLeft: 16 }}>
            <Typography variant="caption" style={{ letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5, marginBottom: 10, fontSize: 10 }}>
              Aşk & İlişki
            </Typography>
            <Typography variant="body" className="leading-relaxed">{selected.love}</Typography>
          </View>

          {/* Career */}
          <View style={{ marginBottom: 28, borderLeftWidth: 2, borderLeftColor: 'rgba(250,250,248,0.25)', paddingLeft: 16 }}>
            <Typography variant="caption" style={{ letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5, marginBottom: 10, fontSize: 10 }}>
              Kariyer & Para
            </Typography>
            <Typography variant="body" className="leading-relaxed">{selected.career}</Typography>
          </View>

          {/* Energy Badge */}
          <View style={{
            borderWidth: 1,
            borderColor: 'rgba(250,250,248,0.15)',
            padding: 16,
            marginBottom: 36,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="caption" style={{ opacity: 0.5, letterSpacing: 2, textTransform: 'uppercase', fontSize: 10 }}>
              Bu Ayın Enerjisi
            </Typography>
            <Typography variant="body" style={{ fontWeight: '600' }}>{selected.energy}</Typography>
          </View>

          {/* Upsell Block */}
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/analysis/payment', params: { plan: 'monthly', price: '59' } })}
            style={{
              borderWidth: 1,
              borderColor: 'rgba(250,250,248,0.4)',
              padding: 20,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 1, marginRight: 12 }}>
              <Typography variant="caption" style={{ opacity: 0.5, fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>
                ÖZEL TEKLİF
              </Typography>
              <Typography variant="body" style={{ fontWeight: '600', marginBottom: 2 }}>
                Tüm Ayı Gör ✦
              </Typography>
              <Typography variant="caption" style={{ opacity: 0.6 }}>
                {selected.month} için tam öngörüyü al
              </Typography>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Typography variant="h3" style={{ color: '#FAFAF8' }}>₺59</Typography>
              <Typography variant="caption" style={{ opacity: 0.4, textDecorationLine: 'line-through', fontSize: 10 }}>₺129</Typography>
            </View>
          </TouchableOpacity>

          {/* CTA */}
          <Button title="Kader Tipimi Gör →" onPress={handleFinish} />
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}
