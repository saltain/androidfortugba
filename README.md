# DestinyApp 🔮

Doğum bilgilerine göre kişilik ve kader analizi yapan modern bir mobil uygulama. Gemini 2.5 Flash AI ile gerçek zamanlı analiz.

## Özellikler

- **Saju Kader Analizi** — Doğum tarihi, saat ve yer bazlı 7 bölümlük kişilik analizi
- **Aylık Öngörüler** — Sonraki 6 ay için Aşk, Kariyer ve Enerji tahminleri
- **Nadir Kader Tipi** — Kişiye özel viral paylaşım kartı
- **Yüksek Dönüşüm Akışı** — Premium & aylık upsell ile monetizasyon

## Teknolojiler

- React Native + Expo (Managed Workflow)
- TypeScript
- NativeWind v4 (Tailwind CSS)
- Gemini 2.5 Flash API
- Expo Router
- React Native Reanimated + Moti

## Kurulum

```bash
npm install
```

API anahtarını ekle:
```bash
# .env dosyası oluştur
EXPO_PUBLIC_GEMINI_API_KEY=your_key_here
```

Uygulamayı başlat:
```bash
env HOME=/tmp/fake-home npx expo start -c
```

## Ekran Akışı

Splash → Yıl → Ay → Gün → Saat → Doğum Yeri → Yükleniyor → Kişilik Kartları → Aylık Öngörüler → Nadir Kader Tipi → Premium
