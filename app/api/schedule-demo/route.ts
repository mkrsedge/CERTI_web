export const runtime = 'edge'

type DemoRequest = {
  name: string
  email: string
  company: string
  phone?: string
  employees?: string
  message?: string
}

function renderText(data: DemoRequest) {
  return [
    `New demo request received`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    data.phone ? `Phone: ${data.phone}` : undefined,
    data.employees ? `Company size: ${data.employees}` : undefined,
    data.message ? `Message: ${data.message}` : undefined,
  ]
    .filter(Boolean)
    .join('\n')
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<DemoRequest>
    const required = ['name', 'email', 'company'] as const
    for (const key of required) {
      if (!body[key] || typeof body[key] !== 'string' || !body[key]?.trim()) {
        return new Response(JSON.stringify({ error: `Missing field: ${key}` }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        })
      }
    }

    const data: DemoRequest = {
      name: body.name!.trim(),
      email: body.email!.trim(),
      company: body.company!.trim(),
      phone: body.phone?.trim() || '',
      employees: body.employees?.toString() || '',
      message: body.message?.trim() || '',
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const MAIL_TO = process.env.DEMO_MAIL_TO || 'kaan@makers-edge.com'
    // Use Resend onboarding sender by default to avoid domain verification blocking
    const MAIL_FROM = process.env.DEMO_MAIL_FROM || 'onboarding@resend.dev'

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Email not configured (missing RESEND_API_KEY)' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      )
    }

    const subject = `New Demo Request from ${data.name} (${data.company})`
    const text = renderText(data)

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        subject,
        text,
        reply_to: data.email,
      }),
    })

    if (!resp.ok) {
      const errText = await resp.text()
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: errText }),
        { status: 502, headers: { 'content-type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Unexpected error', details: String(err?.message || err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
