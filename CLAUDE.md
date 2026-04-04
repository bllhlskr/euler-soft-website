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

## Build & Deploy

```bash
npm run dev          # Local dev server
npm run build        # Production build
npm run preview      # Preview production build
```

Deploy: push to `main` branch triggers GitHub Actions workflow.

## Contact Form

Uses Formspree. To activate:
1. Create account at formspree.io
2. Create form, get form ID
3. Replace `xplaceholder` in contact.astro and [lang]/contact.astro

Fallback: if Formspree fails, redirects to mailto:eulersoft@outlook.com

## DNS (Cloudflare)

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | 185.199.108.153 | OFF |
| A | @ | 185.199.109.153 | OFF |
| A | @ | 185.199.110.153 | OFF |
| A | @ | 185.199.111.153 | OFF |
| CNAME | www | bllhlskr.github.io | OFF |

Cloudflare proxy MUST be OFF (DNS-only) for GitHub Pages SSL.
