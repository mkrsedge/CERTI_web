export const runtime = 'nodejs'
import { Resend } from 'resend'

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
    const MAIL_FROM = process.env.DEMO_MAIL_FROM || 'onboarding@resend.dev'

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Email not configured (missing RESEND_API_KEY)' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      )
    }

    const subject = `New Demo Request from ${data.name} (${data.company})`
    const resend = new Resend(RESEND_API_KEY)
    const result = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject,
      text: renderText(data),
      reply_to: data.email,
    })

    if (result.error) {
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: result.error }),
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
