import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN: string = process.env.NEXT_PUBLIC_SENTRY_DSN as string

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
})