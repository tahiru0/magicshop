/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'magic-bg': 'var(--background)',
        'magic-text': 'var(--foreground)',
        'magic-primary': 'var(--magic-primary)',
        'magic-secondary': 'var(--magic-secondary)',
        'magic-accent': 'var(--magic-accent)',
        'magic-glow': 'var(--magic-glow)',
        'magic-dark': 'var(--magic-dark)',
        'magic-border': 'var(--magic-border)',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'pirata': ['"Pirata One"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s infinite alternate',
      },
    },
  },
  plugins: [],
};
