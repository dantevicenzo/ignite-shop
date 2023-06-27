import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
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
import { Header } from '@/components/Header'
import { useShoppingCart } from 'use-shopping-cart'

interface IProductProps {
  product: IProduct
}

export default function Product({ product }: IProductProps) {
  const { isFallback } = useRouter()

  const { addItem } = useShoppingCart()

  if (isFallback) {
    return <p>Carregando...</p>
  }

  function handleAddToBag() {
    addItem({
      name: product.name,
      description: product.description as string,
      id: product.priceId,
      price: product.price,
      currency: product.currency,
      image: product.image,
    })
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <Header />

      <Container>
        <ImageContainer>
          <Image src={product.image} width={520} height={480} alt="" />
        </ImageContainer>
        <DetailsContainer>
          <Title>{product.name}</Title>
          <Price>{product.formattedPrice}</Price>
          <Description>{product.description}</Description>
          <AddToBagButton onClick={handleAddToBag}>
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

  const product: IProduct = {
    id: res.id,
    name: res.name,
    price: priceInCents,
    currency: 'BRL',
    formattedPrice: formatPriceInCents(priceInCents),
    priceId: stripePrice.id,
    description: res.description,
    image: res.images[0],
  }

  return {
    props: {
      product,
      revalidate: 60 * 60 * 2, // 2 hours
    },
  }
}
