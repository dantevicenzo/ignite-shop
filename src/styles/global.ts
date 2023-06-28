import { globalCss } from '.'

export const globalStyles = globalCss({
  // Reset css
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  // Resize root font-size based on window pixel ratio
  html: {
    fontSize: '$base',
  },

  '@mediumPixelRatio': {
    html: {
      fontSize: '$mediumPixelRatio',
    },
  },

  '@highPixelRatio': {
    html: {
      fontSize: '$highPixelRatio',
    },
  },

  '@extremelyHighPixelRatio': {
    html: {
      fontSize: '$extremelyHighPixelRatio',
    },
  },

  // Theme
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
