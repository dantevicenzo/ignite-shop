import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '36.875rem',
  margin: '0 auto',
  textAlign: 'center',

  a: {
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$greenPrimary',
    textDecoration: 'none',

    '&:hover': {
      color: '$greenLight',
    },
  },
})

export const ImageGroupContainer = styled('div', {
  position: 'relative',
  height: '8.75rem',
  marginTop: '6.5rem',
})

export const ImageContainer = styled('div', {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '8.75rem',
  height: '8.75rem',
  background: '$linearGradientGreenPurple',
  borderRadius: '50%',
  boxShadow: '0px 0px 60px #000000',
})

export const Title = styled('h1', {
  fontSize: '$xl',
  color: '$gray5',
  marginTop: '3rem',
})

export const Paragraph = styled('p', {
  fontSize: '$lg',
  color: '$gray4',
  marginTop: '1.5rem',
  marginBottom: '4rem',
})
