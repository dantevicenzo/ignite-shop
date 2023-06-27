import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { formatPriceInCents } from '@/lib/formatter'

import {
  AddToBagButton,
  Container,
  Description,
  DetailsContainer,
  ImageContainer,
  Price,
  Title,
} from '@/styles/pages/product'

import { IProduct } from '..'

interface IProductProps {
  product: IProduct
}

export default function Product({ product }: IProductProps) {
  const { isFallback } = useRouter()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  if (isFallback) {
    return <p>Carregando...</p>
  }

  async function handleAddToBag() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)

      alert(`Falha ao redirecionar ao checkout. ${error}`)
    }
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <Container>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <DetailsContainer>
          <Title>{product.name}</Title>
          <Price>{product.price}</Price>
          <Description>{product.description}</Description>
          <AddToBagButton
            onClick={handleAddToBag}
            disabled={isCreatingCheckoutSession}
          >
            Colocar na sacola
          </AddToBagButton>
        </DetailsContainer>
      </Container>
    </>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = res.data.map((product) => {
    return {
      params: {
        id: product.id,
      },
    }
  })

  return {
    paths: products,
    fallback: true, // false or "blocking"
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const res = await stripe.products.retrieve(params?.id as string, {
    expand: ['default_price'],
  })

  const stripePrice = res.default_price as Stripe.Price
  const priceInCents = stripePrice.unit_amount as number

  const product = {
    id: res.id,
    name: res.name,
    price: formatPriceInCents(priceInCents),
    defaultPriceId: stripePrice.id,
    description: res.description,
    imageUrl: res.images[0],
  }

  return {
    props: {
      product,
      revalidate: 60 * 60 * 2, // 2 hours
    },
  }
}
