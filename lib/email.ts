import { Resend } from 'resend'
import { COMPANY_STATEMENT } from '@/lib/site-config'

const FROM = `${process.env.RESEND_FROM_NAME || 'ARF Motors'} <${process.env.RESEND_FROM_EMAIL || 'orders@arfmotors.co.uk'}>`
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arfmotors.co.uk'
const NOTIFY_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || process.env.BUSINESS_EMAIL || 'orders@arfmotors.co.uk'

let resend: Resend | null = null

async function send(message: { to: string; subject: string; html: string; text?: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`RESEND_API_KEY not set — skipping email "${message.subject}" to ${message.to}`)
    return
  }
  resend ??= new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({ from: FROM, ...message })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function layout(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden">
      <tr><td style="background:#111111;padding:20px 24px">
        <span style="color:#ffffff;font-size:22px;font-weight:bold">ARF</span><span style="color:#3b82f6;font-size:22px;font-weight:bold">MOTORS</span>
      </td></tr>
      <tr><td style="padding:24px;color:#111111;font-size:14px;line-height:1.6">
        <h1 style="font-size:20px;margin:0 0 16px">${title}</h1>
        ${body}
      </td></tr>
      <tr><td style="padding:16px 24px;background:#fafafa;color:#888888;font-size:12px">
        ${COMPANY_STATEMENT} · <a href="${SITE_URL}" style="color:#888888">${SITE_URL.replace(/^https?:\/\//, '')}</a>
      </td></tr>
    </table>
  </td></tr></table></body></html>`
}

// ============================================================
// ORDER CONFIRMATION EMAIL
// ============================================================
export interface OrderEmailItem {
  title: string
  quantity: number
  lineTotal: number
  fittingRequested?: boolean
}

export interface OrderEmailData {
  to: string
  firstName: string
  orderNumber: string
  items: OrderEmailItem[]
  discountCode: string | null
  discountAmount: number
  total: number
  shippingAddress: string
  deliveryEstimate: string
  fittingPostcode: string | null
}

function buildItemsHtml(items: OrderEmailItem[]): string {
  return items
    .map(
      (item) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5">${escapeHtml(item.title)}${
        item.fittingRequested ? ' <span style="color:#3b82f6;font-size:12px">(+ FixNow fitting)</span>' : ''
      }</td>
      <td align="right" style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#888888">x${item.quantity}</td>
      <td align="right" style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-weight:bold">£${item.lineTotal.toFixed(2)}</td>
    </tr>`
    )
    .join('')
}

export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<void> {
  const itemsHtml = buildItemsHtml(data.items)
  const discountHtml =
    data.discountCode && data.discountAmount > 0
      ? `<p style="color:#16a34a;margin:4px 0">Discount (${escapeHtml(data.discountCode)}): -£${data.discountAmount.toFixed(2)}</p>`
      : ''
  const fittingHtml = data.fittingPostcode
    ? `<div style="margin-top:16px;padding:16px;background:#eff6ff;border:1px solid #93c5fd;border-radius:6px">
        <p style="margin:0;color:#1e40af;font-weight:bold">Fitting requested</p>
        <p style="margin:4px 0 0;color:#1e3a8a;font-size:13px">FixNow Mechanics will contact you within 24 hours to confirm the fitting price and book a time (postcode ${escapeHtml(data.fittingPostcode)}).</p>
       </div>`
    : ''

  const html = layout(
    `Thanks for your order, ${escapeHtml(data.firstName || 'there')}!`,
    `<p>Your order <strong>${escapeHtml(data.orderNumber)}</strong> is confirmed.</p>
     <table width="100%" cellpadding="0" cellspacing="0">${itemsHtml}</table>
     ${discountHtml}
     <p style="font-size:16px;font-weight:bold;margin:12px 0">Total paid: £${data.total.toFixed(2)}</p>
     <p><strong>Delivering to:</strong> ${escapeHtml(data.shippingAddress)}<br/>
        <strong>Estimated delivery:</strong> ${escapeHtml(data.deliveryEstimate)}</p>
     ${fittingHtml}
     <p style="margin-top:16px">We'll email your tracking number as soon as your order is dispatched.</p>`
  )

  await send({
    to: data.to,
    subject: `Order confirmed – ${data.orderNumber}`,
    html,
    text: `Thanks for your order ${data.orderNumber}. Total paid: £${data.total.toFixed(2)}. Estimated delivery: ${data.deliveryEstimate}.`,
  })

  await send({
    to: NOTIFY_EMAIL,
    subject: `New Order: ${data.orderNumber} - £${data.total.toFixed(2)}${data.fittingPostcode ? ' (fitting requested)' : ''}`,
    html: layout(
      `New order ${escapeHtml(data.orderNumber)}`,
      `<p>Customer: ${escapeHtml(data.firstName)} (${escapeHtml(data.to)})</p>
       <p>Ship to: ${escapeHtml(data.shippingAddress)}</p>
       <table width="100%" cellpadding="0" cellspacing="0">${itemsHtml}</table>
       ${discountHtml}
       <p><strong>Total: £${data.total.toFixed(2)}</strong></p>
       ${data.fittingPostcode ? `<p><strong>Fitting requested</strong> — pass to FixNow Mechanics (postcode ${escapeHtml(data.fittingPostcode)}).</p>` : ''}
       <p>Full payment details are in your Stripe dashboard.</p>`
    ),
  })
}

// ============================================================
// NEWSLETTER WELCOME EMAIL
// ============================================================
export async function sendWelcomeEmail(to: string, discountCode: string = 'WELCOME10'): Promise<void> {
  await send({
    to,
    subject: 'Welcome to ARF Motors – here’s 10% off',
    html: layout(
      'Welcome to ARF Motors',
      `<p>Thanks for signing up. Here's your code for 10% off your first order (min. £50):</p>
       <p style="font-size:24px;font-weight:bold;letter-spacing:2px;background:#f5f5f5;padding:12px;text-align:center;border-radius:6px">${escapeHtml(discountCode)}</p>
       <p><a href="${SITE_URL}/shop?ref=welcome" style="display:inline-block;background:#111111;color:#ffffff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold">Start shopping</a></p>`
    ),
    text: `Welcome to ARF Motors. Use code ${discountCode} for 10% off your first order (min. £50): ${SITE_URL}/shop`,
  })
}

// ============================================================
// CONTACT FORM EMAILS
// ============================================================
export async function sendContactAcknowledgement(
  to: string,
  name: string,
  message: string,
  details: { bmwModel?: string; postcode?: string } = {}
): Promise<void> {
  await send({
    to,
    subject: 'We’ve received your message – ARF Motors',
    html: layout(
      `Thanks, ${escapeHtml(name)}`,
      `<p>We've received your message and will reply within 24 hours.</p>
       <p style="color:#555555;border-left:3px solid #e5e5e5;padding-left:12px">${escapeHtml(message)}</p>`
    ),
  })

  await send({
    to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SUPPORT_EMAIL || 'support@arfmotors.co.uk',
    subject: `New Contact Form - ${name}`,
    html: layout(
      'New contact form submission',
      `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(to)})</p>
       ${details.bmwModel ? `<p><strong>BMW:</strong> ${escapeHtml(details.bmwModel)}</p>` : ''}
       ${details.postcode ? `<p><strong>Postcode:</strong> ${escapeHtml(details.postcode)}</p>` : ''}
       <p><strong>Message:</strong></p><p>${escapeHtml(message)}</p>`
    ),
  })
}

// ============================================================
// FIXNOW FITTING JOB EMAIL
// Sent to FixNow Mechanics when an order includes fitting.
// ============================================================
export interface FittingJobEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  fittingPostcode: string
  items: OrderEmailItem[]
}

export async function sendFittingJobEmail(data: FittingJobEmailData): Promise<void> {
  const to = process.env.FIXNOW_EMAIL
  if (!to) {
    console.warn(`FIXNOW_EMAIL not set — fitting job for ${data.orderNumber} only sent to the shop inbox`)
    return
  }

  const fittingItems = data.items.filter((item) => item.fittingRequested)
  const itemsHtml = fittingItems
    .map((item) => `<li>${escapeHtml(item.title)} × ${item.quantity}</li>`)
    .join('')

  await send({
    to,
    subject: `Fitting job: ${data.orderNumber} – ${data.fittingPostcode}`,
    html: layout(
      `New fitting job – ${escapeHtml(data.orderNumber)}`,
      `<p>A customer has ordered parts with FixNow fitting. Please contact them to quote and book a time for after delivery.</p>
       <p><strong>Customer:</strong> ${escapeHtml(data.customerName)}<br/>
          <strong>Phone:</strong> ${escapeHtml(data.customerPhone || 'not given')}<br/>
          <strong>Email:</strong> ${escapeHtml(data.customerEmail)}<br/>
          <strong>Fitting postcode:</strong> ${escapeHtml(data.fittingPostcode)}<br/>
          <strong>Delivery address:</strong> ${escapeHtml(data.shippingAddress)}</p>
       <p><strong>Parts to fit:</strong></p><ul>${itemsHtml}</ul>`
    ),
    text: `Fitting job ${data.orderNumber}: ${data.customerName}, ${data.customerPhone}, ${data.customerEmail}, postcode ${data.fittingPostcode}. Parts: ${fittingItems.map((i) => `${i.title} x${i.quantity}`).join(', ')}`,
  })
}
