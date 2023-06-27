import { CartOffCanvas } from '@/components/CartOffCanvas'
import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  const successUrl = `${process.env.NEXT_PUBLIC_NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_PUBLIC_NEXT_URL}/`

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripePublicKey}
      successUrl={successUrl}
      cancelUrl={cancelUrl}
      currency="BRL"
      allowedCountries={['US', 'GB', 'CA', 'BR']}
      billingAddressCollection={true}
      shouldPersist
    >
      <Container>
        <Component {...pageProps} />
        <CartOffCanvas />
      </Container>
    </CartProvider>
  )
}
