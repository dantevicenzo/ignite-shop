import {
  AddToCartButton,
  Card,
  CardDetails,
  CartPrice,
  CartTitle,
  Container,
} from '@/styles/pages/home'
import Image from 'next/image'
import { Handbag } from '@phosphor-icons/react'
import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import camiseta1 from '../assets/camisetas/camiseta1.png'
import camiseta2 from '../assets/camisetas/camiseta2.png'
import camiseta3 from '../assets/camisetas/camiseta3.png'
import camiseta4 from '../assets/camisetas/camiseta4.png'
import camiseta5 from '../assets/camisetas/camiseta5.png'

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

export default function Home() {
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
      <Card className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt="" />
        <CardDetails>
          <div>
            <CartTitle>Camiseta Beyond the Limits</CartTitle>
            <CartPrice>R$ 79,90</CartPrice>
          </div>
          <AddToCartButton type="button">
            <Handbag size={32} />
          </AddToCartButton>
        </CardDetails>
      </Card>

      <Card className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480} alt="" />
        <CardDetails>
          <div>
            <CartTitle>Camiseta Beyond the Limits</CartTitle>
            <CartPrice>R$ 79,90</CartPrice>
          </div>
          <AddToCartButton type="button">
            <Handbag size={32} />
          </AddToCartButton>
        </CardDetails>
      </Card>

      <Card className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />
        <CardDetails>
          <div>
            <CartTitle>Camiseta Beyond the Limits</CartTitle>
            <CartPrice>R$ 79,90</CartPrice>
          </div>
          <AddToCartButton type="button">
            <Handbag size={32} />
          </AddToCartButton>
        </CardDetails>
      </Card>

      <Card className="keen-slider__slide">
        <Image src={camiseta4} width={520} height={480} alt="" />
        <CardDetails>
          <div>
            <CartTitle>Camiseta Beyond the Limits</CartTitle>
            <CartPrice>R$ 79,90</CartPrice>
          </div>
          <AddToCartButton type="button">
            <Handbag size={32} />
          </AddToCartButton>
        </CardDetails>
      </Card>

      <Card className="keen-slider__slide">
        <Image src={camiseta5} width={520} height={480} alt="" />
        <CardDetails>
          <div>
            <CartTitle>Camiseta Beyond the Limits</CartTitle>
            <CartPrice>R$ 79,90</CartPrice>
          </div>
          <AddToCartButton type="button">
            <Handbag size={32} />
          </AddToCartButton>
        </CardDetails>
      </Card>
    </Container>
  )
}
