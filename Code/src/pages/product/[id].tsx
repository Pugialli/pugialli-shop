import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { asCurrencyInCents } from '../../lib/formatter'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'

interface ProductProps {
  product: {
    id: string
    name: string
    imageURl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Products({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutURL } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageURl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productID = params.id

  const product = await stripe.products.retrieve(productID, {
    expand: ['default_price'],
  })
  const expandedPrice = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageURl: product.images[0],
        price: asCurrencyInCents(expandedPrice.unit_amount),
        description: product.description,
        defaultPriceId: expandedPrice.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
