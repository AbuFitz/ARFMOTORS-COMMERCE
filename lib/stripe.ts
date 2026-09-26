import Stripe from 'stripe'

/**
 * Returns a Stripe client, or null when STRIPE_SECRET_KEY isn't set.
 * STRIPE_API_BASE is only for `npm run test:orders`, which points Stripe at a
 * local fake server — leave it unset in production.
 */
export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null

  const config: Stripe.StripeConfig = { apiVersion: '2026-01-28.clover' }
  if (process.env.STRIPE_API_BASE) {
    const base = new URL(process.env.STRIPE_API_BASE)
    config.host = base.hostname
    config.port = Number(base.port) || undefined
    config.protocol = base.protocol.replace(':', '') as 'http' | 'https'
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, config)
}
