import { StyledHeader, CartButton, CartCount } from '@/styles/components/header'
import { Handbag } from 'phosphor-react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../assets/logo.svg'
import { useShoppingCart } from 'use-shopping-cart'

interface IHeaderProps {
  cartButtonHidden?: boolean
}

export function Header({ cartButtonHidden = false }: IHeaderProps) {
  const { cartCount, handleCartClick } = useShoppingCart()

  return (
    <StyledHeader justifyContent={cartButtonHidden ? 'center' : 'spaceBetween'}>
      <Link href={'/'}>
        <Image src={logoImg} alt="" />
      </Link>
      <CartButton
        type="button"
        display={cartButtonHidden ? 'none' : 'flex'}
        onClick={handleCartClick}
      >
        <Handbag size={24} />
        <CartCount cartState={cartCount ? 'full' : 'empty'}>
          {cartCount}
        </CartCount>
      </CartButton>
    </StyledHeader>
  )
}
