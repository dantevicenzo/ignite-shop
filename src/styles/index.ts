import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      greenPrimary: '#00875F',
      greenLight: '#00B37E',
      gray1: '#121214',
      gray2: '#202024',
      gray3: '#8D8D99',
      gray4: '#C4C4CC',
      gray5: '#E1E1E6',
      white: '#FFFFFF',
      linearGradientGreenPurple:
        'linear-gradient(180deg, rgba(30,164,131,1) 0%, rgba(116,101,212,1) 100%)',

      transparentGray2: 'rgb(32, 32, 36, 0.9)',
    },
    fontSizes: {
      sm: '1.125rem',
      md: '1.25rem',
      lg: '1.5rem',
      xl: '2rem',
    },
  },
})
