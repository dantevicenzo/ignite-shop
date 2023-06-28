import { styled } from '..'

export const Container = styled('div', {
  variants: {
    shouldDisplayCart: {
      true: { visibility: 'visible', transform: 'translateX(0)' },
      false: { visibility: 'hidden', transform: 'translateX(100%)' },
    },
  },

  transition: '0.15s',

  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  right: 0,
  backgroundColor: '$gray2',
  height: '100%',
  width: '30rem',
  padding: '4.5rem 3rem 3rem',
})

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '$linearGradientGreenPurple',
  width: '6.375rem',
  height: '5.813rem',
  borderRadius: 8,
})

export const DetailsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  span: {
    fontSize: '$sm',
    color: '$gray4',

    span: {
      fontSize: '$xsm',
    },
  },

  strog: {
    fontSize: '$sm',
    color: '$gray5',
  },

  button: {
    fontSize: '$root',
    fontWeight: 'bold',
    color: '$greenPrimary',
    marginTop: '0.5rem',
    border: 'none',
    background: 'transparent',
    alignSelf: 'self-start',
    cursor: 'pointer',

    '&:hover': {
      color: '$greenLight',
    },
  },
})

export const CartItemList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '2rem',
  marginBottom: 'auto',
})

export const CartItem = styled('li', {
  listStyle: 'none',
  display: 'flex',
  gap: '1.25rem',
})

export const QuantityContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  'span:nth-child(1)': {
    fontSize: '$root',
  },

  'span:nth-child(2)': {
    fontSize: '$sm',
  },
})

export const TotalPriceContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  'strong:nth-child(1)': {
    fontSize: '$sm',
  },

  'strong:nth-child(2)': {
    fontSize: '$lg',
  },
})

export const CheckoutButton = styled('button', {
  marginTop: '3.5rem',
  padding: '1.25rem',
  border: 'none',
  borderRadius: 8,
  backgroundColor: '$greenPrimary',
  color: '$white',
  cursor: 'pointer',
  fontSize: '$sm',
  fontWeight: 'bold',

  '&:enabled:hover': {
    backgroundColor: '$greenLight',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
})

export const CloseButton = styled('button', {
  position: 'absolute',
  top: 24,
  right: 24,
  background: 'transparent',
  border: 'none',
  color: '$gray3',
  cursor: 'pointer',
})
