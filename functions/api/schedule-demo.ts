export const onRequestPost: PagesFunction<{
  RESEND_API_KEY: string
  DEMO_MAIL_TO?: string
  DEMO_MAIL_FROM?: string
}> = async ({ request, env }) => {
  try {
    const body = (await request.json().catch(() => null)) as any
    if (!body) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    const req = {
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      company: String(body.company || '').trim(),
      phone: String(body.phone || '').trim(),
      employees: String(body.employees || '').trim(),
      message: String(body.message || '').trim(),
    }

    for (const k of ['name', 'email', 'company'] as const) {
      if (!req[k]) {
        return new Response(JSON.stringify({ error: `Missing field: ${k}` }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        })
      }
    }

    const RESEND_API_KEY = env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email not configured (missing RESEND_API_KEY)' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }

    const to = env.DEMO_MAIL_TO || 'kaan@makers-edge.com'
    const from = env.DEMO_MAIL_FROM || 'onboarding@resend.dev'
    const subject = `New Demo Request from ${req.name} (${req.company})`
    const text = [
      'New demo request received',
      '',
      `Name: ${req.name}`,
      `Email: ${req.email}`,
      `Company: ${req.company}`,
      req.phone && `Phone: ${req.phone}`,
      req.employees && `Company size: ${req.employees}`,
      req.message && `Message: ${req.message}`,
    ]
      .filter(Boolean)
      .join('\n')

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, text, reply_to: req.email }),
    })

    if (!resp.ok) {
      const details = await resp.text()
      return new Response(JSON.stringify({ error: 'Failed to send email', details }), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      })
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

// Optional: respond cleanly to accidental GETs
export const onRequestGet: PagesFunction = async () =>
  new Response('Method Not Allowed', { status: 405 })

