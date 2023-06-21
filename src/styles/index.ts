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
    },
  },
})
