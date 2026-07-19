import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ko", label: "Korean", native: "한국어" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

// Only key UI strings — other content is translated on demand by the AI.
const DICT: Record<LangCode, Record<string, string>> = {
  en: {
    search_placeholder: "Search gates, seats, food, help…",
    live: "Live",
    ask_ai: "Ask AI",
    emergency_sos: "Emergency SOS",
    home: "Home",
    live_stadium: "Live Stadium",
    map: "Interactive Map",
    navigation: "Navigation",
    ai_assistant: "AI Assistant",
    planner: "Match Planner",
    crowd: "Crowd Intelligence",
    multilingual: "Multilingual",
    transport: "Transportation",
    food: "Food & Drinks",
    accessibility: "Accessibility",
    sustainability: "Sustainability",
    emergency: "Emergency AI",
    volunteers: "Volunteers",
    operations: "Operations",
    notifications: "Notifications",
    profile: "Profile",
    settings: "Settings",
    overview: "Overview",
    intelligence: "Intelligence",
    fan_experience: "Fan Experience",
    account: "Account",
    no_results: "No results — ask the AI Assistant",
    open_map: "Open on Map",
    start_route: "Start Route",
    kickoff: "Kickoff",
    section: "Section",
    gate: "Gate",
    weather: "Weather",
  },
  es: { search_placeholder: "Buscar puertas, asientos, comida, ayuda…", live: "En vivo", ask_ai: "Preguntar IA", emergency_sos: "SOS de Emergencia", home: "Inicio", live_stadium: "Estadio en Vivo", map: "Mapa Interactivo", navigation: "Navegación", ai_assistant: "Asistente IA", planner: "Planificador", crowd: "Multitud", multilingual: "Multilingüe", transport: "Transporte", food: "Comida", accessibility: "Accesibilidad", sustainability: "Sostenibilidad", emergency: "Emergencia IA", volunteers: "Voluntarios", operations: "Operaciones", notifications: "Notificaciones", profile: "Perfil", settings: "Ajustes", overview: "General", intelligence: "Inteligencia", fan_experience: "Experiencia", account: "Cuenta", no_results: "Sin resultados — pregunte al Asistente IA", open_map: "Abrir en Mapa", start_route: "Iniciar Ruta", kickoff: "Saque inicial", section: "Sección", gate: "Puerta", weather: "Clima" },
  fr: { search_placeholder: "Rechercher portes, sièges, nourriture…", live: "En direct", ask_ai: "Demander IA", emergency_sos: "SOS Urgence", home: "Accueil", live_stadium: "Stade en Direct", map: "Carte Interactive", navigation: "Navigation", ai_assistant: "Assistant IA", planner: "Planificateur", crowd: "Affluence", multilingual: "Multilingue", transport: "Transport", food: "Restauration", accessibility: "Accessibilité", sustainability: "Durabilité", emergency: "Urgence IA", volunteers: "Bénévoles", operations: "Opérations", notifications: "Notifications", profile: "Profil", settings: "Paramètres", overview: "Vue d'ensemble", intelligence: "Intelligence", fan_experience: "Expérience", account: "Compte", no_results: "Aucun résultat — demandez à l'IA", open_map: "Ouvrir la carte", start_route: "Démarrer l'itinéraire", kickoff: "Coup d'envoi", section: "Section", gate: "Porte", weather: "Météo" },
  pt: { search_placeholder: "Buscar portões, assentos, comida…", live: "Ao vivo", ask_ai: "Perguntar IA", emergency_sos: "SOS de Emergência", home: "Início", live_stadium: "Estádio ao Vivo", map: "Mapa Interativo", navigation: "Navegação", ai_assistant: "Assistente IA", planner: "Planejador", crowd: "Multidão", multilingual: "Multilíngue", transport: "Transporte", food: "Comida", accessibility: "Acessibilidade", sustainability: "Sustentabilidade", emergency: "Emergência IA", volunteers: "Voluntários", operations: "Operações", notifications: "Notificações", profile: "Perfil", settings: "Configurações", overview: "Visão", intelligence: "Inteligência", fan_experience: "Experiência", account: "Conta", no_results: "Sem resultados — pergunte à IA", open_map: "Abrir no Mapa", start_route: "Iniciar Rota", kickoff: "Pontapé inicial", section: "Seção", gate: "Portão", weather: "Clima" },
  ar: { search_placeholder: "ابحث عن البوابات والمقاعد والطعام…", live: "مباشر", ask_ai: "اسأل الذكاء", emergency_sos: "طوارئ SOS", home: "الرئيسية", live_stadium: "الملعب مباشر", map: "خريطة تفاعلية", navigation: "الملاحة", ai_assistant: "مساعد الذكاء", planner: "مخطط المباراة", crowd: "الحشد", multilingual: "متعدد اللغات", transport: "النقل", food: "الطعام", accessibility: "إمكانية الوصول", sustainability: "الاستدامة", emergency: "طوارئ", volunteers: "المتطوعون", operations: "العمليات", notifications: "الإشعارات", profile: "الملف الشخصي", settings: "الإعدادات", overview: "نظرة عامة", intelligence: "ذكاء", fan_experience: "تجربة", account: "الحساب", no_results: "لا نتائج — اسأل المساعد", open_map: "افتح الخريطة", start_route: "ابدأ المسار", kickoff: "ركلة البداية", section: "قسم", gate: "بوابة", weather: "الطقس" },
  hi: { search_placeholder: "गेट, सीट, भोजन खोजें…", live: "लाइव", ask_ai: "AI से पूछें", emergency_sos: "आपात SOS", home: "होम", live_stadium: "लाइव स्टेडियम", map: "मानचित्र", navigation: "नेविगेशन", ai_assistant: "AI सहायक", planner: "मैच प्लानर", crowd: "भीड़", multilingual: "बहुभाषी", transport: "परिवहन", food: "भोजन", accessibility: "पहुँच", sustainability: "स्थिरता", emergency: "आपातकाल", volunteers: "स्वयंसेवक", operations: "संचालन", notifications: "सूचनाएँ", profile: "प्रोफ़ाइल", settings: "सेटिंग्स", overview: "अवलोकन", intelligence: "बुद्धि", fan_experience: "अनुभव", account: "खाता", no_results: "कोई नतीजा नहीं — AI से पूछें", open_map: "मानचित्र खोलें", start_route: "मार्ग शुरू करें", kickoff: "किक-ऑफ़", section: "सेक्शन", gate: "गेट", weather: "मौसम" },
  ja: { search_placeholder: "ゲート、席、食べ物を検索…", live: "ライブ", ask_ai: "AIに聞く", emergency_sos: "緊急SOS", home: "ホーム", live_stadium: "ライブスタジアム", map: "マップ", navigation: "ナビ", ai_assistant: "AIアシスタント", planner: "試合プランナー", crowd: "混雑", multilingual: "多言語", transport: "交通", food: "飲食", accessibility: "アクセシビリティ", sustainability: "サステナビリティ", emergency: "緊急", volunteers: "ボランティア", operations: "運営", notifications: "通知", profile: "プロフィール", settings: "設定", overview: "概要", intelligence: "インテリジェンス", fan_experience: "体験", account: "アカウント", no_results: "結果なし — AIに聞いてください", open_map: "マップを開く", start_route: "ルート開始", kickoff: "キックオフ", section: "セクション", gate: "ゲート", weather: "天気" },
  ko: { search_placeholder: "게이트, 좌석, 음식 검색…", live: "라이브", ask_ai: "AI에게 묻기", emergency_sos: "긴급 SOS", home: "홈", live_stadium: "라이브 경기장", map: "지도", navigation: "내비게이션", ai_assistant: "AI 어시스턴트", planner: "경기 플래너", crowd: "관중", multilingual: "다국어", transport: "교통", food: "음식", accessibility: "접근성", sustainability: "지속가능성", emergency: "긴급", volunteers: "자원봉사", operations: "운영", notifications: "알림", profile: "프로필", settings: "설정", overview: "개요", intelligence: "인텔리전스", fan_experience: "경험", account: "계정", no_results: "결과 없음 — AI에게 물어보세요", open_map: "지도 열기", start_route: "경로 시작", kickoff: "킥오프", section: "섹션", gate: "게이트", weather: "날씨" },
};

type Ctx = { lang: LangCode; setLang: (l: LangCode) => void; t: (k: string) => string };
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang") as LangCode | null;
      if (stored && LANGUAGES.some((l) => l.code === stored)) setLangState(stored);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: LangCode) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };
  const t = (k: string) => DICT[lang]?.[k] ?? DICT.en[k] ?? k;
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
