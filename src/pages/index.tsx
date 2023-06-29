import {
  AddToCartButton,
  Card,
  CardDetails,
  CartPrice,
  CartTitle,
  Container,
} from '@/styles/pages/home'
import { Handbag } from 'phosphor-react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { GetStaticProps } from 'next'
import { useWheelControls } from '@/hooks/useWheelControls'
import Image from 'next/image'
import Link from 'next/link'
import { formatPriceInCents } from '@/lib/formatter'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { useShoppingCart } from 'use-shopping-cart'
import { Arrow } from '@/components/Arrow'
import { useState } from 'react'

export interface IProduct {
  id: string
  name: string
  price: number
  priceId: string
  formattedPrice: string
  currency: string
  description: string | null
  image: string
}

interface IHomeProps {
  products: IProduct[]
}

export default function Home(props: IHomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const WheelControls = useWheelControls()
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      rubberband: false,
      slides: {
        perView: 'auto',
        origin: 'center',
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [WheelControls],
  )

  const { addItem } = useShoppingCart()

  function handleAddToBag(product: IProduct) {
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
        <title>Home | Ignite Shop</title>
      </Head>

      <Header />

      <Container ref={sliderRef} className="keen-slider">
        {props.products.map((product) => (
          <Card className="keen-slider__slide" key={product.id}>
            <Link href={`/product/${product.id}`} passHref legacyBehavior>
              <Image src={product.image} width={520} height={480} alt="" />
            </Link>
            <CardDetails>
              <div>
                <CartTitle>{product.name}</CartTitle>
                <CartPrice>{product.formattedPrice}</CartPrice>
              </div>
              <AddToCartButton
                type="button"
                onClick={() => handleAddToBag(product)}
              >
                <Handbag size={32} />
              </AddToCartButton>
            </CardDetails>
          </Card>
        ))}

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </Container>
    </>
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
      formattedPrice: formatPriceInCents(priceInCents),
      priceId: stripePrice.id,
      price: priceInCents,
      currency: 'BRL',
      description: product.description,
      image: product.images[0],
    } as IProduct
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
