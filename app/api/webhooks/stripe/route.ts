import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendOrderConfirmationEmail } from '@/lib/email'

// App Router does NOT auto-parse the body — request.text() gives us the raw body
// which Stripe needs for signature verification. No config needed here.
//
// There is no order database: Stripe is the record of every order, and this
// webhook emails the customer + shop inbox when a payment succeeds.

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 })
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-01-28.clover',
  })

  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig ?? '', process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true })
    }

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
        expand: ['data.price.product'],
      })

      const items = lineItems.data.map((item) => {
        const product = item.price?.product as Stripe.Product | undefined
        return {
          title: item.description ?? product?.name ?? 'Item',
          quantity: item.quantity ?? 1,
          lineTotal: (item.amount_total ?? 0) / 100,
          fittingRequested: product?.metadata?.fitting === 'true',
        }
      })

      const shipping = session.collected_information?.shipping_details
      const address = shipping?.address ?? session.customer_details?.address
      const shippingAddress = address
        ? [address.line1, address.line2, address.city, address.postal_code].filter(Boolean).join(', ')
        : ''

      const metadata = session.metadata ?? {}
      const customerName = session.customer_details?.name || metadata.customerName || ''

      await sendOrderConfirmationEmail({
        to: session.customer_details?.email || session.customer_email || '',
        firstName: customerName.split(' ')[0] ?? '',
        orderNumber: metadata.orderNumber || session.id,
        items,
        discountCode: metadata.discountCode || null,
        discountAmount: (session.total_details?.amount_discount ?? 0) / 100,
        total: (session.amount_total ?? 0) / 100,
        shippingAddress,
        deliveryEstimate: metadata.deliveryMessage || '5-7 business days',
        fittingPostcode: metadata.fittingPostcode || null,
      })
    } catch (err) {
      console.error('Error processing paid order:', err)
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }
  }

  if (event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object as Stripe.PaymentIntent
    console.log('Payment failed for intent:', intent.id)
  }

  return NextResponse.json({ received: true })
}
