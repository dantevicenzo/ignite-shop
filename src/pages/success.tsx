import {
  Container,
  ImageContainer,
  ImageGroupContainer,
  Paragraph,
  Title,
} from '@/styles/pages/success'
import Image from 'next/image'
import Link from 'next/link'

import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'
import { Header } from '@/components/Header'

interface ISuccessProps {
  customerName: string
  purchasedItems: {
    id: string
    description: string
    quantity: number
    imgUrl: string
  }[]
  totalPurchasedItemsQuantity: number
}

export default function Success({
  customerName,
  purchasedItems,
  totalPurchasedItemsQuantity,
}: ISuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Header cartButtonHidden />

      <Container>
        <ImageGroupContainer>
          {purchasedItems.map((item) => (
            <ImageContainer key={item.id}>
              <Image src={item.imgUrl} width={130} height={132} alt="" />
            </ImageContainer>
          ))}
        </ImageGroupContainer>
        <Title>Compra efetuada!</Title>
        <Paragraph>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          {totalPurchasedItemsQuantity}{' '}
          {totalPurchasedItemsQuantity > 1 ? 'camisetas' : 'camiseta'} já está a
          caminho da sua casa.
        </Paragraph>
        <Link href="/">Voltar ao catálogo</Link>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const purchasedItems = response.line_items?.data.map((item) => {
    const productDetails = item.price?.product as Stripe.Product

    return {
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      imgUrl: productDetails.images[0],
    }
  })

  const totalPurchasedItemsQuantity = purchasedItems?.reduce((acc, item) => {
    if (item.quantity) {
      acc += item.quantity
    }
    return acc
  }, 0)

  return {
    props: {
      customerName: response.customer_details?.name,
      purchasedItems,
      totalPurchasedItemsQuantity,
    },
  }
}
