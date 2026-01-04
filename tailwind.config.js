/** @type {import('tailwindcss').Config} */
/**
 * Tailwind CSS configuration with custom design system
 * Extends default colors with CSS custom properties for consistent theming
 * Uses alpha transparency support for flexible opacity control
 */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Custom color palette using CSS variables for runtime theme switching
            // Alpha-value placeholder enables opacity utilities like bg-primary/50
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
