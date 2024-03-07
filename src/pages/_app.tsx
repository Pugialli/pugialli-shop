import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../../public/pugialli-logo.svg'
import { Container, Header } from '../styles/pages/app'
import Image from 'next/image'

globalStyles()

export default function app({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <div>
          <Image src={logoImg.src} width={35} height={35} alt="" />
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
