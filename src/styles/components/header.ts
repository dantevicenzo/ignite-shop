import { styled } from '..'

export const StyledHeader = styled('header', {
  display: 'flex',
  variants: {
    justifyContent: {
      spaceBetween: {
        justifyContent: 'space-between',
        maxWidth: 'calc(73rem + 2rem)',
        width: '100%',
      },
      center: { justifyContent: 'center' },
    },
  },
  padding: '2.5rem 1rem 2rem',
  margin: '0 auto',
})

export const CartButton = styled('button', {
  variants: {
    display: {
      flex: { display: 'flex' },
      none: { display: 'none' },
    },
    cartState: {
      full: { color: '$gray4' },
      empty: { color: '$gray3' },
    },
  },
  alignItems: 'center',
  justifyContent: 'center',

  border: 'none',
  borderRadius: 6,
  width: '3rem',
  height: '3rem',
  backgroundColor: '$gray2',

  position: 'relative',

  '&:hover': {
    cursor: 'pointer',
    filter: 'brightness(1.15)',
  },
})

export const CartCount = styled('div', {
  variants: {
    cartState: {
      full: { display: 'flex' },
      empty: { display: 'none' },
    },
  },
  justifyContent: 'center',
  alignItems: 'center',

  width: '1.5rem',
  height: '1.5rem',
  backgroundColor: '$greenPrimary',
  borderRadius: '50%',

  fontSize: '$xsm',
  fontWeight: 'bold',
  color: '$white',

  outline: '3px solid $gray1',

  position: 'absolute',

  top: 0,
  right: 0,

  transform: 'translate(30%, -30%)',
})
