import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  gap: '4.5rem',

  width: 1168,
  margin: '0 auto',
})

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 576,
  height: 656,

  background: '$linearGradientGreenPurple',

  borderRadius: 8,
})

export const DetailsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const Title = styled('h1', {
  fontSize: '$xl',
  color: '$gray4',
})

export const Price = styled('span', {
  fontSize: '$xl',
  color: '$greenLight',
  marginTop: '1rem',
})

export const Description = styled('p', {
  fontSize: '$sm',
  color: '$gray4',
  marginTop: '2.5rem',
})

export const AddToBagButton = styled('button', {
  marginTop: 'auto',
  fontSize: '$sm',
  fontWeight: 'bold',
  color: '$white',
  backgroundColor: '$greenPrimary',
  border: 'none',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',

  '&:enabled:hover': {
    opacity: 0.8,
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
})
