"""Cat-only authored offline route/data/localization fixtures; not a site build.

No HTTP, provider writes, dependency installation, deploy or legal certification.
"""
import hashlib
import json
import re
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('/Users/haliskara/Desktop/Projects/cat-atlas/docs/legal/cat-atlas-public-notice.json')
PRESERVED = {'src/pages/privacy-policy.astro': 'aac54a160ef684e3aab17e0c5b9d4bc72ccd45f0e6a361a3f2d0d91e9aabc41f', 'src/pages/terms-of-use.astro': 'f10d39a7fe0734869b1516a2312668297cfef4a2d80267d78363236798f5d53e', 'src/pages/[lang]/privacy-policy.astro': '302bcf19a7b1a55690ec6991a4ddbece3983eaf192ad1dab1b28569e0a969918', 'src/pages/[lang]/terms-of-use.astro': 'fd375c3c033bb86621da265c72c08a963e3fb58f23bd951523fd3a27a8ce20be', 'src/layouts/BaseLayout.astro': '1db76e44c5d0ef717843a484dac89fd04661bf6d982f264d4410d777906cf8df', 'src/components/LegalShell.astro': 'd81280776a488819baa8f621a6452d783a627a0467b0d22dd34cec91081ab307'}
LOCALES = {'en','tr','de','fr','es','it','pt','ja','ko','zh','ar','da','fi','he','id','nl','nb','pl','ru','sv','th','uk','vi'}
ROUTES = [ROOT/'src/pages'/prefix/'cat-atlas'/name for prefix in ('','[lang]')
          for name in ('privacy-policy.astro','terms-of-use.astro')]


class CatLegalPageFixtures(unittest.TestCase):
    def test_preexisting_sources_and_other_policy_bodies_unchanged(self):
        for name, expected in PRESERVED.items():
            if name == 'src/layouts/BaseLayout.astro': continue  # Approved path props + localization only.
            self.assertEqual(hashlib.sha256((ROOT/name).read_bytes()).hexdigest(), expected, name)

    def test_cat_public_data_matches_reviewed_source_without_internal_or_private_fields(self):
        source = json.loads(SOURCE.read_text())
        data = json.loads((ROOT/'src/data/cat-atlas-legal.json').read_text())
        self.assertEqual(set(data), {'schema_version','source_sha256','source_status','effective_date','controller','documents'})
        self.assertEqual(data['source_sha256'], hashlib.sha256(SOURCE.read_bytes()).hexdigest())
        self.assertEqual(data['source_status'], source['publication_status'])
        self.assertEqual(data['effective_date'], source['effective_date'])
        self.assertEqual(data['documents'], source['documents'])
        self.assertEqual(data['controller'], {k:source['controller'][k] for k in
            ('name','trading_name','support_email','public_postal_address','public_telephone')})
        self.assertEqual(data['controller']['support_email'], 'support@euler-soft.com')

    def test_four_scoped_routes_delegate_to_typed_cat_page(self):
        for route in ROUTES:
            text = route.read_text()
            self.assertIn('CatAtlasLegalPage', text)
            self.assertIn('documentType="privacy"' if route.name.startswith('privacy') else 'documentType="terms"', text)
            self.assertNotIn('set:html', text)
            if '[lang]' in route.parts:
                self.assertIn('getStaticPaths', text)
                self.assertIn('nonDefaultLocales.map', text)
                self.assertIn('locale={lang}', text)
            else:
                self.assertIn('locale="en"', text)

    def test_shared_page_uses_layout_shell_safe_rendering_and_english_direction(self):
        text = (ROOT/'src/components/CatAtlasLegalPage.astro').read_text()
        for token in ('interface Props','BaseLayout','LegalShell','loadTranslation','catLegalUI[locale]',
                      'localePath(locale','lang="en" dir="ltr"','legalTextParts','<h2','min-h-[44px]',
                      'support_email','public_postal_address','public_telephone'):
            self.assertIn(token, text)
        self.assertNotIn('set:html', text)
        self.assertNotIn('<h1', text)
        self.assertNotIn('client:', text)
        self.assertNotIn('<script', text)
        self.assertIn('/cat-atlas/privacy-policy/', text)
        self.assertIn('/cat-atlas/terms-of-use/', text)
        self.assertNotIn('April 4', text)

    def test_all_23_courtesy_notices_use_exactly_one_functional_english_link(self):
        path = ROOT/'src/i18n/cat-atlas-legal.ts'
        code = f"import {{ catLegalUI }} from {json.dumps(path.as_uri())};console.log(JSON.stringify(catLegalUI));"
        notices = json.loads(subprocess.check_output(['node','--input-type=module','-e',code], text=True))
        self.assertEqual(set(notices), LOCALES)
        for locale, row in notices.items():
            self.assertEqual(set(row), {'englishNotice','skipToMain','changeLanguage'})
            self.assertTrue(row['skipToMain'])
            self.assertTrue(row['changeLanguage'])
            self.assertEqual(row['englishNotice'].count('{link}'),1,locale)
            self.assertNotIn('<', row['englishNotice'])
            self.assertNotIn('13', row['englishNotice'])
        self.assertIn('Translator', path.read_text())

    def test_composed_notice_grammar_reuses_labels_without_duplicate_articles(self):
        path = ROOT/'src/i18n/cat-atlas-legal.ts'
        code = f"import {{ catLegalUI }} from {json.dumps(path.as_uri())}; let result={{}}; for (const locale of ['de','da','nb','sv']) {{ let strings=(await import({json.dumps((ROOT/'src/i18n/ui').as_uri())}+'/'+locale+'.ts')).default; result[locale]=catLegalUI[locale].englishNotice.replace('{{link}}',strings['legal.courtesy.link']); }} console.log(JSON.stringify(result));"
        result = json.loads(subprocess.check_output(['node','--input-type=module','-e',code], text=True))
        self.assertNotIn('die englische Original',result['de'])
        for locale in ('da','nb','sv'): self.assertNotIn('Den Den',result[locale])

    def test_all_new_body_links_have_wrapping_touch_and_focus_styles(self):
        text = (ROOT/'src/components/CatAtlasLegalPage.astro').read_text()
        self.assertIn('<a href={part.href} class={linkClass}>',text)
        self.assertIn('max-w-full',text)
        self.assertIn('break-all',text)
        self.assertIn('focus-visible:outline',text)

    def test_cat_owned_links_have_44px_width_even_for_short_courtesy_labels(self):
        text = (ROOT/'src/components/CatAtlasLegalPage.astro').read_text()
        self.assertIn('min-w-[44px]', text)
        cat_anchor_rule = re.search(r'\.cat-atlas-legal :global\(a\)\s*\{([^}]+)\}', text)
        self.assertIsNotNone(cat_anchor_rule)
        self.assertIn('min-width: 44px;', cat_anchor_rule.group(1))
        self.assertIn('min-height: 44px;', cat_anchor_rule.group(1))

    def test_astro_source_syntax_parses_without_site_build(self):
        files = [str(p) for p in ROUTES]+[str(ROOT/'src/components/CatAtlasLegalPage.astro'),str(ROOT/'src/layouts/BaseLayout.astro'),str(ROOT/'src/components/LanguageSwitcher.astro')]
        code = "import { parse } from '@astrojs/compiler'; import { readFileSync } from 'node:fs'; let errors=[]; for (const p of "+json.dumps(files)+") { const r=await parse(readFileSync(p,'utf8')); errors.push(...r.diagnostics.filter(d=>d.severity===1)); } console.log(JSON.stringify(errors));"
        errors = json.loads(subprocess.check_output(['node','--input-type=module','-e',code],cwd=ROOT,text=True))
        self.assertEqual(errors,[])

    def test_cat_global_legal_paths_override_all_header_and_footer_links(self):
        layout = (ROOT/'src/layouts/BaseLayout.astro').read_text()
        page = (ROOT/'src/components/CatAtlasLegalPage.astro').read_text()
        for token in ('privacyPath?: string','termsPath?: string','privacyPath = "/privacy-policy"','termsPath = "/terms-of-use"'):
            self.assertIn(token,layout)
        self.assertEqual(layout.count('localePath(locale, privacyPath)'),2)
        self.assertEqual(layout.count('localePath(locale, termsPath)'),2)
        self.assertIn('privacyPath="/cat-atlas/privacy-policy/"',page)
        self.assertIn('termsPath="/cat-atlas/terms-of-use/"',page)
        self.assertIn('catLegalUI[locale].skipToMain',layout)
        self.assertNotIn('Skip to main content',layout)
        self.assertIn('description ?? t(s, "site.description")',layout)
        self.assertIn('name: t(s, "site.title")',layout)

    def test_cat_mobile_header_can_wrap_without_changing_other_page_defaults(self):
        layout = (ROOT/'src/layouts/BaseLayout.astro').read_text()
        page = (ROOT/'src/components/CatAtlasLegalPage.astro').read_text()
        for token in ('catLegalNavigation?: boolean', 'catLegalNavigation = false',
                      'catLegalNavigation ? "min-w-0 flex-wrap"',
                      'catLegalNavigation ? "w-full min-w-0 max-w-full flex-wrap sm:w-auto"'):
            self.assertIn(token, layout)
        self.assertIn('catLegalNavigation={true}', page)

    def test_cat_long_headings_wrap_before_hidden_hero_clipping(self):
        # Scroll width alone cannot detect text clipped by LegalShell's hero.
        page = (ROOT/'src/components/CatAtlasLegalPage.astro').read_text()
        heading_rule = re.search(r'\.cat-atlas-legal :global\(h1\)\s*\{([^}]+)\}', page)
        self.assertIsNotNone(heading_rule)
        self.assertIn('overflow-wrap: anywhere;', heading_rule.group(1))
        self.assertIn('max-width: 100%;', heading_rule.group(1))
        self.assertIn('lang="en" dir="ltr"', page)

    def test_cat_mobile_heading_type_fit_preserves_tablet_desktop_and_wrapping(self):
        page = (ROOT/'src/components/CatAtlasLegalPage.astro').read_text()
        mobile_rule = re.search(r'@media\s*\(max-width:\s*639px\)\s*\{\s*'
                               r'\.cat-atlas-legal :global\(h1\)\s*\{([^}]+)\}', page)
        self.assertIsNotNone(mobile_rule)
        self.assertIn('font-size: clamp(1.5rem, 6.9vw, 2.25rem);', mobile_rule.group(1))
        self.assertEqual(page.count('font-size:'), 1)
        self.assertIn('overflow-wrap: anywhere;', page)
        self.assertIn('max-width: 100%;', page)

    def test_cat_language_accessible_label_and_support_metadata_are_scoped(self):
        switcher = (ROOT/'src/components/LanguageSwitcher.astro').read_text()
        layout = (ROOT/'src/layouts/BaseLayout.astro').read_text()
        self.assertIn('ariaLabel?: string', switcher)
        self.assertIn('ariaLabel = "Change language"', switcher)
        self.assertIn('aria-label={ariaLabel}', switcher)
        self.assertIn('ariaLabel={catLegalNavigation ? catLegalUI[locale].changeLanguage : undefined}', layout)
        self.assertIn('email: catLegalNavigation ? "support@euler-soft.com" : "eulersoft@outlook.com"', layout)

    def text_parts(self, text):
        path = ROOT/'src/lib/cat-atlas-legal.ts'
        code = f"import {{ legalTextParts }} from {json.dumps(path.as_uri())};console.log(JSON.stringify(legalTextParts({json.dumps(text)})));"
        return json.loads(subprocess.check_output(['node','--input-type=module','-e',code], text=True))

    def test_plain_text_roundtrips_without_html_execution(self):
        value = '<script>alert(1)</script> Child privacy is not purchase approval.'
        parts = self.text_parts(value)
        self.assertEqual(parts,[{'kind':'text','text':value}])

    def test_urls_and_support_email_are_links_not_literal_unusable_text(self):
        value = 'Read https://www.apple.com/legal/privacy/. Email support@euler-soft.com.'
        parts = self.text_parts(value)
        self.assertEqual(''.join(p['text'] for p in parts), value)
        links = [p for p in parts if p['kind']=='link']
        self.assertEqual([p['href'] for p in links],['https://www.apple.com/legal/privacy/','mailto:support@euler-soft.com'])

    def test_link_split_never_promotes_javascript_or_arbitrary_mail_addresses(self):
        value = 'javascript:alert(1) private@example.com https://support.apple.com/en-us/118428, then text'
        parts = self.text_parts(value)
        self.assertEqual(''.join(p['text'] for p in parts), value)
        self.assertEqual([p['href'] for p in parts if p['kind']=='link'],['https://support.apple.com/en-us/118428'])


if __name__ == '__main__': unittest.main()
