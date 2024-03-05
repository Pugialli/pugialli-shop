import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

globalStyles()

export default function app({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
