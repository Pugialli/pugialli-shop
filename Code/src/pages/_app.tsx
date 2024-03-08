import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../../public/pugialli-logo.svg'
import { Container, Header, Logo, TitleLogo } from '../styles/pages/app'
import Image from 'next/image'

globalStyles()

export default function app({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Logo>
          <Image src={logoImg.src} width={35} height={35} alt="" />
          <TitleLogo>
            <strong>EJC&apos;s Shop</strong>
            <span>by Pugialli</span>
          </TitleLogo>
        </Logo>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
