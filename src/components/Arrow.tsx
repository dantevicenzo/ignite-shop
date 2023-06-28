import { ArrowContainer } from '@/styles/components/arrow'
import { CaretLeft, CaretRight } from 'phosphor-react'

export function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  return (
    <ArrowContainer
      onClick={props.onClick}
      position={`${props.left ? 'left' : 'right'}`}
      disabled={props.disabled}
    >
      {props.left ? <CaretLeft size={48} /> : <CaretRight size={48} />}
    </ArrowContainer>
  )
}
