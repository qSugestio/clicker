import { store } from '@/store/store'
import '@/utils/firebase'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import './globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store()}>
      <Analytics />
      <Component {...pageProps} />
    </Provider>
  )
}
