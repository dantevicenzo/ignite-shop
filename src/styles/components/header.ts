import { styled } from '..'

export const StyledHeader = styled('header', {
  display: 'flex',
  variants: {
    justifyContent: {
      spaceBetween: { justifyContent: 'space-between' },
      center: { justifyContent: 'center' },
    },
  },

  paddingTop: '2.5rem',
  paddingBottom: '2rem',
  margin: '0 auto',
  minWidth: 1168,
})

export const CartButton = styled('button', {
  variants: {
    display: {
      flex: { display: 'flex' },
      none: { display: 'none' },
    },
  },
  alignItems: 'center',
  justifyContent: 'center',

  border: 'none',
  borderRadius: 6,
  width: '3rem',
  height: '3rem',
  backgroundColor: '$gray2',
  color: '$gray3',

  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
})
