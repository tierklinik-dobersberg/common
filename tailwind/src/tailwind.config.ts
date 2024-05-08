import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss'
import { Breakpoints } from './breakpoints';

export default {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.{html,scss,ts}'],
  presets: [
    require('@spartan-ng/ui-core/hlm-tailwind-preset')
  ],
  theme: {
    extend: {
      screens: Breakpoints,
      width: {
        'fit': 'fit-content'
      },
      height: {
        'fit': 'fit-content'
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['active'],
      backgroundColor: ['active'],
      boxShadow: ['active'],
      borderRadius: ['hover'],
    }
  },
  plugins: [
    typography,
  ],
} satisfies Config;

