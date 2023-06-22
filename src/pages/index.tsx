import {
  AddToCartButton,
  Card,
  CardDetails,
  CartPrice,
  CartTitle,
  Container,
} from '@/styles/pages/home'
import { Handbag } from '@phosphor-icons/react'
import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { GetStaticProps } from 'next'

const WheelControls: KeenSliderPlugin = (slider) => {
  let touchTimeout: ReturnType<typeof setTimeout>
  let position: {
    x: number
    y: number
  }
  let wheelActive: boolean

  function dispatch(e: WheelEvent, name: string) {
    position.x -= e.deltaY
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      }),
    )
  }

  function wheelStart(e: WheelEvent) {
    position = {
      x: e.pageX,
      y: e.pageY,
    }
    dispatch(e, 'ksDragStart')
  }

  function wheel(e: WheelEvent) {
    dispatch(e, 'ksDrag')
  }

  function wheelEnd(e: WheelEvent) {
    dispatch(e, 'ksDragEnd')
  }

  function eventWheel(e: WheelEvent) {
    e.preventDefault()
    if (!wheelActive) {
      wheelStart(e)
      wheelActive = true
    }
    wheel(e)
    clearTimeout(touchTimeout)
    touchTimeout = setTimeout(() => {
      wheelActive = false
      wheelEnd(e)
    }, 50)
  }

  slider.on('created', () => {
    slider.container.addEventListener('wheel', eventWheel, {
      passive: false,
    })
  })
}

interface IProduct {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
}

interface IHomeProps {
  products: IProduct[]
}

export default function Home(props: IHomeProps) {
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
        <Card key={product.id} className="keen-slider__slide">
          <img src={product.imageUrl} width={520} height={480} alt="" />
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(priceInCents / 100),
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
