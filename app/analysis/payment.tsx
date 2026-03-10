import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isMonthly = params.plan === 'monthly';
  const price = params.price as string || '129';
  const productName = isMonthly ? 'Aylık Tam Öngörü' : 'Tam Kader Analizi';
  const productDesc = isMonthly ? 'Seçili ay için tüm detaylar' : 'Tek seferlik tam kader paketi';

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handlePay = () => {
    if (!cardNumber || !expiry || !cvv || !name) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '✨ Ödeme Başarılı!',
        isMonthly ? 'Bu ayın tam öngörüsüne eriştiniz!' : 'Kader analizinin tamamına erişim sağlandı.',
        [{ text: 'Harika!', onPress: () => router.back() }]
      );
    }, 2000);
  };

  const inputStyle = {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(250,250,248,0.3)',
    paddingVertical: 12,
    color: '#FAFAF8',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 28,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0E27' }}>
      {/* Back */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ paddingHorizontal: 32, paddingVertical: 12 }}
      >
        <Typography variant="caption" className="opacity-50 tracking-widest uppercase">← Geri</Typography>
      </TouchableOpacity>

      <View style={{ flex: 1, paddingHorizontal: 32, paddingTop: 16 }}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
        >
          <Typography variant="caption" className="tracking-widest uppercase opacity-60 mb-2">
            Güvenli Ödeme
          </Typography>
          <Typography variant="h2" className="mb-2 leading-tight">
            Kader Tam{'\n'}Analizin
          </Typography>
          <View style={{ height: 1, width: 48, backgroundColor: 'rgba(250,250,248,0.3)', marginBottom: 36 }} />

          {/* Price Tag */}
          <View style={{
            borderWidth: 1,
            borderColor: 'rgba(250,250,248,0.15)',
            padding: 16,
            marginBottom: 36,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View>
              <Typography variant="caption" style={{ opacity: 0.5, fontSize: 10, letterSpacing: 2 }}>TEK SEFERLİK</Typography>
              <Typography variant="body" style={{ fontWeight: '600', marginTop: 2 }}>{productName}</Typography>
              <Typography variant="caption" style={{ opacity: 0.4, marginTop: 2, fontSize: 11 }}>{productDesc}</Typography>
            </View>
            <Typography variant="h3">₺{price}</Typography>
          </View>

          {/* Card Number */}
          <Typography variant="caption" style={{ opacity: 0.5, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>KART NUMARASI</Typography>
          <TextInput
            value={cardNumber}
            onChangeText={(t) => setCardNumber(formatCardNumber(t))}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor="rgba(250,250,248,0.25)"
            keyboardType="numeric"
            style={inputStyle}
          />

          {/* Name */}
          <Typography variant="caption" style={{ opacity: 0.5, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>KART SAHİBİNİN ADI</Typography>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ad Soyad"
            placeholderTextColor="rgba(250,250,248,0.25)"
            style={inputStyle}
          />

          {/* Expiry + CVV */}
          <View style={{ flexDirection: 'row', gap: 24 }}>
            <View style={{ flex: 1 }}>
              <Typography variant="caption" style={{ opacity: 0.5, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>SON KULLANIM</Typography>
              <TextInput
                value={expiry}
                onChangeText={(t) => setExpiry(formatExpiry(t))}
                placeholder="AA/YY"
                placeholderTextColor="rgba(250,250,248,0.25)"
                keyboardType="numeric"
                style={inputStyle}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="caption" style={{ opacity: 0.5, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>CVV</Typography>
              <TextInput
                value={cvv}
                onChangeText={(t) => setCvv(t.replace(/\D/g, '').slice(0, 3))}
                placeholder="000"
                placeholderTextColor="rgba(250,250,248,0.25)"
                keyboardType="numeric"
                secureTextEntry
                style={inputStyle}
              />
            </View>
          </View>

          <Button title={loading ? "İşleniyor..." : "Ödemeyi Tamamla"} onPress={handlePay} />
          
          <Typography variant="caption" style={{ textAlign: 'center', opacity: 0.3, marginTop: 16, fontSize: 10, letterSpacing: 1 }}>
            🔒  256-bit SSL ile korunan güvenli ödeme
          </Typography>
        </MotiView>
      </View>
    </SafeAreaView>
  );
}
