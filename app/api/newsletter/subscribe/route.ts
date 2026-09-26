import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'

// Mailchimp is loaded dynamically to avoid TypeScript issues with missing types
// eslint-disable-next-line
let mailchimp: any = null

async function getMailchimp() {
  if (!mailchimp) {
    mailchimp = (await import('@mailchimp/mailchimp_marketing')).default
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_SERVER_PREFIX) {
      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_PREFIX,
      })
    }
  }
  return mailchimp
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, source = 'website-popup' } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Mailchimp is the subscriber list (don't fail if Mailchimp is down).
    // An "already a member" error just means they signed up before.
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      try {
        const mc = await getMailchimp()
        await mc.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
          email_address: email.toLowerCase(),
          status: 'subscribed',
          merge_fields: { FNAME: firstName || '' },
          tags: ['website-subscriber', source],
        })
      } catch (mcError) {
        // eslint-disable-next-line
        const title = (mcError as any)?.response?.body?.title
        if (title === 'Member Exists') {
          return NextResponse.json({ success: true, alreadySubscribed: true })
        }
        console.error('Mailchimp sync error (non-fatal):', mcError)
      }
    }

    // Send welcome email with WELCOME10 code
    await sendWelcomeEmail(email, 'WELCOME10')

    return NextResponse.json({ success: true, alreadySubscribed: false })
  } catch (error) {
    console.error('Newsletter subscribe error:', error)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
