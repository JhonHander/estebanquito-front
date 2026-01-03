Palette & Usage — Project guide

This file documents the color system used by the project and how to customize it.

Where the palette lives
- src/styles/colors.css — a single source of truth (CSS variables, stored as RGB triplets).
- tailwind.config.js — maps Tailwind semantic tokens (e.g., `bg-accent`, `text-text`, `bg-bg`) to those CSS variables.

How to change colors
1. Edit the RGB triplet in `src/styles/colors.css` (e.g., `--color-accent: 0 245 255;`).
2. Tailwind classes automatically pick the new colors (you can use alpha: `bg-accent/80`, `text-primary/80`).
3. Save and the dev server will live-reload the styles.

Guidelines
- 60-30-10 rule: 60% background/surface, 30% secondary elements, 10% accent (neon).
- Use neon accents sparingly — CTAs, badges, focus states.
- Always verify WCAG contrast for text on backgrounds and for primary call-to-action colors.

Helpful class examples
- Primary background: `bg-bg`
- Panel/card: `bg-surface`
- Primary text: `text-text`
- Secondary/muted text: `text-muted`
- Accent/CTA: `bg-accent text-black` (use `hover:bg-accent/90` for hover state)
- Success: `text-success` / `bg-success`
- Danger: `text-danger` / `bg-danger`

Accessibility & tools
- Use contrast checkers (e.g., WebAIM, front-end tools) to verify readability.
- If you need more granular shades, add new CSS variables (e.g., `--color-primary-200`) and wire them into `tailwind.config.js`.

Notes
- Because variables are RGB triplets, Tailwind can apply alpha via `bg-accent/80` and similar utilities.
- Keep design consistent by editing only `src/styles/colors.css` for brand-level color changes.
