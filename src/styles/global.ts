import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray1',
    color: '$gray4',
  },

  'body, input, textarea, button': {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    lineHeight: '1.6',
    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
})
