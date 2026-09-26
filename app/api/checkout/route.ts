import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { CartItem } from '@/lib/cart-store'
import { getProductById } from '@/lib/products'
import { calculateDiscount } from '@/lib/utils'
import { getDiscountPercent } from '@/lib/site-config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface CheckoutRequestBody {
  items: CartItem[]
  customerInfo: {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    postcode: string
  }
  discountCode: string | null
}

function generateOrderNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5)
  const random = Math.random().toString(36).toUpperCase().slice(2, 5)
  return `ARF-${stamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe()
    if (!stripe) {
      return NextResponse.json({ error: 'Payments are not configured yet' }, { status: 503 })
    }

    const body: CheckoutRequestBody = await request.json()
    const { items, customerInfo, discountCode } = body

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!customerInfo?.email) {
      return NextResponse.json({ error: 'Customer email required' }, { status: 400 })
    }

    // Prices always come from the catalogue, never from the browser
    const lines = []
    for (const item of items) {
      const product = getProductById(item.productId)
      const quantity = Math.floor(Number(item.quantity))
      if (!product || !Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
        return NextResponse.json(
          { error: `"${item.title}" is no longer available — please remove it from your cart` },
          { status: 400 }
        )
      }
      const unitPrice = calculateDiscount(product.price, product.discountType, product.discountValue)
      const fitting =
        product.fittingEligible &&
        Boolean(item.fittingRequested) &&
        item.fittingAvailable !== false
      lines.push({ product, quantity, unitPrice, fitting, postcode: item.fittingPostcode ?? '' })
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map((line) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: line.product.title,
          description: line.fitting ? 'FixNow Mechanics fitting requested (quoted separately)' : undefined,
          metadata: {
            productId: line.product.id,
            slug: line.product.slug,
            fitting: String(line.fitting),
          },
        },
        unit_amount: Math.round(line.unitPrice * 100), // pence
      },
      quantity: line.quantity,
    }))

    // Discount codes are validated server-side against lib/site-config.ts
    const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
    const discountPercent = getDiscountPercent(discountCode, subtotal)
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] = []
    if (discountCode && discountPercent > 0) {
      const code = discountCode.toUpperCase().trim()
      const couponId = `arf_${code.toLowerCase()}_${discountPercent}`
      try {
        await stripe.coupons.retrieve(couponId)
      } catch {
        await stripe.coupons.create({
          id: couponId,
          name: code,
          percent_off: discountPercent,
          duration: 'once',
        })
      }
      discounts = [{ coupon: couponId }]
    }

    const allUKStock = lines.every((l) => l.product.inStockUK)
    const hasImported = lines.some((l) => l.product.imported)
    const deliveryMessage = allUKStock
      ? '1-3 business days (UK Stock)'
      : hasImported
      ? '10-14 business days (includes international shipping)'
      : '5-7 business days'

    const fittingLine = lines.find((l) => l.fitting)
    const orderNumber = generateOrderNumber()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      discounts: discounts.length ? discounts : undefined,
      customer_email: customerInfo.email,
      metadata: {
        orderNumber,
        deliveryMessage,
        discountCode: discountPercent > 0 && discountCode ? discountCode.toUpperCase().trim() : '',
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`.trim().slice(0, 200),
        customerPhone: (customerInfo.phone || '').slice(0, 50),
        fittingPostcode: fittingLine ? (fittingLine.postcode || customerInfo.postcode || '').slice(0, 20) : '',
      },
      success_url: `${SITE_URL}/order-confirmation/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checkout?cancelled=true`,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
      phone_number_collection: { enabled: true },
      custom_text: {
        submit: {
          message: `Estimated delivery: ${deliveryMessage}`,
        },
      },
    })

    return NextResponse.json({ sessionUrl: session.url, sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
