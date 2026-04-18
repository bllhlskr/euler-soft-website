import type { AppTheme } from "./apps";

interface AppThemeClasses {
    aura: string;
    chip: string;
    chipSoft: string;
    iconGlow: string;
    accentText: string;
    divider: string;
}

const themeClasses: Record<AppTheme, AppThemeClasses> = {
    sky: {
        aura: "from-sky/[0.35] via-sky/[0.15] to-transparent",
        chip: "border-sky/[0.3] bg-sky/[0.12] text-sky",
        chipSoft: "border-sky/20 bg-sky/10 text-sky",
        iconGlow: "from-sky/[0.45] via-sky/20 to-transparent",
        accentText: "group-hover:text-sky",
        divider: "border-sky/20",
    },
    mint: {
        aura: "from-mint/[0.35] via-mint/[0.15] to-transparent",
        chip: "border-mint/[0.3] bg-mint/[0.12] text-mint",
        chipSoft: "border-mint/20 bg-mint/10 text-mint",
        iconGlow: "from-mint/[0.45] via-mint/20 to-transparent",
        accentText: "group-hover:text-mint",
        divider: "border-mint/20",
    },
    violet: {
        aura: "from-violet/[0.35] via-violet/[0.15] to-transparent",
        chip: "border-violet/[0.3] bg-violet/[0.12] text-violet",
        chipSoft: "border-violet/20 bg-violet/10 text-violet",
        iconGlow: "from-violet/[0.45] via-violet/20 to-transparent",
        accentText: "group-hover:text-violet",
        divider: "border-violet/20",
    },
    amber: {
        aura: "from-amber/[0.35] via-amber/[0.15] to-transparent",
        chip: "border-amber/[0.3] bg-amber/[0.12] text-amber",
        chipSoft: "border-amber/20 bg-amber/10 text-amber",
        iconGlow: "from-amber/[0.45] via-amber/20 to-transparent",
        accentText: "group-hover:text-amber",
        divider: "border-amber/20",
    },
    rose: {
        aura: "from-rose/[0.35] via-rose/[0.15] to-transparent",
        chip: "border-rose/[0.3] bg-rose/[0.12] text-rose",
        chipSoft: "border-rose/20 bg-rose/10 text-rose",
        iconGlow: "from-rose/[0.45] via-rose/20 to-transparent",
        accentText: "group-hover:text-rose",
        divider: "border-rose/20",
    },
    peach: {
        aura: "from-peach/[0.35] via-peach/[0.15] to-transparent",
        chip: "border-peach/[0.3] bg-peach/[0.12] text-peach",
        chipSoft: "border-peach/20 bg-peach/10 text-peach",
        iconGlow: "from-peach/[0.45] via-peach/20 to-transparent",
        accentText: "group-hover:text-peach",
        divider: "border-peach/20",
    },
};

export function getAppThemeClasses(theme: AppTheme): AppThemeClasses {
    return themeClasses[theme];
}
