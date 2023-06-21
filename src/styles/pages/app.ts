import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  paddingTop: '2.5rem',
  paddingBottom: '2rem',
  margin: '0 auto',
  minWidth: 1168,
})

export const CartButton = styled('button', {
  display: 'flex',
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
