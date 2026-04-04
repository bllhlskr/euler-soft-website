export const defaultLocale = "en";

export const languages = {
    en: { name: "English", flag: "🇺🇸", dir: "ltr" },
    tr: { name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
    de: { name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
    fr: { name: "Français", flag: "🇫🇷", dir: "ltr" },
    es: { name: "Español", flag: "🇪🇸", dir: "ltr" },
    it: { name: "Italiano", flag: "🇮🇹", dir: "ltr" },
    pt: { name: "Português", flag: "🇧🇷", dir: "ltr" },
    ja: { name: "日本語", flag: "🇯🇵", dir: "ltr" },
    ko: { name: "한국어", flag: "🇰🇷", dir: "ltr" },
    zh: { name: "简体中文", flag: "🇨🇳", dir: "ltr" },
    ar: { name: "العربية", flag: "🇸🇦", dir: "rtl" },
    da: { name: "Dansk", flag: "🇩🇰", dir: "ltr" },
    fi: { name: "Suomi", flag: "🇫🇮", dir: "ltr" },
    he: { name: "עברית", flag: "🇮🇱", dir: "rtl" },
    id: { name: "Bahasa Indonesia", flag: "🇮🇩", dir: "ltr" },
    nl: { name: "Nederlands", flag: "🇳🇱", dir: "ltr" },
    nb: { name: "Norsk Bokmål", flag: "🇳🇴", dir: "ltr" },
    pl: { name: "Polski", flag: "🇵🇱", dir: "ltr" },
    ru: { name: "Русский", flag: "🇷🇺", dir: "ltr" },
    sv: { name: "Svenska", flag: "🇸🇪", dir: "ltr" },
    th: { name: "ไทย", flag: "🇹🇭", dir: "ltr" },
    uk: { name: "Українська", flag: "🇺🇦", dir: "ltr" },
    vi: { name: "Tiếng Việt", flag: "🇻🇳", dir: "ltr" },
} as const;

export type Locale = keyof typeof languages;
export const locales = Object.keys(languages) as Locale[];
export const nonDefaultLocales = locales.filter((l) => l !== defaultLocale);
