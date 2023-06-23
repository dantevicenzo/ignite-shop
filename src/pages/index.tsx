import {
  AddToCartButton,
  Card,
  CardDetails,
  CartPrice,
  CartTitle,
  Container,
} from '@/styles/pages/home'
import { Handbag } from '@phosphor-icons/react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { GetStaticProps } from 'next'
import { useWheelControls } from '@/hooks/useWheelControls'
import Image from 'next/image'
import Link from 'next/link'
import { formatPriceInCents } from '@/lib/formatter'

export interface IProduct {
  id: string
  name: string
  price: string
  description: string
  imageUrl: string
}

interface IHomeProps {
  products: IProduct[]
}

export default function Home(props: IHomeProps) {
  const WheelControls = useWheelControls()
  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      rubberband: false,
      slides: {
        perView: 'auto',
        origin: 'center',
      },
    },
    [WheelControls],
  )

  return (
    <Container ref={ref} className="keen-slider">
      {props.products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />
            <CardDetails>
              <div>
                <CartTitle>{product.name}</CartTitle>
                <CartPrice>{product.price}</CartPrice>
              </div>
              <AddToCartButton type="button">
                <Handbag size={32} />
              </AddToCartButton>
            </CardDetails>
          </Card>
        </Link>
      ))}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = res.data.map((product) => {
    const stripePrice = product.default_price as Stripe.Price
    const priceInCents = stripePrice.unit_amount as number

    return {
      id: product.id,
      name: product.name,
      price: formatPriceInCents(priceInCents),
      description: product.description,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
