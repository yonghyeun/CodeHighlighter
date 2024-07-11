import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        md: { max: '1351px' },
      },
      transitionProperty: {
        transform: 'transform',
      },
      transformOrigin: {
        center: 'center',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(1)' },
          '100%': {
            transform: 'scale(1.2)',
          },
        },
      },
      animation: {
        grow: 'grow 0.3s ease-in-out',
      },
    },
  },
  variant: {
    extends: {
      transform: ['hover'],
      scale: ['hover'],
      animation: ['hover'],
    },
  },
  plugins: [],
};
export default config;
