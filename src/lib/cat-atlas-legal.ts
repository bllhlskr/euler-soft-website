export type LegalTextPart =
    | { kind: "text"; text: string }
    | { kind: "link"; text: string; href: string };

export function legalTextParts(text: string): LegalTextPart[] {
    const parts: LegalTextPart[] = [];
    const pattern = /https:\/\/[^\s<>]+|support@euler-soft\.com/g;
    let offset = 0;
    for (const match of text.matchAll(pattern)) {
        const start = match.index;
        if (start > offset) parts.push({ kind: "text", text: text.slice(offset, start) });
        const token = match[0].replace(/[.,;:)]+$/, "");
        parts.push({ kind: "link", text: token,
            href: token === "support@euler-soft.com" ? `mailto:${token}` : token });
        offset = start + token.length;
    }
    if (offset < text.length) parts.push({ kind: "text", text: text.slice(offset) });
    return parts;
}
