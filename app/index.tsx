import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { MotiView, AnimatePresence } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/ThemeContext';

const { width } = Dimensions.get('window');

const testimonials = [
  { text: '"Bu kadar doğru olması imkansız. Yıllardır hissettiğim şeyi 2 cümleyle anlattı."', name: 'Selin K., İzmir' },
  { text: '"Kader tipimi görünce dondum kaldım. Nasıl bu kadar isabetli?"', name: 'Murat A., İstanbul' },
  { text: '"Arkadaşlarıma gönderdim, hepsi şoke oldu. Gerçekten çok derin."', name: 'Ayşe D., Ankara' },
  { text: '"3 kez tekrar okudum. Her seferinde yeni bir şey gördüm."', name: 'Emre T., Bursa' },
  { text: '"Hayatımın en doğru analizini yapan uygulama bu."', name: 'Zeynep M., Adana' },
];

// Generate random stars
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  opacity: Math.random() * 0.7 + 0.1,
  delay: Math.random() * 3000,
}));

export default function SplashScreen() {
  const router = useRouter();
  const { theme, setTheme, colors } = useTheme();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  // Auto-rotate testimonials with state only (no scroll offset needed)
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Pulse star animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Cosmic Star Background */}
      <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {STARS.map((star) => (
          <Animated.View
            key={star.id}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: star.size,
              backgroundColor: colors.text,
              opacity: pulseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [star.opacity * 0.3, star.opacity],
              }),
            }}
          />
        ))}

        {/* Distant galaxy glow */}
        <Animated.View
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: theme === 'dark' ? '#1a1f5e' : '#c5c8e8',
            top: '10%',
            right: '-20%',
            opacity: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.25],
            }),
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: theme === 'dark' ? '#0d2a4a' : '#b8d0e8',
            bottom: '20%',
            left: '-10%',
            opacity: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.08, 0.2],
            }),
          }}
        />
      </View>

      {/* Theme Toggle Top Right */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 32, paddingTop: 8 }}>
        <View style={{
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <TouchableOpacity
            onPress={() => setTheme('dark')}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 7,
              backgroundColor: theme === 'dark' ? colors.text : 'transparent',
            }}
          >
            <Typography variant="caption" style={{
              color: theme === 'dark' ? colors.bg : colors.muted,
              fontSize: 10,
              letterSpacing: 1,
            }}>🌑 KOYU</Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTheme('light')}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 7,
              backgroundColor: theme === 'light' ? colors.text : 'transparent',
            }}
          >
            <Typography variant="caption" style={{
              color: theme === 'light' ? colors.bg : colors.muted,
              fontSize: 10,
              letterSpacing: 1,
            }}>☀️ AÇIK</Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 32, paddingBottom: 40 }}>

        {/* Hero Text */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 200 }}
          style={{ paddingTop: 40 }}
        >
          <Typography variant="caption" style={{ color: colors.muted, letterSpacing: 3, fontSize: 10, marginBottom: 16 }}>
            SAJU × PSİKOLOJİ × KADER
          </Typography>
          <Typography variant="h1" style={{ color: colors.text, lineHeight: 52, marginBottom: 20 }}>
            Kaderin{'\n'}doğduğun{'\n'}anda yazıldı.
          </Typography>
          <View style={{ height: 1, width: 48, backgroundColor: colors.border, marginBottom: 20 }} />
          <Typography variant="body" style={{ color: colors.muted, maxWidth: 260, lineHeight: 24 }}>
            Doğum tarihin, saatin ve yerin — hepsinin bir sırrı var. Şimdi öğren.
          </Typography>
        </MotiView>

        {/* Social Proof Counter */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 800 }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 24,
            paddingVertical: 14,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View style={{ marginRight: 24 }}>
            <Typography variant="h3" style={{ color: colors.text }}>48.291</Typography>
            <Typography variant="caption" style={{ color: colors.muted, fontSize: 10, letterSpacing: 1 }}>ANALİZ YAPILDI</Typography>
          </View>
          <View style={{ width: 1, height: 30, backgroundColor: colors.border, marginRight: 24 }} />
          <View>
            <Typography variant="h3" style={{ color: colors.text }}>%96</Typography>
            <Typography variant="caption" style={{ color: colors.muted, fontSize: 10, letterSpacing: 1 }}>DOĞRU BULDU</Typography>
          </View>
        </MotiView>

        {/* Testimonials - Fade In/Out */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 1200 }}
          style={{ marginTop: 20 }}
        >
          <AnimatePresence>
            <MotiView
              key={`testimonial-${testimonialIndex}`}
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -8 }}
              transition={{ type: 'timing', duration: 500 }}
              style={{
                borderLeftWidth: 2,
                borderLeftColor: colors.border,
                paddingLeft: 16,
              }}
            >
              <Typography variant="body" style={{ color: colors.text, fontStyle: 'italic', lineHeight: 22, marginBottom: 8 }}>
                {testimonials[testimonialIndex].text}
              </Typography>
              <Typography variant="caption" style={{ color: colors.muted, fontSize: 10, letterSpacing: 1 }}>
                — {testimonials[testimonialIndex].name}
              </Typography>
            </MotiView>
          </AnimatePresence>

          {/* Dots */}
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            {testimonials.map((_, i) => (
              <View key={i} style={{
                width: i === testimonialIndex ? 16 : 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: i === testimonialIndex ? colors.text : colors.border,
                marginRight: 4,
              }} />
            ))}
          </View>
        </MotiView>


        {/* CTA Button */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 1600 }}
          style={{ marginTop: 32 }}
        >
          <TouchableOpacity
            onPress={() => router.push('/birth-data/year')}
            style={{
              backgroundColor: colors.text,
              paddingVertical: 18,
              alignItems: 'center',
            }}
          >
            <Typography variant="body" style={{
              color: colors.bg,
              fontWeight: '700',
              letterSpacing: 3,
              fontSize: 13,
            }}>
              ANALİZİ BAŞLAT
            </Typography>
          </TouchableOpacity>

          <Typography variant="caption" style={{
            textAlign: 'center',
            color: colors.muted,
            marginTop: 14,
            fontSize: 10,
            letterSpacing: 1,
          }}>
            ÜCRETSİZ · 2 DAKİKA · KİŞİYE ÖZEL
          </Typography>
        </MotiView>
      </View>
    </SafeAreaView>
  );
}
