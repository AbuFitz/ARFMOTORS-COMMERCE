import { NextRequest, NextResponse } from 'next/server'
import { sendContactAcknowledgement } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, bmwModel, postcode, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json({ error: 'Message too short' }, { status: 400 })
    }

    // Send acknowledgement + notify the shop inbox
    await sendContactAcknowledgement(email, name, message, { bmwModel, postcode })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
