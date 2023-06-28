import { styled } from '..'

export const ArrowContainer = styled('div', {
  position: 'absolute',
  height: '100%',
  width: '8.5rem',

  svg: {
    width: '30px',
    height: '30px',
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
          left: '5px',
        },
      },
      right: {
        background:
          'linear-gradient(90deg, rgba(18,18,20,0) 0%, rgba(18,18,20,0.75) 100%)',

        left: 'auto',
        right: '0px',

        svg: {
          left: 'auto',
          right: '5px',
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
