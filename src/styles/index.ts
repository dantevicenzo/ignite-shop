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
      // theme
      xsm: '0.875rem',
      root: '1rem',
      sm: '1.125rem',
      md: '1.25rem',
      lg: '1.5rem',
      xl: '2rem',

      // root
      base: '16px',
      mediumPixelRatio: '12.8px',
      highPixelRatio: '9.6px',
      extremelyHighPixelRatio: '8.57px',
    },
  },

  media: {
    mediumPixelRatio: '(-webkit-device-pixel-ratio: 1.25)',
    highPixelRatio: '(-webkit-device-pixel-ratio: 1.5)',
    extremelyHighPixelRatio: '(-webkit-device-pixel-ratio: 1.75)',
  },
})
