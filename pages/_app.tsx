import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import 'react-toastify/dist/ReactToastify.css'
import 'tailwindcss/tailwind.css'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GameOn Avatars</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <ToastContainer
        toastStyle={{ backgroundColor: '#111827', color: 'white' }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
