import { defaultLocale, type Locale } from "./languages";
import en from "./ui/en";

const translations: Record<string, Record<string, string>> = {};

export async function loadTranslation(locale: Locale): Promise<Record<string, string>> {
    if (locale === defaultLocale) return en;
    if (translations[locale]) return translations[locale];

    try {
        const mod = await import(`./ui/${locale}.ts`);
        translations[locale] = { ...en, ...mod.default };
        return translations[locale];
    } catch {
        return en;
    }
}

export function t(strings: Record<string, string>, key: string, vars?: Record<string, string>): string {
    let result = strings[key] ?? key;
    if (vars) {
        for (const [k, v] of Object.entries(vars)) {
            result = result.replace(`{${k}}`, v);
        }
    }
    return result;
}

export function localePath(locale: Locale, path: string = "/"): string {
    if (locale === defaultLocale) return path;
    return `/${locale}${path}`;
}
