import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  createSupabaseCaptchaContextFromEnv,
  verifyCaptchaSubmission,
} from '@/lib/inquiry-captcha'

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(), key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(), tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!url || !key || !tenantId) return NextResponse.json({ error: 'Server configuration is incomplete.' }, { status: 500 })
  const body = await request.json().catch(() => null)
  if (!body?.email?.trim() || !body?.message?.trim()) return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 })
  const captchaSecret = process.env.CAPTCHA_SECRET?.trim()
  if (!captchaSecret) return NextResponse.json({ error: 'Verification service is unavailable.' }, { status: 503 })
  let captchaResult
  try {
    const { tenantId, siteScope, store } = createSupabaseCaptchaContextFromEnv()
    captchaResult = await verifyCaptchaSubmission({
      secret: captchaSecret,
      tenantId,
      siteScope,
      store,
      scope: String(body.captchaScope || ''),
      token: String(body.captchaToken || ''),
      answer: String(body.captchaAnswer || ''),
    })
  } catch {
    return NextResponse.json({ error: 'Verification service is unavailable.' }, { status: 503 })
  }
  if (!captchaResult.ok) {
    return NextResponse.json({
      error: captchaResult.code === 'expired'
        ? 'The verification code has expired. Please enter the new code.'
        : 'The verification code is incorrect. Please try again.',
      captchaCode: captchaResult.code,
    }, { status: 400 })
  }
  const row = { tenant_id: tenantId, name: String(body.name || '—').trim(), email: String(body.email).trim(), company: String(body.company || '').trim() || null, subject: String(body.subject || 'Website inquiry').trim(), message: String(body.message).trim(), status: 'unread' }
  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const { error } = await supabase.from('inquiries').insert(row)
  if (error) return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
