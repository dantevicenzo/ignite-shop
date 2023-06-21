import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import { CartButton, Container, Header } from '@/styles/pages/app'

import { Handbag } from '@phosphor-icons/react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <CartButton type="button">
          <Handbag size={24} />
        </CartButton>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
