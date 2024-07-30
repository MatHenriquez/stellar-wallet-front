import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-blue-50': 'var(--main-blue-50)',
        'main-blue-100': 'var(--main-blue-100)',
        'main-blue-200': 'var(--main-blue-200)',
        'main-blue-300': 'var(--main-blue-300)',
        'main-blue-400': 'var(--main-blue-400)',
        'main-blue-500': 'var(--main-blue-500)',
        'main-blue-600': 'var(--main-blue-600)',
        'main-blue-700': 'var(--main-blue-700)',
        'main-blue-800': 'var(--main-blue-800)',
        'main-blue-900': 'var(--main-blue-900)',
        'main-blue-950': 'var(--main-blue-950)',
        'blue-text': 'rgb(140, 219, 229)',
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
