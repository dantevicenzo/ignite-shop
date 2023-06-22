import { StyledHeader, CartButton } from '@/styles/components/header'
import { Handbag } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../assets/logo.svg'

export function Header() {
  return (
    <StyledHeader>
      <Link href={'/'}>
        <Image src={logoImg} alt="" />
      </Link>
      <CartButton type="button">
        <Handbag size={24} />
      </CartButton>
    </StyledHeader>
  )
}
