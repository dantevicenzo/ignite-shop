import {
  AddToBagButton,
  Container,
  Description,
  DetailsContainer,
  ImageContainer,
  Price,
  Title,
} from '@/styles/pages/product'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { IProduct } from '..'
import { formatPriceInCents } from '@/lib/formatter'

interface IProductProps {
  product: IProduct
}

export default function Product({ product }: IProductProps) {
  return (
    <Container>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <DetailsContainer>
        <Title>{product.name}</Title>
        <Price>{product.price}</Price>
        <Description>{product.description}</Description>
        <AddToBagButton>Colocar na sacola</AddToBagButton>
      </DetailsContainer>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await stripe.products.retrieve(query.id as string, {
    expand: ['default_price'],
  })

  const stripePrice = res.default_price as Stripe.Price
  const priceInCents = stripePrice.unit_amount as number

  const product = {
    id: res.id,
    name: res.name,
    price: formatPriceInCents(priceInCents),
    description: res.description,
    imageUrl: res.images[0],
  }

  return {
    props: {
      product,
    },
  }
}
