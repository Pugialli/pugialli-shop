import { createStitches } from '@stitches/react'

export const { styled, getCssText, globalCss } = createStitches({
  theme: {
    colors: {
      white: '#fff',
      gray900: '#121214',
      gray800: '#202024',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00b37e',

      'purple-gradient': 'linear-gradient(180deg, #ae65d6 0%, #480b6a 100%)',
      'rs-gradient': 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    },

    fontSizes: {
      xs: '0.75rem',
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
})
