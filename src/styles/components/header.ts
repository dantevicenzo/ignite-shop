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

  position: 'relative',

  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8,
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
