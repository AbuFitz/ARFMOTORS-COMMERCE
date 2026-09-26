import { NextRequest, NextResponse } from 'next/server'
import { sendSupplierEnquiry } from '@/lib/email'
import { CATEGORIES } from '@/lib/products'

const TYPES = ['Brand or manufacturer', 'Distributor or wholesaler', 'Other']
const clean = (value: unknown, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot: real visitors never fill this in
    if (clean(body.companyFax)) return NextResponse.json({ success: true })

    const data = {
      name: clean(body.name),
      company: clean(body.company),
      email: clean(body.email),
      phone: clean(body.phone, 40),
      website: clean(body.website),
      type: clean(body.type),
      categories: Array.isArray(body.categories)
        ? body.categories.filter((c: unknown) => CATEGORIES.some((cat) => cat.name === c))
        : [],
      productCount: clean(body.productCount, 40),
      message: clean(body.message, 4000),
    }

    if (!data.name || !data.company || !data.email || !data.message) {
      return NextResponse.json({ error: 'Name, company, email and message are required' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }
    if (!TYPES.includes(data.type)) {
      return NextResponse.json({ error: 'Please choose what best describes you' }, { status: 400 })
    }
    if (data.message.length < 20) {
      return NextResponse.json({ error: 'Please tell us a little more about your products' }, { status: 400 })
    }

    await sendSupplierEnquiry(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Supplier enquiry error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
