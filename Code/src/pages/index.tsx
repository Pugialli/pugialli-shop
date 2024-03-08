import Image from 'next/image'
import { HomeContainer, Product } from '../styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import { asCurrencyInCents } from '../lib/formatter'
import Link from 'next/link'

interface HomeProps {
  products: {
    id: string
    name: string
    imageURl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Product className="keen-slider__slide">
              <Image src={product.imageURl} width={520} height={480} alt="" />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const expandedPrice = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageURl: product.images[0],
      price: asCurrencyInCents(expandedPrice.unit_amount),
    }
  })

  return {
    props: { products },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
