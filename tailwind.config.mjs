/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                ink: '#05070b',
                mist: '#f5f7fb',
                line: '#1a2030',
                panel: '#0d1119',
                shell: '#131927',
                veil: '#f3f5f8',
                sky: '#59d0ff',
                violet: '#7879ff',
                mint: '#4be0b5',
                amber: '#ffb547',
                rose: '#ff7896',
                peach: '#ffb287',
            },
            fontFamily: {
                display: ['"SF Pro Display"', '"SF Pro Icons"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
                text: ['"SF Pro Text"', '"SF Pro Display"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
            },
            boxShadow: {
                card: '0 30px 80px rgba(5, 7, 11, 0.12)',
                glow: '0 30px 90px rgba(5, 7, 11, 0.34)',
            },
            maxWidth: {
                shell: '80rem',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
