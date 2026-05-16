import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4EF',
        parchment: '#EDE8DF',
        sand: '#D8CCBA',
        'warm-gray': '#9A9186',
        taupe: '#6B6057',
        charcoal: '#2C2825',
        'matte-black': '#1A1714',
        'gold-muted': '#C4A882',
        offwhite: '#FEFCF9',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3.5rem,8vw,7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'headline': ['clamp(2rem,4vw,3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'title': ['clamp(1.5rem,2.5vw,2.25rem)', { lineHeight: '1.2' }],
        'subtitle': ['1.125rem', { lineHeight: '1.6', fontWeight: '300' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '400' }],
      },
      spacing: {
        'section': '9rem',
        'section-sm': '5rem',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
export default config;