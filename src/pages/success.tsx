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
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

interface IPurchasedItems {
  id: string
  description: string
  quantity: number
  imgUrl: string
}
interface ISuccessProps {
  customerName: string
  purchasedItems: IPurchasedItems[]
  totalPurchasedItemsQuantity: number
}

export default function Success({
  customerName,
  purchasedItems,
  totalPurchasedItemsQuantity,
}: ISuccessProps) {
  const { isFallback } = useRouter()
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isFallback) {
    return <p>Carregando...</p>
  }

  const expandedPurchasedItems = purchasedItems.reduce(
    (expandedItems, item) => {
      for (let i = 0; i < item.quantity; i++) {
        expandedItems.push({ ...item })
      }
      return expandedItems
    },
    [] as IPurchasedItems[],
  )

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Header cartButtonHidden />

      <Container>
        <ImageGroupContainer
          css={{
            width: `${
              (140 + (expandedPurchasedItems.length - 1) * 88) / 16
            }rem`,
          }}
        >
          {expandedPurchasedItems.map((item) => (
            <ImageContainer
              key={`${item.id}`} // Chave única para cada ImageContainer
              css={{
                left: `calc(${expandedPurchasedItems.indexOf(item) * 5.5}rem)`,
              }}
            >
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
    } as IPurchasedItems
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
