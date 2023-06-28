import { styled } from '..'

export const Container = styled('main', {
  display: 'flex',
  gap: '3rem',
  width: '100vw',
})

export const Card = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: '$linearGradientGreenPurple',
  width: '43.5rem',
  minWidth: '43.5rem',
  maxWidth: '43.5rem',
  height: '41rem',
  minHeight: '41rem',
  maxHeight: '41rem',
  borderRadius: 8,

  position: 'relative',

  overflow: 'hidden',
  cursor: 'pointer',

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const CardDetails = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  borderRadius: 6,
  padding: '1.25rem 2rem 1.25rem 1.25rem',

  position: 'absolute',
  bottom: '0.25rem',
  left: '0.25rem',
  right: '0.25rem',

  backgroundColor: '$transparentGray2',

  transform: 'translateY(110%)',
  opacity: 0,
  transition: 'transform, opacity, 0.2s ease-in-out',

  div: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export const CartTitle = styled('strong', {
  color: '$gray5',
  fontSize: '$md',
})
export const CartPrice = styled('strong', {
  color: '$greenLight',
  fontSize: '$lg',
  marginTop: '0.25rem',
})

export const AddToCartButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: 'none',
  borderRadius: 6,
  width: '3.5rem',
  height: '3.5rem',
  backgroundColor: '$greenPrimary',
  color: '$white',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$greenLight',
  },
})
