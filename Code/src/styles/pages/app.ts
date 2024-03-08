import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const Logo = styled('div', {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
})

export const TitleLogo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  strong: {
    fontSize: '$sm',
  },
  span: {
    fontSize: '$xs',
  },
})
