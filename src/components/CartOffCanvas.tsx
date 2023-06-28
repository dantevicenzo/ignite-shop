import {
  CartItem,
  CartItemList,
  CheckoutButton,
  CloseButton,
  Container,
  DetailsContainer,
  ImageContainer,
  QuantityContainer,
  TotalPriceContainer,
} from '@/styles/components/cartOffCanvas'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import { X } from 'phosphor-react'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

export function CartOffCanvas() {
  const [isRedirectingToCheckout, setIsRedirectingToCheckout] = useState(false)

  const {
    shouldDisplayCart,
    cartDetails,
    removeItem,
    redirectToCheckout,
    cartCount,
    formattedTotalPrice,
    handleCartClick,
  } = useShoppingCart()

  const cartOffCanvasRef = useRef() as MutableRefObject<HTMLInputElement>

  const cartIsEmpty = cartCount! < 1

  function handleCheckout() {
    if (!cartIsEmpty) {
      setIsRedirectingToCheckout(true)
      redirectToCheckout()
    }
  }

  useEffect(() => {
    const handler = (e: any) => {
      if (!cartOffCanvasRef.current.contains(e.target) && shouldDisplayCart) {
        handleCartClick()
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <Container shouldDisplayCart={shouldDisplayCart} ref={cartOffCanvasRef}>
      <CloseButton type="button" onClick={handleCartClick}>
        <X size={24} />
      </CloseButton>
      <h2>Sacola de compras</h2>
      <CartItemList>
        {Object.values(cartDetails ?? {}).map((cartItem) => (
          <CartItem key={cartItem.id}>
            <ImageContainer>
              <Image
                src={cartItem.image as string}
                width={95}
                height={95}
                alt=""
              />
            </ImageContainer>
            <DetailsContainer>
              <span>
                {cartItem.name}{' '}
                {cartItem.quantity > 1 && (
                  <span>{`(x${cartItem.quantity})`}</span>
                )}
              </span>
              <strong>{cartItem.formattedValue}</strong>
              <button onClick={() => removeItem(cartItem.id)}>Remover</button>
            </DetailsContainer>
          </CartItem>
        ))}
      </CartItemList>
      <QuantityContainer>
        <span>Quantidade</span>
        <span>
          {cartCount} {cartCount! > 1 ? 'itens' : 'item'}
        </span>
      </QuantityContainer>
      <TotalPriceContainer>
        <strong>Valor total</strong>
        <strong>{formattedTotalPrice}</strong>
      </TotalPriceContainer>
      <CheckoutButton
        onClick={handleCheckout}
        disabled={isRedirectingToCheckout || cartIsEmpty}
      >
        Finalizar compra
      </CheckoutButton>
    </Container>
  )
}
