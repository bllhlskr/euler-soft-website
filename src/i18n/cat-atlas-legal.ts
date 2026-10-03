import type { Locale } from "./languages";

// Translator context: Cat-only legal pages contain the authoritative English
// document, not a claimed full translation. Keep one {link} for the existing
// localized English-version link. Short, formal notice; no age or consent claim.
// skipToMain is the global keyboard navigation link, concise and action-oriented.
// changeLanguage is the Cat-page language button accessible name, a short action.
export const catLegalUI: Record<Locale, { englishNotice: string; skipToMain: string; changeLanguage: string }> = {
    en: { englishNotice: "Cat Atlas legal documents are provided in English. The {link} is the legally binding document.", skipToMain: "Skip to main content", changeLanguage: "Change language" },
    tr: { englishNotice: "Cat Atlas’ın hukuki belgeleri İngilizce olarak sunulur. Hukuken bağlayıcı metin {link} belgesidir.", skipToMain: "Ana içeriğe geç", changeLanguage: "Dili değiştir" },
    de: { englishNotice: "Die rechtlichen Dokumente zu Cat Atlas sind auf Englisch verfügbar. Rechtlich verbindlich ist das {link}.", skipToMain: "Zum Hauptinhalt springen", changeLanguage: "Sprache ändern" },
    fr: { englishNotice: "Les documents juridiques de Cat Atlas sont disponibles en anglais. La {link} fait foi.", skipToMain: "Aller au contenu principal", changeLanguage: "Changer de langue" },
    es: { englishNotice: "Los documentos legales de Cat Atlas están disponibles en inglés. La {link} es el documento legalmente vinculante.", skipToMain: "Saltar al contenido principal", changeLanguage: "Cambiar idioma" },
    it: { englishNotice: "I documenti legali di Cat Atlas sono disponibili in inglese. La {link} è il documento giuridicamente vincolante.", skipToMain: "Vai al contenuto principale", changeLanguage: "Cambia lingua" },
    pt: { englishNotice: "Os documentos legais do Cat Atlas estão disponíveis em inglês. A {link} é o documento com validade jurídica.", skipToMain: "Ir para o conteúdo principal", changeLanguage: "Alterar idioma" },
    ja: { englishNotice: "Cat Atlasの法的文書は英語で提供されています。法的に有効な文書は{link}です。", skipToMain: "メインコンテンツへ移動", changeLanguage: "言語を変更" },
    ko: { englishNotice: "Cat Atlas의 법적 문서는 영어로 제공됩니다. 법적 효력이 있는 문서는 {link}입니다.", skipToMain: "본문으로 이동", changeLanguage: "언어 변경" },
    zh: { englishNotice: "Cat Atlas的法律文件以英语提供。{link}是具有法律约束力的文件。", skipToMain: "跳转到主要内容", changeLanguage: "切换语言" },
    ar: { englishNotice: "وثائق Cat Atlas القانونية متاحة باللغة الإنجليزية. النسخة الملزمة قانونًا هي {link}.", skipToMain: "الانتقال إلى المحتوى الرئيسي", changeLanguage: "تغيير اللغة" },
    da: { englishNotice: "De juridiske dokumenter for Cat Atlas findes på engelsk. Juridisk bindende er {link}.", skipToMain: "Gå til hovedindhold", changeLanguage: "Skift sprog" },
    fi: { englishNotice: "Cat Atlasin oikeudelliset asiakirjat ovat saatavilla englanniksi. Oikeudellisesti sitova asiakirja on {link}.", skipToMain: "Siirry pääsisältöön", changeLanguage: "Vaihda kieltä" },
    he: { englishNotice: "המסמכים המשפטיים של Cat Atlas זמינים באנגלית. הנוסח המחייב משפטית הוא {link}.", skipToMain: "דילוג לתוכן הראשי", changeLanguage: "שינוי שפה" },
    id: { englishNotice: "Dokumen hukum Cat Atlas tersedia dalam bahasa Inggris. Dokumen yang mengikat secara hukum adalah {link}.", skipToMain: "Langsung ke konten utama", changeLanguage: "Ubah bahasa" },
    nl: { englishNotice: "De juridische documenten van Cat Atlas zijn beschikbaar in het Engels. De {link} is het juridisch bindende document.", skipToMain: "Naar de hoofdinhoud", changeLanguage: "Taal wijzigen" },
    nb: { englishNotice: "De juridiske dokumentene for Cat Atlas er tilgjengelige på engelsk. Det juridisk bindende dokumentet er {link}.", skipToMain: "Gå til hovedinnhold", changeLanguage: "Bytt språk" },
    pl: { englishNotice: "Dokumenty prawne Cat Atlas są dostępne po angielsku. Dokumentem prawnie wiążącym jest {link}.", skipToMain: "Przejdź do treści głównej", changeLanguage: "Zmień język" },
    ru: { englishNotice: "Правовые документы Cat Atlas доступны на английском языке. Юридическую силу имеет {link}.", skipToMain: "Перейти к основному содержимому", changeLanguage: "Изменить язык" },
    sv: { englishNotice: "De juridiska dokumenten för Cat Atlas finns på engelska. Det juridiskt bindande dokumentet är {link}.", skipToMain: "Hoppa till huvudinnehållet", changeLanguage: "Byt språk" },
    th: { englishNotice: "เอกสารทางกฎหมายของ Cat Atlas จัดทำเป็นภาษาอังกฤษ โดย {link} เป็นฉบับที่มีผลผูกพันทางกฎหมาย", skipToMain: "ข้ามไปยังเนื้อหาหลัก", changeLanguage: "เปลี่ยนภาษา" },
    uk: { englishNotice: "Правові документи Cat Atlas доступні англійською мовою. Юридичну силу має {link}.", skipToMain: "Перейти до основного вмісту", changeLanguage: "Змінити мову" },
    vi: { englishNotice: "Các tài liệu pháp lý của Cat Atlas được cung cấp bằng tiếng Anh. {link} là văn bản có giá trị ràng buộc pháp lý.", skipToMain: "Chuyển đến nội dung chính", changeLanguage: "Đổi ngôn ngữ" },
};
