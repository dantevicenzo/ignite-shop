import { StyledHeader, CartButton } from '@/styles/components/header'
import { Handbag } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../assets/logo.svg'

interface IHeaderProps {
  cartButtonHidden?: boolean
}

export function Header({ cartButtonHidden = false }: IHeaderProps) {
  return (
    <StyledHeader justifyContent={cartButtonHidden ? 'center' : 'spaceBetween'}>
      <Link href={'/'}>
        <Image src={logoImg} alt="" />
      </Link>
      <CartButton type="button" display={cartButtonHidden ? 'none' : 'flex'}>
        <Handbag size={24} />
      </CartButton>
    </StyledHeader>
  )
}
