import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';

const genAI = new GoogleGenerativeAI(API_KEY);

export interface DestinyResult {
  title: string;
  description: string;
  type: string;
}

export interface MonthForecast {
  month: string;   // e.g. "Mart 2026"
  theme: string;   // e.g. "Dönüşüm Ayı"
  love: string;
  career: string;
  energy: string;  // e.g. "⚡ Yüksek"
}

export interface DestinyAnalysis {
  cards: DestinyResult[];
  forecasts: MonthForecast[];
  rareType: {
    title: string;
    description: string;
    percentage: string;
  };
}

// Generate next 6 month names starting from current month
export const getNextSixMonths = (): string[] => {
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const now = new Date();
  const result: string[] = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    result.push(`${months[d.getMonth()]} ${d.getFullYear()}`);
  }
  return result;
};

export const analyzeDestiny = async (year: string, month: string, day: string, time: string, place: string): Promise<DestinyAnalysis> => {
  const nextMonths = getNextSixMonths();
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
    Sen "Destiny Reading" uygulaması için çalışan, Derin Psikoloji, Carl Jung, Saju (Doğu Astrolojisi) karması bir uzman yapay zekasın.
    Kullanıcı sana doğum bilgilerini verdi. Amacın: derin, gizemli, premium ve "Bunu nasıl bildi?" dedirtecek Türkçe analizler üretmek.

    Kullanıcı Bilgileri: ${day} ${month} ${year}, Saat: ${time}, Şehir/Mekan: ${place}.

    == BÖLÜM 1: KİŞİLİK ANALİZİ ==
    Şu 7 kategori için Başlık + 2-3 cümlelik derin, psikolojik ve vurucu metinler üret:
    1. Temel Kişiliğin
    2. Gizli Gücün
    3. Hayat Desenin
    4. Doğal Yeteneğin
    5. İnsanlarla İlişkin
    6. İçsel Korkun
    7. Kader Yolun

    Metin kuralları: Soğuk, yetişkin, derin. Genelleme değil, özgün tespitler. Barnum Effect ama akıllıca.

    == BÖLÜM 2: AYLIK ÖNGÖRÜLER ==
    Şu 6 ay için öngörü yaz: ${nextMonths.join(', ')}.

    Her ay için:
    - month: "${nextMonths[0]}" formatında (tam olarak listedeki gibi)
    - theme: O aya özel çarpıcı bir tema adı (örn: "Sessiz Kırılma", "Yükseliş Kapısı")
    - love: Aşk/ilişki öngörüsü, 1-2 vurucu cümle
    - career: Kariyer/para öngörüsü, 1-2 vurucu cümle  
    - energy: "⚡ Yüksek" veya "🌙 Orta" veya "🌑 Düşük" formatında (birini seç)

    == BÖLÜM 3: NADİR KADER TİPİ ==
    Kullanıcıya özel çok havalı bir "Nadir Kader Tipi" bul (örn: "Sessiz Stratejist", "Gölge Gözlemcisi").
    Dünyanın % kaçında görüldüğünü belirt (örn: "%3.7").

    Lütfen SADECE geçerli JSON döndür. Kesinlikle markdown backtick KULLANMA:
    {
      "cards": [
        { "type": "Temel Kişiliğin", "title": "Temel Kişiliğin", "description": "..." },
        ... (7 adet)
      ],
      "forecasts": [
        { "month": "${nextMonths[0]}", "theme": "...", "love": "...", "career": "...", "energy": "⚡ Yüksek" },
        ... (6 adet, tüm aylar)
      ],
      "rareType": {
        "title": "Nadir Kader Tipin",
        "description": "Sessiz Stratejist — Dünyadaki insanların sadece %3.7'si bu kader desenine sahip.",
        "percentage": "%3.7"
      }
    }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJsonStr) as DestinyAnalysis;

  } catch (error) {
    console.warn('Gemini Analysis Fail, using fallback data.', error);
    const now = new Date();
    return {
      cards: [
        { type: "Temel Kişiliğin", title: "Temel Kişiliğin", description: "Çoğu insan seni kolay okunabilir zanneder ancak sen sınırlarını mükemmel bir zarafetle çizersin." },
        { type: "Gizli Gücün", title: "Gizli Gücün", description: "Olayların arka planını çok hızlı okuyabiliyorsun. Bir ortama girdiğinde enerjiyi anında analiz edersin." },
        { type: "Hayat Desenin", title: "Hayat Desenin", description: "Kaosun içinde her zaman bir düzen yaratıyorsun. Zorluklar senin karakterini keskinleştiren birer araç." },
        { type: "Doğal Yeteneğin", title: "Doğal Yeteneğin", description: "İnsanların duymak istedikleri değil, duymaları gereken şeyleri sezgisel olarak bulabilmek." },
        { type: "İnsanlarla İlişkin", title: "İnsanlarla İlişkin", description: "Dar ama son derece sadık bir çemberin var. Kimin kalacağına çok keskin kurallarla karar veriyorsun." },
        { type: "İçsel Korkun", title: "İçsel Korkun", description: "Kontrolü kaybetmek ve manipüle edilmek. Zihnini en çok meşgul eden savunma mekanizman bu." },
        { type: "Kader Yolun", title: "Kader Yolun", description: "Gölgede kalarak etki yaratmak. Gücünü bağırmadan hissettirenlerdensin." },
      ],
      forecasts: getNextSixMonths().map((m, i) => ({
        month: m,
        theme: ["Sessiz Kırılma", "Yükseliş Kapısı", "İç Hesaplaşma", "Sabır Testi", "Yeni Perspektif", "Güç Toplama"][i],
        love: "Bu ay ilişkilerinde yeni bir denge kurma fırsatı doğacak. Sessizliğin değerini anlayacaksın.",
        career: "Projeler hız kazanıyor. Doğru adımla büyük bir kapı aralanabilir. Aceleci davranma.",
        energy: ["⚡ Yüksek", "🌙 Orta", "🌑 Düşük", "⚡ Yüksek", "🌙 Orta", "⚡ Yüksek"][i],
      })),
      rareType: {
        title: "Nadir Kader Tipin",
        description: "Sessiz Stratejist — Dünyadaki insanların sadece %3.4'ü bu kader desenine sahip.",
        percentage: "%3.4"
      }
    };
  }
};
