# Euler Soft Website

Portfolio site for Euler Soft iOS apps. Built with Astro + Tailwind CSS, hosted on GitHub Pages.

## Tech Stack

- **Framework**: Astro (static site generator)
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Hosting**: GitHub Pages (via GitHub Actions)
- **Domain**: euler-soft.com (DNS: Cloudflare)
- **Contact Form**: Formspree (free tier)

## Project Structure

```
src/
├── i18n/
│   ├── languages.ts       # Language config (23 locales)
│   ├── utils.ts            # t() helper, localePath()
│   ├── ui/                 # UI string translations per language
│   │   ├── en.ts (source of truth)
│   │   ├── tr.ts, de.ts, fr.ts, ...
│   └── legal/              # Legal page translations (HTML)
│       ├── privacy/{lang}.ts
│       └── terms/{lang}.ts
├── pages/
│   ├── index.astro         # English home (default locale)
│   ├── support.astro       # English support/FAQ
│   ├── contact.astro       # English contact
│   ├── privacy-policy.astro # English privacy (canonical)
│   ├── terms-of-use.astro  # English terms (canonical)
│   └── [lang]/             # Dynamic routes for all other locales
├── components/
│   ├── AppCard.astro
│   └── LanguageSwitcher.astro
├── layouts/
│   └── BaseLayout.astro
└── data/
    └── apps.ts             # App metadata
```

## Localization Rules (ZORUNLU)

### Supported Languages (23)
en, tr, de, fr, es, it, pt, ja, ko, zh, ar, da, fi, he, id, nl, nb, pl, ru, sv, th, uk, vi

### Adding a New Translation
1. Copy `src/i18n/ui/en.ts` to `src/i18n/ui/{lang}.ts`
2. Translate ALL values (keys stay the same)
3. Keep "Euler Soft" as brand name in all languages
4. Keep `{year}` and `{link}` template variables as-is
5. Build and test: `npx astro build`

### Translation Quality Rules
- Formal/polite register for legal and support content
- Culturally appropriate, not word-for-word
- Medical/health terms must be accurate
- RTL languages (ar, he): `dir` attribute set in languages.ts
- App names should be translated naturally (not kept in English)
- FAQ answers must be technically accurate after translation

### Legal Page Translations
- English is the legally binding version
- Non-English legal pages show courtesy translation notice
- Legal translations stored in `src/i18n/legal/{type}/{lang}.ts`
- Format: `export default \`<h1>...</h1>...\`;`

### Adding a New Language
1. Add to `languages` object in `src/i18n/languages.ts`
2. Create UI translation file in `src/i18n/ui/{lang}.ts`
3. (Optional) Create legal translations in `src/i18n/legal/`
4. Routes auto-generated via `[lang]` dynamic routing

### Sync Rule
When English source (en.ts) changes, ALL translation files must be updated. Missing keys fall back to English automatically.

## Pages

| Path | Description |
|------|-------------|
| `/` | Home - app showcase grid |
| `/support` | FAQ per app + general questions |
| `/contact` | Contact form + email info |
| `/privacy-policy` | Privacy Policy (legally binding) |
| `/terms-of-use` | Terms of Use (legally binding) |
| `/{lang}/` | Localized versions of all pages |
| `/admin` | Owner-only admin shell (English-only, noindex, NOT localized) |

## Owner Admin Shell (`/admin`)

- `src/pages/admin.astro` standalone bir sayfadır — BaseLayout, i18n, hreflang, OG kullanmaz; `noindex, nofollow` + `robots.txt` `Disallow: /admin` ile arama dışıdır. New Page Checklist'in 23-locale ve nav kuralları bu sayfaya BİLEREK uygulanmaz.
- Login: `card-value-scanner-identification` worker'ının `CATALOG_ADMIN_TOKEN`'ı `GET {worker}/v1/admin/ping` ile doğrulanır; başarılıysa `localStorage.eulerOwnerToken`'a yazılır (kalıcı owner tanıma).
- Sol menü üç worker dashboard'unu iframe ile site içinde açar: `/admin/cards`, `/admin/notifications`, `/admin/revenuecat`. Token, iframe `load` olayında `postMessage({type:'cvs-admin-token'})` ile dashboard'a aktarılır (worker tarafı origin kontrolü yapar).
- Worker tarafı eşleri (worker repo: `card-value-scanner-identification-worker`): `ADMIN_DASHBOARD_PARENT_ORIGINS` (CSP `frame-ancestors` + CORS) yalnızca `https://euler-soft.com`, `https://www.euler-soft.com` ve `http://localhost:4321` içerir. Astro dev server bu yüzden 4321 portunda çalıştırılmalıdır.
- `BaseLayout` nav'ındaki `#owner-admin-link` yalnızca `localStorage.eulerOwnerToken` varsa script ile görünür yapılır — public HTML'de davranış değişikliği yoktur.

## Build & Deploy

```bash
npm run dev          # Local dev server
npm run build        # Production build
npm run preview      # Preview production build
```

### Canlı Deploy (DİKKAT — 2026-06-13 itibarıyla)

- Canlı site **Cloudflare Pages**'ten servis edilir: proje `euler-soft-website` (custom domain: `euler-soft.com` + `www`), **Git bağlantısı YOK** — direct upload.
- `main`'e push GitHub Actions ile yalnızca GitHub Pages'e (bllhlskr.github.io) deploy eder; DNS artık oraya bakmadığı için **push canlı siteyi GÜNCELLEMEZ**.
- Canlıya almak için build sonrası:
  ```bash
  npx wrangler pages deploy dist --project-name=euler-soft-website
  ```
- Pages projesinde `404.html` olmadığı için bilinmeyen path'ler SPA fallback ile `index.html` döner (soft-404). `src/pages/404.astro` eklenirse bu davranış düzelir.

## Contact Form

Uses Formspree. To activate:
1. Create account at formspree.io
2. Create form, get form ID
3. Replace `xplaceholder` in contact.astro and [lang]/contact.astro

Fallback: if Formspree fails, redirects to mailto:eulersoft@outlook.com

## Astro Component Rules (ZORUNLU)

- Pure Astro components only — React/Vue/Svelte/Solid entegrasyonu gerçek ihtiyaç olmadan eklenmez
- `client:*` directive YASAK — basit interactivity için vanilla `<script>` blok kullan
- Props her zaman `interface Props {}` ile type'lanır ve `Astro.props`'tan destructure edilir
- Scoped `<style>` > global CSS; global stil sadece theme-level ihtiyaçlar için
- Frontmatter (`---`) sadece import ve build-time logic içerir — heavy computation YASAK
- Tek sorumluluk prensibi: bir component bir iş yapar, slot'larla kompozisyon tercih edilir
- `<script>` blokları TypeScript olabilir ama `import` YASAK — inline çalışır, bundle split edilmez
- `tsconfig.json` strict mode extend ediyor: `any` YASAK, non-null assertion YASAK

## Image Handling Rules (ZORUNLU)

- Yerel asset'ler için `astro:assets`'tan `<Image />` tercih et — otomatik WebP/AVIF + width/height injection
- Raw `<img>` kullanılıyorsa `width` VE `height` attribute'u ZORUNLU (CLS koruması)
- Above-the-fold / LCP image: `loading="eager"` + `fetchpriority="high"`, `<link rel="preload">` ekle
- Below-the-fold image: `loading="lazy"`
- Decorative image: `alt=""` (boş alt); content image: açıklayıcı alt
- App Store badge dahil HER `<img>`'de `width`/`height` bulunur
- `public/images/` PNG'leri mümkünse WebP'ye convert edilir (daha küçük, daha hızlı LCP)

## SEO Rules (ZORUNLU)

- Her sayfanın `<title>` ve `<meta description>` değeri translation key'inden gelir — hardcode YASAK
- Canonical `<link rel="canonical">` self-referencing olmalı — her sayfa kendi mutlak URL'ini gösterir
- Canonical ASLA diller arası cross-reference yapmaz — hreflang'i bozar (Google John Mueller kuralı)
- Open Graph tags ZORUNLU: `og:title`, `og:description`, `og:image` (absolute URL), `og:url`, `og:type`, `og:locale`
- Twitter Card: `twitter:card="summary_large_image"` + title/description/image
- OG tags build-time HTML'de bulunmalı — JS ile inject YASAK
- hreflang set'i self-referencing (mevcut `BaseLayout` zaten ekliyor, bozma)
- `<html lang={locale}>` ve `dir` attribute ZORUNLU (mevcut, koru)
- Organization/software için JSON-LD structured data `BaseLayout`'a eklenir
- Her canonical URL kendi locale'ine ait sayfayı gösterir (örn: `/tr/support` canonical `https://euler-soft.com/tr/support`)

## Accessibility Rules (WCAG 2.2 AA — ZORUNLU)

- "Skip to main content" linki `<body>`'nin ilk focusable element'i olmalı (sr-only + `focus:not-sr-only`)
- `:focus-visible` style'ı TÜM interactive element'lerde bulunur; `outline: none` replacement yoksa YASAK
- Minimum touch target: 44x44 px — nav link'leri dahil
- Disclosure button'larda `aria-expanded` state tutulur (`LanguageSwitcher` şu an eksik — düzelt)
- `aria-controls` button'u hedef element'e bağlar
- Dropdown klavye ile operable: `Escape` kapat, `ArrowUp`/`ArrowDown` item arası, `Enter` seç
- Logical tab order — `tabindex > 0` YASAK
- Form input'ları `<label for="...">`'a bağlıdır (mevcut, koru)
- Decorative `<img>`'de `alt=""`; content `<img>`'de açıklayıcı alt
- Color bilgi taşıyan TEK sinyal olamaz — ikon/text ile desteklenir
- Heading hiyerarşisi sıralı: `h1` → `h2` → `h3` (atlama YASAK, her sayfada tek `h1`)
- RTL dilleri (`ar`, `he`) için layout test edilir — `flex-row-reverse` / logical properties tercih edilir

## Performance / Core Web Vitals (HEDEF)

- LCP < 2.5s, CLS < 0.1, INP < 200ms (Google 2026 "Good" eşiği)
- LCP image: `fetchpriority="high"` + `loading="eager"` + `<link rel="preload">`
- TÜM `<img>`, `<iframe>`, embed'de `width` + `height` ZORUNLU (CLS engelleme)
- Cookie banner/modal DOM'a insert edilip push yapamaz — overlay (fixed/absolute) kullan
- Custom font: `font-display: swap` + `<link rel="preload">` + self-host (Astro 6 Fonts API)
- Inline `<script>` mümkün olduğunca kısa — ağır JS INP'yi öldürür
- Tailwind JIT purge production build'de aktif (bozma)
- 3rd-party script (analytics dahil) eklerken `defer` veya `async` ZORUNLU

## Tailwind Rules

- Tailwind v3 kullanımda — v4 migration yapılmadan `@theme` directive YASAK
- Design token'lar (brand color, spacing) `tailwind.config.mjs` `theme.extend`'e eklenir — hardcode hex YASAK
- Aynı class string 3+ yerde tekrarlanıyorsa component'e çıkar (örn: `btn-primary` → `Button.astro`)
- `@apply` kullanımı minimal — explicit CSS veya component extraction tercih edilir
- Legal/prose içerik için `@tailwindcss/typography`'nin `prose` class'ı kullanılır
- Class string 8+ utility olursa component'e çıkarmayı değerlendir
- Dark mode henüz yok — eklenirse semantic color naming (`bg-surface`, `text-foreground`) + `theme.extend` zorunlu

## i18n — Best Practice Ek Kuralları

- Her sayfanın `<title>` ve `<meta description>` translation key'inden gelir (şu an hardcode — refactor fırsatı)
- `<script>` içinde translation kullanılıyorsa `JSON.stringify` ile inject et (XSS koruması)
- `BaseLayout` self-referencing canonical ekler, `Astro.url.pathname` + site'den derive edilir
- Yeni translation key eklenirken: `en.ts` güncelle → 22 dil dosyasına copy → `npx astro build` test
- `{link}`, `{year}` dışında yeni template var eklerken `src/i18n/utils.ts`'teki `t()` güncellenir
- RTL locale'de component layout'u mirror'lanır — `ml-*`/`mr-*` yerine `ms-*`/`me-*` logical utility tercih et

## New App Checklist (ZORUNLU)

1. `src/data/apps.ts`'e typed entry ekle
2. `public/images/{app-slug}.png` asset (1024x1024'ten küçültülmüş, WebP tercih)
3. `src/i18n/ui/en.ts`'e `apps.{slug}.name` + `apps.{slug}.description` key'leri ekle
4. 22 non-English locale'e aynı key'leri translate et
5. FAQ varsa `faq.{slug}.qN`/`faq.{slug}.aN` key'leri + `support.astro` `appKeys` array'ine slug ekle
6. `npx astro build` — tüm 23 locale başarıyla build etmeli
7. En az 3 viewport'ta visual kontrol (375px, 768px, 1440px)

## New Page Checklist (ZORUNLU)

1. `src/pages/{page}.astro` (English canonical) + `src/pages/[lang]/{page}.astro` (dynamic locale)
2. `BaseLayout`'a translation key'den türetilmiş `title` + `description` prop geç
3. `BaseLayout` nav + footer'a link ekle (desktop + mobile visibility kontrol)
4. 23 locale için translation key'leri ekle
5. Canonical + OG tags `BaseLayout`'tan otomatik gelir — manuel eklemen YASAK
6. `npx astro build` + hreflang set'inde yeni path'in görünüp görünmediğini doğrula

## UI/UX — Marketing Site Prensipleri

- Hero fold: brand name + value prop + primary CTA — ilk saniyede anlaşılır olmalı
- Trust signals görünür: app sayısı, App Store badge'leri, kategori çeşitliliği
- Mobile-first: ziyaretlerin çoğu telefon — 375px'ta test ZORUNLU
- Consistent rhythm: `max-w-5xl` container, `px-6` padding, `py-{8,12,16,24}` spacing scale
- Typography: minimum 16px body, line-height ≥ 1.5
- Interactive element'lerde hover + focus state ZORUNLU
- Primary CTA tüm sayfalarda tutarlı style — henüz `Button.astro` yok, 3+ kullanım olunca extract et
- Boş state'lerde placeholder ilgi çekici + actionable olmalı
- Form validation inline ve açıklayıcı (mevcut contact form düzgün — referans al)

## Pre-Commit Verification (ZORUNLU)

- `npx astro build` başarılı çalışmalı — TypeScript strict mode hatası commit YASAK
- Build output'unda broken link / 404 kontrol edilir
- Değişen sayfa keyboard-only navigable (Tab → Enter → Escape ile full flow)
- Lighthouse Performance + Accessibility skorları ≥ 90 (local preview)
- `dist/` altında 23 locale klasörünün varlığı doğrulanır
- `console.log`, unused import, yoruma alınmış kod kalmaz

## DNS (Cloudflare)

GÜNCEL DURUM (2026-06-13 doğrulandı): `euler-soft.com` ve `www.euler-soft.com` Cloudflare Pages projesi `euler-soft-website`'in custom domain'leridir (`www` CNAME → `euler-soft-website.pages.dev`, apex Cloudflare IP'lerine çözülür). Aşağıdaki eski GitHub Pages DNS tablosu artık geçerli DEĞİL:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | 185.199.108.153 | OFF |
| A | @ | 185.199.109.153 | OFF |
| A | @ | 185.199.110.153 | OFF |
| A | @ | 185.199.111.153 | OFF |
| CNAME | www | bllhlskr.github.io | OFF |

## Claude Sync Rules (ZORUNLU)

- `AGENTS.md` ile `CLAUDE.md` aynı repo içinde birlikte evrilir; birine kural eklenirse diğeri de aynı turda güncellenir
- Task Claude skill'lerinden biriyle net eşleşiyorsa ilgili skill tercih edilir; birden fazla eşleşmede en dar kapsamlı skill seçilir
- Riskli veya yıkıcı işlemlerde kullanıcı approval gate korunur
- `git reset --hard`, `git clean -fd`, `git push --force`, geniş kapsamlı `rm -rf`, `mkfs`, `dd if=` gibi destructive komutlar açık talep olmadan kullanılmaz
- Büyük fix batch'lerinde önce problem ve etki alanı netleştirilir, sonra yüksek etkili değişiklik yapılır
- Feature işlerinde mümkün olduğunda `RED -> GREEN -> REFACTOR` akışı tercih edilir
- Bug/crash işlerinde önce tarama yapılır, bulgular severity'e göre sıralanır, sonra küçük ve hedefli fix batch'leri uygulanır
- Geniş rewrite yerine minimal ve hedefli değişiklik tercih edilir
- Mevcut template, script, rule ve skill çıktıları yeniden yazılmadan önce yeniden kullanılır
- Build/test log'ları ham ve uzun şekilde paylaşılmaz; filtrelenmiş ve sinyal taşıyan çıktı tercih edilir
- Açıklamalar doğrudan, kısa ve implementasyon odaklı tutulur

## Project Analysis (2026-04-18)

### Current Snapshot

- Site Astro 6 + Tailwind 3 ile kurulmuş statik bir marketing/portfolio sitesi; script seti sadece `dev`, `build`, `preview`
- Sayfa yapısı küçük ve net: 5 İngilizce canonical sayfa + `src/pages/[lang]/` altında 5 localized route
- `src/i18n/ui/` altında 23 locale mevcut; `loadTranslation()` İngilizceyi source-of-truth alıp locale bazlı merge/fallback yapıyor
- App kataloğu `src/data/apps.ts` içinde merkezileştirilmiş; görseller `public/images/` altında PNG olarak tutuluyor
- `dist/` altında 23 locale çıktısı mevcut, yani proje daha önce build edilmiş

### Strengths

- Repo kapsamı küçük, dosya sınırları net ve onboarding maliyeti düşük
- Translation fallback mantığı basit ve sürdürülebilir; eksik key durumunda İngilizceye düşmesi güvenli
- English ve localized route ayrımı anlaşılır; static deployment için GitHub Pages uyumu yüksek
- App listesi tek dosyada toplandığı için yeni app ekleme akışı pratik

### Current Gaps And Risks

- `src/layouts/BaseLayout.astro` içinde self-referencing canonical, Open Graph, Twitter card ve JSON-LD yok; AGENTS kural seti ile mevcut implementasyon uyumsuz
- `hreflang` üretimi yanlış scope'ta: tüm alternate link'ler mevcut path yerine locale root'una gidiyor; örneğin support sayfası farklı dillerde home page'e referans veriyor
- İngilizce sayfalarda `title` ve `description` değerleri hâlâ hardcode; bu, "translation key source of truth" kuralıyla çelişiyor
- `src/pages/contact.astro` ve `src/pages/support.astro` içinde çeviriye taşınmamış İngilizce UI metinleri var; English ile non-English sayfalar feature parity açısından da ayrışmış
- Contact form dokümantasyonda Formspree olarak tarif edilmiş, fakat mevcut implementasyon `formsubmit.co` kullanıyor; dokümantasyon ve kod senkron değil
- `src/components/LanguageSwitcher.astro` erişilebilirlik gereksinimlerini karşılamıyor: `aria-expanded`, `aria-controls`, `Escape`, `ArrowUp`, `ArrowDown`, focus yönetimi ve klavye navigasyonu eksik
- Global seviyede skip link ve belirgin `:focus-visible` stratejisi yok; accessibility kuralları dokümanda güçlü ama layout implementasyonu geride
- `src/components/AppCard.astro` içindeki App Store badge raw `<img>` ile geliyor ve `width` / `height` taşımıyor; image handling kurallarıyla uyumsuz
- Renk ve yüzey kararları çok sayıda dosyada `gray-*`, `blue-*`, `amber-*` utility'leriyle hardcode edilmiş; `tailwind.config.mjs` içinde henüz token katmanı yok
- `src/i18n/legal/` altında gerçek legal translation dosyaları görünmüyor; localized legal route'lar fallback notice ile çalışıyor
- Localized legal sayfalardaki courtesy notice linki string replace ile üretiliyor; bu yaklaşım HTML'i escaped text olarak render etme riski taşıyor ve link davranışı kırılabilir
- English home page app name/description değerlerini `src/data/apps.ts` içinden alıyor; localized home page ise i18n key'lerini kullanıyor. Aynı veri iki farklı source-of-truth'a bölünmüş durumda

### Hotspots

- `src/layouts/BaseLayout.astro`: SEO, metadata, canonical, hreflang, skip link ve global accessibility için ana müdahale noktası
- `src/components/LanguageSwitcher.astro`: keyboard accessibility, ARIA state ve RTL uyumu için kritik
- `src/pages/contact.astro` ve `src/pages/[lang]/contact.astro`: form provider parity, translated microcopy ve shared behavior için en riskli duplication alanı
- `src/pages/support.astro` ve `src/pages/[lang]/support.astro`: untranslated copy ve component extraction fırsatları burada yoğun
- `src/i18n/ui/en.ts`: title/description/meta/contact-state key'leri burada netleştirilmeden i18n refactor temiz ilerlemez
- `src/data/apps.ts`: app metadata ile i18n source-of-truth ilişkisi burada normalize edilmeli

### Recommended Work Order

1. Önce local toolchain'i ayağa kaldır: `npm install` olmadan `npm run build` çalışmıyor, bu yüzden güvenli refactor zemini eksik
2. `BaseLayout` içinde canonical, OG/Twitter, JSON-LD ve doğru path-aware hreflang üretimini düzelt
3. Page title/description ve remaining hardcoded UI copy'yi translation key'lerine taşı
4. `LanguageSwitcher` ve global focus/skip-link davranışını WCAG 2.2 AA seviyesine çek
5. Contact form provider kararını netleştirip English ve localized varyantları tek davranışta birleştir
6. Tailwind token'larını `theme.extend` içine taşı, tekrarlanan CTA/card pattern'lerini component seviyesinde konsolide et
7. PNG asset'leri ve external badge kullanımını image kurallarıyla hizala

### Verification Status

- `dist/` klasörü mevcut ve 23 locale çıktısı içeriyor
- `npm run build` bu çalışma ortamında doğrulanamadı çünkü `astro` binary bulunmuyor; dependency installation eksik görünüyor
