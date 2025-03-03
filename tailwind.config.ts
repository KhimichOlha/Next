import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
            extend: {
                colors: {
                    primary: '#4F46E5',
                    secondary: '#EF4444',
            },
            screens: {
                '3xl': '1920px',
            },
        },
    },
    plugins: [],
} satisfies Config;