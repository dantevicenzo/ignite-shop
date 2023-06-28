import { styled } from '..'

export const ArrowContainer = styled('div', {
  position: 'absolute',
  height: '100%',
  width: '8.5rem',

  svg: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    '-webkit-transform': 'translateY(-50%)',
    fill: '#fff',
    cursor: 'pointer',
  },

  variants: {
    position: {
      left: {
        background:
          'linear-gradient(270deg, rgba(18,18,20,0) 0%, rgba(18,18,20,0.75) 100%)',

        svg: {
          left: '1rem',
        },
      },
      right: {
        background:
          'linear-gradient(90deg, rgba(18,18,20,0) 0%, rgba(18,18,20,0.75) 100%)',

        left: 'auto',
        right: 0,

        svg: {
          left: 'auto',
          right: '1rem',
        },
      },
    },
    disabled: {
      true: {
        visibility: 'hidden',
      },
    },
  },
})
