/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: 'rgb(var(--color-bg) / <alpha-value>)',
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
                text: 'rgb(var(--color-text) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                primary: {
                    50: 'rgb(var(--color-primary-50) / <alpha-value>)',
                    300: 'rgb(var(--color-primary-300) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
                    700: 'rgb(var(--color-primary-700) / <alpha-value>)',
                },
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                'neon-magenta': 'rgb(var(--color-neon-magenta) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                danger: 'rgb(var(--color-danger) / <alpha-value>)',
            },
        },
    },
    plugins: [],
} 
